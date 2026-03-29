"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Compass, BookOpen, Mic, Rocket, ArrowRight,
  Target, TrendingUp, BarChart3, Zap, CheckCircle2,
  Briefcase, MapPin, ChevronRight, Play,
  Star, Clock, Award, Sparkles,
} from "lucide-react";
import { ScannerCardStream, type CardContent } from "@/components/ui/scanner-card-stream";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

/* ─── stage definitions ──────────────────────────────────────── */
const STEPS = [
  { stage: "Discover", product: "Know Yourself Better", description: "Find which roles fit your strengths using real job market data.", icon: Compass, color: "#4F46E5" },
  { stage: "Prepare", product: "Career Track", description: "Close skill gaps with structured learning built for your target role.", icon: BookOpen, color: "#047857" },
  { stage: "Validate", product: "Interview Simulator", description: "Measure your readiness through AI-powered interview simulations.", icon: Mic, color: "#B45309" },
  { stage: "Activate", product: "Career Activation", description: "Connect with job opportunities matched to your profile and readiness.", icon: Rocket, color: "#DC2626" },
];

/* ═══════════════════════════════════════════════════════════════
   BEFORE cards — dark, muted, "raw data" aesthetic
   ═══════════════════════════════════════════════════════════════ */
function BeforeCard({ step, idx }: { step: typeof STEPS[number]; idx: number }) {
  const Icon = step.icon;
  const inputs: Record<number, { fields: string[]; tags: string[] }> = {
    0: { fields: ["Your interests", "Years of experience", "Degree"], tags: ["Data", "Analytics", "Python"] },
    1: { fields: ["Target role", "Skills you know", "Learning pace"], tags: ["SQL", "Cloud", "ETL"] },
    2: { fields: ["Interview type", "Seniority level", "Focus areas"], tags: ["System Design", "Behavioral"] },
    3: { fields: ["Preferred location", "Salary expectation", "Work model"], tags: ["Remote", "$130k+", "Full-time"] },
  };
  const data = inputs[idx] || inputs[0];

  return (
    <div className="w-full h-full rounded-[22px] flex flex-col whitespace-normal relative overflow-hidden"
      style={{ background: "#e8eaef", border: "1.5px dashed rgba(12,14,20,0.12)" }}>

      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(12,14,20,0.05)" }}>
            <Icon size={15} style={{ color: "rgba(12,14,20,0.22)" }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(12,14,20,0.2)" }}>Stage {idx + 1}</p>
            <p className="text-[13px] font-bold" style={{ color: "rgba(12,14,20,0.4)" }}>{step.product}</p>
          </div>
        </div>

        {/* Input fields */}
        <div className="space-y-2.5 mb-4">
          {data.fields.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <span className="text-[10px] shrink-0" style={{ color: "rgba(12,14,20,0.2)", minWidth: 90 }}>{f}</span>
              <div className="flex-1 h-[7px] rounded-full" style={{ background: "rgba(12,14,20,0.05)" }} />
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-auto">
          {data.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md text-[9px] font-medium"
              style={{ background: "rgba(12,14,20,0.04)", color: "rgba(12,14,20,0.22)", border: "1px dashed rgba(12,14,20,0.08)" }}>
              {t}
            </span>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 pt-3 mt-2" style={{ borderTop: "1px dashed rgba(12,14,20,0.06)" }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: step.color, opacity: 0.4 }} />
          <span className="text-[10px]" style={{ color: "rgba(12,14,20,0.18)" }}>Awaiting analysis...</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AFTER cards — bright, vibrant, polished product UI
   ═══════════════════════════════════════════════════════════════ */

function MetallicSheen() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[50%] pointer-events-none rounded-t-[15px]"
      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 40%, transparent 100%)" }} />
  );
}

function DiscoverOutcome() {
  const roles = [
    { name: "Data Engineer", match: 92, trend: "+12%" },
    { name: "ML Engineer", match: 84, trend: "+8%" },
    { name: "Analytics Engineer", match: 78, trend: "+15%" },
  ];
  return (
    <div className="w-full h-full rounded-[22px] flex flex-col whitespace-normal relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #f0f2f8 0%, #e6e9f2 35%, #eef0f6 70%, #f5f6fa 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.04)" }}>
      <MetallicSheen />
      {/* Colored accent strip */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #4F46E5, #818cf8)" }} />
      <div className="p-3.5 flex flex-col flex-1 relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#EEF2FF" }}>
              <Target size={13} style={{ color: "#4F46E5" }} />
            </div>
            <div>
              <p className="text-[12px] font-bold" style={{ color: DARK }}>Career Fit Report</p>
              <p className="text-[9px]" style={{ color: "rgba(12,14,20,0.35)" }}>Based on your profile</p>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "#DCFCE7", color: "#047857" }}>Complete</div>
        </div>

        {/* Score ring */}
        <div className="flex items-center gap-3 mb-2 px-3 py-2 rounded-xl" style={{ background: "#FAFAFE" }}>
          <div className="relative w-10 h-10 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#EEF2FF" strokeWidth="3" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#4F46E5" strokeWidth="3" strokeDasharray="81 100" strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black" style={{ color: "#4F46E5" }}>92</span>
          </div>
          <div>
            <p className="text-[13px] font-black" style={{ color: DARK }}>Strong Match</p>
            <p className="text-[10px]" style={{ color: "rgba(12,14,20,0.4)" }}>Top 8% of candidates</p>
          </div>
        </div>

        <p className="text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(12,14,20,0.3)" }}>Best-fit roles</p>
        <div className="space-y-1 flex-1">
          {roles.map((r, i) => (
            <div key={r.name} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
              style={{ background: i === 0 ? "#EEF2FF" : "transparent" }}>
              <span className="text-[11px] font-semibold flex-1" style={{ color: i === 0 ? "#4F46E5" : "rgba(12,14,20,0.55)" }}>{r.name}</span>
              <span className="text-[10px] font-bold" style={{ color: "#4F46E5" }}>{r.match}%</span>
              <span className="text-[9px] font-medium" style={{ color: "#047857" }}>{r.trend}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: "1px solid rgba(12,14,20,0.05)" }}>
          <div className="flex items-center gap-1">
            <CheckCircle2 size={11} style={{ color: "#047857" }} />
            <span className="text-[10px] font-semibold" style={{ color: "#047857" }}>Roadmap ready</span>
          </div>
          <ChevronRight size={12} style={{ color: "rgba(12,14,20,0.15)" }} />
        </div>
      </div>
    </div>
  );
}

function PrepareOutcome() {
  const modules = [
    { name: "SQL Fundamentals", status: "done", pct: 100 },
    { name: "Python for Data", status: "active", pct: 68 },
    { name: "Cloud Architecture", status: "locked", pct: 0 },
  ];
  return (
    <div className="w-full h-full rounded-[22px] flex flex-col whitespace-normal relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #f0f2f8 0%, #e6e9f2 35%, #eef0f6 70%, #f5f6fa 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.04)" }}>
      <MetallicSheen />
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #047857, #34d399)" }} />
      <div className="p-3.5 flex flex-col flex-1 relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#ECFDF5" }}>
              <TrendingUp size={13} style={{ color: "#047857" }} />
            </div>
            <div>
              <p className="text-[12px] font-bold" style={{ color: DARK }}>Your Learning Path</p>
              <p className="text-[9px]" style={{ color: "rgba(12,14,20,0.35)" }}>Data Engineer Track</p>
            </div>
          </div>
          <span className="text-[11px] font-bold" style={{ color: "#047857" }}>68%</span>
        </div>

        <div className="h-1.5 rounded-full mb-2 overflow-hidden" style={{ background: "rgba(12,14,20,0.06)" }}>
          <div className="h-full rounded-full" style={{ width: "68%", background: "linear-gradient(90deg, #34d399, #059669)" }} />
        </div>

        <div className="space-y-1.5 flex-1">
          {modules.map((m) => (
            <div key={m.name} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl"
              style={{ background: m.status === "active" ? "#ECFDF5" : "rgba(12,14,20,0.02)", opacity: m.status === "locked" ? 0.4 : 1 }}>
              <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{
                background: m.status === "done" ? "#059669" : m.status === "active" ? "#D1FAE5" : "rgba(12,14,20,0.08)",
              }}>
                {m.status === "done" ? <CheckCircle2 size={10} color="#fff" /> :
                 m.status === "active" ? <Play size={8} fill="#059669" color="#059669" /> :
                 <Clock size={9} style={{ color: "rgba(12,14,20,0.25)" }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold truncate" style={{ color: m.status === "active" ? "#047857" : "rgba(12,14,20,0.55)" }}>{m.name}</p>
                {m.status === "active" && (
                  <div className="h-1 rounded-full mt-1 overflow-hidden" style={{ background: "rgba(4,120,87,0.1)" }}>
                    <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: "#059669" }} />
                  </div>
                )}
              </div>
              {m.status === "done" && <span className="text-[9px] font-bold" style={{ color: "#059669" }}>Done</span>}
              {m.status === "active" && <span className="text-[9px] font-bold" style={{ color: "#047857" }}>{m.pct}%</span>}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: "1px solid rgba(12,14,20,0.05)" }}>
          <div className="flex items-center gap-1">
            <Award size={11} style={{ color: BLUE }} />
            <span className="text-[10px] font-semibold" style={{ color: BLUE }}>3 certificates earned</span>
          </div>
          <ChevronRight size={12} style={{ color: "rgba(12,14,20,0.15)" }} />
        </div>
      </div>
    </div>
  );
}

function ValidateOutcome() {
  const sessions = [
    { type: "System Design", score: 94, time: "32 min" },
    { type: "Behavioral", score: 88, time: "28 min" },
  ];
  return (
    <div className="w-full h-full rounded-[22px] flex flex-col whitespace-normal relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #f0f2f8 0%, #e6e9f2 35%, #eef0f6 70%, #f5f6fa 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.04)" }}>
      <MetallicSheen />
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #B45309, #fbbf24)" }} />
      <div className="p-3.5 flex flex-col flex-1 relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#FFFBEB" }}>
              <BarChart3 size={13} style={{ color: "#B45309" }} />
            </div>
            <div>
              <p className="text-[12px] font-bold" style={{ color: DARK }}>Interview Readiness</p>
              <p className="text-[9px]" style={{ color: "rgba(12,14,20,0.35)" }}>AI Mock Interviews</p>
            </div>
          </div>
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={9} fill={s <= 4 ? "#F59E0B" : "none"} stroke={s <= 4 ? "#F59E0B" : "rgba(12,14,20,0.15)"} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-2 px-3 py-2 rounded-xl" style={{ background: "#FFFBEB" }}>
          <div>
            <p className="text-[28px] font-black leading-none" style={{ color: "#B45309" }}>94</p>
            <p className="text-[9px] font-bold uppercase tracking-wider mt-0.5" style={{ color: "#D97706" }}>Score</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[{ label: "Technical", val: 96 }, { label: "Communication", val: 91 }, { label: "Problem Solving", val: 94 }].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-[9px] w-[72px] text-right" style={{ color: "rgba(12,14,20,0.4)" }}>{s.label}</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(180,83,9,0.1)" }}>
                  <div className="h-full rounded-full" style={{ width: `${s.val}%`, background: "#F59E0B" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(12,14,20,0.3)" }}>Recent sessions</p>
        <div className="space-y-1 flex-1">
          {sessions.map((s) => (
            <div key={s.type} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(12,14,20,0.02)" }}>
              <Mic size={10} style={{ color: "#B45309" }} />
              <span className="text-[11px] font-medium flex-1" style={{ color: "rgba(12,14,20,0.6)" }}>{s.type}</span>
              <span className="text-[10px] font-bold" style={{ color: "#B45309" }}>{s.score}</span>
              <span className="text-[9px]" style={{ color: "rgba(12,14,20,0.25)" }}>{s.time}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: "1px solid rgba(12,14,20,0.05)" }}>
          <span className="text-[10px] font-semibold" style={{ color: "#B45309" }}>Interview ready ✓</span>
          <ChevronRight size={12} style={{ color: "rgba(12,14,20,0.15)" }} />
        </div>
      </div>
    </div>
  );
}

function ActivateOutcome() {
  const jobs = [
    { company: "Stripe", role: "Data Engineer", location: "Remote", salary: "$145k–$185k", fit: 98 },
    { company: "Vercel", role: "Platform Engineer", location: "SF / Remote", salary: "$135k–$170k", fit: 94 },
    { company: "Linear", role: "Data Infrastructure", location: "Remote", salary: "$130k–$165k", fit: 91 },
  ];
  return (
    <div className="w-full h-full rounded-[22px] flex flex-col whitespace-normal relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #f0f2f8 0%, #e6e9f2 35%, #eef0f6 70%, #f5f6fa 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.04)" }}>
      <MetallicSheen />
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #DC2626, #f87171)" }} />
      <div className="p-3.5 flex flex-col flex-1 relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#FEF2F2" }}>
              <Zap size={13} style={{ color: "#DC2626" }} />
            </div>
            <div>
              <p className="text-[12px] font-bold" style={{ color: DARK }}>Job Matches</p>
              <p className="text-[9px]" style={{ color: "rgba(12,14,20,0.35)" }}>3 new matches today</p>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "#FEF2F2", color: "#DC2626" }}>3 New</div>
        </div>

        <div className="space-y-1 flex-1">
          {jobs.map((j, i) => (
            <div key={j.company} className="px-2.5 py-1.5 rounded-xl" style={{
              background: i === 0 ? "#FEF2F2" : "rgba(12,14,20,0.02)",
              border: i === 0 ? "1px solid rgba(220,38,38,0.08)" : "1px solid transparent",
            }}>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center">
                  <Briefcase size={9} className="text-gray-400" />
                </div>
                <span className="text-[11px] font-bold flex-1" style={{ color: DARK }}>{j.company}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{
                  background: j.fit >= 95 ? "#DCFCE7" : "#F3F4F6",
                  color: j.fit >= 95 ? "#047857" : "rgba(12,14,20,0.5)",
                }}>{j.fit}%</span>
              </div>
              <div className="flex items-center gap-3 ml-7">
                <span className="text-[10px]" style={{ color: "rgba(12,14,20,0.5)" }}>{j.role}</span>
                <span className="text-[9px] flex items-center gap-0.5" style={{ color: "rgba(12,14,20,0.3)" }}>
                  <MapPin size={7} /> {j.location}
                </span>
              </div>
              <div className="ml-7 mt-0.5">
                <span className="text-[10px] font-semibold" style={{ color: "#047857" }}>{j.salary}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: "1px solid rgba(12,14,20,0.05)" }}>
          <div className="flex items-center gap-1">
            <Sparkles size={11} style={{ color: BLUE }} />
            <span className="text-[10px] font-semibold" style={{ color: BLUE }}>Profile activated</span>
          </div>
          <ChevronRight size={12} style={{ color: "rgba(12,14,20,0.15)" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── card content array ─────────────────────────────────────── */
/* Swapped: "before" div shows on the scanned side (right with dir=1),
   "after" div shows on the unscanned side (left with dir=1).
   So: before=outcome (revealed after scan), after=raw (visible before scan). */
const CARD_CONTENTS: CardContent[] = [
  { before: <DiscoverOutcome />, after: <BeforeCard step={STEPS[0]} idx={0} /> },
  { before: <PrepareOutcome />, after: <BeforeCard step={STEPS[1]} idx={1} /> },
  { before: <ValidateOutcome />, after: <BeforeCard step={STEPS[2]} idx={2} /> },
  { before: <ActivateOutcome />, after: <BeforeCard step={STEPS[3]} idx={3} /> },
];

/* ═══════════════════════════════════════════════════════════════ */
export function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="w-full py-14 md:py-24 overflow-hidden" style={{ backgroundColor: "#F7F8FC" }}>
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
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
            Four stages.{" "}
            <span style={{ color: BLUE }}>One structured system.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px] sm:text-[15px] max-w-md mx-auto"
            style={{ color: "rgba(12,14,20,0.4)", lineHeight: 1.6 }}
          >
            From uncertainty to clarity — four steps that turn your ambitions into a career plan.
          </motion.p>
        </div>
      </div>

      {/* Scanner stream */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ScannerCardStream
          cardContents={CARD_CONTENTS}
          height={320}
          cardWidth={360}
          cardHeight={280}
          initialSpeed={80}
          direction={1}
          repeat={5}
          cardGap={50}
          friction={0.97}
        />
      </motion.div>

      {/* Stage cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.06, ease: [0.33, 1, 0.68, 1] }}
                className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col hover:-translate-y-1 transition-transform duration-300 relative"
                style={{ border: "1px solid rgba(12,14,20,0.07)", borderLeft: `3px solid ${step.color}`, boxShadow: "0 2px 12px rgba(12,14,20,0.05)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0" style={{ backgroundColor: YELLOW }}>
                  <Icon className="w-5 h-5" style={{ color: DARK }} />
                </div>
                <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(60,97,168,0.55)" }}>{step.stage}</p>
                <h3 className="text-[14px] font-black mb-1.5 leading-snug" style={{ color: BLUE }}>{step.product}</h3>
                <p className="text-[12px] leading-relaxed flex-1" style={{ color: "rgba(12,14,20,0.5)" }}>{step.description}</p>
                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center mt-10"
        >
          <a href="/kyb"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold text-white transition-all hover:opacity-85 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            style={{ backgroundColor: BLUE }}>
            Find My Best Role
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
