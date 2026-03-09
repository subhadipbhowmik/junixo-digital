// root/app/admin/layout.tsx


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Belt-and-suspenders: inline meta tag in addition to metadata API */}
      <meta name="robots" content="noindex, nofollow" />
      {children}
    </>
  );
}