import type { Metadata } from "next";
import RobotsTxtGeneratorClient from "./Robotstxtgeneratorclient";

export const metadata: Metadata = {
  title: "Free Robots.txt Generator | Junixo",
  description:
    "Generate a valid robots.txt file instantly — free, no sign-up required. Choose a preset, configure per-bot Allow and Disallow rules, add your sitemap URL, then download or copy your robots.txt ready to upload.",
  openGraph: {
    title: "Free Robots.txt Generator | Junixo",
    description:
      "Generate a valid robots.txt file instantly. Configure bot rules, block private pages, add your sitemap URL, then download your robots.txt — free tool by Junixo.",
    url: "https://junixo.com/tools/robots-txt-generator",
  },
  twitter: {
    title: "Free Robots.txt Generator | Junixo",
    description:
      "Generate a valid robots.txt file instantly. Configure bot rules, block private pages, add your sitemap URL, then download your robots.txt — free tool by Junixo.",
  },
};

export default function RobotsTxtGeneratorPage() {
  return <RobotsTxtGeneratorClient />;
}