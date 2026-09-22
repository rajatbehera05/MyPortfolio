import React from 'react';
import ConnectedNetworkBackground from './components/ConnectedNetworkBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

/**
 * Portfolio Landing Page — FIRST VIEWPORT
 * 
 * Identity:
 * - Rajat Behera
 * - Computer Science Engineer · CSE • IoT • AI
 * - "I build intelligent systems where software, models, and physical hardware converge."
 * 
 * Creative Direction:
 * - Apple Product Launch × High-End Engineering Laboratory
 * - Visual Centerpiece: The Convergence Engine
 */
export default function PortfolioLanding() {
  const handleExplore = () => {
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnect = () => {
    window.location.href = 'mailto:rajat.behera@example.com?subject=Engineering%20Inquiry%20via%20Portfolio';
  };

  return (
    <div className="relative min-h-screen bg-[#0A0D10] text-[#F4F7FA] font-sans-editorial antialiased selection:bg-[#16D9E8]/20 selection:text-[#16D9E8]">
      
      {/* 1. Atmospheric Deep Background with Calm Volumetric Illumination */}
      <ConnectedNetworkBackground />

      {/* 2. Minimal Editorial Navigation Bar */}
      <Navbar onConnectClick={handleConnect} />

      {/* 3. Hero Section (First Viewport Only) */}
      <main className="relative z-10 w-full">
        <Hero
          onExplore={handleExplore}
          onAbout={handleConnect}
        />
      </main>

    </div>
  );
}
