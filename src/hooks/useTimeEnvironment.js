import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Available Celestial Themes in the Portfolio:
 * 1. Morning Dawn: Golden sunrise & fresh daylight (05:00 – 11:59)
 * 2. Noon Daylight: Vibrant azure zenith sky (12:00 – 16:59)
 * 3. Golden Evening: Amber sunset & twilight flock (17:00 – 21:59)
 * 4. Midnight Cosmic: Deep midnight navy, crescent moon, stars & dark mode (22:00 – 04:59)
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
    greeting: 'Good Evening',
    accentColor: '#818CF8',
    skyGradient: 'linear-gradient(135deg, #081426 0%, #0F1D38 50%, #162C52 100%)',
    iconType: 'moon',
    isDark: true,
  },
];

const THEME_STORAGE_KEY = 'rajat_portfolio_theme';
const THEME_MODE_STORAGE_KEY = 'rajat_portfolio_theme_mode';

/**
 * Determine the automatic portfolio theme according to the visitor's actual local time.
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
 * Dynamic greeting derived strictly from the visitor's local device time:
 * - 5:00 AM – 11:59 AM: Good Morning
 * - 12:00 PM – 4:59 PM: Good Afternoon
 * - 5:00 PM – 4:59 AM: Good Evening
 * (Never displays "Good Night")
 */
export function getLocalDeviceGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  }
  if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  }
  return 'Good Evening';
}

/**
 * Editorial Greeting helper for legacy callers
 */
export function getTimeGreeting(timeState) {
  switch (timeState) {
    case 'morning':
      return 'Good Morning';
    case 'noon':
    case 'afternoon':
      return 'Good Afternoon';
    case 'evening':
    case 'night':
    default:
      return 'Good Evening';
  }
}

/**
 * Primary Hook to manage the decoupled time, greeting, and theme environment.
 *
 * Separates completely:
 * 1. currentTime: Actual visitor local device time (never altered by theme switching)
 * 2. greeting: Strictly derived from currentTime (never altered by theme switching)
 * 3. themeMode: 'auto' | 'manual'
 * 4. selectedTheme: The visual theme applied (derived from currentTime in 'auto', or manual selection)
 */
export function useTimeEnvironment() {
  // 1. REAL-TIME CLOCK: strictly tracks the visitor's actual local device time
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // 2. THEME MODE: Always defaults to 'auto' so every visit automatically matches visitor's local time timestamp
  const [themeMode, setThemeMode] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        // Clear any lingering localStorage overrides so any new visit uses actual timestamp
        localStorage.removeItem(THEME_STORAGE_KEY);
        localStorage.removeItem(THEME_MODE_STORAGE_KEY);

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('theme')) return 'manual';
      }
    } catch {
      // LocalStorage error fallback
    }
    return 'auto';
  });

  // 3. MANUAL THEME OVERRIDE (only active if visitor manually selects a theme in current session)
  const [manualTheme, setManualTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlTheme = urlParams.get('theme');
        if (urlTheme && ['morning', 'noon', 'afternoon', 'evening', 'night'].includes(urlTheme)) {
          return urlTheme === 'afternoon' ? 'noon' : urlTheme;
        }
      }
    } catch {
      // LocalStorage error fallback
    }
    return null;
  });

  // Clock syncs on minute boundary, tab visibility change or focus (avoids 1-second full-page re-renders)
  useEffect(() => {
    let lastMinute = new Date().getMinutes();
    const updateClock = () => {
      const now = new Date();
      if (now.getMinutes() !== lastMinute) {
        lastMinute = now.getMinutes();
        setCurrentTime(now);
      }
    };

    const interval = setInterval(updateClock, 5000);
    window.addEventListener('visibilitychange', updateClock);
    window.addEventListener('focus', updateClock);

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', updateClock);
      window.removeEventListener('focus', updateClock);
    };
  }, []);

  // 4. GREETING: derived strictly and exclusively from actual local device time
  const greeting = useMemo(() => getLocalDeviceGreeting(currentTime), [currentTime]);

  // 5. AUTOMATIC THEME: calculated from current local time
  const autoTheme = useMemo(() => getTimeState(currentTime), [currentTime]);

  // 6. APPLIED VISUAL THEME: in 'auto' mode uses autoTheme; in 'manual' uses manualTheme
  const rawActive = themeMode === 'manual' && manualTheme ? manualTheme : autoTheme;
  const activeState = rawActive === 'afternoon' ? 'noon' : rawActive;
  const isNight = activeState === 'night';
  const isOverridden = themeMode === 'manual' && manualTheme !== null;

  // Sync document root data-theme attribute across the entire application
  useEffect(() => {
    try {
      const themeAttr = isNight ? 'night' : 'light';
      document.documentElement.setAttribute('data-theme', themeAttr);
    } catch {}
  }, [isNight]);

  // Set theme handler: In-session exploration (revisiting website resets automatically to time-based theme)
  const setTheme = useCallback((themeId) => {
    if (themeId === 'auto') {
      setThemeMode('auto');
      setManualTheme(null);
    } else {
      const normalized = themeId === 'afternoon' ? 'noon' : themeId;
      setThemeMode('manual');
      setManualTheme(normalized);
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
    currentTime,
    greeting,
    themeMode,
    selectedTheme: activeState,
    timeState: activeState, // Backward compatibility alias
    isNight,
    isOverridden,
    setTheme,
    cycleTimeState,
    resetToRealTime,
    availableThemes: AVAILABLE_THEMES,
  };
}
