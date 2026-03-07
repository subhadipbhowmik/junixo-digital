// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog";
import { authors } from "@/data/authors";
import { extractToc } from "@/lib/toc";
import { mdxComponents } from "@/components/blog/mdx-components";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import SidebarCta from "@/components/blog/SidebarCta";

/* ─── Static params ─── */
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

/* ─── SEO Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Junixo Digital" };

  const ogImage = post.ogImage ?? post.featuredImage;
  return {
    title: `${post.title} | Junixo Digital Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

/* ─── Page ─── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = authors[post.author] ?? authors["junixo-team"];
  const related = getRelatedPosts(post.slug, post.categories);
  const toc = extractToc(post.content);
  const shareUrl = `https://junixo.com/blog/${post.slug}`;

  return (
    <article className="bg-white min-h-screen">

      {/* ── Header strip ── */}
      <div className="bg-gray-50 border-b border-gray-200 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-orange-500 transition-colors font-medium">
              Home
            </Link>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <Link href="/blog" className="hover:text-orange-500 transition-colors font-medium">
              Blog
            </Link>
            {post.categories[0] && (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <Link
                  href={`/categories/${post.categories[0].toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-orange-500 transition-colors font-medium"
                >
                  {post.categories[0]}
                </Link>
              </>
            )}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="text-gray-600 font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </nav>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-full transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-gray-900 leading-[1.08] tracking-tight mb-6 max-w-4xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
            <div className="flex items-center gap-2.5">
              <img
                src={author.avatar}
                alt={author.name}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-100"
              />
              <div>
                <p className="font-bold text-gray-800 text-sm leading-none">
                  {author.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{author.role}</p>
              </div>
            </div>

            <span className="text-gray-200 hidden sm:inline">|</span>

            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(post.date)}
            </span>

            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">

          {/* ── Left column: post content (3/4) ── */}
          <div className="flex-1 min-w-0">

            {/* Featured image */}
            <div className="rounded-2xl overflow-hidden mb-10 shadow-sm bg-gray-100">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full object-cover max-h-[500px]"
              />
            </div>

            {/* Lead description */}
            {post.description && (
              <p className="text-lg text-gray-600 leading-relaxed font-medium border-l-4 border-orange-400 pl-5 py-3 mb-8 bg-orange-50/50 rounded-r-xl">
                {post.description}
              </p>
            )}

            {/* MDX rendered content */}
            <div className="blog-content">
              <MDXRemote
                source={post.content}
                components={mdxComponents as any}
              />
            </div>

            {/* Author card */}
            <AuthorCard author={author} />

            {/* Related posts */}
            <RelatedPosts posts={related} />
          </div>

          {/* ── Right sidebar (1/4) ── */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">

              {/* Table of contents */}
              <TableOfContents items={toc} />

              {/* CTA block */}
              <SidebarCta />

              {/* Share */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-[3px] h-4 rounded-full bg-orange-500 inline-block flex-shrink-0" />
                  Share This Post
                </p>
                <div className="flex gap-2">
                  {[
                    {
                      label: "X / Twitter",
                      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                    },
                    {
                      label: "LinkedIn",
                      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`,
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Facebook",
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${s.label}`}
                      className="flex-1 flex items-center justify-center py-2.5 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-gray-500 hover:text-orange-500 rounded-xl transition-all duration-200"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Back link */}
              <Link
                href="/blog"
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}