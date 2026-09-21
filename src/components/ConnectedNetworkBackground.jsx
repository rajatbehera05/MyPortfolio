import React, { useEffect, useRef } from 'react';

/**
 * ConnectedNetworkBackground
 * 
 * Living Connected System Network:
 * - Restrained organic movement & subtle depth
 * - Gentle mouse proximity reaction (decaying spring nudge + line illumination)
 * - Sporadic cyan data pulses traveling along active links (destination node brightens upon arrival)
 * - Optimized for performance, mobile density throttling, and prefers-reduced-motion
 */
export default function ConnectedNetworkBackground({ theme = 'light' }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let nodes = [];
    let pulses = [];
    let lastPulseSpawn = 0;

    // Mouse coordinates with smooth damping
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

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
      initNodes();
    };

    const initNodes = () => {
      const isMobile = width < 768;
      const count = isMobile ? 18 : 36;
      const maxDistance = isMobile ? 120 : 155;

      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.2,
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.3 + 1.2,
          baseAlpha: Math.random() * 0.22 + 0.18,
          pulseGlow: 0, // Boosted when a data pulse arrives
          phase: Math.random() * Math.PI * 2,
        });
      }

      nodes.maxDistance = maxDistance;
      pulses = [];
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let lastTime = performance.now();

    const draw = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position damping
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.05;
        mouse.y += (-1000 - mouse.y) * 0.05;
      }

      const isDark = themeRef.current === 'dark';
      const maxDist = nodes.maxDistance || 150;
      const activeConnections = [];

      // 1. Draw connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            let alpha = (1 - dist / maxDist) * (isDark ? 0.09 : 0.14);

            // Mouse proximity line illumination
            if (mouse.active) {
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
              if (mouseDist < 140) {
                const mouseBoost = (1 - mouseDist / 140) * 0.25;
                alpha += mouseBoost;
              }
            }

            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(22, 217, 232, ${Math.min(alpha, 0.45).toFixed(3)})`
              : `rgba(2, 132, 199, ${Math.min(alpha * 1.5, 0.5).toFixed(3)})`;
            ctx.lineWidth = isDark ? 0.85 : 0.95;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Store active link candidate for sporadic data pulse
            activeConnections.push({ from: a, to: b, dist });
          }
        }
      }

      // 2. Data pulses traveling along connections
      // Spawn sporadic data pulse every ~2.5 to 4 seconds
      if (!prefersReducedMotion && activeConnections.length > 0 && currentTime - lastPulseSpawn > 2800) {
        if (Math.random() < 0.65 && pulses.length < 3) {
          const link = activeConnections[Math.floor(Math.random() * activeConnections.length)];
          pulses.push({
            from: link.from,
            to: link.to,
            progress: 0,
            speed: 0.45 + Math.random() * 0.35, // Completes traversal smoothly
          });
          lastPulseSpawn = currentTime;
        }
      }

      // Animate and render data pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed * delta;

        if (pulse.progress >= 1) {
          // Reached destination: trigger momentary node illumination
          pulse.to.pulseGlow = 0.65;
          pulses.splice(p, 1);
          continue;
        }

        const px = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
        const py = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

        // Small data packet packet dot
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(22, 217, 232, 0.85)' : 'rgba(2, 132, 199, 0.95)';
        ctx.fill();

        // Subtle packet aura
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(22, 217, 232, 0.25)' : 'rgba(2, 132, 199, 0.28)';
        ctx.fill();
      }

      // 3. Update & render nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          // Organic drift
          node.x += node.vx * 50 * delta;
          node.y += node.vy * 50 * delta;
          node.phase += 0.02;

          // Subtle mouse repulsion/reaction
          if (mouse.active) {
            const mdx = node.x - mouse.x;
            const mdy = node.y - mouse.y;
            const mDist = Math.hypot(mdx, mdy);
            if (mDist < 120 && mDist > 0) {
              const force = (1 - mDist / 120) * 8 * delta;
              node.x += (mdx / mDist) * force;
              node.y += (mdy / mDist) * force;
            }
          }

          // Smooth edge wrapping
          if (node.x < -15) node.x = width + 15;
          if (node.x > width + 15) node.x = -15;
          if (node.y < -15) node.y = height + 15;
          if (node.y > height + 15) node.y = -15;
        }

        // Decay pulse glow smoothly
        if (node.pulseGlow > 0) {
          node.pulseGlow -= 1.2 * delta;
          if (node.pulseGlow < 0) node.pulseGlow = 0;
        }

        const breathe = Math.sin(node.phase) * 0.07;
        const currentAlpha = Math.min(
          0.9,
          node.baseAlpha + breathe + node.pulseGlow
        );

        // Core node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (node.pulseGlow > 0 ? 0.6 : 0), 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(22, 217, 232, ${Math.max(0.12, currentAlpha).toFixed(3)})`
          : `rgba(2, 132, 199, ${Math.max(0.2, currentAlpha).toFixed(3)})`;
        ctx.fill();

        // Node halo (subtle on arrival glow or key nodes)
        if (node.pulseGlow > 0.05 || i % 5 === 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(22, 217, 232, ${(currentAlpha * 0.28).toFixed(3)})`
            : `rgba(2, 132, 199, ${(currentAlpha * 0.25).toFixed(3)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden technical-grid"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-90"
      />
      {/* Subtle depth gradient on graphite #0E1217 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0E1217]/30 to-[#0E1217] pointer-events-none" />
    </div>
  );
}
