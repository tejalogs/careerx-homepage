import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const caveat = Caveat({ subsets: ["latin"], variable: "--font-handwritten", display: "swap" });

export const metadata: Metadata = {
  title: "CareerXcelerator - Turn Career Uncertainty Into A Clear Path Forward",
  description: "CareerXcelerator helps you discover the right role, build job-ready skills, and confidently step into global career opportunities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={caveat.variable}>{children}</body>
    </html>
  );
}
