"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Zap, TrendingUp, Users } from "lucide-react";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

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

const OUTCOMES = [
  { icon: Target,     stat: 98,   unit: "%",     label: "Role Match Accuracy",    desc: "AI-powered matching against real job market data" },
  { icon: Zap,        stat: 11,   unit: " Days", label: "Avg Time to Interview",  desc: "From starting preparation to first interview callback" },
  { icon: TrendingUp, stat: 72,   unit: "%",     label: "Faster Offer",           desc: "Compared to traditional job search methods" },
  { icon: Users,      stat: 2000, unit: "+",     label: "Careers Accelerated",    desc: "Professionals placed through CareerXcelerator" },
];

function StatCard({ item, index, inView }: { item: typeof OUTCOMES[0]; index: number; inView: boolean }) {
  const Icon = item.icon;
  const display = useCountUp(item.stat, 1400, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.33, 1, 0.68, 1] }}
      className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col hover:-translate-y-1 transition-transform duration-300"
      style={{
        border: "1px solid rgba(12,14,20,0.07)",
        boxShadow: "0 2px 12px rgba(12,14,20,0.05)",
      }}
    >
      {/* Icon — yellow bg (matches services) */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
        style={{ backgroundColor: YELLOW }}
      >
        <Icon className="w-5 h-5" style={{ color: DARK }} />
      </div>

      {/* Stat */}
      <p className="text-2xl font-black tracking-tight leading-none" style={{ color: BLUE }}>
        {display}<span className="text-lg">{item.unit}</span>
      </p>

      {/* Label */}
      <h3 className="text-[14px] font-black mb-1.5 leading-snug mt-2" style={{ color: BLUE }}>
        {item.label}
      </h3>

      {/* Description */}
      <p
        className="text-[12px] leading-relaxed"
        style={{ color: "rgba(12,14,20,0.5)" }}
      >
        {item.desc}
      </p>
    </motion.div>
  );
}

export function UserOutcomesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full py-14 md:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F7F8FC" }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header — matches services/mission-vision pattern */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-black tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(60,97,168,0.45)" }}
          >
            Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-4xl font-black tracking-tight leading-tight"
            style={{ color: DARK }}
          >
            Real outcomes.{" "}
            <span style={{ color: BLUE }}>Not promises.</span>
          </motion.h2>
        </div>

        {/* Stat cards — same style as services cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {OUTCOMES.map((item, i) => (
            <StatCard key={item.label} item={item} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}
