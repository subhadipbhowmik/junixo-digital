"use client";
import { useState, useRef, useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { usePathname } from "next/navigation";

/* ─── NAV DATA ─────────────────────────────────────────────── */
const megaMenus = {
  Services: {
    tabs: [
      {
        id: "digital-marketing",
        label: "Digital Marketing",
        columns: [
          {
            heading: "Core Services",
            links: [
              { label: "Social Media Marketing", href: "/services/digital-marketing/social-media-marketing" },
              { label: "PPC / Google Ads", href: "/services/digital-marketing/ppc-google-ads" },
              { label: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
              { label: "Email Marketing", href: "/services/email-marketing" },
              { label: "Influencer Marketing", href: "/services/influencer-marketing" },
            ],
          },
          {
            heading: "Advanced Strategies",
            links: [
              { label: "Conversion Rate Optimization", href: "/services/cro" },
              { label: "Affiliate Marketing", href: "/services/affiliate-marketing" },
              { label: "Video Marketing", href: "/services/video-marketing" },
              { label: "Podcast Marketing", href: "/services/podcast-marketing" },
            ],
          },
          {
            heading: "Analytics & Growth",
            links: [
              { label: "Marketing Analytics", href: "/services/marketing-analytics" },
              { label: "A/B Testing", href: "/services/ab-testing" },
              { label: "Growth Hacking", href: "/services/growth-hacking" },
              { label: "Retargeting Ads", href: "/services/retargeting" },
            ],
          },
        ],
        solutions: [
          { label: "Brand Strategy", href: "/solutions/brand-strategy" },
          { label: "Marketing Automation", href: "/solutions/marketing-automation" },
          { label: "Analytics & Reporting", href: "/solutions/analytics" },
        ],
      },
      {
        id: "seo",
        label: "SEO Services",
        columns: [
          {
            heading: "On-Site SEO",
            links: [
              { label: "On-Page SEO", href: "/services/on-page-seo" },
              { label: "Technical SEO", href: "/services/technical-seo" },
              { label: "Content Strategy", href: "/services/content-strategy" },
              { label: "Schema Markup", href: "/services/schema-markup" },
            ],
          },
          {
            heading: "Off-Site SEO",
            links: [
              { label: "Link Building", href: "/services/link-building" },
              { label: "Local SEO", href: "/services/local-seo" },
              { label: "E-commerce SEO", href: "/services/ecommerce-seo" },
              { label: "International SEO", href: "/services/international-seo" },
            ],
          },
          {
            heading: "SEO Tools",
            links: [
              { label: "SEO Audits", href: "/services/seo-audit" },
              { label: "Keyword Research", href: "/services/keyword-research" },
              { label: "Rank Tracking", href: "/services/rank-tracking" },
              { label: "Competitor Analysis", href: "/services/competitor-analysis" },
            ],
          },
        ],
        solutions: [
          { label: "SEO Audit", href: "/solutions/seo-audit" },
          { label: "Keyword Research", href: "/solutions/keyword-research" },
          { label: "Competitor Analysis", href: "/solutions/competitor-analysis" },
        ],
      },
      {
        id: "web-dev",
        label: "Web Development",
        columns: [
          {
            heading: "Design & Build",
            links: [
              { label: "Custom Website Design", href: "/services/custom-website" },
              { label: "WordPress Development", href: "/services/wordpress" },
              { label: "Shopify Development", href: "/services/shopify" },
              { label: "Landing Page Design", href: "/services/landing-pages" },
              { label: "UI / UX Design", href: "/services/ui-ux-design" },
            ],
          },
          {
            heading: "Platforms",
            links: [
              { label: "WooCommerce", href: "/services/woocommerce" },
              { label: "Webflow", href: "/services/webflow" },
              { label: "Headless Commerce", href: "/services/headless" },
              { label: "Progressive Web Apps", href: "/services/pwa" },
            ],
          },
          {
            heading: "Maintenance",
            links: [
              { label: "Website Support", href: "/services/website-support" },
              { label: "Performance Optimization", href: "/services/performance" },
              { label: "Security Hardening", href: "/services/security" },
              { label: "CMS Updates", href: "/services/cms-updates" },
            ],
          },
        ],
        solutions: [
          { label: "Website Audit", href: "/solutions/website-audit" },
          { label: "Speed Optimization", href: "/solutions/speed-optimization" },
          { label: "CRO Redesign", href: "/solutions/cro-redesign" },
        ],
      },
      {
        id: "app-dev",
        label: "App Development",
        columns: [
          {
            heading: "Mobile Platforms",
            links: [
              { label: "iOS App Development", href: "/services/ios-development" },
              { label: "Android App Development", href: "/services/android-development" },
              { label: "React Native Apps", href: "/services/react-native" },
              { label: "Flutter Development", href: "/services/flutter" },
              { label: "App Maintenance", href: "/services/app-maintenance" },
            ],
          },
          {
            heading: "App Strategy",
            links: [
              { label: "MVP Development", href: "/services/mvp" },
              { label: "App Store Optimization", href: "/services/aso" },
              { label: "App UI/UX Design", href: "/services/app-design" },
              { label: "Cross-Platform Apps", href: "/services/cross-platform" },
            ],
          },
          {
            heading: "Enterprise Apps",
            links: [
              { label: "SaaS Development", href: "/services/saas" },
              { label: "API Development", href: "/services/api-development" },
              { label: "App Integration", href: "/services/app-integration" },
              { label: "QA & Testing", href: "/services/qa-testing" },
            ],
          },
        ],
        solutions: [
          { label: "App Audit", href: "/solutions/app-audit" },
          { label: "App Strategy", href: "/solutions/app-strategy" },
          { label: "Cross-Platform Apps", href: "/solutions/cross-platform" },
        ],
      },
    ],
  },
  "About Us": {
    simple: [
      { label: "Our Story", href: "/about", icon: "🏢" },
      { label: "Our Team", href: "/about/team", icon: "👥" },
      { label: "Why Choose Us", href: "/about/why-us", icon: "⭐" },
      { label: "Careers", href: "/careers", icon: "💼" },
      { label: "Culture & Values", href: "/about/culture", icon: "💡" },
      { label: "Press & Media", href: "/about/press", icon: "📰" },
    ],
  },
  "Case Studies": {
    simple: [
      { label: "Portfolio", href: "/portfolio", icon: "🎨" },
      { label: "Client Reviews", href: "/reviews", icon: "⭐" },
      { label: "Video Testimonials", href: "/testimonials", icon: "🎥" },
      { label: "Case Studies", href: "/case-studies", icon: "📊" },
      { label: "Success Stories", href: "/success-stories", icon: "🚀" },
    ],
  },
  Resources: {
    simple: [
      { label: "Blog", href: "/blog", icon: "✍️" },
      { label: "SEO Guides", href: "/resources/guides", icon: "📚" },
      { label: "Free Tools", href: "/resources/tools", icon: "🛠️" },
      { label: "Insights", href: "/resources/insights", icon: "💡" },
      { label: "Webinars", href: "/resources/webinars", icon: "🎙️" },
      { label: "Newsletter", href: "/resources/newsletter", icon: "📧" },
    ],
  },

  /* ─── NEW: Tools mega menu ─────────────────────────────────── */
  Tools: {
    tabs: [
      {
        id: "seo-tools",
        label: "SEO Tools",
        columns: [
          {
            heading: "Analysis",
            links: [
              { label: "Website SEO Checker", href: "/tools/seo-checker" },
              { label: "Backlink Analyzer", href: "/tools/backlink-analyzer" },
              { label: "Domain Authority Checker", href: "/tools/domain-authority" },
              { label: "Page Speed Analyzer", href: "/tools/page-speed" },
              { label: "Mobile Friendly Test", href: "/tools/mobile-friendly" },
            ],
          },
          {
            heading: "Keyword Tools",
            links: [
              { label: "Keyword Planner", href: "/tools/keyword-planner" },
              { label: "Keyword Density Checker", href: "/tools/keyword-density" },
              { label: "Long-Tail Keyword Generator", href: "/tools/longtail-keywords" },
              { label: "SERP Checker", href: "/tools/serp-checker" },
            ],
          },
          {
            heading: "Technical",
            links: [
              { label: "XML Sitemap Generator", href: "/tools/seo-tools/xml-sitemap-generator" },
              { label: "Robots.txt Generator", href: "/tools/robots-txt" },
              { label: "Redirect Checker", href: "/tools/redirect-checker" },
              { label: "Broken Link Finder", href: "/tools/broken-links" },
            ],
          },
        ],
        solutions: [
          { label: "Full SEO Audit", href: "/tools/full-seo-audit" },
          { label: "Rank Tracker", href: "/tools/rank-tracker" },
          { label: "Competitor Gap Tool", href: "/tools/competitor-gap" },
        ],
      },
      {
        id: "content-tools",
        label: "Content Tools",
        columns: [
          {
            heading: "Writing Aids",
            links: [
              { label: "AI Content Generator", href: "/tools/ai-content-generator" },
              { label: "Blog Title Generator", href: "/tools/blog-title-generator" },
              { label: "Meta Description Writer", href: "/tools/meta-description" },
              { label: "Content Readability Checker", href: "/tools/readability" },
              { label: "Plagiarism Checker", href: "/tools/plagiarism" },
            ],
          },
          {
            heading: "Social & Copy",
            links: [
              { label: "Social Media Caption Generator", href: "/tools/caption-generator" },
              { label: "Ad Copy Generator", href: "/tools/ad-copy" },
              { label: "Email Subject Line Tester", href: "/tools/email-subject" },
              { label: "CTA Button Generator", href: "/tools/cta-generator" },
            ],
          },
          {
            heading: "Optimization",
            links: [
              { label: "Word Count Tool", href: "/tools/word-count" },
              { label: "Content Scoring Tool", href: "/tools/content-score" },
              { label: "FAQ Generator", href: "/tools/faq-generator" },
              { label: "Schema Markup Generator", href: "/tools/schema-generator" },
            ],
          },
        ],
        solutions: [
          { label: "Content Audit", href: "/tools/content-audit" },
          { label: "Content Calendar", href: "/tools/content-calendar" },
          { label: "Brand Voice Checker", href: "/tools/brand-voice" },
        ],
      },
      {
        id: "performance-tools",
        label: "Performance Tools",
        columns: [
          {
            heading: "Speed & Core Web Vitals",
            links: [
              { label: "Core Web Vitals Checker", href: "/tools/core-web-vitals" },
              { label: "GTmetrix Alternative", href: "/tools/speed-test" },
              { label: "Image Compression Tool", href: "/tools/image-compression" },
              { label: "CSS Minifier", href: "/tools/css-minifier" },
              { label: "JS Minifier", href: "/tools/js-minifier" },
            ],
          },
          {
            heading: "Uptime & Security",
            links: [
              { label: "Uptime Monitor", href: "/tools/uptime-monitor" },
              { label: "SSL Certificate Checker", href: "/tools/ssl-checker" },
              { label: "Website Security Scanner", href: "/tools/security-scanner" },
              { label: "HTTP Header Checker", href: "/tools/http-headers" },
            ],
          },
          {
            heading: "Diagnostics",
            links: [
              { label: "DNS Lookup Tool", href: "/tools/dns-lookup" },
              { label: "WHOIS Lookup", href: "/tools/whois" },
              { label: "IP Location Finder", href: "/tools/ip-location" },
              { label: "Website Down Checker", href: "/tools/website-down" },
            ],
          },
        ],
        solutions: [
          { label: "Performance Report", href: "/tools/performance-report" },
          { label: "Speed Optimization Plan", href: "/tools/speed-plan" },
          { label: "Security Hardening Audit", href: "/tools/security-audit" },
        ],
      },
      {
        id: "analytics-tools",
        label: "Analytics Tools",
        columns: [
          {
            heading: "Traffic & Insights",
            links: [
              { label: "Traffic Estimator", href: "/tools/traffic-estimator" },
              { label: "Bounce Rate Analyzer", href: "/tools/bounce-rate" },
              { label: "UTM Builder", href: "/tools/utm-builder" },
              { label: "Heatmap Tool", href: "/tools/heatmap" },
              { label: "Funnel Analyzer", href: "/tools/funnel-analyzer" },
            ],
          },
          {
            heading: "Social Analytics",
            links: [
              { label: "Social Media Audit", href: "/tools/social-audit" },
              { label: "Hashtag Analyzer", href: "/tools/hashtag-analyzer" },
              { label: "Engagement Rate Calculator", href: "/tools/engagement-rate" },
              { label: "Follower Growth Tracker", href: "/tools/follower-tracker" },
            ],
          },
          {
            heading: "ROI & Reporting",
            links: [
              { label: "ROI Calculator", href: "/tools/roi-calculator" },
              { label: "PPC Budget Planner", href: "/tools/ppc-budget" },
              { label: "A/B Test Calculator", href: "/tools/ab-calculator" },
              { label: "Lead Value Estimator", href: "/tools/lead-value" },
            ],
          },
        ],
        solutions: [
          { label: "Analytics Dashboard", href: "/tools/analytics-dashboard" },
          { label: "Custom Report Builder", href: "/tools/report-builder" },
          { label: "Campaign Tracker", href: "/tools/campaign-tracker" },
        ],
      },
    ],
  },
};

const topLinks = ["Services", "About Us", "Case Studies", "Resources", "Tools"];

/* ─── ICONS ──────────────────────────────────────────────────── */
const ChevronDown = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ─── SHARED TABBED MEGA MENU (used by both Services & Tools) ── */
function TabbedMegaMenu({
  menuKey,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonHref,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  menuKey: "Services" | "Tools";
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const menu = megaMenus[menuKey] as { tabs: typeof megaMenus["Services"]["tabs"] };
  const tab = menu.tabs[activeTab];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed left-0 right-0 bg-white shadow-2xl border-t-2 border-orange-500 z-50"
      style={{ top: 64, boxShadow: "0 24px 64px rgba(0,0,0,0.11)" }}
    >
      <div className="max-w-7xl mx-auto flex" style={{ minHeight: 340 }}>
        {/* Left tab sidebar */}
        <div className="w-52 flex-shrink-0 bg-orange-50 border-r border-orange-100">
          {menu.tabs.map((t, i) => (
            <button
              key={t.id}
              onMouseEnter={() => setActiveTab(i)}
              onClick={() => setActiveTab(i)}
              className={`w-full text-left px-5 py-4 flex items-center justify-between text-sm font-medium transition-all duration-150 border-l-[3px] ${
                activeTab === i
                  ? "bg-white text-orange-500 border-orange-500"
                  : "text-gray-600 border-transparent hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              {t.label}
              {activeTab === i && (
                <span className="text-orange-400">
                  <ChevronRight />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right content: columns + solutions */}
        <div className="flex-1 px-8 py-7">
          <div className="flex gap-0">
            {tab.columns.map((col, ci) => (
              <div
                key={ci}
                className={`flex-1 px-6 ${ci !== 0 ? "border-l border-gray-100" : ""}`}
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {col.heading}
                </p>
                <ul className="space-y-0.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 py-[7px] group transition-colors duration-150"
                      >
                        <span className="w-1 h-1 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Solutions column */}
            <div className="flex-1 px-6 border-l border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                Solutions
              </p>
              <ul className="space-y-0.5">
                {tab.solutions.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      onClick={onClose}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 py-[7px] group transition-colors duration-150"
                    >
                      <span className="w-1 h-1 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl px-5 py-4">
              <div>
                <p className="font-bold text-gray-800 text-sm">{ctaTitle}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ctaDescription}</p>
              </div>
              <a
                href={ctaButtonHref}
                onClick={onClose}
                className="flex-shrink-0 ml-6 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors duration-150"
              >
                {ctaButtonLabel} <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SIMPLE DROPDOWN — fixed to header bottom ───────────────── */
function SimpleMegaMenu({
  items,
  centerX,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  items: { label: string; href: string; icon: string }[];
  centerX: number;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-2 overflow-hidden"
      style={{
        top: 64,
        left: centerX,
        transform: "translateX(-50%)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-500" />
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150 group"
        >
          <span className="text-base w-6 text-center">{item.icon}</span>
          <span className="font-medium">{item.label}</span>
          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-orange-400">
            <ChevronRight />
          </span>
        </a>
      ))}
    </div>
  );
}

/* ─── MOBILE ACCORDION ───────────────────────────────────────── */
function MobileAccordion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-gray-800 font-semibold text-sm"
      >
        {label}
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-orange-500" : "text-gray-400"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
}

/* ─── MOBILE TABBED SECTION (shared by Services & Tools) ──────── */
function MobileTabbedSection({
  menuKey,
  onClose,
}: {
  menuKey: "Services" | "Tools";
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const menu = megaMenus[menuKey] as { tabs: typeof megaMenus["Services"]["tabs"] };

  return (
    <>
      <div className="flex flex-wrap gap-1.5 mb-4 pt-1">
        {menu.tabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(i)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors ${
              activeTab === i
                ? "bg-orange-500 text-white border-orange-500"
                : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {menu.tabs[activeTab].columns.map((col, ci) => (
        <div key={ci} className="mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            {col.heading}
          </p>
          <ul className="space-y-0.5">
            {col.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-500 py-2 border-b border-gray-50 transition-colors"
                >
                  <span className="text-orange-400 flex-shrink-0">
                    <ChevronRight />
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

/* ─── MAIN HEADER ────────────────────────────────────────────── */
export default function Header() {

 const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeCenterX, setActiveCenterX] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
  (async function () {
    const cal = await getCalApi();
    cal("ui", {
      styles: {
        branding: { brandColor: "#f97316" } // your orange theme
      }
    });
  })();
}, []);

  const handleMouseEnter = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const el = navItemRefs.current[key];
    if (el) {
      const rect = el.getBoundingClientRect();
      setActiveCenterX(rect.left + rect.width / 2);
    }
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const closeMenu = () => setActiveMenu(null);

  // Helper: is this key a tabbed menu?
  const isTabbedMenu = (key: string) =>
    "tabs" in megaMenus[key as keyof typeof megaMenus];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <a href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[22px] font-black text-orange-500 tracking-tight leading-none">
                Junixo
              </span>
              <span className="text-[22px] font-black text-gray-900 tracking-tight leading-none">
                Digital
              </span>
            </a>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {topLinks.map((key) => {
                const isActive = activeMenu === key;

                return (
                  <div
                    key={key}
                    ref={(el) => { navItemRefs.current[key] = el; }}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13.5px] font-semibold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "text-orange-500 bg-orange-50"
                          : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                      }`}
                    >
                      {key}
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          isActive ? "rotate-180 text-orange-500" : ""
                        }`}
                      />
                    </button>

                    {/* Invisible bridge to prevent gap-triggered close */}
                    {isActive && (
                      <div
                        className="absolute left-0 right-0"
                        style={{ top: "100%", height: 4 }}
                        onMouseEnter={() => handleMouseEnter(key)}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ── Right side: Contact + CTA + Mobile ── */}
            <div className="flex items-center gap-2">
              <a
                href="/contact"
                className="hidden lg:flex items-center gap-1.5 border border-orange-500 text-orange-500 text-xs font-bold px-4 py-[7px] rounded-full transition-all duration-150 hover:bg-orange-500 hover:text-white"
              >
                Contact
              </a>

              <button
  data-cal-link="junixo-digital/get-a-quote"
  data-cal-config='{"layout":"month_view"}'
  className="hidden lg:flex items-center cursor-pointer gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-150 shadow-sm hover:shadow-md"
>
  Get a Quote
  <ArrowRight />
</button>

              <a
                href="/get-a-quote"
                className="lg:hidden flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-150 shadow-sm hover:shadow-md"
              >
                Get Started
                <ArrowRight />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors ml-1"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Desktop Dropdowns ── */}
      {activeMenu && (
        <div
          onMouseEnter={() => handleMouseEnter(activeMenu)}
          onMouseLeave={handleMouseLeave}
        >
          {activeMenu === "Services" && (
            <TabbedMegaMenu
              menuKey="Services"
              ctaTitle="Free Website Audit"
              ctaDescription="Comprehensive SEO & performance review — no strings attached."
              ctaButtonLabel="Claim Free Audit"
              ctaButtonHref="/contact"
              onClose={closeMenu}
              onMouseEnter={() => handleMouseEnter(activeMenu)}
              onMouseLeave={handleMouseLeave}
            />
          )}

          {activeMenu === "Tools" && (
            <TabbedMegaMenu
              menuKey="Tools"
              ctaTitle="Free Tools Suite"
              ctaDescription="Access 30+ free digital marketing & SEO tools — no sign-up required."
              ctaButtonLabel="Explore All Tools"
              ctaButtonHref="/tools"
              onClose={closeMenu}
              onMouseEnter={() => handleMouseEnter(activeMenu)}
              onMouseLeave={handleMouseLeave}
            />
          )}

          {activeMenu !== "Services" && activeMenu !== "Tools" && (() => {
            const menu = megaMenus[activeMenu as keyof typeof megaMenus];
            return "simple" in menu ? (
              <SimpleMegaMenu
                items={menu.simple as { label: string; href: string; icon: string }[]}
                centerX={activeCenterX}
                onClose={closeMenu}
                onMouseEnter={() => handleMouseEnter(activeMenu)}
                onMouseLeave={handleMouseLeave}
              />
            ) : null;
          })()}
        </div>
      )}

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            mobileOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-[340px] bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <a href="/" className="flex items-center gap-1" onClick={() => setMobileOpen(false)}>
              <span className="text-lg font-black text-orange-500">Junixo</span>
              <span className="text-lg font-black text-gray-900">Digital</span>
            </a>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto">

            {/* Services accordion */}
            <MobileAccordion label="Services">
              <MobileTabbedSection menuKey="Services" onClose={() => setMobileOpen(false)} />
            </MobileAccordion>

            {/* Simple dropdowns */}
            {(["About Us", "Case Studies", "Resources"] as const).map((key) => (
              <MobileAccordion key={key} label={key}>
                <ul className="space-y-0.5 pt-1">
                  {(megaMenus[key].simple as { label: string; href: string; icon: string }[]).map(
                    (item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 text-sm text-gray-700 hover:text-orange-500 py-2.5 border-b border-gray-50 transition-colors"
                        >
                          <span className="text-base w-6 text-center">{item.icon}</span>
                          {item.label}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </MobileAccordion>
            ))}

            {/* Tools accordion */}
            <MobileAccordion label="Tools">
              <MobileTabbedSection menuKey="Tools" onClose={() => setMobileOpen(false)} />
            </MobileAccordion>

            {/* Contact */}
            <div className="border-b border-gray-100">
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-5 py-4 text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-5 border-t border-gray-100 flex-shrink-0 bg-orange-50">
            <a
              href="/get-a-quote"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-sm"
            >
              Get a Free Quote <ArrowRight />
            </a>
            <p className="text-center text-xs text-gray-400 mt-2">
              No commitment · Free consultation
            </p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}