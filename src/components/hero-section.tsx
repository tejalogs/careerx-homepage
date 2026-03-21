"use client";

import { motion } from "framer-motion";
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden" id="hero">
      {/* The full-screen morph animation */}
      <div className="absolute inset-0 z-0">
        <IntroAnimation />
      </div>

      {/* Overlay content — shown after morph completes, positioned at bottom */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-4 pointer-events-none">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-widest uppercase"
          style={{ borderColor: "#4267B2", color: "#4267B2", backgroundColor: "#EEF2FF" }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#4267B2" }} />
          CareerXcelerator · Powered by AI
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <a
            href="#get-started"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: "#4267B2" }}
          >
            Find My Best Role <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border-2 bg-white hover:bg-gray-50 transition-all duration-200"
            style={{ borderColor: "#4267B2", color: "#4267B2" }}
          >
            <Play className="w-4 h-4 fill-current" />
            How It Works
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 1 }}
          className="text-xs text-gray-400 tracking-widest uppercase"
        >
          Scroll to explore
        </motion.p>
      </div>
    </section>
  );
}
