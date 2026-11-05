import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Check, ChevronDown, Compass, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { AVAILABLE_THEMES } from '../hooks/useTimeEnvironment';

/**
 * Miniature Planet Graphic with 3D Orbital Ring and Orbiting Particle
 */
function MiniatureCosmicPlanet({ activeThemeId = 'noon', isReducedMotion = false }) {
  // Color palette based on active theme
  const getPlanetColors = () => {
    switch (activeThemeId) {
      case 'morning':
        return {
          core: 'radial-gradient(circle at 35% 35%, #FED7AA 0%, #F59E0B 55%, #B45309 100%)',
          ring: '#FCD34D',
          glow: 'rgba(245, 158, 11, 0.45)',
          particle: '#FDE68A',
        };
      case 'noon':
        return {
          core: 'radial-gradient(circle at 35% 35%, #BAE6FD 0%, #38BDF8 50%, #1D4ED8 100%)',
          ring: '#38BDF8',
          glow: 'rgba(56, 189, 248, 0.45)',
          particle: '#7DD3FC',
        };
      case 'evening':
        return {
          core: 'radial-gradient(circle at 35% 35%, #FDE047 0%, #FB923C 55%, #C2410C 100%)',
          ring: '#C084FC',
          glow: 'rgba(251, 146, 60, 0.45)',
          particle: '#FDBA74',
        };
      case 'night':
      default:
        return {
          core: 'radial-gradient(circle at 35% 35%, #C7D2FE 0%, #818CF8 50%, #312E81 100%)',
          ring: '#38BDF8',
          glow: 'rgba(129, 140, 248, 0.55)',
          particle: '#A5F3FC',
        };
    }
  };

  const colors = getPlanetColors();

  return (
    <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
      {/* Restrained Ambient Glow */}
      <div
        className="absolute inset-0 rounded-full blur-xs transition-colors duration-500"
        style={{ background: colors.glow }}
      />

      {/* 3D Tilted Orbital Ring Behind */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        viewBox="0 0 24 24"
      >
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.6"
          transform="rotate(-26 12 12)"
          fill="none"
          stroke={colors.ring}
          strokeWidth="1.2"
          strokeDasharray="14 16"
          opacity="0.75"
        />
      </svg>

      {/* Central Miniature Spherical Planet */}
      <div
        className="w-3.5 h-3.5 rounded-full shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.5),0_0_6px_rgba(56,189,248,0.4)] transition-all duration-500 z-1"
        style={{ background: colors.core }}
      />

      {/* 3D Tilted Orbital Ring In Front (Half Arc for true 3D overlap) */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-2"
        viewBox="0 0 24 24"
      >
        <path
          d="M 3.8 15.6 A 10 3.6 0 0 0 20.2 8.4"
          transform="rotate(-26 12 12)"
          fill="none"
          stroke={colors.ring}
          strokeWidth="1.2"
          opacity="0.95"
        />
      </svg>

      {/* Orbiting Star Particle */}
      {!isReducedMotion && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none z-3"
        >
          <div
            className="w-1 h-1 rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_4px_#FFF]"
            style={{ background: colors.particle }}
          />
        </motion.div>
      )}
    </div>
  );
}

/**
 * Visual Preview Swatch for Theme Options
 */
function ThemePreviewSwatch({ themeId }) {
  switch (themeId) {
    case 'morning':
      return (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D4E8FC] via-[#FEF8ED] to-[#FED766] border border-[#BFDBFE] relative overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#FFF9E6] to-[#F59E0B] shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
        </div>
      );
    case 'noon':
      return (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#BAE6FD] via-[#EAF3FB] to-[#FDE047] border border-[#93C5FD] relative overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#FACC15] shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
        </div>
      );
    case 'evening':
      return (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#B8CEF5] via-[#D8C7F0] to-[#FB923C] border border-[#DDD6FE] relative overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#FFF7ED] to-[#EA580C] shadow-[0_0_7px_rgba(234,88,12,0.6)]" />
        </div>
      );
    case 'night':
    default:
      return (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#081426] via-[#0F1D38] to-[#1E293B] border border-[#38BDF8]/40 relative overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
          {/* Miniature Crescent Moon */}
          <svg className="w-3.5 h-3.5 text-[#38BDF8] drop-shadow-[0_0_4px_rgba(56,189,248,0.8)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <span className="w-0.5 h-0.5 rounded-full bg-white absolute top-1.5 left-2 opacity-80" />
          <span className="w-0.5 h-0.5 rounded-full bg-white absolute bottom-1.5 right-2 opacity-80" />
        </div>
      );
  }
}

/**
 * Premium Cosmic Theme Switcher
 *
 * Placed in the hero section's open space:
 * - Planetary control with dark cosmic glass surface
 * - Deep midnight navy / space-black base
 * - Subtle violet, electric blue, and lavender highlights with restrained cyan glow
 * - Miniature planet with orbital ring & orbiting star
 * - Interactive theme selector popup allowing instantaneous switching between:
 *   1. Morning Dawn
 *   2. Noon Daylight
 *   3. Golden Evening
 *   4. Midnight Cosmic (Dark Mode)
 * - Remembers user selection via localStorage
 */
export default function CosmicThemeSwitcher({ timeEnv }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionFeedback, setSelectionFeedback] = useState(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const listboxId = useId();
  const prefersReducedMotion = useReducedMotion();

  const {
    timeState = 'noon',
    isNight = false,
    setTheme,
    isOverridden = false,
    resetToRealTime,
    availableThemes = AVAILABLE_THEMES,
  } = timeEnv || {};

  const currentThemeObj = availableThemes.find((t) => t.id === timeState) || availableThemes[1];

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectTheme = (themeId) => {
    setSelectionFeedback(themeId);
    setTheme(themeId);

    // Smooth subtle confirmation before closing
    setTimeout(() => {
      setSelectionFeedback(null);
      setIsOpen(false);
    }, 180);
  };

  const handleResetAuto = () => {
    resetToRealTime();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block select-none z-30">
      {/* ─── 1. TRIGGER BUTTON: COSMIC PLANETARY DEVICE ─── */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`Change theme. Current theme: ${currentThemeObj.name}`}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
        className="relative group flex items-center gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081426]"
        style={{
          background: 'linear-gradient(135deg, rgba(8, 18, 36, 0.96) 0%, rgba(13, 27, 52, 0.92) 55%, rgba(18, 36, 68, 0.94) 100%)',
          boxShadow: '0 4px 20px rgba(4, 10, 24, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 14px rgba(56, 189, 248, 0.16)',
        }}
      >
        {/* Subtle Edge Glow Border */}
        <div
          aria-hidden="true"
          className="absolute -inset-[1px] rounded-2xl pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.45) 0%, rgba(139, 92, 246, 0.35) 50%, rgba(56, 189, 248, 0.2) 100%)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />

        {/* Ambient Cosmic Violet/Cyan Specular Pulse on Hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#38BDF8]/10 via-[#8B5CF6]/10 to-[#38BDF8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />

        {/* Left: Miniature Planetary Graphic with 3D Ring */}
        <MiniatureCosmicPlanet
          activeThemeId={timeState}
          isReducedMotion={prefersReducedMotion}
        />

        {/* Center: Clean Typography Labels */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.14em] uppercase text-white font-mono-tech leading-tight">
              Change Theme
            </span>
            <Sparkles className="w-2.5 h-2.5 text-[#38BDF8] opacity-75 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] text-[#93C5FD] leading-tight font-sans mt-0.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ backgroundColor: currentThemeObj.accentColor }}
            />
            <span className="truncate max-w-[110px] sm:max-w-[130px] font-medium">
              {currentThemeObj.name}
            </span>
          </div>
        </div>

        {/* Right: Small Futuristic Indicator Chevron */}
        <div className="pl-1 text-[#93C5FD] group-hover:text-white transition-colors">
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-[#38BDF8]' : ''
            }`}
          />
        </div>
      </motion.button>


      {/* ─── 2. THEME SELECTOR POPUP MENU ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={listboxId}
            role="listbox"
            aria-label="Select celestial theme"
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2.5 w-[295px] sm:w-[325px] rounded-2xl backdrop-blur-2xl p-3 border shadow-2xl z-50 text-white overflow-hidden"
            style={{
              background: 'linear-gradient(165deg, rgba(8, 18, 38, 0.98) 0%, rgba(11, 23, 48, 0.98) 60%, rgba(7, 15, 32, 0.98) 100%)',
              borderColor: 'rgba(56, 189, 248, 0.28)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 32px rgba(56, 189, 248, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Header / Subtitle */}
            <div className="flex items-center justify-between px-2 pt-1 pb-2.5 border-b border-[rgba(147,197,253,0.14)] text-[10.5px]">
              <div className="flex items-center gap-1.5 text-[#93C5FD] font-semibold tracking-wider uppercase font-mono-tech">
                <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Celestial Environment</span>
              </div>

              {/* Auto / Real Time Reset Button */}
              <button
                type="button"
                onClick={handleResetAuto}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                  !isOverridden
                    ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/50 shadow-[0_0_8px_rgba(56,189,248,0.25)]'
                    : 'bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {!isOverridden ? 'Auto (Active)' : 'Reset to Auto'}
              </button>
            </div>

            {/* List of 4 Themes */}
            <div className="py-2 space-y-1.5">
              {availableThemes.map((theme) => {
                const isSelected = timeState === theme.id;
                const isConfirming = selectionFeedback === theme.id;

                return (
                  <button
                    key={theme.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectTheme(theme.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#162A4A] border-[#38BDF8]/70 shadow-[0_0_16px_rgba(56,189,248,0.22)]'
                        : 'bg-white/[0.03] hover:bg-white/[0.08] border-transparent hover:border-white/10'
                    } ${isConfirming ? 'scale-[0.98] ring-2 ring-[#38BDF8]' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Visual Sky Preview Swatch */}
                      <ThemePreviewSwatch themeId={theme.id} />

                      {/* Theme Details */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[12.5px] font-bold leading-tight truncate ${
                            isSelected ? 'text-[#38BDF8]' : 'text-[#F1F5FF]'
                          }`}>
                            {theme.name}
                          </span>
                          {theme.isDark && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#38BDF8]/20 text-[#7DD3FC] border border-[#38BDF8]/30 uppercase">
                              Dark
                            </span>
                          )}
                        </div>

                        <div className="text-[10.5px] text-[#94A3B8] leading-tight truncate mt-0.5">
                          {theme.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Active Checkmark Beacon */}
                    <div className="shrink-0 pl-2">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-[#38BDF8] text-[#081426] flex items-center justify-center shadow-[0_0_8px_rgba(56,189,248,0.6)]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Status Hint */}
            <div className="px-2 pt-2 border-t border-[rgba(147,197,253,0.12)] flex items-center justify-between text-[10px] text-[#64748B]">
              <span>Synchronized across entire portfolio</span>
              <span className="text-[#38BDF8] font-mono">• 4 Modes</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
