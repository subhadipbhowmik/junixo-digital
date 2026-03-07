// components/blog/BlogListClient.tsx
"use client";

import { useState, useMemo } from "react";
import { BlogPostMeta } from "@/components/blog/types";
import BlogCard from "@/components/blog/BlogCard";

const PAGE_SIZES = [6, 9, 12, 18];

interface Props {
  posts: BlogPostMeta[];
  categories: string[];
}

export default function BlogListClient({ posts, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [pageSize, setPageSize] = useState(9);
  const [page, setPage] = useState(1);

  const allCategories = ["All", ...categories];

  const filtered = useMemo(() => {
    let r = [...posts];

    if (activeCategory !== "All") {
      r = r.filter((p) =>
        p.categories.some(
          (c) => c.toLowerCase() === activeCategory.toLowerCase()
        )
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (sortBy === "oldest") r = r.slice().reverse();

    return r;
  }, [posts, activeCategory, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function goToPage(n: number) {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function changeCategory(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

      {/* ── Category filter bar ── */}
      <div className="flex flex-wrap gap-2 py-8 border-b border-gray-200">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className={[
              "text-sm font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 cursor-pointer",
              activeCategory === cat
                ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200"
                : "border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-500",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-col lg:flex-row gap-10 mt-10">

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-5">

          {/* Search */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-[3px] h-4 rounded-full bg-orange-500 inline-block flex-shrink-0" />
              Search
            </p>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search articles…"
                className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-[3px] h-4 rounded-full bg-orange-500 inline-block flex-shrink-0" />
              Sort By
            </p>
            <div className="space-y-3">
              {(["newest", "oldest"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => { setSortBy(opt); setPage(1); }}
                    className={[
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer",
                      sortBy === opt
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300 group-hover:border-orange-400",
                    ].join(" ")}
                  >
                    {sortBy === opt && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    onClick={() => { setSortBy(opt); setPage(1); }}
                    className={[
                      "text-sm font-medium cursor-pointer",
                      sortBy === opt ? "text-orange-500 font-semibold" : "text-gray-600 group-hover:text-orange-400",
                    ].join(" ")}
                  >
                    {opt === "newest" ? "Newest First" : "Oldest First"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Posts per page */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-[3px] h-4 rounded-full bg-orange-500 inline-block flex-shrink-0" />
              Posts Per Page
            </p>
            <div className="grid grid-cols-4 gap-2">
              {PAGE_SIZES.map((n) => (
                <button
                  key={n}
                  onClick={() => { setPageSize(n); setPage(1); }}
                  className={[
                    "h-10 rounded-xl text-sm font-bold border transition-all duration-200",
                    pageSize === n
                      ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                      : "border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500",
                  ].join(" ")}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-[3px] h-4 rounded-full bg-orange-500 inline-block flex-shrink-0" />
              Categories
            </p>
            <ul className="space-y-1">
              {allCategories.map((cat) => {
                const count =
                  cat === "All"
                    ? posts.length
                    : posts.filter((p) =>
                        p.categories.some(
                          (c) => c.toLowerCase() === cat.toLowerCase()
                        )
                      ).length;
                return (
                  <li key={cat}>
                    <button
                      onClick={() => changeCategory(cat)}
                      className={[
                        "w-full flex items-center justify-between text-sm py-2 px-3 rounded-xl transition-all",
                        activeCategory === cat
                          ? "text-orange-500 font-bold bg-orange-50"
                          : "text-gray-600 hover:text-orange-500 hover:bg-gray-50",
                      ].join(" ")}
                    >
                      <span>{cat}</span>
                      <span
                        className={[
                          "text-[11px] px-2 py-0.5 rounded-full font-semibold",
                          activeCategory === cat
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-500",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* ── Blog grid ── */}
        <div className="flex-1 min-w-0">

          {/* Result count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-800">{filtered.length}</span>{" "}
              article{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && (
                <>
                  {" "}in{" "}
                  <span className="font-bold text-orange-500">{activeCategory}</span>
                </>
              )}
            </p>
            {(search || activeCategory !== "All") && (
              <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); setPage(1); }}
                  className="text-xs bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-full cursor-pointer transition-colors">
                  Clear Filters
            </button>
            )}
          </div>

          {/* Empty state */}
          {paginated.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-gray-700 font-bold text-xl mb-2">No posts found</h3>
              <p className="text-gray-400 text-sm mb-5">
                Try a different search term or category.
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); setPage(1); }}
                className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors"
              >
                View All Posts
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginated.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Page numbers */}
              {(() => {
                const pages: (number | "...")[] = [];
                for (let i = 1; i <= totalPages; i++) {
                  if (
                    i === 1 ||
                    i === totalPages ||
                    (i >= currentPage - 1 && i <= currentPage + 1)
                  ) {
                    pages.push(i);
                  } else if (
                    pages[pages.length - 1] !== "..."
                  ) {
                    pages.push("...");
                  }
                }
                return pages.map((p, i) =>
                  p === "..." ? (
                    <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goToPage(p as number)}
                      className={[
                        "w-10 h-10 rounded-xl border text-sm font-bold transition-all duration-200",
                        p === currentPage
                          ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200"
                          : "border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-500",
                      ].join(" ")}
                    >
                      {p}
                    </button>
                  )
                );
              })()}

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}