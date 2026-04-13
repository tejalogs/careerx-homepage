"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
import {
  Crosshair, Zap, Phone, TrendingUp, CheckCircle,
  Search, Target,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AnimationPhase = "scatter" | "line" | "circle";

// ─── Card Dimensions ──────────────────────────────────────────────────────────
const CARD_W = 100;
const CARD_H = 130;
const CARD_W_MOBILE = 64;
const CARD_H_MOBILE = 84;

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
  { id: "accuracy",     bg: "#fff",     fg: "#0C0E14", muted: "rgba(0,0,0,0.55)",        border: "rgba(0,0,0,0.08)",       iconBg: "rgba(60,97,168,0.1)",    iconFg: "#3C61A8",  icon: Target,      value: "14k+",    label: "Career Paths Mapped" },
  { id: "role-fit",     bg: "#F5D134",  fg: "#0C0E14", muted: "rgba(0,0,0,0.6)",         border: "rgba(0,0,0,0.06)",       iconBg: "rgba(0,0,0,0.08)",       iconFg: "#0C0E14",  icon: Crosshair,   value: "92%",     label: "Role-Fit Accuracy" },
  { id: "interview",    bg: "#fff7ed",  fg: "#c2410c", muted: "rgba(194,65,12,0.65)",    border: "rgba(194,65,12,0.08)",   iconBg: "rgba(194,65,12,0.1)",    iconFg: "#ea580c",  icon: CheckCircle, value: "87%",     label: "First Interview Pass Rate" },
  { id: "salary-hike",  bg: "#f3f0ff",  fg: "#5b21b6", muted: "rgba(91,33,182,0.65)",    border: "rgba(91,33,182,0.08)",   iconBg: "rgba(91,33,182,0.1)",    iconFg: "#7c3aed",  icon: TrendingUp,  value: "70%",     label: "Avg Salary Uplift" },
  { id: "ready",        bg: "#E8634A",  fg: "#fff",    muted: "rgba(255,255,255,0.75)",   border: "rgba(255,255,255,0.1)",  iconBg: "rgba(255,255,255,0.12)", iconFg: "#FDE68A",  icon: CheckCircle, value: "98%",     label: "Interview Ready" },
  { id: "guided",       bg: "#1B4332",  fg: "#fff",    muted: "rgba(255,255,255,0.7)",    border: "rgba(255,255,255,0.08)", iconBg: "rgba(255,255,255,0.1)",  iconFg: "#6EE7B7",  icon: Zap,         value: "2,000+",  label: "Professionals Guided" },
  { id: "start",        bg: "#fef3c7",  fg: "#92400e", muted: "rgba(146,64,14,0.65)",    border: "rgba(146,64,14,0.08)",   iconBg: "rgba(146,64,14,0.1)",    iconFg: "#b45309",  icon: Search,      value: "Free",    label: "Start Now" },
  { id: "match",        bg: "#ecfeff",  fg: "#0e7490", muted: "rgba(14,116,144,0.65)",   border: "rgba(14,116,144,0.08)",  iconBg: "rgba(14,116,144,0.1)",   iconFg: "#0891b2",  icon: CheckCircle, value: "99.9%",   label: "Match Accuracy" },
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
  const iconSize = isMobile ? 16 : 26;
  const innerIcon = isMobile ? 8 : 13;
  const valueSize = card.value.length <= 4 ? (isMobile ? 18 : 28) : (isMobile ? 13 : 20);
  const labelSize = isMobile ? 7 : 10;
  const radius = isMobile ? 12 : 18;

  // Is this a dark card?
  const isDark = card.bg === "#0C0E14" || card.bg === "#3C61A8";

  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      position: "relative", overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
      border: `1px solid ${card.border}`,
    }}>
      {/* Card base layer */}
      <div style={{
        width: "100%", height: "100%", background: card.bg,
        borderRadius: radius,
        padding: isMobile ? "7px 8px" : "14px 13px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative", zIndex: 1,
      }}>
        {/* Seal/emboss icon */}
        <div style={{
          width: iconSize, height: iconSize, borderRadius: isMobile ? 6 : 8,
          background: card.iconBg,
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : card.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 1px 3px rgba(0,0,0,${isDark ? 0.2 : 0.08})`,
        }}>
          <Icon style={{ width: innerIcon, height: innerIcon, color: card.iconFg, strokeWidth: 2.2 }} />
        </div>

        {/* Value + Label */}
        <div>
          <p style={{
            fontSize: valueSize, fontWeight: 900, lineHeight: 1.1,
            color: card.fg, letterSpacing: "-0.03em",
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

    </div>
  );
}

// ─── Animated Card ────────────────────────────────────────────────────────────
// Low-end devices use pure CSS transitions (GPU composited, no JS per frame).
// High-end devices use Framer Motion springs for richer feel.
const HeroCard = React.memo(function HeroCard({ card, target, staggerDelay = 0, isMobile, index, lowEnd }: {
  card: CardData;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  staggerDelay?: number;
  isMobile: boolean;
  index: number;
  lowEnd: boolean;
}) {
  const holoAngle = ((target.rotation % 360) + 360) % 360;

  if (lowEnd) {
    const delay = isMobile ? index * 0.06 : index * 0.05;
    return (
      <div
        style={{
          position: "absolute",
          willChange: "transform, opacity",
          transform: `translate3d(${target.x}px, ${target.y}px, 0) rotate(${target.rotation}deg) scale(${target.scale})`,
          opacity: target.opacity,
          transition: `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, opacity 0.5s ease ${delay}s`,
        }}
      >
        <CardFace card={card} isMobile={isMobile} holoAngle={holoAngle} />
      </div>
    );
  }

  const transition = isMobile
    ? { type: "spring" as const, stiffness: 60, damping: 20, delay: staggerDelay + index * 0.05 }
    : { type: "spring" as const, stiffness: 80, damping: 22, delay: staggerDelay };

  return (
    <motion.div
      initial={{ x: 0, y: 0, rotate: 0, scale: 0.4, opacity: 0 }}
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={transition}
      style={{ position: "absolute", willChange: "transform" }}
    >
      <CardFace card={card} isMobile={isMobile} holoAngle={holoAngle} />
    </motion.div>
  );
});

// ─── Desktop scroll range ─────────────────────────────────────────────────────
const MAX_SCROLL = 1500;

// ─── Detect low-end device or non-Safari browser on Windows ──────────────────
function useIsLowEnd() {
  const [lowEnd, setLowEnd] = useState(false);
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
    const ua = navigator.userAgent;
    const isWindows = ua.includes("Windows");
    const isLowHardware = cores <= 4 || mem <= 4;
    // Chrome, Edge, and Firefox on Windows struggle with spring animations
    const isWindowsBrowser = isWindows && (ua.includes("Chrome") || ua.includes("Firefox") || ua.includes("Edg"));
    setLowEnd(isLowHardware || isWindowsBrowser);
  }, []);
  return lowEnd;
}

// ─── Main Hero Component ──────────────────────────────────────────────────────
export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("line");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showStagger, setShowStagger] = useState(false);
  const staggerApplied = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLowEnd = useIsLowEnd();

  // Measure container — runs on mount, drives readiness
  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      if (w > 0 && h > 0) {
        setContainerSize({ width: w, height: h });
      }
    };
    // Measure immediately
    measure();
    // Also observe for resizes
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    // Fallback: try again after a frame in case layout isn't ready
    const raf = requestAnimationFrame(measure);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
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
  // Disabled on low-end devices to avoid per-frame JS work.
  useEffect(() => {
    if (!containerRef.current) return;
    const isMob = containerSize.width > 0 && containerSize.width < 768;
    if (isMob || isLowEnd) return;

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
  }, [virtualScroll, containerSize.width, isLowEnd]);

  // Desktop: morph progress (circle → arc) and scroll-driven rotation
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 80, damping: 35 });
  const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 80, damping: 35 });

  // Mouse X tracking for arc parallax only (no 3D depth layers)
  const mouseXArc = useMotionValue(0);
  const smoothMouseX = useSpring(mouseXArc, { stiffness: 50, damping: 28 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
      mouseXArc.set(nx * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseXArc]);

  // Track spring values as state — throttled to ~30fps to reduce re-renders
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    let latestMorph = 0, latestRotate = 0, latestParallax = 0;
    let dirty = false;

    const flush = () => {
      rafId = null;
      if (dirty) {
        setMorphValue(latestMorph);
        setRotateValue(latestRotate);
        setParallaxValue(latestParallax);
        dirty = false;
      }
    };
    const scheduleFlush = () => {
      if (!rafId) rafId = requestAnimationFrame(flush);
    };

    const u1 = smoothMorph.on("change", (v) => { latestMorph = v; dirty = true; scheduleFlush(); });
    const u2 = smoothScrollRotate.on("change", (v) => { latestRotate = v; dirty = true; scheduleFlush(); });
    const u3 = smoothMouseX.on("change", (v) => { latestParallax = v; dirty = true; scheduleFlush(); });
    return () => { u1(); u2(); u3(); if (rafId) cancelAnimationFrame(rafId); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Desktop: headline fades out as user scrolls into arc
  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);
  const [arcHeadOpacity, setArcHeadOpacity] = useState(0);
  const [arcHeadY, setArcHeadY] = useState(20);

  useEffect(() => {
    let rafId: number | null = null;
    let latestOpacity = 0, latestY = 20;
    let dirty = false;

    const flush = () => {
      rafId = null;
      if (dirty) {
        setArcHeadOpacity(latestOpacity);
        setArcHeadY(latestY);
        dirty = false;
      }
    };

    const u1 = contentOpacity.on("change", (v) => { latestOpacity = v; dirty = true; if (!rafId) rafId = requestAnimationFrame(flush); });
    const u2 = contentY.on("change", (v) => { latestY = v; dirty = true; if (!rafId) rafId = requestAnimationFrame(flush); });
    return () => { u1(); u2(); if (rafId) cancelAnimationFrame(rafId); };
  }, [contentOpacity, contentY]);

  const [circleReady, setCircleReady] = useState(false);

  // Intro animation sequence — only after client mount + container measured
  useEffect(() => {
    if (containerSize.width === 0) return;
    const mobile = containerSize.width < 768;
    // Mobile: skip line phase, go to circle faster
    const circleDelay = mobile ? 400 : 1200;
    const readyDelay = mobile ? 1000 : 1800;
    const t1 = setTimeout(() => setIntroPhase("circle"), circleDelay);
    const t2 = setTimeout(() => setCircleReady(true), readyDelay);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [containerSize.width]);

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

  // (Parallax depth layers removed for performance)

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 62%, rgba(60,97,168,0.07) 0%, transparent 70%), #F7F8FC" }}>

      {/* Ambient glow orbs — static background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", width: 700, height: 700, background: "radial-gradient(circle, rgba(60,97,168,0.06) 0%, transparent 60%)", borderRadius: "50%", left: "5%", top: "10%" }} />
        <div style={{ position: "absolute", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,209,52,0.05) 0%, transparent 60%)", borderRadius: "50%", right: "0%", top: "35%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(60,97,168,0.04) 0%, transparent 60%)", borderRadius: "50%", left: "40%", bottom: "0%" }} />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center">

        {/* Hero headline — soft radial glow behind text for readability (no box) */}
        <div className="absolute z-20 flex flex-col items-center text-center pointer-events-none px-6 left-0 right-0 top-[6%] md:top-0 md:bottom-0 md:justify-center">

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
              width: isMobile ? 250 : 420,
              height: isMobile ? 160 : 220,
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(247,248,252,0.7) 0%, rgba(247,248,252,0.4) 35%, transparent 65%)",
              filter: "blur(12px)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={circleReady && morphValue < 0.3 ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-1.5 relative"
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
            className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight leading-tight relative"
            style={{ color: "#1a1a2e" }}
          >
            Your career,{" "}
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
                href="/kyb"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-3 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 pointer-events-auto relative"
                style={{ backgroundColor: "#3C61A8" }}
              >
                Find My Best Role <span className="text-xs">→</span>
              </motion.a>
            </>
          )}

          {/* Desktop: CTA + scroll indicator inline with headline */}
          {!isMobile && (
            <>
              <motion.a
                href="/kyb"
                initial={{ opacity: 0, y: 10 }}
                animate={circleReady && morphValue < 0.4
                  ? { opacity: 1 - morphValue * 2.5, y: 0 }
                  : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 pointer-events-auto relative"
                style={{ backgroundColor: "#3C61A8" }}
              >
                Find My Best Role <span className="text-xs">→</span>
              </motion.a>
              <motion.p
                initial={{ opacity: 0 }}
                animate={circleReady && morphValue < 0.3 ? { opacity: 0.4 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-4 text-[11px] font-medium text-gray-400 relative"
              >
                Scroll to explore ↓
              </motion.p>
            </>
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
              Understand what the market needs from you. Then close the gap.
            </p>
            <div className="flex items-center gap-3 mt-5 pointer-events-auto">
              <a
                href="/kyb"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#3C61A8" }}
              >
                Find My Best Role <span className="text-xs">→</span>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold border-2 transition-all hover:bg-gray-50 active:scale-95"
                style={{ borderColor: "#3C61A8", color: "#3C61A8" }}
              >
                See How It Works
              </a>
            </div>
          </div>
        )}

        {/* Cards (only render after container is measured) */}
        <div className="relative flex items-center justify-center w-full h-full" style={{ paddingTop: isMobile ? 0 : 30 }}>
          {containerSize.width > 0 && CARDS.map((card, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const spacing = isMobile ? 55 : 75;
              const totalW = TOTAL_CARDS * spacing;
              target = { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else if (isMobile) {
              // ─── MOBILE: circle layout, cards upright ───────────
              const circleRadius = isSmallPhone ? 115 : 135;
              const angle = (i / TOTAL_CARDS) * 360 - 90;
              const rad = (angle * Math.PI) / 180;
              const mobileCircleOffsetY = isSmallPhone ? 55 : 65;
              target = {
                x: Math.cos(rad) * circleRadius,
                y: Math.sin(rad) * circleRadius + mobileCircleOffsetY,
                rotation: 0,
                scale: 1,
                opacity: 1,
              };
            } else {
              // ─── DESKTOP: circle → arc morph with scroll rotation ──────
              const minDim = Math.min(containerSize.width, containerSize.height);
              const circleRadius = Math.min(minDim * 0.36, 320);
              const circleAngle = (i / TOTAL_CARDS) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              // Arc layout
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * 0.65;
              const arcApexY = containerSize.height * 0.25;
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = 160;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_CARDS - 1);

              const scrollProg = Math.min(Math.max(rotateValue / 360, 0), 1);
              const boundedRotation = -scrollProg * spreadAngle * 0.5;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: 1.2,
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
                index={i}
                lowEnd={isLowEnd}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
