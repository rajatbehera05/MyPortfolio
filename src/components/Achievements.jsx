import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Trophy,
  Code2,
  GraduationCap,
  FileCheck,
  Star,
  MapPin,
  Users,
  Award,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';

// Verified achievement items data with premium editorial copy
const ACHIEVEMENTS_DATA = [
  {
    id: 'sternkraft',
    title: '2nd Prize — Hackathon',
    cardTitle: '2nd Prize',
    shortTitle: '2nd Prize',
    category: 'Hackathons',
    badge: 'HACKATHON',
    year: '2026',
    date: '17 October 2026',
    team: 'STERNKRAFT',
    project: 'ResQnet',
    subtitle: 'STERNKRAFT · 17 October 2026',
    description:
      'Our team, STERNKRAFT, won 2nd prize at the hackathon with ResQnet, an IoT-enabled emergency response and disaster coordination platform.',
    bottomSnippet: '2nd Prize winner with Team STERNKRAFT (ResQnet).',
    iconType: 'trophy',
    outcome: '2nd Prize',
    actionText: 'View Project (ResQnet)',
    actionUrl: '#work',
    isPrize: true,
    theme: {
      cardBg: 'linear-gradient(155deg, #FFFFFF 0%, #FAF8FF 45%, #F0F4FF 100%)',
      accentColor: '#4F46E5',
      badgeBg: '#EEF2FF',
      badgeText: '#4338CA',
    },
  },
  {
    id: 'odoo',
    title: 'Odoo India Hackathon',
    shortTitle: 'Odoo India Hackathon',
    category: 'Hackathons',
    badge: 'HACKATHON',
    year: '2026',
    subtitle: 'Final Round · 2026',
    description:
      'Participated in the Odoo India Hackathon final round at the Odoo India HQ, Gandhinagar. Worked on a team of 3, focusing on building a real-world solution using Odoo\'s ecosystem. Gained hands-on experience in rapid development and architecture.',
    bottomSnippet: 'Final round at Odoo India HQ, Gandhinagar.',
    iconType: 'trophy',
    location: 'Gandhinagar, India',
    teamSize: '3 Members',
    outcome: 'Final Round',
    actionText: 'View Certificate',
    actionUrl: '#',
    theme: {
      cardBg: 'linear-gradient(160deg, #FFFFFF 0%, #F9FAFF 60%, #F3F5FD 100%)',
      accentColor: '#6366F1',
      badgeBg: '#EEF2FF',
      badgeText: '#6366F1',
    },
  },
  {
    id: 'dealorbit',
    title: 'DealOrbit',
    shortTitle: 'DealOrbit',
    category: 'Projects',
    badge: 'PROJECT',
    year: '2025',
    subtitle: 'B2B Sales Platform · 2025',
    description:
      'Engineered a comprehensive B2B Sales Operations Platform featuring automated lead workflows, interactive pipeline stages, and enterprise role permissions. Architected using Next.js, Node.js, and PostgreSQL for maximum throughput.',
    bottomSnippet: 'B2B Sales Operations Platform (Next.js + PostgreSQL).',
    iconType: 'code',
    location: 'Nagpur / Remote',
    teamSize: 'Lead Developer',
    outcome: 'Production Release',
    actionText: 'View Project',
    actionUrl: '#work',
    theme: {
      cardBg: 'linear-gradient(150deg, #1E2333 0%, #111520 100%)',
      accentColor: '#38BDF8',
      badgeBg: 'rgba(56, 189, 248, 0.15)',
      badgeText: '#38BDF8',
    },
  },
  {
    id: 'mscit',
    title: 'MS-CIT',
    shortTitle: 'MS-CIT',
    category: 'Certificates',
    badge: 'CERTIFICATE',
    year: '2024',
    subtitle: 'State IT Literacy Board · 2024',
    description:
      'Maharashtra State Certificate in Information Technology certified. Demonstrated proficiency in computer fundamentals, digital communication, cybersecurity essentials, and business productivity software suites.',
    bottomSnippet: 'Basic computer & MS Office certification.',
    iconType: 'certificate',
    location: 'Maharashtra, India',
    teamSize: 'Certification',
    outcome: 'Distinction',
    actionText: 'Verify Certificate',
    actionUrl: '#',
    theme: {
      cardBg: 'linear-gradient(160deg, #FFFFFF 0%, #F9FAFF 60%, #F3F5FD 100%)',
      accentColor: '#8B5CF6',
      badgeBg: '#F3E8FF',
      badgeText: '#8B5CF6',
    },
  },
  {
    id: 'btech',
    title: 'B.Tech CSE (IoT)',
    shortTitle: 'B.Tech CSE (IoT)',
    category: 'Academics',
    badge: 'ACADEMICS',
    year: '2024 - 2025',
    subtitle: 'Undergraduate Degree · 2024 - 2025',
    description:
      'Pursuing B.Tech in Computer Science & Engineering with specialization in Internet of Things. Maintained strong academic standing across semesters with deep focus on distributed software, algorithms, embedded systems, and telemetry.',
    bottomSnippet: 'CGPA: 8.51 (Sem 4) | SGPA: 8.74 (Sem 3) | 9.11 (Sem 2)',
    iconType: 'academic',
    location: 'Nagpur, India',
    teamSize: 'Individual Track',
    outcome: 'CGPA: 8.51',
    actionText: 'View Transcript',
    actionUrl: '#about',
    theme: {
      cardBg: 'linear-gradient(160deg, #FFFFFF 0%, #F9FAFF 60%, #F3F5FD 100%)',
      accentColor: '#2563EB',
      badgeBg: '#DBEAFE',
      badgeText: '#2563EB',
    },
  },
];

const CATEGORIES = ['All', 'Hackathons', 'Projects', 'Academics', 'Certificates'];

/**
 * Tastefully Art-Directed Trophy Graphic
 * Crafted with rich indigo-violet metallic gradients, polished silver/periwinkle rims,
 * specular highlights, and soft localized ambient reflections.
 */
function TrophyGraphic({ className = "w-20 h-20 sm:w-22 sm:h-22" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Soft localized ambient glow behind trophy */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-400/15 to-transparent rounded-full blur-md scale-105 pointer-events-none" />
      
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(79,70,229,0.22)] overflow-visible">
        <defs>
          <linearGradient id="trophyCupGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="35%" stopColor="#4F46E5" />
            <stop offset="70%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <linearGradient id="trophyRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EEF2FF" />
            <stop offset="30%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#C7D2FE" />
            <stop offset="100%" stopColor="#A5B4FC" />
          </linearGradient>
          <linearGradient id="trophyHandleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0E7FF" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>
          <linearGradient id="trophyBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3730A3" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
        </defs>

        {/* Handles */}
        <path
          d="M26 28 C14 28, 14 50, 31 52 C29 44, 28 36, 28 28 Z"
          fill="url(#trophyHandleGrad)"
          stroke="#C7D2FE"
          strokeWidth="1"
        />
        <path
          d="M74 28 C86 28, 86 50, 69 52 C71 44, 72 36, 72 28 Z"
          fill="url(#trophyHandleGrad)"
          stroke="#C7D2FE"
          strokeWidth="1"
        />

        {/* Cup Body */}
        <path
          d="M27 24 C27 48, 38 60, 50 60 C62 60, 73 48, 73 24 Z"
          fill="url(#trophyCupGrad)"
        />

        {/* Cup Rim with Specular Polish */}
        <ellipse cx="50" cy="24" rx="23" ry="5.2" fill="url(#trophyRimGrad)" />
        <ellipse cx="50" cy="24" rx="20.5" ry="3.8" fill="#312E81" opacity="0.4" />

        {/* Specular Highlight Curve on Cup */}
        <path
          d="M32 28 C32 44, 40 54, 47 56 C44 52, 38 42, 37 28 Z"
          fill="#FFFFFF"
          opacity="0.32"
        />

        {/* Delicate Star Emblem */}
        <polygon
          points="50,34 52.8,40.5 59.8,40.8 54.4,45 56.6,51.8 50,47.8 43.4,51.8 45.6,45 40.2,40.8 47.2,40.5"
          fill="#FFFFFF"
          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.25))"
        />

        {/* Stem */}
        <path d="M46 59 L54 59 L53 71 L47 71 Z" fill="url(#trophyBaseGrad)" />

        {/* Base Pedestal */}
        <path d="M40 70 L60 70 L64 77 L36 77 Z" fill="url(#trophyBaseGrad)" />
        <rect x="34" y="77" width="32" height="5.5" rx="1.5" fill="#1E1B4B" />
        <rect x="36" y="78" width="28" height="1.2" rx="0.6" fill="#A5B4FC" opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * 3D Crystal Gem Prism in bottom-right corner matching reference
 */
function CrystalPrism({ className = "w-16 h-16 sm:w-18 sm:h-18" }) {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      {/* Soft ground shadow */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-indigo-950/10 rounded-full blur-md" />

      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible drop-shadow-[0_8px_16px_rgba(139,92,246,0.18)]">
        <defs>
          <linearGradient id="prismTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDE9FE" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>
          <linearGradient id="prismLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <linearGradient id="prismFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="prismRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Faceted 3D Crystal */}
        <polygon points="50,15 78,32 50,46 22,32" fill="url(#prismTop)" opacity="0.95" />
        <polygon points="22,32 50,46 46,82 16,62" fill="url(#prismLeft)" />
        <polygon points="50,46 78,32 82,64 46,82" fill="url(#prismFront)" />
        <polygon points="78,32 88,48 82,64" fill="url(#prismRight)" opacity="0.85" />
        <polygon points="50,46 54,48 46,82" fill="#FFFFFF" opacity="0.25" />

        {/* Specular Edge Highlights */}
        <line x1="50" y1="15" x2="50" y2="46" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
        <line x1="50" y1="46" x2="46" y2="82" stroke="#FFFFFF" strokeWidth="1" opacity="0.85" />
        <line x1="22" y1="32" x2="50" y2="46" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.55" />
        <line x1="78" y1="32" x2="50" y2="46" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.55" />
      </svg>
    </div>
  );
}

/**
 * High-contrast responsive icon renderer for floating flanker cards
 */
function FlankerIcon({ iconType }) {
  if (iconType === 'trophy') {
    return <Trophy className="w-5 h-5 text-[#4F46E5]" />;
  }
  if (iconType === 'code') {
    return <Code2 className="w-5 h-5 text-[#2563EB]" />;
  }
  if (iconType === 'academic') {
    return <GraduationCap className="w-5 h-5 text-[#4F46E5]" />;
  }
  if (iconType === 'certificate') {
    return <FileCheck className="w-5 h-5 text-[#7C3AED]" />;
  }
  return <Sparkles className="w-5 h-5 text-[#4F46E5]" />;
}

export default function Achievements() {
  const [selectedId, setSelectedId] = useState('sternkraft');
  const [activeFilter, setActiveFilter] = useState('All');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const platformRef = useRef(null);
  const isPlatformInView = useInView(platformRef, { once: true, amount: 0.3 });
  const orangePathRef = useRef(null);
  const orangeGlowPathRef = useRef(null);
  const orangeHeadRef = useRef(null);
  const hasSweepTriggeredRef = useRef(false);

  const [isPlatformSweepComplete, setIsPlatformSweepComplete] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Scroll-triggered orange light sweep activation along the elliptical platform
  useEffect(() => {
    if (!isPlatformInView || hasSweepTriggeredRef.current || isPlatformSweepComplete) return;
    hasSweepTriggeredRef.current = true;

    const path = orangePathRef.current;
    const glowPath = orangeGlowPathRef.current;
    const head = orangeHeadRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength ? path.getTotalLength() : 912;

    // Initialize stroke dash offsets to 100% hidden
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;
    if (glowPath) {
      glowPath.style.strokeDasharray = `${totalLength}`;
      glowPath.style.strokeDashoffset = `${totalLength}`;
    }

    // Set start point at the apex (210, 1.2)
    const startPt = path.getPointAtLength ? path.getPointAtLength(0) : { x: 210, y: 1.2 };
    if (head) {
      head.setAttribute('transform', `translate(${startPt.x}, ${startPt.y})`);
      head.style.opacity = '1';
    }

    let animationFrameId;
    const DURATION = 2200; // 2.2 seconds for an elegant, smooth revolution
    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(1, elapsed / DURATION);
      const progress = easeInOutCubic(rawProgress);
      const currentOffset = totalLength * (1 - progress);
      const currentDist = progress * totalLength;

      if (path) {
        path.style.strokeDashoffset = `${currentOffset}`;
      }
      if (glowPath) {
        glowPath.style.strokeDashoffset = `${currentOffset}`;
      }

      if (head && path.getPointAtLength) {
        const pt = path.getPointAtLength(currentDist);
        head.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Complete the sweep: smoothly dissolve moving head and leave permanent glowing outline
        if (head) {
          head.style.transition = 'opacity 0.4s ease-out';
          head.style.opacity = '0';
        }
        setIsPlatformSweepComplete(true);
      }
    };

    // Small delay (150ms) so viewer catches the start of activation as it enters view
    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step);
    }, 150);

    return () => {
      clearTimeout(timer);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlatformInView, isPlatformSweepComplete]);


  const selectedIndex = ACHIEVEMENTS_DATA.findIndex((item) => item.id === selectedId);
  const currentAchievement = ACHIEVEMENTS_DATA[selectedIndex] || ACHIEVEMENTS_DATA[0];

  // Derive side cards dynamically:
  // When 'sternkraft' is selected at index 0:
  // left is index 4 (B.Tech CSE - Academic milestone)
  // right is index 1 (Odoo India Hackathon - Hackathon milestone)
  const prevIndex = (selectedIndex - 1 + ACHIEVEMENTS_DATA.length) % ACHIEVEMENTS_DATA.length;
  const nextIndex = (selectedIndex + 1) % ACHIEVEMENTS_DATA.length;
  const leftCardData = ACHIEVEMENTS_DATA[prevIndex];
  const rightCardData = ACHIEVEMENTS_DATA[nextIndex];

  // Filter change handler
  const handleFilterClick = (cat) => {
    setActiveFilter(cat);
    if (cat === 'All') return;
    const match = ACHIEVEMENTS_DATA.find((item) => item.category === cat);
    if (match) {
      setSelectedId(match.id);
    }
  };

  const handleNext = () => {
    setSelectedId(ACHIEVEMENTS_DATA[nextIndex].id);
  };

  const handlePrev = () => {
    setSelectedId(ACHIEVEMENTS_DATA[prevIndex].id);
  };

  // Subtle interactive 3D parallax on mouse movement over the visualization
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setSelectedId((current) => {
          const idx = ACHIEVEMENTS_DATA.findIndex((item) => item.id === current);
          const prev = (idx - 1 + ACHIEVEMENTS_DATA.length) % ACHIEVEMENTS_DATA.length;
          return ACHIEVEMENTS_DATA[prev].id;
        });
      }
      if (e.key === 'ArrowRight') {
        setSelectedId((current) => {
          const idx = ACHIEVEMENTS_DATA.findIndex((item) => item.id === current);
          const next = (idx + 1) % ACHIEVEMENTS_DATA.length;
          return ACHIEVEMENTS_DATA[next].id;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="achievements"
      aria-label="Achievements & Milestones"
      className="w-full relative z-10 py-16 sm:py-24 overflow-hidden bg-[#FAFBFE] border-t border-[#E2E8F0]/80 select-none"
    >
      {/* Background Soft Atmospheric Radiance (Refined Warm White with subtle icy-lavender tint) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-gradient-to-tr from-indigo-100/25 via-purple-100/15 to-transparent rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[300px] bg-gradient-to-bl from-purple-100/20 via-indigo-50/20 to-transparent rounded-full blur-[90px]" />
      </div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* TOP THREE-COLUMN SECTION — Harmonious 4 / 4 / 4 Symmetry                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-10 items-center">
          
          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 1: LEFT SECTION — Editorial Introduction & Category Filters     */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-6">
            <div>
              {/* Small uppercase label with thin indigo rule */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[2px] bg-[#4F46E5] rounded-full inline-block" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#4F46E5] uppercase">
                  ACHIEVEMENTS
                </span>
              </div>

              {/* Headline with natural two-line editorial wrapping */}
              <h2 className="text-3xl sm:text-[34px] xl:text-[38px] font-bold tracking-[-0.025em] text-[#0F172A] leading-[1.2]">
                Milestones That Shape{' '}
                <span className="bg-gradient-to-r from-[#3730A3] via-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                  My Journey
                </span>
              </h2>

              {/* Refined, readable description underneath */}
              <p className="mt-3.5 text-[14px] text-[#475569] leading-relaxed font-normal max-w-[340px]">
                A curated collection of hackathon victories, engineering projects, academic milestones, and certifications that define my technical path.
              </p>
            </div>

            {/* Compact, refined pill-shaped category filters */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilterClick(cat)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40 ${
                      isActive
                        ? 'bg-[#312E81] text-white shadow-xs'
                        : 'bg-white text-[#475569] hover:text-[#0F172A] hover:bg-slate-50 border border-[#E2E8F0] shadow-2xs'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 2: MIDDLE SECTION — Signature 3D Award Showcase Visualization   */}
          {/* --------------------------------------------------------------------- */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-4 xl:col-span-4 relative flex flex-col items-center justify-center py-4 sm:py-6"
          >
            {/* Perspective Canvas Container */}
            <div
              className="relative w-full max-w-[480px] sm:max-w-[510px] h-[370px] sm:h-[400px] flex items-center justify-center"
              style={{ perspective: 1100 }}
            >
              {/* Soft Illuminated Elliptical Platform Grounding the Composition */}
              <motion.div
                ref={platformRef}
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.75, 0.9, 0.75],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-4 sm:bottom-3 w-[350px] sm:w-[420px] h-[105px] sm:h-[125px] rounded-[100%] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(238, 242, 255, 0.8) 0%, rgba(224, 231, 255, 0.45) 40%, rgba(199, 210, 254, 0.2) 65%, transparent 80%)',
                  boxShadow: '0 0 35px rgba(165, 180, 252, 0.25), inset 0 0 20px rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(199, 210, 254, 0.45)',
                }}
              >
                {/* Scroll-Triggered Orange Light Sweep SVG Overlay with Controlled Glitter */}
                <svg
                  viewBox="0 0 420 125"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                >
                  <defs>
                    <linearGradient id="platformOrangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EA580C" stopOpacity="0.95" />
                      <stop offset="35%" stopColor="#F97316" stopOpacity="1" />
                      <stop offset="70%" stopColor="#F59E0B" stopOpacity="1" />
                      <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.95" />
                    </linearGradient>

                    {/* Tightly confined halo with minimal blur */}
                    <filter id="orangeTightHalo" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.0" />
                    </filter>

                    <filter id="orangeSparkGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#F97316" floodOpacity="0.85" />
                    </filter>
                  </defs>

                  {/* Progressive Trail: Tightly Confined Underlying Glow */}
                  <path
                    ref={orangeGlowPathRef}
                    d="M 210, 1.2 A 208.8 61.3 0 1 1 209.99 1.2 Z"
                    fill="none"
                    stroke="rgba(249, 115, 22, 0.22)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      strokeDasharray: isPlatformSweepComplete ? 'none' : '912',
                      strokeDashoffset: isPlatformSweepComplete ? '0' : '912',
                      filter: 'url(#orangeTightHalo)',
                    }}
                  />

                  {/* Progressive Trail: Thin, Crisp Orange-to-Amber Line */}
                  <path
                    ref={orangePathRef}
                    d="M 210, 1.2 A 208.8 61.3 0 1 1 209.99 1.2 Z"
                    fill="none"
                    stroke="url(#platformOrangeGradient)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      strokeDasharray: isPlatformSweepComplete ? 'none' : '912',
                      strokeDashoffset: isPlatformSweepComplete ? '0' : '912',
                      filter: isPlatformSweepComplete
                        ? 'drop-shadow(0 0 2.5px rgba(249, 115, 22, 0.4))'
                        : 'drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))',
                    }}
                  />

                  {/* Independent Star Sparkles (scattered near the platform, twinkling independently) */}
                  <g className="pointer-events-none">
                    {[
                      // Left flank (slightly outside the rim)
                      { id: 'sp-1', x: 34, y: 50, size: 3.6, color: '#FFFBEB', duration: 3.6, delay: 0.5, repeatDelay: 2.8 },
                      // Left flank (slightly inside the rim)
                      { id: 'sp-2', x: 64, y: 76, size: 3.0, color: '#FEF3C7', duration: 4.0, delay: 1.9, repeatDelay: 3.2 },
                      // Bottom-left curve (rim edge)
                      { id: 'sp-3', x: 106, y: 111, size: 3.4, color: '#FDE68A', duration: 3.3, delay: 2.7, repeatDelay: 2.5 },
                      // Bottom-left center lip
                      { id: 'sp-4', x: 154, y: 122, size: 2.8, color: '#FFFBEB', duration: 3.7, delay: 0.2, repeatDelay: 3.5 },
                      // Bottom-right center lip
                      { id: 'sp-5', x: 266, y: 122, size: 3.0, color: '#FED7AA', duration: 3.5, delay: 1.3, repeatDelay: 2.9 },
                      // Bottom-right curve (rim edge)
                      { id: 'sp-6', x: 314, y: 112, size: 3.4, color: '#FFFBEB', duration: 4.1, delay: 2.3, repeatDelay: 2.3 },
                      // Right flank (slightly inside the rim)
                      { id: 'sp-7', x: 356, y: 74, size: 3.2, color: '#FEF3C7', duration: 3.6, delay: 0.8, repeatDelay: 3.0 },
                      // Right flank (slightly outside the rim)
                      { id: 'sp-8', x: 386, y: 48, size: 3.6, color: '#FDBA74', duration: 3.8, delay: 2.4, repeatDelay: 2.6 },
                    ].map((sp) => {
                      const half = sp.size / 2;
                      return (
                        <motion.g
                          key={sp.id}
                          transform={`translate(${sp.x}, ${sp.y})`}
                          initial={{ opacity: 0, scale: 0.3 }}
                          animate={
                            isPlatformInView
                              ? {
                                  opacity: [0, 0, 0.85, 1, 0.25, 0.9, 0, 0],
                                  scale: [0.3, 0.3, 1, 1.15, 0.75, 1.05, 0.3, 0.3],
                                }
                              : { opacity: 0, scale: 0.3 }
                          }
                          transition={{
                            duration: sp.duration,
                            delay: sp.delay,
                            repeat: Infinity,
                            repeatDelay: sp.repeatDelay,
                            ease: 'easeInOut',
                          }}
                        >
                          {/* Micro localized warm glow behind star */}
                          <circle r={sp.size * 0.75} fill={sp.color} opacity="0.25" filter="url(#orangeTightHalo)" />
                          {/* Crisp 4-point star glint */}
                          <path
                            d={`M 0,${-half} Q 0,0 ${half},0 Q 0,0 0,${half} Q 0,0 ${-half},0 Q 0,0 0,${-half} Z`}
                            fill={sp.color}
                            style={{ filter: `drop-shadow(0 0 1.5px ${sp.color})` }}
                          />
                          {/* Specular bright center core */}
                          <circle r="0.5" fill="#FFFFFF" />
                        </motion.g>
                      );
                    })}
                  </g>

                  {/* Traveling Leading Light Spark (compact, bright, dissolves smoothly upon completion) */}
                  <g
                    ref={orangeHeadRef}
                    style={{
                      opacity: 0,
                      willChange: 'transform, opacity',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Small confined ambient halo */}
                    <circle r="4.5" fill="rgba(251, 146, 60, 0.25)" filter="url(#orangeTightHalo)" />
                    {/* Vivid warm orange mid spark */}
                    <circle r="2.2" fill="#EA580C" filter="url(#orangeSparkGlow)" />
                    {/* Incandescent white-amber core */}
                    <circle r="1.0" fill="#FFFBEB" />
                  </g>
                </svg>
              </motion.div>

              {/* Gentle Localized Reflection Beneath Central Card */}
              <div className="absolute bottom-6 sm:bottom-5 left-1/2 -translate-x-1/2 w-36 sm:w-44 h-4 bg-indigo-500/12 rounded-full blur-md pointer-events-none z-10" />

              {/* Animated Orbital Lines sweeping cleanly behind the composition */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-0">
                <svg
                  viewBox="0 0 540 380"
                  fill="none"
                  className="w-[120%] h-[120%] overflow-visible"
                >
                  <defs>
                    <linearGradient id="orbitStrokeRefined" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818CF8" stopOpacity="0.08" />
                      <stop offset="40%" stopColor="#6366F1" stopOpacity="0.45" />
                      <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Primary Diagonal Orbital Ring with Fine Curved SVG Stroke */}
                  <motion.ellipse
                    cx="270"
                    cy="190"
                    rx="215"
                    ry="86"
                    stroke="url(#orbitStrokeRefined)"
                    strokeWidth="1.2"
                    strokeDasharray="6 6"
                    transform="rotate(-16 270 190)"
                    animate={{
                      strokeDashoffset: [0, -96],
                    }}
                    transition={{
                      duration: 26,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Traveling Orbit Sparkle Node */}
                  <motion.circle
                    r="3"
                    fill="#818CF8"
                    filter="drop-shadow(0 0 4px #6366F1)"
                    animate={{
                      cx: [80, 220, 450, 310, 80],
                      cy: [225, 145, 165, 255, 225],
                    }}
                    transition={{
                      duration: 13,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </svg>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* LEFT FLOATING CARD — Tilted Academic Card in 3D Perspective   */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                onClick={() => setSelectedId(leftCardData.id)}
                animate={{
                  y: [-4, 5, -4],
                  rotateY: 20 + mousePos.x * 5,
                  rotateZ: -6,
                  rotateX: 4 - mousePos.y * 3,
                }}
                transition={{
                  y: { duration: 6.2, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: 0.25 },
                  rotateX: { duration: 0.25 },
                }}
                whileHover={{ scale: 1.05, zIndex: 25, y: -8 }}
                className="absolute -left-2 sm:left-1 z-10 w-[155px] sm:w-[170px] h-[225px] sm:h-[245px] rounded-[22px] p-4.5 cursor-pointer transition-shadow"
                style={{
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(160deg, #FFFFFF 0%, #F9FAFF 60%, #F3F5FD 100%)',
                  border: '1px solid rgba(203, 213, 225, 0.85)',
                  boxShadow: '0 16px 36px -8px rgba(15, 23, 42, 0.1), 0 2px 6px rgba(15, 23, 42, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
                }}
                title={`Select ${leftCardData.title}`}
              >
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2.5">
                  {/* High-Contrast Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-indigo-50/90 border border-indigo-100 flex items-center justify-center shadow-xs">
                    <FlankerIcon iconType={leftCardData.iconType} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-[#0F172A] tracking-tight leading-snug line-clamp-2 px-1">
                      {leftCardData.shortTitle}
                    </h4>
                    <div className="mt-1.5">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase bg-indigo-50 text-[#4338CA] border border-indigo-100/90">
                        {leftCardData.badge}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11.5px] font-semibold text-[#475569]">
                    {leftCardData.year}
                  </span>
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* RIGHT FLOATING CARD — Tilted Hackathon Card in 3D Perspective */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                onClick={() => setSelectedId(rightCardData.id)}
                animate={{
                  y: [5, -4, 5],
                  rotateY: -20 + mousePos.x * 5,
                  rotateZ: 6,
                  rotateX: 4 - mousePos.y * 3,
                }}
                transition={{
                  y: { duration: 6.6, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: 0.25 },
                  rotateX: { duration: 0.25 },
                }}
                whileHover={{ scale: 1.05, zIndex: 25, y: -8 }}
                className="absolute -right-2 sm:right-1 z-10 w-[155px] sm:w-[170px] h-[225px] sm:h-[245px] rounded-[22px] p-4.5 cursor-pointer transition-shadow"
                style={{
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(160deg, #FFFFFF 0%, #F9FAFF 60%, #F3F5FD 100%)',
                  border: '1px solid rgba(203, 213, 225, 0.85)',
                  boxShadow: '0 16px 36px -8px rgba(15, 23, 42, 0.1), 0 2px 6px rgba(15, 23, 42, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
                }}
                title={`Select ${rightCardData.title}`}
              >
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2.5">
                  {/* High-Contrast Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-indigo-50/90 border border-indigo-100 flex items-center justify-center shadow-xs">
                    <FlankerIcon iconType={rightCardData.iconType} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-[#0F172A] tracking-tight leading-snug line-clamp-2 px-1">
                      {rightCardData.shortTitle}
                    </h4>
                    <div className="mt-1.5">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase bg-indigo-50 text-[#4338CA] border border-indigo-100/90">
                        {rightCardData.badge}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11.5px] font-semibold text-[#475569]">
                    {rightCardData.year}
                  </span>
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* CENTER HERO CARD — Dominant Award Display                      */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                key={currentAchievement.id}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [-5, 5, -5],
                  rotateY: mousePos.x * 7,
                  rotateX: -mousePos.y * 7,
                }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{
                  scale: { duration: 0.35, ease: 'easeOut' },
                  opacity: { duration: 0.35 },
                  y: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: 0.2 },
                  rotateX: { duration: 0.2 },
                }}
                whileHover={{ scale: 1.025 }}
                className="relative z-20 w-[225px] sm:w-[250px] h-[320px] sm:h-[345px] rounded-[28px] p-6 flex flex-col items-center justify-between text-center select-none"
                style={{
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(155deg, #FFFFFF 0%, #FAF8FF 45%, #F0F4FF 100%)',
                  border: '1.5px solid rgba(199, 210, 254, 0.75)',
                  boxShadow: '0 25px 55px -12px rgba(79, 70, 229, 0.18), 0 8px 20px -6px rgba(15, 23, 42, 0.05), inset 0 1.5px 2px rgba(255, 255, 255, 1)',
                }}
              >
                {/* Restrained Localized Lavender Glow Directly Behind Trophy */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-28 h-28 bg-gradient-to-b from-indigo-400/20 via-purple-300/12 to-transparent rounded-full blur-xl pointer-events-none" />

                {/* Delicate Specular Bevel Line at Top */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

                {/* Top/Center Visual: Trophy with Subtle Independent Float */}
                <div className="w-full flex items-center justify-center pt-1 relative z-10">
                  {currentAchievement.iconType === 'trophy' ? (
                    <motion.div
                      animate={{ y: [-2.5, 2.5, -2.5] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <TrophyGraphic className="w-20 h-20 sm:w-22 sm:h-22" />
                    </motion.div>
                  ) : currentAchievement.iconType === 'code' ? (
                    <div className="w-18 h-18 rounded-2xl bg-[#1E2333] border border-slate-700/80 flex items-center justify-center shadow-lg shadow-sky-500/12">
                      <Code2 className="w-9 h-9 text-sky-400" />
                    </div>
                  ) : currentAchievement.iconType === 'academic' ? (
                    <div className="w-18 h-18 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                      <GraduationCap className="w-9 h-9 text-indigo-600" />
                    </div>
                  ) : (
                    <div className="w-18 h-18 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shadow-lg shadow-purple-500/10">
                      <FileCheck className="w-9 h-9 text-purple-600" />
                    </div>
                  )}
                </div>

                {/* Award Information Stack: 2nd Prize / STERNKRAFT / Hackathon / 2026 */}
                <div className="space-y-2 pb-1 flex flex-col items-center relative z-10">
                  <h3 className="text-[22px] sm:text-[25px] font-black text-[#0B132B] tracking-tight leading-tight">
                    {currentAchievement.cardTitle || currentAchievement.title}
                  </h3>

                  {currentAchievement.team && (
                    <p className="text-[11px] font-bold text-[#4338CA] tracking-[0.2em] uppercase">
                      {currentAchievement.team}
                    </p>
                  )}

                  <div>
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10.5px] font-bold bg-[#EDE9FE] text-[#4F46E5] border border-indigo-200/80 shadow-2xs">
                      {currentAchievement.badge === 'HACKATHON' ? 'Hackathon' : currentAchievement.badge}
                    </span>
                  </div>

                  <p className="text-[12px] font-semibold text-[#64748B] pt-0.5">
                    {currentAchievement.year}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Polished Compact Navigation Control Group Positioned Subordinately Below Platform */}
            <div className="flex items-center gap-3.5 mt-5 sm:mt-6 z-20">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Achievement"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-[#475569] hover:text-[#312E81] hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
              </button>

              {/* Unified Pagination Indicators in Clean Dock */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100/70 border border-slate-200/60">
                {ACHIEVEMENTS_DATA.map((item, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      aria-label={`Go to achievement ${idx + 1}`}
                      className={`transition-all duration-200 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                        isActive
                          ? 'w-5 h-1.5 bg-[#4338CA] shadow-2xs'
                          : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Achievement"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-[#475569] hover:text-[#312E81] hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 3: RIGHT SECTION — White Rounded Details Panel                  */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-4 xl:col-span-4 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAchievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-[0_12px_32px_rgba(15,23,42,0.04),0_1px_2px_rgba(0,0,0,0.02)] space-y-5"
              >
                {/* Category Badge Pill */}
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wider uppercase bg-[#EEF2FF] text-[#4338CA] border border-indigo-100/80">
                    {currentAchievement.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl sm:text-[22px] font-bold text-[#0F172A] tracking-tight leading-snug">
                      {currentAchievement.title}
                    </h3>
                    {currentAchievement.actionUrl && currentAchievement.actionUrl !== '#' && (
                      <a
                        href={currentAchievement.actionUrl}
                        className="text-[#6366F1] hover:text-[#4338CA] p-1 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        aria-label="Open Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-[13px] font-medium text-[#64748B] mt-1">
                    {currentAchievement.subtitle}
                  </p>
                </div>

                {/* Description Paragraph */}
                <p className="text-[13.5px] text-[#475569] leading-relaxed font-normal">
                  {currentAchievement.description}
                </p>

                {/* Aligned Metadata Rows with Consistent Line Icons */}
                <div className="space-y-3 pt-3 border-t border-[#F1F5F9]">
                  {currentAchievement.outcome && (
                    <div className="flex items-center gap-3 text-[12.5px]">
                      <Award className="w-4 h-4 text-[#6366F1] shrink-0" />
                      <div className="flex items-center">
                        <span className="text-[#64748B] w-16 shrink-0">Result</span>
                        <span className="text-[#0F172A] font-semibold">
                          {currentAchievement.outcome}
                        </span>
                        {currentAchievement.isPrize && (
                          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            Winner
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {currentAchievement.date && (
                    <div className="flex items-center gap-3 text-[12.5px]">
                      <Calendar className="w-4 h-4 text-[#6366F1] shrink-0" />
                      <div className="flex items-center">
                        <span className="text-[#64748B] w-16 shrink-0">Date</span>
                        <span className="text-[#0F172A] font-medium">
                          {currentAchievement.date}
                        </span>
                      </div>
                    </div>
                  )}

                  {currentAchievement.team && (
                    <div className="flex items-center gap-3 text-[12.5px]">
                      <Users className="w-4 h-4 text-[#6366F1] shrink-0" />
                      <div className="flex items-center">
                        <span className="text-[#64748B] w-16 shrink-0">Team</span>
                        <span className="text-[#0F172A] font-medium">
                          {currentAchievement.team}
                        </span>
                      </div>
                    </div>
                  )}

                  {!currentAchievement.team && currentAchievement.teamSize && (
                    <div className="flex items-center gap-3 text-[12.5px]">
                      <Users className="w-4 h-4 text-[#6366F1] shrink-0" />
                      <div className="flex items-center">
                        <span className="text-[#64748B] w-16 shrink-0">Team Size</span>
                        <span className="text-[#0F172A] font-medium">
                          {currentAchievement.teamSize}
                        </span>
                      </div>
                    </div>
                  )}

                  {currentAchievement.project && (
                    <div className="flex items-center gap-3 text-[12.5px]">
                      <Code2 className="w-4 h-4 text-[#6366F1] shrink-0" />
                      <div className="flex items-center">
                        <span className="text-[#64748B] w-16 shrink-0">Project</span>
                        <span className="text-[#0F172A] font-medium">
                          {currentAchievement.project}
                        </span>
                      </div>
                    </div>
                  )}

                  {currentAchievement.location && (
                    <div className="flex items-center gap-3 text-[12.5px]">
                      <MapPin className="w-4 h-4 text-[#6366F1] shrink-0" />
                      <div className="flex items-center">
                        <span className="text-[#64748B] w-16 shrink-0">Location</span>
                        <span className="text-[#0F172A] font-medium">
                          {currentAchievement.location}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Refined Indigo Action Button (Only when destination exists) */}
                {currentAchievement.actionUrl && currentAchievement.actionUrl !== '#' && (
                  <div className="pt-2">
                    <a
                      href={currentAchievement.actionUrl}
                      className="w-full py-2.5 px-4 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#4338CA] to-[#4F46E5] hover:from-[#3730A3] hover:to-[#4338CA] shadow-sm shadow-indigo-600/20 inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <span>{currentAchievement.actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION — THE JOURNEY Horizontal Milestone Ribbon                  */}
        {/* ========================================================================= */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-[#E2E8F0] relative">
          
          {/* Label: Small uppercase "THE JOURNEY" with thin indigo rule */}
          <div className="flex items-center gap-2 mb-8">
            <span className="w-5 h-[2px] bg-[#4F46E5] rounded-full inline-block" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#4F46E5] uppercase">
              THE JOURNEY
            </span>
          </div>

          {/* Continuous Curved SVG Milestone Path Behind the Cards */}
          <div className="relative w-full">
            <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none hidden md:block">
              <svg
                viewBox="0 0 1200 40"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                <path
                  d="M 0 12 Q 130 14, 240 22 T 480 20 T 720 28 T 960 22 T 1200 30"
                  stroke="#C7D2FE"
                  strokeWidth="1.2"
                  strokeOpacity="0.75"
                />
                {/* Glowing Nodes along the path corresponding to each card position */}
                {[120, 360, 600, 840, 1080].map((cx, idx) => {
                  const isCurrent = idx === selectedIndex;
                  const cyValues = [14, 21, 24, 25, 28];
                  return (
                    <React.Fragment key={cx}>
                      <circle
                        cx={cx}
                        cy={cyValues[idx]}
                        r={isCurrent ? 4.5 : 3}
                        fill={isCurrent ? '#4F46E5' : '#CBD5E1'}
                      />
                      {isCurrent && (
                        <circle
                          cx={cx}
                          cy={cyValues[idx]}
                          r={7.5}
                          fill="#4F46E5"
                          opacity={0.2}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </svg>
            </div>

            {/* Navigation Arrows for Bottom Ribbon (Left / Right) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Milestone"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 text-[#475569] hover:text-[#312E81] hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Milestone"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 text-[#475569] hover:text-[#312E81] hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Five Compact Milestone Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10 px-2 sm:px-0">
              {ACHIEVEMENTS_DATA.map((item) => {
                const isSelected = item.id === selectedId;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.15 }}
                    className={`rounded-2xl p-4 sm:p-4.5 cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[170px] ${
                      isSelected
                        ? 'bg-indigo-50/40 border-2 border-[#4F46E5] shadow-[0_8px_20px_rgba(79,70,229,0.08)] ring-2 ring-[#4F46E5]/15'
                        : 'bg-white hover:bg-slate-50/80 border border-[#E2E8F0] shadow-2xs'
                    }`}
                  >
                    {/* Top Row: Icon Container */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            item.id === 'dealorbit'
                              ? 'bg-[#1E2333] text-sky-400'
                              : item.isPrize
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-2xs'
                              : isSelected
                              ? 'bg-[#EEF2FF] text-[#4F46E5]'
                              : 'bg-slate-100 text-[#475569]'
                          }`}
                        >
                          {item.iconType === 'trophy' ? (
                            <Trophy className="w-4.5 h-4.5" />
                          ) : item.iconType === 'code' ? (
                            <Code2 className="w-4.5 h-4.5" />
                          ) : item.iconType === 'academic' ? (
                            <GraduationCap className="w-4.5 h-4.5" />
                          ) : item.iconType === 'certificate' ? (
                            <FileCheck className="w-4.5 h-4.5" />
                          ) : (
                            <Star className="w-4.5 h-4.5" />
                          )}
                        </div>

                        {item.isPrize && (
                          <span className="px-2 py-0.5 rounded-full text-[9.5px] font-semibold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/80 flex items-center gap-1 shadow-2xs">
                            <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
                            Winner
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="text-[13px] font-bold text-[#0F172A] tracking-tight leading-snug line-clamp-1">
                        {item.shortTitle}
                      </h4>

                      {/* Pill & Year Row */}
                      <div className="flex items-center gap-2 mt-1.5 mb-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            item.isPrize
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                              : isSelected
                              ? 'bg-[#EEF2FF] text-[#4F46E5]'
                              : 'bg-slate-100 text-[#475569]'
                          }`}
                        >
                          {item.badge}
                        </span>
                        <span className="text-[11px] text-[#64748B] font-medium">
                          {item.year}
                        </span>
                      </div>

                      {/* Snippet Description */}
                      <p className="text-[11.5px] text-[#64748B] leading-relaxed line-clamp-2">
                        {item.bottomSnippet}
                      </p>
                    </div>

                    {/* Bottom Row: Right Arrow */}
                    <div className="flex items-center justify-end pt-2">
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isSelected
                            ? 'text-[#4F46E5] translate-x-0.5'
                            : 'text-[#94A3B8]'
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Prompt + 3D Crystal Gem in Bottom-Right */}
          <div className="flex items-center justify-between mt-8 pt-2">
            <div className="flex items-center gap-2 text-[12.5px] text-[#4F46E5] font-medium">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>
                Keep going. There's more <strong className="font-semibold text-[#0F172A]">ahead</strong>.
              </span>
            </div>

            {/* Refined 3D Crystal Prism in bottom-right */}
            <div className="relative -mt-6 sm:-mt-8 -mr-2">
              <CrystalPrism className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
