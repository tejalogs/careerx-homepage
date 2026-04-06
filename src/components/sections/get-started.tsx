"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TRUST_POINTS = [
  "No commitment. Start with a free role discovery",
  "10 minute assessment · 2,000+ careers accelerated",
  "Structured path from clarity to real opportunities",
];

export default function GetStartedSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulate async submit — replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="get-started"
      ref={ref}
      className="w-full py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden"
      style={{ backgroundColor: "#3C61A8" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <p className="text-[11px] font-black tracking-[0.25em] uppercase text-white">
            Start with CareerXcelerator
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6"
        >
          Find your fit. Build your edge.{" "}
          <span
            className="relative inline-block px-2"
            style={{
              backgroundColor: "#F5D134",
              color: "#0C0E14",
              borderRadius: "6px",
              transform: "rotate(-0.8deg)",
              display: "inline-block",
            }}
          >
            Get there.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 md:mb-12 px-4 sm:px-2"
        >
          Begin with Know Yourself Better. In 10 minutes, see which roles match your strengths, identify your skill gaps, and get a structured path forward.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-14"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
              <p className="text-xl font-black text-white">You&apos;re on the list!</p>
              <p className="text-sm text-white/60">We&apos;ll be in touch within 24 hours to get you started.</p>
              <button
                onClick={() => { setSubmitted(false); setEmail(""); }}
                className="text-xs text-white/40 hover:text-white/70 transition-colors mt-1 underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
              >
                Submit a different email
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto w-full px-4 sm:px-0">
              <label htmlFor="get-started-email" className="sr-only">Email address</label>
              <input
                id="get-started-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="flex-1 px-5 py-4 rounded-full text-base font-medium bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-black overflow-hidden transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-2xl disabled:opacity-70 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                style={{ backgroundColor: "#F5D134", color: "#0C0E14" }}
              >
                <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                <span className="relative z-10 whitespace-nowrap">{loading ? "Sending…" : "Find My Best Role"}</span>
                {!loading && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          )}
          <p className="text-center text-xs text-white/30 mt-3">No spam · Unsubscribe anytime · Free to start</p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8"
        >
          {TRUST_POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-sm text-white/65 font-medium">{point}</span>
            </li>
          ))}
        </motion.ul>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="h-px mx-auto max-w-xs mt-14 mb-10"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        />

        {/* Institution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-[13px] text-white/50 font-medium">
            Representing a university or institution?
          </p>
          <a
            href="#institutions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-bold border-2 transition-all hover:-translate-y-0.5 active:translate-y-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff", backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            Institutional Deployment
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
