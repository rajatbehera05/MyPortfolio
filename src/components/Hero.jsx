import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Sparkles } from 'lucide-react';
import HeroSystemArchitecture from './HeroSystemArchitecture';

/**
 * Hero Section — Refined Home Viewport
 * 
 * Technical profile:
 * - CSE engineer working across software development, connected/IoT systems,
 *   embedded technology, and expanding into AI/ML.
 * 
 * Hierarchy:
 * - Technical label: CSE · SOFTWARE · IoT · AI
 * - Name: Rajat (dark) Behera (blue)
 * - Headline: I build intelligent systems that connect software, data and the physical world.
 * - Description: Software engineering, connected systems, embedded technology and emerging AI.
 * - Buttons: EXPLORE MY WORK → | ABOUT ME
 * - Status Card: ● CURRENTLY BUILDING | Smarter systems for a connected future
 * - Right side: Connected System Architecture (Software → API → ESP32 → Sensors → Physical World)
 *   plus 3 honest technical system cards (Software, Connected Systems, Emerging AI).
 * 
 * Mobile order:
 * Header → label → name → headline → description → buttons → status card → technical illustration → information cards
 */
export default function Hero({ onExplore, onAbout }) {
  const infoCards = [
    {
      id: 'software',
      category: 'SOFTWARE',
      role: 'Full-Stack Development',
      primaryStack: 'React · JavaScript · Node.js',
      secondaryStack: 'REST APIs · Modern Web Applications',
      icon: Code2,
    },
    {
      id: 'connected-systems',
      category: 'CONNECTED SYSTEMS',
      role: 'IoT / Embedded',
      primaryStack: 'ESP32 · Arduino · Sensors',
      secondaryStack: 'Real-Time Hardware Integration',
      icon: Cpu,
    },
    {
      id: 'emerging-ai',
      category: 'EMERGING AI',
      role: 'Machine Learning',
      primaryStack: 'ML Fundamentals · Data',
      secondaryStack: 'Currently Exploring AI / ML',
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen w-full flex items-center justify-center pt-22 pb-14 sm:pt-26 sm:pb-18 px-6 sm:px-10 overflow-hidden"
    >
      {/* Background Subtle Technical Blueprint Pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 faint-technical-grid pointer-events-none opacity-90"
      />
      
      {/* Large faint circular technical geometry behind right illustration */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-16 w-[560px] h-[560px] rounded-full border border-[#DCE5F0]/60 pointer-events-none hidden md:block"
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 -translate-y-1/2 right-12 lg:right-28 w-[420px] h-[420px] rounded-full border border-[#DCE5F0]/40 pointer-events-none hidden md:block"
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* ===================================================
              LEFT SIDE CONTENT (~45% on Desktop)
              =================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-20">
            
            {/* 1. Technical Label above heading (Monospaced style) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 font-mono-tech text-[12px] tracking-[0.2em] text-[#667085] uppercase font-semibold"
            >
              <span>CSE</span>
              <span className="text-[#DCE5F0]">·</span>
              <span className="text-[#146BFF]">SOFTWARE</span>
              <span className="text-[#DCE5F0]">·</span>
              <span>IoT</span>
              <span className="text-[#DCE5F0]">·</span>
              <span className="text-[#146BFF]">AI</span>
            </motion.div>

            {/* 2. Main Heading: Rajat Behera */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold tracking-[-0.035em] leading-[1.05] text-[#111827]"
            >
              Rajat <span className="text-[#146BFF]">Behera</span>
            </motion.h1>

            {/* 3. Positioning Statement & Supporting Description */}
            <div className="space-y-3 max-w-xl">
              {/* Main positioning statement */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-[21px] text-[#111827] font-semibold leading-[1.4] tracking-[-0.015em]"
              >
                I build intelligent systems that connect software, data and the physical world.
              </motion.p>

              {/* Supporting description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14.5px] sm:text-[15.5px] text-[#667085] leading-relaxed font-normal"
              >
                Software engineering, connected systems, embedded technology and emerging AI.
              </motion.p>
            </div>

            {/* 4. CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              {/* Primary button */}
              <button
                type="button"
                onClick={onExplore}
                className="group inline-flex items-center gap-2.5 px-6 py-3.2 rounded-lg text-[13.5px] font-semibold tracking-tight text-white bg-[#146BFF] hover:bg-[#146BFF]/95 hover:shadow-[0_4px_16px_rgba(20,107,255,0.22)] active:scale-[0.99] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146BFF]"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary button */}
              <button
                type="button"
                onClick={onAbout}
                className="inline-flex items-center justify-center px-5 py-3.2 rounded-lg text-[13.5px] font-semibold tracking-tight text-[#111827] bg-white border border-[#DCE5F0] hover:border-[#146BFF]/40 hover:bg-[#EEF5FF]/40 hover:shadow-[0_2px_8px_rgba(17,24,39,0.03)] active:scale-[0.99] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146BFF]"
              >
                <span>ABOUT ME</span>
              </button>
            </motion.div>

            {/* 5. Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2"
            >
              <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-white/95 border border-[#DCE5F0] shadow-[0_1px_4px_rgba(17,24,39,0.02)]">
                {/* Blue status dot with restrained pulse */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#146BFF] opacity-60" />
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

            {/* Mobile-Only Stacking Order: Visual and then Information Cards */}
            <div className="block lg:hidden pt-4 space-y-6">
              {/* Technical illustration on mobile */}
              <HeroSystemArchitecture showCardsInline={false} />

              {/* Information Cards on mobile */}
              <div className="space-y-3 pt-1">
                {infoCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.id}
                      className="product-card p-4 bg-white border border-[#DCE5F0] rounded-xl shadow-xs"
                    >
                      <div className="flex items-center justify-between border-b border-[#DCE5F0]/70 pb-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-[#146BFF]" />
                          <span className="font-mono-tech text-[10.5px] font-bold tracking-wider uppercase text-[#111827]">
                            {card.category}
                          </span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#146BFF]" />
                      </div>
                      <h4 className="text-[13px] font-bold text-[#111827]">
                        {card.role}
                      </h4>
                      <p className="font-mono-tech text-[11.5px] text-[#146BFF] font-medium mt-1">
                        {card.primaryStack}
                      </p>
                      <div className="pt-2 mt-2 border-t border-[#EEF5FF] text-[11px] text-[#667085]">
                        {card.secondaryStack}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ===================================================
              RIGHT SIDE VISUAL (~55% on Desktop)
              Technical Conceptual System Architecture & Information Cards
              =================================================== */}
          <div className="lg:col-span-7 hidden lg:flex flex-col items-center justify-center relative">
            <HeroSystemArchitecture showCardsInline={true} />
          </div>

        </div>
      </div>
    </section>
  );
}
