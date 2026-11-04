import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Ultra-Premium Cosmic Shooting Star Scrollbar
 *
 * Core mechanics:
 * 1. The shooting star ITSELF is the draggable scrollbar thumb.
 * 2. Full viewport-height extreme-right vertical track with click-to-scroll & drag-to-scroll.
 * 3. 4-point star head: crisp SVG path with brilliant icy-white nucleus, electric-blue outer glow, and violet atmospheric corona.
 * 4. Tapered meteor tail extending behind the star based on scroll velocity and direction.
 * 5. Trailing fading particles (stardust) with natural opacity and jitter along the tail.
 * 6. Smooth requestAnimationFrame physics loop for inertia, tail expansion, and smooth star rotation.
 */
export default function CosmicScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollYRef = useRef(0);

  // Real-time animation physics refs (avoiding React re-renders during high-frequency scroll)
  const animStateRef = useRef({
    currentProgress: 0,
    targetProgress: 0,
    velocity: 0,
    direction: 1, // +1 for down, -1 for up
    lastScrollY: 0,
    lastTime: performance.now(),
    isScrolling: false,
    scrollTimeout: null,
  });

  const [starPos, setStarPos] = useState({ topPct: 0, speed: 0, dir: 'down', isMoving: false });
  const [particles, setParticles] = useState([]);
  const particleIdCounter = useRef(0);

  // Subtle ambient stars along the right track (clean, non-intrusive)
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      top: 8 + (i * 84) / 8 + (Math.sin(i * 2.3) * 3), // 8% to 92%
      offset: (i % 2 === 0 ? 1 : -1) * (1 + (i % 3) * 1.5),
      size: 1 + (i % 3) * 0.6, // 1px to 2.2px
      opacity: 0.18 + (i % 3) * 0.12,
      duration: 3 + (i % 3) * 1.2,
      delay: (i * 0.4) % 3,
    }));
  }, []);

  // Sync scroll progress and velocity
  useEffect(() => {
    let rafId = null;

    const updateScrollMetrics = () => {
      const scrollY = window.scrollY;
      const now = performance.now();
      const state = animStateRef.current;
      const dt = Math.max(now - state.lastTime, 1);
      const dy = scrollY - state.lastScrollY;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetP = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      state.targetProgress = targetP;

      // Calculate normalized velocity (pixels / ms)
      const instantVelocity = Math.abs(dy) / dt;
      state.velocity = Math.min(instantVelocity * 1.5, 4.5);

      if (Math.abs(dy) > 0.5) {
        state.direction = dy > 0 ? 1 : -1;
        state.isScrolling = true;

        if (state.scrollTimeout) clearTimeout(state.scrollTimeout);
        state.scrollTimeout = setTimeout(() => {
          animStateRef.current.isScrolling = false;
          animStateRef.current.velocity = 0;
        }, 140);
      }

      state.lastScrollY = scrollY;
      state.lastTime = now;
    };

    // Smooth animation loop to update thumb position & particle trail
    let lastParticleTime = 0;
    const animate = (currentTime) => {
      const state = animStateRef.current;

      // Smooth interpolation for silky physics (lerp)
      const lerpFactor = prefersReducedMotion ? 1 : 0.22;
      state.currentProgress += (state.targetProgress - state.currentProgress) * lerpFactor;

      // Gradually decay velocity when stopped
      if (!state.isScrolling && state.velocity > 0.01) {
        state.velocity *= 0.88;
      }

      // Update state for visual star rendering
      setStarPos({
        topPct: state.currentProgress * 100,
        speed: state.velocity,
        dir: state.direction > 0 ? 'down' : 'up',
        isMoving: state.isScrolling || state.velocity > 0.08,
      });

      // Spawn meteor dust particles along the tail when in motion
      if (!prefersReducedMotion && state.velocity > 0.12 && currentTime - lastParticleTime > 45) {
        lastParticleTime = currentTime;
        const dir = state.direction;
        const speed = state.velocity;
        const pId = ++particleIdCounter.current;

        const newParticle = {
          id: pId,
          x: (Math.random() - 0.5) * (4 + speed * 3), // slight horizontal dispersion
          y: dir > 0 ? -(6 + Math.random() * (12 + speed * 16)) : (6 + Math.random() * (12 + speed * 16)),
          size: 1 + Math.random() * (1.5 + speed * 0.5),
          opacity: 0.85 + Math.random() * 0.15,
          color: Math.random() > 0.4 ? '#60A5FA' : Math.random() > 0.5 ? '#E0F2FE' : '#C084FC',
        };

        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    updateScrollMetrics();
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', updateScrollMetrics);
      if (rafId) cancelAnimationFrame(rafId);
      if (animStateRef.current.scrollTimeout) clearTimeout(animStateRef.current.scrollTimeout);
    };
  }, [prefersReducedMotion]);

  // Clean expired stardust particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => (prev.length > 0 ? prev.slice(1) : []));
    }, 180);
    return () => clearTimeout(timer);
  }, [particles]);

  // Track click: Jump scroll to clicked position
  const handleTrackClick = useCallback((e) => {
    // If clicking directly on or dragging the star, ignore
    if (isDraggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clickPct = Math.min(Math.max(clickY / rect.height, 0), 1);

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = clickPct * maxScroll;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  // Mouse Drag on Star Thumb: Draggable like a native scrollbar thumb
  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartScrollYRef.current = window.scrollY;

    const onPointerMove = (moveEvent) => {
      if (!isDraggingRef.current || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const deltaY = moveEvent.clientY - dragStartYRef.current;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const deltaScroll = (deltaY / rect.height) * maxScroll;

      window.scrollTo({
        top: Math.min(Math.max(dragStartScrollYRef.current + deltaScroll, 0), maxScroll),
        behavior: 'auto',
      });
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, []);

  // Compute dynamic meteor tail properties based on speed and direction
  const tailLength = useMemo(() => {
    if (prefersReducedMotion) return 14;
    const base = starPos.isMoving ? 26 : 10;
    return Math.min(base + starPos.speed * 28, 96); // 10px stationary -> up to 96px on rapid scroll
  }, [starPos.speed, starPos.isMoving, prefersReducedMotion]);

  const tailOpacity = useMemo(() => {
    if (prefersReducedMotion) return 0.5;
    return Math.min(0.45 + starPos.speed * 0.28, 0.98);
  }, [starPos.speed, prefersReducedMotion]);

  return (
    <aside
      aria-label="Cosmic Shooting Star Scrollbar"
      className="fixed right-0 top-0 bottom-0 z-50 w-7 flex items-center justify-end select-none pointer-events-none"
    >
      {/* Extreme Right Edge Custom Scroll Track (Full Viewport Height) */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative h-full w-full flex items-center justify-center cursor-pointer pointer-events-auto group"
      >
        {/* Subtle, extremely narrow translucent dark track channel (2px) */}
        <div className="absolute right-[5px] top-2 bottom-2 w-[1.5px] bg-slate-400/20 dark:bg-slate-700/30 rounded-full transition-colors duration-300 group-hover:bg-blue-400/30" />

        {/* Ambient background stars (subtle, distant, non-intrusive) */}
        {!prefersReducedMotion &&
          backgroundStars.map((st) => (
            <div
              key={`bg-star-${st.id}`}
              className="absolute right-[5px] rounded-full pointer-events-none bg-blue-200/40"
              style={{
                top: `${st.top}%`,
                transform: `translateX(${st.offset}px)`,
                width: `${st.size}px`,
                height: `${st.size}px`,
                opacity: st.opacity,
                animation: `nightStarTwinkle ${st.duration}s ease-in-out infinite alternate`,
                animationDelay: `${st.delay}s`,
              }}
            />
          ))}

        {/* =========================================================================
            THE ANIMATED SHOOTING STAR SCROLLBAR THUMB
            ========================================================================= */}
        <div
          onPointerDown={handlePointerDown}
          className="absolute right-[5px] -translate-x-[50%] -translate-y-1/2 flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto group/star z-30 touch-none"
          style={{
            top: `calc(${starPos.topPct}% * 0.96 + 2%)`, // padded within viewport margins
          }}
        >
          {/* 1. TAPERED LUMINOUS METEOR TAIL (Follows real scroll direction) */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-75 ease-out ${
              starPos.dir === 'down' ? 'bottom-[6px] origin-bottom' : 'top-[6px] origin-top'
            }`}
            style={{
              height: `${tailLength}px`,
              width: starPos.speed > 1.2 ? '3.5px' : '2.5px',
              opacity: tailOpacity,
              background:
                starPos.dir === 'down'
                  ? 'linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(96, 165, 250, 0.8) 25%, rgba(139, 92, 246, 0.45) 60%, rgba(139, 92, 246, 0) 100%)'
                  : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 0%, rgba(96, 165, 250, 0.8) 25%, rgba(139, 92, 246, 0.45) 60%, rgba(139, 92, 246, 0) 100%)',
              filter: `drop-shadow(0 0 6px rgba(56, 189, 248, 0.85)) drop-shadow(0 0 12px rgba(139, 92, 246, 0.5))`,
              borderRadius: '9999px',
            }}
          >
            {/* Subtle Core Flare Ray inside the tail for irregularity and cinematic realism */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-[1px] bg-white/90 ${
                starPos.dir === 'down' ? 'bottom-0' : 'top-0'
              }`}
              style={{ height: `${tailLength * 0.65}px` }}
            />
          </div>

          {/* 2. DYNAMIC FAILING PARTICLES / STARDUST TRAIL */}
          {!prefersReducedMotion &&
            particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full pointer-events-none transition-all duration-200 ease-out"
                style={{
                  top: `${p.y}px`,
                  left: `${p.x}px`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  boxShadow: `0 0 6px ${p.color}, 0 0 10px rgba(139, 92, 246, 0.4)`,
                }}
              />
            ))}

          {/* 3. ATMOSPHERIC VIOLET CORONA (Outer Soft Glow) */}
          <div
            className="absolute -inset-3.5 rounded-full bg-[#8B5CF6]/35 blur-[8px] pointer-events-none transition-all duration-300"
            style={{
              transform: `scale(${1 + Math.min(starPos.speed * 0.35, 0.7)})`,
            }}
          />

          {/* 4. ELECTRIC-BLUE MIDDLE HALO */}
          <div
            className="absolute -inset-1.5 rounded-full bg-[#38BDF8]/65 blur-[4px] pointer-events-none transition-all duration-200"
            style={{
              transform: `scale(${1 + Math.min(starPos.speed * 0.25, 0.5)})`,
            }}
          />

          {/* 5. DISTINCT FOUR-POINT STAR HEAD (SVG Meteor Silhouette) */}
          <div
            className="relative flex items-center justify-center pointer-events-none"
            style={{
              transform: `rotate(${starPos.isMoving ? (starPos.dir === 'down' ? 180 : 0) : 45}deg)`,
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* 4-Point Star Silhouette */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.95)] drop-shadow-[0_0_14px_rgba(56,189,248,0.9)]"
            >
              {/* Four-Point Geometric Star Body */}
              <path
                d="M12 0C12 7.2 7.2 12 0 12C7.2 12 12 16.8 12 24C12 16.8 16.8 12 24 12C16.8 12 12 7.2 12 0Z"
                fill="url(#starGradient)"
              />
              <defs>
                <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="45%" stopColor="#F0F9FF" />
                  <stop offset="75%" stopColor="#93C5FD" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>
              </defs>
            </svg>

            {/* Ultra-Brilliant Icy-White Nucleus */}
            <div
              className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF,0_0_12px_#38BDF8]"
            />
          </div>

          {/* Draggable Hover Glow / Touch Target Expander */}
          <div className="absolute -inset-3 rounded-full pointer-events-none opacity-0 group-hover/star:opacity-100 transition-opacity duration-300 ring-1 ring-blue-400/40" />
        </div>
      </div>
    </aside>
  );
}
