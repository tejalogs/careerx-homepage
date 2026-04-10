"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, type ReactNode } from "react";

/* ─── types ───────────────────────────────────────────────────── */
export type CardContent = {
  before: ReactNode;
  after: ReactNode;
};

type ScannerCardStreamProps = {
  showControls?: boolean;
  showSpeed?: boolean;
  initialSpeed?: number;
  direction?: -1 | 1;
  cardImages?: string[];
  cardContents?: CardContent[];
  repeat?: number;
  cardGap?: number;
  friction?: number;
  scanEffect?: "clip" | "scramble";
  height?: number;
  cardWidth?: number;
  cardHeight?: number;
};

/* ═══════════════════════════════════════════════════════════════ */
const ScannerCardStream = ({
  showControls = false,
  showSpeed = false,
  initialSpeed = 150,
  direction = -1,
  cardImages = [],
  cardContents,
  repeat = 6,
  cardGap = 60,
  friction = 0.95,
  height = 300,
  cardWidth = 400,
  cardHeight = 250,
}: ScannerCardStreamProps) => {
  const useCustom = !!cardContents;
  const [isPaused, setIsPaused] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sourceCount = useCustom ? cardContents!.length : cardImages.length;

  const cards = useMemo(() => {
    const total = sourceCount * repeat;
    return Array.from({ length: total }, (_, i) => ({
      id: i,
      srcIdx: i % sourceCount,
    }));
  }, [sourceCount, repeat]);

  const cardLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScanningRef = useRef(false);
  const scanLineRef = useRef<HTMLDivElement>(null);

  const oneSetWidth = (cardWidth + cardGap) * sourceCount;

  const cardStreamState = useRef({
    position: -(oneSetWidth * 3),
    velocity: initialSpeed,
    direction: direction,
    friction: friction,
    minVelocity: 30,
  });

  const toggleAnimation = useCallback(() => setIsPaused((p) => !p), []);
  const resetPosition = useCallback(() => {
    cardStreamState.current.position = containerRef.current?.offsetWidth || 0;
    cardStreamState.current.velocity = initialSpeed;
    cardStreamState.current.direction = direction;
    setIsPaused(false);
  }, [initialSpeed, direction]);
  const changeDirection = useCallback(() => {
    cardStreamState.current.direction *= -1;
  }, []);

  useEffect(() => {
    const cardLine = cardLineRef.current;
    const container = containerRef.current;
    const scanLine = scanLineRef.current;

    if (!cardLine || !container || !scanLine) return;

    let animationFrameId: number;
    const cw = container.offsetWidth;

    /* ── card scan detection — uses offsetLeft instead of getBoundingClientRect ── */
    const updateCardEffects = () => {
      const scanX = cw / 2;
      const sw = 8;
      const sL = scanX - sw / 2;
      const sR = scanX + sw / 2;
      let any = false;
      const pos = cardStreamState.current.position;

      const wrappers = cardLine.children;
      for (let idx = 0; idx < wrappers.length; idx++) {
        const wrap = wrappers[idx] as HTMLElement;
        const localLeft = pos + idx * (cardWidth + cardGap);
        const localRight = localLeft + cardWidth;

        const before = wrap.firstElementChild as HTMLElement;
        const after = wrap.lastElementChild as HTMLElement;

        if (localLeft < sR && localRight > sL) {
          any = true;
          const iL = Math.max(sL - localLeft, 0);
          const iR = Math.min(sR - localLeft, cardWidth);
          before?.style.setProperty("--clip-right", `${(iL / cardWidth) * 100}%`);
          after?.style.setProperty("--clip-left", `${(iR / cardWidth) * 100}%`);
        } else if (localRight < sL) {
          before?.style.setProperty("--clip-right", "100%");
          after?.style.setProperty("--clip-left", "100%");
        } else {
          before?.style.setProperty("--clip-right", "0%");
          after?.style.setProperty("--clip-left", "0%");
        }
      }

      if (any !== isScanningRef.current) {
        isScanningRef.current = any;
        scanLine.style.opacity = any ? "1" : "0";
      }
    };

    /* ── animation loop — pure DOM, no React state updates ──── */
    const animate = () => {
      if (!isPaused) {
        const state = cardStreamState.current;
        if (state.velocity > state.minVelocity) {
          state.velocity *= state.friction;
        }
        state.position += state.velocity * state.direction * (1 / 60);

        // Seamless loop
        const setW = (cardWidth + cardGap) * sourceCount;
        if (state.position > -setW) state.position -= setW;
        if (state.position < -(setW * (repeat - 2))) state.position += setW;

        cardLine.style.transform = `translateX(${state.position}px)`;
        updateCardEffects();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, cardGap, height, cardWidth, cardHeight, sourceCount, repeat]);

  if (!mounted) return <div style={{ height }} />;

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height }}
    >
      {showControls && (
        <div className="absolute top-3 right-3 z-30 flex gap-2">
          <button onClick={toggleAnimation} className="px-3 py-1 text-xs rounded bg-white/10 text-white backdrop-blur">{isPaused ? "Play" : "Pause"}</button>
          <button onClick={changeDirection} className="px-3 py-1 text-xs rounded bg-white/10 text-white backdrop-blur">Reverse</button>
          <button onClick={resetPosition} className="px-3 py-1 text-xs rounded bg-white/10 text-white backdrop-blur">Reset</button>
        </div>
      )}

      {/* Scanner line */}
      <div
        ref={scanLineRef}
        className="absolute top-1/2 left-1/2 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 z-20 pointer-events-none"
        style={{
          height: height + 30,
          opacity: 0,
          background: "linear-gradient(to bottom, transparent, #7B9FE8 30%, #3C61A8 50%, #7B9FE8 70%, transparent)",
          boxShadow: "0 0 10px rgba(60,97,168,0.5), 0 0 20px rgba(60,97,168,0.3), 0 0 40px rgba(60,97,168,0.15)",
        }}
      />

      {/* Card stream */}
      <div className="absolute w-full flex items-center" style={{ height: cardHeight }}>
        <div
          ref={cardLineRef}
          className="flex items-center whitespace-nowrap select-none will-change-transform pointer-events-none"
          style={{ gap: `${cardGap}px` }}
        >
          {cards.map((card) => {
            const content = useCustom ? cardContents![card.srcIdx] : null;
            return (
              <div key={card.id} className="card-wrapper relative shrink-0 rounded-[22px] overflow-hidden" style={{ width: cardWidth, height: cardHeight, background: "#F7F8FC" }}>
                {/* BEFORE — visible before scanner */}
                <div
                  className="card-before absolute inset-0 rounded-[22px] overflow-hidden z-[2] [clip-path:inset(0_0_0_var(--clip-right,0%))]"
                  style={{ boxShadow: "0 6px 20px rgba(12,14,20,0.1), 0 2px 6px rgba(12,14,20,0.06)" }}
                >
                  {useCustom
                    ? <div className="w-full h-full">{content!.before}</div>
                    : null
                  }
                </div>
                {/* AFTER — revealed after scanner */}
                <div
                  className="card-after absolute inset-0 rounded-[22px] overflow-hidden z-[1] [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)]"
                  style={{ boxShadow: "0 6px 20px rgba(12,14,20,0.1), 0 2px 6px rgba(12,14,20,0.06)" }}
                >
                  {useCustom
                    ? <div className="w-full h-full">{content!.after}</div>
                    : null
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { ScannerCardStream };
