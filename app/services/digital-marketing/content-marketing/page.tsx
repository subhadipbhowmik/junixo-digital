import type { Metadata } from "next";
import ContentMarketingClient from "./Contentmarketingclient";

export const metadata: Metadata = {
  title: "Content Marketing Services | Junixo",
  description:
    "Junixo's content marketing services build your authority, drive organic traffic and generate leads. Expert content strategy, SEO writing, case studies, guides and full content management.",
  openGraph: {
    title: "Content Marketing Services | Junixo",
    description:
      "Stop publishing content that goes nowhere. Our content strategists and writers create SEO-optimised content that ranks, converts and compounds — turning your blog into a lead generation machine.",
    url: "https://junixo.com/services/digital-marketing/content-marketing",
  },
  twitter: {
    title: "Content Marketing Services | Junixo",
    description:
      "Stop publishing content that goes nowhere. Our content strategists and writers create SEO-optimised content that ranks, converts and compounds — turning your blog into a lead generation machine.",
  },
};

export default function ContentMarketingPage() {
  return <ContentMarketingClient />;
}