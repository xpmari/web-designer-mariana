"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Incrível", "Autêntica", "Única", "Magnética"],
    []
  );
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles, shouldReduceMotion]);

  return (
    <section className="relative w-full min-h-[82vh] flex items-center justify-center py-20 lg:py-32 overflow-hidden" id="inicio">
      <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#FF1493] shadow-[0_0_10px_#FF1493] animate-pulse" />
          <span>MS Studio · Web Design &amp; Digital Solutions</span>
        </div>

        {/* Título Principal com Palavras Animadas */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white font-['Sora'] leading-tight flex flex-col items-center gap-1 sm:gap-2">
            <span>Sua presença digital merece ser</span>
            <span className="relative flex justify-center items-center overflow-hidden h-[1.3em] min-w-[9ch] px-2">
              {titles.map((title, index) => (
                <motion.span
                  key={title}
                  className="absolute font-bold bg-gradient-to-r from-[#FF69B4] via-[#FF1493] to-[#D946EF] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,20,147,0.45)]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    shouldReduceMotion
                      ? { y: 0, opacity: index === 0 ? 1 : 0 }
                      : titleNumber === index
                      ? { y: 0, opacity: 1, filter: "blur(0px)" }
                      : { y: titleNumber > index ? -50 : 50, opacity: 0, filter: "blur(4px)" }
                  }
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>
        </div>

        {/* Texto de Apoio */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-['DM_Sans'] leading-relaxed max-w-2xl mx-auto mb-10">
          Crio sites, portfólios, landing pages e vitrines digitais sob medida para profissionais autônomos, criadores de conteúdo e pequenos negócios. Transforme sua presença online em uma experiência de alto padrão que gera autoridade imediata e atrai mais clientes.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
          <a
            href="#contato"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#FF1493] to-[#D946EF] shadow-[0_4px_20px_rgba(255,20,147,0.45)] hover:shadow-[0_8px_30px_rgba(255,20,147,0.7)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Vamos criar seu projeto</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>

          <a
            href="#servicos"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-white bg-white/5 border border-[#FF69B4]/35 hover:bg-[#FF1493]/15 hover:border-[#FF1493] hover:shadow-[0_4px_18px_rgba(255,20,147,0.3)] hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-md"
          >
            Explorar serviços
          </a>
        </div>

      </div>
    </section>
  );
}

export default AnimatedHero;

