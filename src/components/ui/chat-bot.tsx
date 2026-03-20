"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { X, Send, ChevronDown } from "lucide-react";

// ─── Brand ─────────────────────────────────────────────────────────────────────
const BLUE   = "#3C61A8";
const YELLOW = "#F5D134";
const DARK   = "#0C0E14";

// ─── Avatar Face SVG ──────────────────────────────────────────────────────────
let _faceId = 0;
function AvatarFace({
  size = 48,
  blink = false,
  talking = false,
}: {
  size?: number;
  blink?: boolean;
  talking?: boolean;
}) {
  // Unique gradient ID per instance so multiple faces don't share the same SVG def
  const id = useRef(`fg-${++_faceId}`).current;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Face circle */}
      <circle cx="24" cy="24" r="22" fill={`url(#${id})`} />
      <defs>
        <radialGradient id={id} cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#4e7fd6" />
          <stop offset="100%" stopColor="#2a4a8c" />
        </radialGradient>
      </defs>

      {/* Subtle inner glow rim */}
      <circle cx="24" cy="24" r="21" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />

      {/* Left eye */}
      {blink ? (
        <path d="M15 22 Q17.5 20 20 22" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.9" />
      ) : (
        <>
          <ellipse cx="17.5" cy="21" rx="3" ry="3.5" fill="white" opacity="0.92" />
          <circle cx="18.2" cy="21.5" r="1.8" fill="#1a3068" />
          <circle cx="18.8" cy="20.6" r="0.7" fill="white" opacity="0.85" />
        </>
      )}

      {/* Right eye */}
      {blink ? (
        <path d="M28 22 Q30.5 20 33 22" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.9" />
      ) : (
        <>
          <ellipse cx="30.5" cy="21" rx="3" ry="3.5" fill="white" opacity="0.92" />
          <circle cx="31.2" cy="21.5" r="1.8" fill="#1a3068" />
          <circle cx="31.8" cy="20.6" r="0.7" fill="white" opacity="0.85" />
        </>
      )}

      {/* Mouth */}
      {talking ? (
        <>
          <ellipse cx="24" cy="32" rx="5" ry="3" fill="#1a3068" opacity="0.6">
            <animate attributeName="ry" values="3;1.5;3;2;3" dur="0.35s" repeatCount="indefinite" />
          </ellipse>
          <path d="M19 32 Q24 36 29 32" stroke={YELLOW} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
        </>
      ) : (
        <path d="M18.5 31 Q24 36.5 29.5 31" stroke={YELLOW} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
      )}

      {/* Soft cheek blush */}
      <ellipse cx="12" cy="29" rx="4" ry="2.5" fill={YELLOW} opacity="0.12" />
      <ellipse cx="36" cy="29" rx="4" ry="2.5" fill={YELLOW} opacity="0.12" />

      {/* Headset arc — subtle tech detail */}
      <path d="M7 22 Q7 8 24 8 Q41 8 41 22" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="7" cy="22" r="2.5" fill="rgba(245,209,52,0.6)" />
      <circle cx="41" cy="22" r="2.5" fill="rgba(245,209,52,0.6)" />
    </svg>
  );
}

// ─── Predefined responses ────────────────────────────────────────────────────
const BOT_RESPONSES: Record<string, string> = {
  default:
    "Hi! I'm CareerBot. Ask me anything about CareerXcelerator or how to get started.",
  hello: "Hey there! Great to meet you. Ready to take the first step toward your dream role?",
  hi: "Hey! I'm here to help you figure out your next career move.",
  pricing:
    "We have three plans: Career Builder ($449), Career Pro ($649), and Career Elite ($799). All are one-time payments with no subscription.",
  plans:
    "Career Builder starts you off right, Career Pro adds expert coaching, and Career Elite gives you the full transformation package.",
  assessment:
    "The KYB (Know Yourself Better) assessment takes just 10 minutes and maps your strengths to roles you will actually thrive in.",
  kyb: "KYB stands for Know Yourself Better. It is a structured assessment that identifies the roles where your strengths are a genuine match.",
  job: "We connect you to 500+ hiring partners. Once you are offer-ready, Career Activation introduces you directly to the right employers.",
  interview:
    "We have AI-powered mock interview simulations with real role questions and scored feedback after every session.",
  how: "Start with a free KYB assessment. From there you get a skill roadmap, AI mentor access, interview practice, and live job matching.",
  start: "Just enter your email above and we will reach out within 24 hours to kick things off. No commitment needed.",
  university:
    "We work with universities to run cohort-wide gap analysis, issue verifiable credentials, and track placement outcomes at scale.",
  help: "I can tell you about our assessments, pricing, interview prep, or how to get started. What do you want to know?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(BOT_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) return BOT_RESPONSES[key];
  }
  return BOT_RESPONSES.default;
}

// ─── Message types ────────────────────────────────────────────────────────────
interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

// ─── Chat Panel ───────────────────────────────────────────────────────────────
function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: "Hi! I'm CareerBot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  let nextId = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: nextId.current++, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply: Message = { id: nextId.current++, role: "bot", text: getResponse(text) };
      setMessages((prev) => [...prev, reply]);
    }, 900 + Math.random() * 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="absolute bottom-[62px] right-0 w-[320px] rounded-2xl overflow-hidden shadow-2xl"
      style={{ border: "1px solid rgba(60,97,168,0.25)", backgroundColor: "#fff" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ backgroundColor: BLUE }}
      >
        <div className="shrink-0">
          <AvatarFace size={36} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-white leading-none">CareerBot</p>
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1 align-middle" />
            Online
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2.5 p-4 h-56 overflow-y-auto text-[13px]">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className="max-w-[80%] px-3 py-2 rounded-2xl leading-relaxed"
              style={
                msg.role === "user"
                  ? { backgroundColor: BLUE, color: "#fff", borderBottomRightRadius: 4 }
                  : { backgroundColor: "#F7F8FC", color: DARK, borderBottomLeftRadius: 4 }
              }
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1 items-center" style={{ backgroundColor: "#F7F8FC" }}>
              {[0, 0.15, 0.3].map((d) => (
                <motion.span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: BLUE, opacity: 0.6 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, delay: d, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-2 px-3 py-3 border-t"
        style={{ borderColor: "rgba(12,14,20,0.08)" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message…"
          className="flex-1 text-[13px] outline-none bg-transparent placeholder-gray-400"
          style={{ color: DARK }}
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
          style={{ backgroundColor: BLUE }}
        >
          <Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [blink, setBlink] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [pastVideo, setPastVideo] = useState(false);
  const controls = useAnimationControls();

  // Show preview only after scrolling past the video section; reset when back at top
  useEffect(() => {
    const check = () => {
      const past = window.scrollY > window.innerHeight * 1.2;
      setPastVideo(past);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Periodic blink — all timer IDs tracked in a ref array for full cleanup
  const blinkTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const track = (id: ReturnType<typeof setTimeout>) => {
      blinkTimers.current.push(id);
      return id;
    };

    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 3000;
      track(setTimeout(() => {
        setBlink(true);
        track(setTimeout(() => {
          setBlink(false);
          const gap = 120 + Math.random() * 180;
          track(setTimeout(() => {
            setBlink(true);
            track(setTimeout(() => {
              setBlink(false);
              scheduleNext();
            }, 80));
          }, gap));
        }, 100));
      }, delay));
    };

    scheduleNext();
    return () => {
      blinkTimers.current.forEach(clearTimeout);
      blinkTimers.current = [];
    };
  }, []);

  // Idle nudge every 8s when closed
  useEffect(() => {
    if (open) return;
    const id = setInterval(() => {
      setNudge(true);
      setTimeout(() => setNudge(false), 600);
    }, 8000);
    return () => clearInterval(id);
  }, [open]);

  const handleToggle = () => {
    if (!open) {
      setBounce(true);
      setTimeout(() => setBounce(false), 400);
    }
    setOpen((v) => !v);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>{open && <ChatPanel onClose={() => setOpen(false)} />}</AnimatePresence>

      {/* Animated preview card when closed + past video */}
      <AnimatePresence>
        {!open && pastVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 280, damping: 22 }}
            className="pointer-events-none w-[190px] rounded-2xl overflow-hidden shadow-xl"
            style={{ backgroundColor: "#fff", border: "1px solid rgba(60,97,168,0.15)" }}
          >
            {/* Mini header */}
            <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: BLUE }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              <span className="text-[10px] font-black text-white tracking-wide">CareerBot</span>
            </div>

            {/* Animated chat lines */}
            <div className="px-3 py-2.5 flex flex-col gap-2">
              {/* Bot bubble */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="flex items-end gap-1.5"
              >
                <div
                  className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: BLUE }}
                >
                  <span className="text-[7px] font-black text-white">AI</span>
                </div>
                <div
                  className="px-2.5 py-1.5 rounded-2xl rounded-bl-sm"
                  style={{ backgroundColor: "#F0F4FF", maxWidth: 120 }}
                >
                  <motion.div
                    className="h-1.5 rounded-full mb-1"
                    style={{ backgroundColor: BLUE, opacity: 0.25, width: 88 }}
                    animate={{ opacity: [0.18, 0.35, 0.18] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ backgroundColor: BLUE, opacity: 0.15, width: 60 }}
                    animate={{ opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* User bubble */}
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className="flex justify-end"
              >
                <div
                  className="px-2.5 py-1.5 rounded-2xl rounded-br-sm"
                  style={{ backgroundColor: BLUE }}
                >
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.5)", width: 52 }}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Typing dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.3 }}
                className="flex items-end gap-1.5"
              >
                <div
                  className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: BLUE }}
                >
                  <span className="text-[7px] font-black text-white">AI</span>
                </div>
                <div
                  className="px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1 items-center"
                  style={{ backgroundColor: "#F0F4FF" }}
                >
                  {[0, 0.2, 0.4].map((d) => (
                    <motion.span
                      key={d}
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: BLUE }}
                      animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.7, delay: d, repeat: Infinity }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Yellow CTA bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="px-3 py-2 flex items-center justify-between"
              style={{ backgroundColor: YELLOW }}
            >
              <span className="text-[10px] font-black" style={{ color: DARK }}>Ask me anything</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-[10px]"
                style={{ color: DARK }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar button */}
      <motion.button
        onClick={handleToggle}
        aria-label="Open CareerBot"
        animate={
          bounce
            ? { scale: [1, 1.15, 0.92, 1.04, 1] }
            : nudge
            ? { x: [0, -4, 4, -2, 2, 0] }
            : {}
        }
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-[54px] h-[54px] rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
        style={{
          boxShadow: open
            ? `0 0 0 2.5px ${YELLOW}, 0 6px 24px rgba(60,97,168,0.5)`
            : `0 3px 16px rgba(60,97,168,0.45)`,
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Pulse ring when closed */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: BLUE, opacity: 0.18 }}
          />
        )}

        <AvatarFace size={54} blink={blink} talking={open} />

        {/* Minimize chevron on open — small pill at bottom edge */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-0 inset-x-0 flex items-center justify-center pb-0.5"
            >
              <div
                className="w-6 h-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
              >
                <X className="w-2.5 h-2.5 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
