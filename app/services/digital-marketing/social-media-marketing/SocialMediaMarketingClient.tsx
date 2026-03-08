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
    up:    inView ? "translateY(0)" : "translateY(30px)",
    left:  inView ? "translateX(0)" : "translateX(-30px)",
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

/* ─── SEARCHABLE SELECT ─── */
const SERVICE_OPTIONS = [
  "Social Media Marketing",
  "PPC / Google Ads",
  "Content Marketing",
  "Email Marketing",
  "Influencer Marketing",
  "SEO – On-Page & Technical",
  "SEO – Link Building",
  "Local SEO",
  "E-commerce SEO",
  "Custom Website Design",
  "WordPress Development",
  "Shopify Development",
  "Landing Page Design",
  "UI / UX Design",
  "iOS App Development",
  "Android App Development",
  "React Native Apps",
  "Flutter Development",
  "SaaS Development",
  "Other Service",
];

function SearchableSelect({
  value,
  onChange,
  placeholder = "Search services…",
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = SERVICE_OPTIONS.filter(o =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between text-sm px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none transition-colors text-left ${
          open ? "border-orange-400 bg-white" : "border-gray-200 hover:border-orange-300"
        } ${value ? "text-gray-700" : "text-gray-400"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg className={`flex-shrink-0 w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          {/* Search input inside dropdown */}
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type to search…"
                className="w-full pl-8 pr-3 py-2 text-xs text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>
          {/* Options list */}
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-xs text-gray-400 text-center">No services found</li>
            ) : filtered.map(option => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 ${
                    value === option
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                  } ${option === "Other Service" ? "border-t border-gray-100 font-medium" : ""}`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
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
const XCircle = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
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
const UsersIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
const MessageIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const CameraIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);
const GlobeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const LightbulbIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);
const LayersIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);

/* Platform SVG icons */
const InstagramIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const FacebookIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const LinkedInIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const TikTokIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);
const TwitterIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const YoutubeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const PinterestIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

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
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-pink-50 rounded-full opacity-50" style={{ transform: "translate(-25%,25%)" }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-orange-200 opacity-25"
            style={{ width: [5,8,4,6,3][i], height: [5,8,4,6,3][i], top: ["18%","70%","40%","82%","28%"][i], left: ["8%","5%","90%","72%","95%"][i] }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10"
          style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <span>/</span>
          <a href="/services" className="hover:text-orange-500 transition-colors">Services</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">Social Media Marketing</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-1.5 mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">Social Media Marketing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}>
              Turn Followers Into{" "}
              <span className="relative inline-block text-orange-500">
                Paying Customers
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 300 6" preserveAspectRatio="none">
                  <path d="M0,3 Q75,0 150,3 Q225,6 300,3" stroke="#fb923c" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}>
              We build and manage social media strategies that grow your audience, spark engagement, and drive real revenue — not just vanity metrics.
            </p>

            <ul className="space-y-3 mb-9"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.38s" }}>
              {["Platform-specific content strategies", "Paid social campaigns with measurable ROAS", "Community management & brand voice", "Monthly reporting with real KPIs"].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                  <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>{item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3" style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.46s" }}>
              <a href="/get-a-quote" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                Get a Free Strategy Call <ArrowRight />
              </a>
              <a href="#pricing" className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                View Pricing
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-100"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.54s" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["fff7ed/f97316","eff6ff/3b82f6","f0fdf4/22c55e","fdf4ff/a855f7"].map((c, i) => (
                    <img key={i} src={`https://placehold.co/32x32/${c}?text=${["SM","JO","PS","DC"][i]}`} className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
                  <p className="text-gray-500 text-xs">Loved by our clients</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <div className="flex flex-wrap gap-4">
                {[{ i: <InstagramIcon size={14} />, c: "text-pink-500" }, { i: <FacebookIcon size={14} />, c: "text-blue-600" }, { i: <TikTokIcon size={14} />, c: "text-gray-800" }, { i: <LinkedInIcon size={14} />, c: "text-blue-700" }, { i: <TwitterIcon size={14} />, c: "text-gray-700" }, { i: <YoutubeIcon size={14} />, c: "text-red-500" }].map((p, idx) => (
                  <span key={idx} className={p.c}>{p.i}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(36px)", transition: "all 0.75s ease 0.3s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-50 rounded-3xl transform rotate-2" />
              <img src="https://placehold.co/620x500/fff7ed/f97316?text=Social+Media+Growth" alt="Social Media Marketing" className="relative rounded-3xl w-full object-cover shadow-2xl" />
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-pink-500"><InstagramIcon size={20} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instagram</p>
                  <p className="text-gray-900 font-black text-sm leading-none">+124% reach</p>
                </div>
              </div>
              <div className="absolute top-1/3 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-blue-600"><FacebookIcon size={20} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Facebook</p>
                  <p className="text-gray-900 font-black text-sm leading-none">8.2x ROAS</p>
                </div>
              </div>
              <div className="absolute -bottom-4 right-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-gray-100">
                <span className="text-gray-900"><TikTokIcon size={20} /></span>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">TikTok</p>
                  <p className="text-gray-900 font-black text-sm leading-none">2.1M views</p>
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
   2. PLATFORMS
══════════════════════════════════════════════════════════════ */
const platforms = [
  { icon: <InstagramIcon size={28} />, name: "Instagram", color: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100", iconColor: "text-pink-500", desc: "Reels, Stories, carousels and shopping — full funnel Instagram management that builds communities and converts.", tags: ["Reels","Stories","Shopping","Influencer"] },
  { icon: <FacebookIcon size={28} />, name: "Facebook", color: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100", iconColor: "text-blue-600", desc: "Page management, Meta Ads, retargeting, and lead generation campaigns that scale profitably.", tags: ["Meta Ads","Retargeting","Groups","Lead Gen"] },
  { icon: <TikTokIcon size={28} />, name: "TikTok", color: "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-100", iconColor: "text-gray-900", desc: "Short-form video strategy, trending content, and TikTok Ads that reach audiences where attention is highest.", tags: ["Short-form Video","TikTok Ads","Trends","UGC"] },
  { icon: <LinkedInIcon size={28} />, name: "LinkedIn", color: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100", iconColor: "text-blue-700", desc: "B2B content, thought leadership, LinkedIn Ads and lead generation for professional audiences.", tags: ["B2B","Thought Leadership","LinkedIn Ads","Lead Gen"] },
  { icon: <TwitterIcon size={28} />, name: "X / Twitter", color: "bg-gradient-to-br from-gray-50 to-zinc-50 border-gray-100", iconColor: "text-gray-900", desc: "Real-time brand voice, trending conversations, community building and Twitter Ads.", tags: ["Brand Voice","Conversations","Ads","Community"] },
  { icon: <YoutubeIcon size={28} />, name: "YouTube", color: "bg-gradient-to-br from-red-50 to-orange-50 border-red-100", iconColor: "text-red-500", desc: "Long-form video strategy, YouTube SEO, channel growth and YouTube Ads that drive subscriptions and conversions.", tags: ["Video SEO","YouTube Ads","Shorts","Channel Growth"] },
  { icon: <PinterestIcon size={28} />, name: "Pinterest", color: "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100", iconColor: "text-rose-600", desc: "Visual discovery campaigns, Pinterest Ads and boards that drive traffic for lifestyle, fashion and home brands.", tags: ["Visual Content","Pinterest Ads","Boards","Shopping"] },
  { icon: <GlobeIcon size={28} />, name: "Emerging Platforms", color: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100", iconColor: "text-orange-500", desc: "BeReal, Threads, Snapchat — we stay ahead of the curve so your brand is first on every platform that matters next.", tags: ["Threads","Snapchat","BeReal","Early Mover"] },
];

function PlatformsSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Platforms We Master</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">Every Platform Where Your <span className="text-orange-500">Audience Lives</span></h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">We don't post the same content everywhere. We build platform-native strategies that feel organic on every channel.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((p, i) => (
            <FadeIn key={p.name} delay={i * 60}>
              <div className={`group border ${p.color} rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col`}>
                <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm ${p.iconColor} transition-transform duration-300 group-hover:scale-110`}>{p.icon}</div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{p.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(tag => (
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
   3. SERVICES — alternating rows
══════════════════════════════════════════════════════════════ */
const serviceRows = [
  { badge: "Content Creation", icon: <CameraIcon size={24} />, color: "bg-pink-100 text-pink-500", title: "Content That Stops the Scroll", desc: "We create platform-native content that captures attention in the first second — Reels, carousels, short-form video, static graphics and Stories — all crafted to fit your brand voice and drive engagement.", points: ["Brand-consistent visual identity","Platform-specific formats and sizing","Caption copywriting and hashtag strategy","Monthly content calendar and scheduling"], img: "https://placehold.co/560x400/fff7ed/f97316?text=Content+Creation", stat: { value: "4.2x", label: "Avg engagement lift" }, flip: false },
  { badge: "Paid Social Advertising", icon: <TargetIcon size={24} />, color: "bg-blue-100 text-blue-500", title: "Ads That Pay for Themselves", desc: "We build, manage and scale paid social campaigns across Meta, TikTok, LinkedIn and more. From audience research and creative testing to bid optimization — every pound of ad spend is tracked to real revenue.", points: ["Full-funnel campaign architecture","Audience segmentation and lookalikes","Creative A/B testing and iteration","Weekly performance reviews and optimisation"], img: "https://placehold.co/560x400/eff6ff/3b82f6?text=Paid+Social+Ads", stat: { value: "6.8x", label: "Average ROAS achieved" }, flip: true },
  { badge: "Community Management", icon: <MessageIcon size={24} />, color: "bg-emerald-100 text-emerald-500", title: "Build a Community, Not Just a Following", desc: "Followers don't pay your bills — communities do. We manage your DMs, comments, and brand conversations every day so your audience feels heard, valued and loyal.", points: ["Daily comment and DM monitoring","Brand voice guidelines and tone","Crisis management and escalation protocols","Competitor and trend monitoring"], img: "https://placehold.co/560x400/f0fdf4/22c55e?text=Community+Management", stat: { value: "89%", label: "Response rate maintained" }, flip: false },
  { badge: "Influencer Marketing", icon: <UsersIcon size={24} />, color: "bg-purple-100 text-purple-500", title: "Influencer Partnerships That Convert", desc: "We identify, vet and manage influencer campaigns — from nano influencers with hyper-engaged audiences to major macro partnerships. Every collaboration is tracked for reach, engagement and actual sales impact.", points: ["Influencer research and vetting","Campaign brief and creative direction","Contract negotiation and management","Performance tracking and ROI reporting"], img: "https://placehold.co/560x400/fdf4ff/a855f7?text=Influencer+Marketing", stat: { value: "3.1x", label: "Avg influencer campaign ROI" }, flip: true },
];

function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">What's Included</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">A Full Social Media <span className="text-orange-500">Growth Engine</span></h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">Everything you need to grow, engage, and convert across social — under one roof.</p>
        </FadeIn>
        <div className="space-y-24 lg:space-y-32">
          {serviceRows.map((s) => (
            <FadeIn key={s.badge} delay={80}>
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${s.flip ? "lg:grid-flow-dense" : ""}`}>
                <div className={s.flip ? "lg:col-start-2" : ""}>
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-3xl transform ${s.flip ? "-rotate-2" : "rotate-2"} bg-orange-50`} />
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
                    {s.points.map(pt => (
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
   4. SEO CONTENT — Section A (text left, image right)
══════════════════════════════════════════════════════════════ */
function SeoSectionA() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-4">Why Social Media Marketing Matters</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Social Media is the Fastest-Growing <span className="text-orange-500">Digital Sales Channel</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-5">
              Over 4.9 billion people use social media globally — and they're not just scrolling. They're discovering brands, researching products, and making purchasing decisions every day. Businesses that invest in a structured social media strategy consistently outperform competitors who treat it as an afterthought.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              At Junixo Digital, our social media marketing service is built around one core principle: every post, every ad, and every piece of content should move your business forward. We combine data-driven audience insights with compelling creative to build a social presence that actually generates revenue.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <TrendingUp size={18} />, label: "Revenue-Driven Strategy", desc: "Every campaign tied to real business outcomes" },
                { icon: <TargetIcon size={18} />, label: "Precision Targeting", desc: "Reach exactly the right audience at the right time" },
                { icon: <LightbulbIcon size={18} />, label: "Creative That Converts", desc: "Platform-native content engineered for engagement" },
                { icon: <BarChart size={18} />, label: "Transparent Reporting", desc: "Clear metrics with no jargon or spin" },
              ].map(item => (
                <div key={item.label} className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                  <div className="text-orange-500 mb-2">{item.icon}</div>
                  <p className="text-gray-900 font-bold text-sm mb-1">{item.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={100}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-50 rounded-3xl transform rotate-2" />
              <img src="https://placehold.co/580x440/fff7ed/f97316?text=Social+Strategy+Dashboard" alt="Social Media Strategy" className="relative rounded-3xl w-full object-cover shadow-2xl" />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Avg Client Result</p>
                <p className="text-orange-500 font-black text-2xl leading-none">+340%</p>
                <p className="text-gray-600 text-xs font-medium">Follower growth in 6 months</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. SEO CONTENT — Section B (image left, text right)
══════════════════════════════════════════════════════════════ */
function SeoSectionB() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-2 shadow-sm" />
              <img src="https://placehold.co/580x440/eff6ff/3b82f6?text=Paid+Social+Results" alt="Paid Social Media Results" className="relative rounded-3xl w-full object-cover shadow-xl" />
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-5 py-4 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Average ROAS</p>
                <p className="text-orange-500 font-black text-2xl leading-none">6.8x</p>
                <p className="text-gray-600 text-xs font-medium">Across e-commerce clients</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={100}>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-4">Paid Social That Actually Scales</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Stop Wasting Ad Spend. Start <span className="text-orange-500">Generating Predictable ROI</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-5">
              Most businesses struggle with paid social because they lack a structured approach. Without the right audience segmentation, creative testing framework, and campaign architecture, ad spend burns quickly with little to show for it.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Our paid social management service is built on a proven full-funnel framework — from awareness campaigns that build brand recognition, to conversion campaigns that turn interest into sales, to retention campaigns that maximise customer lifetime value. Every campaign is tracked, tested, and optimised weekly.
            </p>
            <ul className="space-y-3">
              {[
                "Meta Ads (Facebook & Instagram) managed to consistent ROAS",
                "TikTok Ads strategy for high-reach, low-cost acquisition",
                "LinkedIn Ads for B2B lead generation and pipeline growth",
                "Full creative production — copy, graphics, video, and A/B testing",
                "Transparent reporting with weekly performance summaries",
              ].map(point => (
                <li key={point} className="flex items-start gap-3">
                  <span className="text-orange-500 flex-shrink-0 mt-0.5"><CheckCircle size={15} /></span>
                  <span className="text-gray-700 text-sm font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. SEO CONTENT — Section C (centered grid)
══════════════════════════════════════════════════════════════ */
const seoGrid = [
  { icon: <LayersIcon size={24} />, color: "bg-orange-100 text-orange-500", title: "Platform-Native Content Strategy", desc: "We don't repurpose the same content across every platform. Each channel gets a strategy built around how its algorithm works, what format drives the most reach, and what type of content its users actually want to see. Instagram Reels require a completely different approach to LinkedIn articles or TikTok videos — and we know the difference." },
  { icon: <UsersIcon size={24} />, color: "bg-pink-100 text-pink-500", title: "Audience-First Targeting & Segmentation", desc: "Understanding who your customer is — their interests, behaviours, and purchase intent — is the foundation of every campaign we build. We use platform-native audience tools, first-party data, lookalike audiences, and retargeting sequences to make sure your content and ads reach people who are genuinely likely to become customers." },
  { icon: <ZapIcon size={24} />, color: "bg-blue-100 text-blue-500", title: "Data-Led Optimisation & Growth", desc: "Social media marketing isn't set-and-forget. Our team reviews performance data weekly, running creative tests, adjusting targeting parameters, and reallocating budgets to the highest-performing content and campaigns. Over time, this compounds — brands that work with us for 6+ months typically see exponential improvements in results versus month one." },
];

function SeoSectionC() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Our Approach</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            What Sets Our Social Media Marketing <span className="text-orange-500">Apart from the Rest</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            Most agencies post content and call it a strategy. We build systems that compound — turning social media into one of your most reliable growth channels.
          </p>
        </FadeIn>
        <div className="grid lg:grid-cols-3 gap-7">
          {seoGrid.map((item, i) => (
            <FadeIn key={item.title} delay={i * 80}>
              <div className="group bg-white border border-gray-100 hover:border-orange-200 rounded-2xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>{item.icon}</div>
                <h3 className="text-gray-900 font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. STATS
══════════════════════════════════════════════════════════════ */
const stats = [
  { value: 80,  suffix: "+",  label: "Brands Managed",          sub: "Across all industries",      icon: <UsersIcon size={26} />,    color: "text-orange-500 bg-orange-50" },
  { value: 12,  suffix: "M+", label: "Impressions Generated",   sub: "In the last 12 months",      icon: <GlobeIcon size={26} />,    color: "text-pink-500 bg-pink-50" },
  { value: 68,  suffix: "x",  label: "Avg Paid Social ROAS",    sub: "Across e-commerce clients",  icon: <TrendingUp size={26} />,   color: "text-blue-500 bg-blue-50" },
  { value: 340, suffix: "%",  label: "Avg Follower Growth",      sub: "In the first 6 months",      icon: <BarChart size={26} />,     color: "text-emerald-500 bg-emerald-50" },
  { value: 89,  suffix: "%",  label: "Client Retention Rate",   sub: "Stay for 12+ months",        icon: <HeartIcon size={26} />,    color: "text-rose-500 bg-rose-50" },
  { value: 24,  suffix: "hr", label: "Community Response Time", sub: "Average across all clients", icon: <MessageIcon size={26} />,  color: "text-purple-500 bg-purple-50" },
];

function StatsSection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section className="py-16 lg:py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Results by Numbers</span>
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
   8. PROCESS
══════════════════════════════════════════════════════════════ */
const process = [
  { num: "01", icon: <MessageIcon size={20} />, title: "Discovery & Audit", desc: "We audit your existing social presence, analyse competitors, and identify the gaps and opportunities unique to your brand and industry." },
  { num: "02", icon: <TargetIcon size={20} />, title: "Strategy & Positioning", desc: "We define your social media goals, target audiences, platform priorities, content pillars, and KPIs — all in a written strategy document." },
  { num: "03", icon: <CameraIcon size={20} />, title: "Content Creation", desc: "Our creative team produces platform-native content — copy, graphics, video, Reels — aligned with your brand voice and monthly calendar." },
  { num: "04", icon: <ZapIcon size={20} />, title: "Launch & Publish", desc: "Content is scheduled and published at optimal times for each platform. Paid campaigns go live with full tracking in place from day one." },
  { num: "05", icon: <BarChart size={20} />, title: "Optimise & Report", desc: "Weekly optimisation. Monthly deep-dive reports. Every decision is backed by data — we double down on what works and cut what doesn't." },
];

function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">How We Work</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">From Audit to <span className="text-orange-500">Consistent Growth</span></h2>
          <p className="text-gray-500 mt-4 text-base">A structured 5-step process that removes guesswork and drives compound results.</p>
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
   9. CASE STUDIES
══════════════════════════════════════════════════════════════ */
const caseStudies = [
  { tag: "Instagram + TikTok", industry: "Fashion & Apparel", title: "D2C Fashion Brand Goes Viral", result: "1.2M organic impressions in 30 days after a Reels strategy overhaul. TikTok content drove 34% of monthly website traffic.", metrics: [{ label: "Organic Impressions", value: "1.2M" }, { label: "Follower Growth", value: "+420%" }, { label: "Website Traffic", value: "+188%" }], img: "https://placehold.co/480x320/fff7ed/f97316?text=Fashion+Brand", quote: "Junixo took us from 2,000 to 26,000 followers in 4 months. Social now drives 30% of revenue.", client: "Head of Brand, Fashion DTC" },
  { tag: "LinkedIn + Meta Ads", industry: "B2B SaaS", title: "SaaS Company 8x Pipeline from LinkedIn", result: "A thought leadership content strategy combined with LinkedIn Ads generated 8x more qualified leads at 40% lower CPL.", metrics: [{ label: "Pipeline from LinkedIn", value: "8x" }, { label: "Cost Per Lead", value: "-40%" }, { label: "Content Engagement", value: "+310%" }], img: "https://placehold.co/480x320/eff6ff/3b82f6?text=SaaS+LinkedIn", quote: "We finally cracked LinkedIn. The pipeline quality from Junixo's campaigns is unlike anything we've seen.", client: "CMO, B2B SaaS Platform" },
  { tag: "Facebook + Instagram Ads", industry: "E-commerce", title: "E-commerce Brand Scales to 6.8x ROAS", result: "Full-funnel Meta Ads strategy scaled spend profitably from £5k/mo to £28k/mo at consistent ROAS.", metrics: [{ label: "Paid Social ROAS", value: "6.8x" }, { label: "Ad Spend Scaled", value: "5.6x" }, { label: "Conversion Rate", value: "+67%" }], img: "https://placehold.co/480x320/f0fdf4/22c55e?text=Ecommerce+Meta+Ads", quote: "Junixo is the only agency that actually scaled our paid social profitably.", client: "Founder, E-commerce Brand" },
];

function CaseStudiesSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Proven Results</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">Real Brands, <span className="text-orange-500">Real Growth</span></h2>
          <p className="text-gray-500 mt-4 text-base">See how we've helped brands turn social media from a cost centre into a revenue driver.</p>
        </FadeIn>
        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.title} delay={i * 80}>
              <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="relative overflow-hidden">
                  <img src={cs.img} alt={cs.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4"><span className="bg-white/90 backdrop-blur text-gray-700 font-bold text-xs px-3 py-1.5 rounded-full">{cs.tag}</span></div>
                  <div className="absolute top-4 right-4"><span className="bg-orange-500 text-white font-bold text-xs px-3 py-1.5 rounded-full">{cs.industry}</span></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{cs.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{cs.result}</p>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {cs.metrics.map(m => (
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
   10. PRICING
══════════════════════════════════════════════════════════════ */
const plans = [
  {
    name: "Starter", price: "£799", per: "/month",
    desc: "Perfect for small businesses getting started with social media management.",
    color: "border-gray-200", badge: null,
    features: [
      { text: "2 platforms managed", included: true },
      { text: "12 posts per month", included: true },
      { text: "Community management (Mon–Fri)", included: true },
      { text: "Monthly performance report", included: true },
      { text: "Basic hashtag strategy", included: true },
      { text: "Paid social management", included: false },
      { text: "Influencer outreach", included: false },
      { text: "Video / Reels content", included: false },
    ],
    cta: "Get Started", ctaStyle: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
  },
  {
    name: "Growth", price: "£1,699", per: "/month",
    desc: "For growing brands that want content, ads and community all handled.",
    color: "border-orange-500 shadow-xl shadow-orange-100", badge: "Most Popular",
    features: [
      { text: "4 platforms managed", included: true },
      { text: "20 posts per month", included: true },
      { text: "Daily community management", included: true },
      { text: "Weekly performance reports", included: true },
      { text: "Full content strategy", included: true },
      { text: "Meta Ads management (up to £3k spend)", included: true },
      { text: "Reels & short-form video", included: true },
      { text: "Influencer outreach", included: false },
    ],
    cta: "Start Growing", ctaStyle: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200",
  },
  {
    name: "Scale", price: "£3,499", per: "/month",
    desc: "Full-service social media for brands serious about dominating their category.",
    color: "border-gray-200", badge: null,
    features: [
      { text: "All platforms managed", included: true },
      { text: "Unlimited posts & stories", included: true },
      { text: "24/7 community management", included: true },
      { text: "Real-time reporting dashboard", included: true },
      { text: "Full multi-platform ad management", included: true },
      { text: "Video production & Reels", included: true },
      { text: "Influencer campaign management", included: true },
      { text: "Dedicated account strategist", included: true },
    ],
    cta: "Let's Scale", ctaStyle: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Transparent Pricing</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">Simple Plans, <span className="text-orange-500">No Surprises</span></h2>
          <p className="text-gray-500 mt-4 text-base">Month-to-month. No lock-in contracts. Cancel anytime.</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 80}>
              <div className={`relative border-2 ${plan.color} rounded-3xl p-8 bg-white transition-all duration-300 hover:shadow-lg`}>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md shadow-orange-200 whitespace-nowrap">{plan.badge}</span>
                  </div>
                )}
                <h3 className="text-gray-900 font-black text-xl mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-5">{plan.desc}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-gray-900 font-black text-4xl leading-none">{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1">{plan.per}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f.text} className="flex items-center gap-2.5">
                      <span className={f.included ? "text-orange-500" : "text-gray-300"}>{f.included ? <CheckCircle size={15} /> : <XCircle />}</span>
                      <span className={`text-sm ${f.included ? "text-gray-700 font-medium" : "text-gray-400"}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <a href="/get-a-quote" className={`block text-center font-bold px-6 py-3 rounded-full transition-all duration-200 ${plan.ctaStyle}`}>{plan.cta}</a>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={100} className="mt-8 text-center">
          <p className="text-gray-400 text-sm">Need a custom solution? <a href="/get-a-quote" className="text-orange-500 font-bold hover:underline">Let's talk</a> — we build bespoke packages for enterprise clients.</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   11. TESTIMONIALS
══════════════════════════════════════════════════════════════ */
const testimonials = [
  { quote: "Our Instagram went from 3k to 41k followers in 5 months. The real win was the 280% increase in website traffic from social and the revenue that followed.", name: "Sophie Bennet", role: "Founder, Skincare Brand", img: "https://placehold.co/56x56/fff7ed/f97316?text=SB", rating: 5 },
  { quote: "Junixo cracked our TikTok strategy in week two. One video hit 800k views organically. Their content team actually understands what makes people stop scrolling.", name: "Marcus Lee", role: "Head of Marketing, DTC Brand", img: "https://placehold.co/56x56/eff6ff/3b82f6?text=ML", rating: 5 },
  { quote: "The LinkedIn thought leadership strategy they built us generated 3 enterprise deals in Q1. I never expected LinkedIn to become our #1 lead source.", name: "Rachel Owens", role: "CEO, B2B SaaS", img: "https://placehold.co/56x56/f0fdf4/22c55e?text=RO", rating: 5 },
  { quote: "Meta Ads were haemorrhaging money before Junixo. Within 60 days they had us at 5.4x ROAS and scaling. They pay for themselves multiple times over.", name: "Dan Foster", role: "E-commerce Director", img: "https://placehold.co/56x56/fdf4ff/a855f7?text=DF", rating: 5 },
];

function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-24 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Client Stories</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">Results Clients <span className="text-orange-500">Talk About</span></h2>
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
   12. FAQ
══════════════════════════════════════════════════════════════ */
const faqs = [
  { q: "How long before we see results?", a: "Organic growth typically shows meaningful movement in 60–90 days. Paid social campaigns usually show optimised performance within 3–4 weeks as we test and refine audiences and creatives." },
  { q: "Do you create the content or do we?", a: "We handle everything — strategy, copy, graphics, video editing, scheduling and publishing. You can be as involved or hands-off as you like. Most clients do a monthly approval sign-off and leave the rest to us." },
  { q: "Which platforms do you recommend for my business?", a: "It depends on your audience and goals. We'll audit your current presence and recommend the right 2–3 platforms to focus on first. More isn't always better — focus beats spread." },
  { q: "Do you require a minimum contract?", a: "No. All our social media management services are month-to-month. We keep you by delivering results, not by locking you into a contract." },
  { q: "Can you handle our paid social ads as well?", a: "Yes — our Growth and Scale plans include paid social management. We run Meta Ads, TikTok Ads, LinkedIn Ads and more, with full creative, targeting, and optimisation included." },
  { q: "How do you report on results?", a: "You'll get a live dashboard from day one, weekly performance summaries, and monthly deep-dive reports. You always know exactly what's happening with your social presence and ad spend." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">Questions We <span className="text-orange-500">Get Asked</span></h2>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="bg-orange-50 rounded-3xl border border-orange-100 p-6 sm:p-8 space-y-3">
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
   13. FINAL CTA — fully responsive form with searchable dropdown
══════════════════════════════════════════════════════════════ */
function FinalCTA() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    website_url: "",
    service: "",
    other_service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const source_page = typeof window !== "undefined" ? window.location.pathname : "/services/digital-marketing/social-media-marketing";
    const finalService = form.service === "Other Service" && form.other_service.trim()
      ? form.other_service.trim()
      : form.service;

    const { error } = await supabase.from("leads").insert([{
      full_name: form.full_name,
      email: form.email,
      phone: form.phone || null,
      website_url: form.website_url || null,
      service: finalService,
      message: form.message,
      source_page,
    }]);

    setLoading(false);
    if (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const inputClass = "w-full text-sm text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-white rounded-3xl border border-orange-100 overflow-hidden shadow-sm">
            <div className="grid lg:grid-cols-2">

              {/* ── Left: copy panel ── */}
              <div className="p-8 sm:p-10 lg:p-14">
                <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-6 border border-orange-200">
                  Free Strategy Session
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
                  Ready to Make Social Media{" "}
                  <span className="text-orange-500">Work for You?</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Book a free 30-minute strategy call. We'll audit your current social presence, show you exactly where you're leaving growth on the table, and outline a plan to fix it — no pitch, no pressure.
                </p>
                <div className="space-y-3 mb-8">
                  {["Free social media audit included", "Platform-specific growth recommendations", "No contracts or commitments required", "Results-backed strategy, not guesswork"].map(point => (
                    <div key={point} className="flex items-center gap-3">
                      <span className="text-orange-500 flex-shrink-0"><CheckCircle size={15} /></span>
                      <span className="text-gray-700 text-sm font-medium">{point}</span>
                    </div>
                  ))}
                </div>
                {/* Platform icons strip */}
                <div className="flex flex-wrap items-center gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <p className="text-gray-500 text-xs font-semibold">We manage:</p>
                  {[
                    { icon: <InstagramIcon size={16} />, color: "text-pink-500" },
                    { icon: <FacebookIcon size={16} />, color: "text-blue-600" },
                    { icon: <TikTokIcon size={16} />, color: "text-gray-900" },
                    { icon: <LinkedInIcon size={16} />, color: "text-blue-700" },
                    { icon: <TwitterIcon size={16} />, color: "text-gray-700" },
                    { icon: <YoutubeIcon size={16} />, color: "text-red-500" },
                  ].map((p, i) => <span key={i} className={p.color}>{p.icon}</span>)}
                  <span className="text-gray-400 text-xs ml-auto font-medium">+ more</span>
                </div>
              </div>

              {/* ── Right: form panel ── */}
              <div className="bg-orange-50 p-8 sm:p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-orange-100">
                {submitted ? (
                  <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={28} />
                    </div>
                    <h3 className="text-gray-900 font-black text-2xl mb-2">You're Booked In! 🎉</h3>
                    <p className="text-gray-500 text-sm max-w-xs">Our social media strategist will reach out within 24 hours to confirm your free strategy call.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-gray-900 font-black text-xl mb-1">Book Your Free Strategy Call</h3>
                    <p className="text-gray-400 text-sm mb-6">Fill in the form and we'll be in touch within 24 hours.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Row 1: Full Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Full Name <span className="text-orange-500">*</span></label>
                          <input type="text" placeholder="Jane Smith" value={form.full_name} onChange={set("full_name")} required className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Email Address <span className="text-orange-500">*</span></label>
                          <input type="email" placeholder="jane@company.com" value={form.email} onChange={set("email")} required className={inputClass} />
                        </div>
                      </div>

                      {/* Row 2: Phone + Website */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Phone Number <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
                          <input type="tel" placeholder="+44 7700 000000" value={form.phone} onChange={set("phone")} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Website URL <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
                          <input type="url" placeholder="https://yoursite.com" value={form.website_url} onChange={set("website_url")} className={inputClass} />
                        </div>
                      </div>

                      {/* Row 3: Service dropdown — full width */}
                      <div>
                        <label className={labelClass}>Service Looking For <span className="text-orange-500">*</span></label>
                        <SearchableSelect
                          value={form.service}
                          onChange={(val) => setForm(prev => ({ ...prev, service: val, other_service: "" }))}
                          placeholder="Search or select a service…"
                        />
                        {/* Required hidden input for native form validation */}
                        <input type="text" value={form.service} required readOnly className="sr-only" tabIndex={-1} />
                      </div>

                      {/* Conditional: Other Service */}
                      {form.service === "Other Service" && (
                        <div>
                          <label className={labelClass}>Please Specify <span className="text-orange-500">*</span></label>
                          <input
                            type="text"
                            placeholder="Tell us what service you need…"
                            value={form.other_service}
                            onChange={set("other_service")}
                            required
                            className={inputClass}
                          />
                        </div>
                      )}

                      {/* Row 4: Message — full width */}
                      <div>
                        <label className={labelClass}>Business Challenges / Message <span className="text-orange-500">*</span></label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your goals, current challenges, or anything else we should know…"
                          value={form.message}
                          onChange={set("message")}
                          required
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>Book My Free Call <ArrowRight /></>
                        )}
                      </button>
                      <p className="text-center text-xs text-gray-400">No commitment · Free 30-min call · Honest advice</p>
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
export default function SocialMediaMarketingClient() {
  return (
    <main>
      <Hero />
      <PlatformsSection />
      <ServicesSection />
      <SeoSectionA />
      <SeoSectionB />
      <SeoSectionC />
      <StatsSection />
      <ProcessSection />
      <CaseStudiesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}