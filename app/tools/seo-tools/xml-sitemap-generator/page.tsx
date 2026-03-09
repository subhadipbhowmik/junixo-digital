import type { Metadata } from "next";
import XMLSitemapGeneratorClient from "./XMLSitemapGeneratorClient";

export const metadata: Metadata = {
  title: "Free XML Sitemap Generator | Junixo",
  description:
    "Generate a valid XML sitemap instantly — free, no sign-up required. Paste your URLs, set change frequency and priority, then download or copy your sitemap.xml ready for Google Search Console.",
  openGraph: {
    title: "Free XML Sitemap Generator | Junixo",
    description:
      "Generate a valid XML sitemap instantly. Add your URLs, configure priorities and change frequencies, then download your sitemap.xml — free tool by Junixo.",
    url: "https://junixo.com/tools/xml-sitemap-generator",
  },
  twitter: {
    title: "Free XML Sitemap Generator | Junixo",
    description:
      "Generate a valid XML sitemap instantly. Add your URLs, configure priorities and change frequencies, then download your sitemap.xml — free tool by Junixo.",
  },
};

export default function XMLSitemapGeneratorPage() {
  return <XMLSitemapGeneratorClient />;
}