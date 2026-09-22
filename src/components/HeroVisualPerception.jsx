import React, { useState, useEffect } from 'react';

/**
 * HeroVisualPerception
 * 
 * Central Visual Feature of the Hero section:
 * - Abstract technological eye / perception element integrated with a connected digital environment
 * - Communicates: PERCEPTION + DATA + INTELLIGENCE + CONNECTED SYSTEMS
 * - Soft volumetric cyan & midnight-blue lighting giving brighter focal depth
 * - Fine technical details, precision optics rings, datum crosshairs, and slow data pulses
 * - Subtle low-contrast system telemetry: SYS_ID: RB_NODE_01, STATE: SYNCHRONIZED, etc.
 * - Smooth, restrained continuous motion (slow sweep, gentle breathing, slow data flow)
 * - Respects prefers-reduced-motion
 */
export default function HeroVisualPerception() {
  const [activeNode, setActiveNode] = useState(null);
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

  // System Nodes around the central perception core
  const nodes = [
    {
      id: 'embedded',
      label: 'EMBEDDED_IO',
      sub: 'ESP32 · SENSORS',
      x: 75,
      y: 190,
      path: 'M 75,190 Q 150,195 240,230',
      activeColor: '#16D9E8',
    },
    {
      id: 'intelligence',
      label: 'AI_INFERENCE',
      sub: 'EDGE ML · VISION',
      x: 425,
      y: 110,
      path: 'M 425,110 Q 360,170 300,215',
      activeColor: '#3B82F6',
    },
    {
      id: 'telemetry',
      label: 'DATA_STREAM',
      sub: 'TELEMETRY · WSS',
      x: 440,
      y: 330,
      path: 'M 440,330 Q 370,290 295,255',
      activeColor: '#16D9E8',
    },
    {
      id: 'system_bus',
      label: 'SYSTEM_BUS',
      sub: 'REAL-TIME PIPELINE',
      x: 95,
      y: 345,
      path: 'M 95,345 Q 160,310 240,250',
      activeColor: '#3B82F6',
    },
  ];

  // Precision Azimuth Ticks around the perception outer ring (24 ticks)
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 15 * Math.PI) / 180;
    const r1 = 148;
    const r2 = i % 2 === 0 ? 156 : 152;
    const cx = 270;
    const cy = 230;
    return {
      x1: cx + Math.cos(angle) * r1,
      y1: cy + Math.sin(angle) * r1,
      x2: cx + Math.cos(angle) * r2,
      y2: cy + Math.sin(angle) * r2,
      key: `tick-${i}`,
      major: i % 6 === 0,
    };
  });

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">
      
      {/* 1. Volumetric Atmosphere & Luminance Aura (Brighter than background) */}
      <div 
        aria-hidden="true"
        className="absolute -inset-6 sm:-inset-10 rounded-full pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(22, 217, 232, 0.12) 0%, rgba(59, 130, 246, 0.1) 32%, rgba(18, 26, 35, 0.4) 60%, transparent 80%)
          `
        }}
      />

      {/* 2. Precision Outer Technical Telemetry Labels */}
      <div className="relative z-20 flex items-center justify-between px-3 py-1 font-mono-tech text-[10px] text-[#647382] border-b border-[#283541]/40 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D9E8] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
          </span>
          <span className="text-[#9AA8B5] font-semibold tracking-wider">SYS_ID: RB_NODE_01</span>
        </div>
        <div className="flex items-center gap-3">
          <span>FREQ: <strong className="text-[#9AA8B5] font-normal">240MHz</strong></span>
          <span className="text-[#283541]">|</span>
          <span className="text-[#16D9E8] font-medium tracking-wider">STATE: SYNCHRONIZED</span>
        </div>
      </div>

      {/* 3. Main Technological SVG Composition */}
      <div className="relative w-full aspect-[1.18/1] sm:aspect-[1.22/1] flex items-center justify-center">
        <svg
          viewBox="0 0 540 460"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Cyan Luminous Glow Filter */}
            <filter id="luminousCyan" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Core Lens Volumetric Gradient */}
            <radialGradient id="perceptualCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#16D9E8" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#3B82F6" stopOpacity="0.55" />
              <stop offset="65%" stopColor="#121A23" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0B1016" stopOpacity="0.95" />
            </radialGradient>

            {/* Radar / Aperture Sweep Arm Gradient */}
            <linearGradient id="apertureArmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#16D9E8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>

            {/* Iris Shard Gradient */}
            <linearGradient id="irisShardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A2530" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#121A23" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* ===================================================
              BACKGROUND TECHNICAL GRID & GEOMETRIC DATUM LINES
              =================================================== */}
          <g className="opacity-45">
            {/* Concentric Coordinate Guidance Rings */}
            <circle cx="270" cy="230" r="215" stroke="#283541" strokeWidth="0.8" strokeDasharray="5 7" />
            <circle cx="270" cy="230" r="180" stroke="#283541" strokeWidth="0.75" />
            <circle cx="270" cy="230" r="115" stroke="#283541" strokeWidth="0.75" strokeDasharray="3 4" />

            {/* Horizontal & Vertical Crosshair Datum Lines */}
            <line x1="50" y1="230" x2="490" y2="230" stroke="#283541" strokeWidth="0.75" strokeDasharray="4 6" />
            <line x1="270" y1="25" x2="270" y2="435" stroke="#283541" strokeWidth="0.75" strokeDasharray="4 6" />

            {/* Diagonal Telemetry Accents */}
            <line x1="120" y1="80" x2="420" y2="380" stroke="#283541" strokeWidth="0.5" strokeDasharray="2 6" />
            <line x1="420" y1="80" x2="120" y2="380" stroke="#283541" strokeWidth="0.5" strokeDasharray="2 6" />
          </g>

          {/* Azimuth Graduation Ticks */}
          {ticks.map((t) => (
            <line
              key={t.key}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.major ? '#16D9E8' : '#283541'}
              strokeWidth={t.major ? '1.25' : '0.8'}
              strokeOpacity={t.major ? 0.75 : 0.55}
            />
          ))}

          {/* Slow Rotating Precision Aperture Arm (Calm, continuous scan) */}
          {!prefersReducedMotion && (
            <g className="animate-perception-sweep origin-[270px_230px] opacity-40 pointer-events-none">
              <line
                x1="270"
                y1="230"
                x2="450"
                y2="230"
                stroke="url(#apertureArmGrad)"
                strokeWidth="1.5"
              />
              <circle cx="450" cy="230" r="2.5" fill="#16D9E8" />
            </g>
          )}

          {/* ===================================================
              CONNECTED SYSTEM DATA FLOW CHANNELS
              =================================================== */}
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            return (
              <g key={`link-${node.id}`}>
                {/* Background Conduit */}
                <path
                  d={node.path}
                  stroke={isActive ? node.activeColor : '#283541'}
                  strokeWidth={isActive ? '1.75' : '1'}
                  strokeDasharray={isActive ? 'none' : '3 4'}
                  strokeOpacity={isActive ? 0.9 : 0.65}
                  className="transition-all duration-300"
                />

                {/* Smooth Animated Data Pulse */}
                {!prefersReducedMotion && (
                  <circle r="2.2" fill={node.activeColor} filter="url(#luminousCyan)">
                    <animateMotion
                      path={node.path}
                      dur={node.id === 'intelligence' || node.id === 'embedded' ? '3.8s' : '4.6s'}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* ===================================================
              CENTRAL TECHNOLOGICAL PERCEPTION ELEMENT (THE CORE)
              Multi-layered optical sensor / perception aperture
              =================================================== */}
          <g transform="translate(270, 230)" className="cursor-pointer">
            
            {/* Concentric Focus Halo Ring */}
            <circle
              cx="0"
              cy="0"
              r="76"
              fill="none"
              stroke="#16D9E8"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              strokeOpacity="0.4"
              className={prefersReducedMotion ? '' : 'animate-slow-breathe'}
            />

            {/* Geometric Iris Aperture Blades (8-segmented optical iris) */}
            <g className="opacity-80">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <path
                  key={`blade-${idx}`}
                  d="M 12,-48 L 44,-24 L 28,-8 Z"
                  transform={`rotate(${angle})`}
                  fill="url(#irisShardGrad)"
                  stroke="#283541"
                  strokeWidth="0.75"
                />
              ))}
            </g>

            {/* Precision Optical Lens Rim */}
            <circle
              cx="0"
              cy="0"
              r="48"
              fill="#121A23"
              stroke="#283541"
              strokeWidth="1.5"
            />

            {/* Inner Perception Iris (Gradient Depth) */}
            <circle
              cx="0"
              cy="0"
              r="36"
              fill="url(#perceptualCoreGrad)"
              stroke="#16D9E8"
              strokeWidth="1"
              strokeOpacity="0.8"
            />

            {/* Optical Sensor Reticle Ring */}
            <circle
              cx="0"
              cy="0"
              r="22"
              fill="#0B1016"
              stroke="#3B82F6"
              strokeWidth="1.2"
            />

            {/* Perception Focal Pupil */}
            <circle
              cx="0"
              cy="0"
              r="9"
              fill="#16D9E8"
              filter="url(#luminousCyan)"
              className="animate-subtle-pulse"
            />
            <circle cx="0" cy="0" r="3" fill="#FFFFFF" />

            {/* Optical Datum Reticle Marks */}
            <g stroke="#16D9E8" strokeWidth="1" strokeOpacity="0.75">
              <line x1="-16" y1="0" x2="-11" y2="0" />
              <line x1="11" y1="0" x2="16" y2="0" />
              <line x1="0" y1="-16" x2="0" y2="-11" />
              <line x1="0" y1="11" x2="0" y2="16" />
            </g>

            {/* Technical Sub-Label below core */}
            <text
              x="0"
              y="96"
              textAnchor="middle"
              className="font-mono-tech text-[9.5px] font-bold tracking-[0.25em] fill-[#9AA8B5] uppercase"
            >
              PERCEPTION // ENGINE
            </text>
            <text
              x="0"
              y="108"
              textAnchor="middle"
              className="font-mono-tech text-[8px] tracking-wider fill-[#647382]"
            >
              LATENT SENSING &amp; REAL-TIME CONTROL
            </text>
          </g>

          {/* ===================================================
              PERIPHERAL INTEGRATED SYSTEM NODES
              =================================================== */}
          {nodes.map((node) => {
            const isHovered = activeNode === node.id;
            return (
              <g
                key={node.id}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Outer Node Halo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? 20 : 16}
                  fill="#151E28"
                  stroke={isHovered ? node.activeColor : '#283541'}
                  strokeWidth={isHovered ? '1.5' : '1.2'}
                  className="transition-all duration-200"
                />

                {/* Inner Core Point */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? 5 : 3.5}
                  fill={isHovered ? node.activeColor : '#9AA8B5'}
                  className="transition-all duration-200"
                />

                {/* Node Label Card */}
                <g className="transition-all duration-200">
                  <text
                    x={node.x}
                    y={node.y > 230 ? node.y + 26 : node.y - 22}
                    textAnchor="middle"
                    className={`font-mono-tech text-[10.5px] font-bold tracking-wider transition-colors duration-200 ${
                      isHovered ? 'fill-[#16D9E8]' : 'fill-[#F2F6FA]'
                    }`}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y={node.y > 230 ? node.y + 38 : node.y - 10}
                    textAnchor="middle"
                    className="font-mono-tech text-[8.5px] tracking-tight fill-[#647382] uppercase"
                  >
                    {node.sub}
                  </text>
                </g>
              </g>
            );
          })}

        </svg>
      </div>

      {/* 4. Bottom System Status Bar */}
      <div className="relative z-20 flex items-center justify-between px-3 py-1 font-mono-tech text-[10px] text-[#647382] border-t border-[#283541]/40 pt-2 mt-1">
        <div className="flex items-center gap-2">
          <span>TOPOLOGY: <strong className="text-[#9AA8B5] font-normal">NEURAL_MESH</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span>COORD: <span className="text-[#9AA8B5]">20.2961° N, 85.8245° E</span></span>
        </div>
      </div>

    </div>
  );
}
