import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, MessageSquare, Puzzle, Zap, Brain } from 'lucide-react';

/**
 * Core Qualities Orbit Visualization
 * - Replaces the rectangular Quick Facts card with a minimal, premium orbit constellation
 * - Desktop: Circular/orbit floating composition with subtle curved connection paths
 * - Tablet/Mobile: Compact, flowing layout that prevents clipping and respects height
 */

const QUALITIES = [
  {
    id: 'leadership',
    title: 'Leadership',
    phrase: 'Takes initiative',
    icon: Compass,
    accentHex: '#2563EB',     // Soft Blue
    iconBgHex: '#EFF6FF',
    // Desktop positioning (percentages of 480x370 container)
    xPct: 22,
    yPct: 14,
    // SVG connection line from center (240, 180) to node
    linePath: 'M 213 156 Q 160 115 125 72',
    dotStart: { cx: 213, cy: 156 },
    dotEnd: { cx: 125, cy: 72 },
    floatDuration: 6.2,
    floatDelay: 0.1,
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    phrase: 'Finds practical solutions',
    icon: Puzzle,
    accentHex: '#0284C7',     // Sky Blue
    iconBgHex: '#F0F9FF',
    xPct: 78,
    yPct: 14,
    linePath: 'M 267 156 Q 320 115 355 72',
    dotStart: { cx: 267, cy: 156 },
    dotEnd: { cx: 355, cy: 72 },
    floatDuration: 5.8,
    floatDelay: 0.4,
  },
  {
    id: 'communication',
    title: 'Communication',
    phrase: 'Expresses ideas clearly',
    icon: MessageSquare,
    accentHex: '#8B5CF6',     // Soft Lavender / Violet
    iconBgHex: '#F5F3FF',
    xPct: 20,
    yPct: 56,
    linePath: 'M 200 188 Q 150 200 130 205',
    dotStart: { cx: 200, cy: 188 },
    dotEnd: { cx: 130, cy: 205 },
    floatDuration: 6.8,
    floatDelay: 0.8,
  },
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    phrase: 'Adapts quickly',
    icon: Zap,
    accentHex: '#EC4899',     // Pink
    iconBgHex: '#FDF2F8',
    xPct: 80,
    yPct: 61,
    linePath: 'M 280 192 Q 330 216 350 225',
    dotStart: { cx: 280, cy: 192 },
    dotEnd: { cx: 350, cy: 225 },
    floatDuration: 6.0,
    floatDelay: 0.2,
  },
  {
    id: 'critical-thinking',
    title: 'Critical Thinking',
    phrase: 'Thinks before deciding',
    icon: Brain,
    accentHex: '#6366F1',     // Indigo
    iconBgHex: '#EEF2FF',
    xPct: 50,
    yPct: 89,
    linePath: 'M 240 222 Q 224 265 240 306',
    dotStart: { cx: 240, cy: 222 },
    dotEnd: { cx: 240, cy: 306 },
    floatDuration: 7.2,
    floatDelay: 0.6,
  },
];

export default function CoreQualitiesOrbit() {
  const [hoveredId, setHoveredId] = useState(null);

  const activeQuality = hoveredId ? QUALITIES.find((q) => q.id === hoveredId) : null;

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* 1. DESKTOP VIEW: Circular / Orbit Composition (lg and up)    */}
      {/* ============================================================ */}
      <div className="hidden lg:block relative w-full max-w-[480px] h-[370px] mx-auto select-none">
        
        {/* SVG Connection Lines & Orbit Tracks */}
        <svg
          viewBox="0 0 480 370"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          aria-hidden="true"
        >
          {/* Subtle concentric orbit guides */}
          <circle
            cx="240"
            cy="180"
            r="138"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="0.75"
            strokeDasharray="3 4"
            opacity="0.5"
          />
          <circle
            cx="240"
            cy="180"
            r="68"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="0.75"
            strokeDasharray="2 3"
            opacity="0.35"
          />

          {/* Curved Connections from Center Hub to each Node */}
          {QUALITIES.map((q, idx) => {
            const isHovered = hoveredId === q.id;
            const isAnyHovered = hoveredId !== null;

            return (
              <g key={q.id}>
                {/* Curved Connector Path */}
                <motion.path
                  d={q.linePath}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: isHovered ? 0.95 : isAnyHovered ? 0.25 : 0.55 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    pathLength: { duration: 0.85, delay: 0.2 + idx * 0.1, ease: 'easeOut' },
                    opacity: { duration: 0.3 },
                  }}
                  animate={{
                    stroke: isHovered ? q.accentHex : '#CBD5E1',
                    strokeWidth: isHovered ? 1.5 : 0.85,
                    opacity: isHovered ? 0.95 : isAnyHovered ? 0.25 : 0.55,
                  }}
                />

                {/* Subtle Anchor Dots */}
                <motion.circle
                  cx={q.dotStart.cx}
                  cy={q.dotStart.cy}
                  r={isHovered ? 2.5 : 1.75}
                  animate={{
                    fill: isHovered ? q.accentHex : '#94A3B8',
                    opacity: isHovered ? 1 : isAnyHovered ? 0.3 : 0.7,
                  }}
                  transition={{ duration: 0.25 }}
                />
                <motion.circle
                  cx={q.dotEnd.cx}
                  cy={q.dotEnd.cy}
                  r={isHovered ? 2.5 : 1.75}
                  animate={{
                    fill: isHovered ? q.accentHex : '#94A3B8',
                    opacity: isHovered ? 1 : isAnyHovered ? 0.3 : 0.7,
                  }}
                  transition={{ duration: 0.25 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center Hub: CORE QUALITIES */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-[48.6%] -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div
            className="w-[84px] h-[84px] rounded-full bg-white border flex flex-col items-center justify-center text-center transition-all duration-300"
            style={{
              borderColor: activeQuality ? `${activeQuality.accentHex}40` : '#D5DFEB',
              boxShadow: activeQuality
                ? `0 6px 20px ${activeQuality.accentHex}15, 0 1px 3px rgba(15,23,42,0.03)`
                : '0 4px 16px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.02)',
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mb-1 transition-colors duration-300"
              style={{
                backgroundColor: activeQuality ? activeQuality.accentHex : '#2563EB',
              }}
            />
            <span className="text-[9.5px] font-mono tracking-[0.22em] font-semibold text-[#64748B] leading-none uppercase">
              CORE
            </span>
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#111827] leading-tight mt-0.5 uppercase">
              QUALITIES
            </span>
          </div>
        </motion.div>

        {/* The 5 Floating Quality Nodes */}
        {QUALITIES.map((q, idx) => {
          const Icon = q.icon;
          const isHovered = hoveredId === q.id;

          return (
            <div
              key={q.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: `${q.xPct}%`, top: `${q.yPct}%` }}
              onMouseEnter={() => setHoveredId(q.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Fade + Scale Entrance */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Ultra-subtle, gentle breathing float */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{
                    duration: q.floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: q.floatDelay,
                  }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/95 border transition-all duration-300 cursor-default ${
                    isHovered
                      ? 'shadow-[0_6px_20px_rgba(15,23,42,0.07)]'
                      : 'border-[#E2E8F0] shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_4px_14px_rgba(15,23,42,0.05)]'
                  }`}
                  style={{
                    borderColor: isHovered ? q.accentHex : undefined,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{
                      backgroundColor: q.iconBgHex,
                      color: q.accentHex,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  {/* Texts */}
                  <div className="flex flex-col text-left pr-0.5 whitespace-nowrap">
                    <span className="text-[12px] font-semibold text-[#111827] leading-tight">
                      {q.title}
                    </span>
                    <span className="text-[10.5px] text-[#64748B] leading-tight mt-0.5">
                      {q.phrase}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 2. TABLET / MOBILE VIEW: Compact Flowing Layout (< lg)       */}
      {/* ============================================================ */}
      <div className="block lg:hidden w-full max-w-lg mx-auto select-none pt-2">
        {/* Compact Center Hub */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D5DFEB] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest font-semibold text-[#64748B] uppercase">
              CORE
            </span>
            <span className="text-[11px] font-bold text-[#111827] uppercase">
              QUALITIES
            </span>
          </div>
        </motion.div>

        {/* Flowing Grid of 5 Qualities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {QUALITIES.map((q, idx) => {
            const Icon = q.icon;
            const isLastOdd = idx === QUALITIES.length - 1;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] shadow-xs transition-all duration-200 ${
                  isLastOdd ? 'sm:col-span-2 sm:max-w-[240px] sm:mx-auto w-full' : ''
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: q.iconBgHex,
                    color: q.accentHex,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] font-semibold text-[#111827] leading-tight">
                    {q.title}
                  </span>
                  <span className="text-[10.5px] text-[#64748B] leading-tight mt-0.5">
                    {q.phrase}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
