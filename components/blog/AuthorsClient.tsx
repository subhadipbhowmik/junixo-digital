// components/blog/AuthorsClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Author } from "@/data/authors";
import { BlogPostMeta } from "@/components/blog/types";

interface EnrichedAuthor extends Author {
  postCount: number;
  categories: string[];
  totalReadTime: number;
  latestPost: BlogPostMeta | null;
}

type SortOption = "name" | "posts" | "readtime";

export default function AuthorsClient({
  authors,
}: {
  authors: EnrichedAuthor[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("posts");

  // Collect all unique categories across all authors
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    authors.forEach((a) => a.categories.forEach((c) => cats.add(c)));
    return ["All", ...Array.from(cats).sort()];
  }, [authors]);

  const filtered = useMemo(() => {
    let list = [...authors];

    // Search by name, role, or bio
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.bio.toLowerCase().includes(q) ||
          a.categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (activeCategory !== "All") {
      list = list.filter((a) =>
        a.categories.some(
          (c) => c.toLowerCase() === activeCategory.toLowerCase()
        )
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "posts") return b.postCount - a.postCount;
      if (sortBy === "readtime") return b.totalReadTime - a.totalReadTime;
      return 0;
    });

    return list;
  }, [authors, search, activeCategory, sortBy]);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gray-900 pt-20 pb-16">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow blobs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
          style={{ transform: "translate(35%,-35%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ transform: "translate(-30%,30%)" }}
        />
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">
              The Team Behind the Blog
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-5">
            Meet Our{" "}
            <span className="text-orange-500">Authors</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Strategists, developers, and marketers who live and breathe digital
            growth — and share everything they know.
          </p>

          {/* Quick stats */}
          <div className="inline-flex items-center gap-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {[
              { value: authors.length.toString(), label: "Authors" },
              {
                value: authors.reduce((s, a) => s + a.postCount, 0).toString(),
                label: "Articles",
              },
              {
                value: allCategories.length - 1 + "",
                label: "Topics",
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className={["px-8 py-4 text-center", i > 0 ? "border-l border-white/10" : ""].join(" ")}
              >
                <p className="text-2xl font-black text-orange-500">{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Controls ── */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search authors…"
                className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category pills (scrollable on mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide flex-1">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    "flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap",
                    activeCategory === cat
                      ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200"
                      : "border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-500",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-gray-400 font-medium hidden sm:inline">Sort:</span>
              <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
                {(
                  [
                    { value: "posts", label: "Posts" },
                    { value: "name", label: "A–Z" },
                    { value: "readtime", label: "Read time" },
                  ] as { value: SortOption; label: string }[]
                ).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={[
                      "text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer",
                      sortBy === opt.value
                        ? "bg-orange-500 text-white shadow-sm"
                        : "text-gray-500 hover:text-orange-500",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Authors grid ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Result count */}
        <p className="text-sm text-gray-400 mb-8">
          Showing{" "}
          <span className="font-bold text-gray-700">{filtered.length}</span>{" "}
          author{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" && (
            <>
              {" "}writing about{" "}
              <span className="font-bold text-orange-500">{activeCategory}</span>
            </>
          )}
        </p>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-gray-700 font-bold text-xl mb-2">No authors found</h3>
            <p className="text-gray-400 text-sm mb-5">
              Try a different search term or category.
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Individual author card ── */
function AuthorCard({ author }: { author: EnrichedAuthor }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">

      {/* Card top accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 flex flex-col flex-1">

        {/* Avatar + name row */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={author.avatar}
              alt={author.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-100 group-hover:ring-orange-100 transition-all"
            />
            {/* Online-style dot */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <Link href={`/authors/${author.id}`}>
              <h2 className="text-gray-900 font-black text-base leading-tight group-hover:text-orange-500 transition-colors truncate">
                {author.name}
              </h2>
            </Link>
            <p className="text-orange-500 text-xs font-bold mt-0.5 truncate">
              {author.role}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-500 text-[13px] leading-relaxed mb-4 flex-1 line-clamp-3">
          {author.bio}
        </p>

        {/* Categories */}
        {author.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {author.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100"
              >
                {cat}
              </span>
            ))}
            {author.categories.length > 3 && (
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                +{author.categories.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-center border border-gray-100">
            <p className="text-lg font-black text-gray-900">{author.postCount}</p>
            <p className="text-[10px] text-gray-400 font-medium">
              Article{author.postCount !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-center border border-gray-100">
            <p className="text-lg font-black text-gray-900">{author.totalReadTime}</p>
            <p className="text-[10px] text-gray-400 font-medium">Min reading</p>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-2 mb-5">
          {author.social.twitter && (
            <a
              href={author.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} on Twitter`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 border border-gray-200 hover:bg-[#000]/5 hover:border-gray-300 text-gray-500 hover:text-gray-800 rounded-xl text-[11px] font-bold transition-all"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>
          )}
          {author.social.linkedin && (
            <a
              href={author.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} on LinkedIn`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 border border-gray-200 hover:bg-[#0077b5]/5 hover:border-[#0077b5]/30 text-gray-500 hover:text-[#0077b5] rounded-xl text-[11px] font-bold transition-all"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          )}
          {author.social.website && (
            <a
              href={author.social.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name}'s website`}
              className="flex items-center justify-center w-9 h-9 bg-gray-50 border border-gray-200 hover:bg-orange-50 hover:border-orange-200 text-gray-500 hover:text-orange-500 rounded-xl text-[11px] font-bold transition-all flex-shrink-0"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>
          )}
        </div>

        {/* View profile CTA */}
        <Link
          href={`/authors/${author.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm shadow-orange-200 group-hover:shadow-md group-hover:shadow-orange-200"
        >
          View Profile
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}