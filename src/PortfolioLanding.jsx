import React, { useState, useEffect } from 'react';
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
 * Portfolio Landing Page — Complete System Architecture
 * 
 * Aesthetic: Apple Product Launch × High-End Engineering Laboratory
 * Theme: Obsidian Dark (#0A0D10) with Cyan (#16D9E8) and Electric Blue (#3B82F6) accents
 * Centerpiece: The Convergence Engine
 * Sections: Hero → Projects (Work) → Skills Network (Tech) → About → Timeline (Exploring) → Contact
 */
export default function PortfolioLanding() {
  const [activeModal, setActiveModal] = useState(null); // 'cv' | 'spec' | null
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="relative min-h-screen bg-[#0A0D10] text-[#F4F7FA] font-sans-editorial antialiased selection:bg-[#16D9E8]/20 selection:text-[#16D9E8]">
      
      {/* 1. Atmospheric Deep Background with Calm Volumetric Illumination */}
      <ConnectedNetworkBackground />

      {/* 2. Dynamic Interactive Ambient Cursor Spotlight Follower */}
      <div
        aria-hidden="true"
        className="fixed pointer-events-none z-1 transition-opacity duration-300 opacity-70 hidden md:block"
        style={{
          width: '640px',
          height: '640px',
          left: `${mousePos.x - 320}px`,
          top: `${mousePos.y - 320}px`,
          background: 'radial-gradient(circle, rgba(22, 217, 232, 0.035) 0%, rgba(59, 130, 246, 0.02) 45%, transparent 70%)',
        }}
      />

      {/* 3. Minimal Editorial Navigation Bar with Active Section Spy */}
      <Navbar onConnectClick={() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 4. Complete Main Experience */}
      <main className="relative z-10 w-full">
        {/* First Viewport: Hero with Convergence Engine */}
        <Hero
          onExplore={handleExplore}
          onAbout={handleOpenCV}
        />

        {/* Systems I Have Built: Interactive Multi-stage Topology & Sensor Ping */}
        <Projects onOpenSpec={handleOpenSpec} />

        {/* Technology Network: Connected Stacks & Field Verification Inspector */}
        <SkillsNetwork />

        {/* Identity & Core Architecture Specification */}
        <About />

        {/* Experience & Achievements: Continuous Traveling Light Trace */}
        <Timeline />

        {/* Contact & Transmission Interface */}
        <Contact onOpenCV={handleOpenCV} />
      </main>

      {/* 5. System Modals (Curriculum Vitae & Engineering Spec Sheets) */}
      <Modals
        activeModal={activeModal}
        onClose={handleCloseModal}
        systemSpec={selectedSpec}
      />

    </div>
  );
}
