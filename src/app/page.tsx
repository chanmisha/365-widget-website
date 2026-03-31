"use client";

import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Circle, Calendar, Palette, Store, Smartphone } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";

/* ───────────────────────────────────────────
   Shared pointer
   ─────────────────────────────────────────── */
const pointer = { x: -9999, y: -9999, isTouch: false };

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.isTouch = e.pointerType === "touch";
  });
  window.addEventListener("pointerleave", () => {
    pointer.x = -9999;
    pointer.y = -9999;
  });
}

/* ───────────────────────────────────────────
   SVG Glass Filter (liquid glass distortion)
   ─────────────────────────────────────────── */
function GlassDistortionFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.04"
            numOctaves="1"
            seed="3"
            result="turbulence"
          />
          <feGaussianBlur
            in="turbulence"
            stdDeviation="2.5"
            result="blurredNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur
            in="displaced"
            stdDeviation="3"
            result="finalBlur"
          />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

/* ───────────────────────────────────────────
   Viewport hook
   ─────────────────────────────────────────── */
function useViewport() {
  const getSnapshot = useCallback(
    () => `${window.innerWidth}x${window.innerHeight}`,
    []
  );
  const getServerSnapshot = useCallback(() => "1024x768", []);
  const subscribe = useCallback((cb: () => void) => {
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, []);

  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [w, h] = snap.split("x").map(Number);
  return { w, h, isMobile: w < 768, isTablet: w < 1024 };
}

/* ───────────────────────────────────────────
   Card layout — uniform size per breakpoint
   ─────────────────────────────────────────── */
interface CardDef {
  baseRotate: number;
  x: string;
  y: string;
  delay: number;
}

function getCards(vw: number): CardDef[] {
  if (vw < 768) {
    return [
      { baseRotate: 8, x: "4%", y: "5%", delay: 0 },
      { baseRotate: -10, x: "calc(100% - 130px)", y: "7%", delay: 0.12 },
      { baseRotate: 5, x: "5%", y: "calc(100% - 150px)", delay: 0.24 },
      { baseRotate: -7, x: "calc(100% - 135px)", y: "calc(100% - 145px)", delay: 0.36 },
    ];
  }
  if (vw < 1024) {
    return [
      { baseRotate: 12, x: "calc(100% - 225px)", y: "5%", delay: 0 },
      { baseRotate: -14, x: "16%", y: "4%", delay: 0.12 },
      { baseRotate: 6, x: "2%", y: "22%", delay: 0.24 },
      { baseRotate: -8, x: "calc(100% - 220px)", y: "48%", delay: 0.36 },
      { baseRotate: -4, x: "8%", y: "calc(100% - 225px)", delay: 0.48 },
    ];
  }
  return [
    { baseRotate: 12, x: "calc(100% - 310px)", y: "5%", delay: 0 },
    { baseRotate: -15, x: "26%", y: "3%", delay: 0.12 },
    { baseRotate: 6, x: "1%", y: "15%", delay: 0.24 },
    { baseRotate: -8, x: "calc(100% - 320px)", y: "50%", delay: 0.36 },
    { baseRotate: -4, x: "10%", y: "calc(100% - 310px)", delay: 0.48 },
    { baseRotate: 18, x: "50%", y: "calc(100% - 300px)", delay: 0.6 },
    { baseRotate: -10, x: "70%", y: "33%", delay: 0.72 },
  ];
}

function getCardSize(vw: number): number {
  if (vw < 768) return 115;
  if (vw < 1024) return 195;
  return 275;
}

/* ───────────────────────────────────────────
   FloatingCard — Liquid Glass style
   ─────────────────────────────────────────── */
interface FloatingCardProps {
  delay: number;
  size: number;
  baseRotate: number;
  finalX: string;
  finalY: string;
  isMobile: boolean;
}

function FloatingCard({
  delay,
  size,
  baseRotate,
  finalX,
  finalY,
  isMobile,
}: FloatingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOrigin = useRef({ px: 0, py: 0, ox: 0, oy: 0 });

  const posX = useMotionValue(0);
  const posY = useMotionValue(0);

  const pushX = useSpring(0, { stiffness: 28, damping: 7, mass: 2 });
  const pushY = useSpring(0, { stiffness: 28, damping: 7, mass: 2 });
  const spinPush = useSpring(0, { stiffness: 14, damping: 5, mass: 2.5 });

  const totalX = useTransform(() => posX.get() + pushX.get());
  const totalY = useTransform(() => posY.get() + pushY.get());
  const totalRot = useTransform(() => baseRotate + spinPush.get());

  const [drift] = useState({
    yA: Math.random() * (isMobile ? 8 : 16) + 5,
    xA: Math.random() * (isMobile ? 5 : 10) - (isMobile ? 2.5 : 5),
    rA: Math.random() * 3 - 1.5,
    dur: Math.random() * 7 + 9,
  });

  /* cursor push (desktop only) */
  useEffect(() => {
    if (isMobile) return;
    let raf: number;
    const tick = () => {
      if (!isDragging.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = pointer.x - cx;
        const dy = pointer.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(size * 1.1, 280);

        if (dist < maxDist && dist > 1 && !pointer.isTouch) {
          const t = 1 - dist / maxDist;
          const angle = Math.atan2(dy, dx);
          pushX.set(-Math.cos(angle) * t * 22);
          pushY.set(-Math.sin(angle) * t * 22);
          const cross = dx - dy;
          spinPush.set(Math.sign(cross) * t * 20);
        } else {
          pushX.set(0);
          pushY.set(0);
          spinPush.set(0);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, pushX, pushY, spinPush, size]);

  /* bounds enforcement */
  useEffect(() => {
    let raf: number;
    const enforce = () => {
      if (!isDragging.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const pad = isMobile ? 0 : 10;
        let dx = 0;
        let dy = 0;

        if (rect.left < -pad) dx = -pad - rect.left;
        else if (rect.right > vw + pad) dx = vw + pad - rect.right;
        if (rect.top < -pad) dy = -pad - rect.top;
        else if (rect.bottom > vh + pad) dy = vh + pad - rect.bottom;

        if (dx !== 0 || dy !== 0) {
          posX.set(posX.get() + dx * 0.12);
          posY.set(posY.get() + dy * 0.12);
        }
      }
      raf = requestAnimationFrame(enforce);
    };
    raf = requestAnimationFrame(enforce);
    return () => cancelAnimationFrame(raf);
  }, [posX, posY, isMobile]);

  /* drag handlers */
  const onDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      pushX.set(0);
      pushY.set(0);
      spinPush.set(0);
      dragOrigin.current = {
        px: e.clientX,
        py: e.clientY,
        ox: posX.get(),
        oy: posY.get(),
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pushX, pushY, spinPush, posX, posY]
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const { px, py, ox, oy } = dragOrigin.current;
      let nx = ox + (e.clientX - px);
      let ny = oy + (e.clientY - py);

      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const curOx = posX.get();
        const curOy = posY.get();
        const absL = rect.left - curOx + nx;
        const absT = rect.top - curOy + ny;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const pad = isMobile ? 0 : 10;

        if (absL < -pad) nx += -pad - absL;
        if (absL + size > vw + pad) nx -= absL + size - vw - pad;
        if (absT < -pad) ny += -pad - absT;
        if (absT + size > vh + pad) ny -= absT + size - vh - pad;
      }

      posX.set(nx);
      posY.set(ny);
      spinPush.set(e.movementX * 1.5);
    },
    [posX, posY, spinPush, size, isMobile]
  );

  const onUp = useCallback(() => {
    isDragging.current = false;
    spinPush.set(0);
  }, [spinPush]);

  const r = size < 150 ? 24 : 32;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, left: "50%", top: "50%", scale: 0.3 }}
      animate={{ opacity: 1, left: finalX, top: finalY, scale: 1 }}
      transition={{
        opacity: { duration: 0.8, delay, ease: "easeOut" },
        scale: { duration: 2, delay, ease: [0.22, 1, 0.36, 1] },
        left: { duration: 2, delay, ease: [0.22, 1, 0.36, 1] },
        top: { duration: 2, delay, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        x: totalX,
        y: totalY,
        rotate: totalRot,
        width: size,
        height: size,
        willChange: "transform",
        touchAction: "none",
        cursor: "grab",
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="absolute z-10 select-none"
    >
      <motion.div
        animate={{
          y: [0, drift.yA, -drift.yA * 0.5, 0],
          x: [0, drift.xA, -drift.xA * 0.3, 0],
          rotate: [0, drift.rA, -drift.rA, 0],
        }}
        transition={{
          duration: drift.dur,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 2,
        }}
        className="relative w-full h-full pointer-events-none"
      >
        {/* ── Liquid Glass Card ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: r }}
        >
          {/* distortion layer — SVG filter refraction */}
          <div
            className="absolute inset-0 isolate overflow-hidden"
            style={{
              borderRadius: r,
              backdropFilter: 'url(#glass-distortion) blur(2px)',
              WebkitBackdropFilter: 'url(#glass-distortion) blur(2px)',
            }}
          />

          {/* white glass fill */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: r,
              background: "rgba(255, 255, 255, 0.18)",
            }}
          />

          {/* liquid glass inset shadows — depth & edge light */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: r,
              boxShadow: [
                "inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.9)",
                "inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85)",
                "inset 1px 1px 1px -0.5px rgba(255,255,255,0.6)",
                "inset -1px -1px 1px -0.5px rgba(255,255,255,0.6)",
                "inset 0 0 8px 6px rgba(255,255,255,0.08)",
                "inset 0 0 3px 2px rgba(255,255,255,0.05)",
              ].join(", "),
            }}
          />

          {/* top specular highlight */}
          <div
            className="absolute inset-x-0 top-0 h-[40%]"
            style={{
              borderRadius: `${r}px ${r}px 0 0`,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
            }}
          />

          {/* top edge line */}
          <div
            className="absolute inset-x-[8%] top-[0.5px] h-[1px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 75%, transparent)",
            }}
          />
        </div>

        {/* outer glow */}
        <div
          className="absolute -inset-px -z-10"
          style={{
            borderRadius: r + 1,
            boxShadow:
              "0 0 20px rgba(255,255,255,0.06), 0 0 50px rgba(255,255,255,0.025)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────
   Hero
   ─────────────────────────────────────────── */
function HeroGeometric({ badge = "Coming Soon" }: { badge?: string }) {
  const { w, isMobile } = useViewport();
  const cards = getCards(w);
  const cardSize = getCardSize(w);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: 2.6 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* SVG filter — rendered once */}
      <GlassDistortionFilter />

      {/* ── ambient pulsing light ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.25, 0.85, 1],
              opacity: [0.55, 1, 0.45, 0.55],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[15%] -left-[5%] w-[65%] h-[65%] sm:w-[70%] sm:h-[70%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.28), rgba(217,70,239,0.10), transparent 70%)",
            }}
          />
          <motion.div
            animate={{
              x: [0, -70, 90, 0],
              y: [0, 100, -50, 0],
              scale: [1, 0.85, 1.15, 1],
              opacity: [0.45, 0.9, 0.35, 0.45],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute top-[5%] -right-[10%] w-[55%] h-[55%] sm:w-[60%] sm:h-[60%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.22), rgba(59,130,246,0.10), transparent 70%)",
            }}
          />
          <motion.div
            animate={{
              x: [0, 50, -80, 0],
              y: [0, -50, 100, 0],
              scale: [1, 1.1, 0.8, 1],
              opacity: [0.4, 0.95, 0.5, 0.4],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 6 }}
            className="absolute -bottom-[8%] left-[15%] w-[45%] h-[45%] sm:w-[50%] sm:h-[50%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(244,63,94,0.22), rgba(251,146,60,0.10), transparent 70%)",
            }}
          />
          <motion.div
            animate={{
              x: [0, -40, 60, 0],
              y: [0, 60, -30, 0],
              scale: [1, 1.1, 0.9, 1],
              opacity: [0.4, 0.75, 0.3, 0.4],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 9 }}
            className="absolute bottom-[8%] right-[5%] w-[40%] h-[40%] sm:w-[45%] sm:h-[45%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.16), rgba(20,184,166,0.07), transparent 70%)",
            }}
          />
          <motion.div
            animate={{
              scale: [0.8, 1.05, 0.75, 0.8],
              opacity: [0.25, 0.7, 0.2, 0.25],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute top-[35%] left-[35%] w-[30%] h-[30%] sm:w-[35%] sm:h-[35%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(251,191,36,0.14), rgba(245,158,11,0.06), transparent 70%)",
            }}
          />
        </motion.div>
      </div>

      {/* ── cards ── */}
      <div className="absolute inset-0">
        {cards.map((c, i) => (
          <FloatingCard
            key={`${w < 768 ? "m" : w < 1024 ? "t" : "d"}-${i}`}
            delay={c.delay}
            size={cardSize}
            baseRotate={c.baseRotate}
            finalX={c.x}
            finalY={c.y}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* ── content ── */}
      <div className="relative z-20 container mx-auto px-5 md:px-6 pointer-events-none">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 sm:mb-8 md:mb-12"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Circle className="h-2 w-2 fill-rose-500" />
            </motion.div>
            <span className="text-xs sm:text-sm text-white/60 tracking-wide">
              {badge}
            </span>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                365 Виджет
              </span>
              <br />
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-rose-400"
                style={{ backgroundSize: "200% auto" }}
              >
                Календарь
              </motion.span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-md sm:max-w-lg md:max-w-xl mx-auto">
              Маркет виджетов в стиле отрывного календаря для iOS.
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="pointer-events-auto">
            <a
              href="#features"
              className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white/90 transition-all duration-500 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                boxShadow: [
                  "inset 1px 1px 1px -0.5px rgba(255,255,255,0.5)",
                  "inset -1px -1px 1px -0.5px rgba(255,255,255,0.3)",
                  "0 0 20px rgba(255,255,255,0.04)",
                ].join(", "),
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Скоро в App Store
            </a>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 inset-x-0 z-20 pointer-events-none flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────
   Features
   ─────────────────────────────────────────── */
const features = [
  {
    icon: Store,
    title: "Маркет виджетов",
    description:
      "Сотни уникальных дизайнов от сообщества. Находите, скачивайте и устанавливайте виджеты в пару касаний.",
  },
  {
    icon: Calendar,
    title: "Отрывной календарь",
    description:
      "Классический формат отрывного календаря, переосмысленный для iOS. Каждый день — новая страница.",
  },
  {
    icon: Palette,
    title: "Полная кастомизация",
    description:
      "Цвета, шрифты, фоны — настройте каждую деталь под свой стиль и домашний экран.",
  },
  {
    icon: Smartphone,
    title: "Нативный iOS",
    description:
      "Создан для iPhone и iPad. Поддержка всех размеров виджетов, StandBy и Live Activities.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-[#030303]">
      <div className="container mx-auto px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Всё для вашего экрана
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/35 max-w-lg mx-auto font-light">
            Превратите домашний экран в произведение искусства
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.25, 0.4, 0.25, 1] as const,
              }}
              className="group relative rounded-[24px] p-6 sm:p-7 overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* liquid glass inset glow */}
              <div
                className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: [
                    "inset 1px 1px 1px -0.5px rgba(255,255,255,0.4)",
                    "inset -1px -1px 1px -0.5px rgba(255,255,255,0.3)",
                    "inset 0 0 8px 4px rgba(255,255,255,0.04)",
                  ].join(", "),
                }}
              />
              <div className="relative z-10">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-4 sm:mb-5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" strokeWidth={1.5} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white/90 mb-2 sm:mb-3">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/35 leading-relaxed font-light">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   Preview
   ─────────────────────────────────────────── */
function PreviewSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#030303] overflow-hidden">
      {/* ambient blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[20%] w-[60%] h-[60%] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.12), rgba(59,130,246,0.06), transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Красота в деталях
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/35 max-w-lg mx-auto font-light">
            Каждый виджет — маленький шедевр на вашем экране
          </p>
        </motion.div>

        {/* phone mockups */}
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: i === 0 ? -6 : i === 2 ? 6 : 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: i === 0 ? -6 : i === 2 ? 6 : 0,
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.25, 0.4, 0.25, 1] as const,
              }}
              className="relative w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] aspect-[9/19.5] rounded-[20px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "inset 1px 1px 1px -0.5px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.03)",
              }}
            >
              {/* phone frame top notch */}
              <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-[35%] h-[2.5%] rounded-full bg-white/10" />

              {/* calendar widget placeholder */}
              <div className="absolute inset-x-3 sm:inset-x-4 top-[15%] aspect-square rounded-[12px] sm:rounded-[16px] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex flex-col items-center justify-center h-full gap-1">
                  <span className="text-white/20 text-[8px] sm:text-[10px] font-light uppercase tracking-wider">
                    {["Март", "Апрель", "Май"][i]}
                  </span>
                  <span className="text-white/50 text-2xl sm:text-3xl md:text-4xl font-bold">
                    {["31", "15", "7"][i]}
                  </span>
                  <span className="text-white/15 text-[7px] sm:text-[9px] font-light">
                    {["Понедельник", "Вторник", "Среда"][i]}
                  </span>
                </div>
              </div>

              {/* app icon rows */}
              <div className="absolute inset-x-3 sm:inset-x-4 bottom-[18%] flex flex-col gap-3 sm:gap-4">
                {[0, 1].map((row) => (
                  <div key={row} className="flex justify-between">
                    {[0, 1, 2, 3].map((col) => (
                      <div
                        key={col}
                        className="w-[18%] aspect-square rounded-[6px] sm:rounded-[8px]"
                        style={{
                          background: `rgba(255,255,255,${0.03 + Math.random() * 0.04})`,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* home bar */}
              <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[30%] h-[0.8%] rounded-full bg-white/15" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   Footer
   ─────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#030303] pt-12 pb-8 sm:pt-16 sm:pb-10 border-t border-white/[0.05]">
      <div className="container mx-auto px-5 md:px-6">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white/80 mb-2">
              365 Виджет
            </h3>
            <p className="text-xs sm:text-sm text-white/30 font-light">
              Маркет виджетов в стиле отрывного календаря для iOS
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm text-white/60 transition-all duration-300 hover:text-white/80"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Скоро в App Store
          </a>

          <div className="w-full max-w-xs h-px bg-white/[0.05]" />

          <p className="text-white/20 text-[10px] sm:text-xs">
            &copy; 2026 &ldquo;365 Виджет&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────────────────────
   Page
   ─────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <main className="bg-[#030303]">
      <HeroGeometric badge="Coming Soon" />
      <FeaturesSection />
      <PreviewSection />
      <Footer />
    </main>
  );
}
