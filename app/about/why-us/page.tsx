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
  children, delay = 0, className = "", direction = "up",
}: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right";
}) {
  const { ref, inView } = useInView();
  const transform = {
    up: inView ? "translateY(0)" : "translateY(28px)",
    left: inView ? "translateX(0)" : "translateX(-28px)",
    right: inView ? "translateX(0)" : "translateX(28px)",
  }[direction];
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0, transform,
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
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
const CheckCircle = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const StarIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const XCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
const ZapIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const ShieldIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const UsersIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const TrendingUpIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const ClockIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const BarChartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const HeartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const MessageIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const AwardIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const GlobeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   1. HERO — Split diagonal layout
══════════════════════════════════════════════════════════════ */
function WhyUsHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-0">
      {/* Top blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full opacity-60 pointer-events-none" style={{ transform: "translate(25%, -30%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-0 relative">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 pt-4 mb-10"
          style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <span>/</span>
          <a href="/about" className="hover:text-orange-500 transition-colors">About Us</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">Why Choose Us</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-end">
          {/* Left text */}
          <div className="lg:pb-20">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Why Junixo</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}>
              An Agency That{" "}
              <span className="relative inline-block text-orange-500">
                Treats Your
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 220 6" preserveAspectRatio="none">
                  <path d="M0,3 Q55,0 110,3 Q165,6 220,3" stroke="#fb923c" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>
              {" "}Goals as Our Own
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-9 max-w-lg"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}>
              You've been burned by agencies that over-promised and under-delivered. We built Junixo specifically to be different — accountable, transparent, and obsessively focused on your outcomes.
            </p>

            <div className="flex flex-wrap gap-3"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.4s" }}>
              <a href="/get-a-quote"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                Get a Free Quote <ArrowRight />
              </a>
              <a href="/about/team"
                className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                Meet the Team
              </a>
            </div>

            {/* Inline social proof row */}
            <div className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-gray-100"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.5s" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["fff7ed/f97316", "eff6ff/3b82f6", "f0fdf4/22c55e", "fdf4ff/a855f7"].map((c, i) => (
                    <img key={i} src={`https://placehold.co/32x32/${c}?text=${["AM","JO","PS","DC"][i]}`}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <StarIcon key={i} />)}</div>
                  <p className="text-gray-500 text-xs">120+ happy clients</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">$30M+</p>
                <p className="text-gray-400 text-xs">Revenue generated</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-black text-lg leading-none">250+</p>
                <p className="text-gray-400 text-xs">Projects delivered</p>
              </div>
            </div>
          </div>

          {/* Right — clipped image panel */}
          <div className="relative lg:h-[580px] hidden lg:block"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(32px)", transition: "all 0.75s ease 0.3s" }}>
            <div className="absolute inset-0 overflow-hidden rounded-tl-[60px] rounded-bl-[60px] shadow-2xl">
              <img
                src="https://placehold.co/680x580/fff7ed/f97316?text=Why+Choose+Junixo"
                alt="Why Junixo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute bottom-8 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 border border-gray-100 z-10">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Client Retention</p>
              <p className="text-gray-900 font-black text-2xl leading-none">94<span className="text-orange-500">%</span></p>
              <p className="text-gray-400 text-xs mt-0.5">Stay for 12+ months</p>
            </div>
            {/* Top pill */}
            <div className="absolute top-8 -left-4 bg-orange-500 text-white rounded-full px-4 py-2 shadow-lg shadow-orange-200 z-10">
              <p className="text-xs font-bold">Top Rated 2024 ⭐</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal divider into next section */}
      <div className="hidden lg:block h-16 bg-orange-50 mt-0" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. COMPARISON TABLE — Us vs. Typical Agency
══════════════════════════════════════════════════════════════ */
const comparisons = [
  { topic: "Reporting", us: "Real-time dashboard + weekly calls", them: "Monthly PDF you never open" },
  { topic: "Strategy", us: "Custom-built for your business", them: "Cookie-cutter template reused for everyone" },
  { topic: "Team", us: "In-house specialists on every project", them: "Outsourced freelancers after you sign" },
  { topic: "Contracts", us: "Month-to-month — earn your trust each cycle", them: "12-month lock-in with hidden exit clauses" },
  { topic: "Communication", us: "Dedicated Slack channel + same-day replies", them: "Email chain that takes 3 days to get a response" },
  { topic: "Ownership", us: "You own all assets, data, and accounts", them: "Agency holds logins as leverage" },
  { topic: "Guarantees", us: "Performance benchmarks baked into proposals", them: "\"Results vary\" buried in the fine print" },
  { topic: "Onboarding", us: "Live in 5 days with a structured kickoff", them: "2–4 week onboarding before any work starts" },
];

function ComparisonSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">The Honest Comparison</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Junixo vs. The{" "}
            <span className="text-orange-500">Typical Agency</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">We'll let the differences speak for themselves.</p>
        </FadeIn>

        <FadeIn>
          {/* Header row */}
          <div className="grid grid-cols-3 gap-3 mb-3 px-2">
            <div className="text-gray-400 text-xs font-bold uppercase tracking-widest pl-2" />
            <div className="bg-orange-500 text-white text-center text-sm font-black py-3 rounded-2xl rounded-b-none shadow-md shadow-orange-200">
              ✦ Junixo Digital
            </div>
            <div className="bg-gray-100 text-gray-400 text-center text-sm font-semibold py-3 rounded-2xl rounded-b-none">
              Typical Agency
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-0 overflow-hidden rounded-2xl shadow-sm border border-orange-100">
            {comparisons.map((row, i) => (
              <div key={row.topic}
                className={`grid grid-cols-3 gap-0 border-b border-orange-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-orange-50/40"}`}>
                {/* Topic */}
                <div className="flex items-center px-5 py-4">
                  <span className="text-gray-700 font-bold text-sm">{row.topic}</span>
                </div>
                {/* Us */}
                <div className="flex items-center gap-2.5 px-5 py-4 border-l border-r border-orange-100">
                  <span className="text-orange-500 flex-shrink-0"><CheckCircle size={16} /></span>
                  <span className="text-gray-700 text-sm leading-snug">{row.us}</span>
                </div>
                {/* Them */}
                <div className="flex items-center gap-2.5 px-5 py-4">
                  <span className="text-red-400 flex-shrink-0"><XCircle /></span>
                  <span className="text-gray-400 text-sm leading-snug">{row.them}</span>
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
   3. DIFFERENTIATORS — Alternating feature rows
══════════════════════════════════════════════════════════════ */
const features = [
  {
    badge: "Transparency",
    title: "You Always Know Exactly What We're Doing",
    desc: "We give every client a live reporting dashboard, weekly video summaries, and a dedicated Slack channel. No waiting for monthly reports to find out if your money is working. You see everything in real time — clicks, rankings, conversions, revenue.",
    points: ["Live client dashboard from day one", "Weekly performance video summaries", "Direct Slack access to your account team"],
    img: "https://placehold.co/580x400/fff7ed/f97316?text=Live+Reporting+Dashboard",
    stat: { value: "100%", label: "Dashboard visibility" },
    icon: <BarChartIcon size={24} />,
    color: "bg-orange-100 text-orange-500",
    flip: false,
  },
  {
    badge: "In-House Talent",
    title: "Every Expert Is On Our Payroll — Not Freelance",
    desc: "When you hire Junixo, you get our actual team — the same strategists, developers, and designers you see on our website. We never outsource your work to anonymous contractors. Your campaigns are built by people who care about your results.",
    points: ["SEO, dev, design — all under one roof", "Consistent team across your entire project", "No handoffs, no communication gaps"],
    img: "https://placehold.co/580x400/eff6ff/3b82f6?text=In-House+Expert+Team",
    stat: { value: "0", label: "Outsourced deliverables" },
    icon: <UsersIcon size={24} />,
    color: "bg-blue-100 text-blue-500",
    flip: true,
  },
  {
    badge: "Speed & Execution",
    title: "We Move Fast Without Breaking Things",
    desc: "Most agencies spend your first month in 'discovery.' We spend it executing. Our proven onboarding process gets your campaigns live in 5 business days. Every project has clear milestones, owners, and deadlines — and we hit them.",
    points: ["Campaign live within 5 business days", "Clear milestones and delivery dates", "No bloated kickoff process"],
    img: "https://placehold.co/580x400/f0fdf4/22c55e?text=Fast+Execution+Process",
    stat: { value: "5", label: "Days to go live" },
    icon: <ZapIcon size={24} />,
    color: "bg-emerald-100 text-emerald-500",
    flip: false,
  },
  {
    badge: "Accountability",
    title: "We Put Performance Benchmarks in Writing",
    desc: "Tired of agencies that promise the world and deliver vague 'improvements'? We agree on specific, measurable targets before we start — and build them into your proposal. If we don't hit benchmarks, we keep working until we do, at no extra cost.",
    points: ["Written performance benchmarks upfront", "Monthly accountability reviews", "Free remediation if targets are missed"],
    img: "https://placehold.co/580x400/fdf4ff/a855f7?text=Performance+Guarantees",
    stat: { value: "94%", label: "Benchmark hit rate" },
    icon: <ShieldIcon size={24} />,
    color: "bg-purple-100 text-purple-500",
    flip: true,
  },
];

function FeatureRow({ f, i }: { f: typeof features[0]; i: number }) {
  return (
    <FadeIn delay={80}>
      <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${f.flip ? "lg:grid-flow-dense" : ""}`}>
        {/* Image side */}
        <div className={f.flip ? "lg:col-start-2" : ""}>
          <div className="relative">
            <div className={`absolute inset-0 rounded-3xl transform ${f.flip ? "-rotate-2" : "rotate-2"} ${i % 2 === 0 ? "bg-orange-50" : "bg-gray-50"}`} />
            <img src={f.img} alt={f.title}
              className="relative rounded-3xl w-full object-cover shadow-xl" />
            {/* Stat bubble */}
            <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl px-5 py-3.5 border border-gray-100">
              <p className="text-orange-500 font-black text-2xl leading-none">{f.stat.value}</p>
              <p className="text-gray-500 text-xs font-medium mt-0.5">{f.stat.label}</p>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className={f.flip ? "lg:col-start-1 lg:row-start-1" : ""}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center flex-shrink-0`}>
              {f.icon}
            </div>
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              {f.badge}
            </span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-4">{f.title}</h3>
          <p className="text-gray-500 text-base leading-relaxed mb-6">{f.desc}</p>
          <ul className="space-y-3">
            {f.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="text-orange-500 flex-shrink-0"><CheckCircle size={16} /></span>
                <span className="text-gray-700 font-medium text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">What Makes Us Different</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Four Reasons Clients{" "}
            <span className="text-orange-500">Stay With Us</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            Not just reasons to try us — reasons our clients stay for years.
          </p>
        </FadeIn>
        <div className="space-y-24 lg:space-y-32">
          {features.map((f, i) => (
            <FeatureRow key={f.badge} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. NUMBERS THAT MATTER
══════════════════════════════════════════════════════════════ */
const numbers = [
  { value: 94, suffix: "%", label: "Client Retention Rate", sub: "After 12 months", icon: <HeartIcon size={28} />, color: "text-pink-500 bg-pink-50" },
  { value: 5,  suffix: "d", label: "Average Go-Live Time", sub: "From signed contract", icon: <ClockIcon size={28} />, color: "text-orange-500 bg-orange-50" },
  { value: 380, suffix: "%", label: "Avg Organic Traffic Lift", sub: "Within 6 months", icon: <TrendingUpIcon size={28} />, color: "text-emerald-500 bg-emerald-50" },
  { value: 6.2, suffix: "x", label: "Average Client ROAS", sub: "Across paid campaigns", icon: <BarChartIcon size={28} />, color: "text-blue-500 bg-blue-50" },
  { value: 120, suffix: "+", label: "Verified Client Reviews", sub: "Across Google & Clutch", icon: <StarIcon size={28} />, color: "text-amber-500 bg-amber-50" },
  { value: 250, suffix: "+", label: "Projects Shipped", sub: "On time, on spec", icon: <AwardIcon size={28} />, color: "text-purple-500 bg-purple-50" },
];

function NumberCard({ value, suffix, label, sub, icon, color, start }: (typeof numbers)[0] & { start: boolean }) {
  const isDecimal = value % 1 !== 0;
  const count = useCountUp(Math.floor(value), 2000, start);
  const display = isDecimal ? `${count}.${String(value).split(".")[1]}` : count;

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 hover:border-orange-200 p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <p className="text-4xl font-black text-gray-900 leading-none mb-2">
        {display}{suffix}
      </p>
      <p className="text-gray-700 font-bold text-sm">{label}</p>
      <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
    </div>
  );
}

function NumbersSection() {
  const { ref, inView } = useInView(0.2);
  return (
    <section className="py-20 lg:py-24 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">The Proof</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Numbers That Tell the{" "}
            <span className="text-orange-500">Real Story</span>
          </h2>
        </FadeIn>
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {numbers.map((n, i) => (
            <NumberCard key={n.label} {...n} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. PROCESS TRUST BUILDER — Numbered horizontal steps
══════════════════════════════════════════════════════════════ */
const process = [
  {
    num: "01",
    icon: <MessageIcon size={22} />,
    title: "Free Strategy Call",
    desc: "We start with a 30-minute discovery call to understand your goals, challenges, and current situation — no pitch deck, just honest conversation.",
  },
  {
    num: "02",
    icon: <BarChartIcon size={22} />,
    title: "Custom Audit & Proposal",
    desc: "We audit your existing digital presence and build a bespoke proposal with specific goals, timelines, and benchmarks. No templates.",
  },
  {
    num: "03",
    icon: <ZapIcon size={22} />,
    title: "Fast, Structured Onboarding",
    desc: "Your dedicated account manager runs a structured kickoff. Campaigns go live within 5 business days. You know what's happening every step.",
  },
  {
    num: "04",
    icon: <TrendingUpIcon size={22} />,
    title: "Execute & Optimise Weekly",
    desc: "We work in weekly cycles — execute, measure, improve, repeat. You get a performance summary every Friday without having to ask.",
  },
  {
    num: "05",
    icon: <AwardIcon size={22} />,
    title: "Scale What Works",
    desc: "When campaigns hit targets, we scale. When they don't, we troubleshoot and fix — at no extra cost. Growth compounds over time.",
  },
];

function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">How It Works</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            From First Call to{" "}
            <span className="text-orange-500">Measurable Growth</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            A clear, repeatable process built to remove all the uncertainty of working with a new agency.
          </p>
        </FadeIn>

        {/* Desktop: horizontal connected steps */}
        <div className="hidden lg:grid grid-cols-5 gap-0 relative mb-12">
          {/* Connector line */}
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-orange-100" />

          {process.map((step, i) => (
            <FadeIn key={step.num} delay={i * 100}>
              <div className="relative flex flex-col items-center text-center px-3 group">
                {/* Step circle */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-white border-2 border-orange-100 group-hover:border-orange-500 group-hover:bg-orange-500 flex flex-col items-center justify-center mb-5 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-200">
                  <span className="text-orange-400 group-hover:text-white transition-colors">
                    {step.icon}
                  </span>
                  <span className="text-[9px] font-black text-orange-300 group-hover:text-orange-100 tracking-widest transition-colors">{step.num}</span>
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-2 leading-tight">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden space-y-5">
          {process.map((step, i) => (
            <FadeIn key={step.num} delay={i * 80}>
              <div className="flex gap-5 bg-orange-50 rounded-2xl p-5 border border-orange-100">
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-200">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-orange-400 text-[10px] font-black tracking-widest">{step.num}</span>
                    <h3 className="text-gray-900 font-bold text-sm">{step.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
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
   6. CLIENT LOVE — Masonry testimonials
══════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote: "We'd worked with three agencies before Junixo. None of them were honest about what was actually happening with our budget. Junixo showed us a live dashboard on day one. That level of transparency was revolutionary for us.",
    name: "Sarah Mitchell", role: "Founder, SaaS Startup",
    img: "https://placehold.co/56x56/fff7ed/f97316?text=SM",
    rating: 5, big: true,
  },
  {
    quote: "The ROAS on our Google campaigns hit 7x within 90 days. I didn't think that was possible in our niche.",
    name: "James Okafor", role: "E-commerce Director",
    img: "https://placehold.co/56x56/eff6ff/3b82f6?text=JO",
    rating: 5, big: false,
  },
  {
    quote: "They rebuilt our website and our conversion rate doubled in 60 days. Exceptional work, on time, on budget.",
    name: "Priya Sharma", role: "Head of Growth, Tech Co.",
    img: "https://placehold.co/56x56/f0fdf4/22c55e?text=PS",
    rating: 5, big: false,
  },
  {
    quote: "What separates Junixo is that they actually read their own reports. Every week they come with analysis and new ideas — not just data dumps. It feels like having an in-house team without the overhead.",
    name: "Tom Harrison", role: "CEO, DTC Brand",
    img: "https://placehold.co/56x56/fdf2f8/ec4899?text=TH",
    rating: 5, big: true,
  },
  {
    quote: "Month-to-month contract with no lock-in is how every agency should operate. It keeps them honest.",
    name: "Lena Brooks", role: "Marketing Director",
    img: "https://placehold.co/56x56/fefce8/eab308?text=LB",
    rating: 5, big: false,
  },
  {
    quote: "Our SEO traffic grew 400% in 8 months. Page one rankings across 30 high-intent keywords we'd been chasing for years.",
    name: "Daniel Chen", role: "Founder, E-commerce",
    img: "https://placehold.co/56x56/fdf4ff/a855f7?text=DC",
    rating: 5, big: false,
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-orange-100 transition-all duration-300 break-inside-avoid mb-4">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} />)}
      </div>
      <p className={`text-gray-700 leading-relaxed mb-5 ${t.big ? "text-base" : "text-sm"}`}>
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        <div>
          <p className="text-gray-900 font-bold text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Real Clients, Real Results</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Why Clients <span className="text-orange-500">Stay & Refer</span>
            </h2>
          </div>
          <a href="/reviews"
            className="flex-shrink-0 inline-flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all duration-200 text-sm">
            Read All Reviews <ArrowRight size={14} />
          </a>
        </FadeIn>

        {/* Masonry columns */}
        <FadeIn>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. GUARANTEES — Icon-forward light cards
══════════════════════════════════════════════════════════════ */
const guarantees = [
  {
    icon: <ClockIcon size={26} />,
    color: "bg-orange-100 text-orange-500",
    title: "5-Day Go-Live Guarantee",
    desc: "Your first campaign or deliverable is live within 5 business days of onboarding. If we miss it, we give you your first week free.",
  },
  {
    icon: <ShieldIcon size={26} />,
    color: "bg-blue-100 text-blue-500",
    title: "Written Performance Benchmarks",
    desc: "We agree on specific targets before starting. If benchmarks aren't met in the agreed window, we work for free until they are.",
  },
  {
    icon: <GlobeIcon size={26} />,
    color: "bg-emerald-100 text-emerald-500",
    title: "Full Asset Ownership",
    desc: "Every account, asset, and piece of content we create belongs to you — always. We hand over everything on day one, no conditions.",
  },
  {
    icon: <HeartIcon size={26} />,
    color: "bg-pink-100 text-pink-500",
    title: "No Long-Term Lock-In",
    desc: "We operate on a rolling monthly basis. Stay because the results are good — not because a contract says you have to.",
  },
];

function GuaranteesSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Our Commitments</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            We Back Our Words With{" "}
            <span className="text-orange-500">Guarantees</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">Real commitments, in writing, before we start.</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g, i) => (
            <FadeIn key={g.title} delay={i * 80}>
              <div className="group relative bg-white border border-gray-100 hover:border-orange-200 rounded-3xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Decorative bg circle */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`w-14 h-14 rounded-2xl ${g.color} flex items-center justify-center mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110`}>
                  {g.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-2 relative z-10">{g.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{g.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   8. FAQ
══════════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "How quickly will I see results?",
    a: "It depends on the service. Paid campaigns typically show results within 2–4 weeks. SEO is a longer game — expect meaningful organic growth in 3–6 months. Web projects go live within the agreed project timeline, usually 4–8 weeks.",
  },
  {
    q: "Do you require a long-term contract?",
    a: "No. We work on rolling monthly agreements for retainer services. We believe you should stay because of the results, not because you're locked in. Project work has a fixed-fee structure with clear milestones.",
  },
  {
    q: "Will I actually own my accounts and assets?",
    a: "100%. Every account we create — Google Ads, Meta, Search Console, your website — belongs to you from day one. We never use our own agency accounts as leverage.",
  },
  {
    q: "How do you measure success?",
    a: "We agree on KPIs before we start — whether that's ROAS, organic traffic, conversion rate, or lead volume. These are tracked in your live dashboard and reviewed on weekly calls.",
  },
  {
    q: "Do you work with small businesses or only big brands?",
    a: "Both. We work with funded startups, established SMBs, and enterprise brands. We don't have a minimum spend — we have a minimum fit. If we can genuinely help you, we'll say yes.",
  },
  {
    q: "What makes your team different from freelancers?",
    a: "Coordination, accountability, and depth. A freelancer gives you one skill set. Our team gives you SEO, paid media, design, development, and strategy working in sync — with a single point of contact managing it all.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-orange-200 shadow-sm" : "border-gray-100"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className="text-gray-900 font-bold text-sm sm:text-base">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-orange-500 text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48 pb-5" : "max-h-0"}`}>
        <p className="px-6 text-gray-500 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section className="py-20 lg:py-24 bg-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Common Questions</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="space-y-3 bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-sm">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   9. FINAL CTA — Split with image
══════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-orange-50 rounded-3xl border border-orange-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left content */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-5 self-start border border-orange-200">
                  Start Today
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
                  Still On the Fence?{" "}
                  <span className="text-orange-500">Let's Just Talk.</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                  No pitch. No pressure. Just a 30-minute conversation about your goals and whether we're the right fit. If we're not, we'll tell you that too.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <a href="/get-a-quote"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                    Book a Free Call <ArrowRight />
                  </a>
                  <a href="/contact"
                    className="inline-flex items-center gap-2 border-2 border-orange-300 hover:border-orange-500 text-orange-500 bg-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:shadow-md">
                    Send a Message
                  </a>
                </div>

                {/* Trust strip */}
                <div className="flex flex-wrap gap-4">
                  {["Free consultation", "No contracts", "Results guaranteed"].map((pill) => (
                    <span key={pill} className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                      <span className="text-orange-500"><CheckCircle size={14} /></span>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right image */}
              <div className="relative hidden lg:block min-h-[380px]">
                <img
                  src="https://placehold.co/680x460/fff7ed/f97316?text=Book+a+Free+Call"
                  alt="Book a free call"
                  className="w-full h-full object-cover"
                />
                {/* Overlay card */}
                <div className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-[220px]">
                  <div className="flex items-center gap-1 mb-2">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                  </div>
                  <p className="text-gray-800 font-bold text-sm leading-snug">"Booked a call on Monday, live by Friday."</p>
                  <p className="text-gray-400 text-[11px] mt-1.5">— E-commerce Founder</p>
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
   PAGE EXPORT
══════════════════════════════════════════════════════════════ */
export default function WhyUsPage() {
  return (
    <main>
      <WhyUsHero />
      <ComparisonSection />
      <FeaturesSection />
      <NumbersSection />
      <ProcessSection />
      <TestimonialsSection />
      <GuaranteesSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}