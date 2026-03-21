"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, BookOpen, Mic, Rocket, ArrowRight } from "lucide-react";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

const STEPS = [
  {
    stage: "Discover",
    product: "Know Yourself Better",
    description: "Find which roles fit your strengths using real job market data.",
    icon: Compass,
  },
  {
    stage: "Prepare",
    product: "Career Track",
    description: "Close skill gaps with structured learning built for your target role.",
    icon: BookOpen,
  },
  {
    stage: "Validate",
    product: "Interview Simulator",
    description: "Measure your readiness through AI-powered interview simulations.",
    icon: Mic,
  },
  {
    stage: "Activate",
    product: "Career Activation",
    description: "Connect with job opportunities matched to your profile and readiness.",
    icon: Rocket,
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="w-full py-14 md:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F7F8FC" }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header — matches services section header style */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(60,97,168,0.45)" }}
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3"
            style={{ color: DARK }}
          >
            Four stages.{" "}
            <span style={{ color: BLUE }}>One structured system.</span>
          </motion.h2>
        </div>

        {/* Cards — matches services card style (white, subtle border, hover lift) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }}
                className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col hover:-translate-y-1 transition-transform duration-300 relative"
                style={{
                  border: "1px solid rgba(12,14,20,0.07)",
                  boxShadow: "0 2px 12px rgba(12,14,20,0.05)",
                }}
              >
                {/* Icon — yellow bg, dark icon (matches services) */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                  style={{ backgroundColor: YELLOW }}
                >
                  <Icon className="w-5 h-5" style={{ color: DARK }} />
                </div>

                {/* Stage label */}
                <p
                  className="text-[10px] font-black tracking-[0.22em] uppercase mb-1"
                  style={{ color: "rgba(60,97,168,0.55)" }}
                >
                  {step.stage}
                </p>

                {/* Product name */}
                <h3 className="text-[14px] font-black mb-1.5 leading-snug" style={{ color: BLUE }}>
                  {step.product}
                </h3>

                {/* Description */}
                <p
                  className="text-[12px] leading-relaxed flex-1"
                  style={{ color: "rgba(12,14,20,0.5)" }}
                >
                  {step.description}
                </p>

                {/* Connector arrow (desktop only, not on last) */}
                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA — matches pricing CTA style */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center mt-10"
        >
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold text-white transition-all hover:opacity-85 active:scale-95"
            style={{ backgroundColor: BLUE }}
          >
            Find My Best Role
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
