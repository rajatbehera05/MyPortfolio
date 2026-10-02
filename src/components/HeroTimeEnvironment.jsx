import React, { useState, useEffect } from 'react';
import WireframeCube from './WireframeCube';

/**
 * Clean, sharp vector cloud with crisp hairline stroke and soft drop-shadow.
 * Scaled up to be clearly visible, majestic, and elegant across the sky.
 */
function CrispMinimalCloud({ className = "", width = 175, height = 54 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 175 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.07)] ${className}`}
    >
      <path
        d="M20 50C10 50 2 42.5 2 34C2 26.5 8.5 20.5 17.5 19.5C22.5 10.5 32.5 5 44.5 5C57.5 5 68.5 11.5 72.5 21C77.5 17.5 85 15.5 93 15.5C103.5 15.5 112.5 19.5 117.8 25.5C122.5 22.5 128.5 21 135 21C147.5 21 158 29.5 158 40C158 41 157.8 42 157.5 43C164 43.5 169 46.5 169 50H20Z"
        fill="#FFFFFF"
        fillOpacity="0.94"
        stroke="#CBD5E1"
        strokeWidth="1.25"
      />
    </svg>
  );
}

/**
 * Small, clean distant bird silhouette with independent wing articulation,
 * natural flap-and-glide avian physics, and zero windmill or propeller artifacting.
 */
function DistantAvianSilhouette({
  className = "",
  width = 20,
  height = 10,
  flapDuration = "2.4s",
  flapDelay = "0s",
  driftClass = "",
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${driftClass}`}
      style={{
        animation: `eveningBirdLift ${flapDuration} ease-in-out infinite`,
        animationDelay: flapDelay,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`overflow-visible ${className}`}
      >
        {/* Left Wing (Pivoting at center shoulder 12px, 6px) */}
        <path
          d="M12 6 C8.5 3.8 4.5 2.2 0.8 2.8 C3.8 4.2 8 5.6 12 6.5 Z"
          fill="#1E293B"
          style={{
            transformOrigin: '12px 6px',
            animation: `eveningWingLeft ${flapDuration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            animationDelay: flapDelay,
          }}
        />

        {/* Right Wing (Pivoting at center shoulder 12px, 6px) */}
        <path
          d="M12 6 C15.5 3.8 19.5 2.2 23.2 2.8 C20.2 4.2 16 5.6 12 6.5 Z"
          fill="#1E293B"
          style={{
            transformOrigin: '12px 6px',
            animation: `eveningWingRight ${flapDuration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            animationDelay: flapDelay,
          }}
        />

        {/* Minimal Central Avian Fuselage */}
        <path
          d="M12 4.6 C12.6 4.6 13 5.2 13 6 C13 7.2 12.6 9 12 10.2 C11.4 9 11 7.2 11 6 C11 5.2 11.4 4.6 12 4.6 Z"
          fill="#0F172A"
        />
      </svg>
    </div>
  );
}

/**
 * Natural Evening Flock Formation:
 *         🐦 (Lead)
 *     🐦        🐦
 *          🐦
 *              🐦
 * 
 * - Flies once across the upper sky from Left to Right over ~7.2 seconds.
 * - Subtle curved flight path with gentle upward updraft and soft descent.
 * - Far away from navbar, hero title, paragraphs, and buttons.
 * - Pauses for a long randomized interval (22s–34s) between passes.
 * - Crisp, dark navy distant silhouettes with realistic depth scaling.
 */
const EVENING_FLOCK = [
  // 1. Lead Bird (apex of formation)
  {
    id: 'lead',
    x: 48,
    y: 0,
    width: 21,
    height: 11,
    flapDuration: '2.3s',
    flapDelay: '0s',
    driftClass: 'animate-flock-drift-1',
    opacity: 'opacity-90',
  },
  // 2. High Wingman (upper left, trailing)
  {
    id: 'high-left',
    x: 0,
    y: 8,
    width: 18,
    height: 9,
    flapDuration: '2.6s',
    flapDelay: '0.45s',
    driftClass: 'animate-flock-drift-2',
    opacity: 'opacity-80',
  },
  // 3. Right Wingman (mid-right, slightly lower)
  {
    id: 'mid-right',
    x: 72,
    y: 13,
    width: 19,
    height: 10,
    flapDuration: '2.4s',
    flapDelay: '0.85s',
    driftClass: 'animate-flock-drift-3',
    opacity: 'opacity-85',
  },
  // 4. Center-Low Trailing Bird
  {
    id: 'center-low',
    x: 26,
    y: 22,
    width: 17,
    height: 9,
    flapDuration: '2.5s',
    flapDelay: '0.2s',
    driftClass: 'animate-flock-drift-4',
    opacity: 'opacity-75',
  },
  // 5. Far Right Trailing Bird (distant rear guard)
  {
    id: 'rear-right',
    x: 105,
    y: 20,
    width: 16,
    height: 8,
    flapDuration: '2.8s',
    flapDelay: '1.1s',
    driftClass: 'animate-flock-drift-5',
    opacity: 'opacity-70',
  },
];

function EveningBirdFlock({ isEvening }) {
  const [isActive, setIsActive] = useState(false);
  const [passKey, setPassKey] = useState(0);

  useEffect(() => {
    if (!isEvening) {
      setIsActive(false);
      return;
    }

    let isSubscribed = true;
    let flightTimer = null;
    let nextPassTimer = null;

    const launchPass = () => {
      if (!isSubscribed) return;
      setPassKey((k) => k + 1);
      setIsActive(true);

      // 7.2s flight time across the screen
      flightTimer = setTimeout(() => {
        if (!isSubscribed) return;
        setIsActive(false);

        // Wait a long random interval (22s - 34s) before optionally launching another pass
        const pauseDuration = 22000 + Math.random() * 12000;
        nextPassTimer = setTimeout(() => {
          if (isSubscribed) {
            launchPass();
          }
        }, pauseDuration);
      }, 7200);
    };

    // Initial pass starts 1.5s after evening activates
    const initialDelay = setTimeout(launchPass, 1500);

    return () => {
      isSubscribed = false;
      clearTimeout(initialDelay);
      clearTimeout(flightTimer);
      clearTimeout(nextPassTimer);
    };
  }, [isEvening]);

  if (!isEvening || !isActive) return null;

  return (
    <div
      key={passKey}
      className="absolute top-20 sm:top-24 left-0 w-full overflow-hidden h-28 pointer-events-none hidden sm:block z-1"
    >
      <div
        className="absolute top-2 left-0"
        style={{
          animation: 'eveningFlockPass 7.2s linear forwards',
        }}
      >
        <div className="relative w-[140px] h-[45px]">
          {EVENING_FLOCK.map((bird) => (
            <div
              key={bird.id}
              className={`absolute ${bird.opacity}`}
              style={{
                left: `${bird.x}px`,
                top: `${bird.y}px`,
              }}
            >
              <DistantAvianSilhouette
                width={bird.width}
                height={bird.height}
                flapDuration={bird.flapDuration}
                flapDelay={bird.flapDelay}
                driftClass={bird.driftClass}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 1. Morning Sun: Clean vector golden sun with crisp ray ticks and dashed orbit ring
 * Positioned in open sky above the card (top-24 sm:top-28 right-10 sm:right-20 lg:right-28)
 */
function MorningSun() {
  return (
    <div className="absolute top-22 sm:top-26 right-10 sm:right-20 lg:right-28 pointer-events-none select-none flex items-center justify-center z-1">
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_14px_rgba(245,158,11,0.3)]">
        {/* Subtle hairline dashed orbit */}
        <circle cx="29" cy="29" r="26" stroke="#F59E0B" strokeWidth="0.85" strokeDasharray="3 3" opacity="0.45" />
        {/* Clean central sun disk */}
        <circle cx="29" cy="29" r="13" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.25" />
        {/* Crisp cardinal ray ticks */}
        <line x1="29" y1="2" x2="29" y2="8" stroke="#F59E0B" strokeWidth="1.35" strokeLinecap="round" />
        <line x1="29" y1="50" x2="29" y2="56" stroke="#F59E0B" strokeWidth="1.35" strokeLinecap="round" />
        <line x1="2" y1="29" x2="8" y2="29" stroke="#F59E0B" strokeWidth="1.35" strokeLinecap="round" />
        <line x1="50" y1="29" x2="56" y2="29" stroke="#F59E0B" strokeWidth="1.35" strokeLinecap="round" />
        {/* Diagonal ray ticks */}
        <line x1="10" y1="10" x2="14" y2="14" stroke="#F59E0B" strokeWidth="1.15" strokeLinecap="round" opacity="0.8" />
        <line x1="44" y1="44" x2="48" y2="48" stroke="#F59E0B" strokeWidth="1.15" strokeLinecap="round" opacity="0.8" />
        <line x1="10" y1="48" x2="14" y2="44" stroke="#F59E0B" strokeWidth="1.15" strokeLinecap="round" opacity="0.8" />
        <line x1="44" y1="14" x2="48" y2="10" stroke="#F59E0B" strokeWidth="1.15" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  );
}

/**
 * 2. Afternoon Sun: Higher in zenith with luminous white core and daylight cyan rays
 * Positioned noticeably higher (top-18 sm:top-20 right-14 sm:right-28 lg:right-36)
 */
function AfternoonSun() {
  return (
    <div className="absolute top-18 sm:top-20 right-12 sm:right-24 lg:right-36 pointer-events-none select-none flex items-center justify-center z-1">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_16px_rgba(2,132,199,0.25)]">
        {/* Concentric hairline technical ring */}
        <circle cx="30" cy="30" r="27" stroke="#0284C7" strokeWidth="0.85" opacity="0.32" />
        <circle cx="30" cy="30" r="19" stroke="#38BDF8" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.45" />
        {/* Luminous central disk */}
        <circle cx="30" cy="30" r="13" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
        <circle cx="30" cy="30" r="7" fill="#38BDF8" fillOpacity="0.35" />
        {/* Geometric ray ticks */}
        <line x1="30" y1="2" x2="30" y2="8" stroke="#0284C7" strokeWidth="1.35" strokeLinecap="round" />
        <line x1="30" y1="52" x2="30" y2="58" stroke="#0284C7" strokeWidth="1.35" strokeLinecap="round" />
        <line x1="2" y1="30" x2="8" y2="30" stroke="#0284C7" strokeWidth="1.35" strokeLinecap="round" />
        <line x1="52" y1="30" x2="58" y2="30" stroke="#0284C7" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * 3. Evening Sun: Setting lower toward horizon with warm orange/coral tones
 * Positioned lower (top-30 sm:top-34 right-10 sm:right-20 lg:right-28)
 */
function EveningSun() {
  return (
    <div className="absolute top-30 sm:top-34 right-10 sm:right-20 lg:right-28 pointer-events-none select-none flex items-center justify-center z-1">
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_16px_rgba(234,88,12,0.35)]">
        {/* Horizon axis guide line */}
        <line x1="0" y1="29" x2="58" y2="29" stroke="#EA580C" strokeWidth="0.85" strokeDasharray="3 3" opacity="0.45" />
        {/* Outer sunset ring */}
        <circle cx="29" cy="29" r="25" stroke="#EA580C" strokeWidth="0.85" strokeDasharray="4 3" opacity="0.45" />
        {/* Warm setting sun disk */}
        <circle cx="29" cy="29" r="13" fill="#EA580C" stroke="#FDBA74" strokeWidth="1.35" />
        {/* Ray accents */}
        <line x1="29" y1="3" x2="29" y2="9" stroke="#EA580C" strokeWidth="1.35" strokeLinecap="round" />
        <line x1="29" y1="49" x2="29" y2="55" stroke="#EA580C" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * 4. Night Scenery Components:
 * - Elegant vector crescent moon in upper right empty sky
 * - 21 sparse, crisp twinkling stars with independent cycles
 * - 2 minimal midnight cloud silhouettes
 */
function CrescentMoon({ className = "" }) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <mask id="crescentCutoutMask">
            <rect width="44" height="44" fill="white" />
            <circle cx="16" cy="18" r="16" fill="black" />
          </mask>
        </defs>

        {/* Soft, minimal atmospheric lunar aura */}
        <circle
          cx="22"
          cy="22"
          r="17"
          fill="#4F8CFF"
          fillOpacity="0.08"
        />

        {/* Crisp vector crescent moon */}
        <circle
          cx="22"
          cy="22"
          r="17"
          fill="#F1F5FF"
          mask="url(#crescentCutoutMask)"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(241, 245, 255, 0.45))',
          }}
        />
      </svg>
    </div>
  );
}

function NightCloud({ className = "", width = 175, height = 50 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 175 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)] ${className}`}
    >
      <path
        d="M20 50C10 50 2 42.5 2 34C2 26.5 8.5 20.5 17.5 19.5C22.5 10.5 32.5 5 44.5 5C57.5 5 68.5 11.5 72.5 21C77.5 17.5 85 15.5 93 15.5C103.5 15.5 112.5 19.5 117.8 25.5C122.5 22.5 128.5 21 135 21C147.5 21 158 29.5 158 40C158 41 157.8 42 157.5 43C164 43.5 169 46.5 169 50H20Z"
        fill="#0D1E38"
        fillOpacity="0.8"
        stroke="rgba(150, 180, 230, 0.12)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

// Exactly 21 crisp stars positioned solely in negative space
const NIGHT_STARS = [
  // Upper sky (below navbar, above headline & cards)
  { id: 1, left: '5%', top: '9%', size: 2, duration: 2.8, delay: 0.2, type: 'dot' },
  { id: 2, left: '18%', top: '7%', size: 2, duration: 3.4, delay: 1.1, type: 'dot' },
  { id: 3, left: '31%', top: '6%', size: 7, duration: 2.6, delay: 0.5, type: 'cross' },
  { id: 4, left: '44%', top: '8%', size: 1.5, duration: 3.8, delay: 2.0, type: 'dot' },
  { id: 5, left: '58%', top: '6%', size: 2, duration: 2.4, delay: 0.8, type: 'dot' },
  { id: 6, left: '71%', top: '7%', size: 2.5, duration: 3.1, delay: 1.6, type: 'dot' },
  { id: 7, left: '83%', top: '5%', size: 7.5, duration: 3.6, delay: 0.3, type: 'cross' },
  { id: 8, left: '94%', top: '9%', size: 2, duration: 2.9, delay: 1.9, type: 'dot' },

  // Far left outer negative space (clear of headline & body text)
  { id: 9, left: '3%', top: '24%', size: 2, duration: 3.5, delay: 0.6, type: 'dot' },
  { id: 10, left: '4.5%', top: '42%', size: 7, duration: 2.5, delay: 1.4, type: 'cross' },
  { id: 11, left: '2.5%', top: '62%', size: 2, duration: 3.9, delay: 2.3, type: 'dot' },
  { id: 12, left: '5%', top: '80%', size: 1.5, duration: 2.7, delay: 0.9, type: 'dot' },

  // Far right outer negative space (clear of identity frame)
  { id: 13, left: '96%', top: '26%', size: 2, duration: 3.2, delay: 1.2, type: 'dot' },
  { id: 14, left: '94%', top: '46%', size: 6.5, duration: 2.3, delay: 0.4, type: 'cross' },
  { id: 15, left: '97%', top: '64%', size: 2, duration: 3.7, delay: 1.8, type: 'dot' },
  { id: 16, left: '95%', top: '82%', size: 1.5, duration: 2.8, delay: 2.5, type: 'dot' },

  // Center vertical negative space
  { id: 17, left: '56%', top: '19%', size: 2, duration: 3.3, delay: 0.7, type: 'dot' },
  { id: 18, left: '59%', top: '38%', size: 1.5, duration: 2.9, delay: 1.5, type: 'dot' },
  { id: 19, left: '57%', top: '66%', size: 2, duration: 3.6, delay: 2.1, type: 'dot' },

  // Bottom right negative space
  { id: 20, left: '78%', top: '78%', size: 2, duration: 2.5, delay: 1.0, type: 'dot' },
  { id: 21, left: '88%', top: '86%', size: 7, duration: 3.4, delay: 0.5, type: 'cross' },
];

function NightTwinklingStars() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
      {NIGHT_STARS.map((star) => (
        <div
          key={star.id}
          className={`absolute flex items-center justify-center ${
            star.id > 8 && star.id % 2 === 0 ? 'hidden sm:flex' : 'flex'
          }`}
          style={{
            left: star.left,
            top: star.top,
            animation: `nightStarTwinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            willChange: 'opacity, transform',
          }}
        >
          {star.type === 'cross' ? (
            <svg
              width={star.size}
              height={star.size}
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              <path
                d="M5 0C5 3 3 5 0 5C3 5 5 7 5 10C5 7 7 5 10 5C7 5 5 3 5 0Z"
                fill="#F1F5FF"
              />
            </svg>
          ) : (
            <span
              className="rounded-full bg-[#F1F5FF]"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * HeroTimeEnvironment — Clean, Distinct, Sharp Time-Based Living Scenery
 * 
 * Supports:
 * - 1. Morning: Gentle sunrise sky, illustrated sun, soft clouds, distant soaring birds.
 * - 2. Afternoon: Bright daylight sky, high sun, crisp clouds.
 * - 3. Evening: Sunset glow, setting sun, clouds, and realistic 5-bird soaring flock.
 * - 4. Night: Deep Midnight Navy, subtle indigo depth, crescent moon, twinkling stars, and minimal clouds.
 */
export default function HeroTimeEnvironment({ timeState = 'afternoon' }) {
  const isNight = timeState === 'night';
  const isMorning = timeState === 'morning';
  const isAfternoon = timeState === 'afternoon';
  const isEvening = timeState === 'evening';

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. MORNING (05:00 – 11:59) — "Good Morning"                                */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isMorning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Visible Morning Sky Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #D4E8FC 0%, #E8F2FC 22%, #FEF3C7 52%, #F5F8FC 80%, #EDF2F7 100%)',
          }}
        />

        {/* Illustrated Morning Sun */}
        <MorningSun />

        {/* Larger Crisp Clouds in Open Sky */}
        <div className="absolute top-22 sm:top-24 left-6 sm:left-16 lg:left-24 animate-cloud-drift hidden sm:block">
          <CrispMinimalCloud width={185} height={56} />
        </div>
        <div className="absolute top-20 sm:top-22 right-[36%] sm:right-[42%] animate-cloud-drift-reverse hidden sm:block">
          <CrispMinimalCloud width={150} height={46} />
        </div>

        {/* Distant Morning Soaring Birds */}
        <div className="absolute top-28 sm:top-32 left-[44%] sm:left-[48%] flex items-center gap-5 animate-bird-drift hidden sm:flex">
          <DistantAvianSilhouette width={19} height={10} flapDuration="2.3s" flapDelay="0s" />
          <div className="mt-2.5">
            <DistantAvianSilhouette width={15} height={8} flapDuration="2.6s" flapDelay="0.45s" />
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. AFTERNOON (12:00 – 16:59) — "Good Afternoon"                            */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isAfternoon ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Visible Bright Daylight Sky Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #BAE6FD 0%, #DCEDFD 25%, #EAF3FB 60%, #EDF2F7 100%)',
          }}
        />

        {/* High Daylight Sun */}
        <AfternoonSun />

        {/* Larger Crisp Clouds in Open Sky */}
        <div className="absolute top-22 sm:top-24 left-8 sm:left-18 lg:left-28 animate-cloud-drift hidden sm:block">
          <CrispMinimalCloud width={195} height={60} />
        </div>
        <div className="absolute top-20 sm:top-22 right-[38%] sm:right-[44%] animate-cloud-drift-reverse hidden sm:block">
          <CrispMinimalCloud width={155} height={48} />
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 3. EVENING (17:00 – 19:59) — "Good Evening"                                */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isEvening ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Visible Sunset Gradient: Twilight Blue → Violet → Warm Peach/Coral */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #C7D8F8 0%, #E2D3F5 22%, #FED7AA 52%, #F6EDE5 82%, #EDF2F7 100%)',
          }}
        />

        {/* Setting Sunset Sun */}
        <EveningSun />

        {/* Larger Crisp Clouds in Open Sky */}
        <div className="absolute top-22 sm:top-24 left-6 sm:left-16 lg:left-24 animate-cloud-drift hidden sm:block">
          <CrispMinimalCloud width={190} height={58} />
        </div>
        <div className="absolute top-20 sm:top-22 right-[36%] sm:right-[42%] animate-cloud-drift-reverse hidden sm:block">
          <CrispMinimalCloud width={150} height={46} />
        </div>

        {/* Rebuilt Evening Flock */}
        <EveningBirdFlock isEvening={isEvening} />
      </div>


      {/* ========================================================================= */}
      {/* 4. NIGHT (20:00 – 04:59) — "Good Night"                                   */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isNight ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Deep Midnight Navy Sky with subtle atmospheric indigo/blue depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 45% at 50% 0%, rgba(79, 140, 255, 0.08) 0%, transparent 68%),
              radial-gradient(ellipse 55% 40% at 85% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 60%),
              linear-gradient(180deg, #081426 0%, #0A1830 35%, #0D1B32 70%, #081426 100%)
            `,
          }}
        />

        {/* Elegant Vector Crescent Moon in upper right negative space */}
        <div className="absolute top-14 sm:top-18 right-8 sm:right-16 lg:right-24 z-10 hidden sm:block">
          <CrescentMoon />
        </div>

        {/* Independent Twinkling Stars strictly in empty negative space */}
        <NightTwinklingStars />

        {/* 2 Subtle Midnight Clouds in empty negative space */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-12 lg:left-20 animate-cloud-drift hidden sm:block">
          <NightCloud width={180} height={52} />
        </div>
        <div className="absolute top-32 sm:top-38 right-[10%] sm:right-[18%] animate-cloud-drift-reverse hidden sm:block">
          <NightCloud width={145} height={44} />
        </div>

        {/* Subtle decorative wireframe cubes in bottom-right corner */}
        <div className="absolute -bottom-8 right-6 sm:right-12 hidden lg:flex items-end gap-3 pointer-events-none opacity-40">
          <WireframeCube
            size={52}
            color="#3B82F6"
            tiltX={-15}
            tiltZ={15}
            duration={24}
            divisions={2}
          />
          <div className="mb-6 -ml-4">
            <WireframeCube
              size={36}
              color="#4F8CFF"
              tiltX={25}
              tiltZ={-10}
              duration={18}
              reverse={true}
              divisions={2}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
