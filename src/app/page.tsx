"use client";

import { Calendar, Palette, Store, Smartphone } from "lucide-react";

const features = [
  {
    icon: Store,
    title: "Маркет виджетов",
    desc: "Сотни уникальных дизайнов от сообщества",
  },
  {
    icon: Calendar,
    title: "Отрывной календарь",
    desc: "Классический формат, переосмысленный для iOS",
  },
  {
    icon: Palette,
    title: "Кастомизация",
    desc: "Цвета, шрифты, фоны — всё под ваш стиль",
  },
  {
    icon: Smartphone,
    title: "Нативный iOS",
    desc: "Все размеры виджетов, StandBy, Live Activities",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] bg-[#030303] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)" }}
        />
        <div
          className="absolute top-[10%] -right-[15%] w-[50%] h-[50%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.14), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(244,63,94,0.14), transparent 70%)" }}
        />
      </div>

      {/* single card */}
      <div
        className="relative w-full max-w-lg rounded-[32px] sm:rounded-[40px] overflow-hidden"
        style={{
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
        }}
      >
        {/* top reflection */}
        <div
          className="absolute inset-x-0 top-0 h-[30%] pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
            borderRadius: "32px 32px 0 0",
          }}
        />
        {/* specular edge */}
        <div
          className="absolute inset-x-[10%] top-[0.5px] h-[1px] rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 75%, transparent)",
          }}
        />

        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14">
          {/* badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs text-white/50 tracking-wide"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
              Coming Soon
            </span>
          </div>

          {/* title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center tracking-tight leading-[1.15] mb-3 sm:mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
              365 Виджет
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-rose-400">
              Календарь
            </span>
          </h1>

          <p className="text-center text-sm sm:text-base text-white/35 font-light mb-8 sm:mb-10 max-w-sm mx-auto">
            Маркет виджетов в стиле отрывного календаря для iOS.
          </p>

          {/* divider */}
          <div className="w-12 h-px mx-auto mb-8 sm:mb-10" style={{ background: "rgba(255,255,255,0.08)" }} />

          {/* features */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col gap-2">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <f.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/50" strokeWidth={1.5} />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-white/80">{f.title}</h3>
                <p className="text-[11px] sm:text-xs text-white/30 font-light leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white/80 transition-all duration-300 hover:scale-105 hover:text-white/95"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "inset 1px 1px 1px -0.5px rgba(255,255,255,0.4), 0 0 16px rgba(255,255,255,0.03)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Скоро в App Store
            </a>
          </div>

          {/* copyright */}
          <p className="text-center text-white/15 text-[10px] mt-8 sm:mt-10">
            &copy; 2026 &ldquo;365 Виджет&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
