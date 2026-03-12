// app/authors/[author]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { authors } from "@/data/authors";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

/* ─── Static params ─── */
export async function generateStaticParams() {
  return Object.keys(authors).map((id) => ({ author: id }));
}

/* ─── SEO Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ author: string }>;
}): Promise<Metadata> {
  const { author: authorId } = await params;
  const author = authors[authorId];
  if (!author) return { title: "Author Not Found | Junixo Digital" };

  return {
    title: `${author.name} — Author at Junixo Digital`,
    description: author.bio,
    openGraph: {
      title: `${author.name} | Junixo Digital Blog`,
      description: author.bio,
      images: [{ url: author.avatar }],
    },
  };
}

/* ─── Page ─── */
export default async function AuthorPage({
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const { author: authorId } = await params;
  const author = authors[authorId];
  if (!author) notFound();

  const allPosts = getAllPosts();
  const authorPosts = allPosts.filter((p) => p.author === authorId);

  // Collect unique categories this author has written about
  const authorCategories = Array.from(
    new Set(authorPosts.flatMap((p) => p.categories))
  ).sort();

  const totalReadTime = authorPosts.reduce((sum, p) => sum + p.readTime, 0);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero / Profile header ── */}
      <section className="relative overflow-hidden bg-gray-900 pt-16 pb-0">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #f97316 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
          style={{ transform: "translate(30%,-30%)" }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8 flex-wrap">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            <Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            <span className="text-gray-300">{author.name}</span>
          </nav>

          {/* Profile card — overlaps into white section below */}
          <div className="bg-white rounded-t-3xl px-8 pt-10 pb-0 shadow-xl shadow-black/10">
            <div className="flex flex-col sm:flex-row gap-7 items-start">

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={author.avatar}
                  alt={author.name}
                  width={100}
                  height={100}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-orange-100 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 pb-8">
                <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="text-orange-600 text-[11px] font-bold uppercase tracking-widest">
                    {author.role}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-3">
                  {author.name}
                </h1>

                <p className="text-gray-500 text-[15px] leading-relaxed mb-5 max-w-2xl">
                  {author.bio}
                </p>

                {/* Social links */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {author.social.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 hover:border-orange-300 hover:text-orange-500 text-gray-600 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Twitter / X
                    </a>
                  )}
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 hover:border-orange-300 hover:text-orange-500 text-gray-600 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
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
                      className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 hover:border-orange-300 hover:text-orange-500 text-gray-600 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Stats bar */}
            {/* <div className="grid grid-cols-3 gap-0 border-t border-gray-100 mt-6 -mx-8">
              {[
                { value: authorPosts.length.toString(), label: "Articles" },
                { value: authorCategories.length.toString(), label: "Topics" },
                { value: `${totalReadTime}`, label: "Mins of reading" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={[
                    "py-5 text-center",
                    i > 0 ? "border-l border-gray-100" : "",
                  ].join(" ")}
                >
                  <p className="text-2xl font-black text-orange-500">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5 font-medium">{s.label}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* ── Posts section ── */}
      <div className="bg-gray-50 pt-10 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="w-[3px] h-6 rounded-full bg-orange-500 flex-shrink-0" />
              <h2 className="text-xl font-black text-gray-900">
                Articles by {author.name.split(" ")[0]}
              </h2>
            </div>
            {authorCategories.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-2">
                {authorCategories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Posts grid */}
          {authorPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <div className="text-4xl mb-4">✍️</div>
              <p className="text-gray-600 font-semibold mb-1">No posts yet</p>
              <p className="text-gray-400 text-sm">
                {author.name} hasn't published anything yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}