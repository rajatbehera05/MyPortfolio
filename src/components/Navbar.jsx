import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  Cpu,
  Trophy,
  FolderGit2,
  Compass,
  ArrowRight
} from 'lucide-react';

/**
 * Magnetic Nav Item with subtle hover and illuminated active pill
 */
function NavItem({ link, isActive, isNightNavbar, onClick }) {
  const prefersReducedMotion = useReducedMotion();
  const itemRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Restrained, subtle magnetic pull (max 3-4px)
    const pullX = (e.clientX - centerX) * 0.16;
    const pullY = (e.clientY - centerY) * 0.16;
    setOffset({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const Icon = link.icon;

  return (
    <motion.a
      ref={itemRef}
      href={link.href}
      onClick={(e) => onClick(e, link.name, link.href)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className={`relative px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-200 select-none cursor-pointer group no-underline ${
        isActive
          ? 'text-[#1E3A8A] font-semibold'
          : isNightNavbar
            ? 'text-[#A5B4FC] hover:text-white'
            : 'text-[#475569] hover:text-[#0F172A]'
      }`}
    >
      {/* Active Navigation Pill: Sophisticated Blue-to-Lavender with Illuminated Outline */}
      {isActive && (
        <motion.div
          layoutId="activeNavDockPill"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: isNightNavbar
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.28) 0%, rgba(139, 92, 246, 0.35) 100%)'
              : 'linear-gradient(135deg, #EEF4FF 0%, #E8EEFF 50%, #F3E8FF 100%)',
            border: isNightNavbar
              ? '1px solid rgba(165, 180, 252, 0.45)'
              : '1px solid rgba(199, 210, 254, 0.85)',
            boxShadow: isNightNavbar
              ? '0 4px 16px -2px rgba(139, 92, 246, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
              : '0 4px 14px -2px rgba(37, 99, 235, 0.12), inset 0 1px 1.5px rgba(255, 255, 255, 0.95), 0 1px 2px rgba(0, 0, 0, 0.02)'
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}

      {/* Subtle Hover Background Reveal when not active */}
      {!isActive && isHovered && (
        <motion.div
          layoutId="hoverNavDockGlow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute inset-0 rounded-full pointer-events-none ${
            isNightNavbar
              ? 'bg-white/[0.08]'
              : 'bg-[#F1F5F9]/80'
          }`}
          transition={{ duration: 0.15 }}
        />
      )}

      {/* Icon with slight movement on hover */}
      <Icon
        className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 shrink-0 ${
          isActive
            ? isNightNavbar
              ? 'text-[#60A5FA]'
              : 'text-[#2563EB]'
            : isNightNavbar
              ? 'text-[#818CF8] group-hover:text-[#93C5FD]'
              : 'text-[#64748B] group-hover:text-[#2563EB]'
        }`}
      />

      {/* Label */}
      <span className="relative z-10 tracking-tight whitespace-nowrap">
        {link.name}
      </span>
    </motion.a>
  );
}

/**
 * Premium Art-Directed Portfolio Navigation Dock
 * Refined Icy-Blue & Lavender Visual Identity
 */
export default function Navbar({ onConnectClick, isNight = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('About');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        { id: 'about', name: 'About' },
        { id: 'tech', name: 'Tech' },
        { id: 'achievements', name: 'Achievements' },
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
    { name: 'About', href: '#about', icon: Home },
    { name: 'Tech', href: '#tech', icon: Cpu },
    { name: 'Achievements', href: '#achievements', icon: Trophy },
    { name: 'Projects', href: '#work', icon: FolderGit2 },
    { name: 'Milestones', href: '#exploring', icon: Compass },
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

  const isNightNavbar = isNight && (!isScrolled || activeItem === 'About' || activeItem === 'Milestones');

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center justify-center pointer-events-none ${
        isScrolled ? 'pt-2.5 sm:pt-3' : 'pt-3.5 sm:pt-4.5'
      }`}
    >
      <div className="relative pointer-events-auto w-full max-w-[1040px] mx-3 sm:mx-6">
        
        {/* Main Floating Navigation Dock */}
        <div
          className={`relative transition-all duration-300 w-full rounded-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between ${
            isNightNavbar
              ? isScrolled
                ? 'bg-[#0B1528]/92 backdrop-blur-xl border border-[rgba(165,195,255,0.2)] shadow-[0_12px_36px_rgba(0,0,0,0.5)]'
                : 'bg-[#0B1528]/85 backdrop-blur-lg border border-[rgba(165,195,255,0.16)] shadow-[0_8px_28px_rgba(0,0,0,0.35)]'
              : isScrolled
                ? 'bg-white/94 backdrop-blur-xl border border-[#DCE4EF] shadow-[0_14px_34px_rgba(37,99,235,0.08),0_2px_8px_rgba(15,23,42,0.03)]'
                : 'bg-white/88 backdrop-blur-lg border border-[#E2E8F0] shadow-[0_10px_28px_rgba(37,99,235,0.06),0_1px_4px_rgba(15,23,42,0.02)]'
          }`}
        >
          {/* LEFT BRANDING AREA */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 pl-1 sm:pl-1.5 shrink-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 sm:gap-3 no-underline focus-visible:outline-none"
              aria-label="Rajat Behera Home"
            >
              {/* Crisp Phoenix Emblem Logo */}
              <div
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0 bg-[#0B0A09]"
                style={{
                  boxShadow: '0 2px 10px rgba(234, 88, 12, 0.35), 0 0 16px rgba(249, 115, 22, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                  border: '1.5px solid rgba(251, 146, 60, 0.6)'
                }}
              >
                <img
                  src="/assets/phoenix-crop.png"
                  alt="Phoenix Emblem"
                  width="40"
                  height="40"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                />
              </div>

              {/* Name */}
              <span className={`text-[14.5px] sm:text-[15.5px] font-bold tracking-tight font-sans-editorial group-hover:text-[#2563EB] transition-colors duration-200 select-none ${
                isNightNavbar ? 'text-[#F1F5FF] group-hover:text-[#60A5FA]' : 'text-[#0F172A]'
              }`}>
                Rajat Behera
              </span>
            </a>

            {/* Refined Divider */}
            <div
              className={`hidden md:block w-[1px] h-5 mx-1.5 ${
                isNightNavbar ? 'bg-white/15' : 'bg-[#E2E8F0]'
              }`}
              aria-hidden="true"
            />
          </div>

          {/* CENTER NAVIGATION LINKS */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-1.5"
          >
            {navLinks.map((link) => (
              <NavItem
                key={link.name}
                link={link}
                isActive={activeItem === link.name}
                isNightNavbar={isNightNavbar}
                onClick={handleNavClick}
              />
            ))}
          </nav>

          {/* RIGHT ACTION: Premium Blue Gradient Button */}
          <div className="flex items-center gap-2 pr-1">
            <button
              type="button"
              onClick={handleConnect}
              className="relative group hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-4.5 py-1.5 sm:py-2 rounded-full cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-[0_6px_20px_rgba(37,99,235,0.32)] active:scale-[0.98] focus-visible:outline-none"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 60%, #6366F1 100%)',
                boxShadow: '0 3px 12px rgba(37, 99, 235, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              aria-label="Get in touch"
            >
              <span className="text-[12px] sm:text-[12.5px] font-semibold text-white tracking-tight">
                Get in touch
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-white/90 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isNightNavbar
                    ? 'bg-[#122442] border-[rgba(150,180,230,0.2)] text-[#A9B8D0] hover:text-[#F1F5FF]'
                    : 'bg-white border-[#E2E8F0] text-[#334155] hover:text-[#0F172A] shadow-xs'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Elegant Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`md:hidden pointer-events-auto fixed top-20 left-4 right-4 rounded-2xl border px-5 py-4 shadow-xl overflow-hidden z-50 backdrop-blur-2xl ${
              isNightNavbar
                ? 'bg-[#0B1528]/95 border-[rgba(165,195,255,0.2)] text-[#F1F5FF]'
                : 'bg-white/95 border-[#E2E8F0] text-[#0F172A]'
            }`}
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeItem === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.name, link.href)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13.5px] transition-colors ${
                      isActive
                        ? isNightNavbar
                          ? 'bg-[#1E293B] text-[#60A5FA] font-semibold'
                          : 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                        : isNightNavbar
                          ? 'text-[#CBD5E1] hover:bg-white/5'
                          : 'text-[#475569] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
              <div className="pt-2 border-t border-[#E2E8F0] dark:border-white/10">
                <button
                  type="button"
                  onClick={handleConnect}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white font-semibold text-[13px] cursor-pointer shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 60%, #6366F1 100%)'
                  }}
                >
                  <span>Get in touch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
