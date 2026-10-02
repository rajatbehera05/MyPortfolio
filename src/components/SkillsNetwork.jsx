import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Cpu, Sparkles, X } from 'lucide-react';

/**
 * Skills Section: ARCHITECTURAL TOOLKIT — Arctic Aurora Edition
 */
export default function SkillsNetwork() {
  const [selectedTech, setSelectedTech] = useState(null);

  const skillGroups = [
    {
      title: 'Frontend & User Interface',
      focus: 'Client Architecture',
      icon: Code2,
      description: 'Crafting responsive, high-performance web applications with modern state management, strict typing, and polished interactions.',
      skills: [
        { name: 'React 19', detail: 'Components, suspense boundaries, optimistic updates, and performance profiling.' },
        { name: 'JavaScript (ES6+)', detail: 'Modern async patterns, DOM events, promises, and clean module composition.' },
        { name: 'CSS & Tailwind', detail: 'Design system implementation, fluid responsive layouts, and clean modern styling.' },
        { name: 'HTML5 Semantic DOM', detail: 'Accessible structuring, semantic landmarks, and SEO metadata.' }
      ]
    },
    {
      title: 'Backend Services & APIs',
      focus: 'Distributed Services',
      icon: Server,
      description: 'Building asynchronous backend architectures, high-concurrency microservices, and reliable communication protocols.',
      skills: [
        { name: 'Node.js', detail: 'Non-blocking I/O event loops, stream processing, and server-side runtimes.' },
        { name: 'Express.js', detail: 'RESTful API routing, JWT session handling, and middleware pipelines.' },
        { name: 'REST APIs', detail: 'Clean API contract versioning, JSON data serialization, and status codes.' },
        { name: 'WebSockets', detail: 'Sub-20ms bi-directional streaming for real-time collaboration and telemetry feeds.' }
      ]
    },
    {
      title: 'Databases & Developer Tooling',
      focus: 'Data & DevOps',
      icon: Database,
      description: 'Designing durable relational data schemas, containerized development workflows, and automated version control.',
      skills: [
        { name: 'PostgreSQL', detail: 'Relational data modeling, index optimization, complex queries, and ACID guarantees.' },
        { name: 'MySQL', detail: 'Relational table design, foreign key constraints, and transactional consistency.' },
        { name: 'SQL Queries', detail: 'Declarative queries, multi-table joins, subqueries, and aggregations.' },
        { name: 'Docker & Git', detail: 'Reproducible container environments, branch workflows, and GitHub collaboration.' }
      ]
    },
    {
      title: 'Connected IoT & Embedded Hardware',
      focus: 'Edge & Hardware',
      icon: Cpu,
      description: 'Bridging high-level cloud software with physical microcontrollers, low-power telemetry, and sensor protocols.',
      skills: [
        { name: 'ESP32 Microcontrollers', detail: 'Dual-core Xtensa microcontrollers, Wi-Fi connectivity, and hardware peripherals.' },
        { name: 'Arduino Ecosystem', detail: 'Board prototyping, hardware pins, PWM servo control, and analog/digital I/O.' },
        { name: 'Arduino IDE', detail: 'Firmware compilation, serial baud monitoring, and hardware flashing.' },
        { name: 'Sensors (IR/Optical)', detail: 'Infrared vehicle detection, distance rangefinding, and circuit interfacing.' }
      ]
    }
  ];

  return (
    <section
      id="skills-network"
      aria-label="Skills & Technologies"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#DCE4EF] relative"
    >
      <div id="skills" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="space-y-2.5 mb-14"
      >
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#2563EB] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span>Toolkit</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-[#64748B]">Architectural Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] font-sans-editorial">
          How I Apply My Toolkit
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#4B5563] max-w-2xl leading-relaxed">
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
              className="p-6 sm:p-7 rounded-2xl border border-[#DCE4EF] bg-white hover:border-[#2563EB]/40 transition-all duration-300 space-y-4 shadow-xs hover:shadow-[0_12px_28px_rgba(37,99,235,0.06)]"
            >
              {/* Group Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] font-sans-editorial">
                      {group.title}
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]">
                  {group.focus}
                </span>
              </div>

              {/* Group Description */}
              <p className="text-[13.5px] text-[#4B5563] leading-relaxed">
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
                          ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                          : 'bg-[#F8FAFC] text-[#111827] border border-[#E2E8F0] hover:border-[#2563EB]/50 hover:bg-[#E8F1FF]'
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
            <div className="p-4 sm:p-5 rounded-2xl border border-[#2563EB]/30 bg-[#E8F1FF]/60 text-[#111827] shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[12px] text-[#2563EB] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>How I use {selectedTech.name} in my projects:</span>
                </div>
                <p className="text-[14px] text-[#1E3A8A] leading-relaxed font-medium">
                  {selectedTech.detail}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTech(null)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-white transition-colors cursor-pointer shrink-0"
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
