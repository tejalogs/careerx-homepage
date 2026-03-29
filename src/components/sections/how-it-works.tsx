"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Compass, BookOpen, Mic, Rocket, ArrowRight,
  Target, TrendingUp, BarChart3, Zap, CheckCircle2,
  Briefcase, GraduationCap, LineChart, Star,
} from "lucide-react";
import { ScannerCardStream, type CardContent } from "@/components/ui/scanner-card-stream";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

/* ─── stage definitions ──────────────────────────────────────── */
const STEPS = [
  {
    stage: "Discover",
    product: "Know Yourself Better",
    description: "Find which roles fit your strengths using real job market data.",
    icon: Compass,
    color: "#4F46E5",
  },
  {
    stage: "Prepare",
    product: "Career Track",
    description: "Close skill gaps with structured learning built for your target role.",
    icon: BookOpen,
    color: "#047857",
  },
  {
    stage: "Validate",
    product: "Interview Simulator",
    description: "Measure your readiness through AI-powered interview simulations.",
    icon: Mic,
    color: "#B45309",
  },
  {
    stage: "Activate",
    product: "Career Activation",
    description: "Connect with job opportunities matched to your profile and readiness.",
    icon: Rocket,
    color: "#DC2626",
  },
];

/* ─── before cards (text/terminal style) ─────────────────────── */
function BeforeCard({ step, idx }: { step: typeof STEPS[number]; idx: number }) {
  const Icon = step.icon;
  return (
    <div
      className="w-full h-full rounded-[15px] p-5 flex flex-col justify-between font-mono whitespace-normal"
      style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full" style={{ background: step.color, opacity: 0.7 }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
        </div>

        <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
          {`// 0${idx + 1}`}
        </p>
        <p className="text-[18px] font-bold mb-1" style={{ color: step.color }}>
          {step.stage}
        </p>
        <p className="text-[14px] font-bold text-white mb-3">
          {step.product}
        </p>
        <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          {step.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: step.color }} />
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
          awaiting scan...
        </span>
      </div>
    </div>
  );
}

/* ─── after cards (polished outcome) ─────────────────────────── */

function DiscoverOutcome() {
  const roles = [
    { name: "Data Engineer", match: 92 },
    { name: "ML Engineer", match: 84 },
    { name: "Analytics Engineer", match: 78 },
  ];
  return (
    <div
      className="w-full h-full rounded-[15px] p-5 flex flex-col justify-between whitespace-normal"
      style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)", border: "1px solid rgba(99,102,241,0.2)" }}
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target size={14} className="text-indigo-400" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-400">Career Fit Report</span>
        </div>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-[36px] font-black leading-none text-white">92%</span>
          <span className="text-[12px] font-semibold text-indigo-300 mb-1">Role Match</span>
        </div>
        <div className="space-y-2">
          {roles.map((r) => (
            <div key={r.name} className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${r.match}%`, background: "linear-gradient(90deg, #818cf8, #6366f1)" }} />
              </div>
              <span className="text-[10px] text-white/60 w-[110px] text-right truncate">{r.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircle2 size={12} className="text-emerald-400" />
        <span className="text-[10px] font-semibold text-emerald-400">Roadmap generated</span>
      </div>
    </div>
  );
}

function PrepareOutcome() {
  const skills = [
    { name: "SQL & dbt", pct: 85 },
    { name: "Python", pct: 72 },
    { name: "Cloud (AWS)", pct: 60 },
    { name: "Data Modeling", pct: 45 },
  ];
  return (
    <div
      className="w-full h-full rounded-[15px] p-5 flex flex-col justify-between whitespace-normal"
      style={{ background: "linear-gradient(135deg, #052e16, #14532d)", border: "1px solid rgba(4,120,87,0.2)" }}
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-emerald-400" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">Learning Path</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[28px] font-black leading-none text-white">47</span>
          <div>
            <p className="text-[12px] font-bold text-emerald-300">Skills Mapped</p>
            <p className="text-[10px] text-white/40">12 in progress</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[10px] text-white/50">{s.name}</span>
                <span className="text-[10px] font-bold text-emerald-300">{s.pct}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: "linear-gradient(90deg, #34d399, #059669)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValidateOutcome() {
  const areas = [
    { label: "Technical", score: 94 },
    { label: "Behavioral", score: 87 },
    { label: "System Design", score: 78 },
  ];
  return (
    <div
      className="w-full h-full rounded-[15px] p-5 flex flex-col justify-between whitespace-normal"
      style={{ background: "linear-gradient(135deg, #451a03, #78350f)", border: "1px solid rgba(180,83,9,0.2)" }}
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 size={14} className="text-amber-400" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">Interview Score</span>
        </div>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-[36px] font-black leading-none text-white">94%</span>
          <span className="text-[12px] font-semibold text-amber-300 mb-1">Ready</span>
        </div>
        <div className="space-y-2.5">
          {areas.map((a) => (
            <div key={a.label} className="flex items-center gap-3">
              <span className="text-[10px] text-white/45 w-[80px]">{a.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${a.score}%`, background: "linear-gradient(90deg, #fbbf24, #d97706)" }} />
              </div>
              <span className="text-[10px] font-bold text-amber-200 w-[28px] text-right">{a.score}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-0.5">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} size={10} fill="#fbbf24" className="text-amber-400" />
          ))}
        </div>
        <span className="text-[10px] text-white/30">Top 6% of candidates</span>
      </div>
    </div>
  );
}

function ActivateOutcome() {
  const matches = [
    { company: "Stripe", role: "Data Engineer", fit: "98%" },
    { company: "Vercel", role: "Platform Eng.", fit: "94%" },
    { company: "Linear", role: "Data Infra", fit: "91%" },
  ];
  return (
    <div
      className="w-full h-full rounded-[15px] p-5 flex flex-col justify-between whitespace-normal"
      style={{ background: "linear-gradient(135deg, #450a0a, #7f1d1d)", border: "1px solid rgba(220,38,38,0.2)" }}
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-red-400" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-red-400">Active Matches</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[28px] font-black leading-none text-white">3</span>
          <div>
            <p className="text-[12px] font-bold text-red-300">Ready to Apply</p>
            <p className="text-[10px] text-white/40">Matched to your profile</p>
          </div>
        </div>
        <div className="space-y-2">
          {matches.map((m) => (
            <div
              key={m.company}
              className="flex items-center gap-3 px-3 py-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                <Briefcase size={11} className="text-white/50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white truncate">{m.company}</p>
                <p className="text-[9px] text-white/35 truncate">{m.role}</p>
              </div>
              <span className="text-[10px] font-bold text-red-300">{m.fit}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircle2 size={12} className="text-emerald-400" />
        <span className="text-[10px] font-semibold text-emerald-400">Profile activated</span>
      </div>
    </div>
  );
}

/* ─── card content array for the scanner stream ──────────────── */
const CARD_CONTENTS: CardContent[] = [
  {
    before: <BeforeCard step={STEPS[0]} idx={0} />,
    after:  <DiscoverOutcome />,
  },
  {
    before: <BeforeCard step={STEPS[1]} idx={1} />,
    after:  <PrepareOutcome />,
  },
  {
    before: <BeforeCard step={STEPS[2]} idx={2} />,
    after:  <ValidateOutcome />,
  },
  {
    before: <BeforeCard step={STEPS[3]} idx={3} />,
    after:  <ActivateOutcome />,
  },
];

/* ═══════════════════════════════════════════════════════════════ */
export function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="w-full py-14 md:py-24 overflow-hidden" style={{ backgroundColor: DARK }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(245,209,52,0.6)" }}
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3 text-white"
          >
            Four stages.{" "}
            <span style={{ color: YELLOW }}>One structured system.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px] sm:text-[15px] max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}
          >
            Raw input on the right, scanner processes it, polished career outcome on the left.
          </motion.p>
        </div>
      </div>

      {/* Scanner stream — full bleed, custom before/after cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ScannerCardStream
          cardContents={CARD_CONTENTS}
          height={310}
          cardWidth={380}
          cardHeight={260}
          initialSpeed={100}
          direction={-1}
          repeat={5}
          cardGap={50}
          friction={0.97}
        />
      </motion.div>

      {/* Stage cards below */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                className="rounded-2xl p-4 sm:p-5 flex flex-col hover:-translate-y-1 transition-transform duration-300 relative"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <span className="text-[11px] font-black tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Stage {i + 1}
                  </span>
                </div>

                <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-1" style={{ color: step.color }}>
                  {step.stage}
                </p>
                <h3 className="text-[15px] font-black mb-2 leading-snug text-white">
                  {step.product}
                </h3>
                <p className="text-[12px] leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {step.description}
                </p>

                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4" style={{ color: "rgba(255,255,255,0.15)" }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center mt-10"
        >
          <a
            href="/kyb"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold transition-all hover:opacity-85 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
            style={{ backgroundColor: YELLOW, color: DARK }}
          >
            Find My Best Role
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
