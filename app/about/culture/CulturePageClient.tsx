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
  const transform = {
    up: inView ? "translateY(0)" : "translateY(30px)",
    left: inView ? "translateX(0)" : "translateX(-30px)",
    right: inView ? "translateX(0)" : "translateX(30px)",
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

/* ─── COUNTER ─── */
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
const HeartIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
const BookOpenIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const SunIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const CoffeeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);
const GlobeIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const TrendingUpIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const MusicIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);
const MapPinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const BriefcaseIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const AwardIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════════════ */
function CultureHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-20 lg:pb-32">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-orange-50 rounded-full opacity-70" style={{ transform: "translate(28%, -28%)" }} />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-amber-50 rounded-full opacity-50" style={{ transform: "translate(-25%, 25%)" }} />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-orange-200 opacity-30"
            style={{
              width: [5, 8, 3, 6, 4, 7][i], height: [5, 8, 3, 6, 4, 7][i],
              top: ["15%","72%","42%","85%","28%","58%"][i],
              left: ["9%","6%","88%","76%","93%","48%"][i],
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10"
          style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <span>/</span>
          <a href="/about" className="hover:text-orange-500 transition-colors">About Us</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">Culture & Values</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Life at Junixo</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-gray-900 leading-[1.07] tracking-tight mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}>
              A Culture Built on{" "}
              <span className="text-orange-500 relative inline-block">
                People First
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 220 6" preserveAspectRatio="none">
                  <path d="M0,3 Q55,0 110,3 Q165,6 220,3" stroke="#fb923c" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}>
              We believe the best work comes from people who are genuinely happy, challenged, and growing. At Junixo, culture isn't a slide in a pitch deck — it's the reason our team shows up every day ready to do their best work.
            </p>

            {/* Culture stat pills */}
            <div className="flex flex-wrap gap-3 mb-9"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.38s" }}>
              {[
                { emoji: "🌍", label: "8 countries represented" },
                { emoji: "⭐", label: "4.9 Glassdoor rating" },
                { emoji: "📈", label: "100% internal promotions" },
              ].map((p) => (
                <div key={p.label} className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2">
                  <span className="text-base">{p.emoji}</span>
                  <span className="text-gray-700 text-sm font-semibold">{p.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.46s" }}>
              <a href="/careers"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                View Open Roles <ArrowRight />
              </a>
              <a href="/about/team"
                className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5">
                Meet the Team
              </a>
            </div>
          </div>

          {/* Right — photo mosaic */}
          <div className="relative hidden lg:block"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(36px)", transition: "all 0.75s ease 0.3s" }}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                  <img src="https://placehold.co/320x240/fff7ed/f97316?text=Team+Meeting" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="https://placehold.co/320x320/f0fdf4/22c55e?text=Team+Culture" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="https://placehold.co/320x320/eff6ff/3b82f6?text=Team+Event" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                  <img src="https://placehold.co/320x240/fdf4ff/a855f7?text=Office+Life" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
            {/* Floating emoji card */}
            <div className="absolute -bottom-4 -left-5 bg-white rounded-2xl shadow-xl px-5 py-3.5 border border-gray-100 flex items-center gap-3 z-10">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="text-gray-900 font-black text-sm leading-tight">Best Place to Work</p>
                <p className="text-gray-400 text-xs">Glassdoor 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. CORE VALUES — Large icon cards in offset grid
══════════════════════════════════════════════════════════════ */
const coreValues = [
  {
    emoji: "🎯",
    icon: <ZapIcon size={26} />,
    color: "bg-orange-100 text-orange-500",
    ring: "group-hover:ring-orange-200",
    title: "Results Over Activity",
    headline: "We don't celebrate being busy.",
    desc: "Output matters more than hours at a desk. We measure contribution by impact — did it move the needle for a client? Did it make the team better? That's the bar.",
    tags: ["No micromanagement", "Impact-driven", "Outcome focused"],
  },
  {
    emoji: "🔬",
    icon: <BookOpenIcon size={26} />,
    color: "bg-blue-100 text-blue-500",
    ring: "group-hover:ring-blue-200",
    title: "Always Be Learning",
    headline: "Curiosity is a job requirement.",
    desc: "Every team member gets a dedicated learning budget and one afternoon per week for skill development. We've built a culture where asking questions is celebrated, not penalised.",
    tags: ["$1,200 learning budget", "Weekly growth time", "Internal workshops"],
  },
  {
    emoji: "🤝",
    icon: <UsersIcon size={26} />,
    color: "bg-emerald-100 text-emerald-500",
    ring: "group-hover:ring-emerald-200",
    title: "Radical Collaboration",
    headline: "The best ideas come from everyone.",
    desc: "Hierarchy exists for clarity, not gatekeeping. A junior designer can challenge a senior strategist's thinking — and often should. The best idea in the room wins, regardless of who had it.",
    tags: ["Flat thinking", "Open Slack culture", "Cross-team projects"],
  },
  {
    emoji: "💬",
    icon: <HeartIcon size={26} />,
    color: "bg-pink-100 text-pink-500",
    ring: "group-hover:ring-pink-200",
    title: "Honest Kindness",
    headline: "Direct feedback, genuine care.",
    desc: "We give feedback early, clearly, and with empathy. No passive-aggressiveness, no gossip loops. If something isn't working, we say it — and we say it because we genuinely want each other to grow.",
    tags: ["Weekly 1:1s", "360° feedback", "Psychological safety"],
  },
  {
    emoji: "🌍",
    icon: <GlobeIcon size={26} />,
    color: "bg-purple-100 text-purple-500",
    ring: "group-hover:ring-purple-200",
    title: "Diversity by Design",
    headline: "Different perspectives make better work.",
    desc: "Our team spans 8 countries, 6 languages, and dozens of lived experiences. We actively recruit for diversity because we believe it makes our strategies sharper and our culture richer.",
    tags: ["8 nationalities", "Remote-first", "Inclusive by default"],
  },
  {
    emoji: "⚡",
    icon: <TrendingUpIcon size={26} />,
    color: "bg-amber-100 text-amber-500",
    ring: "group-hover:ring-amber-200",
    title: "Move With Urgency",
    headline: "Fast iteration beats slow perfection.",
    desc: "We ship, learn, and improve. We'd rather launch something good today and refine it than spend a month polishing something no one has seen yet. Speed is a competitive advantage we protect.",
    tags: ["Weekly sprints", "Ship early", "Iterative mindset"],
  },
];

function ValuesSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Core Values</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Six Beliefs That Shape{" "}
            <span className="text-orange-500">Everything We Do</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            These aren't aspirational posters on the wall. They're the criteria we hire by, promote by, and hold each other accountable to.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((v, i) => (
            <FadeIn key={v.title} delay={i * 70}>
              <div className={`group bg-white rounded-3xl border border-gray-100 hover:border-orange-100 p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ring-0 hover:ring-4 ${v.ring} h-full flex flex-col`}>
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    {v.icon}
                  </div>
                  <span className="text-3xl">{v.emoji}</span>
                </div>
                <h3 className="text-gray-900 font-black text-lg mb-1">{v.title}</h3>
                <p className="text-orange-500 font-semibold text-sm mb-3 italic">"{v.headline}"</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{v.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {v.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {tag}
                    </span>
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
   3. A DAY IN THE LIFE — Horizontal scrollable timeline
══════════════════════════════════════════════════════════════ */
const dayInLife = [
  { time: "9:00 AM", emoji: "☕", title: "Async Stand-up", desc: "Quick Slack update — what you're working on, any blockers. No mandatory morning calls unless needed.", color: "bg-amber-50 border-amber-100" },
  { time: "10:00 AM", emoji: "🎯", title: "Deep Work Block", desc: "Two uninterrupted hours. No meetings, no Slack pings during this block. We protect focused time aggressively.", color: "bg-orange-50 border-orange-100" },
  { time: "12:00 PM", emoji: "🍱", title: "Lunch & Recharge", desc: "An actual lunch break. Close the laptop. Eat. Walk. We mean it — this isn't optional recovery time.", color: "bg-emerald-50 border-emerald-100" },
  { time: "2:00 PM", emoji: "🤝", title: "Collaboration Window", desc: "Team calls, client syncs, and brainstorms happen here. Afternoon meetings, never early morning ambushes.", color: "bg-blue-50 border-blue-100" },
  { time: "4:00 PM", emoji: "📚", title: "Learning Hour (Fri)", desc: "Every Friday afternoon is protected for learning — courses, articles, experimenting. No client work scheduled.", color: "bg-purple-50 border-purple-100" },
  { time: "5:30 PM", emoji: "🌅", title: "Hard Stop", desc: "We don't glorify late nights. When the work is good, we end on time. Sustainable pace is a strategic choice.", color: "bg-pink-50 border-pink-100" },
];

function DayInLifeSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">How We Work</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            A Day in the Life at{" "}
            <span className="text-orange-500">Junixo</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">
            We design our days intentionally so deep work, collaboration, and rest all have their place.
          </p>
        </FadeIn>

        {/* Desktop: horizontal timeline */}
        <FadeIn>
          <div className="hidden lg:block relative">
            {/* Connector */}
            <div className="absolute top-[52px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-orange-100 via-orange-300 to-orange-100" />
            <div className="grid grid-cols-6 gap-3">
              {dayInLife.map((item, i) => (
                <div key={item.time} className="relative flex flex-col items-center text-center group">
                  {/* Dot */}
                  <div className="relative z-10 w-[52px] h-[52px] rounded-full bg-white border-2 border-orange-200 group-hover:border-orange-500 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-md shadow-orange-100 text-xl">
                    {item.emoji}
                  </div>
                  <div className={`${item.color} border rounded-2xl p-4 w-full transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1`}>
                    <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-1">{item.time}</p>
                    <h3 className="text-gray-900 font-bold text-xs mb-1.5 leading-tight">{item.title}</h3>
                    <p className="text-gray-500 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Mobile: vertical stacked */}
        <div className="lg:hidden space-y-4">
          {dayInLife.map((item, i) => (
            <FadeIn key={item.time} delay={i * 60}>
              <div className={`${item.color} border rounded-2xl p-5 flex items-start gap-4`}>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm flex-shrink-0 border border-gray-100">
                  {item.emoji}
                </div>
                <div>
                  <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-0.5">{item.time}</p>
                  <h3 className="text-gray-900 font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
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
   4. PERKS & BENEFITS — Asymmetric feature layout
══════════════════════════════════════════════════════════════ */
const perks = [
  {
    icon: <BookOpenIcon size={26} />,
    color: "bg-blue-100 text-blue-500",
    title: "$1,200 Annual Learning Budget",
    desc: "Courses, books, conferences, workshops — spend it on anything that makes you better. No pre-approval for purchases under $200.",
    tag: "Growth",
  },
  {
    icon: <SunIcon size={26} />,
    color: "bg-amber-100 text-amber-500",
    title: "Flexible Working Hours",
    desc: "Core hours are 10am–3pm in your timezone. Outside of that, work when you're at your best. Results matter more than clocking in.",
    tag: "Flexibility",
  },
  {
    icon: <GlobeIcon size={26} />,
    color: "bg-emerald-100 text-emerald-500",
    title: "Remote-First, Always",
    desc: "Work from your home, a café, or a co-working space anywhere in the world. We've been remote-first since 2018.",
    tag: "Remote",
  },
  {
    icon: <HeartIcon size={26} />,
    color: "bg-pink-100 text-pink-500",
    title: "Mental Wellness Support",
    desc: "Access to Headspace for Teams, monthly wellness allowance, and a team culture that genuinely respects boundaries.",
    tag: "Wellbeing",
  },
  {
    icon: <CoffeeIcon size={26} />,
    color: "bg-orange-100 text-orange-500",
    title: "Team Retreats Twice a Year",
    desc: "We fly the whole team to one location twice a year for work, fun, and getting to know the faces behind the Slack handles.",
    tag: "Culture",
  },
  {
    icon: <TrendingUpIcon size={26} />,
    color: "bg-purple-100 text-purple-500",
    title: "Clear Promotion Path",
    desc: "Every role has a documented levelling framework. You know exactly what you need to do to get to the next level — no politics.",
    tag: "Career",
  },
  {
    icon: <AwardIcon size={26} />,
    color: "bg-cyan-100 text-cyan-500",
    title: "Performance Bonuses",
    desc: "When the business wins, the team wins. Quarterly performance bonuses are shared team-wide — not just with leadership.",
    tag: "Compensation",
  },
  {
    icon: <MusicIcon size={26} />,
    color: "bg-rose-100 text-rose-500",
    title: "Passion Project Fridays",
    desc: "One Friday afternoon per month is yours — no client work. Explore a side project, learn something weird, or just rest.",
    tag: "Freedom",
  },
];

function PerksSection() {
  return (
    <section className="py-20 lg:py-28 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: sticky heading */}
          <FadeIn direction="left" className="lg:sticky lg:top-24">
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-4">Perks & Benefits</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              We Invest in the{" "}
              <span className="text-orange-500">Whole Person</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Perks aren't a recruitment trick here. We genuinely believe that when people feel supported, they do their best work — for themselves and for clients.
            </p>
            <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
              <img
                src="https://placehold.co/480x300/fff7ed/f97316?text=Team+Perks"
                alt="Team perks"
                className="rounded-xl w-full object-cover mb-5"
              />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "94%", label: "Team satisfaction score" },
                  { val: "4.9★", label: "Glassdoor rating" },
                  { val: "0%", label: "Involuntary turnover" },
                  { val: "100%", label: "Internal promotions" },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-orange-50 rounded-xl p-3 border border-orange-100">
                    <p className="text-orange-500 font-black text-xl leading-none">{s.val}</p>
                    <p className="text-gray-500 text-[11px] mt-1 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: perk cards */}
          <FadeIn direction="right">
            <div className="grid sm:grid-cols-2 gap-4">
              {perks.map((p, i) => (
                <FadeIn key={p.title} delay={i * 55}>
                  <div className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                        {p.icon}
                      </div>
                      <span className="text-[9px] font-black text-orange-500 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full uppercase tracking-widest">
                        {p.tag}
                      </span>
                    </div>
                    <h3 className="text-gray-900 font-bold text-sm mb-1.5 leading-tight">{p.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
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
   5. VOICES OF THE TEAM — Quote cards from real people
══════════════════════════════════════════════════════════════ */
const voices = [
  {
    quote: "I've never worked anywhere that cares this much about you growing as a person — not just as an employee. The learning budget alone changed my career trajectory.",
    name: "Sarah Mitchell", role: "Lead Developer", img: "https://placehold.co/56x56/fff7ed/f97316?text=SM",
    years: "3 years at Junixo", dept: "Development",
  },
  {
    quote: "The Friday learning time is sacred. I've used it to get three certifications and launch a side project. No other agency I know would do that.",
    name: "James Okafor", role: "Head of SEO", img: "https://placehold.co/56x56/eff6ff/3b82f6?text=JO",
    years: "4 years at Junixo", dept: "SEO",
  },
  {
    quote: "What surprised me most was how much your opinion matters here, even as a junior. I pitched an idea in my second week and it was live in the next sprint.",
    name: "Maya Patel", role: "Paid Media Strategist", img: "https://placehold.co/56x56/fdf2f8/ec4899?text=MP",
    years: "2 years at Junixo", dept: "Marketing",
  },
  {
    quote: "Remote-first sounds easy until you actually try to build a real team culture. Junixo genuinely nailed it. I feel more connected to these people than colleagues I used to share an office with.",
    name: "Lena Brooks", role: "App Dev Lead", img: "https://placehold.co/56x56/fefce8/eab308?text=LB",
    years: "2.5 years at Junixo", dept: "Development",
  },
  {
    quote: "The retreats are genuinely fun. We actually get to know each other. And the work we produce after a retreat is always better — you can feel the energy.",
    name: "Daniel Chen", role: "Design Lead", img: "https://placehold.co/56x56/fdf4ff/a855f7?text=DC",
    years: "3 years at Junixo", dept: "Design",
  },
  {
    quote: "I was promoted twice in 18 months. The levelling framework is real — you know exactly what the bar is and leadership actively helps you get there.",
    name: "Tom Harrison", role: "Content Strategist", img: "https://placehold.co/56x56/f0f9ff/0ea5e9?text=TH",
    years: "2 years at Junixo", dept: "Strategy",
  },
];

const deptColors: Record<string, string> = {
  Development: "bg-emerald-100 text-emerald-600",
  SEO: "bg-blue-100 text-blue-600",
  Marketing: "bg-pink-100 text-pink-600",
  Design: "bg-purple-100 text-purple-600",
  Strategy: "bg-cyan-100 text-cyan-600",
};

function VoicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Team Stories</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Hear It From the{" "}
            <span className="text-orange-500">People Here</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base">
            Not employer branding copy — real words from real people on our team.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {voices.map((v, i) => (
            <FadeIn key={v.name} delay={i * 70}>
              <div className="bg-white border border-gray-100 hover:border-orange-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                </div>
                {/* Quote */}
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">
                  "{v.quote}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img src={v.img} alt={v.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 font-bold text-sm leading-tight">{v.name}</p>
                    <p className="text-gray-400 text-xs truncate">{v.role}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${deptColors[v.dept] || "bg-gray-100 text-gray-500"}`}>
                      {v.dept}
                    </span>
                    <p className="text-gray-300 text-[10px] mt-0.5">{v.years}</p>
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
   6. CULTURE BY NUMBERS — Animated stat band
══════════════════════════════════════════════════════════════ */
const cultureStats = [
  { value: 8,  suffix: "",  label: "Countries on our team",  sub: "And growing",          icon: <GlobeIcon size={28} />,      color: "text-emerald-500 bg-emerald-50" },
  { value: 94, suffix: "%", label: "Team Satisfaction Score", sub: "Annual survey",        icon: <HeartIcon size={28} />,      color: "text-pink-500 bg-pink-50" },
  { value: 100, suffix: "%", label: "Internal Promotions",   sub: "Leadership from within", icon: <TrendingUpIcon size={28} />, color: "text-orange-500 bg-orange-50" },
  { value: 4,  suffix: ".9★", label: "Glassdoor Rating",    sub: "Out of 5.0",             icon: <StarIcon />,                 color: "text-amber-500 bg-amber-50" },
  { value: 2,  suffix: "x",  label: "Team Retreats / Year", sub: "Fully company-funded",   icon: <CoffeeIcon size={28} />,     color: "text-purple-500 bg-purple-50" },
  { value: 1200, suffix: "+", label: "Learning Budget / Year", sub: "Per team member",    icon: <BookOpenIcon size={28} />,   color: "text-blue-500 bg-blue-50" },
];

function CultureNumbers() {
  const { ref, inView } = useInView(0.2);
  return (
    <section className="py-16 lg:py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Culture by Numbers</span>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900">Measurable, Not Just Felt</h2>
        </FadeIn>
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cultureStats.map((s, i) => {
            const count = useCountUp(s.value, 1800, inView);
            return (
              <div key={s.label} className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110`}>
                  {s.icon}
                </div>
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
   7. RETREAT GALLERY — Full-width image strip
══════════════════════════════════════════════════════════════ */
function RetreatSection() {
  const locations = [
    { place: "Lisbon, 2024", img: "https://placehold.co/400x300/fff7ed/f97316?text=Lisbon+Retreat" },
    { place: "Bali, 2023",   img: "https://placehold.co/400x300/f0fdf4/22c55e?text=Bali+Retreat" },
    { place: "Barcelona, 2023", img: "https://placehold.co/400x300/eff6ff/3b82f6?text=Barcelona+Retreat" },
    { place: "Dubai, 2022",  img: "https://placehold.co/400x300/fdf4ff/a855f7?text=Dubai+Retreat" },
    { place: "London, 2022", img: "https://placehold.co/400x300/fdf2f8/ec4899?text=London+Retreat" },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Team Retreats</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              We Work Remotely.{" "}
              <span className="text-orange-500">We Meet in Person.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed flex-shrink-0">
            Twice a year we fly the whole team to one place for three days of work, exploration, and actual human connection.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {locations.map((loc, i) => (
              <div key={loc.place}
                className={`relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${i === 0 ? "sm:col-span-2 sm:row-span-1" : ""}`}>
                <div className={`${i === 0 ? "aspect-[16/9] sm:aspect-[16/9]" : "aspect-[4/3]"} w-full`}>
                  <img src={loc.img} alt={loc.place} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MapPinIcon size={11} />{loc.place}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={100} className="mt-6 bg-orange-50 rounded-2xl border border-orange-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl">✈️</span>
            <div>
              <p className="text-gray-900 font-bold text-base">Next Retreat: Marrakech, 2025</p>
              <p className="text-gray-500 text-sm">All travel, accommodation, and activities — fully company-funded.</p>
            </div>
          </div>
          <a href="/careers"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-orange-200 text-sm hover:-translate-y-0.5">
            Join Before Then <ArrowRight size={14} />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   8. DIVERSITY & INCLUSION
══════════════════════════════════════════════════════════════ */
const deiPillars = [
  { emoji: "🌍", title: "Global Hiring", desc: "We hire the best people, period. No geography, no preference for any background over another. Our team spans 6 languages and 8 nationalities." },
  { emoji: "⚖️", title: "Pay Equity", desc: "Every role has a transparent salary band. Pay decisions are based on experience and contribution — never negotiation skills or demographic factors." },
  { emoji: "♿", title: "Accessibility First", desc: "Remote work means we can accommodate diverse needs by default. We actively ask what accommodation people need, not whether they need one." },
  { emoji: "📣", title: "Everyone Has a Voice", desc: "Anonymous quarterly pulse surveys, open town halls, and a direct CEO feedback channel. Every voice has a route to be heard — and acted on." },
];

function DiversitySection() {
  return (
    <section className="py-20 lg:py-24 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-4">Diversity & Inclusion</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
              Different Backgrounds,{" "}
              <span className="text-orange-500">Better Outcomes</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              We don't have a D&I initiative — we have a hiring philosophy. Our team is diverse because we genuinely believe diverse perspectives produce better strategies, sharper creative, and more empathetic client work.
            </p>
            <div className="space-y-4">
              {deiPillars.map((p) => (
                <div key={p.title} className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-orange-100 hover:border-orange-200 hover:shadow-sm transition-all duration-200">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{p.emoji}</span>
                  <div>
                    <h3 className="text-gray-900 font-bold text-sm mb-1">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={100}>
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-3xl transform rotate-2 shadow-sm" />
              <img
                src="https://placehold.co/560x480/fff7ed/f97316?text=Diverse+Team"
                alt="Diverse team"
                className="relative rounded-3xl w-full object-cover shadow-xl"
              />
              {/* Stats overlay */}
              <div className="absolute -bottom-5 -right-4 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Our Team</p>
                <div className="space-y-1.5">
                  {[
                    { label: "8 Countries", bar: "w-full" },
                    { label: "6 Languages", bar: "w-5/6" },
                    { label: "52% Women+", bar: "w-4/5" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-gray-700 text-xs font-semibold">{s.label}</span>
                      </div>
                      <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-orange-400 rounded-full ${s.bar}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   9. HOW WE HIRE — Simple honest process
══════════════════════════════════════════════════════════════ */
const hiringSteps = [
  { num: "01", title: "Apply in 5 Minutes", desc: "No cover letter essays. Tell us who you are, link to your best work, and answer two short questions. That's it." },
  { num: "02", title: "Intro Call (30 min)", desc: "A casual conversation with your future team lead. We're getting a feel for your thinking, not testing you on trivia." },
  { num: "03", title: "Paid Skills Task", desc: "A short, paid task relevant to the role. We pay for your time — always. No free spec work, ever." },
  { num: "04", title: "Team Meet (60 min)", desc: "Meet the people you'd actually work with. Ask them anything. This is as much about you choosing us as us choosing you." },
  { num: "05", title: "Offer & Onboarding", desc: "Clear offer, no games. Once you accept, your onboarding buddy reaches out the same day to get you set up and excited." },
];

function HowWeHireSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">Our Hiring Process</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Honest, Fast,{" "}
            <span className="text-orange-500">Respectful</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto">
            We hate slow, opaque hiring processes. Ours is 5 steps, takes 2–3 weeks total, and you'll know where you stand at every point.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-orange-100 -translate-x-0.5 hidden sm:block" />

          <div className="space-y-6">
            {hiringSteps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 80}>
                <div className={`relative flex items-start gap-5 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`sm:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:ml-auto"}`}>
                    <div className={`bg-orange-50 border border-orange-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-200 transition-all duration-300 hover:-translate-y-0.5 ${i % 2 === 0 ? "" : ""}`}>
                      <span className="text-orange-400 text-[10px] font-black tracking-widest uppercase">{step.num}</span>
                      <h3 className="text-gray-900 font-bold text-base mb-1.5">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-5 z-10 w-10 h-10 bg-white border-2 border-orange-300 rounded-full items-center justify-center shadow-sm">
                    <span className="text-orange-500 font-black text-xs">{step.num}</span>
                  </div>

                  {/* Mobile dot */}
                  <div className="sm:hidden flex-shrink-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-xs shadow-md shadow-orange-200">
                    {step.num}
                  </div>
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
   10. FINAL CTA
══════════════════════════════════════════════════════════════ */
function CultureCTA() {
  return (
    <section className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-white rounded-3xl border border-orange-100 overflow-hidden shadow-sm">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative hidden lg:block min-h-[360px]">
                <img
                  src="https://placehold.co/640x420/fff7ed/f97316?text=Join+Our+Team"
                  alt="Join the team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                {/* Floating badges */}
                <div className="absolute top-8 left-8 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Currently Hiring</p>
                  <p className="text-gray-900 font-black text-sm">5 Open Roles</p>
                </div>
                <div className="absolute bottom-8 right-6 bg-orange-500 text-white rounded-2xl px-4 py-3 shadow-lg shadow-orange-200">
                  <p className="font-black text-lg leading-none">4.9 ⭐</p>
                  <p className="text-orange-200 text-xs font-bold">Glassdoor</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-5 self-start border border-orange-200">
                  We're Hiring
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-5">
                  Sound Like a Place{" "}
                  <span className="text-orange-500">You'd Thrive?</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                  We're always looking for sharp, driven, curious people who want to do the best work of their career — and have a great time doing it.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <a href="/careers"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                    See Open Roles <ArrowRight />
                  </a>
                  <a href="/about/team"
                    className="inline-flex items-center gap-2 border-2 border-orange-200 hover:border-orange-400 text-orange-500 bg-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:shadow-md">
                    Meet the Team
                  </a>
                </div>

                <div className="flex flex-wrap gap-4">
                  {["Remote-first", "Learning budget", "No politics", "Real ownership"].map((pill) => (
                    <span key={pill} className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                      <span className="text-orange-500"><CheckCircle size={13} /></span>
                      {pill}
                    </span>
                  ))}
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
export default function CulturePageClient() {
  return (
    <main>
      <CultureHero />
      <ValuesSection />
      <DayInLifeSection />
      <PerksSection />
      <VoicesSection />
      <CultureNumbers />
      <RetreatSection />
      <DiversitySection />
      <HowWeHireSection />
      <CultureCTA />
    </main>
  );
}