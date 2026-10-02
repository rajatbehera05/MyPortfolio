import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import ConnectedNetworkBackground from './components/ConnectedNetworkBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechIWorkWith from './components/TechIWorkWith';
import Projects from './components/Projects';
import SkillsNetwork from './components/SkillsNetwork';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Modals from './components/Modals';

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

  // 1. Lenis Smooth Scrolling Integration
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleExplore = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSpec = (systemSpec) => {
    setSelectedSpec(systemSpec);
    setActiveModal('spec');
  };

  const handleOpenCV = () => {
    setActiveModal('cv');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedSpec(null);
  };

  return (
    <div className="relative min-h-screen bg-[#F4F7FC] text-[#111827] font-sans-editorial antialiased selection:bg-[#2563EB]/15 selection:text-[#2563EB]">
      
      {/* 1. Global "The Aurora Network" Signature Atmosphere */}
      <ConnectedNetworkBackground />

      {/* 2. Floating Premium Navigation Bar */}
      <Navbar onConnectClick={() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 5. Complete Main Experience */}
      <main className="relative z-10 w-full">
        {/* Section 1: Hero */}
        <Hero
          onExplore={handleExplore}
          onAbout={handleOpenCV}
        />

        {/* Section 2: About Me */}
        <About />

        {/* Section 3: Tech I Work With — Technology Constellation */}
        <TechIWorkWith />

        {/* Section 4: Featured Projects */}
        <Projects onOpenSpec={handleOpenSpec} />

        {/* Section 5: Architecture & Skills Network */}
        <SkillsNetwork />

        {/* Section 6: Milestones / Journey */}
        <Timeline />

        {/* Section 7: Contact & Call to Action */}
        <Contact onOpenCV={handleOpenCV} />
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
