"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const throttle = (fn: Function, ms: number) => {
  let timer: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timer) return;
    timer = setTimeout(() => { timer = null; }, ms);
    fn(...args);
  };
};
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { ScrollImageCards } from "@/components/ui/scroll-image-cards";
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import { ReadinessChart } from "@/components/sections/candidate-outcomes";
import { MissionVisionSection } from "@/components/sections/mission-vision";
import { ServicesSection } from "@/components/sections/services";
import { ProblemSection } from "@/components/sections/problem-section";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { InstitutionDetailSection } from "@/components/sections/institution-detail";
import PricingSection from "@/components/sections/pricing";
import { FAQSection } from "@/components/sections/faq";
import GetStartedSection from "@/components/sections/get-started";
import Footer from "@/components/sections/footer";

// ─── Wave Divider ─────────────────────────────────────────────────────────────
function Wave({ from, to, shape = "a" }: { from: string; to: string; shape?: "a" | "b" | "c" }) {
  const paths = {
    a: "M0,0 C360,80 1080,0 1440,60 L1440,0 L0,0 Z",
    b: "M0,40 C360,0 1080,80 1440,20 L1440,0 L0,0 Z",
    c: "M0,0 C480,70 960,10 1440,50 L1440,0 L0,0 Z",
  };
  return (
    <div style={{ backgroundColor: to, lineHeight: 0, display: "block" }}>
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 64 }}
      >
        <path d={paths[shape]} fill={from} />
      </svg>
    </div>
  );
}

// ─── Product Video Section Content ────────────────────────────────────────────


function VideoSectionContent() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <div className="-mx-4 sm:-mx-8 md:-mx-16 -my-10 lg:-my-20 px-4 sm:px-8 md:px-16 py-10 sm:py-16 md:py-20 bg-white overflow-x-clip">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

        {/* Left: Scroll-triggered image cards */}
        <div className="flex justify-center md:justify-start">
          <ScrollImageCards />
        </div>

        {/* Right: Copy + CTA — centered, bigger to balance the card column */}
        <motion.div
          ref={statsRef}
          className="md:sticky md:top-24 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-black/50 mb-5">How It Works</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6">
            Everything to{" "}
            <span
              className="relative inline-block px-2"
              style={{
                backgroundColor: "#F5D134",
                borderRadius: "4px",
                transform: "rotate(-0.5deg)",
                display: "inline-block",
              }}
            >
              Land the Job
            </span>
          </h2>
          <p className="text-[14px] sm:text-[16px] text-black/60 leading-relaxed mb-8 max-w-xs">
            From role discovery to interview prep to job offers — a structured, AI-powered path to your next career move.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold text-white transition-all hover:opacity-85 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            style={{ backgroundColor: "#3C61A8" }}
          >
            Find My Best Role
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Social proof strip */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex -space-x-2.5">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&q=80",
              ].map((src, i) => (
                <Image key={i} src={src} alt={`Candidate ${i + 1}`} width={32} height={32} className="w-8 h-8 rounded-full object-cover border-2 border-white" />
              ))}
              <div className="w-8 h-8 rounded-full bg-[#0C0E14] border-2 border-white flex items-center justify-center">
                <span className="text-[9px] font-black text-white">+2k</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-[12px] font-bold text-black/70 leading-tight">2,000+ careers accelerated</p>
              <p className="text-[11px] text-black/60 leading-tight">across 500+ hiring partners</p>
            </div>
          </div>

          {/* Stats 2×2 */}
          <div className="mt-10 w-full grid grid-cols-2 gap-3">
            {[
              { value: "11", unit: " Days", label: "Avg Time to Interview" },
              { value: "72", unit: "%",     label: "Faster Offer" },
              { value: "+62", unit: "%",   label: "Median Salary Increase" },
              { value: "98", unit: "%",    label: "Role Match Accuracy" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl px-3 py-3 sm:px-5 sm:py-4 text-center"
                style={{
                  backgroundColor: "#F7F8FC",
                  border: "1px solid rgba(60,97,168,0.08)",
                }}
              >
                <p className="text-xl sm:text-2xl font-black tracking-tight leading-none" style={{ color: "#3C61A8" }}>
                  {s.value}<span className="text-lg">{s.unit}</span>
                </p>
                <p className="text-[11px] font-semibold mt-1.5" style={{ color: "rgba(12,14,20,0.45)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Readiness chart */}
          <div className="mt-4 w-full rounded-2xl overflow-hidden" style={{ backgroundColor: "#3C61A8" }}>
            <ReadinessChart inView={statsInView} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const HERO_MAX_SCROLL = 3000;
const OVER_SCROLL_THRESHOLD = 300;

export default function Home() {
  const [activeSection, setActiveSection] = useState<"hero" | "video">("hero");
  const [videoExpanded, setVideoExpanded] = useState(false);

  const heroScrollRef = useRef(0);
  const overScrollRef = useRef(0);
  const transitioningRef = useRef(false);

  const goToVideo = () => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setActiveSection("video");
    window.scrollTo(0, 0);
  };

  const goToHero = () => {
    setActiveSection("hero");
    setVideoExpanded(false);
    heroScrollRef.current = 0;
    overScrollRef.current = 0;
    transitioningRef.current = false;
    window.scrollTo(0, 0);
  };

  // ── Over-scroll detection on hero ─────────────────────────────────────────
  useEffect(() => {
    if (activeSection !== "hero") return;

    const handleWheel = throttle((e: WheelEvent) => {
      if (transitioningRef.current) return;
      // Normalize: Windows mice emit deltaY ~100-300 per notch; cap to 40 so threshold behaves consistently
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 40);

      const newHeroScroll = Math.min(
        Math.max(heroScrollRef.current + delta, 0),
        HERO_MAX_SCROLL
      );

      if (heroScrollRef.current >= HERO_MAX_SCROLL && e.deltaY > 0) {
        const newOver = overScrollRef.current + delta;
        overScrollRef.current = newOver;
        if (newOver >= OVER_SCROLL_THRESHOLD) goToVideo();
      } else {
        overScrollRef.current = 0;
      }

      heroScrollRef.current = newHeroScroll;
    }, 16);

    let lastTouchY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };
    const handleTouchMove = throttle((e: TouchEvent) => {
      if (transitioningRef.current) return;
      const delta = lastTouchY - e.touches[0].clientY;
      lastTouchY = e.touches[0].clientY;
      const newHeroScroll = Math.min(
        Math.max(heroScrollRef.current + delta, 0),
        HERO_MAX_SCROLL
      );
      if (heroScrollRef.current >= HERO_MAX_SCROLL && delta > 0) {
        const newOver = overScrollRef.current + delta;
        overScrollRef.current = newOver;
        if (newOver >= OVER_SCROLL_THRESHOLD) goToVideo();
      } else {
        overScrollRef.current = 0;
      }
      heroScrollRef.current = newHeroScroll;
    }, 16);

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeSection]);

  return (
    <main className="overflow-hidden">
      {/* Navbar: always visible */}
      <Navbar
        section={activeSection}
        onBack={activeSection === "video" ? goToHero : undefined}
      />

      <AnimatePresence mode="wait">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        {activeSection === "hero" && (
          <motion.div
            key="hero"
            className="relative w-full h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
          >
            <IntroAnimation onAutoAdvance={goToVideo} />
          </motion.div>
        )}

        {/* ── Video + Below Fold ────────────────────────────────────────────── */}
        {activeSection === "video" && (
          <motion.div
            key="video"
            className="relative w-full min-h-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          >
            <ScrollExpandMedia
              mediaType="video"
              mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1"
              posterSrc="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1280&q=80"
              title="See How It Works"
              date="Platform Tour"
              scrollToExpand="Scroll to expand"
              textBlend={false}
              onExpanded={() => setVideoExpanded(true)}
              onScrolledBack={goToHero}
            >
              <VideoSectionContent />
            </ScrollExpandMedia>

            {/* Below-fold sections — visible after video fully expands */}
            {videoExpanded && (
              <>
                {/* Problem → Solution narrative */}
                <Wave from="#fff" to="#F7F8FC" shape="a" />
                <ProblemSection />
                <HowItWorksSection />

                {/* Products deep dive */}
                <Wave from="#F7F8FC" to="#3C61A8" shape="b" />
                <ServicesSection />
                <Wave from="#3C61A8" to="#F7F8FC" shape="c" />

                {/* B2B — Institutional detail */}
                <InstitutionDetailSection />

                {/* Trust + Pricing */}
                <MissionVisionSection />
                <PricingSection />

                {/* Final CTA — combined for individuals + institutions */}
                <Wave from="#F7F8FC" to="#3C61A8" shape="b" />
                <GetStartedSection />
                <Wave from="#3C61A8" to="#F7F8FC" shape="c" />
                <FAQSection />
                <Wave from="#F7F8FC" to="#3C61A8" shape="a" />
                <Footer />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
