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
    a: "CareerXcelerator is a complete career readiness platform that takes candidates from self-discovery to offer-ready. It covers role assessment, skill development, AI mentoring, interview simulation and live job matching in one structured programme.",
    variant: "blue",
  },
  {
    q: "Is CareerXcelerator a job portal?",
    a: "No. We are a career preparation platform, not a job board. We give you the skills, credentials and interview readiness needed to succeed across any portal or direct employer pipeline, including our 500+ hiring partner network.",
    variant: "yellow",
  },
  {
    q: "How does CareerXcelerator help students get jobs?",
    a: "We close the gap between education and employment through structured role tracks, AI-powered coaching, resume optimisation, and mock interviews. Candidates leave with validated credentials that signal real readiness to hiring managers.",
    variant: "yellow",
  },
  {
    q: "Is CareerXcelerator useful for career switchers?",
    a: "Absolutely. Our KYB assessment identifies the roles that fit your transferable strengths and our gap analysis shows exactly what to close. Many of our 2,000+ placed candidates were mid-career switchers.",
    variant: "blue",
  },
  {
    q: "How is CareerXcelerator different from online courses and coaching?",
    a: "Traditional courses give content. We give a structured career track tied to real employer requirements. Our AI mentor is available 24/7 and every session is scored. We do not just surface roles. We make you ready for them.",
    variant: "blue",
  },
  {
    q: "Can universities and institutions use CareerXcelerator?",
    a: "Yes. We offer institutional licences that let universities deploy career tracks, run cohort-wide gap analysis, issue verifiable credentials, and track placement outcomes, all under your own brand.",
    variant: "yellow",
  },
  {
    q: "How long does it take to get offer-ready?",
    a: "It depends on the plan. Career Builder is a 1 month activation track. Career Pro runs 3 months of full prep. Career Elite covers 6 months with multi-role support. Most candidates see interview callbacks within 4 to 8 weeks of active preparation.",
    variant: "yellow",
  },
  {
    q: "What happens after I purchase a plan?",
    a: "You will start with the KYB role assessment to identify your ideal track, then receive a personalised skill roadmap, access to your AI mentor, interview simulator sessions and daily job updates, all within the CareerXcelerator dashboard.",
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
        className="w-full text-left rounded-2xl px-6 py-4 transition-all duration-300 group"
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
            className="font-handwritten text-[17px] font-bold leading-snug"
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="overflow-hidden"
            >
              <p
                className="font-handwritten text-[15px] leading-relaxed mt-3 pt-3"
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
            className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4"
            style={{ color: DARK }}
          >
            Frequently{" "}
            <span style={{ color: BLUE }}>Asked Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px]"
            style={{ color: "rgba(12,14,20,0.45)" }}
          >
            Everything you need to know before you take the first step.
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
