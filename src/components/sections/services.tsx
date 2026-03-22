"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Compass, BarChart3, BookOpen, Bot, BadgeCheck,
  FileText, BellRing, Mic, Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Brand ─────────────────────────────────────────────────────────────────────
const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

// ─── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "kyb",
    icon: Compass,
    title: "Know Yourself Better (KYB)",
    university: "Give every student a clear picture of where they stand and which roles they are built for.",
    candidate: "Explore roles using real job market data. Find where you actually fit — based on strengths, not guesswork.",
    accent: ["#EEF2FF", "#C7D2FE"],
  },
  {
    id: "gap",
    icon: BarChart3,
    title: "Skill Gap Analysis",
    university: "Map cohort-wide gaps against live job requirements and guide targeted interventions.",
    candidate: "See exactly what employers screen for in your target role. Close only the gaps that matter.",
    accent: ["#FFF7ED", "#FED7AA"],
  },
  {
    id: "path",
    icon: BookOpen,
    title: "Career Track",
    university: "Deploy curated learning tracks aligned to the roles your students are actually targeting.",
    candidate: "A structured learning path built around what your target role actually requires. No wasted effort.",
    accent: ["#F0FDF4", "#BBF7D0"],
  },
  {
    id: "mentor",
    icon: Bot,
    title: "Career Coach (AI Mentor)",
    university: "Scale expert guidance and evaluation to every student, not just the ones who ask for help.",
    candidate: "Your AI career coach — available 24/7 to guide your preparation and push you forward.",
    accent: ["#EFF6FF", "#BFDBFE"],
  },
  {
    id: "credentials",
    icon: BadgeCheck,
    title: "Verified Credentials",
    university: "Issue credentials backed by assessed competency, not just course completion.",
    candidate: "Earn credentials that prove your readiness to hiring managers. Backed by real assessments.",
    accent: ["#FDF4FF", "#E9D5FF"],
  },
  {
    id: "resume",
    icon: FileText,
    title: "AI Resume Builder",
    university: "Ensure every graduate leaves with a resume that reflects real, validated readiness.",
    candidate: "Generate a role-aligned resume that reflects your actual preparation and skill level.",
    accent: ["#FFFBEB", "#FDE68A"],
  },
  {
    id: "jobs",
    icon: BellRing,
    title: "Career Activation",
    university: "Live employer pipeline. Connect students to 500+ hiring partners instantly.",
    candidate: "Get matched with relevant job opportunities based on your role, readiness, and profile.",
    accent: ["#FFF1F2", "#FECDD3"],
  },
  {
    id: "prep",
    icon: Mic,
    title: "Interview Preparation",
    university: "Standardise interview readiness across every programme and measure it at scale.",
    candidate: "Practise with role-specific questions from real hiring patterns. Build confident, repeatable answers.",
    accent: ["#F0FDFA", "#99F6E4"],
  },
  {
    id: "mock",
    icon: Video,
    title: "Interview Simulator",
    university: "Benchmark readiness through realistic, AI-scored interview simulations.",
    candidate: "Experience AI-powered interview simulations. Get scored feedback and know exactly where you stand.",
    accent: ["#EEF2FF", "#A5B4FC"],
  },
];

// ─── Card Mockup Visual ────────────────────────────────────────────────────────
function CardMockup({ accent, icon: Icon }: { accent: string[]; icon: React.ElementType }) {
  return (
    <div
      className="mt-5 rounded-xl overflow-hidden border"
      style={{ borderColor: "rgba(12,14,20,0.07)" }}
    >
      {/* Browser bar */}
      <div
        className="h-5 flex items-center gap-1.5 px-3 border-b"
        style={{ backgroundColor: accent[0], borderColor: "rgba(12,14,20,0.06)" }}
      >
        {["rgba(12,14,20,0.25)", "rgba(12,14,20,0.15)", "rgba(12,14,20,0.08)"].map((c, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />
        ))}
        <div className="ml-1.5 flex-1 h-1.5 rounded-full" style={{ backgroundColor: "rgba(12,14,20,0.07)" }} />
      </div>

      {/* Abstract dashboard content */}
      <div
        className="relative h-[72px] sm:h-[88px] px-3 py-3 flex flex-col gap-2 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent[0]} 0%, ${accent[1]}44 100%)` }}
      >
        {/* Sidebar hint */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col gap-1 pt-3 pl-1.5">
          {[0.3, 0.2, 0.15, 0.12, 0.1].map((o, i) => (
            <div key={i} className="h-1.5 rounded-full" style={{ backgroundColor: BLUE, opacity: o, width: `${60 + i * 8}%` }} />
          ))}
        </div>
        {/* Main content area */}
        <div className="ml-10 flex flex-col gap-1.5">
          <div className="h-2 w-24 rounded-full" style={{ backgroundColor: BLUE, opacity: 0.2 }} />
          <div className="flex gap-2 mt-0.5">
            {[40, 28, 20].map((w, i) => (
              <div key={i} className="rounded" style={{ height: 32, width: w, backgroundColor: i === 0 ? `${BLUE}20` : `${BLUE}0D`, border: `1px solid ${BLUE}18` }} />
            ))}
          </div>
          <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor: BLUE, opacity: 0.12 }} />
        </div>
        {/* Icon hint */}
        <div
          className="absolute bottom-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${YELLOW}33` }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: BLUE, opacity: 0.7 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Toggle ────────────────────────────────────────────────────────────────────
function TabToggle({
  selected,
  onSelect,
}: {
  selected: "university" | "candidate";
  onSelect: (v: "university" | "candidate") => void;
}) {
  const options = [
    { id: "university" as const, label: "For Institutions" },
    { id: "candidate"  as const, label: "For Individuals"  },
  ];
  return (
    <div
      className="inline-flex rounded-full p-1 gap-0"
      style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          className="relative px-6 py-2 rounded-full text-[12px] font-black transition-colors z-10 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          style={{ color: selected === opt.id ? DARK : "rgba(255,255,255,0.55)" }}
        >
          {selected === opt.id && (
            <motion.span
              layoutId="services-tab-pill"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: YELLOW }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  tab,
  index,
  inView,
}: {
  service: typeof SERVICES[0];
  tab: "university" | "candidate";
  index: number;
  inView: boolean;
}) {
  const Icon = service.icon;
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
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
        style={{ backgroundColor: YELLOW }}
      >
        <Icon className="w-5 h-5" style={{ color: DARK }} />
      </div>

      {/* Title */}
      <h3 className="text-[14px] font-black mb-1.5 leading-snug" style={{ color: BLUE }}>
        {service.title}
      </h3>

      {/* Description — animates between tabs */}
      <AnimatePresence mode="wait">
        <motion.p
          key={tab}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-[12px] leading-relaxed flex-1"
          style={{ color: "rgba(12,14,20,0.5)" }}
        >
          {tab === "university" ? service.university : service.candidate}
        </motion.p>
      </AnimatePresence>

      {/* Mockup visual */}
      <CardMockup accent={service.accent} icon={Icon} />
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export function ServicesSection() {
  const [tab, setTab] = useState<"university" | "candidate">("university");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="w-full py-14 md:py-24 px-4 sm:px-6" style={{ backgroundColor: BLUE }}>
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3 text-white"
          >
            <span style={{ color: YELLOW }}>From Assessment</span>{" "}
            <span className="text-white">to Offer. One Platform.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[14px] mb-8"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Everything you need to understand yourself, build your edge, and land the role.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.35, delay: 0.15 }}
          >
            <TabToggle selected={tab} onSelect={setTab} />
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              tab={tab}
              index={i}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
