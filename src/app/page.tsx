"use client";

import { useRef, useCallback, useState } from "react";
import { Calendar, Palette, Store, Smartphone } from "lucide-react";
import { BeamsBackground } from "@/components/beams-background";

const features = [
  {
    icon: Store,
    title: "Маркет виджетов",
    desc: "Коллекция дизайнов на каждый вкус и настроение",
  },
  {
    icon: Calendar,
    title: "Отрывной календарь",
    desc: "Классический формат, переосмысленный для iOS",
  },
  {
    icon: Palette,
    title: "Новые дизайны",
    desc: "Регулярные обновления с новыми стилями виджетов",
  },
  {
    icon: Smartphone,
    title: "Нативный iOS",
    desc: "Виджет для домашнего экрана iPhone",
  },
];

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: [
    "inset 1px 1px 1px -0.5px rgba(255,255,255,0.5)",
    "inset -1px -1px 1px -0.5px rgba(255,255,255,0.3)",
    "inset 0 0 8px 4px rgba(255,255,255,0.04)",
    "0 0 40px rgba(255,255,255,0.03)",
  ].join(", "),
  backdropFilter: "blur(40px) saturate(1.5)",
  WebkitBackdropFilter: "blur(40px) saturate(1.5)",
};

export default function LandingPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const animating = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (animating.current) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      const flipBase = flipped ? 180 : 0;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${flipBase + rotateY}deg)`;
      card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
      if (!hovered) setHovered(true);
    },
    [flipped, hovered]
  );

  const handleMouseLeave = useCallback(() => {
    if (animating.current) return;
    const card = cardRef.current;
    if (!card) return;
    const flipBase = flipped ? 180 : 0;
    card.style.transform = `rotateX(0deg) rotateY(${flipBase}deg)`;
    setHovered(false);
  }, [flipped]);

  const handleClick = useCallback(() => {
    if (animating.current) return;
    animating.current = true;
    const card = cardRef.current;
    if (!card) return;

    const newFlipped = !flipped;
    const target = newFlipped ? 180 : 0;

    // set transition, then flip
    card.style.transition = "transform 0.7s ease-in-out";
    card.style.transform = `rotateX(0deg) rotateY(${target}deg)`;

    setFlipped(newFlipped);

    // after animation, remove transition so mousemove is instant
    setTimeout(() => {
      card.style.transition = "";
      animating.current = false;
    }, 700);
  }, [flipped]);

  return (
    <BeamsBackground intensity="medium">
      {/* perspective + sizing wrapper */}
      <div
        style={{
          perspective: 1200,
          width: "min(88vw, 80vh, 32rem)",
          height: "min(88vw, 80vh, 32rem)",
        }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="relative w-full h-full cursor-pointer"
          style={{
            "--glow-x": "50%",
            "--glow-y": "50%",
            transformStyle: "preserve-3d",
          } as React.CSSProperties}
        >
          {/* ═══ FRONT ═══ */}
          <div
            className="absolute inset-0 rounded-[28px] sm:rounded-[36px] overflow-hidden flex items-center"
            style={{
              ...glassStyle,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: "radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255,255,255,0.12) 0%, transparent 60%)",
                opacity: hovered && !flipped ? 1 : 0,
              }}
            />

            <div className="relative z-10 px-5 sm:px-8 md:px-10 w-full">
              <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs text-white/50 tracking-wide"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  Coming Soon
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center tracking-tight leading-[1.15] mb-2 sm:mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  365 Виджет
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-rose-400">
                  Календарь
                </span>
              </h1>

              <p className="text-center text-xs sm:text-sm md:text-base text-white/35 font-light mb-5 sm:mb-8 max-w-xs mx-auto">
                Маркет виджетов в стиле отрывного календаря для iOS.
              </p>

              <p className="text-center text-[11px] sm:text-sm text-white/45 font-light inline-flex items-center justify-center gap-2 w-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Скоро в App Store
              </p>

              <p className="text-center text-white/15 text-[9px] sm:text-[10px] mt-5 sm:mt-8">
                &copy; 2026 &ldquo;365 Виджет&rdquo;
              </p>
            </div>
          </div>

          {/* ═══ BACK ═══ */}
          <div
            className="absolute inset-0 rounded-[28px] sm:rounded-[36px] overflow-hidden flex items-center"
            style={{
              ...glassStyle,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: "radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255,255,255,0.12) 0%, transparent 60%)",
                opacity: hovered && flipped ? 1 : 0,
              }}
            />

            <div className="relative z-10 px-5 sm:px-8 md:px-10 w-full">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white/80 mb-5 sm:mb-8">
                Возможности
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-5 sm:mb-8">
                {features.map((f) => (
                  <div key={f.title} className="flex flex-col gap-1.5 sm:gap-2">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <f.icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white/50" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[11px] sm:text-sm font-semibold text-white/80">{f.title}</h3>
                    <p className="text-[10px] sm:text-xs text-white/30 font-light leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-center text-white/20 text-[10px] sm:text-[11px]">
                Нажмите, чтобы вернуться
              </p>
            </div>
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
}
