"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
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

// ─── 8 Product Cards ─────────────────────────────────────────────────────────
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

// ─── Lerp ────────────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

// ─── Premium Card Face with holographic sheen ────────────────────────────────
function CardFace({ card, isMobile, holoAngle }: { card: CardData; isMobile: boolean; holoAngle?: number }) {
  // Use fixed angle on server, dynamic on client to avoid hydration mismatch
  const angle = holoAngle ?? 45;
  const Icon = card.icon;
  const w = isMobile ? CARD_W_MOBILE : CARD_W;
  const h = isMobile ? CARD_H_MOBILE : CARD_H;
  const iconSize = isMobile ? 20 : 26;
  const innerIcon = isMobile ? 10 : 13;
  const valueSize = card.value.length <= 4 ? (isMobile ? 22 : 28) : (isMobile ? 16 : 20);
  const labelSize = isMobile ? 6 : 7;
  const radius = isMobile ? 14 : 18;

  // Is this a dark card?
  const isDark = card.bg === "#0C0E14" || card.bg === "#3C61A8";

  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      position: "relative", overflow: "hidden",
      // Outer shell: layered shadows for physical depth
      boxShadow: [
        "0 1px 1px rgba(0,0,0,0.03)",
        "0 2px 4px rgba(0,0,0,0.04)",
        "0 6px 12px rgba(0,0,0,0.06)",
        "0 12px 24px rgba(0,0,0,0.05)",
        "0 24px 48px rgba(0,0,0,0.04)",
        // Edge highlight — simulates light catching the card edge
        `inset 0 0.5px 0 rgba(255,255,255,${isDark ? 0.1 : 0.7})`,
        `inset 0 -0.5px 0 rgba(0,0,0,${isDark ? 0.3 : 0.06})`,
      ].join(", "),
      border: `1px solid ${card.border}`,
    }}>
      {/* Card base layer */}
      <div style={{
        width: "100%", height: "100%", background: card.bg,
        borderRadius: radius,
        padding: isMobile ? "10px" : "14px 13px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative", zIndex: 1,
      }}>
        {/* Seal/emboss icon */}
        <div style={{
          width: iconSize, height: iconSize, borderRadius: isMobile ? 6 : 8,
          background: card.iconBg,
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : card.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          // Embossed seal effect — raised with inner light
          boxShadow: [
            `0 2px 6px rgba(0,0,0,${isDark ? 0.3 : 0.08})`,
            `inset 0 1px 0 rgba(255,255,255,${isDark ? 0.08 : 0.6})`,
            `inset 0 -0.5px 0 rgba(0,0,0,${isDark ? 0.2 : 0.04})`,
          ].join(", "),
        }}>
          <Icon style={{ width: innerIcon, height: innerIcon, color: card.iconFg, strokeWidth: 2.2 }} />
        </div>

        {/* Value + Label */}
        <div>
          <p style={{
            fontSize: valueSize, fontWeight: 900, lineHeight: 1.1,
            color: card.fg, letterSpacing: "-0.03em",
            // Subtle emboss on the number
            textShadow: isDark
              ? "0 1px 2px rgba(0,0,0,0.3)"
              : "0 0.5px 0 rgba(255,255,255,0.8), 0 -0.5px 0 rgba(0,0,0,0.04)",
          }}>
            {card.value}
          </p>
          <p style={{
            fontSize: labelSize, fontWeight: 600, color: card.muted,
            marginTop: isMobile ? 2 : 3, letterSpacing: "0.02em",
          }}>
            {card.label}
          </p>
        </div>
      </div>

      {/* Holographic sheen overlay — shifts with card rotation */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: radius,
        background: `linear-gradient(${angle}deg, transparent 20%, rgba(255,255,255,${isDark ? 0.06 : 0.15}) 40%, transparent 50%, rgba(255,255,255,${isDark ? 0.04 : 0.1}) 65%, transparent 80%)`,
        pointerEvents: "none", zIndex: 2,
        mixBlendMode: isDark ? "soft-light" : "overlay",
      }} />

      {/* Prismatic edge shimmer — faint rainbow at the edges */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: radius,
        background: `conic-gradient(from ${angle}deg at 30% 30%, transparent 0deg, rgba(120,180,255,0.06) 60deg, rgba(200,150,255,0.05) 120deg, rgba(255,200,120,0.04) 180deg, rgba(120,255,200,0.05) 240deg, rgba(150,120,255,0.06) 300deg, transparent 360deg)`,
        pointerEvents: "none", zIndex: 3,
        opacity: 0.6,
      }} />

      {/* Top edge glint — simulates light catching the top edge */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: `linear-gradient(90deg, transparent, rgba(255,255,255,${isDark ? 0.15 : 0.5}), transparent)`,
        zIndex: 4, borderRadius: "1px",
      }} />
    </div>
  );
}

// ─── Animated Card ────────────────────────────────────────────────────────────
function HeroCard({ card, target, staggerDelay = 0, isMobile }: {
  card: CardData;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  staggerDelay?: number;
  isMobile: boolean;
}) {
  // Use the card's rotation angle to drive the holographic sheen direction
  const holoAngle = ((target.rotation % 360) + 360) % 360;

  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 45, damping: 16, delay: staggerDelay }}
      style={{ position: "absolute", willChange: "transform" }}
    >
      <CardFace card={card} isMobile={isMobile} holoAngle={holoAngle} />
    </motion.div>
  );
}

// ─── Desktop scroll range ─────────────────────────────────────────────────────
const MAX_SCROLL = 3000;

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

  // ── Desktop: virtual scroll for arc morph ──────────────────────────────────
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  const autoAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  const cancelAuto = () => {
    if (autoAnimRef.current) { autoAnimRef.current.stop(); autoAnimRef.current = null; }
  };

  // Desktop scroll handler — listens on WINDOW so scroll-back works even when
  // cursor is below the hero. Captures scroll while animation is incomplete.
  useEffect(() => {
    if (!containerRef.current) return;
    const isMob = containerSize.width > 0 && containerSize.width < 768;
    if (isMob) return;

    const handleWheel = (e: WheelEvent) => {
      cancelAuto();
      const prev = scrollRef.current;

      // Scrolling DOWN while animation not finished — capture
      if (prev < MAX_SCROLL && e.deltaY > 0) {
        e.preventDefault();
        const next = Math.min(prev + e.deltaY, MAX_SCROLL);
        scrollRef.current = next;
        virtualScroll.set(next);
        return;
      }

      // At MAX_SCROLL scrolling DOWN — release, let page scroll
      if (prev >= MAX_SCROLL && e.deltaY > 0) {
        return;
      }

      // Scrolling UP while page is at top — rewind hero animation
      if (e.deltaY < 0 && window.scrollY <= 2) {
        e.preventDefault();
        const next = Math.max(prev + e.deltaY, 0);
        scrollRef.current = next;
        virtualScroll.set(next);
        return;
      }

      // Scrolling UP but page not at top — let page scroll up normally
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      cancelAuto();
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const prev = scrollRef.current;

      if (prev < MAX_SCROLL && deltaY > 0) {
        e.preventDefault();
        const next = Math.min(prev + deltaY, MAX_SCROLL);
        scrollRef.current = next;
        virtualScroll.set(next);
        return;
      }
      if (prev >= MAX_SCROLL && deltaY > 0) return;
      if (deltaY < 0 && window.scrollY <= 2) {
        e.preventDefault();
        const next = Math.max(prev + deltaY, 0);
        scrollRef.current = next;
        virtualScroll.set(next);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll, containerSize.width]);

  // Desktop: morph progress (circle → arc) and scroll-driven rotation
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // Mouse parallax (desktop only)
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

  // Track spring values as state for card position calculations
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change", setParallaxValue);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Desktop: headline fades out as user scrolls into arc
  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);
  const [arcHeadOpacity, setArcHeadOpacity] = useState(0);
  const [arcHeadY, setArcHeadY] = useState(20);

  useEffect(() => {
    const u1 = contentOpacity.on("change", setArcHeadOpacity);
    const u2 = contentY.on("change", setArcHeadY);
    return () => { u1(); u2(); };
  }, [contentOpacity, contentY]);

  const [circleReady, setCircleReady] = useState(false);

  // Intro animation sequence
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

  // Scatter positions
  const scatterPositions = useMemo(() => CARDS.map(() => ({
    x: (Math.random() - 0.5) * 1200,
    y: (Math.random() - 0.5) * 800,
    rotation: (Math.random() - 0.5) * 120,
    scale: 0.6,
    opacity: 0,
  })), []);

  const isMobile = containerSize.width > 0 && containerSize.width < 768;
  const isSmallPhone = containerSize.width > 0 && containerSize.width < 390;

  // Mobile: auto-scroll to next section after circle forms
  useEffect(() => {
    if (!circleReady || !isMobile) return;
    const t = setTimeout(() => {
      const heroEl = containerRef.current?.closest("section");
      if (heroEl) {
        const nextSection = heroEl.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 2500); // show circle for 2.5s then auto-scroll
    return () => clearTimeout(t);
  }, [circleReady, isMobile]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 62%, rgba(60,97,168,0.07) 0%, transparent 70%), #F7F8FC" }}>

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", width: 700, height: 700, background: "radial-gradient(circle, rgba(60,97,168,0.08) 0%, transparent 65%)", borderRadius: "50%", left: "5%", top: "10%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,209,52,0.06) 0%, transparent 65%)", borderRadius: "50%", right: "0%", top: "35%", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(60,97,168,0.05) 0%, transparent 65%)", borderRadius: "50%", left: "40%", bottom: "0%", filter: "blur(60px)" }} />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center" style={{ perspective: "1000px" }}>

        {/* Hero headline — soft radial glow behind text for readability (no box) */}
        <div className="absolute z-20 flex flex-col items-center text-center pointer-events-none px-6 left-0 right-0 top-[12%] md:top-0 md:bottom-0 md:justify-center">

          {/* Soft radial glow — invisible container, just light behind text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={circleReady && morphValue < 0.5
              ? { opacity: 1 - morphValue * 2 }
              : { opacity: 0 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute pointer-events-none"
            style={{
              width: isMobile ? 300 : 500,
              height: isMobile ? 200 : 280,
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(247,248,252,0.95) 0%, rgba(247,248,252,0.7) 40%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={circleReady && morphValue < 0.3 ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-3 relative"
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight relative"
            style={{ color: "#1a1a2e" }}
          >
            Hiring,{" "}
            <span style={{
              background: "linear-gradient(135deg, #3C61A8 0%, #5b7fc7 50%, #3C61A8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              decoded.
            </span>
          </motion.h1>

          {/* Subtitle + CTA — mobile */}
          {isMobile && circleReady && (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-3 text-xs text-gray-500 max-w-sm relative"
              >
                Role fit. Skill gaps. Interview readiness. All in one system.
              </motion.p>
              <motion.a
                href="#get-started"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 pointer-events-auto relative"
                style={{ backgroundColor: "#3C61A8" }}
              >
                Find My Best Role <span className="text-xs">→</span>
              </motion.a>
            </>
          )}

          {/* Desktop: scroll indicator */}
          {!isMobile && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={circleReady && morphValue < 0.3 ? { opacity: 0.4 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-[11px] font-medium text-gray-400 relative"
            >
              Scroll to explore ↓
            </motion.p>
          )}
        </div>

        {/* Desktop arc headline — fades in when scrolled past circle */}
        {!isMobile && (
          <div
            className="absolute top-[14%] z-10 hidden md:flex flex-col items-center justify-center text-center pointer-events-none px-4"
            style={{ opacity: arcHeadOpacity, transform: `translateY(${arcHeadY}px)` }}
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
          </div>
        )}

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
            } else if (isMobile) {
              // ─── MOBILE: static circle, no scroll interaction ───────────
              const minDim = Math.min(containerSize.width, containerSize.height);
              const circleRadius = isSmallPhone ? minDim * 0.33 : minDim * 0.36;
              const angle = (i / TOTAL_CARDS) * 360 - 90;
              const rad = (angle * Math.PI) / 180;

              target = {
                x: Math.cos(rad) * circleRadius,
                y: Math.sin(rad) * circleRadius,
                rotation: angle + 90,
                scale: 1,
                opacity: 1,
              };
            } else {
              // ─── DESKTOP: circle → arc morph with scroll rotation ──────
              const minDim = Math.min(containerSize.width, containerSize.height);
              const circleRadius = Math.min(minDim * 0.38, 340);
              const circleAngle = (i / TOTAL_CARDS) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              // Arc layout
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * 1.1;
              const arcApexY = containerSize.height * 0.25;
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = 130;
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
                scale: 1.6,
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
