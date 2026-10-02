import React, { useState, useEffect, useRef } from 'react';

/**
 * SecretButterfly — Slow Majestic Yellow Butterfly with Ornate Wing Patches & Rich Glitter Trail
 * 
 * Flits across the contact section whenever a visitor scrolls to it.
 * 
 * Features:
 * 1. Speed: Slow, graceful, leisurely flight across the screen (~6.8s).
 * 2. Butterfly Design:
 *    - Larger, elegant wings (~44px span).
 *    - Rich golden-yellow & amber palette with black margin borders and white accent dots.
 *    - Intricate patch/cell vein design inspired by swallowtail/monarch wings.
 * 3. Glitter Trail:
 *    - Rich, twinkling golden & champagne starburst trail cascading down into the section.
 * 4. Movement:
 *    - Starts off-screen left (X = -160px).
 *    - Flies horizontally across the full viewport to off-screen right (X = viewport + 160px).
 *    - Gentle natural sinusoidal up/down undulation.
 *    - Triggers every time visitor scrolls into the contact section.
 */
export default function SecretButterfly({ sectionRef }) {
  const [isFlying, setIsFlying] = useState(false);
  const [offset, setOffset] = useState({ x: -160, y: 110, rot: 78 });
  const [glitters, setGlitters] = useState([]);

  const flightRafRef = useRef(null);
  const glitterIdRef = useRef(0);
  const isFlyingRef = useRef(false);
  const canTriggerRef = useRef(true);

  useEffect(() => {
    const target = sectionRef?.current || document.getElementById('contact');
    if (!target) return;

    const startFlight = () => {
      if (isFlyingRef.current || !canTriggerRef.current) return;
      isFlyingRef.current = true;
      canTriggerRef.current = false;
      setIsFlying(true);

      // Slow, graceful horizontal glide (~6.8s)
      const flightDuration = 6800;
      const startTime = performance.now();
      let lastGlitterTime = 0;

      const screenW = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const startX = -160;
      const endX = screenW + 160;
      const totalDistance = endX - startX;
      const baseY = 110;

      const animate = (now) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / flightDuration, 1);

        // Natural smoothstep curve
        const easeP = p * p * (3 - 2 * p);

        // 1. Horizontal movement from off-screen left to off-screen right
        const curX = startX + totalDistance * easeP;

        // 2. Subtle natural sinusoidal vertical wave
        const curY = baseY + Math.sin(p * Math.PI * 6.5) * 18 + Math.sin(p * Math.PI * 2) * 8;

        // 3. Rotation facing right with gentle wave banking tilt
        const curRot = 78 + Math.cos(p * Math.PI * 6.5) * 7;

        setOffset({ x: curX, y: curY, rot: curRot });

        // 4. Cascading glitter trail falling down into the section (~every 70ms)
        if (now - lastGlitterTime > 70 && p > 0.03 && p < 0.97) {
          lastGlitterTime = now;
          const id1 = ++glitterIdRef.current;
          const id2 = ++glitterIdRef.current;
          const colors = ['#F59E0B', '#FBBF24', '#FDE047', '#FEF08A', '#FFFBEB', '#FFFFFF'];
          const col1 = colors[Math.floor(Math.random() * colors.length)];
          const col2 = colors[Math.floor(Math.random() * colors.length)];

          const jX1 = (Math.random() - 0.5) * 10;
          const jY1 = (Math.random() - 0.5) * 8;
          const jX2 = (Math.random() - 0.5) * 12 - 8;
          const jY2 = (Math.random() - 0.5) * 10;

          // Downward cascade parameters: particles drift down 45px - 115px toward the section content below
          const fallDist1 = 45 + Math.random() * 40;
          const fallDist2 = 75 + Math.random() * 45;
          const driftX1 = (Math.random() - 0.5) * 20;
          const driftX2 = (Math.random() - 0.5) * 24;
          const dur1 = (1.2 + Math.random() * 0.4).toFixed(2);
          const dur2 = (1.4 + Math.random() * 0.4).toFixed(2);

          const newParticles = [
            {
              id: id1,
              x: curX - 10 + jX1,
              y: curY + 16 + jY1,
              color: col1,
              size: 2.8,
              fallDist: fallDist1,
              driftX: driftX1,
              duration: dur1,
            },
            {
              id: id2,
              x: curX - 18 + jX2,
              y: curY + 18 + jY2,
              color: col2,
              size: 2.4,
              fallDist: fallDist2,
              driftX: driftX2,
              duration: dur2,
            },
          ];

          setGlitters((prev) => [...prev.slice(-35), ...newParticles]);

          setTimeout(() => {
            setGlitters((prev) => prev.filter((g) => g.id !== id1 && g.id !== id2));
          }, 1800);
        }

        if (p < 1) {
          flightRafRef.current = requestAnimationFrame(animate);
        } else {
          // Off-screen right: wait for remaining falling glitter to dissipate
          setTimeout(() => {
            setIsFlying(false);
            isFlyingRef.current = false;
            // Allow triggering again on subsequent scroll interactions
            setTimeout(() => {
              canTriggerRef.current = true;
            }, 1000);
          }, 1800);
        }
      };

      flightRafRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          startFlight();
        } else {
          // When user scrolls away from the section, reset trigger lock so returning triggers flight again
          canTriggerRef.current = true;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (flightRafRef.current) {
        cancelAnimationFrame(flightRafRef.current);
      }
    };
  }, [sectionRef]);

  if (!isFlying && glitters.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-40 overflow-visible"
      style={{ width: '100vw' }}
    >
      {/* Rich Twinkling Cascading Glitter Particles falling down into section */}
      {glitters.map((g) => (
        <div
          key={g.id}
          className="absolute"
          style={{
            left: `${g.x}px`,
            top: `${g.y}px`,
            pointerEvents: 'none',
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              animation: `butterflySparkleFall ${g.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              '--fall-dist': `${g.fallDist}px`,
              '--drift-x': `${g.driftX}px`,
            }}
          >
            {/* 4-point Diamond Starburst Sparkle */}
            <svg
              width={g.size * 4}
              height={g.size * 4}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
              style={{
                filter: `drop-shadow(0 0 4px ${g.color})`,
              }}
            >
              <path
                d="M8 0 C8 4 9 7 16 8 C9 9 8 12 8 16 C8 12 7 9 0 8 C7 7 8 4 8 0 Z"
                fill={g.color}
              />
              <circle cx="8" cy="8" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      ))}

      {/* Majestic Swallowtail/Monarch Yellow Butterfly */}
      {isFlying && (
        <div
          className="absolute pointer-events-none transition-transform duration-75"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${offset.rot}deg)`,
            width: '44px',
            height: '38px',
            perspective: '500px',
            filter: 'drop-shadow(0 3px 8px rgba(234,179,8,0.35))',
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
      )}
    </div>
  );
}
