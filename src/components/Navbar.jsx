import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Minimal Editorial Navigation
 * 
 * Requirements:
 * - Logo: RB
 * - Links: WORK, ABOUT, TECH, EXPLORING
 * - CTA: LET'S CONNECT
 * - Active scroll spy highlighting
 * - Hairline glassmorphic scroll blur
 */
export default function Navbar({ onConnectClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('WORK');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        { id: 'work', name: 'WORK' },
        { id: 'about', name: 'ABOUT' },
        { id: 'tech', name: 'TECH' },
        { id: 'exploring', name: 'EXPLORING' },
      ];

      const scrollPosition = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveItem(sections[i].name);
          return;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'TECH', href: '#tech' },
    { name: 'EXPLORING', href: '#exploring' },
  ];

  const handleNavClick = (e, name, href) => {
    e.preventDefault();
    setActiveItem(name);
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnect = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onConnectClick) {
      onConnectClick();
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0D10]/85 backdrop-blur-md border-b border-[#1A222B] shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        
        {/* Left: Clean Architectural Monogram "RB" */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-3.5 no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#16D9E8] rounded-md p-1"
          aria-label="Rajat Behera Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#141A21] border border-[#1A222B] flex items-center justify-center transition-colors group-hover:border-[#16D9E8]/50">
            <span className="font-mono-tech text-[12px] font-bold tracking-wider text-[#F4F7FA]">
              RB
            </span>
          </div>
          <span className="text-[13.5px] font-semibold text-[#AAB5C0] tracking-tight group-hover:text-[#F4F7FA] transition-colors hidden sm:inline font-sans-editorial">
            Rajat Behera
          </span>
        </a>

        {/* Center / Right: Editorial Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <nav
            aria-label="Main Navigation"
            className="flex items-center gap-8 text-[12.5px] font-mono-tech tracking-widest"
          >
            {navLinks.map((link) => {
              const isActive = activeItem === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.name, link.href)}
                  className={`relative py-1 transition-colors duration-200 uppercase ${
                    isActive
                      ? 'text-[#F4F7FA] font-medium'
                      : 'text-[#71808D] hover:text-[#AAB5C0]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#16D9E8] shadow-[0_0_8px_#16D9E8]" 
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Minimalist Action: LET'S CONNECT */}
          <button
            type="button"
            onClick={handleConnect}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-mono-tech tracking-wider text-[#F4F7FA] bg-[#141A21] border border-[#1A222B] hover:border-[#16D9E8]/60 hover:text-[#16D9E8] hover:bg-[#1A222B] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#16D9E8]"
          >
            <span>LET'S CONNECT</span>
            <span className="text-[#16D9E8] text-[11px]">→</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#AAB5C0] hover:text-[#F4F7FA] bg-[#141A21] border border-[#1A222B] transition-colors focus-visible:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#16D9E8]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0F1419]/95 backdrop-blur-xl border-b border-[#1A222B] px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.name, link.href)}
                  className={`text-[13px] font-mono-tech tracking-wider py-1.5 transition-colors uppercase ${
                    activeItem === link.name ? 'text-[#16D9E8] font-bold' : 'text-[#AAB5C0] hover:text-[#F4F7FA]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-[#1A222B]">
              <button
                type="button"
                onClick={handleConnect}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-mono-tech tracking-wider font-semibold text-[#0A0D10] bg-[#16D9E8] hover:bg-[#14C1CE] transition-colors cursor-pointer"
              >
                <span>LET'S CONNECT</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
