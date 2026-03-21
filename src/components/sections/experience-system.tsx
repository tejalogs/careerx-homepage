"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, BarChart3, MessageSquare, Briefcase, ArrowRight } from "lucide-react";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

const JOURNEY = [
  {
    icon: Search,
    title: "Start with KYB",
    description: "Answer a few questions about your interests and goals. The system maps your strengths against live job market data.",
    tag: "10 min · Free",
  },
  {
    icon: BarChart3,
    title: "See your skill gaps",
    description: "Get a clear picture of what employers screen for — and exactly where you need to improve for your target role.",
    tag: "Personalised report",
  },
  {
    icon: MessageSquare,
    title: "Try an AI interview",
    description: "Experience a role-specific interview simulation. Get scored feedback on structure, delivery, and content.",
    tag: "AI-scored",
  },
  {
    icon: Briefcase,
    title: "Explore matched jobs",
    description: "See opportunities aligned to your profile. Apply with a resume optimised for your target role.",
    tag: "500+ partners",
  },
];

export function ExperienceSystemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full py-14 md:py-24 px-4 sm:px-6" style={{ backgroundColor: "#fff" }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header — matches mission-vision header */}
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
            Experience the System
          </p>
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight"
            style={{ color: DARK }}
          >
            See how it works.{" "}
            <span style={{ color: BLUE }}>Before you commit.</span>
          </h2>
        </motion.div>

        {/* Cards — mission-vision card style (white bg, blue-tinted border, dividers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JOURNEY.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                className="bg-white rounded-2xl p-5 sm:p-7 flex flex-col gap-4"
                style={{
                  border: "1px solid rgba(60,97,168,0.08)",
                  boxShadow: "0 2px 16px rgba(12,14,20,0.04)",
                }}
              >
                {/* Icon + eyebrow — matches mission-vision */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: YELLOW }}
                  >
                    <Icon className="w-4 h-4" style={{ color: DARK }} />
                  </div>
                  <p
                    className="text-[10px] font-black tracking-[0.22em] uppercase"
                    style={{ color: "rgba(60,97,168,0.55)" }}
                  >
                    Step {i + 1}
                  </p>
                </div>

                {/* Title */}
                <h3
                  className="text-[18px] font-black leading-snug tracking-tight"
                  style={{ color: DARK }}
                >
                  {item.title}
                </h3>

                {/* Divider — matches mission-vision */}
                <div className="h-px" style={{ backgroundColor: "rgba(60,97,168,0.07)" }} />

                {/* Description */}
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "rgba(10,22,40,0.5)" }}
                >
                  {item.description}
                </p>

                {/* Tag */}
                <div
                  className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(60,97,168,0.06)", border: "1px solid rgba(60,97,168,0.1)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BLUE }} />
                  <p className="text-[10px] font-bold" style={{ color: BLUE }}>{item.tag}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
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
          <p className="text-[11px] mt-3" style={{ color: "rgba(12,14,20,0.3)" }}>
            Free to start · No commitment
          </p>
        </motion.div>

      </div>
    </section>
  );
}
