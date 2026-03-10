"use client";
import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const { ref, inView } = useInView();
  const transforms: Record<string, string> = {
    up: inView ? "translateY(0)" : "translateY(30px)",
    left: inView ? "translateX(0)" : "translateX(-30px)",
    right: inView ? "translateX(0)" : "translateX(30px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: transforms[direction],
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckCircle = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const ZapIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const CodeIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const CopyIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const DownloadIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const CheckSmall = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const InfoIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const AlertIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const GlobeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const SearchIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const SettingsIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const ClockIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const ShieldCheckIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const BarChartIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const TargetIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const LinkIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const SpinnerIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const XIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   CONSTANTS & TYPES
══════════════════════════════════════════════════════════════ */
const CHANGEFREQ_OPTIONS = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
const PRIORITY_OPTIONS = ["1.0","0.9","0.8","0.7","0.6","0.5","0.4","0.3","0.2","0.1","0.0"];

interface Settings {
  changefreq: string;
  priority: string;
  includeLastmod: boolean;
  lastmod: string;
}

interface GenerateResult {
  xml: string;
  validCount: number;
  invalidURLs: string[];
}

/* ══════════════════════════════════════════════════════════════
   XML GENERATION UTILITIES
══════════════════════════════════════════════════════════════ */
function isValidURL(raw: string): boolean {
  try {
    const u = new URL(raw.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateXML(rawInput: string, settings: Settings): GenerateResult {
  const lines = rawInput.split("\n").map((l) => l.trim()).filter(Boolean);
  const validURLs: string[] = [];
  const invalidURLs: string[] = [];

  lines.forEach((line) => {
    if (isValidURL(line)) validURLs.push(line.trim());
    else invalidURLs.push(line);
  });

  if (validURLs.length === 0) return { xml: "", validCount: 0, invalidURLs };

  const today = new Date().toISOString().split("T")[0];
  const lastmodDate = settings.lastmod || today;

  const urlEntries = validURLs.map((url) => {
    let entry = `  <url>\n    <loc>${escapeXML(url)}</loc>\n`;
    if (settings.includeLastmod) entry += `    <lastmod>${lastmodDate}</lastmod>\n`;
    entry += `    <changefreq>${settings.changefreq}</changefreq>\n`;
    entry += `    <priority>${settings.priority}</priority>\n`;
    entry += `  </url>`;
    return entry;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;
  return { xml, validCount: validURLs.length, invalidURLs };
}

/* ══════════════════════════════════════════════════════════════
   CRAWL UTILITY
══════════════════════════════════════════════════════════════ */
async function crawlDomainStream(
  domain: string,
  maxUrls: number,
  onUrl: (url: string) => void,
  onSource: (source: string) => void,
  signal?: AbortSignal,
): Promise<{ count: number; source: string }> {
  const params = new URLSearchParams({ domain, maxUrls: String(maxUrls) });
  const res = await fetch(`/api/crawl?${params}`, { signal });

  if (!res.ok || !res.body) throw new Error(`API error ${res.status}`);

  const reader  = res.body.getReader();
  const decoder = new TextDecoder();
  let   buffer  = "";
  let   source  = "";
  let   count   = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data:")) continue;
      try {
        const evt = JSON.parse(line.slice(5).trim());
        if (evt.type === "url")    { onUrl(evt.value); count++; }
        if (evt.type === "source") { source = evt.value; onSource(evt.value); }
        if (evt.type === "done")   { source = evt.source ?? source; count = evt.count ?? count; }
        if (evt.type === "error")  throw new Error(evt.message);
      } catch (e) {
        if (e instanceof Error && e.message !== "JSON") throw e;
      }
    }
  }

  return { count, source };
}

/* ══════════════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-16 lg:pt-20 lg:pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full opacity-70" style={{ transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-pink-50 rounded-full opacity-50" style={{ transform: "translate(-25%,25%)" }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-orange-200 opacity-25" style={{ width: [5, 8, 4, 6, 3][i], height: [5, 8, 4, 6, 3][i], top: ["18%", "70%", "40%", "82%", "28%"][i], left: ["8%", "5%", "90%", "72%", "95%"][i] }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10" style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <span>/</span>
          <a href="/tools" className="hover:text-orange-500 transition-colors">Free Tools</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">XML Sitemap Generator</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Free SEO Tool</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}>
              Free XML{" "}<span className="relative inline-block text-orange-500">Sitemap Generator</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}>
              Enter your domain to auto-crawl all URLs, or paste them manually. Configure settings and generate a valid XML sitemap in seconds — ready for Google Search Console.
            </p>

            <ul className="space-y-3 mb-9" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.38s" }}>
              {[
                "Auto-crawl your domain to fetch all URLs",
                "Generates W3C-compliant XML sitemap format",
                "Set change frequency, priority & last modified date",
                "One-click copy or download as sitemap.xml",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                  <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3" style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.46s" }}>
              <a href="#tool" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                Generate My Sitemap <ArrowRight />
              </a>
              <a href="/services/seo" className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                Our SEO Services
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-100" style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.54s" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://placehold.co/32x32/fff7ed/f97316?text=SM" className="w-8 h-8 rounded-full border-2 border-white" alt="SM" />
                  <img src="https://placehold.co/32x32/eff6ff/3b82f6?text=JO" className="w-8 h-8 rounded-full border-2 border-white" alt="JO" />
                  <img src="https://placehold.co/32x32/f0fdf4/22c55e?text=PS" className="w-8 h-8 rounded-full border-2 border-white" alt="PS" />
                  <img src="https://placehold.co/32x32/fdf4ff/a855f7?text=DC" className="w-8 h-8 rounded-full border-2 border-white" alt="DC" />
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => <StarIcon key={i} />)}
                  </div>
                  <p className="text-gray-500 text-xs">80+ brands managed</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">100%</p>
                <p className="text-gray-400 text-xs">Free — no sign-up</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">W3C</p>
                <p className="text-gray-400 text-xs">Compliant output</p>
              </div>
            </div>
          </div>

          {/* Right — visual */}
          <div className="relative hidden lg:block" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(36px)", transition: "all 0.75s ease 0.3s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-50 rounded-3xl transform rotate-2" />
              <div className="relative bg-gray-900 rounded-3xl p-6 shadow-2xl font-mono text-sm leading-relaxed overflow-hidden">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-gray-500 text-xs">sitemap.xml</span>
                </div>
                <div className="text-xs leading-6">
                  <p className="text-blue-400">{"<?"}
                    <span className="text-orange-300">xml</span>
                    {' version="1.0" encoding="UTF-8"?>'}
                  </p>
                  <p className="text-blue-400">{"<"}
                    <span className="text-orange-300">urlset</span>
                    <span className="text-green-300">{' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'}</span>
                    {">"}
                  </p>
                  {[
                    ["https://junixo.com/", "1.0", "monthly"],
                    ["https://junixo.com/about", "0.8", "monthly"],
                    ["https://junixo.com/services", "0.9", "weekly"],
                  ].map(([url, pri, freq]) => (
                    <div key={url} className="ml-2 mt-1">
                      <p className="text-blue-400">{"  <"}<span className="text-orange-300">url</span>{">"}</p>
                      <p className="ml-4 text-gray-300">{"    <"}<span className="text-orange-300">loc</span>{">"}<span className="text-green-300">{url}</span>{"</"}<span className="text-orange-300">loc</span>{">"}</p>
                      <p className="ml-4 text-gray-300">{"    <"}<span className="text-orange-300">priority</span>{">"}<span className="text-amber-300">{pri}</span>{"</"}<span className="text-orange-300">priority</span>{">"}</p>
                      <p className="ml-4 text-gray-300">{"    <"}<span className="text-orange-300">changefreq</span>{">"}<span className="text-amber-300">{freq}</span>{"</"}<span className="text-orange-300">changefreq</span>{">"}</p>
                      <p className="text-blue-400">{"  </"}<span className="text-orange-300">url</span>{">"}</p>
                    </div>
                  ))}
                  <p className="text-blue-400 mt-1">{"</"}<span className="text-orange-300">urlset</span>{">"}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-orange-500"><CheckCircle size={18} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Valid Format</p>
                  <p className="text-gray-900 font-black text-sm leading-none">W3C Compliant</p>
                </div>
              </div>
              <div className="absolute -bottom-4 right-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-green-500"><ZapIcon size={18} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ready In</p>
                  <p className="text-gray-900 font-black text-sm leading-none">Seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CUSTOM SELECT
══════════════════════════════════════════════════════════════ */
function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 font-medium hover:border-orange-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
      >
        <span>{selected?.label ?? value}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
          style={{ animation: "dropIn 0.15s ease" }}
        >
          <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`}</style>
          <div className="max-h-52 overflow-y-auto py-1.5">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                  opt.value === value
                    ? "bg-orange-50 text-orange-600 font-bold"
                    : "text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                <span>{opt.label}</span>
                {opt.value === value && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CUSTOM DATE PICKER
══════════════════════════════════════════════════════════════ */
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function CustomDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const parsed = value ? new Date(value + "T00:00:00") : new Date();
  const [viewYear,  setViewYear]  = useState(parsed.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed.getMonth());
  const selectedDate = value ? new Date(value + "T00:00:00") : null;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const display = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "Select date";

  const firstDay  = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  function selectDay(day: number) {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    onChange(`${viewYear}-${mm}-${dd}`);
    setOpen(false);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  const today = new Date();
  const isSelected = (day: number) =>
    selectedDate &&
    selectedDate.getFullYear() === viewYear &&
    selectedDate.getMonth()    === viewMonth &&
    selectedDate.getDate()     === day;

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth()    === viewMonth &&
    today.getDate()     === day;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 font-medium hover:border-orange-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
      >
        <span className={selectedDate ? "text-gray-700" : "text-gray-400"}>{display}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1.5 left-0 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 w-72"
          style={{ animation: "dropIn 0.15s ease" }}
        >
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-orange-50 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="text-sm font-bold text-gray-800">{MONTHS[viewMonth]} {viewYear}</div>
            <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-orange-50 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((day, i) => (
              <div key={i} className="flex items-center justify-center">
                {day ? (
                  <button
                    type="button"
                    onClick={() => selectDay(day)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected(day)
                        ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                        : isToday(day)
                        ? "border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    {day}
                  </button>
                ) : (
                  <div className="w-8 h-8" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                const t = new Date();
                onChange(`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`);
                setOpen(false);
              }}
              className="text-xs text-orange-500 font-bold hover:text-orange-600 cursor-pointer transition-colors"
            >
              Today
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   XML SYNTAX HIGHLIGHTER
   FIX: Uses word-break / overflow-wrap to prevent horizontal overflow.
   Line content now wraps instead of escaping the container.
══════════════════════════════════════════════════════════════ */
function highlightXMLLine(line: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let rest = line;
  let key  = 0;

  if (/^\s*<\?xml/.test(rest)) {
    parts.push(<span key={key++} className="text-gray-400 italic">{rest}</span>);
    return parts;
  }

  const closing = rest.match(/^(\s*)(<\/)([\w:.-]+)(>)(.*)$/);
  if (closing) {
    const [, indent, open, tag, close, tail] = closing;
    parts.push(<span key={key++}>{indent}</span>);
    parts.push(<span key={key++} className="text-blue-500">{open}</span>);
    parts.push(<span key={key++} className="text-orange-600 font-medium">{tag}</span>);
    parts.push(<span key={key++} className="text-blue-500">{close}</span>);
    if (tail) parts.push(<span key={key++} className="text-gray-400">{tail}</span>);
    return parts;
  }

  const full = rest.match(/^(\s*)(<)([\w:.-]+)((?:\s+[\w:.-]+=["'][^"']*["'])*\s*)(\/?>)(.*?)(<\/[\w:.-]+>)?(.*)$/);
  if (full) {
    const [, indent, lt, tag, attrs, gt, content, closeTag, tail] = full;
    parts.push(<span key={key++}>{indent}</span>);
    parts.push(<span key={key++} className="text-blue-500">{lt}</span>);
    parts.push(<span key={key++} className="text-orange-600 font-medium">{tag}</span>);

    if (attrs) {
      const attrParts = attrs.split(/(\s+[\w:.-]+=["'][^"']*["'])/g);
      attrParts.forEach((a) => {
        if (!a) return;
        const m = a.match(/^(\s+)([\w:.-]+)(=)(["'])(.*)(["'])$/);
        if (m) {
          parts.push(<span key={key++}>{m[1]}</span>);
          parts.push(<span key={key++} className="text-violet-600">{m[2]}</span>);
          parts.push(<span key={key++} className="text-gray-500">{m[3]}</span>);
          parts.push(<span key={key++} className="text-emerald-700">{m[4]}{m[5]}{m[6]}</span>);
        } else {
          parts.push(<span key={key++} className="text-gray-400">{a}</span>);
        }
      });
    }

    parts.push(<span key={key++} className="text-blue-500">{gt}</span>);
    if (content) parts.push(<span key={key++} className="text-gray-800 font-medium">{content}</span>);

    if (closeTag) {
      const ctm = closeTag.match(/(<\/)([\w:.-]+)(>)/);
      if (ctm) {
        parts.push(<span key={key++} className="text-blue-500">{ctm[1]}</span>);
        parts.push(<span key={key++} className="text-orange-600 font-medium">{ctm[2]}</span>);
        parts.push(<span key={key++} className="text-blue-500">{ctm[3]}</span>);
      }
    }
    if (tail) parts.push(<span key={key++} className="text-gray-400">{tail}</span>);
    return parts;
  }

  return <span className="text-gray-500">{rest}</span>;
}

function XMLHighlighter({ xml }: { xml: string }) {
  const lines = xml.split("\n");
  return (
    // FIX: removed minWidth:max-content — let container control width
    <div className="font-mono text-xs leading-6 w-full">
      {lines.map((line, i) => (
        <div key={i} className="flex group hover:bg-orange-50/60 rounded px-1 -mx-1">
          {/* Line number — no longer sticky (causes paint issues on mobile) */}
          <span className="select-none w-8 flex-shrink-0 text-right pr-3 text-gray-300 group-hover:text-gray-400 transition-colors">
            {i + 1}
          </span>
          {/* FIX: break-all ensures long URLs wrap instead of overflowing */}
          <span className="whitespace-pre-wrap break-all min-w-0 flex-1">
            {highlightXMLLine(line)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. TOOL SECTION
══════════════════════════════════════════════════════════════ */
type InputMode = "domain" | "manual";

function ToolSection() {
  const [inputMode, setInputMode] = useState<InputMode>("domain");
  const [domainInput, setDomainInput] = useState("");
  const [urlInput, setURLInput] = useState("");
  const [crawling, setCrawling] = useState(false);
  const [crawlError, setCrawlError] = useState("");
  const [crawledCount, setCrawledCount] = useState(0);

  const [settings, setSettings] = useState<Settings>({
    changefreq: "monthly",
    priority: "0.8",
    includeLastmod: true,
    lastmod: new Date().toISOString().split("T")[0],
  });
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const urlCount = urlInput.split("\n").map((l) => l.trim()).filter(Boolean).length;

  const [crawlSource, setCrawlSource] = useState("");
  const [domainTouched, setDomainTouched] = useState(false);
  const domainIsInvalid = domainTouched && domainInput.trim() !== "" && !validateDomain(domainInput);

  function validateDomain(raw: string): string | null {
    const cleaned = raw.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    const domainRe = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    if (!cleaned || !domainRe.test(cleaned)) return null;
    return cleaned;
  }

  const crawlAbortRef = useRef<AbortController | null>(null);

  async function handleCrawl() {
    if (!domainInput.trim()) return;
    const valid = validateDomain(domainInput);
    if (!valid) {
      setCrawlError("Please enter a valid domain (e.g. junixo.com or https://junixo.com).");
      return;
    }

    crawlAbortRef.current?.abort();
    const controller = new AbortController();
    crawlAbortRef.current = controller;

    setCrawling(true);
    setCrawlError("");
    setCrawledCount(0);
    setCrawlSource("");
    setURLInput("");
    setHasGenerated(false);
    setResult(null);

    try {
      let localCount = 0;
      const { source } = await crawlDomainStream(
        domainInput.trim(),
        200,
        (url) => {
          localCount++;
          setURLInput((prev) => prev ? prev + "\n" + url : url);
          setCrawledCount(localCount);
        },
        (src) => setCrawlSource(src),
        controller.signal,
      );

      if (localCount === 0) {
        setCrawlError("No URLs found. The site may block crawlers or have no sitemap. Try entering URLs manually.");
      } else {
        setCrawlSource(source);
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") return;
      setCrawlError("Failed to reach this domain. Check the URL or try entering URLs manually.");
    } finally {
      setCrawling(false);
    }
  }

  const [mobileTab, setMobileTab] = useState<"input" | "output">("input");

  function handleGenerate() {
    if (!urlInput.trim()) return;
    const res = generateXML(urlInput, settings);
    setResult(res);
    setHasGenerated(true);
    setMobileTab("output");
  }

  function handleCopy() {
    if (!result?.xml) return;
    navigator.clipboard.writeText(result.xml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handleDownload() {
    if (!result?.xml) return;
    const blob = new Blob([result.xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <section id="tool" className="py-4 lg:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-white rounded-3xl border border-orange-100 shadow-xl overflow-hidden">

            {/* Mobile tab bar */}
            <div className="flex lg:hidden border-b border-orange-100">
              <button
                onClick={() => setMobileTab("input")}
                className={`flex-1 py-3.5 text-sm font-bold transition-all border-b-2 ${mobileTab === "input" ? "text-orange-500 border-orange-500 bg-orange-50/30" : "text-gray-400 border-transparent"}`}
              >
                Configure
              </button>
              <button
                onClick={() => setMobileTab("output")}
                className={`flex-1 py-3.5 text-sm font-bold transition-all border-b-2 flex items-center justify-center gap-2 ${mobileTab === "output" ? "text-orange-500 border-orange-500 bg-orange-50/30" : "text-gray-400 border-transparent"}`}
              >
                Output
                {hasGenerated && result && result.validCount > 0 && (
                  <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                    {result.validCount}
                  </span>
                )}
              </button>
            </div>

            <div className="grid lg:grid-cols-2 lg:items-stretch">

              {/* ── LEFT: Input panel ── */}
              <div className={`p-4 sm:p-8 lg:p-10 lg:border-r border-orange-100 ${mobileTab === "output" ? "hidden lg:block" : "block"}`}>

                {/* ─────────────────────────────────────────────────────────
                    MODE TOGGLE — FIXED FOR MOBILE
                    • Icons hidden on mobile (sm:inline-flex)
                    • Text shortened on mobile via responsive spans
                    • Reduced padding on mobile
                ───────────────────────────────────────────────────────── */}
                <div className="flex gap-1.5 mb-6 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => { setInputMode("domain"); setHasGenerated(false); setResult(null); setDomainTouched(false); setCrawlError(""); }}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold py-2 sm:py-2.5 rounded-lg transition-all cursor-pointer ${inputMode === "domain" ? "bg-white text-orange-500 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <span className="hidden sm:inline-flex flex-shrink-0"><GlobeIcon size={15} /></span>
                    Auto-Crawl Domain
                  </button>
                  <button
                    onClick={() => { setInputMode("manual"); setHasGenerated(false); setResult(null); }}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold py-2 sm:py-2.5 rounded-lg transition-all cursor-pointer ${inputMode === "manual" ? "bg-white text-orange-500 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <span className="hidden sm:inline-flex flex-shrink-0"><LinkIcon size={15} /></span>
                    Enter URLs Manually
                  </button>
                </div>

                {/* Domain crawl input */}
                {inputMode === "domain" && (
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Your Domain
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1 min-w-0">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <GlobeIcon size={16} />
                        </span>
                        <input
                          type="text"
                          value={domainInput}
                          onChange={(e) => { setDomainInput(e.target.value); setCrawlError(""); }}
                          onBlur={() => setDomainTouched(true)}
                          onKeyDown={(e) => { if (e.key === "Enter") handleCrawl(); }}
                          placeholder="junixo.com"
                          className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                            domainIsInvalid
                              ? "border-red-400 focus:border-red-400 focus:ring-red-100 bg-red-50"
                              : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                          }`}
                        />
                      </div>
                      <button
                        onClick={handleCrawl}
                        disabled={!domainInput.trim() || crawling || !!domainIsInvalid}
                        className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white font-bold px-3 sm:px-5 py-2.5 rounded-xl transition-all text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                      >
                        {crawling
                          ? <><SpinnerIcon size={13} /><span className="hidden sm:inline">Crawling…</span><span className="sm:hidden">…</span></>
                          : <><SearchIcon size={13} /><span className="hidden sm:inline">Crawl Site</span><span className="sm:hidden">Crawl</span></>
                        }
                      </button>
                    </div>

                    {domainIsInvalid && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-red-400"><AlertIcon size={12} /></span>
                        <p className="text-red-500 text-xs font-medium">Enter a valid domain like <span className="font-bold">junixo.com</span></p>
                      </div>
                    )}
                    {crawlError && (
                      <div className="flex items-start gap-2 mt-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                        <span className="text-red-400 flex-shrink-0 mt-0.5"><AlertIcon size={13} /></span>
                        <p className="text-red-600 text-xs">{crawlError}</p>
                      </div>
                    )}
                    {crawledCount > 0 && !crawlError && (
                      <div className="flex items-center gap-2 mt-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                        <span className="text-green-500"><CheckSmall size={12} /></span>
                        <p className="text-green-700 text-xs font-bold">
                          {crawling ? (
                            <><span className="text-orange-500">{crawledCount}</span> URLs found so far…</>
                          ) : (
                            <>{crawledCount} URLs found{crawlSource && <span className="font-normal text-green-600"> · via {crawlSource}</span>}</>
                          )}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Checks sitemap.xml → robots.txt → full Playwright crawl automatically.
                    </p>
                  </div>
                )}

                {/* URL textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-gray-900 font-black text-base flex items-center gap-2">
                      <span className="w-7 h-7 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center">
                        <LinkIcon size={14} />
                      </span>
                      {inputMode === "domain" ? "Crawled URLs" : "Enter Your URLs"}
                    </h3>
                    <button
                      onClick={() => { setURLInput(""); setHasGenerated(false); setResult(null); setCrawledCount(0); setCrawlSource(""); crawlAbortRef.current?.abort(); setCrawling(false); }}
                      disabled={!urlInput && !crawling}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                    >
                      <XIcon size={11} /> Clear all
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    {inputMode === "domain"
                      ? "Crawled URLs appear here — edit freely before generating."
                      : "One URL per line · Must start with http:// or https://"}
                  </p>

                  <textarea
                    value={urlInput}
                    onChange={(e) => { setURLInput(e.target.value); setHasGenerated(false); }}
                    placeholder={inputMode === "manual" ? "https://example.com/\nhttps://example.com/about\nhttps://example.com/contact" : "Crawled URLs will appear here…"}
                    rows={inputMode === "domain" ? 8 : 10}
                    className="w-full text-sm text-gray-700 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors resize-none font-mono leading-relaxed"
                  />

                  <div className="flex items-center justify-between mt-1.5 mb-5">
                    <p className="text-xs text-gray-400">Invalid URLs are skipped automatically</p>
                    {urlCount > 0 && (
                      <p className="text-xs text-orange-500 font-bold">
                        {urlCount} URL{urlCount !== 1 ? "s" : ""} detected
                      </p>
                    )}
                  </div>
                </div>

                {/* Settings panel */}
                <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5 space-y-4">
                  <h4 className="text-gray-900 font-bold text-sm flex items-center gap-2">
                    <span className="text-orange-400"><SettingsIcon size={15} /></span>
                    Sitemap Settings
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Change Frequency</label>
                      <CustomSelect
                        value={settings.changefreq}
                        onChange={(v) => setSettings((s) => ({ ...s, changefreq: v }))}
                        options={CHANGEFREQ_OPTIONS.map((o) => ({ value: o, label: o.charAt(0).toUpperCase() + o.slice(1) }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Priority</label>
                      <CustomSelect
                        value={settings.priority}
                        onChange={(v) => setSettings((s) => ({ ...s, priority: v }))}
                        options={PRIORITY_OPTIONS.map((o) => ({ value: o, label: o }))}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Include Last Modified Date</label>
                      <button
                        type="button"
                        onClick={() => setSettings((s) => ({ ...s, includeLastmod: !s.includeLastmod }))}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${settings.includeLastmod ? "bg-orange-500" : "bg-gray-200"}`}
                      >
                        <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform" style={{ transform: settings.includeLastmod ? "translateX(18px)" : "translateX(2px)" }} />
                      </button>
                    </div>
                    {settings.includeLastmod && (
                      <CustomDatePicker
                        value={settings.lastmod}
                        onChange={(v) => setSettings((s) => ({ ...s, lastmod: v }))}
                      />
                    )}
                  </div>
                </div>

                <button
                  onClick={() => { handleGenerate(); window.scrollTo({ top: document.getElementById("tool")?.offsetTop ?? 0, behavior: "smooth" }); }}
                  disabled={!urlInput.trim()}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg hover:-translate-y-0.5 disabled:translate-y-0"
                >
                  <ZapIcon size={17} />
                  Generate XML Sitemap
                </button>
              </div>

              {/* ── RIGHT: Output panel ── */}
              {/* FIX: Added min-w-0 and overflow-hidden to prevent panel itself from stretching */}
              <div className={`p-4 sm:p-6 lg:p-10 bg-orange-50/60 flex flex-col lg:border-l border-orange-100 min-w-0 overflow-hidden ${mobileTab === "input" ? "hidden lg:flex" : "flex"}`}>
                {!hasGenerated ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-white border-2 border-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                      <span className="text-orange-300"><CodeIcon size={32} /></span>
                    </div>
                    <h3 className="text-gray-700 font-bold text-base mb-2">Your sitemap will appear here</h3>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-6">
                      {inputMode === "domain"
                        ? <>Crawl your domain, then click <strong className="text-orange-500">Generate XML Sitemap</strong>.</>
                        : <>Paste URLs, adjust settings, then click <strong className="text-orange-500">Generate XML Sitemap</strong>.</>}
                    </p>
                    <button
                      onClick={() => setMobileTab("input")}
                      className="lg:hidden flex items-center gap-2 bg-orange-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                    >
                      ← Go to Configure
                    </button>
                    <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
                      {["Validates each URL automatically", "Instant download as sitemap.xml", "Submit to Google Search Console"].map((tip) => (
                        <div key={tip} className="flex items-center gap-2 text-xs text-gray-500 bg-white rounded-xl px-4 py-2.5 border border-orange-100">
                          <span className="text-orange-400 flex-shrink-0"><CheckSmall size={11} /></span>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 min-w-0">

                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-gray-900 font-black text-base truncate">Generated Sitemap</h3>
                        {result && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            <span className="text-orange-500 font-bold">{result.validCount}</span>{" "}
                            URL{result.validCount !== 1 ? "s" : ""} included
                            {result.invalidURLs.length > 0 && (
                              <span className="text-red-400 ml-2">· {result.invalidURLs.length} skipped</span>
                            )}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button
                          onClick={handleCopy}
                          className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                            copied
                              ? "bg-green-500 text-white border-green-500"
                              : "bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500"
                          }`}
                        >
                          {copied ? <><CheckSmall size={11} /> Copied!</> : <><CopyIcon size={12} /> Copy</>}
                        </button>
                        <button
                          onClick={handleDownload}
                          disabled={!result?.xml}
                          className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <DownloadIcon size={12} /> Download
                        </button>
                      </div>
                    </div>

                    {/* Invalid URLs warning */}
                    {result && result.invalidURLs.length > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-2.5">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5"><AlertIcon size={13} /></span>
                        <p className="text-amber-700 text-xs">
                          <span className="font-bold">{result.invalidURLs.length} URL{result.invalidURLs.length !== 1 ? "s" : ""} skipped</span>
                          {" — "}invalid format (must start with https://)
                        </p>
                      </div>
                    )}

                    {/* No valid URLs */}
                    {result && result.validCount === 0 && (
                      <div className="flex flex-col items-center justify-center text-center py-12">
                        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <span className="text-red-400"><AlertIcon size={22} /></span>
                        </div>
                        <h4 className="text-gray-700 font-bold text-sm mb-1">No valid URLs found</h4>
                        <p className="text-gray-400 text-xs">Ensure each URL starts with <code className="text-orange-500">https://</code></p>
                      </div>
                    )}

                    {/* XML Code Block — FIXED OVERFLOW */}
                    {result && result.validCount > 0 && (
                      <>
                        {/* Chrome bar */}
                        <div className="bg-gray-100 rounded-t-2xl border border-b-0 border-gray-200 px-4 py-2.5 flex items-center gap-3">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                          </div>
                          <span className="text-gray-400 text-xs font-mono flex-1 truncate">sitemap.xml</span>
                          <span className="text-[10px] font-bold text-orange-500 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full flex-shrink-0">
                            {result.validCount} URLs
                          </span>
                        </div>

                        {/* ─────────────────────────────────────────────────
                            CODE AREA — KEY OVERFLOW FIXES:
                            • overflow-x-auto on the scroll container
                            • overflow-wrap: break-word on content
                            • No min-width: max-content on inner div
                            • whitespace-pre-wrap + break-all on line spans
                        ───────────────────────────────────────────────── */}
                        <style>{`
                          .xml-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
                          .xml-scroll::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 3px; }
                          .xml-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
                          .xml-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
                        `}</style>
                        <div
                          className="xml-scroll overflow-x-auto overflow-y-auto rounded-b-2xl border border-gray-200 bg-white w-full"
                          style={{ height: "clamp(300px, 50vh, 480px)" }}
                        >
                          <div className="p-4 sm:p-5 w-full">
                            <XMLHighlighter xml={result.xml} />
                          </div>
                        </div>

                        {/* Footer hint */}
                        <div className="flex items-start gap-2 bg-white rounded-xl border border-orange-100 px-4 py-3">
                          <span className="text-orange-400 flex-shrink-0 mt-0.5"><InfoIcon size={13} /></span>
                          <p className="text-gray-500 text-xs leading-relaxed">
                            Upload <code className="bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded text-orange-500 text-[11px]">sitemap.xml</code> to your website root, then submit the URL to{" "}
                            <span className="font-semibold text-gray-700">Google Search Console</span> to help Google index your pages faster.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. FEATURES SECTION
══════════════════════════════════════════════════════════════ */
const features = [
  {
    icon: <GlobeIcon size={22} />,
    color: "bg-orange-100 text-orange-500",
    title: "Auto-Crawl Your Domain",
    desc: "Just enter your domain and we'll fetch your sitemap.xml, sitemap_index.xml, or robots.txt to pull all URLs automatically — no manual pasting needed.",
  },
  {
    icon: <ShieldCheckIcon size={22} />,
    color: "bg-green-100 text-green-600",
    title: "Auto URL Validation",
    desc: "Every URL is validated automatically. Invalid entries are flagged and skipped so your sitemap is always clean and correct.",
  },
  {
    icon: <SettingsIcon size={22} />,
    color: "bg-blue-100 text-blue-600",
    title: "Full Configuration",
    desc: "Control change frequency, priority (0.0–1.0) and last modified date globally across all your URLs with a single click.",
  },
  {
    icon: <BarChartIcon size={22} />,
    color: "bg-purple-100 text-purple-600",
    title: "SEO Best Practices",
    desc: "Output follows the official sitemaps.org protocol. Accepted by Google, Bing, and every major search engine out of the box.",
  },
  {
    icon: <DownloadIcon size={22} />,
    color: "bg-pink-100 text-pink-600",
    title: "Copy or Download",
    desc: "One-click copy to clipboard or download as sitemap.xml — ready to upload to your website root and submit to Search Console.",
  },
  {
    icon: <TargetIcon size={22} />,
    color: "bg-amber-100 text-amber-600",
    title: "100% Free — Always",
    desc: "No account, no watermarks, no limits on URL count. Just paste, configure, generate and go — completely free forever.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Why Use This Tool</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Everything You Need to <span className="text-orange-500">Index Faster</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            A sitemap helps search engines discover your pages. This tool makes creating one take seconds, not hours.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 60}>
              <div className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>{f.icon}</div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. HOW IT WORKS
══════════════════════════════════════════════════════════════ */
const steps = [
  {
    num: "01",
    icon: <GlobeIcon size={20} />,
    title: "Enter Your Domain",
    desc: "Type your domain (e.g. junixo.com) and click Crawl Site. We'll automatically fetch all URLs from your sitemap.xml or robots.txt.",
  },
  {
    num: "02",
    icon: <SettingsIcon size={20} />,
    title: "Configure Settings",
    desc: "Choose a default change frequency (daily, weekly, monthly) and priority (0.0–1.0). Optionally include a last modified date for all URLs.",
  },
  {
    num: "03",
    icon: <ZapIcon size={20} />,
    title: "Generate Your Sitemap",
    desc: "Click Generate. Invalid URLs are automatically filtered out. Your W3C-compliant XML sitemap is created instantly with a live preview.",
  },
  {
    num: "04",
    icon: <SearchIcon size={20} />,
    title: "Submit to Google",
    desc: "Download sitemap.xml, upload it to your website root (e.g. yourdomain.com/sitemap.xml), then submit the URL in Google Search Console.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">How It Works</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            From Domain to Indexed in <span className="text-orange-500">4 Simple Steps</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">Generate and submit your sitemap in under 5 minutes.</p>
        </FadeIn>

        <FadeIn>
          <div className="hidden lg:grid grid-cols-4 gap-0 relative mb-4">
            <div className="absolute top-10 left-[12%] right-[12%] h-0.5 bg-orange-100" />
            {steps.map((step) => (
              <div key={step.num} className="relative flex flex-col items-center text-center px-6 group">
                <div className="relative z-10 w-20 h-20 rounded-full bg-white border-2 border-orange-100 group-hover:border-orange-500 group-hover:bg-orange-500 flex flex-col items-center justify-center mb-5 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-200">
                  <span className="text-orange-400 group-hover:text-white transition-colors">{step.icon}</span>
                  <span className="text-[9px] font-black text-orange-300 group-hover:text-orange-100 tracking-widest transition-colors">{step.num}</span>
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-2 leading-tight">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 70}>
              <div className="flex gap-4 bg-white rounded-2xl p-5 border border-orange-100 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-200">{step.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-orange-400 text-[10px] font-black tracking-widest">{step.num}</span>
                    <h3 className="text-gray-900 font-bold text-sm">{step.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. WHAT IS A SITEMAP
══════════════════════════════════════════════════════════════ */
function WhatIsSection() {
  const rows = [
    { icon: <SearchIcon size={22} />, color: "bg-blue-100 text-blue-600", title: "Helps Search Engines Discover Pages", desc: "A sitemap tells Google and Bing every URL on your site — especially useful for large sites, new pages, or pages that aren't linked from anywhere else." },
    { icon: <ClockIcon size={22} />, color: "bg-orange-100 text-orange-500", title: "Speeds Up Indexing", desc: "When you update content or publish new pages, submitting a sitemap signals to search engines to re-crawl your site faster — reducing the lag before it appears in search results." },
    { icon: <BarChartIcon size={22} />, color: "bg-purple-100 text-purple-600", title: "Supports SEO Priority Signals", desc: "Priority and change frequency tags give hints to crawlers about which pages matter most and how often to revisit them — giving you a small but meaningful SEO edge." },
    { icon: <ShieldCheckIcon size={22} />, color: "bg-green-100 text-green-600", title: "Essential for New or Large Sites", desc: "New websites lack backlinks, making it hard for crawlers to find all pages. A sitemap is the fastest way to get every page in front of search engines from day one." },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-4">What Is an XML Sitemap?</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Why Every Website <span className="text-orange-500">Needs One</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              An XML sitemap is a file that lists every important page on your website, along with metadata about each page — like when it was last updated, how often it changes, and its priority relative to other pages. Search engines use this file as a roadmap to find and index your content faster and more completely.
            </p>
            <a href="#tool" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-md shadow-orange-200 hover:-translate-y-0.5 text-sm">
              Generate Mine Now <ArrowRight />
            </a>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rows.map((row, i) => (
              <FadeIn key={row.title} delay={i * 70}>
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 p-5 hover:shadow-md transition-all duration-300 h-full">
                  <div className={`w-10 h-10 rounded-xl ${row.color} flex items-center justify-center mb-3`}>{row.icon}</div>
                  <h3 className="text-gray-900 font-bold text-sm mb-1.5">{row.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{row.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. FAQ
══════════════════════════════════════════════════════════════ */
const faqs = [
  { q: "How does the auto-crawl feature work?", a: "When you enter your domain, the tool checks your sitemap.xml, sitemap_index.xml, and robots.txt in that order to extract all listed URLs. If none of those files are found, it scrapes internal links from your homepage as a fallback. Note: some sites block external crawlers, so manual input is always available as a fallback." },
  { q: "How many URLs can I add to a sitemap?", a: "The official sitemaps.org specification allows up to 50,000 URLs per sitemap file and up to 50MB uncompressed. For sites larger than 50,000 URLs, you'd split them into multiple sitemap files and reference them in a sitemap index file." },
  { q: "What should I set the priority to?", a: "Priority is relative to other pages on your site, not globally. Your homepage typically gets 1.0, key service or product pages 0.8–0.9, blog articles 0.6–0.7, and less important pages 0.3–0.5. Most search engines treat all values equally, but it's good practice." },
  { q: "What change frequency should I choose?", a: "Use 'daily' for homepages and frequently updated content like blogs, 'weekly' for service or product pages, 'monthly' for static pages, and 'yearly' for pages that rarely change. Search engines treat this as a hint, not a strict instruction." },
  { q: "Where do I upload my sitemap.xml file?", a: "Upload sitemap.xml to the root of your website — i.e. yourdomain.com/sitemap.xml. Then declare it in your robots.txt file by adding 'Sitemap: https://yourdomain.com/sitemap.xml' and submit it in Google Search Console under Sitemaps." },
  { q: "Does this tool work with dynamic websites?", a: "Yes — you can paste URLs from any source, whether they're from a static site, a CMS like WordPress, or a dynamic web app. Just ensure all URLs are absolute (starting with https://) and point to publicly accessible pages." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 lg:py-24 bg-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
            Sitemap <span className="text-orange-500">Questions Answered</span>
          </h2>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 space-y-3 shadow-sm">
            {faqs.map((faq, i) => (
              <div key={i} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? "border-orange-300 bg-orange-50" : "border-gray-100 bg-white"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} className="cursor-pointer w-full flex items-center justify-between px-6 py-4 text-left gap-4">
                  <span className="text-gray-900 font-bold text-sm sm:text-base">{faq.q}</span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open === i ? "bg-orange-500 text-white rotate-45" : "bg-orange-100 text-orange-500"}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-48 pb-5" : "max-h-0"}`}>
                  <p className="px-6 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. CTA BANNER
══════════════════════════════════════════════════════════════ */
function CTABanner() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl px-8 sm:px-12 lg:px-16 py-14 lg:py-16 text-center shadow-2xl shadow-orange-200">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full" style={{ transform: "translate(30%,-30%)" }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white opacity-5 rounded-full" style={{ transform: "translate(-25%,25%)" }} />
            <div className="relative">
              <span className="inline-block text-orange-100 text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full mb-5 border border-white/20">Need Help With SEO?</span>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                A Sitemap Is Just the Start.<br className="hidden sm:block" />
                Let's Build Your Full <span className="text-orange-200">SEO Strategy.</span>
              </h2>
              <p className="text-orange-100 text-base leading-relaxed max-w-xl mx-auto mb-8">
                Our SEO team handles everything from technical audits and on-page optimisation to content strategy and link building — turning organic search into your biggest growth channel.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:-translate-y-0.5">
                  Get a Free SEO Audit <ArrowRight />
                </a>
                <a href="/services/seo" className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                  View SEO Services
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════════════ */
export default function XMLSitemapGeneratorClient() {
  return (
    <main>
      <Hero />
      <ToolSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhatIsSection />
      <FAQSection />
      <CTABanner />
    </main>
  );
}