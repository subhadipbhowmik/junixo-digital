"use client";
import { useState, useEffect, useRef } from "react";

/* ─── INTERSECTION OBSERVER HOOK ─── */
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
    up:    inView ? "translateY(0)" : "translateY(32px)",
    left:  inView ? "translateX(0)" : "translateX(-32px)",
    right: inView ? "translateX(0)" : "translateX(32px)",
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

/* ─── ICONS ─── */
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const CheckCircle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const TrendingUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

/* ─── DATA ─── */
const CATEGORIES = [
  { id: "all",               label: "All Work",           count: 12 },
  { id: "digital-marketing", label: "Digital Marketing",  count: 3  },
  { id: "seo",               label: "SEO Services",       count: 3  },
  { id: "web-development",   label: "Web Development",    count: 3  },
  { id: "app-development",   label: "App Development",    count: 3  },
];

const CATEGORY_META: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  "digital-marketing": { color: "text-pink-600",    bg: "bg-pink-50",    border: "border-pink-200",    dot: "bg-pink-500"    },
  "seo":               { color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200",    dot: "bg-blue-500"    },
  "web-development":   { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500" },
  "app-development":   { color: "text-purple-600",  bg: "bg-purple-50",  border: "border-purple-200",  dot: "bg-purple-500"  },
};

const SERVICE_CARDS = [
  { id: "digital-marketing", label: "Digital Marketing", emoji: "📣", color: "bg-pink-50 border-pink-200 text-pink-600",      iconBg: "bg-pink-100",    count: 3, desc: "Social media, paid ads, email & PPC campaigns that grow revenue." },
  { id: "seo",               label: "SEO Services",      emoji: "🔍", color: "bg-blue-50 border-blue-200 text-blue-600",       iconBg: "bg-blue-100",    count: 3, desc: "Technical SEO, content strategy & link building that compounds." },
  { id: "web-development",   label: "Web Development",   emoji: "💻", color: "bg-emerald-50 border-emerald-200 text-emerald-600", iconBg: "bg-emerald-100", count: 3, desc: "Conversion-focused websites built for performance & growth." },
  { id: "app-development",   label: "App Development",   emoji: "📱", color: "bg-purple-50 border-purple-200 text-purple-600", iconBg: "bg-purple-100",  count: 3, desc: "Scalable mobile & web apps shipped fast, built to last." },
];

const PROJECTS = [
  /* Digital Marketing */
  {
    id: "dm-1", category: "digital-marketing", featured: true,
    tag: "Social Media + Paid Ads", industry: "Fashion & Apparel",
    title: "D2C Fashion Brand Goes Viral on TikTok & Instagram",
    excerpt: "A complete social media overhaul — Reels strategy, UGC campaigns, and Meta Ads — that turned a 2k-follower brand into a category leader in under 5 months.",
    img: "https://placehold.co/760x480/fff7ed/f97316?text=Fashion+D2C+Campaign",
    href: "/portfolio/digital-marketing/fashion-d2c",
    metrics: [{ label: "Follower Growth", value: "+420%" }, { label: "Organic Impressions", value: "1.2M" }, { label: "Revenue from Social", value: "+68%" }],
    quote: "Junixo took us from 2k to 26k followers in 4 months. Social is now our #1 revenue channel.",
    client: "Head of Brand, Fashion DTC", rating: 5,
  },
  {
    id: "dm-2", category: "digital-marketing", featured: false,
    tag: "Email Marketing + Automation", industry: "E-commerce",
    title: "Email Automation That Recovered £180k in Abandoned Carts",
    excerpt: "A 7-step behavioural email flow — welcome, browse abandonment, cart recovery, post-purchase and winback — built in Klaviyo and optimised weekly.",
    img: "https://placehold.co/540x360/fff0f0/ef4444?text=Email+Automation",
    href: "/portfolio/digital-marketing/email-automation",
    metrics: [{ label: "Cart Recovery", value: "£180k" }, { label: "Email Revenue Share", value: "34%" }, { label: "List Growth", value: "+210%" }],
    quote: "The automated flows alone cover our retainer fee five times over every month.",
    client: "E-commerce Founder", rating: 5,
  },
  {
    id: "dm-3", category: "digital-marketing", featured: false,
    tag: "PPC / Google Ads", industry: "Home Services",
    title: "Google Ads Campaign Delivers 9.4x ROAS for Local Services Brand",
    excerpt: "From zero to fully-optimised Performance Max + Search campaigns with granular geo-targeting, negative keyword sculpting, and creative testing.",
    img: "https://placehold.co/540x360/fff7ed/f97316?text=Google+Ads+Campaign",
    href: "/portfolio/digital-marketing/google-ads",
    metrics: [{ label: "ROAS", value: "9.4x" }, { label: "Cost Per Lead", value: "-52%" }, { label: "Monthly Leads", value: "3.1x" }],
    quote: "We tripled our leads and cut CPL in half. Genuinely didn't think that was possible.",
    client: "Director, Home Services Co.", rating: 5,
  },
  /* SEO */
  {
    id: "seo-1", category: "seo", featured: true,
    tag: "Technical SEO + Link Building", industry: "E-commerce",
    title: "E-commerce Store Goes from Page 4 to #1 in 8 Months",
    excerpt: "A full technical audit, Core Web Vitals overhaul, 300+ targeted backlinks, and an on-page content strategy that compounded month on month.",
    img: "https://placehold.co/760x480/eff6ff/3b82f6?text=Ecommerce+SEO+Growth",
    href: "/portfolio/seo/ecommerce-seo",
    metrics: [{ label: "Organic Traffic", value: "+380%" }, { label: "Keywords Top 3", value: "140+" }, { label: "Organic Revenue", value: "+290%" }],
    quote: "Junixo's SEO work is the best investment we've ever made. The compound effect is real.",
    client: "Founder, E-commerce Brand", rating: 5,
  },
  {
    id: "seo-2", category: "seo", featured: false,
    tag: "Local SEO", industry: "Healthcare",
    title: "Multi-Location Dental Practice Dominates Local Search",
    excerpt: "Google Business Profile optimisation, local citation building, and review acquisition across 6 clinic locations — all outranking national chains.",
    img: "https://placehold.co/540x360/eff6ff/3b82f6?text=Local+SEO+Healthcare",
    href: "/portfolio/seo/local-seo-dental",
    metrics: [{ label: "Local Pack", value: "#1 × 6" }, { label: "Google Reviews", value: "+340%" }, { label: "Enquiries", value: "+185%" }],
    quote: "All 6 of our locations now appear in the top 3 on Google Maps.",
    client: "Practice Manager, Dental Group", rating: 5,
  },
  {
    id: "seo-3", category: "seo", featured: false,
    tag: "Content-Led SEO", industry: "B2B SaaS",
    title: "SaaS Blog Strategy Drives 60k Monthly Organic Visitors",
    excerpt: "Topic cluster architecture, pillar pages, and a 12-month editorial calendar that turned a dormant blog into the company's highest-converting traffic source.",
    img: "https://placehold.co/540x360/eff6ff/3b82f6?text=SaaS+Content+SEO",
    href: "/portfolio/seo/saas-content-seo",
    metrics: [{ label: "Monthly Visitors", value: "60k+" }, { label: "Ranking Keywords", value: "2,400+" }, { label: "Blog Trial CVR", value: "4.8%" }],
    quote: "Organic became our #1 acquisition channel. Our CAC dropped by 60% in 12 months.",
    client: "CMO, B2B SaaS Platform", rating: 5,
  },
  /* Web Development */
  {
    id: "web-1", category: "web-development", featured: true,
    tag: "Shopify + CRO", industry: "Fashion Retail",
    title: "Shopify Redesign Doubles Conversion Rate for Fashion Retailer",
    excerpt: "A ground-up Shopify rebuild with mobile-first UX, custom product filtering, dynamic bundles, and a lightning-fast storefront that scored 98 on PageSpeed.",
    img: "https://placehold.co/760x480/f0fdf4/22c55e?text=Shopify+Redesign",
    href: "/portfolio/web-development/shopify-fashion",
    metrics: [{ label: "Conversion Rate", value: "2.1x" }, { label: "PageSpeed Score", value: "98/100" }, { label: "Revenue Uplift", value: "+£420k/yr" }],
    quote: "The new site paid for itself in 6 weeks. Conversion rate went from 1.4% to 3.1%.",
    client: "CEO, Fashion Retail Brand", rating: 5,
  },
  {
    id: "web-2", category: "web-development", featured: false,
    tag: "Custom Next.js Build", industry: "B2B SaaS",
    title: "SaaS Marketing Site Rebuilt in Next.js with 40% Lower Bounce Rate",
    excerpt: "From a sluggish WordPress install to a blazing-fast Next.js site with animated sections, dynamic pricing tables, and a CMS-driven blog.",
    img: "https://placehold.co/540x360/f0fdf4/22c55e?text=SaaS+Website+Rebuild",
    href: "/portfolio/web-development/saas-nextjs",
    metrics: [{ label: "Bounce Rate", value: "-40%" }, { label: "Demo Bookings", value: "+160%" }, { label: "Load Time", value: "0.8s" }],
    quote: "The site now reflects who we actually are. And the performance metrics speak for themselves.",
    client: "Head of Product, SaaS Startup", rating: 5,
  },
  {
    id: "web-3", category: "web-development", featured: false,
    tag: "WordPress + UX Redesign", industry: "Professional Services",
    title: "Law Firm Website Redesign Generates 3x More Enquiries",
    excerpt: "A complete brand and UX overhaul for a 6-partner law firm — clean, authoritative design, clear CTAs, and a performance-optimised WordPress build.",
    img: "https://placehold.co/540x360/f0fdf4/22c55e?text=Law+Firm+Website",
    href: "/portfolio/web-development/law-firm",
    metrics: [{ label: "Enquiries", value: "3.2x" }, { label: "Time on Site", value: "+88%" }, { label: "Mobile CVR", value: "+240%" }],
    quote: "We went from embarrassed about our website to actively promoting it to every prospect.",
    client: "Managing Partner, Law Firm", rating: 5,
  },
  /* App Development */
  {
    id: "app-1", category: "app-development", featured: true,
    tag: "React Native — iOS & Android", industry: "Health & Fitness",
    title: "Fitness App MVP Built & Launched in 14 Weeks",
    excerpt: "A cross-platform React Native fitness app with AI-generated workout plans, progress tracking, Stripe subscriptions, and a custom coach dashboard.",
    img: "https://placehold.co/760x480/fdf4ff/a855f7?text=Fitness+App+MVP",
    href: "/portfolio/app-development/fitness-app",
    metrics: [{ label: "Launch Timeline", value: "14 weeks" }, { label: "App Store Rating", value: "4.8★" }, { label: "Paying Subscribers", value: "1,200+" }],
    quote: "Junixo delivered our entire MVP on time and under budget. The quality is exceptional.",
    client: "Founder, FitTrack App", rating: 5,
  },
  {
    id: "app-2", category: "app-development", featured: false,
    tag: "Flutter — Cross Platform", industry: "Logistics",
    title: "Logistics Tracking App Reduces Dispatch Calls by 70%",
    excerpt: "A Flutter app for a 3PL company with real-time driver tracking, automated ETA notifications, proof-of-delivery photo capture, and a React admin panel.",
    img: "https://placehold.co/540x360/fdf4ff/a855f7?text=Logistics+App",
    href: "/portfolio/app-development/logistics-app",
    metrics: [{ label: "Dispatch Calls", value: "-70%" }, { label: "Delivery Accuracy", value: "99.2%" }, { label: "Driver Adoption", value: "100%" }],
    quote: "The app transformed how we operate. Our team can't imagine working without it now.",
    client: "Operations Director, 3PL Co.", rating: 5,
  },
  {
    id: "app-3", category: "app-development", featured: false,
    tag: "iOS App — Swift", industry: "Hospitality",
    title: "Restaurant Booking App with 15k Downloads in First Month",
    excerpt: "A native iOS app for a restaurant group — table reservations, pre-ordering, loyalty points, and push notifications, fully integrated with their POS system.",
    img: "https://placehold.co/540x360/fdf4ff/a855f7?text=Restaurant+App",
    href: "/portfolio/app-development/restaurant-app",
    metrics: [{ label: "Downloads (Month 1)", value: "15k" }, { label: "Bookings via App", value: "62%" }, { label: "Loyalty Redemption", value: "38%" }],
    quote: "Our app is now our most powerful marketing tool.",
    client: "MD, Restaurant Group", rating: 5,
  },
];

/* ══════════════════════════════
   1. HERO — two-column with image
══════════════════════════════ */
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-20 lg:pb-32">
      {/* BG blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-orange-50 rounded-full opacity-60"
          style={{ transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-orange-50 rounded-full opacity-40"
          style={{ transform: "translate(-25%,25%)" }} />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-orange-300 opacity-20"
            style={{
              width: [5,8,4,6][i], height: [5,8,4,6][i],
              top: ["18%","70%","42%","85%"][i],
              left: ["8%","6%","90%","75%"][i],
            }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10"
          style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">Portfolio</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left copy ── */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Our Work</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}>
              Real Brands,{" "}
              <span className="relative text-orange-500">
                Real Results
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 300 6" preserveAspectRatio="none">
                  <path d="M0,3 Q75,0 150,3 Q225,6 300,3" stroke="#fb923c" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}>
              Every project we take on is built to drive measurable growth — not just look good. Browse our work across Digital Marketing, SEO, Web Development, and App Development.
            </p>

            <div className="flex flex-wrap gap-3"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.38s" }}>
              <a href="/get-a-quote"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                Start Your Project <ArrowRight />
              </a>
              <a href="#portfolio"
                className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                View All Work
              </a>
            </div>

            {/* Trust strip — no fake numbers, just signals */}
            <div className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-100"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.46s" }}>
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {["fff7ed/f97316","eff6ff/3b82f6","f0fdf4/22c55e","fdf4ff/a855f7"].map((c, i) => (
                    <img key={i} src={`https://placehold.co/32x32/${c}?text=${["A","B","C","D"][i]}`}
                      className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
                  <p className="text-gray-400 text-xs">Loved by our clients</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <div className="flex flex-wrap gap-3">
                {[{ e: "📣", l: "Digital Marketing" }, { e: "🔍", l: "SEO" }, { e: "💻", l: "Web Dev" }, { e: "📱", l: "Apps" }].map(s => (
                  <span key={s.l} className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                    <span>{s.e}</span>{s.l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right image collage ── */}
          <div className="relative hidden lg:block"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(36px)", transition: "all 0.75s ease 0.3s" }}>
            <div className="relative">
              {/* Rotated bg card */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50 rounded-3xl transform rotate-2" />

              {/* Main image — 2×2 mini-grid of project thumbnails */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl grid grid-cols-2 gap-0.5 bg-orange-100">
                {[
                  { bg: "fff7ed/f97316", label: "Digital Marketing" },
                  { bg: "eff6ff/3b82f6", label: "SEO"               },
                  { bg: "f0fdf4/22c55e", label: "Web Development"    },
                  { bg: "fdf4ff/a855f7", label: "App Development"    },
                ].map((item) => (
                  <div key={item.label} className="relative overflow-hidden aspect-square">
                    <img
                      src={`https://placehold.co/320x320/${item.bg}?text=${encodeURIComponent(item.label)}`}
                      alt={item.label}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-300" />
                  </div>
                ))}
              </div>

              {/* Floating badge — services count */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100 z-10">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0">
                  <TrendingUp />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Specialisms</p>
                  <p className="text-gray-900 font-black text-base leading-tight">4 Core Services</p>
                </div>
              </div>

              {/* Floating rating */}
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 z-10">
                <div className="flex items-center gap-0.5 mb-1">
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

/* ══════════════════════════════
   2. SERVICE BROWSE CARDS
══════════════════════════════ */
function ServiceCardsSection({ onFilter }: { onFilter: (id: string) => void }) {
  return (
    <section className="py-14 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Browse by Service</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_CARDS.map((card, i) => (
            <FadeIn key={card.id} delay={i * 70}>
              <button
                onClick={() => onFilter(card.id)}
                className={`group w-full text-left border-2 ${card.color} rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white`}
              >
                <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {card.emoji}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900 font-bold text-base">{card.label}</h3>
                  <span className="text-xs font-bold bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                    {card.count} projects
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{card.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-orange-500 text-xs font-bold group-hover:gap-2.5 transition-all duration-200">
                  View Work <ArrowRight size={12} />
                </span>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════
   FEATURED PROJECT CARD
══════════════════════════════ */
function FeaturedCard({ project }: { project: typeof PROJECTS[0] }) {
  const meta = CATEGORY_META[project.category];
  return (
    <FadeIn>
      <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 lg:grid lg:grid-cols-2">
        <div className="relative overflow-hidden">
          <img src={project.img} alt={project.title}
            className="w-full h-60 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            <span className={`${meta.bg} ${meta.color} text-xs font-bold px-3 py-1.5 rounded-full border ${meta.border}`}>
              {CATEGORIES.find(c => c.id === project.category)?.label}
            </span>
            <span className="bg-white/90 backdrop-blur text-gray-700 font-bold text-xs px-3 py-1.5 rounded-full border border-gray-100">
              {project.tag}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-orange-500 text-white font-bold text-xs px-3 py-1.5 rounded-full">{project.industry}</span>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-orange-500 text-xs font-black px-3 py-1.5 rounded-full border border-orange-200">
            ⭐ Featured Project
          </div>
        </div>
        <div className="p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4">{project.title}</h3>
            <p className="text-gray-500 text-base leading-relaxed mb-6">{project.excerpt}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {project.metrics.map(m => (
                <div key={m.label} className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
                  <p className="text-orange-500 font-black text-lg leading-none">{m.value}</p>
                  <p className="text-gray-500 text-[10px] mt-1 leading-tight">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
              <div className="flex gap-0.5 mb-2">{Array.from({ length: project.rating }).map((_, i) => <StarIcon key={i} />)}</div>
              <p className="text-gray-700 text-sm italic leading-relaxed mb-2">"{project.quote}"</p>
              <p className="text-gray-400 text-[11px] font-bold">— {project.client}</p>
            </div>
          </div>
          <a href={project.href}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-md shadow-orange-200 hover:-translate-y-0.5 self-start">
            View Full Case Study <ArrowRight />
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════
   STANDARD PROJECT CARD
══════════════════════════════ */
function ProjectCard({ project, delay = 0 }: { project: typeof PROJECTS[0]; delay?: number }) {
  const meta = CATEGORY_META[project.category];
  return (
    <FadeIn delay={delay}>
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
        <div className="relative overflow-hidden">
          <img src={project.img} alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 left-3">
            <span className={`${meta.bg} ${meta.color} text-[10px] font-bold px-2.5 py-1 rounded-full border ${meta.border}`}>
              {CATEGORIES.find(c => c.id === project.category)?.label}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-100">
              {project.industry}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            <span className="text-gray-500 text-xs font-medium">{project.tag}</span>
          </div>
          <h3 className="text-gray-900 font-bold text-lg leading-snug mb-2 group-hover:text-orange-500 transition-colors">{project.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{project.excerpt}</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.map(m => (
              <div key={m.label} className="bg-orange-50 border border-orange-100 rounded-lg p-2 text-center">
                <p className="text-orange-500 font-black text-sm leading-none">{m.value}</p>
                <p className="text-gray-400 text-[9px] mt-0.5 leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs italic mb-4 line-clamp-2">"{project.quote}"</p>
          <a href={project.href}
            className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm group-hover:gap-2.5 transition-all duration-200 mt-auto">
            Read Case Study <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════
   3. PORTFOLIO GRID
══════════════════════════════ */
function PortfolioGrid({ activeFilter }: { activeFilter: string }) {
  const filtered = activeFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);
  const featured  = filtered.filter(p => p.featured);
  const regular   = filtered.filter(p => !p.featured);
  return (
    <div className="space-y-8">
      {featured.map(p => <FeaturedCard key={p.id} project={p} />)}
      {regular.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 80} />)}
        </div>
      )}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No projects found in this category yet.</p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════
   4. CTA — Free Audit form
   (matches homepage AuditSection style exactly)
══════════════════════════════ */
function CTASection() {
  const [form, setForm] = useState({ name: "", email: "", url: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-orange-50 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-200 rounded-full opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-200 rounded-full opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy + image */}
          <FadeIn>
            <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest mb-4 bg-orange-100 px-4 py-1.5 rounded-full border border-orange-200">
              Free Offer
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
              Get a Free Website{" "}
              <span className="text-orange-500">&amp; SEO Audit</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Our experts will analyse your website and reveal opportunities to increase traffic, improve rankings, and boost conversions — no strings attached.
            </p>

            {/* What's included */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-white rounded-3xl transform rotate-2 shadow-sm" />
              <img
                src="https://placehold.co/560x380/fff7ed/f97316?text=SEO+Audit+Dashboard"
                alt="SEO Audit"
                className="relative rounded-3xl w-full object-cover shadow-xl"
              />
              {/* Floating checklist badge */}
              <div className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Audit includes</p>
                {["SEO Health Score", "Speed Analysis", "Competitor Gap", "CRO Opportunities"].map(item => (
                  <div key={item} className="flex items-center gap-2 py-1">
                    <span className="text-green-500"><CheckCircle size={13} /></span>
                    <span className="text-xs text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={120}>
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 border border-orange-200 text-center shadow-sm">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-gray-900 font-bold text-xl mb-2">We Got Your Request!</h3>
                <p className="text-gray-500 text-sm">Our team will reach out within 24 hours with your free audit.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 border border-orange-100 shadow-sm space-y-4">
                {[
                  { key: "name",  label: "Your Name",     type: "text",  placeholder: "John Smith"               },
                  { key: "email", label: "Email Address", type: "email", placeholder: "john@company.com"           },
                  { key: "url",   label: "Website URL",   type: "url",   placeholder: "https://yourwebsite.com"   },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      required
                      className="w-full text-sm text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
                    />
                  </div>
                ))}
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg mt-2">
                  Get My Free Audit <ArrowRight />
                </button>
                <p className="text-center text-xs text-gray-400">No commitment · Free consultation · Results in 24 hrs</p>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════
   PAGE EXPORT
══════════════════════════════ */
export default function PortfolioPageClient() {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilter = (id: string) => {
    setActiveFilter(id);
    setTimeout(() => {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <main>
      <HeroSection />
      <ServiceCardsSection onFilter={handleFilter} />

      <section id="portfolio" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter bar */}
          <FadeIn className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900">
                  {activeFilter === "all" ? "All Projects" : CATEGORIES.find(c => c.id === activeFilter)?.label}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {(activeFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter)).length} project
                  {(activeFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter)).length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-gray-400 flex items-center gap-1.5 text-xs font-medium mr-1">
                  <FilterIcon /> Filter:
                </span>
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setActiveFilter(cat.id)}
                    className={`text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200 ${
                      activeFilter === cat.id
                        ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200"
                        : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500 bg-white"
                    }`}>
                    {cat.label}
                    <span className={`ml-1.5 text-[10px] ${activeFilter === cat.id ? "text-orange-200" : "text-gray-400"}`}>
                      ({cat.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <PortfolioGrid activeFilter={activeFilter} />

          {/* Coming soon banner */}
          <FadeIn delay={100} className="mt-16">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                More Case Studies Coming Soon
              </div>
              <p className="text-gray-600 text-base font-medium mb-2">
                Dedicated portfolio pages for each service are launching soon.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                In the meantime,{" "}
                <a href="/contact" className="text-orange-500 font-bold hover:underline">get in touch</a>
                {" "}and we'll share relevant case studies for your industry directly.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {SERVICE_CARDS.map(s => (
                  <span key={s.id} className={`border ${s.color} px-3 py-1.5 rounded-full text-xs font-bold`}>
                    {s.emoji} {s.label} Portfolio
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </main>
  );
}