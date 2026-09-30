import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import ConvergenceEngineVisual from './ConvergenceEngineVisual';

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
 * Hero Section — Warm, Human, High-End Software Developer Presentation
 */
export default function Hero({ onExplore, onAbout }) {
  return (
    <section
      id="home"
      aria-label="Rajat Behera Software Portfolio"
      className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 px-6 sm:px-12 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Natural, Human Presentation */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 z-20">
            
            {/* Availability Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[12px] font-medium w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Software Engineering Internships · Summer 2026</span>
            </motion.div>

            {/* Name & Headline */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-[#F4F7FA] font-sans-editorial leading-[1.08]"
              >
                Building fast web apps, scalable backends &amp; connected systems.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.35 }}
                className="text-[16px] sm:text-[17px] text-[#AAB5C0] leading-relaxed max-w-xl font-normal"
              >
                Hi, I'm <strong className="text-[#F4F7FA] font-semibold">Rajat Behera</strong>. I'm a Computer Science &amp; Engineering student who loves turning complex engineering ideas into clean, snappy software. 70% of my time is dedicated to modern React/TypeScript frontends and distributed cloud services, and 30% to embedded IoT systems.
              </motion.p>
            </div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <button
                type="button"
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[13.5px] font-semibold text-[#0A0D10] bg-[#16D9E8] hover:bg-[#14C1CE] hover:shadow-[0_0_24px_rgba(22,217,232,0.3)] transition-all duration-200 cursor-pointer"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onAbout}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[13.5px] font-medium text-[#F4F7FA] bg-[#141A21] hover:bg-[#1A222B] border border-[#232D36] transition-all duration-200 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#16D9E8]" />
                <span>View Resume</span>
              </button>
            </motion.div>

            {/* Quick Links / Socials */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center gap-5 pt-3 text-[13px] text-[#71808D] border-t border-[#1A222B]"
            >
              <a
                href="https://github.com/rajatbehera05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#F4F7FA] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#F4F7FA] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:rajatb220m@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-[#F4F7FA] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>rajatb220m@gmail.com</span>
              </a>

              <span className="text-[#232D36] hidden sm:inline">•</span>
              <span className="text-[#AAB5C0] hidden sm:inline">B.Tech CSE (8.9 CGPA)</span>
            </motion.div>

            {/* Mobile Layout Fallback */}
            <div className="block lg:hidden pt-4">
              <ConvergenceEngineVisual />
            </div>

          </div>

          {/* Right Column: Interactive Developer Workspace Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="lg:col-span-6 hidden lg:flex flex-col items-center justify-center relative"
          >
            <ConvergenceEngineVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
