"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { BrandLogoMark } from "@/components/ui/brand-logo";

const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

const NAV_LINKS = [
  { label: "How It Works",      href: "#how-it-works" },
  { label: "Products",          href: "#services"     },
  { label: "Pricing",           href: "#pricing"      },
  { label: "For Institutions",  href: "#institutions" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      {/* ── Desktop: Apple-style glass navbar ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 inset-x-0 z-50 hidden md:flex justify-center pointer-events-none"
      >
        <div
          className="pointer-events-auto flex items-center h-[44px] px-1.5 rounded-[22px] transition-all duration-700"
          style={{
            background: scrolled
              ? "rgba(255, 255, 255, 0.72)"
              : "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: scrolled
              ? "1px solid rgba(0, 0, 0, 0.08)"
              : "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: scrolled
              ? "0 4px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04), inset 0 0.5px 0 rgba(255, 255, 255, 0.6)"
              : "0 2px 20px rgba(0, 0, 0, 0.04), inset 0 0.5px 0 rgba(255, 255, 255, 0.8)",
          }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-black/[0.03] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            <BrandLogoMark size={18} color={YELLOW} />
            <span className="text-[13px] font-semibold tracking-tight whitespace-nowrap" style={{ color: DARK }}>
              Career<span style={{ color: BLUE }}>X</span>
            </span>
          </a>

          {/* Separator dot */}
          <div className="w-[3px] h-[3px] rounded-full bg-black/10 mx-1 shrink-0" />

          {/* Links */}
          <nav className="flex items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 py-1 text-[12.5px] font-medium rounded-full hover:bg-black/[0.04] transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                style={{ color: "rgba(0,0,0,0.7)" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "rgba(0,0,0,0.85)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(0,0,0,0.7)"; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Separator dot */}
          <div className="w-[3px] h-[3px] rounded-full bg-black/10 mx-1 shrink-0" />

          {/* Login */}
          <a
            href="#"
            className="px-2.5 py-1 text-[12.5px] font-medium rounded-full hover:bg-black/[0.04] transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            style={{ color: "rgba(0,0,0,0.7)" }}
          >
            Login
          </a>

          {/* CTA pill */}
          <a
            href="/kyb"
            className="ml-1 inline-flex items-center gap-1 h-[32px] px-4 rounded-full text-[12.5px] font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-[1px] active:scale-[0.97] whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            style={{
              background: `linear-gradient(135deg, ${DARK} 0%, #1a1e2e 100%)`,
              color: "#fff",
              boxShadow: "0 2px 8px rgba(12, 14, 20, 0.2)",
            }}
          >
            Find My Best Role
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </motion.div>

      {/* ── Mobile: Apple-style glass navbar ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 left-3 right-3 z-50 md:hidden"
      >
        {/* Pill bar */}
        <div
          className="flex items-center justify-between h-[44px] px-3 rounded-[22px] transition-all duration-700"
          style={{
            background: scrolled || mobileOpen
              ? "rgba(255, 255, 255, 0.78)"
              : "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: scrolled || mobileOpen
              ? "1px solid rgba(0, 0, 0, 0.08)"
              : "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: scrolled || mobileOpen
              ? "0 4px 30px rgba(0, 0, 0, 0.08), inset 0 0.5px 0 rgba(255, 255, 255, 0.6)"
              : "0 2px 20px rgba(0, 0, 0, 0.04), inset 0 0.5px 0 rgba(255, 255, 255, 0.8)",
          }}
        >
          <a href="/" className="flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full">
            <BrandLogoMark size={18} color={YELLOW} />
            <span className="text-[13px] font-semibold tracking-tight" style={{ color: DARK }}>
              Career<span style={{ color: BLUE }}>X</span>
            </span>
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/[0.04] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                  <X className="w-4 h-4 text-gray-600" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-4 h-4 text-gray-600" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Dropdown — glass card */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-1.5 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.82)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1), inset 0 0.5px 0 rgba(255, 255, 255, 0.7)",
              }}
            >
              <div className="px-3 pt-1 pb-3 flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 text-[14px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded ${
                      i < NAV_LINKS.length - 1 ? "border-b border-black/[0.04]" : ""
                    }`}
                    style={{ color: "rgba(0,0,0,0.7)" }}
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#" className="py-3 text-[14px] font-medium border-t border-black/[0.04] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded" style={{ color: "rgba(0,0,0,0.7)" }}>
                  Login
                </a>
                <a
                  href="/kyb"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1.5 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-[14px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  style={{
                    background: `linear-gradient(135deg, ${DARK} 0%, #1a1e2e 100%)`,
                    color: "#fff",
                  }}
                >
                  Find My Best Role
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
