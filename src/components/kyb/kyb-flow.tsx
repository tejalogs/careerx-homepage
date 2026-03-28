"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, GraduationCap, Briefcase, ArrowLeftRight,
  Search, ChevronDown, ArrowRight, ArrowLeft, Check,
  Sparkles, Zap, Globe, Rocket, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { BrandLogoMark } from "@/components/ui/brand-logo";

/* ─── palette ─────────────────────────────────────────────────── */
const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";
const TOTAL  = 3;

/* ─── step meta ───────────────────────────────────────────────── */
const STEPS = ["Your Profile", "Target Role", "Role Titles"];

/* ─── persona data ────────────────────────────────────────────── */
const STAGES = [
  {
    id: "student",
    Icon: BookOpen,
    title: "Student or Fresher",
    sub: "Still in college, or just graduated",
    benefit: "Map your strengths before the job search starts",
    color: "#4F46E5",
    accent: "#EEF2FF",
  },
  {
    id: "graduate",
    Icon: GraduationCap,
    title: "Recent Graduate",
    sub: "Looking for your first role",
    benefit: "Land your first role with targeted prep",
    color: "#7C3AED",
    accent: "#F5F3FF",
  },
  {
    id: "professional",
    Icon: Briefcase,
    title: "Working Professional",
    sub: "Currently employed, want to grow",
    benefit: "Unlock the next level in your career",
    color: "#047857",
    accent: "#ECFDF5",
  },
  {
    id: "switcher",
    Icon: ArrowLeftRight,
    title: "Career Switcher",
    sub: "Changing industries or functions",
    benefit: "Find exactly where your skills transfer",
    color: "#B45309",
    accent: "#FFFBEB",
  },
];

/* ─── form/static data ────────────────────────────────────────── */
const EXP = ["< 1 year", "1–3 years", "3–5 years", "5+ years"];
const COUNTRIES = ["India","United States","United Kingdom","Canada","Australia","Germany","Singapore","UAE","Other"];
const ROLE_TITLES = [
  "Junior Data Engineer","Big Data Engineer",
  "Data Platform Engineer","ETL Developer",
  "Data Warehouse Engineer","Analytics Engineer",
  "BI Engineer","Streaming Data Engineer",
  "Data Infrastructure Eng.","Data Integration Engineer",
];
const PROCESSING_MSGS = [
  "Scanning 12,000+ job titles...",
  "Matching your profile to market data...",
  "Building your skill map...",
  "Analyzing salary benchmarks...",
  "Curating your best-fit roles...",
  "Almost ready — finalizing your results...",
];

/* ─── types ───────────────────────────────────────────────────── */
type Form = {
  stage: string; role: string; experience: string;
  country: string; visa: string; notes: string; selectedRoles: string[];
};
const INIT: Form = { stage:"", role:"", experience:"", country:"", visa:"", notes:"", selectedRoles:[] };

/* ─── animation ───────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;
const pageVariants = {
  initial: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit:    (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
};
const pageTrans = { duration: 0.4, ease };

/* ═══════════════════════════════════════════════════════════════ */
export default function KYBFlow() {
  const [step, setStep]             = useState(1);
  const [dir, setDir]               = useState(1);
  const [form, setForm]             = useState<Form>(INIT);
  const [processing, setProcessing] = useState(false);

  const go = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };

  const canContinue =
    step === 1 ? !!form.stage :
    step === 2 ? !!form.role && !!form.country && !!form.visa :
    step === 3 ? form.selectedRoles.length > 0 : false;

  const onContinue = () => {
    if (step < TOTAL) go(step + 1);
    else setProcessing(true);
  };

  const toggleRole = (r: string) =>
    setForm(f => ({
      ...f,
      selectedRoles: f.selectedRoles.includes(r)
        ? f.selectedRoles.filter(x => x !== r)
        : f.selectedRoles.length < 10 ? [...f.selectedRoles, r] : f.selectedRoles,
    }));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8F9FD" }}>

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: "rgba(60,97,168,0.08)" }}>
        <motion.div className="h-full" style={{ background: `linear-gradient(90deg, ${BLUE}, #7B9FE8)` }}
          animate={{ width: processing ? "100%" : `${((step - 1) / TOTAL) * 100 + 10}%` }}
          transition={{ duration: 0.6, ease }} />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 h-14 flex items-center justify-between px-6 shrink-0"
        style={{ background: "rgba(248,249,253,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(12,14,20,0.06)" }}>
        <Link href="/kyb" className="flex items-center gap-2">
          <BrandLogoMark size={20} />
          <span className="text-[14px] font-bold" style={{ color: DARK }}>
            Career<span style={{ color: YELLOW }}>X</span>celerator
          </span>
        </Link>
        {!processing && (
          <div className="flex items-center gap-3">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const done = n < step;
              const active = n === step;
              return (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: done ? BLUE : active ? "rgba(60,97,168,0.12)" : "rgba(0,0,0,0)",
                      border: `1.5px solid ${done ? BLUE : active ? BLUE : "rgba(12,14,20,0.15)"}`,
                    }}>
                    {done
                      ? <Check size={10} strokeWidth={3} color="#fff" />
                      : <span className="text-[9px] font-bold" style={{ color: active ? BLUE : "rgba(12,14,20,0.3)" }}>{n}</span>
                    }
                  </div>
                  <span className="text-[11px] font-semibold hidden sm:block"
                    style={{ color: active ? DARK : "rgba(12,14,20,0.3)" }}>
                    {label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <ChevronRight size={11} style={{ color: "rgba(12,14,20,0.2)" }} className="hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={dir}>
            {processing ? (
              <ProcessingState key="proc" />
            ) : (
              <motion.div key={step} custom={dir} variants={pageVariants}
                initial="initial" animate="animate" exit="exit" transition={pageTrans}>

                {step === 1 && <Step1 form={form} setForm={setForm} />}
                {step === 2 && <Step2 form={form} setForm={setForm} />}
                {step === 3 && <Step3 form={form} toggleRole={toggleRole} />}

                {/* CTA row */}
                <div className={`flex items-center mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
                  {step > 1 && (
                    <motion.button onClick={() => go(step - 1)}
                      whileHover={{ x: -2 }} whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2.5 rounded-xl"
                      style={{ color: "rgba(12,14,20,0.45)", background: "rgba(12,14,20,0.05)" }}>
                      <ArrowLeft size={13} /> Back
                    </motion.button>
                  )}
                  <motion.button onClick={onContinue} disabled={!canContinue}
                    whileHover={canContinue ? { y: -2, boxShadow: "0 10px 32px rgba(245,209,52,0.55)" } : {}}
                    whileTap={canContinue ? { scale: 0.97 } : {}}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-200"
                    style={{
                      background:  canContinue ? YELLOW : "rgba(12,14,20,0.07)",
                      color:       canContinue ? DARK   : "rgba(12,14,20,0.22)",
                      boxShadow:   canContinue ? "0 4px 20px rgba(245,209,52,0.4)" : "none",
                      cursor:      canContinue ? "pointer" : "not-allowed",
                    }}>
                    {step === TOTAL ? "Analyze My Fit" : "Continue"}
                    <ArrowRight size={15} />
                  </motion.button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1 ──────────────────────────────────────────────────── */
function Step1({ form, setForm }: { form: Form; setForm: (f: Form) => void }) {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-black tracking-[0.2em] uppercase mb-3"
          style={{ color: "rgba(60,97,168,0.55)" }}>
          About you
        </p>
        <h1 className="text-[34px] font-black leading-[1.1] tracking-tight mb-3" style={{ color: DARK }}>
          What stage are<br />you at right now?
        </h1>
        <p className="text-[15px]" style={{ color: "rgba(12,14,20,0.45)", lineHeight: 1.6 }}>
          We'll shape your results around where you are today.
        </p>
      </div>

      <div className="space-y-2.5">
        {STAGES.map(({ id, Icon, title, sub, benefit, color, accent }) => {
          const sel = form.stage === id;
          return (
            <motion.button key={id}
              onClick={() => setForm({ ...form, stage: id })}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.99 }}
              animate={{
                background: sel ? accent : "#fff",
                boxShadow: sel
                  ? `0 0 0 2px ${color}, 0 4px 24px ${color}18`
                  : "0 1px 4px rgba(12,14,20,0.06), 0 0 0 1px rgba(12,14,20,0.07)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left cursor-pointer">

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                style={{ background: sel ? color : "rgba(12,14,20,0.05)" }}>
                <Icon size={20} style={{ color: sel ? "#fff" : "rgba(12,14,20,0.4)" }} strokeWidth={1.8} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[15px] font-bold" style={{ color: sel ? color : DARK }}>{title}</span>
                </div>
                <span className="text-[13px]" style={{ color: "rgba(12,14,20,0.45)" }}>{sub}</span>
              </div>

              {/* Benefit + check */}
              <div className="shrink-0 flex items-center gap-3">
                <AnimatePresence>
                  {sel && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}
                      className="text-[11px] font-semibold hidden sm:block"
                      style={{ color: color }}>
                      {benefit}
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.div
                  animate={{
                    background: sel ? color : "rgba(0,0,0,0)",
                    borderColor: sel ? color : "rgba(12,14,20,0.15)",
                    scale: sel ? 1 : 0.9,
                  }}
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                  {sel && <Check size={11} strokeWidth={3} color="#fff" />}
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 2 ──────────────────────────────────────────────────── */
function Step2({ form, setForm }: { form: Form; setForm: (f: Form) => void }) {
  return (
    <div className="space-y-7">
      <div className="mb-8">
        <p className="text-[11px] font-black tracking-[0.2em] uppercase mb-3"
          style={{ color: "rgba(60,97,168,0.55)" }}>
          Your target
        </p>
        <h1 className="text-[34px] font-black leading-[1.1] tracking-tight mb-3" style={{ color: DARK }}>
          What role are you<br />going after?
        </h1>
        <p className="text-[15px]" style={{ color: "rgba(12,14,20,0.45)", lineHeight: 1.6 }}>
          We'll pull real job market data for this exact role.
        </p>
      </div>

      {/* Role input */}
      <div>
        <FieldLabel text="Role you're targeting" required />
        <div className="relative mt-2">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "rgba(12,14,20,0.28)" }} />
          <input type="text" placeholder="e.g. Data Engineer, Product Manager..."
            value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-[14px] outline-none transition-all"
            style={{
              background: "#fff",
              border: "1.5px solid rgba(12,14,20,0.1)",
              color: DARK,
              boxShadow: "0 1px 4px rgba(12,14,20,0.05)",
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = BLUE;
              e.currentTarget.style.boxShadow = `0 0 0 4px rgba(60,97,168,0.1)`;
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = "rgba(12,14,20,0.1)";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(12,14,20,0.05)";
            }}
          />
        </div>
      </div>

      {/* Experience */}
      <div>
        <FieldLabel text="Years of experience" />
        <div className="flex flex-wrap gap-2 mt-2">
          {EXP.map(opt => {
            const sel = form.experience === opt;
            return (
              <motion.button key={opt} onClick={() => setForm({ ...form, experience: opt })}
                whileTap={{ scale: 0.95 }}
                animate={{
                  background: sel ? DARK : "#fff",
                  color: sel ? "#fff" : "rgba(12,14,20,0.55)",
                  boxShadow: sel ? "0 2px 8px rgba(12,14,20,0.2)" : "0 1px 4px rgba(12,14,20,0.06)",
                }}
                className="px-4 py-2.5 rounded-xl text-[13px] font-semibold border"
                style={{ borderColor: sel ? DARK : "rgba(12,14,20,0.1)" }}>
                {opt}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Country + Visa */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel text="Target country" required />
          <div className="relative mt-2">
            <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "rgba(12,14,20,0.28)" }} />
            <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
              className="w-full pl-10 pr-8 py-3.5 rounded-2xl text-[14px] outline-none appearance-none"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(12,14,20,0.1)",
                color: form.country ? DARK : "rgba(12,14,20,0.35)",
                boxShadow: "0 1px 4px rgba(12,14,20,0.05)",
              }}>
              <option value="" disabled>Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "rgba(12,14,20,0.28)" }} />
          </div>
        </div>
        <div>
          <FieldLabel text="Visa sponsorship?" required />
          <div className="flex gap-2 mt-2">
            {["Yes", "No"].map(opt => {
              const sel = form.visa === opt;
              return (
                <motion.button key={opt} onClick={() => setForm({ ...form, visa: opt })}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    background: sel ? DARK : "#fff",
                    boxShadow: sel ? "0 2px 8px rgba(12,14,20,0.2)" : "0 1px 4px rgba(12,14,20,0.06)",
                  }}
                  className="flex-1 py-3.5 rounded-2xl text-[13px] font-bold border transition-colors duration-150"
                  style={{
                    borderColor: sel ? DARK : "rgba(12,14,20,0.1)",
                    color: sel ? "#fff" : "rgba(12,14,20,0.45)",
                  }}>
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <FieldLabel text="Anything else?" hint="optional" />
        <textarea rows={2} placeholder="Specialisations, industries, location preferences..."
          value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
          className="w-full mt-2 px-4 py-3.5 rounded-2xl text-[14px] outline-none resize-none"
          style={{
            background: "#fff",
            border: "1.5px solid rgba(12,14,20,0.1)",
            color: DARK,
            boxShadow: "0 1px 4px rgba(12,14,20,0.05)",
          }}
          onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 4px rgba(60,97,168,0.1)`; }}
          onBlur={e => { e.currentTarget.style.borderColor = "rgba(12,14,20,0.1)"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(12,14,20,0.05)"; }}
        />
      </div>
    </div>
  );
}

/* ─── Step 3 ──────────────────────────────────────────────────── */
function Step3({ form, toggleRole }: { form: Form; toggleRole: (r: string) => void }) {
  const count = form.selectedRoles.length;
  const MAX  = 10;

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-black tracking-[0.2em] uppercase mb-3"
            style={{ color: "rgba(60,97,168,0.55)" }}>
            Role titles
          </p>
          <h1 className="text-[34px] font-black leading-[1.1] tracking-tight mb-3" style={{ color: DARK }}>
            Pick the titles<br />you want to explore
          </h1>
          <p className="text-[15px]" style={{ color: "rgba(12,14,20,0.45)", lineHeight: 1.6 }}>
            We'll map each against real job market data.
          </p>
        </div>

        {/* Credits pill */}
        <div className="shrink-0 mt-1">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
            style={{ background: "#fff", border: "1px solid rgba(12,14,20,0.08)", boxShadow: "0 1px 4px rgba(12,14,20,0.06)" }}>
            <div className="flex gap-0.5">
              {Array.from({ length: MAX }).map((_, i) => (
                <motion.div key={i}
                  animate={{ background: i < count ? YELLOW : "rgba(12,14,20,0.1)", scale: i === count - 1 ? [1, 1.4, 1] : 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-1.5 h-1.5 rounded-full" />
              ))}
            </div>
            <span className="text-[11px] font-bold" style={{ color: count >= 8 ? "#DC2626" : "rgba(12,14,20,0.5)" }}>
              {count}/{MAX}
            </span>
          </div>
        </div>
      </div>

      {/* Role group header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <Zap size={12} style={{ color: BLUE }} />
        <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: BLUE }}>
          {form.role || "Data Engineer"} — similar titles
        </span>
      </div>

      {/* Roles */}
      <div className="space-y-1.5">
        {ROLE_TITLES.map((role, i) => {
          const sel = form.selectedRoles.includes(role);
          return (
            <motion.button key={role} onClick={() => toggleRole(role)}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, ease }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left"
              style={{
                background: sel ? "#fff" : "rgba(0,0,0,0)",
                border: `1.5px solid ${sel ? BLUE : "rgba(0,0,0,0)"}`,
                boxShadow: sel ? `0 0 0 3px rgba(60,97,168,0.08), 0 2px 8px rgba(60,97,168,0.1)` : "none",
              }}>
              <motion.div
                animate={{ background: sel ? BLUE : "rgba(12,14,20,0.07)", borderColor: sel ? BLUE : "rgba(12,14,20,0.15)" }}
                className="w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center shrink-0 w-[18px] h-[18px]">
                <AnimatePresence>
                  {sel && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 600, damping: 25 }}>
                      <Check size={9} strokeWidth={3} color="#fff" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <span className="text-[14px] font-medium flex-1"
                style={{ color: sel ? DARK : "rgba(12,14,20,0.65)" }}>
                {role}
              </span>
              {sel && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-[11px] font-semibold shrink-0" style={{ color: BLUE }}>
                  Added
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end">
        <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-xl"
          style={{ border: `1.5px solid rgba(60,97,168,0.2)`, color: BLUE, background: "rgba(60,97,168,0.04)" }}>
          <Sparkles size={11} /> Show related titles
        </motion.button>
      </div>
    </div>
  );
}

/* ─── Processing state ────────────────────────────────────────── */
function ProcessingState() {
  const [msgIdx, setMsgIdx]     = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setMsgIdx(i => Math.min(i + 1, PROCESSING_MSGS.length - 1)), 2200);
    const t2 = setInterval(() => setProgress(p => Math.min(p + 2, 94)), 400);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }} className="text-center py-8">

      {/* Spinner */}
      <div className="flex justify-center mb-8">
        <div className="relative w-20 h-20">
          <motion.div className="absolute inset-0 rounded-full border-[2px]"
            style={{ borderColor: "rgba(60,97,168,0.12)", borderTopColor: BLUE }}
            animate={{ rotate: 360 }} transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute inset-2.5 rounded-full border-[2px]"
            style={{ borderColor: "rgba(245,209,52,0.18)", borderTopColor: YELLOW }}
            animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Rocket size={20} style={{ color: BLUE }} />
          </div>
        </div>
      </div>

      <h2 className="text-[28px] font-black tracking-tight mb-2" style={{ color: DARK }}>
        Analyzing your career fit
      </h2>

      <div className="h-7 flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          <motion.p key={msgIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}
            className="text-[15px]" style={{ color: "rgba(12,14,20,0.45)" }}>
            {PROCESSING_MSGS[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress */}
      <div className="w-full h-1 rounded-full overflow-hidden mb-2" style={{ background: "rgba(12,14,20,0.07)" }}>
        <motion.div className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${BLUE} 0%, #7B9FE8 60%, ${YELLOW} 100%)` }}
          animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
      </div>
      <p className="text-[12px] font-bold mb-10" style={{ color: BLUE }}>{progress}%</p>

      {/* Skeleton preview */}
      <div className="text-left mb-10">
        <p className="text-[10px] font-black uppercase tracking-widest mb-3"
          style={{ color: "rgba(12,14,20,0.2)" }}>
          Your results — loading
        </p>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <motion.div key={i} className="rounded-2xl p-4 flex gap-3 items-center"
              style={{ background: "#fff", border: "1px solid rgba(12,14,20,0.07)", boxShadow: "0 1px 4px rgba(12,14,20,0.05)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}>
              <div className="w-9 h-9 rounded-xl shrink-0" style={{ background: "rgba(12,14,20,0.07)" }} />
              <div className="flex-1 space-y-2">
                <div className="h-3 rounded-full w-3/5" style={{ background: "rgba(12,14,20,0.08)" }} />
                <div className="h-2.5 rounded-full w-2/5" style={{ background: "rgba(12,14,20,0.05)" }} />
              </div>
              <div className="h-3 rounded-full w-12" style={{ background: "rgba(12,14,20,0.06)" }} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="inline-block">
        <Link href="#"
          className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl text-[15px] font-bold"
          style={{ background: YELLOW, color: DARK, boxShadow: "0 4px 24px rgba(245,209,52,0.45)" }}>
          Go to Dashboard <ArrowRight size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ─── Field label ─────────────────────────────────────────────── */
function FieldLabel({ text, required, hint }: { text: string; required?: boolean; hint?: string }) {
  return (
    <label className="text-[12px] font-semibold flex items-center gap-1"
      style={{ color: "rgba(12,14,20,0.45)" }}>
      {text}
      {required && <span style={{ color: "#DC2626" }}>*</span>}
      {hint && <span className="font-normal" style={{ color: "rgba(12,14,20,0.28)" }}>({hint})</span>}
    </label>
  );
}
