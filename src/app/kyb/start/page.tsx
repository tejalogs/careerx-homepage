import type { Metadata } from "next";
import KYBFlow from "@/components/kyb/kyb-flow";

export const metadata: Metadata = {
  title: "Know Yourself Better — CareerXcelerator",
  description: "A short discovery process that identifies roles that match your skills, interests, and career goals.",
};

export default function KYBStartPage() {
  return <KYBFlow />;
}
