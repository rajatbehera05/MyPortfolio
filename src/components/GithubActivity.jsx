import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  Star,
  GitFork,
  Flame,
  Calendar,
  ExternalLink,
  Code2,
  FolderGit2,
  Activity,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import WireframeCube from './WireframeCube';
import realContributionsData from '../data/real_github_contributions.json';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

/**
 * Verified repositories data fallback
 * Ensures no broken state if GitHub API rate limit is exceeded
 */
const FALLBACK_REPOS = [
  {
    name: 'STERNKRAFT-Sociathon',
    description: 'ResQnet: IoT-enabled disaster response & emergency coordination platform. Real-time telemetry, mapping & alerts.',
    language: 'TypeScript',
    stars: 3,
    forks: 1,
    url: 'https://github.com/rajatbehera05/STERNKRAFT-Sociathon',
    topics: ['iot', 'react', 'emergency-response']
  },
  {
    name: 'Model',
    description: 'Smart Parking Management System with ESP32 microcontrollers, IR sensor telemetry and real-time dashboard.',
    language: 'C++',
    stars: 2,
    forks: 0,
    url: 'https://github.com/rajatbehera05/Model',
    topics: ['esp32', 'arduino', 'iot']
  },
  {
    name: 'TransitOps',
    description: 'Smart Transport Operations Platform: Full-stack logistics managing drivers, trips, and vehicle maintenance.',
    language: 'JavaScript',
    stars: 1,
    forks: 0,
    url: 'https://github.com/rajatbehera05/TransitOps',
    topics: ['nextjs', 'express', 'postgresql']
  },
  {
    name: 'DealOrbit',
    description: 'Sales operations platform focused on quotation-to-cash workflows and deal validation. Odoo Hackathon project.',
    language: 'Python',
    stars: 2,
    forks: 0,
    url: 'https://github.com/rajatbehera05/DealOrbit',
    topics: ['odoo', 'database', 'hackathon']
  },
  {
    name: 'FleetFlow',
    description: 'Fleet and logistics management system designed for vehicle availability tracking and dispatch workflows.',
    language: 'JavaScript',
    stars: 1,
    forks: 0,
    url: 'https://github.com/rajatbehera05/FleetFlow',
    topics: ['logistics', 'rest-api']
  },
  {
    name: 'Java-DSA-Practice',
    description: 'Solutions to algorithmic problems, time-complexity analysis, data structures, and placement preparations.',
    language: 'Java',
    stars: 1,
    forks: 0,
    url: 'https://github.com/rajatbehera05',
    topics: ['dsa', 'algorithms', 'java']
  }
];

// Language badge color palette
const LANGUAGE_COLORS = {
  JavaScript: { dot: '#F7DF1E', text: '#854D0E', bg: '#FEF9C3', border: '#FEF08A' },
  TypeScript: { dot: '#3178C6', text: '#1E40AF', bg: '#DBEAFE', border: '#BFDBFE' },
  Python: { dot: '#38BDF8', text: '#0369A1', bg: '#E0F2FE', border: '#BAE6FD' },
  Java: { dot: '#EA2D2E', text: '#991B1B', bg: '#FEE2E2', border: '#FECACA' },
  'C++': { dot: '#8B5CF6', text: '#5B21B6', bg: '#EDE9FE', border: '#DDD6FE' },
  HTML: { dot: '#F97316', text: '#9A3412', bg: '#FFEDD5', border: '#FED7AA' },
  Default: { dot: '#2563EB', text: '#1E40AF', bg: '#EFF6FF', border: '#DBEAFE' },
};

function GithubActivity({ isNight = false }) {
  const [profile, setProfile] = useState({
    login: 'rajatbehera05',
    name: 'Rajat Behera',
    bio: 'CSE | Software · IoT · Embedded Systems · AI/ML | Building practical systems',
    location: 'India',
    public_repos: 24,
    followers: 6,
    following: 2,
    avatar_url: '/assets/rajat_github_avatar.jpg',
    html_url: 'https://github.com/rajatbehera05'
  });

  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');

  // Load real verified GitHub contribution calendar with live daily synchronization
  const [calendarData, setCalendarData] = useState(() => {
    try {
      const cached = localStorage.getItem('rajat_github_contributions_v3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.weeks) && parsed.weeks.length > 0) {
          return parsed;
        }
      }
    } catch (_) {}
    return realContributionsData && realContributionsData.weeks
      ? realContributionsData
      : { totalContributions: 217, weeks: [] };
  });

  // Fetch live GitHub User details, repositories, and daily contribution matrix with automatic caching
  useEffect(() => {
    let isMounted = true;
    const CACHE_KEY = 'rajat_github_activity_v2';
    const CACHE_TIME_KEY = 'rajat_github_activity_time_v2';
    const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

    const CAL_CACHE_KEY = 'rajat_github_contributions_v3';
    const CAL_TIME_KEY = 'rajat_github_contributions_time_v3';
    const CAL_EXPIRY = 30 * 60 * 1000; // 30 minutes cache for fresh daily cadence

    const loadData = async () => {
      // 1. Check local cache for profile & repos
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
        if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_EXPIRY) {
          const parsed = JSON.parse(cached);
          if (parsed.profile) setProfile((prev) => ({ ...prev, ...parsed.profile }));
          if (parsed.repos && parsed.repos.length > 0) setRepos(parsed.repos);
        }
      } catch (_) {}

      // 2. Fetch User Profile & Repositories from GitHub
      try {
        const userRes = await fetch('https://api.github.com/users/rajatbehera05');
        let fetchedUser = null;
        if (userRes.ok) {
          const userData = await userRes.json();
          if (isMounted && userData && userData.login) {
            fetchedUser = userData;
            setProfile((prev) => ({
              ...prev,
              login: userData.login,
              name: userData.name || prev.name,
              bio: userData.bio || prev.bio,
              location: userData.location || prev.location,
              public_repos: userData.public_repos ?? prev.public_repos,
              followers: userData.followers ?? prev.followers,
              following: userData.following ?? prev.following,
              avatar_url: userData.avatar_url || prev.avatar_url,
              html_url: userData.html_url || prev.html_url,
            }));
          }
        }

        const reposRes = await fetch('https://api.github.com/users/rajatbehera05/repos?sort=updated&per_page=8');
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (isMounted && Array.isArray(reposData) && reposData.length > 0) {
            const formatted = reposData.map((r) => ({
              name: r.name,
              description: r.description || 'Public development repository.',
              language: r.language || 'Code',
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              url: r.html_url,
              topics: r.topics || []
            }));
            setRepos(formatted.slice(0, 6));

            try {
              localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                  profile: fetchedUser,
                  repos: formatted.slice(0, 6)
                })
              );
              localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
            } catch (_) {}
          }
        }
      } catch (err) {
        console.warn('GitHub API profile notice:', err);
      }

      // 3. Check local cache for contribution calendar
      let shouldFetchCalendar = true;
      try {
        const calCached = localStorage.getItem(CAL_CACHE_KEY);
        const calCachedTime = localStorage.getItem(CAL_TIME_KEY);
        if (calCached && calCachedTime && Date.now() - parseInt(calCachedTime, 10) < CAL_EXPIRY) {
          const parsedCal = JSON.parse(calCached);
          if (parsedCal && Array.isArray(parsedCal.weeks) && parsedCal.weeks.length > 0) {
            if (isMounted) setCalendarData(parsedCal);
            shouldFetchCalendar = false;
          }
        }
      } catch (_) {}

      // 4. Fetch live GitHub daily contributions (auto-updates every day)
      if (shouldFetchCalendar) {
        try {
          const calRes = await fetch('https://github-contributions-api.jogruber.de/v4/rajatbehera05?y=last');
          if (calRes.ok) {
            const calJson = await calRes.json();
            if (calJson && Array.isArray(calJson.contributions) && calJson.contributions.length > 0) {
              const weeks = [];
              let currentWeekDays = [];
              let weekIndex = 0;

              for (let i = 0; i < calJson.contributions.length; i++) {
                const item = calJson.contributions[i];
                const d = new Date(item.date);
                const dayOfWeek = d.getUTCDay();

                currentWeekDays.push({
                  date: item.date,
                  day: dayOfWeek,
                  count: item.count,
                  level: item.level
                });

                if (currentWeekDays.length === 7 || i === calJson.contributions.length - 1) {
                  weeks.push({
                    week: weekIndex++,
                    days: currentWeekDays
                  });
                  currentWeekDays = [];
                }
              }

              const calculatedTotal =
                calJson.total?.lastYear ??
                calJson.contributions.reduce((acc, c) => acc + (c.count || 0), 0);

              const updatedCalendar = {
                totalContributions: calculatedTotal,
                totalDays: calJson.contributions.length,
                weeks
              };

              if (isMounted) {
                setCalendarData(updatedCalendar);
              }

              try {
                localStorage.setItem(CAL_CACHE_KEY, JSON.stringify(updatedCalendar));
                localStorage.setItem(CAL_TIME_KEY, Date.now().toString());
              } catch (_) {}
            }
          }
        } catch (calErr) {
          // Secondary fallback: query official GitHub events API for commits pushed today
          try {
            const eventsRes = await fetch('https://api.github.com/users/rajatbehera05/events?per_page=30');
            if (eventsRes.ok) {
              const events = await eventsRes.json();
              if (Array.isArray(events) && isMounted) {
                const todayStr = new Date().toISOString().split('T')[0];
                const todayPushes = events.filter(
                  (ev) => ev.type === 'PushEvent' && ev.created_at && ev.created_at.startsWith(todayStr)
                );
                const todayCommitsCount = todayPushes.reduce(
                  (acc, ev) => acc + (ev.payload?.commits?.length || 1),
                  0
                );

                if (todayCommitsCount > 0) {
                  setCalendarData((prev) => {
                    if (!prev || !prev.weeks || prev.weeks.length === 0) return prev;
                    const newWeeks = JSON.parse(JSON.stringify(prev.weeks));
                    const lastWeek = newWeeks[newWeeks.length - 1];
                    const todayCell = lastWeek.days.find((d) => d.date === todayStr);
                    if (todayCell && todayCell.count < todayCommitsCount) {
                      const diff = todayCommitsCount - todayCell.count;
                      todayCell.count = todayCommitsCount;
                      todayCell.level = Math.min(4, Math.max(1, Math.ceil(todayCommitsCount / 3)));
                      return {
                        ...prev,
                        totalContributions: (prev.totalContributions || 0) + diff,
                        weeks: newWeeks
                      };
                    }
                    return prev;
                  });
                }
              }
            }
          } catch (_) {}
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered repositories by language pill
  const filteredRepos = useMemo(() => {
    if (selectedLanguage === 'ALL') return repos;
    return repos.filter((r) => r.language === selectedLanguage);
  }, [repos, selectedLanguage]);

  // Distinct languages for filters
  const languagesList = useMemo(() => {
    const set = new Set(repos.map((r) => r.language).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [repos]);

  // Heatmap level colors: Twinkling Golden starfield in Night Mode, Arctic Blue in Day Mode
  const getCellColor = (level) => {
    if (isNight) {
      switch (level) {
        case 1:
          return 'bg-[#78350F] border border-amber-600/80 hover:bg-[#92400E] animate-golden-twinkle';
        case 2:
          return 'bg-[#B45309] border border-amber-500 hover:bg-[#D97706] animate-golden-twinkle';
        case 3:
          return 'bg-[#D97706] border border-amber-300 hover:bg-[#F59E0B] animate-golden-twinkle';
        case 4:
          return 'bg-[#F59E0B] border border-yellow-200 hover:bg-[#FBBF24] animate-golden-twinkle';
        default:
          return 'bg-[#0c1626] hover:bg-[#15253e] border border-[#1e2d48]';
      }
    }

    switch (level) {
      case 1:
        return 'bg-[#BFDBFE] hover:bg-[#93C5FD]'; // Soft Arctic Blue
      case 2:
        return 'bg-[#60A5FA] hover:bg-[#3B82F6]'; // Electric Blue
      case 3:
        return 'bg-[#2563EB] hover:bg-[#1D4ED8]'; // Cobalt Brand
      case 4:
        return 'bg-[#7C3AED] hover:bg-[#6D28D9] shadow-[0_0_8px_rgba(124,58,237,0.45)]'; // Deep Lavender / Aurora
      default:
        return 'bg-[#E2E8F0]/70 hover:bg-[#CBD5E1]'; // Neutral light base
    }
  };

  return (
    <section
      id="github-activity"
      aria-label="GitHub & Development Activity"
      className="w-full relative z-10 py-16 sm:py-24 border-t border-[#D5DFEB]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-12">
        {/* Section Header with Real Profile Identity Card */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="space-y-2.5"
          >
            <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#2563EB] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>Telemetry</span>
              <span className="text-[#CBD5E1]">•</span>
              <span className="text-[#64748B]">Continuous Delivery · Daily Live Sync</span>
            </div>

            <div className="flex items-center gap-3">
              <WireframeCube
                size={34}
                color="#2563EB"
                tiltX={20}
                tiltZ={-10}
                duration={18}
                divisions={3}
                floating={false}
                className="shrink-0"
              />
              <h2 className="font-editorial-serif text-[32px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-normal sm:font-medium tracking-tight text-[#0F172A] leading-tight">
                Development Activity
              </h2>
            </div>

            <p className="text-[14px] sm:text-[15.5px] text-[#4B5563] max-w-xl leading-relaxed">
              Real-time synchronization with GitHub repositories, open-source commits, and daily engineering cadence.
            </p>
          </motion.div>

          {/* Real GitHub Profile Identity Card */}
          <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-2 sm:p-2.5 pr-4.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D5DFEB] shadow-xs hover:border-[#2563EB]/50 hover:shadow-[0_12px_28px_rgba(37,99,235,0.09)] transition-all duration-200 self-start md:self-auto group cursor-pointer"
          >
            {/* Real Avatar Photo with Online Status Beacon */}
            <div className="relative shrink-0">
              <img
                src={profile.avatar_url || '/assets/rajat_github_avatar.jpg'}
                alt={profile.name || 'Rajat Behera'}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-[#D5DFEB] group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://avatars.githubusercontent.com/u/225657425?v=4';
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981] border-2 border-white" />
              </span>
            </div>

            {/* Profile Info */}
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[13.5px] sm:text-[14px] font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-tight truncate">
                  {profile.name || 'Rajat Behera'}
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-[9px] font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <div className="text-[11.5px] text-[#64748B] font-mono leading-tight mt-0.5 flex items-center gap-1">
                <span>@{profile.login}</span>
                <span className="text-[#CBD5E1]">•</span>
                <span className="text-[#3B82F6] flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5 inline" /> {profile.location || 'India'}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-[#2563EB] group-hover:underline flex items-center gap-1 mt-1">
                <span>View GitHub Profile</span>
                <ExternalLink className="w-3 h-3 text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </motion.a>
        </div>

        {/* 1. TOP METRICS DASHBOARD (4 Cards with Real Data) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
          {/* Metric 1: Public Repos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5DFEB] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex items-center justify-between text-[#64748B] mb-2">
              <span className="text-[12px] font-semibold uppercase tracking-wider">Repositories</span>
              <FolderGit2 className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-mono-tech tracking-tight">
              {profile.public_repos}
            </div>
            <div className="text-[11.5px] text-[#64748B] mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>Public Architecture Repos</span>
            </div>
          </motion.div>

          {/* Metric 2: Real Verified Annual Commits */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5DFEB] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex items-center justify-between text-[#64748B] mb-2">
              <span className="text-[12px] font-semibold uppercase tracking-wider">Contributions</span>
              <Flame className="w-4 h-4 text-[#F97316]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-mono-tech tracking-tight">
              {calendarData.totalContributions || 217}
            </div>
            <div className="text-[11.5px] text-[#64748B] mt-1 flex items-center gap-1">
              <span className="text-[#F97316] font-semibold">Verified</span>
              <span className="text-[#CBD5E1]">•</span>
              <span>Past 12 Months</span>
            </div>
          </motion.div>

          {/* Metric 3: Followers & Network */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5DFEB] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex items-center justify-between text-[#64748B] mb-2">
              <span className="text-[12px] font-semibold uppercase tracking-wider">Followers</span>
              <Activity className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-mono-tech tracking-tight">
              {profile.followers}
            </div>
            <div className="text-[11.5px] text-[#64748B] mt-1 flex items-center gap-1">
              <span>Developer community</span>
            </div>
          </motion.div>

          {/* Metric 4: Primary Domains */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5DFEB] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex items-center justify-between text-[#64748B] mb-2">
              <span className="text-[12px] font-semibold uppercase tracking-wider">Primary Stack</span>
              <Code2 className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#0F172A] truncate">
              Full-Stack &amp; IoT
            </div>
            <div className="text-[11.5px] text-[#2563EB] font-medium mt-1">
              React · Node · ESP32 · SQL
            </div>
          </motion.div>
        </div>

        {/* 2. REAL CONTRIBUTION HEATMAP DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className={`p-5 sm:p-7 rounded-3xl border mb-8 overflow-hidden transition-all duration-300 ${
            isNight
              ? 'bg-[#0B1528]/95 border-amber-500/25 shadow-[0_0_35px_rgba(245,158,11,0.06),0_10px_35px_rgba(0,0,0,0.5)]'
              : 'bg-white border-[#D5DFEB] shadow-xs'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                isNight
                  ? 'bg-amber-500/15 text-[#FBBF24] border-amber-500/35 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                  : 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]'
              }`}>
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-[15px] sm:text-[16px] text-[#0F172A] flex items-center gap-2">
                  <span>Commit Cadence &amp; Engineering Rhythm</span>
                  {isNight && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30">
                      ✦ Twinkling Gold
                    </span>
                  )}
                </h3>
                <p className="text-[12px] text-[#64748B] flex items-center gap-1.5 flex-wrap">
                  <span>Verified GitHub activity over the past 52 weeks ({calendarData.totalContributions || 217} contributions)</span>
                  <span className="text-[#CBD5E1]">•</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Auto-updating daily
                  </span>
                </p>
              </div>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center gap-2 text-[11.5px] text-[#64748B] self-start sm:self-auto font-mono">
              <span>Less</span>
              <div className="flex items-center gap-1">
                {isNight ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#0c1626] border border-[#1e2d48]" title="0 commits" />
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#78350F] border border-amber-600/80 animate-golden-twinkle" title="1-3 commits" />
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#B45309] border border-amber-500 animate-golden-twinkle" title="4-6 commits" />
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#D97706] border border-amber-300 animate-golden-twinkle" title="7-9 commits" />
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#F59E0B] border border-yellow-200 animate-golden-twinkle" title="10+ commits" />
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#E2E8F0]" />
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#BFDBFE]" />
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#60A5FA]" />
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#2563EB]" />
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#7C3AED]" />
                  </>
                )}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Interactive Heatmap Matrix */}
          <div className="pt-5 overflow-x-auto custom-scrollbar pb-2 overscroll-x-contain touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="min-w-[700px]">
              {/* Grid with 53 Columns x 7 Rows */}
              <div className="flex gap-[3.5px]">
                {calendarData.weeks.map((week, weekIdx) => (
                  <div key={`week-${week.week}`} className="flex flex-col gap-[3.5px]">
                    {week.days.map((d, dayIdx) => {
                      const isTwinkling = isNight && d.level > 0;
                      const twinkleDelay = isTwinkling ? `${((weekIdx * 3 + dayIdx * 7) % 23) * 0.18}s` : undefined;
                      const twinkleDuration = isTwinkling ? `${2.4 + ((weekIdx + dayIdx) % 5) * 0.4}s` : undefined;

                      return (
                        <div
                          key={`day-${d.date}`}
                          onMouseEnter={() => setHoveredCell(d)}
                          onMouseLeave={() => setHoveredCell(null)}
                          style={
                            isTwinkling
                              ? {
                                  animationDelay: twinkleDelay,
                                  animationDuration: twinkleDuration,
                                }
                              : undefined
                          }
                          className={`w-[10px] h-[10px] rounded-xs cursor-pointer transition-all duration-150 ${getCellColor(
                            d.level
                          )}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Heatmap Tooltip info row */}
              <div className="h-6 mt-3 flex items-center text-[12px] text-[#475569] font-mono">
                {hoveredCell ? (
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border ${
                    isNight
                      ? 'bg-[#112038] border-amber-400/40 text-amber-100 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#0F172A]'
                  }`}>
                    <span className={`font-bold ${isNight ? 'text-amber-300' : 'text-[#0F172A]'}`}>
                      {hoveredCell.count === 0 ? 'No contributions' : `${hoveredCell.count} contribution${hoveredCell.count > 1 ? 's' : ''}`}
                    </span>
                    <span>on {hoveredCell.date}</span>
                  </span>
                ) : (
                  <span className={isNight ? 'text-amber-300/60' : 'text-[#94A3B8]'}>
                    Hover over any day cell to inspect commits
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. REPOSITORIES SHOWCASE SECTION */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#2563EB]" />
              <h3 className="font-bold text-[17px] text-[#0F172A] font-sans-editorial">
                Featured Public Repositories
              </h3>
            </div>

            {/* Language Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white border border-[#D5DFEB] text-[11.5px] self-start sm:self-auto shadow-2xs">
              {languagesList.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-[#2563EB] text-white font-semibold shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {lang === 'ALL' ? 'All Stacks' : lang}
                </button>
              ))}
            </div>
          </div>

          {/* Repositories 2x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo, idx) => {
                const langColor = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Default;

                return (
                  <motion.a
                    layout
                    key={repo.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-white border border-[#D5DFEB] hover:border-[#2563EB]/50 hover:shadow-[0_12px_32px_rgba(37,99,235,0.08)] transition-all duration-300 flex flex-col justify-between group cursor-pointer text-inherit no-underline shadow-xs hover:-translate-y-0.5"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <FolderGit2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                          <h4 className="font-bold text-[14.5px] text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate">
                            {repo.name}
                          </h4>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#2563EB] transition-colors shrink-0" />
                      </div>

                      <p className="text-[12.5px] text-[#4B5563] line-clamp-2 leading-relaxed">
                        {repo.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11.5px]">
                      {/* Language pill */}
                      <div className="flex items-center gap-1.5 font-medium">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: langColor.dot }}
                        />
                        <span className="text-[#334155]">{repo.language}</span>
                      </div>

                      {/* Stars & Forks */}
                      <div className="flex items-center gap-3 text-[#64748B] font-mono-tech">
                        <span className="flex items-center gap-1 hover:text-[#0F172A]">
                          <Star className="w-3.5 h-3.5" />
                          <span>{repo.stars}</span>
                        </span>
                        <span className="flex items-center gap-1 hover:text-[#0F172A]">
                          <GitFork className="w-3.5 h-3.5" />
                          <span>{repo.forks}</span>
                        </span>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

export default React.memo(GithubActivity);
