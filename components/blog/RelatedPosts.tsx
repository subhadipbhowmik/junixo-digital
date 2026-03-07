// components/blog/RelatedPosts.tsx
import Link from "next/link";
import { BlogPostMeta, formatDate } from "@/components/blog/types";

export default function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-14 pt-10 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-[3px] h-6 rounded-full bg-orange-500 flex-shrink-0" />
        <h2 className="text-xl font-black text-gray-900">Related Articles</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
          >
            <div className="overflow-hidden h-40 bg-gray-100">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex flex-wrap gap-1 mb-2">
                {post.categories.slice(0, 2).map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h3 className="text-gray-900 font-bold text-sm leading-snug mb-2 flex-1 group-hover:text-orange-500 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <span className="text-gray-400 text-xs">{formatDate(post.date)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}