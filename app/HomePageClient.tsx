"use client";
import { useState, useEffect, useRef } from "react";

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

/* ─── ICONS ─── */
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ─── SERVICE ICONS ─── */
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
const QuoteIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-orange-200">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

/* ─── SECTION FADE WRAPPER ─── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

/* ─── 1. HERO SECTION ─── */
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-20 lg:pb-32">
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
              <span className="text-orange-500 relative">
                Digital Marketing
               
              </span>
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
              <a href="/get-a-quote" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-0.5">
                Get a Free Quote <ArrowRight />
              </a>
              <a href="/portfolio" className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                View Our Work
              </a>
            </div>

            {/* Social proof pills */}
            <div
              className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-gray-100"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.6s ease 0.6s" }}
            >
              {[
                { value: "250+", label: "Projects" },
                { value: "120+", label: "Happy Clients" },
                { value: "5★", label: "Avg Rating" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <span className="text-2xl font-black text-orange-500">{s.value}</span>
                  <span className="text-gray-400 text-sm font-medium">{s.label}</span>
                  <span className="text-gray-200 select-none">|</span>
                </div>
              ))}
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
              {/* Floating badge */}
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

/* ─── 2. TRUSTED BY ─── */
function TrustedBySection() {
  const logos = Array.from({ length: 7 }, (_, i) => ({
    src: `https://placehold.co/130x50/f9fafb/9ca3af?text=Client+${i + 1}`,
    alt: `Client ${i + 1}`,
  }));

  return (
    <section className="py-14 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Trusted by Growing Brands Worldwide
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-10 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── 3. SERVICES OVERVIEW ─── */
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
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">What We Do</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Everything You Need to{" "}
            <span className="text-orange-500">Grow Online</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            From strategy to execution — our full suite of digital services drives real, measurable growth.
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

/* ─── 4. WHY CHOOSE JUNIXO ─── */
const features = [
  "Data-Driven Strategies",
  "Transparent Reporting",
  "Conversion-Focused Design",
  "Experienced Growth Experts",
  "Fast Execution",
  "Long-Term Partnership",
];

function WhyChooseSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
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
                <p className="text-gray-400 text-[11px] mt-1.5">— E-commerce Founder</p>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={150}>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-100 px-4 py-1.5 rounded-full">Why Junixo</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Why Businesses Choose <span className="text-orange-500">Junixo</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              We combine strategy, technology, and marketing expertise to build digital experiences that drive measurable growth. Every campaign, every website, every app — built to win.
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

/* ─── 5. OUR PROCESS ─── */
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
          {/* Content */}
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

          {/* Image */}
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

/* ─── 6. CASE STUDIES ─── */
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
                  <div className="absolute bottom-4 right-4 bg-orange-500 text-white rounded-xl px-3 py-2 text-center">
                    <p className="font-black text-lg leading-none">{cs.metric}</p>
                    <p className="text-[10px] opacity-90">{cs.metricLabel}</p>
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

/* ─── 7. STATS ─── */
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
    <section className="py-20 lg:py-24 bg-white">
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

/* ─── 8. TESTIMONIALS ─── */
const testimonials = [
  {
    quote: "Junixo transformed our digital presence. Our organic traffic increased by over 400% in less than a year. Their team is strategic, responsive, and genuinely invested in our success.",
    name: "Sarah Mitchell",
    role: "Founder, SaaS Startup",
    img: "https://placehold.co/80x80/fff7ed/f97316?text=SM",
    rating: 5,
  },
  {
    quote: "The ROI on our paid campaigns exceeded every benchmark. Junixo doesn't just manage ads — they build real growth engines. Best agency investment we've made.",
    name: "James Okafor",
    role: "E-commerce Director",
    img: "https://placehold.co/80x80/eff6ff/3b82f6?text=JO",
    rating: 5,
  },
  {
    quote: "Our website redesign delivered a 2x improvement in conversions within 60 days. Exceptional work from a team that truly understands performance-driven design.",
    name: "Priya Sharma",
    role: "Head of Growth, Tech Company",
    img: "https://placehold.co/80x80/f0fdf4/22c55e?text=PS",
    rating: 5,
  },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 bg-orange-50 px-4 py-1.5 rounded-full">Client Stories</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            What Our <span className="text-orange-500">Clients Say</span>
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Image */}
          <FadeIn>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-100 rounded-3xl transform rotate-3" />
              <img
                src="https://placehold.co/480x420/fff7ed/f97316?text=Client+Photo"
                alt="Client"
                className="relative rounded-3xl w-full object-cover shadow-xl"
              />
            </div>
          </FadeIn>

          {/* Testimonial */}
          <FadeIn delay={150}>
            <div className="relative">
              <QuoteIcon />
              <div className="mt-3" key={active} style={{ animation: "fadeUp 0.4s ease" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed font-medium mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-gray-900 font-bold">{t.name}</p>
                    <p className="text-gray-400 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>

              {/* Nav dots */}
              <div className="flex gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-orange-500" : "w-2 bg-gray-300 hover:bg-orange-300"}`}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}

/* ─── 9. BLOG ─── */
const posts = [
  {
    tag: "SEO",
    title: "10 SEO Strategies That Drive Organic Traffic in 2025",
    excerpt: "Learn the most effective SEO techniques used by high-growth companies to dominate search results.",
    date: "Mar 2, 2025",
    readTime: "5 min read",
    img: "https://placehold.co/420x260/fff7ed/f97316?text=Blog+Post+1",
  },
  {
    tag: "Paid Ads",
    title: "How to Run Google Ads That Actually Convert",
    excerpt: "A deep dive into campaign structure, bidding strategies, and landing page alignment that maximize ROAS.",
    date: "Feb 24, 2025",
    readTime: "7 min read",
    img: "https://placehold.co/420x260/eff6ff/3b82f6?text=Blog+Post+2",
  },
  {
    tag: "Web Dev",
    title: "Why Your Website Speed Is Killing Your Conversions",
    excerpt: "Core Web Vitals explained — and the quick wins that can improve performance in under a week.",
    date: "Feb 16, 2025",
    readTime: "4 min read",
    img: "https://placehold.co/420x260/f0fdf4/22c55e?text=Blog+Post+3",
  },
];

function BlogSection() {
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
            <FadeIn key={post.title} delay={i * 100}>
              <a href="/blog" className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-orange-50 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">{post.tag}</span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-gray-400 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg leading-snug mb-2 group-hover:text-orange-500 transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <p className="text-gray-300 text-xs">{post.date}</p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 10. FREE AUDIT CTA ─── */
function AuditSection() {
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
          {/* Content + Form */}
          <FadeIn>
            <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest mb-4 bg-orange-100 px-4 py-1.5 rounded-full">Free Offer</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
              Get a Free Website <span className="text-orange-500">&amp; SEO Audit</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Our experts will analyze your website and reveal opportunities to increase traffic, improve rankings, and boost conversions — no strings attached.
            </p>

            {submitted ? (
              <div className="bg-white rounded-2xl p-8 border border-orange-200 text-center shadow-sm">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle />
                </div>
                <h3 className="text-gray-900 font-bold text-xl mb-2">We Got Your Request!</h3>
                <p className="text-gray-500 text-sm">Our team will reach out within 24 hours with your free audit.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 border border-orange-100 shadow-sm space-y-4">
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "John Smith" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "john@company.com" },
                  { key: "url", label: "Website URL", type: "url", placeholder: "https://yourwebsite.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      required
                      className="w-full text-sm text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg mt-2"
                >
                  Get My Free Audit <ArrowRight />
                </button>
                <p className="text-center text-xs text-gray-400">No commitment · Free consultation · Results in 24 hrs</p>
              </form>
            )}
          </FadeIn>

          {/* Image */}
          <FadeIn delay={150}>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-white rounded-3xl transform rotate-2 shadow-sm" />
              <img
                src="https://placehold.co/560x420/fff7ed/f97316?text=SEO+Audit+Dashboard"
                alt="SEO Audit"
                className="relative rounded-3xl w-full object-cover shadow-xl"
              />
              <div className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Audit includes</p>
                {["SEO Health Score", "Speed Analysis", "Competitor Gap", "CRO Opportunities"].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1">
                    <span className="text-green-500"><CheckCircle /></span>
                    <span className="text-xs text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE EXPORT ─── */
export default function HomePageClient() {
  return (
    <main>
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <WhyChooseSection />
      <ProcessSection />
      <CaseStudiesSection />
      <StatsSection />
      <TestimonialsSection />
      <BlogSection />
      <AuditSection />
    </main>
  );
}