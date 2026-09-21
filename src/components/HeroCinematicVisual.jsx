import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cpu, Sparkles, Network } from 'lucide-react';

/**
 * HeroCinematicVisual
 * 
 * Cinematic Technology Composition:
 * Light + Futuristic + Premium + Engineering
 * 
 * Communicates:
 * SOFTWARE + HARDWARE + INTELLIGENCE + REAL WORLD
 * 
 * Architecture:
 * - Subtle human profile / perception arc looking into the connected environment
 * - Optical sensor / intelligent vision focal concentric rings
 * - Isometric physical world infrastructure (smart architectural nodes & LiDAR radar arcs)
 * - Silicon micro-core with circuit traces (hardware layer)
 * - Flowing data streamlines (software & telemetry bus)
 * - Three floating refined product status cards
 * - Smooth mouse parallax and calm independent environmental oscillation
 */
export default function HeroCinematicVisual() {
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

  // Smooth mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 90 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax layer depths
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[620px] mx-auto aspect-[1.05/1] flex items-center justify-center select-none perspective-[1000px]"
    >
      {/* 1. Soft atmospheric background haze (very subtle light blue glow, not a giant gradient) */}
      <div 
        aria-hidden="true"
        className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#EEF5FF]/70 via-[#146BFF]/[0.04] to-transparent blur-3xl pointer-events-none" 
      />

      {/* 2. Main 3D Parallax Canvas Container */}
      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          x: prefersReducedMotion ? 0 : translateX,
          y: prefersReducedMotion ? 0 : translateY,
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* SVG Engineering & Perception Artwork */}
        <svg
          viewBox="0 0 600 560"
          className="w-full h-full overflow-visible drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Blue Gradients */}
            <linearGradient id="streamGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#146BFF" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#4DA3FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EEF5FF" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="profileGrad" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#111827" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#146BFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#146BFF" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="planeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EEF5FF" stopOpacity="0.6" />
            </linearGradient>

            <radialGradient id="irisAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#146BFF" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#4DA3FF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#146BFF" stopOpacity="0" />
            </radialGradient>

            {/* Subtle drop shadow filter for floating components */}
            <filter id="softCardShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#146BFF" floodOpacity="0.07" />
            </filter>
          </defs>

          {/* ===================================================
              LAYER A: Background Engineering Grid & Isometric Datum
              =================================================== */}
          <g className="opacity-40">
            {/* Coordinate grid lines */}
            <line x1="120" y1="440" x2="480" y2="440" stroke="#DCE5F0" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="160" y1="470" x2="440" y2="470" stroke="#DCE5F0" strokeWidth="1" strokeDasharray="4 6" />
            <line x1="300" y1="80" x2="300" y2="480" stroke="#DCE5F0" strokeWidth="0.8" strokeDasharray="3 5" />

            {/* Circumference datum rings */}
            <circle cx="280" cy="260" r="210" stroke="#DCE5F0" strokeWidth="0.8" strokeDasharray="4 8" />
            <circle cx="280" cy="260" r="150" stroke="#DCE5F0" strokeWidth="0.8" />
          </g>

          {/* ===================================================
              LAYER B: REAL WORLD (Smart Architecture & City Infrastructure)
              =================================================== */}
          <g id="real-world-structures" className="transition-all duration-300">
            {/* Isometric Ground Base Platform */}
            <polygon
              points="140,430 320,380 480,440 300,490"
              fill="url(#planeGrad)"
              stroke="#DCE5F0"
              strokeWidth="1.2"
              filter="url(#softCardShadow)"
            />

            {/* Building 1: Smart Structure Node (Tall Center Tower) */}
            <g transform="translate(300, 310)">
              {/* Left Face */}
              <polygon points="0,0 26,12 26,-70 0,-82" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1" />
              {/* Right Face */}
              <polygon points="26,12 56,-2 56,-84 26,-70" fill="#EEF5FF" stroke="#DCE5F0" strokeWidth="1" />
              {/* Top Face */}
              <polygon points="0,-82 26,-70 56,-84 30,-96" fill="#FFFFFF" stroke="#146BFF" strokeWidth="1" />

              {/* Antenna Beacon / Sensor Node on Tower */}
              <line x1="28" y1="-70" x2="28" y2="-108" stroke="#146BFF" strokeWidth="1.5" />
              <circle cx="28" cy="-108" r="3" fill="#146BFF" />
              <circle cx="28" cy="-108" r="7" stroke="#146BFF" strokeWidth="0.8" strokeOpacity="0.4" className="animate-ping" />
            </g>

            {/* Building 2: Secondary Facility / Lab Node */}
            <g transform="translate(240, 340)">
              <polygon points="0,0 22,10 22,-45 0,-55" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1" />
              <polygon points="22,10 46,-1 46,-56 22,-45" fill="#F7F9FC" stroke="#DCE5F0" strokeWidth="1" />
              <polygon points="0,-55 22,-45 46,-56 24,-66" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1" />
              {/* Micro telemetry pin */}
              <circle cx="22" cy="-45" r="2" fill="#4DA3FF" />
            </g>

            {/* Building 3: Distributed Edge Station */}
            <g transform="translate(370, 360)">
              <polygon points="0,0 28,12 28,-36 0,-48" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1" />
              <polygon points="28,12 52,-1 52,-49 28,-36" fill="#EEF5FF" stroke="#DCE5F0" strokeWidth="1" />
              <polygon points="0,-48 28,-36 52,-49 24,-61" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1" />
            </g>

            {/* Micro LiDAR / Environmental Rangefinding Arcs */}
            <g className="opacity-70">
              <path d="M 328,202 A 40,40 0 0,1 368,232" stroke="#146BFF" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M 328,202 A 65,65 0 0,1 390,250" stroke="#4DA3FF" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 328,202 A 90,90 0 0,1 412,270" stroke="#146BFF" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="3 5" />
            </g>
          </g>

          {/* ===================================================
              LAYER C: HARDWARE & SILICON LAYER (Embedded Core)
              =================================================== */}
          <g id="silicon-core" transform="translate(180, 240)">
            {/* Silicon Die Package Base */}
            <rect x="0" y="0" width="68" height="68" rx="8" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="1.5" filter="url(#softCardShadow)" />
            <rect x="6" y="6" width="56" height="56" rx="5" fill="#EEF5FF" stroke="#146BFF" strokeWidth="1" strokeOpacity="0.4" />
            
            {/* Silicon IC Die Center */}
            <rect x="18" y="18" width="32" height="32" rx="3" fill="#111827" />
            
            {/* Metallic IC Core Text / Mark */}
            <text x="34" y="37" textAnchor="middle" fill="#FFFFFF" className="font-mono-tech text-[8.5px] font-bold tracking-tight">
              RB_S3
            </text>

            {/* Golden / Cyan Micro traces leading out from processor */}
            <g stroke="#146BFF" strokeWidth="1" strokeLinecap="round" opacity="0.8">
              {/* Left traces */}
              <line x1="0" y1="20" x2="-14" y2="20" />
              <line x1="0" y1="34" x2="-22" y2="34" />
              <line x1="0" y1="48" x2="-14" y2="48" />

              {/* Bottom traces connecting toward physical base */}
              <path d="M 20,68 L 20,84 L 50,110" fill="none" strokeWidth="1.2" />
              <path d="M 48,68 L 48,92 L 100,120" fill="none" strokeWidth="1.2" />
              
              {/* Right traces connecting to intelligence nexus */}
              <path d="M 68,34 L 98,34 L 126,10" fill="none" strokeWidth="1.2" />
            </g>

            {/* Active silicon status LED */}
            <circle cx="56" cy="14" r="2.2" fill="#146BFF" className="animate-subtle-pulse" />
          </g>

          {/* ===================================================
              LAYER D: HUMAN PERCEPTION & FUTURE INTERFACE
              (Subtle, architectural human silhouette & optical focus)
              =================================================== */}
          <g id="human-perception-interface">
            {/* Smooth architectural human silhouette profile looking right toward the connected world */}
            <path
              d="M 120,380 
                 C 125,320 135,270 148,225 
                 C 158,190 172,160 190,135 
                 C 215,100 248,82 285,80 
                 C 320,78 348,95 365,120 
                 C 374,133 378,150 376,168
                 C 374,185 362,195 352,205
                 C 342,215 340,225 348,238
                 C 356,252 368,260 366,275
                 C 364,288 350,296 345,308
                 C 340,320 348,340 344,360
                 C 340,380 326,396 315,412"
              fill="none"
              stroke="url(#profileGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Second offset contour giving depth and sophistication */}
            <path
              d="M 100,400 
                 C 112,325 125,260 142,210 
                 C 162,150 198,105 250,92 
                 C 290,82 330,96 352,125"
              fill="none"
              stroke="#DCE5F0"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.6"
            />

            {/* Perception Focal Nexus (Concentric Optical Rings communicating intelligence & observation) */}
            <g transform="translate(345, 185)">
              {/* Outer soft aura */}
              <circle cx="0" cy="0" r="42" fill="url(#irisAura)" />

              {/* Concentric precise measurement rings */}
              <circle cx="0" cy="0" r="32" stroke="#146BFF" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
              <circle cx="0" cy="0" r="22" stroke="#4DA3FF" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="12" stroke="#DCE5F0" strokeWidth="1" />

              {/* Optical center pip */}
              <circle cx="0" cy="0" r="4.5" fill="#146BFF" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />

              {/* Crosshair telemetry graduation tick marks */}
              <line x1="-36" y1="0" x2="-26" y2="0" stroke="#146BFF" strokeWidth="1" />
              <line x1="26" y1="0" x2="36" y2="0" stroke="#146BFF" strokeWidth="1" />
              <line x1="0" y1="-36" x2="0" y2="-26" stroke="#146BFF" strokeWidth="1" />
              <line x1="0" y1="26" x2="0" y2="36" stroke="#146BFF" strokeWidth="1" />

              {/* Subtle focal sweep beam radiating toward the real world */}
              <path
                d="M 0,0 L 140,-40 L 160,50 Z"
                fill="url(#irisAura)"
                opacity="0.3"
                className="pointer-events-none"
              />
            </g>
          </g>

          {/* ===================================================
              LAYER E: INTELLIGENCE & DATA SPLINES (Software & Telemetry)
              =================================================== */}
          <g id="data-pathways">
            {/* Primary Blue Telemetry Stream flowing across hardware to real-world */}
            <path
              d="M 180,274 C 230,274 250,220 345,185 C 410,160 460,220 328,310"
              fill="none"
              stroke="url(#streamGrad1)"
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />

            {/* Traveling Data Packet Dot 1 */}
            {!prefersReducedMotion && (
              <circle r="3" fill="#146BFF">
                <animateMotion
                  path="M 180,274 C 230,274 250,220 345,185 C 410,160 460,220 328,310"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Secondary telemetry spline (Fast inference bus) */}
            <path
              d="M 345,185 C 400,185 450,240 430,340 C 415,400 360,430 300,430"
              fill="none"
              stroke="#4DA3FF"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />

            {!prefersReducedMotion && (
              <circle r="2.2" fill="#4DA3FF">
                <animateMotion
                  path="M 345,185 C 400,185 450,240 430,340 C 415,400 360,430 300,430"
                  dur="3.8s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        </svg>

        {/* ===================================================
            LAYER F: INTEGRATED REFINED PRODUCT STATUS CARDS
            (Predominantly white, #DCE5F0 borders, Apple/Microsoft hardware tier)
            =================================================== */}

        {/* Floating Card 1: Top Right — Perception & AI Inference */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-2 right-2 sm:right-6 product-card p-3 sm:p-3.5 max-w-[210px] bg-white/95 backdrop-blur-sm pointer-events-auto"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#DCE5F0] pb-1.5 mb-1.5">
            <div className="flex items-center gap-1.5 text-[#146BFF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-mono-tech text-[10px] font-bold tracking-wider uppercase text-[#111827]">
                INTELLIGENCE
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#146BFF] animate-subtle-pulse" />
          </div>
          <div className="text-[12px] font-bold text-[#111827] leading-tight">
            Edge TinyML Inference
          </div>
          <div className="font-mono-tech text-[10px] text-[#667085] mt-0.5">
            INT8 Quantized • &lt;15ms Latency
          </div>
        </motion.div>

        {/* Floating Card 2: Lower Left — Embedded Hardware & Sensors */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-6 left-0 sm:-left-4 product-card p-3 sm:p-3.5 max-w-[220px] bg-white/95 backdrop-blur-sm pointer-events-auto"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#DCE5F0] pb-1.5 mb-1.5">
            <div className="flex items-center gap-1.5 text-[#146BFF]">
              <Cpu className="w-3.5 h-3.5" />
              <span className="font-mono-tech text-[10px] font-bold tracking-wider uppercase text-[#111827]">
                HARDWARE CORE
              </span>
            </div>
            <span className="text-[10px] font-mono-tech text-[#146BFF] font-semibold bg-[#EEF5FF] px-1.5 py-0.2 rounded">
              SILICON
            </span>
          </div>
          <div className="text-[12px] font-bold text-[#111827] leading-tight">
            ESP32-S3 + FreeRTOS
          </div>
          <div className="font-mono-tech text-[10px] text-[#667085] mt-0.5">
            LiDAR • I2C Bus • Deterministic HAL
          </div>
        </motion.div>

        {/* Floating Card 3: Bottom Right — Real World Digital Twin */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-3 right-4 sm:right-10 product-card p-3 sm:p-3.5 max-w-[210px] bg-white/95 backdrop-blur-sm pointer-events-auto hidden sm:block"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#DCE5F0] pb-1.5 mb-1.5">
            <div className="flex items-center gap-1.5 text-[#146BFF]">
              <Network className="w-3.5 h-3.5" />
              <span className="font-mono-tech text-[10px] font-bold tracking-wider uppercase text-[#111827]">
                REAL WORLD
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF]" />
          </div>
          <div className="text-[12px] font-bold text-[#111827] leading-tight">
            Physical Telemetry Twin
          </div>
          <div className="font-mono-tech text-[10px] text-[#667085] mt-0.5">
            Sub-25ms Multi-Node Mesh
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
