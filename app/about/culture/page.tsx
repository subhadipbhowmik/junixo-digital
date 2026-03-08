import type { Metadata } from "next";
import CulturePageClient from "./CulturePageClient";

export const metadata: Metadata = {
  title: "Culture & Values",
  description:
    "Discover what life at Junixo is really like — our core values, team perks, remote-first culture, diversity commitments, and how we hire.",
  openGraph: {
    title: "Culture & Values | Junixo",
    description:
      "People-first culture, radical transparency, and a team that genuinely loves what they do. See what makes Junixo different from the inside.",
    url: "https://junixo.com/about/culture",
  },
  twitter: {
    title: "Culture & Values | Junixo",
    description:
      "People-first culture, radical transparency, and a team that genuinely loves what they do. See what makes Junixo different from the inside.",
  },
};

export default function CulturePage() {
  return <CulturePageClient />;
}