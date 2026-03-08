"use client";
import { useState, useEffect, useRef } from "react";
import { teamMembers, departments, type TeamMember } from "@/data/team";

/* ─── INTERSECTION OBSERVER HOOK ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── ICONS ─── */
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ─── SOCIAL LINK COMPONENT ─── */
const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <LinkedInIcon />,
  twitter: <TwitterIcon />,
  instagram: <InstagramIcon />,
  github: <GitHubIcon />,
  website: <GlobeIcon />,
};
/* variant:
   "card-idle"  → on card normally (white bg, gray icon, brand color on hover)
   "card-hover" → on card while hovered (solid brand color, white icon — readable on dark overlay)
   "modal"      → inside popup (tinted bg, colored icon, brand color on hover)
*/

function SocialLinks({ socials, variant = "card-idle" }: { socials: TeamMember["socials"]; variant?: "card-idle" | "card-hover" | "modal" }) {
  const dim = variant === "modal" ? "w-9 h-9" : "w-8 h-8";

  const getClass = (key: string) => {
    const base = `${dim} rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110`;

    if (variant === "card-hover") {
      const solid: Record<string, string> = {
        linkedin: "bg-blue-600 border-blue-600",
        twitter: "bg-gray-900 border-gray-900",
        instagram: "bg-pink-500 border-pink-500",
        github: "bg-gray-800 border-gray-800",
        website: "bg-orange-500 border-orange-500",
      };
      return `${base} border text-white ${solid[key] || "bg-orange-500 border-orange-500"}`;
    }

    if (variant === "modal") {
      const styles: Record<string, string> = {
        linkedin:  "text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:shadow-md",
        twitter:   "text-gray-800 bg-gray-100 border border-gray-200 hover:bg-gray-900 hover:border-gray-900 hover:text-white hover:shadow-md",
        instagram: "text-pink-500 bg-pink-50 border border-pink-100 hover:bg-pink-500 hover:border-pink-500 hover:text-white hover:shadow-md",
        github:    "text-gray-700 bg-gray-100 border border-gray-200 hover:bg-gray-800 hover:border-gray-800 hover:text-white hover:shadow-md",
        website:   "text-orange-500 bg-orange-50 border border-orange-100 hover:bg-orange-500 hover:border-orange-500 hover:text-white hover:shadow-md",
      };
      return `${base} ${styles[key] || "text-orange-500 bg-orange-50 border border-orange-100 hover:bg-orange-500 hover:text-white"}`;
    }

    // card-idle: white bg, visible gray icon, brand color on hover
    const hoverStyles: Record<string, string> = {
      linkedin:  "hover:bg-blue-600 hover:border-blue-600 hover:text-white",
      twitter:   "hover:bg-gray-900 hover:border-gray-900 hover:text-white",
      instagram: "hover:bg-pink-500 hover:border-pink-500 hover:text-white",
      github:    "hover:bg-gray-800 hover:border-gray-800 hover:text-white",
      website:   "hover:bg-orange-500 hover:border-orange-500 hover:text-white",
    };
    return `${base} border border-gray-200 bg-white text-gray-500 ${hoverStyles[key] || "hover:bg-orange-500 hover:text-white"}`;
  };

  return (
    <div className="flex items-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
      {Object.entries(socials).map(([key, href]) => href ? (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={getClass(key)}>
          {socialIcons[key]}
        </a>
      ) : null)}
    </div>
  );
}

/* ─── DEPARTMENT BADGE ─── */
const deptColors: Record<string, string> = {
  Leadership: "bg-orange-100 text-orange-600",
  Marketing: "bg-pink-100 text-pink-600",
  SEO: "bg-blue-100 text-blue-600",
  Development: "bg-emerald-100 text-emerald-600",
  Design: "bg-purple-100 text-purple-600",
  Strategy: "bg-cyan-100 text-cyan-600",
};

/* ─── MEMBER DETAIL MODAL ─── */
function MemberModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
  className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
  style={{
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
  }}
>
        {/* Cover / header — name lives here so it's always visible */}
        <div className="relative h-40 rounded-t-3xl overflow-hidden flex-shrink-0">
          <img src={member.coverImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

          {/* Close button — top right, always on top */}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 z-10 w-9 h-9 bg-white/95 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-lg border border-gray-200"
          >
            <CloseIcon />
          </button>

          {/* Name + role printed on the cover so it's always legible */}
          <div className="absolute bottom-0 left-0 right-0 px-7 pb-5 flex items-end gap-4">
            <img
              src={member.img}
              alt={member.name}
              className="w-16 h-16 rounded-xl object-cover border-3 border-white shadow-xl flex-shrink-0"
              style={{ border: "3px solid white" }}
            />
            <div className="min-w-0 pb-0.5">
              <h2 className="text-white font-black text-2xl leading-tight drop-shadow-sm">{member.name}</h2>
              <p className="text-orange-300 font-semibold text-sm leading-tight">{member.role}</p>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="px-7 pt-5 pb-7">
          {/* Dept badge + meta row */}
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${deptColors[member.department]}`}>
              {member.department}
            </span>
            <span className="flex items-center gap-1 text-gray-400 text-xs"><MapPinIcon />{member.location}</span>
            <span className="flex items-center gap-1 text-gray-400 text-xs"><BriefcaseIcon />{member.yearsExp}+ yrs exp</span>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.longBio}</p>

          {/* Achievements */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {member.achievements.map((a) => (
              <div key={a.label} className="bg-orange-50 rounded-2xl p-3 text-center border border-orange-100">
                <p className="text-orange-500 font-black text-lg leading-none">{a.value}</p>
                <p className="text-gray-500 text-[10px] mt-1 font-medium leading-tight">{a.label}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Core Skills</p>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((s) => (
                <span key={s} className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          {/* Fun fact */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5">
            <div className="flex items-start gap-2.5">
              <span className="text-amber-400 text-base flex-shrink-0 mt-0.5">⚡</span>
              <div>
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Fun Fact</p>
                <p className="text-gray-700 text-sm leading-relaxed">{member.funFact}</p>
              </div>
            </div>
          </div>

          {/* Contact + socials */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-gray-100">
            <a href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">
              <span className="w-7 h-7 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <MailIcon />
              </span>
              {member.email}
            </a>
            <SocialLinks socials={member.socials} variant="modal" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

/* ─── TEAM MEMBER CARD ─── */
function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <FadeIn delay={index * 70}>
        <div
          className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setModalOpen(true)}
        >
          {/* Photo area */}
          <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Dept badge */}
            <span className={`absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-full ${deptColors[member.department]}`}>
              {member.department}
            </span>

            {/* Social links — slide in on hover, always solid colored */}
            <div className={`absolute bottom-4 left-4 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
              <SocialLinks socials={member.socials} variant="card-hover" />
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-gray-900 font-black text-base leading-tight">{member.name}</h3>
                <p className="text-orange-500 font-semibold text-sm mt-0.5 leading-tight">{member.role}</p>
              </div>
              <span className="flex-shrink-0 flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                <StarIcon />
                <span className="text-amber-600 text-[10px] font-bold">{member.yearsExp}y</span>
              </span>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed mt-2.5 line-clamp-2">{member.bio}</p>

            <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-gray-100">
              <span className="flex items-center gap-1 text-gray-400 text-[11px]">
                <MapPinIcon />{member.location}
              </span>
              <span className="flex items-center gap-1 text-orange-500 text-xs font-bold group-hover:gap-1.5 transition-all duration-200">
                View Profile <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </FadeIn>

      {modalOpen && <MemberModal member={member} onClose={() => setModalOpen(false)} />}
    </>
  );
}

/* ─── HERO SECTION ─── */
function TeamHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-20 lg:pb-28">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full opacity-70" style={{ transform: "translate(25%, -25%)" }} />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-orange-50 rounded-full opacity-40" style={{ transform: "translate(-25%, 30%)" }} />
        {/* Dots pattern */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-orange-300 opacity-30"
            style={{
              width: [6, 4, 8, 5, 7, 3][i],
              height: [6, 4, 8, 5, 7, 3][i],
              top: ["15%", "70%", "40%", "80%", "25%", "60%"][i],
              left: ["10%", "8%", "85%", "75%", "92%", "50%"][i],
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          style={{ opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.1s" }}
        >
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <span>/</span>
          <a href="/about" className="hover:text-orange-500 transition-colors">About Us</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">Our Team</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-5"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.15s" }}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Meet The Team</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[52px] font-black text-gray-900 leading-[1.08] tracking-tight mb-5"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.55s ease 0.2s" }}
            >
              The Minds Behind{" "}
              <span className="text-orange-500 relative">
                Junixo
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0,3 Q50,0 100,3 Q150,6 200,3" stroke="#fb923c" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>
              {" "}Digital
            </h1>

            <p
              className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s ease 0.3s" }}
            >
              We're a diverse team of strategists, creatives, engineers, and growth experts united by one mission: to make your brand win online.
            </p>

            <div
              className="flex flex-wrap gap-3"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.4s" }}
            >
              <a href="/careers"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
                Join Our Team <ArrowRight />
              </a>
              <a href="/about"
                className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold px-6 py-3 rounded-full transition-all duration-200">
                Our Story
              </a>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-0 mt-10 pt-8 border-t border-gray-100"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.55s ease 0.5s" }}
            >
              {[
                { val: "8+", label: "Team Members" },
                { val: "5+", label: "Countries" },
                { val: "50+", label: "Yrs Combined Exp" },
              ].map((s, i) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-black text-orange-500">{s.val}</p>
                  <p className="text-gray-400 text-xs font-medium">{s.label}</p>
                  {i < 2 && <div className="absolute border-r border-gray-200 h-8" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right — avatar mosaic */}
          <div
            className="relative hidden lg:block"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(32px)", transition: "all 0.7s ease 0.35s" }}
          >
            <div className="grid grid-cols-3 gap-3">
              {teamMembers.slice(0, 6).map((m, i) => (
                <div
                  key={m.id}
                  className={`rounded-2xl overflow-hidden shadow-lg border-2 border-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${i === 1 ? "mt-6" : i === 3 ? "mt-3" : i === 5 ? "mt-6" : ""}`}
                >
                  <img src={m.img} alt={m.name} className="w-full aspect-square object-cover" />
                  <div className="bg-white px-2.5 py-2">
                    <p className="text-gray-900 font-bold text-[11px] leading-tight truncate">{m.name}</p>
                    <p className="text-orange-500 text-[10px] truncate">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Decorative ring */}
            <div className="absolute -z-10 -inset-4 rounded-3xl border-2 border-dashed border-orange-200 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CULTURE STRIP ─── */
const values = [
  { emoji: "🎯", title: "Results First", desc: "Every decision is tied back to measurable impact for our clients." },
  { emoji: "🔬", title: "Data-Driven", desc: "We test, measure, and iterate — gut feeling is backed by evidence." },
  { emoji: "🤝", title: "Transparent", desc: "No smoke and mirrors - you always know exactly what we're doing." },
  { emoji: "🚀", title: "Move Fast", desc: "Speed matters. We execute with urgency while maintaining quality." },
];

function CultureSection() {
  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-100 px-4 py-1.5 rounded-full mb-3">Our Culture</span>
          <h2 className="text-3xl font-black text-gray-900">How We Work Together</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN TEAM GRID ─── */
function TeamGrid() {
  const [activeDept, setActiveDept] = useState<string>("All");
  const filtered = activeDept === "All" ? teamMembers : teamMembers.filter(m => m.department === activeDept);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full mb-3">The Full Roster</span>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Every Expert, <span className="text-orange-500">Every Skill</span>
          </h2>
          <p className="text-gray-500 mt-3 text-base">Click any card to explore their full profile, skills, and achievements.</p>
        </FadeIn>

        {/* Dept filter pills */}
        <FadeIn delay={80} className="flex flex-wrap justify-center gap-2 mb-12">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`cursor-pointer text-sm font-semibold px-5 py-2 rounded-full border transition-all duration-200 ${
                activeDept === dept
                  ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200"
                  : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500 bg-white"
              }`}
            >
              {dept}
              <span className={`ml-1.5 text-[10px] font-bold ${activeDept === dept ? "text-orange-200" : "text-gray-400"}`}>
                {dept === "All" ? teamMembers.length : teamMembers.filter(m => m.department === dept).length}
              </span>
            </button>
          ))}
        </FadeIn>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── JOIN US CTA ─── */
function JoinUsSection() {
  return (
    <section className="py-20 bg-orange-50 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-30" style={{ transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200 rounded-full opacity-20" style={{ transform: "translate(-30%, 30%)" }} />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <FadeIn>
          <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-100 border border-orange-200 px-4 py-1.5 rounded-full mb-5">
            We're Hiring
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight mb-5">
            Think You Belong Here?
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            We're always looking for sharp, driven people who care about craft and results. If that sounds like you, let's talk.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/careers"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
              View Open Roles <ArrowRight />
            </a>
            <a href="/contact"
              className="inline-flex items-center gap-2 border-2 border-orange-300 hover:border-orange-500 text-orange-500 hover:text-orange-600 font-bold px-7 py-3.5 rounded-full transition-all duration-200 bg-white hover:shadow-md">
              Say Hello
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PAGE EXPORT ─── */
export default function TeamPage() {
  return (
    <main>
      <TeamHero />
      <CultureSection />
      <TeamGrid />
      <JoinUsSection />
    </main>
  );
}