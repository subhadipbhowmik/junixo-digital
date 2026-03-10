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
const PlusIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TrashIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const XIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ShieldCheckIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const SearchIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const GlobeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const SettingsIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
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
const ClockIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const RobotIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
interface RuleEntry {
  id: string;
  userAgent: string;
  disallowPaths: string[];
  allowPaths: string[];
  crawlDelay: string;
}

interface RobotsConfig {
  rules: RuleEntry[];
  sitemapUrls: string[];
}

/* ══════════════════════════════════════════════════════════════
   PRESETS
══════════════════════════════════════════════════════════════ */
const PRESETS: { label: string; description: string; config: RobotsConfig }[] = [
  {
    label: "Allow All",
    description: "All bots can crawl everything",
    config: {
      rules: [{ id: "1", userAgent: "*", disallowPaths: [], allowPaths: ["/"], crawlDelay: "" }],
      sitemapUrls: [],
    },
  },
  {
    label: "Block All",
    description: "No bots can crawl anything",
    config: {
      rules: [{ id: "1", userAgent: "*", disallowPaths: ["/"], allowPaths: [], crawlDelay: "" }],
      sitemapUrls: [],
    },
  },
  {
    label: "Standard SEO",
    description: "Allow all, block admin & private areas",
    config: {
      rules: [
        {
          id: "1",
          userAgent: "*",
          disallowPaths: ["/admin/", "/private/", "/api/", "/*.json$", "/wp-admin/"],
          allowPaths: ["/"],
          crawlDelay: "",
        },
      ],
      sitemapUrls: [],
    },
  },
  {
    label: "WordPress",
    description: "Optimised for WordPress sites",
    config: {
      rules: [
        {
          id: "1",
          userAgent: "*",
          disallowPaths: ["/wp-admin/", "/wp-includes/", "/wp-content/plugins/", "/wp-content/themes/", "/?s=", "/search/"],
          allowPaths: ["/wp-admin/admin-ajax.php"],
          crawlDelay: "",
        },
      ],
      sitemapUrls: [],
    },
  },
  {
    label: "E-commerce",
    description: "Block checkout, cart & account pages",
    config: {
      rules: [
        {
          id: "1",
          userAgent: "*",
          disallowPaths: ["/cart/", "/checkout/", "/account/", "/my-account/", "/order-confirmation/", "/?add-to-cart="],
          allowPaths: ["/"],
          crawlDelay: "",
        },
      ],
      sitemapUrls: [],
    },
  },
];

const COMMON_BOTS = ["*", "Googlebot", "Bingbot", "Slurp", "DuckDuckBot", "Baiduspider", "GPTBot", "CCBot", "anthropic-ai"];
const COMMON_PATHS = ["/admin/", "/private/", "/api/", "/wp-admin/", "/wp-includes/", "/cart/", "/checkout/", "/account/", "/*.json$", "/search/", "/tmp/"];

/* ══════════════════════════════════════════════════════════════
   ROBOTS.TXT GENERATOR
══════════════════════════════════════════════════════════════ */
function generateRobotsTxt(config: RobotsConfig): string {
  const lines: string[] = [];

  config.rules.forEach((rule, idx) => {
    if (idx > 0) lines.push("");
    lines.push(`User-agent: ${rule.userAgent || "*"}`);
    rule.allowPaths.forEach((p) => { if (p.trim()) lines.push(`Allow: ${p.trim()}`); });
    rule.disallowPaths.forEach((p) => { if (p.trim()) lines.push(`Disallow: ${p.trim()}`); });
    if (rule.crawlDelay.trim()) lines.push(`Crawl-delay: ${rule.crawlDelay.trim()}`);
  });

  if (config.sitemapUrls.length > 0) {
    lines.push("");
    config.sitemapUrls.forEach((url) => { if (url.trim()) lines.push(`Sitemap: ${url.trim()}`); });
  }

  return lines.join("\n");
}

function newRule(): RuleEntry {
  return { id: Date.now().toString(), userAgent: "*", disallowPaths: [], allowPaths: [], crawlDelay: "" };
}

/* ══════════════════════════════════════════════════════════════
   ROBOTS.TXT SYNTAX HIGHLIGHTER
══════════════════════════════════════════════════════════════ */
function highlightRobotsLine(line: string): React.ReactNode {
  if (line.startsWith("#")) return <span className="text-gray-400 italic">{line}</span>;
  if (line.startsWith("User-agent:")) {
    const val = line.slice("User-agent:".length);
    return <><span className="text-orange-500 font-bold">User-agent:</span><span className="text-amber-600 font-medium">{val}</span></>;
  }
  if (line.startsWith("Disallow:")) {
    const val = line.slice("Disallow:".length);
    return <><span className="text-red-500 font-bold">Disallow:</span><span className="text-gray-700">{val}</span></>;
  }
  if (line.startsWith("Allow:")) {
    const val = line.slice("Allow:".length);
    return <><span className="text-green-600 font-bold">Allow:</span><span className="text-gray-700">{val}</span></>;
  }
  if (line.startsWith("Crawl-delay:")) {
    const val = line.slice("Crawl-delay:".length);
    return <><span className="text-purple-500 font-bold">Crawl-delay:</span><span className="text-gray-700">{val}</span></>;
  }
  if (line.startsWith("Sitemap:")) {
    const val = line.slice("Sitemap:".length);
    return <><span className="text-blue-500 font-bold">Sitemap:</span><span className="text-blue-700">{val}</span></>;
  }
  return <span className="text-gray-400">{line || "\u00a0"}</span>;
}

function RobotsHighlighter({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="font-mono text-xs leading-6 w-full">
      {lines.map((line, i) => (
        <div key={i} className="flex group hover:bg-orange-50/60 rounded px-1 -mx-1">
          <span className="select-none w-8 flex-shrink-0 text-right pr-3 text-gray-300 group-hover:text-gray-400 transition-colors">
            {i + 1}
          </span>
          <span className="whitespace-pre-wrap break-all min-w-0 flex-1">
            {highlightRobotsLine(line)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PATH TAG INPUT — comma/enter to add paths
══════════════════════════════════════════════════════════════ */
function PathTagInput({
  label,
  color,
  paths,
  onChange,
  placeholder,
  suggestions,
}: {
  label: string;
  color: "red" | "green";
  paths: string[];
  onChange: (paths: string[]) => void;
  placeholder: string;
  suggestions: string[];
}) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accent = color === "red"
    ? { tag: "bg-red-50 text-red-600 border-red-200", dot: "bg-red-400", ring: "focus:ring-red-100 focus:border-red-400" }
    : { tag: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-400", ring: "focus:ring-green-100 focus:border-green-400" };

  function addPath(val: string) {
    const trimmed = val.trim();
    if (!trimmed || paths.includes(trimmed)) { setInput(""); return; }
    onChange([...paths, trimmed]);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addPath(input); }
    if (e.key === "Backspace" && input === "" && paths.length > 0) onChange(paths.slice(0, -1));
  }

  const filtered = suggestions.filter((s) => !paths.includes(s) && s.toLowerCase().includes(input.toLowerCase()));

  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <div
        className={`min-h-[42px] w-full bg-white border border-gray-200 rounded-xl px-3 py-2 flex flex-wrap gap-1.5 cursor-text transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100`}
        onClick={() => inputRef.current?.focus()}
      >
        {paths.map((p) => (
          <span key={p} className={`inline-flex items-center gap-1 text-xs font-mono font-semibold px-2 py-0.5 rounded-md border ${accent.tag}`}>
            {p}
            <button type="button" onClick={() => onChange(paths.filter((x) => x !== p))} className="hover:opacity-60 cursor-pointer ml-0.5">
              <XIcon size={10} />
            </button>
          </span>
        ))}
        <div className="relative flex-1 min-w-[120px]">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
            onKeyDown={handleKey}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder={paths.length === 0 ? placeholder : ""}
            className="w-full text-xs text-gray-700 placeholder-gray-300 outline-none bg-transparent py-0.5 font-mono"
          />
          {showSuggestions && filtered.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden" style={{ animation: "dropIn 0.12s ease" }}>
              <div className="max-h-40 overflow-y-auto py-1">
                {filtered.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={() => { addPath(s); setShowSuggestions(false); }}
                    className="w-full text-left px-3 py-2 text-xs font-mono text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mt-1">Press Enter or comma to add · Backspace to remove last</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   RULE CARD
══════════════════════════════════════════════════════════════ */
function RuleCard({
  rule,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: {
  rule: RuleEntry;
  index: number;
  onUpdate: (r: RuleEntry) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const [botInput, setBotInput] = useState(rule.userAgent);
  const [showBotSuggestions, setShowBotSuggestions] = useState(false);
  const filteredBots = COMMON_BOTS.filter((b) => b.toLowerCase().includes(botInput.toLowerCase()));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-[10px] font-black">{index + 1}</span>
          <span className="text-sm font-bold text-gray-700">Bot Rule</span>
          <span className="text-xs text-gray-400 font-mono bg-white border border-gray-200 px-2 py-0.5 rounded-full">
            User-agent: {rule.userAgent || "*"}
          </span>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-red-500 cursor-pointer transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
          >
            <TrashIcon size={12} /> Remove
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* User-agent */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">User-agent (Bot)</label>
          <input
            type="text"
            value={botInput}
            onChange={(e) => { setBotInput(e.target.value); onUpdate({ ...rule, userAgent: e.target.value }); setShowBotSuggestions(true); }}
            onFocus={() => setShowBotSuggestions(true)}
            onBlur={() => setTimeout(() => setShowBotSuggestions(false), 150)}
            placeholder="* (all bots)"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors font-mono"
          />
          {showBotSuggestions && filteredBots.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden" style={{ animation: "dropIn 0.12s ease" }}>
              <div className="max-h-44 overflow-y-auto py-1.5">
                {filteredBots.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onMouseDown={() => { setBotInput(b); onUpdate({ ...rule, userAgent: b }); setShowBotSuggestions(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-mono transition-colors cursor-pointer ${b === rule.userAgent ? "bg-orange-50 text-orange-600 font-bold" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    {b === "*" ? "* — all bots" : b}
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="text-[10px] text-gray-400 mt-1">Use <code className="bg-gray-100 px-1 rounded">*</code> for all bots, or specify e.g. <code className="bg-gray-100 px-1 rounded">Googlebot</code></p>
        </div>

        {/* Allow paths */}
        <PathTagInput
          label="Allow Paths"
          color="green"
          paths={rule.allowPaths}
          onChange={(p) => onUpdate({ ...rule, allowPaths: p })}
          placeholder="Type path and press Enter…"
          suggestions={["/", "/public/", "/blog/"]}
        />

        {/* Disallow paths */}
        <PathTagInput
          label="Disallow Paths"
          color="red"
          paths={rule.disallowPaths}
          onChange={(p) => onUpdate({ ...rule, disallowPaths: p })}
          placeholder="Type path and press Enter…"
          suggestions={COMMON_PATHS}
        />

        {/* Crawl delay */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Crawl-delay <span className="font-normal normal-case text-gray-400">(optional, seconds)</span></label>
          <input
            type="number"
            min="0"
            max="60"
            value={rule.crawlDelay}
            onChange={(e) => onUpdate({ ...rule, crawlDelay: e.target.value })}
            placeholder="e.g. 10"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
          />
          <p className="text-[10px] text-gray-400 mt-1">Asks bots to wait N seconds between requests. Leave blank to omit.</p>
        </div>
      </div>
    </div>
  );
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
          <span className="text-gray-700 font-medium">Robots.txt Generator</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Free SEO Tool</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}>
              Free{" "}<span className="text-orange-500">Robots.txt Generator</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}>
              Build a valid robots.txt file in seconds. Choose a preset, configure bot rules and blocked paths, add your sitemap URL — then copy or download, ready to upload.
            </p>

            <ul className="space-y-3 mb-9" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.38s" }}>
              {[
                "Pre-built presets for WordPress, e-commerce & more",
                "Configure per-bot Allow, Disallow & Crawl-delay rules",
                "Add sitemap URL directly into the file",
                "One-click copy or download as robots.txt",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                  <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3" style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.46s" }}>
              <a href="#tool" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                Generate My Robots.txt <ArrowRight />
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
                  <div className="flex gap-0.5">{[1,2,3,4,5].map((i) => <StarIcon key={i} />)}</div>
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
                <p className="text-gray-900 font-black text-lg leading-none">Valid</p>
                <p className="text-gray-400 text-xs">Google-accepted format</p>
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
                  <span className="ml-3 text-gray-500 text-xs">robots.txt</span>
                </div>
                <div className="text-xs leading-7 space-y-0.5">
                  <p><span className="text-gray-500"># Generated by Junixo</span></p>
                  <p className="mt-2"><span className="text-orange-400 font-bold">User-agent:</span> <span className="text-amber-300">*</span></p>
                  <p><span className="text-green-400 font-bold">Allow:</span> <span className="text-gray-300">/</span></p>
                  <p><span className="text-red-400 font-bold">Disallow:</span> <span className="text-gray-300">/admin/</span></p>
                  <p><span className="text-red-400 font-bold">Disallow:</span> <span className="text-gray-300">/wp-admin/</span></p>
                  <p><span className="text-red-400 font-bold">Disallow:</span> <span className="text-gray-300">/private/</span></p>
                  <p className="mt-2"><span className="text-orange-400 font-bold">User-agent:</span> <span className="text-amber-300">GPTBot</span></p>
                  <p><span className="text-red-400 font-bold">Disallow:</span> <span className="text-gray-300">/</span></p>
                  <p className="mt-2"><span className="text-blue-400 font-bold">Sitemap:</span> <span className="text-blue-300">https://junixo.com/sitemap.xml</span></p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-orange-500"><CheckCircle size={18} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Valid Format</p>
                  <p className="text-gray-900 font-black text-sm leading-none">Google-Accepted</p>
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
   2. TOOL SECTION
══════════════════════════════════════════════════════════════ */
function ToolSection() {
  const defaultConfig: RobotsConfig = {
    rules: [{ id: "1", userAgent: "*", disallowPaths: ["/admin/", "/private/"], allowPaths: ["/"], crawlDelay: "" }],
    sitemapUrls: [""],
  };

  const [config, setConfig] = useState<RobotsConfig>(defaultConfig);
  const [output, setOutput] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"input" | "output">("input");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  function updateRule(id: string, updated: RuleEntry) {
    setConfig((c) => ({ ...c, rules: c.rules.map((r) => r.id === id ? updated : r) }));
  }
  function removeRule(id: string) {
    setConfig((c) => ({ ...c, rules: c.rules.filter((r) => r.id !== id) }));
  }
  function addRule() {
    setConfig((c) => ({ ...c, rules: [...c.rules, newRule()] }));
  }
  function updateSitemap(idx: number, val: string) {
    setConfig((c) => {
      const updated = [...c.sitemapUrls];
      updated[idx] = val;
      return { ...c, sitemapUrls: updated };
    });
  }
  function addSitemap() {
    setConfig((c) => ({ ...c, sitemapUrls: [...c.sitemapUrls, ""] }));
  }
  function removeSitemap(idx: number) {
    setConfig((c) => ({ ...c, sitemapUrls: c.sitemapUrls.filter((_, i) => i !== idx) }));
  }

  function applyPreset(preset: typeof PRESETS[0]) {
    setConfig({ ...preset.config, sitemapUrls: [""] });
    setActivePreset(preset.label);
    setHasGenerated(false);
    setOutput("");
  }

  function handleGenerate() {
    const text = generateRobotsTxt(config);
    setOutput(text);
    setHasGenerated(true);
    setMobileTab("output");
  }

  function handleCopy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handleDownload() {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <section id="tool" className="py-4 lg:py-6 bg-white">
      <style>{`
        @keyframes dropIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }
        .robots-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .robots-scroll::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 3px; }
        .robots-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        .robots-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
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
                {hasGenerated && <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full leading-none">✓</span>}
              </button>
            </div>

            <div className="grid lg:grid-cols-2 lg:items-stretch">

              {/* ── LEFT: Config panel ── */}
              <div className={`p-4 sm:p-8 lg:p-10 lg:border-r border-orange-100 ${mobileTab === "output" ? "hidden lg:block" : "block"}`}>

                {/* Presets */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Presets</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => applyPreset(p)}
                        title={p.description}
                        className={`flex flex-col items-start px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer text-xs ${
                          activePreset === p.label
                            ? "border-orange-400 bg-orange-50 text-orange-600 font-bold shadow-sm"
                            : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500 font-medium"
                        }`}
                      >
                        <span className="font-bold">{p.label}</span>
                        <span className="text-[10px] text-gray-400 mt-0.5 leading-tight">{p.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bot Rules */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-900 font-black text-base flex items-center gap-2">
                      <span className="w-7 h-7 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center">
                        <RobotIcon size={14} />
                      </span>
                      Bot Rules
                    </h3>
                    <button
                      type="button"
                      onClick={addRule}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-500 hover:bg-orange-100 cursor-pointer transition-all"
                    >
                      <PlusIcon size={11} /> Add Rule
                    </button>
                  </div>
                  <div className="space-y-3">
                    {config.rules.map((rule, idx) => (
                      <RuleCard
                        key={rule.id}
                        rule={rule}
                        index={idx}
                        onUpdate={(r) => updateRule(rule.id, r)}
                        onRemove={() => removeRule(rule.id)}
                        canRemove={config.rules.length > 1}
                      />
                    ))}
                  </div>
                </div>

                {/* Sitemap URLs */}
                <div className="bg-orange-50 rounded-2xl border border-orange-100 p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-900 font-bold text-sm flex items-center gap-2">
                      <span className="text-orange-400"><LinkIcon size={15} /></span>
                      Sitemap URLs <span className="font-normal text-gray-400 text-xs">(optional)</span>
                    </h4>
                    <button
                      type="button"
                      onClick={addSitemap}
                      className="flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 cursor-pointer"
                    >
                      <PlusIcon size={11} /> Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {config.sitemapUrls.map((url, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => updateSitemap(idx, e.target.value)}
                          placeholder="https://yourdomain.com/sitemap.xml"
                          className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 bg-white rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                        />
                        {config.sitemapUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSitemap(idx)}
                            className="flex-shrink-0 p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all"
                          >
                            <XIcon size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">Tells search engines where your sitemap lives.</p>
                </div>

                <button
                  onClick={() => { handleGenerate(); window.scrollTo({ top: document.getElementById("tool")?.offsetTop ?? 0, behavior: "smooth" }); }}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <ZapIcon size={17} />
                  Generate robots.txt
                </button>
              </div>

              {/* ── RIGHT: Output panel ── */}
              <div className={`p-4 sm:p-6 lg:p-10 bg-orange-50/60 flex flex-col lg:border-l border-orange-100 min-w-0 overflow-hidden ${mobileTab === "input" ? "hidden lg:flex" : "flex"}`}>
                {!hasGenerated ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-white border-2 border-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                      <span className="text-orange-300"><CodeIcon size={32} /></span>
                    </div>
                    <h3 className="text-gray-700 font-bold text-base mb-2">Your robots.txt will appear here</h3>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-6">
                      Choose a preset or configure your rules, then click <strong className="text-orange-500">Generate robots.txt</strong>.
                    </p>
                    <button
                      onClick={() => setMobileTab("input")}
                      className="lg:hidden flex items-center gap-2 bg-orange-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                    >
                      ← Go to Configure
                    </button>
                    <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
                      {["Per-bot Allow & Disallow rules", "Crawl-delay support", "Sitemap URL included automatically"].map((tip) => (
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
                        <h3 className="text-gray-900 font-black text-base truncate">Generated robots.txt</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          <span className="text-orange-500 font-bold">{config.rules.length}</span> bot rule{config.rules.length !== 1 ? "s" : ""}
                          {config.sitemapUrls.filter(Boolean).length > 0 && (
                            <span className="ml-2 text-blue-400">· {config.sitemapUrls.filter(Boolean).length} sitemap{config.sitemapUrls.filter(Boolean).length !== 1 ? "s" : ""}</span>
                          )}
                        </p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button
                          onClick={handleCopy}
                          className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${copied ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500"}`}
                        >
                          {copied ? <><CheckSmall size={11} /> Copied!</> : <><CopyIcon size={12} /> Copy</>}
                        </button>
                        <button
                          onClick={handleDownload}
                          className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-all cursor-pointer"
                        >
                          <DownloadIcon size={12} /> Download
                        </button>
                      </div>
                    </div>

                    {/* Chrome bar */}
                    <div className="bg-gray-100 rounded-t-2xl border border-b-0 border-gray-200 px-4 py-2.5 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                      <span className="text-gray-400 text-xs font-mono flex-1 truncate">robots.txt</span>
                      <span className="text-[10px] font-bold text-orange-500 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full flex-shrink-0">
                        {output.split("\n").length} lines
                      </span>
                    </div>

                    {/* Code area */}
                    <div
                      className="robots-scroll overflow-x-auto overflow-y-auto rounded-b-2xl border border-gray-200 bg-white w-full"
                      style={{ height: "clamp(300px, 50vh, 480px)" }}
                    >
                      <div className="p-4 sm:p-5 w-full">
                        <RobotsHighlighter content={output} />
                      </div>
                    </div>

                    {/* Footer hint */}
                    <div className="flex items-start gap-2 bg-white rounded-xl border border-orange-100 px-4 py-3">
                      <span className="text-orange-400 flex-shrink-0 mt-0.5"><InfoIcon size={13} /></span>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Upload <code className="bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded text-orange-500 text-[11px]">robots.txt</code> to your website root — e.g.{" "}
                        <code className="bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded text-orange-500 text-[11px]">yourdomain.com/robots.txt</code>. Then verify it in{" "}
                        <span className="font-semibold text-gray-700">Google Search Console</span> under Settings → robots.txt.
                      </p>
                    </div>
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
  { icon: <RobotIcon size={22} />, color: "bg-orange-100 text-orange-500", title: "Per-Bot Configuration", desc: "Set different Allow, Disallow and Crawl-delay rules per bot. Block AI scrapers like GPTBot while keeping Google fully open." },
  { icon: <ZapIcon size={22} />, color: "bg-amber-100 text-amber-600", title: "One-Click Presets", desc: "WordPress, e-commerce, block-all and allow-all presets let you generate a sensible robots.txt in seconds with no technical knowledge." },
  { icon: <ShieldCheckIcon size={22} />, color: "bg-green-100 text-green-600", title: "Protect Private Areas", desc: "Easily block admin panels, API endpoints, checkout pages and private directories from being indexed by search engines." },
  { icon: <LinkIcon size={22} />, color: "bg-blue-100 text-blue-600", title: "Sitemap Declaration", desc: "Add your sitemap.xml URL directly in the robots.txt file — the recommended way to help crawlers discover all your pages." },
  { icon: <DownloadIcon size={22} />, color: "bg-pink-100 text-pink-600", title: "Copy or Download", desc: "One-click copy or download as robots.txt — ready to upload to your website root and verified in Google Search Console." },
  { icon: <TargetIcon size={22} />, color: "bg-purple-100 text-purple-600", title: "100% Free — Always", desc: "No account, no limits, no watermarks. Generate as many robots.txt files as you need, completely free forever." },
];

function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Why Use This Tool</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Control What <span className="text-orange-500">Bots Can See</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            A robots.txt file tells search engines and bots which pages to crawl — and which to leave alone.
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
  { num: "01", icon: <ZapIcon size={20} />, title: "Choose a Preset", desc: "Select a starting point — Allow All, Block All, WordPress, e-commerce or Standard SEO — then customise from there." },
  { num: "02", icon: <SettingsIcon size={20} />, title: "Configure Bot Rules", desc: "Add User-agent rules for specific bots. Set which paths are allowed, which are blocked, and optionally set a crawl delay." },
  { num: "03", icon: <LinkIcon size={20} />, title: "Add Your Sitemap", desc: "Paste your sitemap.xml URL to include a Sitemap directive — the best way to help Google discover all your pages." },
  { num: "04", icon: <SearchIcon size={20} />, title: "Upload & Verify", desc: "Download robots.txt, upload it to your website root, then verify it's working in Google Search Console under Settings." },
];

function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">How It Works</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            robots.txt Ready in <span className="text-orange-500">4 Simple Steps</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">From blank to upload-ready in under 2 minutes.</p>
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
   5. WHAT IS ROBOTS.TXT
══════════════════════════════════════════════════════════════ */
function WhatIsSection() {
  const rows = [
    { icon: <SearchIcon size={22} />, color: "bg-blue-100 text-blue-600", title: "Controls Crawler Access", desc: "Robots.txt tells Googlebot, Bingbot and other crawlers exactly which pages they're allowed to visit — protecting private or duplicate content from being indexed." },
    { icon: <ClockIcon size={22} />, color: "bg-orange-100 text-orange-500", title: "Manages Crawl Budget", desc: "Large sites have a limited crawl budget. Blocking unimportant pages (admin, filters, duplicate URLs) ensures crawlers focus on your most valuable content." },
    { icon: <ShieldCheckIcon size={22} />, color: "bg-green-100 text-green-600", title: "Blocks AI Scrapers", desc: "Add rules for GPTBot, CCBot and anthropic-ai to prevent AI companies from using your content to train their models without permission." },
    { icon: <BarChartIcon size={22} />, color: "bg-purple-100 text-purple-600", title: "An SEO Foundation File", desc: "Every professional website needs a robots.txt. It's one of the first files search engines check and signals that your site is technically well-maintained." },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-4">What Is robots.txt?</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Why Every Website <span className="text-orange-500">Needs One</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              A robots.txt file sits at the root of your website and gives instructions to web crawlers — telling them which pages and directories they're allowed to access. It's not a security measure (bots can choose to ignore it), but all major search engines respect it, making it an essential part of any technical SEO setup.
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
  { q: "What is a robots.txt file?", a: "A robots.txt file is a plain text file placed at the root of your website (e.g. yourdomain.com/robots.txt) that gives instructions to web crawlers about which pages or sections they're allowed to access. All major search engines — including Google, Bing and Yandex — respect robots.txt directives." },
  { q: "Does robots.txt prevent pages from being indexed?", a: "Blocking a page in robots.txt prevents crawlers from visiting it, but doesn't guarantee it won't be indexed. If other sites link to a blocked page, Google may still index it based on those links. To fully prevent indexing, use a 'noindex' meta tag or HTTP header on the page itself." },
  { q: "What's the difference between Allow and Disallow?", a: "Disallow tells a bot not to crawl a specific path. Allow overrides a broader Disallow rule for a specific sub-path. For example, you can Disallow /wp-admin/ but Allow /wp-admin/admin-ajax.php to keep AJAX requests working while blocking the dashboard." },
  { q: "Should I block all bots or just some?", a: "Most legitimate bots (Googlebot, Bingbot) should be allowed to crawl your public content. You might want to block specific bots like AI scrapers (GPTBot, CCBot) if you don't want your content used for model training. Never block Googlebot from pages you want indexed." },
  { q: "What is Crawl-delay and should I use it?", a: "Crawl-delay asks a bot to wait N seconds between requests to reduce server load. Note: Googlebot ignores Crawl-delay — you should set crawl rate for Google in Search Console instead. Crawl-delay is respected by Bingbot and some other crawlers." },
  { q: "Where do I upload robots.txt?", a: "Upload robots.txt to the root directory of your website so it's accessible at yourdomain.com/robots.txt. For most hosting providers, this means placing it in the /public_html or /www directory. You can then verify it in Google Search Console under Settings → robots.txt." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 lg:py-24 bg-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
            robots.txt <span className="text-orange-500">Questions Answered</span>
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
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-52 pb-5" : "max-h-0"}`}>
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
                robots.txt Is Just the Start.<br className="hidden sm:block" />
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
export default function RobotsTxtGeneratorClient() {
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