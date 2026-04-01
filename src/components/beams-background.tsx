"use client";

import { useEffect, useRef } from "react";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(w: number, h: number): Beam {
  return {
    x: Math.random() * w * 1.5 - w * 0.25,
    y: Math.random() * h * 1.5 - h * 0.25,
    width: 30 + Math.random() * 60,
    length: h * 2.5,
    angle: -35 + Math.random() * 10,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export function BeamsBackground({
  children,
  intensity = "strong",
}: {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);
  const opacityMap = { subtle: 0.7, medium: 0.85, strong: 1 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beamsRef.current = Array.from({ length: 30 }, () => createBeam(w * dpr, h * dpr));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";

      beamsRef.current.forEach((b, i) => {
        b.y -= b.speed;
        b.pulse += b.pulseSpeed;
        if (b.y + b.length < -100) {
          const col = i % 3;
          const sp = canvas.width / 3;
          b.y = canvas.height + 100;
          b.x = col * sp + sp / 2 + (Math.random() - 0.5) * sp * 0.5;
          b.width = 100 + Math.random() * 100;
          b.speed = 0.5 + Math.random() * 0.4;
          b.hue = 190 + (i * 70) / beamsRef.current.length;
          b.opacity = 0.2 + Math.random() * 0.1;
        }
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate((b.angle * Math.PI) / 180);
        const p = b.opacity * (0.8 + Math.sin(b.pulse) * 0.2) * opacityMap[intensity];
        const g = ctx.createLinearGradient(0, 0, 0, b.length);
        g.addColorStop(0, `hsla(${b.hue},85%,65%,0)`);
        g.addColorStop(0.1, `hsla(${b.hue},85%,65%,${p * 0.5})`);
        g.addColorStop(0.4, `hsla(${b.hue},85%,65%,${p})`);
        g.addColorStop(0.6, `hsla(${b.hue},85%,65%,${p})`);
        g.addColorStop(0.9, `hsla(${b.hue},85%,65%,${p * 0.5})`);
        g.addColorStop(1, `hsla(${b.hue},85%,65%,0)`);
        ctx.fillStyle = g;
        ctx.fillRect(-b.width / 2, 0, b.width, b.length);
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          filter: "blur(15px)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "16px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
