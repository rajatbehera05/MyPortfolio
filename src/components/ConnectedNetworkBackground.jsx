import React, { useEffect, useRef } from 'react';

/**
 * ConnectedNetworkBackground — Arctic Aurora Atmosphere
 * 
 * - Clean neutral Arctic Blue (#2563EB) & Soft Lavender (#8B5CF6) ambient glows
 * - Hairline engineering grid
 * - Tiny drifting technical points and delicate connection threads
 * - Strictly respects prefers-reduced-motion and keeps content front-and-center
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
      // Sparse: 10 on mobile, 22 on desktop
      const count = isMobile ? 10 : 22;

      points = [];
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.09,
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.09,
          radius: Math.random() * 1.2 + 0.8,
          baseAlpha: Math.random() * 0.16 + 0.08,
          isLavender: Math.random() > 0.7, // 30% lavender, 70% arctic blue
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    let lastTime = performance.now();

    const draw = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Draw faint connection lines between proximate nodes
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width < 768 ? 110 : 160;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.07;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw floating technical nodes
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

        const breathe = Math.sin(pt.phase) * 0.04;
        const currentAlpha = Math.max(0.04, pt.baseAlpha + breathe);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.isLavender
          ? `rgba(139, 92, 246, ${currentAlpha.toFixed(3)})`
          : `rgba(37, 99, 235, ${currentAlpha.toFixed(3)})`;
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#EDF2F7]"
    >
      {/* 1. Refined Arctic Aurora volumetric ambient glows */}
      <div 
        className="absolute inset-0 pointer-events-none animate-aurora-drift"
        style={{
          background: `
            radial-gradient(ellipse 65% 45% at 20% 15%, rgba(219, 234, 254, 0.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 85% 32%, rgba(237, 233, 254, 0.42) 0%, transparent 60%),
            radial-gradient(ellipse 55% 40% at 48% 78%, rgba(219, 234, 254, 0.45) 0%, transparent 65%),
            linear-gradient(180deg, #E6EDF5 0%, #EDF2F7 50%, #E6EDF5 100%)
          `
        }}
      />

      {/* 2. Delicate hairline engineering grid */}
      <div className="absolute inset-0 pointer-events-none arctic-grid-subtle opacity-65" />

      {/* 3. Subtle technical datum guidelines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="80" x2="100%" y2="80" stroke="#CBD5E1" strokeWidth="0.75" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CBD5E1" strokeWidth="0.75" strokeDasharray="4 16" />
      </svg>

      {/* 4. Canvas with calm floating technical points and connection threads */}
      <canvas
        ref={canvasRef}
        className="relative block w-full h-full opacity-85"
      />
    </div>
  );
}
