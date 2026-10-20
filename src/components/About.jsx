import React from 'react';
import { motion } from 'framer-motion';
import Journey from './Journey';
import WireframeCube from './WireframeCube';
import CoreQualitiesOrbit from './CoreQualitiesOrbit';

/**
 * About Section: ABOUT ME — Arctic Aurora Edition
 * Integrates:
 * 1. My Story & Approach (Personal Intro, Software Dev, Hardware/IoT) + Core Qualities Orbit
 * 2. My Journey (Automatic Train Journey Animation & Milestones)
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
          className="lg:col-span-6 space-y-6"
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
        <div className="lg:col-span-6 w-full flex items-center justify-center">
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
      </div>
    </section>
  );
}
