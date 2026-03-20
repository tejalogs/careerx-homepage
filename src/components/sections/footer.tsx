"use client";

import { Youtube, Linkedin, Instagram, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { ChatBot } from "@/components/ui/chat-bot";

const SOCIAL_LINKS = [
  {
    platform: "youtube",
    href: "#",
    icon: Youtube,
  },
  {
    platform: "linkedin",
    href: "#",
    icon: Linkedin,
  },
  {
    platform: "instagram",
    href: "#",
    icon: Instagram,
  },
  {
    platform: "medium",
    href: "#",
    icon: null, // rendered as "M" text
  },
];

const NAV_LINKS = [
  { label: "CareerX For", dropdown: true },
  { label: "The Difference", dropdown: false },
  { label: "Know Yourself Better", dropdown: false },
  { label: "Blogs", dropdown: true },
  { label: "Success Stories", dropdown: false },
];

const CONTACT = [
  { icon: Phone, text: "0207-112-5202, +1 (510) 377-4277" },
  { icon: Mail, text: "spaladugu@careerxcelerator.io" },
  { icon: MapPin, text: "5470 Kietzke Lane, Suite 300-# 520, Reno, Nevada - 89511" },
];

export default function Footer() {
  return (
    <>
      <footer
        className="w-full relative overflow-hidden"
        style={{ backgroundColor: "#3C61A8" }}
      >
        {/* Decorative blobs */}
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none select-none overflow-hidden">
          <div
            className="absolute -right-10 top-4 w-44 h-44 rounded-full opacity-[0.12]"
            style={{ backgroundColor: "#ffffff", filter: "blur(2px)" }}
          />
          <div
            className="absolute right-8 top-20 w-28 h-28 rounded-full opacity-[0.08]"
            style={{ backgroundColor: "#ffffff" }}
          />
          <div
            className="absolute right-2 top-44 w-16 h-16 rounded-full opacity-[0.06]"
            style={{ backgroundColor: "#ffffff" }}
          />
          <div
            className="absolute right-24 top-8 w-10 h-10 rounded-full opacity-[0.07]"
            style={{ backgroundColor: "#ffffff" }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-12 sm:pt-16 pb-0 relative z-10">
          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-10 sm:mb-14">

            {/* Col 1: Brand */}
            <div>
              <a href="/" className="flex items-center gap-2 mb-3">
                <span className="text-[22px] font-black text-white tracking-tight leading-none">
                  Career<span style={{ color: "#F5D134" }}>✶</span>celerator
                </span>
              </a>
              <p className="text-sm italic font-semibold mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                Clarity. Preparedness. Confidence.
              </p>

              <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                Follow us on
              </p>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map(({ platform, href, icon: Icon }) => (
                  <a
                    key={platform}
                    href={href}
                    aria-label={platform}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/20"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                  >
                    {Icon ? (
                      <Icon className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-sm font-black text-white leading-none">M</span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Links */}
            <div>
              <p className="text-sm font-black text-white mb-5">Links</p>
              <ul className="space-y-3">
                {NAV_LINKS.map(({ label, dropdown }) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="flex items-center gap-1 text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {label}
                      {dropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <p className="text-sm font-black text-white mb-5">Contact Us</p>
              <ul className="space-y-4">
                {CONTACT.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.55)" }} />
                    <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="h-px" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
            <div className="flex items-center gap-5">
              <a href="#" className="text-xs text-white/60 hover:text-white/90 transition-colors">
                Terms of use
              </a>
              <a href="#" className="text-xs text-white/60 hover:text-white/90 transition-colors">
                Privacy policy
              </a>
            </div>
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} – All rights reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Floating chatbot */}
      <ChatBot />
    </>
  );
}
