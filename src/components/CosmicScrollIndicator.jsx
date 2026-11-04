import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * SECTIONS DEFINITION
 * Matching the exact semantic IDs throughout the portfolio
 */
const SECTIONS = [
  { id: 'home', label: 'Hero', constellation: 'Alpha' },
  { id: 'about', label: 'About', constellation: 'Polaris' },
  { id: 'skills', label: 'Skills', constellation: 'Vega' },
  { id: 'work', label: 'Projects', constellation: 'Sirius' },
  { id: 'achievements', label: 'Achievements', constellation: 'Altair' },
  { id: 'contact', label: 'Contact', constellation: 'Antares' },
];

export default function CosmicScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const meteorTimeoutRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [scrollSpeed, setScrollSpeed] = useState(0); // pixels/ms velocity
  const [scrollDirection, setScrollDirection] = useState('down'); // 'down' | 'up'
  const [activeSectionId, setActiveSectionId] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [meteors, setMeteors] = useState([]); // brief meteor shower transition sparks
  const [stardust, setStardust] = useState([]); // dynamic particles following star

  // Twinkling background star seeds along the track
  const trackStars = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      top: 5 + (i * 90) / 13 + (Math.sin(i * 1.7) * 2), // distributed 5% to 95%
      offset: (i % 2 === 0 ? 1 : -1) * (1 + (i % 3) * 1.5), // slight horizontal jitter -4px to +4px
      size: 1 + (i % 3) * 0.7, // 1px to 2.4px
      opacity: 0.25 + (i % 4) * 0.15,
      delay: (i * 0.35) % 3,
      duration: 2.2 + (i % 3) * 0.9,
    }));
  }, []);

  // Section Star positions on the track (spaced proportionally 0% to 100%)
  const sectionPositions = useMemo(() => {
    const total = SECTIONS.length;
    return SECTIONS.map((sec, idx) => ({
      ...sec,
      percent: (idx / (total - 1)) * 100, // 0%, 20%, 40%, 60%, 80%, 100%
      index: idx,
    }));
  }, []);

  const activeIndex = useMemo(() => {
    const found = sectionPositions.findIndex((s) => s.id === activeSectionId);
    return found >= 0 ? found : 0;
  }, [sectionPositions, activeSectionId]);

  // Section Awareness: Efficient IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px', // trigger when section is in comfortable reading view
      threshold: [0, 0.2, 0.5],
    };

    const sectionElements = SECTIONS.map((s) => ({
      id: s.id,
      el: document.getElementById(s.id),
    })).filter((s) => s.el !== null);

    if (sectionElements.length === 0) return;

    let previousActive = 'home';

    const observer = new IntersectionObserver((entries) => {
      // Find the entry that has the highest intersection ratio or is intersecting closest to center
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio or proximity to viewport center
        visibleEntries.sort((a, b) => {
          const aRect = a.target.getBoundingClientRect();
          const bRect = b.target.getBoundingClientRect();
          const aDist = Math.abs(aRect.top + aRect.height / 2 - window.innerHeight / 2);
          const bDist = Math.abs(bRect.top + bRect.height / 2 - window.innerHeight / 2);
          return aDist - bDist;
        });

        const currentId = visibleEntries[0].target.id;
        setActiveSectionId((prev) => {
          if (prev !== currentId) {
            // Trigger brief meteor burst on section transition
            triggerSectionTransitionMeteors();
            return currentId;
          }
          return prev;
        });
      }
    }, observerOptions);

    sectionElements.forEach(({ el }) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Brief meteor shower trigger
  const triggerSectionTransitionMeteors = useCallback(() => {
    if (prefersReducedMotion) return;
    if (meteorTimeoutRef.current) clearTimeout(meteorTimeoutRef.current);

    const burst = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: -12 - Math.random() * 24,
      y: (Math.random() - 0.5) * 40,
      length: 18 + Math.random() * 26,
      angle: 125 + Math.random() * 15,
      delay: i * 0.08,
      duration: 0.65 + Math.random() * 0.3,
    }));

    setMeteors(burst);
    meteorTimeoutRef.current = setTimeout(() => {
      setMeteors([]);
    }, 1200);
  }, [prefersReducedMotion]);

  // Real scroll measurement & Stardust particle generation
  useEffect(() => {
    let particleCounter = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const now = Date.now();
      const dt = Math.max(now - lastScrollTimeRef.current, 1);
      const dy = scrollY - lastScrollYRef.current;
      const speed = Math.min(Math.abs(dy) / dt, 5); // cap speed

      const dir = dy >= 0 ? 'down' : 'up';
      setScrollDirection(dir);
      setScrollSpeed(speed);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);

      // Generate occasional subtle stardust trails when actively scrolling
      if (!prefersReducedMotion && Math.abs(dy) > 2) {
        particleCounter++;
        if (particleCounter % 4 === 0) {
          const newParticle = {
            id: `${now}-${Math.random()}`,
            offsetX: (Math.random() - 0.5) * 14,
            offsetY: dir === 'down' ? -(8 + Math.random() * 14) : 8 + Math.random() * 14,
            size: 1 + Math.random() * 2,
            opacity: 0.7 + Math.random() * 0.3,
            color: Math.random() > 0.4 ? '#60A5FA' : '#C084FC',
          };

          setStardust((prev) => {
            const next = [...prev.slice(-8), newParticle];
            return next;
          });
        }
      }

      lastScrollYRef.current = scrollY;
      lastScrollTimeRef.current = now;
    };

    // Passive listener for silky performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (meteorTimeoutRef.current) clearTimeout(meteorTimeoutRef.current);
    };
  }, [prefersReducedMotion]);

  // Clean old stardust particles every 600ms
  useEffect(() => {
    if (stardust.length === 0) return;
    const timer = setTimeout(() => {
      setStardust((prev) => (prev.length > 0 ? prev.slice(1) : []));
    }, 300);
    return () => clearTimeout(timer);
  }, [stardust]);

  // Click on a constellation point to scroll smoothly
  const handleStarClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Vertical position in percentage for star
  const starTopPct = scrollProgress * 100;

  return (
    <aside
      aria-label="Cosmic Scroll Constellation Navigation"
      className="fixed right-1 sm:right-2.5 top-0 bottom-0 z-40 flex items-center justify-center pointer-events-none select-none"
    >
      {/* Indicator Track Shell (Constrained, elegant 280px - 440px height) */}
      <div
        ref={trackRef}
        className="relative pointer-events-auto h-[52vh] min-h-[300px] max-h-[460px] w-12 flex items-center justify-center group"
      >
        {/* Subtle Ambient Cosmic Glow along the vertical spine */}
        <div
          aria-hidden="true"
          className="absolute inset-y-4 right-5 w-4 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-indigo-500/10 blur-md pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* The Extremely Slim Vertical Spine Track */}
        <div className="relative h-full w-[1.5px] bg-slate-300/40 dark:bg-slate-700/50 rounded-full overflow-visible">
          {/* Active Constellation Connected Line (from top to current active star point) */}
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#38BDF8] via-[#60A5FA] to-[#818CF8] rounded-full transition-all duration-300"
            style={{
              height: `${starTopPct}%`,
              boxShadow: '0 0 6px rgba(96, 165, 250, 0.7), 0 0 12px rgba(129, 140, 248, 0.35)',
            }}
          />

          {/* Twinkling Ambient Background Stars along Track */}
          {!prefersReducedMotion &&
            trackStars.map((st) => (
              <div
                key={`track-star-${st.id}`}
                className="absolute rounded-full pointer-events-none bg-blue-300 dark:bg-blue-100"
                style={{
                  top: `${st.top}%`,
                  left: `${st.offset}px`,
                  width: `${st.size}px`,
                  height: `${st.size}px`,
                  opacity: st.opacity,
                  animation: `nightStarTwinkle ${st.duration}s ease-in-out infinite alternate`,
                  animationDelay: `${st.delay}s`,
                }}
              />
            ))}

          {/* Constellation Star Points for each Section */}
          {sectionPositions.map((sec, idx) => {
            const isLit = idx <= activeIndex;
            const isCurrent = sec.id === activeSectionId;
            const isHovered = hoveredSection === sec.id;

            return (
              <div
                key={`constellation-${sec.id}`}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${sec.percent}%` }}
              >
                {/* Clickable Target Area with Tooltip */}
                <button
                  type="button"
                  onClick={() => handleStarClick(sec.id)}
                  onMouseEnter={() => setHoveredSection(sec.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onFocus={() => setHoveredSection(sec.id)}
                  onBlur={() => setHoveredSection(null)}
                  aria-label={`Scroll to ${sec.label}`}
                  className="relative flex items-center justify-center w-6 h-6 rounded-full cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 group/star"
                >
                  {/* Subtle Expanding Halo Ring for Active Section Star */}
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full border border-blue-400/50 animate-ping opacity-60" />
                  )}

                  {/* Star Geometric Point */}
                  <div
                    className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                      isCurrent
                        ? 'w-3 h-3 bg-white border border-[#38BDF8] shadow-[0_0_10px_#60A5FA,0_0_16px_#C084FC]'
                        : isLit
                          ? 'w-2 h-2 bg-[#93C5FD] border border-[#3B82F6] shadow-[0_0_6px_rgba(59,130,246,0.6)]'
                          : 'w-1.5 h-1.5 bg-slate-400/70 border border-slate-300/60 dark:border-slate-600/60 group-hover/star:bg-blue-300 group-hover/star:scale-125'
                    }`}
                  >
                    {/* Tiny Center Glint in Current Star */}
                    {isCurrent && <span className="w-1 h-1 rounded-full bg-[#1E3A8A]" />}
                  </div>

                  {/* Refined Section Tooltip Card on Hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 6, scale: 0.94 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 6, scale: 0.94 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className="absolute right-7 pointer-events-none z-50 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white backdrop-blur-md border border-slate-700/80 shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]" />
                        <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap">
                          {sec.label}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">
                          {sec.constellation}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            );
          })}

          {/* Dynamic Traveling Stardust Particles behind Moving Star */}
          {!prefersReducedMotion &&
            stardust.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full pointer-events-none transition-all duration-300 ease-out"
                style={{
                  top: `calc(${starTopPct}% + ${p.offsetY}px)`,
                  left: `calc(50% + ${p.offsetX}px)`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  boxShadow: `0 0 6px ${p.color}`,
                }}
              />
            ))}

          {/* THE SHOOTING STAR (Progress Head) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-100 ease-out z-20"
            style={{ top: `${starTopPct}%` }}
          >
            {/* Extended Comet Particle Trail following scroll direction */}
            {!prefersReducedMotion && (
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-[2px] rounded-full pointer-events-none transition-opacity duration-200 ${
                  scrollDirection === 'down' ? 'bottom-[3px] origin-bottom' : 'top-[3px] origin-top'
                }`}
                style={{
                  height: `${Math.max(16, scrollSpeed * 22)}px`,
                  background:
                    scrollDirection === 'down'
                      ? 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(56,189,248,0.7) 45%, rgba(192,132,252,0) 100%)'
                      : 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(56,189,248,0.7) 45%, rgba(192,132,252,0) 100%)',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.75)',
                  opacity: Math.min(0.4 + scrollSpeed * 0.25, 0.95),
                }}
              />
            )}

            {/* Glowing Violet Outer Glow */}
            <div className="absolute -inset-2 rounded-full bg-[#8B5CF6]/35 blur-[5px] pointer-events-none" />

            {/* Soft Cyan Mid-Aura */}
            <div className="absolute -inset-1 rounded-full bg-[#38BDF8]/60 blur-[3px] pointer-events-none" />

            {/* Bright Electric White-Blue Core */}
            <div
              className="relative w-3 h-3 rounded-full bg-white flex items-center justify-center"
              style={{
                boxShadow:
                  '0 0 10px #FFFFFF, 0 0 18px #38BDF8, 0 0 26px #A855F7, inset 0 0 2px #FFFFFF',
              }}
            >
              {/* Inner Diamond Core Sparkle */}
              <span className="w-1 h-1 rounded-full bg-[#60A5FA]" />
            </div>

            {/* Brief Section Transition Meteor Sparks */}
            {!prefersReducedMotion &&
              meteors.map((m) => (
                <div
                  key={m.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${m.x}px`,
                    top: `${m.y}px`,
                    transform: `rotate(${m.angle}deg)`,
                  }}
                >
                  <div
                    className="h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8] to-white rounded-full animate-pulse"
                    style={{
                      width: `${m.length}px`,
                      filter: 'drop-shadow(0 0 4px #60A5FA)',
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

