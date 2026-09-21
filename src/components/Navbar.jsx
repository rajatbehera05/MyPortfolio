import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Minimal Professional Navigation Bar
 * 
 * Specifications:
 * - Left: "RB" simple personal monogram
 * - Center: Home (with subtle blue active indicator), Work, About, Tech, Blog
 * - Right: "Let's Connect →"
 * - Thin, clean, spacious
 * - Extremely subtle scroll elevation with blur
 * - Collapsible mobile menu
 * - Entrance timing: fades in at 0.2s
 */
export default function Navbar({ onConnectClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Tech', href: '#tech' },
    { name: 'Blog', href: '#blog' },
  ];

  const handleNavClick = (e, name) => {
    setActiveItem(name);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F9FC]/85 backdrop-blur-md border-b border-[#DCE5F0]/80 shadow-[0_2px_14px_rgba(17,24,39,0.03)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 h-18 flex items-center justify-between">
        
        {/* Left: Personal Monogram "RB" */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'Home')}
          className="group inline-flex items-center gap-2.5 text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146BFF] rounded-lg p-1"
          aria-label="Rajat Behera Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EEF5FF] border border-[#DCE5F0] flex items-center justify-center transition-all duration-200 group-hover:border-[#146BFF]/40 group-hover:bg-[#EEF5FF]/90">
            <span className="font-mono-tech text-[12px] font-bold tracking-tight text-[#146BFF]">
              RB
            </span>
          </div>
          <span className="text-[14px] font-semibold text-[#111827] tracking-tight group-hover:text-[#146BFF] transition-colors hidden sm:inline">
            Rajat Behera
          </span>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-[14px] font-medium"
        >
          {navLinks.map((link) => {
            const isActive = activeItem === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.name)}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#146BFF] font-semibold'
                    : 'text-[#667085] hover:text-[#111827]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#146BFF]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: CTA & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:rajat.behera@example.com"
            onClick={onConnectClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13.5px] font-semibold tracking-tight text-[#111827] bg-white border border-[#DCE5F0] hover:border-[#146BFF]/50 hover:text-[#146BFF] hover:shadow-[0_2px_8px_rgba(20,107,255,0.08)] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146BFF]"
          >
            <span>Let's Connect ↗</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#667085] hover:text-[#111827] hover:bg-[#EEF5FF] border border-[#DCE5F0] transition-colors focus-visible:outline-none cursor-pointer"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#F7F9FC]/98 backdrop-blur-lg border-b border-[#DCE5F0] px-6 py-5 shadow-lg space-y-4"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.name)}
                  className={`text-[15px] font-medium py-1 transition-colors ${
                    activeItem === link.name
                      ? 'text-[#146BFF] font-semibold'
                      : 'text-[#667085] hover:text-[#111827]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-[#DCE5F0]">
              <a
                href="mailto:rajat.behera@example.com"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-[14px] font-semibold text-white bg-[#146BFF] hover:bg-[#146BFF]/90 transition-all shadow-sm"
              >
                <span>Let's Connect ↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
