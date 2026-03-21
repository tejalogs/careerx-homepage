"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

const WITHOUT = [
  "Low placement rates despite high enrollment",
  "No visibility into why graduates aren't getting hired",
  "Career cells run on spreadsheets and manual follow-ups",
  "Employers don't trust your graduates' readiness signals",
];

const WITH = [
  "Every student assessed, tracked, and prepared for real roles",
  "Live dashboards showing skill gaps, readiness, and placement rates",
  "Automated career tracks that run across entire cohorts",
  "Verified credentials employers actually trust at the hiring table",
];

export function InstitutionDetailSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="institutions" className="w-full py-14 md:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F7F8FC" }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(60,97,168,0.45)" }}
          >
            For Universities & Institutions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3"
            style={{ color: DARK }}
          >
            Your placement cell is{" "}
            <span style={{ color: BLUE }}>stretched thin.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px] max-w-xl mx-auto"
            style={{ color: "rgba(12,14,20,0.45)" }}
          >
            You have thousands of students, a handful of career advisors, and employers who expect job-ready graduates. Here is what changes with CareerXcelerator.
          </motion.p>
        </div>

        {/* Without / With comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Without */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="rounded-2xl p-4 sm:p-5 md:p-7 flex flex-col gap-3 sm:gap-4"
            style={{
              border: "1px solid rgba(12,14,20,0.07)",
              boxShadow: "0 2px 16px rgba(12,14,20,0.04)",
              backgroundColor: "#fff",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(239,68,68,0.08)" }}
              >
                <X className="w-4 h-4" style={{ color: "#ef4444" }} />
              </div>
              <p
                className="text-[10px] font-black tracking-[0.22em] uppercase"
                style={{ color: "#ef4444" }}
              >
                Without CareerXcelerator
              </p>
            </div>
            <div className="h-px" style={{ backgroundColor: "rgba(239,68,68,0.1)" }} />
            <div className="flex flex-col gap-3">
              {WITHOUT.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
                    <X className="w-2.5 h-2.5" style={{ color: "#ef4444" }} />
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(12,14,20,0.55)" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="rounded-2xl p-4 sm:p-5 md:p-7 flex flex-col gap-3 sm:gap-4"
            style={{
              border: `2px solid ${BLUE}`,
              boxShadow: `4px 4px 0px 0px rgba(60,97,168,0.2)`,
              backgroundColor: "#fff",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: YELLOW }}
              >
                <Check className="w-4 h-4" style={{ color: DARK }} />
              </div>
              <p
                className="text-[10px] font-black tracking-[0.22em] uppercase"
                style={{ color: BLUE }}
              >
                With CareerXcelerator
              </p>
            </div>
            <div className="h-px" style={{ backgroundColor: "rgba(60,97,168,0.1)" }} />
            <div className="flex flex-col gap-3">
              {WITH.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5" style={{ borderColor: BLUE }}>
                    <Check className="w-2.5 h-2.5" style={{ color: BLUE }} />
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(12,14,20,0.55)" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center mt-10"
        >
          <a
            href="#institutions"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold text-white transition-all hover:opacity-85 active:scale-95"
            style={{ backgroundColor: BLUE }}
          >
            Talk to Us
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[11px] mt-3" style={{ color: "rgba(12,14,20,0.3)" }}>
            Custom deployment for universities, colleges, and training institutes
          </p>
        </motion.div>

      </div>
    </section>
  );
}
