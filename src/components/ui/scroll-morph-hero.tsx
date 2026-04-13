"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  Crosshair, Zap, TrendingUp, CheckCircle,
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

// ─── Card Face (static, never re-renders during scroll) ──────────────────────
const CardFace = React.memo(function CardFace({ card, isMobile }: { card: CardData; isMobile: boolean }) {
  const Icon = card.icon;
  const w = isMobile ? CARD_W_MOBILE : CARD_W;
  const h = isMobile ? CARD_H_MOBILE : CARD_H;
  const iconSize = isMobile ? 16 : 26;
  const innerIcon = isMobile ? 8 : 13;
  const valueSize = card.value.length <= 4 ? (isMobile ? 18 : 28) : (isMobile ? 13 : 20);
  const labelSize = isMobile ? 7 : 10;
  const radius = isMobile ? 12 : 18;
  const isDark = card.bg === "#0C0E14" || card.bg === "#3C61A8";

  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      position: "relative", overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
      border: `1px solid ${card.border}`,
    }}>
      <div style={{
        width: "100%", height: "100%", background: card.bg,
        borderRadius: radius,
        padding: isMobile ? "7px 8px" : "14px 13px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          width: iconSize, height: iconSize, borderRadius: isMobile ? 6 : 8,
          background: card.iconBg,
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : card.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 1px 3px rgba(0,0,0,${isDark ? 0.2 : 0.08})`,
        }}>
          <Icon style={{ width: innerIcon, height: innerIcon, color: card.iconFg, strokeWidth: 2.2 }} />
        </div>
        <div>
          <p style={{ fontSize: valueSize, fontWeight: 900, lineHeight: 1.1, color: card.fg, letterSpacing: "-0.03em" }}>
            {card.value}
          </p>
          <p style={{ fontSize: labelSize, fontWeight: 600, color: card.muted, marginTop: isMobile ? 2 : 3, letterSpacing: "0.02em" }}>
            {card.label}
          </p>
        </div>
      </div>
    </div>
  );
});

// ─── Desktop scroll range ─────────────────────────────────────────────────────
const MAX_SCROLL = 1500;

// ─── Main Hero Component ──────────────────────────────────────────────────────
export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("line");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [circleReady, setCircleReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for direct DOM updates (bypass React during scroll)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);
  const arcHeadRef = useRef<HTMLDivElement>(null);

  // ── Measure container ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      if (w > 0 && h > 0) setContainerSize({ width: w, height: h });
    };
    measure();
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    const raf = requestAnimationFrame(measure);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  // ── Virtual scroll ─────────────────────────────────────────────────────────
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  const isMobile = containerSize.width > 0 && containerSize.width < 768;
  const isSmallPhone = containerSize.width > 0 && containerSize.width < 390;

  // Desktop scroll handler
  useEffect(() => {
    if (!containerRef.current) return;
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      const prev = scrollRef.current;
      if (prev < MAX_SCROLL && e.deltaY > 0) {
        e.preventDefault();
        const next = Math.min(prev + e.deltaY, MAX_SCROLL);
        scrollRef.current = next;
        virtualScroll.set(next);
        return;
      }
      if (prev >= MAX_SCROLL && e.deltaY > 0) return;
      if (e.deltaY < 0 && window.scrollY <= 2) {
        e.preventDefault();
        const next = Math.max(prev + e.deltaY, 0);
        scrollRef.current = next;
        virtualScroll.set(next);
        return;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const prev = scrollRef.current;
      if (prev < MAX_SCROLL && deltaY > 0) {
        e.preventDefault();
        scrollRef.current = Math.min(prev + deltaY, MAX_SCROLL);
        virtualScroll.set(scrollRef.current);
        return;
      }
      if (prev >= MAX_SCROLL && deltaY > 0) return;
      if (deltaY < 0 && window.scrollY <= 2) {
        e.preventDefault();
        scrollRef.current = Math.max(prev + deltaY, 0);
        virtualScroll.set(scrollRef.current);
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
  }, [virtualScroll, isMobile]);

  // ── Springs (Framer Motion internal — no React state) ──────────────────────
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 80, damping: 35 });
  const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 80, damping: 35 });

  // Mouse X for arc parallax
  const mouseXArc = useMotionValue(0);
  const smoothMouseX = useSpring(mouseXArc, { stiffness: 50, damping: 28 });

  // ── Direct DOM update loop — ZERO React re-renders during scroll ───────────
  useEffect(() => {
    if (!containerSize.width || isMobile) return;

    const updateDOM = () => {
      const morph = smoothMorph.get();
      const rotate = smoothScrollRotate.get();
      const parallax = smoothMouseX.get();

      // Update 8 card transforms directly
      for (let i = 0; i < TOTAL_CARDS; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const minDim = Math.min(containerSize.width, containerSize.height);
        const circleRadius = Math.min(minDim * 0.36, 320);
        const circleAngle = (i / TOTAL_CARDS) * 360;
        const circleRad = (circleAngle * Math.PI) / 180;
        const cx = Math.cos(circleRad) * circleRadius;
        const cy = Math.sin(circleRad) * circleRadius;
        const cr = circleAngle + 90;

        const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
        const arcRadius = baseRadius * 0.65;
        const arcApexY = containerSize.height * 0.25;
        const arcCenterY = arcApexY + arcRadius;
        const spreadAngle = 160;
        const startAngle = -90 - spreadAngle / 2;
        const step = spreadAngle / (TOTAL_CARDS - 1);
        const scrollProg = Math.min(Math.max(rotate / 360, 0), 1);
        const boundedRotation = -scrollProg * spreadAngle * 0.5;
        const currentArcAngle = startAngle + i * step + boundedRotation;
        const arcRad = (currentArcAngle * Math.PI) / 180;

        const ax = Math.cos(arcRad) * arcRadius + parallax;
        const ay = Math.sin(arcRad) * arcRadius + arcCenterY;
        const ar = currentArcAngle + 90;
        const aScale = 1.2;

        const x = lerp(cx, ax, morph);
        const y = lerp(cy, ay, morph);
        const r = lerp(cr, ar, morph);
        const s = lerp(1, aScale, morph);

        el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${r}deg) scale(${s})`;
      }

      // Update headline elements directly
      const showHead = circleReady && morph < 0.5;
      const headOpacity = showHead ? 1 - morph * 2 : 0;

      if (glowRef.current) glowRef.current.style.opacity = String(headOpacity);
      if (subtitleRef.current) {
        const subShow = circleReady && morph < 0.3;
        subtitleRef.current.style.opacity = subShow ? "0.5" : "0";
        subtitleRef.current.style.transform = `translateY(${subShow ? 0 : 10}px)`;
      }
      if (headlineRef.current) {
        headlineRef.current.style.opacity = String(headOpacity);
      }
      if (ctaRef.current) {
        const ctaShow = circleReady && morph < 0.4;
        ctaRef.current.style.opacity = String(ctaShow ? 1 - morph * 2.5 : 0);
        ctaRef.current.style.transform = `translateY(${ctaShow ? 0 : 10}px)`;
      }
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(circleReady && morph < 0.3 ? 0.4 : 0);
      }

      // Arc headline (appears after morph)
      if (arcHeadRef.current) {
        const arcOpacity = morph >= 0.8 ? (morph - 0.8) * 5 : 0; // 0.8→1 maps to 0→1
        const arcY = morph >= 0.8 ? lerp(20, 0, (morph - 0.8) * 5) : 20;
        arcHeadRef.current.style.opacity = String(Math.min(arcOpacity, 1));
        arcHeadRef.current.style.transform = `translateY(${arcY}px)`;
      }
    };

    // Run once immediately so headline shows when circleReady becomes true
    updateDOM();

    // Subscribe to spring changes — update DOM directly, no setState
    const u1 = smoothMorph.on("change", updateDOM);
    const u2 = smoothScrollRotate.on("change", updateDOM);
    const u3 = smoothMouseX.on("change", updateDOM);

    return () => { u1(); u2(); u3(); };
  }, [containerSize, isMobile, circleReady, smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Mouse tracking — only after morph starts
  const morphStartedRef = useRef(false);
  useEffect(() => {
    const unsub = smoothMorph.on("change", (v) => {
      if (v > 0 && !morphStartedRef.current) morphStartedRef.current = true;
    });
    return unsub;
  }, [smoothMorph]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!morphStartedRef.current) return;
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
      mouseXArc.set(nx * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseXArc]);

  // ── Intro animation sequence ───────────────────────────────────────────────
  useEffect(() => {
    if (containerSize.width === 0) return;
    const mobile = containerSize.width < 768;
    const circleDelay = mobile ? 400 : 1200;
    const readyDelay = mobile ? 1000 : 1800;
    const t1 = setTimeout(() => setIntroPhase("circle"), circleDelay);
    const t2 = setTimeout(() => setCircleReady(true), readyDelay);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [containerSize.width]);

  // Mobile: auto-scroll to next section
  useEffect(() => {
    if (!circleReady || !isMobile) return;
    const t = setTimeout(() => {
      const heroEl = containerRef.current?.closest("section");
      if (heroEl) {
        const nextSection = heroEl.nextElementSibling;
        if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 2500);
    return () => clearTimeout(t);
  }, [circleReady, isMobile]);

  // ── Compute initial card targets for Framer Motion entrance ────────────────
  const initialTargets = useMemo(() => {
    if (containerSize.width === 0) return [];
    return CARDS.map((_, i) => {
      if (introPhase === "line") {
        const spacing = isMobile ? 55 : 75;
        const totalW = TOTAL_CARDS * spacing;
        return { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
      }
      if (isMobile) {
        const circleRadius = isSmallPhone ? 115 : 135;
        const angle = (i / TOTAL_CARDS) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const offsetY = isSmallPhone ? 55 : 65;
        return { x: Math.cos(rad) * circleRadius, y: Math.sin(rad) * circleRadius + offsetY, rotation: 0, scale: 1, opacity: 1 };
      }
      // Desktop circle
      const minDim = Math.min(containerSize.width, containerSize.height);
      const circleRadius = Math.min(minDim * 0.36, 320);
      const circleAngle = (i / TOTAL_CARDS) * 360;
      const circleRad = (circleAngle * Math.PI) / 180;
      return { x: Math.cos(circleRad) * circleRadius, y: Math.sin(circleRad) * circleRadius, rotation: circleAngle + 90, scale: 1, opacity: 1 };
    });
  }, [introPhase, containerSize, isMobile, isSmallPhone]);

  // Card ref setter
  const setCardRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[i] = el;
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 62%, rgba(60,97,168,0.07) 0%, transparent 70%), #F7F8FC" }}>

      {/* Ambient glow orbs — static */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", width: 700, height: 700, background: "radial-gradient(circle, rgba(60,97,168,0.06) 0%, transparent 60%)", borderRadius: "50%", left: "5%", top: "10%" }} />
        <div style={{ position: "absolute", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,209,52,0.05) 0%, transparent 60%)", borderRadius: "50%", right: "0%", top: "35%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(60,97,168,0.04) 0%, transparent 60%)", borderRadius: "50%", left: "40%", bottom: "0%" }} />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center">

        {/* Hero headline */}
        <div className="absolute z-20 flex flex-col items-center text-center pointer-events-none px-6 left-0 right-0 top-[6%] md:top-0 md:bottom-0 md:justify-center">

          <div
            ref={glowRef}
            className="absolute pointer-events-none"
            style={{
              width: isMobile ? 300 : 500,
              height: isMobile ? 200 : 280,
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(247,248,252,0.6) 0%, rgba(247,248,252,0.3) 30%, transparent 60%)",
              opacity: 0,
              transition: "opacity 0.3s ease-out",
            }}
          />

          <p
            ref={subtitleRef}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-1.5 relative"
            style={{ color: "#3C61A8", opacity: 0, transform: "translateY(10px)", transition: "opacity 0.4s ease-out, transform 0.4s ease-out" }}
          >
            CareerXcelerator
          </p>
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight leading-tight relative"
            style={{
              color: "#1a1a2e",
              opacity: 0,
              transform: circleReady ? "translateY(0) scale(1)" : "translateY(30px) scale(0.92)",
              transition: "opacity 0.3s ease-out, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
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
          </h1>

          {/* Mobile CTAs */}
          {isMobile && circleReady && (
            <>
              <p className="mt-3 text-xs text-gray-500 max-w-sm relative" style={{ opacity: 0.5 }}>
                Role fit. Skill gaps. Interview readiness. All in one system.
              </p>
              <div className="flex items-center gap-2 mt-3 pointer-events-auto">
                <a href="/kyb" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 active:scale-95" style={{ backgroundColor: "#3C61A8" }}>
                  Find My Best Role <span className="text-xs">→</span>
                </a>
                <a href="/kyb/start" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 hover:bg-gray-50 active:scale-95" style={{ borderColor: "#3C61A8", color: "#3C61A8" }}>
                  Register Now
                </a>
              </div>
            </>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <>
              <a
                ref={ctaRef}
                href="/kyb"
                className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white hover:opacity-90 active:scale-95 pointer-events-auto relative"
                style={{ backgroundColor: "#3C61A8", opacity: 0, transform: "translateY(10px)", transition: "opacity 0.3s ease-out, transform 0.3s ease-out" }}
              >
                Find My Best Role <span className="text-xs">→</span>
              </a>
              <p
                ref={scrollHintRef}
                className="mt-4 text-[11px] font-medium text-gray-400 relative"
                style={{ opacity: 0, transition: "opacity 0.3s ease-out" }}
              >
                Scroll to explore ↓
              </p>
            </>
          )}
        </div>

        {/* Arc headline — appears when scrolled past circle */}
        {!isMobile && (
          <div
            ref={arcHeadRef}
            className="absolute top-[14%] z-10 hidden md:flex flex-col items-center justify-center text-center pointer-events-none px-4"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <p className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-400 mb-3">CareerXcelerator</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3 leading-tight">
              Role fit. Skill gaps.<br />Interview readiness.
            </h2>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed font-medium">
              Understand what the market needs from you. Then close the gap.
            </p>
            <div className="flex items-center gap-3 mt-5 pointer-events-auto">
              <a href="/kyb" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95" style={{ backgroundColor: "#3C61A8" }}>
                Find My Best Role <span className="text-xs">→</span>
              </a>
              <a href="#how-it-works" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold border-2 transition-all hover:bg-gray-50 active:scale-95" style={{ borderColor: "#3C61A8", color: "#3C61A8" }}>
                See How It Works
              </a>
            </div>
          </div>
        )}

        {/* Cards — rendered once, positions updated via direct DOM */}
        <div className="relative flex items-center justify-center w-full h-full" style={{ paddingTop: isMobile ? 0 : 30 }}>
          {containerSize.width > 0 && CARDS.map((card, i) => {
            const target = initialTargets[i];
            if (!target) return null;

            const delay = isMobile ? i * 0.06 : i * 0.04;

            return (
              <motion.div
                key={card.id}
                ref={setCardRef(i)}
                initial={{ x: 0, y: 0, rotate: 0, scale: 0.4, opacity: 0 }}
                animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
                transition={isMobile
                  ? { type: "spring", stiffness: 60, damping: 20, delay: delay }
                  : { type: "spring", stiffness: 80, damping: 22, delay: delay }
                }
                style={{ position: "absolute", willChange: "transform" }}
              >
                <CardFace card={card} isMobile={isMobile} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
