import React, { useState, useEffect } from 'react';

/**
 * AtmosphericCloud: Soft, natural cloud silhouette that blends seamlessly into the sky.
 * No harsh drop-shadows or cartoon border strokes.
 */
function AtmosphericCloud({ className = "", width = 160, height = 48, tint = 'day' }) {
  const isEvening = tint === 'evening';

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
        fill={
          isEvening
            ? 'rgba(255, 237, 213, 0.55)'
            : 'rgba(255, 255, 255, 0.65)'
        }
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
 * 1. Natural Morning Sun:
 * - Positioned in the upper-middle / slightly right of center atmospheric space
 * - Smooth circular sun disk with subtle natural warm atmospheric shading
 * - Emits soft daylight into the surrounding sky
 * - Zero rectangular background, zero circular UI borders, zero ray ticks
 */
function NaturalMorningSun() {
  return (
    <div className="absolute top-22 sm:top-24 lg:top-26 left-[53%] sm:left-[55%] lg:left-[57%] -translate-x-1/2 pointer-events-none select-none flex items-center justify-center z-1">
      {/* Soft warm daylight atmospheric emission aura */}
      <div
        className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(254, 243, 199, 0.45) 0%, rgba(253, 230, 138, 0.2) 35%, rgba(251, 191, 36, 0.04) 60%, transparent 75%)',
        }}
      />
      {/* Natural circular sun disk */}
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #FFFDF5 0%, #FEF3C7 40%, #FBBF24 82%, #F59E0B 100%)',
          boxShadow: '0 0 16px rgba(251, 191, 36, 0.4), 0 0 32px rgba(245, 158, 11, 0.18)',
        }}
      />
    </div>
  );
}

/**
 * 2. Natural Afternoon Sun:
 * - Positioned slightly higher in the upper zenith
 * - Bright, clean daylight sun emitting natural daylight into the surrounding bright blue sky
 * - Pure circular disk with soft warm daylight transition (no ray ticks, no borders, no box)
 */
function NaturalAfternoonSun() {
  return (
    <div className="absolute top-18 sm:top-20 lg:top-22 left-[54%] sm:left-[56%] lg:left-[58%] -translate-x-1/2 pointer-events-none select-none flex items-center justify-center z-1">
      {/* Daylight atmospheric scattering aura */}
      <div
        className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(224, 242, 254, 0.3) 30%, rgba(186, 230, 253, 0.08) 60%, transparent 75%)',
        }}
      />
      {/* Bright daylight sun disk */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #FFFFFF 0%, #FFFBEB 35%, #FEF08A 75%, #FDE047 100%)',
          boxShadow: '0 0 24px rgba(255, 255, 255, 0.8), 0 0 45px rgba(186, 230, 253, 0.3)',
        }}
      />
    </div>
  );
}

/**
 * 3. Natural Evening Sun:
 * - Positioned lower than morning and afternoon states toward the horizon
 * - Warm sunset amber/coral disk with soft warm horizon atmosphere
 * - Crisp, elegant, minimal (no excessive rays, no dramatic artificial sunset)
 */
function NaturalEveningSun() {
  return (
    <div className="absolute top-26 sm:top-28 lg:top-32 left-[53%] sm:left-[55%] lg:left-[57%] -translate-x-1/2 pointer-events-none select-none flex items-center justify-center z-1">
      {/* Warm evening sunset glow aura */}
      <div
        className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(253, 186, 116, 0.38) 0%, rgba(251, 146, 60, 0.18) 38%, rgba(234, 88, 12, 0.04) 65%, transparent 78%)',
        }}
      />
      {/* Setting sun disk */}
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #FEF3C7 0%, #FDBA74 40%, #FB923C 75%, #EA580C 100%)',
          boxShadow: '0 0 20px rgba(249, 115, 22, 0.4), 0 0 38px rgba(234, 88, 12, 0.2)',
        }}
      />
    </div>
  );
}

/**
 * HeroTimeEnvironment — Living Daytime Celestial Sky Scenery
 * 
 * Exclusively supports the 3 environmental states (NO NIGHT):
 * - 1. Morning (00:00 – 11:59): Soft blue sky, smooth sun, subtle clouds, fresh daylight atmosphere
 * - 2. Noon    (12:00 – 16:59): Brighter blue sky, sun slightly higher, minimal clouds, clean daylight
 * - 3. Evening (17:00 – 23:59): Blue/lavender/warm peach sky, smooth sunset sun, subtle clouds, horizontal flock
 */
export default function HeroTimeEnvironment({ timeState = 'noon' }) {
  const isMorning = timeState === 'morning';
  const isNoon = timeState === 'noon' || timeState === 'afternoon';
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
      {/* 1. MORNING (12:00 AM – 11:59 AM | hours 0–11) — "Good Morning"             */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isMorning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Soft Blue Sky Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #D4E8FC 0%, #E8F2FC 22%, #FEF8ED 54%, #F4F8FC 80%, #EDF2F7 100%)',
          }}
        />

        {/* Natural Morning Sun: Upper Middle Atmospheric Space */}
        <NaturalMorningSun />

        {/* Subtle Atmospheric Clouds in Open Sky */}
        <div className="absolute top-20 sm:top-22 left-6 sm:left-16 lg:left-24 animate-cloud-drift hidden sm:block">
          <AtmosphericCloud width={175} height={52} tint="day" />
        </div>
        <div className="absolute top-22 sm:top-26 right-8 sm:right-20 lg:right-28 animate-cloud-drift-reverse hidden sm:block">
          <AtmosphericCloud width={145} height={44} tint="day" />
        </div>

        {/* Distant Morning Soaring Birds */}
        <div className="absolute top-28 sm:top-32 left-[36%] sm:left-[42%] flex items-center gap-5 animate-bird-drift hidden sm:flex">
          <DistantAvianSilhouette width={19} height={10} flapDuration="2.3s" flapDelay="0s" />
          <div className="mt-2.5">
            <DistantAvianSilhouette width={15} height={8} flapDuration="2.6s" flapDelay="0.45s" />
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. NOON (12:00 PM – 4:59 PM | hours 12–16) — "Good Afternoon"             */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isNoon ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Brighter Clean Blue Daylight Sky Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #BAE6FD 0%, #DCEDFD 25%, #EAF3FB 60%, #EDF2F7 100%)',
          }}
        />

        {/* Natural Afternoon Sun: Slightly Higher Zenith */}
        <NaturalAfternoonSun />

        {/* Atmospheric Clouds in Open Sky */}
        <div className="absolute top-20 sm:top-22 left-8 sm:left-18 lg:left-28 animate-cloud-drift hidden sm:block">
          <AtmosphericCloud width={180} height={54} tint="day" />
        </div>
        <div className="absolute top-22 sm:top-26 right-10 sm:right-24 lg:right-32 animate-cloud-drift-reverse hidden sm:block">
          <AtmosphericCloud width={150} height={46} tint="day" />
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 3. EVENING (17:00 – 23:59) — "Good Evening"                                */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
          isEvening ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Blue / Lavender / Warm Peach Sunset Sky Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #B8CEF5 0%, #D8C7F0 24%, #FED7AA 54%, #F6EDE5 82%, #EDF2F7 100%)',
          }}
        />

        {/* Subtle warm horizon transition */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, transparent 45%, rgba(254, 215, 170, 0.25) 75%, rgba(253, 164, 175, 0.15) 100%)',
          }}
        />

        {/* Natural Setting Sunset Sun */}
        <NaturalEveningSun />

        {/* Atmospheric Clouds in Open Sky */}
        <div className="absolute top-20 sm:top-22 left-6 sm:left-16 lg:left-24 animate-cloud-drift hidden sm:block">
          <AtmosphericCloud width={180} height={54} tint="evening" />
        </div>
        <div className="absolute top-24 sm:top-28 right-8 sm:right-20 lg:right-28 animate-cloud-drift-reverse hidden sm:block">
          <AtmosphericCloud width={145} height={44} tint="evening" />
        </div>

        {/* Evening Flock */}
        <EveningBirdFlock isEvening={isEvening} />
      </div>

    </div>
  );
}
