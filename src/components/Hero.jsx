import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroCinematicVisual from './HeroCinematicVisual';

/**
 * Hero Section — First Viewport
 * 
 * Visual Direction:
 * LIGHT + FUTURISTIC + PREMIUM + ENGINEERING
 * 
 * Animation timing (strict requirement):
 * 0.0s: hero background appears
 * 0.2s: navigation fades in (handled in Navbar)
 * 0.3s: CSE • IoT • AI appears
 * 0.45s: Rajat Behera appears ("Rajat" dark, "Behera" restrained blue)
 * 0.65s: main statement appears
 * 0.8s: supporting text appears
 * 1.0s: CTA buttons appear
 * 1.15s: CURRENTLY BUILDING indicator appears
 * 
 * Mobile ordering:
 * CSE • IoT • AI -> Rajat Behera -> description -> CTA -> visual -> currently building
 */
export default function Hero({ onExplore, onAbout }) {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 px-6 sm:px-10 overflow-hidden"
    >
      {/* Background Subtle Technical Atmosphere */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 faint-technical-grid pointer-events-none opacity-85"
      />
      
      {/* Subtle light ambient glow on top right and bottom left */}
      <div 
        aria-hidden="true" 
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#146BFF]/[0.025] blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#EEF5FF]/80 blur-3xl pointer-events-none" 
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ===================================================
              LEFT SIDE CONTENT (~45% on Desktop)
              =================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-7 z-20">
            
            {/* 0.3s: Eyebrow — CSE  •  IoT  •  AI (order-1 on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 flex items-center gap-2.5 font-mono-tech text-[11.5px] sm:text-[12.5px] tracking-[0.22em] text-[#667085] uppercase font-medium"
            >
              <span className="text-[#146BFF] font-semibold">CSE</span>
              <span className="text-[#DCE5F0]">•</span>
              <span className="text-[#111827] font-semibold">IoT</span>
              <span className="text-[#DCE5F0]">•</span>
              <span className="text-[#146BFF] font-semibold">AI</span>
            </motion.div>

            {/* 0.45s: Main Heading — Rajat Behera (order-2 on mobile) */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 text-4xl sm:text-5xl lg:text-[62px] font-extrabold tracking-[-0.035em] leading-[1.04] text-[#111827]"
            >
              Rajat <span className="text-[#146BFF] font-extrabold">Behera</span>
            </motion.h1>

            {/* 0.65s & 0.8s: Statements (order-3 on mobile) */}
            <div className="order-3 space-y-3 pt-0.5 max-w-xl">
              {/* 0.65s: Primary Statement */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-[21px] text-[#111827] font-semibold leading-[1.38] tracking-[-0.015em]"
              >
                I build intelligent systems that connect software, data and the physical world.
              </motion.p>

              {/* 0.8s: Supporting Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14.5px] sm:text-[15.5px] text-[#667085] leading-relaxed font-normal"
              >
                Software engineering, connected systems, embedded technology and emerging AI.
              </motion.p>
            </div>

            {/* 1.0s: CTA Buttons (order-4 on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="order-4 flex flex-wrap items-center gap-3.5 pt-2"
            >
              {/* Primary CTA */}
              <button
                type="button"
                onClick={onExplore}
                className="group inline-flex items-center gap-2.5 px-6 py-3.2 rounded-lg text-[13.5px] font-semibold tracking-tight text-white bg-[#146BFF] hover:bg-[#146BFF]/95 hover:shadow-[0_6px_20px_rgba(20,107,255,0.22)] active:scale-[0.99] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146BFF]"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={onAbout}
                className="inline-flex items-center justify-center px-5 py-3.2 rounded-lg text-[13.5px] font-semibold tracking-tight text-[#111827] bg-white border border-[#DCE5F0] hover:border-[#146BFF]/40 hover:bg-[#EEF5FF]/50 hover:shadow-[0_2px_8px_rgba(17,24,39,0.04)] active:scale-[0.99] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146BFF]"
              >
                <span>ABOUT ME</span>
              </button>
            </motion.div>

            {/* Mobile-Only Visual Placement: In mobile order, visual sits between CTA and currently building */}
            <div className="order-5 block lg:hidden pt-4 pb-2">
              <HeroCinematicVisual />
            </div>

            {/* 1.15s: CURRENTLY BUILDING Indicator (order-6 on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="order-6 pt-3 sm:pt-4"
            >
              <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-white/90 border border-[#DCE5F0] shadow-[0_1px_4px_rgba(17,24,39,0.02)]">
                {/* Understated subtle pulse dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#146BFF] opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#146BFF]" />
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 leading-tight">
                  <span className="font-mono-tech text-[10.5px] font-bold text-[#111827] tracking-wider uppercase">
                    CURRENTLY BUILDING
                  </span>
                  <span className="hidden sm:inline text-[#DCE5F0]">•</span>
                  <span className="text-[12px] text-[#667085] font-medium">
                    Smarter systems for a connected future
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ===================================================
              RIGHT SIDE VISUAL (~55% on Desktop)
              =================================================== */}
          <div className="lg:col-span-7 hidden lg:flex items-center justify-center relative lg:-ml-6">
            <HeroCinematicVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
