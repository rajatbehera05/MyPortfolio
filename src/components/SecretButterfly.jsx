import React, { useState, useEffect, useRef } from 'react';

/**
 * SecretButterfly — Ultra-Smooth High-Performance Butterfly with Ornate 3D Wings & Canvas Glitter Trail
 * 
 * Performance Optimizations:
 * 1. Zero React re-renders during flight (uses direct DOM transform via ref instead of 60fps setState).
 * 2. Removed CSS transition-transform conflict which previously fought against requestAnimationFrame.
 * 3. High-performance HTML5 Canvas for the glitter trail (replaces 35+ React SVG DOM nodes with filters).
 * 4. Hardware-accelerated 3D CSS transforms with willChange for flutter-free wing flapping.
 * 5. Full support for High DPI (Retina) displays and prefers-reduced-motion accessibility.
 */
export default function SecretButterfly({ sectionRef }) {
  const [isActive, setIsActive] = useState(false);

  const containerRef = useRef(null);
  const butterflyRef = useRef(null);
  const canvasRef = useRef(null);
  const flightRafRef = useRef(null);
  const isFlyingRef = useRef(false);
  const canTriggerRef = useRef(true);

  useEffect(() => {
    const target = sectionRef?.current || document.getElementById('contact');
    if (!target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const startFlight = () => {
      if (isFlyingRef.current || !canTriggerRef.current) return;
      isFlyingRef.current = true;
      canTriggerRef.current = false;
      setIsActive(true);

      // Give React one tick to mount the canvas and butterfly container
      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        const butterfly = butterflyRef.current;
        const container = containerRef.current;
        if (!butterfly || !canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const screenW = container ? container.clientWidth : window.innerWidth;
        const canvasH = 340;

        canvas.width = Math.floor(screenW * dpr);
        canvas.height = Math.floor(canvasH * dpr);
        canvas.style.width = `${screenW}px`;
        canvas.style.height = `${canvasH}px`;
        ctx.scale(dpr, dpr);

        const flightDuration = 6200; // 6.2s majestic leisurely flight
        const startTime = performance.now();
        const startX = -80;
        const endX = screenW + 80;
        const totalDistance = endX - startX;
        const baseY = 110;

        const particles = [];
        let lastSparkleTime = 0;
        const sparkleColors = ['#F59E0B', '#FBBF24', '#FDE047', '#FEF08A', '#FFFBEB', '#FFFFFF'];

        const animate = (now) => {
          const elapsed = now - startTime;
          const p = Math.min(elapsed / flightDuration, 1);

          // Smoothstep curve for natural glide
          const easeP = p * p * (3 - 2 * p);

          // 1. Horizontal position
          const curX = startX + totalDistance * easeP;

          // 2. Natural sinusoidal vertical wave
          const curY = baseY + Math.sin(p * Math.PI * 6.5) * 20 + Math.sin(p * Math.PI * 2) * 8;

          // 3. Gentle banking tilt
          const curRot = 78 + Math.cos(p * Math.PI * 6.5) * 8;

          // Direct DOM transform (zero React re-renders)
          if (butterfly) {
            butterfly.style.transform = `translate3d(${curX}px, ${curY}px, 0) rotate(${curRot}deg)`;
          }

          // 4. Emit sparkling glitter particles while on-screen
          if (now - lastSparkleTime > 55 && p > 0.02 && p < 0.98) {
            lastSparkleTime = now;

            // Emit 2 glittering particles behind the butterfly
            for (let i = 0; i < 2; i++) {
              const col = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
              particles.push({
                x: curX - 6 + (Math.random() - 0.5) * 12,
                y: curY + 16 + (Math.random() - 0.5) * 8,
                vx: (Math.random() - 0.5) * 0.9 - 0.4,
                vy: 0.5 + Math.random() * 0.9,
                gravity: 0.02,
                color: col,
                size: 2.2 + Math.random() * 1.6,
                maxLife: 50 + Math.floor(Math.random() * 35),
                life: 0,
                rot: Math.random() * Math.PI,
                rotSpeed: (Math.random() - 0.5) * 0.08,
              });
            }
          }

          // 5. Draw Canvas Glitter Particles
          ctx.clearRect(0, 0, screenW, canvasH);

          for (let i = particles.length - 1; i >= 0; i--) {
            const pt = particles[i];
            pt.life++;
            if (pt.life >= pt.maxLife) {
              particles.splice(i, 1);
              continue;
            }

            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.vy += pt.gravity;
            pt.rot += pt.rotSpeed;

            const progress = pt.life / pt.maxLife;
            // Quick fade-in (first 15%), smooth fade-out
            const alpha = progress < 0.15
              ? (progress / 0.15)
              : Math.max(0, 1 - (progress - 0.15) / 0.85);

            ctx.save();
            ctx.translate(pt.x, pt.y);
            ctx.rotate(pt.rot);
            ctx.globalAlpha = alpha;

            // 4-point Diamond Starburst Sparkle
            const s = pt.size;
            ctx.fillStyle = pt.color;
            ctx.shadowColor = pt.color;
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.moveTo(0, -s * 2.2);
            ctx.quadraticCurveTo(0, 0, s * 2.2, 0);
            ctx.quadraticCurveTo(0, 0, 0, s * 2.2);
            ctx.quadraticCurveTo(0, 0, -s * 2.2, 0);
            ctx.quadraticCurveTo(0, 0, 0, -s * 2.2);
            ctx.closePath();
            ctx.fill();

            // Core bright center dot
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(0, 0, s * 0.45, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
          }

          // Continue animation if flight is in progress or particles still settling
          if (p < 1 || particles.length > 0) {
            flightRafRef.current = requestAnimationFrame(animate);
          } else {
            // Flight completed and all sparkles dissolved
            ctx.clearRect(0, 0, screenW, canvasH);
            setIsActive(false);
            isFlyingRef.current = false;
            canTriggerRef.current = true;
          }
        };

        flightRafRef.current = requestAnimationFrame(animate);
      });
    };

    const stopAndReset = () => {
      if (flightRafRef.current) {
        cancelAnimationFrame(flightRafRef.current);
        flightRafRef.current = null;
      }
      isFlyingRef.current = false;
      canTriggerRef.current = true;
      setIsActive(false);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          startFlight();
        } else {
          // Immediately reset whenever user scrolls away from section
          stopAndReset();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      stopAndReset();
    };
  }, [sectionRef]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-40 overflow-hidden"
      style={{ width: '100vw', height: '340px' }}
    >
      {/* High-Performance Canvas for Sparkling Starburst Glitter Trail */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: '100%', height: '340px' }}
      />

      {/* Majestic Swallowtail/Monarch Yellow Butterfly */}
      <div
        ref={butterflyRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: '44px',
          height: '38px',
          perspective: '500px',
          willChange: 'transform',
          transform: 'translate3d(-100px, 110px, 0) rotate(78deg)',
          filter: 'drop-shadow(0 3px 8px rgba(234,179,8,0.4))',
        }}
      >
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Shared Gradients */}
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient id="yellowWingBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="40%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="yellowWingInner" x1="20%" y1="20%" x2="90%" y2="90%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="50%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Left Wing (flaps around right edge) */}
          <div
            className="absolute top-0 right-1/2 w-[22px] h-[38px]"
            style={{
              transformOrigin: 'right 60%',
              animation: 'butterflyWingFlapLeft 0.18s ease-in-out infinite alternate',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            <svg viewBox="0 0 22 38" className="w-full h-full overflow-visible">
              {/* Forewing Base Golden Yellow */}
              <path
                d="M22,22 C19,10 9,1 2,4.5 C-1.5,6.5 0.5,16 10,21 C16,24 20,24 22,22 Z"
                fill="url(#yellowWingBase)"
                stroke="#0F172A"
                strokeWidth="1.2"
              />
              {/* Forewing Ornate Inner Golden Patch */}
              <path
                d="M20,20 C17,11 9,3 3.5,6 C1.2,7.5 2.5,14 10,18.5 C15,21.5 18.5,21.5 20,20 Z"
                fill="url(#yellowWingInner)"
              />
              {/* Forewing Charcoal Edge Patch & White Dots */}
              <path
                d="M2,4.5 C6,2 14,3 21,8 C19,11 11,8 4,8.5 Z"
                fill="#0F172A"
                opacity="0.9"
              />
              <circle cx="5" cy="5" r="0.75" fill="#FFFFFF" />
              <circle cx="9" cy="4.5" r="0.75" fill="#FFFFFF" />
              <circle cx="13" cy="5.5" r="0.75" fill="#FFFFFF" />

              {/* Forewing Stained-Glass Cell Veins */}
              <path d="M22,22 C17,15 10,9 3.5,6" stroke="#1E293B" strokeWidth="0.8" fill="none" opacity="0.85" />
              <path d="M16,19 C12,14 7,12 3,11" stroke="#1E293B" strokeWidth="0.65" fill="none" opacity="0.75" />
              <path d="M18,21 C15,18 11,16 6,17" stroke="#1E293B" strokeWidth="0.65" fill="none" opacity="0.75" />

              {/* Hindwing Base */}
              <path
                d="M22,22 C17,22 6.5,24 5,30 C3.5,35 9.5,38 16,33 C19,30 21,25 22,22 Z"
                fill="url(#yellowWingBase)"
                stroke="#0F172A"
                strokeWidth="1.2"
              />
              {/* Hindwing Inner Bright Patch */}
              <path
                d="M20,22.5 C16,23 8,25 7,29.5 C6,33.5 10.5,35.5 15,31.5 C17.5,29 19,25 20,22.5 Z"
                fill="url(#yellowWingInner)"
              />
              {/* Hindwing Dark Margin with Tiny Dots */}
              <path
                d="M5,30 C6.5,35.5 12,37.5 16,33 C14,34 9.5,33.5 7,29.5 Z"
                fill="#0F172A"
              />
              <circle cx="8" cy="33.5" r="0.65" fill="#FFFFFF" />
              <circle cx="11" cy="35" r="0.65" fill="#FFFFFF" />
              <circle cx="14" cy="33.5" r="0.65" fill="#60A5FA" />
            </svg>
          </div>

          {/* Right Wing (flaps around left edge) */}
          <div
            className="absolute top-0 left-1/2 w-[22px] h-[38px]"
            style={{
              transformOrigin: 'left 60%',
              animation: 'butterflyWingFlapRight 0.18s ease-in-out infinite alternate',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            <svg viewBox="0 0 22 38" className="w-full h-full overflow-visible">
              {/* Forewing Base Golden Yellow */}
              <path
                d="M0,22 C3,10 13,1 20,4.5 C23.5,6.5 21.5,16 12,21 C6,24 2,24 0,22 Z"
                fill="url(#yellowWingBase)"
                stroke="#0F172A"
                strokeWidth="1.2"
              />
              {/* Forewing Ornate Inner Golden Patch */}
              <path
                d="M2,20 C5,11 13,3 18.5,6 C20.8,7.5 19.5,14 12,18.5 C7,21.5 3.5,21.5 2,20 Z"
                fill="url(#yellowWingInner)"
              />
              {/* Forewing Charcoal Edge Patch & White Dots */}
              <path
                d="M20,4.5 C16,2 8,3 1,8 C3,11 11,8 18,8.5 Z"
                fill="#0F172A"
                opacity="0.9"
              />
              <circle cx="17" cy="5" r="0.75" fill="#FFFFFF" />
              <circle cx="13" cy="4.5" r="0.75" fill="#FFFFFF" />
              <circle cx="9" cy="5.5" r="0.75" fill="#FFFFFF" />

              {/* Forewing Stained-Glass Cell Veins */}
              <path d="M0,22 C5,15 12,9 18.5,6" stroke="#1E293B" strokeWidth="0.8" fill="none" opacity="0.85" />
              <path d="M6,19 C10,14 15,12 19,11" stroke="#1E293B" strokeWidth="0.65" fill="none" opacity="0.75" />
              <path d="M4,21 C7,18 11,16 16,17" stroke="#1E293B" strokeWidth="0.65" fill="none" opacity="0.75" />

              {/* Hindwing Base */}
              <path
                d="M0,22 C5,22 15.5,24 17,30 C18.5,35 12.5,38 6,33 C3,30 1,25 0,22 Z"
                fill="url(#yellowWingBase)"
                stroke="#0F172A"
                strokeWidth="1.2"
              />
              {/* Hindwing Inner Bright Patch */}
              <path
                d="M2,22.5 C6,23 14,25 15,29.5 C16,33.5 11.5,35.5 7,31.5 C4.5,29 3,25 2,22.5 Z"
                fill="url(#yellowWingInner)"
              />
              {/* Hindwing Dark Margin with Tiny Dots */}
              <path
                d="M17,30 C15.5,35.5 10,37.5 6,33 C8,34 12.5,33.5 15,29.5 Z"
                fill="#0F172A"
              />
              <circle cx="14" cy="33.5" r="0.65" fill="#FFFFFF" />
              <circle cx="11" cy="35" r="0.65" fill="#FFFFFF" />
              <circle cx="8" cy="33.5" r="0.65" fill="#60A5FA" />
            </svg>
          </div>

          {/* Slender Dark Velvet Body & Curved Antennae */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 12 36" className="w-3 h-9 overflow-visible">
              <ellipse cx="6" cy="22" rx="1.4" ry="8" fill="#0F172A" />
              <circle cx="6" cy="11.5" r="1.6" fill="#0F172A" />
              {/* Antennae */}
              <path d="M6,10 Q3,4.5 1,3.5" stroke="#0F172A" strokeWidth="0.8" strokeLinecap="round" fill="none" />
              <circle cx="1" cy="3.5" r="0.6" fill="#D97706" />
              <path d="M6,10 Q9,4.5 11,3.5" stroke="#0F172A" strokeWidth="0.8" strokeLinecap="round" fill="none" />
              <circle cx="11" cy="3.5" r="0.6" fill="#D97706" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
