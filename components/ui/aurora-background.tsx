"use client"
import React from "react"
import { motion, useReducedMotion } from "framer-motion"

export interface AuroraBackgroundProps {
  /** Extra wrapper classes */
  className?: string
  /** Content to render on top of the background */
  children?: React.ReactNode
  /** Number of “star” points */
  starCount?: number
  /** Two CSS-variable backed colors for the radial overlays */
  gradientColors?: [string, string]
  /** Pulse animation duration in seconds */
  pulseDuration?: number
  /** ARIA label for the animated background */
  ariaLabel?: string
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className = "",
  children,
  starCount = 65,
  gradientColors = [
    "rgba(255, 20, 147, 0.22)", // Pink Neon
    "rgba(112, 0, 61, 0.28)",  // Ameixa escuro (Plum)
  ],
  pulseDuration = 10,
  ariaLabel = "Fundo animado Aurora com estrelas",
}) => {
  const [colorA, colorB] = gradientColors
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`relative flex flex-col w-full min-h-screen items-center justify-center bg-[#030004] text-slate-50 overflow-hidden ${className}`}
    >
      {/* Background layers (hidden from screen readers) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Pulsing radial gradients */}
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 65% 50% at 20% 25%, ${colorA} 0%, transparent 70%),
              radial-gradient(ellipse 70% 60% at 85% 75%, ${colorB} 0%, transparent 70%),
              radial-gradient(circle at 50% 50%, rgba(217, 70, 239, 0.16) 0%, transparent 65%)
            `,
            backgroundSize: "100% 100%",
            animation: shouldReduceMotion ? "none" : `auroraPulse ${pulseDuration}s ease-in-out infinite alternate`,
          }}
        />

        {/* Blurred color blobs (Pink neon, Magenta, Ameixa, Rosa) */}
        <div className="absolute inset-0 mix-blend-screen overflow-hidden">
          {/* Blob 1: Pink Neon (máx 50px de blur até 768px) */}
          <motion.div
            className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] bg-[#FF1493] rounded-full filter blur-[50px] md:blur-[100px] opacity-35"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [-50, 50, -40],
                    y: [-20, 40, 30],
                    scale: [1, 1.2, 0.95],
                  }
            }
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />

          {/* Blob 2: Magenta Vibrante (máx 50px de blur até 768px) */}
          <motion.div
            className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] max-w-[820px] max-h-[820px] bg-[#D946EF] rounded-full filter blur-[50px] md:blur-[100px] opacity-32"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [50, -50, 30],
                    y: [30, -40, -20],
                    scale: [1, 1.25, 0.92],
                  }
            }
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />

          {/* Blob 3: Ameixa Escuro Profundo (Oculto até 768px) */}
          <motion.div
            className="hidden md:block absolute top-[25%] left-[20%] w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] bg-[#70003D] rounded-full filter blur-[95px] opacity-40"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [20, -30, 20],
                    y: [-30, 30, 20],
                    rotate: [0, 90, 180],
                    scale: [1, 1.15, 0.9],
                  }
            }
            transition={{
              duration: 50,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />

          {/* Blob 4: Rosa Radiante (Oculto até 768px) */}
          <motion.div
            className="hidden md:block absolute top-[8%] right-[18%] w-[45vw] h-[45vw] max-w-[540px] max-h-[540px] bg-[#FF69B4] rounded-full filter blur-[95px] opacity-26"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [-20, 40, -20],
                    y: [20, -30, -20],
                    scale: [0.95, 1.15, 1],
                  }
            }
            transition={{
              duration: 36,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Twinkling stars */}
        {Array.from({ length: starCount }).map((_, i) => {
          const rand = Math.random()
          const size = rand > 0.85 ? 2.2 : rand > 0.45 ? 1.5 : 1
          const posX = `${(Math.random() * 100).toFixed(2)}%`
          const posY = `${(Math.random() * 100).toFixed(2)}%`
          const duration = Math.random() * 3.2 + 2.4
          const delay = Math.random() * 5
          const maxOpacity = Math.random() * 0.45 + 0.35

          return (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full shadow-[0_0_3px_rgba(255,255,255,0.85)]"
              style={{
                left: posX,
                top: posY,
                width: `${size}px`,
                height: `${size}px`,
              }}
              initial={{ opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.3 }
                  : {
                      opacity: [0, maxOpacity, 0],
                      scale: [0.7, 1.2, 0.7],
                    }
              }
              transition={
                shouldReduceMotion
                  ? {}
                  : {
                      duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay,
                    }
              }
            />
          )
        })}

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_45%,rgba(3,0,4,0.55)_100%)] pointer-events-none" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}

export default AuroraBackground

