"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, type ReactNode } from "react";
import * as THREE from "three";

/* ─── defaults ────────────────────────────────────────────────── */
const defaultCardImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop&q=80",
];

/* ─── ascii helper ────────────────────────────────────────────── */
const ASCII_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

const generateCode = (w: number, h: number): string => {
  let out = "";
  for (let row = 0; row < h; row++) {
    for (let col = 0; col < w; col++) {
      out += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
    }
    out += "\n";
  }
  return out;
};

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
  theme?: "dark" | "light";
};

/* ═══════════════════════════════════════════════════════════════ */
const ScannerCardStream = ({
  showControls = false,
  showSpeed = false,
  initialSpeed = 150,
  direction = -1,
  cardImages = defaultCardImages,
  cardContents,
  repeat = 6,
  cardGap = 60,
  friction = 0.95,
  scanEffect = "scramble",
  height = 300,
  cardWidth = 400,
  cardHeight = 250,
  theme = "dark",
}: ScannerCardStreamProps) => {
  const useCustom = !!cardContents;
  const isLight = theme === "light";
  const [speed, setSpeed] = useState(initialSpeed);
  const [isPaused, setIsPaused] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sourceCount = useCustom ? cardContents.length : cardImages.length;

  const cards = useMemo(() => {
    const total = sourceCount * repeat;
    return Array.from({ length: total }, (_, i) => ({
      id: i,
      srcIdx: i % sourceCount,
      image: useCustom ? "" : cardImages[i % sourceCount],
      ascii: !useCustom && mounted
        ? generateCode(Math.floor(cardWidth / 6.5), Math.floor(cardHeight / 13))
        : "",
    }));
  }, [sourceCount, repeat, mounted, useCustom, cardImages, cardWidth, cardHeight]);

  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const originalAscii = useRef(new Map<number, string>());

  const cardStreamState = useRef({
    position: 0,
    velocity: initialSpeed,
    direction: direction,
    isDragging: false,
    lastMouseX: 0,
    lastTime: performance.now(),
    cardLineWidth: (cardWidth + cardGap) * cards.length,
    friction: friction,
    minVelocity: 30,
  });

  const scannerState = useRef({ isScanning: false });

  const toggleAnimation = useCallback(() => setIsPaused((p) => !p), []);
  const resetPosition = useCallback(() => {
    if (cardLineRef.current) {
      cardStreamState.current.position =
        cardLineRef.current.parentElement?.offsetWidth || 0;
      cardStreamState.current.velocity = initialSpeed;
      cardStreamState.current.direction = direction;
      setIsPaused(false);
    }
  }, [initialSpeed, direction]);
  const changeDirection = useCallback(() => {
    cardStreamState.current.direction *= -1;
  }, []);

  useEffect(() => {
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;
    const container = containerRef.current;

    if (!cardLine || !particleCanvas || !scannerCanvas || !container) return;

    if (!useCustom) {
      cards.forEach((c) => originalAscii.current.set(c.id, c.ascii));
    }
    let animationFrameId: number;

    const cw = container.offsetWidth;
    const ch = height;

    /* ── Three.js particles ──────────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -cw / 2, cw / 2, ch / 2, -ch / 2, 1, 1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      canvas: particleCanvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(cw, ch);
    renderer.setClearColor(0x000000, 0);

    const particleCount = isLight ? 0 : 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100;
    texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d")!;
    const half = 50;
    const grad = texCtx.createRadialGradient(half, half, 0, half, half, half);
    if (isLight) {
      grad.addColorStop(0.025, "hsl(217,61%,45%)");
      grad.addColorStop(0.1, "hsl(217,61%,55%)");
      grad.addColorStop(0.25, "hsl(217,64%,65%)");
      grad.addColorStop(1, "transparent");
    } else {
      grad.addColorStop(0.025, "#fff");
      grad.addColorStop(0.1, "hsl(217,61%,33%)");
      grad.addColorStop(0.25, "hsl(217,64%,6%)");
      grad.addColorStop(1, "transparent");
    }
    texCtx.fillStyle = grad;
    texCtx.arc(half, half, half, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * cw * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * ch;
      velocities[i] = Math.random() * 60 + 30;
      alphas[i] = isLight
        ? (Math.random() * 3 + 1) / 10
        : (Math.random() * 8 + 2) / 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    const pColor = isLight ? "0.235, 0.38, 0.66" : "1.0, 1.0, 1.0";
    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = ${isLight ? "10.0" : "15.0"};
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(${pColor}, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }`,
      transparent: true,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    /* ── scanner canvas 2d ───────────────────────────────────── */
    const ctx = scannerCanvas.getContext("2d")!;
    scannerCanvas.width = cw;
    scannerCanvas.height = ch + 50;
    const baseMax = isLight ? 0 : 800;
    const scanMax = isLight ? 0 : 2500;
    let currentMax = baseMax;
    type SP = {
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; life: number; decay: number;
    };
    const mkP = (): SP => ({
      x: cw / 2 + (Math.random() - 0.5) * 3,
      y: Math.random() * (ch + 50),
      vx: Math.random() * 0.8 + 0.2,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * (isLight ? 0.5 : 0.6) + 0.3,
      alpha: (Math.random() * 0.4 + 0.3) * (isLight ? 0.5 : 1),
      life: 1,
      decay: Math.random() * 0.02 + 0.005,
    });
    let sParticles: SP[] = Array.from({ length: baseMax }, mkP);

    /* ── scramble effect (image mode only) ────────────────────── */
    const runScramble = (el: HTMLElement, cardId: number) => {
      if (el.dataset.scrambling === "true") return;
      el.dataset.scrambling = "true";
      const orig = originalAscii.current.get(cardId) || "";
      let n = 0;
      const iv = setInterval(() => {
        el.textContent = generateCode(Math.floor(cardWidth / 6.5), Math.floor(cardHeight / 13));
        if (++n >= 10) {
          clearInterval(iv);
          el.textContent = orig;
          delete el.dataset.scrambling;
        }
      }, 30);
    };

    /* ── card scan detection ─────────────────────────────────── */
    const updateCardEffects = () => {
      const scanX = cw / 2;
      const sw = 8;
      const sL = scanX - sw / 2;
      const sR = scanX + sw / 2;
      let any = false;

      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrap, idx) => {
        const r = wrap.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const localLeft = r.left - containerRect.left;
        const localRight = r.right - containerRect.left;

        const before = wrap.querySelector<HTMLElement>(".card-before")!;
        const after = wrap.querySelector<HTMLElement>(".card-after")!;
        const pre = !useCustom ? after?.querySelector<HTMLElement>("pre") : null;

        if (localLeft < sR && localRight > sL) {
          any = true;
          if (!useCustom && scanEffect === "scramble" && wrap.dataset.scanned !== "true" && pre) {
            runScramble(pre, idx);
          }
          wrap.dataset.scanned = "true";
          const iL = Math.max(sL - localLeft, 0);
          const iR = Math.min(sR - localLeft, r.width);
          before?.style.setProperty("--clip-right", `${(iL / r.width) * 100}%`);
          after?.style.setProperty("--clip-left", `${(iR / r.width) * 100}%`);
        } else {
          delete wrap.dataset.scanned;
          if (localRight < sL) {
            before?.style.setProperty("--clip-right", "100%");
            after?.style.setProperty("--clip-left", "100%");
          } else {
            before?.style.setProperty("--clip-right", "0%");
            after?.style.setProperty("--clip-left", "0%");
          }
        }
      });

      setIsScanning(any);
      scannerState.current.isScanning = any;
    };

    /* ── drag / scroll handlers ──────────────────────────────── */
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      const s = cardStreamState.current;
      s.isDragging = true;
      s.lastMouseX = "touches" in e ? e.touches[0].clientX : e.clientX;
      s.lastTime = performance.now();
      cardLine.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const s = cardStreamState.current;
      if (!s.isDragging) return;
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      const dx = cx - s.lastMouseX;
      const now = performance.now();
      const dt = (now - s.lastTime) / 1000;
      s.position += dx;
      if (dt > 0) {
        s.velocity = Math.abs(dx / dt);
        s.direction = dx > 0 ? 1 : -1;
      }
      s.lastMouseX = cx;
      s.lastTime = now;
    };

    const handleMouseUp = () => {
      cardStreamState.current.isDragging = false;
      cardLine.style.cursor = "grab";
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = cardStreamState.current;
      s.velocity = Math.min(s.velocity + Math.abs(e.deltaY) * 0.5, 500);
      if (e.deltaY > 0) s.direction = -1;
      else s.direction = 1;
    };

    cardLine.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    cardLine.addEventListener("touchstart", handleMouseDown, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
    cardLine.addEventListener("wheel", handleWheel, { passive: false });

    /* ── animation loop ──────────────────────────────────────── */
    const animate = (now: number) => {
      cardStreamState.current.lastTime = now;

      if (!isPaused && !cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
          cardStreamState.current.velocity *= cardStreamState.current.friction;
        }
        cardStreamState.current.position +=
          cardStreamState.current.velocity *
          cardStreamState.current.direction *
          (1 / 60);
        setSpeed(Math.round(cardStreamState.current.velocity));
      }

      const { position, cardLineWidth } = cardStreamState.current;
      if (position < -cardLineWidth) cardStreamState.current.position = cw;
      else if (position > cw) cardStreamState.current.position = -cardLineWidth;

      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`;
      updateCardEffects();

      const t = now * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > cw / 2 + 100) positions[i * 3] = -cw / 2 - 100;
        positions[i * 3 + 1] += Math.sin(t + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.05, Math.min(isLight ? 0.4 : 1, alphas[i] + (Math.random() - 0.5) * 0.05));
      }
      geometry.attributes.position.needsUpdate = true;
      (geometry.attributes.alpha as THREE.BufferAttribute).needsUpdate = true;
      renderer.render(scene, camera);

      ctx.clearRect(0, 0, cw, ch + 50);
      const target = scannerState.current.isScanning ? scanMax : baseMax;
      currentMax += (target - currentMax) * 0.05;
      while (sParticles.length < currentMax) sParticles.push(mkP());
      while (sParticles.length > currentMax) sParticles.pop();
      const pFill = isLight ? "rgba(60,97,168,0.4)" : "white";
      sParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.x > cw) Object.assign(p, mkP());
        ctx.globalAlpha = p.alpha * p.life;
        ctx.fillStyle = pFill;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cardLine.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cardLine.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      cardLine.removeEventListener("wheel", handleWheel);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [isPaused, cards, cardGap, friction, scanEffect, height, useCustom, cardWidth, cardHeight, isLight]);

  /* ── scanner line colors ───────────────────────────────────── */
  const scanLineShadow = "0 0 10px #a78bfa, 0 0 20px #a78bfa, 0 0 30px #8b5cf6, 0 0 50px #6366f1";

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height }}
    >
      <style jsx global>{`
        @keyframes glitch {
          0%, 16%, 50%, 100% { opacity: 1; }
          15%, 99% { opacity: 0.9; }
          49% { opacity: 0.8; }
        }
        .animate-glitch {
          animation: glitch 0.1s infinite linear alternate-reverse;
        }
        @keyframes scanPulse {
          0% { opacity: 0.75; transform: scaleY(1); }
          100% { opacity: 1; transform: scaleY(1.03); }
        }
        .animate-scan-pulse {
          animation: scanPulse 1.5s infinite alternate ease-in-out;
        }
      `}</style>

      {showControls && (
        <div className="absolute top-3 right-3 z-30 flex gap-2">
          <button onClick={toggleAnimation} className="px-3 py-1 text-xs rounded bg-white/10 text-white backdrop-blur">
            {isPaused ? "Play" : "Pause"}
          </button>
          <button onClick={changeDirection} className="px-3 py-1 text-xs rounded bg-white/10 text-white backdrop-blur">
            Reverse
          </button>
          <button onClick={resetPosition} className="px-3 py-1 text-xs rounded bg-white/10 text-white backdrop-blur">
            Reset
          </button>
        </div>
      )}

      {showSpeed && (
        <div className="absolute top-3 left-3 z-30 text-[10px] text-white/40 font-mono">
          {speed} px/s
        </div>
      )}

      <canvas ref={particleCanvasRef} className="absolute inset-0 z-0 pointer-events-none" style={{ width: "100%", height }} />
      <canvas ref={scannerCanvasRef} className="absolute inset-0 z-10 pointer-events-none" style={{ width: "100%", height: height + 50 }} />

      <div
        className={`
          absolute top-1/2 left-1/2 w-0.5 -translate-x-1/2 -translate-y-1/2
          rounded-full transition-opacity duration-300 z-20 pointer-events-none animate-scan-pulse
          ${isScanning ? "opacity-100" : "opacity-0"}
        `}
        style={{
          height: height + 30,
          boxShadow: scanLineShadow,
          background: "linear-gradient(to bottom, transparent, #a78bfa 50%, transparent)",
        }}
      />

      <div className="absolute w-full flex items-center" style={{ height: cardHeight }}>
        <div
          ref={cardLineRef}
          className="flex items-center whitespace-nowrap cursor-grab select-none will-change-transform"
          style={{ gap: `${cardGap}px` }}
        >
          {cards.map((card) => {
            const content = useCustom ? cardContents[card.srcIdx] : null;
            return (
              <div
                key={card.id}
                className="card-wrapper relative shrink-0"
                style={{ width: cardWidth, height: cardHeight }}
              >
                <div
                  className="card-before absolute inset-0 rounded-[15px] overflow-hidden z-[2] [clip-path:inset(0_0_0_var(--clip-right,0%))]"
                  style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.06)" }}
                >
                  {useCustom ? (
                    <div className="w-full h-full">{content!.before}</div>
                  ) : (
                    <img src={card.image} alt="Card" className="w-full h-full object-cover rounded-[15px] brightness-110 contrast-110" />
                  )}
                </div>

                <div
                  className="card-after absolute inset-0 rounded-[15px] overflow-hidden z-[1] [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)]"
                  style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.06)" }}
                >
                  {useCustom ? (
                    <div className="w-full h-full">{content!.after}</div>
                  ) : (
                    <pre className="ascii-content absolute inset-0 text-[rgba(220,210,255,0.6)] font-mono text-[11px] leading-[13px] overflow-hidden whitespace-pre m-0 p-0 text-left align-top box-border [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)] animate-glitch">
                      {card.ascii}
                    </pre>
                  )}
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
