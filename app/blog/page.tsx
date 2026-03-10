// app/blog/page.tsx
import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
  title: "Blog - Digital Marketing, SEO & Web Development",
  description:
    "Expert guides on digital marketing, SEO, web development and app development - written by the Junixo Digital team.",
  openGraph: {
    title: "Blog | Junixo Digital",
    description: "Expert digital marketing, SEO and web development guides.",
    images: [
      {
        url: "https://placehold.co/1200x630/111827/f97316?text=Junixo+Blog",
      },
    ],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gray-900 pt-20 pb-16">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #f97316 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500 rounded-full opacity-[0.08] blur-3xl pointer-events-none" style={{ transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-400 rounded-full opacity-[0.07] blur-3xl pointer-events-none" style={{ transform: "translate(-30%,30%)" }} />
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">
              Insights &amp; Guides
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-5">
            The Junixo{" "}
            <span className="text-orange-500">Blog</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Expert strategies on digital marketing, SEO, web development, and
            growth - written by practitioners who do it every day.
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {[
              { value: posts.length.toString(), label: "Articles" },
              { value: categories.length.toString(), label: "Topics" },
              { value: "Free", label: "Always" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={[
                  "px-7 py-4 text-center",
                  i > 0 ? "border-l border-white/10" : "",
                ].join(" ")}
              >
                <p className="text-2xl font-black text-orange-500">{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="bg-gray-50 min-h-screen pt-2">
        <BlogListClient posts={posts} categories={categories} />
      </div>
    </>
  );
}