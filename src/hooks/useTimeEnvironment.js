import { useState, useEffect, useCallback } from 'react';

/**
 * Determine the portfolio time-of-day state according to the visitor's local browser time.
 * Supports exactly three states (NO NIGHT):
 * 
 * 🌅 MORNING: 12:00 AM – 11:59 AM (hours 0–11)  → "Good Morning"
 * ☀️ NOON:    12:00 PM – 4:59 PM  (hours 12–16) → "Good Afternoon"
 * 🌇 EVENING:  5:00 PM – 11:59 PM (hours 17–23) → "Good Evening"
 */
export function getTimeState(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 0 && hour < 12) {
    return 'morning';
  }
  if (hour >= 12 && hour < 17) {
    return 'noon';
  }
  if (hour >= 17 && hour < 24) {
    return 'evening';
  }
  return 'morning';
}

/**
 * Editorial Greeting corresponding to the time state
 */
export function getTimeGreeting(timeState) {
  switch (timeState) {
    case 'morning':
      return 'Good Morning';
    case 'noon':
    case 'afternoon':
      return 'Good Afternoon';
    case 'evening':
    default:
      return 'Good Evening';
  }
}

/**
 * Hook to manage the dynamic local time-based environment.
 * The environment updates automatically when the time state changes.
 * Cycles strictly between: morning, noon, evening.
 */
export function useTimeEnvironment() {
  const [currentTimeState, setCurrentTimeState] = useState(() => getTimeState());
  const [manualOverride, setManualOverride] = useState(null);

  useEffect(() => {
    const checkTime = () => {
      const detected = getTimeState();
      setCurrentTimeState((prev) => (prev !== detected ? detected : prev));
    };

    // Re-check periodically and on visibility/focus change so transitions happen seamlessly
    const timer = setInterval(checkTime, 10000);
    window.addEventListener('visibilitychange', checkTime);
    window.addEventListener('focus', checkTime);

    return () => {
      clearInterval(timer);
      window.removeEventListener('visibilitychange', checkTime);
      window.removeEventListener('focus', checkTime);
    };
  }, []);

  const activeState = manualOverride || currentTimeState;
  const greeting = getTimeGreeting(activeState);

  const cycleTimeState = useCallback(() => {
    const states = ['morning', 'noon', 'evening'];
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
