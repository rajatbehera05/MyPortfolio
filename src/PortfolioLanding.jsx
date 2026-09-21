import React, { useState } from 'react';
import ConnectedNetworkBackground from './components/ConnectedNetworkBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SkillsNetwork from './components/SkillsNetwork';
import About from './components/About';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Modals from './components/Modals';

/**
 * Portfolio Landing Page — Living Connected System
 * 
 * Strict Constitution & Enhancement Guidelines:
 * - Approved visual foundation preserved
 * - Palette: Graphite (#0E1217) background, #141A21 secondary surfaces,
 *   #29323C borders, #F1F4F7 primary text, #16D9E8 electric cyan accent
 * - Living connected network with mouse reaction and sporadic data pulses
 * - Interactive Hero System Visual on right (RB / CORE)
 * - Coherent single-product identity throughout
 */
export default function PortfolioLanding() {
  const [activeModal, setActiveModal] = useState(null); // 'cv' | 'spec' | null
  const [selectedSpec, setSelectedSpec] = useState(null);
  
  // Theme state: default to 'light' (clean light background with dark accents)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleExplore = () => {
    const el = document.getElementById('systems');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSpec = (systemSpec) => {
    setSelectedSpec(systemSpec);
    setActiveModal('spec');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedSpec(null);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-system)] text-[var(--text-primary)] font-sans-system antialiased selection:bg-[var(--accent-cyan)]/20 selection:text-[var(--accent-cyan)] transition-colors duration-250">
      {/* 1. Living Connected Network Background (Canvas) */}
      <ConnectedNetworkBackground theme={theme} />

      {/* 2. Main Site Landmarks (Z-Index 10 above background) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation: RAJAT BEHERA | WORK ABOUT CONTACT + Theme Switcher */}
        <Navbar 
          onOpenCV={() => setActiveModal('cv')} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="flex-1 w-full">
          {/* Hero: Sequential entrance + HeroSystemVisual */}
          <Hero onExplore={handleExplore} theme={theme} />

          {/* Projects: SYSTEMS I HAVE BUILT + Signal flow on hover */}
          <Projects onOpenSpec={handleOpenSpec} />

          {/* Skills: TECHNOLOGY NETWORK */}
          <SkillsNetwork />

          {/* About: ABOUT / NODE_01 */}
          <About />

          {/* Timeline: Vertical connected single-line milestones */}
          <Timeline />

          {/* Contact: Direct System Interface */}
          <Contact onOpenCV={() => setActiveModal('cv')} />
        </main>
      </div>

      {/* 3. System Modals (CV Dossier & Engineering Spec Sheets) */}
      <Modals
        activeModal={activeModal}
        onClose={handleCloseModal}
        systemSpec={selectedSpec}
      />
    </div>
  );
}
