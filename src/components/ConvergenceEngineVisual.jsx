import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Network, Radio } from 'lucide-react';

/**
 * ConvergenceEngineVisual
 * 
 * The Hero Centerpiece: "The Convergence Engine"
 * 
 * An original architectural system monolith representing the complete vertical engineering stack:
 * Software → Intelligence → Hardware → Physical World
 * 
 * Visual Philosophy:
 * - Apple product campaign elegance × high-end engineering architecture
 * - Structured vertical data spine connecting all four domains
 * - Interactive telemetry readout on tier inspection
 * - Controlled light, depth, and zero tacky gimmicks
 * - Fully accessible and respects prefers-reduced-motion
 */
export default function ConvergenceEngineVisual() {
  const [activeTier, setActiveTier] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const tiers = [
    {
      id: 'software',
      index: '01',
      title: 'SOFTWARE & CLOUD FABRIC',
      role: 'Application Architecture & Real-Time APIs',
      tech: 'React · Modern JavaScript · WebSockets · Distributed Node',
      spec: 'LATENCY < 1.8ms',
      icon: Terminal,
      color: '#F4F7FA',
      accent: '#16D9E8',
    },
    {
      id: 'intelligence',
      index: '02',
      title: 'NEURAL INFERENCE RUNTIME',
      role: 'Edge Models & Machine Learning',
      tech: 'Applied ML · Tensor Pipelines · Embedded Quantization',
      spec: 'EDGE INT8 OPTIMIZED',
      icon: Network,
      color: '#F4F7FA',
      accent: '#3B82F6',
    },
    {
      id: 'hardware',
      index: '03',
      title: 'SILICON CONTROLLER CORE',
      role: 'Microcontroller & Embedded Systems',
      tech: 'ESP32 · Arduino · Real-Time Interrupts · SPI / I2C Bus',
      spec: 'DUAL CORE 240MHz',
      icon: Cpu,
      color: '#F4F7FA',
      accent: '#16D9E8',
    },
    {
      id: 'physical',
      index: '04',
      title: 'PHYSICAL TRANSDUCTION',
      role: 'Environmental Telemetry & Actuation',
      tech: 'Sensor Arrays · Analog Transducers · Physical Actuators',
      spec: 'TELEMETRY SYNC',
      icon: Radio,
      color: '#F4F7FA',
      accent: '#3B82F6',
    },
  ];

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">
      
      {/* 1. Atmospheric Ambient Lighting Glow */}
      <div 
        aria-hidden="true"
        className="absolute -inset-4 sm:-inset-8 rounded-3xl pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 75% 65% at 50% 50%, rgba(22, 217, 232, 0.045) 0%, rgba(59, 130, 246, 0.035) 40%, transparent 75%)
          `
        }}
      />

      {/* 2. Top System Header Readout */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2 border-b border-[#1A222B] mb-4 font-mono-tech text-[10.5px] text-[#71808D]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D9E8] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
          </span>
          <span className="text-[#AAB5C0] font-medium tracking-wider">SYSTEM CONVERGENCE ENGINE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>PIPELINE:</span>
          <span className="text-[#16D9E8] font-medium tracking-wider">ACTIVE</span>
        </div>
      </div>

      {/* 3. The Central Architectural Monolith */}
      <div className="relative z-10 space-y-3">
        
        {/* Continuous Vertical Data Spine (Conduit connecting tiers) */}
        <div 
          aria-hidden="true" 
          className="absolute top-4 bottom-4 left-[28px] sm:left-[32px] w-[1px] bg-gradient-to-b from-[#16D9E8]/40 via-[#3B82F6]/30 to-[#16D9E8]/40 pointer-events-none z-0"
        >
          {/* Calm Traveling Data Packet */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{ y: ['0%', '100%'] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-3 -left-[2px] relative rounded-full bg-[#16D9E8] shadow-[0_0_8px_#16D9E8] opacity-75"
            />
          )}
        </div>

        {/* Four Architectural Tiers */}
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isHovered = activeTier === tier.id;
          const isDimmed = activeTier !== null && !isHovered;

          return (
            <div
              key={tier.id}
              onMouseEnter={() => setActiveTier(tier.id)}
              onMouseLeave={() => setActiveTier(null)}
              className={`relative pl-12 sm:pl-14 transition-all duration-300 cursor-pointer ${
                isDimmed ? 'opacity-45' : 'opacity-100'
              }`}
            >
              {/* Node Pivot Marker on Vertical Spine */}
              <div 
                className={`absolute left-[24px] sm:left-[28px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border transition-all duration-300 z-10 ${
                  isHovered 
                    ? 'bg-[#16D9E8] border-[#16D9E8] shadow-[0_0_10px_#16D9E8]' 
                    : 'bg-[#0F1419] border-[#232D36]'
                }`}
              />

              {/* Tier Content Surface */}
              <div
                className={`p-4 sm:p-5 rounded-lg border transition-all duration-300 ${
                  isHovered
                    ? 'bg-[#141A21] border-[#16D9E8]/50 shadow-[0_4px_24px_rgba(0,0,0,0.6)] -translate-y-0.5'
                    : 'bg-[#0F1419]/90 border-[#1A222B] hover:border-[#232D36]'
                }`}
              >
                {/* Header row: Index + Title + Spec Badge */}
                <div className="flex items-center justify-between gap-3 border-b border-[#1A222B]/70 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono-tech text-[11px] font-bold text-[#16D9E8]">
                      {tier.index}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-[#71808D]" />
                    <h3 className="font-mono-tech text-[11.5px] font-semibold tracking-wider text-[#F4F7FA] uppercase">
                      {tier.title}
                    </h3>
                  </div>

                  <span className="font-mono-tech text-[9.5px] font-medium tracking-wide text-[#71808D] bg-[#141A21] px-2 py-0.5 rounded border border-[#1A222B]">
                    {tier.spec}
                  </span>
                </div>

                {/* Role Description */}
                <div className="text-[13px] font-medium text-[#F4F7FA] tracking-tight mb-1">
                  {tier.role}
                </div>

                {/* Tech Stack Details */}
                <div className="font-mono-tech text-[11.5px] text-[#71808D] flex items-center justify-between">
                  <span>{tier.tech}</span>
                  {isHovered && (
                    <span className="text-[#16D9E8] text-[10px] tracking-widest uppercase animate-pulse hidden sm:inline">
                      INSPECTED
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* 4. Bottom System Status Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-t border-[#1A222B] mt-4 font-mono-tech text-[10px] text-[#71808D]">
        <div className="flex items-center gap-2">
          <span>VERTICAL STACK:</span>
          <span className="text-[#AAB5C0]">FULL CONVERGENCE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>ARCHITECTURE:</span>
          <span className="text-[#AAB5C0]">EDGE · CLOUD · REAL-TIME</span>
        </div>
      </div>

    </div>
  );
}
