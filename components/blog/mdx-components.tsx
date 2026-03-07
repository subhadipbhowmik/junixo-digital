// components/blog/mdx-components.tsx
import React from "react";
import Link from "next/link";

/* ─── Custom MDX block components ─── */

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      wrap: "bg-blue-50 border-blue-200",
      icon: "ℹ️",
      title: "text-blue-800",
      body: "text-blue-700",
    },
    warning: {
      wrap: "bg-amber-50 border-amber-200",
      icon: "⚠️",
      title: "text-amber-800",
      body: "text-amber-700",
    },
    tip: {
      wrap: "bg-green-50 border-green-200",
      icon: "💡",
      title: "text-green-800",
      body: "text-green-700",
    },
    danger: {
      wrap: "bg-red-50 border-red-200",
      icon: "🚨",
      title: "text-red-800",
      body: "text-red-700",
    },
  }[type];

  return (
    <div className={`${styles.wrap} border rounded-xl p-5 my-6`}>
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0 mt-0.5">{styles.icon}</span>
        <div>
          {title && (
            <p className={`font-bold ${styles.title} mb-1 text-sm`}>{title}</p>
          )}
          <div className={`text-sm leading-relaxed ${styles.body}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CtaBlock({
  title = "Ready to Grow Your Business?",
  description = "Let's talk about your project and build something that works.",
  buttonText = "Get a Free Quote",
  buttonHref = "/get-a-quote",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <div className="my-10 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-8 text-center">
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
        Free Consultation
      </div>
      <h3 className="text-gray-900 font-black text-2xl mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md mx-auto">
        {description}
      </p>
      <Link
        href={buttonHref}
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-full transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5"
      >
        {buttonText}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}

export function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="text-center bg-orange-50 rounded-xl p-4 border border-orange-100">
      <p className="text-2xl font-black text-orange-500">{value}</p>
      <p className="text-gray-600 text-xs mt-1 font-medium">{label}</p>
    </div>
  );
}

export function Stats({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
      {children}
    </div>
  );
}

export function StatsRow({
  stats = [],
}: {
  stats?: { value: string; label: string }[];
}) {
  if (!Array.isArray(stats) || stats.length === 0) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
      {stats.map((s) => (
        <div key={s.label} className="text-center bg-orange-50 rounded-xl p-4 border border-orange-100">
          <p className="text-2xl font-black text-orange-500">{s.value}</p>
          <p className="text-gray-600 text-xs mt-1 font-medium">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Prose element overrides ─── */
export const mdxComponents = {
  // Custom components
  Callout,
  CtaBlock,
  Stats,
  Stat,
  StatsRow,

  // Headings — include scroll-mt for sticky header offset
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-black text-gray-900 mt-10 mb-5 leading-tight tracking-tight" {...p} />
  ),
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={slugify(extractText(p.children))} className="text-2xl font-black text-gray-900 mt-12 mb-4 leading-tight pb-3 border-b border-gray-100 scroll-mt-28" {...p} />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={slugify(extractText(p.children))} className="text-xl font-bold text-gray-800 mt-8 mb-3 scroll-mt-28" {...p} />
  ),
  h4: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 id={slugify(extractText(p.children))} className="text-base font-bold text-gray-800 mt-6 mb-2 scroll-mt-28" {...p} />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-600 leading-[1.9] mb-5 text-[15.5px]" {...p} />
  ),
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2.5 mb-6 pl-0 list-none" {...p} />
  ),
  ol: (p: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 space-y-2.5 mb-6 text-gray-600 text-[15px]" {...p} />
  ),
  li: (p: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed list-none">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-[0.65em]" />
      <span>{(p as any).children}</span>
    </li>
  ),
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-orange-400 pl-6 py-3 my-6 bg-orange-50/60 rounded-r-xl italic text-gray-700 text-[15px]" {...p} />
  ),
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 text-orange-600 text-[13px] px-1.5 py-0.5 rounded-md font-mono not-italic" {...p} />
  ),
  pre: (p: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-900 text-gray-100 rounded-2xl p-6 my-7 overflow-x-auto text-sm leading-relaxed font-mono" {...p} />
  ),
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-orange-500 font-semibold underline decoration-orange-200 underline-offset-2 hover:decoration-orange-500 transition-all" {...p} />
  ),
  img: (p: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-2xl w-full my-7 shadow-sm" alt={p.alt ?? ""} {...p} />
  ),
  hr: () => <hr className="border-gray-200 my-10" />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900" {...p} />
  ),
  em: (p: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-gray-700" {...p} />
  ),
  table: (p: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-7 rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm border-collapse" {...p} />
    </div>
  ),
  thead: (p: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-orange-50" {...p} />
  ),
  th: (p: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-orange-700 font-bold px-5 py-3 text-left border-b border-gray-200 text-[13px] uppercase tracking-wide" {...p} />
  ),
  td: (p: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-5 py-3 border-b border-gray-100 text-gray-600" {...p} />
  ),
  tr: (p: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-gray-50 transition-colors" {...p} />
  ),
};

/* ─── Helpers for auto heading IDs ─── */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) return extractText((children.props as any).children);
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}