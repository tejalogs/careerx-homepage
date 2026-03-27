"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Compass, Star, Play, Target, BarChart3, Zap,
} from "lucide-react";
import Link from "next/link";
import { BrandLogoMark } from "@/components/ui/brand-logo";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import SpotlightBackground from "@/components/ui/spotlight-background";

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
  const [textPhase, setTextPhase] = useState(0);  // 0=hidden, 1=show, 2=exit text, 3=fade out
  const calledRef = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTextPhase(1), 400);       // text appears
    const t2 = setTimeout(() => setTextPhase(2), 2200);      // text fades
    const t3 = setTimeout(() => setTextPhase(3), 2600);      // whole splash fades
    const t4 = setTimeout(() => {
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
      animate={{
        opacity: textPhase >= 3 ? 0 : 1,
        scale: textPhase >= 3 ? 1.02 : 1,
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: textPhase >= 3 ? "none" : "auto" }}
    >
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
          animate={
            textPhase >= 1
              ? { opacity: textPhase >= 2 ? 0 : 1, y: textPhase >= 2 ? -20 : 0, filter: "blur(0px)" }
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
              ? { opacity: textPhase >= 2 ? 0 : 0.6, y: textPhase >= 2 ? -10 : 0 }
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
        <Compass size={14} style={{ color: BRAND_BLUE }} />
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
/*  WHAT YOU GET — 3 compact feature cards                             */
/* ═══════════════════════════════════════════════════════════════════ */
const FEATURES = [
  { icon: Target, title: "Role Fit Analysis", desc: "See which roles match your profile based on real market data" },
  { icon: BarChart3, title: "Skill Gap Map", desc: "Know exactly what to build before you start applying" },
  { icon: Zap, title: "Instant Clarity", desc: "Get actionable career direction in under 10 minutes" },
];

function WhatYouGet() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(0,0,0,0.04)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(60,97,168,0.07)" }}
              >
                <Icon size={20} style={{ color: BRAND_BLUE }} />
              </div>
              <h3 className="text-[15px] font-bold mb-1.5" style={{ color: "#0C0E14" }}>{f.title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  BEGIN KYB CTA (animated slide button)                              */
/* ═══════════════════════════════════════════════════════════════════ */
function BeginKYBCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="max-w-3xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* Supporting line */}
        <p
          className="text-[22px] sm:text-[26px] font-semibold mb-2"
          style={{ color: BRAND_BLUE }}
        >
          Clarity is just 10 minutes away.
        </p>
        <p
          className="text-[15px] mb-8"
          style={{ color: MUTED }}
        >
          Know your role fit, skill gaps, and market position before you apply anywhere.
        </p>

        {/* CTA button — brand blue pill with slide animation */}
        <a
          href="#"
          className="group relative overflow-hidden inline-flex items-center h-14 sm:h-16 rounded-full text-[16px] sm:text-[17px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-300 hover:shadow-lg"
          style={{
            background: BRAND_BLUE,
            paddingLeft: 28,
            paddingRight: 56,
          }}
        >
          <span className="transition-all duration-500 group-hover:opacity-0 group-hover:-translate-x-2">
            Know Yourself Better
          </span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 font-semibold">
            Let&apos;s go
          </span>
          <i
            className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full z-10 grid place-items-center transition-all duration-500 group-hover:w-[calc(100%-0.75rem)] group-active:scale-95"
            style={{
              width: 44,
              background: "rgba(255,255,255,0.15)",
            }}
          >
            <ArrowRight size={17} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </i>
        </a>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                         */
/* ═══════════════════════════════════════════════════════════════════ */
export default function KYBEntryPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // No cleanup — must survive React Strict Mode double-mount
    setTimeout(() => setShowSplash(false), SPLASH_DURATION);
  }, []);

  return (
    <>
      {showSplash && (
        <ShaderSplash onComplete={() => setShowSplash(false)} />
      )}

      <div
        className="min-h-screen relative"
        style={{
          background: "linear-gradient(180deg, #F7F8FC 0%, #FFFDF7 40%, #F0F4FF 70%, #F7F8FC 100%)",
        }}
      >
        {/* Subtle dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(rgba(60,97,168,0.025) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Cursor spotlight — brand yellow glow */}
        <SpotlightBackground />

        <KYBNavbar />

        <div className="relative z-10">
            {/* ═══ HERO SECTION — compact, tight spacing ═══ */}
            <div className="relative w-full flex flex-col items-center overflow-hidden pt-24 sm:pt-28 pb-10 px-6">

              {/* Badge + Headline as tight unit */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center"
              >
                <span
                  className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
                  style={{ background: "rgba(60,97,168,0.07)", color: BRAND_BLUE }}
                >
                  Career Discovery
                </span>

                <h1
                  className="text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] font-bold tracking-tight"
                  style={{ color: "#0C0E14" }}
                >
                  {["Interests", "to"].map((word, i) => (
                    <motion.span
                      key={word}
                      className="inline-block mr-[0.22em]"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  <br className="sm:hidden" />
                  <motion.span
                    className="relative inline-block"
                    style={{ filter: "url(#glow-light)" }}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span
                      className="absolute inset-0 opacity-0"
                      style={{
                        background: "linear-gradient(0deg, #1e3a6e 0%, #3C61A8 40%, #6b9be0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "onloadopacity 1s ease-out 0.6s forwards",
                      }}
                      aria-hidden="true"
                    >
                      Outcomes.
                    </span>
                    <span style={{ color: "#1e3a6e" }}>Outcomes.</span>
                  </motion.span>
                </h1>
              </motion.div>

              {/* Subheading — tight to headline */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mx-auto mt-4 leading-[1.6] relative z-10 max-w-lg"
                style={{ color: MUTED, fontSize: 16 }}
              >
                Turn your interests into smarter job targets and better interview outcomes.
              </motion.p>

              {/* CTA + Social proof as compact row */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-5 mt-7 relative z-10"
              >
                {/* CTA — compact pill */}
                <a
                  href="#"
                  className="group relative overflow-hidden inline-flex items-center h-12 rounded-full text-[15px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-300 hover:shadow-md"
                  style={{
                    background: BRAND_BLUE,
                    paddingLeft: 24,
                    paddingRight: 48,
                  }}
                >
                  <span className="transition-all duration-400 group-hover:opacity-0 group-hover:-translate-x-1">
                    Begin KYB
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-400 group-hover:opacity-100 font-semibold text-[14px]">
                    Let&apos;s go
                  </span>
                  <i
                    className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid place-items-center transition-all duration-400 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95"
                    style={{ width: 38, background: "rgba(255,255,255,0.15)" }}
                  >
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </i>
                </a>

                {/* Social proof — inline with CTA */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {AVATARS.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                        style={{ zIndex: AVATARS.length - i }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={10} fill="#F5D134" stroke="#F5D134" />
                      ))}
                    </div>
                    <span className="text-[12px] font-bold" style={{ color: "#0C0E14" }}>4.9</span>
                    <span className="text-[11px]" style={{ color: MUTED_LIGHT }}>· 2,000+ found direction</span>
                  </div>
                </div>
              </motion.div>

              {/* Visual anchor card — grounds the floating text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 mt-10 w-full max-w-2xl"
              >
                <div
                  className="rounded-2xl p-6 sm:p-8 text-center"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.03)",
                  }}
                >
                  <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
                    <div className="text-center">
                      <p className="text-[24px] sm:text-[28px] font-black" style={{ color: "#0C0E14" }}>92%</p>
                      <p className="text-[11px] mt-0.5" style={{ color: MUTED }}>Role accuracy</p>
                    </div>
                    <div className="w-px h-10" style={{ background: "rgba(0,0,0,0.06)" }} />
                    <div className="text-center">
                      <p className="text-[24px] sm:text-[28px] font-black" style={{ color: "#0C0E14" }}>10 min</p>
                      <p className="text-[11px] mt-0.5" style={{ color: MUTED }}>To complete</p>
                    </div>
                    <div className="w-px h-10" style={{ background: "rgba(0,0,0,0.06)" }} />
                    <div className="text-center">
                      <p className="text-[24px] sm:text-[28px] font-black" style={{ color: "#0C0E14" }}>Free</p>
                      <p className="text-[11px] mt-0.5" style={{ color: MUTED }}>No card required</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* SVG glow filter — stronger for visibility */}
              <svg className="absolute -z-10 h-0 w-0" width="0" height="0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="glow-light" colorInterpolationFilters="sRGB" x="-50%" y="-200%" width="200%" height="500%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur3" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur10" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur25" />
                    <feColorMatrix in="blur3" result="c0" type="matrix" values="0.24 0 0 0 0  0 0.38 0 0 0  0 0 0.66 0 0  0 0 0 0.5 0" />
                    <feOffset in="c0" result="o0" dx="0" dy="0" />
                    <feColorMatrix in="blur10" result="c1" type="matrix" values="0.24 0 0 0 0  0 0.38 0 0 0  0 0 0.66 0 0  0 0 0 0.35 0" />
                    <feOffset in="c1" result="o1" dx="0" dy="2" />
                    <feColorMatrix in="blur25" result="c2" type="matrix" values="0.96 0 0 0 0  0 0.82 0 0 0  0 0 0.20 0 0  0 0 0 0.2 0" />
                    <feOffset in="c2" result="o2" dx="0" dy="6" />
                    <feMerge>
                      <feMergeNode in="o0" />
                      <feMergeNode in="o1" />
                      <feMergeNode in="o2" />
                      <feMergeNode in="o0" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* ═══ VIDEO SECTION ═══ */}
            <VideoSection />

            {/* ═══ WHAT YOU GET ═══ */}
            <WhatYouGet />

            {/* ═══ BEGIN KYB CTA ═══ */}
            <BeginKYBCTA />

            <div style={{ height: 40 }} />
          </div>
      </div>
    </>
  );
}
