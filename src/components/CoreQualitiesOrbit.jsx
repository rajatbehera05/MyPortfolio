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
    // Colors
    iconBg: 'bg-[#F3E8FF]',
    iconBorder: 'border-[#E9D5FF]',
    iconColor: 'text-[#9333EA]',
    spokeStroke: '#C084FC',
    spokeDot: '#A855F7',
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
    iconBg: 'bg-[#EFF6FF]',
    iconBorder: 'border-[#DBEAFE]',
    iconColor: 'text-[#3B82F6]',
    spokeStroke: '#93C5FD',
    spokeDot: '#3B82F6',
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
    iconBg: 'bg-[#ECFDF5]',
    iconBorder: 'border-[#D1FAE5]',
    iconColor: 'text-[#059669]',
    spokeStroke: '#6EE7B7',
    spokeDot: '#10B981',
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
    iconBg: 'bg-[#F5F3FF]',
    iconBorder: 'border-[#EDE9FE]',
    iconColor: 'text-[#7C3AED]',
    spokeStroke: '#DDD6FE',
    spokeDot: '#8B5CF6',
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
    iconBg: 'bg-[#F0F9FF]',
    iconBorder: 'border-[#E0F2FE]',
    iconColor: 'text-[#0284C7]',
    spokeStroke: '#93C5FD',
    spokeDot: '#0284C7',
    spoke: { x1: 318, y1: 262, x2: 354, y2: 298, dotX: 354, dotY: 298 },
    floatDuration: 7.1,
    floatDelay: 0.2,
  },
];

// Circular orbit arcs connecting the 5 icon circles with midpoint dots
const ORBIT_ARCS = [
  {
    id: 'arc-comm-lead',
    d: 'M 100 180 A 195 195 0 0 1 280 48',
    stroke: '#93C5FD',
    dot: { x: 172, y: 96, color: '#38BDF8' },
  },
  {
    id: 'arc-lead-prob',
    d: 'M 280 48 A 195 195 0 0 1 460 180',
    stroke: '#A7F3D0',
    dot: { x: 388, y: 96, color: '#34D399' },
  },
  {
    id: 'arc-prob-crit',
    d: 'M 460 180 A 185 185 0 0 1 405 352',
    stroke: '#BAE6FD',
    dot: { x: 454, y: 268, color: '#0EA5E9' },
  },
  {
    id: 'arc-crit-quick',
    d: 'M 405 352 A 185 185 0 0 1 155 352',
    stroke: '#E9D5FF',
    dot: { x: 280, y: 396, color: '#C084FC' },
  },
  {
    id: 'arc-quick-comm',
    d: 'M 155 352 A 185 185 0 0 1 100 180',
    stroke: '#DDD6FE',
    dot: { x: 106, y: 268, color: '#A78BFA' },
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
                whileInView={{ pathLength: 1, opacity: 0.75 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
              <motion.circle
                cx={arc.dot.x}
                cy={arc.dot.y}
                r="2.5"
                fill={arc.dot.color}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.9 }}
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
                  whileInView={{ pathLength: 1, opacity: isHovered ? 1 : 0.75 }}
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

        {/* Center: Cursive "Core Qualities" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none select-none"
        >
          <div
            className="text-[34px] sm:text-[38px] md:text-[42px] font-bold text-[#1E293B] leading-[0.88] tracking-normal"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Core
          </div>
          <div
            className="text-[34px] sm:text-[38px] md:text-[42px] font-bold text-[#1E293B] leading-[0.92] tracking-normal mt-0.5"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Qualities
          </div>
          {/* Blue underline accent */}
          <div className="w-7 sm:w-8 h-[2.5px] bg-[#2563EB] rounded-full mx-auto mt-1 sm:mt-1.5" />
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
                  {/* Circular Icon Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border shadow-xs transition-shadow duration-300 ${
                      node.iconBg
                    } ${node.iconBorder} ${node.iconColor} ${
                      isHovered ? 'shadow-[0_4px_16px_rgba(15,23,42,0.1)]' : ''
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#111827] mt-1.5 tracking-tight whitespace-nowrap">
                    {node.title}
                  </h4>

                  {/* Supporting phrase */}
                  <p className="text-[10px] sm:text-[11px] md:text-[11.5px] text-[#64748B] text-center max-w-[130px] sm:max-w-[155px] leading-tight sm:leading-snug mt-0.5 sm:mt-1">
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
