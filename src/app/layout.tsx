import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const caveat = Caveat({ subsets: ["latin"], variable: "--font-handwritten", display: "swap" });

const SITE_URL = "https://careerx-homepage.vercel.app";

export const metadata: Metadata = {
  title: "CareerXcelerator — Hiring, decoded.",
  description:
    "CareerXcelerator is a Career Acceleration Infrastructure powered by AI that guides you from career discovery to real job opportunities.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CareerXcelerator — Hiring, decoded.",
    description:
      "CareerXcelerator is a Career Acceleration Infrastructure powered by AI that guides you from career discovery to real job opportunities.",
    url: SITE_URL,
    siteName: "CareerXcelerator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CareerXcelerator — Hiring, decoded.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerXcelerator — Hiring, decoded.",
    description:
      "CareerXcelerator is a Career Acceleration Infrastructure powered by AI that guides you from career discovery to real job opportunities.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "CareerXcelerator",
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
      description:
        "Career Acceleration Infrastructure powered by AI that guides you from career discovery to real job opportunities.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      name: "CareerXcelerator",
      url: SITE_URL,
      description:
        "CareerXcelerator is a Career Acceleration Infrastructure powered by AI that guides you from career discovery to real job opportunities.",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={caveat.variable}>{children}</body>
    </html>
  );
}
