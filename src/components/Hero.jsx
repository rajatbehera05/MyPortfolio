import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import ConvergenceEngineVisual from './ConvergenceEngineVisual';

/**
 * Hero Section — First Viewport Redesign
 * 
 * Aesthetic: Apple Product Presentation × High-End Engineering Laboratory
 * Layout: Strong Asymmetrical Editorial Composition
 * 
 * Hierarchy:
 * 1. Technical Eyebrow: COMPUTER SCIENCE ENGINEER — SOFTWARE · EMBEDDED · AI
 * 2. Name Branding: Rajat Behera
 * 3. Main Statement: "I build intelligent systems where software, models, and physical hardware converge."
 * 4. Supporting Text: "Specializing in software engineering, connected IoT architectures, embedded computing, and applied intelligence."
 * 5. Actions: EXPLORE WORK → | SYSTEM SPECIFICATIONS
 * 6. Central Visual: The Convergence Engine (Software → Intelligence → Hardware → Physical World)
 * 7. Operational Status: OPERATIONAL // REAL-TIME
 */
export default function Hero({ onExplore, onAbout }) {
  return (
    <section
      id="home"
      aria-label="Rajat Behera Engineering Showcase"
      className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 px-6 sm:px-12 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ===================================================
              LEFT SIDE: EDITORIAL & IDENTITY (~48% Desktop)
              =================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-7 z-20">
            
            {/* 1. Technical Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 font-mono-tech text-[11px] tracking-[0.2em] text-[#71808D] uppercase font-medium"
            >
              <span className="text-[#AAB5C0]">COMPUTER SCIENCE ENGINEER</span>
              <span className="text-[#232D36]">/</span>
              <span className="text-[#16D9E8]">CSE • IoT • AI</span>
            </motion.div>

            {/* 2. Personal Brand / Name Signature */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[64px] font-bold tracking-[-0.035em] leading-[1.02] text-[#F4F7FA] font-sans-editorial"
            >
              Rajat Behera
            </motion.h1>

            {/* 3. Concise Main Statement & Supporting Narrative */}
            <div className="space-y-3.5 max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl sm:text-[23px] text-[#F4F7FA] font-medium leading-[1.38] tracking-[-0.015em] font-sans-editorial"
              >
                I build intelligent systems where software, models, and physical hardware converge.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14.5px] sm:text-[15.5px] text-[#AAB5C0] leading-relaxed font-normal"
              >
                Specializing in software engineering, connected IoT architectures, embedded computing, and applied intelligence.
              </motion.p>
            </div>

            {/* 4. Actions: Primary & Secondary */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              {/* Primary Action */}
              <button
                type="button"
                onClick={onExplore}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-[13px] font-mono-tech tracking-wider text-[#F4F7FA] bg-[#141A21] border border-[#232D36] hover:border-[#16D9E8]/60 hover:bg-[#1A222B] transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#16D9E8]"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="w-4 h-4 text-[#16D9E8] transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary Action */}
              <button
                type="button"
                onClick={onAbout}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg text-[13px] font-mono-tech tracking-wider text-[#AAB5C0] hover:text-[#F4F7FA] bg-transparent border border-[#1A222B] hover:border-[#232D36] hover:bg-[#0F1419] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#16D9E8]"
              >
                <Layers className="w-3.5 h-3.5 text-[#71808D]" />
                <span>SYSTEM SPECIFICATIONS</span>
              </button>
            </motion.div>

            {/* 5. Desktop Live Operational Status Badge */}
            <div className="hidden lg:block pt-3">
              <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-[#0F1419] border border-[#1A222B]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D9E8] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
                </span>

                <div className="flex items-center gap-2.5 font-mono-tech text-[11px] leading-none">
                  <span className="font-semibold text-[#F4F7FA] tracking-wider uppercase">
                    OPERATIONAL // REAL-TIME
                  </span>
                  <span className="text-[#232D36]">•</span>
                  <span className="text-[#71808D] font-normal tracking-normal font-sans-editorial text-[12px]">
                    Focus: Autonomous &amp; Connected Architectures
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Responsive Stacking: Visual followed by Status Badge */}
            <div className="block lg:hidden pt-4 space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ConvergenceEngineVisual />
              </motion.div>

              <div className="pt-2">
                <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-[#0F1419] border border-[#1A222B] w-full sm:w-auto">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D9E8] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 leading-tight">
                    <span className="font-mono-tech text-[10.5px] font-semibold text-[#F4F7FA] tracking-wider uppercase">
                      OPERATIONAL // REAL-TIME
                    </span>
                    <span className="hidden sm:inline text-[#232D36]">•</span>
                    <span className="text-[11.5px] text-[#71808D] font-normal">
                      Focus: Autonomous &amp; Connected Architectures
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ===================================================
              RIGHT SIDE: THE CONVERGENCE ENGINE (~52% Desktop)
              =================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 hidden lg:flex flex-col items-center justify-center relative"
          >
            <ConvergenceEngineVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
