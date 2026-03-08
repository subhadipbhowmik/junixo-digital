"use client";
import { useState, useEffect, useRef } from "react";

/* ─── INTERSECTION OBSERVER HOOK ─── */
function useInView(threshold = 0.15) {
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
  const transform = {
    up: inView ? "translateY(0)" : "translateY(32px)",
    left: inView ? "translateX(0)" : "translateX(-32px)",
    right: inView ? "translateX(0)" : "translateX(32px)",
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── COUNTER HOOK ─── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
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
const CheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const AwardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const HeartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const ZapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const TrendingUpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const QuoteIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-orange-200">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════════════ */
function AboutHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-20 lg:pb-32">
      {/* BG blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[580px] h-[580px] bg-orange-50 rounded-full opacity-70" style={{ transform: "translate(28%, -28%)" }} />
        <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-orange-50 rounded-full opacity-40" style={{ transform: "translate(-28%, 28%)" }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-orange-300 opacity-25"
            style={{
              width: [5, 8, 4, 7, 3][i], height: [5, 8, 4, 7, 3][i],
              top: ["18%", "72%", "44%", "82%", "30%"][i],
              left: ["12%", "7%", "88%", "78%", "94%"][i],
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">About Us</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Our Story</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}>
              We're the Team That{" "}
              <span className="text-orange-500 relative inline-block">
                Makes Brands
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 260 6" preserveAspectRatio="none">
                  <path d="M0,3 Q65,0 130,3 Q195,6 260,3" stroke="#fb923c" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>
              {" "}Win Online
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}>
              Junixo Digital was founded on a simple idea: ambitious brands deserve a digital partner that treats their growth like a personal mission. We're strategists, builders, and growth obsessives — united by results.
            </p>

            <ul className="space-y-3 mb-9"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.38s" }}>
              {[
                "Founded in 2018, grown to 8 countries",
                "250+ projects delivered, $30M+ in client revenue",
                "Full-service: strategy, SEO, web, apps & paid media",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 font-medium">
                  <span className="text-orange-500 flex-shrink-0 mt-0.5"><CheckCircle /></span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.46s" }}>
              <a href="/about/team"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                Meet the Team <ArrowRight />
              </a>
              <a href="/get-a-quote"
                className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                Work With Us
              </a>
            </div>
          </div>

          {/* Right — stacked image collage */}
          <div className="relative hidden lg:block"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(36px)", transition: "all 0.75s ease 0.3s" }}>
            <div className="relative h-[480px]">
              {/* Main image */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50 rounded-3xl transform rotate-2" />
                <img
                  src="https://placehold.co/600x480/fff7ed/f97316?text=Junixo+Team"
                  alt="Junixo Team"
                  className="relative rounded-3xl w-full h-full object-cover shadow-2xl"
                />
              </div>
              {/* Floating stat card — bottom left */}
              <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100 z-10">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0">
                  <TrendingUpIcon />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Founded</p>
                  <p className="text-gray-900 font-black text-lg leading-tight">2018</p>
                </div>
              </div>
              {/* Floating rating — top right */}
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 z-10">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                </div>
                <p className="text-xs font-bold text-gray-800">5.0 on Google</p>
                <p className="text-[10px] text-gray-400">120+ reviews</p>
              </div>
              {/* Floating location pill */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur rounded-full shadow-md px-3 py-2 flex items-center gap-1.5 border border-gray-100 z-10">
                <MapPinIcon />
                <span className="text-gray-700 text-xs font-semibold">Global · 8 Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. STATS BAR
══════════════════════════════════════════════════════════════ */
const stats = [
  { value: 250, suffix: "+", prefix: "", label: "Projects Delivered", icon: <TrendingUpIcon /> },
  { value: 120, suffix: "+", prefix: "", label: "Happy Clients", icon: <UsersIcon /> },
  { value: 12,  suffix: "M+", prefix: "", label: "Organic Visits", icon: <GlobeIcon /> },
  { value: 30,  suffix: "M+", prefix: "$", label: "Revenue Impact", icon: <AwardIcon /> },
];

function StatCard({ value, suffix, prefix, label, icon, start }: (typeof stats)[0] & { start: boolean }) {
  const count = useCountUp(value, 2200, start);
  return (
    <div className="text-center group">
      <div className="w-14 h-14 bg-orange-50 group-hover:bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 text-orange-500 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <p className="text-3xl lg:text-4xl font-black text-gray-900 leading-none mb-1">
        {prefix}{count}{suffix}
      </p>
      <p className="text-gray-400 font-medium text-sm">{label}</p>
    </div>
  );
}

function StatsBar() {
  const { ref, inView } = useInView(0.3);
  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 bg-white rounded-3xl px-10 py-12 shadow-sm border border-orange-100"
        >
          {stats.map((s) => (
            <StatCard key={s.label} {...s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. OUR STORY
══════════════════════════════════════════════════════════════ */
const milestones = [
  {
    year: "2018",
    title: "The Beginning",
    desc: "Alex Morgan founded Junixo Digital with two laptops, a rented desk, and an obsession with making digital marketing actually work for growing brands.",
    img: "https://placehold.co/480x320/fff7ed/f97316?text=2018+Founding",
  },
  {
    year: "2020",
    title: "Building the Team",
    desc: "We grew to a 10-person team, expanded into SEO and web development, and hit our first milestone of 50 clients served across three continents.",
    img: "https://placehold.co/480x320/eff6ff/3b82f6?text=2020+Growth",
  },
  {
    year: "2022",
    title: "Going Global",
    desc: "Opened offices in London and Dubai. Launched our proprietary growth framework that's since been used to scale over 80 brands past their growth ceilings.",
    img: "https://placehold.co/480x320/f0fdf4/22c55e?text=2022+Global",
  },
  {
    year: "2024",
    title: "Full-Service Leader",
    desc: "Recognized as a top-rated digital agency on Clutch and Google. 250+ projects delivered. $30M+ in tracked client revenue. Still hungry for more.",
    img: "https://placehold.co/480x320/fdf4ff/a855f7?text=2024+Leader",
  },
];

function OurStorySection() {
  const [active, setActive] = useState(0);
  const m = milestones[active];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Our Journey</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            From a Desk to a{" "}
            <span className="text-orange-500">Global Agency</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            Six years of relentless work, constant learning, and client wins that made it all worth it.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Timeline selector */}
          <FadeIn direction="left">
            <div className="space-y-4">
              {milestones.map((ms, i) => (
                <button
                  key={ms.year}
                  onClick={() => setActive(i)}
                  className={`cursor-pointer w-full text-left flex items-start gap-5 p-5 rounded-2xl border transition-all duration-300 ${
                    active === i
                      ? "bg-orange-50 border-orange-200 shadow-sm"
                      : "bg-white border-gray-100 hover:border-orange-100 hover:bg-orange-50/50"
                  }`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${
                    active === i ? "bg-orange-500 text-white shadow-md shadow-orange-200" : "bg-gray-100 text-gray-500"
                  }`}>
                    {ms.year.slice(2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold ${active === i ? "text-orange-500" : "text-gray-400"}`}>{ms.year}</span>
                      {active === i && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
                    </div>
                    <h3 className={`font-black text-base transition-colors ${active === i ? "text-gray-900" : "text-gray-600"}`}>{ms.title}</h3>
                    <p className={`text-sm leading-relaxed mt-1 transition-colors ${active === i ? "text-gray-600" : "text-gray-400"}`}>{ms.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Image */}
          <FadeIn direction="right" delay={100}>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-50 rounded-3xl transform rotate-2" />
              <img
                key={active}
                src={m.img}
                alt={m.title}
                className="relative rounded-3xl w-full object-cover shadow-xl"
                style={{ animation: "fadeUp 0.4s ease both" }}
              />
              <div className="absolute bottom-5 left-5 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
                <p className="text-orange-500 font-black text-2xl leading-none">{m.year}</p>
                <p className="text-gray-700 font-bold text-sm">{m.title}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. MISSION & VISION
══════════════════════════════════════════════════════════════ */
function MissionSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Mission */}
          <FadeIn direction="left">
            <div className="bg-white rounded-3xl p-9 border border-orange-100 shadow-sm h-full">
              <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <ZapIcon />
              </div>
              <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full mb-4 border border-orange-100">Our Mission</span>
              <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-4">
                To Make Ambitious Brands{" "}
                <span className="text-orange-500">Unstoppable Online</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                We exist to give every ambitious brand the unfair digital advantage they deserve. Through precision strategy, relentless execution, and genuine partnership, we help our clients outrank, outconvert, and outgrow the competition.
              </p>
              <ul className="space-y-3">
                {["Results tied to real business outcomes", "Strategies built on data, not guesswork", "Partnership that extends beyond campaigns"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                    <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Vision */}
          <FadeIn direction="right" delay={80}>
            <div className="bg-white rounded-3xl p-9 border border-orange-100 shadow-sm h-full">
              <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <GlobeIcon />
              </div>
              <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full mb-4 border border-orange-100">Our Vision</span>
              <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-4">
                The World's Most{" "}
                <span className="text-orange-500">Trusted Growth Agency</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                We envision a future where every growing business — no matter the size — has access to world-class digital expertise. We're building toward a global presence that serves brands from every corner of the world with the same personal dedication we started with.
              </p>
              <ul className="space-y-3">
                {["Expanding to 20+ countries by 2027", "Proprietary tools that democratize growth", "A community of 1,000+ scaled brands"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                    <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. CORE VALUES
══════════════════════════════════════════════════════════════ */
const values = [
  {
    icon: <ZapIcon />,
    color: "bg-orange-100 text-orange-500",
    title: "Results First",
    desc: "Every strategy, campaign, and decision is evaluated by one question: does it move the needle for our clients? Vanity metrics don't pay salaries.",
  },
  {
    icon: <ShieldIcon />,
    color: "bg-blue-100 text-blue-500",
    title: "Radical Transparency",
    desc: "We tell clients what they need to hear, not what they want to hear. Real reporting, honest forecasts, and no hiding behind jargon.",
  },
  {
    icon: <HeartIcon />,
    color: "bg-pink-100 text-pink-500",
    title: "Client Obsession",
    desc: "We succeed when our clients succeed. Their goals become our goals. We pick up the phone on weekends when something matters.",
  },
  {
    icon: <UsersIcon />,
    color: "bg-emerald-100 text-emerald-500",
    title: "Team Excellence",
    desc: "We hire exceptionally, invest in growth, and create an environment where the best people do their best work — for clients and for each other.",
  },
  {
    icon: <TrendingUpIcon />,
    color: "bg-purple-100 text-purple-500",
    title: "Continuous Growth",
    desc: "Digital never stops evolving. Neither do we. Every team member dedicates time each week to learning, testing, and pushing the craft forward.",
  },
  {
    icon: <AwardIcon />,
    color: "bg-amber-100 text-amber-500",
    title: "Craft & Quality",
    desc: "We sweat the details others ignore. Whether it's a headline, a page speed score, or a single ad creative — done right beats done fast.",
  },
];

function ValuesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">What Drives Us</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            The Values Behind{" "}
            <span className="text-orange-500">Everything We Do</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            Not just words on a wall — these are the principles that guide every hire, every campaign, and every client conversation.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 80}>
              <div className="group bg-white border border-gray-100 hover:border-orange-200 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  {v.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. WHY CHOOSE US
══════════════════════════════════════════════════════════════ */
const differentiators = [
  { label: "Dedicated account manager on every project" },
  { label: "Weekly performance reports — no surprises" },
  { label: "Strategies customized to your industry, not templated" }
];

function WhyUsSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-2 shadow-sm" />
              <img
                src="https://placehold.co/580x440/fff7ed/f97316?text=Why+Choose+Junixo"
                alt="Why Junixo"
                className="relative rounded-3xl w-full object-cover shadow-xl"
              />
              {/* Floating review card */}
              <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-[210px]">
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                </div>
                <p className="text-gray-800 font-bold text-sm leading-snug">"Best agency decision we ever made."</p>
                <p className="text-gray-400 text-[11px] mt-1.5">— SaaS Founder, London</p>
              </div>
              {/* Award badge */}
              <div className="absolute -top-4 -left-4 bg-orange-500 text-white rounded-2xl px-4 py-3 shadow-lg shadow-orange-200">
                <p className="font-black text-xl leading-none">Top</p>
                <p className="text-orange-200 text-xs font-bold uppercase tracking-widest">Rated Agency</p>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right" delay={100}>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Why Junixo</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              The Agency That Actually{" "}
              <span className="text-orange-500">Delivers</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              There's no shortage of agencies that promise the world. What makes Junixo different is simple: we only win when you win. Every commitment below is something we live by — not just talk about.
            </p>
            <div className="space-y-3 mb-8">
              {differentiators.map((d) => (
                <div key={d.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-orange-100">
                  <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>
                  <span className="text-gray-700 font-medium text-sm">{d.label}</span>
                </div>
              ))}
            </div>
            <a href="/about/why-us"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
              Learn More About Our Approach <ArrowRight />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. TEAM PREVIEW
══════════════════════════════════════════════════════════════ */
const teamPreview = [
  { name: "Alex Morgan",   role: "Founder & CEO",          img: "https://placehold.co/300x300/fff7ed/f97316?text=AM", dept: "Leadership" },
  { name: "Priya Sharma",  role: "Chief Marketing Officer", img: "https://placehold.co/300x300/fdf2f8/ec4899?text=PS", dept: "Marketing" },
  { name: "James Okafor",  role: "Head of SEO",             img: "https://placehold.co/300x300/eff6ff/3b82f6?text=JO", dept: "SEO" },
  { name: "Sarah Mitchell",role: "Lead Web Developer",      img: "https://placehold.co/300x300/f0fdf4/22c55e?text=SM", dept: "Development" },
  { name: "Daniel Chen",   role: "UI/UX Design Lead",       img: "https://placehold.co/300x300/fdf4ff/a855f7?text=DC", dept: "Design" },
];

const deptPill: Record<string, string> = {
  Leadership:  "bg-orange-100 text-orange-600",
  Marketing:   "bg-pink-100 text-pink-600",
  SEO:         "bg-blue-100 text-blue-600",
  Development: "bg-emerald-100 text-emerald-600",
  Design:      "bg-purple-100 text-purple-600",
};

function TeamPreviewSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">The People</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Built by Experts, <span className="text-orange-500">Driven by Results</span>
            </h2>
          </div>
          <a href="/about/team"
            className="flex-shrink-0 inline-flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all duration-200 text-sm">
            Meet the Full Team <ArrowRight size={14} />
          </a>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {teamPreview.map((m, i) => (
            <FadeIn key={m.name} delay={i * 70}>
              <a href="/about/team"
                className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="overflow-hidden aspect-square">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3.5">
                  <p className="text-gray-900 font-bold text-sm leading-tight">{m.name}</p>
                  <p className="text-orange-500 text-xs mt-0.5 leading-tight">{m.role}</p>
                  <span className={`inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${deptPill[m.dept]}`}>{m.dept}</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   8. TESTIMONIAL SPOTLIGHT
══════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote: "Junixo didn't just run our campaigns — they rebuilt our entire digital strategy from the ground up. The results spoke for themselves: 400% organic growth in under a year.",
    name: "Sarah Mitchell",
    role: "Founder, SaaS Startup",
    img: "https://placehold.co/64x64/fff7ed/f97316?text=SM",
    rating: 5,
  },
  {
    quote: "What separates Junixo from every other agency we've worked with is accountability. They set a goal, they hit it, and then they set a bigger one.",
    name: "James Okafor",
    role: "E-commerce Director",
    img: "https://placehold.co/64x64/eff6ff/3b82f6?text=JO",
    rating: 5,
  },
  {
    quote: "Our website redesign was done on time, on budget, and it doubled our conversion rate within 60 days. I genuinely didn't think that was possible.",
    name: "Priya Sharma",
    role: "Head of Growth, Tech Company",
    img: "https://placehold.co/64x64/f0fdf4/22c55e?text=PS",
    rating: 5,
  },
];

function TestimonialSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Client Stories</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
            Don't Take Our Word for It
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-orange-100 relative overflow-hidden">
            {/* Decorative quote mark */}
            <div className="absolute top-6 right-8 opacity-60">
              <QuoteIcon />
            </div>

            <div className="flex gap-0.5 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} />)}
            </div>

            <p
              key={active}
              className="text-gray-700 text-xl lg:text-2xl font-medium leading-relaxed mb-8 max-w-3xl"
              style={{ animation: "fadeUp 0.4s ease both" }}
            >
              "{t.quote}"
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-gray-900 font-bold">{t.name}</p>
                  <p className="text-gray-400 text-sm">{t.role}</p>
                </div>
              </div>
              {/* Nav dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`cursor-pointer h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-orange-500" : "w-2 bg-gray-300 hover:bg-orange-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   9. AWARDS & RECOGNITION
══════════════════════════════════════════════════════════════ */
const awards = [
  { title: "Top SEO Agency", body: "Clutch.co", year: "2024", color: "bg-orange-50 border-orange-100" },
  { title: "Best Digital Agency", body: "DesignRush", year: "2023", color: "bg-blue-50 border-blue-100" },
  { title: "Google Premier Partner", body: "Google", year: "2022–24", color: "bg-emerald-50 border-emerald-100" },
  { title: "Forbes Agency Council", body: "Forbes", year: "2023", color: "bg-amber-50 border-amber-100" },
  { title: "5-Star Excellence", body: "Trustpilot", year: "2024", color: "bg-purple-50 border-purple-100" },
  { title: "Top Web Dev Agency", body: "GoodFirms", year: "2024", color: "bg-pink-50 border-pink-100" },
];

function AwardsSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Recognition</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Industry-Recognized <span className="text-orange-500">Excellence</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {awards.map((a, i) => (
            <FadeIn key={a.title} delay={i * 60}>
              <div className={`${a.color} border rounded-2xl p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <AwardIcon />
                </div>
                <p className="text-gray-900 font-bold text-xs leading-tight mb-1">{a.title}</p>
                <p className="text-gray-400 text-[10px] font-medium">{a.body}</p>
                <p className="text-orange-500 text-[10px] font-bold mt-1">{a.year}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   10. CTA — LIGHT VERSION
══════════════════════════════════════════════════════════════ */
function AboutCTA() {
  return (
    <section className="py-20 bg-orange-50 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200 rounded-full opacity-30" style={{ transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200 rounded-full opacity-20" style={{ transform: "translate(-30%, 30%)" }} />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <FadeIn>
          <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-100 border border-orange-200 px-4 py-1.5 rounded-full mb-5">
            Ready to Grow?
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight mb-5">
            Let's Build Something{" "}
            <span className="text-orange-500">Great Together</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Whether you need SEO, paid campaigns, a new website, or a full-stack digital strategy — we're ready to get started on your growth story.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/get-a-quote"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5 text-base">
              Get a Free Quote <ArrowRight />
            </a>
            <a href="/contact"
              className="inline-flex items-center gap-2 border-2 border-orange-300 hover:border-orange-500 text-orange-500 hover:text-orange-600 bg-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-md text-base">
              Talk to Our Team
            </a>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["No contracts", "Free consultation", "Results guaranteed", "Cancel anytime"].map((pill) => (
              <span key={pill} className="flex items-center gap-1.5 text-gray-500 text-sm bg-white border border-gray-200 px-3.5 py-1.5 rounded-full">
                <span className="text-orange-500 flex-shrink-0"><CheckCircle /></span>
                {pill}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════════════ */
export default function AboutPageClient() {
  return (
    <main>
      <AboutHero />
      <StatsBar />
      <OurStorySection />
      <MissionSection />
      <ValuesSection />
      <WhyUsSection />
      <TeamPreviewSection />
      <TestimonialSection />
      <AwardsSection />
      <AboutCTA />
    </main>
  );
}