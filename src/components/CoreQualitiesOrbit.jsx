import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Puzzle, Zap, Brain } from 'lucide-react';

/**
 * Core Qualities Constellation
 * Exactly matching the user's reference mockup:
 * - Cursive script "Core Qualities" in the open center with blue underline accent
 * - 5 orbiting nodes with circular icon badges on top, titles, and centered descriptions
 * - Radial spokes with colored dots emanating from the center
 * - Delicate circular orbit arcs with colored dots connecting the icon badges
 */

const NODES = [
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'Takes initiative and helps drive projects toward completion.',
    icon: Users,
    // Coordinates in 560x480 coordinate space (percentages)
    xPct: 50,
    yPct: 15,
    // Colors & Borders (Lavender border)
    iconBg: 'bg-[#F8F0FF]',
    iconBorder: 'border-[1.5px] border-[#D8B4FE]',
    iconShadow: 'shadow-[0_2px_8px_rgba(216,180,254,0.35)]',
    iconColor: 'text-[#9333EA]',
    spokeStroke: '#D8B4FE',
    spokeDot: '#9333EA',
    // Spoke line from center towards node
    spoke: { x1: 280, y1: 198, x2: 280, y2: 155, dotX: 280, dotY: 155 },
    floatDuration: 6.2,
    floatDelay: 0.1,
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Communicates ideas clearly and works effectively with others.',
    icon: MessageSquare,
    xPct: 18,
    yPct: 45,
    // Colors & Borders (Muted Rose border)
    iconBg: 'bg-[#FFF1F2]',
    iconBorder: 'border-[1.5px] border-[#FDA4AF]',
    iconShadow: 'shadow-[0_2px_8px_rgba(253,164,175,0.35)]',
    iconColor: 'text-[#E11D48]',
    spokeStroke: '#FDA4AF',
    spokeDot: '#E11D48',
    spoke: { x1: 228, y1: 228, x2: 182, y2: 220, dotX: 182, dotY: 220 },
    floatDuration: 6.8,
    floatDelay: 0.5,
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    description: 'Breaks complex problems into practical, workable solutions.',
    icon: Puzzle,
    xPct: 82,
    yPct: 45,
    // Colors & Borders (Soft Teal border)
    iconBg: 'bg-[#F0FDFA]',
    iconBorder: 'border-[1.5px] border-[#5EEAD4]',
    iconShadow: 'shadow-[0_2px_8px_rgba(94,234,212,0.35)]',
    iconColor: 'text-[#0D9488]',
    spokeStroke: '#5EEAD4',
    spokeDot: '#0D9488',
    spoke: { x1: 332, y1: 228, x2: 378, y2: 220, dotX: 378, dotY: 220 },
    floatDuration: 5.9,
    floatDelay: 0.3,
  },
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    description: 'Adapts quickly to new technologies, tools and concepts.',
    icon: Zap,
    xPct: 28,
    yPct: 83,
    // Colors & Borders (Lavender-Pink border)
    iconBg: 'bg-[#FDF4FF]',
    iconBorder: 'border-[1.5px] border-[#F0ABFC]',
    iconShadow: 'shadow-[0_2px_8px_rgba(240,171,252,0.35)]',
    iconColor: 'text-[#C026D3]',
    spokeStroke: '#F0ABFC',
    spokeDot: '#C026D3',
    spoke: { x1: 242, y1: 262, x2: 206, y2: 298, dotX: 206, dotY: 298 },
    floatDuration: 6.4,
    floatDelay: 0.7,
  },
  {
    id: 'critical-thinking',
    title: 'Critical Thinking',
    description: 'Evaluates different approaches before making technical decisions.',
    icon: Brain,
    xPct: 72,
    yPct: 83,
    // Colors & Borders (Muted Teal border)
    iconBg: 'bg-[#F0FDFA]',
    iconBorder: 'border-[1.5px] border-[#2DD4BF]',
    iconShadow: 'shadow-[0_2px_8px_rgba(45,212,191,0.35)]',
    iconColor: 'text-[#0F766E]',
    spokeStroke: '#2DD4BF',
    spokeDot: '#0F766E',
    spoke: { x1: 318, y1: 262, x2: 354, y2: 298, dotX: 354, dotY: 298 },
    floatDuration: 7.1,
    floatDelay: 0.2,
  },
];

// Circular orbit arcs connecting the 5 icon circles with midpoint dots
// Coordinated warm palette: muted rose, dusty lavender, soft plum, and warm teal accents
const ORBIT_ARCS = [
  {
    id: 'arc-comm-lead',
    d: 'M 100 180 A 195 195 0 0 1 280 48',
    stroke: '#FBCFE8',
    dot: { x: 172, y: 96, color: '#F472B6' },
  },
  {
    id: 'arc-lead-prob',
    d: 'M 280 48 A 195 195 0 0 1 460 180',
    stroke: '#E9D5FF',
    dot: { x: 388, y: 96, color: '#A855F7' },
  },
  {
    id: 'arc-prob-crit',
    d: 'M 460 180 A 185 185 0 0 1 405 352',
    stroke: '#99F6E4',
    dot: { x: 454, y: 268, color: '#14B8A6' },
  },
  {
    id: 'arc-crit-quick',
    d: 'M 405 352 A 185 185 0 0 1 155 352',
    stroke: '#F5D0FE',
    dot: { x: 280, y: 396, color: '#D946EF' },
  },
  {
    id: 'arc-quick-comm',
    d: 'M 155 352 A 185 185 0 0 1 100 180',
    stroke: '#FCE7F3',
    dot: { x: 106, y: 268, color: '#FB7185' },
  },
];

export default function CoreQualitiesOrbit() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="w-full max-w-[580px] mx-auto select-none">
      {/* Constellation Canvas (560x480 aspect ratio) */}
      <div className="relative w-full aspect-[560/480]">
        
        {/* SVG Decorative Orbit Arcs & Radial Spokes */}
        <svg
          viewBox="0 0 560 480"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          aria-hidden="true"
        >
          {/* 1. Orbit Arcs connecting the nodes */}
          {ORBIT_ARCS.map((arc) => (
            <g key={arc.id}>
              <motion.path
                d={arc.d}
                fill="none"
                stroke={arc.stroke}
                strokeWidth="1.25"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
              <motion.circle
                cx={arc.dot.x}
                cy={arc.dot.y}
                r="2.5"
                fill={arc.dot.color}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.95 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
            </g>
          ))}

          {/* 2. Radial Spokes with dots pointing outward from Center */}
          {NODES.map((node) => {
            const isHovered = hoveredId === node.id;
            return (
              <g key={`spoke-${node.id}`}>
                <motion.line
                  x1={node.spoke.x1}
                  y1={node.spoke.y1}
                  x2={node.spoke.x2}
                  y2={node.spoke.y2}
                  stroke={node.spokeStroke}
                  strokeWidth={isHovered ? 2 : 1.25}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: isHovered ? 1 : 0.8 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
                <motion.circle
                  cx={node.spoke.dotX}
                  cy={node.spoke.dotY}
                  r={isHovered ? 3.5 : 2.5}
                  fill={node.spokeDot}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: 0.4 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center: Cursive "Core Qualities" in Dark Plum with Warm Accent Underline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none select-none"
        >
          <div
            className="text-[34px] sm:text-[38px] md:text-[42px] font-bold text-[#2D1F30] leading-[0.88] tracking-normal"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Core
          </div>
          <div
            className="text-[34px] sm:text-[38px] md:text-[42px] font-bold text-[#2D1F30] leading-[0.92] tracking-normal mt-0.5"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Qualities
          </div>
          {/* Warm plum / muted rose underline accent */}
          <div className="w-7 sm:w-8 h-[2.5px] bg-[#B85A7F] rounded-full mx-auto mt-1 sm:mt-1.5" />
        </motion.div>

        {/* 5 Floating Quality Nodes */}
        {NODES.map((node, idx) => {
          const Icon = node.icon;
          const isHovered = hoveredId === node.id;

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center cursor-default"
              style={{ left: `${node.xPct}%`, top: `${node.yPct}%` }}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Entrance reveal */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center"
              >
                {/* Ultra-subtle gentle breathing float */}
                <motion.div
                  animate={{ y: [-2.5, 2.5, -2.5] }}
                  transition={{
                    duration: node.floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: node.floatDelay,
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Circular Icon Badge with Defined 1-1.5px Border */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                      node.iconBg
                    } ${node.iconBorder} ${node.iconColor} ${node.iconShadow} ${
                      isHovered ? 'shadow-[0_4px_16px_rgba(45,31,48,0.18)]' : ''
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </motion.div>

                  {/* Title: Deep Charcoal / Dark Plum */}
                  <h4 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#2D1F30] mt-1.5 tracking-tight whitespace-nowrap">
                    {node.title}
                  </h4>

                  {/* Supporting phrase: Muted Warm Grey / Brown */}
                  <p className="text-[10px] sm:text-[11px] md:text-[11.5px] text-[#6B5E65] text-center max-w-[130px] sm:max-w-[155px] leading-tight sm:leading-snug mt-0.5 sm:mt-1 font-normal">
                    {node.description}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
