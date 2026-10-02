import { useState, useEffect, useCallback } from 'react';

/**
 * Determine the portfolio time-of-day state according to the visitor's local browser time.
 * Only Morning, Afternoon (Noon), and Evening environments are animated.
 * 
 * Schedule:
 * 05:00 – 11:59 → morning
 * 12:00 – 16:59 → afternoon
 * 17:00 – 04:59 → evening
 */
export function getTimeState(date = new Date()) {
  const hours = date.getHours();
  if (hours >= 5 && hours < 12) {
    return 'morning';
  }
  if (hours >= 12 && hours < 17) {
    return 'afternoon';
  }
  return 'evening';
}

/**
 * Editorial Greeting corresponding to the time state
 */
export function getTimeGreeting(timeState) {
  switch (timeState) {
    case 'morning':
      return 'Good Morning';
    case 'afternoon':
      return 'Good Afternoon';
    case 'evening':
    default:
      return 'Good Evening';
  }
}

/**
 * Hook to manage the dynamic local time-based environment.
 * Cycles strictly between morning, afternoon (noon), and evening.
 */
export function useTimeEnvironment() {
  const [currentTimeState, setCurrentTimeState] = useState(() => getTimeState());
  const [manualOverride, setManualOverride] = useState(null);

  useEffect(() => {
    const checkTime = () => {
      const detected = getTimeState();
      setCurrentTimeState((prev) => (prev !== detected ? detected : prev));
    };

    // Re-check every 30 seconds to catch boundaries seamlessly
    const timer = setInterval(checkTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const activeState = manualOverride || currentTimeState;
  const greeting = getTimeGreeting(activeState);

  const cycleTimeState = useCallback(() => {
    const states = ['morning', 'afternoon', 'evening'];
    const idx = states.indexOf(activeState);
    const next = states[(idx + 1) % states.length];
    setManualOverride(next);
  }, [activeState]);

  const resetToRealTime = useCallback(() => {
    setManualOverride(null);
  }, []);

  return {
    timeState: activeState,
    greeting,
    isOverridden: manualOverride !== null,
    cycleTimeState,
    resetToRealTime,
  };
}
