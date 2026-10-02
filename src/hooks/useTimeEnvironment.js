import { useState, useEffect, useCallback } from 'react';

/**
 * Determine the portfolio time-of-day state according to the visitor's local browser time.
 * Supports the 3 daytime environments: Morning, Afternoon, and Evening.
 * 
 * Schedule:
 * 00:00 – 11:59 (12:00 AM – 11:59 AM) → morning ("Good Morning")
 * 12:00 – 16:59 (12:00 PM – 04:59 PM) → afternoon ("Good Afternoon")
 * 17:00 – 23:59 (05:00 PM – 11:59 PM) → evening ("Good Evening")
 */
export function getTimeState(date = new Date()) {
  const hours = date.getHours();
  if (hours < 12) {
    return 'morning';
  }
  if (hours < 17) {
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
 * Cycles strictly between the three environments: morning, afternoon, and evening.
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
    isNight: false,
    greeting,
    isOverridden: manualOverride !== null,
    cycleTimeState,
    resetToRealTime,
  };
}
