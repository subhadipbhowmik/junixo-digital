import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Junixo — who we are, what we believe, and why 120+ clients trust us to grow their businesses online. Meet the team behind the results.",
  openGraph: {
    title: "About Us | Junixo",
    description:
      "Learn the story behind Junixo — who we are, what we believe, and why 120+ clients trust us to grow their businesses online.",
    url: "https://junixo.com/about",
  },
  twitter: {
    title: "About Us | Junixo",
    description:
      "Learn the story behind Junixo — who we are, what we believe, and why 120+ clients trust us to grow their businesses online.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}