import type { Metadata } from "next";
import PortfolioPageClient from "./Portfoliopageclient";

export const metadata: Metadata = {
  title: {
    absolute: "Portfolio | Junixo — Real Results for Real Businesses",
  },
  description:
    "Explore Junixo's portfolio across digital marketing, SEO, web development, and app development. Discover real case studies and measurable growth for businesses.",
  openGraph: {
    title: "Portfolio | Junixo Digital Agency",
    description:
      "See how Junixo helps brands grow with data-driven digital marketing, SEO, web development, and app development.",
    url: "https://junixo.com/portfolio",
  },
  twitter: {
    title: "Portfolio | Junixo Digital Agency",
    description:
      "Explore Junixo's portfolio and discover real results from SEO, digital marketing, web development, and app development projects.",
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}