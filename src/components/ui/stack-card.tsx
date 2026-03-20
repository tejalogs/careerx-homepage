"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Card data ────────────────────────────────────────────────────────────────
const INITIAL_CARDS = [
  {
    id: 0,
    src: "/screenshots/job-listings.svg",
    label: "Job Listings",
    caption: "Matched to your profile",
    step: 0,
  },
  {
    id: 1,
    src: "/screenshots/learning-path.svg",
    label: "Learning Path",
    caption: "Your personalised roadmap",
    step: 1,
  },
  {
    id: 2,
    src: "/screenshots/mock-interview.jpg",
    label: "AI Mock Interview",
    caption: "Practice before they do",
    step: 2,
  },
  {
    id: 3,
    src: "/screenshots/job-dashboard.jpg",
    label: "Job Overview",
    caption: "Track every application",
    step: 3,
  },
];

const STEPS = ["Discover", "Prepare", "Validate", "Activate"];
const AUTO_CYCLE_MS = 3000;

const OFFSET = 10;
const SCALE_STEP = 0.045;
const DIM_STEP = 0.14;
const spring = { type: "spring" as const, stiffness: 160, damping: 26 };

export default function KYBCardStack() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [activeStep, setActiveStep] = useState(0);
  const isDraggingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
    setActiveStep((s) => (s + 1) % STEPS.length);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isDraggingRef.current) advance();
    }, AUTO_CYCLE_MS);
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    advance();
    startTimer();
  };

  return (
    <div className="relative w-full flex flex-col gap-5">
      {/* Card stack */}
      <div className="relative w-full" style={{ height: "220px" }}>
        <ul className="relative w-full h-full m-0 p-0">
          {cards.map((card, i) => {
            const isFront = i === 0;
            const brightness = Math.max(0.45, 1 - i * DIM_STEP);

            return (
              <motion.li
                key={card.id}
                className="absolute w-full h-full list-none overflow-hidden rounded-2xl border border-black/[0.06]"
                style={{
                  boxShadow: isFront
                    ? "0 12px 40px rgba(12,14,20,0.14), 0 2px 8px rgba(12,14,20,0.07)"
                    : "0 4px 16px rgba(12,14,20,0.06)",
                  cursor: isFront ? "grab" : "auto",
                  touchAction: "none",
                  backgroundColor: "#fff",
                }}
                animate={{
                  top: `${i * -OFFSET}px`,
                  scale: 1 - i * SCALE_STEP,
                  filter: `brightness(${brightness})`,
                  zIndex: cards.length - i,
                }}
                transition={spring}
                drag={isFront ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                whileDrag={
                  isFront
                    ? { zIndex: cards.length + 1, cursor: "grabbing", scale: 1.01, rotate: 0.8 }
                    : {}
                }
              >
                <div className="relative w-full h-full">
                  <Image
                    src={card.src}
                    alt={card.label}
                    fill
                    unoptimized={card.src.endsWith(".svg")}
                    className="object-cover object-top pointer-events-none"
                    draggable={false}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {isFront && (
                    <div
                      className="absolute bottom-0 left-0 right-0 px-4 py-2.5 flex items-center justify-between"
                      style={{
                        background:
                          "linear-gradient(0deg, rgba(12,14,20,0.72) 0%, transparent 100%)",
                      }}
                    >
                      <div>
                        <p className="text-[11px] font-black text-white leading-none">
                          {card.label}
                        </p>
                        <p className="text-[10px] text-white/60 font-medium mt-0.5">
                          {card.caption}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-[9px] font-black text-white/80 uppercase tracking-wide">
                          Live
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Step indicator */}
      <StepIndicator activeStep={activeStep} />
    </div>
  );
}

function StepIndicator({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((label, idx) => {
        const isActive = idx === activeStep;
        const isPast = idx < activeStep;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={label} className="flex items-center" style={{ flex: isLast ? "0 0 auto" : 1 }}>
            {/* Step pill */}
            <div className="flex flex-col items-center gap-1">
              <motion.div
                className="px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap"
                animate={{
                  backgroundColor: isActive
                    ? "#3C61A8"
                    : isPast
                    ? "#E5E7EB"
                    : "transparent",
                  color: isActive ? "#ffffff" : isPast ? "#6B7280" : "#9CA3AF",
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  border: isActive ? "none" : "1px solid #E5E7EB",
                }}
              >
                {isPast ? (
                  <span className="flex items-center gap-1">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path
                        d="M1 3L3 5L7 1"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {label}
                  </span>
                ) : (
                  label
                )}
              </motion.div>
            </div>

            {/* Connector */}
            {!isLast && (
              <div className="relative flex-1 mx-1" style={{ height: "2px" }}>
                <div className="absolute inset-0 rounded-full bg-gray-200" />
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: "#3C61A8" }}
                  animate={{ width: isPast ? "100%" : isActive ? "50%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
