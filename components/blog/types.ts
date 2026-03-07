// components/blog/types.ts
// Shared types for client components — NO server-only imports here

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

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}