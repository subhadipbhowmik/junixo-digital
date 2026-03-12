import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Script from "next/script";

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


        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8L7F28GE8E"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8L7F28GE8E');
          `}
        </Script>

        {/* Microsoft Clarity Analytics */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "vu7j2oz6kc");
    `,
          }}
        />

        {/* Json LD structured data for SEO */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://junixo.com/#organization",
                  name: "Junixo",
                  url: "https://junixo.com",
                  logo: "https://junixo.com/logo.png",
                  sameAs: [
                    "https://twitter.com/junixolabs"
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    url: "https://junixo.com/contact"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://junixo.com/#website",
                  url: "https://junixo.com",
                  name: "Junixo",
                  publisher: {
                    "@id": "https://junixo.com/#organization"
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://junixo.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />


      </body>
    </html>
  );
}