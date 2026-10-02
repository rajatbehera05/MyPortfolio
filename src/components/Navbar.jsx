import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Modern Floating Arctic Aurora Navigation Bar
 */
export default function Navbar({ onConnectClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('About');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        { id: 'about', name: 'About' },
        { id: 'tech', name: 'Tech' },
        { id: 'work', name: 'Projects' },
        { id: 'exploring', name: 'Milestones' },
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
    { name: 'About', href: '#about' },
    { name: 'Tech', href: '#tech' },
    { name: 'Projects', href: '#work' },
    { name: 'Milestones', href: '#exploring' },
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
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center justify-center pointer-events-none ${
        isScrolled ? 'pt-2.5 sm:pt-3' : 'pt-3 sm:pt-4'
      }`}
    >
      <div
        className={`pointer-events-auto transition-all duration-300 w-full max-w-[960px] mx-4 sm:mx-6 px-4 sm:px-6 flex items-center justify-between rounded-2xl ${
          isScrolled
            ? 'h-13 sm:h-14 bg-white/94 backdrop-blur-xl border border-[#D5DFEB] shadow-[0_10px_32px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]'
            : 'h-14 sm:h-15 bg-white/85 backdrop-blur-lg border border-[#D5DFEB]/80 shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
        }`}
      >
        
        {/* Left: Brand Monogram "RB" */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-3 no-underline focus-visible:outline-none rounded-lg"
          aria-label="Rajat Behera Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#E8F1FF] border border-[#2563EB]/20 flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:border-[#2563EB]/40 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.2)]">
            <span className="text-[12px] font-bold text-[#2563EB]">
              RB
            </span>
          </div>
          <span className="text-[14px] font-semibold text-[#111827] tracking-tight group-hover:text-[#2563EB] transition-colors font-sans-editorial">
            Rajat Behera
          </span>
        </a>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-7">
          <nav
            aria-label="Main Navigation"
            className="flex items-center gap-7 text-[13.5px] font-medium"
          >
            {navLinks.map((link) => {
              const isActive = activeItem === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.name, link.href)}
                  className={`relative py-1 transition-all duration-200 hover:-translate-y-0.5 ${
                    isActive
                      ? 'text-[#111827] font-semibold'
                      : 'text-[#64748B] hover:text-[#111827]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#2563EB] rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]" 
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action: Get in touch */}
          <button
            type="button"
            onClick={handleConnect}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-[#0F172A] bg-[#EDF2F7] hover:bg-[#E8F1FF] border border-[#D5DFEB] hover:border-[#2563EB]/40 hover:text-[#2563EB] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-xs"
          >
            <span>Get in touch</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#EDF2F7] border border-[#D5DFEB] text-[#4B5563] hover:text-[#0F172A] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto fixed top-24 left-4 right-4 rounded-2xl border border-[#DCE4EF] bg-white/95 backdrop-blur-2xl px-6 py-5 shadow-xl overflow-hidden z-50"
          >
            <nav className="flex flex-col space-y-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.name, link.href)}
                  className={`text-[14.5px] py-1 transition-colors ${
                    activeItem === link.name ? 'text-[#2563EB] font-bold' : 'text-[#64748B]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-[#DCE4EF]">
                <button
                  type="button"
                  onClick={handleConnect}
                  className="w-full py-2.5 rounded-xl text-center text-[13.5px] font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[0_2px_12px_rgba(37,99,235,0.3)] transition-colors cursor-pointer"
                >
                  Get in touch
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
