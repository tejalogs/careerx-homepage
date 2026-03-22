"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crosshair, Globe } from "lucide-react";

const BLUE  = "#3C61A8";
const DARK  = "#0A1628";

const CARDS = [
  {
    id: "mission",
    icon: Crosshair,
    eyebrow: "Our Mission",
    headline: "End the guesswork. Start the system.",
    body: "Too many people pick roles based on trends, take courses that don't match employer expectations, and apply without knowing if they fit. We built a system that replaces all of that with clarity.",
  },
  {
    id: "vision",
    icon: Globe,
    eyebrow: "Our Vision",
    headline: "A world where readiness decides who gets hired.",
    body: "We're building toward a hiring system where verified preparation matters more than pedigree. Where opportunity goes to those who are genuinely ready — not just well-connected.",
  },
];

export function MissionVisionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full py-14 md:py-20 px-4 sm:px-6" style={{ backgroundColor: "#F7F8FC" }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-2"
            style={{ color: "rgba(60,97,168,0.45)" }}
          >
            Why We Exist
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight"
            style={{ color: DARK }}
          >
            Why we built{" "}
            <span style={{ color: BLUE }}>CareerXcelerator.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="bg-white rounded-2xl p-5 sm:p-7 flex flex-col gap-4"
                style={{
                  border: "1px solid rgba(60,97,168,0.08)",
                  boxShadow: "0 2px 16px rgba(12,14,20,0.04)",
                }}
              >
                {/* Icon + eyebrow */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(60,97,168,0.08)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: BLUE }} />
                  </div>
                  <p
                    className="text-[10px] font-black tracking-[0.22em] uppercase"
                    style={{ color: "rgba(60,97,168,0.55)" }}
                  >
                    {card.eyebrow}
                  </p>
                </div>

                {/* Headline */}
                <h3
                  className="text-[18px] font-black leading-snug tracking-tight"
                  style={{ color: DARK }}
                >
                  {card.headline}
                </h3>

                {/* Divider */}
                <div className="h-px" style={{ backgroundColor: "rgba(60,97,168,0.07)" }} />

                {/* Body */}
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "rgba(10,22,40,0.5)" }}
                >
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
