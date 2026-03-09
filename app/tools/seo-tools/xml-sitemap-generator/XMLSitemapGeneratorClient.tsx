"use client";
import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   HOOKS (same pattern as design system)
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

/* ══════════════════════════════════════════════════════════════
   CONSTANTS & TYPES
══════════════════════════════════════════════════════════════ */
const CHANGEFREQ_OPTIONS = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
];

const PRIORITY_OPTIONS = [
  "1.0",
  "0.9",
  "0.8",
  "0.7",
  "0.6",
  "0.5",
  "0.4",
  "0.3",
  "0.2",
  "0.1",
  "0.0",
];

const SAMPLE_URLS = `https://junixo.com/
https://junixo.com/about
https://junixo.com/services
https://junixo.com/services/seo
https://junixo.com/services/web-design
https://junixo.com/blog
https://junixo.com/blog/how-to-rank-on-google
https://junixo.com/contact`;

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
  const lines = rawInput
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const validURLs: string[] = [];
  const invalidURLs: string[] = [];

  lines.forEach((line) => {
    if (isValidURL(line)) {
      validURLs.push(line.trim());
    } else {
      invalidURLs.push(line);
    }
  });

  if (validURLs.length === 0) {
    return { xml: "", validCount: 0, invalidURLs };
  }

  const today = new Date().toISOString().split("T")[0];
  const lastmodDate = settings.lastmod || today;

  const urlEntries = validURLs
    .map((url) => {
      let entry = `  <url>\n    <loc>${escapeXML(url)}</loc>\n`;
      if (settings.includeLastmod) {
        entry += `    <lastmod>${lastmodDate}</lastmod>\n`;
      }
      entry += `    <changefreq>${settings.changefreq}</changefreq>\n`;
      entry += `    <priority>${settings.priority}</priority>\n`;
      entry += `  </url>`;
      return entry;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;

  return { xml, validCount: validURLs.length, invalidURLs };
}

/* ══════════════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-16 lg:pt-20 lg:pb-20">
      {/* BG blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full opacity-70"
          style={{ transform: "translate(30%,-30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-pink-50 rounded-full opacity-50"
          style={{ transform: "translate(-25%,25%)" }}
        />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-200 opacity-25"
            style={{
              width: [5, 8, 4, 6, 3][i],
              height: [5, 8, 4, 6, 3][i],
              top: ["18%", "70%", "40%", "82%", "28%"][i],
              left: ["8%", "5%", "90%", "72%", "95%"][i],
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-sm text-gray-400 mb-10"
          style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}
        >
          <a href="/" className="hover:text-orange-500 transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/tools" className="hover:text-orange-500 transition-colors">
            Free Tools
          </a>
          <span>/</span>
          <span className="text-gray-700 font-medium">XML Sitemap Generator</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.5s ease 0.15s",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">
                Free SEO Tool
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[52px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.55s ease 0.2s",
              }}
            >
              Free XML{" "}
              <span className="relative inline-block text-orange-500">
                Sitemap Generator
              </span>
            </h1>

            <p
              className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.55s ease 0.3s",
              }}
            >
              Paste your URLs, configure change frequency and priority, and
              generate a valid XML sitemap in seconds — ready to submit to
              Google Search Console. No sign-up required.
            </p>

            <ul
              className="space-y-3 mb-9"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.55s ease 0.38s",
              }}
            >
              {[
                "Generates W3C-compliant XML sitemap format",
                "Set change frequency, priority & last modified date",
                "Validates URLs — skips invalid entries automatically",
                "One-click copy or download as sitemap.xml",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-gray-700 font-medium text-sm"
                >
                  <span className="text-orange-500 flex-shrink-0">
                    <CheckCircle />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="flex flex-wrap gap-3"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "all 0.55s ease 0.46s",
              }}
            >
              <a
                href="#tool"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5"
              >
                Generate My Sitemap <ArrowRight />
              </a>
              <a
                href="/services/seo"
                className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              >
                Our SEO Services
              </a>
            </div>

            {/* Trust row */}
            <div
              className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-100"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "all 0.55s ease 0.54s",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-gray-500 text-xs">Trusted by 80+ brands</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">
                  100%
                </p>
                <p className="text-gray-400 text-xs">Free — no sign-up</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">
                  W3C
                </p>
                <p className="text-gray-400 text-xs">Compliant output</p>
              </div>
            </div>
          </div>

          {/* Right — visual */}
          <div
            className="relative hidden lg:block"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(36px)",
              transition: "all 0.75s ease 0.3s",
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-50 rounded-3xl transform rotate-2" />
              {/* Code preview card */}
              <div className="relative bg-gray-900 rounded-3xl p-6 shadow-2xl font-mono text-sm leading-relaxed overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-gray-500 text-xs">sitemap.xml</span>
                </div>
                <div className="text-xs leading-6">
                  <p className="text-blue-400">
                    {"<?"}
                    <span className="text-orange-300">xml</span>
                    {' version="1.0" encoding="UTF-8"?>'}
                  </p>
                  <p className="text-blue-400">
                    {"<"}
                    <span className="text-orange-300">urlset</span>
                    <span className="text-green-300">
                      {' xmlns="http://www.sitemaps.org'}
                    </span>
                    <span className="text-green-300">{'/schemas/sitemap/0.9"'}</span>
                    {">"}
                  </p>
                  {[
                    ["https://junixo.com/", "1.0", "monthly"],
                    ["https://junixo.com/about", "0.8", "monthly"],
                    ["https://junixo.com/services", "0.9", "weekly"],
                  ].map(([url, pri, freq]) => (
                    <div key={url} className="ml-2 mt-1">
                      <p className="text-blue-400">
                        {"  <"}
                        <span className="text-orange-300">url</span>
                        {">"}
                      </p>
                      <p className="ml-4 text-gray-300">
                        {"    <"}
                        <span className="text-orange-300">loc</span>
                        {">"}
                        <span className="text-green-300">{url}</span>
                        {"</"}
                        <span className="text-orange-300">loc</span>
                        {">"}
                      </p>
                      <p className="ml-4 text-gray-300">
                        {"    <"}
                        <span className="text-orange-300">priority</span>
                        {">"}
                        <span className="text-amber-300">{pri}</span>
                        {"</"}
                        <span className="text-orange-300">priority</span>
                        {">"}
                      </p>
                      <p className="ml-4 text-gray-300">
                        {"    <"}
                        <span className="text-orange-300">changefreq</span>
                        {">"}
                        <span className="text-amber-300">{freq}</span>
                        {"</"}
                        <span className="text-orange-300">changefreq</span>
                        {">"}
                      </p>
                      <p className="text-blue-400">
                        {"  </"}
                        <span className="text-orange-300">url</span>
                        {">"}
                      </p>
                    </div>
                  ))}
                  <p className="text-blue-400 mt-1">
                    {"</"}
                    <span className="text-orange-300">urlset</span>
                    {">"}
                  </p>
                </div>
                {/* Gradient fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-orange-500">
                  <CheckCircle size={18} />
                </span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Valid Format
                  </p>
                  <p className="text-gray-900 font-black text-sm leading-none">
                    W3C Compliant
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 right-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-green-500">
                  <ZapIcon size={18} />
                </span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Ready In
                  </p>
                  <p className="text-gray-900 font-black text-sm leading-none">
                    Seconds
                  </p>
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
   2. TOOL SECTION
══════════════════════════════════════════════════════════════ */
function ToolSection() {
  const [urlInput, setURLInput] = useState("");
  const [settings, setSettings] = useState<Settings>({
    changefreq: "monthly",
    priority: "0.8",
    includeLastmod: true,
    lastmod: new Date().toISOString().split("T")[0],
  });
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const urlCount = urlInput
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean).length;

  function handleGenerate() {
    if (!urlInput.trim()) return;
    const res = generateXML(urlInput, settings);
    setResult(res);
    setHasGenerated(true);
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

  function handleLoadSample() {
    setURLInput(SAMPLE_URLS);
    setHasGenerated(false);
    setResult(null);
  }

  function handleClear() {
    setURLInput("");
    setHasGenerated(false);
    setResult(null);
  }

  const selectCls =
    "w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors";

  return (
    <section id="tool" className="py-4 lg:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-white rounded-3xl border border-orange-100 shadow-xl overflow-visible">
            <div className="grid lg:grid-cols-2">
              {/* ── LEFT: Input panel ── */}
              <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-orange-100">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-gray-900 font-black text-lg flex items-center gap-2">
                    <span className="w-7 h-7 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center">
                      <LinkIcon size={14} />
                    </span>
                    Enter Your URLs
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleLoadSample}
                      className="text-xs text-orange-500 font-bold border border-orange-200 bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      Load Example
                    </button>
                    {urlInput && (
                      <button
                        onClick={handleClear}
                        className="text-xs text-gray-500 font-bold border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-3">
                  One URL per line · Must start with http:// or https://
                </p>

                <textarea
                  value={urlInput}
                  onChange={(e) => {
                    setURLInput(e.target.value);
                    setHasGenerated(false);
                  }}
                  placeholder={
                    "https://junixo.com/\nhttps://junixo.com/about\nhttps://junixo.com/services\nhttps://junixo.com/contact"
                  }
                  rows={10}
                  className="w-full text-sm text-gray-700 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors resize-none font-mono leading-relaxed"
                />

                <div className="flex items-center justify-between mt-1.5 mb-6">
                  <p className="text-xs text-gray-400">
                    Invalid URLs are skipped automatically
                  </p>
                  {urlCount > 0 && (
                    <p className="text-xs text-orange-500 font-bold">
                      {urlCount} URL{urlCount !== 1 ? "s" : ""} detected
                    </p>
                  )}
                </div>

                {/* Settings panel */}
                <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5 space-y-4">
                  <h4 className="text-gray-900 font-bold text-sm flex items-center gap-2">
                    <span className="text-orange-400">
                      <SettingsIcon size={15} />
                    </span>
                    Sitemap Settings
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Change Frequency
                      </label>
                      <select
                        value={settings.changefreq}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            changefreq: e.target.value,
                          }))
                        }
                        className={selectCls}
                      >
                        {CHANGEFREQ_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Priority
                      </label>
                      <select
                        value={settings.priority}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            priority: e.target.value,
                          }))
                        }
                        className={selectCls}
                      >
                        {PRIORITY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Include lastmod toggle */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Include Last Modified Date
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setSettings((s) => ({
                            ...s,
                            includeLastmod: !s.includeLastmod,
                          }))
                        }
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          settings.includeLastmod
                            ? "bg-orange-500"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
                          style={{
                            transform: settings.includeLastmod
                              ? "translateX(18px)"
                              : "translateX(2px)",
                          }}
                        />
                      </button>
                    </div>
                    {settings.includeLastmod && (
                      <input
                        type="date"
                        value={settings.lastmod}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            lastmod: e.target.value,
                          }))
                        }
                        className={selectCls}
                      />
                    )}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!urlInput.trim()}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg hover:-translate-y-0.5 disabled:translate-y-0"
                >
                  <ZapIcon size={17} />
                  Generate XML Sitemap
                </button>
              </div>

              {/* ── RIGHT: Output panel ── */}
              <div className="p-8 sm:p-10 bg-orange-50 flex flex-col min-h-[560px]">
                {!hasGenerated ? (
                  /* Empty state */
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                    <div className="w-20 h-20 bg-white border-2 border-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                      <span className="text-orange-300">
                        <CodeIcon size={32} />
                      </span>
                    </div>
                    <h3 className="text-gray-700 font-bold text-base mb-2">
                      Your sitemap will appear here
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                      Paste your URLs on the left, adjust settings, then click{" "}
                      <strong className="text-orange-500">
                        Generate XML Sitemap
                      </strong>
                      .
                    </p>
                    <div className="mt-8 flex flex-col gap-2 w-full max-w-xs">
                      {[
                        "Validates each URL automatically",
                        "Instant download as sitemap.xml",
                        "Submit to Google Search Console",
                      ].map((tip) => (
                        <div
                          key={tip}
                          className="flex items-center gap-2 text-xs text-gray-500 bg-white rounded-xl px-4 py-2.5 border border-orange-100"
                        >
                          <span className="text-orange-400 flex-shrink-0">
                            <CheckSmall size={11} />
                          </span>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Result state */
                  <div className="flex flex-col h-full">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-4 gap-3">
                      <div>
                        <h3 className="text-gray-900 font-black text-base">
                          Generated Sitemap
                        </h3>
                        {result && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            <span className="text-orange-500 font-bold">
                              {result.validCount}
                            </span>{" "}
                            URL{result.validCount !== 1 ? "s" : ""} included
                            {result.invalidURLs.length > 0 && (
                              <span className="text-red-400 ml-2">
                                · {result.invalidURLs.length} invalid skipped
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={handleCopy}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                            copied
                              ? "bg-green-500 text-white border-green-500"
                              : "bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-500"
                          }`}
                        >
                          {copied ? (
                            <>
                              <CheckSmall size={11} /> Copied!
                            </>
                          ) : (
                            <>
                              <CopyIcon size={13} /> Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleDownload}
                          disabled={!result?.xml}
                          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all disabled:opacity-40"
                        >
                          <DownloadIcon size={13} /> Download
                        </button>
                      </div>
                    </div>

                    {/* Invalid URLs warning */}
                    {result && result.invalidURLs.length > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex gap-2.5">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5">
                          <AlertIcon size={14} />
                        </span>
                        <div>
                          <p className="text-amber-700 text-xs font-bold mb-1">
                            {result.invalidURLs.length} URL
                            {result.invalidURLs.length !== 1 ? "s" : ""} skipped
                            (invalid format):
                          </p>
                          <ul className="text-amber-600 text-xs space-y-0.5">
                            {result.invalidURLs.slice(0, 4).map((err, i) => (
                              <li key={i} className="font-mono truncate">
                                {err}
                              </li>
                            ))}
                            {result.invalidURLs.length > 4 && (
                              <li>...and {result.invalidURLs.length - 4} more</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* No valid URLs */}
                    {result && result.validCount === 0 && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <span className="text-red-400">
                            <AlertIcon size={24} />
                          </span>
                        </div>
                        <h4 className="text-gray-700 font-bold text-sm mb-1">
                          No valid URLs found
                        </h4>
                        <p className="text-gray-400 text-xs max-w-[220px]">
                          Ensure each URL starts with{" "}
                          <code className="bg-white px-1 py-0.5 rounded text-gray-600">
                            https://
                          </code>
                        </p>
                      </div>
                    )}

                    {/* XML output */}
                    {result && result.validCount > 0 && (
                      <>
                        <div className="flex-1 relative">
                          <pre className="h-full min-h-[280px] max-h-[360px] overflow-auto bg-gray-900 text-green-300 text-xs font-mono rounded-2xl p-5 leading-relaxed whitespace-pre scrollbar-thin">
                            {result.xml}
                          </pre>
                        </div>

                        {/* Footer hint */}
                        <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-white rounded-xl px-4 py-3 border border-orange-100">
                          <span className="text-orange-400 flex-shrink-0 mt-0.5">
                            <InfoIcon size={13} />
                          </span>
                          <p>
                            Upload{" "}
                            <code className="bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded text-orange-600 text-[11px]">
                              sitemap.xml
                            </code>{" "}
                            to your website root, then submit the URL to{" "}
                            <span className="font-semibold text-gray-700">
                              Google Search Console
                            </span>{" "}
                            to help Google index your pages faster.
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
    icon: <ZapIcon size={22} />,
    color: "bg-orange-100 text-orange-500",
    title: "Instant Generation",
    desc: "Paste hundreds of URLs and get a valid, download-ready XML sitemap in under a second — no waiting, no server calls.",
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
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">
            Why Use This Tool
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Everything You Need to{" "}
            <span className="text-orange-500">Index Faster</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            A sitemap helps search engines discover your pages. This tool makes
            creating one take seconds, not hours.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 60}>
              <div className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div
                  className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  {f.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. HOW TO USE — Process steps
══════════════════════════════════════════════════════════════ */
const steps = [
  {
    num: "01",
    icon: <LinkIcon size={20} />,
    title: "Paste Your URLs",
    desc: "Enter your page URLs — one per line — directly into the input box. You can paste from a spreadsheet, crawl export, or type them manually.",
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
    icon: <GlobeIcon size={20} />,
    title: "Submit to Google",
    desc: "Download sitemap.xml, upload it to your website root (e.g. yourdomain.com/sitemap.xml), then submit the URL in Google Search Console.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">
            How It Works
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            From URLs to Indexed in{" "}
            <span className="text-orange-500">4 Simple Steps</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">
            Generate and submit your sitemap in under 5 minutes.
          </p>
        </FadeIn>

        {/* Desktop horizontal */}
        <FadeIn>
          <div className="hidden lg:grid grid-cols-4 gap-0 relative mb-4">
            <div className="absolute top-10 left-[12%] right-[12%] h-0.5 bg-orange-100" />
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center px-6 group"
              >
                <div className="relative z-10 w-20 h-20 rounded-full bg-white border-2 border-orange-100 group-hover:border-orange-500 group-hover:bg-orange-500 flex flex-col items-center justify-center mb-5 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-200">
                  <span className="text-orange-400 group-hover:text-white transition-colors">
                    {step.icon}
                  </span>
                  <span className="text-[9px] font-black text-orange-300 group-hover:text-orange-100 tracking-widest transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Mobile vertical */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 70}>
              <div className="flex gap-4 bg-white rounded-2xl p-5 border border-orange-100 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-200">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-orange-400 text-[10px] font-black tracking-widest">
                      {step.num}
                    </span>
                    <h3 className="text-gray-900 font-bold text-sm">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {step.desc}
                  </p>
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
   5. WHAT IS A SITEMAP — Educational section
══════════════════════════════════════════════════════════════ */
function WhatIsSection() {
  const rows = [
    {
      icon: <SearchIcon size={22} />,
      color: "bg-blue-100 text-blue-600",
      title: "Helps Search Engines Discover Pages",
      desc: "A sitemap tells Google and Bing every URL on your site — especially useful for large sites, new pages, or pages that aren't linked from anywhere else.",
    },
    {
      icon: <ClockIcon size={22} />,
      color: "bg-orange-100 text-orange-500",
      title: "Speeds Up Indexing",
      desc: "When you update content or publish new pages, submitting a sitemap signals to search engines to re-crawl your site faster — reducing the lag before it appears in search results.",
    },
    {
      icon: <BarChartIcon size={22} />,
      color: "bg-purple-100 text-purple-600",
      title: "Supports SEO Priority Signals",
      desc: "Priority and change frequency tags give hints to crawlers about which pages matter most and how often to revisit them — giving you a small but meaningful SEO edge.",
    },
    {
      icon: <ShieldCheckIcon size={22} />,
      color: "bg-green-100 text-green-600",
      title: "Essential for New or Large Sites",
      desc: "New websites lack backlinks, making it hard for crawlers to find all pages. A sitemap is the fastest way to get every page in front of search engines from day one.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-4">
              What Is an XML Sitemap?
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Why Every Website{" "}
              <span className="text-orange-500">Needs One</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              An XML sitemap is a file that lists every important page on your
              website, along with metadata about each page — like when it was
              last updated, how often it changes, and its priority relative to
              other pages. Search engines use this file as a roadmap to find and
              index your content faster and more completely.
            </p>
            <a
              href="#tool"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-md shadow-orange-200 hover:-translate-y-0.5 text-sm"
            >
              Generate Mine Now <ArrowRight />
            </a>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rows.map((row, i) => (
              <FadeIn key={row.title} delay={i * 70}>
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 p-5 hover:shadow-md transition-all duration-300 h-full">
                  <div
                    className={`w-10 h-10 rounded-xl ${row.color} flex items-center justify-center mb-3`}
                  >
                    {row.icon}
                  </div>
                  <h3 className="text-gray-900 font-bold text-sm mb-1.5">
                    {row.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {row.desc}
                  </p>
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
  {
    q: "How many URLs can I add to a sitemap?",
    a: "The official sitemaps.org specification allows up to 50,000 URLs per sitemap file and up to 50MB uncompressed. For sites larger than 50,000 URLs, you'd split them into multiple sitemap files and reference them in a sitemap index file.",
  },
  {
    q: "What should I set the priority to?",
    a: "Priority is relative to other pages on your site, not globally. Your homepage typically gets 1.0, key service or product pages 0.8–0.9, blog articles 0.6–0.7, and less important pages 0.3–0.5. Most search engines treat all values equally, but it's good practice.",
  },
  {
    q: "What change frequency should I choose?",
    a: "Use 'daily' for homepages and frequently updated content like blogs, 'weekly' for service or product pages, 'monthly' for static pages, and 'yearly' for pages that rarely change. Search engines treat this as a hint, not a strict instruction.",
  },
  {
    q: "Where do I upload my sitemap.xml file?",
    a: "Upload sitemap.xml to the root of your website — i.e. yourdomain.com/sitemap.xml. Then declare it in your robots.txt file by adding 'Sitemap: https://yourdomain.com/sitemap.xml' and submit it in Google Search Console under Sitemaps.",
  },
  {
    q: "Do I need a sitemap if my site is small?",
    a: "Even small sites benefit from a sitemap. For brand-new websites with few backlinks, it's especially important — it's often the fastest way to get all your pages indexed by Google rather than waiting for crawlers to discover them naturally.",
  },
  {
    q: "Does this tool work with dynamic websites?",
    a: "Yes — you can paste URLs from any source, whether they're from a static site, a CMS like WordPress, or a dynamic web app. Just ensure all URLs are absolute (starting with https://) and point to publicly accessible pages.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-24 bg-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">
            FAQ
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
            Sitemap{" "}
            <span className="text-orange-500">Questions Answered</span>
          </h2>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 space-y-3 shadow-sm">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  open === i
                    ? "border-orange-300 bg-orange-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="cursor-pointer w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                >
                  <span className="text-gray-900 font-bold text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      open === i
                        ? "bg-orange-500 text-white rotate-45"
                        : "bg-orange-100 text-orange-500"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="px-6 text-gray-500 text-sm leading-relaxed">
                    {faq.a}
                  </p>
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
            {/* BG circles */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full"
              style={{ transform: "translate(30%,-30%)" }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white opacity-5 rounded-full"
              style={{ transform: "translate(-25%,25%)" }} />

            <div className="relative">
              <span className="inline-block text-orange-100 text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full mb-5 border border-white/20">
                Need Help With SEO?
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                A Sitemap Is Just the Start.
                <br className="hidden sm:block" />
                Let's Build Your Full{" "}
                <span className="text-orange-200">SEO Strategy.</span>
              </h2>
              <p className="text-orange-100 text-base leading-relaxed max-w-xl mx-auto mb-8">
                Our SEO team handles everything from technical audits and
                on-page optimisation to content strategy and link building —
                turning organic search into your biggest growth channel.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="/get-a-quote"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:-translate-y-0.5"
                >
                  Get a Free SEO Audit <ArrowRight />
                </a>
                <a
                  href="/services/seo"
                  className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                >
                  View SEO Services
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-5 mt-10 pt-8 border-t border-white/20">
                {[
                  { val: "80+", label: "Brands we work with" },
                  { val: "340%", label: "Avg organic traffic growth" },
                  { val: "No", label: "Long-term contracts" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-white font-black text-xl leading-none">
                      {s.val}
                    </p>
                    <p className="text-orange-200 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
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