import React, { useEffect, useRef } from 'react';

export interface Meteor {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  targetLength: number;
  length: number;
  thickness: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  tailAngle: number;
}

export interface ShootingStarsProps {
  className?: string;
}

const POOL_SIZE = 12;

/**
 * Cinematic HTML5 Canvas 2D Shooting Star System
 *
 * Architecture:
 * 1. Single transparent Canvas 2D element scaled for Device Pixel Ratio.
 * 2. Static object pool of Meteor instances (zero object allocation in animation loop).
 * 3. Delta-time based motion physics with constant cosmic velocity and trajectory angle.
 * 4. Realistic multi-stop gradient rendering: luminous white-hot nucleus, electric cyan core,
 *    and ethereal violet atmospheric glow.
 * 5. Natural astronomical scheduler: 1-2 meteors every 8-15 seconds with occasional twin streaks.
 * 6. Suspends cleanly on tab switch (Page Visibility API) and scroll out of view (IntersectionObserver).
 * 7. Strictly respects prefers-reduced-motion.
 */
export default function ShootingStars({ className = '' }: ShootingStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId: number | null = null;
    let isVisible = true;
    let isTabActive = !document.hidden;

    // 1. Static Object Pool
    const pool: Meteor[] = Array.from({ length: POOL_SIZE }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      speed: 0,
      targetLength: 0,
      length: 0,
      thickness: 1.5,
      alpha: 0,
      maxAlpha: 1,
      life: 0,
      maxLife: 0.5,
      tailAngle: 0,
    }));

    // 2. Natural Multi-Stream Scheduler State (3 active shooting star channels)
    const scheduler = {
      stream0: 0.8, // First shooting star appears right away
      stream1: 2.2, // Second shooting star glides across opposite quadrant
      stream2: 3.8, // Third shooting star streaks across high altitude
      twinTimer: -1,
      twinOriginX: 0,
      twinOriginY: 0,
      twinAngle: 0,
    };

    // Spawn a meteor from the pool for a specific celestial stream
    const spawnMeteor = (streamId = 0, isTwin = false) => {
      const meteor = pool.find((m) => !m.active);
      if (!meteor) return;

      let startX: number;
      let startY: number;
      let angleDeg: number;

      if (isTwin) {
        // Spawn twin meteor parallel but slightly offset
        const offsetX = (Math.random() - 0.5) * (width * 0.12);
        const offsetY = (Math.random() - 0.5) * 35;
        startX = Math.max(Math.min(scheduler.twinOriginX + offsetX, width * 0.92), width * 0.1);
        startY = Math.max(scheduler.twinOriginY + offsetY, 10);
        angleDeg = scheduler.twinAngle + (Math.random() - 0.5) * 4;
      } else if (streamId === 0) {
        // Stream 0: Upper-right sky (diagonal across central opening)
        startX = width * (0.65 + Math.random() * 0.28);
        startY = height * (0.03 + Math.random() * 0.15);
        angleDeg = 138 + (Math.random() - 0.5) * 12;
      } else if (streamId === 1) {
        // Stream 1: Left sky
        startX = width * (0.10 + Math.random() * 0.32);
        startY = height * (0.04 + Math.random() * 0.16);
        angleDeg = 135 + (Math.random() - 0.5) * 14;
      } else {
        // Stream 2: High-altitude central / mid-right sky
        startX = width * (0.38 + Math.random() * 0.45);
        startY = height * (0.01 + Math.random() * 0.12);
        angleDeg = 142 + (Math.random() - 0.5) * 12;
      }

      const angleRad = (angleDeg * Math.PI) / 180;
      const speed = 900 + Math.random() * 500; // 900px/s to 1400px/s rapid celestial speed

      meteor.active = true;
      meteor.x = startX;
      meteor.y = startY;
      meteor.vx = Math.cos(angleRad) * speed;
      meteor.vy = Math.sin(angleRad) * speed;
      meteor.speed = speed;
      meteor.tailAngle = angleRad;
      meteor.targetLength = 130 + Math.random() * 85;
      meteor.length = 0;
      meteor.thickness = 1.3 + Math.random() * 0.85;
      meteor.maxAlpha = 0.85 + Math.random() * 0.15;
      meteor.alpha = 0;
      meteor.life = 0;
      meteor.maxLife = 0.42 + Math.random() * 0.22; // 0.42s to 0.64s quick flash

      if (!isTwin && Math.random() < 0.25) {
        // 25% chance to spawn a twin shortly after
        scheduler.twinTimer = 0.32 + Math.random() * 0.40;
        scheduler.twinOriginX = startX;
        scheduler.twinOriginY = startY;
        scheduler.twinAngle = angleDeg;
      }
    };

    // Update canvas size and scale with DPR
    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 240);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastTime = performance.now();

    // 3. High-Performance Canvas Rendering
    const drawMeteor = (meteor: Meteor) => {
      if (!meteor.active || meteor.alpha <= 0.01) return;

      const alpha = Math.min(Math.max(meteor.alpha, 0), 1);
      const dirX = Math.cos(meteor.tailAngle);
      const dirY = Math.sin(meteor.tailAngle);
      const headX = meteor.x;
      const headY = meteor.y;
      const tailX = headX - dirX * meteor.length;
      const tailY = headY - dirY * meteor.length;

      ctx.save();

      // A. Atmospheric Cyan-Violet Glow
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.lineWidth = meteor.thickness * 4.2;
      ctx.lineCap = 'round';
      const glowGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
      glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0)');
      glowGrad.addColorStop(0.35, `rgba(139, 92, 246, ${0.14 * alpha})`);
      glowGrad.addColorStop(0.7, `rgba(56, 189, 248, ${0.32 * alpha})`);
      glowGrad.addColorStop(1, `rgba(147, 197, 253, ${0.55 * alpha})`);
      ctx.strokeStyle = glowGrad;
      ctx.stroke();

      // B. Multi-Stop Tapered Luminous Meteor Tail
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.lineWidth = meteor.thickness;
      ctx.lineCap = 'round';
      const tailGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
      tailGrad.addColorStop(0, 'rgba(139, 92, 246, 0)');
      tailGrad.addColorStop(0.25, `rgba(139, 92, 246, ${0.38 * alpha})`);
      tailGrad.addColorStop(0.58, `rgba(56, 189, 248, ${0.78 * alpha})`);
      tailGrad.addColorStop(0.85, `rgba(224, 242, 254, ${0.95 * alpha})`);
      tailGrad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);
      ctx.strokeStyle = tailGrad;
      ctx.stroke();

      // C. Intense Specular Core Line (Inner Ray)
      const coreLen = meteor.length * 0.42;
      const coreTailX = headX - dirX * coreLen;
      const coreTailY = headY - dirY * coreLen;
      ctx.beginPath();
      ctx.moveTo(coreTailX, coreTailY);
      ctx.lineTo(headX, headY);
      ctx.lineWidth = Math.max(meteor.thickness * 0.55, 0.75);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.stroke();

      // D. Cyan/Lavender Head Flare
      const flareRadius = meteor.thickness * 4.0;
      const flareGrad = ctx.createRadialGradient(headX, headY, 0, headX, headY, flareRadius);
      flareGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.95})`);
      flareGrad.addColorStop(0.35, `rgba(56, 189, 248, ${alpha * 0.7})`);
      flareGrad.addColorStop(0.75, `rgba(139, 92, 246, ${alpha * 0.22})`);
      flareGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = flareGrad;
      ctx.beginPath();
      ctx.arc(headX, headY, flareRadius, 0, Math.PI * 2);
      ctx.fill();

      // E. Intensely Luminous Silver-White Nucleus
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#60A5FA';
      ctx.shadowBlur = 10 * alpha;
      ctx.beginPath();
      ctx.arc(headX, headY, meteor.thickness * 0.85, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // 4. Main RAF Animation Loop
    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Update Multi-Stream Scheduler (3 distinct shooting star streams)
      scheduler.stream0 -= dt;
      if (scheduler.stream0 <= 0) {
        spawnMeteor(0, false);
        scheduler.stream0 = 5.5 + Math.random() * 4.5; // Every 5.5–10s
      }

      scheduler.stream1 -= dt;
      if (scheduler.stream1 <= 0) {
        spawnMeteor(1, false);
        scheduler.stream1 = 6.5 + Math.random() * 5.0; // Every 6.5–11.5s
      }

      scheduler.stream2 -= dt;
      if (scheduler.stream2 <= 0) {
        spawnMeteor(2, false);
        scheduler.stream2 = 7.5 + Math.random() * 6.0; // Every 7.5–13.5s
      }

      if (scheduler.twinTimer > 0) {
        scheduler.twinTimer -= dt;
        if (scheduler.twinTimer <= 0) {
          spawnMeteor(0, true);
        }
      }

      // Clear transparent canvas
      ctx.clearRect(0, 0, width, height);

      // Update and Draw Meteors
      for (let i = 0; i < pool.length; i++) {
        const meteor = pool[i];
        if (!meteor.active) continue;

        meteor.life += dt;
        const p = meteor.life / meteor.maxLife;

        if (p >= 1) {
          meteor.active = false;
          continue;
        }

        // Opacity envelope: Quick rise, hold, rapid fade out
        if (p < 0.18) {
          meteor.alpha = (p / 0.18) * meteor.maxAlpha;
        } else if (p < 0.72) {
          meteor.alpha = meteor.maxAlpha;
        } else {
          meteor.alpha = (1 - (p - 0.72) / 0.28) * meteor.maxAlpha;
        }

        // Trail length expansion & burn-off
        if (p < 0.25) {
          meteor.length = (p / 0.25) * meteor.targetLength;
        } else if (p > 0.85) {
          meteor.length = (1 - ((p - 0.85) / 0.15) * 0.35) * meteor.targetLength;
        } else {
          meteor.length = meteor.targetLength;
        }

        // Position update
        meteor.x += meteor.vx * dt;
        meteor.y += meteor.vy * dt;

        // Boundary cull
        if (meteor.x < -120 || meteor.y > height + 120) {
          meteor.active = false;
          continue;
        }

        drawMeteor(meteor);
      }

      // If visible and tab active, keep running
      if (isVisible && isTabActive) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const startLoop = () => {
      if (rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    startLoop();

    // 5. IntersectionObserver (Pause offscreen)
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && isTabActive) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 6. Page Visibility API (Pause when tab is hidden)
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-1 ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}

