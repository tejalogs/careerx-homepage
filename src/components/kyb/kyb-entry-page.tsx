"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Sparkles, Target, TrendingUp, Shield, Users, Compass,
} from "lucide-react";
import Link from "next/link";
import { BrandLogoMark } from "@/components/ui/brand-logo";
import { ShaderAnimation } from "@/components/ui/shader-animation";

/* ─── palette ─────────────────────────────────────────────────────── */
const GOLD_GRADIENT = "linear-gradient(135deg, #B8860B, #DAA520, #F0C040)";
const GOLD_SHADOW   = "rgba(212, 160, 18, 0.25)";
const GOLD_HOVER    = "rgba(212, 160, 18, 0.35)";
const BRAND_BLUE    = "#3C61A8";
const MUTED         = "rgba(0,0,0,0.55)";
const MUTED_LIGHT   = "rgba(0,0,0,0.4)";

const SPLASH_DURATION = 3200;

/* ─── commitment stats ────────────────────────────────────────────── */
const STATS = [
  { value: "92%", label: "of users discover a role they never considered", icon: Target },
  { value: "3x", label: "more likely to land interviews with role clarity", icon: TrendingUp },
  { value: "14,000+", label: "professionals have already mapped their career", icon: Users },
];

/* ─── what you will uncover ──────────────────────────────────────── */
const INSIGHTS = [
  {
    title: "Your true role fit",
    description: "Based on real job market data, not assumptions. See exactly which roles match your strengths.",
  },
  {
    title: "Skills that set you apart",
    description: "Identify the skills employers are actively hiring for and where you already stand out.",
  },
  {
    title: "Your market position",
    description: "Understand where you rank against other candidates and what gives you an edge.",
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
  const [textPhase, setTextPhase] = useState(0);
  const calledRef = useRef(false);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;

    t1 = setTimeout(() => setTextPhase(1), 400);
    t2 = setTimeout(() => setTextPhase(2), 2400);
    t3 = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true;
        onComplete();
      }
    }, SPLASH_DURATION);

    // Do NOT clean up timers — let them fire even on strict-mode remount
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

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
            Career<span style={{ color: BRAND_BLUE }}>X</span>celerator
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
/*  STAT CARD                                                         */
/* ═══════════════════════════════════════════════════════════════════ */
function StatCard({ stat, index }: { stat: (typeof STATS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
        style={{ background: "rgba(60,97,168,0.08)" }}
      >
        <Icon size={22} style={{ color: BRAND_BLUE }} />
      </div>
      <p className="text-3xl sm:text-4xl font-black mb-2" style={{ color: "#0C0E14" }}>
        {stat.value}
      </p>
      <p className="text-[14px] leading-relaxed" style={{ color: MUTED, maxWidth: 220, margin: "0 auto" }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  INSIGHT CARD                                                      */
/* ═══════════════════════════════════════════════════════════════════ */
function InsightCard({ insight, index }: { insight: (typeof INSIGHTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "rgba(60,97,168,0.08)" }}
        >
          <span className="text-[13px] font-black" style={{ color: BRAND_BLUE }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div>
          <h3 className="text-[16px] font-bold mb-1.5" style={{ color: "#0C0E14" }}>
            {insight.title}
          </h3>
          <p className="text-[14px] leading-relaxed" style={{ color: MUTED }}>
            {insight.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                         */
/* ═══════════════════════════════════════════════════════════════════ */
export default function KYBEntryPage() {
  const [showSplash, setShowSplash] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use requestAnimationFrame loop to check time elapsed
    const start = performance.now();
    let raf: number;
    const tick = () => {
      if (performance.now() - start >= SPLASH_DURATION) {
        setShowSplash(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {showSplash && (
        <ShaderSplash onComplete={() => setShowSplash(false)} />
      )}

      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(60,96,168,0.08) 0%, rgba(245,209,52,0.06) 50%, rgba(60,96,168,0.04) 100%)" }}
      >
        {!showSplash && <KYBNavbar />}

        {!showSplash && (
          <div className="relative z-10" ref={heroRef}>
            {/* ═══ HERO SECTION ═══ */}
            <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
              {/* Badge */}
              <motion.div {...fadeUp(0.15)} className="flex justify-center">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider"
                  style={{ background: "rgba(60,97,168,0.08)", color: BRAND_BLUE }}
                >
                  <Compass size={14} />
                  Step 1: Discover
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 {...fadeUp(0.25)} className="text-center mt-6">
                <span
                  className="block text-[36px] sm:text-[44px] md:text-[52px] leading-[1.1] font-light"
                  style={{ color: "#0C0E14" }}
                >
                  The job market has
                </span>
                <span
                  className="block text-[36px] sm:text-[44px] md:text-[52px] leading-[1.1] font-extrabold"
                  style={{ color: "#0C0E14" }}
                >
                  thousands of roles.
                </span>
                <span
                  className="block text-[36px] sm:text-[44px] md:text-[52px] leading-[1.1] font-extrabold mt-1"
                  style={{
                    background: GOLD_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Which one is yours?
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                {...fadeUp(0.3)}
                className="text-center mx-auto mt-6 leading-[1.7]"
                style={{ maxWidth: 500, color: MUTED, fontSize: 17 }}
              >
                Most people guess. We analyze real job market data to show you
                exactly where you belong and what it takes to get there.
              </motion.p>

              {/* Primary CTA */}
              <motion.div {...fadeUp(0.4)} className="flex flex-col items-center mt-10">
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 px-9 py-[18px] rounded-xl text-[18px] font-semibold text-white transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                  style={{
                    background: GOLD_GRADIENT,
                    boxShadow: `0 4px 14px ${GOLD_SHADOW}`,
                    minWidth: 280,
                    justifyContent: "center",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${GOLD_HOVER}` }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discover My Best Role
                  <ArrowRight size={18} />
                </motion.a>
                <p className="mt-3 text-[13px]" style={{ color: MUTED_LIGHT }}>
                  Free · No credit card required
                </p>
              </motion.div>
            </div>

            {/* ═══ SOCIAL PROOF STATS ═══ */}
            <div className="max-w-4xl mx-auto px-6 py-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {STATS.map((stat, i) => (
                  <StatCard key={stat.value} stat={stat} index={i} />
                ))}
              </div>
            </div>

            {/* ═══ WHAT YOU WILL UNCOVER ═══ */}
            <div className="max-w-3xl mx-auto px-6 py-16">
              <motion.div {...fadeUp(0.1)} className="text-center mb-10">
                <h2 className="text-[28px] sm:text-[34px] font-bold" style={{ color: "#0C0E14" }}>
                  What you will uncover
                </h2>
                <p className="mt-3 text-[16px]" style={{ color: MUTED, maxWidth: 440, margin: "12px auto 0" }}>
                  In a few focused minutes, you will gain clarity that most people
                  spend months trying to figure out on their own.
                </p>
              </motion.div>

              <div className="flex flex-col gap-4">
                {INSIGHTS.map((insight, i) => (
                  <InsightCard key={insight.title} insight={insight} index={i} />
                ))}
              </div>
            </div>

            {/* ═══ COMMITMENT SECTION ═══ */}
            <div className="max-w-3xl mx-auto px-6 py-16">
              <motion.div
                {...fadeUp(0.1)}
                className="relative rounded-2xl p-8 sm:p-12 text-center overflow-hidden"
                style={{
                  background: "#0C0E14",
                }}
              >
                {/* subtle gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(60,97,168,0.15), transparent 70%)",
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <Shield size={22} style={{ color: "#F5D134" }} />
                  </div>

                  <h2 className="text-[24px] sm:text-[30px] font-bold mb-4" style={{ color: "#fff" }}>
                    This is not a quiz.
                  </h2>
                  <p
                    className="text-[16px] leading-[1.7] mx-auto mb-8"
                    style={{ color: "rgba(255,255,255,0.6)", maxWidth: 440 }}
                  >
                    Your answers shape your entire career path on CareerXcelerator.
                    The more honest and thoughtful you are, the more accurate your
                    role mapping will be. Take this seriously.
                  </p>

                  <motion.a
                    href="#"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[16px] font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                    style={{
                      background: GOLD_GRADIENT,
                      color: "#fff",
                      boxShadow: `0 4px 14px ${GOLD_SHADOW}`,
                    }}
                    whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${GOLD_HOVER}` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    I am ready. Let's begin.
                    <ArrowRight size={17} />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <div style={{ height: 40 }} />
          </div>
        )}
      </div>
    </>
  );
}
