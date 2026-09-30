import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Server, Play, ExternalLink } from 'lucide-react';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

/**
 * Projects Section: FEATURED PROJECTS
 * 
 * Clean, human, product-oriented software engineer portfolio:
 * - Clear project value propositions and real engineering challenges
 * - Interactive live preview cards (Collaborative canvas, API gateway metrics, hardware photography)
 * - 70% Full-Stack & Systems / 30% Connected IoT
 */
export default function Projects({ onOpenSpec }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'SOFTWARE' | 'IOT'
  const [interactiveSyncActive, setInteractiveSyncActive] = useState(false);

  const projects = [
    {
      id: 'smart-parking',
      title: 'Smart Parking Management System',
      tagline: 'IoT Vehicle Detection, Automated Gate Barrier & Real-Time Dashboard',
      category: 'Connected IoT · Embedded Systems',
      track: 'Hardware & IoT (30%)',
      featured: true,
      isSoftware: false,
      description: 'An IoT-enabled smart parking solution that combines ESP32-based vehicle detection with a real-time web dashboard to monitor parking occupancy, manage slot availability, and automate entry-gate control.',
      highlights: [
        'Real-time parking occupancy detection',
        'Automated entry-gate control',
        'ESP32-to-backend REST communication',
        'Live parking availability dashboard'
      ],
      metrics: [
        { label: 'Occupancy Sync', value: 'Real-Time' },
        { label: 'Gate Actuation', value: 'Automated Servo' },
        { label: 'Architecture', value: 'ESP32 + REST' }
      ],
      techs: ['ESP32', 'IR Sensors', 'Servo Motor', 'React', 'Node.js', 'Express', 'REST API'],
      previewType: 'smart-parking-image',
      image: '/assets/smart_parking_system.jpg',
      github: 'https://github.com/rajatbehera05/smart-parking-system',
      liveDemo: 'https://frontend-seven-ashen-34.vercel.app/'
    },
    {
      id: 'omnisync',
      title: 'OmniSync',
      tagline: 'Real-Time Collaborative Workspace & State Sync Engine',
      category: 'Full-Stack · Real-Time Web',
      track: 'Web & Full-Stack (70%)',
      featured: false,
      isSoftware: true,
      description: 'A multiplayer collaborative workspace engineered with conflict-free replicated data types (CRDTs) and WebSockets, enabling instant multi-user state synchronization with zero lag or merge conflicts.',
      highlights: [
        'Sub-15ms sync latency between distributed clients using persistent WebSockets',
        'Optimistic client mutations with local undo/redo and deterministic CRDT vector clocks',
        'Redis Pub/Sub message broker distributing events across multi-pod Node.js services'
      ],
      metrics: [
        { label: 'Latency', value: '< 14ms' },
        { label: 'Concurrency', value: '10,000+ Sockets' },
        { label: 'Conflict Merging', value: '100% Deterministic' }
      ],
      techs: ['React 19', 'TypeScript', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL', 'Docker'],
      previewType: 'collab-canvas',
      image: '/assets/workbench.jpg',
      github: 'https://github.com/rajatbehera05/omnisync',
      liveDemo: 'https://omnisync-preview.vercel.app'
    },
    {
      id: 'nexusflow',
      title: 'NexusFlow',
      tagline: 'High-Throughput Microservice API Gateway & Observability',
      category: 'Backend · Distributed Systems',
      track: 'Cloud & Backend (70%)',
      featured: false,
      isSoftware: true,
      description: 'An asynchronous API gateway and service orchestrator built to handle high request volumes with dynamic token-bucket rate limiting, Redis caching, and automated OpenTelemetry distributed tracing.',
      highlights: [
        'Bench-tested throughput exceeding 150k requests/minute with sub-10ms P99 latency',
        'Multi-tier caching layer in Redis achieving a 94.6% cache hit rate',
        'End-to-end distributed trace propagation using OpenTelemetry and correlation IDs'
      ],
      metrics: [
        { label: 'Throughput', value: '150k+ req/min' },
        { label: 'P99 Latency', value: '8.2ms' },
        { label: 'Cache Hit Rate', value: '94.6%' }
      ],
      techs: ['Python FastAPI', 'AsyncIO', 'Redis Cluster', 'Docker', 'OpenTelemetry', 'PostgreSQL'],
      previewType: 'api-dashboard',
      image: '/assets/workbench.jpg',
      github: 'https://github.com/rajatbehera05/nexusflow'
    },
    {
      id: 'edgevision',
      title: 'EdgeVision',
      tagline: 'On-Device TinyML Classifier & Cloud Diagnostics Portal',
      category: 'Applied AI · Edge Computing',
      track: 'Edge AI & Web (70/30 Hybrid)',
      featured: false,
      isSoftware: false,
      description: 'An on-device INT8 quantized neural network running on ARM Cortex microcontrollers for vibration and anomaly classification, paired with a web diagnostics portal for live spectral waterfalls.',
      highlights: [
        'Deep neural network compressed to fit into an 84 KB microcontroller SRAM budget',
        'Real-time acoustic fault detection with sub-15ms inference without server dependence',
        'Interactive web portal streaming live anomaly waterfall charts via WebSockets'
      ],
      metrics: [
        { label: 'Inference', value: '14.2ms' },
        { label: 'Model Size', value: '84 KB INT8' },
        { label: 'Precision', value: '97.2%' }
      ],
      techs: ['ARM Cortex', 'TinyML', 'Python', 'PyTorch', 'WebSockets', 'React'],
      previewType: 'photo',
      image: '/assets/workbench.jpg',
      github: 'https://github.com/rajatbehera05/edgevision'
    }
  ];

  const filteredProjects = projects.filter(p => {
    if (filter === 'SOFTWARE') return p.isSoftware;
    if (filter === 'IOT') return !p.isSoftware;
    return true;
  });

  const handleSimulateCollab = () => {
    setInteractiveSyncActive(true);
    setTimeout(() => setInteractiveSyncActive(false), 2000);
  };

  return (
    <section
      id="work"
      aria-label="Featured Projects"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
      <div id="systems" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#16D9E8] uppercase">
            <span>Portfolio</span>
            <span className="text-[#232D36]">•</span>
            <span className="text-[#AAB5C0]">Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
            Featured Projects
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
            A selection of web applications, distributed cloud backends, and connected IoT systems I've built.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F1419] border border-[#1A222B] self-start md:self-auto text-[12px]"
        >
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
              filter === 'ALL'
                ? 'bg-[#1A222B] text-[#F4F7FA] shadow-xs'
                : 'text-[#71808D] hover:text-[#AAB5C0]'
            }`}
          >
            All Work ({projects.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('SOFTWARE')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
              filter === 'SOFTWARE'
                ? 'bg-[#16D9E8]/15 text-[#16D9E8] border border-[#16D9E8]/30 shadow-xs'
                : 'text-[#71808D] hover:text-[#16D9E8]'
            }`}
          >
            Web &amp; Full-Stack (70%)
          </button>

          <button
            type="button"
            onClick={() => setFilter('IOT')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
              filter === 'IOT'
                ? 'bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30 shadow-xs'
                : 'text-[#71808D] hover:text-[#3B82F6]'
            }`}
          >
            Connected IoT (30%)
          </button>
        </motion.div>
      </div>

      {/* Projects List */}
      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, pIdx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, delay: pIdx * 0.08 }}
              className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border border-[#1A222B] bg-[#0E1319]/85 hover:border-[#2A3744] hover:bg-[#121820] transition-all duration-300 shadow-xl"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Details Column */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    {/* Tags & Track */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {project.featured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#16D9E8]/15 text-[#16D9E8] border border-[#16D9E8]/30 uppercase tracking-wider">
                          Featured Project
                        </span>
                      )}
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#16D9E8]/10 text-[#16D9E8] border border-[#16D9E8]/20">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-medium text-[#71808D]">
                        {project.track}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F7FA] tracking-tight font-sans-editorial">
                        {project.title}
                      </h3>
                      <p className="text-[14px] text-[#16D9E8] font-medium mt-1">
                        {project.tagline}
                      </p>
                      <p className="text-[15px] text-[#AAB5C0] leading-relaxed mt-3 font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Engineering Highlights */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[11.5px] uppercase tracking-wider text-[#71808D] font-semibold">
                        Key Engineering Highlights
                      </div>
                      <div className="space-y-1.5">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-[13.5px] text-[#AAB5C0]">
                            <CheckCircle2 className="w-4 h-4 text-[#16D9E8] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2.5 pt-2">
                      {project.metrics.map(m => (
                        <div key={m.label} className="p-2.5 rounded-xl bg-[#0A0D10]/80 border border-[#1A222B]">
                          <div className="text-[11px] text-[#71808D] font-medium">{m.label}</div>
                          <div className="text-[13.5px] font-bold text-[#F4F7FA] mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges & Action */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#1A222B]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.techs.map(t => (
                          <span
                            key={t}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#141A21] text-[#AAB5C0] border border-[#232D36]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#AAB5C0] hover:text-[#F4F7FA] bg-[#141A21] hover:bg-[#1A222B] border border-[#232D36] transition-colors"
                            title="View Source on GitHub"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}

                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#16D9E8] hover:text-[#0A0D10] bg-[#16D9E8]/10 hover:bg-[#16D9E8] border border-[#16D9E8]/30 transition-all"
                            title="Open Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => onOpenSpec && onOpenSpec(project)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#AAB5C0] hover:text-[#16D9E8] hover:bg-[#141A21] border border-transparent hover:border-[#232D36] cursor-pointer transition-colors"
                        >
                          <span>Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#16D9E8]" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Right Preview Column: Clean Product Mockup / Photo */}
                  <div className="lg:col-span-5 relative w-full aspect-[16/11] rounded-2xl overflow-hidden border border-[#232D36] bg-[#0A0D10] group/img">
                    
                    {project.previewType === 'collab-canvas' ? (
                      /* OmniSync Interactive Collaborative Canvas UI */
                      <div className="w-full h-full p-5 flex flex-col justify-between bg-gradient-to-br from-[#0F141A] to-[#0A0D10] select-none">
                        
                        {/* Mock App Header */}
                        <div className="flex items-center justify-between border-b border-[#1A222B] pb-3 text-[12px]">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                            <span className="font-semibold text-[#F4F7FA]">OmniSync Board</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5 overflow-hidden">
                              <span className="inline-block h-5 w-5 rounded-full ring-2 ring-[#0A0D10] bg-[#16D9E8] text-[9px] font-bold text-[#0A0D10] flex items-center justify-center">RB</span>
                              <span className="inline-block h-5 w-5 rounded-full ring-2 ring-[#0A0D10] bg-[#3B82F6] text-[9px] font-bold text-white flex items-center justify-center">AK</span>
                              <span className="inline-block h-5 w-5 rounded-full ring-2 ring-[#0A0D10] bg-purple-500 text-[9px] font-bold text-white flex items-center justify-center">+3</span>
                            </div>
                            <span className="text-[11px] text-emerald-400 font-medium">5 Online</span>
                          </div>
                        </div>

                        {/* Interactive Canvas Workspace Elements */}
                        <div className="relative h-28 my-auto rounded-xl border border-dashed border-[#232D36] bg-[#141A21]/40 flex items-center justify-center p-3">
                          
                          {/* Simulated Live Cursor 1 */}
                          <div className="absolute top-3 left-6 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#16D9E8]" />
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#16D9E8] text-[#0A0D10] font-bold">Rajat (Editing)</span>
                          </div>

                          {/* Simulated Live Cursor 2 */}
                          <div className="absolute bottom-4 right-8 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#3B82F6] text-white font-bold">Alex (Viewing)</span>
                          </div>

                          {/* Document State Block */}
                          <div className="p-2.5 rounded-lg bg-[#0E1319] border border-[#1A222B] text-center space-y-1">
                            <div className="text-[11px] text-[#AAB5C0]">CRDT Replicated Document</div>
                            <div className="text-[10px] text-emerald-400 font-medium">
                              {interactiveSyncActive ? '● Syncing Changes across 5 peers...' : '● State Synchronized (12ms)'}
                            </div>
                          </div>

                        </div>

                        {/* Interactive Click Trigger */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#1A222B] text-[11px]">
                          <span className="text-[#71808D]">WebSockets + Redis Pub/Sub</span>
                          <button
                            type="button"
                            onClick={handleSimulateCollab}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#16D9E8]/10 text-[#16D9E8] hover:bg-[#16D9E8] hover:text-[#0A0D10] border border-[#16D9E8]/30 transition-all font-medium cursor-pointer"
                          >
                            <Play className="w-2.5 h-2.5" />
                            <span>Simulate Peer Edit</span>
                          </button>
                        </div>

                      </div>
                    ) : project.previewType === 'api-dashboard' ? (
                      /* NexusFlow Clean Route Dashboard */
                      <div className="w-full h-full p-5 flex flex-col justify-between bg-gradient-to-br from-[#0F141A] to-[#0A0D10] select-none">
                        
                        <div className="flex items-center justify-between border-b border-[#1A222B] pb-3 text-[12px]">
                          <div className="flex items-center gap-2">
                            <Server className="w-3.5 h-3.5 text-[#3B82F6]" />
                            <span className="font-semibold text-[#F4F7FA]">NexusFlow Gateway</span>
                          </div>
                          <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            99.99% Uptime
                          </span>
                        </div>

                        {/* Clean Route Logs */}
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-[#141A21]/70 border border-[#1A222B]">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">POST</span>
                              <span className="text-[#F4F7FA]">/api/v1/auth/session</span>
                            </div>
                            <span className="text-emerald-400 font-medium">200 OK · 3.2ms</span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded-lg bg-[#141A21]/70 border border-[#1A222B]">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">GET</span>
                              <span className="text-[#F4F7FA]">/api/v1/telemetry/stream</span>
                            </div>
                            <span className="text-emerald-400 font-medium">200 OK · 1.8ms (Cache)</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-[#1A222B] text-[11px] text-[#71808D]">
                          <span>Active Workers: 16 Async</span>
                          <span className="text-[#3B82F6] font-medium">OpenTelemetry Traced</span>
                        </div>

                      </div>
                    ) : project.previewType === 'smart-parking-image' ? (
                      /* Smart Parking Architecture & System Diagram */
                      <div
                        className="relative w-full h-full bg-[#0A0D10] overflow-hidden group/img cursor-pointer"
                        onClick={() => onOpenSpec && onOpenSpec(project)}
                        title="Click to view full architecture diagram"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top sm:object-center group-hover/img:scale-105 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D10]/85 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#0A0D10]/85 backdrop-blur-md border border-[#232D36] text-[10.5px] text-emerald-400 font-medium flex items-center gap-1.5 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>ESP32 · Real-Time Telemetry</span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#AAB5C0] pointer-events-none">
                          <div className="px-2.5 py-1 rounded-lg bg-[#0A0D10]/85 backdrop-blur-md border border-[#1A222B] text-[#16D9E8] font-medium">
                            System Architecture
                          </div>
                          <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0A0D10]/80 border border-[#232D36] text-[10px] font-mono text-[#71808D]">
                            IR Sensors · Servo · REST
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Technical Photography for Hardware Projects */
                      <div className="relative w-full h-full">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale-[15%] group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#0A0D10]/85 backdrop-blur-md border border-[#1A222B] text-[11px] text-[#16D9E8] font-medium">
                          Physical Prototype
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
