import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles
} from 'lucide-react';

// Achievement items data exactly aligned with the reference design
const ACHIEVEMENTS_DATA = [
  {
    id: 'odoo',
    title: 'Odoo India Hackathon',
    shortTitle: 'Odoo India Hackathon',
    category: 'Hackathons',
    badge: 'HACKATHON',
    year: '2026',
    subtitle: 'Final Round | 2026',
    description:
      'Participated in the Odoo India Hackathon final round at the Odoo India HQ, Gandhinagar. Worked on a team of 3, focusing on building a real-world solution using Odoo\'s ecosystem. Gained hands-on experience in problem solving, team collaboration and rapid development.',
    bottomSnippet: 'Final round at Odoo India HQ, Gandhinagar.',
    iconType: 'trophy',
    location: 'Gandhinagar, India',
    teamSize: '3 Members',
    outcome: 'Final Round',
    actionText: 'View Certificate',
    actionUrl: '#',
    theme: {
      cardBg: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(243,240,255,0.85) 50%, rgba(230,238,255,0.8) 100%)',
      accentColor: '#6366F1',
      badgeBg: '#EDE9FE',
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
    subtitle: 'B2B Sales Platform | 2025',
    description:
      'Engineered a comprehensive B2B Sales Operations Platform featuring automated lead workflows, interactive pipeline stages, and enterprise role permissions. Architected using Next.js, Node.js, and PostgreSQL for maximum throughput.',
    bottomSnippet: 'B2B Sales Operations Platform (Next.js + Node.js + PostgreSQL).',
    iconType: 'code',
    location: 'Nagpur / Remote',
    teamSize: 'Lead Developer',
    outcome: 'Production Release',
    actionText: 'View Project',
    actionUrl: '#work',
    theme: {
      cardBg: 'linear-gradient(145deg, #1E2333 0%, #111520 100%)',
      accentColor: '#38BDF8',
      badgeBg: 'rgba(56, 189, 248, 0.15)',
      badgeText: '#38BDF8',
    },
  },
  {
    id: 'btech',
    title: 'B.Tech CSE (IoT)',
    shortTitle: 'B.Tech CSE (IoT)',
    category: 'Academics',
    badge: 'ACADEMICS',
    year: '2022 - 2026',
    subtitle: 'Undergraduate Degree | 2022 - 2026',
    description:
      'Pursuing B.Tech in Computer Science & Engineering with specialization in Internet of Things. Maintained strong academic standing across semesters with deep focus on distributed software, algorithms, embedded systems, and sensor telemetry.',
    bottomSnippet: 'CGPA: 8.51 (Sem 4) | SGPA: 8.74 (Sem 3) | 9.11 (Sem 2) | 9.31 (Sem 1)',
    iconType: 'academic',
    location: 'Nagpur, India',
    teamSize: 'Individual Track',
    outcome: 'CGPA: 8.51 (Sem 4)',
    actionText: 'View Transcript',
    actionUrl: '#about',
    theme: {
      cardBg: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(240,245,255,0.85) 100%)',
      accentColor: '#2563EB',
      badgeBg: '#DBEAFE',
      badgeText: '#2563EB',
    },
  },
  {
    id: 'mscit',
    title: 'MS-CIT',
    shortTitle: 'MS-CIT',
    category: 'Certificates',
    badge: 'CERTIFICATE',
    year: '2024',
    subtitle: 'State IT Literacy Board | 2024',
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
      cardBg: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(248,245,255,0.85) 100%)',
      accentColor: '#8B5CF6',
      badgeBg: '#F3E8FF',
      badgeText: '#8B5CF6',
    },
  },
  {
    id: 'more',
    title: 'More to Come',
    shortTitle: 'More to Come',
    category: 'All',
    badge: 'GOALS',
    year: '2026+',
    subtitle: 'Continuous Growth | 2026+',
    description:
      'Build bigger. Learn deeper. Make an impact. Actively engineering next-generation full-stack systems, scalable web applications, and connected IoT solutions while preparing for national-level hackathons and technical symposiums.',
    bottomSnippet: 'Build bigger. Learn deeper. Make an impact.',
    iconType: 'star',
    location: 'Global / Open Source',
    teamSize: 'Full Potential',
    outcome: 'Active Development',
    actionText: 'Explore Projects',
    actionUrl: '#work',
    theme: {
      cardBg: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(250,245,255,0.85) 100%)',
      accentColor: '#A855F7',
      badgeBg: '#F3E8FF',
      badgeText: '#A855F7',
    },
  },
];

const CATEGORIES = ['All', 'Hackathons', 'Projects', 'Academics', 'Certificates'];

/**
 * Custom High-Fidelity 3D-styled Trophy Graphic matching the reference design
 */
function TrophyGraphic({ className = "w-20 h-20" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Soft luminous purple-blue glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/25 to-blue-400/20 rounded-full blur-xl scale-125" />
      
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(79,70,229,0.28)] overflow-visible">
        <defs>
          <linearGradient id="trophyCupGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="45%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>
          <linearGradient id="trophyRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C7D2FE" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
          <linearGradient id="trophyHandleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
          <linearGradient id="trophyBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
        </defs>

        {/* Handles */}
        <path
          d="M26 28 C14 28, 14 50, 31 52 C29 44, 28 36, 28 28 Z"
          fill="url(#trophyHandleGrad)"
          stroke="#C7D2FE"
          strokeWidth="1.2"
        />
        <path
          d="M74 28 C86 28, 86 50, 69 52 C71 44, 72 36, 72 28 Z"
          fill="url(#trophyHandleGrad)"
          stroke="#C7D2FE"
          strokeWidth="1.2"
        />

        {/* Cup Body */}
        <path
          d="M27 24 C27 48, 38 60, 50 60 C62 60, 73 48, 73 24 Z"
          fill="url(#trophyCupGrad)"
        />

        {/* Cup Rim */}
        <ellipse cx="50" cy="24" rx="23" ry="5.5" fill="url(#trophyRimGrad)" />
        <ellipse cx="50" cy="24" rx="20.5" ry="4" fill="#312E81" opacity="0.45" />

        {/* Highlight Curve on Cup */}
        <path
          d="M32 28 C32 44, 40 54, 47 56 C44 52, 38 42, 37 28 Z"
          fill="#FFFFFF"
          opacity="0.32"
        />

        {/* Emblem Star in Center */}
        <polygon
          points="50,34 52.8,40.5 59.8,40.8 54.4,45 56.6,51.8 50,47.8 43.4,51.8 45.6,45 40.2,40.8 47.2,40.5"
          fill="#FFFFFF"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
        />

        {/* Stem */}
        <path d="M46 59 L54 59 L53 71 L47 71 Z" fill="url(#trophyBaseGrad)" />

        {/* Base Pedestal */}
        <path d="M40 70 L60 70 L64 77 L36 77 Z" fill="url(#trophyBaseGrad)" />
        <rect x="34" y="77" width="32" height="6" rx="2" fill="#1E1B4B" />
        <rect x="36" y="78" width="28" height="1.5" rx="0.75" fill="#A5B4FC" opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * 3D Crystal Gem Prism in bottom-right corner matching reference
 */
function CrystalPrism({ className = "w-20 h-20" }) {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      {/* Soft ground shadow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-indigo-900/15 rounded-full blur-md" />

      {/* Radiant ambient glow */}
      <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg scale-110" />

      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible drop-shadow-[0_10px_20px_rgba(139,92,246,0.25)]">
        <defs>
          <linearGradient id="prismTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
          <linearGradient id="prismLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>
          <linearGradient id="prismFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
          <linearGradient id="prismRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Faceted 3D Crystal */}
        <polygon points="50,15 78,32 50,46 22,32" fill="url(#prismTop)" opacity="0.95" />
        <polygon points="22,32 50,46 46,82 16,62" fill="url(#prismLeft)" />
        <polygon points="50,46 78,32 82,64 46,82" fill="url(#prismFront)" />
        <polygon points="78,32 88,48 82,64" fill="url(#prismRight)" opacity="0.85" />
        <polygon points="50,46 54,48 46,82" fill="#FFFFFF" opacity="0.3" />

        {/* Specular Edge Highlights */}
        <line x1="50" y1="15" x2="50" y2="46" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
        <line x1="50" y1="46" x2="46" y2="82" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.85" />
        <line x1="22" y1="32" x2="50" y2="46" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
        <line x1="78" y1="32" x2="50" y2="46" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
}

export default function Achievements() {
  const [selectedId, setSelectedId] = useState('odoo');
  const [activeFilter, setActiveFilter] = useState('All');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const selectedIndex = ACHIEVEMENTS_DATA.findIndex((item) => item.id === selectedId);
  const currentAchievement = ACHIEVEMENTS_DATA[selectedIndex] || ACHIEVEMENTS_DATA[0];

  // Flanker cards for the 3-object composition:
  // When 'odoo' is selected: left is DealOrbit, right is B.Tech
  // In general, derive left & right from the dataset for dynamic navigation
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

  // Subtle interactive 3D parallax on mouse movement over the middle section
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
      className="w-full relative z-10 py-16 sm:py-24 overflow-hidden bg-[#F7F8FD] border-t border-[#E2E8F0]/80 select-none"
    >
      {/* Background Soft Atmospheric Radiance (Light Lavender/Arctic) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-200/35 via-purple-200/25 to-blue-200/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[360px] bg-gradient-to-bl from-purple-200/30 via-indigo-100/30 to-sky-100/20 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* TOP THREE-COLUMN SECTION                                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          
          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 1: LEFT SECTION — Heading & Filters                            */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-6">
            <div>
              {/* Small uppercase label with thin indigo line */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[2px] bg-[#6366F1] rounded-full inline-block" />
                <span className="text-[11.5px] font-bold tracking-[0.2em] text-[#6366F1] uppercase">
                  ACHIEVEMENTS
                </span>
              </div>

              {/* Large two-line heading */}
              <h2 className="text-3xl sm:text-4xl xl:text-[42px] font-extrabold tracking-tight text-[#111827] leading-[1.16] font-sans-editorial">
                Milestones That <br className="hidden sm:inline" />
                Shape{' '}
                <span className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  My Journey
                </span>
              </h2>

              {/* Short description underneath */}
              <p className="mt-4 text-[14.5px] text-[#475569] leading-relaxed font-normal max-w-[360px]">
                A collection of my achievements, hackathon experiences, academic milestones and certificates that reflect my growth and dedication.
              </p>
            </div>

            {/* Pill-shaped Category Filters */}
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilterClick(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#4338CA] text-white shadow-sm shadow-indigo-600/30'
                        : 'bg-white/85 text-[#475569] hover:text-[#0F172A] hover:bg-white border border-[#E2E8F0]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 2: MIDDLE SECTION — The Floating 3D Main Attraction             */}
          {/* --------------------------------------------------------------------- */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 xl:col-span-6 relative flex flex-col items-center justify-center py-6 sm:py-10"
          >
            {/* Perspective Canvas Container */}
            <div
              className="relative w-full max-w-[500px] h-[370px] sm:h-[400px] flex items-center justify-center"
              style={{ perspective: 1000 }}
            >
              {/* Luminous Elliptical Platform at Bottom */}
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  opacity: [0.75, 0.9, 0.75],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-6 sm:bottom-4 w-[340px] sm:w-[410px] h-[110px] sm:h-[130px] rounded-[100%] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(199,210,254,0.55) 0%, rgba(221,214,254,0.35) 45%, rgba(186,230,253,0.1) 70%, transparent 80%)',
                  boxShadow: '0 0 45px rgba(165,180,252,0.3)',
                  border: '1px solid rgba(165,180,252,0.35)',
                }}
              />

              {/* Animated Orbital Lines sweeping around and behind the composition */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
                <svg
                  viewBox="0 0 540 380"
                  fill="none"
                  className="w-[125%] h-[125%] overflow-visible"
                >
                  <defs>
                    <linearGradient id="orbitStroke1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818CF8" stopOpacity="0.1" />
                      <stop offset="40%" stopColor="#6366F1" stopOpacity="0.65" />
                      <stop offset="70%" stopColor="#A855F7" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.15" />
                    </linearGradient>
                    <linearGradient id="orbitStroke2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C084FC" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#818CF8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Primary Diagonal Orbital Ring */}
                  <motion.ellipse
                    cx="270"
                    cy="195"
                    rx="220"
                    ry="88"
                    stroke="url(#orbitStroke1)"
                    strokeWidth="1.6"
                    strokeDasharray="8 6"
                    transform="rotate(-18 270 195)"
                    animate={{
                      strokeDashoffset: [0, -100],
                    }}
                    transition={{
                      duration: 24,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Secondary Counter Orbital Ring */}
                  <ellipse
                    cx="270"
                    cy="190"
                    rx="195"
                    ry="72"
                    stroke="url(#orbitStroke2)"
                    strokeWidth="1.2"
                    transform="rotate(14 270 190)"
                    strokeOpacity="0.4"
                  />

                  {/* Traveling Orbit Sparkle Node */}
                  <motion.circle
                    r="3.5"
                    fill="#818CF8"
                    filter="drop-shadow(0 0 6px #6366F1)"
                    animate={{
                      cx: [70, 220, 460, 310, 70],
                      cy: [230, 140, 160, 260, 230],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </svg>
              </div>

              {/* Subtle Floating Crystal Fragment */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotate: [12, 18, 12],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-6 right-12 w-6 h-6 pointer-events-none opacity-60"
              >
                <div className="w-full h-full bg-gradient-to-tr from-indigo-300/40 to-white/60 border border-white/80 rounded-md backdrop-blur-xs shadow-sm transform rotate-45" />
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* LEFT FLOATING CARD — Angled in 3D Perspective (e.g. DealOrbit) */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                onClick={() => setSelectedId(leftCardData.id)}
                animate={{
                  y: [-5, 7, -5],
                  rotateY: 24 + mousePos.x * 8,
                  rotateZ: -7,
                  rotateX: 4 - mousePos.y * 6,
                }}
                transition={{
                  y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: 0.3 },
                  rotateX: { duration: 0.3 },
                }}
                whileHover={{ scale: 1.06, zIndex: 25 }}
                className="absolute left-1 sm:left-4 z-10 w-[140px] sm:w-[155px] h-[210px] sm:h-[230px] rounded-[22px] p-4 cursor-pointer transition-shadow"
                style={{
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(150deg, #1E2333 0%, #111520 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 16px 36px rgba(15, 23, 42, 0.28), 0 0 1px rgba(255,255,255,0.2) inset',
                }}
                title={`Select ${leftCardData.title}`}
              >
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2.5">
                  {/* Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shadow-inner">
                    {leftCardData.iconType === 'code' ? (
                      <Code2 className="w-5 h-5 text-sky-400" />
                    ) : leftCardData.iconType === 'trophy' ? (
                      <Trophy className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-white tracking-tight leading-tight line-clamp-1">
                      {leftCardData.shortTitle}
                    </h4>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9.5px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {leftCardData.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {leftCardData.year}
                  </span>
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* RIGHT FLOATING CARD — Angled in 3D Perspective (e.g. B.Tech)  */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                onClick={() => setSelectedId(rightCardData.id)}
                animate={{
                  y: [6, -6, 6],
                  rotateY: -24 + mousePos.x * 8,
                  rotateZ: 7,
                  rotateX: 4 - mousePos.y * 6,
                }}
                transition={{
                  y: { duration: 5.6, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: 0.3 },
                  rotateX: { duration: 0.3 },
                }}
                whileHover={{ scale: 1.06, zIndex: 25 }}
                className="absolute right-1 sm:right-4 z-10 w-[145px] sm:w-[160px] h-[215px] sm:h-[235px] rounded-[22px] p-4 cursor-pointer transition-shadow"
                style={{
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(243,246,255,0.85) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 16px 36px rgba(99, 102, 241, 0.12), 0 1px 2px rgba(255,255,255,0.8) inset',
                }}
                title={`Select ${rightCardData.title}`}
              >
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2.5">
                  {/* Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-xs">
                    {rightCardData.iconType === 'academic' ? (
                      <GraduationCap className="w-5 h-5 text-indigo-600" />
                    ) : rightCardData.iconType === 'certificate' ? (
                      <FileCheck className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Star className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#1E293B] tracking-tight leading-tight line-clamp-1">
                      {rightCardData.shortTitle}
                    </h4>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9.5px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
                      {rightCardData.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#64748B] font-medium">
                    {rightCardData.year}
                  </span>
                </div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* CENTER HERO CARD — Translucent Lavender Glass with Trophy     */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                key={currentAchievement.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [-7, 7, -7],
                  rotateY: mousePos.x * 12,
                  rotateX: -mousePos.y * 12,
                }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{
                  scale: { duration: 0.35, ease: 'easeOut' },
                  opacity: { duration: 0.35 },
                  y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: 0.2 },
                  rotateX: { duration: 0.2 },
                }}
                whileHover={{ scale: 1.03 }}
                className="relative z-20 w-[215px] sm:w-[245px] h-[300px] sm:h-[330px] rounded-[28px] p-5 sm:p-6 flex flex-col items-center justify-between text-center select-none"
                style={{
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(242,238,255,0.82) 48%, rgba(228,235,255,0.78) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 24px 54px rgba(99, 102, 241, 0.2), 0 2px 10px rgba(255, 255, 255, 0.9) inset, 0 -2px 8px rgba(165,180,252,0.2) inset',
                }}
              >
                {/* Translucent Corner Glare Highlight */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent" />

                {/* Top/Center Visual: Custom Trophy Graphic or Theme Graphic */}
                <div className="w-full flex items-center justify-center pt-2">
                  {currentAchievement.iconType === 'trophy' ? (
                    <TrophyGraphic className="w-24 h-24 sm:w-28 sm:h-28" />
                  ) : currentAchievement.iconType === 'code' ? (
                    <div className="w-20 h-20 rounded-2xl bg-[#1E2333] border border-slate-700 flex items-center justify-center shadow-lg shadow-sky-500/20">
                      <Code2 className="w-10 h-10 text-sky-400" />
                    </div>
                  ) : currentAchievement.iconType === 'academic' ? (
                    <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shadow-lg shadow-indigo-500/15">
                      <GraduationCap className="w-10 h-10 text-indigo-600" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center shadow-lg shadow-purple-500/15">
                      <FileCheck className="w-10 h-10 text-purple-600" />
                    </div>
                  )}
                </div>

                {/* Card Information */}
                <div className="space-y-2 pb-1">
                  <h3 className="text-[17px] sm:text-[18px] font-extrabold text-[#111827] tracking-tight leading-snug">
                    {currentAchievement.title}
                  </h3>

                  <div>
                    <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#EDE9FE] text-[#6366F1] border border-indigo-200/60 shadow-2xs">
                      {currentAchievement.badge}
                    </span>
                  </div>

                  <p className="text-[12.5px] text-[#64748B] font-medium">
                    {currentAchievement.year}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Navigation Controls Directly Underneath Composition */}
            <div className="flex items-center gap-4 mt-3 sm:mt-4 z-20">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Achievement"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#6366F1] hover:text-[#4338CA] hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {ACHIEVEMENTS_DATA.map((item, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      aria-label={`Go to achievement ${idx + 1}`}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        isActive
                          ? 'w-2 h-2 bg-[#4338CA]'
                          : 'w-1.5 h-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Achievement"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#6366F1] hover:text-[#4338CA] hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 3: RIGHT SECTION — White Rounded Details Panel                  */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-4 xl:col-span-3 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAchievement.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-[0_20px_45px_rgba(99,102,241,0.06),0_1px_3px_rgba(0,0,0,0.02)] space-y-5"
              >
                {/* Category Badge Pill */}
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wider uppercase bg-[#EEF2FF] text-[#4F46E5] border border-indigo-100">
                    {currentAchievement.badge}
                  </span>
                </div>

                {/* Title + External Link Icon */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl sm:text-[22px] font-extrabold text-[#111827] tracking-tight leading-tight">
                      {currentAchievement.title}
                    </h3>
                    <a
                      href={currentAchievement.actionUrl}
                      className="text-[#6366F1] hover:text-[#4338CA] p-1 rounded-md transition-colors"
                      aria-label="Open Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-[13px] font-medium text-[#64748B] mt-1">
                    {currentAchievement.subtitle}
                  </p>
                </div>

                {/* Description Paragraph */}
                <p className="text-[13.5px] text-[#475569] leading-relaxed font-normal">
                  {currentAchievement.description}
                </p>

                {/* Small Metadata Rows with Icons */}
                <div className="space-y-2.5 pt-2 border-t border-[#F1F5F9]">
                  {currentAchievement.location && (
                    <div className="flex items-center gap-3 text-[12.5px]">
                      <MapPin className="w-4 h-4 text-[#6366F1] shrink-0" />
                      <div>
                        <span className="text-[#64748B] mr-2">Location</span>
                        <span className="text-[#1E293B] font-medium">
                          {currentAchievement.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {currentAchievement.teamSize && (
                    <div className="flex items-center gap-3 text-[12.5px]">
                      <Users className="w-4 h-4 text-[#6366F1] shrink-0" />
                      <div>
                        <span className="text-[#64748B] mr-2">Team Size</span>
                        <span className="text-[#1E293B] font-medium">
                          {currentAchievement.teamSize}
                        </span>
                      </div>
                    </div>
                  )}

                  {currentAchievement.outcome && (
                    <div className="flex items-center gap-3 text-[12.5px]">
                      <Award className="w-4 h-4 text-[#6366F1] shrink-0" />
                      <div>
                        <span className="text-[#64748B] mr-2">Outcome</span>
                        <span className="text-[#1E293B] font-medium">
                          {currentAchievement.outcome}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Prominent Indigo Gradient Action Button */}
                <div className="pt-2">
                  <a
                    href={currentAchievement.actionUrl}
                    className="w-full py-2.5 px-4 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:from-[#4338CA] hover:to-[#4F46E5] shadow-md shadow-indigo-500/25 inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <span>{currentAchievement.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION — THE JOURNEY Horizontal Milestone Ribbon                  */}
        {/* ========================================================================= */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-[#E2E8F0] relative">
          
          {/* Label: Small uppercase "THE JOURNEY" with thin indigo line */}
          <div className="flex items-center gap-2 mb-8">
            <span className="w-5 h-[2px] bg-[#6366F1] rounded-full inline-block" />
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[#6366F1] uppercase">
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
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />
                {/* Glowing Nodes along the path corresponding to each card position */}
                <circle cx="120" cy="14" r="4.5" fill="#6366F1" />
                <circle cx="120" cy="14" r="8" fill="#6366F1" opacity="0.2" />

                <circle cx="360" cy="21" r="3.5" fill="#818CF8" />
                <circle cx="600" cy="24" r="4" fill="#6366F1" />
                <circle cx="840" cy="25" r="3.5" fill="#A5B4FC" />
                <circle cx="1080" cy="28" r="3.5" fill="#818CF8" />
              </svg>
            </div>

            {/* Navigation Arrows for Bottom Ribbon (Left / Right) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Milestone"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 text-[#6366F1] hover:text-[#4338CA] flex items-center justify-center transition-all cursor-pointer hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Milestone"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 text-[#6366F1] hover:text-[#4338CA] flex items-center justify-center transition-all cursor-pointer hover:scale-105"
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
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-2xl p-4 sm:p-4.5 cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[175px] ${
                      isSelected
                        ? 'bg-[#F5F3FF]/90 border-2 border-[#6366F1] shadow-[0_12px_28px_rgba(99,102,241,0.15)] ring-2 ring-[#6366F1]/20'
                        : 'bg-white hover:bg-slate-50/90 border border-[#E2E8F0] shadow-xs'
                    }`}
                  >
                    {/* Top Row: Icon Container */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            item.id === 'dealorbit'
                              ? 'bg-[#1E2333] text-sky-400'
                              : isSelected
                              ? 'bg-[#EDE9FE] text-[#6366F1]'
                              : 'bg-slate-100 text-[#6366F1]'
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
                      </div>

                      {/* Title */}
                      <h4 className="text-[13.5px] font-bold text-[#111827] tracking-tight leading-snug line-clamp-1">
                        {item.shortTitle}
                      </h4>

                      {/* Pill & Year Row */}
                      <div className="flex items-center gap-2 mt-1.5 mb-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            isSelected
                              ? 'bg-[#EDE9FE] text-[#6366F1]'
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
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isSelected
                            ? 'text-[#6366F1] translate-x-0.5'
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
                Keep going. There's more <strong className="font-semibold text-[#111827]">ahead</strong>.
              </span>
            </div>

            {/* 3D Crystal Prism Visual in bottom-right matching reference */}
            <div className="relative -mt-6 sm:-mt-8 -mr-2">
              <CrystalPrism className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
