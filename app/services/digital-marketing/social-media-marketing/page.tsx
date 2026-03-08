import type { Metadata } from "next";
import SocialMediaMarketingClient from "./SocialMediaMarketingClient";

export const metadata: Metadata = {
  title: "Social Media Marketing Services",
  description:
    "Junixo's social media marketing services grow your brand, drive engagement, and convert followers into customers. Expert strategies across Instagram, Facebook, TikTok, LinkedIn and more.",
  openGraph: {
    title: "Social Media Marketing Services | Junixo",
    description:
      "Grow your brand with data-driven social media marketing. We manage, create, and scale your social presence across every major platform.",
    url: "https://junixo.com/services/digital-marketing/social-media-marketing",
  },
  twitter: {
    title: "Social Media Marketing Services | Junixo",
    description:
      "Grow your brand with data-driven social media marketing. We manage, create, and scale your social presence across every major platform.",
  },
};

export default function SocialMediaMarketingPage() {
  return <SocialMediaMarketingClient />;
}