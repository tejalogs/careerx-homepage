import type { Metadata } from "next";
import KYBEntryPage from "@/components/kyb/kyb-entry-page";

export const metadata: Metadata = {
  title: "Find Your Best Role — CareerXcelerator",
  description:
    "A short discovery process that analyzes real job market data to identify roles that match your skills, interests, and career goals.",
  openGraph: {
    title: "Find Your Best Role — CareerXcelerator",
    description:
      "A short discovery process that analyzes real job market data to identify roles that match your skills, interests, and career goals.",
  },
};

export default function KYBPage() {
  return <KYBEntryPage />;
}
