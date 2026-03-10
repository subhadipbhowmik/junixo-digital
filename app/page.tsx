// app/page.tsx  — Server Component
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import HomePageClient, { type BlogPostPreview } from "./HomePageClient";

export const metadata: Metadata = {
  title: {
    absolute: "Digital Marketing, SEO & Web Development Company | Junixo",
  },
  description:
    "Junixo is a results-driven digital agency specialising in SEO, web development, paid media, and brand strategy. We help businesses grow online.",
  openGraph: {
    title: "Junixo — Digital Agency",
    description:
      "Results-driven digital agency helping businesses grow online through SEO, web development, and brand strategy.",
    url: "https://junixo.com",
  },
  twitter: {
    title: "Junixo — Digital Agency",
    description:
      "Results-driven digital agency helping businesses grow online through SEO, web development, and brand strategy.",
  },
};

export default function HomePage() {
  // getAllPosts() reads your markdown files — runs on the server at build/request time.
  // We map to only the fields BlogSection needs so no serialisation issues with
  // extra fields (e.g. full MDX content) that aren't plain-serialisable.
  const rawPosts = getAllPosts();

  const blogPosts: BlogPostPreview[] = rawPosts.slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    // Support both `excerpt` and `description` field names
    excerpt: (post as any).excerpt ?? (post as any).description ?? "",
    // Support ISO dates or pre-formatted strings
    date:
      (post as any).date
        ? typeof (post as any).date === "string"
          ? (post as any).date
          : new Date((post as any).date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
        : "",
    readTime: (post as any).readTime ?? (post as any).read_time ?? undefined,
    // Support both `category` (string) and `categories`/`tags` (array)
    category:
      (post as any).category ??
      ((post as any).categories?.[0] ?? (post as any).tags?.[0] ?? undefined),
    // Support both `coverImage`, `image`, `heroImage`, `ogImage.url`
    coverImage:
      (post as any).coverImage ??
      (post as any).image ??
      (post as any).heroImage ??
      (post as any).ogImage?.url ??
      undefined,
  }));

  return <HomePageClient blogPosts={blogPosts} />;
}