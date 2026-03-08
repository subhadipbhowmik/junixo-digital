"use client";
import { useState, useEffect } from "react";
import { teamMembers, type TeamMember } from "@/data/team";
import { notFound } from "next/navigation";

/* ─── ICONS ─── */
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const ArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── SOCIAL LINK HELPERS ─── */
const socialConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  linkedin: { icon: <LinkedInIcon />, label: "LinkedIn", color: "bg-blue-600 hover:bg-blue-700" },
  twitter:  { icon: <TwitterIcon />,  label: "Twitter / X", color: "bg-gray-900 hover:bg-black" },
  instagram:{ icon: <InstagramIcon />,label: "Instagram", color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90" },
  github:   { icon: <GitHubIcon />,   label: "GitHub", color: "bg-gray-800 hover:bg-gray-900" },
  website:  { icon: <GlobeIcon />,    label: "Website", color: "bg-orange-500 hover:bg-orange-600" },
};

const deptColors: Record<string, string> = {
  Leadership: "bg-orange-100 text-orange-600 border-orange-200",
  Marketing: "bg-pink-100 text-pink-600 border-pink-200",
  SEO: "bg-blue-100 text-blue-600 border-blue-200",
  Development: "bg-emerald-100 text-emerald-600 border-emerald-200",
  Design: "bg-purple-100 text-purple-600 border-purple-200",
  Strategy: "bg-cyan-100 text-cyan-600 border-cyan-200",
};

/* ─── PAGE COMPONENT ─── */
export default function TeamMemberPage({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const member = teamMembers.find((m) => m.id === params.id);
  if (!member) return notFound();

  const otherMembers = teamMembers.filter((m) => m.id !== member.id).slice(0, 4);

  return (
    <main style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease" }}>

      {/* ─── HERO / COVER ─── */}
      <section className="relative">
        {/* Cover image */}
        <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
          <img src={member.coverImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        </div>

        {/* Breadcrumb overlay */}
        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span>/</span>
              <a href="/about" className="hover:text-white transition-colors">About</a>
              <span>/</span>
              <a href="/about/team" className="hover:text-white transition-colors">Team</a>
              <span>/</span>
              <span className="text-white font-medium">{member.name}</span>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="absolute top-6 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a href="/about/team"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 border border-white/20">
              <ArrowLeft /> Back to Team
            </a>
          </div>
        </div>

        {/* Profile card — overlapping cover */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 sm:-mt-24">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img src={member.img} alt={member.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl object-cover border-4 border-white shadow-xl" />
                    <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold px-2.5 py-1 rounded-full border ${deptColors[member.department]}`}>
                      {member.department}
                    </span>
                  </div>

                  {/* Name + meta */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">{member.name}</h1>
                    <p className="text-orange-500 font-bold text-lg mt-1">{member.role}</p>

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-gray-500 text-sm"><MapPinIcon />{member.location}</span>
                      <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <span className="w-4 h-4 bg-orange-100 text-orange-500 rounded flex items-center justify-center text-[10px] font-black">{member.yearsExp}</span>
                        years experience
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">{member.bio}</p>

                    {/* Social links */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {Object.entries(member.socials).map(([key, href]) => href && (
                        <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 text-white text-xs font-bold px-3.5 py-2 rounded-full transition-all duration-200 ${socialConfig[key]?.color || "bg-gray-700"}`}>
                          {socialConfig[key]?.icon}
                          <span className="hidden sm:inline">{socialConfig[key]?.label}</span>
                        </a>
                      ))}
                      <a href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-xs font-bold px-3.5 py-2 rounded-full transition-all duration-200">
                        <MailIcon />
                        <span className="hidden sm:inline">Send Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ─── */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-3xl border border-gray-100 p-7 shadow-sm">
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2.5">
                  <span className="w-1 h-5 bg-orange-500 rounded-full inline-block" />
                  About {member.name.split(" ")[0]}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">{member.longBio}</p>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2.5">
                  <span className="w-1 h-5 bg-orange-500 rounded-full inline-block" />
                  Key Achievements
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {member.achievements.map((a, i) => (
                    <div
                      key={a.label}
                      className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <p className="text-3xl font-black text-orange-500 leading-none">{a.value}</p>
                      <p className="text-gray-500 text-xs mt-1.5 font-medium leading-tight">{a.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-3xl border border-gray-100 p-7 shadow-sm">
                <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2.5">
                  <span className="w-1 h-5 bg-orange-500 rounded-full inline-block" />
                  Core Skills & Expertise
                </h2>
                <div className="space-y-3">
                  {member.skills.map((skill, i) => (
                    <div key={skill} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckIcon />
                      </span>
                      <span className="text-gray-700 font-medium text-sm">{skill}</span>
                      {/* Visual bar */}
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden ml-2">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-1000"
                          style={{ width: `${88 - i * 6}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-100 p-7">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-amber-700 font-bold text-xs uppercase tracking-widest mb-2">Fun Fact</h3>
                    <p className="text-gray-700 text-base leading-relaxed">{member.funFact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6">
              {/* Quick info */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-5">Quick Info</h3>
                <div className="space-y-4">
                  {[
                    { label: "Department", value: member.department },
                    { label: "Location", value: member.location },
                    { label: "Experience", value: `${member.yearsExp}+ years` },
                    { label: "Email", value: member.email, href: `mailto:${member.email}` },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors break-all">{item.value}</a>
                      ) : (
                        <span className="text-gray-800 font-semibold text-sm">{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connect */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Connect</h3>
                <div className="space-y-2">
                  {Object.entries(member.socials).map(([key, href]) => href && (
                    <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200 group">
                      <span className={`w-8 h-8 rounded-lg text-white flex items-center justify-center flex-shrink-0 text-sm ${socialConfig[key]?.color || "bg-gray-700"}`}>
                        {socialConfig[key]?.icon}
                      </span>
                      <span className="text-gray-700 font-semibold text-sm group-hover:text-orange-500 transition-colors">{socialConfig[key]?.label}</span>
                      <span className="ml-auto text-gray-300 group-hover:text-orange-400 transition-colors">
                        <ArrowRight size={13} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-orange-500 rounded-3xl p-6 text-center">
                <p className="text-white font-black text-base mb-1">Work With {member.name.split(" ")[0]}</p>
                <p className="text-orange-100 text-xs leading-relaxed mb-4">Get in touch to discuss how we can grow your business together.</p>
                <a href="/get-a-quote"
                  className="inline-flex items-center gap-2 bg-white text-orange-500 hover:bg-orange-50 font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 w-full justify-center shadow-sm">
                  Get a Free Quote <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OTHER TEAM MEMBERS ─── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-block text-orange-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full mb-2">The Rest of Us</span>
              <h2 className="text-2xl font-black text-gray-900">Meet More of the Team</h2>
            </div>
            <a href="/about/team"
              className="hidden sm:inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm hover:gap-2.5 transition-all">
              View All <ArrowRight size={13} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherMembers.map((m) => (
              <a key={m.id} href={`/about/team/${m.id}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="overflow-hidden aspect-square">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-gray-900 font-bold text-sm leading-tight">{m.name}</p>
                  <p className="text-orange-500 text-xs font-medium mt-0.5">{m.role}</p>
                  <span className={`inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${deptColors[m.department]}`}>{m.department}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}