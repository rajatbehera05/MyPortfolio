import React from 'react';

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
 * Noticeably larger sharp silhouette bird with natural soaring wing geometry
 */
function CrispBird({ className = "", width = 30, height = 15 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 15"
      fill="currentColor"
      className={`pointer-events-none select-none ${className}`}
    >
      <path d="M0,7.5 Q7.5,1 15,6.5 Q22.5,1 30,7.5 Q22.5,3.5 15,8.5 Q7.5,3.5 0,7.5 Z" />
    </svg>
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
 * 4. Night Moon: Clean, luminous vector crescent moon
 * Positioned in upper sky (top-20 sm:top-22 right-10 sm:right-22 lg:right-32)
 */
function NightMoon() {
  return (
    <div className="absolute top-20 sm:top-22 right-10 sm:right-22 lg:right-32 pointer-events-none select-none flex items-center justify-center z-1">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_14px_rgba(56,189,248,0.4)]">
        {/* Hairline orbit ring */}
        <circle cx="24" cy="24" r="22" stroke="#38BDF8" strokeWidth="0.85" strokeDasharray="2 3" opacity="0.4" />
        {/* Sharp vector crescent moon */}
        <path
          d="M24 13C17.9 13 13 17.9 13 24C13 30.1 17.9 35 24 35C26.5 35 28.8 32 30.7 30.6C27.5 29.9 25.1 27.2 25.1 23.9C25.1 20.6 27.5 17.9 30.7 17.2C28.8 15.8 26.5 13 24 13Z"
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="1.1"
        />
      </svg>
    </div>
  );
}

/**
 * Sharp, brilliant pinprick stars strictly in upper sky
 */
const CRISP_STARS = [
  { x: '10%', y: '20%', size: 2.5, delay: '0s' },
  { x: '18%', y: '26%', size: 2, delay: '1.2s' },
  { x: '26%', y: '18%', size: 2.5, delay: '2.1s' },
  { x: '38%', y: '24%', size: 2, delay: '0.8s' },
  { x: '50%', y: '18%', size: 2, delay: '1.7s' },
  { x: '62%', y: '22%', size: 2.5, delay: '2.5s' },
  { x: '72%', y: '18%', size: 2, delay: '0.4s' },
  { x: '82%', y: '26%', size: 2.5, delay: '1.9s' },
  { x: '92%', y: '20%', size: 2, delay: '1.1s' },
  // Desktop accents
  { x: '14%', y: '36%', size: 2, delay: '2.3s', desktopOnly: true },
  { x: '30%', y: '32%', size: 1.5, delay: '0.6s', desktopOnly: true },
  { x: '68%', y: '32%', size: 2, delay: '2.7s', desktopOnly: true },
  { x: '86%', y: '36%', size: 2, delay: '1.5s', desktopOnly: true },
];

/**
 * HeroTimeEnvironment — Clean, Distinct, Sharp Time-Based Living Scenery
 * 
 * Includes:
 * - Noticeably larger, clearly visible clouds and majestic soaring birds.
 * - Distinct, visible sky gradients covering the Hero section.
 * - Celestial elements placed in open sky below the navbar and above cards.
 * - Smooth 1.8s cross-fade transitions synced with the whole-page environment.
 */
export default function HeroTimeEnvironment({ timeState = 'afternoon' }) {
  const isMorning = timeState === 'morning';
  const isAfternoon = timeState === 'afternoon';
  const isEvening = timeState === 'evening';
  const isNight = timeState === 'night';

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

        {/* Larger Morning Soaring Birds */}
        <div className="absolute top-24 left-[44%] sm:left-[48%] flex items-center gap-4 animate-bird-drift text-slate-700/70 hidden sm:flex">
          <CrispBird width={28} height={14} />
          <div className="mt-2.5">
            <CrispBird width={22} height={11} />
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

        {/* Larger Flying Bird Flock (Glide smoothly across open sky from left to right) */}
        <div className="absolute top-22 sm:top-24 left-0 w-full overflow-hidden h-20 pointer-events-none hidden sm:block z-1">
          <div className="animate-flock-fly absolute top-2 flex items-start text-slate-800/85">
            <CrispBird width={34} height={17} />
            <div className="-ml-3 mt-4">
              <CrispBird width={28} height={14} />
            </div>
            <div className="-ml-3 -mt-3">
              <CrispBird width={26} height={13} />
            </div>
            <div className="-ml-4 mt-8">
              <CrispBird width={22} height={11} />
            </div>
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 4. NIGHT (20:00 – 04:59) — "Good Night"                                    */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isNight ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Visible Deep Blue Atmosphere with Moonlit Reading Clearance */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 65% 35% at 35% 20%, rgba(241, 245, 249, 0.88) 0%, rgba(203, 213, 225, 0.45) 45%, transparent 75%),
              linear-gradient(180deg, #1E293B 0%, #334155 22%, #475569 48%, #64748B 70%, #CBD5E1 88%, #EDF2F7 100%)
            `,
          }}
        />

        {/* Crescent Moon in Open Sky */}
        <NightMoon />

        {/* Sharp Twinkling Stars across Open Sky */}
        <div className="absolute inset-0 pointer-events-none">
          {CRISP_STARS.map((star, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-white shadow-[0_0_4px_#38BDF8] ${star.desktopOnly ? 'hidden sm:block' : ''}`}
              style={{
                left: star.x,
                top: star.y,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `starTwinkle 3s ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>

        {/* Larger Nocturnal Cloud in Open Sky */}
        <div className="absolute top-22 sm:top-24 left-8 sm:left-20 lg:left-32 animate-cloud-drift hidden sm:block">
          <CrispMinimalCloud width={170} height={52} />
        </div>
      </div>

    </div>
  );
}
