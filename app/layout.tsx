import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Digital Marketing, SEO & Web Development Company | Junixo",
    template: "%s | Junixo",
  },
  description:
    "Junixo is a results-driven digital agency specialising in SEO, web development, paid media, and brand strategy. We help businesses grow online.",
  metadataBase: new URL("https://junixo.com"),
  openGraph: {
    title: "Junixo — Digital Agency",
    description:
      "Results-driven digital agency helping businesses grow online through SEO, web development, and brand strategy.",
    url: "https://junixo.com",
    siteName: "Junixo",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Junixo — Digital Agency",
    description:
      "Results-driven digital agency helping businesses grow online through SEO, web development, and brand strategy.",
    creator: "@junixolabs",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* tawk.to chat widget script */}

        <Script id="tawk-to" strategy="afterInteractive">
          {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/69ac7d1449df9f1c304b92a0/1jj4sh65s';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
          `}
        </Script>

      </body>
    </html>
  );
}