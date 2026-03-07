// app/authors/page.tsx
import type { Metadata } from "next";
import { authors } from "@/data/authors";
import { getAllPosts } from "@/lib/blog";
import AuthorsClient from "@/components/blog/AuthorsClient";

export const metadata: Metadata = {
  title: "Meet Our Authors | Junixo Digital Blog",
  description:
    "Meet the strategists, developers, and marketers behind the Junixo Digital blog. Expert writers covering SEO, paid ads, web development, and digital growth.",
  openGraph: {
    title: "Meet Our Authors | Junixo Digital",
    description: "The experts behind Junixo Digital's blog.",
  },
};

export default function AuthorsPage() {
  const allPosts = getAllPosts();

  // Build enriched author data with post counts and categories
  const enrichedAuthors = Object.values(authors).map((author) => {
    const posts = allPosts.filter((p) => p.author === author.id);
    const categories = Array.from(
      new Set(posts.flatMap((p) => p.categories))
    ).sort();
    const totalReadTime = posts.reduce((sum, p) => sum + p.readTime, 0);
    const latestPost = posts[0] ?? null;
    return { ...author, postCount: posts.length, categories, totalReadTime, latestPost };
  });

  return <AuthorsClient authors={enrichedAuthors} />;
}