import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * Editorial Headline Item Configuration
 * Repeated across the infinite marquee track with flowing Mid-Lavender fabric/silk waves.
 */
const HEADLINE_ITEMS = [
  { label: 'MY THEORY', subtitle: 'Click to review' },
  { label: 'MY THEORY', subtitle: 'Click to review' },
  { label: 'MY THEORY', subtitle: 'Click to review' },
  { label: 'MY THEORY', subtitle: 'Click to review' },
  { label: 'MY THEORY', subtitle: 'Click to review' },
  { label: 'MY THEORY', subtitle: 'Click to review' },
  { label: 'MY THEORY', subtitle: 'Click to review' },
  { label: 'MY THEORY', subtitle: 'Click to review' },
];

/**
 * Realistic Sculptural Fabric / Silk Wave
 * Built with the clearly visible Mid-Lavender palette:
 * - Main fabric: #B5A5D8
 * - Fabric highlights: #D5C9E9
 * - Main folds: #A58BCB
 * - Fabric shadows: #8065AC
 * - Deeper accents: #705694
 */
function SilkRibbonWaveBackground() {
  return (
    <svg
      viewBox="0 0 560 80"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        {/* Layer 1: Deeper Accents & Shadows Gradient */}
        <linearGradient id="midLavenderDeep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#705694" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#8065AC" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#A58BCB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#705694" stopOpacity="0.75" />
        </linearGradient>

        {/* Layer 2: Main Folds & Main Fabric Gradient */}
        <linearGradient id="midLavenderFolds" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8065AC" stopOpacity="0.85" />
          <stop offset="25%" stopColor="#A58BCB" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#B5A5D8" stopOpacity="0.95" />
          <stop offset="75%" stopColor="#A58BCB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8065AC" stopOpacity="0.85" />
        </linearGradient>

        {/* Layer 3: Fabric Highlights & Crest Curve */}
        <linearGradient id="midLavenderHighlights" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A58BCB" stopOpacity="0.75" />
          <stop offset="30%" stopColor="#D5C9E9" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#B5A5D8" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#D5C9E9" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#A58BCB" stopOpacity="0.75" />
        </linearGradient>

        {/* Layer 4: Gentle Sheen Rim Highlight Line */}
        <linearGradient id="midLavenderRim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B5A5D8" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#D5C9E9" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#B5A5D8" stopOpacity="0.5" />
          <stop offset="85%" stopColor="#EAE3F5" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#B5A5D8" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Layer 1: Sculptural Deeper Accent Shadows Undulation */}
      <path
        d="M0,52 C110,24 220,74 330,42 C440,16 500,60 560,52 L560,80 L0,80 Z"
        fill="url(#midLavenderDeep)"
      />

      {/* Layer 2: Main Silk Fold Ribbon (Upper Curve) */}
      <path
        d="M0,34 C130,68 250,18 380,50 C450,70 510,28 560,34 C510,58 440,24 380,42 C250,76 130,24 0,46 Z"
        fill="url(#midLavenderFolds)"
      />

      {/* Layer 3: Dynamic Twist Fabric Highlight Crest */}
      <path
        d="M0,24 C150,8 280,62 420,26 C480,12 520,32 560,24 C520,40 470,18 410,36 C270,72 140,22 0,38 Z"
        fill="url(#midLavenderHighlights)"
      />

      {/* Layer 4: Gentle Silk Rim Sheen Lines */}
      <path
        d="M0,24 C150,8 280,62 420,26 C480,12 520,32 560,24"
        fill="none"
        stroke="url(#midLavenderRim)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M0,52 C110,24 220,74 330,42 C440,16 500,60 560,52"
        fill="none"
        stroke="url(#midLavenderHighlights)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

/**
 * Single repeating marquee headline token with integrated moving fabric wave
 */
function MarqueeToken({ item }) {
  return (
    <div className="relative inline-flex items-center justify-center shrink-0 w-[540px] xs:w-[600px] sm:w-[680px] h-[78px] sm:h-[90px] px-8 sm:px-14 select-none overflow-hidden">
      {/* 1. Sculptural Silk Ribbon Wave: Moves continuously with the text */}
      <SilkRibbonWaveBackground />

      {/* 2. Interactive Content Layer */}
      <div className="relative z-10 flex items-center gap-3.5 sm:gap-5">
        {/* Main Bold Uppercase Headline in Deep Charcoal-Violet for high contrast */}
        <span className="font-sans-editorial font-extrabold text-[16px] xs:text-[18px] sm:text-[21px] md:text-[23px] tracking-[0.22em] sm:tracking-[0.26em] uppercase text-[#231735] group-hover:text-black transition-colors duration-300 drop-shadow-2xs">
          {item.label}
        </span>

        {/* Editorial Subtitle Pill: "Click to review" */}
        <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-[13px] font-mono font-bold tracking-wider bg-[#D5C9E9]/95 text-[#231735] border border-[#8065AC]/60 shadow-xs group-hover:bg-[#705694] group-hover:text-white group-hover:border-[#705694] transition-all duration-300">
          {item.subtitle}
        </span>

        {/* Directional Interactive Arrow */}
        <span
          className="inline-flex items-center justify-center text-[#231735] group-hover:text-black transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
          aria-hidden="true"
        >
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.6]" />
        </span>
      </div>
    </div>
  );
}

/**
 * Premium Animated "MY THEORY" Marquee Strip
 * 
 * Aesthetic: Clearly visible Mid-Lavender palette
 * - Main fabric: #B5A5D8
 * - Fabric highlights: #D5C9E9
 * - Main folds: #A58BCB
 * - Fabric shadows: #8065AC
 * - Deeper accents: #705694
 * Minimal, clean, spacious, straight full-width, zero extra decorations.
 */
function MyTheoryMarquee({ isNight: _isNight = false }) {
  return (
    <section
      aria-label="My Theory Announcement"
      className="w-full relative z-20 my-6 sm:my-8 overflow-hidden bg-white"
    >
      <Link
        to="/theory"
        role="link"
        aria-label="Explore My Theory — Click to review"
        className="group block w-full relative cursor-pointer transition-all duration-500 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A58BCB] focus-visible:ring-offset-2 overflow-hidden bg-white"
      >
        {/* Continuous Seamless Horizontal Marquee Track (Sharp Edge-to-Edge) */}
        <div className="flex w-full overflow-hidden select-none relative z-10 py-1">
          <div className="animate-marquee-infinite flex shrink-0 items-center">
            {/* Set 1 */}
            {HEADLINE_ITEMS.map((item, idx) => (
              <MarqueeToken
                key={`theory-set1-${idx}`}
                item={item}
              />
            ))}
            {/* Set 2 (Identical Duplicate for Zero-Gap Seamless Loop) */}
            {HEADLINE_ITEMS.map((item, idx) => (
              <MarqueeToken
                key={`theory-set2-${idx}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}

export default React.memo(MyTheoryMarquee);
