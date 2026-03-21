"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

const FEATURES = [
  "Deploy career tracks across entire cohorts",
  "Map skill gaps against live employer requirements",
  "Issue verified credentials backed by real assessments",
  "Track placement outcomes at institutional scale",
];

export function InstitutionPreviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="institutions"
      ref={ref}
      className="w-full py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden"
      style={{ backgroundColor: BLUE }}
    >
      {/* Background decoration — matches get-started pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        {/* Badge — matches get-started pattern */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <p className="text-[11px] font-black tracking-[0.25em] uppercase text-white">
            For Institutions
          </p>
        </motion.div>

        {/* Heading — matches get-started heading style with yellow marker */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.05] mb-6"
        >
          Career readiness for{" "}
          <span
            className="relative inline-block px-2"
            style={{
              backgroundColor: YELLOW,
              color: DARK,
              borderRadius: "6px",
              transform: "rotate(-0.8deg)",
              display: "inline-block",
            }}
          >
            your students.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12 px-2"
        >
          Universities, colleges, and training institutes use CareerXcelerator to deliver structured career preparation at scale — from assessment to placement.
        </motion.p>

        {/* Feature checklist — matches get-started trust points */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col items-center gap-3 mb-10"
        >
          {FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-sm text-white/65 font-medium">{f}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTA — yellow button matches get-started CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <a
            href="#get-started"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-black overflow-hidden transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-2xl"
            style={{ backgroundColor: YELLOW, color: DARK }}
          >
            <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
            <span className="relative z-10">Talk to Us</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
