import type { Metadata } from "next";
import KYBEntryPage from "@/components/kyb/kyb-entry-page";

export const metadata: Metadata = {
  title: "Know Your Career Fit — CareerXcelerator",
  description:
    "A quick assessment built on real market data. See which roles fit your strengths and what to build next.",
  openGraph: {
    title: "Know Your Career Fit — CareerXcelerator",
    description:
      "A quick assessment built on real market data. See which roles fit your strengths and what to build next.",
  },
};

export default function KYBPage() {
  return <KYBEntryPage />;
}
