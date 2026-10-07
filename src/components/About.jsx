import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Cpu } from 'lucide-react';
import Journey from './Journey';
import WireframeCube from './WireframeCube';
import CoreQualitiesOrbit from './CoreQualitiesOrbit';

/**
 * About Section: ABOUT ME — Arctic Aurora Edition
 * Integrates:
 * 1. My Story & Approach (Personal Intro, Software Dev, Hardware/IoT) + Core Qualities Orbit
 * 2. My Journey (Automatic Train Journey Animation & Milestones)
 * 3. Core Engineering Values (Thoughtful Craft, Reliable Systems, Hardware Fluency)
 */
export default function About() {
  return (
    <section
      id="about"
      aria-label="About Rajat Behera"
      className="w-full relative z-10 overflow-visible py-16 sm:py-20 border-t border-[#D5DFEB]/50"
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="space-y-2.5 mb-14"
        >
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#2563EB] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span>Background</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#64748B]">About Me</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 sm:gap-4">
          <WireframeCube
            size={38}
            color="#EC4899"
            tiltX={26}
            tiltZ={-14}
            duration={15}
            reverse={true}
            divisions={3}
            floating={false}
            className="shrink-0"
          />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] font-sans-editorial">
            My Story &amp; Approach
          </h2>
        </div>
      </motion.div>

      {/* 1. Story & Core Qualities Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
        
        {/* Left Column: Human Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <p className="text-[18px] sm:text-[19px] text-[#111827] leading-relaxed font-medium font-sans-editorial">
            I'm a Computer Science &amp; Engineering student who loves taking ideas from a blank whiteboard to polished, production-ready software.
          </p>

          <p className="text-[15.5px] text-[#4B5563] leading-relaxed font-normal">
            My primary craft centers on full-stack software development. I enjoy building responsive web apps with React and modern JavaScript, structuring high-throughput backend services, and optimizing database queries so interfaces feel instant and effortless.
          </p>

          <p className="text-[15.5px] text-[#4B5563] leading-relaxed font-normal">
            Equally essential is my foundation in physical hardware and IoT. Spending time writing firmware for microcontrollers and designing sensor circuits gives me a unique advantage: I never view computing as a black box. I understand how high-level code translates into memory caches, network sockets, and electrical signals.
          </p>
        </motion.div>

        {/* Right Column: Unique Core Qualities Orbit Visual */}
        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <CoreQualitiesOrbit />
        </div>

      </div>

      {/* 2. MY JOURNEY Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="pt-6 sm:pt-8 border-t border-[#D5DFEB]/80 mt-6 sm:mt-8 relative z-10 overflow-visible"
      >
        <Journey isEmbedded={true} />
      </motion.div>

      {/* 3. Three Core Engineering Philosophy Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 sm:pt-10 border-t border-[#D5DFEB]/60 mt-8 sm:mt-10">
        
        {/* Value 1 */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="group p-5 rounded-2xl border border-[#D5DFEB] bg-white shadow-xs hover:border-[#2563EB]/40 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08),0_0_16px_rgba(139,92,246,0.06)] transition-all duration-300 space-y-2.5 aurora-shimmer-effect"
        >
          <div className="w-9 h-9 rounded-xl bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20 group-hover:scale-105 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200">
            <Code2 className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-[14px] font-bold text-[#111827]">
            Thoughtful Craft
          </h3>
          <p className="text-[12.5px] text-[#64748B] leading-relaxed">
            Clean component hierarchy, strict contracts, and details that delight users.
          </p>
        </motion.div>

        {/* Value 2 */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="group p-5 rounded-2xl border border-[#D5DFEB] bg-white shadow-xs hover:border-[#2563EB]/40 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08),0_0_16px_rgba(139,92,246,0.06)] transition-all duration-300 space-y-2.5 aurora-shimmer-effect"
        >
          <div className="w-9 h-9 rounded-xl bg-[#F1ECFF] text-[#8B5CF6] flex items-center justify-center border border-[#8B5CF6]/20 group-hover:scale-105 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-200">
            <Server className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-[14px] font-bold text-[#111827]">
            Reliable Systems
          </h3>
          <p className="text-[12.5px] text-[#64748B] leading-relaxed">
            Designing services that stay fast, resilient, and observable under load.
          </p>
        </motion.div>

        {/* Value 3 */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="group p-5 rounded-2xl border border-[#D5DFEB] bg-white shadow-xs hover:border-[#2563EB]/40 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08),0_0_16px_rgba(139,92,246,0.06)] transition-all duration-300 space-y-2.5 aurora-shimmer-effect"
        >
          <div className="w-9 h-9 rounded-xl bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20 group-hover:scale-105 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200">
            <Cpu className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-[14px] font-bold text-[#111827]">
            Hardware Fluency
          </h3>
          <p className="text-[12.5px] text-[#64748B] leading-relaxed">
            Understanding constraints from memory buffers all the way to silicon.
          </p>
        </motion.div>

      </div>
      </div>
    </section>
  );
}
