"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const LOGOS = [
  { name: "Google",      domain: "google.com" },
  { name: "Microsoft",   domain: "microsoft.com" },
  { name: "Amazon",      domain: "amazon.com" },
  { name: "Meta",        domain: "meta.com" },
  { name: "Salesforce",  domain: "salesforce.com" },
  { name: "Adobe",       domain: "adobe.com" },
  { name: "Stripe",      domain: "stripe.com" },
  { name: "LinkedIn",    domain: "linkedin.com" },
  { name: "Spotify",     domain: "spotify.com" },
  { name: "Atlassian",   domain: "atlassian.com" },
  { name: "Shopify",     domain: "shopify.com" },
  { name: "Databricks",  domain: "databricks.com" },
];

// ─── Company Logo with error fallback ─────────────────────────────────────────
function CompanyLogo({ name, domain }: { name: string; domain: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span
        style={{
          fontSize: "9px",
          fontWeight: 800,
          color: "rgba(12,14,20,0.4)",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {name}
      </span>
    );
  }

  return (
    <Image
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      width={40}
      height={40}
      className="w-full h-full object-contain"
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}

// ─── Company Logo Marquee ─────────────────────────────────────────────────────
export function CompanyLogosSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="w-full py-16 overflow-hidden bg-white border-t border-gray-100">
      <style jsx>{`
        @keyframes logoScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10 px-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(60,97,168,0.45)" }}
          >
            Trusted by candidates from global leaders
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-xl md:text-2xl font-black tracking-tight"
            style={{ color: "#0C0E14" }}
          >
            Where our candidates landed
          </motion.h2>
        </div>

        {/* Marquee */}
        <div className="relative w-full">
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #fff, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #fff, transparent)" }}
          />

          <div
            className="flex items-center gap-8 w-max py-2"
            style={{ animation: "logoScroll 36s linear infinite" }}
          >
            {doubled.map((logo, i) => (
              <div
                key={i}
                className="shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 transition-all duration-300 hover:scale-110"
                style={{
                  boxShadow: "0 1px 8px rgba(12,14,20,0.08)",
                  border: "1px solid rgba(12,14,20,0.06)",
                }}
                title={logo.name}
              >
                  <CompanyLogo name={logo.name} domain={logo.domain} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex flex-col items-center"
          >
            <a
              href="/kyb"
              className="group relative flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-black overflow-hidden transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: "#F5D134", color: "#0C0E14" }}
            >
              <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-4 text-xs font-medium" style={{ color: "rgba(12,14,20,0.4)" }}>
              Join <span className="font-black" style={{ color: "#0C0E14" }}>2,000+</span> candidates already on track
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
