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
const PenIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
const BookIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const FileTextIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);
const VideoIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);
const ImageIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const MailIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const GlobeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const LayersIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const UsersIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const RefreshIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const CheckCircleFilled = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#22c55e" />
    <polyline points="7 12 10 15 17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const XCircleFilled = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#ef4444" />
    <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
const XCircleIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   SEARCHABLE SELECT
══════════════════════════════════════════════════════════════ */
const SERVICE_OPTIONS = [
  "Content Marketing Strategy",
  "Blog Writing & SEO Content",
  "Long-Form Articles & Guides",
  "Case Studies & White Papers",
  "Email Newsletter Writing",
  "Video Script Writing",
  "Infographic & Visual Content",
  "Website Copywriting",
  "Social Media Content",
  "Content Audits & Refreshes",
  "PPC Google Ads Management",
  "Google Search Ads",
  "Google Shopping Ads",
  "Google Display Advertising",
  "YouTube Ads Management",
  "Performance Max Campaigns",
  "Remarketing & Retargeting",
  "Social Media Management",
  "Paid Social Advertising (Meta Ads)",
  "TikTok Ads Management",
  "LinkedIn Ads & B2B Marketing",
  "Influencer Marketing",
  "Social Media Strategy & Audit",
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
              <button type="button" onClick={() => setQuery("")} className="cursor-pointer text-gray-400 hover:text-gray-600 flex-shrink-0">
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10" style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <span>/</span>
          <a href="/services" className="hover:text-orange-500 transition-colors">Services</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">Content Marketing</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Content Marketing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}>
              Content That{" "}
              <span className="relative inline-block text-orange-500">Attracts,</span>
              <br />
              <span className="text-gray-900">Converts</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}>
              We create strategic content that builds your authority, drives organic traffic and generates leads — assets that keep working for you long after they're published.
            </p>

            <ul className="space-y-3 mb-9" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.38s" }}>
              {[
                "SEO-optimised blog posts, guides & long-form content",
                "Brand-aligned copy across every channel",
                "Data-led content strategy and editorial planning",
                "Measurable results — traffic, leads and pipeline",
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
                Get a Free Content Audit <ArrowRight />
              </a>
              <a href="#cta"
                className="cursor-pointer inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                Get In Touch
              </a>
            </div>

            {/* Social proof row */}
            <div className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-100" style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.54s" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["fff7ed/f97316","eff6ff/3b82f6","f0fdf4/22c55e","fdf4ff/a855f7"].map((c, i) => (
                    <img key={i} src={`https://placehold.co/32x32/${c}?text=${["AK","TC","RB","MJ"][i]}`} className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
                  <p className="text-gray-500 text-xs">500+ content published</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">3.2M+</p>
                <p className="text-gray-400 text-xs">Organic visits driven</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">+312%</p>
                <p className="text-gray-400 text-xs">Avg organic traffic lift</p>
              </div>
            </div>
          </div>

          {/* Right — visual */}
          <div className="relative hidden lg:block"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(36px)", transition: "all 0.75s ease 0.3s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50 rounded-3xl transform rotate-2" />
              <img src="https://placehold.co/620x500/fff7ed/f97316?text=Content+Marketing" alt="Content Marketing" className="relative rounded-3xl w-full object-cover shadow-2xl" />
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-green-500"><TrendingUp size={20} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Organic Traffic</p>
                  <p className="text-gray-900 font-black text-sm leading-none">+312% in 6 months</p>
                </div>
              </div>
              <div className="absolute top-1/3 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-orange-500"><PenIcon size={20} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Content Published</p>
                  <p className="text-gray-900 font-black text-sm leading-none">500+ pieces</p>
                </div>
              </div>
              <div className="absolute -bottom-4 right-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-amber-500"><ZapIcon size={20} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Avg Lead Uplift</p>
                  <p className="text-gray-900 font-black text-sm leading-none">+187% from content</p>
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
   2. WHY CONTENT MARKETING — Value + comparison
══════════════════════════════════════════════════════════════ */
function WhyContentSection() {
  const benefits = [
    { icon: <TrendingUp size={22} />, title: "Compounds over time", desc: "Unlike paid ads that stop the moment you stop paying, great content keeps driving traffic, leads and authority for months and years after publishing." },
    { icon: <SearchSVG size={22} />, title: "Owns organic search", desc: "Ranking on page one for high-intent search terms is the most scalable, cost-effective way to attract qualified buyers — and content is how you get there." },
    { icon: <UsersIcon size={22} />, title: "Builds trust at scale", desc: "Content lets you educate, answer objections and demonstrate expertise to thousands of prospects simultaneously — converting cold audiences into warm leads." },
    { icon: <LayersIcon size={22} />, title: "Feeds every channel", desc: "One strong piece of content becomes blog posts, social updates, email newsletters, video scripts and ad copy. A content strategy multiplies your entire marketing output." },
  ];

  const withUs = [
    "Content strategy built around your revenue goals",
    "Expert writers with industry-specific knowledge",
    "Every piece SEO-optimised and conversion-focused",
    "Consistent publishing cadence — never a blank calendar",
    "Clear reporting: traffic, rankings and leads attributed",
    "Content that reflects your unique brand voice",
  ];
  const withoutUs = [
    "Sporadic publishing with no strategic direction",
    "Generic content that ranks for nothing and converts no-one",
    "No connection between content and business results",
    "Wasted time on content your audience doesn't care about",
    "Brand voice inconsistent across channels and writers",
    "Content graveyard — posts published and forgotten",
  ];

  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Why Content Marketing</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            The Only Marketing Asset{" "}
            <span className="text-orange-500">That Gets Better With Age</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            Content marketing delivers 3x more leads than outbound marketing at 62% lower cost. The brands winning in organic search today started investing in content years ago — the best time to start is now.
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
                <h3 className="text-gray-900 font-black text-lg">With Junixo Creating Your Content</h3>
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
                <h3 className="text-gray-900 font-black text-lg">Without a Content Marketing Strategy</h3>
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
   3. CONTENT TYPES WE CREATE
══════════════════════════════════════════════════════════════ */
const contentTypes = [
  { icon: <FileTextIcon size={26} />, name: "Blog Posts & Articles", color: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100", iconColor: "text-orange-500", desc: "SEO-optimised blog content that ranks for your target keywords, educates your audience and drives consistent organic traffic month after month.", tags: ["SEO", "Long-form", "Educational", "Evergreen"] },
  { icon: <BookIcon size={26} />, name: "Guides & White Papers", color: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100", iconColor: "text-blue-600", desc: "In-depth guides, e-books and white papers that demonstrate expertise, capture leads and position your brand as the authority in your industry.", tags: ["Authority", "Lead Gen", "Gated Content", "Research"] },
  { icon: <PenIcon size={26} />, name: "Case Studies", color: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100", iconColor: "text-green-600", desc: "Compelling client success stories that prove your results, overcome buyer objections and convert late-stage prospects into paying customers.", tags: ["Social Proof", "Sales Enablement", "B2B", "Storytelling"] },
  { icon: <VideoIcon size={26} />, name: "Video Scripts", color: "bg-gradient-to-br from-red-50 to-orange-50 border-red-100", iconColor: "text-red-500", desc: "Engaging scripts for YouTube, social media, explainer videos, webinars and product demos — structured to hook, educate and convert.", tags: ["YouTube", "Explainer", "Webinar", "Social Video"] },
  { icon: <MailIcon size={26} />, name: "Email Newsletters", color: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100", iconColor: "text-purple-600", desc: "Regular newsletters that keep your audience warm, build trust over time and drive clicks back to your site — without ever feeling like spam.", tags: ["Nurture", "Retention", "Click-Through", "Sequence"] },
  { icon: <ImageIcon size={26} />, name: "Infographics & Visuals", color: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100", iconColor: "text-pink-500", desc: "Data visualisations, infographics and branded visual assets that communicate complex ideas clearly and are highly shareable across social platforms.", tags: ["Shareability", "Data Viz", "Brand", "Social Media"] },
  { icon: <GlobeIcon size={26} />, name: "Website Copy", color: "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100", iconColor: "text-teal-600", desc: "Conversion-focused copy for homepages, landing pages, service pages and about pages — written to rank and persuade simultaneously.", tags: ["Conversion", "SEO", "Landing Pages", "Homepage"] },
  { icon: <RefreshIcon size={26} />, name: "Content Refreshes", color: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100", iconColor: "text-amber-600", desc: "Audit and update your existing content library to recover lost rankings, improve conversion rates and squeeze more value from work already done.", tags: ["Audit", "Re-optimise", "Quick Wins", "Rankings"] },
];

function ContentTypesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Content We Create</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Every Content Format{" "}
            <span className="text-orange-500">That Drives Growth</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            We produce the full spectrum of content your business needs — always strategically planned, expertly written and built to deliver measurable results.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contentTypes.map((p, i) => (
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
    badge: "Content Strategy",
    icon: <LayersIcon size={24} />,
    color: "bg-orange-100 text-orange-500",
    title: "Strategy First, Content Second",
    desc: "Great content starts with a plan. We research your audience, audit your competitors, map your keyword opportunities and build a content roadmap tied directly to your business objectives — so every piece you publish has a purpose.",
    points: [
      "Audience persona and intent mapping",
      "Competitor content gap analysis",
      "Keyword opportunity research and prioritisation",
      "Editorial calendar planning and topic clustering",
    ],
    img: "https://placehold.co/560x400/fff7ed/f97316?text=Content+Strategy",
    stat: { value: "+312%", label: "Avg organic traffic growth" },
    flip: false,
  },
  {
    badge: "SEO Content Writing",
    icon: <PenIcon size={24} />,
    color: "bg-amber-100 text-amber-600",
    title: "Content That Ranks and Converts",
    desc: "We write long-form content that satisfies both search engines and human readers. Every piece is structured for maximum dwell time, optimised for featured snippets and written to move readers towards a conversion — not just inform them.",
    points: [
      "Expert writers with niche subject knowledge",
      "On-page SEO: headers, schema, internal linking",
      "Conversion-oriented CTAs woven throughout",
      "Peer-reviewed for accuracy and brand voice",
    ],
    img: "https://placehold.co/560x400/fffbeb/d97706?text=SEO+Content+Writing",
    stat: { value: "Top 3", label: "Avg keyword ranking for target terms" },
    flip: true,
  },
  {
    badge: "Content Distribution",
    icon: <GlobeIcon size={24} />,
    color: "bg-green-100 text-green-600",
    title: "Publish Once, Appear Everywhere",
    desc: "A blog post left to gather dust is a wasted asset. We distribute and repurpose your content across email, social, communities and syndication networks — maximising the reach of every piece and compounding its value over time.",
    points: [
      "Multi-channel content repurposing",
      "Email newsletter integration and sequencing",
      "Social media snippet and visual creation",
      "Syndication to relevant industry publications",
    ],
    img: "https://placehold.co/560x400/f0fdf4/22c55e?text=Content+Distribution",
    stat: { value: "5x", label: "Avg content reach per published piece" },
    flip: false,
  },
  {
    badge: "Performance & Reporting",
    icon: <BarChart size={24} />,
    color: "bg-purple-100 text-purple-500",
    title: "Content You Can Tie to Revenue",
    desc: "We track what matters — organic sessions, keyword rankings, time-on-page, conversions and pipeline attributed to content. Monthly reports give you clear visibility on ROI and inform what we create next.",
    points: [
      "Monthly content performance dashboards",
      "Keyword rank tracking and SERP monitoring",
      "Conversion attribution from content to leads",
      "Ongoing content refresh recommendations",
    ],
    img: "https://placehold.co/560x400/fdf4ff/a855f7?text=Content+Reporting",
    stat: { value: "+187%", label: "Avg leads from organic content" },
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
            A Complete Content Marketing{" "}
            <span className="text-orange-500">Service</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">From strategy and writing to distribution and reporting — everything your brand needs to win with content.</p>
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
  { value: 500, suffix: "+",  label: "Content Published",  sub: "Blogs, guides, case studies",     icon: <PenIcon size={26} />,      color: "text-orange-500 bg-orange-50" },
  { value: 3,   suffix: "M+", label: "Organic Visits Driven",        sub: "Across all client websites",      icon: <TrendingUp size={26} />,   color: "text-green-600 bg-green-50" },
  { value: 312, suffix: "%",  label: "Avg Traffic Growth",           sub: "Within 12 months",               icon: <BarChart size={26} />,     color: "text-amber-500 bg-amber-50" },
  { value: 187, suffix: "%",  label: "Avg Lead Uplift",              sub: "From organic content alone",      icon: <ZapIcon size={26} />,      color: "text-purple-500 bg-purple-50" },
  { value: 89,  suffix: "%",  label: "Client Retention Rate",        sub: "Stay 12+ months",                icon: <HeartIcon size={26} />,    color: "text-rose-500 bg-rose-50" },
  { value: 94,  suffix: "%",  label: "Ranking in Top 10",    sub: "Avg across target keywords",      icon: <SearchSVG size={26} />,    color: "text-orange-500 bg-orange-50" },
];

function StatsSection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Results by Numbers</span>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900">Content That Actually Performs</h2>
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
   6. UNIQUE: CONTENT HEALTH CHECK — Light section with common content mistakes
══════════════════════════════════════════════════════════════ */
const healthFindings = [
  { pct: "82%", label: "of brand blogs have no keyword strategy behind their posts", detail: "Publishing without SEO intent means ranking for nothing.", color: "bg-red-50 border-red-200", pctColor: "text-red-500", labelColor: "text-gray-900", detailColor: "text-gray-500" },
  { pct: "67%", label: "of companies have no documented content strategy at all", detail: "Tactical content without strategy produces inconsistent results.", color: "bg-amber-50 border-amber-200", pctColor: "text-amber-600", labelColor: "text-gray-900", detailColor: "text-gray-500" },
  { pct: "73%", label: "of published content generates zero backlinks or shares", detail: "Content created without distribution in mind just sits there.", color: "bg-orange-50 border-orange-200", pctColor: "text-orange-500", labelColor: "text-gray-900", detailColor: "text-gray-500" },
  { pct: "58%", label: "of marketers can't attribute content to revenue or leads", detail: "Without measurement, content spend is unjustifiable.", color: "bg-rose-50 border-rose-200", pctColor: "text-rose-500", labelColor: "text-gray-900", detailColor: "text-gray-500" },
];

function ContentHealthSection() {
  return (
    <section className="py-20 lg:py-24 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Industry Reality Check</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Most Content Marketing{" "}
            <span className="text-orange-500">Isn't Working</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            Businesses spend time and money on content every day — but without the right strategy, it barely moves the needle. Here's what the data shows.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {healthFindings.map((f, i) => (
            <FadeIn key={f.pct} delay={i * 70}>
              <div className={`rounded-2xl border p-6 ${f.color} h-full`}>
                <p className={`text-4xl font-black mb-3 ${f.pctColor}`}>{f.pct}</p>
                <p className={`font-bold text-sm leading-snug mb-2 ${f.labelColor}`}>{f.label}</p>
                <p className={`text-xs leading-relaxed ${f.detailColor}`}>{f.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={100}>
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto shadow-2xl shadow-orange-200">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute top-4 right-32 w-6 h-6 bg-white/20 rounded-full pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-7">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mt-0.5">
                  <PenIcon size={22} />
                </div>
                <div>
                  <p className="text-white font-black text-xl sm:text-2xl leading-tight mb-1.5">Is your content one of them?</p>
                  <p className="text-orange-100 text-sm leading-relaxed max-w-sm">Find out what's holding your content back — free content audit, results within 48 hours.</p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {["Free audit","No commitment","48hr turnaround"].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 sm:self-center">
                <a href="#cta"
                  className="cursor-pointer group inline-flex items-center gap-2.5 bg-white text-orange-600 font-black px-7 py-4 rounded-2xl hover:bg-orange-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-orange-700/25 text-sm whitespace-nowrap">
                  Get My Free Content Audit
                  <span className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <ArrowRight size={13} />
                  </span>
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
   7. PROCESS
══════════════════════════════════════════════════════════════ */
const process = [
  { num: "01", icon: <SearchSVG size={20} />, title: "Discovery & Audit", desc: "We audit your existing content, analyse your competitors, research keyword opportunities and understand your audience's intent and pain points." },
  { num: "02", icon: <LayersIcon size={20} />, title: "Strategy & Planning", desc: "We build a content strategy and editorial calendar tied to your business goals — topic clusters, content types, publishing cadence and distribution plan." },
  { num: "03", icon: <PenIcon size={20} />, title: "Creation", desc: "Expert writers produce content that is SEO-optimised, on-brand and genuinely useful to your audience — reviewed, edited and ready to publish." },
  { num: "04", icon: <GlobeIcon size={20} />, title: "Publish & Distribute", desc: "Content goes live and gets amplified across email, social and relevant communities. Every piece gets the distribution it deserves." },
  { num: "05", icon: <BarChart size={20} />, title: "Measure & Compound", desc: "Monthly reporting on rankings, traffic and conversions. We learn what works, double down and refresh underperforming content to keep compounding results." },
];

function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">How We Work</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            From Strategy to{" "}
            <span className="text-orange-500">Compounding Results</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">A clear 5-step process that turns content from a cost centre into your most valuable growth channel.</p>
        </FadeIn>

        {/* Desktop */}
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

        {/* Mobile */}
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
    tag: "SEO Blog Strategy",
    industry: "SaaS",
    title: "SaaS Brand Grows Organic Traffic 8x",
    result: "A full content strategy overhaul replaced random blogging with a topic cluster approach. 60 pieces of optimised content published over 9 months drove an 8x increase in organic sessions and halved CAC.",
    metrics: [{ label: "Organic Traffic", value: "8x" }, { label: "CAC Reduction", value: "-52%" }, { label: "Keyword Rankings", value: "+340" }],
    img: "https://placehold.co/480x320/fff7ed/f97316?text=SaaS+Content+Case",
    quote: "We went from zero organic presence to ranking in the top 3 for our most valuable keywords in under a year. The content Junixo produced is still compounding.",
    client: "Head of Growth, B2B SaaS",
  },
  {
    tag: "Long-form Guides + Case Studies",
    industry: "Professional Services",
    title: "Law Firm Generates 3x More Inbound Leads",
    result: "Strategic long-form guides and optimised service pages positioned the firm as the definitive authority in their practice area, tripling inbound enquiries from organic search with zero paid spend.",
    metrics: [{ label: "Inbound Leads", value: "3x" }, { label: "Organic Sessions", value: "+280%" }, { label: "Domain Authority", value: "+24pts" }],
    img: "https://placehold.co/480x320/f0fdf4/22c55e?text=Legal+Content+Case",
    quote: "We used to rely entirely on referrals. Now we have a steady stream of high-quality inbound enquiries from people who found us via Google. Content did that.",
    client: "Managing Partner, Boutique Law Firm",
  },
  {
    tag: "Content + Email Nurture",
    industry: "E-commerce",
    title: "E-commerce Brand Cuts Paid Spend by 40%",
    result: "A content strategy combining SEO blog content with an email nurture sequence using repurposed articles reduced dependency on paid acquisition — cutting ad spend by 40% while maintaining the same revenue.",
    metrics: [{ label: "Paid Spend Saved", value: "-40%" }, { label: "Email Open Rate", value: "+68%" }, { label: "Revenue", value: "Maintained" }],
    img: "https://placehold.co/480x320/eff6ff/3b82f6?text=Ecommerce+Content+Case",
    quote: "We never thought content could replace paid ads. Junixo showed us it could — and saved us tens of thousands in the process.",
    client: "Founder, DTC E-commerce Brand",
  },
];

function CaseStudiesSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Proven Results</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Content That{" "}
            <span className="text-orange-500">Pays for Itself</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">See how strategic content has driven real, measurable growth for businesses across industries.</p>
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
  { quote: "Junixo took our content from random blog posts nobody read to a proper SEO machine. We rank for 200+ keywords now and get leads daily from organic search. Transformative.", name: "Sophie Caldwell", role: "Marketing Director, SaaS Company", img: "https://placehold.co/56x56/fff7ed/f97316?text=SC" },
  { quote: "The quality of writing is exceptional — they actually understood our industry, which I didn't think was possible. Our clients comment on our blog posts. That's never happened before.", name: "David Okafor", role: "Founder, Consulting Firm", img: "https://placehold.co/56x56/f0fdf4/22c55e?text=DO" },
  { quote: "Within 6 months of working with Junixo on content, organic traffic had tripled. Within 12 months we halved our paid ad budget because we didn't need it as much.", name: "Rachel Kim", role: "Head of Marketing, E-commerce", img: "https://placehold.co/56x56/eff6ff/3b82f6?text=RK" },
  { quote: "We had content. We just had no strategy. Junixo audited everything, rebuilt our approach and the results within 90 days were beyond what we thought was possible.", name: "Marcus Webb", role: "CEO, Professional Services", img: "https://placehold.co/56x56/fdf4ff/a855f7?text=MW" },
];

function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Client Stories</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
            What Clients Say{" "}
            <span className="text-orange-500">About Our Content</span>
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
  { q: "How long does it take to see results from content marketing?", a: "Content marketing is a medium-term investment. You'll typically see early ranking movements within 60–90 days and meaningful traffic growth within 4–6 months. The compound effect means results accelerate significantly in months 6–12 and beyond." },
  { q: "Do you write the content yourselves or use AI?", a: "All content is written by experienced human writers with subject matter expertise in your industry. We use AI tools only for research and ideation — never to produce the final copy. Every piece is reviewed for quality, accuracy and brand voice before delivery." },
  { q: "How many pieces of content do you produce per month?", a: "This depends on your package and goals. We typically recommend 4–8 pieces per month for meaningful SEO impact. We'll propose a publishing cadence based on your budget, competition level and growth targets in our initial strategy session." },
  { q: "Do you need to understand our industry to write good content?", a: "Yes, and we take this seriously. Before writing anything, we conduct industry and topic research, interview your subject matter experts where needed, and have content reviewed by your team. Our writers are briefed extensively and we don't publish anything you're not happy with." },
  { q: "Will you optimise our existing content too?", a: "Yes — and often this is where the quickest wins are. A content refresh programme can recover lost rankings and improve conversion rates on articles you've already invested in, typically faster than starting from scratch." },
  { q: "Is there a minimum commitment?", a: "No lock-in contracts. We work month-to-month. That said, content marketing delivers compounding returns over time — clients who commit to 6+ months consistently see the most significant results." },
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
   11. FINAL CTA / FORM
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
  if (!form.message.trim())     errs.message = "Please tell us about your goals.";
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
                  Free Content Audit
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
                  Ready for Content That{" "}
                  <span className="text-orange-500">Actually Grows Your Business?</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Book a free 30-minute content strategy call. We'll audit your existing content (or build a plan from scratch), show you exactly what opportunities you're missing and outline a roadmap to organic growth — no pitch, no pressure.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Free content audit and gap analysis",
                    "Keyword opportunity assessment included",
                    "No contracts or lock-ins required",
                    "Strategy-first — not just content production",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <span className="text-orange-500 flex-shrink-0"><CheckCircle size={15} /></span>
                      <span className="text-gray-700 text-sm font-medium">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2 p-4 bg-white rounded-2xl border border-orange-100">
                  <p className="text-gray-500 text-xs font-semibold w-full mb-1">Content we create:</p>
                  {["Blog Posts","Guides","Case Studies","Video Scripts","Email","Infographics"].map((lbl) => (
                    <span key={lbl} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">{lbl}</span>
                  ))}
                  <span className="text-gray-400 text-xs font-medium ml-1">+ more</span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="bg-white p-8 sm:p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-orange-100">
                {submitted ? (
                  <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={28} />
                    </div>
                    <h3 className="text-gray-900 font-black text-2xl mb-2">You're All Set! 🎉</h3>
                    <p className="text-gray-500 text-sm max-w-xs">Our content strategist will reach out within 24 hours to confirm your free strategy call and kick off your content audit.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-gray-900 font-black text-xl mb-6">Book Your Free Content Audit</h3>
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
                        <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Content Goals or Message <span className="text-orange-500">*</span></label>
                        <textarea id="message" rows={4}
                          placeholder="Tell us about your content goals, what you've tried before, your audience, monthly budget, or anything you'd like us to know…"
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
                        ) : <>Get My Free Content Audit <ArrowRight /></>}
                      </button>
                      <p className="text-center text-xs text-gray-400 pt-1">No commitment · Free 30-min strategy call · Honest advice</p>
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
export default function ContentMarketingClient() {
  return (
    <main>
      <Hero />
      <WhyContentSection />
      <ContentTypesSection />
      <ServicesSection />
      <StatsSection />
      <ContentHealthSection />
      <ProcessSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}