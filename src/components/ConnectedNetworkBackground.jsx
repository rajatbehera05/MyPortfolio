import React, { useEffect, useRef } from 'react';

/**
 * ConnectedNetworkBackground
 * 
 * Quiet, Sophisticated Atmospheric Canvas:
 * - Deep graphite base (#0A0D10) with subtle midnight blue volumetric depth
 * - Barely visible architectural datum lines
 * - Extremely sparse, calm data points that drift quietly in the background
 * - Keeps typography immediately legible and high-contrast
 * - Strictly respects prefers-reduced-motion
 */
export default function ConnectedNetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let points = [];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initPoints();
    };

    const initPoints = () => {
      const isMobile = width < 768;
      // Extremely sparse: 12 on mobile, 22 on desktop
      const count = isMobile ? 10 : 20;

      points = [];
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.08,
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.08,
          radius: Math.random() * 0.8 + 0.8,
          baseAlpha: Math.random() * 0.14 + 0.08,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    let lastTime = performance.now();

    const draw = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Render calm, sparse points
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        if (!prefersReducedMotion) {
          pt.x += pt.vx * 30 * delta;
          pt.y += pt.vy * 30 * delta;
          pt.phase += 0.01;

          if (pt.x < -10) pt.x = width + 10;
          if (pt.x > width + 10) pt.x = -10;
          if (pt.y < -10) pt.y = height + 10;
          if (pt.y > height + 10) pt.y = -10;
        }

        const breathe = Math.sin(pt.phase) * 0.03;
        const currentAlpha = Math.max(0.04, pt.baseAlpha + breathe);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(170, 181, 192, ${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0D10]"
    >
      {/* 1. Volumetric depth illumination (Soft Midnight Blue & Dark Slate) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 75% 60% at 75% 38%, rgba(20, 26, 33, 0.95) 0%, rgba(15, 20, 25, 0.7) 45%, transparent 85%),
            radial-gradient(ellipse 60% 50% at 20% 25%, rgba(15, 20, 25, 0.9) 0%, transparent 70%),
            radial-gradient(circle at 70% 45%, rgba(22, 217, 232, 0.025) 0%, transparent 60%),
            linear-gradient(180deg, #0A0D10 0%, #0D1116 100%)
          `
        }}
      />

      {/* 2. Barely visible structural datum lines (Framing the editorial space) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="88" x2="100%" y2="88" stroke="#1A222B" strokeWidth="0.75" />
        <line x1="48%" y1="0" x2="48%" y2="100%" stroke="#1A222B" strokeWidth="0.75" strokeDasharray="6 12" />
      </svg>

      {/* 3. Sparse data points canvas */}
      <canvas
        ref={canvasRef}
        className="relative block w-full h-full opacity-80"
      />
    </div>
  );
}
