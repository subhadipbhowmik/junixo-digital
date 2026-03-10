import { NextRequest } from "next/server";
import * as cheerio from "cheerio";

/* ─────────────────────────────────────────────────────────────
   GET /api/crawl?domain=...&maxUrls=...
   Returns: text/event-stream (SSE)

   Each event is one of:
     data: {"type":"source","value":"sitemap.xml"}
     data: {"type":"url","value":"https://example.com/page"}
     data: {"type":"done","count":42}
     data: {"type":"error","message":"..."}

   Strategy:
     1. sitemap.xml variants  → stream urls as parsed
     2. robots.txt sitemap    → stream urls as parsed
     3. BFS fetch + cheerio   → stream each url as discovered
─────────────────────────────────────────────────────────────── */

const DEFAULT_MAX      = 200;
const HARD_MAX         = 500;
const FETCH_TIMEOUT_MS = 8_000;
const CRAWL_TIMEOUT_MS = 45_000;
const ASSET_RE = /\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff2?|ttf|eot|pdf|zip|gz|mp4|mp3|json|xml)(\?.*)?$/i;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw     = (searchParams.get("domain") ?? "").trim();
  const maxUrls = Math.min(Number(searchParams.get("maxUrls")) || DEFAULT_MAX, HARD_MAX);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(obj: object) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      }

      if (!raw) {
        send({ type: "error", message: "domain is required" });
        controller.close();
        return;
      }

      const baseUrl  = normalise(raw);
      const hostname = new URL(baseUrl).hostname;
      const seen     = new Set<string>();

      function emit(url: string): boolean {
        if (seen.has(url)) return false;
        seen.add(url);
        send({ type: "url", value: url });
        return true;
      }

      try {
        /* ── 1. sitemap variants ── */
        const sitemapSource = await streamSitemaps(baseUrl, maxUrls, emit, send);
        if (seen.size > 0) {
          send({ type: "done", count: seen.size, source: sitemapSource });
          controller.close();
          return;
        }

        /* ── 2. robots.txt ── */
        const robotsFound = await streamRobots(baseUrl, maxUrls, emit);
        if (robotsFound) {
          send({ type: "done", count: seen.size, source: "robots.txt → sitemap" });
          controller.close();
          return;
        }

        /* ── 3. BFS crawl ── */
        send({ type: "source", value: "link crawl" });
        await bfsCrawl(baseUrl, hostname, maxUrls, emit);
        send({ type: "done", count: seen.size, source: "link crawl" });

      } catch (err) {
        send({ type: "error", message: err instanceof Error ? err.message : String(err) });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type":  "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection":    "keep-alive",
    },
  });
}

/* ── Helpers ─────────────────────────────────────────────── */

function normalise(d: string) {
  return (d.startsWith("http") ? d : `https://${d}`).replace(/\/$/, "");
}

function dedup(arr: string[]) {
  return [...new Set(arr.map(u => u.trim()).filter(Boolean))];
}

async function getText(url: string): Promise<string> {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SitemapCrawler/1.0)", "Accept": "text/html,application/xml,*/*" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*(https?:\/\/[^\s<]+)\s*<\/loc>/gi)]
    .map(m => m[1].trim())
    .filter(u => { try { return !!new URL(u); } catch { return false; } });
}

const SITEMAP_CANDIDATES = (base: string) => [
  `${base}/sitemap.xml`,
  `${base}/sitemap_index.xml`,
  `${base}/sitemap-index.xml`,
  `${base}/wp-sitemap.xml`,
  `${base}/sitemap/sitemap.xml`,
  `${base}/sitemap1.xml`,
  `${base}/news-sitemap.xml`,
  `${base}/page-sitemap.xml`,
  `${base}/post-sitemap.xml`,
];

async function streamSitemaps(
  base: string,
  max: number,
  emit: (u: string) => boolean,
  send: (o: object) => void,
): Promise<string> {
  for (const url of SITEMAP_CANDIDATES(base)) {
    try {
      const xml = await getText(url);
      if (!xml.includes("<loc>")) continue;

      const isIndex = xml.includes("<sitemapindex") || xml.includes("<sitemap>");

      if (isIndex) {
        send({ type: "source", value: "sitemap index" });
        const children = extractLocs(xml);
        for (const child of children.slice(0, 15)) {
          try {
            const sub  = await getText(child);
            const locs = extractLocs(sub);
            for (const loc of locs) {
              emit(loc);
              // tiny yield so the stream actually flushes between URLs
              await tick();
            }
          } catch { /* skip */ }
        }
        if (/* seen.size */ true) return "sitemap index";
      } else {
        send({ type: "source", value: "sitemap.xml" });
        const locs = extractLocs(xml);
        for (const loc of locs) {
          emit(loc);
          await tick();
        }
        return "sitemap.xml";
      }
    } catch { /* try next */ }
  }
  return "";
}

async function streamRobots(
  base: string,
  max: number,
  emit: (u: string) => boolean,
): Promise<boolean> {
  try {
    const txt  = await getText(`${base}/robots.txt`);
    const urls = [...txt.matchAll(/^Sitemap:\s*(.+)$/gim)].map(m => m[1].trim());
    let found  = false;
    for (const su of urls.slice(0, 5)) {
      try {
        const xml  = await getText(su);
        const locs = extractLocs(xml);
        for (const loc of locs) { emit(loc); await tick(); found = true; }
      } catch { /* skip */ }
    }
    return found;
  } catch { return false; }
}

async function bfsCrawl(
  startUrl: string,
  hostname: string,
  maxUrls: number,
  emit: (u: string) => boolean,
) {
  const visited  = new Set<string>();
  const queue    = [startUrl];
  const deadline = Date.now() + CRAWL_TIMEOUT_MS;

  emit(startUrl);
  visited.add(startUrl);

  while (queue.length > 0 && visited.size < maxUrls && Date.now() < deadline) {
    const batch   = queue.splice(0, 4);
    const results = await Promise.allSettled(batch.map(u => crawlPage(u, hostname)));

    for (let i = 0; i < batch.length; i++) {
      visited.add(batch[i]);
      if (results[i].status === "rejected") continue;
      const { links } = (results[i] as PromiseFulfilledResult<{ links: string[] }>).value;
      for (const link of links) {
        if (!visited.has(link) && !queue.includes(link)) {
          queue.push(link);
          emit(link);
          await tick();
        }
      }
    }
  }
}

async function crawlPage(url: string, hostname: string): Promise<{ links: string[] }> {
  const html  = await getText(url);
  const $     = cheerio.load(html);
  const links: string[] = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    try {
      const abs = new URL(href, url);
      if (abs.hostname !== hostname) return;
      if (abs.protocol !== "http:" && abs.protocol !== "https:") return;
      if (ASSET_RE.test(abs.pathname)) return;
      abs.hash = ""; abs.search = "";
      links.push(abs.href.replace(/\/$/, "") || abs.href);
    } catch { /* skip */ }
  });
  return { links: dedup(links) };
}

// Yield to the event loop so the stream flushes each URL immediately
function tick() { return new Promise(r => setTimeout(r, 0)); }