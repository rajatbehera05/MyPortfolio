import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, FileText, Mail, Camera } from 'lucide-react';

/**
 * Developer Profile Photo
 * When null, the sophisticated Arctic Aurora identity frame is displayed.
 */
const PROFILE_IMAGE_URL = null;

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/**
 * Hero Section — Arctic Aurora Interactive Edition
 */
export default function Hero({ onExplore, onAbout, mousePos = { x: 0, y: 0 } }) {
  const cardRef = useRef(null);
  
  // 3D Tilt springs for profile card (Subtle: max 2-3 degrees)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-150, 150], [2.5, -2.5]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-2.5, 2.5]), { stiffness: 220, damping: 24 });

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleCardMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Subtle background technical lines mouse shift
  const bgShiftX = (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth || 1 : 1) - 0.5) * 16;
  const bgShiftY = (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight || 1 : 1) - 0.5) * 16;

  return (
    <section
      id="home"
      aria-label="Rajat Behera Software Portfolio"
      className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 px-6 sm:px-12 overflow-hidden"
    >
      {/* Interactive Faint Technical Lines reacting subtly to mouse */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40"
        animate={{ x: bgShiftX, y: bgShiftY }}
        transition={{ type: 'spring', damping: 40, stiffness: 180 }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20%" cy="30%" r="3" fill="#2563EB" opacity="0.3" />
          <circle cx="80%" cy="20%" r="4" fill="#8B5CF6" opacity="0.25" />
          <circle cx="75%" cy="75%" r="3" fill="#2563EB" opacity="0.2" />
          <line x1="20%" y1="30%" x2="35%" y2="50%" stroke="#2563EB" strokeWidth="0.75" strokeDasharray="4 8" opacity="0.2" />
          <line x1="75%" y1="75%" x2="80%" y2="20%" stroke="#8B5CF6" strokeWidth="0.75" strokeDasharray="6 12" opacity="0.15" />
        </svg>
      </motion.div>

      <div className="relative z-10 w-full max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline & Editorial Presentation */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 z-20">
            
            {/* 1. Availability Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#E8F1FF]/80 text-[#2563EB] text-[12px] font-semibold tracking-wide w-fit shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span>Available for Software Engineering Internships · Summer 2026</span>
            </motion.div>

            {/* 2. Headline with selected Arctic Blue gradient accents */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.25 }}
                className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#111827] font-sans-editorial leading-[1.12]"
              >
                Building{' '}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  fast web apps
                </span>
                , scalable backends &amp;{' '}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#4338CA] bg-clip-text text-transparent">
                  connected systems.
                </span>
              </motion.h1>

              {/* 3. Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.45 }}
                className="text-[16px] sm:text-[17.5px] text-[#4B5563] leading-relaxed max-w-xl font-normal"
              >
                Hi, I'm <strong className="text-[#111827] font-semibold">Rajat Behera</strong>. I'm a Computer Science &amp; Engineering student who loves turning complex engineering ideas into clean, snappy software. 70% of my time is dedicated to modern React/TypeScript frontends and distributed cloud services, and 30% to embedded IoT systems.
              </motion.p>
            </div>

            {/* 4. Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <button
                type="button"
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[13.5px] font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[0_4px_20px_rgba(37,99,235,0.28)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onAbout}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[13.5px] font-medium text-[#111827] bg-white hover:bg-[#F8FAFC] border border-[#DCE4EF] hover:border-[#2563EB]/40 shadow-xs hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#2563EB]" />
                <span>View Resume</span>
              </button>
            </motion.div>

            {/* 5. Quick Links & Socials */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap items-center gap-5 pt-3 text-[13px] text-[#64748B] border-t border-[#DCE4EF]"
            >
              <a
                href="https://github.com/rajatbehera05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#111827] hover:-translate-y-0.5 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#111827] hover:-translate-y-0.5 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:rajatb220m@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-[#111827] hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-4 h-4 text-[#2563EB]" />
                <span>rajatb220m@gmail.com</span>
              </a>

              <span className="text-[#CBD5E1] hidden sm:inline">•</span>
              <span className="text-[#4B5563] font-medium hidden sm:inline">B.Tech CSE (8.9 CGPA)</span>
            </motion.div>

          </div>

          {/* Right Column: Premium Arctic Aurora Identity Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end items-center relative z-20 pt-6 lg:pt-0"
          >
            <motion.div
              ref={cardRef}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="group relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px] xl:max-w-[460px] aspect-[4/5] sm:aspect-[3/4] rounded-[24px] p-[1.5px] bg-gradient-to-b from-[#2563EB]/25 via-[#DCE4EF] to-[#8B5CF6]/20 shadow-[0_16px_40px_rgba(37,99,235,0.08),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.14),0_0_24px_rgba(139,92,246,0.12)] transition-shadow duration-300"
            >
              
              {/* Inner Translucent White Container */}
              <div className="w-full h-full rounded-[22.5px] overflow-hidden bg-white/95 backdrop-blur-xl border border-[#DCE4EF] group-hover:border-[#2563EB]/40 transition-colors duration-300 relative flex flex-col">
                
                {PROFILE_IMAGE_URL ? (
                  <img
                    src={PROFILE_IMAGE_URL}
                    alt="Rajat Behera"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  /* Clean Neutral Identity Frame */
                  <div className="w-full h-full flex flex-col justify-between p-6 sm:p-7 relative select-none bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]">
                    
                    {/* Subtle technical background grid */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.4] pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(rgba(37, 99, 235, 0.25) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Subtle lavender/blue ambient illumination */}
                    <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[#8B5CF6]/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#2563EB]/8 blur-2xl pointer-events-none" />

                    {/* Top Header inside card */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F1FF] border border-[#2563EB]/25 text-[#2563EB] text-[11.5px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                        <span>Identity Frame</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#64748B] tracking-wider uppercase font-semibold">
                        Portrait · 3:4
                      </span>
                    </div>

                    {/* Center Framed Focal Reticle */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-4 py-6">
                      {/* Precision Corner Framing Reticle */}
                      <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-[22px] border border-dashed border-[#2563EB]/35 group-hover:border-[#2563EB]/60 bg-white/70 shadow-xs flex items-center justify-center transition-colors duration-300">
                        {/* Precision corner brackets */}
                        <div className="absolute -top-1.5 -left-1.5 w-6 h-6 sm:w-7 sm:h-7 border-t-2 border-l-2 border-[#2563EB] rounded-tl-[6px]" />
                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 border-t-2 border-r-2 border-[#2563EB] rounded-tr-[6px]" />
                        <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 sm:w-7 sm:h-7 border-b-2 border-l-2 border-[#2563EB] rounded-bl-[6px]" />
                        <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 border-b-2 border-r-2 border-[#2563EB] rounded-br-[6px]" />

                        {/* Aperture / Lens Icon Container */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-[#DCE4EF] text-[#2563EB] flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.12)] group-hover:shadow-[0_8px_28px_rgba(37,99,235,0.22)] group-hover:border-[#2563EB]/40 group-hover:scale-105 transition-all duration-300">
                          <Camera className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.6]" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[14.5px] sm:text-[16px] font-semibold text-[#111827] tracking-tight">
                          Developer Portrait
                        </div>
                        <p className="text-[12px] sm:text-[13px] text-[#64748B] max-w-[240px] leading-relaxed">
                          Placeholder area ready for profile photograph
                        </p>
                      </div>
                    </div>

                    {/* Bottom Identity Plaque */}
                    <div className="relative z-10 p-3.5 sm:p-4 rounded-xl bg-white/90 border border-[#DCE4EF] shadow-xs">
                      <div className="flex items-center justify-between text-[11.5px] sm:text-[12px]">
                        <div>
                          <div className="font-semibold text-[#111827] text-[12.5px] sm:text-[13px]">Rajat Behera</div>
                          <div className="text-[#64748B] text-[11px] sm:text-[11.5px]">CSE &amp; IoT Developer</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-[#E8F1FF] border border-[#2563EB]/20 text-[10.5px] font-mono text-[#2563EB] font-bold">
                          Ready
                        </span>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
