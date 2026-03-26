"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import {
  Crosshair, Zap, Mic, DollarSign, CheckCircle,
  Building2, Search, BookOpen,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AnimationPhase = "scatter" | "line" | "circle";

// ─── Card Dimensions ──────────────────────────────────────────────────────────
const CARD_W = 100;
const CARD_H = 130;
const CARD_W_MOBILE = 80;
const CARD_H_MOBILE = 105;

// ─── 8 Product Cards — each tells one clear story ────────────────────────────
// Color psychology: blue=trust, yellow=energy, green=growth, purple=ambition,
// dark=premium, coral=warmth, teal=clarity, mint=freshness

interface CardData {
  id: string;
  bg: string;
  fg: string;
  muted: string;
  border: string;
  iconBg: string;
  iconFg: string;
  icon: React.ElementType;
  value: string;
  label: string;
}

const CARDS: CardData[] = [
  { id: "role-match",   bg: "#fff",     fg: "#0C0E14", muted: "rgba(0,0,0,0.35)",        border: "rgba(0,0,0,0.08)",       iconBg: "rgba(60,97,168,0.1)",    iconFg: "#3C61A8",  icon: Crosshair,   value: "92%",     label: "Role Match" },
  { id: "skills",       bg: "#F5D134",  fg: "#0C0E14", muted: "rgba(0,0,0,0.4)",         border: "rgba(0,0,0,0.06)",       iconBg: "rgba(0,0,0,0.08)",       iconFg: "#0C0E14",  icon: Zap,         value: "3",       label: "Skills Verified" },
  { id: "interview",    bg: "#0C0E14",  fg: "#fff",    muted: "rgba(255,255,255,0.4)",    border: "rgba(255,255,255,0.08)", iconBg: "rgba(255,255,255,0.08)", iconFg: "#a78bfa",  icon: Mic,         value: "Live",    label: "AI Interview" },
  { id: "salary",       bg: "#f3f0ff",  fg: "#5b21b6", muted: "rgba(91,33,182,0.45)",    border: "rgba(91,33,182,0.08)",   iconBg: "rgba(91,33,182,0.1)",    iconFg: "#7c3aed",  icon: DollarSign,  value: "$72k",    label: "Avg Salary" },
  { id: "ready",        bg: "#3C61A8",  fg: "#fff",    muted: "rgba(255,255,255,0.5)",    border: "rgba(255,255,255,0.1)",  iconBg: "rgba(255,255,255,0.1)",  iconFg: "#F5D134",  icon: CheckCircle, value: "87%",     label: "Interview Ready" },
  { id: "hiring",       bg: "#fff7ed",  fg: "#c2410c", muted: "rgba(194,65,12,0.45)",    border: "rgba(194,65,12,0.08)",   iconBg: "rgba(194,65,12,0.1)",    iconFg: "#ea580c",  icon: Building2,   value: "500+",    label: "Hiring Partners" },
  { id: "kyb",          bg: "#fef3c7",  fg: "#92400e", muted: "rgba(146,64,14,0.45)",    border: "rgba(146,64,14,0.08)",   iconBg: "rgba(146,64,14,0.1)",    iconFg: "#b45309",  icon: Search,      value: "Free",    label: "10 min to start" },
  { id: "track",        bg: "#ecfeff",  fg: "#0e7490", muted: "rgba(14,116,144,0.45)",   border: "rgba(14,116,144,0.08)",  iconBg: "rgba(14,116,144,0.1)",   iconFg: "#0891b2",  icon: BookOpen,    value: "6 wks",   label: "Career Track" },
];
const TOTAL_CARDS = CARDS.length;

// ─── Card Face ────────────────────────────────────────────────────────────────
function CardFace({ card, isMobile }: { card: CardData; isMobile: boolean }) {
  const Icon = card.icon;
  const w = isMobile ? CARD_W_MOBILE : CARD_W;
  const h = isMobile ? CARD_H_MOBILE : CARD_H;
  const iconSize = isMobile ? 20 : 26;
  const innerIcon = isMobile ? 10 : 13;
  const valueSize = card.value.length <= 4 ? (isMobile ? 22 : 28) : (isMobile ? 16 : 20);
  const labelSize = isMobile ? 6 : 7;

  return (
    <div style={{
      width: w,
      height: h,
      background: card.bg,
      borderRadius: isMobile ? 14 : 18,
      padding: isMobile ? "10px" : "14px 13px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderTop: `1px solid ${card.border}`,
      borderLeft: `1px solid ${card.border}`,
      borderRight: `1px solid ${card.border}`,
      borderBottom: `2.5px solid ${card.border}`,
      boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.04)",
    }}>
      {/* Icon */}
      <div style={{
        width: iconSize,
        height: iconSize,
        borderRadius: isMobile ? 6 : 8,
        background: card.iconBg,
        border: `1px solid ${card.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 1px 3px rgba(0,0,0,0.06), 0 4px 8px ${card.border}, inset 0 1px 0 rgba(255,255,255,0.5)`,
      }}>
        <Icon style={{ width: innerIcon, height: innerIcon, color: card.iconFg, strokeWidth: 2.2 }} />
      </div>

      {/* Value + Label */}
      <div>
        <p style={{
          fontSize: valueSize,
          fontWeight: 900,
          lineHeight: 1.1,
          color: card.fg,
          letterSpacing: "-0.03em",
        }}>
          {card.value}
        </p>
        <p style={{
          fontSize: labelSize,
          fontWeight: 600,
          color: card.muted,
          marginTop: isMobile ? 2 : 3,
          letterSpacing: "0.02em",
        }}>
          {card.label}
        </p>
      </div>
    </div>
  );
}

// ─── Single Card with spring animation ────────────────────────────────────────
function HeroCard({ card, target, staggerDelay = 0, isMobile }: {
  card: CardData;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  staggerDelay?: number;
  isMobile: boolean;
}) {
  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 45, damping: 16, delay: staggerDelay }}
      style={{
        position: "absolute",
        willChange: "transform",
      }}
    >
      <CardFace card={card} isMobile={isMobile} />
    </motion.div>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────
export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showStagger, setShowStagger] = useState(false);
  const staggerApplied = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container
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

  // Subtle mouse parallax for desktop
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width * 2 - 1) * 30);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const unsub = smoothMouseX.on("change", setParallaxValue);
    return () => unsub();
  }, [smoothMouseX]);

  const [circleReady, setCircleReady] = useState(false);

  // Animation sequence: scatter → line → circle
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 500);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2200);
    const t3 = setTimeout(() => setCircleReady(true), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Stagger on circle entry
  useEffect(() => {
    if (introPhase === "circle" && !staggerApplied.current) {
      staggerApplied.current = true;
      setShowStagger(true);
      const t = setTimeout(() => setShowStagger(false), TOTAL_CARDS * 60 + 600);
      return () => clearTimeout(t);
    }
  }, [introPhase]);

  // Scatter positions (randomized on mount)
  const scatterPositions = useMemo(() => CARDS.map(() => ({
    x: (Math.random() - 0.5) * 1200,
    y: (Math.random() - 0.5) * 800,
    rotation: (Math.random() - 0.5) * 120,
    scale: 0.6,
    opacity: 0,
  })), []);

  const isMobile = containerSize.width > 0 && containerSize.width < 768;
  const isSmallPhone = containerSize.width > 0 && containerSize.width < 390;

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 62%, rgba(60,97,168,0.07) 0%, transparent 70%), #F7F8FC" }}>

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", width: 700, height: 700, background: "radial-gradient(circle, rgba(60,97,168,0.08) 0%, transparent 65%)", borderRadius: "50%", left: "5%", top: "10%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,209,52,0.06) 0%, transparent 65%)", borderRadius: "50%", right: "0%", top: "35%", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(60,97,168,0.05) 0%, transparent 65%)", borderRadius: "50%", left: "40%", bottom: "0%", filter: "blur(60px)" }} />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center" style={{ perspective: "1000px" }}>

        {/* Hero headline — always centered, fades as cards settle */}
        <div className="absolute z-20 flex flex-col items-center text-center pointer-events-none px-6 left-0 right-0 top-[12%] md:top-0 md:bottom-0 md:justify-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={circleReady ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-3"
            style={{ color: "#3C61A8" }}
          >
            CareerXcelerator
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.92, filter: "blur(12px)" }}
            animate={circleReady ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.96, filter: "blur(12px)" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-800"
          >
            Hiring, <span style={{ color: "#3C61A8" }}>decoded.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={circleReady ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-3 text-xs sm:text-sm text-gray-500 max-w-sm"
          >
            Role fit. Skill gaps. Interview readiness. All in one system.
          </motion.p>
          <motion.a
            href="#get-started"
            initial={{ opacity: 0, y: 10 }}
            animate={circleReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 pointer-events-auto"
            style={{ backgroundColor: "#3C61A8" }}
          >
            Find My Best Role
            <span className="text-xs">→</span>
          </motion.a>
        </div>

        {/* Cards */}
        <div className="relative flex items-center justify-center w-full h-full">
          {CARDS.map((card, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const spacing = isMobile ? 55 : 75;
              const totalW = TOTAL_CARDS * spacing;
              target = { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              // Circle layout
              const minDim = Math.min(containerSize.width, containerSize.height);
              const circleRadius = isSmallPhone
                ? minDim * 0.33
                : isMobile
                  ? minDim * 0.36
                  : Math.min(minDim * 0.38, 340);

              const angleStep = 360 / TOTAL_CARDS;
              const angle = i * angleStep - 90; // start from top
              const rad = (angle * Math.PI) / 180;

              target = {
                x: Math.cos(rad) * circleRadius + (isMobile ? 0 : parallaxValue * 0.3),
                y: Math.sin(rad) * circleRadius,
                rotation: angle + 90,
                scale: 1,
                opacity: 1,
              };
            }

            return (
              <HeroCard
                key={card.id}
                card={card}
                target={target}
                staggerDelay={showStagger ? i * 0.06 : 0}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
