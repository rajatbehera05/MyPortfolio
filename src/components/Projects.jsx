import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ExternalLink, ArrowRight, Server, Globe } from 'lucide-react';
import WireframeCube from './WireframeCube';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

/**
 * Projects Section: Compact Professional Card Showcase
 * 
 * - High information density, low visual clutter
 * - Structured horizontal cards (~62% content / ~38% contained visual)
 * - Desktop height: ~420–480px, eliminating massive vertical bloat
 * - Consistent card sizing and spacing
 */
export default function Projects({ onOpenSpec }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'SOFTWARE' | 'IOT'

  const projects = [
    {
      id: 'smart-parking',
      title: 'Smart Parking Management System',
      tagline: 'IoT Vehicle Detection, Automated Gate Barrier & Real-Time Dashboard',
      categoryTag: 'FEATURED CASE STUDY',
      category: 'Connected IoT · Embedded Systems',
      isSoftware: false,
      description: 'An IoT-enabled parking system combining ESP32-based vehicle detection, real-time occupancy monitoring and automated gate control.',
      highlights: [
        'Real-time parking occupancy detection',
        'Automated servo gate control',
        'ESP32 → REST API telemetry',
        'Live parking dashboard',
      ],
      techs: ['ESP32', 'IR Sensors', 'Servo Motor', 'React', 'Node.js', 'Express', 'REST API'],
      previewType: 'smart-parking',
      image: '/assets/smart_parking_system.jpg',
      github: 'https://github.com/rajatbehera05/Model',
      liveDemo: 'https://frontend-seven-ashen-34.vercel.app/',
    },
    {
      id: 'omnisync',
      title: 'OmniSync',
      tagline: 'Real-Time Collaborative Workspace & State Sync Engine',
      categoryTag: 'FULL-STACK CASE STUDY',
      category: 'Real-Time Web · Distributed State',
      isSoftware: true,
      description: 'A multiplayer collaborative workspace engineered with CRDTs and WebSockets for conflict-free multi-user state synchronization.',
      highlights: [
        'Sub-15ms sync latency over persistent WebSockets',
        'Optimistic client mutations with local undo/redo',
        'Deterministic CRDT conflict resolution',
        'Redis Pub/Sub multi-pod event distribution',
      ],
      techs: ['React 19', 'TypeScript', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL', 'Docker'],
      previewType: 'collab-canvas',
      image: '/assets/workbench.jpg',
      github: 'https://github.com/rajatbehera05/omnisync',
      liveDemo: 'https://omnisync-preview.vercel.app',
    },
    {
      id: 'nexusflow',
      title: 'NexusFlow',
      tagline: 'High-Throughput Microservice API Gateway & Observability',
      categoryTag: 'BACKEND CASE STUDY',
      category: 'Cloud & Distributed Systems',
      isSoftware: true,
      description: 'An asynchronous API gateway handling high request volumes with dynamic token-bucket rate limiting and distributed telemetry.',
      highlights: [
        '150k+ req/min throughput with sub-10ms P99 latency',
        'Multi-tier Redis caching achieving 94.6% hit rate',
        'End-to-end OpenTelemetry distributed trace propagation',
        'Dynamic token-bucket rate limiting & circuit breakers',
      ],
      techs: ['FastAPI', 'Python', 'Redis Cluster', 'Docker', 'OpenTelemetry', 'PostgreSQL'],
      previewType: 'api-dashboard',
      image: '/assets/workbench.jpg',
      github: 'https://github.com/rajatbehera05/nexusflow',
    },
    {
      id: 'edgevision',
      title: 'EdgeVision',
      tagline: 'On-Device TinyML Classifier & Cloud Diagnostics Portal',
      categoryTag: 'EDGE AI CASE STUDY',
      category: 'Applied TinyML · Embedded Systems',
      isSoftware: false,
      description: 'An on-device INT8 quantized neural network running on ARM Cortex microcontrollers for vibration anomaly classification.',
      highlights: [
        'Deep neural network compressed to 84 KB SRAM budget',
        'Sub-15ms on-device inference without cloud dependency',
        'Real-time acoustic fault detection at 97.2% precision',
        'Live spectral waterfall diagnostics portal via WebSockets',
      ],
      techs: ['ARM Cortex', 'TinyML', 'PyTorch', 'Python', 'WebSockets', 'React'],
      previewType: 'photo',
      image: '/assets/parking_node.jpg',
      github: 'https://github.com/rajatbehera05/edgevision',
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'SOFTWARE') return p.isSoftware;
    if (filter === 'IOT') return !p.isSoftware;
    return true;
  });

  return (
    <section
      id="work"
      aria-label="Featured Projects"
      className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 border-t border-[#D5DFEB] relative"
    >
      <div id="systems" className="-mt-20 pt-20" aria-hidden="true" />

      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider text-[#2563EB] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span>Case Studies</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#64748B]">Selected Work</span>
          </div>

          <div className="flex items-center gap-3">
            <WireframeCube
              size={34}
              color="#EC4899"
              tiltX={-24}
              tiltZ={12}
              duration={17}
              divisions={3}
              floating={false}
              className="shrink-0"
            />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] font-sans-editorial">
              Featured Projects
            </h2>
          </div>

          <p className="text-[14px] sm:text-[15px] text-[#4B5563] max-w-xl leading-relaxed">
            Curated architectural breakdowns of full-stack platforms, distributed services, and connected IoT systems.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1 p-1 rounded-xl bg-white border border-[#D5DFEB] shadow-2xs self-start md:self-auto text-[11.5px]"
        >
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
              filter === 'ALL'
                ? 'bg-[#2563EB] text-white shadow-2xs font-semibold'
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            All Work ({projects.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('SOFTWARE')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
              filter === 'SOFTWARE'
                ? 'bg-[#2563EB] text-white shadow-2xs font-semibold'
                : 'text-[#64748B] hover:text-[#2563EB]'
            }`}
          >
            Web &amp; Full-Stack
          </button>

          <button
            type="button"
            onClick={() => setFilter('IOT')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
              filter === 'IOT'
                ? 'bg-[#8B5CF6] text-white shadow-2xs font-semibold'
                : 'text-[#64748B] hover:text-[#8B5CF6]'
            }`}
          >
            Connected IoT
          </button>
        </motion.div>
      </div>

      {/* Compact Project Showcase Cards */}
      <div className="space-y-6 sm:space-y-7">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, pIdx) => {
            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: pIdx * 0.05 }}
                className="group relative overflow-hidden p-5 sm:p-6 lg:p-7 rounded-2xl border border-[#D5DFEB] bg-white hover:border-[#2563EB]/45 transition-all duration-300 shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.08)] hover:-translate-y-0.5"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
                  
                  {/* LEFT SIDE: Project Metadata & Details (approx 62% width on desktop) */}
                  <div className="md:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-3.5">
                    
                    {/* 1. Category / Tag Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] sm:text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-[#E8F1FF] text-[#2563EB] border border-[#2563EB]/25 uppercase tracking-wider">
                        {project.categoryTag}
                      </span>
                      <span className="text-[11px] sm:text-[11.5px] font-medium text-[#64748B]">
                        {project.category}
                      </span>
                    </div>

                    {/* 2. Project Title & One-line Subtitle */}
                    <div>
                      <h3
                        onClick={() => onOpenSpec && onOpenSpec(project)}
                        className="text-lg sm:text-xl lg:text-[23px] font-bold text-[#111827] tracking-tight font-sans-editorial group-hover:text-[#2563EB] transition-colors leading-snug cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-[12.5px] sm:text-[13px] text-[#2563EB] font-semibold mt-0.5 line-clamp-1">
                        {project.tagline}
                      </p>
                    </div>

                    {/* 3. Short 2–3 Line Description */}
                    <p className="text-[13px] sm:text-[13.5px] text-[#4B5563] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Mobile-only inline visual (Placed between Description and Highlights on small screens) */}
                    <div className="block md:hidden my-1">
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#D5DFEB] bg-[#0F172A] shadow-2xs">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {project.id === 'smart-parking' && (
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/95 text-[10px] text-[#2563EB] font-bold shadow-2xs">
                            ● Active Stream
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 4. Concise Engineering Highlights (Short single-line statements) */}
                    <div className="space-y-1.5 pt-0.5">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[12px] sm:text-[12.5px] text-[#334155]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* 5. Small Technology Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.techs.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] sm:text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] group-hover:border-[#2563EB]/20 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* 6. Actions: GitHub / Live Demo / Details → */}
                    <div className="flex items-center gap-2 pt-2.5 border-t border-[#F1F5F9]">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-semibold text-[#111827] hover:text-[#2563EB] bg-white hover:bg-[#F8FAFC] border border-[#D5DFEB] hover:border-[#2563EB]/40 shadow-2xs transition-all"
                          title="View Source on GitHub"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>GitHub</span>
                        </a>
                      )}

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11.5px] font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-2xs hover:shadow-xs transition-all"
                          title="Open Live Demo"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => onOpenSpec && onOpenSpec(project)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11.5px] font-semibold text-[#64748B] hover:text-[#2563EB] hover:bg-[#E8F1FF] border border-transparent hover:border-[#2563EB]/20 cursor-pointer transition-colors ml-auto sm:ml-0"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3 text-[#2563EB] transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>

                  </div>

                  {/* RIGHT SIDE: Contained Compact Project Visual (~38% width on desktop) */}
                  <div className="hidden md:block md:col-span-5 h-full">
                    <div
                      onClick={() => onOpenSpec && onOpenSpec(project)}
                      className="relative w-full h-[280px] lg:h-[310px] rounded-xl overflow-hidden border border-[#D5DFEB] bg-[#0F172A] shadow-2xs group/img cursor-pointer transition-all duration-300 group-hover:border-[#2563EB]/40"
                      title="Click to view details"
                    >
                      {project.previewType === 'smart-parking' ? (
                        /* Smart Parking Contained Visual */
                        <div className="relative w-full h-full">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-center group-hover/img:scale-[1.02] transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A101D]/80 via-transparent to-transparent pointer-events-none" />

                          {/* Top Compact Status Badge */}
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#D5DFEB] text-[10px] text-[#2563EB] font-bold flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                            <span>Connected IoT</span>
                          </div>

                          {/* Bottom Compact Telemetry Indicator */}
                          <div className="absolute inset-x-2.5 bottom-2.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#D5DFEB] flex items-center justify-between text-[10px] font-mono shadow-2xs">
                            <span className="text-[#334155] font-semibold">ESP32 ➔ Cloud REST</span>
                            <span className="text-emerald-600 font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Active Stream
                            </span>
                          </div>
                        </div>
                      ) : project.previewType === 'collab-canvas' ? (
                        /* OmniSync Compact Workspace UI */
                        <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-white to-[#F8FAFC] select-none text-[11px]">
                          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                              <span className="font-bold text-[#111827]">OmniSync Workspace</span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-bold">5 Online</span>
                          </div>

                          <div className="relative my-auto h-24 rounded-lg border border-dashed border-[#CBD5E1] bg-[#F1F5F9]/50 flex items-center justify-center p-2.5">
                            <div className="p-2.5 rounded-lg bg-white border border-[#D5DFEB] shadow-2xs text-center">
                              <div className="text-[11px] font-bold text-[#111827]">CRDT Replicated Document</div>
                              <div className="text-[9.5px] text-emerald-600 font-semibold mt-0.5">● Deterministic Sync (12ms)</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[10px] text-[#64748B]">
                            <span>WebSockets Stream</span>
                            <span className="text-[#2563EB] font-bold">Zero Conflict</span>
                          </div>
                        </div>
                      ) : project.previewType === 'api-dashboard' ? (
                        /* NexusFlow Compact Route Log */
                        <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-white to-[#F8FAFC] select-none text-[11px]">
                          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                            <div className="flex items-center gap-1.5">
                              <Server className="w-3 h-3 text-[#2563EB]" />
                              <span className="font-bold text-[#111827]">NexusFlow Gateway</span>
                            </div>
                            <span className="text-[9.5px] text-emerald-600 font-bold px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                              99.99% Uptime
                            </span>
                          </div>

                          <div className="space-y-1.5 my-auto">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs text-[10px]">
                              <span className="font-mono text-[#111827] truncate">POST /api/v1/auth/session</span>
                              <span className="text-emerald-600 font-bold ml-1">200 OK</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs text-[10px]">
                              <span className="font-mono text-[#111827] truncate">GET /api/v1/telemetry</span>
                              <span className="text-emerald-600 font-bold ml-1">1.8ms</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[10px] text-[#64748B]">
                            <span>16 Async Workers</span>
                            <span className="text-[#2563EB] font-bold">OTel Traced</span>
                          </div>
                        </div>
                      ) : (
                        /* Edge AI Photo Preview */
                        <div className="relative w-full h-full">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover/img:scale-[1.02] transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-[#D5DFEB] text-[10px] text-[#2563EB] font-bold shadow-2xs">
                            Physical Prototype
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
