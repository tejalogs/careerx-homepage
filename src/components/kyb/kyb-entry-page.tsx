"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Sparkles, Star, Play,
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

/* ─── avatar urls (placeholder faces) ─────────────────────────────── */
const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
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
    const t1 = setTimeout(() => setTextPhase(1), 400);
    const t2 = setTimeout(() => setTextPhase(2), 2400);
    const t3 = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true;
        onComplete();
      }
    }, SPLASH_DURATION);
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
/*  SOCIAL PROOF ROW                                                   */
/* ═══════════════════════════════════════════════════════════════════ */
function SocialProofRow() {
  return (
    <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10">
      {/* Avatar stack + rating */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2.5">
          {AVATARS.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
              style={{ zIndex: AVATARS.length - i }}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={12} fill="#F5D134" stroke="#F5D134" />
            ))}
            <span className="text-[12px] font-bold ml-1" style={{ color: "#0C0E14" }}>4.9</span>
          </div>
          <span className="text-[11px]" style={{ color: MUTED_LIGHT }}>
            2,000+ found their direction
          </span>
        </div>
      </div>

      {/* Divider */}
      <span className="hidden sm:block w-px h-8" style={{ background: "rgba(0,0,0,0.08)" }} />

      {/* Trust badge */}
      <div className="flex items-center gap-2">
        <Sparkles size={14} style={{ color: BRAND_BLUE }} />
        <span className="text-[12px] font-medium" style={{ color: MUTED }}>
          Free · No credit card required
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  VIDEO SECTION (scroll triggered)                                   */
/* ═══════════════════════════════════════════════════════════════════ */
function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [playing, setPlaying] = useState(false);

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10"
      >
        <h2 className="text-[28px] sm:text-[34px] font-bold" style={{ color: "#0C0E14" }}>
          See how it works
        </h2>
        <p className="mt-3 text-[16px]" style={{ color: MUTED, maxWidth: 420, margin: "12px auto 0" }}>
          Watch how CareerXcelerator maps your skills to real market opportunities in minutes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          background: "#0C0E14",
          aspectRatio: "16/9",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        }}
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            className="w-full h-full absolute inset-0"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="CareerXcelerator Demo"
          />
        ) : (
          <>
            {/* Poster image */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #0C0E14 50%, #162447 100%)",
              }}
            />

            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute"
                style={{
                  width: 300, height: 300,
                  background: "radial-gradient(ellipse, rgba(60,97,168,0.15), transparent 70%)",
                }}
              />
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: GOLD_GRADIENT,
                  boxShadow: `0 4px 20px ${GOLD_SHADOW}`,
                }}
                whileHover={{ scale: 1.1 }}
              >
                <Play size={28} fill="#fff" stroke="#fff" className="ml-1" />
              </motion.div>
              <p className="text-[14px] font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                Watch the 2 min demo
              </p>
            </div>

            {/* Bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.4))" }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  BEGIN KYB CTA (hand-written circle animation)                      */
/* ═══════════════════════════════════════════════════════════════════ */
const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] },
      opacity: { duration: 0.5 },
    },
  },
};

function BeginKYBCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-6 py-20">
      <div className="relative w-full max-w-lg mx-auto" style={{ minHeight: 280 }}>
        {/* Hand-drawn circle SVG */}
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 600 300"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <title>Begin KYB</title>
          <motion.path
            d="M 480 50
               C 580 120, 560 240, 300 260
               C 120 260, 40 220, 40 150
               C 40 80, 150 40, 300 40
               C 450 40, 500 100, 480 100"
            fill="none"
            strokeWidth="4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={drawVariant}
            className="text-[#3C61A8] opacity-60"
          />
        </motion.svg>

        {/* Content centered inside the circle */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ minHeight: 280 }}>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ color: "#0C0E14" }}
          >
            Begin KYB
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[16px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
              style={{
                background: GOLD_GRADIENT,
                boxShadow: `0 4px 14px ${GOLD_SHADOW}`,
              }}
              whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${GOLD_HOVER}` }}
              whileTap={{ scale: 0.98 }}
            >
              Start Now
              <ArrowRight size={17} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                         */
/* ═══════════════════════════════════════════════════════════════════ */
export default function KYBEntryPage() {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true;
    // Skip splash on HMR re-renders (dev only)
    if (sessionStorage.getItem("kyb-splash-seen")) return false;
    return true;
  });

  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem("kyb-splash-seen", "1");
      setShowSplash(false);
    }, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [showSplash]);

  return (
    <>
      {showSplash && (
        <ShaderSplash onComplete={() => setShowSplash(false)} />
      )}

      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(60,96,168,0.08) 0%, rgba(245,209,52,0.06) 50%, rgba(60,96,168,0.04) 100%)",
          visibility: showSplash ? "hidden" : "visible",
        }}
      >
        <KYBNavbar />

        <div className="relative z-10">
            {/* ═══ HERO SECTION ═══ */}
            <div className="max-w-4xl mx-auto px-6 pt-32 pb-8">
              {/* Badge */}
              <motion.div {...fadeUp(0.15)} className="flex justify-center">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider"
                  style={{ background: "rgba(60,97,168,0.08)", color: BRAND_BLUE }}
                >
                  <Sparkles size={14} />
                  Career Discovery
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 {...fadeUp(0.25)} className="text-center mt-6">
                <span
                  className="block text-[38px] sm:text-[48px] md:text-[56px] leading-[1.08] font-bold"
                  style={{ color: "#0C0E14" }}
                >
                  Find your
                </span>
                <span
                  className="block text-[38px] sm:text-[48px] md:text-[56px] leading-[1.08] font-extrabold"
                  style={{
                    background: GOLD_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  best role.
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                {...fadeUp(0.3)}
                className="text-center mx-auto mt-5 leading-[1.65]"
                style={{ maxWidth: 440, color: MUTED, fontSize: 17 }}
              >
                Answer a few questions. We will analyze real job market data
                and show you the roles that truly fit.
              </motion.p>

              {/* Primary CTA */}
              <motion.div {...fadeUp(0.38)} className="flex justify-center mt-8">
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 px-9 py-[18px] rounded-xl text-[18px] font-semibold text-white transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                  style={{
                    background: GOLD_GRADIENT,
                    boxShadow: `0 4px 14px ${GOLD_SHADOW}`,
                  }}
                  whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${GOLD_HOVER}` }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discover My Best Role
                  <ArrowRight size={18} />
                </motion.a>
              </motion.div>

              {/* Social Proof */}
              <SocialProofRow />
            </div>

            {/* ═══ VIDEO SECTION ═══ */}
            <VideoSection />

            {/* ═══ BEGIN KYB CTA ═══ */}
            <BeginKYBCTA />

            <div style={{ height: 40 }} />
          </div>
      </div>
    </>
  );
}
