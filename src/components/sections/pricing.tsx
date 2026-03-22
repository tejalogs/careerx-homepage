"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Target, Gem, Rocket, Coins, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Brand ─────────────────────────────────────────────────────────────────────
const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";
const BG     = "#F7F8FC";

// ─── Logo Strip ────────────────────────────────────────────────────────────────
const LOGOS = [
  { name: "Google",      abbr: "G",   bg: "#4285F4", fg: "#fff" },
  { name: "Microsoft",   abbr: "Ms",  bg: "#00A4EF", fg: "#fff" },
  { name: "Amazon",      abbr: "Am",  bg: "#FF9900", fg: "#fff" },
  { name: "Meta",        abbr: "Mt",  bg: "#0082FB", fg: "#fff" },
  { name: "Salesforce",  abbr: "Sf",  bg: "#00A1E0", fg: "#fff" },
  { name: "Deloitte",    abbr: "De",  bg: "#86BC25", fg: "#fff" },
  { name: "Accenture",   abbr: "Ac",  bg: "#A100FF", fg: "#fff" },
  { name: "IBM",         abbr: "IBM", bg: "#1F70C1", fg: "#fff" },
  { name: "Oracle",      abbr: "Or",  bg: "#F80000", fg: "#fff" },
  { name: "Capgemini",   abbr: "Cap", bg: "#0070AD", fg: "#fff" },
  { name: "Cognizant",   abbr: "Cog", bg: "#1A4CA1", fg: "#fff" },
  { name: "PwC",         abbr: "PwC", bg: "#D04A02", fg: "#fff" },
];

function LogoStrip() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <div className="mt-16 mb-2">
      <p
        className="text-center text-[9px] font-black tracking-[0.25em] uppercase mb-5"
        style={{ color: "rgba(60,97,168,0.4)" }}
      >
        Our Candidates Are Now At Leading Companies
      </p>

      <div className="relative max-w-full sm:max-w-xl mx-auto overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${BG}, transparent)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${BG}, transparent)` }}
        />

        <style jsx>{`
          @keyframes pricingLogoScroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>

        <div
          className="flex items-center gap-4 w-max py-1"
          style={{ animation: "pricingLogoScroll 30s linear infinite" }}
        >
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110"
              style={{ backgroundColor: logo.bg, boxShadow: "0 2px 8px rgba(12,14,20,0.12)" }}
              title={logo.name}
            >
              <span
                className="text-[9px] font-black tracking-tight leading-none"
                style={{ color: logo.fg }}
              >
                {logo.abbr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Feature tooltip definitions ───────────────────────────────────────────────
const FEATURE_TIPS: Record<string, string> = {
  "KYB Role Assessment": "Know Your Best. A structured assessment that maps your strengths to the roles where you will actually thrive.",
  "1 Full Career Track": "A curated learning and preparation programme built around one target role or industry.",
  "2 Full Career Tracks": "Dual-track preparation covering two distinct roles or industries simultaneously.",
  "Skill development roadmap": "A personalised, sequenced plan that closes only the skill gaps your target employers actually screen for.",
  "1 Interview Simulator session": "One full AI-powered mock interview with real question banks and detailed performance feedback.",
  "3 months Interview PrepX": "Three months of unlimited AI mock interviews, question libraries, and weekly feedback cycles.",
  "6 months Interview PrepX": "Six months of unlimited AI mock interviews, question libraries, and weekly feedback cycles.",
  "1 Career Expert Session": "A 60-minute 1-on-1 session with a career strategist to review your positioning and preparation plan.",
  "2 Career Expert Sessions": "Two 60-minute 1-on-1 sessions with career strategists at key stages of your journey.",
  "1 month Career Activation": "Guided job search support including targeted outreach, application strategy and employer introductions for 30 days.",
  "3 months Career Activation": "Three months of guided job search with active employer introductions, application reviews and offer negotiation coaching.",
  "6 months Career Activation": "Six months of full-service career activation with the highest level of hands-on employer access and coaching.",
};

// ─── Feature with tooltip ───────────────────────────────────────────────────────
function FeatureItem({ feature, isPopular }: { feature: string; isPopular: boolean }) {
  const [open, setOpen] = useState(false);
  const tip = FEATURE_TIPS[feature];

  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
        style={{ borderColor: isPopular ? BLUE : "rgba(12,14,20,0.3)" }}
      >
        <Check className="w-3 h-3" style={{ color: isPopular ? BLUE : DARK }} />
      </div>
      <div className="flex-1 flex items-start gap-1.5">
        <span className="text-sm font-medium" style={{ color: DARK }}>{feature}</span>
        {tip && (
          <div className="relative mt-0.5 shrink-0">
            <button
              type="button"
              aria-label={`More info about ${feature}`}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              className="w-4 h-4 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              style={{ color: "rgba(12,14,20,0.3)" }}
            >
              <Info className="w-3.5 h-3.5" />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 z-50 rounded-xl px-3 py-2 shadow-lg pointer-events-none"
                  style={{ backgroundColor: DARK, border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p className="text-[11px] leading-relaxed text-white/80">{tip}</p>
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                    style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${DARK}` }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: "builder",
    name: "Career Builder",
    icon: <Target className="w-6 h-6" />,
    price: 449,
    description: "Discover your role fit and start preparing",
    popular: false,
    features: [
      "KYB Role Assessment",
      "1 Full Career Track",
      "Skill development roadmap",
      "1 Interview Simulator session",
      "1 month Career Activation",
    ],
  },
  {
    id: "pro",
    name: "Career Pro",
    icon: <Gem className="w-6 h-6" />,
    price: 649,
    description: "Full career track with expert coaching",
    popular: true,
    features: [
      "KYB Role Assessment",
      "1 Full Career Track",
      "1 Career Expert Session",
      "3 months Interview PrepX",
      "3 months Career Activation",
    ],
  },
  {
    id: "elite",
    name: "Career Elite",
    icon: <Rocket className="w-6 h-6" />,
    price: 799,
    description: "The complete career acceleration system",
    popular: false,
    features: [
      "KYB Role Assessment",
      "2 Full Career Tracks",
      "2 Career Expert Sessions",
      "6 months Interview PrepX",
      "6 months Career Activation",
    ],
  },
];

// ─── Pricing Section ───────────────────────────────────────────────────────────
export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} id="pricing" className="w-full py-14 md:py-24 px-4 sm:px-6 relative" style={{ backgroundColor: BG }}>
      <div className="w-full max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2"
          >
            <Coins className="w-4 h-4" style={{ color: BLUE }} />
            <span
              className="text-base font-semibold tracking-wide"
              style={{ color: BLUE }}
            >
              Simple Pricing
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.07 }}
            className="relative inline-block"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black" style={{ color: DARK }}>
              One investment. From discovery to offer.
            </h2>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-3 rounded-full blur-sm rotate-[-1deg]"
              style={{ backgroundColor: `${YELLOW}55` }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-base"
            style={{ color: "rgba(12,14,20,0.5)" }}
          >
            From role discovery to job offers. Everything included.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
              role="article"
              className="relative group transition-all duration-300"
            >
              {/* Card shadow layer */}
              <div
                className={cn(
                  "absolute inset-0 bg-white rounded-2xl",
                  "border-2 transition-all duration-300",
                  "shadow-[4px_4px_0px_0px]",
                  "group-hover:shadow-[8px_8px_0px_0px]",
                  "group-hover:-translate-x-1 group-hover:-translate-y-1",
                  plan.popular
                    ? "border-[#3C61A8] shadow-[#3C61A8]"
                    : "border-[#0C0E14] shadow-[#0C0E14]/20"
                )}
              />

              {/* Content */}
              <div className="relative p-5 sm:p-7">
                {/* Popular badge */}
                {plan.popular && (
                  <div
                    className="absolute -top-3 -right-3 text-xs font-semibold px-3 py-1 rounded-full border-2 z-10"
                    style={{ backgroundColor: YELLOW, color: DARK, borderColor: DARK }}
                  >
                    Most Popular!
                  </div>
                )}

                {/* Icon + name */}
                <div className="mb-6">
                  <div
                    className="w-12 h-12 rounded-full mb-4 flex items-center justify-center border-2"
                    style={{
                      borderColor: plan.popular ? BLUE : "rgba(12,14,20,0.2)",
                      color: plan.popular ? BLUE : "rgba(12,14,20,0.5)",
                    }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: DARK }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "rgba(12,14,20,0.5)" }}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold" style={{ color: DARK }}>
                    ${plan.price}
                  </span>
                  <span className="text-sm ml-1" style={{ color: "rgba(12,14,20,0.4)" }}>
                    one-time
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-7">
                  {plan.features.map((f) => (
                    <FeatureItem key={f} feature={f} isPopular={plan.popular} />
                  ))}
                </div>

                {/* CTA */}
                <Button
                  className={cn(
                    "w-full h-12 text-base font-semibold border-2 transition-all duration-300",
                    "shadow-[4px_4px_0px_0px] hover:shadow-[6px_6px_0px_0px]",
                    "hover:-translate-x-0.5 hover:-translate-y-0.5",
                    "outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                    plan.popular
                      ? "hover:brightness-105 active:brightness-100"
                      : "hover:brightness-95 active:brightness-100"
                  )}
                  style={
                    plan.popular
                      ? {
                          backgroundColor: BLUE,
                          color: "#fff",
                          borderColor: BLUE,
                          boxShadow: `4px 4px 0px 0px rgba(60,97,168,0.3)`,
                        }
                      : {
                          backgroundColor: "#fff",
                          color: DARK,
                          borderColor: DARK,
                          boxShadow: `4px 4px 0px 0px rgba(12,14,20,0.15)`,
                        }
                  }
                  onClick={() => { document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  Find My Best Role
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo strip + footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <LogoStrip />
          <p
            className="text-center text-sm mt-5 w-full"
            style={{ color: "rgba(12,14,20,0.3)" }}
          >
            Trusted by candidates now at Google, Amazon, Deloitte and more ✓
          </p>
        </motion.div>

      </div>
    </section>
  );
}
