"use client";

import { useState, useRef } from "react";
import { motion, useInView, useScroll, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

// ─── Brand ────────────────────────────────────────────────────────────────────
const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    id: "students",
    label: "Students",
    tagline: "Starting out and need direction.",
    body: "You're talented but the market doesn't know it yet. We match you to the right roles, build the right skills, and get you interview-ready before the pressure is real.",
    bullets: ["Role matching before you graduate", "Skills built around what the role actually requires", "Interview practice before it counts", "Enter the market with a readiness profile"],
    stat: "82%", statLabel: "of students receive an offer within 60 days of graduating",
    cta: "Start your assessment",
    ctaHref: "#get-started",
  },
  {
    id: "switchers",
    label: "Career Switchers",
    tagline: "Pivoting with purpose, not panic.",
    body: "You have more to offer than your current title suggests. We map what transfers, close the gap precisely, and position your background as an asset not a liability.",
    bullets: ["Transferable skill mapping in minutes", "Exact gap analysis with no generic advice", "Validate before leaving your current role", "Positioned as an asset, not a risk"],
    stat: "2.4×", statLabel: "average salary increase for career switchers in our program",
    cta: "Map your transfer",
    ctaHref: "#get-started",
  },
  {
    id: "universities",
    label: "Universities",
    tagline: "Placement is your metric. Own it.",
    body: "Placement rates define institutional value. Our system gives every student a structured, measurable path and gives you the data to prove it's working.",
    bullets: ["Real-time cohort readiness tracking", "Measurable student progression by stage", "500+ industry partner network", "Report outcomes, not just graduation numbers"],
    stat: "91%", statLabel: "placement rate across university cohorts using our system",
    cta: "Partner with us",
    ctaHref: "#get-started",
  },
  {
    id: "employers",
    label: "Industry Partners",
    tagline: "Access professionals who are actually ready.",
    body: "Stop screening 200 CVs for one good match. Our members arrive pre-validated, role-matched, and prepared to contribute from day one.",
    bullets: ["Pre-validated professional pools by role", "Readiness scores replace gut-feel", "Cut interview cycles by up to 60%", "Continuous pipeline not a one-time search"],
    stat: "60%", statLabel: "reduction in time-to-hire for our industry partners",
    cta: "Access talent pipeline",
    ctaHref: "#get-started",
  },
];

const OUTCOMES = [
  {
    n: "01",
    title: "You stop applying blind.",
    body: "Every application is targeted. You know why you're qualified, what the role demands, and how to position yourself.",
    stat: "3.2× more callbacks on targeted vs. untargeted applications",
  },
  {
    n: "02",
    title: "You walk in already prepared.",
    body: "You've answered the exact questions you'll face under simulated pressure, with feedback. The real interview feels like a repeat.",
    stat: "87% of our members pass the first interview round",
  },
  {
    n: "03",
    title: "You land offers worth accepting.",
    body: "Role-fit clarity means you negotiate from confidence. You'll know your market value and how to defend it.",
    stat: "94% offer acceptance rate · 2.4× average salary uplift",
  },
];

// Orbit stages — clockwise: top → right → left → bottom (user layout)
const ORBIT_STAGES = [
  { id: "discover", label: "Discover", angle: -90, visual: "dots",     sub: "Find the roles that match your strengths"                  },
  { id: "prepare",  label: "Prepare",  angle: 0,   visual: "progress", sub: "Build skills aligned with real job expectations"           },
  { id: "validate", label: "Validate", angle: 180, visual: "check",    sub: "Test your readiness with real interview scenarios"         },
  { id: "activate", label: "Activate", angle: 90,  visual: "launch",   sub: "Apply with clarity and timing"                            },
];

// ─── Micro Visuals ────────────────────────────────────────────────────────────
function DotsVisual({ isActive }: { isActive: boolean }) {
  const pts = [{ x: -7, y: -6 }, { x: 5, y: -7 }, { x: 8, y: 2 }, { x: -3, y: 6 }, { x: 4, y: 7 }];
  return (
    <div className="relative w-7 h-7">
      {pts.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: 5, height: 5, left: "50%", top: "50%", marginLeft: -2.5, marginTop: -2.5, backgroundColor: BLUE }}
          animate={isActive ? { x: p.x, y: p.y, opacity: 1, scale: 1 } : { x: 0, y: 0, opacity: 0.2, scale: 0.4 }}
          transition={{ duration: 0.45, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }}
        />
      ))}
    </div>
  );
}

function ProgressVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex flex-col gap-[3px]">
      {[1, 0.65, 0.35].map((fill, i) => (
        <div key={i} className="h-[3px] w-8 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(60,97,168,0.1)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: BLUE }}
            animate={{ width: isActive ? `${fill * 100}%` : "12%" }}
            transition={{ duration: 0.55 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
          />
        </div>
      ))}
    </div>
  );
}

function CheckVisual({ isActive }: { isActive: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <motion.path
        d="M 4 11 L 9 16 L 18 6"
        stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        animate={{ pathLength: isActive ? 1 : 0.05, opacity: isActive ? 1 : 0.2 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      />
    </svg>
  );
}

function LaunchVisual({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      animate={isActive ? { y: [-2, -6, -2] } : { y: 0 }}
      transition={isActive ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : { duration: 0.3 }}
    >
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
        <motion.path
          d="M 9 18 L 9 5 M 4 9 L 9 5 L 14 9"
          stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          animate={{ opacity: isActive ? 1 : 0.2 }}
        />
        <motion.path
          d="M 5 16 L 13 16"
          stroke={YELLOW} strokeWidth="2.5" strokeLinecap="round"
          style={{ transformOrigin: "9px 16px" }}
          animate={{ scaleX: isActive ? 1 : 0.3, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </svg>
    </motion.div>
  );
}

function NodeMicroVisual({ type, isActive }: { type: string; isActive: boolean }) {
  if (type === "dots")     return <DotsVisual isActive={isActive} />;
  if (type === "progress") return <ProgressVisual isActive={isActive} />;
  if (type === "check")    return <CheckVisual isActive={isActive} />;
  if (type === "launch")   return <LaunchVisual isActive={isActive} />;
  return null;
}

// ─── Orbit Visualization ──────────────────────────────────────────────────────
const ORBIT_R = 168;
const CX = 240;
const CY = 240;
const VIEW = 480;

function OrbitVisualization({ activeStage }: { activeStage: number }) {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px] aspect-square mx-auto">
      {/* SVG: orbit ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${VIEW} ${VIEW}`} overflow="visible">
        <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="rgba(60,97,168,0.07)" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="rgba(60,97,168,0.07)" strokeWidth="1" strokeDasharray="4 10" />
      </svg>

      {/* Nodes */}
      {ORBIT_STAGES.map((stage, i) => {
        const rad = (stage.angle * Math.PI) / 180;
        const x = CX + Math.cos(rad) * ORBIT_R;
        const y = CY + Math.sin(rad) * ORBIT_R;
        const isActive = i === activeStage;
        const isPast   = i < activeStage;

        return (
          <div
            key={stage.id}
            className="absolute"
            style={{ left: `${(x / VIEW) * 100}%`, top: `${(y / VIEW) * 100}%`, transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{
                scale:   isActive ? 1.06 : isPast ? 0.92 : 0.82,
                opacity: isActive ? 1    : isPast ? 0.5  : 0.2,
              }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* Pulse ring (active only) */}
              <div className="relative">
                {isActive && (
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      inset: -10,
                      border: `1px solid rgba(60,97,168,0.3)`,
                    }}
                    animate={{ scale: [0.85, 1.3], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                  />
                )}
                {/* Node circle */}
                <div
                  className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? "#fff" : isPast ? "rgba(60,97,168,0.04)" : "transparent",
                    border: isActive
                      ? `1.5px solid rgba(60,97,168,0.25)`
                      : `1px solid rgba(60,97,168,${isPast ? 0.12 : 0.07})`,
                    boxShadow: isActive ? "0 6px 28px rgba(60,97,168,0.14)" : "none",
                  }}
                >
                  {isPast ? (
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BLUE, opacity: 0.5 }} />
                  ) : (
                    <NodeMicroVisual type={stage.visual} isActive={isActive} />
                  )}
                </div>
              </div>

              {/* Label */}
              <span
                className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-500"
                style={{ color: isActive ? BLUE : "rgba(60,97,168,0.3)" }}
              >
                {stage.label}
              </span>
            </motion.div>
          </div>
        );
      })}

      {/* Center orb */}
      <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <motion.div
          className="w-[68px] h-[68px] sm:w-[78px] sm:h-[78px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: DARK }}
          animate={{ boxShadow: ["0 0 0 6px rgba(12,14,20,0.05)", "0 0 0 11px rgba(12,14,20,0.025)", "0 0 0 6px rgba(12,14,20,0.05)"] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-white/50 text-center leading-[1.4] px-2">
            Your<br />Journey
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Audience Section ─────────────────────────────────────────────────────────
export function AudienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="audience" className="w-full py-14 md:py-20 px-4 sm:px-6" style={{ backgroundColor: "#FFFFFF" }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 md:mb-14 overflow-hidden">
          <div className="overflow-hidden mb-3">
            <motion.p
              className="text-[10px] font-black tracking-[0.3em] uppercase"
              style={{ color: BLUE }}
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              Who it&apos;s for
            </motion.p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.3]" style={{ color: DARK }}>
            {["Built", "for"].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.1 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span
                className="inline-block"
                style={{ backgroundColor: YELLOW, padding: "0 5px", borderRadius: "2px" }}
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.24 }}
              >
                every person
              </motion.span>
            </span>
            {["in", "the", "hiring", "equation."].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.31 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white p-5 sm:p-7 flex flex-col gap-4 sm:gap-5"
            >
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase block mb-2" style={{ color: "rgba(60,97,168,0.35)" }}>
                  0{i + 1}
                </span>
                <h3 className="text-lg font-black" style={{ color: DARK }}>{p.label}</h3>
                <p className="text-[13px] mt-1 leading-snug" style={{ color: "rgba(12,14,20,0.5)" }}>{p.tagline}</p>
              </div>
              <div className="h-px bg-gray-100" />
              <div>
                <span className="text-2xl font-black block" style={{ color: BLUE }}>{p.stat}</span>
                <p className="text-[11px] mt-1 leading-snug" style={{ color: "rgba(12,14,20,0.45)" }}>{p.statLabel}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: BLUE }} />
                    <span className="text-[12px] leading-snug" style={{ color: "rgba(12,14,20,0.6)" }}>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href={p.ctaHref}
                className="mt-auto flex items-center gap-1.5 text-[12px] font-black transition-all hover:gap-2.5"
                style={{ color: BLUE }}
              >
                {p.cta}
                <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Journey Orbit ────────────────────────────────────────────────────────────
export function RoadmapSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStage(Math.min(Math.floor(v * 4), 3));
  });

  return (
    <section id="roadmap" className="w-full bg-white overflow-x-hidden">

      {/* Header — normal flow, scrolls away */}
      <div ref={headerRef} className="py-20 md:py-28 text-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-[10px] font-black tracking-[0.3em] uppercase mb-4"
          style={{ color: BLUE }}
        >
          The Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.07 }}
          className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4"
          style={{ color: DARK }}
        >
          From underprepared to{" "}
          <span style={{ color: BLUE }}>unstoppable.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-[13px] max-w-sm mx-auto"
          style={{ color: "rgba(12,14,20,0.4)" }}
        >
          Scroll to move through each stage of the journey.
        </motion.p>
      </div>

      {/* Sticky orbit — 300vh scroll canvas */}
      <div ref={wrapperRef} style={{ height: "300vh" }} className="relative">
        <div className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center gap-6 md:gap-8 px-6 overflow-hidden">

          {/* Orbit */}
          <OrbitVisualization activeStage={activeStage} />

          {/* Stage label + description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="text-center"
            >
              <p
                className="text-[9px] font-black tracking-[0.35em] uppercase mb-2"
                style={{ color: "rgba(60,97,168,0.4)" }}
              >
                {String(activeStage + 1).padStart(2, "0")} / 04
              </p>
              <h3
                className="text-2xl md:text-3xl font-black tracking-tight"
                style={{ color: DARK }}
              >
                {ORBIT_STAGES[activeStage].label}
              </h3>
              <p
                className="text-[13px] md:text-sm mt-2 max-w-[260px] mx-auto leading-relaxed"
                style={{ color: "rgba(12,14,20,0.45)" }}
              >
                {ORBIT_STAGES[activeStage].sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress pills */}
          <div className="flex items-center gap-2">
            {ORBIT_STAGES.map((s, i) => (
              <motion.div
                key={s.id}
                className="h-[5px] rounded-full"
                animate={{
                  width: i === activeStage ? 28 : 6,
                  backgroundColor: i <= activeStage ? BLUE : "rgba(60,97,168,0.12)",
                }}
                transition={{ duration: 0.35 }}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <AnimatePresence>
            {activeStage < 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                style={{ color: "rgba(12,14,20,0.2)" }}
              >
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">scroll</span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </section>
  );
}

// ─── Outcomes Section ─────────────────────────────────────────────────────────
export function OutcomesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="outcomes" className="w-full py-24 px-6 overflow-hidden" style={{ backgroundColor: "#F5F7FF" }}>
      <div ref={ref} className="max-w-6xl mx-auto">

        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full border border-[#3C61A8]/30 mb-6"
            style={{ backgroundColor: "rgba(60,97,168,0.08)" }}
          >
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: BLUE }}>The Real Payoff</p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl"
            style={{ color: DARK }}
          >
            What this actually{" "}
            <span style={{ color: BLUE }}>does for you.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg max-w-xl"
            style={{ color: "rgba(12,14,20,0.7)" }}
          >
            Don&apos;t just take our word for it. Here are the tangible transformations our members experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {OUTCOMES.map((o, i) => (
            <motion.div
              key={o.n}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase group-hover:text-[#3C61A8]/30 transition-colors" style={{ color: "rgba(66,103,178,0.2)" }}>
                  Outcome {o.n}
                </span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(66,103,178,0.08)" }}>
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" style={{ color: BLUE }} />
                </div>
              </div>
              <h3
                className="text-2xl font-black mb-4 leading-tight transition-colors group-hover:text-[#3C61A8]"
                style={{ color: DARK }}
              >
                {o.title}
              </h3>
              <p className="leading-relaxed mb-8 flex-1" style={{ color: "rgba(12,14,20,0.7)" }}>
                {o.body}
              </p>
              <div className="pt-6 border-t border-gray-100 mt-auto">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: BLUE }}>Result</span>
                  <p className="text-sm font-bold leading-snug" style={{ color: DARK }}>{o.stat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-[3rem] px-12 py-10 grid grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden"
          style={{ backgroundColor: BLUE, boxShadow: "0 30px 80px rgba(66,103,178,0.3)" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
          {[
            { value: "3.2 wks", label: "to first offer" },
            { value: "500+",    label: "industry partners" },
            { value: "2,000+",  label: "professionals guided" },
            { value: "91%",     label: "role-fit accuracy" },
          ].map((s, i) => (
            <div key={s.label} className="text-center relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="text-4xl font-black tracking-tighter mb-2"
                style={{ color: YELLOW }}
              >
                {s.value}
              </motion.p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
