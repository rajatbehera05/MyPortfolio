import React, { useState, useRef, useEffect, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, Compass, X } from 'lucide-react';
import { AVAILABLE_THEMES } from '../hooks/useTimeEnvironment';

/**
 * Miniature Planetary & Orbital Icon
 * - Central spherical planetary core with radial depth
 * - 3D tilted orbital ring with front/back occlusion
 * - Tiny crescent moon & micro-star accent
 * - Subtle animated orbiting particle
 */
function CosmicOrbitIcon({ activeThemeId = 'noon', isReducedMotion = false }) {
  const getThemePalette = () => {
    switch (activeThemeId) {
      case 'morning':
        return {
          core: 'radial-gradient(circle at 35% 35%, #FFF7ED 0%, #F59E0B 55%, #9A3412 100%)',
          ring: '#FCD34D',
          glow: 'rgba(245, 158, 11, 0.55)',
          particle: '#FEF08A',
        };
      case 'noon':
        return {
          core: 'radial-gradient(circle at 35% 35%, #F0F9FF 0%, #38BDF8 50%, #1E40AF 100%)',
          ring: '#38BDF8',
          glow: 'rgba(56, 189, 248, 0.55)',
          particle: '#BAE6FD',
        };
      case 'evening':
        return {
          core: 'radial-gradient(circle at 35% 35%, #FFFBEB 0%, #FB923C 55%, #9A3412 100%)',
          ring: '#C084FC',
          glow: 'rgba(251, 146, 60, 0.55)',
          particle: '#FED7AA',
        };
      case 'night':
      default:
        return {
          core: 'radial-gradient(circle at 35% 35%, #E0E7FF 0%, #818CF8 50%, #312E81 100%)',
          ring: '#38BDF8',
          glow: 'rgba(129, 140, 248, 0.65)',
          particle: '#A5F3FC',
        };
    }
  };

  const palette = getThemePalette();

  return (
    <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
      {/* Restrained Central Core Glow */}
      <div
        className="absolute inset-0 rounded-full blur-xs transition-colors duration-500"
        style={{ background: palette.glow }}
      />

      {/* 3D Tilted Orbital Ellipse (Back Arc) */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        viewBox="0 0 24 24"
      >
        <ellipse
          cx="12"
          cy="12"
          rx="10.5"
          ry="3.8"
          transform="rotate(-28 12 12)"
          fill="none"
          stroke={palette.ring}
          strokeWidth="1.2"
          strokeDasharray="14 16"
          opacity="0.75"
        />
      </svg>

      {/* Central Miniature Planetary Sphere */}
      <div
        className="w-3.5 h-3.5 rounded-full shadow-[inset_-1px_-1px_2.5px_rgba(0,0,0,0.6),0_0_6px_rgba(56,189,248,0.4)] transition-all duration-500 z-1"
        style={{ background: palette.core }}
      />

      {/* 3D Tilted Orbital Ellipse (Front Arc) */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-2"
        viewBox="0 0 24 24"
      >
        <path
          d="M 3.2 15.8 A 10.5 3.8 0 0 0 20.8 8.2"
          transform="rotate(-28 12 12)"
          fill="none"
          stroke={palette.ring}
          strokeWidth="1.3"
          opacity="0.95"
        />
      </svg>

      {/* Tiny Micro-Crescent / Star Accent */}
      <span className="w-1 h-1 rounded-full bg-white absolute top-0.5 right-0.5 opacity-80 shadow-[0_0_3px_#FFF] pointer-events-none z-3" />

      {/* Orbiting Micro-Particle */}
      {!isReducedMotion && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none z-4"
        >
          <div
            className="w-1 h-1 rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_4px_#FFF]"
            style={{ background: palette.particle }}
          />
        </motion.div>
      )}
    </div>
  );
}

/**
 * Visual Preview Swatch for Theme Options inside Popover
 */
function ThemePreviewSwatch({ themeId }) {
  switch (themeId) {
    case 'morning':
      return (
        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#D4E8FC] via-[#FEF8ED] to-[#FED766] border border-[#BFDBFE] relative overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FFF9E6] to-[#F59E0B] shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
        </div>
      );
    case 'noon':
      return (
        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#BAE6FD] via-[#EAF3FB] to-[#FDE047] border border-[#93C5FD] relative overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#FACC15] shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
        </div>
      );
    case 'evening':
      return (
        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#B8CEF5] via-[#D8C7F0] to-[#FB923C] border border-[#DDD6FE] relative overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FFF7ED] to-[#EA580C] shadow-[0_0_7px_rgba(234,88,12,0.6)]" />
        </div>
      );
    case 'night':
    default:
      return (
        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#081426] via-[#0F1D38] to-[#1E293B] border border-[#38BDF8]/40 relative overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
          <svg className="w-3 h-3 text-[#38BDF8] drop-shadow-[0_0_4px_rgba(56,189,248,0.8)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <span className="w-0.5 h-0.5 rounded-full bg-white absolute top-1 left-1.5 opacity-80" />
        </div>
      );
  }
}

/**
 * Minimal Cosmic Corner Button & Floating Theme Switcher
 *
 * Requirements:
 * - Floating icon-only theme button in the TOP-LEFT CORNER of the portfolio
 * - Circular shape (42–48px diameter)
 * - Translucent midnight navy glass with thin electric-blue/violet gradient border
 * - Icon only: NO text, NO labels, NO bulky pills
 * - Separate from navbar, does not overlap greeting, clock, hero heading, or navbar
 * - Opens anchored floating popover showing all existing themes with visual previews
 * - Immediate theme switching with localStorage persistence
 */
export default function CosmicThemeSwitcher({ timeEnv }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionFeedback, setSelectionFeedback] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ top: 80, left: 24 });
  
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);
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

  // Calculate popover coordinates anchored to the top-left button
  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 640;

    const popoverWidth = isMobile ? Math.min(310, window.innerWidth - 32) : 295;
    
    // Position below the button
    let top = rect.bottom + 10;
    let left = rect.left;

    // Viewport clamping
    if (left < 14) left = 14;
    if (left + popoverWidth > window.innerWidth - 14) {
      left = Math.max(14, window.innerWidth - popoverWidth - 14);
    }

    // Open upward when button is docked near the bottom (e.g. mobile), otherwise open below
    if (rect.top > 300) {
      top = Math.max(10, rect.top - 285);
    } else {
      top = rect.bottom + 10;
    }

    setPopoverPos({ top, left, width: popoverWidth });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const handleWindowChange = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleWindowChange, { passive: true });
    window.addEventListener('resize', handleWindowChange);

    return () => {
      window.removeEventListener('scroll', handleWindowChange);
      window.removeEventListener('resize', handleWindowChange);
    };
  }, [isOpen, updatePosition]);

  // Click outside and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (buttonRef.current && buttonRef.current.contains(e.target)) return;
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
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
    <>
      {/* ─── 1. FLOATING CIRCULAR COSMIC BUTTON (ICON ONLY) ─── */}
      <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 md:top-4.5 md:left-7 md:bottom-auto z-40 select-none pointer-events-auto transition-all duration-300">
        <motion.button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-label={`Change theme environment. Currently active: ${currentThemeObj.name}`}
          whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.92 }}
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081426] group"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(18, 38, 76, 0.95) 0%, rgba(9, 20, 42, 0.92) 55%, rgba(6, 14, 30, 0.96) 100%)',
            boxShadow: '0 4px 18px rgba(3, 8, 20, 0.45), 0 0 16px rgba(56, 189, 248, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
          }}
        >
          {/* Subtle Electric-Blue / Violet Gradient Border */}
          <div
            aria-hidden="true"
            className="absolute -inset-[1px] rounded-full pointer-events-none transition-opacity duration-300 opacity-70 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.6) 0%, rgba(139, 92, 246, 0.5) 50%, rgba(56, 189, 248, 0.3) 100%)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: '1.2px',
            }}
          />

          {/* Ambient Luminescence Hover Expansion */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#38BDF8]/20 via-[#8B5CF6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          />

          {/* Cosmic Icon Graphic */}
          <CosmicOrbitIcon
            activeThemeId={timeState}
            isReducedMotion={prefersReducedMotion}
          />

          {/* Live Active Theme Tint Dot */}
          <span
            className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-[#081426] shadow-[0_0_6px_currentColor] transition-colors duration-500"
            style={{ backgroundColor: currentThemeObj.accentColor, color: currentThemeObj.accentColor }}
          />
        </motion.button>
      </div>


      {/* ─── 2. ANCHORED FLOATING POPOVER (PORTAL) ─── */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div
                className="fixed inset-0 z-[99999] pointer-events-auto"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
              >
                {/* Backdrop Scrim */}
                <div
                  onClick={() => setIsOpen(false)}
                  className="absolute inset-0 bg-black/40 sm:bg-black/20 backdrop-blur-2xs"
                />

                {/* Popover Card */}
                <motion.div
                  ref={popoverRef}
                  id={listboxId}
                  role="listbox"
                  aria-label="Select celestial theme"
                  initial={{ opacity: 0, scale: 0.94, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'fixed',
                    top: `${popoverPos.top}px`,
                    left: `${popoverPos.left}px`,
                    width: `${popoverPos.width}px`,
                    maxHeight: '82vh',
                    background: 'linear-gradient(165deg, rgba(8, 18, 38, 0.98) 0%, rgba(11, 23, 48, 0.98) 60%, rgba(7, 15, 32, 0.98) 100%)',
                    borderColor: 'rgba(56, 189, 248, 0.32)',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(56, 189, 248, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                  className="rounded-2xl backdrop-blur-2xl p-3 border text-white flex flex-col pointer-events-auto"
                >
                  {/* Popover Header */}
                  <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2 border-b border-[rgba(147,197,253,0.14)] text-[10.5px]">
                    <div className="flex items-center gap-1.5 text-[#93C5FD] font-semibold tracking-wider uppercase font-mono-tech">
                      <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Celestial Theme</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleResetAuto}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                          !isOverridden
                            ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/50 shadow-[0_0_8px_rgba(56,189,248,0.25)]'
                            : 'bg-white/10 text-white hover:bg-[#38BDF8]/20 hover:text-[#38BDF8] border border-[#38BDF8]/40 shadow-xs'
                        }`}
                        title={!isOverridden ? 'Automatic time-based theme is active' : 'Reset to automatic time-based theme'}
                      >
                        {!isOverridden ? 'Auto' : 'Reset to Auto'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10"
                        aria-label="Close theme selector"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 4 Themes List */}
                  <div className="py-2 space-y-1.5 overflow-y-auto custom-scrollbar max-h-[260px]">
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
                            <ThemePreviewSwatch themeId={theme.id} />

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-[12px] font-bold leading-tight truncate ${
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

                              <div className="text-[10px] text-[#94A3B8] leading-tight truncate mt-0.5">
                                {theme.subtitle}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 pl-2">
                            {isSelected ? (
                              <div className="w-4.5 h-4.5 rounded-full bg-[#38BDF8] text-[#081426] flex items-center justify-center shadow-[0_0_8px_rgba(56,189,248,0.6)]">
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

                  {/* Popover Footer */}
                  <div className="px-1.5 pt-2 border-t border-[rgba(147,197,253,0.12)] flex items-center justify-between text-[10px] text-[#64748B]">
                    <span>Portfolio-wide sync</span>
                    <span className="text-[#38BDF8] font-mono">• 4 Modes</span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
