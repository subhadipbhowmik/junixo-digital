import type { Metadata } from "next";
import PPCGoogleAdsClient from "./Ppcgoogleadsclient";

export const metadata: Metadata = {
  title: "PPC & Google Ads Management Services",
  description:
    "Junixo's PPC and Google Ads management services drive high-intent traffic that converts. Expert campaign management across Search, Shopping, Display, YouTube, Performance Max and more.",
  openGraph: {
    title: "PPC & Google Ads Management Services | Junixo",
    description:
      "Stop wasting ad spend. Our Google Ads specialists build and manage campaigns that deliver measurable ROI — Search, Shopping, Display, YouTube and Performance Max.",
    url: "https://junixo.com/services/digital-marketing/ppc-google-ads",
  },
  twitter: {
    title: "PPC & Google Ads Management Services | Junixo",
    description:
      "Stop wasting ad spend. Our Google Ads specialists build and manage campaigns that deliver measurable ROI — Search, Shopping, Display, YouTube and Performance Max.",
  },
};

export default function PPCGoogleAdsPage() {
  return <PPCGoogleAdsClient />;
}