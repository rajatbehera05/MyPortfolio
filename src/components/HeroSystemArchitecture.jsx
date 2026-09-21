import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Sparkles } from 'lucide-react';

/**
 * HeroSystemArchitecture
 * 
 * Conceptual Connected-System Architecture Visual & Technical Information Modules
 * 
 * Flow represented:
 * Software → Backend / API → ESP32 / Embedded System → Sensors → Physical World
 * 
 * 3 Real Information Cards (No fake technologies or benchmarks):
 * - CARD 1: SOFTWARE | Full-Stack Development | React · JavaScript · Node.js | REST APIs · Modern Web Applications
 * - CARD 2: CONNECTED SYSTEMS | IoT / Embedded | ESP32 · Arduino · Sensors | Real-Time Hardware Integration
 * - CARD 3: EMERGING AI | Machine Learning | ML Fundamentals · Data | Currently Exploring AI / ML
 */
export default function HeroSystemArchitecture({ showCardsInline = true }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const infoCards = [
    {
      id: 'software',
      category: 'SOFTWARE',
      role: 'Full-Stack Development',
      primaryStack: 'React · JavaScript · Node.js',
      secondaryStack: 'REST APIs · Modern Web Applications',
      icon: Code2,
      accent: '#146BFF',
    },
    {
      id: 'connected-systems',
      category: 'CONNECTED SYSTEMS',
      role: 'IoT / Embedded',
      primaryStack: 'ESP32 · Arduino · Sensors',
      secondaryStack: 'Real-Time Hardware Integration',
      icon: Cpu,
      accent: '#146BFF',
    },
    {
      id: 'emerging-ai',
      category: 'EMERGING AI',
      role: 'Machine Learning',
      primaryStack: 'ML Fundamentals · Data',
      secondaryStack: 'Currently Exploring AI / ML',
      icon: Sparkles,
      accent: '#4DA3FF',
    },
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      
      {/* ===================================================
          1. CONCEPTUAL CONNECTED-SYSTEM ARCHITECTURE VISUAL
          =================================================== */}
      <div className="relative w-full max-w-[560px] aspect-[1.15/1] sm:aspect-[1.25/1] flex items-center justify-center select-none">
        
        {/* Soft background blue aura */}
        <div 
          aria-hidden="true"
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#EEF5FF]/80 via-[#146BFF]/[0.03] to-transparent blur-2xl pointer-events-none" 
        />

        <svg
          viewBox="0 0 540 460"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="flowLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#146BFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#4DA3FF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#146BFF" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="subtleGridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DCE5F0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#DCE5F0" stopOpacity="0.2" />
            </linearGradient>

            <radialGradient id="radarPingGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#146BFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#146BFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ===================================================
              BACKGROUND TECHNICAL BLUEPRINT GEOMETRY
              =================================================== */}
          <g className="opacity-40">
            {/* Large faint circular technical geometry */}
            <circle cx="270" cy="230" r="195" stroke="#DCE5F0" strokeWidth="0.8" strokeDasharray="4 6" />
            <circle cx="270" cy="230" r="130" stroke="#DCE5F0" strokeWidth="0.8" />
            <circle cx="270" cy="230" r="60" stroke="#DCE5F0" strokeWidth="0.8" strokeDasharray="2 4" />

            {/* Horizontal & Vertical datum lines */}
            <line x1="75" y1="230" x2="465" y2="230" stroke="#DCE5F0" strokeWidth="0.75" strokeDasharray="3 4" />
            <line x1="270" y1="35" x2="270" y2="425" stroke="#DCE5F0" strokeWidth="0.75" strokeDasharray="3 4" />

            {/* Diagonal subtle blueprint construction lines */}
            <line x1="140" y1="100" x2="400" y2="360" stroke="#DCE5F0" strokeWidth="0.5" strokeDasharray="2 5" />
            <line x1="400" y1="100" x2="140" y2="360" stroke="#DCE5F0" strokeWidth="0.5" strokeDasharray="2 5" />
          </g>

          {/* ===================================================
              CENTRAL ARCHITECTURAL PIPELINE FLOW
              Software → Backend/API → ESP32/Embedded → Sensors → Physical World
              =================================================== */}

          {/* Main vertical data highway backbone */}
          <path
            d="M 270,55 L 270,405"
            stroke="url(#flowLineGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.85"
          />

          {/* Moving data packets along the architecture */}
          {!prefersReducedMotion && (
            <>
              <circle r="3" fill="#146BFF">
                <animateMotion
                  path="M 270,55 L 270,405"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="2" fill="#4DA3FF">
                <animateMotion
                  path="M 270,55 L 270,405"
                  dur="4s"
                  begin="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* ---------------------------------------------------
              STAGE 1: SOFTWARE (Top Node)
              --------------------------------------------------- */}
          <g transform="translate(270, 55)">
            {/* Outer node halo */}
            <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="18" fill="#EEF5FF" stroke="#146BFF" strokeWidth="1" />
            {/* Small Software Node Core */}
            <rect x="-6" y="-6" width="12" height="12" rx="2.5" fill="#146BFF" />
            
            {/* Technical Node Tag */}
            <text x="36" y="-2" fill="#111827" className="font-mono-tech text-[10px] font-bold tracking-wider">
              SOFTWARE
            </text>
            <text x="36" y="10" fill="#667085" className="font-sans-main text-[9.5px] font-medium">
              Web Applications &amp; Interfaces
            </text>
          </g>

          {/* ---------------------------------------------------
              STAGE 2: BACKEND & API (Upper-Mid Node)
              --------------------------------------------------- */}
          <g transform="translate(270, 140)">
            <circle cx="0" cy="0" r="22" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="15" fill="#F7F9FC" stroke="#4DA3FF" strokeWidth="1" />
            
            {/* API Diamond Gateway Symbol */}
            <polygon points="0,-6 6,0 0,6 -6,0" fill="#4DA3FF" />

            <text x="-36" y="-2" textAnchor="end" fill="#111827" className="font-mono-tech text-[10px] font-bold tracking-wider">
              BACKEND / API
            </text>
            <text x="-36" y="10" textAnchor="end" fill="#667085" className="font-sans-main text-[9.5px] font-medium">
              Node.js · REST APIs · Data Flow
            </text>
          </g>

          {/* ---------------------------------------------------
              STAGE 3: ESP32 / EMBEDDED SYSTEM (Central Core)
              --------------------------------------------------- */}
          <g transform="translate(270, 230)">
            {/* Outer concentric telemetry ring */}
            <circle cx="0" cy="0" r="38" stroke="#146BFF" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6" />
            
            {/* Silicon IC Package Base */}
            <rect x="-26" y="-26" width="52" height="52" rx="7" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1.5" />
            <rect x="-20" y="-20" width="40" height="40" rx="5" fill="#EEF5FF" stroke="#146BFF" strokeWidth="0.8" />
            <rect x="-12" y="-12" width="24" height="24" rx="3.5" fill="#111827" />

            {/* Embedded Microcontroller Label */}
            <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" className="font-mono-tech text-[8px] font-bold">
              ESP32
            </text>

            {/* Micro GPIO pin lines */}
            <g stroke="#146BFF" strokeWidth="1" strokeLinecap="round" opacity="0.75">
              <line x1="-26" y1="-10" x2="-32" y2="-10" />
              <line x1="-26" y1="0" x2="-34" y2="0" />
              <line x1="-26" y1="10" x2="-32" y2="10" />
              <line x1="26" y1="-10" x2="32" y2="-10" />
              <line x1="26" y1="0" x2="34" y2="0" />
              <line x1="26" y1="10" x2="32" y2="10" />
            </g>

            <circle cx="16" cy="-16" r="2" fill="#146BFF" className="animate-subtle-pulse" />

            {/* Label */}
            <text x="44" y="-2" fill="#111827" className="font-mono-tech text-[10px] font-bold tracking-wider">
              EMBEDDED SYSTEM
            </text>
            <text x="44" y="10" fill="#667085" className="font-sans-main text-[9.5px] font-medium">
              ESP32 · Arduino · Microcontrollers
            </text>
          </g>

          {/* ---------------------------------------------------
              STAGE 4: SENSORS & TRANSDUCERS (Lower-Mid Node)
              --------------------------------------------------- */}
          <g transform="translate(270, 320)">
            {/* Radial radar wave arc radiating outward */}
            <circle cx="0" cy="0" r="30" fill="url(#radarPingGrad)" />
            <path d="M -18,-8 A 20,20 0 0,1 18,-8" stroke="#146BFF" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M -26,-12 A 28,28 0 0,1 26,-12" stroke="#4DA3FF" strokeWidth="0.8" strokeDasharray="2 4" />

            <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="11" fill="#EEF5FF" stroke="#146BFF" strokeWidth="1" />
            <circle cx="0" cy="0" r="4" fill="#146BFF" />

            <text x="-36" y="-2" textAnchor="end" fill="#111827" className="font-mono-tech text-[10px] font-bold tracking-wider">
              SENSORS
            </text>
            <text x="-36" y="10" textAnchor="end" fill="#667085" className="font-sans-main text-[9.5px] font-medium">
              Telemetry · I2C · Real-Time Signals
            </text>
          </g>

          {/* ---------------------------------------------------
              STAGE 5: PHYSICAL WORLD (Bottom Base Plane)
              --------------------------------------------------- */}
          <g transform="translate(270, 405)">
            {/* Isometric Ground Plane */}
            <polygon
              points="-90,0 0,-18 90,0 0,18"
              fill="#FFFFFF"
              stroke="#DCE5F0"
              strokeWidth="1.2"
            />
            <polygon
              points="-60,0 0,-12 60,0 0,12"
              fill="#EEF5FF"
              stroke="#146BFF"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
            
            {/* Center target node */}
            <circle cx="0" cy="0" r="4.5" fill="#111827" />
            <circle cx="0" cy="0" r="2" fill="#FFFFFF" />

            <text x="0" y="32" textAnchor="middle" fill="#111827" className="font-mono-tech text-[10px] font-bold tracking-wider">
              PHYSICAL WORLD
            </text>
          </g>

        </svg>
      </div>

      {/* ===================================================
          2. THREE TECHNICAL INFORMATION CARDS
          Real Engineering Direction (No Fake Benchmarks)
          =================================================== */}
      {showCardsInline && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          {infoCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="product-card p-4 bg-white border border-[#DCE5F0] rounded-xl flex flex-col justify-between transition-all duration-200 hover:border-[#146BFF]/40 shadow-xs"
              >
                <div>
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#DCE5F0]/70 pb-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#146BFF]" />
                      <span className="font-mono-tech text-[10.5px] font-bold tracking-wider uppercase text-[#111827]">
                        {card.category}
                      </span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#146BFF]" />
                  </div>

                  {/* Role Title */}
                  <h4 className="text-[13px] font-bold text-[#111827] leading-tight">
                    {card.role}
                  </h4>

                  {/* Primary Stack */}
                  <p className="font-mono-tech text-[11px] text-[#146BFF] font-medium mt-1.5 leading-snug">
                    {card.primaryStack}
                  </p>
                </div>

                {/* Secondary Scope */}
                <div className="pt-2.5 mt-2.5 border-t border-[#EEF5FF] text-[11px] text-[#667085] leading-relaxed">
                  {card.secondaryStack}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
}
