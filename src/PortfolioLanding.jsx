import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConnectedNetworkBackground from './components/ConnectedNetworkBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechIWorkWith from './components/TechIWorkWith';
import Achievements from './components/Achievements';
import ProjectsEntry from './components/ProjectsEntry';
import SkillsNetwork from './components/SkillsNetwork';
import GithubActivity from './components/GithubActivity';
import Contact from './components/Contact';
import Modals from './components/Modals';
import HeroTimeEnvironment from './components/HeroTimeEnvironment';
import CosmicScrollIndicator from './components/CosmicScrollIndicator';
import CosmicThemeSwitcher from './components/CosmicThemeSwitcher';
import { useTimeEnvironment } from './hooks/useTimeEnvironment';

gsap.registerPlugin(ScrollTrigger);

/**
 * Portfolio Landing Page — Arctic Aurora Engineering System
 * 
 * Aesthetic: High-End Creative Development Studio × Technical Software + IoT
 * Theme: Arctic Aurora (Clean light base #F4F7FC, Pure White #FFFFFF surfaces, Deep Navy #111827, Arctic Blue #2563EB, Lavender #8B5CF6 accents)
 * Signature System: The Aurora Network
 */
export default function PortfolioLanding() {
  const [activeModal, setActiveModal] = useState(null); // 'cv' | 'spec' | null
  const [selectedSpec, setSelectedSpec] = useState(null);
  const timeEnv = useTimeEnvironment();

  // 1. Lenis Smooth Scrolling Integration synced with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.24,
      wheelMultiplier: 1.3,
      touchMultiplier: 1.0,
      syncTouch: false,
      smoothWheel: true,
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  const handleExplore = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo('#work', { offset: -70 });
    } else {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const _handleOpenSpec = (systemSpec) => {
    setSelectedSpec(systemSpec);
    setActiveModal('spec');
  };

  const handleOpenCV = () => {
    window.open('/Rajat_Behera_Resume.pdf', '_blank', 'noopener,noreferrer');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedSpec(null);
  };

  return (
    <div
      data-theme={timeEnv.isNight ? 'night' : 'light'}
      className={`relative min-h-screen font-sans-editorial antialiased selection:bg-[#2563EB]/15 selection:text-[#2563EB] overflow-x-clip transition-colors duration-700 ${
        timeEnv.isNight ? 'bg-[#081426] text-[#F1F5FF]' : 'bg-[#EDF2F7] text-[#0F172A]'
      }`}
    >
      
      {/* 1. Global "The Aurora Network" Signature Atmosphere */}
      <ConnectedNetworkBackground isNight={timeEnv.isNight} />

      {/* Floating Top-Left Minimal Cosmic Theme Switcher */}
      <CosmicThemeSwitcher timeEnv={timeEnv} />

      {/* 2. Floating Premium Navigation Bar */}
      <Navbar
        isNight={timeEnv.isNight}
        onConnectClick={() => {
          if (window.__lenis) {
            window.__lenis.scrollTo('#contact', { offset: -70 });
          } else {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 3. Cosmic Shooting Star & Constellation Scroll Indicator */}
      <CosmicScrollIndicator />

      {/* 5. Complete Main Experience */}
      <main className="relative z-10 w-full overflow-x-clip">
        {/* Living Time Environment Container (Encloses Hero & About Me down through the 3 philosophy cards) */}
        <div
          data-theme={timeEnv.isNight ? 'night' : 'light'}
          className={`relative w-full overflow-hidden transition-colors duration-700 ${
            timeEnv.isNight ? 'bg-[#081426] text-[#F1F5FF]' : ''
          }`}
        >
          {/* Edge-to-edge seamless time atmosphere (100% viewport width, zero card borders) */}
          <HeroTimeEnvironment timeState={timeEnv.timeState} />

          {/* Section 1: Hero */}
          <Hero
            onExplore={handleExplore}
            onAbout={handleOpenCV}
            timeEnv={timeEnv}
          />

          {/* Section 2: About Me (including Train Journey) */}
          <About isNight={timeEnv.isNight} />

          {/* Soft atmospheric gradient transition at bottom of About leading into Tech section */}
          {timeEnv.isNight && (
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none bg-gradient-to-b from-transparent via-[#081426]/50 to-[#EDF2F7]"
            />
          )}
        </div>

        {/* Section 3: Tech I Work With — Technology Constellation (Clean Light Mode) */}
        <TechIWorkWith isNight={timeEnv.isNight} />

        {/* Section 4: Achievements — Milestones That Shape My Journey */}
        <Achievements isNight={timeEnv.isNight} />

        {/* Section 5: Projects Entry (Art-directed serif heading + Explore CTA) */}
        <ProjectsEntry />

        {/* Section 5: Architecture & Skills Network */}
        <SkillsNetwork />

        {/* Section 6: GitHub & Development Activity */}
        <GithubActivity isNight={timeEnv.isNight} />

        {/* Section 7: Contact & Call to Action */}
        <Contact onOpenCV={handleOpenCV} isNight={timeEnv.isNight} />
      </main>

      {/* 6. System Modals (Curriculum Vitae & Engineering Spec Sheets) */}
      <Modals
        activeModal={activeModal}
        onClose={handleCloseModal}
        systemSpec={selectedSpec}
      />

    </div>
  );
}
