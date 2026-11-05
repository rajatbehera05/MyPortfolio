import { useState, useEffect, useCallback } from 'react';

/**
 * Available Celestial Themes in the Portfolio:
 * 1. Morning Dawn: Golden sunrise & fresh daylight
 * 2. Noon Daylight: Vibrant azure zenith sky
 * 3. Golden Evening: Amber sunset & twilight flock
 * 4. Midnight Cosmic: Deep midnight navy, crescent moon, stars & dark mode
 */
export const AVAILABLE_THEMES = [
  {
    id: 'morning',
    name: 'Morning Dawn',
    subtitle: 'Golden sunrise & fresh daylight',
    schedule: '05:00 – 11:59',
    greeting: 'Good Morning',
    accentColor: '#F59E0B',
    skyGradient: 'linear-gradient(135deg, #D4E8FC 0%, #FEF8ED 50%, #FED766 100%)',
    iconType: 'sunrise',
    isDark: false,
  },
  {
    id: 'noon',
    name: 'Noon Daylight',
    subtitle: 'Vibrant azure zenith sky',
    schedule: '12:00 – 16:59',
    greeting: 'Good Afternoon',
    accentColor: '#38BDF8',
    skyGradient: 'linear-gradient(135deg, #BAE6FD 0%, #EAF3FB 60%, #FACC15 100%)',
    iconType: 'sun',
    isDark: false,
  },
  {
    id: 'evening',
    name: 'Golden Evening',
    subtitle: 'Amber twilight & soaring flock',
    schedule: '17:00 – 21:59',
    greeting: 'Good Evening',
    accentColor: '#FB923C',
    skyGradient: 'linear-gradient(135deg, #B8CEF5 0%, #D8C7F0 35%, #FED7AA 100%)',
    iconType: 'sunset',
    isDark: false,
  },
  {
    id: 'night',
    name: 'Midnight Cosmic',
    subtitle: 'Midnight sky, crescent moon & dark mode',
    schedule: '22:00 – 04:59',
    greeting: 'Good Night',
    accentColor: '#818CF8',
    skyGradient: 'linear-gradient(135deg, #081426 0%, #0F1D38 50%, #162C52 100%)',
    iconType: 'moon',
    isDark: true,
  },
];

const THEME_STORAGE_KEY = 'rajat_portfolio_theme';

/**
 * Determine the portfolio time-of-day state according to the visitor's local browser time.
 * Supports: morning, noon, evening, and night.
 */
export function getTimeState(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 22 || hour < 5) {
    return 'night';
  }
  if (hour >= 5 && hour < 12) {
    return 'morning';
  }
  if (hour >= 12 && hour < 17) {
    return 'noon';
  }
  return 'evening';
}

/**
 * Editorial Greeting corresponding to the time state
 */
export function getTimeGreeting(timeState) {
  switch (timeState) {
    case 'night':
      return 'Good Night';
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
 * Reuses existing theme system tokens and localStorage persistence.
 */
export function useTimeEnvironment() {
  const [currentTimeState, setCurrentTimeState] = useState(() => getTimeState());
  const [manualOverride, setManualOverride] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && ['morning', 'noon', 'afternoon', 'evening', 'night'].includes(stored)) {
        return stored === 'afternoon' ? 'noon' : stored;
      }
    } catch {
      // LocalStorage error fallback
    }
    return null;
  });

  useEffect(() => {
    const checkTime = () => {
      const detected = getTimeState();
      setCurrentTimeState((prev) => (prev !== detected ? detected : prev));
    };

    const timer = setInterval(checkTime, 10000);
    window.addEventListener('visibilitychange', checkTime);
    window.addEventListener('focus', checkTime);

    return () => {
      clearInterval(timer);
      window.removeEventListener('visibilitychange', checkTime);
      window.removeEventListener('focus', checkTime);
    };
  }, []);

  const rawActive = manualOverride || currentTimeState;
  const activeState = rawActive === 'afternoon' ? 'noon' : rawActive;
  const isNight = activeState === 'night';
  const greeting = getTimeGreeting(activeState);

  // Sync document root data-theme attribute across the entire application
  useEffect(() => {
    try {
      const themeAttr = isNight ? 'night' : 'light';
      document.documentElement.setAttribute('data-theme', themeAttr);
    } catch {}
  }, [isNight]);

  const setTheme = useCallback((themeId) => {
    if (themeId === 'auto') {
      setManualOverride(null);
      try {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } catch {}
    } else {
      const normalized = themeId === 'afternoon' ? 'noon' : themeId;
      setManualOverride(normalized);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, normalized);
      } catch {}
    }
  }, []);

  const cycleTimeState = useCallback(() => {
    const states = ['morning', 'noon', 'evening', 'night'];
    const idx = states.indexOf(activeState);
    const next = states[(idx + 1) % states.length];
    setTheme(next);
  }, [activeState, setTheme]);

  const resetToRealTime = useCallback(() => {
    setTheme('auto');
  }, [setTheme]);

  return {
    timeState: activeState,
    isNight,
    greeting,
    isOverridden: manualOverride !== null,
    setTheme,
    cycleTimeState,
    resetToRealTime,
    availableThemes: AVAILABLE_THEMES,
  };
}
