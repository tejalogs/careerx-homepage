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
  { stage: "Discover", product: "Know Yourself Better", description: "See which roles match your strengths, not just your interests.", icon: Compass, color: "#4F46E5" },
  { stage: "Prepare", product: "Career Track", description: "Build only the skills your target roles actually require.", icon: BookOpen, color: "#047857" },
  { stage: "Validate", product: "Interview Simulator", description: "Test your readiness against real interview standards.", icon: Mic, color: "#B45309" },
  { stage: "Activate", product: "Career Activation", description: "Access opportunities matched to your verified readiness.", icon: Rocket, color: "#DC2626" },
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
      style={{
        background: `linear-gradient(145deg, #dfe2ea 0%, ${step.color}10 50%, #e4e7ef 100%)`,
        border: "1.5px dashed rgba(12,14,20,0.15)",
        boxShadow: "0 4px 16px rgba(12,14,20,0.06), 0 1px 3px rgba(12,14,20,0.04)",
      }}>
      {/* Frosted overlay */}
      <div className="absolute inset-0 rounded-[22px] pointer-events-none"
        style={{ background: "rgba(255,255,255,0.15)" }} />

      <div className="relative p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `${step.color}10`, border: `1px dashed ${step.color}20` }}>
            <Icon size={15} style={{ color: `${step.color}50` }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${step.color}50` }}>{step.stage}</p>
            <p className="text-[13px] font-bold" style={{ color: "rgba(12,14,20,0.45)" }}>{step.product}</p>
          </div>
        </div>

        {/* Input fields */}
        <div className="space-y-2.5 mb-4">
          {data.fields.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <span className="text-[10px] shrink-0" style={{ color: "rgba(12,14,20,0.3)", minWidth: 90 }}>{f}</span>
              <div className="flex-1 h-[7px] rounded-full" style={{ background: "rgba(12,14,20,0.07)" }} />
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-auto">
          {data.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md text-[9px] font-medium"
              style={{ background: `${step.color}08`, color: `${step.color}40`, border: `1px dashed ${step.color}15` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 pt-3 mt-2" style={{ borderTop: `1px dashed ${step.color}15` }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: step.color, opacity: 0.35 }} />
          <span className="text-[10px]" style={{ color: "rgba(12,14,20,0.15)" }}>Awaiting analysis...</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AFTER cards — bright, vibrant, polished product UI
   ═══════════════════════════════════════════════════════════════ */

function MetallicSheen({ accentColor }: { accentColor?: string }) {
  return (
    <>
      {/* Top-down white sheen */}
      <div className="absolute top-0 left-0 right-0 h-[55%] pointer-events-none rounded-t-[22px]"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.15) 35%, transparent 100%)" }} />
      {/* Subtle accent glow at top */}
      {accentColor && (
        <div className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none rounded-t-[22px]"
          style={{ background: `linear-gradient(180deg, ${accentColor}08 0%, transparent 100%)` }} />
      )}
      {/* Bottom reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%] pointer-events-none rounded-b-[22px]"
        style={{ background: "linear-gradient(0deg, rgba(255,255,255,0.3) 0%, transparent 100%)" }} />
    </>
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
      style={{ background: "linear-gradient(150deg, #f4f5fa 0%, #e8ebf3 25%, #f1f3f9 50%, #e9ecf4 75%, #f5f6fb 100%)", border: "1px solid rgba(12,14,20,0.08)", boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.95), inset 0 -1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(12,14,20,0.08), 0 1px 3px rgba(12,14,20,0.05)" }}>
      <MetallicSheen accentColor="#4F46E5" />
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
            <p className="text-[10px]" style={{ color: "rgba(12,14,20,0.4)" }}>Top 8% readiness score</p>
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
      style={{ background: "linear-gradient(150deg, #f4f5fa 0%, #e8ebf3 25%, #f1f3f9 50%, #e9ecf4 75%, #f5f6fb 100%)", border: "1px solid rgba(12,14,20,0.08)", boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.95), inset 0 -1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(12,14,20,0.08), 0 1px 3px rgba(12,14,20,0.05)" }}>
      <MetallicSheen accentColor="#047857" />
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
      style={{ background: "linear-gradient(150deg, #f4f5fa 0%, #e8ebf3 25%, #f1f3f9 50%, #e9ecf4 75%, #f5f6fb 100%)", border: "1px solid rgba(12,14,20,0.08)", boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.95), inset 0 -1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(12,14,20,0.08), 0 1px 3px rgba(12,14,20,0.05)" }}>
      <MetallicSheen accentColor="#B45309" />
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
      style={{ background: "linear-gradient(150deg, #f4f5fa 0%, #e8ebf3 25%, #f1f3f9 50%, #e9ecf4 75%, #f5f6fb 100%)", border: "1px solid rgba(12,14,20,0.08)", boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.95), inset 0 -1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(12,14,20,0.08), 0 1px 3px rgba(12,14,20,0.05)" }}>
      <MetallicSheen accentColor="#DC2626" />
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
            <div key={j.company} className="flex items-center gap-2 px-2.5 py-2 rounded-xl" style={{
              background: i === 0 ? "#FEF2F2" : "rgba(12,14,20,0.02)",
              border: i === 0 ? "1px solid rgba(220,38,38,0.08)" : "1px solid transparent",
            }}>
              <div className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                <Briefcase size={9} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold" style={{ color: DARK }}>{j.company}</span>
                  <span className="text-[9px]" style={{ color: "rgba(12,14,20,0.35)" }}>· {j.role}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] flex items-center gap-0.5" style={{ color: "rgba(12,14,20,0.3)" }}>
                    <MapPin size={7} /> {j.location}
                  </span>
                  <span className="text-[9px] font-semibold" style={{ color: "#047857" }}>{j.salary}</span>
                </div>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0" style={{
                background: j.fit >= 95 ? "#DCFCE7" : "#F3F4F6",
                color: j.fit >= 95 ? "#047857" : "rgba(12,14,20,0.5)",
              }}>{j.fit}%</span>
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
    <section id="how-it-works" className="w-full py-10 md:py-16 overflow-hidden" style={{ backgroundColor: "#F7F8FC" }}>
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3"
            style={{ color: DARK }}
          >
            Built around how{" "}
            <span style={{ color: BLUE }}>careers actually move.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px] sm:text-[15px] max-w-md mx-auto"
            style={{ color: "rgba(12,14,20,0.4)", lineHeight: 1.6 }}
          >
            Four stages that connect what you're good at with what the industry actually values.
          </motion.p>
        </div>
      </div>

      {/* Before / After labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="hidden sm:flex max-w-5xl mx-auto px-4 sm:px-6 justify-between mb-1"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5"
          style={{ color: "rgba(12,14,20,0.2)" }}>
          <span className="w-4 h-px" style={{ background: "rgba(12,14,20,0.15)" }} />
          Quick assessment
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5"
          style={{ color: "rgba(60,97,168,0.4)" }}>
          Personalized outcomes
          <span className="w-4 h-px" style={{ background: "rgba(60,97,168,0.3)" }} />
        </span>
      </motion.div>

      {/* Scanner stream — desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden sm:block"
      >
        <ScannerCardStream
          cardContents={CARD_CONTENTS}
          height={320}
          cardWidth={360}
          cardHeight={280}
          initialSpeed={40}
          direction={1}
          repeat={8}
          cardGap={24}
          friction={0.98}
        />
      </motion.div>

{/* spacer */}

      {/* Mobile: static before→after pairs */}
      <div className="sm:hidden px-4 space-y-4">
        {STEPS.map((step, i) => (
          <motion.div key={step.stage}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
            className="flex gap-2 items-stretch"
          >
            <div className="flex-1 h-[200px]">
              <BeforeCard step={step} idx={i} />
            </div>
            <div className="flex items-center shrink-0 px-1">
              <ArrowRight className="w-4 h-4" style={{ color: "rgba(12,14,20,0.15)" }} />
            </div>
            <div className="flex-1 h-[200px]">
              {i === 0 ? <DiscoverOutcome /> : i === 1 ? <PrepareOutcome /> : i === 2 ? <ValidateOutcome /> : <ActivateOutcome />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Horizontal stepper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-between gap-0.5 sm:gap-2 mb-8 overflow-x-auto"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.stage} className="flex items-center gap-0.5 sm:gap-2 flex-1 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${step.color}12`, border: `1.5px solid ${step.color}25` }}>
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" style={{ color: step.color }} />
                  </div>
                  <div className="min-w-0 hidden sm:block">
                    <p className="text-[9px] font-black uppercase tracking-wider" style={{ color: step.color }}>{step.stage}</p>
                    <p className="text-[12px] font-bold truncate" style={{ color: DARK }}>{step.product}</p>
                  </div>
                </div>
                {i < 3 && (
                  <div className="shrink-0 mx-1">
                    <ChevronRight className="w-3.5 h-3.5" style={{ color: "rgba(12,14,20,0.15)" }} />
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center"
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
