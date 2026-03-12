// components/blog/BlogCard.tsx
import Link from "next/link";
import { BlogPostMeta, formatDate } from "@/components/blog/types";
import Image from "next/image";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-52 flex-shrink-0 bg-gray-100">
        <Image
          src={
            post.featuredImage ||
            `https://placehold.co/800x450/fff7ed/f97316?text=${encodeURIComponent(
              post.title,
            )}`
          }
          alt={post.title}
          width={800}
          height={450}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {post.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="bg-white/90 backdrop-blur-sm text-gray-700 font-bold text-[11px] px-2.5 py-1 rounded-full border border-white/60 shadow-sm"
            >
              {cat}
            </span>
          ))}
        </div>
        {/* Read time */}
        <div className="absolute top-3 right-3">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {post.readTime} min
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Date */}
        <p className="text-gray-400 text-[11px] font-medium mb-3 flex items-center gap-1.5">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {formatDate(post.date)}
        </p>

        {/* Title */}
        <h3 className="text-gray-900 font-bold text-[17px] leading-snug mb-2.5 group-hover:text-orange-500 transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
          {post.description}
        </p>

        {/* CTA */}
        <span className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm group-hover:gap-3 transition-all duration-200">
          Read Article
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
