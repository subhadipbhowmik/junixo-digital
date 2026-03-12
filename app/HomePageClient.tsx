"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── SECTION FADE WRAPPER ─── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
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
const MegaphoneIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </svg>
);
const SearchIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const CodeIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const SmartphoneIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const TrendingUpIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-50 rounded-full opacity-60" style={{ transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full opacity-40" style={{ transform: "translate(-30%, 30%)" }} />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-orange-400 opacity-50" style={{ transform: "translateY(-50%)" }} />
        <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-orange-300 opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
            <div
              className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-100"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.6s ease 0.6s" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://placehold.co/32x32/fff7ed/f97316?text=SM" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  <img src="https://placehold.co/32x32/eff6ff/3b82f6?text=JO" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  <img src="https://placehold.co/32x32/f0fdf4/22c55e?text=PS" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  <img src="https://placehold.co/32x32/fdf4ff/a855f7?text=DC" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                </div>
                <div>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
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
              <Image
                src="https://res.cloudinary.com/junixo/image/upload/v1773244290/home-01-growth-driven-digital-marketing-seo-web-development_yns87z.webp"
                alt="Digital Marketing Agency"
                className="relative rounded-3xl w-full object-cover shadow-2xl"
                width={650} height={520}
              />
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                  <TrendingUpIcon size={28} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Organic Traffic</p>
                  <p className="text-gray-900 font-black text-lg leading-tight">+380%</p>
                </div>
              </div>
              <div className="hidden sm:block absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-1 mb-1">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
                <p className="text-xs font-bold text-gray-800">5.0 on Google</p>
                <p className="text-[10px] text-gray-400">120+ reviews</p>
              </div>
            </div>
            <div className="flex sm:hidden items-center gap-4 mt-4 justify-center">
              <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-2.5 border border-orange-100">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">
                  <TrendingUpIcon size={18} />
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Organic Traffic</p>
                  <p className="text-gray-900 font-black text-base leading-tight">+380%</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow border border-gray-100 px-3 py-2.5">
                <div className="flex items-center gap-0.5 mb-0.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
                <p className="text-xs font-bold text-gray-800">5.0 on Google</p>
                <p className="text-[9px] text-gray-400">120+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. SERVICES MARQUEE
══════════════════════════════════════════════════════════════ */
const MARQUEE_ITEMS = [
  { label: "Social Media Marketing", icon: <MegaphoneIcon /> },
  { label: "PPC / Google Ads", icon: <SearchIcon /> },
  { label: "Content Marketing", icon: <CodeIcon /> },
  { label: "Email Marketing", icon: <SmartphoneIcon /> },
  { label: "Influencer Marketing", icon: <MegaphoneIcon /> },
  { label: "Technical SEO", icon: <SearchIcon /> },
  { label: "Link Building", icon: <CodeIcon /> },
  { label: "Web Development", icon: <CodeIcon /> },
  { label: "Shopify Development", icon: <SmartphoneIcon /> },
  { label: "iOS & Android Apps", icon: <SmartphoneIcon /> },
  { label: "Conversion Rate Optimisation", icon: <SearchIcon /> },
  { label: "Google Shopping Ads", icon: <SearchIcon /> },
  { label: "Performance Max", icon: <MegaphoneIcon /> },
  { label: "Local SEO", icon: <SearchIcon /> },
  { label: "UI / UX Design", icon: <CodeIcon /> },
  { label: "WordPress Development", icon: <CodeIcon /> },
  { label: "Marketing Analytics", icon: <MegaphoneIcon /> },
  { label: "App Store Optimisation", icon: <SmartphoneIcon /> },
];

function ServicesMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-gray-100 bg-orange-50 py-5">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />
      <style>{`
        @keyframes marquee-ltr { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee-ltr 38s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes fadeTab { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:translateY(0);} }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes partner-slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .partner-track { animation: partner-slide 30s linear infinite; }
        .partner-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track flex items-center gap-0 w-max">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-0 flex-shrink-0">
            <div className="flex items-center gap-2.5 px-7 py-1 group cursor-default">
              <span className="text-orange-400 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0 scale-75">{item.icon}</span>
              <span className="text-sm font-bold text-gray-500 group-hover:text-orange-500 transition-colors uppercase tracking-widest whitespace-nowrap">{item.label}</span>
            </div>
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
   3. SERVICES OVERVIEW
══════════════════════════════════════════════════════════════ */
const services = [
  { icon: <MegaphoneIcon />, title: "Digital Marketing", desc: "Social media marketing, paid ads, influencer marketing and email automation to grow your brand.", href: "/services/digital-marketing", color: "bg-orange-50 text-orange-500", border: "hover:border-orange-200" },
  { icon: <SearchIcon />, title: "SEO Services", desc: "Technical SEO, on-page optimization, link building and organic growth strategies.", href: "/services/seo", color: "bg-blue-50 text-blue-500", border: "hover:border-blue-200" },
  { icon: <CodeIcon />, title: "Web Development", desc: "Conversion-focused websites built with modern technologies that perform and convert.", href: "/services/web-development", color: "bg-emerald-50 text-emerald-500", border: "hover:border-emerald-200" },
  { icon: <SmartphoneIcon />, title: "App Development", desc: "Scalable mobile apps for startups and enterprises on iOS, Android and beyond.", href: "/services/app-development", color: "bg-purple-50 text-purple-500", border: "hover:border-purple-200" },
];

function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">What We Do</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Everything You Need to <span className="text-orange-500">Grow Online</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">From strategy to execution — our full suite of digital services drives real, measurable growth.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 100}>
              <a href={svc.href} className={`group block bg-white border border-gray-100 ${svc.border} rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                <div className={`w-14 h-14 rounded-2xl ${svc.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>{svc.icon}</div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-orange-500 text-sm font-bold group-hover:gap-2.5 transition-all duration-200">Learn More <ArrowRight size={14} /></span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. OUR CORE TECHNOLOGY SERVICES  — YOUR ORIGINAL CODE (doc 1)
══════════════════════════════════════════════════════════════ */
const coreTechServices = [
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    icon: <MegaphoneIcon size={20} />,
    image: "https://res.cloudinary.com/junixo/image/upload/v1773244290/home-01-growth-driven-digital-marketing-seo-web-development_yns87z.webp",
    title: "Digital Marketing",
    desc: "Drive measurable growth with data-backed digital marketing. From paid social and Google Ads to email automation and influencer campaigns — we build full-funnel strategies that convert traffic into loyal customers.",
    technologies: ["Meta Ads", "Google Ads", "TikTok Ads", "LinkedIn Ads", "HubSpot", "Mailchimp", "Klaviyo", "ActiveCampaign", "Hootsuite", "Buffer", "Canva", "Semrush"],
    ctaLabel: "Explore Digital Marketing",
    ctaHref: "/services/digital-marketing",
    color: "orange",
  },
  {
    id: "seo",
    label: "SEO Services",
    icon: <SearchIcon size={20} />,
    image: "https://res.cloudinary.com/junixo/image/upload/v1773244613/home-02-why-businesses-choose-junixo_qxviuy.webp",
    title: "SEO Services",
    desc: "Dominate search rankings with enterprise-grade SEO. Our technical audits, content strategies, and authoritative link building compound month-over-month to deliver lasting organic visibility.",
    technologies: ["Ahrefs", "SEMrush", "Moz Pro", "Screaming Frog", "Google Search Console", "Google Analytics 4", "Surfer SEO", "Clearscope", "Majestic", "BrightLocal", "Yoast SEO", "Schema.org"],
    ctaLabel: "Explore SEO Services",
    ctaHref: "/services/seo",
    color: "blue",
  },
  {
    id: "web-development",
    label: "Web Development",
    icon: <CodeIcon size={20} />,
    image: "https://res.cloudinary.com/junixo/image/upload/v1773244928/home-03-growth-process_c3jxxw.webp",
    title: "Web Development",
    desc: "We build lightning-fast, conversion-optimised websites and web apps. From Shopify stores to bespoke Next.js platforms — every pixel is crafted for performance, accessibility, and measurable results.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "WordPress", "Shopify", "WooCommerce", "Webflow", "Tailwind CSS", "PostgreSQL", "Supabase", "AWS"],
    ctaLabel: "Explore Web Development",
    ctaHref: "/services/web-development",
    color: "emerald",
  },
  {
    id: "app-development",
    label: "App Development",
    icon: <SmartphoneIcon size={20} />,
    image: "https://res.cloudinary.com/junixo/image/upload/v1773244290/home-01-growth-driven-digital-marketing-seo-web-development_yns87z.webp",
    title: "App Development",
    desc: "Launch scalable iOS and Android apps built for performance and growth. Our mobile team delivers intuitive, feature-rich experiences — from MVP prototypes to enterprise-grade applications.",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Supabase", "Expo", "App Store Connect", "Google Play Console", "RevenueCat", "OneSignal", "Stripe"],
    ctaLabel: "Explore App Development",
    ctaHref: "/services/app-development",
    color: "purple",
  },
];

const colorMap: Record<string, { tabActive: string; badge: string; btn: string; iconBg: string; border: string }> = {
  orange: { tabActive: "text-orange-600 bg-orange-50 border-orange-500 font-bold", badge: "bg-orange-50 text-orange-600 border-orange-100", btn: "bg-orange-500 hover:bg-orange-600 shadow-orange-200", iconBg: "bg-orange-100 text-orange-600", border: "border-orange-500" },
  blue:   { tabActive: "text-blue-600 bg-blue-50 border-blue-500 font-bold",       badge: "bg-blue-50 text-blue-600 border-blue-100",       btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",       iconBg: "bg-blue-100 text-blue-600",     border: "border-blue-500" },
  emerald:{ tabActive: "text-emerald-600 bg-emerald-50 border-emerald-500 font-bold", badge: "bg-emerald-50 text-emerald-600 border-emerald-100", btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200", iconBg: "bg-emerald-100 text-emerald-600", border: "border-emerald-500" },
  purple: { tabActive: "text-purple-600 bg-purple-50 border-purple-500 font-bold", badge: "bg-purple-50 text-purple-600 border-purple-100", btn: "bg-purple-600 hover:bg-purple-700 shadow-purple-200", iconBg: "bg-purple-100 text-purple-600", border: "border-purple-500" },
};

function CoreTechServicesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const active = coreTechServices[activeTab];
  const colors = colorMap[active.color];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Our Expertise</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Our Core <span className="text-orange-500">Technology Services</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed max-w-2xl mx-auto">
            From strengthening your digital presence to scaling revenue — we offer technology services for end-to-end digital growth.
          </p>
        </FadeIn>

        {/* ── DESKTOP: tab-list | compact-image | content ── */}
    <div className="hidden lg:grid lg:grid-cols-[260px_300px_1fr] gap-0 bg-white lg:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Left tabs */}
          <div className="border-r border-gray-100 py-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-6 mb-4">Service Areas</p>
            {coreTechServices.map((svc, i) => (
              <button
                key={svc.id}
                onClick={() => setActiveTab(i)}
                className={`w-full text-left flex items-center gap-3.5 px-6 py-4 border-l-2 transition-all duration-200 cursor-pointer ${i === activeTab ? colors.tabActive : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent"}`}
              >
                <span className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${i === activeTab ? colors.iconBg : "bg-gray-100 text-gray-500"}`}>
                  {svc.icon}
                </span>
                <span className="text-sm font-semibold">{svc.label}</span>
              </button>
            ))}
          </div>

          {/* Center: compact image */}
          <div className="relative overflow-hidden h-auto" style={{ maxHeight: "420px" }}>
            <img
              key={active.id}
              src={active.image}
              alt={active.title}
              className="w-full h-full object-cover"
              style={{ animation: "fadeTab 0.4s ease", minHeight: "420px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Right: content */}
          <div className="border-l border-gray-100 p-8 flex flex-col justify-between" key={active.id + "-right"} style={{ animation: "fadeTab 0.4s ease" }}>
            <div>
              <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-5 ${colors.badge}`}>
                {active.icon} {active.label}
              </span>
              <h3 className="text-gray-900 font-black text-xl leading-snug mb-3">{active.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{active.desc}</p>
              <div className="mb-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="block w-8 h-px bg-gray-300" />Key Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.technologies.map((tech) => (
                    <span key={tech} className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <a href={active.ctaHref} className={`inline-flex items-center gap-2 text-white text-sm font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:-translate-y-0.5 self-start ${colors.btn}`}>
              {active.ctaLabel} <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* ── MOBILE: vertical tab list → image → content ── */}
        <div className="lg:hidden bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Vertical tab list — 1 per row */}
          <div className="flex flex-col border-b border-gray-100">
            {coreTechServices.map((svc, i) => (
              <button
                key={svc.id}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer border-l-4 ${i === activeTab ? colorMap[svc.color].tabActive : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-800"} ${i < coreTechServices.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${i === activeTab ? colorMap[svc.color].iconBg : "bg-gray-100 text-gray-400"}`}>
                  {svc.icon}
                </span>
                {svc.label}
              </button>
            ))}
          </div>

          {/* Image */}
          <div className="relative h-52 overflow-hidden" key={active.id + "-img"} style={{ animation: "fadeTab 0.4s ease" }}>
            <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6" key={active.id + "-content"} style={{ animation: "fadeTab 0.4s ease" }}>
            <h3 className="text-gray-900 font-black text-xl mb-3">{active.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">{active.desc}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Key Technologies</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {active.technologies.map((tech) => (
                <span key={tech} className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-600">{tech}</span>
              ))}
            </div>
            <a href={active.ctaHref} className={`inline-flex w-full items-center justify-center gap-2 text-white text-sm font-bold px-5 py-3 rounded-full transition-all ${colors.btn}`}>
              {active.ctaLabel} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. TECHNOLOGY STACK & PLATFORMS
══════════════════════════════════════════════════════════════ */
const BrandRect = ({ bg, text, textColor = "white", fontSize = 8 }: { bg: string; text: string; textColor?: string; fontSize?: number }) => (
  <svg viewBox="0 0 24 24" width="28" height="28"><rect width="24" height="24" rx="4" fill={bg} /><text x="12" y="16" textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill={textColor}>{text}</text></svg>
);

const techStackDomains = [
  {
    id: "digital-marketing", label: "Digital Marketing",
    icon: <MegaphoneIcon size={18} />,
    title: "Digital Marketing Platforms",
    subtitle: "Platforms powering your marketing campaigns",
    tools: [
      { name: "Meta Ads", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
      { name: "Google Ads", icon: <BrandRect bg="#4285F4" text="Ads" fontSize={7} /> },
      { name: "TikTok Ads", icon: <BrandRect bg="#010101" text="TT" /> },
      { name: "LinkedIn Ads", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
      { name: "HubSpot", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#FF7A59"><path d="M18.164 7.93V5.084a2.198 2.198 0 10-2.196 0V7.93a6.242 6.242 0 00-2.998 1.524L5.326 4.387a2.348 2.348 0 10-.792 1.114l7.425 5.22a6.274 6.274 0 00-.824 3.088 6.274 6.274 0 00.824 3.088l-7.425 5.22a2.348 2.348 0 10.792 1.114l7.644-5.067A6.26 6.26 0 0017.066 19.8a6.26 6.26 0 006.26-6.26 6.26 6.26 0 00-5.162-6.61zm-1.098 9.923a3.664 3.664 0 110-7.327 3.664 3.664 0 010 7.327z"/></svg> },
      { name: "Mailchimp", icon: <BrandRect bg="#FFE01B" text="MC" textColor="#241C15" /> },
      { name: "Klaviyo", icon: <BrandRect bg="#2B2B2B" text="KL" /> },
      { name: "ActiveCampaign", icon: <BrandRect bg="#356AE6" text="AC" /> },
    ],
  },
  {
    id: "seo", label: "SEO",
    icon: <SearchIcon size={18} />,
    title: "SEO Tools & Platforms",
    subtitle: "Industry-leading tools for organic growth",
    tools: [
      { name: "Ahrefs", icon: <BrandRect bg="#FF8C00" text="AH" /> },
      { name: "SEMrush", icon: <BrandRect bg="#FF642D" text="SEM" fontSize={7} /> },
      { name: "Moz Pro", icon: <BrandRect bg="#3B5BDB" text="Moz" fontSize={8} /> },
      { name: "GA4", icon: <BrandRect bg="#E37400" text="GA4" fontSize={7} /> },
      { name: "Search Console", icon: <BrandRect bg="#4285F4" text="GSC" fontSize={7} /> },
      { name: "Surfer SEO", icon: <BrandRect bg="#1EBF8A" text="SF" /> },
      { name: "Screaming Frog", icon: <BrandRect bg="#00A550" text="SF" /> },
      { name: "BrightLocal", icon: <BrandRect bg="#F5A623" text="BL" /> },
    ],
  },
  {
    id: "web-dev", label: "Web Development",
    icon: <CodeIcon size={18} />,
    title: "Web Development Stack",
    subtitle: "Modern frameworks and platforms we build with",
    tools: [
      { name: "React", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#61DAFB"><circle cx="12" cy="12" r="2.05"/><ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="#61DAFB" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)"/></svg> },
      { name: "Next.js", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="text-gray-900"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z"/></svg> },
      { name: "WordPress", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#21759B"><path d="M21.469 6.825c.61 1.453.939 3.04.939 4.809a12.16 12.16 0 01-1.244 5.385L17.7 8.13c.609-.036 1.158-.107 1.158-.107.546-.071.481-.862-.066-.825 0 0-1.637.13-2.692.13-1.005 0-2.69-.13-2.69-.13-.547-.036-.612.783-.064.825 0 0 .512.071 1.057.107l1.569 4.297-2.207 6.616-3.667-10.913c.611-.036 1.157-.107 1.157-.107.547-.071.482-.862-.063-.825 0 0-1.638.13-2.694.13l-.637-.013C5.96 5.812 8.754 4.225 11.95 4.225c2.498 0 4.772.956 6.479 2.519l-.042-.003c-1.005 0-1.714.875-1.714 1.814 0 .843.487 1.557.982 2.397.383.669.828 1.523.828 2.759 0 .857-.329 1.852-.754 3.234l-.984 3.291-3.565-10.616zm-9.786 16.312l-5.47-15.004C7.093 9.617 7.67 12.29 7.67 14.063c0 .824-.106 1.558-.287 2.238l-1.748-6.012C5.215 9.42 4.849 7.927 4.849 6.483c0-.484.045-.953.098-1.409A10.43 10.43 0 002.225 11.634c0 4.397 2.556 8.202 6.278 10.017l3.18-9.122-.001-.001.001.009zM12 22.225c-.898 0-1.768-.115-2.599-.33l2.757-8.007.016.049 2.706 7.415A10.38 10.38 0 0112 22.225z"/></svg> },
      { name: "Shopify", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#96BF48"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.021-.117-.117-.195-.214-.195-.097 0-1.874-.039-1.874-.039s-1.25-1.209-1.366-1.328v.039l-1.424 20.814h.287zm-3.73-11.152l-.974-2.917c0 0-.895.546-2.266.546-.995.022-1.776-.521-1.776-1.582 0-1.833 2.564-2.709 2.564-2.709s-.469-1.505-1.386-1.505-.994.39-1.424.39c0 0-.39-2.955 2.789-2.955 2.995 0 3.269 1.54 3.269 1.54l.195 2.136c1.463.488 2.233 1.189 2.233 1.189l-1.854 5.456.63.411zm-6.71 11.152l3.894.844 1.64-11.91L5.838 14.5l-.937 9.479h.006z"/></svg> },
      { name: "Node.js", icon: <BrandRect bg="#339933" text="Node" fontSize={7} /> },
      { name: "AWS", icon: <BrandRect bg="#FF9900" text="AWS" fontSize={7} /> },
      { name: "Figma", icon: <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/><path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/><path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/><path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/><path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/></svg> },
      { name: "Supabase", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#3ECF8E"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.101 12.957.763 14.19 1.9 14.19h9.813l.185 8.773c.015.987 1.26 1.41 1.875.638l9.262-11.653c.663-.907 0-2.14-1.137-2.14h-9.812L11.9 1.036z"/></svg> },
    ],
  },
  {
    id: "app-dev", label: "App Development",
    icon: <SmartphoneIcon size={18} />,
    title: "App Development Stack",
    subtitle: "Cross-platform and native mobile technologies",
    tools: [
      { name: "React Native", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#61DAFB"><circle cx="12" cy="12" r="2.05"/><ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="#61DAFB" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)"/></svg> },
      { name: "Flutter", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#54C5F8"><path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37z"/></svg> },
      { name: "Swift", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#FA7343"><path d="M21.985 16.31a9.53 9.53 0 001.085-2.048c-3.128 3.688-8.453 4.74-13.123 2.505a16.14 16.14 0 01-5.87-4.936c1.99 3.165 5.01 5.598 8.553 6.718-1.455 1.245-3.308 2.004-5.337 2.004C3.278 20.553 0 17.284 0 13.263c0-4.022 3.278-7.287 7.293-7.287 1.25 0 2.424.33 3.437.903C6.29 4.447 2.135 2.99 0 1.847c4.133 1.765 9.23 5.11 12.553 9.35-.25-1.5-1.053-4.147-3.053-6.55C14.31 7.112 17.13 11.58 18.5 15.258c.54-1.388.828-2.899.828-4.477 0-2.64-.8-5.097-2.177-7.145 3.168 2.913 5.14 7.062 5.14 11.667a15.86 15.86 0 01-.306 3.007"/></svg> },
      { name: "Kotlin", icon: <svg viewBox="0 0 24 24" width="28" height="28"><defs><linearGradient id="kg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#E44857"/><stop offset="50%" stopColor="#C711E1"/><stop offset="100%" stopColor="#7F52FF"/></linearGradient></defs><path fill="url(#kg2)" d="M2 0h20v24L12 12 2 24z"/></svg> },
      { name: "Firebase", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#FFCA28"><path d="M3.89 15.673L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.148l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"/></svg> },
      { name: "Expo", icon: <BrandRect bg="#000020" text="Expo" fontSize={7} /> },
      { name: "App Store", icon: <BrandRect bg="#0071E3" text="iOS" /> },
      { name: "Google Play", icon: <BrandRect bg="#01875F" text="GP" /> },
    ],
  },
  {
    id: "design", label: "UI/UX Design",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
    title: "Design Tools",
    subtitle: "Tools we use to craft exceptional experiences",
    tools: [
      { name: "Figma", icon: <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/><path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/><path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/><path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/><path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/></svg> },
      { name: "Adobe XD", icon: <BrandRect bg="#FF61F6" text="XD" /> },
      { name: "Framer", icon: <BrandRect bg="#0055FF" text="Fr" /> },
      { name: "Webflow", icon: <svg viewBox="0 0 24 24" width="28" height="28" fill="#4353FF"><path d="M17.7 5.2L14 13.4l-1.7-5.1s4.6-3 5.4-3.1zM8.4 13.6L12 5.2c-2.1 0-8.1 5.5-8.1 11.5 0 1 .1 2 .4 2.9l4.1-6zm12.9 2.2c0-4.9-4-8.8-8.9-8.9h-.1L9 15.1h6.5L14 18.7C12.5 19.7 11 20 9.4 20c-1.1 0-2.2-.2-3.2-.6.9 2.2 3 4.3 5.6 4.3 2.4.1 7.8-2.2 9.5-8.9z"/></svg> },
      { name: "Canva", icon: <BrandRect bg="#00C4CC" text="Ca" /> },
      { name: "Sketch", icon: <BrandRect bg="#EA6C00" text="Sk" /> },
      { name: "Lottie", icon: <BrandRect bg="#0E1D2B" text="LF" textColor="#00DDB3" /> },
      { name: "InVision", icon: <BrandRect bg="#FF3366" text="Inv" fontSize={7} /> },
    ],
  },
  {
    id: "analytics", label: "Analytics",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    title: "Analytics & Reporting",
    subtitle: "Turning data into actionable growth insights",
    tools: [
      { name: "Google Analytics 4", icon: <BrandRect bg="#E37400" text="GA4" fontSize={7} /> },
      { name: "Looker Studio", icon: <BrandRect bg="#4285F4" text="LS" /> },
      { name: "Hotjar", icon: <BrandRect bg="#FD3A5C" text="HJ" /> },
      { name: "Mixpanel", icon: <BrandRect bg="#7856FF" text="MX" /> },
      { name: "Tableau", icon: <BrandRect bg="#E97627" text="TB" /> },
      { name: "Power BI", icon: <BrandRect bg="#F2C811" text="BI" textColor="#333" /> },
      { name: "Segment", icon: <BrandRect bg="#52BD94" text="Sg" /> },
      { name: "MS Clarity", icon: <BrandRect bg="#0078D4" text="MC" /> },
    ],
  },
];

function TechStackSection() {
  const [activeDomain, setActiveDomain] = useState(0);
  const active = techStackDomains[activeDomain];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Tools & Platforms</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Our Technology <span className="text-orange-500">Stack and Platforms</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base max-w-2xl mx-auto">
            Deep expertise across every major platform, framework, and emerging technology your business needs.
          </p>
        </FadeIn>
        <FadeIn>
          {/* Desktop */}
          <div className="hidden lg:flex gap-6 bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden p-6">
            <div className="w-60 flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-3 self-start">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 pb-3 pt-1">Technology Domains</p>
              {techStackDomains.map((domain, i) => (
                <button key={domain.id} onClick={() => setActiveDomain(i)}
                  className={`w-full text-left flex items-center justify-between gap-2.5 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer mb-1 group ${i === activeDomain ? "bg-orange-500 text-white shadow-md shadow-orange-200" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`flex-shrink-0 ${i === activeDomain ? "text-white" : "text-gray-400 group-hover:text-orange-500"}`}>{domain.icon}</span>
                    <span className="text-sm font-semibold">{domain.label}</span>
                  </div>
                  {i === activeDomain && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>}
                </button>
              ))}
            </div>
            <div className="flex-1" key={active.id} style={{ animation: "fadeTab 0.35s ease" }}>
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">{active.icon}</div>
                  <div>
                    <h3 className="text-gray-900 font-black text-xl">{active.title}</h3>
                    <p className="text-gray-400 text-sm">{active.subtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {active.tools.map((tool) => (
                    <div key={tool.name} className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all duration-200 cursor-default hover:-translate-y-0.5 bg-white">
                      <div className="w-12 h-12 flex items-center justify-center">{tool.icon}</div>
                      <span className="text-xs font-semibold text-gray-600 text-center leading-tight group-hover:text-gray-900">{tool.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-gray-400 text-sm">+ many more tools and platforms</p>
                  <a href="/services" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-orange-200 hover:-translate-y-0.5">
                    Explore Solutions <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-3 mb-5" style={{ scrollbarWidth: "none" }}>
              {techStackDomains.map((domain, i) => (
                <button key={domain.id} onClick={() => setActiveDomain(i)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${i === activeDomain ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>
                  <span>{domain.icon}</span>{domain.label}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5" key={active.id + "-m"} style={{ animation: "fadeTab 0.35s ease" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">{active.icon}</div>
                <div>
                  <h3 className="text-gray-900 font-bold text-base">{active.title}</h3>
                  <p className="text-gray-400 text-xs">{active.subtitle}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {active.tools.map((tool) => (
                  <div key={tool.name} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-gray-100 bg-gray-50">
                    <div className="w-8 h-8 flex items-center justify-center">{tool.icon}</div>
                    <span className="text-[9px] font-semibold text-gray-600 text-center leading-tight">{tool.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <a href="/services" className="inline-flex w-full items-center justify-center gap-2 bg-orange-500 text-white text-sm font-bold px-5 py-3 rounded-full">
                  Explore Solutions <ArrowRight size={14} />
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
   6. WHY CHOOSE
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
              <Image src="https://res.cloudinary.com/junixo/image/upload/v1773244613/home-02-why-businesses-choose-junixo_qxviuy.webp"
                alt="Team Collaboration" width={600} height={450} className="relative rounded-3xl w-full object-cover shadow-xl" />
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-1 mb-1.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
                <p className="text-gray-800 font-bold text-sm leading-snug">"Best ROI we've ever seen from an agency."</p>
                <p className="text-gray-400 text-[11px] mt-1.5">- E-commerce Founder</p>
              </div>
            </div>
            <div className="flex sm:hidden items-center gap-3 mt-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-0.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
              <p className="text-gray-700 font-semibold text-sm">"Best ROI we've ever seen from an agency." — E-commerce Founder</p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-100 px-4 py-1.5 rounded-full">Why Junixo</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Why Businesses Choose <span className="text-orange-500">Junixo</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              We combine strategy, technology, and marketing expertise to build digital experiences that drive measurable growth. Every campaign, every website, every app — built to win.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
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
   7. OUR PROCESS — image first on mobile
══════════════════════════════════════════════════════════════ */
const steps = [
  { num: "01", title: "Discovery & Strategy", desc: "We analyze your market, competitors and growth opportunities to identify the clearest path forward." },
  { num: "02", title: "Research & Planning", desc: "Data-driven planning ensures campaigns start with the right strategy, audience insights and positioning." },
  { num: "03", title: "Execution & Development", desc: "Our team builds and launches high-performance digital solutions — on time, on spec, on brand." },
  { num: "04", title: "Optimization & Scaling", desc: "Continuous improvement and A/B testing drives compounding long-term growth for your business." },
];

function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn delay={150} className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-50 rounded-3xl transform rotate-2" />
              <Image src="https://res.cloudinary.com/junixo/image/upload/v1773244928/home-03-growth-process_c3jxxw.webp"
                alt="Growth Process" width={600} height={450} className="relative rounded-3xl w-full object-cover shadow-xl" />
            </div>
          </FadeIn>
          <FadeIn className="order-2 lg:order-1">
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
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   8. WHY SEO MATTERS
══════════════════════════════════════════════════════════════ */
const seoStats = [
  { value: "68%", label: "of online experiences begin with a search engine" },
  { value: "0.63%", label: "of Google searchers click on results from page 2" },
  { value: "14.6%", label: "close rate for SEO leads vs 1.7% for outbound" },
  { value: "53%", label: "of all website traffic comes from organic search" },
];

function WhySEOSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Why SEO Matters</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Organic Search is the{" "}
              <span className="text-orange-500">Highest-ROI Channel</span>{" "}
              for Long-Term Growth
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Over half of all web traffic comes from organic search. Businesses that invest in SEO dominate their niche, reduce customer acquisition costs, and build compounding value that paid ads simply cannot match. A strong SEO foundation means your brand is found 24/7 — without paying for every click.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {seoStats.map((s) => (
                <div key={s.value} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-orange-200 hover:shadow-md transition-all duration-200">
                  <p className="text-2xl font-black text-orange-500 mb-1">{s.value}</p>
                  <p className="text-gray-500 text-sm leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
            <a href="/services/seo" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
              Explore Our SEO Services <ArrowRight />
            </a>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-50 rounded-3xl transform -rotate-2" />
              <Image src="https://res.cloudinary.com/junixo/image/upload/v1773244613/home-02-why-businesses-choose-junixo_qxviuy.webp"
                alt="SEO Results and Organic Growth" width={600} height={450} className="relative rounded-3xl w-full object-cover shadow-xl" />
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-500">
                  <TrendingUpIcon size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Average Client</p>
                  <p className="text-gray-900 font-black text-lg leading-tight">+290% Traffic</p>
                </div>
              </div>
            </div>
            <div className="flex sm:hidden mt-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm items-center gap-3">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-green-500"><TrendingUpIcon size={20} /></div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Average Client</p>
                <p className="text-gray-900 font-black text-base leading-tight">+290% Organic Traffic</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   9. DIGITAL MARKETING RESULTS — LIGHT bg (no dark section)
══════════════════════════════════════════════════════════════ */
const resultItems = [
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, title: "ROI-Focused Paid Campaigns", desc: "Our Google Ads and Meta campaigns are engineered for maximum return. We obsess over cost-per-acquisition, not just impressions, delivering 4–9x ROAS for our clients across verticals." },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, title: "Technical SEO That Compounds", desc: "We fix the foundational issues that hold brands back — Core Web Vitals, schema markup, site architecture, and crawlability. The result is rankings that grow month after month." },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: "Websites Built to Convert", desc: "Every website we build starts with conversion strategy, not just aesthetics. Clear CTAs, lightning-fast load times, and A/B-tested layouts ensure visitors become customers." },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Full-Funnel Social Media", desc: "From organic content and community building to high-converting paid social — we manage your social presence to drive brand awareness, engagement, and measurable revenue." },
];

function DigitalMarketingResultsSection() {
  return (
    /* ✅ LIGHT background — bg-white instead of any dark color */
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">What Sets Us Apart</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Digital Marketing That{" "}
            <span className="text-orange-500">Drives Real Revenue</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            We don't chase vanity metrics. Every strategy, every campaign, and every deliverable is tied to measurable business outcomes — traffic, leads, and revenue.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6">
          {resultItems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 80}>
              <div className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-50 group-hover:bg-orange-500 rounded-2xl flex items-center justify-center text-orange-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
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
   10. INDUSTRIES
══════════════════════════════════════════════════════════════ */
const industries = [
  {
    name: "E-commerce & Retail",
    category: "Digital Commerce",
    icon: "🛍️",
    stat: "340% average revenue growth",
    desc: "Full-funnel digital strategies for Shopify, WooCommerce, and custom stores — from product discovery to checkout optimisation.",
    impact: "340% revenue",
    timeline: "6–9 months",
    href: "/industries/ecommerce",
  },
  {
    name: "SaaS & Tech",
    category: "Software",
    icon: "💻",
    stat: "Product-led SEO — 5x organic signups",
    desc: "Demand generation, product-led SEO, and growth marketing that turns organic traffic into paying subscribers.",
    impact: "5x signups",
    timeline: "3–6 months",
    href: "/industries/saas",
  },
  {
    name: "Healthcare & Wellness",
    category: "Health",
    icon: "🏥",
    stat: "Compliant campaigns — 2x patient leads",
    desc: "Regulation-compliant digital marketing strategies that build trust, authority, and generate qualified patient leads.",
    impact: "2x leads",
    timeline: "4–8 months",
    href: "/industries/healthcare",
  },
  {
    name: "Real Estate",
    category: "Property",
    icon: "🏢",
    stat: "Local SEO — 60% more enquiries",
    desc: "Local SEO, Google Ads, and lead nurturing systems purpose-built for developers, agencies, and property portals.",
    impact: "60% enquiries",
    timeline: "3–5 months",
    href: "/industries/real-estate",
  },
  {
    name: "Finance & Fintech",
    category: "Financial Services",
    icon: "💳",
    stat: "52% lower cost-per-lead",
    desc: "Regulated industry expertise with compliant PPC, content, and SEO strategies that convert high-intent audiences.",
    impact: "52% lower CPL",
    timeline: "4–6 months",
    href: "/industries/finance",
  },
  {
    name: "Hospitality & Travel",
    category: "Tourism",
    icon: "✈️",
    stat: "Direct bookings up 38%",
    desc: "Booking-focused SEO and paid campaigns that cut OTA dependency, fill rooms, and convert browsers into bookers.",
    impact: "38% bookings",
    timeline: "3–6 months",
    href: "/industries/hospitality",
  },
];

function IndustriesSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Industries We Serve</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Digital Growth Strategies for <span className="text-orange-500">Every Industry</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            We bring deep sector knowledge to every engagement — strategies tailored to your market, buyer behaviour, and competitive landscape.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <FadeIn key={ind.name} delay={i * 70}>
              <div className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                <div className="p-6 flex flex-col flex-1">
                  {/* Header: icon + name + category */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-orange-50 transition-colors duration-300">
                      {ind.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-black text-lg leading-tight">{ind.name}</h3>
                      <p className="text-gray-400 text-xs font-medium mt-0.5">{ind.category}</p>
                    </div>
                  </div>

                  {/* Stat pill */}
                  <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3.5 py-1.5 mb-4 self-start">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 flex-shrink-0">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                    </svg>
                    <span className="text-orange-600 text-xs font-bold">{ind.stat}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{ind.desc}</p>

                  {/* Impact + Timeline row */}
                  <div className="flex items-stretch gap-0 bg-orange-50 rounded-xl overflow-hidden mb-5 border border-orange-100">
                    <div className="flex-1 p-3.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                          <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                        </svg>
                        <span className="text-gray-900 font-black text-sm">{ind.impact}</span>
                      </div>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Impact</p>
                    </div>
                    <div className="w-px bg-orange-100" />
                    <div className="flex-1 p-3.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span className="text-gray-900 font-black text-sm">{ind.timeline}</span>
                      </div>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Timeline</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <a href={ind.href} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 self-start hover:-translate-y-0.5 shadow-sm shadow-orange-200">
                    Explore Solutions <ArrowRight size={13} />
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
   11. PARTNERS MARQUEE
══════════════════════════════════════════════════════════════ */
const clientLogos = [
  { name: "Shopify",    abbr: "SH",   bg: "#96BF48", textColor: "white" },
  { name: "Google",     abbr: "G",    bg: "#4285F4", textColor: "white" },
  { name: "HubSpot",    abbr: "HS",   bg: "#FF7A59", textColor: "white" },
  { name: "Stripe",     abbr: "ST",   bg: "#635BFF", textColor: "white" },
  { name: "Salesforce", abbr: "SF",   bg: "#00A1E0", textColor: "white" },
  { name: "Klaviyo",    abbr: "KL",   bg: "#1A1A1A", textColor: "white" },
  { name: "SEMrush",    abbr: "SEM",  bg: "#FF642D", textColor: "white" },
  { name: "Ahrefs",     abbr: "AH",   bg: "#FF8C00", textColor: "white" },
  { name: "Mailchimp",  abbr: "MC",   bg: "#FFE01B", textColor: "#241C15" },
  { name: "Meta",       abbr: "META", bg: "#1877F2", textColor: "white" },
  { name: "Webflow",    abbr: "WF",   bg: "#4353FF", textColor: "white" },
  { name: "AWS",        abbr: "AWS",  bg: "#232F3E", textColor: "white" },
];

function PartnersSection() {
  const doubled = [...clientLogos, ...clientLogos];
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FadeIn className="text-center">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Trusted Platforms & Partners</span>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3">
            Platforms We're <span className="text-orange-500">Certified & Partnered With</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">We maintain official partnerships and certifications with the world's leading digital platforms.</p>
        </FadeIn>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />
        <div className="partner-track flex items-center gap-5 w-max py-2">
          {doubled.map((logo, i) => (
            <div key={i} className="flex-shrink-0 bg-white border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-default min-w-[160px]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: logo.bg }}>
                <span className="text-[9px] font-black" style={{ color: logo.textColor }}>{logo.abbr}</span>
              </div>
              <span className="text-sm font-bold text-gray-700">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   12. AWARDS — placehold.co image placeholders
══════════════════════════════════════════════════════════════ */
const awards = [
  {
    image: "https://placehold.co/560x320/fff7ed/f97316?text=Clutch+Top+Agency+2024",
    badge: "bg-amber-50 text-amber-600 border-amber-200",
    badgeLabel: "Clutch.co",
    title: "Top Digital Agency 2024",
    desc: "Recognised as a top-rated agency for digital marketing and web development excellence.",
    year: "2024",
  },
  {
    image: "https://placehold.co/560x320/eff6ff/3b82f6?text=Google+5-Star+Rating",
    badge: "bg-blue-50 text-blue-600 border-blue-200",
    badgeLabel: "Google Reviews",
    title: "5-Star Rated Agency",
    desc: "Consistently rated 5 stars by 120+ clients for outstanding results and service quality.",
    year: "2024",
  },
  {
    image: "https://placehold.co/560x320/f0fdf4/22c55e?text=Google+Partner+Badge",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
    badgeLabel: "Google",
    title: "Google Partner Agency",
    desc: "Official Google Partner certified in Search, Display, and Performance Max campaigns.",
    year: "2023",
  },
  {
    image: "https://placehold.co/560x320/fdf4ff/a855f7?text=DesignRush+Best+SEO",
    badge: "bg-purple-50 text-purple-600 border-purple-200",
    badgeLabel: "DesignRush",
    title: "Best SEO Agency 2024",
    desc: "Featured among the best SEO agencies globally for measurable organic growth results.",
    year: "2024",
  },
  {
    image: "https://placehold.co/560x320/fff7ed/f97316?text=Shopify+Partner+Badge",
    badge: "bg-orange-50 text-orange-600 border-orange-200",
    badgeLabel: "Shopify Partners",
    title: "Top E-commerce Agency",
    desc: "Certified Shopify Partner with a strong track record of high-converting e-commerce builds.",
    year: "2023",
  },
  {
    image: "https://placehold.co/560x320/fef2f2/ef4444?text=Fast+100+Agency+Award",
    badge: "bg-rose-50 text-rose-600 border-rose-200",
    badgeLabel: "Agency Spotter",
    title: "Fast 100 Agency 2023",
    desc: "Recognised in the Fast 100 list of fastest-growing digital agencies worldwide.",
    year: "2023",
  },
];

function AwardsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Recognition</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Awards &amp; <span className="text-orange-500">Industry Recognition</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            Our work speaks for itself — recognised by the industry's most trusted platforms and directories.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <FadeIn key={award.title} delay={i * 80}>
              <div className="group bg-white rounded-3xl border border-gray-100 hover:border-orange-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                {/* Award image placeholder — dynamic 560×320 size */}
                <div className="overflow-hidden flex-shrink-0">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${award.badge}`}>
                      {award.badgeLabel}
                    </span>
                    <span className="text-xs font-bold text-gray-400">{award.year}</span>
                  </div>
                  <h3 className="text-gray-900 font-black text-base leading-snug mb-2">{award.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{award.desc}</p>
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
   13. TESTIMONIALS
══════════════════════════════════════════════════════════════ */
const testimonials = [
  { quote: "Junixo transformed our digital presence. Our organic traffic increased by over 400% in less than a year. Their team is strategic, responsive, and genuinely invested in our success.", name: "Sarah Mitchell", role: "Founder, SaaS Startup", img: "https://placehold.co/56x56/fff7ed/f97316?text=SM", rating: 5, tag: "SEO" },
  { quote: "The ROI on our paid campaigns exceeded every benchmark. Junixo doesn't just manage ads — they build real growth engines. Best agency investment we've made.", name: "James Okafor", role: "E-commerce Director", img: "https://placehold.co/56x56/eff6ff/3b82f6?text=JO", rating: 5, tag: "PPC Ads" },
  { quote: "Our website redesign delivered a 2x improvement in conversions within 60 days. Exceptional work from a team that truly understands performance-driven design.", name: "Priya Sharma", role: "Head of Growth, Tech Company", img: "https://placehold.co/56x56/f0fdf4/22c55e?text=PS", rating: 5, tag: "Web Dev" },
  { quote: "The keyword strategy they built for us cut our wasted ad spend by 52% in 30 days. We went from burning budget to profitable campaigns almost overnight.", name: "Daniel Carter", role: "Marketing Lead, D2C Brand", img: "https://placehold.co/56x56/fdf4ff/a855f7?text=DC", rating: 5, tag: "Google Ads" },
  { quote: "I've worked with 3 agencies before Junixo. None of them came close to this level of strategic thinking and transparency. They are in a completely different league.", name: "Emma Walsh", role: "CEO, E-commerce Brand", img: "https://placehold.co/56x56/fef2f2/ef4444?text=EW", rating: 5, tag: "Digital Marketing" },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);
  const getCard = (offset: number) => testimonials[(active + offset + total) % total];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Client Stories</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            What Our <span className="text-orange-500">Clients Say</span>
          </h2>
          <p className="text-gray-500 mt-3 text-sm">Trusted by 120+ brands across the world.</p>
        </FadeIn>
        <div className="hidden lg:block relative">
          <div className="flex items-stretch gap-5 justify-center">
            {[-1, 0, 1].map((offset) => {
              const t = getCard(offset);
              const isActive = offset === 0;
              return (
                <div key={offset} className="transition-all duration-500" style={{ width: isActive ? "420px" : "300px", opacity: isActive ? 1 : 0.5, transform: isActive ? "scale(1)" : "scale(0.97)", flexShrink: 0 }}>
                  <div className={`h-full rounded-3xl border p-8 flex flex-col transition-all duration-500 ${isActive ? "bg-white border-orange-200 shadow-2xl shadow-orange-100" : "bg-white border-gray-100 shadow-sm"}`}>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-orange-50 text-orange-500 px-3 py-1 rounded-full mb-4 self-start border border-orange-100">{t.tag}</span>
                    <div className="flex gap-0.5 mb-3">{Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} />)}</div>
                    <p className={`leading-relaxed flex-1 mb-6 ${isActive ? "text-gray-700 text-base" : "text-gray-500 text-sm"}`}>"{t.quote}"</p>
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
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-11 h-11 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all cursor-pointer"><ChevronLeftIcon /></button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-11 h-11 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-all cursor-pointer"><ChevronRightIcon /></button>
        </div>
        <div className="lg:hidden">
          <div key={active} className="bg-white rounded-3xl border border-orange-200 shadow-xl p-7" style={{ animation: "fadeUp 0.35s ease" }}>
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-orange-50 text-orange-500 px-3 py-1 rounded-full mb-4 border border-orange-100">{testimonials[active].tag}</span>
            <div className="flex gap-0.5 mb-3">{Array.from({ length: testimonials[active].rating }).map((_, i) => <StarIcon key={i} />)}</div>
            <p className="text-gray-700 text-base leading-relaxed mb-6">"{testimonials[active].quote}"</p>
            <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
              <img src={testimonials[active].img} alt={testimonials[active].name} className="w-11 h-11 rounded-full" />
              <div>
                <p className="text-gray-900 font-bold text-sm">{testimonials[active].name}</p>
                <p className="text-gray-400 text-xs">{testimonials[active].role}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={prev} className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 cursor-pointer transition-all"><ChevronLeftIcon /></button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === active ? "w-6 bg-orange-500" : "w-2 bg-gray-300"}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 cursor-pointer transition-all"><ChevronRightIcon /></button>
          </div>
        </div>
        <div className="hidden lg:flex gap-2 justify-center mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === active ? "w-6 bg-orange-500" : "w-2 bg-gray-300 hover:bg-orange-300"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   14. BLOG
══════════════════════════════════════════════════════════════ */
export interface BlogPostPreview {
  slug: string; title: string; excerpt: string; date: string;
  readTime?: string; category?: string; featuredImage?: string;
}

function BlogSection({ posts }: { posts: BlogPostPreview[] }) {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Insights</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">From the <span className="text-orange-500">Junixo Blog</span></h2>
          </div>
          <a href="/blog" className="inline-flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all duration-200 flex-shrink-0">View All Articles <ArrowRight /></a>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 100}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="overflow-hidden flex-shrink-0">
                  <img src={post.featuredImage || `https://placehold.co/420x260/fff7ed/f97316?text=${encodeURIComponent(post.title.slice(0, 20))}`}
                    alt={post.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  {post.category && <span className="inline-block self-start bg-orange-50 text-orange-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-orange-100 mb-3">{post.category}</span>}
                  <h3 className="text-gray-900 font-bold text-lg leading-snug mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 self-start hover:-translate-y-0.5 shadow-sm shadow-orange-200">
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
   15. SEARCHABLE SELECT
══════════════════════════════════════════════════════════════ */
const SERVICE_OPTIONS = [
  "PPC Google Ads Management","Google Search Ads","Google Shopping Ads","Google Display Advertising","YouTube Ads Management","Performance Max Campaigns","Remarketing & Retargeting","Social Media Management","Content Creation","Paid Social Advertising (Meta Ads)","TikTok Ads Management","LinkedIn Ads & B2B Marketing","Influencer Marketing","Social Media Strategy & Audit","SEO Audit","Technical SEO","On-Page SEO","Link Building","Local SEO","E-commerce SEO","Custom Website Design","WordPress Development","Shopify Development","Landing Page Design","UI / UX Design","WooCommerce","Progressive Web Apps","iOS App Development","Android App Development","React Native Apps","Flutter Development","SaaS Development","API Development","Marketing Analytics","A/B Testing","Growth Hacking","Conversion Rate Optimization","Other Service",
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
      <button type="button" id={id} onClick={() => setOpen(o => !o)}
        className={`cursor-pointer w-full flex items-center justify-between text-sm bg-white border rounded-xl px-4 py-3 focus:outline-none transition-colors text-left ${hasError ? "border-red-400 ring-2 ring-red-100" : open ? "border-orange-400 ring-2 ring-orange-100" : "border-gray-200 hover:border-orange-300"} ${value ? "text-gray-700" : "text-gray-400"}`}>
        <span className="truncate pr-2">{value || placeholder}</span>
        <span className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDownIcon /></span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5 bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input ref={searchRef} type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search services…" className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400" />
            {query && <button type="button" onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 flex-shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
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
   16. FINAL CTA
══════════════════════════════════════════════════════════════ */
interface LeadForm { full_name: string; email: string; phone: string; website_url: string; service: string; other_service: string; message: string; }
const EMPTY_FORM: LeadForm = { full_name: "", email: "", phone: "", website_url: "", service: "", other_service: "", message: "" };
type FormErrors = Partial<Record<keyof LeadForm, string>>;

function validateForm(form: LeadForm, isOther: boolean): FormErrors {
  const errs: FormErrors = {};
  if (!form.full_name.trim()) errs.full_name = "Full name is required.";
  if (!form.email.trim()) errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Please enter a valid email.";
  if (!form.service) errs.service = "Please select a service.";
  if (isOther && !form.other_service.trim()) errs.other_service = "Please specify your service.";
  if (!form.message.trim()) errs.message = "Please tell us about your project.";
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
    const payload = { full_name: form.full_name, email: form.email, phone: form.phone.trim() || null, website_url: form.website_url.trim() || null, service: isOther ? form.other_service : form.service, message: form.message, source_page };
    const { error } = await supabase.from("leads").insert([payload]);
    setLoading(false);
    if (error) { console.error(error); alert("Something went wrong. Please try again."); return; }
    setSubmitted(true); setForm(EMPTY_FORM); setErrors({});
  };

  const inputCls = "w-full text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors";

  return (
    <section id="get-started" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-orange-50 rounded-3xl border border-orange-100 overflow-hidden shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-10 lg:p-14">
                <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-6 border border-orange-200">Free Consultation</span>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
                  Ready to Grow Your <span className="text-orange-500">Business Online?</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">Book a free 30-minute strategy call. We'll analyze your current digital presence, identify opportunities and outline a clear growth roadmap — no pitch, no pressure, just honest advice.</p>
                <div className="space-y-3 mb-8">
                  {["Free digital audit included","Custom growth strategy for your business","No contracts or lock-ins required","Honest, data-backed recommendations"].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <span className="text-orange-500 flex-shrink-0"><CheckCircle size={15} /></span>
                      <span className="text-gray-700 text-sm font-medium">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl border border-orange-100 p-5">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Services we cover:</p>
                  <div className="flex flex-wrap gap-2">
                    {["SEO","Google Ads","Social Media","Web Dev","App Dev","Content","Email Marketing","CRO"].map(lbl => (
                      <span key={lbl} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">{lbl}</span>
                    ))}
                    <span className="text-gray-400 text-xs font-medium self-center ml-1">+ more</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 sm:p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-orange-100">
                {submitted ? (
                  <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={28} /></div>
                    <h3 className="text-gray-900 font-black text-2xl mb-2">You're Booked In! 🎉</h3>
                    <p className="text-gray-500 text-sm max-w-xs">Our team will reach out within 24 hours to confirm your free strategy call and begin your audit.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-gray-900 font-black text-xl mb-6">Get Your Free Strategy Call</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="full_name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name <span className="text-orange-500">*</span></label>
                          <input id="full_name" type="text" placeholder="Jane Smith" value={form.full_name} onChange={set("full_name")} className={`${inputCls} ${errors.full_name ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                          {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email <span className="text-orange-500">*</span></label>
                          <input id="email" type="email" placeholder="jane@company.com" value={form.email} onChange={set("email")} className={`${inputCls} ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">(optional)</span></label>
                          <input id="phone" type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={set("phone")} className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="website_url" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Website <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">(optional)</span></label>
                          <input id="website_url" type="url" placeholder="https://yourbrand.com" value={form.website_url} onChange={set("website_url")} className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Service Interested In <span className="text-orange-500">*</span></label>
                        <SearchableSelect id="service" value={form.service} onChange={(val) => { setForm((prev) => ({ ...prev, service: val, other_service: "" })); if (errors.service) setErrors((prev) => ({ ...prev, service: undefined })); }} placeholder="Search or select a service…" hasError={!!errors.service} />
                        {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                      </div>
                      {isOther && (
                        <div>
                          <label htmlFor="other_service" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Please Specify <span className="text-orange-500">*</span></label>
                          <input id="other_service" type="text" placeholder="Describe what you're looking for…" value={form.other_service} onChange={set("other_service")} autoFocus className={`${inputCls} ${errors.other_service ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                          {errors.other_service && <p className="mt-1 text-xs text-red-500">{errors.other_service}</p>}
                        </div>
                      )}
                      <div>
                        <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tell Us About Your Goals <span className="text-orange-500">*</span></label>
                        <textarea id="message" rows={4} placeholder="Tell us about your business, your goals, current challenges, or anything you'd like us to know…" value={form.message} onChange={set("message")} className={`${inputCls} resize-none ${errors.message ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                      </div>
                      <button type="submit" disabled={loading} className="cursor-pointer w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg mt-1">
                        {loading ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>Sending…</>) : <>Get My Free Strategy Call <ArrowRight /></>}
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
   FAQ
══════════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "How long before we see results from SEO or digital marketing?",
    a: "SEO typically shows meaningful movement in 60–90 days, with compounding gains over 6–12 months as authority builds. Paid social and Google Ads campaigns generally reach optimised performance within 3–4 weeks as we test and refine audiences, creatives, and bidding strategies. We set clear milestone targets from day one so you always know what to expect and when.",
  },
  {
    q: "Do you create all the content, or do we need to supply it?",
    a: "We handle everything — strategy, copywriting, graphics, video editing, scheduling, and publishing. You can be as involved or hands-off as you like. Most clients do a monthly content approval sign-off and leave the rest to us. If you have brand assets, guidelines, or existing content, we'll incorporate them seamlessly.",
  },
  {
    q: "Which platforms and channels do you recommend for my business?",
    a: "It depends on your audience, product, and growth goals. We start with a discovery session and audit your current digital presence before recommending the right 2–3 channels to focus on first. More isn't always better — focused execution on the right platforms consistently outperforms spreading budget thin across many channels.",
  },
  {
    q: "Do you require a long-term contract?",
    a: "No. All our retainer services are month-to-month — we keep you by delivering results, not by locking you in. Our project-based work (websites, apps) follows a clear milestone payment structure. We believe in earning your trust every month, which is why the majority of our clients stay with us for 12+ months.",
  },
  {
    q: "Can you manage our paid advertising alongside SEO?",
    a: "Absolutely — and we strongly recommend it. Paid ads give you immediate traffic while SEO builds long-term authority. Our integrated approach means your paid and organic strategies reinforce each other. We run Google Ads, Meta Ads, TikTok Ads, and LinkedIn Ads with full creative, targeting, budget management, and weekly optimisation.",
  },
  {
    q: "How do you measure and report on performance?",
    a: "From day one you'll have access to a live reporting dashboard showing real-time traffic, conversions, ROAS, keyword rankings, and more. You'll also receive weekly performance summaries and a monthly deep-dive report with analysis and recommendations. We focus on the metrics that actually matter to your revenue — not vanity numbers.",
  },
  {
    q: "Do you work with startups as well as established brands?",
    a: "Yes — we work with both. For early-stage startups we focus on high-impact, capital-efficient growth strategies and building the right digital foundation. For established brands we focus on scaling what works, fixing what doesn't, and identifying new growth channels. Our onboarding process is tailored to where you are now and where you need to go.",
  },
  {
    q: "What makes Junixo different from other digital agencies?",
    a: "We're built around measurable outcomes, not deliverables. Every strategy is tied to a business metric — revenue, leads, ROAS, or rankings. You get a dedicated team that combines strategic thinking with hands-on execution. We don't outsource, we don't use cookie-cutter playbooks, and we treat every client's growth as our own.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
            Questions We <span className="text-orange-500">Get Asked</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto">Everything you need to know before getting started. Can't find your answer? <a href="/contact" className="text-orange-500 font-semibold hover:underline">Ask us directly.</a></p>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="bg-orange-50 rounded-3xl border border-orange-100 p-6 sm:p-8 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? "border-orange-300 bg-white shadow-sm" : "border-orange-100 bg-white"}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="cursor-pointer w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                >
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


export default function HomePageClient({ blogPosts }: { blogPosts: BlogPostPreview[] }) {
  return (
    <main>
      <HeroSection />
      <ServicesMarquee />
      <ServicesSection />
      <CoreTechServicesSection />
      <TechStackSection />
      <WhyChooseSection />
      <ProcessSection />
      <WhySEOSection />
      <DigitalMarketingResultsSection />
      <IndustriesSection />
      <PartnersSection />
      <AwardsSection />
      <TestimonialsSection />
      <BlogSection posts={blogPosts} />
      <AuditCTASection />
      <FAQSection />
    </main>
  );
}