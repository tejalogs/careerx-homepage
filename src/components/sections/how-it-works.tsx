"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, BookOpen, Mic, Rocket, ArrowRight } from "lucide-react";
import { ScannerCardStream } from "@/components/ui/scanner-card-stream";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

/* ─── career‑themed Unsplash images for the scanner stream ──── */
const CAREER_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&q=80",   // analytics dashboard
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&q=80",   // studying / learning
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop&q=80",   // professional woman
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&q=80",   // team collaborating
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop&q=80",      // coding on laptop
];

const STEPS = [
  {
    stage: "Discover",
    product: "Know Yourself Better",
    description: "Find which roles fit your strengths using real job market data.",
    icon: Compass,
    color: "#4F46E5",
  },
  {
    stage: "Prepare",
    product: "Career Track",
    description: "Close skill gaps with structured learning built for your target role.",
    icon: BookOpen,
    color: "#047857",
  },
  {
    stage: "Validate",
    product: "Interview Simulator",
    description: "Measure your readiness through AI-powered interview simulations.",
    icon: Mic,
    color: "#B45309",
  },
  {
    stage: "Activate",
    product: "Career Activation",
    description: "Connect with job opportunities matched to your profile and readiness.",
    icon: Rocket,
    color: "#DC2626",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="w-full py-14 md:py-24 overflow-hidden" style={{ backgroundColor: DARK }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(245,209,52,0.6)" }}
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3 text-white"
          >
            Four stages.{" "}
            <span style={{ color: YELLOW }}>One structured system.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px] sm:text-[15px] max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}
          >
            From self-discovery to your first offer — a system that moves with you.
          </motion.p>
        </div>
      </div>

      {/* Scanner stream — full bleed, dark bg */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ScannerCardStream
          cardImages={CAREER_IMAGES}
          height={300}
          initialSpeed={120}
          direction={-1}
          repeat={6}
          cardGap={50}
          friction={0.97}
          scanEffect="scramble"
        />
      </motion.div>

      {/* Stage cards below the stream */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                className="rounded-2xl p-4 sm:p-5 flex flex-col hover:-translate-y-1 transition-transform duration-300 relative group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Step number + Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <span
                    className="text-[11px] font-black tracking-[0.15em] uppercase"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Stage {i + 1}
                  </span>
                </div>

                {/* Stage label */}
                <p
                  className="text-[10px] font-black tracking-[0.22em] uppercase mb-1"
                  style={{ color: step.color }}
                >
                  {step.stage}
                </p>

                {/* Product name */}
                <h3 className="text-[15px] font-black mb-2 leading-snug text-white">
                  {step.product}
                </h3>

                {/* Description */}
                <p
                  className="text-[12px] leading-relaxed flex-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {step.description}
                </p>

                {/* Connector arrow (desktop only, not on last) */}
                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4" style={{ color: "rgba(255,255,255,0.15)" }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center mt-10"
        >
          <a
            href="/kyb"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold transition-all hover:opacity-85 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
            style={{ backgroundColor: YELLOW, color: DARK }}
          >
            Find My Best Role
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
