"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

// ─── Card definitions ─────────────────────────────────────────────────────────
const CARDS = [
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=480&q=85",
    label: "Know Your Role",
    caption: "Discover where your strengths align",
    splash: "linear-gradient(306deg, #0a1628, #3C61A8)",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&q=85",
    label: "Build Your Skills",
    caption: "Close only the gaps that matter",
    splash: "linear-gradient(306deg, #1e4d6e, #3C8CA8)",
  },
  {
    src: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=480&q=85",
    label: "Mock Interviews",
    caption: "Practice until it feels effortless",
    splash: "linear-gradient(306deg, #0d2240, #3C61A8)",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=480&q=85",
    label: "Land the Offer",
    caption: "Walk in ready. Walk out hired.",
    splash: "linear-gradient(306deg, #c49a00, #F5D134)",
  },
];

const cardVariants: Variants = {
  offscreen: { y: 280 },
  onscreen: {
    y: 44,
    rotate: -8,
    transition: { type: "spring", bounce: 0.35, duration: 0.85 },
  },
};

interface CardItemProps {
  src: string;
  label: string;
  caption: string;
  splash: string;
}

function CardItem({ src, label, caption, splash }: CardItemProps) {
  return (
    <motion.div
      style={{
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        paddingTop: 20,
        marginBottom: -140,
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6 }}
    >
      {/* Coloured splash behind card */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: splash,
          clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
        }}
      />

      {/* Card */}
      <motion.div
        variants={cardVariants}
        style={{
          width: 270,
          height: 320,
          borderRadius: 20,
          overflow: "hidden",
          background: "#f5f5f5",
          position: "relative",
          boxShadow:
            "0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.08), 0 6px 16px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.1)",
          transformOrigin: "10% 60%",
        }}
      >
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          sizes="270px"
          unoptimized
        />
        {/* Label overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,22,40,0.82) 0%, rgba(10,22,40,0) 100%)",
          }}
        >
          <p className="text-[13px] font-black text-white leading-tight">{label}</p>
          <p className="text-[11px] text-white/60 font-medium mt-0.5">{caption}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ScrollImageCards() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        paddingBottom: 160,
      }}
    >
      {CARDS.map((card) => (
        <CardItem key={card.label} {...card} />
      ))}
    </div>
  );
}
