"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

/* ─── COUNTER HOOK ─── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─── INTERSECTION OBSERVER HOOK ─── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── SECTION FADE WRAPPER ─── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── ICONS ─── */
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckCircle = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const MegaphoneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </svg>
);
const SearchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const CodeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const SmartphoneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const TrendingUpIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const UsersIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const DollarIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   1. HERO SECTION
══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-50 rounded-full opacity-60" style={{ transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full opacity-40" style={{ transform: "translate(-30%, 30%)" }} />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-orange-400 opacity-50" style={{ transform: "translateY(-50%)" }} />
        <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-orange-300 opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Full-Service Digital Agency</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[56px] font-black text-gray-900 leading-[1.08] tracking-tight mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.2s" }}
            >
              Growth-Driven{" "}
              <span className="text-orange-500">Digital Marketing</span>
              {", "}SEO & Web Development
            </h1>

            <p
              className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.3s" }}
            >
              We help ambitious brands dominate search, convert traffic, and scale with precision-built digital products.
            </p>

            <ul
              className="space-y-3 mb-9"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.4s" }}
            >
              {["ROI-Focused Marketing Campaigns", "Conversion-Optimized Websites", "Scalable Growth Strategies"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                  <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="flex flex-wrap gap-3"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.5s" }}
            >
              <a href="/get-a-quote" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5">
                Get a Free Quote <ArrowRight />
              </a>
              <a href="/portfolio" className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                View Our Work
              </a>
            </div>

            {/* ── Social proof strip - PPC style ── */}
            <div
              className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-100"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.6s ease 0.6s" }}
            >
              {/* Avatars + stars */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://placehold.co/32x32/fff7ed/f97316?text=SM" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  <img src="https://placehold.co/32x32/eff6ff/3b82f6?text=JO" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  <img src="https://placehold.co/32x32/f0fdf4/22c55e?text=PS" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  <img src="https://placehold.co/32x32/fdf4ff/a855f7?text=DC" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                  </div>
                  <p className="text-gray-500 text-xs">80+ brands managed</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">12M+</p>
                <p className="text-gray-400 text-xs">Impressions generated</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">6.8x</p>
                <p className="text-gray-400 text-xs">Avg paid social ROAS</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="relative"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(40px)", transition: "all 0.8s ease 0.3s" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50 rounded-3xl transform rotate-3" />
              <img
                src="https://placehold.co/650x520/fff7ed/f97316?text=Digital+Marketing+Agency"
                alt="Digital Marketing Agency"
                className="relative rounded-3xl w-full object-cover shadow-2xl"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                  <TrendingUpIcon />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Organic Traffic</p>
                  <p className="text-gray-900 font-black text-lg leading-tight">+380%</p>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                </div>
                <p className="text-xs font-bold text-gray-800">5.0 on Google</p>
                <p className="text-[10px] text-gray-400">120+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. SERVICES MARQUEE (replaces Trusted By)
   Infinite looping strip of all service names - no title
══════════════════════════════════════════════════════════════ */
const MARQUEE_ITEMS = [
  { label: "Social Media Marketing",       icon: <MegaphoneIcon /> },
  { label: "PPC / Google Ads",             icon: <SearchIcon /> },
  { label: "Content Marketing",            icon: <CodeIcon /> },
  { label: "Email Marketing",              icon: <SmartphoneIcon /> },
  { label: "Influencer Marketing",         icon: <MegaphoneIcon /> },
  { label: "Technical SEO",               icon: <SearchIcon /> },
  { label: "Link Building",               icon: <CodeIcon /> },
  { label: "Web Development",             icon: <CodeIcon /> },
  { label: "Shopify Development",         icon: <SmartphoneIcon /> },
  { label: "iOS & Android Apps",          icon: <SmartphoneIcon /> },
  { label: "Conversion Rate Optimisation",icon: <SearchIcon /> },
  { label: "Google Shopping Ads",         icon: <SearchIcon /> },
  { label: "Performance Max",             icon: <MegaphoneIcon /> },
  { label: "Local SEO",                   icon: <SearchIcon /> },
  { label: "UI / UX Design",             icon: <CodeIcon /> },
  { label: "WordPress Development",       icon: <CodeIcon /> },
  { label: "Marketing Analytics",         icon: <MegaphoneIcon /> },
  { label: "App Store Optimisation",      icon: <SmartphoneIcon /> },
];

function ServicesMarquee() {
  // duplicate for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-gray-100 bg-orange-50 py-5">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />

      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee-ltr 38s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="marquee-track flex items-center gap-0 w-max">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-0 flex-shrink-0">
            <div className="flex cursor-pointer items-center gap-2.5 px-7 py-1 group cursor-default">
              <span className="text-orange-400 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0 scale-75">
                {item.icon}
              </span>
              <span className="text-sm font-bold text-gray-500 group-hover:text-orange-500 transition-colors uppercase tracking-widest whitespace-nowrap">
                {item.label}
              </span>
            </div>
            {/* diamond separator */}
            <svg width="8" height="8" viewBox="0 0 8 8" className="text-orange-400 flex-shrink-0 opacity-60">
              <polygon points="4,0 8,4 4,8 0,4" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. SERVICES OVERVIEW (unchanged)
══════════════════════════════════════════════════════════════ */
const services = [
  {
    icon: <MegaphoneIcon />,
    title: "Digital Marketing",
    desc: "Social media marketing, paid ads, influencer marketing and email automation to grow your brand.",
    href: "/services/digital-marketing",
    color: "bg-orange-50 text-orange-500",
    border: "hover:border-orange-200",
  },
  {
    icon: <SearchIcon />,
    title: "SEO Services",
    desc: "Technical SEO, on-page optimization, link building and organic growth strategies.",
    href: "/services/seo",
    color: "bg-blue-50 text-blue-500",
    border: "hover:border-blue-200",
  },
  {
    icon: <CodeIcon />,
    title: "Web Development",
    desc: "Conversion-focused websites built with modern technologies that perform and convert.",
    href: "/services/web-development",
    color: "bg-emerald-50 text-emerald-500",
    border: "hover:border-emerald-200",
  },
  {
    icon: <SmartphoneIcon />,
    title: "App Development",
    desc: "Scalable mobile apps for startups and enterprises on iOS, Android and beyond.",
    href: "/services/app-development",
    color: "bg-purple-50 text-purple-500",
    border: "hover:border-purple-200",
  },
];

function ServicesSection() {
  return (
    <section className="pt-12 pb-20 lg:pt-16 lg:pb-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">What We Do</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Everything You Need to{" "}
            <span className="text-orange-500">Grow Online</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            From strategy to execution - our full suite of digital services drives real, measurable growth.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 100}>
              <a
                href={svc.href}
                className={`group block bg-white border border-gray-100 ${svc.border} rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 rounded-2xl ${svc.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  {svc.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-orange-500 text-sm font-bold group-hover:gap-2.5 transition-all duration-200">
                  Learn More <ArrowRight size={14} />
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. WHY CHOOSE (unchanged)
══════════════════════════════════════════════════════════════ */
const features = [
  "Data-Driven Strategies", "Transparent Reporting",
  "Conversion-Focused Design", "Experienced Growth Experts",
  "Fast Execution", "Long-Term Partnership",
];

function WhyChooseSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-3 shadow-sm" />
              <img
                src="https://placehold.co/600x450/fff7ed/f97316?text=Team+Collaboration"
                alt="Team Collaboration"
                className="relative rounded-3xl w-full object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-1 mb-1.5">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                </div>
                <p className="text-gray-800 font-bold text-sm leading-snug">"Best ROI we've ever seen from an agency."</p>
                <p className="text-gray-400 text-[11px] mt-1.5">- E-commerce Founder</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-100 px-4 py-1.5 rounded-full">Why Junixo</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Why Businesses Choose <span className="text-orange-500">Junixo</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              We combine strategy, technology, and marketing expertise to build digital experiences that drive measurable growth. Every campaign, every website, every app - built to win.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>
                  <span className="text-gray-700 font-medium text-sm">{f}</span>
                </div>
              ))}
            </div>
            <a href="/about/why-us" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
              Discover Our Approach <ArrowRight />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. OUR PROCESS (unchanged)
══════════════════════════════════════════════════════════════ */
const steps = [
  { num: "01", title: "Discovery & Strategy", desc: "We analyze your market, competitors and growth opportunities to identify the clearest path forward." },
  { num: "02", title: "Research & Planning", desc: "Data-driven planning ensures campaigns start with the right strategy, audience insights and positioning." },
  { num: "03", title: "Execution & Development", desc: "Our team builds and launches high-performance digital solutions - on time, on spec, on brand." },
  { num: "04", title: "Optimization & Scaling", desc: "Continuous improvement and A/B testing drives compounding long-term growth for your business." },
];

function ProcessSection() {
  return (
    <section className="pt-20 lg:pt-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">How We Work</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-8">
              Our Proven <span className="text-orange-500">Growth Process</span>
            </h2>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <FadeIn key={step.num} delay={i * 80}>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-orange-50 border-2 border-orange-100 group-hover:bg-orange-500 group-hover:border-orange-500 flex items-center justify-center transition-all duration-300">
                      <span className="text-orange-500 group-hover:text-white font-black text-sm transition-colors duration-300">{step.num}</span>
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-base mb-1">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-50 rounded-3xl transform rotate-2" />
              <img
                src="https://placehold.co/600x450/fff7ed/f97316?text=Growth+Process"
                alt="Growth Process"
                className="relative rounded-3xl w-full object-cover shadow-xl"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. CASE STUDIES (unchanged)
══════════════════════════════════════════════════════════════ */
const caseStudies = [
  {
    tag: "SEO + Paid Ads",
    title: "Ecommerce Growth Campaign",
    result: "380% increase in organic traffic within 8 months",
    metric: "+380%",
    metricLabel: "Organic Traffic",
    img: "https://placehold.co/420x280/fff7ed/f97316?text=Case+Study+1",
  },
  {
    tag: "Web Development",
    title: "SaaS Platform Redesign",
    result: "Conversion rate doubled after complete UX overhaul",
    metric: "2×",
    metricLabel: "Conversion Rate",
    img: "https://placehold.co/420x280/f0fdf4/22c55e?text=Case+Study+2",
  },
  {
    tag: "Social Media Marketing",
    title: "D2C Brand Launch",
    result: "1.2M impressions in first 30 days of campaign",
    metric: "1.2M",
    metricLabel: "Impressions",
    img: "https://placehold.co/420x280/eff6ff/3b82f6?text=Case+Study+3",
  },
];

function CaseStudiesSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Proven Results</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Real Results for <span className="text-orange-500">Real Businesses</span>
          </h2>
          <p className="text-gray-500 mt-4">See how we've helped brands like yours achieve extraordinary growth.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.title} delay={i * 100}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img src={cs.img} alt={cs.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-gray-700 font-bold text-xs px-3 py-1.5 rounded-full border border-gray-100">{cs.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{cs.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{cs.result}</p>
                  <a href="/case-studies" className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm group-hover:gap-2.5 transition-all duration-200">
                    Read Case Study <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={200} className="text-center mt-10">
          <a href="/portfolio" className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-7 py-3 rounded-full transition-all duration-200">
            View All Work <ArrowRight />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. STATS (unchanged)
══════════════════════════════════════════════════════════════ */
const stats = [
  { value: 250, suffix: "+", label: "Projects Delivered", icon: <TrendingUpIcon /> },
  { value: 120, suffix: "+", label: "Happy Clients", icon: <UsersIcon /> },
  { value: 12, suffix: "M+", label: "Organic Visits Generated", icon: <GlobeIcon /> },
  { value: 30, suffix: "M+", label: "Client Revenue Impact", prefix: "$", icon: <DollarIcon /> },
];

function StatCard({ value, suffix, label, icon, prefix = "", start }: typeof stats[0] & { start: boolean }) {
  const count = useCountUp(value, 2200, start);
  return (
    <div className="text-center group">
      <div className="w-16 h-16 bg-orange-50 group-hover:bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-500 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <p className="text-4xl lg:text-5xl font-black text-gray-900 leading-none mb-2">
        {prefix}{count}{suffix}
      </p>
      <p className="text-gray-500 font-medium text-sm">{label}</p>
    </div>
  );
}

function StatsSection() {
  const { ref, inView } = useInView(0.3);
  return (
    <section className="py-0 lg:py-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border border-gray-100 rounded-3xl p-10 lg:p-14 bg-gradient-to-br from-orange-50/50 to-white">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   8. TESTIMONIALS - Card slider (replaces big image layout)
══════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote: "Junixo transformed our digital presence. Our organic traffic increased by over 400% in less than a year. Their team is strategic, responsive, and genuinely invested in our success.",
    name: "Sarah Mitchell",
    role: "Founder, SaaS Startup",
    img: "https://placehold.co/56x56/fff7ed/f97316?text=SM",
    rating: 5,
    tag: "SEO",
  },
  {
    quote: "The ROI on our paid campaigns exceeded every benchmark. Junixo doesn't just manage ads - they build real growth engines. Best agency investment we've made.",
    name: "James Okafor",
    role: "E-commerce Director",
    img: "https://placehold.co/56x56/eff6ff/3b82f6?text=JO",
    rating: 5,
    tag: "PPC Ads",
  },
  {
    quote: "Our website redesign delivered a 2x improvement in conversions within 60 days. Exceptional work from a team that truly understands performance-driven design.",
    name: "Priya Sharma",
    role: "Head of Growth, Tech Company",
    img: "https://placehold.co/56x56/f0fdf4/22c55e?text=PS",
    rating: 5,
    tag: "Web Dev",
  },
  {
    quote: "The keyword strategy they built for us cut our wasted ad spend by 52% in 30 days. We went from burning budget to profitable campaigns almost overnight.",
    name: "Daniel Carter",
    role: "Marketing Lead, D2C Brand",
    img: "https://placehold.co/56x56/fdf4ff/a855f7?text=DC",
    rating: 5,
    tag: "Google Ads",
  },
  {
    quote: "I've worked with 3 agencies before Junixo. None of them came close to this level of strategic thinking and transparency. They are in a completely different league.",
    name: "Emma Walsh",
    role: "CEO, E-commerce Brand",
    img: "https://placehold.co/56x56/fef2f2/ef4444?text=EW",
    rating: 5,
    tag: "Digital Marketing",
  },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // Show 3 cards: prev (dimmed), active (centered), next (dimmed)
  const getCard = (offset: number) => testimonials[(active + offset + total) % total];

  return (
    <section className="pt-20 lg:pt-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Client Stories</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            What Our <span className="text-orange-500">Clients Say</span>
          </h2>
          <p className="text-gray-500 mt-3 text-sm">Trusted by 120+ brands across the world.</p>
        </FadeIn>

        {/* Desktop: 3-card visible slider */}
        <div className="hidden lg:block relative">
          <div className="flex items-stretch gap-5 justify-center">
            {[-1, 0, 1].map((offset) => {
              const t = getCard(offset);
              const isActive = offset === 0;
              return (
                <div
                  key={offset}
                  className="transition-all duration-500"
                  style={{
                    width: isActive ? "420px" : "300px",
                    opacity: isActive ? 1 : 0.5,
                    transform: isActive ? "scale(1)" : "scale(0.97)",
                    flexShrink: 0,
                  }}
                >
                  <div className={`h-full rounded-3xl border p-8 flex flex-col transition-all duration-500 ${isActive ? "bg-white border-orange-200 shadow-2xl shadow-orange-100" : "bg-white border-gray-100 shadow-sm"}`}>
                    {/* Tag */}
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-orange-50 text-orange-500 px-3 py-1 rounded-full mb-4 self-start border border-orange-100">
                      {t.tag}
                    </span>
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} />)}
                    </div>
                    {/* Quote */}
                    <p className={`leading-relaxed flex-1 mb-6 ${isActive ? "text-gray-700 text-base" : "text-gray-500 text-sm"}`}>
                      "{t.quote}"
                    </p>
                    {/* Author */}
                    <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                      <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full flex-shrink-0 object-cover" />
                      <div>
                        <p className="text-gray-900 font-bold text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-11 h-11 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all cursor-pointer"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-11 h-11 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all cursor-pointer"
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Mobile: single card */}
        <div className="lg:hidden">
          <div
            key={active}
            className="bg-white rounded-3xl border border-orange-200 shadow-xl p-7"
            style={{ animation: "fadeUp 0.35s ease" }}
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-orange-50 text-orange-500 px-3 py-1 rounded-full mb-4 border border-orange-100">
              {testimonials[active].tag}
            </span>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => <StarIcon key={i} />)}
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-6">"{testimonials[active].quote}"</p>
            <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
              <img src={testimonials[active].img} alt={testimonials[active].name} className="w-11 h-11 rounded-full" />
              <div>
                <p className="text-gray-900 font-bold text-sm">{testimonials[active].name}</p>
                <p className="text-gray-400 text-xs">{testimonials[active].role}</p>
              </div>
            </div>
          </div>
          {/* Mobile arrows */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={prev} className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 cursor-pointer transition-all">
              <ChevronLeftIcon />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === active ? "w-6 bg-orange-500" : "w-2 bg-gray-300"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 cursor-pointer transition-all">
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Desktop dots */}
        <div className="hidden lg:flex gap-2 justify-center mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === active ? "w-6 bg-orange-500" : "w-2 bg-gray-300 hover:bg-orange-300"}`}
            />
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   9. BLOG - receives posts as props from server component
══════════════════════════════════════════════════════════════ */
export interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  category?: string;
  coverImage?: string;
}

function BlogSection({ posts }: { posts: BlogPostPreview[] }) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Insights</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              From the <span className="text-orange-500">Junixo Blog</span>
            </h2>
          </div>
          <a href="/blog" className="inline-flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all duration-200 flex-shrink-0">
            View All Articles <ArrowRight />
          </a>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 100}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                {/* Image */}
                <div className="overflow-hidden flex-shrink-0">
                  <img
                    src={post.coverImage || `https://placehold.co/420x260/fff7ed/f97316?text=${encodeURIComponent(post.title.slice(0, 20))}`}
                    alt={post.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  {post.category && (
                    <span className="inline-block self-start bg-orange-50 text-orange-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-orange-100 mb-3">
                      {post.category}
                    </span>
                  )}
                  <h3 className="text-gray-900 font-bold text-lg leading-snug mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">{post.excerpt}</p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 self-start hover:-translate-y-0.5 shadow-sm shadow-orange-200"
                  >
                    Read More <ArrowRight size={13} />
                  </a>
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
   10. SEARCHABLE SELECT (for the CTA form)
══════════════════════════════════════════════════════════════ */
const SERVICE_OPTIONS = [
  "PPC Google Ads Management", "Google Search Ads", "Google Shopping Ads",
  "Google Display Advertising", "YouTube Ads Management", "Performance Max Campaigns",
  "Remarketing & Retargeting", "Social Media Management", "Content Creation",
  "Paid Social Advertising (Meta Ads)", "TikTok Ads Management", "LinkedIn Ads & B2B Marketing",
  "Influencer Marketing", "Social Media Strategy & Audit", "SEO Audit",
  "Technical SEO", "On-Page SEO", "Link Building", "Local SEO", "E-commerce SEO",
  "Custom Website Design", "WordPress Development", "Shopify Development",
  "Landing Page Design", "UI / UX Design", "WooCommerce", "Progressive Web Apps",
  "iOS App Development", "Android App Development", "React Native Apps",
  "Flutter Development", "SaaS Development", "API Development",
  "Marketing Analytics", "A/B Testing", "Growth Hacking", "Conversion Rate Optimization",
  "Other Service",
];

function SearchableSelect({ value, onChange, placeholder = "Search or select a service…", hasError, id }: {
  value: string; onChange: (v: string) => void; placeholder?: string; hasError?: boolean; id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const filtered = SERVICE_OPTIONS.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setQuery(""); } }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open && searchRef.current) searchRef.current.focus(); }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        id={id}
        onClick={() => setOpen(o => !o)}
        className={`cursor-pointer w-full flex items-center justify-between text-sm bg-white border rounded-xl px-4 py-3 focus:outline-none transition-colors text-left
          ${hasError ? "border-red-400 ring-2 ring-red-100" : open ? "border-orange-400 ring-2 ring-orange-100" : "border-gray-200 hover:border-orange-300"}
          ${value ? "text-gray-700" : "text-gray-400"}`}
      >
        <span className="truncate pr-2">{value || placeholder}</span>
        <span className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDownIcon /></span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5 bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input ref={searchRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
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
            {filtered.length === 0
              ? <li className="px-4 py-3 text-sm text-gray-400 text-center">No services found</li>
              : filtered.map(opt => (
                <li key={opt}>
                  <button type="button" onClick={() => { onChange(opt); setOpen(false); setQuery(""); }}
                    className={`cursor-pointer w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 ${value === opt ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-700"}`}>
                    {opt}
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
   11. FINAL CTA (adapted from PPC page)
══════════════════════════════════════════════════════════════ */
interface LeadForm {
  full_name: string; email: string; phone: string;
  website_url: string; service: string; other_service: string; message: string;
}
const EMPTY_FORM: LeadForm = { full_name: "", email: "", phone: "", website_url: "", service: "", other_service: "", message: "" };
type FormErrors = Partial<Record<keyof LeadForm, string>>;

function validateForm(form: LeadForm, isOther: boolean): FormErrors {
  const errs: FormErrors = {};
  if (!form.full_name.trim())   errs.full_name = "Full name is required.";
  if (!form.email.trim())       errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Please enter a valid email.";
  if (!form.service)            errs.service = "Please select a service.";
  if (isOther && !form.other_service.trim()) errs.other_service = "Please specify your service.";
  if (!form.message.trim())     errs.message = "Please tell us about your project.";
  return errs;
}

function AuditCTASection() {
  const [form, setForm] = useState<LeadForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isOther = form.service === "Other Service";

  function set(key: keyof LeadForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
    };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateForm(form, isOther);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const source_page = typeof window !== "undefined" ? window.location.pathname : "";
    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone: form.phone.trim() || null,
      website_url: form.website_url.trim() || null,
      service: isOther ? form.other_service : form.service,
      message: form.message,
      source_page,
    };
    const { error } = await supabase.from("leads").insert([payload]);
    setLoading(false);
    if (error) { console.error(error); alert("Something went wrong. Please try again."); return; }
    setSubmitted(true);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const inputCls = "w-full text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors";

  return (
    <section id="get-started" className="pb-20 lg:pb-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-orange-50 rounded-3xl border border-orange-100 overflow-hidden shadow-sm">
            <div className="grid lg:grid-cols-2">
              {/* LEFT */}
              <div className="p-8 sm:p-10 lg:p-14">
                <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-6 border border-orange-200">
                  Free Consultation
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
                  Ready to Grow Your <span className="text-orange-500">Business Online?</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Book a free 30-minute strategy call. We'll analyze your current digital presence, identify opportunities and outline a clear growth roadmap - no pitch, no pressure, just honest advice.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Free digital audit included",
                    "Custom growth strategy for your business",
                    "No contracts or lock-ins required",
                    "Honest, data-backed recommendations",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <span className="text-orange-500 flex-shrink-0"><CheckCircle size={15} /></span>
                      <span className="text-gray-700 text-sm font-medium">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl border border-orange-100 p-5">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Services we cover:</p>
                  <div className="flex flex-wrap gap-2">
                    {["SEO", "Google Ads", "Social Media", "Web Dev", "App Dev", "Content", "Email Marketing", "CRO"].map(lbl => (
                      <span key={lbl} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">{lbl}</span>
                    ))}
                    <span className="text-gray-400 text-xs font-medium self-center ml-1">+ more</span>
                  </div>
                </div>
              </div>

              {/* RIGHT - form */}
              <div className="bg-white p-8 sm:p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-orange-100">
                {submitted ? (
                  <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={28} />
                    </div>
                    <h3 className="text-gray-900 font-black text-2xl mb-2">You're Booked In! 🎉</h3>
                    <p className="text-gray-500 text-sm max-w-xs">Our team will reach out within 24 hours to confirm your free strategy call and begin your audit.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-gray-900 font-black text-xl mb-6">Get Your Free Strategy Call</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="full_name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Full Name <span className="text-orange-500">*</span>
                          </label>
                          <input id="full_name" type="text" placeholder="Jane Smith" value={form.full_name} onChange={set("full_name")}
                            className={`${inputCls} ${errors.full_name ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                          {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Email <span className="text-orange-500">*</span>
                          </label>
                          <input id="email" type="email" placeholder="jane@company.com" value={form.email} onChange={set("email")}
                            className={`${inputCls} ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Phone <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">(optional)</span>
                          </label>
                          <input id="phone" type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={set("phone")} className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="website_url" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Website <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">(optional)</span>
                          </label>
                          <input id="website_url" type="url" placeholder="https://yourbrand.com" value={form.website_url} onChange={set("website_url")} className={inputCls} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Service Interested In <span className="text-orange-500">*</span>
                        </label>
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

                      {isOther && (
                        <div>
                          <label htmlFor="other_service" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Please Specify <span className="text-orange-500">*</span>
                          </label>
                          <input id="other_service" type="text" placeholder="Describe what you're looking for…"
                            value={form.other_service} onChange={set("other_service")} autoFocus
                            className={`${inputCls} ${errors.other_service ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                          {errors.other_service && <p className="mt-1 text-xs text-red-500">{errors.other_service}</p>}
                        </div>
                      )}

                      <div>
                        <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Tell Us About Your Goals <span className="text-orange-500">*</span>
                        </label>
                        <textarea id="message" rows={4}
                          placeholder="Tell us about your business, your goals, current challenges, or anything you'd like us to know…"
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
                        ) : <>Get My Free Strategy Call <ArrowRight /></>}
                      </button>
                      <p className="text-center text-xs text-gray-400 pt-1">No commitment · Free 30-min call · Results in 24 hrs</p>
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
export default function HomePageClient({ blogPosts }: { blogPosts: BlogPostPreview[] }) {
  return (
    <main>
      <HeroSection />
      <ServicesMarquee />
      <ServicesSection />
      <WhyChooseSection />
      <ProcessSection />
      <CaseStudiesSection />
      <StatsSection />
      <TestimonialsSection />
      <BlogSection posts={blogPosts} />
      <AuditCTASection />
    </main>
  );
}