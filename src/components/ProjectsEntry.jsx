import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LiquidButton from './LiquidButton';

/**
 * ProjectsEntry — Premium Ancient Dragon Projects CTA Section
 * 
 * Exact dragon design preserved from reference artwork:
 * - Elevated button moved up into direct horizontal alignment with dragon mouths.
 * - Pristine dragon artwork with organic breathing, body scale pulses, chest expansion, and roar recoil animations.
 * - Ground contact shadows that respond organically to breathing.
 * - Interactive mouse parallax.
 */

export default function ProjectsEntry() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleExplore = () => {
    navigate('/projects');
  };

  return (
    <section
      id="work"
      aria-label="Projects Section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-20 flex flex-col items-center justify-start text-center select-none"
      style={{
        background: 'radial-gradient(ellipse 90% 80% at 50% 45%, #F8FAFD 0%, #EEF4FD 45%, #E2EDFC 100%)',
      }}
    >
      {/* Anchor for external navigation */}
      <div id="systems" className="absolute -top-24" aria-hidden="true" />

      {/* 
        Subtle Precision Blueprint Grid Background (Matching Reference Image)
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 140, 220, 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 140, 220, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 
        Subtle Ethereal Ambient Floating Particles (Matching Reference Image)
      */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '12%', y: '18%', s: 3, d: 4.2 },
          { x: '24%', y: '32%', s: 2.5, d: 5.5 },
          { x: '35%', y: '15%', s: 2, d: 6.1 },
          { x: '48%', y: '25%', s: 3, d: 4.8 },
          { x: '62%', y: '16%', s: 2.5, d: 5.2 },
          { x: '75%', y: '28%', s: 3, d: 6.4 },
          { x: '88%', y: '20%', s: 2, d: 4.5 },
          { x: '18%', y: '75%', s: 2.5, d: 5.8 },
          { x: '82%', y: '78%', s: 3, d: 5.1 },
          { x: '50%', y: '82%', s: 2, d: 6.7 },
        ].map((pt, idx) => (
          <motion.div
            key={`sparkle-${idx}`}
            initial={{ opacity: 0.2, y: 0 }}
            animate={{
              opacity: [0.2, 0.75, 0.2],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: pt.d,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.4,
            }}
            style={{
              left: pt.x,
              top: pt.y,
              width: `${pt.s}px`,
              height: `${pt.s}px`,
            }}
            className="absolute rounded-full bg-blue-400/60 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
          />
        ))}
      </div>

      {/* 
        1. TOP: Large Elegant Editorial Serif Heading
        "Here you go with my Projects."
      */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-[1240px] px-6 sm:px-10 mb-2 sm:mb-4 text-center pointer-events-none"
      >
        <h2 className="font-editorial-serif text-[36px] sm:text-[50px] md:text-[58px] lg:text-[66px] font-normal sm:font-medium tracking-tight text-[#0F172A] leading-tight select-none whitespace-normal sm:whitespace-nowrap">
          Here you go with my Projects.
        </h2>
      </motion.div>

      {/* 
        2. DEDICATED DRAGON ARENA WITH ELEVATED BUTTON & EXACT DRAGONS
        Button moved UP directly between the dragons' mouths.
      */}
      <div className="relative w-full max-w-[1400px] h-[480px] sm:h-[540px] md:h-[600px] lg:h-[650px] flex items-center justify-center px-2 sm:px-6">
        
        {/* ==============================================================
            MIDDLE-LEFT: THE ANCIENT CRIMSON & GOLD DRAGON
            Living organic animation: breathing, chest expansion, and roar recoil
            ============================================================== */}
        <div
          className="absolute left-0 sm:left-2 md:left-4 lg:left-6 bottom-4 sm:bottom-6 md:bottom-8 z-10 w-[240px] sm:w-[320px] md:w-[410px] lg:w-[480px] pointer-events-none"
          style={{ transformPerspective: 900 }}
        >
          {/* Ground Contact Shadow with breathing response */}
          <motion.div
            animate={{
              scaleX: [1, 0.94, 0.98, 0.92, 1],
              opacity: [0.26, 0.17, 0.22, 0.15, 0.26],
            }}
            transition={{
              duration: 4.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-8 sm:h-10 rounded-[100%] bg-[#0f172a] blur-md pointer-events-none"
          />

          {/* Dragon Container with lifelike organic animation */}
          <motion.div
            animate={{
              y: [0, -7, -2, -9, 0],
              rotate: [0, 0.8, -0.3, 1.1, 0],
              scale: [1, 1.018, 1.004, 1.022, 1],
              x: [0, 4, -2, 6, 0],
              rotateX: mousePos.y * 3,
              rotateY: mousePos.x * -4,
            }}
            transition={{
              y: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' },
              rotateX: { duration: 0.3, ease: 'easeOut' },
              rotateY: { duration: 0.3, ease: 'easeOut' },
            }}
            className="relative w-full aspect-[415/520] origin-bottom-center"
          >
            {/* Pristine Dragon Artwork */}
            <img
              src="/assets/left_dragon_clean.png"
              alt="Ancient Fire Dragon"
              draggable={false}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(15,23,42,0.14)]"
            />

          </motion.div>
        </div>

        {/* ==============================================================
            CENTER: ELEVATED "EXPLORE MY PROJECTS" BUTTON
            Shifted UP to align horizontally between both dragon mouths.
            ============================================================== */}
        <div className="relative z-30 pointer-events-auto -translate-y-10 sm:-translate-y-12 md:-translate-y-14 lg:-translate-y-16">
          <LiquidButton
            id="projects-cta-btn"
            variant="primary"
            size="lg"
            onClick={handleExplore}
            aria-label="Explore My Projects"
          >
            Explore My Projects
          </LiquidButton>
        </div>

        {/* ==============================================================
            MIDDLE-RIGHT: THE MATCHING ANCIENT DRAGON
            Living organic animation: breathing, chest expansion, and roar recoil
            ============================================================== */}
        <div
          className="absolute right-0 sm:right-2 md:right-4 lg:right-6 bottom-4 sm:bottom-6 md:bottom-8 z-10 w-[240px] sm:w-[320px] md:w-[410px] lg:w-[480px] pointer-events-none"
          style={{ transformPerspective: 900 }}
        >
          {/* Ground Contact Shadow with breathing response */}
          <motion.div
            animate={{
              scaleX: [1, 0.94, 0.98, 0.92, 1],
              opacity: [0.26, 0.17, 0.22, 0.15, 0.26],
            }}
            transition={{
              duration: 4.4,
              repeat: Infinity,
              delay: 0.4,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-8 sm:h-10 rounded-[100%] bg-[#0f172a] blur-md pointer-events-none"
          />

          {/* Dragon Container with lifelike organic animation */}
          <motion.div
            animate={{
              y: [0, -7, -2, -9, 0],
              rotate: [0, -0.8, 0.3, -1.1, 0],
              scale: [1, 1.018, 1.004, 1.022, 1],
              x: [0, -4, 2, -6, 0],
              rotateX: mousePos.y * 3,
              rotateY: mousePos.x * 4,
            }}
            transition={{
              y: { duration: 4.4, repeat: Infinity, delay: 0.4, ease: 'easeInOut' },
              rotate: { duration: 4.4, repeat: Infinity, delay: 0.4, ease: 'easeInOut' },
              scale: { duration: 4.4, repeat: Infinity, delay: 0.4, ease: 'easeInOut' },
              x: { duration: 4.4, repeat: Infinity, delay: 0.4, ease: 'easeInOut' },
              rotateX: { duration: 0.3, ease: 'easeOut' },
              rotateY: { duration: 0.3, ease: 'easeOut' },
            }}
            className="relative w-full aspect-[414/520] origin-bottom-center"
          >
            {/* Pristine Dragon Artwork */}
            <img
              src="/assets/right_dragon_clean.png"
              alt="Ancient Fire Dragon"
              draggable={false}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(15,23,42,0.14)]"
            />

          </motion.div>
        </div>

      </div>
    </section>
  );
}
