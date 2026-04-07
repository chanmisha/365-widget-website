"use client";

import type { ReactNode } from "react";

interface GlowingShadowWrapperProps {
  children: ReactNode;
}

/**
 * Animated rainbow halo + orbiting glow around any rectangular content.
 * Adapted from aliimam/glowing-shadow on 21st.dev — square aspect, fills parent.
 */
export function GlowingShadowWrapper({ children }: GlowingShadowWrapperProps) {
  return (
    <>
      <style jsx>{`
        @property --hue {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-x {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-size {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-blur {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-scale {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }

        .glow-wrapper {
          --card-radius: 28px;
          --hue-speed: 1;
          --animation-speed: 6s;
          --interaction-speed: 0.55s;
          --bg-size: 1;
          --hue: 0;
          --rotate: 0;
          --glow-blur: 6;
          --glow-opacity: 0.85;
          --glow-scale: 1.6;

          position: relative;
          width: 100%;
          height: 100%;
          border-radius: var(--card-radius);
        }

        @media (min-width: 640px) {
          .glow-wrapper {
            --card-radius: 36px;
          }
        }

        /* Animated rainbow border halo behind the card */
        .glow-bg {
          position: absolute;
          inset: -3px;
          border-radius: calc(var(--card-radius) + 3px);
          z-index: 0;
          pointer-events: none;
          background: hsl(0deg 0% 12%)
            radial-gradient(
              35% 35% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
              hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 90%)
                calc(0% * var(--bg-size)),
              hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 75%)
                calc(20% * var(--bg-size)),
              hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 55%)
                calc(45% * var(--bg-size)),
              transparent 100%
            );
          animation: hue-animation var(--animation-speed) linear infinite,
            rotate-bg var(--animation-speed) linear infinite;
          transition: --bg-size var(--interaction-speed) ease;
          filter: blur(2px);
        }

        /* Orbiting glow sphere */
        .glow-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 22%;
          height: 22%;
          margin-left: -11%;
          margin-top: -11%;
          z-index: 0;
          pointer-events: none;
          animation: rotate var(--animation-speed) linear infinite;
          transform: rotateZ(calc(var(--rotate) * 1deg));
          transform-origin: center;
          border-radius: 50%;
        }

        .glow-orbit::after {
          content: "";
          display: block;
          position: relative;
          width: 130%;
          height: 130%;
          left: -15%;
          top: -65%;
          background: hsl(
            calc(var(--hue) * var(--hue-speed) * 1deg) 100% 60%
          );
          border-radius: 50%;
          filter: blur(calc(var(--glow-blur) * 6px));
          opacity: var(--glow-opacity);
          transform: scale(var(--glow-scale));
          animation: hue-animation var(--animation-speed) linear infinite;
        }

        /* Card content sits above the glow */
        .glow-content {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: var(--card-radius);
        }

        /* Hover intensifies the effect */
        .glow-wrapper:hover {
          --bg-size: 6;
          --glow-blur: 3;
          --glow-opacity: 1;
          --glow-scale: 2.2;
        }

        @keyframes rotate-bg {
          0% {
            --bg-x: 0;
            --bg-y: 0;
          }
          25% {
            --bg-x: 100;
            --bg-y: 0;
          }
          50% {
            --bg-x: 100;
            --bg-y: 100;
          }
          75% {
            --bg-x: 0;
            --bg-y: 100;
          }
          100% {
            --bg-x: 0;
            --bg-y: 0;
          }
        }

        @keyframes rotate {
          from {
            --rotate: 0;
          }
          to {
            --rotate: 360;
          }
        }

        @keyframes hue-animation {
          0% {
            --hue: 0;
          }
          100% {
            --hue: 360;
          }
        }
      `}</style>

      <div className="glow-wrapper">
        <div className="glow-bg" />
        <span className="glow-orbit" />
        <div className="glow-content">{children}</div>
      </div>
    </>
  );
}
