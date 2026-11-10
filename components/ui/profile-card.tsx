"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProfileCardProps {
  name?: string
  role?: string
  description?: string
  image?: string
  statusText?: string
  isVerified?: boolean
  enableAnimations?: boolean
  className?: string
}

export function ProfileCard({
  name = "Mariana Sabatier",
  role = "Web Designer & Digital Solutions",
  description = "Desenvolvo experiências digitais personalizadas, unindo design, estratégia e funcionalidade para transformar ideias em projetos digitais.",
  image = "/assets/mariana.png",
  statusText = "Disponível para Projetos",
  isVerified = true,
  enableAnimations = true,
  className,
}: ProfileCardProps) {
  const [, setHovered] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimations && !shouldReduceMotion

  const imageVariants = {
    rest: { scale: 1 },
    hover: shouldAnimate ? { scale: 1.05 } : { scale: 1 },
  }

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.96,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  }

  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 9,
        stiffness: 220,
        mass: 0.7,
      },
    },
  }

  return (
    <motion.div
      data-slot="profile-hover-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={shouldAnimate ? { y: [0, -15, 0] } : undefined}
      transition={
        shouldAnimate
          ? {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }
          : undefined
      }
      whileHover={
        shouldAnimate
          ? {
              scale: 1.015,
              transition: {
                type: "spring",
                stiffness: 350,
                damping: 26,
                mass: 0.6,
              },
            }
          : {}
      }
      className={cn(
        "relative w-full max-w-[420px] h-[500px] rounded-[1.85rem] border border-white/10 text-white overflow-hidden shadow-2xl cursor-pointer group backdrop-blur-sm bg-[#090c14]",
        "hover:border-pink-500/40 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_-5px_rgba(255,105,180,0.35)]",
        className
      )}
    >
      {/* Full Cover Image */}
      <motion.img
        src={image}
        alt={`${name} — ${role}`}
        className="absolute inset-0 w-full h-full object-cover object-[center_20%] select-none transition-transform duration-500"
        variants={imageVariants}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
      />

      {/* Smooth Multi-Layer Dark Gradient Overlay (Glassmorphism) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090c14]/95 via-[#090c14]/50 via-[#090c14]/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#090c14]/90 via-[#090c14]/65 to-transparent backdrop-blur-[3px] pointer-events-none" />

      {/* Status Pill Badge */}
      {statusText && (
        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030712]/75 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-lg pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#FF69B4] shadow-[0_0_8px_#FF69B4]" />
          <span>{statusText}</span>
        </div>
      )}

      {/* Content */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 right-0 p-6 space-y-3 z-10"
      >
        {/* Role Subtitle */}
        {role && (
          <motion.div variants={itemVariants}>
            <span className="text-[0.76rem] font-bold tracking-wider uppercase text-[#FF69B4]">
              {role}
            </span>
          </motion.div>
        )}

        {/* Name and Verification Badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-2.5">
          <motion.h2
            className="text-2xl font-extrabold text-white tracking-tight"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.02,
                },
              },
            }}
          >
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h2>
          {isVerified && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-[#FF69B4] to-[#e63976] text-white shadow-[0_0_10px_rgba(255,105,180,0.6)]"
              whileHover={{
                scale: 1.15,
                rotate: 6,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
              title="Perfil Verificado"
              aria-label="Perfil Verificado"
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </motion.div>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-sm leading-relaxed pt-0.5"
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
