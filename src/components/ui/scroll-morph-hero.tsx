"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
import {
  Crosshair, Zap, BarChart3, Mic, DollarSign, CheckCircle,
  Building2, Clock, Search, BookOpen, Rocket, MessageSquare,
} from "lucide-react";

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
const CARD_W = 80;
const CARD_H = 110;

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

const LABEL_STYLE = { fontSize: "4.5px", letterSpacing: "0.14em", color: "#9ca3af", fontWeight: 800, textTransform: "uppercase" as const };
const COL_STYLE = { display: "flex", flexDirection: "column" as const, height: "100%", width: "100%" };
const PAD = { padding: "8px" };

function Chip({ bg, color, text }: { bg: string; color: string; text: string }) {
  return (
    <div style={{ display: "inline-flex", padding: "2px 5px", borderRadius: "3px", backgroundColor: bg, alignSelf: "flex-start" }}>
      <p style={{ fontSize: "3.5px", color, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" }}>{text}</p>
    </div>
  );
}

// ─── Product Screen Header (reusable) ────────────────────────────────────────
function ScreenHeader({ label, stage, dark = false }: { label: string; stage: string; dark?: boolean }) {
  const stageColors: Record<string, string> = { Discover: "#3C61A8", Prepare: "#16a34a", Validate: "#7c3aed", Activate: "#F5D134" };
  const color = stageColors[stage] || "#3C61A8";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
      <p style={{ fontSize: "3.5px", color: dark ? "rgba(255,255,255,0.45)" : "rgba(12,14,20,0.4)", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</p>
      <div style={{ padding: "1px 4px", borderRadius: "3px", backgroundColor: dark ? `${color}22` : `${color}12`, border: `0.5px solid ${dark ? `${color}33` : `${color}18`}` }}>
        <p style={{ fontSize: "3px", color, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" }}>{stage}</p>
      </div>
    </div>
  );
}

// ─── Clean Concept Cards ─────────────────────────────────────────────────────
// Poch-inspired: flat bg, 1px subtle border, generous spacing, no decoration

// Color psychology: blue=trust, green=growth, purple=ambition, orange=energy,
// coral=warmth, teal=clarity, gold=achievement, dark=premium, mint=freshness

const CARD_FACES: Record<string, { bg: string; fg: string; muted: string; border: string; iconBg: string; iconFg: string; icon: React.ElementType; value: string; label: string }> = {
  "role-match":   { bg: "#fff",     fg: "#0C0E14", muted: "rgba(0,0,0,0.3)",       border: "rgba(0,0,0,0.08)",       iconBg: "rgba(60,97,168,0.1)",    iconFg: "#3C61A8",  icon: Crosshair,     value: "What role fits me?",  label: "92% match" },
  "skill-tags":   { bg: "#F5D134",  fg: "#0C0E14", muted: "rgba(0,0,0,0.35)",      border: "rgba(0,0,0,0.06)",       iconBg: "rgba(0,0,0,0.08)",       iconFg: "#0C0E14",  icon: Zap,           value: "3",               label: "Skills Verified" },
  "gap-insight":  { bg: "#f0faf0",  fg: "#15803d", muted: "rgba(21,128,61,0.45)",  border: "rgba(21,128,61,0.1)",    iconBg: "rgba(21,128,61,0.1)",    iconFg: "#15803d",  icon: BarChart3,     value: "2",               label: "Gaps Found" },
  "interview-q":  { bg: "#0C0E14",  fg: "#fff",    muted: "rgba(255,255,255,0.35)", border: "rgba(255,255,255,0.08)", iconBg: "rgba(255,255,255,0.08)", iconFg: "#a78bfa",  icon: Mic,           value: "Can I crack it?", label: "AI Interview" },
  "salary":       { bg: "#f3f0ff",  fg: "#5b21b6", muted: "rgba(91,33,182,0.4)",   border: "rgba(91,33,182,0.08)",   iconBg: "rgba(91,33,182,0.1)",    iconFg: "#7c3aed",  icon: DollarSign,    value: "$72,000",         label: "Avg Salary" },
  "readiness":    { bg: "#3C61A8",  fg: "#fff",    muted: "rgba(255,255,255,0.45)", border: "rgba(255,255,255,0.1)",  iconBg: "rgba(255,255,255,0.1)",  iconFg: "#F5D134",  icon: CheckCircle,   value: "87%",             label: "Interview Ready" },
  "company":      { bg: "#fff7ed",  fg: "#c2410c", muted: "rgba(194,65,12,0.4)",   border: "rgba(194,65,12,0.08)",   iconBg: "rgba(194,65,12,0.1)",    iconFg: "#ea580c",  icon: Building2,     value: "Who is hiring?",  label: "94% Job Match" },
  "timeline":     { bg: "#1a1a2e",  fg: "#fff",    muted: "rgba(255,255,255,0.35)", border: "rgba(255,255,255,0.06)", iconBg: "rgba(245,209,52,0.12)",  iconFg: "#F5D134",  icon: Clock,         value: "21",              label: "Days to Offer" },
  "kyb":          { bg: "#fef3c7",  fg: "#92400e", muted: "rgba(146,64,14,0.4)",   border: "rgba(146,64,14,0.08)",   iconBg: "rgba(146,64,14,0.1)",    iconFg: "#b45309",  icon: Search,        value: "Free",            label: "Start in 10 min" },
  "career-track": { bg: "#ecfeff",  fg: "#0e7490", muted: "rgba(14,116,144,0.4)",  border: "rgba(14,116,144,0.08)",  iconBg: "rgba(14,116,144,0.1)",   iconFg: "#0891b2",  icon: BookOpen,      value: "How to prepare?", label: "6 Week Track" },
  "activation":   { bg: "#fdf2f8",  fg: "#be185d", muted: "rgba(190,24,93,0.35)",  border: "rgba(190,24,93,0.06)",   iconBg: "rgba(190,24,93,0.1)",    iconFg: "#ec4899",  icon: Rocket,        value: "500+",            label: "Companies Hiring" },
  "ai-feedback":  { bg: "#fff",     fg: "#0C0E14", muted: "rgba(0,0,0,0.3)",       border: "rgba(0,0,0,0.08)",       iconBg: "rgba(60,97,168,0.08)",   iconFg: "#3C61A8",  icon: MessageSquare, value: "Feedback",        label: "After Every Round" },
};

function CardFront({ config }: { config: CardConfig }) {
  const c = CARD_FACES[config.type];
  const Icon = c.icon;

  return (
    <div style={{
      ...COL_STYLE,
      background: c.bg,
      padding: "14px 12px",
      alignItems: "flex-start",
      justifyContent: "space-between",
      borderTop: `1px solid ${c.border}`,
      borderLeft: `1px solid ${c.border}`,
      borderRight: `1px solid ${c.border}`,
      borderBottom: `2.5px solid ${c.border}`,
    }}>
      {/* Icon with depth — layered shadow, gradient bg, border */}
      <div style={{
        width: "24px",
        height: "24px",
        borderRadius: "8px",
        background: c.iconBg,
        border: `1px solid ${c.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 1px 2px rgba(0,0,0,0.06), 0 3px 8px ${c.border}, inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.04)`,
      }}>
        <Icon style={{ width: "12px", height: "12px", color: c.iconFg, strokeWidth: 2.2 }} />
      </div>

      {/* Value + Label */}
      <div>
        <p style={{
          fontSize: c.value.length <= 4 ? "20px" : c.value.length <= 7 ? "14px" : "11px",
          fontWeight: 900,
          lineHeight: 1.1,
          color: c.fg,
          letterSpacing: "-0.03em",
        }}>
          {c.value}
        </p>
        <p style={{
          fontSize: "5.5px",
          fontWeight: 600,
          color: c.muted,
          marginTop: "3px",
          letterSpacing: "0.03em",
        }}>
          {c.label}
        </p>
      </div>
    </div>
  );
}


// ─── Card Back ────────────────────────────────────────────────────────────────
const CARD_BACK_INFO: Record<string, { label: string; desc: string; stage: string }> = {
  "role-match":    { label: "Role Matching",        desc: "AI-matched to your profile",    stage: "Discover" },
  "skill-tags":    { label: "Skill Analysis",       desc: "Auto-identified strengths",     stage: "Discover" },
  "gap-insight":   { label: "Gap Analysis",         desc: "Precise gap detection",         stage: "Prepare" },
  "interview-q":   { label: "Interview Prep",       desc: "Role-specific questions",       stage: "Validate" },
  "salary":        { label: "Salary Intelligence",  desc: "Live market benchmarks",        stage: "Activate" },
  "readiness":     { label: "Readiness Score",      desc: "Interview confidence",          stage: "Validate" },
  "company":       { label: "Company Match",        desc: "500+ hiring partners",          stage: "Activate" },
  "timeline":      { label: "Offer Timeline",       desc: "Based on your profile",         stage: "Activate" },
  "kyb":           { label: "Know Yourself Better", desc: "10-min career discovery",       stage: "Discover" },
  "career-track":  { label: "Career Track",         desc: "Role-specific preparation",     stage: "Prepare" },
  "activation":    { label: "Career Activation",    desc: "Job opportunity matching",      stage: "Activate" },
  "ai-feedback":   { label: "Interview Simulator",  desc: "Real-time AI coaching",         stage: "Validate" },
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

      {/* Stage badge */}
      <div style={{ display: "inline-flex", padding: "2px 6px", borderRadius: "4px", backgroundColor: "rgba(245,209,52,0.15)", border: "0.5px solid rgba(245,209,52,0.25)", marginBottom: "6px", position: "relative" }}>
        <p style={{ fontSize: "3.5px", color: "#F5D134", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase" }}>{info.stage}</p>
      </div>
      {/* Feature label */}
      <p style={{ fontSize: "8px", color: "#fff", fontWeight: 900, textAlign: "center", marginBottom: "5px", position: "relative", letterSpacing: "-0.01em" }}>{info.label}</p>
      <p style={{ fontSize: "4.5px", color: "rgba(255,255,255,0.38)", fontWeight: 500, textAlign: "center", position: "relative", lineHeight: 1.5, maxWidth: "55px" }}>{info.desc}</p>

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
            borderRadius: "16px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.06)",
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
            borderRadius: "16px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.06)",
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
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
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
    const t1 = setTimeout(() => setIntroPhase("line"), 500);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2500);
    const t3 = setTimeout(() => setCircleReady(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Stagger on circle entry (after line phase)
  useEffect(() => {
    if (introPhase === "circle" && !staggerApplied.current) {
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
        duration: 2.5,
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

        {/* Intro headline — pinned to center of viewport */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-6">
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
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-800"
          >
            Hiring, <span style={{ color: "#3C61A8" }}>decoded.</span>
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
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3 leading-tight">
            Role fit. Skill gaps.<br />Interview readiness.
          </h2>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed font-medium">
            Everything you need to go from career clarity to job offer. In one system.
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

              const spreadAngle = isMobile ? 100 : 130;
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
                scale: isSmallPhone ? 1.4 : isMobile ? 1.4 : 1.8,
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
