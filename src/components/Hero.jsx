import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import HeroSystemVisual from './HeroSystemVisual';

/**
 * Hero Section
 * 
 * Strict Constitution & Enhancement Guidelines:
 * - Sequential controlled entrance timing:
 *   0.2s: SYS_ID status panel
 *   0.4s: RAJAT BEHERA
 *   0.6s: CSE • IoT • AI
 *   0.8s: Description
 *   1.0s: Technology modules sequentially
 *   1.2s: EXPLORE SYSTEM CTA
 * - Right column: HeroSystemVisual with RB / CORE abstract network
 * - Module hover highlights corresponding network relationship
 * - Graphite / Midnight palette with electric cyan #16D9E8
 */
export default function Hero({ onExplore, theme = 'light' }) {
  const [activeModule, setActiveModule] = useState(null);

  const techModules = [
    {
      id: 'ARCHITECTURE',
      label: 'ARCHITECTURE',
      val: 'Silicon-to-Cloud',
      flow: 'DEVICE → CLOUD',
    },
    {
      id: 'REAL-TIME CORE',
      label: 'REAL-TIME CORE',
      val: 'FreeRTOS / C++',
      flow: 'DEVICE → PROCESSING → RESPONSE',
    },
    {
      id: 'PROTOCOLS',
      label: 'PROTOCOLS',
      val: 'MQTT • I2C • BLE',
      flow: 'ESP32 → MQTT → API → DATA',
    },
    {
      id: 'EDGE INFERENCE',
      label: 'EDGE INFERENCE',
      val: 'TinyML / PyTorch',
      flow: 'DEVICE → EDGE AI → RESULT',
    },
  ];

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[calc(90vh-4rem)] max-w-[1280px] mx-auto px-6 sm:px-10 flex flex-col justify-center py-12 sm:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Typography, Status, Copy, Modules, and CTA */}
        <div className="lg:col-span-7 space-y-7 z-10">
          
          {/* 0.2s: SYS_ID Status Panel — High-contrast dark obsidian hardware badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-slate-800 bg-[#0F172A] text-[12px] font-mono-tech tracking-wider text-slate-300 shadow-md"
          >
            {/* Pulsing cyan hardware status LED */}
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-node-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="uppercase text-white font-semibold">
              SYS_ID: RB_NODE_01
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-medium">
              STATE: SYNCHRONIZED
            </span>
          </motion.div>

          {/* 0.4s: RAJAT BEHERA */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[var(--text-primary)] leading-[0.98]"
          >
            RAJAT BEHERA
          </motion.h1>

          {/* 0.6s: CSE • IoT • AI */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-lg sm:text-2xl font-mono-tech text-[var(--accent-cyan)] font-semibold tracking-wider"
          >
            <span>CSE</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span>IoT</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span>AI</span>
          </motion.div>

          {/* 0.8s: Positioning Statement */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl"
          >
            Building intelligent systems that connect software with the real world. 
            Bridging firmware, distributed telemetry networks, and edge AI to make computing tangible beyond the screen.
          </motion.p>

          {/* 1.0s: Technology Information Modules (Sequential entrance + Hover reactivity) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 font-mono-tech text-[11px] sm:text-[12px]">
            {techModules.map((mod, index) => {
              const isHovered = activeModule === mod.id;
              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.0 + index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setActiveModule(mod.id)}
                  onMouseLeave={() => setActiveModule(null)}
                  onFocus={() => setActiveModule(mod.id)}
                  onBlur={() => setActiveModule(null)}
                  tabIndex={0}
                  className={`p-2.5 rounded border transition-all duration-200 cursor-pointer focus:outline-none ${
                    isHovered
                      ? 'border-[var(--accent-cyan)] bg-[var(--bg-system-alt)] shadow-[0_0_12px_rgba(2,132,199,0.12)] dark:bg-[#181F27]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan-border)] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)] uppercase text-[10px] font-medium">
                      {mod.label}
                    </span>
                    {isHovered && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-ping" />
                    )}
                  </div>
                  <div className="text-[var(--text-primary)] font-semibold mt-0.5 truncate">
                    {mod.val}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 1.2s: EXPLORE SYSTEM Primary CTA — High contrast obsidian button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2"
          >
            <button
              type="button"
              onClick={onExplore}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded text-[13px] font-mono-tech font-bold tracking-wider uppercase text-white bg-[#0F172A] hover:bg-[#1E293B] dark:bg-[var(--accent-cyan)] dark:text-[#0E1217] active:scale-[0.99] transition-all duration-200 shadow-[0_4px_16px_rgba(15,23,42,0.18)] dark:shadow-[0_2px_10px_rgba(22,217,232,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] cursor-pointer"
            >
              <span>EXPLORE SYSTEM</span>
              <ArrowDown className="w-4 h-4 text-cyan-400 dark:text-[#0E1217] transition-transform duration-200 group-hover:translate-y-1" />
            </button>
          </motion.div>

        </div>

        {/* Right Column: Interactive Abstract System Visualization (RB / CORE) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full flex items-center justify-center relative"
        >
          <HeroSystemVisual activeModule={activeModule} theme={theme} />
        </motion.div>

      </div>
    </section>
  );
}
