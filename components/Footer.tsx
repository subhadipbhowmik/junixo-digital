"use client";
import { useState, useEffect } from "react";

/* ─── SOCIALS ───────────────────────────────────────────────── */
const socials = [
  {
    label: "WhatsApp", href: "https://wa.me/",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L.057 23.5l5.797-1.52A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.877 9.877 0 01-5.031-1.38l-.361-.214-3.741.981.998-3.648-.235-.374A9.861 9.861 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1c5.467 0 9.9 4.434 9.9 9.9 0 5.467-4.433 9.9-9.9 9.9z"/></svg>),
  },
  {
    label: "Facebook", href: "https://facebook.com",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>),
  },
  {
    label: "X", href: "https://x.com",
    icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>),
  },
  {
    label: "YouTube", href: "https://youtube.com",
    icon: (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>),
  },
  {
    label: "LinkedIn", href: "https://linkedin.com",
    icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>),
  },
  {
    label: "Instagram", href: "https://instagram.com",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>),
  },
];

/* ─── LINK COLUMNS ──────────────────────────────────────────── */
const linkColumns = [
  {
    heading: "Our Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about/team" },
      { label: "Why Choose Us", href: "/about/why-us" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
      { label: "Locations", href: "/locations" },
      { label: "Press & Media", href: "/about/press" },
      { label: "Client Reviews", href: "/reviews" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Video Testimonials", href: "/testimonials" },
      { label: "Blog", href: "/blog" },
      { label: "SEO Guides", href: "/resources/guides" },
      { label: "Free Tools", href: "/resources/tools" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "Newsletter", href: "/resources/newsletter" },
    ],
  },
  {
    heading: "Marketing & SEO",
    links: [
      { label: "Social Media Marketing", href: "/services/social-media-marketing" },
      { label: "PPC / Google Ads", href: "/services/ppc-google-ads" },
      { label: "Content Marketing", href: "/services/content-marketing" },
      { label: "Email Marketing", href: "/services/email-marketing" },
      { label: "Influencer Marketing", href: "/services/influencer-marketing" },
      { label: "Video Marketing", href: "/services/video-marketing" },
      { label: "Affiliate Marketing", href: "/services/affiliate-marketing" },
      { label: "Reputation Management", href: "/services/reputation-management" },
    ],
  },
];

/* ─── ALL SERVICES ──────────────────────────────────────────── */
const allServices = [
  { tab: "Digital Marketing", links: ["Social Media Marketing", "Paid Marketing", "Amazon PPC", "Content Marketing", "Influencer Marketing", "Video Marketing", "Facebook Ads", "Instagram Ads", "YouTube Ads", "Reputation Management", "Email Marketing", "Affiliate Marketing"] },
  { tab: "SEO Services", links: ["On-Page SEO", "Technical SEO", "Local SEO", "E-commerce SEO", "Link Building", "International SEO", "Schema Markup", "Keyword Research", "SEO Audits", "Competitor Analysis", "Rank Tracking", "Content Strategy"] },
  { tab: "Web Development", links: ["Custom Website Design", "WordPress Development", "Shopify Development", "Landing Page Design", "UI / UX Design", "WooCommerce", "Webflow Development", "Headless Commerce", "Progressive Web Apps", "Website Maintenance", "Speed Optimization", "Security Hardening"] },
  { tab: "App Development", links: ["iOS App Development", "Android Development", "React Native Apps", "Flutter Development", "MVP Development", "App Store Optimization", "SaaS Development", "API Development", "App UI/UX Design", "Cross-Platform Apps", "App Maintenance", "QA & Testing"] },
];

/* ─── BOTTOM LINKS ──────────────────────────────────────────── */
const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Legal Disclaimer", href: "/legal" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

/* ─── ICONS ─────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180 text-orange-500" : "text-gray-400"}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ─── CYCLING SOCIAL ICONS ──────────────────────────────────── */
function SocialIcons() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % socials.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {socials.map((s, i) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
            i === activeIdx
              ? "bg-orange-500 border-orange-500 text-white scale-110 shadow-md shadow-orange-200"
              : "border-gray-200 text-gray-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white"
          }`}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

/* ─── LINK LIST ─────────────────────────────────────────────── */
function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-[9px]">
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href}
            className="text-gray-500 hover:text-orange-500 text-[13px] transition-colors duration-150 flex items-center gap-1.5 group leading-snug">
            <span className="w-[5px] h-[5px] rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ─── COLUMN HEADING ────────────────────────────────────────── */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-orange-500 font-bold text-[11px] uppercase tracking-widest mb-5 pb-2.5 border-b border-orange-100 flex items-center gap-2">
      <span className="w-[3px] h-3 rounded-full bg-orange-500 inline-block flex-shrink-0" />
      {children}
    </h3>
  );
}

/* ─── MOBILE ACCORDION ──────────────────────────────────────── */
function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-gray-800 font-bold text-sm text-left">
        {title}
        <ChevronDownIcon open={open} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] pb-5" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  );
}

/* ─── SHINE BUTTON ──────────────────────────────────────────── */
function ShineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <>
      <style>{`
        @keyframes shine-sweep {
          0%   { transform: translateX(-120%) skewX(-20deg); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(320%) skewX(-20deg); opacity: 0; }
        }
        .shine-btn { position: relative; overflow: hidden; }
        .shine-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.55) 50%,
            transparent 70%
          );
          transform: translateX(-120%) skewX(-20deg);
          animation: shine-sweep 2.8s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>
      <a
        href={href}
        className="shine-btn inline-flex items-center justify-center gap-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-full transition-colors duration-200 shadow-md shadow-orange-200 text-sm"
      >
        {children}
      </a>
    </>
  );
}

/* ─── SUBSCRIBE FORM ────────────────────────────────────────── */
function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 min-w-0 text-sm text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
      />
      <button
        type="submit"
        className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors shadow-sm shadow-orange-200"
        aria-label="Subscribe"
      >
        {sent ? <CheckIcon /> : <SendIcon />}
      </button>
    </form>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────── */
export default function Footer() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">

        {/* ══ DESKTOP: custom grid widths via CSS grid ══ */}
        {/*
          Layout: [brand=1.5fr] [col1=1fr] [col2=1fr] [col3=1fr] [contact=1.5fr]
          Brand and contact cols are ~50% wider than the 3 link cols
        */}
        <div
          className="hidden lg:grid gap-8 xl:gap-10"
          style={{ gridTemplateColumns: "1.55fr 1fr 1fr 1fr 1.55fr" }}
        >

          {/* ── Brand col ── */}
          <div className="flex flex-col gap-4">
            <a href="/" className="inline-flex items-baseline">
              <span className="text-[22px] font-black text-orange-500 leading-none tracking-tight">Junixo</span>
              <span className="text-[22px] font-black text-gray-900 leading-none tracking-tight">&nbsp;Digital</span>
            </a>

            <p className="text-gray-500 text-[13.5px] leading-relaxed">
              Junixo Digital is a full-service growth agency helping ambitious brands dominate
              search, convert traffic, and scale with precision-built digital products.
              Strategy meets execution — every time.
            </p>

            <SocialIcons />
          </div>

          {/* ── 3 link cols ── */}
          {linkColumns.map((col) => (
            <div key={col.heading}>
              <ColHeading>{col.heading}</ColHeading>
              <LinkList links={col.links} />
            </div>
          ))}

          {/* ── Contact / CTA col ── */}
          <div className="flex flex-col gap-4">
            <ColHeading>Get In Touch</ColHeading>

            {/* Email with icon */}
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0">
                <EmailIcon />
              </span>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold leading-none mb-0.5">Email Us</p>
                <a
                  href="mailto:hello@junixo.com"
                  className="text-gray-700 text-sm font-semibold hover:text-orange-500 transition-colors break-all"
                >
                  hello@junixo.com
                </a>
              </div>
            </div>

            {/* CTA block */}
            <div>
              <p className="text-gray-900 font-bold text-sm mb-1">Ready to grow?</p>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Let's talk about your project and build something that works.
              </p>
              <ShineButton href="/get-a-quote">
                Get a Quote <ArrowRight />
              </ShineButton>
            </div>

        
          </div>
        </div>

        {/* ══ MOBILE LAYOUT ══════════════════════════════════════ */}
        <div className="lg:hidden">
          <div className="pb-7 border-b border-gray-200 mb-1">
            <a href="/" className="inline-flex items-baseline mb-4">
              <span className="text-xl font-black text-orange-500 leading-none">Junixo</span>
              <span className="text-xl font-black text-gray-900 leading-none">&nbsp;Digital</span>
            </a>

            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Full-service growth agency helping brands dominate search, convert traffic,
              and scale with precision-built digital products.
            </p>

            <div className="mb-6">
              <SocialIcons />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0">
                <EmailIcon />
              </span>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold leading-none mb-0.5">Email Us</p>
                <a href="mailto:hello@junixo.com"
                  className="text-gray-700 text-sm font-semibold hover:text-orange-500 transition-colors">
                  hello@junixo.com
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="mb-5">
              <p className="text-gray-900 font-bold text-sm mb-1">Ready to grow?</p>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Let's talk about your project and build something that works.
              </p>
              <ShineButton href="/get-a-quote">
                Get a Quote <ArrowRight />
              </ShineButton>
            </div>

            {/* Subscribe */}
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Stay Updated</p>
            <p className="text-gray-500 text-xs mb-3">Get tips and agency news to your inbox.</p>
            <SubscribeForm />
          </div>

          {linkColumns.map((col) => (
            <FooterAccordion key={col.heading} title={col.heading}>
              <LinkList links={col.links} />
            </FooterAccordion>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-gray-200 my-10" />

        {/* ── All Services tabs ── */}
        <div>
          <h3 className="text-orange-500 font-bold text-[11px] uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-[3px] h-3 rounded-full bg-orange-500 inline-block" />
            All Services
          </h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {allServices.map((s, i) => (
              <button key={s.tab} onClick={() => setActiveTab(i)}
                className={`cursor-pointer text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeTab === i
                    ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                    : "border-gray-300 text-gray-500 hover:border-orange-400 hover:text-orange-500 bg-white"
                }`}>
                {s.tab}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center">
            {allServices[activeTab].links.map((link, i) => (
              <span key={link} className="flex items-center">
                <a href={`/services/${link.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                  className="text-xs sm:text-[13px] text-gray-500 hover:text-orange-500 transition-colors py-1 px-1.5">
                  {link}
                </a>
                {i < allServices[activeTab].links.length - 1 && (
                  <span className="text-gray-300 select-none text-xs">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-gray-200 my-8" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs text-center sm:text-left">
            © Junixo Digital {new Date().getFullYear()} · All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {bottomLinks.map((l, i) => (
              <span key={l.label} className="flex items-center">
                <a href={l.href} className="text-gray-400 hover:text-orange-500 text-xs transition-colors px-1.5 py-0.5">
                  {l.label}
                </a>
                {i < bottomLinks.length - 1 && (
                  <span className="text-gray-300 text-xs select-none">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}