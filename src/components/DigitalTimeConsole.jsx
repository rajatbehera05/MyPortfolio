import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Weekday indicators (Monday to Sunday)
 */
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Clean local time and calendar data helper
 */
/**
 * Clean local time and calendar data helper
 */
function getLocalTimeData(timeState, isOverridden) {
  const now = new Date();
  let hours24 = now.getHours();
  let minutes = now.getMinutes();

  if (isOverridden) {
    if (timeState === 'morning') {
      hours24 = 9;
      minutes = 30;
    } else if (timeState === 'noon' || timeState === 'afternoon') {
      hours24 = 14;
      minutes = 15;
    } else if (timeState === 'evening') {
      hours24 = 19;
      minutes = 45;
    }
  }

  // 12-hour format
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const hoursStr = String(hours12).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  // 0 = Monday, ..., 6 = Sunday
  const jsDay = now.getDay();
  const dayIndex = (jsDay + 6) % 7;

  return {
    hoursStr,
    minutesStr,
    ampm,
    dayIndex,
    dayName: DAY_NAMES[dayIndex],
    rawMinute: minutes,
  };
}

/**
 * DigitalTimeConsole
 *
 * Premium futuristic IoT / smart-device digital clock component:
 * - High-readability modern typography with smooth edges and rounded curves
 * - High contrast dark navy / charcoal text
 * - Clean horizontal layout: [ TIME ] [ PM ]   |   [ SUN ICON ]
 *                                                   M T W T F S S
 * - Subtle lavender/purple border with gentle magenta/pink accents
 * - Calm, long-term comfortable viewing with zero flicker or harsh segments
 */
export default function DigitalTimeConsole({
  timeState = 'noon',
  isOverridden = false,
  isNight = false,
  className = '',
}) {
  const [timeData, setTimeData] = useState(() => getLocalTimeData(timeState, isOverridden));
  const prevMinuteRef = useRef(timeData.rawMinute);

  useEffect(() => {
    setTimeData(getLocalTimeData(timeState, isOverridden));
  }, [timeState, isOverridden]);

  useEffect(() => {
    if (isOverridden) return;

    const interval = setInterval(() => {
      const updated = getLocalTimeData(timeState, false);
      if (updated.rawMinute !== prevMinuteRef.current) {
        prevMinuteRef.current = updated.rawMinute;
      }
      setTimeData(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeState, isOverridden]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`relative select-none w-fit ${className}`}
      role="timer"
      aria-label={`Current time: ${timeData.hoursStr}:${timeData.minutesStr} ${timeData.ampm}, ${timeData.dayName}`}
    >
      {/* Outer Card with Subtle Lavender/Purple Gradient Border */}
      <div
        className={`p-[1px] rounded-2xl shadow-[0_4px_20px_rgba(139,92,246,0.07),0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 ${
          isNight
            ? 'bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-indigo-500/30 shadow-[0_4px_24px_rgba(0,0,0,0.45),0_0_15px_rgba(139,92,246,0.12)]'
            : 'bg-gradient-to-r from-[#D8B4FE]/60 via-[#F472B6]/35 to-[#C084FC]/50 hover:from-[#C084FC]/70 hover:to-[#D8B4FE]/70'
        }`}
      >
        {/* Inner Card Container */}
        <div
          className={`flex items-center gap-3 sm:gap-4 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-[15px] transition-colors duration-300 ${
            isNight
              ? 'bg-[#101A2E]/95 backdrop-blur-md'
              : 'bg-white/95 backdrop-blur-md'
          }`}
        >
          {/* ================================================================= */}
          {/* LEFT ZONE: [ TIME ] [ PM ]                                        */}
          {/* ================================================================= */}
          <div className="flex items-center gap-2">
            {/* Time Display with Modern Rounded Digital Numerals */}
            <div
              className={`flex items-center font-bold tracking-[0.04em] text-[24px] sm:text-[27px] leading-none transition-colors duration-200 ${
                isNight ? 'text-[#F8FAFC]' : 'text-[#0F172A]'
              }`}
              style={{
                fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
                fontVariantNumeric: 'tabular-nums',
                fontFeatureSettings: '"tnum" 1, "zero" 1',
              }}
            >
              {/* Hours */}
              <span className="inline-block transition-transform duration-200 hover:scale-[1.01]">
                {timeData.hoursStr}
              </span>

              {/* Elegant Glowing Colon Dots */}
              <div
                className="flex flex-col justify-center items-center gap-[5px] mx-1 sm:mx-1.5"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shadow-[0_0_5px_rgba(236,72,153,0.5)] transition-transform duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shadow-[0_0_5px_rgba(236,72,153,0.5)] transition-transform duration-300" />
              </div>

              {/* Minutes with Subtle Transition */}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={timeData.minutesStr}
                  initial={{ opacity: 0.65, y: -1 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0.65, y: 1 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="inline-block"
                >
                  {timeData.minutesStr}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Separated Clean AM/PM Badge */}
            <span
              className={`text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[5px] border select-none transition-colors duration-200 shadow-2xs ${
                isNight
                  ? 'text-[#C084FC] bg-[#3B1963]/40 border-[#A855F7]/30'
                  : 'text-[#9333EA] bg-[#F5F3FF] border-[#DDD6FE]/80'
              }`}
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              }}
            >
              {timeData.ampm}
            </span>
          </div>

          {/* ================================================================= */}
          {/* SUBTLE VERTICAL DIVIDER                                           */}
          {/* ================================================================= */}
          <div
            className={`w-[1px] h-7 self-center transition-colors duration-200 ${
              isNight
                ? 'bg-gradient-to-b from-transparent via-[#8B5CF6]/30 to-transparent'
                : 'bg-gradient-to-b from-transparent via-[#E2E8F0] to-transparent'
            }`}
            aria-hidden="true"
          />

          {/* ================================================================= */}
          {/* RIGHT ZONE: [ SUN ICON ] / Weekdays (M T W T F S S)               */}
          {/* ================================================================= */}
          <div className="flex flex-col items-center justify-center gap-1">
            {/* Minimal Elegant Sun / Atmosphere Icon */}
            <div className="flex items-center justify-center">
              {timeState === 'evening' ? (
                <svg
                  className="w-3.5 h-3.5 text-[#F43F5E] drop-shadow-[0_0_4px_rgba(244,63,94,0.35)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17 18a5 5 0 0 0-10 0" />
                  <line x1="12" y1="9" x2="12" y2="2" />
                  <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                  <line x1="1" y1="18" x2="3" y2="18" />
                  <line x1="21" y1="18" x2="23" y2="18" />
                  <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                  <line x1="23" y1="22" x2="1" y2="22" />
                </svg>
              ) : timeState === 'morning' ? (
                <svg
                  className="w-3.5 h-3.5 text-[#F59E0B] drop-shadow-[0_0_4px_rgba(245,158,11,0.35)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2v6" />
                  <path d="M4.93 4.93l4.24 4.24" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="M19.07 4.93l-4.24 4.24" />
                  <path d="M16 18a4 4 0 0 0-8 0" />
                  <line x1="1" y1="22" x2="23" y2="22" />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5 text-[#EC4899] drop-shadow-[0_0_4px_rgba(236,72,153,0.35)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4.5" fill="currentColor" fillOpacity="0.2" />
                  <line x1="12" y1="2" x2="12" y2="4.5" />
                  <line x1="12" y1="19.5" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="4.5" y2="12" />
                  <line x1="19.5" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
                  <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
                  <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
                  <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
                </svg>
              )}
            </div>

            {/* Weekday Row: M T W T F S S with Active Day Highlight */}
            <div className="flex items-center gap-[4.5px] sm:gap-[5.5px]">
              {WEEKDAYS.map((day, idx) => {
                const isActive = idx === timeData.dayIndex;
                return (
                  <div
                    key={`${day}-${idx}`}
                    className="flex flex-col items-center justify-center"
                    title={DAY_NAMES[idx]}
                  >
                    <span
                      className={`text-[8.5px] sm:text-[9.5px] leading-none transition-all duration-200 ${
                        isActive
                          ? isNight
                            ? 'text-[#F472B6] font-bold scale-110 drop-shadow-[0_0_3px_rgba(244,114,182,0.5)]'
                            : 'text-[#EC4899] font-bold scale-110'
                          : isNight
                          ? 'text-[#64748B] font-medium'
                          : 'text-[#94A3B8] font-medium'
                      }`}
                      style={{
                        fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
                      }}
                    >
                      {day}
                    </span>

                    {/* Active Accent Dot */}
                    <span
                      className={`w-[3px] h-[3px] rounded-full mt-[2px] transition-all duration-200 ${
                        isActive
                          ? 'bg-[#EC4899] shadow-[0_0_4px_rgba(236,72,153,0.8)] opacity-100 scale-100'
                          : 'bg-transparent opacity-0 scale-50'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
