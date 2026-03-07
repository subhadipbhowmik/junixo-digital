// components/blog/SidebarCta.tsx
import Link from "next/link";

export default function SidebarCta() {
  return (
    <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-xl shadow-orange-200/50">
      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      </div>
      <h3 className="text-white font-black text-xl mb-2 leading-tight">
        Ready to Grow?
      </h3>
      <p className="text-white/80 text-sm leading-relaxed mb-5">
        Let's discuss your project and build a growth engine for your business.
      </p>
      <Link
        href="/get-a-quote"
        className="flex items-center justify-center gap-2 bg-white text-orange-500 font-bold text-sm py-3 px-5 rounded-xl hover:bg-orange-50 transition-colors shadow-sm"
      >
        Get a Free Quote
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
      <p className="text-center text-white/60 text-xs mt-3">
        Free consultation · No commitment
      </p>
    </div>
  );
}