import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Modern Clean Editorial Navigation Bar
 */
export default function Navbar({ onConnectClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Projects');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        { id: 'work', name: 'Projects' },
        { id: 'about', name: 'About' },
        { id: 'tech', name: 'Skills' },
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
    { name: 'Projects', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#tech' },
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
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0D10]/85 backdrop-blur-md border-b border-[#1A222B] shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        
        {/* Left: Clean Brand Monogram "RB" */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-3 no-underline focus-visible:outline-none rounded-md"
          aria-label="Rajat Behera Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#141A21] border border-[#232D36] flex items-center justify-center transition-colors group-hover:border-[#16D9E8]/50">
            <span className="text-[12px] font-bold text-[#F4F7FA]">
              RB
            </span>
          </div>
          <span className="text-[14px] font-semibold text-[#F4F7FA] tracking-tight group-hover:text-[#16D9E8] transition-colors font-sans-editorial">
            Rajat Behera
          </span>
        </a>

        {/* Center / Right: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
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
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#F4F7FA]'
                      : 'text-[#71808D] hover:text-[#AAB5C0]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#16D9E8] rounded-full" 
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-[#F4F7FA] bg-[#141A21] hover:bg-[#1A222B] border border-[#232D36] hover:border-[#16D9E8]/50 transition-all cursor-pointer"
          >
            <span>Get in touch</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#141A21] border border-[#1A222B] text-[#AAB5C0] hover:text-[#F4F7FA] transition-colors cursor-pointer"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-[#1A222B] bg-[#0A0D10]/95 backdrop-blur-xl px-6 py-5 overflow-hidden"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.name, link.href)}
                  className={`text-[14px] py-1 transition-colors ${
                    activeItem === link.name ? 'text-[#16D9E8] font-bold' : 'text-[#AAB5C0]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-[#1A222B]">
                <button
                  type="button"
                  onClick={handleConnect}
                  className="w-full py-2.5 rounded-lg text-center text-[13px] font-bold text-[#0A0D10] bg-[#16D9E8] cursor-pointer"
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
