import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Cpu, Sparkles, X } from 'lucide-react';

/**
 * Skills Section: SKILLS & TECHNOLOGIES
 * 
 * Clean, human, organized presentation of engineering toolkit:
 * - 70% Software Development (Frontend, Backend, Databases, Cloud)
 * - 30% Connected Edge & Embedded Systems
 */
export default function SkillsNetwork() {
  const [selectedTech, setSelectedTech] = useState(null);

  const skillGroups = [
    {
      title: 'Frontend & User Interface',
      focus: '70% Software Focus',
      icon: Code2,
      description: 'Crafting responsive, high-performance web applications with modern state management, strict typing, and polished interactions.',
      skills: [
        { name: 'React 19', detail: 'Server and client components, suspense boundaries, optimistic updates, and performance profiling.' },
        { name: 'TypeScript', detail: 'Strict type contracts, generic utility types, and runtime schema validation with Zod.' },
        { name: 'Next.js', detail: 'App router, server-side rendering, API routes, and optimized production deployments.' },
        { name: 'Tailwind CSS', detail: 'Design system implementation, fluid responsive layouts, and clean dark mode theming.' },
        { name: 'Zustand & State', detail: 'Predictable lightweight state stores, event-driven mutators, and CRDT sync state.' }
      ]
    },
    {
      title: 'Backend Services & APIs',
      focus: '70% Software Focus',
      icon: Server,
      description: 'Building asynchronous backend architectures, high-concurrency microservices, and reliable communication protocols.',
      skills: [
        { name: 'Node.js & Express', detail: 'Non-blocking I/O event loops, JWT session handling, and RESTful microservices.' },
        { name: 'Python & FastAPI', detail: 'High-throughput async endpoints, background tasks, and clean data modeling.' },
        { name: 'WebSockets & SSE', detail: 'Sub-20ms bi-directional streaming for real-time collaboration and telemetry feeds.' },
        { name: 'REST & gRPC', detail: 'Clean API contract versioning, OpenAPI documentation, and protocol buffer schemas.' }
      ]
    },
    {
      title: 'Databases & Cloud Infrastructure',
      focus: '70% Software Focus',
      icon: Database,
      description: 'Designing durable relational data schemas, sub-millisecond in-memory caching tiers, and containerized deployments.',
      skills: [
        { name: 'PostgreSQL', detail: 'Relational data modeling, index optimization, complex queries, and ACID guarantees.' },
        { name: 'Redis Cache', detail: 'In-memory key-value caching, Pub/Sub event broadcasting, and distributed locking.' },
        { name: 'Docker', detail: 'Multi-stage container builds, local development orchestration, and reproducible services.' },
        { name: 'Git & GitHub Actions', detail: 'Automated CI/CD testing, linting workflows, and pull request reviews.' }
      ]
    },
    {
      title: 'Connected IoT & Embedded Hardware',
      focus: '30% Hardware Bridge',
      icon: Cpu,
      description: 'Bridging high-level cloud software with physical microcontrollers, low-power telemetry, and sensor protocols.',
      skills: [
        { name: 'ESP32 & C++', detail: 'Dual-core Xtensa microcontrollers, bare-metal hardware registers, and peripheral buses.' },
        { name: 'FreeRTOS Kernel', detail: 'Preemptive multi-tasking, binary semaphores, queues, and watchdog timers.' },
        { name: 'MQTT Protocol', detail: 'Lightweight publish/subscribe messaging over TLS for remote telemetry collection.' },
        { name: 'Sensors (I2C/SPI)', detail: 'Optical LiDAR rangefinding, IMUs, environmental sensors, and hardware debugging.' }
      ]
    }
  ];

  return (
    <section
      id="tech"
      aria-label="Skills & Technologies"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
      <div id="skills" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="space-y-2.5 mb-12"
      >
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#16D9E8] uppercase">
          <span>Toolkit</span>
          <span className="text-[#232D36]">•</span>
          <span className="text-[#AAB5C0]">Skills &amp; Technologies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          What I Work With
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
          I enjoy working across the whole spectrum: building modern, accessible web apps and backend services, while maintaining a strong grip on hardware and low-level code.
        </p>
      </motion.div>

      {/* 4 Clean Skill Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, gIdx) => {
          const Icon = group.icon;

          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: gIdx * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl border border-[#1A222B] bg-[#0E1319]/80 hover:border-[#2A3744] hover:bg-[#121820] transition-all duration-300 space-y-4 shadow-lg"
            >
              {/* Group Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#16D9E8]/10 text-[#16D9E8] flex items-center justify-center border border-[#16D9E8]/20">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F4F7FA] font-sans-editorial">
                      {group.title}
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#141A21] text-[#AAB5C0] border border-[#232D36]">
                  {group.focus}
                </span>
              </div>

              {/* Group Description */}
              <p className="text-[13.5px] text-[#AAB5C0] leading-relaxed">
                {group.description}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill) => {
                  const isSelected = selectedTech?.name === skill.name;

                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setSelectedTech(isSelected ? null : skill)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#16D9E8] text-[#0A0D10] font-semibold shadow-xs'
                          : 'bg-[#141A21] text-[#F4F7FA] border border-[#1A222B] hover:border-[#16D9E8]/50 hover:bg-[#1A222B]'
                      }`}
                    >
                      <span>{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Skill Detail Modal/Card */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mt-6"
          >
            <div className="p-4 sm:p-5 rounded-xl border border-[#16D9E8]/40 bg-[#141A21] text-[#F4F7FA] shadow-xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[12px] text-[#16D9E8] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>How I use {selectedTech.name} in my projects:</span>
                </div>
                <p className="text-[14px] text-[#AAB5C0] leading-relaxed">
                  {selectedTech.detail}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTech(null)}
                className="p-1.5 rounded-lg text-[#71808D] hover:text-[#F4F7FA] hover:bg-[#1E2732] transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
