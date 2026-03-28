"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, GraduationCap, Briefcase, ArrowLeftRight,
  Search, ChevronDown, ArrowRight, ArrowLeft, Check, Sparkles,
} from "lucide-react";
import Link from "next/link";
import { BrandLogoMark } from "@/components/ui/brand-logo";

/* ─── palette ─────────────────────────────────────────────────── */
const BLUE  = "#3C61A8";
const YELLOW = "#F5D134";
const DARK  = "#0C0E14";
const MUTED = "rgba(12,14,20,0.45)";

const TOTAL = 3;

/* ─── data ────────────────────────────────────────────────────── */
const STAGES = [
  { id: "student",      Icon: BookOpen,        title: "Student / Fresher",       sub: "Currently studying" },
  { id: "graduate",     Icon: GraduationCap,   title: "Recent Graduate",         sub: "Preparing for first job" },
  { id: "professional", Icon: Briefcase,        title: "Working Professional",    sub: "Looking to advance" },
  { id: "switcher",     Icon: ArrowLeftRight,   title: "Career Switcher",         sub: "Transitioning to a new field" },
];

const EXP = ["0–1", "1–3", "3–5", "5+", "Other"];

const COUNTRIES = ["India","United States","United Kingdom","Canada","Australia","Germany","Singapore","UAE","Other"];

const ROLE_TITLES = [
  "Junior Data Engineer",      "Big Data Engineer",
  "Data Platform Engineer",    "ETL Developer",
  "Data Warehouse Engineer",   "Analytics Engineer",
  "BI Engineer",               "Streaming Data Engineer",
  "Data Infrastructure Eng.",  "Data Integration Engineer",
];

/* ─── types ───────────────────────────────────────────────────── */
type Form = {
  stage: string; role: string; experience: string;
  country: string; visa: string; notes: string;
  selectedRoles: string[];
};

const INIT: Form = { stage:"", role:"", experience:"", country:"", visa:"", notes:"", selectedRoles:[] };

/* ─── animation ───────────────────────────────────────────────── */
const variants = {
  initial: (d: number) => ({ x: d > 0 ? 48 : -48, opacity: 0, filter: "blur(6px)" }),
  animate: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit:    (d: number) => ({ x: d > 0 ? -48 : 48, opacity: 0, filter: "blur(6px)" }),
};
const trans = { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };

/* ═══════════════════════════════════════════════════════════════ */
export default function KYBFlow() {
  const [step, setStep]           = useState(1);
  const [dir, setDir]             = useState(1);
  const [form, setForm]           = useState<Form>(INIT);
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
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg,#F7F8FC 0%,#EEF2FF 100%)" }}>

      {/* Page-wide grid */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(rgba(60,97,168,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(60,97,168,0.04) 1px,transparent 1px)`,
        backgroundSize: "64px 64px",
      }} />

      {/* Navbar */}
      <nav className="relative z-10 h-16 flex items-center justify-between px-6 border-b"
        style={{ background:"rgba(255,255,255,0.88)", backdropFilter:"blur(14px)", borderColor:"rgba(0,0,0,0.06)" }}>
        <Link href="/kyb" className="flex items-center gap-2">
          <BrandLogoMark size={22} />
          <span className="text-[15px] font-bold" style={{ color: DARK }}>
            Career<span style={{ color: BLUE }}>X</span>celerator
          </span>
        </Link>
        {!processing && (
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-medium hidden sm:block" style={{ color: MUTED }}>
              Step {step} of {TOTAL}
            </span>
            <div className="w-28 h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(60,97,168,0.1)" }}>
              <motion.div className="h-full rounded-full" style={{ background: BLUE }}
                animate={{ width:`${(step/TOTAL)*100}%` }} transition={trans} />
            </div>
          </div>
        )}
      </nav>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={dir}>
            {processing ? (
              <ProcessingState key="done" />
            ) : (
              <motion.div key={step} custom={dir} variants={variants}
                initial="initial" animate="animate" exit="exit" transition={trans}
                className="rounded-3xl overflow-hidden"
                style={{ background:"#fff", boxShadow:"0 8px 48px rgba(12,14,20,0.09),0 1px 4px rgba(12,14,20,0.04)" }}>

                {/* Card header */}
                <div className="px-7 sm:px-10 pt-8 pb-5 border-b" style={{ borderColor:"rgba(0,0,0,0.06)" }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-[20px] sm:text-[22px] font-bold" style={{ color: DARK }}>
                        Know Yourself Better
                      </h1>
                      <p className="text-[13px] mt-1 leading-relaxed max-w-md" style={{ color: MUTED }}>
                        Gain clarity on your strengths and preferences to access opportunities tailored to you.
                      </p>
                    </div>
                    <span className="shrink-0 text-[13px] font-semibold mt-0.5 px-3 py-1 rounded-full"
                      style={{ background:"rgba(60,97,168,0.08)", color: BLUE }}>
                      Step {step}/{TOTAL}
                    </span>
                  </div>
                </div>

                {/* Step body */}
                <div className="px-7 sm:px-10 py-8">
                  {step === 1 && <Step1 form={form} setForm={setForm} />}
                  {step === 2 && <Step2 form={form} setForm={setForm} />}
                  {step === 3 && <Step3 form={form} toggleRole={toggleRole} />}
                </div>

                {/* Footer nav */}
                <div className="px-7 sm:px-10 pb-8 flex items-center justify-between">
                  {step > 1 ? (
                    <button onClick={() => go(step - 1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all hover:opacity-70"
                      style={{ background:"rgba(60,97,168,0.07)", color: BLUE }}>
                      <ArrowLeft size={14} /> Back
                    </button>
                  ) : <div />}

                  <motion.button onClick={onContinue} disabled={!canContinue}
                    whileHover={canContinue ? { y:-2 } : {}}
                    whileTap={canContinue ? { scale:0.97 } : {}}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[15px] font-semibold transition-colors duration-200"
                    style={{
                      background: canContinue ? YELLOW : "rgba(0,0,0,0.06)",
                      color:      canContinue ? DARK   : "rgba(0,0,0,0.3)",
                      boxShadow:  canContinue ? "0 4px 16px rgba(245,209,52,0.4)" : "none",
                      cursor:     canContinue ? "pointer" : "not-allowed",
                    }}>
                    {step === TOTAL ? "Submit" : "Continue"} <ArrowRight size={14} />
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
      <h2 className="text-[17px] font-bold text-center mb-6" style={{ color: DARK }}>
        What describes you best?
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {STAGES.map(({ id, Icon, title, sub }) => {
          const sel = form.stage === id;
          return (
            <button key={id} onClick={() => setForm({ ...form, stage: id })}
              className="relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{
                borderColor: sel ? BLUE : "rgba(0,0,0,0.08)",
                background:  sel ? "rgba(60,97,168,0.04)" : "#fff",
              }}>
              {sel && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: BLUE }}>
                  <Check size={10} strokeWidth={3} color="#fff" />
                </div>
              )}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3"
                style={{ background: sel ? "rgba(60,97,168,0.1)" : "rgba(60,97,168,0.06)" }}>
                <Icon size={24} style={{ color: BLUE }} strokeWidth={1.5} />
              </div>
              <span className="text-[13px] sm:text-[14px] font-bold leading-snug" style={{ color: DARK }}>{title}</span>
              <span className="text-[11px] sm:text-[12px] mt-1" style={{ color: MUTED }}>{sub}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 2 ──────────────────────────────────────────────────── */
function Step2({ form, setForm }: { form: Form; setForm: (f: Form) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="text-[17px] font-bold text-center" style={{ color: DARK }}>
        Choose your role &amp; target market
      </h2>

      {/* Role */}
      <Field label="Role" required>
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: MUTED }} />
          <input type="text" placeholder="Select your interested area / domain"
            value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-[14px] outline-none transition-all"
            style={{ border:"1.5px solid rgba(0,0,0,0.1)", background:"#FAFAFA", color: DARK }} />
        </div>
      </Field>

      {/* Experience */}
      <Field label="Experience (Years)">
        <div className="flex flex-wrap gap-2">
          {EXP.map(opt => {
            const sel = form.experience === opt;
            return (
              <button key={opt} onClick={() => setForm({ ...form, experience: opt })}
                className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-150"
                style={{
                  background:  sel ? BLUE : "rgba(60,97,168,0.06)",
                  color:       sel ? "#fff" : BLUE,
                  border:      `1.5px solid ${sel ? BLUE : "rgba(60,97,168,0.18)"}`,
                }}>
                {opt}
              </button>
            );
          })}
        </div>
      </Field>

      {/* Country */}
      <Field label="Preferred Country" required>
        <div className="relative">
          <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-[14px] outline-none appearance-none transition-all"
            style={{
              border:"1.5px solid rgba(0,0,0,0.1)", background:"#FAFAFA",
              color: form.country ? DARK : "rgba(12,14,20,0.35)",
            }}>
            <option value="" disabled>Select your interested country</option>
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: MUTED }} />
        </div>
      </Field>

      {/* Visa */}
      <Field label="Do you require visa sponsorship?" required>
        <div className="flex gap-5">
          {["Yes","No"].map(opt => {
            const sel = form.visa === opt;
            return (
              <label key={opt} className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => setForm({ ...form, visa: opt })}>
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                  style={{ borderColor: sel ? BLUE : "rgba(0,0,0,0.2)", background: sel ? BLUE : "transparent" }}>
                  {sel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-[14px]" style={{ color: DARK }}>{opt}</span>
              </label>
            );
          })}
        </div>
      </Field>

      {/* Notes */}
      <Field label="Additional Information" hint="Optional">
        <textarea rows={3} placeholder="Add any extra info to help us customize your role titles..."
          value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
          className="w-full px-4 py-3 rounded-xl text-[14px] outline-none resize-none transition-all"
          style={{ border:"1.5px solid rgba(0,0,0,0.1)", background:"#FAFAFA", color: DARK }} />
      </Field>
    </div>
  );
}

/* ─── Step 3 ──────────────────────────────────────────────────── */
function Step3({ form, toggleRole }: { form: Form; toggleRole: (r: string) => void }) {
  const count = form.selectedRoles.length;
  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="text-[17px] font-bold" style={{ color: DARK }}>Choose the roles you want to explore</h2>
          <p className="text-[12px] mt-1" style={{ color: MUTED }}>
            Don't see what you're looking for? Click "Get Better Titles"
          </p>
        </div>
        <div className="shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase"
          style={{ background: YELLOW, color: DARK }}>
          Credits Left: +{10 - count}
        </div>
      </div>

      <div className="rounded-2xl p-5" style={{ border:"1.5px solid rgba(0,0,0,0.07)", background:"#FAFAFA" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[15px] font-bold" style={{ color: BLUE }}>
            {form.role || "Data Engineer"}
          </span>
          <span className="text-[12px] font-semibold px-3 py-1 rounded-full"
            style={{ background:"rgba(60,97,168,0.08)", color: BLUE }}>
            Selected: {count}/10
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ROLE_TITLES.map(role => {
            const sel = form.selectedRoles.includes(role);
            return (
              <button key={role} onClick={() => toggleRole(role)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 hover:shadow-sm"
                style={{
                  border:     `1.5px solid ${sel ? BLUE : "rgba(0,0,0,0.08)"}`,
                  background: sel ? "rgba(60,97,168,0.05)" : "#fff",
                }}>
                <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all"
                  style={{ border:`2px solid ${sel ? BLUE:"rgba(0,0,0,0.2)"}`, background: sel ? BLUE:"transparent" }}>
                  {sel && <Check size={9} strokeWidth={3} color="#fff" />}
                </div>
                <span className="text-[13px] font-medium leading-snug"
                  style={{ color: sel ? BLUE : DARK }}>{role}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end mt-4">
          <button className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-80"
            style={{ border:`1.5px solid ${BLUE}`, color: BLUE, background:"rgba(60,97,168,0.04)" }}>
            <Sparkles size={12} />
            Get Better Titles
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Processing state ────────────────────────────────────────── */
function ProcessingState() {
  return (
    <motion.div key="processing" initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
      transition={trans}
      className="rounded-3xl text-center py-16 px-8"
      style={{ background:"#fff", boxShadow:"0 8px 48px rgba(12,14,20,0.09),0 1px 4px rgba(12,14,20,0.04)" }}>

      {/* Spinner */}
      <div className="flex justify-center mb-8">
        <div className="relative w-20 h-20">
          <motion.div className="absolute inset-0 rounded-full border-4 border-t-transparent"
            style={{ borderColor:`rgba(60,97,168,0.15)`, borderTopColor: BLUE }}
            animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease:"linear" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <BrandLogoMark size={28} />
          </div>
        </div>
      </div>

      <h2 className="text-[22px] sm:text-[24px] font-bold mb-2" style={{ color: DARK }}>
        Finding job listings for you
      </h2>
      <p className="text-[14px] mb-2" style={{ color: MUTED }}>
        Analyzing real market data to match your profile.
      </p>
      <p className="text-[13px] mb-8 font-medium" style={{ color: MUTED }}>
        This may take 30–60 minutes. Explore the dashboard meanwhile.
      </p>

      <motion.div whileHover={{ y:-2 }} whileTap={{ scale:0.97 }}>
        <Link href="#"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-semibold"
          style={{ background: YELLOW, color: DARK, boxShadow:"0 4px 18px rgba(245,209,52,0.4)" }}>
          Go to the Dashboard <ArrowRight size={15} />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ─── Field wrapper ───────────────────────────────────────────── */
function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[13px] font-semibold mb-2 flex items-center gap-1" style={{ color: DARK }}>
        {label}
        {required && <span style={{ color:"#e53e3e" }}>*</span>}
        {hint && <span className="font-normal" style={{ color: MUTED }}>({hint})</span>}
      </label>
      {children}
    </div>
  );
}
