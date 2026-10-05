import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, FileText, Mail, Camera, Sunrise, Sun, Sunset } from 'lucide-react';
import WireframeCube from './WireframeCube';
import DigitalTimeConsole from './DigitalTimeConsole';
import { useTimeEnvironment } from '../hooks/useTimeEnvironment';

/**
 * Developer Profile Photo
 * When null, the sophisticated Arctic Aurora identity frame is displayed.
 */
const PROFILE_IMAGE_URL = null;

function TimeIcon({ timeState, className = "w-4 h-4" }) {
  switch (timeState) {
    case 'morning':
      return <Sunrise className={className} />;
    case 'noon':
    case 'afternoon':
      return <Sun className={className} />;
    case 'evening':
    default:
      return <Sunset className={className} />;
  }
}

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
export default function Hero({ onExplore, onAbout, mousePos = { x: 0, y: 0 }, timeEnv }) {
  const cardRef = useRef(null);
  const fallbackTimeEnv = useTimeEnvironment();
  const { timeState, greeting, isOverridden, cycleTimeState, isNight } = timeEnv || fallbackTimeEnv;
  
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
        className="absolute inset-0 pointer-events-none opacity-40 z-1"
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
            

            {/* 2. Time-Based Environmental Greeting & Digital Time Instrument */}
            <div className="space-y-2.5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="flex items-center gap-3.5"
              >
                <motion.button
                  type="button"
                  onClick={cycleTimeState}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  title={`Current scene: ${greeting}. Click to cycle time scene (Morning → Afternoon → Evening)`}
                  aria-label={`Change time scene. Currently ${greeting}`}
                  className={`group relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border shadow-2xs shrink-0 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 ${
                    isNight
                      ? 'bg-[#122442] border-[rgba(150,180,230,0.2)] hover:border-[#4F8CFF] text-[#4F8CFF] hover:bg-[#162C52]'
                      : 'bg-white/90 border-[#D5DFEB] hover:border-[#2563EB] text-[#2563EB] hover:bg-white'
                  }`}
                >
                  <motion.div
                    key={timeState}
                    initial={{ rotate: -30, opacity: 0.5, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <TimeIcon timeState={timeState} className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${isNight ? 'text-[#4F8CFF]' : 'text-[#2563EB]'}`} />
                  </motion.div>
                </motion.button>
                <span className={`text-2xl sm:text-3xl lg:text-[32px] font-bold font-sans-editorial tracking-tight ${isNight ? 'text-[#F1F5FF]' : 'text-[#0F172A]'}`}>
                  {greeting}
                </span>
              </motion.div>

              {/* Standalone Compact Electronic Digital Instrument */}
              <DigitalTimeConsole
                timeState={timeState}
                isOverridden={isOverridden}
                isNight={isNight}
              />
            </div>

            {/* 2. Headline with selected Arctic Blue gradient accents */}
            <div className="space-y-3">
              <div className="flex items-start gap-3.5 sm:gap-4.5">
                <WireframeCube
                  size={44}
                  color="#EF4444"
                  tiltX={-20}
                  tiltZ={10}
                  duration={16}
                  divisions={3}
                  className="shrink-0 mt-1 sm:mt-1.5"
                />
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.25 }}
                  className={`text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight font-sans-editorial leading-[1.12] ${
                    isNight ? 'text-[#F1F5FF]' : 'text-[#111827]'
                  }`}
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
              </div>

              {/* 3. Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.45 }}
                className={`text-[16px] sm:text-[17.5px] leading-relaxed max-w-xl font-normal ${
                  isNight ? 'text-[#A9B8D0]' : 'text-[#4B5563]'
                }`}
              >
                Hi, I'm <strong className={`font-semibold ${isNight ? 'text-[#F1F5FF]' : 'text-[#111827]'}`}>Rajat Behera</strong>. I'm a Computer Science &amp; Engineering student who loves turning complex engineering ideas into clean, snappy software. I specialize in building responsive React/TypeScript frontends and distributed cloud architectures, seamlessly bridging them with real-world embedded IoT systems.
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
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[13.5px] font-medium border shadow-xs hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${
                  isNight
                    ? 'text-[#F1F5FF] bg-[#122442] hover:bg-[#162C52] border-[rgba(150,180,230,0.2)] hover:border-[#4F8CFF]/50'
                    : 'text-[#111827] bg-white hover:bg-[#F8FAFC] border-[#D5DFEB] hover:border-[#2563EB]/40'
                }`}
              >
                <FileText className={`w-4 h-4 ${isNight ? 'text-[#4F8CFF]' : 'text-[#2563EB]'}`} />
                <span>View Resume</span>
              </button>
            </motion.div>

            {/* 5. Quick Links & Socials */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className={`flex flex-wrap items-center gap-5 pt-3 text-[13px] border-t ${
                isNight ? 'text-[#A9B8D0] border-[rgba(150,180,230,0.15)]' : 'text-[#64748B] border-[#D5DFEB]'
              }`}
            >
              <a
                href="https://github.com/rajatbehera05"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 ${isNight ? 'hover:text-[#F1F5FF]' : 'hover:text-[#111827]'} hover:-translate-y-0.5 transition-all`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 ${isNight ? 'hover:text-[#F1F5FF]' : 'hover:text-[#111827]'} hover:-translate-y-0.5 transition-all`}
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:rajatb220m@gmail.com"
                className={`inline-flex items-center gap-1.5 ${isNight ? 'hover:text-[#F1F5FF]' : 'hover:text-[#111827]'} hover:-translate-y-0.5 transition-all`}
              >
                <Mail className={`w-4 h-4 ${isNight ? 'text-[#4F8CFF]' : 'text-[#2563EB]'}`} />
                <span>rajatb220m@gmail.com</span>
              </a>

              <span className={`${isNight ? 'text-[#475569]' : 'text-[#CBD5E1]'} hidden sm:inline`}>•</span>
              <span className={`${isNight ? 'text-[#A9B8D0]' : 'text-[#4B5563]'} font-medium hidden sm:inline`}>B.Tech CSE (8.9 CGPA)</span>
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
              className={`group relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px] xl:max-w-[460px] aspect-[4/5] sm:aspect-[3/4] rounded-[24px] p-[1.5px] transition-shadow duration-300 ${
                isNight
                  ? 'bg-gradient-to-b from-[#4F8CFF]/30 via-[rgba(150,180,230,0.15)] to-[#8B5CF6]/20 shadow-[0_20px_50px_rgba(8,20,38,0.7)] hover:shadow-[0_24px_60px_rgba(79,140,255,0.2)]'
                  : 'bg-gradient-to-b from-[#2563EB]/25 via-[#D5DFEB] to-[#8B5CF6]/20 shadow-[0_16px_40px_rgba(37,99,235,0.08),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.14),0_0_24px_rgba(139,92,246,0.12)]'
              }`}
            >
              
              {/* Inner Container */}
              <div className={`w-full h-full rounded-[22.5px] overflow-hidden backdrop-blur-xl border transition-colors duration-300 relative flex flex-col ${
                isNight
                  ? 'bg-[#0D1B32]/95 border-[rgba(150,180,230,0.18)] group-hover:border-[#4F8CFF]/40'
                  : 'bg-white/95 border-[#D5DFEB] group-hover:border-[#2563EB]/40'
              }`}>
                
                {PROFILE_IMAGE_URL ? (
                  <img
                    src={PROFILE_IMAGE_URL}
                    alt="Rajat Behera"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  /* Clean Neutral Identity Frame */
                  <div className={`w-full h-full flex flex-col justify-between p-6 sm:p-7 relative select-none ${
                    isNight
                      ? 'bg-gradient-to-b from-[#0D1B32] via-[#091528] to-[#081426]'
                      : 'bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]'
                  }`}>
                    
                    {/* Subtle technical background grid */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.35] pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(${isNight ? 'rgba(79, 140, 255, 0.3)' : 'rgba(37, 99, 235, 0.25)'} 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Subtle lavender/blue ambient illumination */}
                    <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[#8B5CF6]/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#2563EB]/8 blur-2xl pointer-events-none" />

                    {/* Top Header inside card */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11.5px] font-semibold ${
                        isNight
                          ? 'bg-[#122442] border-[#4F8CFF]/30 text-[#4F8CFF]'
                          : 'bg-[#E8F1FF] border-[#2563EB]/25 text-[#2563EB]'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-[#4F8CFF]' : 'bg-[#2563EB]'} animate-pulse`} />
                        <span>Identity Frame</span>
                      </div>
                      <span className={`text-[11px] font-mono tracking-wider uppercase font-semibold ${
                        isNight ? 'text-[#A9B8D0]' : 'text-[#64748B]'
                      }`}>
                        Portrait · 3:4
                      </span>
                    </div>

                    {/* Center Framed Focal Reticle */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-4 py-6">
                      {/* Precision Corner Framing Reticle */}
                      <div className={`relative w-44 h-44 sm:w-56 sm:h-56 rounded-[22px] border border-dashed shadow-xs flex items-center justify-center transition-colors duration-300 ${
                        isNight
                          ? 'border-[#4F8CFF]/35 group-hover:border-[#4F8CFF]/60 bg-[#122442]/60'
                          : 'border-[#2563EB]/35 group-hover:border-[#2563EB]/60 bg-white/70'
                      }`}>
                        {/* Precision corner brackets */}
                        <div className={`absolute -top-1.5 -left-1.5 w-6 h-6 sm:w-7 sm:h-7 border-t-2 border-l-2 ${isNight ? 'border-[#4F8CFF]' : 'border-[#2563EB]'} rounded-tl-[6px]`} />
                        <div className={`absolute -top-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 border-t-2 border-r-2 ${isNight ? 'border-[#4F8CFF]' : 'border-[#2563EB]'} rounded-tr-[6px]`} />
                        <div className={`absolute -bottom-1.5 -left-1.5 w-6 h-6 sm:w-7 sm:h-7 border-b-2 border-l-2 ${isNight ? 'border-[#4F8CFF]' : 'border-[#2563EB]'} rounded-bl-[6px]`} />
                        <div className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 border-b-2 border-r-2 ${isNight ? 'border-[#4F8CFF]' : 'border-[#2563EB]'} rounded-br-[6px]`} />

                        {/* Aperture / Lens Icon Container */}
                        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border flex items-center justify-center group-hover:scale-105 transition-all duration-300 ${
                          isNight
                            ? 'bg-[#122442] border-[rgba(150,180,230,0.2)] text-[#4F8CFF] shadow-[0_4px_20px_rgba(79,140,255,0.15)] group-hover:border-[#4F8CFF]/50'
                            : 'bg-white border-[#D5DFEB] text-[#2563EB] shadow-[0_4px_20px_rgba(37,99,235,0.12)] group-hover:border-[#2563EB]/40'
                        }`}>
                          <Camera className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.6]" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className={`text-[14.5px] sm:text-[16px] font-semibold tracking-tight ${
                          isNight ? 'text-[#F1F5FF]' : 'text-[#111827]'
                        }`}>
                          Developer Portrait
                        </div>
                        <p className={`text-[12px] sm:text-[13px] max-w-[240px] leading-relaxed ${
                          isNight ? 'text-[#A9B8D0]' : 'text-[#64748B]'
                        }`}>
                          Placeholder area ready for profile photograph
                        </p>
                      </div>
                    </div>

                    {/* Bottom Identity Plaque */}
                    <div className={`relative z-10 p-3.5 sm:p-4 rounded-xl border shadow-xs ${
                      isNight
                        ? 'bg-[#122442]/90 border-[rgba(150,180,230,0.18)]'
                        : 'bg-white/90 border-[#D5DFEB]'
                    }`}>
                      <div className="flex items-center justify-between text-[11.5px] sm:text-[12px]">
                        <div>
                          <div className={`font-semibold text-[12.5px] sm:text-[13px] ${isNight ? 'text-[#F1F5FF]' : 'text-[#111827]'}`}>Rajat Behera</div>
                          <div className={`text-[11px] sm:text-[11.5px] ${isNight ? 'text-[#A9B8D0]' : 'text-[#64748B]'}`}>CSE &amp; IoT Developer</div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md border text-[10.5px] font-mono font-bold ${
                          isNight
                            ? 'bg-[#0D234A] border-[#4F8CFF]/30 text-[#4F8CFF]'
                            : 'bg-[#E8F1FF] border-[#2563EB]/20 text-[#2563EB]'
                        }`}>
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
