"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, active = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return value;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { num: 11,  prefix: "",  unit: " Days", label: "Avg Time to Interview" },
  { num: 72,  prefix: "",  unit: "%",     label: "Faster Offer" },
  { num: 62,  prefix: "+", unit: "%",     label: "Median Salary Increase" },
  { num: 98,  prefix: "",  unit: "%",     label: "Role Match Accuracy" },
];

// ─── Readiness Curve SVG ──────────────────────────────────────────────────────
export function ReadinessChart({ inView }: { inView: boolean }) {
  // Curve: from (24,188) → bezier → (376,28)
  const pathD = "M 24 188 C 80 188, 180 170, 376 28";

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden p-5"
      style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <p className="text-[12px] font-bold text-white mb-4">Career Readiness Score</p>

      <svg viewBox="0 0 400 220" className="w-full" style={{ height: "180px" }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1="24" y1={196 - t * 168}
            x2="380" y2={196 - t * 168}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1"
          />
        ))}

        {/* Dotted threshold line (Job-Ready level) */}
        <line
          x1="24" y1="42" x2="376" y2="42"
          stroke="#F5D134" strokeWidth="1.2"
          strokeDasharray="5 4" opacity="0.6"
        />

        {/* Filled area under curve */}
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5D134" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#F5D134" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 24 188 C 80 188, 180 170, 376 28 L 376 196 L 24 196 Z"
          fill="url(#curveGrad)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        {/* Curve line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#F5D134"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />

        {/* Start dot */}
        <motion.circle
          cx="24" cy="188" r="4"
          fill="rgba(255,255,255,0.4)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        />

        {/* End dot */}
        <motion.circle
          cx="376" cy="28" r="6"
          fill="#F5D134"
          initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.7, type: "spring", stiffness: 200 }}
        />

        {/* Labels */}
        <motion.text x="30" y="204" fontSize="9" fill="rgba(255,255,255,0.5)" fontWeight="600"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          Low (36%)
        </motion.text>
        <motion.text x="296" y="22" fontSize="9" fill="rgba(255,255,255,0.85)" fontWeight="700"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.9 }}>
          Job-Ready (97%)
        </motion.text>

        {/* Y-axis label */}
        <text
          x="10" y="110"
          fontSize="8" fill="rgba(255,255,255,0.35)" fontWeight="600"
          transform="rotate(-90, 10, 110)"
          textAnchor="middle"
        >
          Readiness Level →
        </text>

        {/* X-axis label */}
        <text x="200" y="215" fontSize="8" fill="rgba(255,255,255,0.35)" fontWeight="600" textAnchor="middle">
          Career Journey Timeline →
        </text>
      </svg>
    </div>
  );
}

// ─── Stat Tile with count-up ───────────────────────────────────────────────────
function StatTile({ stat, index, inView }: { stat: typeof STATS[number]; index: number; inView: boolean }) {
  const count = useCountUp(stat.num, 1400, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.3 + index * 0.08 }}
      className="rounded-2xl p-6 flex flex-col gap-1"
      style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <p className="text-3xl font-black tracking-tight leading-none" style={{ color: "#F5D134" }}>
        {stat.prefix}{count}
        <span className="text-xl">{stat.unit}</span>
      </p>
      <p className="text-[11px] font-bold mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function CandidateOutcomesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full py-20 px-6" style={{ backgroundColor: "#3C61A8" }}>
        <div ref={ref} className="max-w-5xl mx-auto">

          {/* Top: left copy + right chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <div
                className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full w-fit"
                style={{ backgroundColor: "rgba(245,209,52,0.15)", border: "1px solid rgba(245,209,52,0.3)" }}
              >
                <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: "#F5D134" }}>
                  Real Results. Verified.
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 text-white">
                Candidate{" "}
                <span style={{ color: "#F5D134" }}>Outcomes</span>
              </h2>

              <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                Preparation produces predictable results. These numbers reflect what changes when candidates truly know themselves and show up ready.
              </p>
            </motion.div>

            {/* Right: chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <ReadinessChart inView={inView} />
            </motion.div>
          </div>

          {/* Bottom: 4 stat tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STATS.map((s, i) => (
              <StatTile key={s.label} stat={s} index={i} inView={inView} />
            ))}
          </div>

        </div>
      </section>
  );
}
