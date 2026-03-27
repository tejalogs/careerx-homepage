"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Compass, BookOpen, MessageSquare, Rocket,
  Clock, ArrowRight, Sparkles,
} from "lucide-react";
import Link from "next/link";
import { BrandLogoMark } from "@/components/ui/brand-logo";
import { ShaderAnimation } from "@/components/ui/shader-animation";

/* ─── palette ─────────────────────────────────────────────────────── */
const GOLD_GRADIENT = "linear-gradient(135deg, #B8860B, #DAA520, #F0C040)";
const GOLD_SHADOW   = "rgba(212, 160, 18, 0.25)";
const GOLD_HOVER    = "rgba(212, 160, 18, 0.35)";
const BRAND_PURPLE  = "#6555C1";
const MUTED         = "rgba(0,0,0,0.55)";
const MUTED_LIGHT   = "rgba(0,0,0,0.4)";

const SPLASH_DURATION = 3200; // ms before auto-transition

/* ─── journey steps ───────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    icon: Compass,
    title: "Discover",
    subtitle: "Know Yourself Better",
    benefit: "Map your skills to real market demand",
    active: true,
    color: BRAND_PURPLE,
  },
  {
    num: "02",
    icon: BookOpen,
    title: "Prepare",
    subtitle: "Career Track",
    benefit: "Build your personalized learning roadmap",
    active: false,
    color: "#3C61A8",
  },
  {
    num: "03",
    icon: MessageSquare,
    title: "Validate",
    subtitle: "Interview Simulator",
    benefit: "Practice with AI-powered mock interviews",
    active: false,
    color: "#0891b2",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Activate",
    subtitle: "Career Opportunities",
    benefit: "Connect with matched job opportunities",
    active: false,
    color: "#ea580c",
  },
];

/* ─── animation helpers ───────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ═══════════════════════════════════════════════════════════════════ */
/*  SHADER SPLASH SCREEN                                              */
/* ═══════════════════════════════════════════════════════════════════ */
function ShaderSplash({ onComplete }: { onComplete: () => void }) {
  const [textPhase, setTextPhase] = useState(0); // 0=hidden, 1=show, 2=exit

  useEffect(() => {
    const t1 = setTimeout(() => setTextPhase(1), 400);       // text appears
    const t2 = setTimeout(() => setTextPhase(2), 2400);      // text begins exit
    const t3 = setTimeout(() => onComplete(), SPLASH_DURATION); // transition out
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* shader background */}
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

      {/* overlay text */}
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
          animate={
            textPhase >= 1
              ? { opacity: textPhase === 2 ? 0 : 1, y: textPhase === 2 ? -20 : 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight"
          style={{ color: "#0C0E14", textShadow: "0 2px 20px rgba(60,96,168,0.15)" }}
        >
          Know Yourself{" "}
          <span style={{ color: "#3C60A8" }}>Better</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            textPhase >= 1
              ? { opacity: textPhase === 2 ? 0 : 0.6, y: textPhase === 2 ? -10 : 0 }
              : {}
          }
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-lg sm:text-xl font-medium tracking-wide"
          style={{ color: "rgba(0,0,0,0.45)" }}
        >
          Your career journey starts here
        </motion.p>
      </div>

      {/* progress bar at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(60,96,168,0.1)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #3C60A8, #F5D134)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SPLASH_DURATION / 1000, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  KYB NAVBAR                                                        */
/* ═══════════════════════════════════════════════════════════════════ */
function KYBNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.85)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
          <BrandLogoMark size={22} />
          <span className="text-[15px] font-bold tracking-tight" style={{ color: "#0C0E14" }}>
            Career<span style={{ color: "#3C61A8" }}>X</span>celerator
          </span>
        </Link>
        <Link
          href="#"
          className="text-[13px] font-semibold px-5 py-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 hover:opacity-90"
          style={{ background: "#0C0E14", color: "#fff" }}
        >
          Login <ArrowRight size={13} className="inline ml-1" />
        </Link>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  STEP CARD                                                         */
/* ═══════════════════════════════════════════════════════════════════ */
function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
      style={{ flex: "1 1 0", minWidth: 0 }}
    >
      <div
        className="relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: step.active ? "#fff" : "#F8F9FA",
          boxShadow: step.active ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
          borderLeft: step.active ? `3px solid ${step.color}` : "3px solid transparent",
          transform: step.active ? "scale(1.02)" : undefined,
        }}
      >
        <span
          className="text-[11px] font-bold tracking-wider uppercase mb-4 block"
          style={{ color: step.active ? step.color : "rgba(0,0,0,0.25)" }}
        >
          {step.num}
        </span>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: step.active ? `${step.color}12` : "rgba(0,0,0,0.04)" }}
        >
          <Icon size={22} style={{ color: step.active ? step.color : "rgba(0,0,0,0.3)" }} />
        </div>
        <h3 className="text-lg font-bold mb-1" style={{ color: step.active ? step.color : "rgba(0,0,0,0.7)" }}>
          {step.title}
        </h3>
        <p className="text-[13px] font-medium mb-2" style={{ color: step.active ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.45)" }}>
          {step.subtitle}
        </p>
        <p className="text-[12px] leading-relaxed" style={{ color: step.active ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.35)" }}>
          {step.benefit}
        </p>
        {step.active && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 20% 20%, ${step.color}08, transparent 70%)` }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CONNECTORS                                                        */
/* ═══════════════════════════════════════════════════════════════════ */
function ConnectorLine({ activeSegment }: { activeSegment: boolean }) {
  return (
    <div className="hidden lg:flex items-center" style={{ width: 32 }}>
      <div
        className="w-full h-[2px]"
        style={{
          background: activeSegment ? `linear-gradient(90deg, ${BRAND_PURPLE}, #3C61A8)` : "#E0E0E0",
          opacity: activeSegment ? 1 : 0.6,
        }}
      />
    </div>
  );
}

function MobileConnector({ active }: { active: boolean }) {
  return (
    <div className="lg:hidden flex justify-center" style={{ height: 24 }}>
      <div
        className="w-[2px] h-full"
        style={{
          background: active ? `linear-gradient(180deg, ${BRAND_PURPLE}, #3C61A8)` : "#E0E0E0",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                         */
/* ═══════════════════════════════════════════════════════════════════ */
export default function KYBEntryPage() {
  const [showSplash, setShowSplash] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {/* ─── SHADER SPLASH ─── */}
      <AnimatePresence>
        {showSplash && <ShaderSplash onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* ─── MAIN CONTENT (renders behind splash, revealed when splash exits) ─── */}
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #EEF1FA 0%, #F5F3FF 25%, #FFFDF5 50%, #FFFFFF 80%)" }}
      >
        {!showSplash && <KYBNavbar />}

        {/* brand blue glow — top left */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-5%", left: "-10%",
            width: 700, height: 700,
            background: "radial-gradient(ellipse at 50% 50%, rgba(60,96,168,0.08), transparent 65%)",
          }}
        />

        {/* brand yellow glow — top right */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-5%", right: "-10%",
            width: 600, height: 600,
            background: "radial-gradient(ellipse at 50% 50%, rgba(245,209,52,0.07), transparent 65%)",
          }}
        />

        {/* center glow for hero area */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "15%", left: "50%", transform: "translateX(-50%)",
            width: 900, height: 500,
            background: "radial-gradient(ellipse at 50% 40%, rgba(60,96,168,0.04), transparent 60%)",
          }}
        />

        {/* dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(60,96,168,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* ──── CONTENT ──── */}
        {!showSplash && (
          <div className="relative z-10 max-w-5xl mx-auto px-6" ref={heroRef}>
            <div style={{ height: 64 }} />

            {/* BADGE */}
            <motion.div {...fadeUp(0.15)} className="flex justify-center" style={{ marginTop: 80 }}>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider"
                style={{ background: "rgba(101, 85, 193, 0.08)", color: BRAND_PURPLE }}
              >
                <Sparkles size={14} />
                How CareerXcelerator Works
              </span>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1 {...fadeUp(0.25)} className="text-center" style={{ maxWidth: 700, margin: "16px auto 0" }}>
              <span
                className="block text-[36px] sm:text-[44px] md:text-[52px] leading-[1.1]"
                style={{ color: "#0C0E14", fontWeight: 400 }}
              >
                Start Your
              </span>
              <span
                className="block text-[36px] sm:text-[44px] md:text-[52px] leading-[1.1] font-extrabold"
                style={{
                  background: GOLD_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Career Discovery
              </span>
            </motion.h1>

            {/* SUBHEADING */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-center mx-auto mt-5 leading-[1.65]"
              style={{ maxWidth: 540, color: MUTED, fontSize: 17 }}
            >
              A short discovery process that analyzes real job market data to
              identify roles that match your skills, interests, and career goals.
            </motion.p>

            {/* JOURNEY ROADMAP */}
            <div className="mt-14">
              <div className="hidden lg:flex items-stretch gap-0">
                {STEPS.map((step, i) => (
                  <div key={step.num} className="flex items-stretch" style={{ flex: "1 1 0" }}>
                    <StepCard step={step} index={i} />
                    {i < STEPS.length - 1 && <ConnectorLine activeSegment={i === 0} />}
                  </div>
                ))}
              </div>
              <div className="lg:hidden flex flex-col">
                {STEPS.map((step, i) => (
                  <div key={step.num}>
                    <StepCard step={step} index={i} />
                    {i < STEPS.length - 1 && <MobileConnector active={i === 0} />}
                  </div>
                ))}
              </div>
            </div>

            {/* TIME EXPECTATION */}
            <motion.div {...fadeUp(0.6)} className="flex justify-center mt-12">
              <div
                className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-8 py-4 rounded-xl"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <Clock size={15} style={{ color: BRAND_PURPLE }} />
                  <span style={{ color: MUTED_LIGHT, fontSize: 14 }}>
                    Initial Setup:{" "}
                    <strong style={{ color: BRAND_PURPLE, fontWeight: 700 }}>1-2 minutes</strong>
                  </span>
                </div>
                <span className="hidden sm:block text-[10px]" style={{ color: "rgba(0,0,0,0.15)" }}>|</span>
                <div className="flex items-center gap-2">
                  <Clock size={15} style={{ color: BRAND_PURPLE }} />
                  <span style={{ color: MUTED_LIGHT, fontSize: 14 }}>
                    Market Analysis:{" "}
                    <strong style={{ color: BRAND_PURPLE, fontWeight: 700 }}>up to 10 minutes</strong>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* PRIMARY CTA */}
            <motion.div {...fadeUp(0.7)} className="flex flex-col items-center mt-12">
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-9 py-[18px] rounded-xl text-[18px] font-semibold text-white transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                style={{
                  background: GOLD_GRADIENT,
                  boxShadow: `0 4px 14px ${GOLD_SHADOW}`,
                  minWidth: 300,
                  justifyContent: "center",
                }}
                whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${GOLD_HOVER}` }}
                whileTap={{ scale: 0.98 }}
              >
                Start My Career Discovery
                <ArrowRight size={18} />
              </motion.a>
              <p className="mt-3 text-[13px]" style={{ color: MUTED_LIGHT }}>
                Takes less than 2 minutes · No credit card required
              </p>
            </motion.div>

            <div style={{ height: 80 }} />
          </div>
        )}
      </div>
    </>
  );
}
