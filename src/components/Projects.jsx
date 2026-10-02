import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Server, ExternalLink, Cpu, Radio, Globe, LayoutDashboard, ArrowRight } from 'lucide-react';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

/**
 * Projects Section: FEATURED CASE STUDIES — Arctic Aurora Edition
 * 
 * - Distinct alternating visual compositions (Image Right ↔ Image Left)
 * - 100-140px generous case study separation
 * - Elevated image depth with soft blue/lavender atmospheric glow
 * - Interactive Smart Parking system pipeline (ESP32 → IR Sensors → REST API → Dashboard)
 */
export default function Projects({ onOpenSpec }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'SOFTWARE' | 'IOT'
  const [parkingPipelineHovered, setParkingPipelineHovered] = useState(false);

  const projects = [
    {
      id: 'smart-parking',
      title: 'Smart Parking Management System',
      tagline: 'IoT Vehicle Detection, Automated Gate Barrier & Real-Time Dashboard',
      category: 'Connected IoT · Embedded Systems',
      track: 'Hardware & IoT',
      featured: true,
      isSoftware: false,
      layout: 'image-right',
      description: 'An IoT-enabled smart parking solution that combines ESP32-based vehicle detection with a real-time web dashboard to monitor parking occupancy, manage slot availability, and automate entry-gate control.',
      highlights: [
        'Real-time parking occupancy detection using optical distance sensors',
        'Automated entry-gate barrier control powered by micro-servo actuation',
        'ESP32-to-backend REST API telemetry communication over Wi-Fi',
        'Responsive live parking dashboard with instant slot status updates'
      ],
      metrics: [
        { label: 'Occupancy Sync', value: 'Real-Time' },
        { label: 'Gate Actuation', value: 'Automated Servo' },
        { label: 'Architecture', value: 'ESP32 + REST' }
      ],
      techs: ['ESP32', 'IR Sensors', 'Servo Motor', 'React', 'Node.js', 'Express', 'REST API'],
      previewType: 'smart-parking-image',
      image: '/assets/smart_parking_system.jpg',
      github: 'https://github.com/rajatbehera05/Model',
      liveDemo: 'https://frontend-seven-ashen-34.vercel.app/'
    },
    {
      id: 'omnisync',
      title: 'OmniSync',
      tagline: 'Real-Time Collaborative Workspace & State Sync Engine',
      category: 'Full-Stack · Real-Time Web',
      track: 'Web & Full-Stack',
      featured: false,
      isSoftware: true,
      layout: 'image-left',
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
      track: 'Cloud & Backend',
      featured: false,
      isSoftware: true,
      layout: 'image-right',
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
      track: 'Edge AI & Cloud',
      featured: false,
      isSoftware: false,
      layout: 'image-left',
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

  return (
    <section
      id="work"
      aria-label="Featured Projects"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#D5DFEB] relative"
    >
      <div id="systems" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#2563EB] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span>Case Studies</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#64748B]">Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] font-sans-editorial">
            Featured Projects
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#4B5563] max-w-2xl leading-relaxed">
            In-depth architectural breakdowns of full-stack platforms, distributed systems, and connected IoT hardware.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D5DFEB] shadow-xs self-start md:self-auto text-[12px]"
        >
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
              filter === 'ALL'
                ? 'bg-[#2563EB] text-white shadow-xs font-semibold'
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            All Work ({projects.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('SOFTWARE')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
              filter === 'SOFTWARE'
                ? 'bg-[#2563EB] text-white shadow-xs font-semibold'
                : 'text-[#64748B] hover:text-[#2563EB]'
            }`}
          >
            Web &amp; Full-Stack
          </button>

          <button
            type="button"
            onClick={() => setFilter('IOT')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
              filter === 'IOT'
                ? 'bg-[#8B5CF6] text-white shadow-xs font-semibold'
                : 'text-[#64748B] hover:text-[#8B5CF6]'
            }`}
          >
            Connected IoT
          </button>
        </motion.div>
      </div>

      {/* Case Studies List with 100-140px vertical spacing */}
      <div className="space-y-24 sm:space-y-28">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, pIdx) => {
            const isImageLeft = project.layout === 'image-left';

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.6, delay: pIdx * 0.08 }}
                className="project-hover-target group relative overflow-hidden p-7 sm:p-9 lg:p-10 rounded-3xl border border-[#D5DFEB] bg-white hover:border-[#2563EB]/50 transition-all duration-300 shadow-[0_4px_24px_rgba(15,23,42,0.05),0_1px_3px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_48px_rgba(37,99,235,0.1)] hover:-translate-y-1"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Details Column (Or Right if Image Left) */}
                  <div className={`space-y-6 ${isImageLeft ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7 lg:order-1'}`}>
                    
                    {/* Tags & Track */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {project.featured && (
                        <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F1FF] text-[#2563EB] border border-[#2563EB]/30 uppercase tracking-wider">
                          Featured Case Study
                        </span>
                      )}
                      <span className="text-[11.5px] font-semibold px-2.5 py-0.5 rounded-md bg-[#F1ECFF] text-[#8B5CF6] border border-[#8B5CF6]/25">
                        {project.category}
                      </span>
                      <span className="text-[11.5px] font-medium text-[#64748B]">
                        {project.track}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight font-sans-editorial group-hover:text-[#2563EB] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[14.5px] text-[#2563EB] font-semibold mt-1.5">
                        {project.tagline}
                      </p>
                      <p className="text-[15px] sm:text-[16px] text-[#4B5563] leading-relaxed mt-3.5 font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Engineering Highlights */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[11.5px] uppercase tracking-wider text-[#64748B] font-bold">
                        Key Engineering Highlights
                      </div>
                      <div className="space-y-2">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-[13.5px] sm:text-[14px] text-[#4B5563]">
                            <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {project.metrics.map(m => (
                        <div key={m.label} className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
                          <div className="text-[11px] text-[#64748B] font-medium">{m.label}</div>
                          <div className="text-[14px] sm:text-[15px] font-bold text-[#111827] mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges & Action */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#F1F5F9]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.techs.map(t => (
                          <span
                            key={t}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#4B5563] border border-[#E2E8F0] group-hover:border-[#2563EB]/25 group-hover:text-[#111827] transition-colors"
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
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-semibold text-[#111827] hover:text-[#2563EB] bg-white hover:bg-[#F8FAFC] border border-[#D5DFEB] hover:border-[#2563EB]/40 shadow-xs transition-all"
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
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[0_4px_16px_rgba(37,99,235,0.28)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.38)] transition-all"
                            title="Open Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => onOpenSpec && onOpenSpec(project)}
                          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-[12.5px] font-semibold text-[#64748B] hover:text-[#2563EB] hover:bg-[#E8F1FF] border border-transparent hover:border-[#2563EB]/20 cursor-pointer transition-colors"
                        >
                          <span>Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#2563EB] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Right Preview Column (Or Left if Image Left) */}
                  <div className={`relative w-full aspect-[16/11] rounded-2xl overflow-hidden border border-[#D5DFEB] bg-[#F8FAFC] shadow-[0_8px_24px_rgba(15,23,42,0.05)] group/img ${
                    isImageLeft ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5 lg:order-2'
                  }`}>
                    
                    {project.previewType === 'smart-parking-image' ? (
                      /* Smart Parking Interactive Telemetry Pipeline */
                      <div
                        className="relative w-full h-full bg-[#0F172A] overflow-hidden cursor-pointer flex flex-col justify-between"
                        onClick={() => onOpenSpec && onOpenSpec(project)}
                        onMouseEnter={() => setParkingPipelineHovered(true)}
                        onMouseLeave={() => setParkingPipelineHovered(false)}
                        title="Click to view full architecture diagram"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top sm:object-center group-hover/img:scale-[1.02] transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A101D]/90 via-[#0A101D]/35 to-transparent pointer-events-none" />

                        {/* Top System Status Badge */}
                        <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#D5DFEB] text-[11px] text-[#2563EB] font-bold flex items-center gap-1.5 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                          <span>Connected IoT System</span>
                        </div>

                        {/* Interactive System Pipeline: ESP32 ↓ IR Sensors ↓ REST API ↓ Dashboard */}
                        <div className="absolute inset-x-3.5 bottom-3.5 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#D5DFEB] shadow-lg pointer-events-none space-y-2.5">
                          <div className="flex items-center justify-between text-[10.5px] font-mono font-bold text-[#64748B]">
                            <span className="tracking-wide">PHYSICAL HARDWARE → BACKEND → WEB</span>
                            <span className="text-emerald-600 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                              Active Stream
                            </span>
                          </div>

                          {/* Pipeline Connection Nodes with Connecting Arrows */}
                          <div className="grid grid-cols-4 gap-2 text-center text-[10.5px]">
                            <div className="p-2 rounded-xl bg-[#E8F1FF] border border-[#2563EB]/25 text-[#1E3A8A]">
                              <Cpu className="w-3.5 h-3.5 mx-auto mb-1 text-[#2563EB]" />
                              <span className="font-bold block">ESP32</span>
                            </div>
                            <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155]">
                              <Radio className="w-3.5 h-3.5 mx-auto mb-1 text-[#8B5CF6]" />
                              <span className="font-semibold block">IR Sensors</span>
                            </div>
                            <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155]">
                              <Globe className="w-3.5 h-3.5 mx-auto mb-1 text-[#2563EB]" />
                              <span className="font-semibold block">REST API</span>
                            </div>
                            <div className="p-2 rounded-xl bg-[#E8F1FF] border border-[#2563EB]/25 text-[#1E3A8A]">
                              <LayoutDashboard className="w-3.5 h-3.5 mx-auto mb-1 text-[#2563EB]" />
                              <span className="font-bold block">Dashboard</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    ) : project.previewType === 'collab-canvas' ? (
                      /* OmniSync Interactive Collaborative Canvas UI */
                      <div className="w-full h-full p-5 flex flex-col justify-between bg-gradient-to-br from-white to-[#F8FAFC] select-none">
                        
                        {/* Mock App Header */}
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-[12px]">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] inline-block animate-pulse" />
                            <span className="font-bold text-[#111827]">OmniSync Workspace</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5 overflow-hidden">
                              <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-[#2563EB] text-[9px] font-bold text-white flex items-center justify-center">RB</span>
                              <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-[#8B5CF6] text-[9px] font-bold text-white flex items-center justify-center">AK</span>
                              <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-slate-400 text-[9px] font-bold text-white flex items-center justify-center">+3</span>
                            </div>
                            <span className="text-[11px] text-[#2563EB] font-bold">5 Online</span>
                          </div>
                        </div>

                        {/* Interactive Canvas Workspace Elements */}
                        <div className="relative h-32 my-auto rounded-xl border border-dashed border-[#CBD5E1] bg-[#F1F5F9]/60 flex items-center justify-center p-3">
                          
                          {/* Live Cursor 1 */}
                          <div className="absolute top-3 left-6 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#2563EB] text-white font-bold">Rajat (Editing)</span>
                          </div>

                          {/* Live Cursor 2 */}
                          <div className="absolute bottom-4 right-8 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#8B5CF6] text-white font-bold">Alex (Viewing)</span>
                          </div>

                          {/* Document State Block */}
                          <div className="p-3.5 rounded-xl bg-white border border-[#D5DFEB] shadow-xs text-center space-y-1">
                            <div className="text-[12px] font-bold text-[#111827]">CRDT Replicated Document</div>
                            <div className="text-[10px] text-emerald-600 font-semibold">
                              ● Deterministic Sync (12ms)
                            </div>
                          </div>
                        </div>

                        {/* Interactive Toolbar */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                          <span>Active Peers: 5 WebSockets</span>
                          <span className="text-[#2563EB] font-bold">Zero Conflict Sync</span>
                        </div>

                      </div>
                    ) : project.previewType === 'api-dashboard' ? (
                      /* NexusFlow Clean Route Dashboard */
                      <div className="w-full h-full p-5 flex flex-col justify-between bg-gradient-to-br from-white to-[#F8FAFC] select-none">
                        
                        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-[12px]">
                          <div className="flex items-center gap-2">
                            <Server className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span className="font-bold text-[#111827]">NexusFlow Gateway</span>
                          </div>
                          <span className="text-[11px] text-emerald-600 font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                            99.99% Uptime
                          </span>
                        </div>

                        {/* Route Logs */}
                        <div className="space-y-2 text-[11px]">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[#2563EB]">POST</span>
                              <span className="text-[#111827] font-mono">/api/v1/auth/session</span>
                            </div>
                            <span className="text-emerald-600 font-bold">200 OK · 3.2ms</span>
                          </div>

                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">GET</span>
                              <span className="text-[#111827] font-mono">/api/v1/telemetry/stream</span>
                            </div>
                            <span className="text-emerald-600 font-bold">200 OK · 1.8ms (Cache)</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                          <span>Active Workers: 16 Async</span>
                          <span className="text-[#2563EB] font-bold">OpenTelemetry Traced</span>
                        </div>

                      </div>
                    ) : (
                      /* Technical Photography for Hardware Projects */
                      <div className="relative w-full h-full">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-xl bg-white/90 backdrop-blur-md border border-[#D5DFEB] text-[11px] text-[#2563EB] font-bold shadow-xs">
                          Physical Prototype
                        </div>
                      </div>
                    )}

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
