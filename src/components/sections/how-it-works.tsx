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
    description: "A 10-minute assessment that maps your strengths to roles hiring right now.",
    icon: Compass,
  },
  {
    stage: "Prepare",
    product: "Career Track",
    description: "A focused learning path that closes only the gaps your target employers care about.",
    icon: BookOpen,
  },
  {
    stage: "Validate",
    product: "Interview Simulator",
    description: "AI mock interviews with real questions and scored feedback before the real thing.",
    icon: Mic,
  },
  {
    stage: "Activate",
    product: "Career Activation",
    description: "Matched to open roles at 500+ companies based on your readiness and fit.",
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
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3"
            style={{ color: DARK }}
          >
            How you go from{" "}
            <span style={{ color: BLUE }}>unsure to unstoppable.</span>
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold text-white transition-all hover:opacity-85 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
