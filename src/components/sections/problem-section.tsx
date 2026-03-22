"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

const PROBLEMS = [
  {
    mistake: "Picking roles based on trends",
    reality: "You end up preparing for a role that was never right for you.",
    variant: "blue",
  },
  {
    mistake: "Taking courses without context",
    reality: "You learn skills employers never asked for in your target role.",
    variant: "yellow",
  },
  {
    mistake: "Practising interviews without feedback",
    reality: "You repeat the same mistakes and never know where you stand.",
    variant: "yellow",
  },
  {
    mistake: "Applying without knowing your fit",
    reality: "You send hundreds of applications and hear nothing back.",
    variant: "blue",
  },
];

export function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full py-14 md:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F7F8FC" }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header — matches FAQ/services header pattern */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4"
            style={{ color: DARK }}
          >
            Sound familiar?{" "}
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
              Yeah, we thought so.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px]"
            style={{ color: "rgba(12,14,20,0.45)" }}
          >
            Most people prepare for careers through scattered effort. Here is what that actually looks like.
          </motion.p>
        </div>

        {/* Cards — FAQ-style neobrutalist cards with alternating colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {PROBLEMS.map((p, i) => {
            const isBlue = p.variant === "blue";
            return (
              <motion.div
                key={p.mistake}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }}
                className="rounded-2xl px-5 py-4 sm:px-6 sm:py-5"
                style={{
                  backgroundColor: isBlue ? BLUE : YELLOW,
                  boxShadow: `3px 3px 0px 0px ${isBlue ? "rgba(60,97,168,0.25)" : "rgba(245,209,52,0.3)"}`,
                }}
              >
                <p
                  className="text-[15px] sm:text-[17px] font-bold leading-snug mb-2"
                  style={{ color: isBlue ? YELLOW : BLUE }}
                >
                  {p.mistake}
                </p>
                <p
                  className="text-[13px] sm:text-[15px] leading-relaxed"
                  style={{
                    color: isBlue ? "rgba(245,209,52,0.85)" : "rgba(60,97,168,0.85)",
                  }}
                >
                  {p.reality}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center text-sm font-black mt-10"
          style={{ color: BLUE }}
        >
          There is a better way ↓
        </motion.p>

      </div>
    </section>
  );
}
