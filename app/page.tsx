import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

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
  return <HomePageClient />;
}