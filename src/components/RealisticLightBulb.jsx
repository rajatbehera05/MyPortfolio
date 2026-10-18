import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * RealisticLightBulb Component
 * 
 * - Ultra-photorealistic 3D rendered clear glass incandescent bulb
 * - Detailed metallic brass threaded screw base, glass envelope, and tungsten filament
 * - Physically convincing illumination bloom, warm golden filament strike, and gentle breathing pulse
 * - Harmonious blend of warm golden amber (#F59E0B / #FDE047) with subtle ambient blue-violet (#6366F1 / #8B5CF6)
 * - Automatically switches on when scrolled into viewport
 * - Accessible with prefers-reduced-motion fallback
 */
export default function RealisticLightBulb({
  size = 56,
  className = '',
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const [isLit, setIsLit] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsLit(true);
    };
    mq.addEventListener('change', handleChange);

    if (mq.matches) {
      return () => mq.removeEventListener('change', handleChange);
    }

    if (isInView) {
      // Gentle realistic ignition delay (250ms) so user sees the bulb illuminate as section reveals
      const timer = setTimeout(() => {
        setIsLit(true);
      }, 250);
      return () => {
        clearTimeout(timer);
        mq.removeEventListener('change', handleChange);
      };
    }

    return () => mq.removeEventListener('change', handleChange);
  }, [isInView]);

  const toggleBulb = () => {
    setIsLit((prev) => !prev);
  };

  // Dimensions
  const bulbHeight = size;
  const bulbWidth = size;

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={isLit ? "Light bulb switched on (click to toggle)" : "Light bulb switched off (click to toggle)"}
      onClick={toggleBulb}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleBulb();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group transition-transform duration-300 hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/50 rounded-full ${className}`}
      style={{
        width: bulbWidth,
        height: bulbHeight,
      }}
    >
      {/* 1. LAYER 1: Ambient Outer Glow Spill (Harmonizes Warm Amber + Blue-Violet Accent) */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: isLit ? (isHovered ? 0.95 : 0.75) : 0,
          scale: isLit ? (isHovered ? 1.15 : 1) : 0.8,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.7,
          ease: 'easeOut',
        }}
        className="absolute -inset-4 sm:-inset-6 pointer-events-none rounded-full blur-xl"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(251, 191, 36, 0.42) 0%, rgba(245, 158, 11, 0.22) 35%, rgba(99, 102, 241, 0.16) 65%, transparent 80%)',
        }}
      />

      {/* 2. LAYER 2: Inner Filament Radiant Halo (Subtle Breathing Pulse) */}
      {!prefersReducedMotion ? (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isLit ? [0.65, 0.88, 0.65] : 0,
            scale: isLit ? [0.95, 1.06, 0.95] : 0.8,
          }}
          transition={{
            opacity: {
              repeat: isLit ? Infinity : 0,
              duration: 3.4,
              ease: 'easeInOut',
            },
            scale: {
              repeat: isLit ? Infinity : 0,
              duration: 3.4,
              ease: 'easeInOut',
            },
          }}
          className="absolute inset-1 pointer-events-none rounded-full blur-md"
          style={{
            background: 'radial-gradient(circle at 50% 36%, rgba(255, 243, 199, 0.85) 0%, rgba(251, 191, 36, 0.5) 45%, rgba(245, 158, 11, 0.15) 70%, transparent 85%)',
          }}
        />
      ) : (
        isLit && (
          <div
            aria-hidden="true"
            className="absolute inset-1 pointer-events-none rounded-full blur-md"
            style={{
              background: 'radial-gradient(circle at 50% 36%, rgba(255, 243, 199, 0.85) 0%, rgba(251, 191, 36, 0.5) 45%, rgba(245, 158, 11, 0.15) 70%, transparent 85%)',
            }}
          />
        )
      )}

      {/* 3. PHYSICAL 3D BULB CORE CONTAINER */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Physical Off-State 3D Bulb (Base Layer: Glass Reflections & Brass Thread) */}
        <img
          src="/assets/bulb_off.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-500 drop-shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
        />

        {/* Physical Lit-State 3D Bulb (Smooth Dissolve & Incandescent Glow) */}
        <motion.img
          src="/assets/bulb_on.png"
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isLit ? (isHovered ? 1 : 0.95) : 0,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.65,
            ease: 'easeOut',
          }}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none filter drop-shadow-[0_0_12px_rgba(251,191,36,0.45)]"
        />

        {/* Tungsten Filament Core Ignition Hotspot */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isLit ? (isHovered ? 1 : 0.85) : 0,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            ease: 'easeOut',
          }}
          className="absolute top-[32%] left-[38%] w-[24%] h-[12%] pointer-events-none rounded-full blur-[1.5px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.98) 0%, rgba(254, 240, 138, 0.9) 50%, rgba(245, 158, 11, 0.4) 100%)',
            boxShadow: '0 0 10px 2px rgba(253, 224, 71, 0.65)',
          }}
        />
      </div>

      {/* 4. Subtle Tooltip / Accessible Hint */}
      <span className="sr-only">
        {isLit ? 'Education idea illumination active' : 'Click to illuminate ideas'}
      </span>
    </div>
  );
}
