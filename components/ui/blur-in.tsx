"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BlurInProps {
  /** Text string to animate (or use children) */
  word?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
  delay?: number;
  /** Whether animation should run once when entering viewport */
  once?: boolean;
}

export const BlurIn: React.FC<BlurInProps> = ({
  word,
  children,
  className,
  variant,
  duration = 1,
  delay = 0,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  if (shouldReduceMotion) {
    return (
      <h2 className={cn("font-display text-4xl font-bold tracking-[-0.02em]", className)}>
        {word ?? children}
      </h2>
    );
  }

  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      variants={combinedVariants}
      className={cn(
        "font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-5xl",
        className
      )}
    >
      {word ?? children}
    </motion.h2>
  );
};

export default BlurIn;

