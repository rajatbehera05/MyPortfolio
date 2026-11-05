import React, { useState, useEffect } from 'react';
import ShootingStars from './ShootingStars';

/**
 * AtmosphericCloud: Soft, natural cloud silhouette that blends seamlessly into the sky.
 * No harsh drop-shadows or cartoon border strokes.
 */
function AtmosphericCloud({ className = "", width = 160, height = 48, tint = 'day' }) {
  const isEvening = tint === 'evening';
  const isSunsetNear = tint === 'sunset-near';
  const isNight = tint === 'night';

  const fillColor = isNight
    ? 'rgba(30, 41, 59, 0.45)'
    : isSunsetNear
    ? 'rgba(254, 215, 170, 0.72)'
    : isEvening
    ? 'rgba(255, 237, 213, 0.55)'
    : 'rgba(255, 255, 255, 0.65)';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 175 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M20 50C10 50 2 42.5 2 34C2 26.5 8.5 20.5 17.5 19.5C22.5 10.5 32.5 5 44.5 5C57.5 5 68.5 11.5 72.5 21C77.5 17.5 85 15.5 93 15.5C103.5 15.5 112.5 19.5 117.8 25.5C122.5 22.5 128.5 21 135 21C147.5 21 158 29.5 158 40C158 41 157.8 42 157.5 43C164 43.5 169 46.5 169 50H20Z"
        fill={fillColor}
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
        {/* Left Wing */}
        <path
          d="M12 6 C8.5 3.8 4.5 2.2 0.8 2.8 C3.8 4.2 8 5.6 12 6.5 Z"
          fill="#1E293B"
          style={{
            transformOrigin: '12px 6px',
            animation: `eveningWingLeft ${flapDuration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            animationDelay: flapDelay,
          }}
        />

        {/* Right Wing */}
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
 * Natural Evening Flock Formation
 */
const EVENING_FLOCK = [
  { id: 'lead', x: 48, y: 0, width: 21, height: 11, flapDuration: '2.3s', flapDelay: '0s', driftClass: 'animate-flock-drift-1', opacity: 'opacity-90' },
  { id: 'high-left', x: 0, y: 8, width: 18, height: 9, flapDuration: '2.6s', flapDelay: '0.45s', driftClass: 'animate-flock-drift-2', opacity: 'opacity-80' },
  { id: 'mid-right', x: 72, y: 13, width: 19, height: 10, flapDuration: '2.4s', flapDelay: '0.85s', driftClass: 'animate-flock-drift-3', opacity: 'opacity-85' },
  { id: 'center-low', x: 26, y: 22, width: 17, height: 9, flapDuration: '2.5s', flapDelay: '0.2s', driftClass: 'animate-flock-drift-4', opacity: 'opacity-75' },
  { id: 'rear-right', x: 105, y: 20, width: 16, height: 8, flapDuration: '2.8s', flapDelay: '1.1s', driftClass: 'animate-flock-drift-5', opacity: 'opacity-70' },
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

      flightTimer = setTimeout(() => {
        if (!isSubscribed) return;
        setIsActive(false);

        const pauseDuration = 22000 + Math.random() * 12000;
        nextPassTimer = setTimeout(() => {
          if (isSubscribed) {
            launchPass();
          }
        }, pauseDuration);
      }, 7200);
    };

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
 * 1. Natural Morning Sun
 */
function NaturalMorningSun() {
  return (
    <div className="absolute top-30 sm:top-34 lg:top-38 left-[53%] sm:left-[55%] lg:left-[57%] -translate-x-1/2 pointer-events-none select-none flex items-center justify-center z-1">
      <div
        className="absolute w-64 h-64 sm:w-76 sm:h-76 lg:w-88 lg:h-88 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.40) 0%, rgba(253, 224, 71, 0.18) 32%, rgba(251, 191, 36, 0.05) 60%, transparent 75%)',
        }}
      />
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full"
        style={{
          background: 'radial-gradient(circle at 38% 38%, #FFFFFF 0%, #FFF9E6 25%, #FED766 62%, #F59E0B 92%, #D97706 100%)',
          boxShadow: 'inset 0 1.5px 3px rgba(255, 255, 255, 0.9), 0 0 0 1px rgba(254, 240, 138, 0.65), 0 0 20px rgba(251, 191, 36, 0.36), 0 0 42px rgba(245, 158, 11, 0.18)',
        }}
      />
    </div>
  );
}

/**
 * 2. Natural Afternoon Sun
 */
function NaturalAfternoonSun() {
  return (
    <div className="absolute top-24 sm:top-28 lg:top-32 left-[54%] sm:left-[56%] lg:left-[58%] -translate-x-1/2 pointer-events-none select-none flex items-center justify-center z-1">
      <div
        className="absolute w-72 h-72 sm:w-84 sm:h-84 lg:w-96 lg:h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(254, 240, 138, 0.22) 32%, rgba(186, 230, 253, 0.07) 60%, transparent 75%)',
        }}
      />
      <div
        className="w-15 h-15 sm:w-17 sm:h-17 lg:w-19 lg:h-19 rounded-full"
        style={{
          background: 'radial-gradient(circle at 38% 38%, #FFFFFF 0%, #FFFDEB 28%, #FEF08A 65%, #FACC15 90%, #EAB308 100%)',
          boxShadow: 'inset 0 1.5px 3px rgba(255, 255, 255, 1), 0 0 0 1px rgba(255, 255, 255, 0.8), 0 0 24px rgba(250, 204, 21, 0.42), 0 0 48px rgba(253, 224, 71, 0.20)',
        }}
      />
    </div>
  );
}

/**
 * 3. Natural Evening Sun
 */
function NaturalEveningSun() {
  return (
    <div className="absolute top-36 sm:top-40 lg:top-46 left-[53%] sm:left-[55%] lg:left-[57%] -translate-x-1/2 pointer-events-none select-none flex items-center justify-center z-1">
      <div
        className="absolute w-68 h-68 sm:w-80 sm:h-80 lg:w-92 lg:h-92 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(253, 186, 116, 0.38) 0%, rgba(251, 146, 60, 0.16) 35%, rgba(234, 88, 12, 0.04) 62%, transparent 78%)',
        }}
      />
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full"
        style={{
          background: 'radial-gradient(circle at 38% 38%, #FFF7ED 0%, #FED7AA 26%, #FB923C 64%, #EA580C 92%, #C2410C 100%)',
          boxShadow: 'inset 0 1.5px 3px rgba(255, 255, 255, 0.85), 0 0 0 1px rgba(254, 215, 170, 0.6), 0 0 22px rgba(249, 115, 22, 0.38), 0 0 46px rgba(234, 88, 12, 0.18)',
        }}
      />
    </div>
  );
}

/**
 * 4. Realistic Elegant Midnight Crescent Moon
 * - Pure, clean luminous silver-white crescent surface (no dark/black rounded back)
 * - Delicate craters and lunar mare texture
 * - Specular outer rim highlight and atmospheric cool-blue/lavender halo
 * - Very slow, graceful celestial floating animation
 */
function CrescentMoon({ className = "" }) {
  return (
    <div className={`relative pointer-events-none select-none flex items-center justify-center ${className}`}>
      {/* 1. Outermost Deep Atmospheric Lavender/Blue Ambient Glow */}
      <div
        className="absolute w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(147, 197, 253, 0.18) 0%, rgba(139, 92, 246, 0.10) 30%, rgba(79, 140, 255, 0.03) 55%, transparent 70%)',
        }}
      />

      {/* 2. Soft Inner Lunar Glow */}
      <div
        className="absolute w-28 h-28 sm:w-34 sm:h-34 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.40) 0%, rgba(186, 230, 253, 0.22) 38%, transparent 70%)',
        }}
      />

      {/* 3. Pure Clean Silver-White Lunar Crescent (Clean, no black rounded part) */}
      <svg
        width="62"
        height="62"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-13 h-13 sm:w-15 sm:h-15 lg:w-16 lg:h-16 drop-shadow-[0_0_12px_rgba(255,255,255,0.85)] drop-shadow-[0_0_24px_rgba(147,197,253,0.55)] drop-shadow-[0_0_42px_rgba(139,92,246,0.3)]"
      >
        <defs>
          {/* Pure Silver-White Luminous Gradient */}
          <linearGradient id="pureLunarWhiteGrad" x1="56" y1="16" x2="38" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#F0F9FF" />
            <stop offset="90%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          {/* Exact Crescent Mask for delicate surface craters */}
          <clipPath id="pureCrescentMask">
            <path d="M 32 7 A 25 25 0 0 1 32 57 A 17 25 0 0 0 32 7 Z" />
          </clipPath>
        </defs>

        {/* Natural Celestial Angle (~16deg tilt) */}
        <g transform="rotate(-16 32 32)">
          {/* A. Pure Clean White Crescent Body */}
          <path
            d="M 32 7 A 25 25 0 0 1 32 57 A 17 25 0 0 0 32 7 Z"
            fill="url(#pureLunarWhiteGrad)"
          />

          {/* B. Subtle Lunar Surface Details (Purely inside the white crescent) */}
          <g clipPath="url(#pureCrescentMask)">
            {/* Soft Mare Formations */}
            <ellipse cx="52" cy="24" rx="2.5" ry="1.7" fill="#CBD5E1" fillOpacity="0.45" />
            <ellipse cx="53" cy="35" rx="3.2" ry="2.0" fill="#CBD5E1" fillOpacity="0.4" />

            {/* Delicate Crater Highlights */}
            <circle cx="46" cy="46" r="1.8" fill="#CBD5E1" fillOpacity="0.38" stroke="#FFFFFF" strokeWidth="0.4" strokeOpacity="0.9" />
            <circle cx="48" cy="18" r="1.4" fill="#CBD5E1" fillOpacity="0.38" stroke="#FFFFFF" strokeWidth="0.4" strokeOpacity="0.85" />

            <ellipse cx="49" cy="29" rx="2.2" ry="2.8" fill="#CBD5E1" fillOpacity="0.3" />
            <circle cx="44" cy="40" r="1.1" fill="#CBD5E1" fillOpacity="0.4" />
          </g>

          {/* C. Brilliant Outer Specular Rim Highlight */}
          <path
            d="M 32 7 A 25 25 0 0 1 32 57"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="1"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Twinkling Night Stars
 */
const NIGHT_STARS = [
  { id: 1, left: '6%', top: '10%', size: 2, duration: 2.8, delay: 0.2 },
  { id: 2, left: '19%', top: '8%', size: 2, duration: 3.4, delay: 1.1 },
  { id: 3, left: '33%', top: '7%', size: 3, duration: 2.6, delay: 0.5 },
  { id: 4, left: '46%', top: '9%', size: 2, duration: 3.8, delay: 2.0 },
  { id: 5, left: '60%', top: '7%', size: 2.5, duration: 2.4, delay: 0.8 },
  { id: 6, left: '74%', top: '8%', size: 2, duration: 3.1, delay: 1.6 },
  { id: 7, left: '88%', top: '6%', size: 3, duration: 3.6, delay: 0.3 },
  { id: 8, left: '12%', top: '22%', size: 2.5, duration: 3.0, delay: 1.4 },
  { id: 9, left: '27%', top: '26%', size: 2, duration: 2.7, delay: 0.9 },
  { id: 10, left: '68%', top: '24%', size: 2.5, duration: 3.5, delay: 1.8 },
  { id: 11, left: '84%', top: '20%', size: 2, duration: 2.9, delay: 0.4 },
  { id: 12, left: '42%', top: '28%', size: 3, duration: 3.2, delay: 1.2 },
];

function NightTwinklingStars() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
      {NIGHT_STARS.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.9), 0 0 12px rgba(147, 197, 253, 0.6)',
            animation: `pulse ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * HeroTimeEnvironment — Living Celestial Sky Scenery
 * Supports all 4 portfolio themes:
 * - 1. Morning (05:00 – 11:59): Soft blue sky, smooth sun, subtle clouds
 * - 2. Noon    (12:00 – 16:59): Brighter azure daylight sky, high sun
 * - 3. Evening (17:00 – 21:59): Warm sunset sky, setting sun, flock
 * - 4. Night   (22:00 – 04:59): Midnight sky, crescent moon, twinkling stars
 */
export default function HeroTimeEnvironment({ timeState = 'noon' }) {
  const isMorning = timeState === 'morning';
  const isNoon = timeState === 'noon' || timeState === 'afternoon';
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
      {/* 1. MORNING */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isMorning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #D4E8FC 0%, #E8F2FC 22%, #FEF8ED 54%, #F4F8FC 80%, #EDF2F7 100%)',
          }}
        />
        <NaturalMorningSun />
        <div className="absolute top-32 sm:top-36 lg:top-40 left-[25%] sm:left-[28%] lg:left-[30%] -translate-x-1/2 animate-cloud-sway hidden sm:block z-1">
          <AtmosphericCloud width={155} height={48} tint="day" />
        </div>
        <div className="absolute top-20 sm:top-22 left-6 sm:left-16 lg:left-24 animate-cloud-drift hidden sm:block">
          <AtmosphericCloud width={175} height={52} tint="day" />
        </div>
        <div className="absolute top-22 sm:top-26 right-8 sm:right-20 lg:right-28 animate-cloud-drift-reverse hidden sm:block">
          <AtmosphericCloud width={145} height={44} tint="day" />
        </div>
        <div className="absolute top-28 sm:top-32 left-[36%] sm:left-[42%] flex items-center gap-5 animate-bird-drift hidden sm:flex">
          <DistantAvianSilhouette width={19} height={10} flapDuration="2.3s" flapDelay="0s" />
          <div className="mt-2.5">
            <DistantAvianSilhouette width={15} height={8} flapDuration="2.6s" flapDelay="0.45s" />
          </div>
        </div>
      </div>

      {/* 2. NOON */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isNoon ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #BAE6FD 0%, #DCEDFD 25%, #EAF3FB 60%, #EDF2F7 100%)',
          }}
        />
        <NaturalAfternoonSun />
        <div className="absolute top-28 sm:top-32 lg:top-36 left-[36%] sm:left-[39%] lg:left-[41%] -translate-x-1/2 animate-cloud-sway hidden sm:block z-1">
          <AtmosphericCloud width={155} height={48} tint="day" />
        </div>
        <div className="absolute top-20 sm:top-22 left-8 sm:left-18 lg:left-28 animate-cloud-drift hidden sm:block">
          <AtmosphericCloud width={180} height={54} tint="day" />
        </div>
        <div className="absolute top-22 sm:top-26 right-10 sm:right-24 lg:right-32 animate-cloud-drift-reverse hidden sm:block">
          <AtmosphericCloud width={150} height={46} tint="day" />
        </div>
      </div>

      {/* 3. EVENING */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isEvening ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #B8CEF5 0%, #D8C7F0 24%, #FED7AA 54%, #F6EDE5 82%, #EDF2F7 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, transparent 45%, rgba(254, 215, 170, 0.25) 75%, rgba(253, 164, 175, 0.15) 100%)',
          }}
        />
        <NaturalEveningSun />
        <div className="absolute top-40 sm:top-44 lg:top-50 left-[47%] sm:left-[49%] lg:left-[51%] -translate-x-1/2 animate-cloud-sway hidden sm:block z-2">
          <AtmosphericCloud width={168} height={52} tint="sunset-near" />
        </div>
        <div className="absolute top-20 sm:top-22 left-6 sm:left-16 lg:left-24 animate-cloud-drift hidden sm:block">
          <AtmosphericCloud width={180} height={54} tint="evening" />
        </div>
        <div className="absolute top-24 sm:top-28 right-8 sm:right-20 lg:right-28 animate-cloud-drift-reverse hidden sm:block">
          <AtmosphericCloud width={145} height={44} tint="evening" />
        </div>
        <EveningBirdFlock isEvening={isEvening} />
      </div>

      {/* 4. MIDNIGHT COSMIC */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isNight ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 45% at 50% 0%, rgba(79, 140, 255, 0.14) 0%, transparent 68%),
              radial-gradient(ellipse 55% 40% at 85% 20%, rgba(139, 92, 246, 0.10) 0%, transparent 60%),
              linear-gradient(180deg, #081426 0%, #0A1830 35%, #0D1B32 70%, #081426 100%)
            `,
          }}
        />
        {/* Twinkling Static Night Stars */}
        <NightTwinklingStars />

        {/* Cinematic HTML5 Canvas 2D Shooting Stars System */}
        <ShootingStars />

        {/* Repositioned Realistic Crescent Moon in Open Central Space */}
        <div className="absolute top-22 sm:top-26 lg:top-30 left-[52%] sm:left-[54%] lg:left-[56%] -translate-x-1/2 pointer-events-none select-none z-1 animate-celestial-float">
          <CrescentMoon />
        </div>

        <div className="absolute top-16 sm:top-20 left-4 sm:left-12 lg:left-20 animate-cloud-drift hidden sm:block">
          <AtmosphericCloud width={175} height={50} tint="night" />
        </div>
        <div className="absolute top-36 sm:top-42 right-[8%] sm:right-[14%] animate-cloud-drift-reverse hidden sm:block">
          <AtmosphericCloud width={145} height={44} tint="night" />
        </div>
      </div>
    </div>
  );
}
