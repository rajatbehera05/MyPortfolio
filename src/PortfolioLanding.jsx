import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

/**
 * Portfolio Landing Page — PHASE 1: FIRST VIEWPORT ONLY
 * 
 * Core Identity:
 * - Rajat Behera
 * - Computer Science Engineer · IoT · AI
 * - "I build intelligent systems that connect software, data and the physical world."
 * - "Software engineering, connected systems, embedded technology and emerging AI."
 * 
 * Visual Direction:
 * - LIGHT + FUTURISTIC + PREMIUM + ENGINEERING
 * - Background: #F7F9FC
 * - Primary text: #111827
 * - Secondary text: #667085
 * - Primary blue: #146BFF
 * - Secondary blue: #4DA3FF
 * - Borders: #DCE5F0
 * - Refined Apple/Microsoft-grade engineering product presentation
 */
export default function PortfolioLanding() {
  const handleExplore = () => {
    // Phase 1: placeholder action for CTA exploration
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAbout = () => {
    // Phase 1: placeholder action for About CTA
    window.location.href = 'mailto:rajat.behera@example.com?subject=Inquiry%20from%20Portfolio';
  };

  return (
    <div className="relative min-h-screen bg-[#F7F9FC] text-[#111827] font-sans-main antialiased selection:bg-[#146BFF]/15 selection:text-[#146BFF]">
      
      {/* 1. Minimal Professional Navigation Bar */}
      <Navbar onConnectClick={handleAbout} />

      {/* 2. Hero Section (First Viewport Only) */}
      <main className="w-full">
        <Hero
          onExplore={handleExplore}
          onAbout={handleAbout}
        />
      </main>

    </div>
  );
}
