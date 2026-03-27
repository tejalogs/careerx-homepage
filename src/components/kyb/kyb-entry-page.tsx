"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Star, Play, Target, BarChart3, Zap,
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
        scale: textPhase >= 3 ? 1.015 : 1,
      }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
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
/*  VIDEO SECTION (scroll triggered)                                   */
/* ═══════════════════════════════════════════════════════════════════ */
function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [playing, setPlaying] = useState(false);

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-6 py-10">
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
  { icon: Target, title: "Role Fit Analysis", desc: "See which roles match your profile based on real market data", accent: BRAND_BLUE, accentBg: "rgba(60,97,168,0.08)", glow: "rgba(60,97,168,0.06)" },
  { icon: BarChart3, title: "Skill Gap Map", desc: "Know exactly what to build before you start applying", accent: "#7c3aed", accentBg: "rgba(124,58,237,0.08)", glow: "rgba(124,58,237,0.06)" },
  { icon: Zap, title: "Instant Clarity", desc: "Get actionable career direction in under 10 minutes", accent: "#B8860B", accentBg: "rgba(184,134,11,0.08)", glow: "rgba(184,134,11,0.06)" },
];

function WhatYouGet() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.05)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${f.glow}, transparent 70%)` }}
              />
              {/* Top accent line */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-1/2 transition-all duration-500 rounded-full"
                style={{ background: f.accent }}
              />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: f.accentBg }}
                >
                  <Icon size={22} style={{ color: f.accent }} />
                </div>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: "#0C0E14" }}>{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{f.desc}</p>
              </div>
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
    <div ref={ref} className="max-w-3xl mx-auto px-6 py-12">
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
  // heroReady fires 600ms before splash fully fades — creates a butter-smooth crossfade
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroReady(true), SPLASH_DURATION - 600);
    // Keep splash mounted until its opacity animation finishes (~800ms after it starts)
    const t2 = setTimeout(() => setShowSplash(false), SPLASH_DURATION + 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {showSplash && (
        <ShaderSplash onComplete={() => setShowSplash(false)} />
      )}

      <div
        className="relative"
        style={{
          background: "linear-gradient(180deg, #F7F8FC 0%, #FFFDF7 40%, #F0F4FF 70%, #F7F8FC 100%)",
        }}
      >
        {/* Grid background — spans entire page */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(60,97,168,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(60,97,168,0.045) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Cursor spotlight — brand yellow glow */}
        <SpotlightBackground />

        <KYBNavbar />

        <div className="relative z-10">
            {/* ═══ HERO SECTION ═══ */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12">

              {/* Ambient centre glow — hero only */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                style={{
                  width: 900,
                  height: 560,
                  background: "radial-gradient(ellipse at 50% 40%, rgba(60,97,168,0.09) 0%, rgba(245,209,52,0.04) 45%, transparent 70%)",
                  filter: "blur(72px)",
                }}
              />

              <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">

                {/* ── Badge pill ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={heroReady ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8"
                >
                  <div
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                    style={{
                      background: "rgba(60,97,168,0.06)",
                      border: "1px solid rgba(60,97,168,0.15)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                    <span className="text-[12px] font-semibold tracking-wide" style={{ color: BRAND_BLUE }}>
                      Know Yourself Better · Free to start
                    </span>
                  </div>
                </motion.div>

                {/* ── Headline — word-by-word reveal ── */}
                <h1
                  className="text-[52px] sm:text-[80px] md:text-[108px] font-bold leading-[1.04] tracking-tight"
                  style={{ color: "#0C0E14" }}
                >
                  {/* Line 1: each word clips up from below */}
                  <span className="block">
                    {["Find", "Your"].map((word, i) => (
                      <span
                        key={word}
                        style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: i === 0 ? "0.28em" : 0 }}
                      >
                        <motion.span
                          style={{ display: "inline-block" }}
                          initial={{ y: "110%", opacity: 0 }}
                          animate={heroReady ? { y: "0%", opacity: 1 } : {}}
                          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </span>

                  {/* Line 2: yellow marker block pops in */}
                  <motion.span
                    style={{
                      display: "inline-block",
                      backgroundColor: "#F5D134",
                      color: "#0C0E14",
                      borderRadius: 12,
                      padding: "0 16px 6px",
                      lineHeight: 1.15,
                    }}
                    initial={{ opacity: 0, scale: 0.86, y: 20, rotate: -0.6 }}
                    animate={heroReady ? { opacity: 1, scale: 1, y: 0, rotate: -0.6 } : {}}
                    transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Best Role.
                  </motion.span>
                </h1>

                {/* ── Subline ── */}
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={heroReady ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-7 text-[16px] sm:text-[18px] leading-[1.7] max-w-md"
                  style={{ color: MUTED }}
                >
                  A short discovery process that analyzes real job market data to identify roles that match your skills, interests, and career goals.
                </motion.p>

                {/* ── Stats strip ── */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={heroReady ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-9 flex items-center"
                >
                  {[
                    { value: "96%", label: "Accuracy" },
                    { value: "14k+", label: "Careers Mapped" },
                    { value: "Free", label: "Always" },
                  ].map((stat, i) => (
                    <div key={stat.value} className="flex items-center">
                      {i > 0 && (
                        <div className="w-px h-8 mx-6" style={{ background: "rgba(0,0,0,0.09)" }} />
                      )}
                      <div className="flex flex-col items-center">
                        <span className="text-[22px] sm:text-[26px] font-black leading-none" style={{ color: "#0C0E14" }}>
                          {stat.value}
                        </span>
                        <span className="text-[11px] mt-1 font-medium" style={{ color: MUTED }}>
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* ── Social proof first, then CTA ── */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={heroReady ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                >
                  {/* Social proof — comes first */}
                  <div className="flex items-center gap-2.5">
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
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={10} fill="#F5D134" stroke="#F5D134" />
                        ))}
                        <span className="text-[11px] font-bold ml-1" style={{ color: "#0C0E14" }}>4.9</span>
                      </div>
                      <span className="text-[10px] mt-0.5" style={{ color: MUTED_LIGHT }}>2,000+ found direction</span>
                    </div>
                  </div>

                  {/* CTA — comes second */}
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 h-12 px-7 rounded-full text-[15px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{
                      background: BRAND_BLUE,
                      boxShadow: "0 4px 18px rgba(60,97,168,0.32)",
                    }}
                  >
                    Begin KYB
                    <ArrowRight size={15} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                </motion.div>

              </div>
            </section>

            {/* ═══ VIDEO SECTION ═══ */}
            <VideoSection />

            {/* ═══ WHAT YOU GET ═══ */}
            <WhatYouGet />

            {/* ═══ BEGIN KYB CTA ═══ */}
            <BeginKYBCTA />

            <div style={{ height: 20 }} />
          </div>
      </div>
    </>
  );
}
