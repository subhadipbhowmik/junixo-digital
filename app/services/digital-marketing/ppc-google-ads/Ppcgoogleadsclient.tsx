"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

/* ─── HOOKS ─── */
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
  children, delay = 0, className = "", direction = "up",
}: {
  children: React.ReactNode; delay?: number; className?: string;
  direction?: "up" | "left" | "right";
}) {
  const { ref, inView } = useInView();
  const transforms: Record<string, string> = {
    up: inView ? "translateY(0)" : "translateY(30px)",
    left: inView ? "translateX(0)" : "translateX(-30px)",
    right: inView ? "translateX(0)" : "translateX(30px)",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: transforms[direction],
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t: number | null = null;
    const step = (ts: number) => {
      if (!t) t = ts;
      const p = Math.min((ts - t) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─── ICONS ─── */
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
const TrendingUp = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const TargetIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const BarChart = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const ZapIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const HeartIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const SearchSVG = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ChevronDownIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const DollarIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const GlobeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const RefreshIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const LayersIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const MapPinIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const PlayIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const ShoppingCartIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const XCircleIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
/* Filled green check for "With us" header */
const CheckCircleFilled = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#22c55e" />
    <polyline points="7 12 10 15 17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
/* Filled red X for "Without us" header */
const XCircleFilled = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#ef4444" />
    <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   SEARCHABLE SELECT COMPONENT
══════════════════════════════════════════════════════════════ */
const SERVICE_OPTIONS = [
  "PPC Google Ads Management",
  "Google Search Ads",
  "Google Shopping Ads",
  "Google Display Advertising",
  "YouTube Ads Management",
  "Performance Max Campaigns",
  "Remarketing & Retargeting",
  "Local Services Ads",
  "Google Ads Audit & Strategy",
  "Social Media Management",
  "Content Creation",
  "Paid Social Advertising (Meta Ads)",
  "TikTok Ads Management",
  "LinkedIn Ads & B2B Marketing",
  "YouTube Channel Management",
  "Pinterest Marketing",
  "Community Management",
  "Influencer Marketing",
  "Social Media Strategy & Audit",
  "Instagram Growth & Reels",
  "Facebook Page Management",
  "Short-Form Video Production",
  "Social Media Reporting & Analytics",
  "Brand Voice & Messaging",
  "Other Service",
];

interface SearchableSelectProps {
  value: string; onChange: (val: string) => void;
  placeholder?: string; hasError?: boolean; id?: string;
}

function SearchableSelect({ value, onChange, placeholder = "Select a service…", hasError, id }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const filtered = SERVICE_OPTIONS.filter((opt) => opt.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) { setOpen(false); setQuery(""); }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { if (open && searchRef.current) searchRef.current.focus(); }, [open]);

  function handleSelect(opt: string) { onChange(opt); setOpen(false); setQuery(""); }

  return (
    <div ref={containerRef} className="relative w-full">
      <button type="button" id={id} onClick={() => setOpen((o) => !o)}
        className={`cursor-pointer w-full flex items-center justify-between text-sm bg-white border rounded-xl px-4 py-3 focus:outline-none transition-colors text-left
          ${hasError ? "border-red-400 ring-2 ring-red-100" : open ? "border-orange-400 ring-2 ring-orange-100" : "border-gray-200 hover:border-orange-300"}
          ${value ? "text-gray-700" : "text-gray-400"}`}>
        <span className="truncate pr-2">{value || placeholder}</span>
        <span className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDownIcon size={16} /></span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5 bg-gray-50">
            <span className="text-gray-400 flex-shrink-0"><SearchSVG size={14} /></span>
            <input ref={searchRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services…" className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400" />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No services found</li>
            ) : filtered.map((opt) => (
              <li key={opt}>
                <button type="button" onClick={() => handleSelect(opt)}
                  className={`cursor-pointer w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600
                    ${value === opt ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-700"}`}>
                  {opt === "Other Service" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>{opt}
                    </span>
                  ) : opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
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
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-20 lg:pb-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-orange-50 rounded-full opacity-70" style={{ transform: "translate(28%,-28%)" }} />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-amber-50 rounded-full opacity-50" style={{ transform: "translate(-25%,25%)" }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-orange-200 opacity-25"
            style={{ width: [5,8,4,6,3][i], height: [5,8,4,6,3][i], top: ["18%","70%","40%","82%","28%"][i], left: ["8%","5%","90%","72%","95%"][i] }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10" style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <span>/</span>
          <a href="/services" className="hover:text-orange-500 transition-colors">Services</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">PPC & Google Ads</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">PPC & Google Ads</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}>
              Every Click Drives{" "}
              <span className="relative inline-block text-orange-500">Real Revenue</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}>
              We build and manage Google Ads campaigns that put your brand in front of high-intent buyers at the exact moment they're ready to purchase — maximising every penny of your ad spend.
            </p>

            <ul className="space-y-3 mb-9" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.38s" }}>
              {[
                "Search, Shopping, Display & YouTube Ads",
                "Full-funnel campaign architecture",
                "Conversion-optimised landing page guidance",
                "Transparent weekly reporting & ROAS tracking",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                  <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3" style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.46s" }}>
              <a href="/get-a-quote"
                className="cursor-pointer inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                Get a Free PPC Audit <ArrowRight />
              </a>
              <a href="#cta"
                className="cursor-pointer inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                Get In Touch
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-100" style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.54s" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["fff7ed/f97316","eff6ff/3b82f6","f0fdf4/22c55e","fdf4ff/a855f7"].map((c, i) => (
                    <img key={i} src={`https://placehold.co/32x32/${c}?text=${["AK","TC","RB","MJ"][i]}`} className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
                  <p className="text-gray-500 text-xs">60+ PPC campaigns</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">£4.2M+</p>
                <p className="text-gray-400 text-xs">Ad spend managed</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">7.4x</p>
                <p className="text-gray-400 text-xs">Avg Google Ads ROAS</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative hidden lg:block"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(36px)", transition: "all 0.75s ease 0.3s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50 rounded-3xl transform rotate-2" />
              <img src="https://placehold.co/620x500/fff7ed/f97316?text=Google+Ads+Performance" alt="PPC Google Ads"
                className="relative rounded-3xl w-full object-cover shadow-2xl" />
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-green-500"><TrendingUp size={20} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ROAS</p>
                  <p className="text-gray-900 font-black text-sm leading-none">7.4x avg return</p>
                </div>
              </div>
              <div className="absolute top-1/3 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-orange-500"><TargetIcon size={20} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">CPA</p>
                  <p className="text-gray-900 font-black text-sm leading-none">-48% cost/lead</p>
                </div>
              </div>
              <div className="absolute -bottom-4 right-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-amber-500"><ZapIcon size={20} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">CTR</p>
                  <p className="text-gray-900 font-black text-sm leading-none">+212% click-through</p>
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
   2. UNIQUE: WHY GOOGLE ADS? — Value proposition + comparison
══════════════════════════════════════════════════════════════ */
function WhyGoogleAdsSection() {
  const benefits = [
    { icon: <TargetIcon size={22} />, title: "Intent-first advertising", desc: "Unlike social ads that interrupt, Google Ads reach people who are actively searching for what you sell. The buying intent is already there — you just need to show up." },
    { icon: <ZapIcon size={22} />, title: "Instant, scalable traffic", desc: "Go live in hours, not months. While SEO builds over time, Google Ads puts you at the top of results immediately — and scales as fast as your budget allows." },
    { icon: <BarChart size={22} />, title: "Every penny tracked", desc: "Cost-per-click, ROAS, CPA, conversion rate — every metric is measurable. You know exactly what your ad spend returns, down to the individual keyword." },
    { icon: <LayersIcon size={22} />, title: "Full-funnel coverage", desc: "From awareness via Display and YouTube to purchase via Search and Shopping — Google's ad network covers every stage of your customer's buying journey." },
  ];

  const withUs = [
    "Full account ownership — you keep the data always",
    "Dedicated PPC specialist on your account",
    "No hidden management fees or markup on ad spend",
    "Weekly optimisation, not monthly check-ins",
    "Honest reporting on what's working and what's not",
    "Strategy that compounds and scales with your growth",
  ];
  const withoutUs = [
    "Budget wasted on broad, irrelevant searches",
    "Set-and-forget campaigns losing money daily",
    "No negative keyword strategy eating your spend",
    "Poor Quality Scores driving up your CPC over time",
    "Vanity metrics with no revenue attribution",
    "Campaigns that plateau and never scale profitably",
  ];

  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Why Google Ads</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            The Highest-Intent Traffic{" "}
            <span className="text-orange-500">on the Internet</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            Google processes 8.5 billion searches per day. The people searching for your product right now are your most valuable prospects — we make sure they find you first.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 70}>
              <div className="bg-white rounded-2xl border border-orange-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-4">{b.icon}</div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={100}>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-orange-200 p-7">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircleFilled size={28} />
                <h3 className="text-gray-900 font-black text-lg">With Junixo Managing Your Ads</h3>
              </div>
              <ul className="space-y-3">
                {withUs.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="text-green-500 flex-shrink-0 mt-0.5"><CheckCircle size={15} /></span>
                    <span className="text-gray-700 text-sm font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-7">
              <div className="flex items-center gap-3 mb-5">
                <XCircleFilled size={28} />
                <h3 className="text-gray-900 font-black text-lg">Without Expert PPC Management</h3>
              </div>
              <ul className="space-y-3">
                {withoutUs.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="text-red-400 flex-shrink-0 mt-0.5"><XCircleIcon size={15} /></span>
                    <span className="text-gray-500 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. CAMPAIGN TYPES
══════════════════════════════════════════════════════════════ */
const campaignTypes = [
  { icon: <SearchSVG size={26} />, name: "Search Ads", color: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100", iconColor: "text-orange-500", desc: "Appear at the top of Google when buyers are actively searching. Tight keyword structure, compelling copy and Quality Score optimisation that lowers your CPC over time.", tags: ["Keyword Research", "Ad Copy", "Quality Score", "Bidding"] },
  { icon: <ShoppingCartIcon size={26} />, name: "Shopping Ads", color: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100", iconColor: "text-green-600", desc: "Product listing ads driving qualified shoppers to your product pages. We manage your Merchant Center feed, bidding strategy and product segmentation for maximum ROAS.", tags: ["Merchant Center", "Product Feed", "Smart Bidding", "ROAS"] },
  { icon: <GlobeIcon size={26} />, name: "Display Ads", color: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100", iconColor: "text-purple-600", desc: "Reach your audience across 2M+ websites with compelling banner ads. Target by intent, interest, demographics and placement for brand awareness at scale.", tags: ["Banner Ads", "Targeting", "GDN", "Placements"] },
  { icon: <PlayIcon size={26} />, name: "YouTube Ads", color: "bg-gradient-to-br from-red-50 to-orange-50 border-red-100", iconColor: "text-red-500", desc: "Video ads capturing attention before and during YouTube content. Skippable, non-skippable, bumper and discovery campaigns tracked to conversions.", tags: ["TrueView", "Bumper Ads", "Discovery", "Video"] },
  { icon: <ZapIcon size={26} />, name: "Performance Max", color: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100", iconColor: "text-amber-600", desc: "Google's AI-driven campaign across Search, Display, YouTube, Gmail and Maps from a single campaign. Robust asset groups and conversion goals maximise PMax performance.", tags: ["PMax", "All Channels", "AI Bidding", "Asset Groups"] },
  { icon: <RefreshIcon size={26} />, name: "Remarketing", color: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100", iconColor: "text-pink-500", desc: "Re-engage visitors who didn't convert. RLSA, dynamic remarketing and customer list targeting to bring warm audiences back to purchase.", tags: ["RLSA", "Dynamic Ads", "Customer Match", "Audiences"] },
  { icon: <MapPinIcon size={26} />, name: "Local & Maps Ads", color: "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100", iconColor: "text-teal-600", desc: "Drive foot traffic and phone calls with Local Services Ads and Google Maps placements. Dominate local search results for your service area.", tags: ["Local Services", "Google Maps", "Call Ads", "Location"] },
  { icon: <LayersIcon size={26} />, name: "Demand Gen", color: "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100", iconColor: "text-indigo-500", desc: "Google's upper-funnel campaign across YouTube, Gmail and Discover. Generate demand before people start searching with compelling visuals and smart audiences.", tags: ["Gmail Ads", "Discover", "Upper-Funnel", "Audiences"] },
];

function CampaignTypesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Campaign Types We Master</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Every Google Ads Format{" "}
            <span className="text-orange-500">That Drives Growth</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            We don't run the same campaign type for every client. We build a tailored Google Ads ecosystem that matches your goals, margins and buying cycle.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {campaignTypes.map((p, i) => (
            <FadeIn key={p.name} delay={i * 60}>
              <div className={`group border ${p.color} rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col`}>
                <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm ${p.iconColor} transition-transform duration-300 group-hover:scale-110`}>{p.icon}</div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{p.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="bg-white text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200 uppercase tracking-wide">{tag}</span>
                  ))}
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
   4. SERVICES — Alternating feature rows
══════════════════════════════════════════════════════════════ */
const serviceRows = [
  {
    badge: "Keyword Strategy",
    icon: <SearchSVG size={24} />,
    color: "bg-orange-100 text-orange-500",
    title: "Keywords That Capture Buying Intent",
    desc: "We go beyond generic keyword lists. Using competitive analysis, search intent mapping and long-tail research, we identify the exact terms your highest-value customers use when they're ready to buy — then build campaigns around them.",
    points: ["In-depth keyword research and intent mapping", "Negative keyword strategy to eliminate wasted spend", "Match type strategy for coverage vs. control", "Competitor keyword gap analysis"],
    img: "https://placehold.co/560x400/fff7ed/f97316?text=Keyword+Strategy",
    stat: { value: "-52%", label: "Avg wasted ad spend eliminated" },
    flip: false,
  },
  {
    badge: "Ad Creative & Copywriting",
    icon: <ZapIcon size={24} />,
    color: "bg-amber-100 text-amber-600",
    title: "Ad Copy That Compels Clicks",
    desc: "Your ad is competing against 9 others for the same click. We write conversion-focused headlines, descriptions and extensions that maximise CTR, improve Quality Score, and lower your cost-per-click over time.",
    points: ["Responsive Search Ads with 15+ headline variations", "Ad extension strategy (callouts, sitelinks, snippets)", "Continuous A/B testing and iteration", "Quality Score optimisation to lower CPC"],
    img: "https://placehold.co/560x400/fffbeb/d97706?text=Ad+Copy+%26+Creative",
    stat: { value: "+212%", label: "Avg CTR improvement" },
    flip: true,
  },
  {
    badge: "Bid Management & Optimisation",
    icon: <TargetIcon size={24} />,
    color: "bg-green-100 text-green-600",
    title: "Smart Bidding, Smarter Results",
    desc: "We combine Google's machine learning with human oversight to ensure every bid is optimised for your goals — whether that's target CPA, target ROAS or maximising conversion value. Weekly optimisation cycles, not monthly check-ins.",
    points: ["Smart Bidding strategy tailored to your targets", "Audience bid adjustments for high-value segments", "Device, location and time-of-day bid modifiers", "Budget pacing and spend efficiency monitoring"],
    img: "https://placehold.co/560x400/f0fdf4/22c55e?text=Bid+Management",
    stat: { value: "7.4x", label: "Average Google Ads ROAS" },
    flip: false,
  },
  {
    badge: "Landing Page & CRO",
    icon: <BarChart size={24} />,
    color: "bg-purple-100 text-purple-500",
    title: "Pages Built to Convert Clicks",
    desc: "Traffic without conversion is just wasted spend. We audit and optimise your landing pages for speed, relevance and persuasion — or advise on dedicated PPC landing pages that match ad intent and dramatically improve conversion rates.",
    points: ["Landing page audit and conversion analysis", "PPC-specific landing page recommendations", "A/B testing of headlines, CTAs and layouts", "Page speed and Core Web Vitals guidance"],
    img: "https://placehold.co/560x400/fdf4ff/a855f7?text=Landing+Page+CRO",
    stat: { value: "+89%", label: "Avg conversion rate lift" },
    flip: true,
  },
];

function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">What's Included</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            A Complete Google Ads{" "}
            <span className="text-orange-500">Management Service</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">Everything you need to launch, scale and sustain profitable Google Ads campaigns — under one roof.</p>
        </FadeIn>
        <div className="space-y-24 lg:space-y-32">
          {serviceRows.map((s) => (
            <FadeIn key={s.badge} delay={80}>
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${s.flip ? "lg:grid-flow-dense" : ""}`}>
                <div className={s.flip ? "lg:col-start-2" : ""}>
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-3xl transform ${s.flip ? "-rotate-2" : "rotate-2"} bg-orange-100`} />
                    <img src={s.img} alt={s.title} className="relative rounded-3xl w-full object-cover shadow-xl" />
                    <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl px-5 py-3.5 border border-gray-100">
                      <p className="text-orange-500 font-black text-2xl leading-none">{s.stat.value}</p>
                      <p className="text-gray-500 text-xs font-medium mt-0.5">{s.stat.label}</p>
                    </div>
                  </div>
                </div>
                <div className={s.flip ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>{s.icon}</div>
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">{s.badge}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-4">{s.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed mb-6">{s.desc}</p>
                  <ul className="space-y-2.5">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3">
                        <span className="text-orange-500 flex-shrink-0 mt-0.5"><CheckCircle size={15} /></span>
                        <span className="text-gray-700 text-sm font-medium">{pt}</span>
                      </li>
                    ))}
                  </ul>
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
   5. STATS
══════════════════════════════════════════════════════════════ */
const stats = [
  { value: 60,  suffix: "+",  label: "PPC Campaigns",  sub: "Across all industries",       icon: <TargetIcon size={26} />, color: "text-orange-500 bg-orange-50" },
  { value: 4,   suffix: "M+", label: "Ad Spend Managed (£)",   sub: "Profitably deployed",          icon: <DollarIcon size={26} />, color: "text-green-600 bg-green-50" },
  { value: 74,  suffix: "x",  label: "Avg Google Ads ROAS",    sub: "Across e-commerce clients",    icon: <TrendingUp size={26} />, color: "text-amber-500 bg-amber-50" },
  { value: 48,  suffix: "%",  label: "Avg CPA Reduction",      sub: "Within 90 days",               icon: <BarChart size={26} />,   color: "text-purple-500 bg-purple-50" },
  { value: 89,  suffix: "%",  label: "Client Retention Rate",  sub: "Stay for 12+ months",          icon: <HeartIcon size={26} />,  color: "text-rose-500 bg-rose-50" },
  { value: 212, suffix: "%",  label: "Avg CTR Improvement",    sub: "After first 60 days",          icon: <ZapIcon size={26} />,    color: "text-orange-500 bg-orange-50" },
];

function StatsSection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Results by Numbers</span>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900">The Proof Is in the Performance</h2>
        </FadeIn>
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => {
            const count = useCountUp(s.value, 1800, inView);
            return (
              <div key={s.label} className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110`}>{s.icon}</div>
                <p className="text-2xl font-black text-gray-900 leading-none mb-1">{count}{s.suffix}</p>
                <p className="text-gray-700 font-bold text-xs leading-tight">{s.label}</p>
                <p className="text-gray-400 text-[10px] mt-0.5">{s.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. UNIQUE: AUDIT FINDINGS — Dark section, PPC-specific
══════════════════════════════════════════════════════════════ */
const auditFindings = [
  { pct: "78%", label: "of accounts we audit have no negative keyword strategy", detail: "Wasting budget on irrelevant searches that will never convert.", color: "bg-red-50 border-red-200", pctColor: "text-red-500", labelColor: "text-gray-900", detailColor: "text-gray-500" },
  { pct: "64%", label: "have campaigns structured around convenience, not intent", detail: "Single ad groups with dozens of mixed-intent keywords killing Quality Score.", color: "bg-amber-50 border-amber-200", pctColor: "text-amber-600", labelColor: "text-gray-900", detailColor: "text-gray-500" },
  { pct: "91%", label: "have never run a proper ad copy A/B test", detail: "Running the same creatives for months with no iteration or improvement.", color: "bg-orange-50 border-orange-200", pctColor: "text-orange-500", labelColor: "text-gray-900", detailColor: "text-gray-500" },
  { pct: "55%", label: "have broken or incomplete conversion tracking", detail: "Optimising campaigns without full data — like navigating blind.", color: "bg-rose-50 border-rose-200", pctColor: "text-rose-500", labelColor: "text-gray-900", detailColor: "text-gray-500" },
];

function AuditSection() {
  return (
    <section className="pb-20 lg:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">What We Find in Audits</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Most Google Ads Accounts{" "}
            <span className="text-orange-500">Are Leaking Money</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            After auditing hundreds of accounts, the same costly mistakes appear again and again. Here's what we find — and fix.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {auditFindings.map((f, i) => (
            <FadeIn key={f.pct} delay={i * 70}>
              <div className={`rounded-2xl border p-6 ${f.color} h-full`}>
                <p className={`text-4xl font-black mb-3 ${f.pctColor}`}>{f.pct}</p>
                <p className={`font-bold text-sm leading-snug mb-2 ${f.labelColor}`}>{f.label}</p>
                <p className={`text-xs leading-relaxed ${f.detailColor}`}>{f.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>

       <style>{`
  @keyframes shine {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(400%) skewX(-12deg); }
  }
  @keyframes border-ltr {
    0%   { background-position: 0% 0%; }
    100% { background-position: 100% 0%; }
  }
  .shine-btn::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 30%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    transform: translateX(-100%) skewX(-12deg);
    animation: shine 2.5s ease-in-out infinite;
  }
  .chase-border {
    position: relative;
    border-radius: 1.5rem;
    padding: 1.5px;
    background: linear-gradient(
      90deg,
      rgba(249,115,22,0.08),
      rgba(249,115,22,0.08),
      rgba(249,115,22,1),
      rgba(251,191,36,1),
      rgba(249,115,22,1),
      rgba(249,115,22,0.08),
      rgba(249,115,22,0.08)
    );
    background-size: 200% 100%;
    animation: border-ltr 2.5s ease-in-out infinite alternate;
  }
`}</style>

<FadeIn delay={100}>
  <div className="relative max-w-4xl mx-auto">
    <div className="chase-border">
      <div className="relative overflow-hidden bg-white rounded-3xl p-8 sm:p-10">
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-8">

          {/* Left */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 font-black text-2xl sm:text-3xl leading-tight tracking-tight mb-2">
              Is your account one of them?
            </p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Find out exactly where your budget is leaking — free, no strings attached, results in 24 hours.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Free audit", "No commitment", "24hr turnaround"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 border border-orange-200 bg-orange-50 text-orange-500 text-xs font-medium px-3 py-1 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-orange-500 inline-block" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex-shrink-0 sm:self-center">
            <a href="#cta"
              className="shine-btn group relative overflow-hidden inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-black px-7 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 text-sm whitespace-nowrap shadow-lg shadow-orange-200">
              Get My Free Audit
              <span className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center group-hover:bg-white/50 transition-colors">
                <ArrowRight size={12} />
              </span>
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</FadeIn>


      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. PROCESS
══════════════════════════════════════════════════════════════ */
const process = [
  { num: "01", icon: <SearchSVG size={20} />, title: "Account Audit", desc: "We audit your current Google Ads account (or competitor landscape if starting fresh), identifying wasted spend, missed opportunities and quick wins." },
  { num: "02", icon: <TargetIcon size={20} />, title: "Strategy & Structure", desc: "We map campaign architecture, keyword strategy, audience targeting, bidding approach and conversion tracking — all documented in a clear roadmap." },
  { num: "03", icon: <ZapIcon size={20} />, title: "Build & Launch", desc: "Campaigns built to best-practice structure with tight ad groups, compelling copy, full extensions, and verified conversion tracking before going live." },
  { num: "04", icon: <RefreshIcon size={20} />, title: "Optimise Weekly", desc: "Every week we review search terms, pause underperformers, test new ads, adjust bids and refine audiences. Active management — never set-and-forget." },
  { num: "05", icon: <BarChart size={20} />, title: "Report & Scale", desc: "Monthly deep-dive reports with plain-English insights. When we find what works, we scale it. When we find waste, we cut it. Always compounding." },
];

function ProcessSection() {
  return (
    <section className="pb-20 lg:pb-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">How We Work</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            From Audit to{" "}
            <span className="text-orange-500">Profitable Scale</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">A structured 5-step process that eliminates guesswork and compounds results over time.</p>
        </FadeIn>

        <FadeIn>
          <div className="hidden lg:grid grid-cols-5 gap-0 relative mb-4">
            <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-orange-100" />
            {process.map((step) => (
              <div key={step.num} className="relative flex flex-col items-center text-center px-4 group">
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
          {process.map((step, i) => (
            <FadeIn key={step.num} delay={i * 70}>
              <div className="flex gap-4 bg-orange-50 rounded-2xl p-5 border border-orange-100">
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
   8. CASE STUDIES
══════════════════════════════════════════════════════════════ */
const caseStudies = [
  {
    tag: "Google Search + Shopping",
    industry: "E-commerce",
    title: "E-commerce Brand Hits 9.2x ROAS",
    result: "Full restructure of a legacy Google Ads account eliminated £8k/month in wasted spend and rebuilt Shopping campaigns around margin-led bidding to achieve record ROAS.",
    metrics: [{ label: "Google Ads ROAS", value: "9.2x" }, { label: "Wasted Spend Cut", value: "£8k/mo" }, { label: "Revenue from Ads", value: "+340%" }],
    img: "https://placehold.co/480x320/fff7ed/f97316?text=Ecommerce+Google+Ads",
    quote: "We were losing money on Google Ads for 18 months. Junixo fixed it in 6 weeks. Now it's our most profitable acquisition channel.",
    client: "Head of Growth, E-commerce Brand",
  },
  {
    tag: "Search + Display + Remarketing",
    industry: "B2B Services",
    title: "B2B Agency Cuts CPL by 61%",
    result: "Tightly structured Search campaigns, display prospecting and remarketing sequences reduced cost-per-lead from £148 to £58 while tripling lead volume within 90 days.",
    metrics: [{ label: "Cost Per Lead", value: "-61%" }, { label: "Lead Volume", value: "3x" }, { label: "Conversion Rate", value: "+94%" }],
    img: "https://placehold.co/480x320/f0fdf4/22c55e?text=B2B+Google+Ads+Case",
    quote: "Our previous agency told us £148 CPL was normal for our industry. Junixo proved them completely wrong.",
    client: "Director, Professional Services Firm",
  },
  {
    tag: "Performance Max + YouTube",
    industry: "DTC Brand",
    title: "DTC Brand Scales Spend 6x Profitably",
    result: "PMax campaigns combined with YouTube pre-roll ads created a full-funnel Google strategy scaling monthly spend from £12k to £74k while maintaining a 7.1x ROAS.",
    metrics: [{ label: "Ad Spend Scaled", value: "6x" }, { label: "ROAS Maintained", value: "7.1x" }, { label: "New Customers", value: "+280%" }],
    img: "https://placehold.co/480x320/eff6ff/3b82f6?text=DTC+PMax+Case+Study",
    quote: "Scaling Google Ads without killing ROAS felt impossible. Junixo made it happen and then doubled down.",
    client: "Founder, DTC Health Brand",
  },
];

function CaseStudiesSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Proven Results</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Real Budgets,{" "}
            <span className="text-orange-500">Real Returns</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">See how we've turned underperforming Google Ads accounts into profitable, scalable growth engines.</p>
        </FadeIn>
        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.title} delay={i * 80}>
              <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="relative overflow-hidden">
                  <img src={cs.img} alt={cs.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-gray-700 font-bold text-xs px-3 py-1.5 rounded-full">{cs.tag}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white font-bold text-xs px-3 py-1.5 rounded-full">{cs.industry}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{cs.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{cs.result}</p>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
                        <p className="text-orange-500 font-black text-base leading-none">{m.value}</p>
                        <p className="text-gray-500 text-[10px] mt-1 leading-tight">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mt-auto border border-gray-100">
                    <p className="text-gray-700 text-xs italic leading-relaxed mb-2">"{cs.quote}"</p>
                    <p className="text-gray-400 text-[10px] font-bold">— {cs.client}</p>
                  </div>
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
   9. TESTIMONIALS
══════════════════════════════════════════════════════════════ */
const testimonials = [
  { quote: "Our Google Ads were eating budget with nothing to show. Junixo rebuilt the account from scratch and in 90 days we had a 6.8x ROAS. I only wish we'd found them sooner.", name: "Claire Henderson", role: "Marketing Director, E-commerce", img: "https://placehold.co/56x56/fff7ed/f97316?text=CH" },
  { quote: "The keyword and negative keyword work alone saved us £3,200 in the first month. That's before counting the revenue uplift. Genuinely outstanding PPC team.", name: "Tom Ashworth", role: "Founder, B2B SaaS", img: "https://placehold.co/56x56/f0fdf4/22c55e?text=TA" },
  { quote: "We scaled from £5k to £40k monthly spend without losing ROAS. The bid management and audience strategy Junixo runs is miles ahead of anyone else we've used.", name: "Priya Mehta", role: "Head of Acquisition, DTC Brand", img: "https://placehold.co/56x56/eff6ff/3b82f6?text=PM" },
  { quote: "The landing page changes they recommended lifted our conversion rate by 73%. They don't just manage ads — they look at the whole funnel. That's the difference.", name: "James Whittaker", role: "CEO, Lead Gen Business", img: "https://placehold.co/56x56/fdf4ff/a855f7?text=JW" },
];

function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Client Stories</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
            Results Clients <span className="text-orange-500">Talk About</span>
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 70}>
              <div className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                  <div>
                    <p className="text-gray-900 font-bold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
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
   10. FAQ
══════════════════════════════════════════════════════════════ */
const faqs = [
  { q: "How much should I spend on Google Ads?", a: "It depends on your industry, goals and margins. We typically recommend a minimum of £1,500–£2,000/month in ad spend to gather enough data to optimise effectively. We'll give you a budget recommendation as part of your free audit." },
  { q: "How long before Google Ads campaigns are profitable?", a: "Most campaigns show meaningful optimisation within 4–6 weeks as we gather conversion data. Sustainable profitability typically takes 60–90 days of iterative optimisation." },
  { q: "Do you manage the Google Ads account directly or advise us?", a: "We manage everything — campaign builds, ad copy, bid management, keyword optimisation, extensions and reporting. You're kept informed but don't have to touch the account." },
  { q: "Is there a minimum contract length?", a: "No. All our PPC management services are month-to-month. We don't lock clients in — we keep them through performance." },
  { q: "What access will I have to my account?", a: "Full access, always. You own the Google Ads account — we just manage it. You can log in any time to see everything. Complete transparency is non-negotiable for us." },
  { q: "Can you take over an existing Google Ads account?", a: "Yes, and we usually prefer it — there's often historical data we can leverage. We'll do a full audit first, show you what's working and what's wasting budget, then build a plan to fix it." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 lg:py-24 bg-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
            Questions We <span className="text-orange-500">Get Asked</span>
          </h2>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? "border-orange-300 bg-white shadow-sm" : "border-orange-100 bg-white"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} className="cursor-pointer w-full flex items-center justify-between px-6 py-4 text-left gap-4">
                  <span className="text-gray-900 font-bold text-sm sm:text-base">{faq.q}</span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open === i ? "bg-orange-500 text-white rotate-45" : "bg-orange-100 text-orange-500"}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-40 pb-5" : "max-h-0"}`}>
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
   11. FINAL CTA
══════════════════════════════════════════════════════════════ */
interface LeadForm {
  full_name: string; email: string; phone: string;
  website_url: string; service: string; other_service: string; message: string;
}
const EMPTY_FORM: LeadForm = { full_name: "", email: "", phone: "", website_url: "", service: "", other_service: "", message: "" };
type FormErrors = Partial<Record<keyof LeadForm, string>>;

function validate(form: LeadForm, isOtherService: boolean): FormErrors {
  const errs: FormErrors = {};
  if (!form.full_name.trim())   errs.full_name = "Full name is required.";
  if (!form.email.trim())       errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Please enter a valid email.";
  if (!form.service)            errs.service = "Please select a service.";
  if (isOtherService && !form.other_service.trim()) errs.other_service = "Please specify your service.";
  if (!form.message.trim())     errs.message = "Please tell us about your challenges.";
  return errs;
}

function FinalCTA() {
  const [form, setForm] = useState<LeadForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isOtherService = form.service === "Other Service";

  function set(key: keyof LeadForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(form, isOtherService);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const source_page = typeof window !== "undefined" ? window.location.pathname : "";
    const payload = {
      full_name: form.full_name, email: form.email,
      phone: form.phone.trim() || null, website_url: form.website_url.trim() || null,
      service: isOtherService ? form.other_service : form.service,
      message: form.message, source_page,
    };
    const { error } = await supabase.from("leads").insert([payload]);
    setLoading(false);
    if (error) { console.error(error); alert("Something went wrong. Please try again."); return; }
    setSubmitted(true); setForm(EMPTY_FORM); setErrors({});
  };

  const inputCls = "w-full text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors";

  return (
    <section id="cta" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-orange-50 rounded-3xl border border-orange-100 overflow-hidden shadow-sm">
            <div className="grid lg:grid-cols-2">

              {/* LEFT */}
              <div className="p-8 sm:p-10 lg:p-14">
                <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-6 border border-orange-200">
                  Free PPC Audit
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
                  Ready to Make Every Click{" "}
                  <span className="text-orange-500">Count?</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Book a free 30-minute PPC strategy call. We'll audit your existing Google Ads (or build a plan from scratch), show you exactly where budget is being wasted, and outline a roadmap to profitable growth — no pitch, no pressure.
                </p>
                <div className="space-y-3 mb-8">
                  {["Free Google Ads audit included", "Wasted spend and opportunity analysis", "No contracts or lock-ins required", "Data-backed strategy, not guesswork"].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <span className="text-orange-500 flex-shrink-0"><CheckCircle size={15} /></span>
                      <span className="text-gray-700 text-sm font-medium">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2 p-4 bg-white rounded-2xl border border-orange-100">
                  <p className="text-gray-500 text-xs font-semibold w-full mb-1">We manage:</p>
                  {["Search","Shopping","Display","YouTube","Perf. Max","Remarketing","Local"].map((lbl) => (
                    <span key={lbl} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">{lbl}</span>
                  ))}
                  <span className="text-gray-400 text-xs font-medium ml-1">+ more</span>
                </div>
              </div>

              {/* RIGHT — form */}
              <div className="bg-white p-8 sm:p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-orange-100">
                {submitted ? (
                  <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={28} />
                    </div>
                    <h3 className="text-gray-900 font-black text-2xl mb-2">You're Booked In! 🎉</h3>
                    <p className="text-gray-500 text-sm max-w-xs">Our PPC specialist will reach out within 24 hours to confirm your free strategy call and begin your account audit.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-gray-900 font-black text-xl mb-6">Book Your Free PPC Audit</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="full_name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name <span className="text-orange-500">*</span></label>
                          <input id="full_name" type="text" placeholder="Jane Smith" value={form.full_name} onChange={set("full_name")}
                            className={`${inputCls} ${errors.full_name ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                          {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email <span className="text-orange-500">*</span></label>
                          <input id="email" type="email" placeholder="jane@company.com" value={form.email} onChange={set("email")}
                            className={`${inputCls} ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Phone Number <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">(optional)</span>
                          </label>
                          <input id="phone" type="tel" placeholder="+1 7700 900000" value={form.phone} onChange={set("phone")} className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="website_url" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Website URL <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">(optional)</span>
                          </label>
                          <input id="website_url" type="url" placeholder="https://yourbrand.com" value={form.website_url} onChange={set("website_url")} className={inputCls} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Service Looking For <span className="text-orange-500">*</span></label>
                        <SearchableSelect
                          id="service"
                          value={form.service}
                          onChange={(val) => {
                            setForm((prev) => ({ ...prev, service: val, other_service: "" }));
                            if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
                          }}
                          placeholder="Search or select a service…"
                          hasError={!!errors.service}
                        />
                        {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                      </div>

                      {isOtherService && (
                        <div>
                          <label htmlFor="other_service" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Please Specify Your Service <span className="text-orange-500">*</span></label>
                          <input id="other_service" type="text" placeholder="Describe the service you're looking for…"
                            value={form.other_service} onChange={set("other_service")} autoFocus
                            className={`${inputCls} ${errors.other_service ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                          {errors.other_service && <p className="mt-1 text-xs text-red-500">{errors.other_service}</p>}
                        </div>
                      )}

                      <div>
                        <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Business Challenges or Message <span className="text-orange-500">*</span></label>
                        <textarea id="message" rows={4}
                          placeholder="Tell us about your Google Ads goals, current challenges, monthly budget, or anything you'd like us to know…"
                          value={form.message} onChange={set("message")}
                          className={`${inputCls} resize-none ${errors.message ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                      </div>

                      <button type="submit" disabled={loading}
                        className="cursor-pointer w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg mt-1">
                        {loading ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>Sending…
                          </>
                        ) : <>Get My Free PPC Audit <ArrowRight /></>}
                      </button>
                      <p className="text-center text-xs text-gray-400 pt-1">No commitment · Free 30-min audit call · Honest advice</p>
                    </form>
                  </>
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
   PAGE EXPORT
══════════════════════════════════════════════════════════════ */
export default function PPCGoogleAdsClient() {
  return (
    <main>
      <Hero />
      <WhyGoogleAdsSection />
      <CampaignTypesSection />
      <ServicesSection />
      <StatsSection />
      <AuditSection />
      <ProcessSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}