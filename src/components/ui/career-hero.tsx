"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

// ─── Stage data ───────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "discover",
    label: "Discover",
    number: "01",
    color: "#4267B2",
    lightColor: "#EEF2FF",
    icon: "🔍",
    headline: "See which roles match your strengths.",
    subline: "Map your profile against live job market data and find where you genuinely fit.",
  },
  {
    id: "prepare",
    label: "Prepare",
    number: "02",
    color: "#2D6A4F",
    lightColor: "#ECFDF5",
    icon: "📚",
    headline: "Learn only what the role demands.",
    subline: "A targeted learning path built around what hiring managers actually screen for.",
  },
  {
    id: "validate",
    label: "Validate",
    number: "03",
    color: "#92400E",
    lightColor: "#FFF7ED",
    icon: "✅",
    headline: "Face the interview before it counts.",
    subline: "AI-powered mock interviews with scored feedback so you walk in ready.",
  },
  {
    id: "activate",
    label: "Activate",
    number: "04",
    color: "#6B21A8",
    lightColor: "#F5F3FF",
    icon: "🚀",
    headline: "Get matched to jobs that fit.",
    subline: "Targeted opportunities based on your role, readiness, and verified preparation.",
  },
] as const;

type StageId = (typeof STAGES)[number]["id"];

// ─── Orbit card angles (evenly spaced around circle) ─────────────────────────
const ORBIT_ANGLES = [270, 0, 90, 180]; // top, right, bottom, left

function getOrbitPosition(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

// ─── Stage Card ───────────────────────────────────────────────────────────────
function StageCard({
  stage,
  angle,
  radius,
  isActive,
  onClick,
  forming,
  formDelay,
}: {
  stage: (typeof STAGES)[number];
  angle: number;
  radius: number;
  isActive: boolean;
  onClick: () => void;
  forming: boolean;
  formDelay: number;
}) {
  const pos = getOrbitPosition(angle, radius);
  // Scatter origin: cards start far outside then spring into orbit
  const scatterX = pos.x * 3.5;
  const scatterY = pos.y * 3.5;

  return (
    <motion.button
      onClick={onClick}
      initial={{ x: scatterX, y: scatterY, opacity: 0, scale: 0.4 }}
      animate={{
        x: pos.x,
        y: pos.y,
        opacity: 1,
        scale: isActive ? 1.12 : 1,
        zIndex: isActive ? 10 : 1,
      }}
      whileHover={{ scale: isActive ? 1.15 : 1.06 }}
      transition={
        forming
          ? { type: "spring", stiffness: 120, damping: 18, delay: formDelay, opacity: { duration: 0.4, delay: formDelay } }
          : { type: "spring", stiffness: 300, damping: 25 }
      }
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        left: "50%",
        top: "50%",
      }}
      className="focus:outline-none"
    >
      <motion.div
        animate={{
          backgroundColor: isActive ? stage.lightColor : "#ffffff",
          borderColor: isActive ? stage.color : "#E5E7EB",
          boxShadow: isActive
            ? `0 8px 32px ${stage.color}28, 0 2px 8px rgba(0,0,0,0.06)`
            : "0 2px 8px rgba(0,0,0,0.06)",
        }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border w-[108px] cursor-pointer"
      >
        <span className="text-xl">{stage.icon}</span>
        <div className="text-center">
          <p
            className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
            style={{ color: isActive ? stage.color : "#9CA3AF" }}
          >
            {stage.number}
          </p>
          <p
            className="text-xs font-semibold"
            style={{ color: isActive ? stage.color : "#374151" }}
          >
            {stage.label}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function CareerHero({
  onWatchDemo,
}: {
  onWatchDemo?: () => void;
}) {
  const [activeStage, setActiveStage] = useState<StageId>("discover");
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [radius, setRadius] = useState(210);
  // "forming" → cards fly in; "ready" → headline + content appear
  const [phase, setPhase] = useState<"forming" | "ready">("forming");

  // Responsive orbit radius
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setRadius(w < 640 ? 145 : w < 1024 ? 180 : 210);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Circle formation: after cards settle, reveal headline content
  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 1600);
    return () => clearTimeout(t);
  }, []);

  // Auto-rotate through stages
  useEffect(() => {
    if (userInteracted) return;
    autoRotateRef.current = setInterval(() => {
      setActiveStage((prev) => {
        const idx = STAGES.findIndex((s) => s.id === prev);
        return STAGES[(idx + 1) % STAGES.length].id;
      });
    }, 2800);
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [userInteracted]);

  const handleStageClick = (id: StageId) => {
    setActiveStage(id);
    setUserInteracted(true);
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    // Resume auto-rotate after 8s of inactivity
    setTimeout(() => setUserInteracted(false), 8000);
  };

  const current = STAGES.find((s) => s.id === activeStage)!;

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${current.lightColor}80 0%, transparent 70%)`,
          transition: "background 0.6s ease",
        }}
      />

      {/* Grid dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-6xl mx-auto">
        {/* ── Badge ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: phase === "ready" ? 1 : 0, y: phase === "ready" ? 0 : -12 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-semibold tracking-widest uppercase mb-8"
          style={{
            borderColor: "#4267B2",
            color: "#4267B2",
            backgroundColor: "#EEF2FF",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#4267B2" }}
          />
          Career Acceleration Framework
        </motion.div>

        {/* ── Orbit + Center content ─────────────────────────────────────────── */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: radius * 2 + 140,
            height: radius * 2 + 140,
          }}
        >
          {/* Orbit ring */}
          <motion.div
            animate={{ borderColor: `${current.color}20` }}
            transition={{ duration: 0.5 }}
            className="absolute rounded-full border-2 border-dashed"
            style={{
              width: radius * 2,
              height: radius * 2,
            }}
          />

          {/* Stage cards */}
          {STAGES.map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              angle={ORBIT_ANGLES[i]}
              radius={radius}
              isActive={activeStage === stage.id}
              onClick={() => handleStageClick(stage.id)}
              forming={phase === "forming"}
              formDelay={i * 0.15}
            />
          ))}

          {/* Center: dynamic copy */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-xs sm:max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-center gap-3"
              >
                {/* Stage indicator pill */}
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                  style={{
                    backgroundColor: current.lightColor,
                    color: current.color,
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: current.color }}
                  />
                  {current.number} — {current.label}
                </div>

                {/* Dynamic headline */}
                <h2
                  className="text-lg sm:text-xl font-bold leading-snug tracking-tight"
                  style={{ color: "#111827" }}
                >
                  {current.headline}
                </h2>

                {/* Dynamic subline */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[230px] sm:max-w-[260px]">
                  {current.subline}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Main Headline ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === "ready" ? 1 : 0, y: phase === "ready" ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl">

            Not sure what fits you?{" "}
            <span style={{ color: "#4267B2" }}>Start here.</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed">
            CareerXcelerator maps your strengths to real roles, closes your skill gaps, and gets you interview-ready — all in one place.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 mt-2">
            <a
              href="#get-started"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg hover:opacity-90 hover:shadow-xl transition-all duration-200"
              style={{ backgroundColor: "#4267B2" }}
            >
              Find My Best Role <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onWatchDemo}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 bg-white hover:bg-gray-50 transition-all duration-200"
              style={{ borderColor: "#4267B2", color: "#4267B2" }}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              See How It Works
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll hint at bottom ──────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-medium tracking-[0.18em] uppercase text-gray-300 pointer-events-none"
      >
        Scroll to explore
      </motion.p>
    </div>
  );
}
