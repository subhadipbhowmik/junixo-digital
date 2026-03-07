// lib/blog.ts
import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  categories: string[];
  featuredImage: string;
  ogImage?: string;
  readTime: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function calcReadTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);

      const categories: string[] = Array.isArray(data.categories)
        ? data.categories.filter((c: unknown) => typeof c === "string")
        : typeof data.categories === "string"
        ? [data.categories]
        : ["General"];

      return {
        slug,
        title: typeof data.title === "string" ? data.title : "Untitled",
        description:
          typeof data.description === "string" ? data.description : "",
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        author:
          typeof data.author === "string" ? data.author : "junixo-team",
        categories,
        featuredImage:
          typeof data.featuredImage === "string"
            ? data.featuredImage
            : `https://placehold.co/800x450/fff7ed/f97316?text=${encodeURIComponent(
                typeof data.title === "string" ? data.title : "Post"
              )}`,
        ogImage:
          typeof data.ogImage === "string" ? data.ogImage : undefined,
        readTime: calcReadTime(content),
      } satisfies BlogPostMeta;
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | null {
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const categories: string[] = Array.isArray(data.categories)
      ? data.categories.filter((c: unknown) => typeof c === "string")
      : typeof data.categories === "string"
      ? [data.categories]
      : ["General"];

    return {
      slug,
      title: typeof data.title === "string" ? data.title : "Untitled",
      description:
        typeof data.description === "string" ? data.description : "",
      date: data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString(),
      author:
        typeof data.author === "string" ? data.author : "junixo-team",
      categories,
      featuredImage:
        typeof data.featuredImage === "string"
          ? data.featuredImage
          : `https://placehold.co/1200x630/fff7ed/f97316?text=${encodeURIComponent(
              typeof data.title === "string" ? data.title : "Post"
            )}`,
      ogImage:
        typeof data.ogImage === "string" ? data.ogImage : undefined,
      readTime: calcReadTime(content),
      content,
    };
  }
  return null;
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  getAllPosts().forEach((p) =>
    p.categories.forEach((c) => {
      if (typeof c === "string" && c.trim()) cats.add(c.trim());
    })
  );
  return Array.from(cats).sort();
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  if (!category) return [];
  return getAllPosts().filter((p) =>
    p.categories.some(
      (c) => c.toLowerCase() === category.toLowerCase()
    )
  );
}

export function getRelatedPosts(
  currentSlug: string,
  categories: string[],
  limit = 3
): BlogPostMeta[] {
  return getAllPosts()
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.categories.some((c) =>
          categories.some(
            (cat) => cat.toLowerCase() === c.toLowerCase()
          )
        )
    )
    .slice(0, limit);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}