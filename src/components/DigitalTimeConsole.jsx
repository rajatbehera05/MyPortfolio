import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Day names (Monday to Sunday)
 */
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
          {/* RIGHT ZONE: Day Name (e.g. Saturday)                              */}
          {/* ================================================================= */}
          <div className="flex items-center justify-center px-1">
            {/* Current Day Name */}
            <span
              className={`text-[14px] sm:text-[16px] font-bold tracking-tight leading-none transition-colors duration-200 ${
                isNight
                  ? 'text-[#F472B6] drop-shadow-[0_0_3px_rgba(244,114,182,0.4)]'
                  : 'text-[#EC4899]'
              }`}
              style={{
                fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              {timeData.dayName}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
