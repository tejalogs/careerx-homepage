"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue, animate } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

type CardConfig =
  | { type: "role-match";    role: string;     match: number }
  | { type: "skill-tags";    skills: string[] }
  | { type: "gap-insight";   missing: string;  improve: string }
  | { type: "interview-q";   question: string }
  | { type: "salary";        amount: string;   trend: string }
  | { type: "readiness";     score: number }
  | { type: "company";       name: string;     initial: string }
  | { type: "timeline";      weeks: string }
  | { type: "kyb";           strengths: string[] }
  | { type: "career-track";  role: string;     stage: number }
  | { type: "activation";    apps: number;     interviews: number; offers: number }
  | { type: "ai-feedback";   text: string;     grade: string };

interface FlipCardProps {
  config: CardConfig;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  staggerDelay?: number;
}

// ─── Card Dimensions ──────────────────────────────────────────────────────────
const CARD_W = 60;
const CARD_H = 85;

// ─── 12 Product-Inspired Card Configs ─────────────────────────────────────────
const CARDS: CardConfig[] = [
  { type: "role-match",   role: "Product Manager",  match: 92 },
  { type: "skill-tags",   skills: ["Python", "SQL", "Strategy"] },
  { type: "gap-insight",  missing: "SQL",            improve: "Case Study" },
  { type: "interview-q",  question: "Tell me about a time you had to influence without authority." },
  { type: "salary",       amount: "$72k",            trend: "+12%" },
  { type: "readiness",    score: 87 },
  { type: "company",      name: "Stripe",            initial: "S" },
  { type: "timeline",     weeks: "3.2" },
  { type: "kyb",          strengths: ["Strategic", "Creative", "Technical"] },
  { type: "career-track", role: "Data Analyst",      stage: 1 },
  { type: "activation",   apps: 3, interviews: 2,    offers: 1 },
  { type: "ai-feedback",  text: "Strong delivery — sharpen structure in round 2.", grade: "B+" },
];
const TOTAL_CARDS = CARDS.length;

// ─── Shared Helpers ───────────────────────────────────────────────────────────
function ArcProgress({ pct, r = 11, stroke = 1.4, bg = "rgba(255,255,255,0.12)", fg = "#F5D134", size = 26 }: {
  pct: number; r?: number; stroke?: number; bg?: string; fg?: string; size?: number;
}) {
  const circ = 2 * Math.PI * r;
  const dashArr = circ;
  const dashOff = circ * (1 - pct / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={fg} strokeWidth={stroke}
        strokeDasharray={dashArr} strokeDashoffset={dashOff} strokeLinecap="round" />
    </svg>
  );
}

// Animated variant — arc draws from 0 → pct on mount
function AnimatedArcProgress({ pct, r = 11, stroke = 1.4, bg = "rgba(255,255,255,0.12)", fg = "#F5D134", size = 26 }: {
  pct: number; r?: number; stroke?: number; bg?: string; fg?: string; size?: number;
}) {
  const circleRef = useRef<SVGCircleElement>(null);
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    // start at empty (full offset), then transition to target
    el.style.transition = "none";
    el.style.strokeDashoffset = String(circ);
    // force reflow so the initial state registers
    void el.getBoundingClientRect();
    el.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    el.style.strokeDashoffset = String(circ * (1 - pct / 100));
  }, [pct, circ]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
      <circle
        ref={circleRef}
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={fg} strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ}
        strokeLinecap="round"
      />
    </svg>
  );
}

// Counts a number up from 0 → target on mount
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

function Sparkline({ points, color = "#3C61A8", w = 38, h = 10 }: { points: number[]; color?: string; w?: number; h?: number }) {
  const min = Math.min(...points), max = Math.max(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map((p) => h - ((p - min) / range) * h * 0.8 - h * 0.1);
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  // filled area under line
  const fillD = `${d} L${xs[xs.length-1]},${h} L${xs[0]},${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#sg)" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="1.5" fill={color} />
    </svg>
  );
}

const LABEL_STYLE = { fontSize: "3.5px", letterSpacing: "0.14em", color: "#9ca3af", fontWeight: 800, textTransform: "uppercase" as const };
const COL_STYLE = { display: "flex", flexDirection: "column" as const, height: "100%", width: "100%" };
const PAD = { padding: "7px" };

function Chip({ bg, color, text }: { bg: string; color: string; text: string }) {
  return (
    <div style={{ display: "inline-flex", padding: "1.5px 4px", borderRadius: "3px", backgroundColor: bg, alignSelf: "flex-start" }}>
      <p style={{ fontSize: "3px", color, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" }}>{text}</p>
    </div>
  );
}

// ─── Card Front Faces ─────────────────────────────────────────────────────────
function CardFront({ config }: { config: CardConfig }) {
  switch (config.type) {

    case "role-match": {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const displayMatch = useCountUp(config.match, 1000);
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "linear-gradient(150deg, #eef3ff 0%, #f9fbff 55%, #fff 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #3C61A8, #60a5fa, #3C61A8, transparent)" }} />
          <div style={{ position: "absolute", top: "-8px", right: "-8px", width: "32px", height: "32px", background: "rgba(60,97,168,0.07)", borderRadius: "50%", filter: "blur(10px)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "3px" }}>
            <div>
              <p style={LABEL_STYLE}>Role Match</p>
              <p style={{ fontSize: "5.5px", color: "#0C0E14", fontWeight: 900, marginTop: "2px", lineHeight: 1.2, maxWidth: "36px" }}>{config.role}</p>
            </div>
            <div style={{ position: "relative", width: "26px", height: "26px", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: "-2px", borderRadius: "50%", background: "rgba(60,97,168,0.08)", filter: "blur(3px)" }} />
              <AnimatedArcProgress pct={config.match} r={10} stroke={2} bg="rgba(60,97,168,0.08)" fg="#3C61A8" size={26} />
              <p style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5px", color: "#3C61A8", fontWeight: 900 }}>{displayMatch}</p>
            </div>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "2.5px" }}>
            {[["Skill fit", 4], ["Culture", 5], ["Experience", 3]].map(([label, filled]) => (
              <div key={String(label)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "2.8px", color: "#9ca3af", fontWeight: 700 }}>{label}</p>
                <div style={{ display: "flex", gap: "1.5px" }}>
                  {[1,2,3,4,5].map(d => (
                    <div key={d} style={{ width: "5px", height: "2.5px", borderRadius: "1px", backgroundColor: d <= Number(filled) ? "#3C61A8" : "rgba(60,97,168,0.1)" }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "2.8px", color: "#b0b8c8", fontWeight: 600, marginTop: "3px" }}>AI · 98% accuracy</p>
        </div>
      );
    }

    case "skill-tags": {
      const colors = [
        { bg: "rgba(60,97,168,0.07)", border: "rgba(60,97,168,0.18)", text: "#3C61A8", bar: "#3C61A8", pct: 92 },
        { bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.15)", text: "#7c3aed", bar: "#7c3aed", pct: 78 },
        { bg: "rgba(22,163,74,0.07)", border: "rgba(22,163,74,0.15)", text: "#16a34a", bar: "#16a34a", pct: 85 },
      ];
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "#fff", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
            <p style={LABEL_STYLE}>Your Skills</p>
            <Chip bg="rgba(60,97,168,0.07)" color="#3C61A8" text="AI Verified" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {config.skills.map((s, i) => (
              <div key={s} style={{ padding: "3.5px 5px", borderRadius: "5px", backgroundColor: colors[i].bg, border: `0.5px solid ${colors[i].border}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <div style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: colors[i].bar, boxShadow: `0 0 3px ${colors[i].bar}66` }} />
                    <p style={{ fontSize: "4.5px", color: colors[i].text, fontWeight: 900 }}>{s}</p>
                  </div>
                  <p style={{ fontSize: "3.5px", color: colors[i].text, fontWeight: 900, opacity: 0.8 }}>{colors[i].pct}%</p>
                </div>
                <div style={{ height: "1.5px", borderRadius: "1px", backgroundColor: `${colors[i].bar}18`, overflow: "hidden" }}>
                  <div style={{ width: `${colors[i].pct}%`, height: "100%", borderRadius: "1px", background: `linear-gradient(90deg, ${colors[i].bar}cc, ${colors[i].bar})` }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", paddingTop: "4px", borderTop: "0.5px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "2px" }}>
            <div style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
            <p style={{ fontSize: "3px", color: "#b0b8c8", fontWeight: 700 }}>3 skills identified · CareerX AI</p>
          </div>
        </div>
      );
    }

    case "gap-insight":
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "linear-gradient(160deg, #fff 0%, #fffafa 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #ef4444, #f97316)" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "3px" }}>
            <p style={{ ...LABEL_STYLE, color: "#ef4444" }}>Skill Gap</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "2px", padding: "1.5px 3.5px", borderRadius: "3px", background: "#fef2f2", border: "0.5px solid #fecaca" }}>
              <p style={{ fontSize: "3px", color: "#ef4444", fontWeight: 900 }}>2 found</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "5px" }}>
            <div style={{ padding: "4px 5px", borderRadius: "5px", background: "linear-gradient(135deg, #fef2f2, #fff5f5)", border: "0.5px solid #fecaca", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "2px", background: "#ef4444", borderRadius: "2px 0 0 2px" }} />
              <p style={{ fontSize: "2.5px", color: "#ef4444", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", paddingLeft: "4px" }}>Critical</p>
              <p style={{ fontSize: "7px", color: "#dc2626", fontWeight: 900, marginTop: "1px", letterSpacing: "-0.02em", paddingLeft: "4px" }}>{config.missing}</p>
            </div>
            <div style={{ padding: "4px 5px", borderRadius: "5px", background: "linear-gradient(135deg, #fffbeb, #fef9e4)", border: "0.5px solid #fde68a", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "2px", background: "#f59e0b", borderRadius: "2px 0 0 2px" }} />
              <p style={{ fontSize: "2.5px", color: "#d97706", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", paddingLeft: "4px" }}>Improve</p>
              <p style={{ fontSize: "7px", color: "#b45309", fontWeight: 900, marginTop: "1px", letterSpacing: "-0.02em", paddingLeft: "4px" }}>{config.improve}</p>
            </div>
          </div>
          <p style={{ fontSize: "3px", color: "#b0b8c8", fontWeight: 700, marginTop: "auto", paddingTop: "3px" }}>AI gap analysis · updated daily</p>
        </div>
      );

    case "interview-q":
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "linear-gradient(160deg, #0f1420 0%, #0C0E14 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "5px 5px" }} />
          <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", width: "50px", height: "28px", background: "rgba(60,97,168,0.4)", filter: "blur(14px)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(60,97,168,0.6), transparent)" }} />
          <p style={{ position: "absolute", bottom: "2px", right: "3px", fontSize: "30px", color: "rgba(245,209,52,0.05)", fontWeight: 900, lineHeight: 1, userSelect: "none" }}>&rdquo;</p>
          <div style={{ display: "flex", alignItems: "center", gap: "3px", position: "relative", marginBottom: "5px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "linear-gradient(135deg, #3C61A8, #1e40af)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 6px rgba(60,97,168,0.5)" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "1px", background: "#fff", opacity: 0.9 }} />
            </div>
            <Chip bg="rgba(245,209,52,0.12)" color="#F5D134" text="Interview Q" />
          </div>
          <div style={{ flex: 1, padding: "5px 6px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", position: "relative" }}>
            <p style={{ fontSize: "3.8px", color: "rgba(255,255,255,0.82)", lineHeight: 1.6, fontWeight: 500 }}>
              &ldquo;{config.question}&rdquo;
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "5px", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "2.5px" }}>
              <div style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#22c55e", boxShadow: "0 0 4px #22c55e" }} />
              <p style={{ fontSize: "3px", color: "rgba(255,255,255,0.28)", fontWeight: 700 }}>AI · Role-specific</p>
            </div>
            <div style={{ display: "flex", gap: "1.5px" }}>
              {[1,2,3,4].map(i => <div key={i} style={{ width: "3px", height: "5px", borderRadius: "1px", backgroundColor: `rgba(245,209,52,${0.2 + i * 0.15})` }} />)}
            </div>
          </div>
        </div>
      );

    case "salary":
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "linear-gradient(150deg, #edf4ff 0%, #f5f9ff 50%, #fff 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: "-6px", right: "-6px", width: "30px", height: "30px", background: "rgba(60,97,168,0.06)", borderRadius: "50%", filter: "blur(8px)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <p style={LABEL_STYLE}>Salary Intel</p>
            <Chip bg="rgba(22,163,74,0.1)" color="#16a34a" text={config.trend + " ↑"} />
          </div>
          <div style={{ marginTop: "4px" }}>
            <Sparkline points={[58, 61, 65, 68, 72]} color="#3C61A8" w={46} h={14} />
          </div>
          <p style={{ fontSize: "22px", color: "#3C61A8", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.05em", marginTop: "2px" }}>{config.amount}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "2px" }}>
            <p style={{ fontSize: "3px", color: "#6b7280", fontWeight: 700 }}>Market rate · Your role</p>
          </div>
          <div style={{ marginTop: "auto", padding: "3px 5px", borderRadius: "4px", background: "rgba(60,97,168,0.05)", border: "0.5px solid rgba(60,97,168,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: "3px", color: "#9ca3af", fontWeight: 600 }}>Based on 420 live offers</p>
            <p style={{ fontSize: "3px", color: "#3C61A8", fontWeight: 900 }}>Top 30%</p>
          </div>
        </div>
      );

    case "readiness": {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const displayScore = useCountUp(config.score, 1200);
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "linear-gradient(150deg, #2a4a9e 0%, #3C61A8 40%, #162d6e 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "6px 6px" }} />
          <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "45px", height: "45px", background: "rgba(245,209,52,0.08)", borderRadius: "50%", filter: "blur(12px)" }} />
          <p style={{ ...LABEL_STYLE, color: "rgba(255,255,255,0.3)", position: "relative" }}>Career Readiness</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", position: "relative" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: "-4px", borderRadius: "50%", background: "rgba(245,209,52,0.12)", filter: "blur(5px)" }} />
              <AnimatedArcProgress pct={config.score} r={14} stroke={2.5} bg="rgba(255,255,255,0.07)" fg="#F5D134" size={32} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: "8.5px", color: "#fff", fontWeight: 900, lineHeight: 1 }}>{displayScore}</p>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "3px", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>out of 100</p>
              <p style={{ fontSize: "5.5px", color: "#F5D134", fontWeight: 900, marginTop: "1.5px", textShadow: "0 0 8px rgba(245,209,52,0.4)" }}>Top 15%</p>
              {[["Technical", 82], ["Comm.", 90]].map(([k, v]) => (
                <div key={String(k)} style={{ marginTop: "2.5px" }}>
                  <div style={{ height: "2px", borderRadius: "1px", backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{ width: `${v}%`, height: "100%", borderRadius: "1px", background: "linear-gradient(90deg, rgba(245,209,52,0.6), rgba(245,209,52,0.9))" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "auto", padding: "3.5px 6px", borderRadius: "5px", background: "rgba(34,197,94,0.12)", border: "0.5px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", gap: "3px", position: "relative" }}>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#22c55e", boxShadow: "0 0 5px #22c55e" }} />
            <p style={{ fontSize: "4.5px", color: "#4ade80", fontWeight: 900 }}>Interview Ready</p>
          </div>
        </div>
      );
    }

    case "company":
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10px", left: "-10px", width: "35px", height: "35px", background: "rgba(60,97,168,0.04)", borderRadius: "50%", filter: "blur(10px)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "7px", background: "linear-gradient(135deg, #3C61A8 0%, #1e40af 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 3px 8px rgba(60,97,168,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
              <p style={{ fontSize: "11px", color: "#fff", fontWeight: 900, lineHeight: 1 }}>{config.initial}</p>
            </div>
            <div>
              <p style={{ fontSize: "6.5px", color: "#0C0E14", fontWeight: 900, lineHeight: 1 }}>{config.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "2px", marginTop: "1.5px" }}>
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#22c55e", boxShadow: "0 0 4px #22c55e" }} />
                <p style={{ fontSize: "3px", color: "#16a34a", fontWeight: 800 }}>Actively hiring</p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "2.5px", marginBottom: "4px" }}>
            <div style={{ padding: "1.5px 4px", borderRadius: "3px", background: "rgba(60,97,168,0.07)", border: "0.5px solid rgba(60,97,168,0.12)" }}>
              <p style={{ fontSize: "2.8px", color: "#3C61A8", fontWeight: 800 }}>Product</p>
            </div>
            <div style={{ padding: "1.5px 4px", borderRadius: "3px", background: "rgba(245,209,52,0.15)", border: "0.5px solid rgba(245,209,52,0.3)" }}>
              <p style={{ fontSize: "2.8px", color: "#92700a", fontWeight: 800 }}>Senior</p>
            </div>
          </div>
          <p style={{ fontSize: "3.5px", color: "#6b7280", fontWeight: 600 }}>Senior Product Manager</p>
          <div style={{ height: "0.5px", background: "rgba(0,0,0,0.05)", margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "3px", color: "#9ca3af", fontWeight: 600 }}>Profile match</p>
            <p style={{ fontSize: "6px", color: "#3C61A8", fontWeight: 900 }}>94%</p>
          </div>
          <div style={{ height: "3px", borderRadius: "2px", backgroundColor: "rgba(60,97,168,0.07)", marginTop: "2.5px", overflow: "hidden" }}>
            <div style={{ width: "94%", height: "100%", borderRadius: "2px", background: "linear-gradient(90deg, #3C61A8, #2563eb)", boxShadow: "0 0 5px rgba(60,97,168,0.4)" }} />
          </div>
        </div>
      );

    case "timeline":
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "linear-gradient(160deg, #111520 0%, #0C0E14 60%, #0a0c13 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "5px 5px" }} />
          <div style={{ position: "absolute", top: "-8px", left: "50%", transform: "translateX(-50%)", width: "40px", height: "20px", background: "rgba(245,209,52,0.1)", filter: "blur(12px)", borderRadius: "50%" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <p style={{ ...LABEL_STYLE, color: "rgba(245,209,52,0.45)" }}>Offer Timeline</p>
            <div style={{ padding: "1.5px 3.5px", borderRadius: "3px", background: "rgba(34,197,94,0.1)", border: "0.5px solid rgba(34,197,94,0.2)" }}>
              <p style={{ fontSize: "2.8px", color: "#4ade80", fontWeight: 900 }}>Fast Track</p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: "30px", color: "#F5D134", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.05em", marginTop: "1px", position: "relative", textShadow: "0 0 24px rgba(245,209,52,0.35)" }}>{config.weeks}</p>
            <p style={{ fontSize: "4.5px", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginTop: "-1px" }}>avg. weeks to offer</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0px", marginTop: "auto", position: "relative" }}>
            <div style={{ position: "absolute", left: "2px", top: "5px", bottom: "5px", width: "0.5px", background: "linear-gradient(180deg, #F5D134 40%, rgba(255,255,255,0.06) 40%)" }} />
            {(["Apply", "Screen", "Interview", "Offer"] as const).map((step, idx) => {
              const done = idx < 2;
              return (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "5px", paddingBottom: idx < 3 ? "5px" : "0" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", flexShrink: 0, backgroundColor: done ? "#F5D134" : "rgba(255,255,255,0.07)", boxShadow: done ? "0 0 5px rgba(245,209,52,0.6)" : "none", zIndex: 1 }} />
                  <p style={{ fontSize: "3.5px", color: done ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.18)", fontWeight: done ? 800 : 500 }}>{step}</p>
                  {done && <p style={{ fontSize: "3px", color: "#4ade80", fontWeight: 700, marginLeft: "auto" }}>✓</p>}
                </div>
              );
            })}
          </div>
        </div>
      );

    case "kyb":
      return (
        <div style={{ ...COL_STYLE, ...PAD, backgroundColor: "#F5D134", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: "-4px", right: "-2px", fontSize: "28px", color: "rgba(12,14,20,0.035)", fontWeight: 900, lineHeight: 1, userSelect: "none", fontFamily: "monospace" }}>KYB</div>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: "rgba(12,14,20,0.12)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <p style={{ ...LABEL_STYLE, color: "rgba(12,14,20,0.38)" }}>Know Yourself</p>
            <div style={{ padding: "1.5px 4px", borderRadius: "3px", backgroundColor: "rgba(12,14,20,0.1)", border: "0.5px solid rgba(12,14,20,0.08)" }}>
              <p style={{ fontSize: "3px", color: "rgba(12,14,20,0.55)", fontWeight: 900 }}>10 min</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "5px" }}>
            {config.strengths.map((s, i) => {
              const pcts = [94, 81, 88];
              return (
                <div key={s} style={{ padding: "3px 5px", borderRadius: "5px", backgroundColor: "rgba(12,14,20,0.07)", border: "0.5px solid rgba(12,14,20,0.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <div style={{ width: "3.5px", height: "3.5px", borderRadius: "50%", backgroundColor: "#3C61A8", boxShadow: `0 0 4px rgba(60,97,168,0.5)` }} />
                      <p style={{ fontSize: "4.5px", color: "#3C61A8", fontWeight: 900 }}>{s}</p>
                    </div>
                    <p style={{ fontSize: "3.5px", color: "rgba(60,97,168,0.7)", fontWeight: 900 }}>{pcts[i]}%</p>
                  </div>
                  <div style={{ height: "1.5px", borderRadius: "1px", backgroundColor: "rgba(60,97,168,0.12)", overflow: "hidden" }}>
                    <div style={{ width: `${pcts[i]}%`, height: "100%", borderRadius: "1px", background: "linear-gradient(90deg, #3C61A8cc, #3C61A8)" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: "3px", color: "rgba(12,14,20,0.28)", fontWeight: 700, marginTop: "auto", paddingTop: "3px" }}>CareerX Assessment · Top 8%</p>
        </div>
      );

    case "career-track":
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-8px", right: "-8px", width: "28px", height: "28px", background: "rgba(245,209,52,0.15)", borderRadius: "50%", filter: "blur(8px)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={LABEL_STYLE}>Career Track</p>
            <Chip bg="rgba(245,209,52,0.2)" color="#92700a" text="25% done" />
          </div>
          <p style={{ fontSize: "6px", color: "#0C0E14", fontWeight: 900, marginTop: "3px", lineHeight: 1.2 }}>{config.role}</p>
          <div style={{ height: "2.5px", borderRadius: "2px", backgroundColor: "rgba(60,97,168,0.07)", overflow: "hidden", margin: "4px 0" }}>
            <div style={{ width: "25%", height: "100%", borderRadius: "2px", background: "linear-gradient(90deg, #3C61A8, #2563eb)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0px", position: "relative" }}>
            <div style={{ position: "absolute", left: "2.5px", top: "5px", bottom: "5px", width: "0.5px", background: "linear-gradient(180deg, #3C61A8 25%, #e5e7eb 25%)" }} />
            {["Research", "Skill-up", "Interview", "Offer"].map((step, i) => {
              const done = i < config.stage;
              const active = i === config.stage;
              return (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "5px", paddingBottom: i < 3 ? "6px" : 0 }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: done ? "#3C61A8" : active ? "#F5D134" : "#e5e7eb", flexShrink: 0, zIndex: 1, boxShadow: active ? "0 0 5px rgba(245,209,52,0.7)" : done ? "0 0 4px rgba(60,97,168,0.4)" : "none" }} />
                  <p style={{ fontSize: "3.5px", color: i <= config.stage ? "#0C0E14" : "#9ca3af", fontWeight: i <= config.stage ? 800 : 500 }}>{step}</p>
                  {active && <p style={{ fontSize: "2.8px", color: "#3C61A8", fontWeight: 900, marginLeft: "auto" }}>Now</p>}
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: "3px", color: "#9ca3af", fontWeight: 600, marginTop: "2px" }}>Step {config.stage} of 4 · est. 6 weeks</p>
        </div>
      );

    case "activation":
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "linear-gradient(160deg, #111827 0%, #0C0E14 70%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "5px 5px" }} />
          <div style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "40px", height: "40px", background: "rgba(96,165,250,0.08)", borderRadius: "50%", filter: "blur(12px)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px", position: "relative" }}>
            <p style={{ ...LABEL_STYLE, color: "rgba(255,255,255,0.22)" }}>This Week</p>
            <Chip bg="rgba(74,222,128,0.12)" color="#4ade80" text="Activated" />
          </div>
          {[
            { n: config.apps,       label: "Applied",    color: "#60a5fa", trend: "+2" },
            { n: config.interviews, label: "Interviews", color: "#a78bfa", trend: "+1" },
            { n: config.offers,     label: "Offer",      color: "#34d399", trend: "New" },
          ].map((r, i) => (
            <div key={r.label} style={{ position: "relative" }}>
              {i > 0 && <div style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.04)", margin: "4px 0" }} />}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "3.5px" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: r.color, boxShadow: `0 0 5px ${r.color}88` }} />
                  <p style={{ fontSize: "3.5px", color: "rgba(255,255,255,0.32)", fontWeight: 600 }}>{r.label}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <p style={{ fontSize: "3px", color: r.color, fontWeight: 800, opacity: 0.8 }}>{r.trend}</p>
                  <p style={{ fontSize: "8px", color: "#fff", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>{r.n}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case "ai-feedback":
      return (
        <div style={{ ...COL_STYLE, ...PAD, background: "linear-gradient(160deg, #f8faff 0%, #fff 60%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #3C61A8 0%, #60a5fa 50%, #3C61A8 100%)", opacity: 0.7 }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px", marginTop: "3px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "2.5px", padding: "2px 4px", borderRadius: "3px", backgroundColor: "rgba(60,97,168,0.07)", border: "0.5px solid rgba(60,97,168,0.12)" }}>
              <div style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#3C61A8", boxShadow: "0 0 4px rgba(60,97,168,0.5)" }} />
              <p style={{ fontSize: "3px", color: "#3C61A8", fontWeight: 900, letterSpacing: "0.06em" }}>CareerX AI</p>
            </div>
            <div style={{ position: "relative", width: "22px", height: "22px" }}>
              <AnimatedArcProgress pct={82} r={9} stroke={1.8} bg="rgba(60,97,168,0.08)" fg="#3C61A8" size={22} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: "5px", color: "#3C61A8", fontWeight: 900 }}>{config.grade}</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, padding: "5px 6px", borderRadius: "5px", backgroundColor: "#f0f5ff", border: "0.5px solid rgba(60,97,168,0.1)" }}>
            <p style={{ fontSize: "3.8px", color: "rgba(12,14,20,0.72)", lineHeight: 1.6, fontWeight: 500 }}>
              &ldquo;{config.text}&rdquo;
            </p>
          </div>
          <div style={{ marginTop: "5px", display: "flex", flexDirection: "column", gap: "2px" }}>
            {[["Structure", 70], ["Delivery", 85]].map(([label, pct]) => (
              <div key={String(label)} style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <p style={{ fontSize: "2.8px", color: "#9ca3af", fontWeight: 700, minWidth: "22px" }}>{label}</p>
                <div style={{ flex: 1, height: "2px", borderRadius: "1px", backgroundColor: "rgba(60,97,168,0.08)", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", borderRadius: "1px", background: "#3C61A8", opacity: 0.7 }} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "3px", color: "#b0b8c8", fontWeight: 700, marginTop: "4px" }}>Round 1 · Interview Sim</p>
        </div>
      );
  }
}

// ─── Card Back ────────────────────────────────────────────────────────────────
const CARD_BACK_INFO: Record<string, { label: string; desc: string }> = {
  "role-match":    { label: "Role Matching",    desc: "AI-matched to your profile" },
  "skill-tags":    { label: "Skill Analysis",   desc: "Auto-identified strengths" },
  "gap-insight":   { label: "Gap Analysis",     desc: "Precise gap detection" },
  "interview-q":   { label: "Interview Prep",   desc: "Role-specific questions" },
  "salary":        { label: "Salary Intel",     desc: "Live market benchmarks" },
  "readiness":     { label: "Readiness Score",  desc: "Interview confidence" },
  "company":       { label: "Company Match",    desc: "500+ hiring partners" },
  "timeline":      { label: "Offer Timeline",   desc: "Based on your profile" },
  "kyb":           { label: "Know Yourself",    desc: "10-min assessment" },
  "career-track":  { label: "Career Track",     desc: "Role-specific path" },
  "activation":    { label: "Activation",       desc: "Application support" },
  "ai-feedback":   { label: "AI Feedback",      desc: "Real-time coaching" },
};

function CardBack({ config }: { config: CardConfig }) {
  const info = CARD_BACK_INFO[config.type];
  return (
    <div style={{
      width: "100%", height: "100%", padding: "8px",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg, #1a2f6e 0%, #0C0E14 55%, #0f1933 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)", backgroundSize: "5px 5px" }} />
      {/* Top blue glow */}
      <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", width: "50px", height: "25px", background: "rgba(60,97,168,0.5)", filter: "blur(14px)", borderRadius: "50%" }} />
      {/* Yellow accent line */}
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1.5px", background: "linear-gradient(90deg, transparent, #F5D134, transparent)", borderRadius: "1px" }} />

      {/* Feature icon */}
      <div style={{
        position: "relative", width: "20px", height: "20px", borderRadius: "6px",
        background: "linear-gradient(135deg, #F5D134 0%, #e8c118 100%)",
        marginBottom: "7px", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 3px 10px rgba(245,209,52,0.45), 0 0 0 3px rgba(245,209,52,0.08)",
      }}>
        <div style={{ width: "7px", height: "1.5px", backgroundColor: "#0C0E14", borderRadius: "1px" }} />
        <div style={{ position: "absolute", width: "1.5px", height: "7px", backgroundColor: "#0C0E14", borderRadius: "1px" }} />
      </div>

      {/* Feature label */}
      <p style={{ fontSize: "6px", color: "#fff", fontWeight: 900, textAlign: "center", marginBottom: "4px", position: "relative", letterSpacing: "-0.01em" }}>{info.label}</p>
      <p style={{ fontSize: "3.5px", color: "rgba(255,255,255,0.38)", fontWeight: 500, textAlign: "center", position: "relative", lineHeight: 1.5, maxWidth: "44px" }}>{info.desc}</p>

      {/* Bottom brand pill */}
      <div style={{
        position: "absolute", bottom: "6px",
        display: "flex", alignItems: "center", gap: "3px",
        padding: "2px 6px", borderRadius: "3px",
        background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ width: "3.5px", height: "3.5px", borderRadius: "50%", backgroundColor: "#F5D134", opacity: 0.6 }} />
        <p style={{ fontSize: "2.5px", color: "rgba(255,255,255,0.22)", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase" }}>CareerX</p>
      </div>
    </div>
  );
}

// ─── FlipCard ─────────────────────────────────────────────────────────────────
function FlipCard({ config, target, staggerDelay = 0 }: FlipCardProps) {
  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 40, damping: 15, delay: staggerDelay }}
      style={{ position: "absolute", width: CARD_W, height: CARD_H, transformStyle: "preserve-3d", perspective: "1000px" }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            borderRadius: "14px",
            boxShadow: "0 1px 2px rgba(12,14,20,0.04), 0 4px 16px rgba(12,14,20,0.10), 0 20px 48px rgba(12,14,20,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
            border: "0.5px solid rgba(255,255,255,0.65)",
          }}
        >
          <CardFront config={config} />
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "14px",
            boxShadow: "0 1px 2px rgba(12,14,20,0.06), 0 4px 16px rgba(12,14,20,0.14), 0 20px 48px rgba(12,14,20,0.10)",
            border: "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          <CardBack config={config} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Lerp ─────────────────────────────────────────────────────────────────────
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

// ─── Main Hero Component ──────────────────────────────────────────────────────
const MAX_SCROLL = 3000;

export default function IntroAnimation({ onAutoAdvance }: { onAutoAdvance?: () => void }) {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showStagger, setShowStagger] = useState(false);
  const [flashOut, setFlashOut] = useState(false);
  const staggerApplied = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  const autoAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  const cancelAuto = () => {
    if (autoAnimRef.current) {
      autoAnimRef.current.stop();
      autoAnimRef.current = null;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cancelAuto();
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 40);
      const newScroll = Math.min(Math.max(scrollRef.current + delta, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      cancelAuto();
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width * 2 - 1) * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  const [circleReady, setCircleReady] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("circle"), 600);
    const t2 = setTimeout(() => setCircleReady(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Stagger cards on first circle entry
  useEffect(() => {
    if (introPhase !== "scatter" && !staggerApplied.current) {
      staggerApplied.current = true;
      setShowStagger(true);
      const t = setTimeout(() => setShowStagger(false), TOTAL_CARDS * 60 + 800);
      return () => clearTimeout(t);
    }
  }, [introPhase]);

  // Auto-advance: mobile only — desktop requires manual scroll
  const isMobileDevice = containerSize.width > 0 && containerSize.width < 768;

  useEffect(() => {
    if (!circleReady) return;
    if (!isMobileDevice) return; // desktop: manual scroll only
    const t = setTimeout(() => {
      autoAnimRef.current = animate(virtualScroll, MAX_SCROLL, {
        duration: 2,
        ease: [0.6, 0.01, 0.05, 0.95],
        onUpdate: (v) => { scrollRef.current = v; },
        onComplete: () => {
          autoAnimRef.current = null;
          setFlashOut(true);
          setTimeout(() => onAutoAdvance?.(), 280);
        },
      });
    }, 1200);
    return () => {
      clearTimeout(t);
      cancelAuto();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circleReady, isMobileDevice]);


  const scatterPositions = useMemo(() => CARDS.map(() => ({
    x: (Math.random() - 0.5) * 1500,
    y: (Math.random() - 0.5) * 1000,
    rotation: (Math.random() - 0.5) * 180,
    scale: 0.6,
    opacity: 0,
  })), []);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change", setParallaxValue);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 62%, rgba(60,97,168,0.07) 0%, transparent 70%), #F7F8FC" }}>

      {/* Ambient glow orbs — static, no animation to avoid GPU contention with card springs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", width: 700, height: 700, background: "radial-gradient(circle, rgba(60,97,168,0.08) 0%, transparent 65%)", borderRadius: "50%", left: "5%", top: "10%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,209,52,0.06) 0%, transparent 65%)", borderRadius: "50%", right: "0%", top: "35%", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(60,97,168,0.05) 0%, transparent 65%)", borderRadius: "50%", left: "40%", bottom: "0%", filter: "blur(60px)" }} />
      </div>

      {/* Flash overlay on exit */}
      <AnimatePresence>
        {flashOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeIn" }}
            style={{ position: "absolute", inset: 0, background: "white", zIndex: 200, pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>

      <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

        {/* Intro headline — mobile: top, desktop: center */}
        <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none px-6 top-[10%] md:top-[52%] md:-translate-y-1/2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={circleReady && morphValue < 0.3 ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-3"
            style={{ color: "#3C61A8" }}
          >
            CareerXcelerator
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.92, filter: "blur(12px)" }}
            animate={
              circleReady && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.96, filter: "blur(12px)" }
            }
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl font-black tracking-tight text-gray-800"
          >
            Know yourself better.
            <br />
            <span style={{ color: "#3C61A8" }}>Land the role.</span>
          </motion.h1>
          {!isMobileDevice && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={circleReady && morphValue < 0.3 ? { opacity: 0.4 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-[11px] font-medium text-gray-400"
            >
              Scroll to explore ↓
            </motion.p>
          )}
        </div>

        {/* Arc headline — fades in once cards fan out (desktop only) */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[14%] z-10 hidden md:flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <p className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-400 mb-3">
            CareerXcelerator
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3 leading-tight">
            Your strengths. Your gaps.<br /> Your path forward.
          </h2>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed font-medium">
            Strengths, gaps, salary and readiness. Mapped by AI in 10 minutes.{" "}
            <span className="text-gray-800 font-semibold">Hover a card to explore.</span>
          </p>
        </motion.div>

        {/* Cards */}
        <div className="relative flex items-center justify-center w-full h-full">
          {CARDS.map((config, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const spacing = 70;
              const totalW = TOTAL_CARDS * spacing;
              target = { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const isSmallPhone = containerSize.width < 390;
              const minDim = Math.min(containerSize.width, containerSize.height);

              const circleRadius = Math.min(minDim * 0.28, 280);
              const circleAngle = (i / TOTAL_CARDS) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = isMobile ? 40 : 50;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_CARDS - 1);

              const scrollProg = Math.min(Math.max(rotateValue / 360, 0), 1);
              const boundedRotation = -scrollProg * spreadAngle * 0.8;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isSmallPhone ? 1.4 : isMobile ? 1.8 : 2.6,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={i}
                config={config}
                index={i}
                total={TOTAL_CARDS}
                phase={introPhase}
                target={target}
                staggerDelay={showStagger ? i * 0.055 : 0}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
