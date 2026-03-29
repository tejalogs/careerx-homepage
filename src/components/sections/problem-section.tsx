"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send, BookOpen, Mic, XCircle, HelpCircle, BarChart3, TrendingUp,
} from "lucide-react";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

/* ─── problem data ────────────────────────────────────────────── */
const PROBLEMS = [
  {
    title: "Apply Without Strategy",
    sub: 'The "Apply & Pray" approach.',
    callout: "Roles chosen based on trends, without clarity or fit.",
    Icon: Send,
    illustration: ApplyIllustration,
  },
  {
    title: "Learning Without a Clear Path",
    sub: "Skills built without clear direction.",
    callout: "Courses taken without understanding what the role needs.",
    Icon: BookOpen,
    illustration: LearningIllustration,
  },
  {
    title: "Interviews Without Readiness",
    sub: "Unprepared for real interviews.",
    callout: "Finding it hard to turn your preparation into answers.",
    Icon: Mic,
    illustration: InterviewIllustration,
  },
];

/* ─── mini illustrations ─────────────────────────────────────── */
function ApplyIllustration() {
  const rows = [
    { name: "Data Analyst", status: "Rejected" },
    { name: "Data Analyst", status: "Rejected" },
    { name: "Data Analyst", status: "Rejected" },
  ];
  return (
    <div className="space-y-3 px-2">
      {rows.map((r, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -8 : 8 }}
          animate={{ opacity: 1, x: i % 2 === 0 ? 0 : 16 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5"
          style={{ boxShadow: "0 2px 8px rgba(12,14,20,0.04)", border: "1px solid rgba(12,14,20,0.06)", marginLeft: i === 1 ? 24 : 0 }}>
          <div className="w-6 h-6 rounded-md shrink-0" style={{ background: "rgba(60,97,168,0.12)" }} />
          <span className="text-[11px] font-semibold flex-1" style={{ color: DARK }}>{r.name}</span>
          <div className="flex-1 h-[5px] rounded-full max-w-[50px]" style={{ background: "rgba(60,97,168,0.1)" }} />
          <span className="text-[10px] font-bold flex items-center gap-1 shrink-0" style={{ color: "#DC2626" }}>
            <XCircle size={10} /> {r.status}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function LearningIllustration() {
  const items = [
    { icon: "📚", text: "Take this trending course", align: "left" },
    { icon: "⚙️", text: "But for which role?", align: "right" },
    { icon: "🤖", text: "Learn AI More", align: "left" },
    { icon: "📈", text: "Build more skills", align: "right" },
  ];
  return (
    <div className="space-y-2 px-2">
      {items.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.35 }}
          className="flex"
          style={{ justifyContent: item.align === "right" ? "flex-end" : "flex-start" }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              background: item.align === "left" ? "#FFFBEB" : "#fff",
              border: `1px solid ${item.align === "left" ? "rgba(245,209,52,0.2)" : "rgba(12,14,20,0.06)"}`,
              boxShadow: "0 1px 4px rgba(12,14,20,0.04)",
            }}>
            <span className="text-[12px]">{item.icon}</span>
            <span className="text-[11px] font-medium" style={{ color: DARK }}>{item.text}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function InterviewIllustration() {
  return (
    <div className="px-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white rounded-xl p-3"
        style={{ border: "1px solid rgba(12,14,20,0.06)", boxShadow: "0 2px 8px rgba(12,14,20,0.04)" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full" style={{ background: "#F5D134" }} />
            <span className="text-[11px] font-semibold" style={{ color: DARK }}>Mock Feedback</span>
          </div>
          <div className="w-4 h-4 rounded" style={{ background: "rgba(60,97,168,0.1)" }} />
        </div>
        {/* Feedback rows */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <XCircle size={10} style={{ color: "#DC2626" }} />
            <span className="text-[10px] font-medium" style={{ color: DARK }}>Needs</span>
            <div className="flex-1 h-[5px] rounded-full" style={{ background: "rgba(12,14,20,0.06)" }} />
            <span className="text-[10px]" style={{ color: "rgba(12,14,20,0.3)" }}>N/A</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
            <span className="text-[10px] font-medium" style={{ color: DARK }}>What skill gap?</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
            <span className="text-[10px] font-medium" style={{ color: DARK }}>Not ready yet?</span>
          </div>
        </div>
        {/* Audio bar */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex gap-[2px] flex-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="h-2 rounded-full flex-1"
                style={{ background: `rgba(60,97,168,${0.1 + Math.random() * 0.2})` }} />
            ))}
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded"
            style={{ background: "rgba(60,97,168,0.08)", color: BLUE }}>00:36</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
            Many People Prepare Hard.{" "}
            <span style={{ color: BLUE }}>Few Prepare Right.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px] sm:text-[15px] max-w-2xl mx-auto"
            style={{ color: "rgba(12,14,20,0.45)", lineHeight: 1.7 }}
          >
            People often learn skills, practice interviews, and apply for roles without understanding
            whether their preparation aligns with real job requirements.
          </motion.p>
        </div>

        {/* 3 Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {PROBLEMS.map((p, i) => {
            const Illustration = p.illustration;
            const Icon = p.Icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="bg-white rounded-2xl overflow-hidden flex flex-col"
                style={{
                  border: "1px solid rgba(12,14,20,0.06)",
                  boxShadow: "0 2px 12px rgba(12,14,20,0.05)",
                }}
              >
                {/* Illustration area */}
                <div className="pt-5 pb-4 px-3 flex-1"
                  style={{ background: "linear-gradient(180deg, rgba(60,97,168,0.03) 0%, transparent 100%)" }}>
                  <Illustration />
                </div>

                {/* Text area */}
                <div className="px-5 pb-5 pt-3" style={{ borderTop: "1px solid rgba(12,14,20,0.04)" }}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(60,97,168,0.06)" }}>
                      <Icon size={16} style={{ color: BLUE }} />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold leading-tight" style={{ color: DARK }}>{p.title}</p>
                      <p className="text-[11px]" style={{ color: "rgba(12,14,20,0.4)" }}>{p.sub}</p>
                    </div>
                  </div>
                  <p className="text-[12px] font-bold italic leading-relaxed mt-2"
                    style={{ color: BLUE }}>
                    {p.callout}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-sm font-black mt-10"
          style={{ color: BLUE }}
        >
          There is a better way ↓
        </motion.p>

      </div>
    </section>
  );
}
