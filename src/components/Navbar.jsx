import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Navbar component adhering to Connected Systems Constitution:
 * Minimal header:
 * Left: RAJAT BEHERA + Live UTC Telemetry Clock
 * Right: WORK   ABOUT   CONTACT   CV.SPEC   THEME_TOGGLE
 */
export default function Navbar({ onOpenCV, theme = 'light', onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live system telemetry clock in UTC
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}:${seconds} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 backdrop-blur-md ${
        isScrolled
          ? 'bg-[var(--bg-surface)]/85 border-b border-[var(--border-subtle)] shadow-[0_2px_12px_rgba(15,23,42,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.35)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        
        {/* Left: RAJAT BEHERA & Live Telemetry Clock */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="group inline-flex items-center gap-2 text-inherit no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-cyan)] rounded py-1"
          >
            {/* Minimal system node dot */}
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] inline-block animate-node-pulse" />
            <span className="font-mono-tech text-[13px] sm:text-[14px] font-bold tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
              RAJAT BEHERA
            </span>
          </a>

          {/* Real-time system telemetry clock */}
          {timeString && (
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--border-subtle)] font-mono-tech text-[11px] text-[var(--text-muted)]">
              <span className="text-[var(--accent-cyan)] font-medium">SYS_CLK:</span>
              <span className="text-[var(--text-secondary)]">{timeString}</span>
            </div>
          )}
        </div>

        {/* Right: WORK   ABOUT   CONTACT   CV.SPEC   THEME */}
        <nav aria-label="Main Navigation" className="flex items-center gap-5 sm:gap-7">
          <button
            type="button"
            onClick={() => scrollToSection('systems')}
            className="font-mono-tech text-[12px] sm:text-[13px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:text-[var(--accent-cyan)] focus-visible:outline-none transition-colors cursor-pointer"
          >
            WORK
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="font-mono-tech text-[12px] sm:text-[13px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:text-[var(--accent-cyan)] focus-visible:outline-none transition-colors cursor-pointer"
          >
            ABOUT
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="font-mono-tech text-[12px] sm:text-[13px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:text-[var(--accent-cyan)] focus-visible:outline-none transition-colors cursor-pointer"
          >
            CONTACT
          </button>

          {/* Quick CV Spec Trigger */}
          {onOpenCV && (
            <button
              type="button"
              onClick={onOpenCV}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono-tech font-medium tracking-wider uppercase border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan-border)] hover:text-[var(--accent-cyan)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-cyan)] cursor-pointer shadow-2xs"
            >
              CV.SPEC
            </button>
          )}

          {/* Theme Switcher Toggle */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
              title={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
              className="p-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-cyan)]"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          )}
        </nav>

      </div>
    </header>
  );
}
