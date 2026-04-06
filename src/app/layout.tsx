import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const caveat = Caveat({ subsets: ["latin"], variable: "--font-handwritten", display: "swap" });

const SITE_URL = "https://careerx-homepage.vercel.app";

export const metadata: Metadata = {
  title: "CareerXcelerator — Your career, decoded.",
  description:
    "CareerXcelerator is a career intelligence platform powered by AI that maps your strengths to roles the market values, closes skill gaps, and gets you career-ready.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CareerXcelerator — Your career, decoded.",
    description:
      "CareerXcelerator is a career intelligence platform powered by AI that maps your strengths to roles the market values, closes skill gaps, and gets you career-ready.",
    url: SITE_URL,
    siteName: "CareerXcelerator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CareerXcelerator — Your career, decoded.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerXcelerator — Your career, decoded.",
    description:
      "CareerXcelerator is a career intelligence platform powered by AI that maps your strengths to roles the market values, closes skill gaps, and gets you career-ready.",
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
        "CareerXcelerator is a career intelligence platform powered by AI that maps your strengths to roles the market values, closes skill gaps, and gets you career-ready.",
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
