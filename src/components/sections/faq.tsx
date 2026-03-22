"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ─── Brand ─────────────────────────────────────────────────────────────────────
const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

// ─── Data ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is CareerXcelerator?",
    a: "An AI-powered career platform that helps you find the right role, build the right skills, practice interviews, and land job offers. One system, four stages.",
    variant: "blue",
  },
  {
    q: "Is CareerXcelerator a job portal?",
    a: "No. We prepare you for the job, then connect you to it. Job portals list openings. We make sure you're actually ready for them.",
    variant: "yellow",
  },
  {
    q: "How does the platform help me find the right role?",
    a: "Start with a 10-minute assessment. We map your strengths against live job data and show you which roles are hiring, what they pay, and what they require.",
    variant: "yellow",
  },
  {
    q: "Is CareerXcelerator useful for career switchers?",
    a: "Yes. We identify which of your existing skills transfer, pinpoint what's missing, and build a preparation path for your new target role.",
    variant: "blue",
  },
  {
    q: "How is this different from courses or coaching?",
    a: "Courses teach skills without knowing which ones you need. We start with your target role, figure out what's missing, train you on that, then connect you to employers.",
    variant: "blue",
  },
  {
    q: "Can universities and institutions use CareerXcelerator?",
    a: "Yes. Universities can deploy career tracks across entire cohorts, track placement outcomes, and issue verified credentials at scale.",
    variant: "yellow",
  },
  {
    q: "How long does it take to get offer-ready?",
    a: "Depends on your plan. Builder gives you 1 month, Pro gives 3 months, Elite gives 6. Most candidates start getting interview callbacks within 4 to 8 weeks.",
    variant: "yellow",
  },
  {
    q: "What happens after I click Find My Best Role?",
    a: "You'll answer a few questions about your interests and experience. The system maps your profile against live job data and shows you which roles fit.",
    variant: "blue",
  },
];

// ─── FAQ Item ───────────────────────────────────────────────────────────────────
function FAQItem({
  faq,
  index,
  inView,
}: {
  faq: typeof FAQS[0];
  index: number;
  inView: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isBlue = faq.variant === "blue";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.33, 1, 0.68, 1] }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        className="w-full text-left rounded-2xl px-6 py-4 transition-all duration-300 group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        style={{
          backgroundColor: isBlue ? BLUE : YELLOW,
          boxShadow: open
            ? `4px 4px 0px 0px ${isBlue ? "rgba(60,97,168,0.35)" : "rgba(245,209,52,0.4)"}`
            : `3px 3px 0px 0px ${isBlue ? "rgba(60,97,168,0.25)" : "rgba(245,209,52,0.3)"}`,
        }}
      >
        {/* Question row */}
        <div className="flex items-center justify-between gap-4">
          <span
            className="text-[17px] font-bold leading-snug"
            style={{ color: isBlue ? YELLOW : BLUE }}
          >
            {faq.q}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0"
          >
            <ChevronDown
              className="w-5 h-5"
              style={{ color: isBlue ? YELLOW : BLUE, opacity: 0.7 }}
            />
          </motion.div>
        </div>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              id={`faq-answer-${index}`}
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="overflow-hidden"
            >
              <p
                className="text-[15px] leading-relaxed mt-3 pt-3"
                style={{
                  color: isBlue ? "rgba(245,209,52,0.85)" : "rgba(60,97,168,0.85)",
                  borderTop: `1px solid ${isBlue ? "rgba(245,209,52,0.2)" : "rgba(60,97,168,0.2)"}`,
                }}
              >
                {faq.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

// ─── FAQ Section ────────────────────────────────────────────────────────────────
export function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const left  = FAQS.filter((_, i) => i % 2 === 0);
  const right = FAQS.filter((_, i) => i % 2 === 1);

  return (
    <section className="w-full py-14 md:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F7F8FC" }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4"
            style={{ color: DARK }}
          >
            Questions?{" "}
            <span style={{ color: BLUE }}>Answered.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px]"
            style={{ color: "rgba(12,14,20,0.45)" }}
          >
            The short version of everything you're wondering.
          </motion.p>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {left.map((faq, i) => (
              <FAQItem
                key={faq.q}
                faq={faq}
                index={i * 2}
                inView={inView}
              />
            ))}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-4">
            {right.map((faq, i) => (
              <FAQItem
                key={faq.q}
                faq={faq}
                index={i * 2 + 1}
                inView={inView}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
