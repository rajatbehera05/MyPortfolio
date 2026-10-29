import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectedNetworkBackground from '../components/ConnectedNetworkBackground';
import Projects from '../components/Projects';
import Modals from '../components/Modals';
import LiquidButton from '../components/LiquidButton';

/**
 * ProjectsPage — Dedicated /projects page displaying the complete Featured Projects showcase.
 * 
 * Preserves:
 * - Real project showcase cards (ResQnet, Smart Parking Management System)
 * - Category filters (All Work, Web & Full-Stack, Connected IoT)
 * - Live previews, telemetry nodes, and screenshots
 * - Technology tags and architecture metrics
 * - GitHub links, Live Demo buttons, and Spec Sheet modal inspection
 */
export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'spec' | null
  const [selectedSpec, setSelectedSpec] = useState(null);

  // Scroll to top upon landing on /projects
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleOpenSpec = (systemSpec) => {
    setSelectedSpec(systemSpec);
    setActiveModal('spec');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedSpec(null);
  };

  return (
    <div className="relative min-h-screen bg-[#EDF2F7] text-[#0F172A] font-sans-editorial antialiased selection:bg-[#2563EB]/15 selection:text-[#2563EB]">
      {/* Aurora Ambient Atmosphere */}
      <ConnectedNetworkBackground />

      {/* Clean Floating Sticky Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto transition-all duration-300 w-full max-w-[1240px] mx-4 sm:mx-6 px-4 sm:px-6 h-14 sm:h-15 bg-white/90 backdrop-blur-xl border border-[#D5DFEB] shadow-[0_10px_32px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] rounded-2xl flex items-center justify-between">
          
          {/* Back to Home CTA */}
          <LiquidButton
            variant="secondary"
            size="sm"
            onClick={() => navigate('/')}
            aria-label="Back to Portfolio"
          >
            Back to Portfolio
          </LiquidButton>

          {/* Right Brand Monogram */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[12px] sm:text-[13px] font-mono font-bold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="tracking-wider">RAJAT BEHERA / PROJECTS</span>
          </button>
        </div>
      </header>

      {/* Main Content: Full Existing Projects Section */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-20">
        <Projects onOpenSpec={handleOpenSpec} />
      </main>

      {/* System Spec Sheet Modal */}
      <Modals
        activeModal={activeModal}
        onClose={handleCloseModal}
        systemSpec={selectedSpec}
      />
    </div>
  );
}
