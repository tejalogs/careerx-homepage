"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronLeft } from "lucide-react";
import { BrandLogoMark } from "@/components/ui/brand-logo";

const NAV_LINKS = [
  { label: "Know Yourself Better", href: "#audience" },
  { label: "The Difference",       href: "#services" },
  { label: "CareerX For",          href: "#audience" },
  { label: "Pricing",              href: "#pricing"  },
];

interface NavbarProps {
  section?: "hero" | "video";
  onBack?: () => void;
}

export default function Navbar({ section = "hero", onBack }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [section]);

  return (
    <>
      {/* ── Desktop: floating pill ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 inset-x-0 z-50 hidden md:flex justify-center pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center h-[46px] px-2 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]"
              : "bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.7)]"
          }`}
        >
          {/* Back button */}
          <AnimatePresence>
            {section === "video" && onBack && (
              <motion.button
                key="back"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onBack}
                className="flex items-center gap-0.5 pl-2 pr-3 text-[13px] font-medium text-[#3C61A8] hover:opacity-60 transition-opacity overflow-hidden whitespace-nowrap"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                Back
              </motion.button>
            )}
          </AnimatePresence>

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
            <BrandLogoMark size={22} color="#F5D134" />
            <span className="text-[13px] font-semibold text-gray-900 tracking-tight whitespace-nowrap">
              Career<span style={{ color: "#3C61A8" }}>X</span>celerator
            </span>
          </a>

          {/* Divider */}
          <div className="w-px h-4 bg-black/10 mx-1 shrink-0" />

          {/* Links */}
          <nav className="flex items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-900 rounded-full hover:bg-white/40 transition-all duration-150 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-px h-4 bg-black/10 mx-1 shrink-0" />

          {/* Login */}
          <a
            href="#"
            className="px-3.5 py-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-900 rounded-full hover:bg-white/40 transition-all duration-150 whitespace-nowrap"
          >
            Login →
          </a>

          {/* CTA */}
          <a
            href="#get-started"
            className="ml-1 inline-flex items-center h-[32px] px-5 rounded-full text-[13px] font-semibold text-white transition-all hover:opacity-85 active:scale-95"
            style={{ backgroundColor: "#3C61A8" }}
          >
            Get Started
          </a>
        </div>
      </motion.div>

      {/* ── Mobile: floating pill ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-4 right-4 z-50 md:hidden"
      >
        {/* Pill bar */}
        <div
          className={`flex items-center justify-between h-[46px] px-4 rounded-full transition-all duration-500 ${
            scrolled || mobileOpen
              ? "bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]"
              : "bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.7)]"
          }`}
        >
          <a href="/" className="flex items-center gap-2">
            <BrandLogoMark size={22} color="#F5D134" />
            <span className="text-[13px] font-semibold text-gray-900 tracking-tight">
              Career<span style={{ color: "#3C61A8" }}>X</span>celerator
            </span>
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-[17px] h-[17px] text-gray-700" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-[17px] h-[17px] text-gray-700" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Dropdown — detached card below pill */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_16px_40px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]"
            >
              <div className="px-4 pt-2 pb-4 flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3.5 text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors ${
                      i < NAV_LINKS.length - 1 ? "border-b border-black/[0.06]" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#" className="py-3.5 text-[15px] font-medium text-gray-500 border-t border-black/[0.06]">
                  Login →
                </a>
                <a
                  href="#get-started"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block w-full text-center py-3 rounded-full text-[15px] font-semibold text-white"
                  style={{ backgroundColor: "#3C61A8" }}
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
