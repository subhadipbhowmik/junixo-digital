// app/categories/[category]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllCategories,
  getPostsByCategory,
  getAllPosts,
} from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

/* ─── Static params — generates one page per category slug ─── */
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories
    .filter((cat) => typeof cat === "string" && cat.trim().length > 0)
    .map((cat) => ({
      category: cat.toLowerCase().replace(/\s+/g, "-"),
    }));
}

/* ─── SEO Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!category || typeof category !== "string") {
    return { title: "Category | Junixo Digital Blog" };
  }

  const displayName = category
    .split("-")
    .filter(Boolean)
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

  return {
    title: `${displayName} Articles | Junixo Digital Blog`,
    description: `All ${displayName} articles from the Junixo Digital blog — expert insights and actionable strategies.`,
    openGraph: {
      title: `${displayName} | Junixo Digital Blog`,
      description: `Browse all ${displayName} articles from the Junixo Digital blog.`,
    },
  };
}

/* ─── Page ─── */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!category || typeof category !== "string") {
    notFound();
  }

  const allCats = getAllCategories();

  // Match the URL slug back to the original category name
  const matched = allCats.find(
    (c) =>
      typeof c === "string" &&
      c.toLowerCase().replace(/\s+/g, "-") === category
  );

  if (!matched) notFound();

  const posts = getPostsByCategory(matched);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gray-900 pt-16 pb-14">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #f97316 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <Link href="/blog" className="hover:text-orange-400 transition-colors">
              Blog
            </Link>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="text-gray-300">{matched}</span>
          </nav>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">
              Category
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-3">
            {matched}
          </h1>
          <p className="text-gray-400 text-lg">
            {posts.length} article{posts.length !== 1 ? "s" : ""} on {matched}
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Posts grid */}
            <div className="flex-1">
              {posts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-gray-600 font-semibold mb-2">
                    No posts yet in {matched}
                  </p>
                  <p className="text-gray-400 text-sm mb-5">
                    Check back soon or browse all articles.
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    ← Back to Blog
                  </Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-[3px] h-4 rounded-full bg-orange-500 inline-block flex-shrink-0" />
                  All Categories
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/blog"
                      className="flex items-center justify-between text-sm py-2 px-3 rounded-xl text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors font-medium"
                    >
                      <span>All Posts</span>
                      <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
                        {getAllPosts().length}
                      </span>
                    </Link>
                  </li>
                  {allCats.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                        className={[
                          "flex items-center justify-between text-sm py-2 px-3 rounded-xl transition-all",
                          cat === matched
                            ? "text-orange-500 font-bold bg-orange-50"
                            : "text-gray-600 hover:text-orange-500 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        <span>{cat}</span>
                        <span
                          className={[
                            "text-[11px] px-2 py-0.5 rounded-full font-semibold",
                            cat === matched
                              ? "bg-orange-100 text-orange-600"
                              : "bg-gray-100 text-gray-500",
                          ].join(" ")}
                        >
                          {getPostsByCategory(cat).length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}