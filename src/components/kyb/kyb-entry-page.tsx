"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Compass, BookOpen, MessageSquare, Rocket,
  Clock, ArrowRight, Sparkles,
} from "lucide-react";
import Link from "next/link";
import { BrandLogoMark } from "@/components/ui/brand-logo";

/* ─── palette ─────────────────────────────────────────────────────── */
const GOLD_GRADIENT = "linear-gradient(135deg, #B8860B, #DAA520, #F0C040)";
const GOLD_SHADOW   = "rgba(212, 160, 18, 0.25)";
const GOLD_HOVER    = "rgba(212, 160, 18, 0.35)";
const BRAND_PURPLE  = "#6555C1";
const MUTED         = "rgba(0,0,0,0.55)";
const MUTED_LIGHT   = "rgba(0,0,0,0.4)";

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

/* ─── animation variants ──────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Navbar (flat, no pill) ──────────────────────────────────────── */
function KYBNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
          style={{
            background: "#0C0E14",
            color: "#fff",
          }}
        >
          Login <ArrowRight size={13} className="inline ml-1" />
        </Link>
      </div>
    </motion.nav>
  );
}

/* ─── Step Card ───────────────────────────────────────────────────── */
function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.4 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
      style={{ flex: "1 1 0", minWidth: 0 }}
    >
      <div
        className="relative rounded-2xl p-6 transition-all duration-300"
        style={{
          background: step.active ? "#fff" : "#F8F9FA",
          boxShadow: step.active
            ? "0 4px 20px rgba(0,0,0,0.08)"
            : "none",
          borderLeft: step.active
            ? `3px solid ${step.color}`
            : "3px solid transparent",
          transform: step.active ? "scale(1.02)" : "scale(1)",
        }}
      >
        {/* step number */}
        <span
          className="text-[11px] font-bold tracking-wider uppercase mb-4 block"
          style={{ color: step.active ? step.color : "rgba(0,0,0,0.25)" }}
        >
          {step.num}
        </span>

        {/* icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
          style={{
            background: step.active
              ? `${step.color}12`
              : "rgba(0,0,0,0.04)",
          }}
        >
          <Icon
            size={22}
            style={{
              color: step.active ? step.color : "rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* title */}
        <h3
          className="text-lg font-bold mb-1"
          style={{ color: step.active ? step.color : "rgba(0,0,0,0.7)" }}
        >
          {step.title}
        </h3>

        {/* subtitle */}
        <p
          className="text-[13px] font-medium mb-2"
          style={{ color: step.active ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.45)" }}
        >
          {step.subtitle}
        </p>

        {/* benefit */}
        <p
          className="text-[12px] leading-relaxed"
          style={{ color: step.active ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.35)" }}
        >
          {step.benefit}
        </p>

        {/* active glow */}
        {step.active && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 20% 20%, ${step.color}08, transparent 70%)`,
            }}
          />
        )}
      </div>

      {/* hover lift for inactive cards */}
      <style jsx>{`
        .group:hover > div {
          transform: ${step.active ? "scale(1.02)" : "translateY(-2px)"};
          box-shadow: ${step.active
            ? "0 4px 20px rgba(0,0,0,0.08)"
            : "0 2px 12px rgba(0,0,0,0.05)"};
        }
      `}</style>
    </motion.div>
  );
}

/* ─── connector line between cards ────────────────────────────────── */
function ConnectorLine({ activeSegment }: { activeSegment: boolean }) {
  return (
    <div className="hidden lg:flex items-center" style={{ width: 32 }}>
      <div
        className="w-full h-[2px]"
        style={{
          background: activeSegment
            ? `linear-gradient(90deg, ${BRAND_PURPLE}, #3C61A8)`
            : "#E0E0E0",
          opacity: activeSegment ? 1 : 0.6,
        }}
      />
    </div>
  );
}

/* ─── mobile connector (vertical) ─────────────────────────────────── */
function MobileConnector({ active }: { active: boolean }) {
  return (
    <div className="lg:hidden flex justify-center" style={{ height: 24 }}>
      <div
        className="w-[2px] h-full"
        style={{
          background: active
            ? `linear-gradient(180deg, ${BRAND_PURPLE}, #3C61A8)`
            : "#E0E0E0",
        }}
      />
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────── */
export default function KYBEntryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FAFBFF 0%, #FFFFFF 40%)",
      }}
    >
      <KYBNavbar />

      {/* soft radial glow behind hero */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          background: `radial-gradient(ellipse at 50% 25%, rgba(101,85,193,0.03), transparent 60%)`,
        }}
      />

      {/* subtle dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ──── CONTENT ──── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6" ref={heroRef}>

        {/* spacer for fixed nav */}
        <div style={{ height: 64 }} />

        {/* ─── BADGE ─── */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex justify-center"
          style={{ marginTop: 80 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider"
            style={{
              background: `rgba(101, 85, 193, 0.08)`,
              color: BRAND_PURPLE,
            }}
          >
            <Sparkles size={14} />
            How CareerXcelerator Works
          </span>
        </motion.div>

        {/* ─── HEADLINE ─── */}
        <motion.h1
          {...fadeUp(0.3)}
          className="text-center mt-4"
          style={{ maxWidth: 700, margin: "16px auto 0" }}
        >
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

        {/* ─── SUBHEADING ─── */}
        <motion.p
          {...fadeUp(0.35)}
          className="text-center mx-auto mt-5 leading-[1.65]"
          style={{
            maxWidth: 540,
            color: MUTED,
            fontSize: 17,
          }}
        >
          A short discovery process that analyzes real job market data to
          identify roles that match your skills, interests, and career goals.
        </motion.p>

        {/* ─── JOURNEY ROADMAP ─── */}
        <div className="mt-14">
          {/* desktop: horizontal row */}
          <div className="hidden lg:flex items-stretch gap-0">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex items-stretch" style={{ flex: "1 1 0" }}>
                <StepCard step={step} index={i} />
                {i < STEPS.length - 1 && (
                  <ConnectorLine activeSegment={i === 0} />
                )}
              </div>
            ))}
          </div>

          {/* mobile/tablet: vertical stack */}
          <div className="lg:hidden flex flex-col">
            {STEPS.map((step, i) => (
              <div key={step.num}>
                <StepCard step={step} index={i} />
                {i < STEPS.length - 1 && (
                  <MobileConnector active={i === 0} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── TIME EXPECTATION ─── */}
        <motion.div
          {...fadeUp(0.8)}
          className="flex justify-center mt-12"
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-8 py-4 rounded-xl"
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center gap-2">
              <Clock size={15} style={{ color: BRAND_PURPLE }} />
              <span style={{ color: MUTED_LIGHT, fontSize: 14 }}>
                Initial Setup:{" "}
                <strong style={{ color: BRAND_PURPLE, fontWeight: 700 }}>
                  1-2 minutes
                </strong>
              </span>
            </div>
            <span className="hidden sm:block text-[10px]" style={{ color: "rgba(0,0,0,0.15)" }}>
              |
            </span>
            <div className="flex items-center gap-2">
              <Clock size={15} style={{ color: BRAND_PURPLE }} />
              <span style={{ color: MUTED_LIGHT, fontSize: 14 }}>
                Market Analysis:{" "}
                <strong style={{ color: BRAND_PURPLE, fontWeight: 700 }}>
                  up to 10 minutes
                </strong>
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── PRIMARY CTA ─── */}
        <motion.div
          {...fadeUp(0.9)}
          className="flex flex-col items-center mt-12"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-9 py-[18px] rounded-xl text-[18px] font-semibold text-white transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
            style={{
              background: GOLD_GRADIENT,
              boxShadow: `0 4px 14px ${GOLD_SHADOW}`,
              minWidth: 300,
              justifyContent: "center",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: `0 6px 20px ${GOLD_HOVER}`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            Start My Career Discovery
            <ArrowRight size={18} />
          </motion.a>

          <p
            className="mt-3 text-[13px]"
            style={{ color: MUTED_LIGHT }}
          >
            Takes less than 2 minutes · No credit card required
          </p>
        </motion.div>

        {/* bottom spacing */}
        <div style={{ height: 80 }} />
      </div>

      {/* CTA subtle pulse animation */}
      <style jsx global>{`
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }
      `}</style>
    </div>
  );
}
