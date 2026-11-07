import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Cpu, Sparkles, X, ArrowUpRight } from 'lucide-react';
import WireframeCube from './WireframeCube';

/**
 * Premium Clean White Technology Category Card
 * Sharp edges, subtle grey border, natural physical elevation, uniform visual language
 */
function InteractiveSkillCard({ group, gIdx, selectedTech, setSelectedTech, isNight = false }) {
  const Icon = group.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: gIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className={`group relative aspect-auto sm:aspect-square min-h-[280px] sm:min-h-0 p-5 sm:p-6 rounded-xl border transition-all duration-200 ease-out flex flex-col justify-between ${
        isNight
          ? 'bg-[#0E1A2F] border-[#1E2E4A] hover:border-[#38BDF8]/40 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]'
          : 'bg-[#FFFFFF] border-[#E2E8F0] hover:border-[#CBD5E1] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.03)]'
      }`}
    >
      {/* Top section: Header & Description */}
      <div className="space-y-3 relative z-10">
        {/* Group Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0">
            <div
              className={`w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200 ${
                isNight
                  ? 'bg-[#162744] text-[#60A5FA] border border-[#1E3A66]'
                  : 'bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h3
                className={`text-[15px] sm:text-[16px] font-semibold leading-snug transition-colors duration-200 ${
                  isNight ? 'text-[#F1F5FF]' : 'text-[#0F172A]'
                }`}
              >
                {group.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`text-[10px] sm:text-[10.5px] font-medium px-2 py-0.5 rounded-md border whitespace-nowrap ${
                isNight
                  ? 'bg-[#132238] text-[#94A3B8] border-[#1E2E4A]'
                  : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
              }`}
            >
              {group.focus}
            </span>

            {/* Restrained Action Arrow */}
            <div
              className={`w-5 h-5 rounded flex items-center justify-center transition-colors duration-200 ${
                isNight
                  ? 'text-[#64748B] group-hover:text-[#60A5FA]'
                  : 'text-[#94A3B8] group-hover:text-[#2563EB]'
              }`}
              aria-hidden="true"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Group Description */}
        <p
          className={`text-[12.5px] sm:text-[13px] leading-relaxed ${
            isNight ? 'text-[#94A3B8]' : 'text-[#475569]'
          }`}
        >
          {group.description}
        </p>
      </div>

      {/* Bottom section: Technology Badges */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 relative z-10">
        {group.skills.map((skill) => {
          const isSelected = selectedTech?.name === skill.name;

          return (
            <button
              key={skill.name}
              type="button"
              onClick={() => setSelectedTech(isSelected ? null : skill)}
              className={`px-2.5 py-1 rounded-md text-[11px] sm:text-[11.5px] font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#2563EB] text-white border border-[#2563EB] shadow-xs'
                  : isNight
                  ? 'bg-[#132238] text-[#CBD5E1] border border-[#1E2E4A] hover:border-[#38BDF8]/40 hover:bg-[#182C4A]'
                  : 'bg-[#FFFFFF] text-[#334155] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
              }`}
            >
              <span>{skill.name}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/**
 * Skills Section: ARCHITECTURAL TOOLKIT
 */
function SkillsNetwork({ isNight = false }) {
  const [selectedTech, setSelectedTech] = useState(null);

  const skillGroups = [
    {
      type: 'frontend',
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
      type: 'backend',
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
      type: 'database',
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
      type: 'iot',
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
      className={`max-w-[1380px] mx-auto px-4 sm:px-12 py-16 sm:py-24 border-t relative ${
        isNight ? 'border-[#1E2E4A]' : 'border-[#D5DFEB]'
      }`}
    >
      <div id="skills" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Header with independent staggered animations */}
      <div className="space-y-2.5 mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#2563EB] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span>Toolkit</span>
            <span className={isNight ? 'text-[#334155]' : 'text-[#CBD5E1]'}>•</span>
            <span className={isNight ? 'text-[#94A3B8]' : 'text-[#64748B]'}>Architectural Competencies</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="flex items-center gap-3 sm:gap-4"
        >
          <WireframeCube
            size={36}
            color="#EAB308"
            tiltX={22}
            tiltZ={-12}
            duration={16}
            divisions={3}
            floating={false}
            className="shrink-0"
          />
          <h2
            className={`font-editorial-serif text-[30px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-normal sm:font-medium tracking-tight leading-tight ${
              isNight ? 'text-[#F1F5FF]' : 'text-[#0F172A]'
            }`}
          >
            How I Apply My Toolkit
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
          className={`text-[15px] sm:text-[16px] max-w-2xl leading-relaxed ${
            isNight ? 'text-[#94A3B8]' : 'text-[#475569]'
          }`}
        >
          I enjoy working across the whole spectrum: building modern, accessible web apps and backend services, while maintaining a strong grip on hardware and low-level code.
        </motion.p>
      </div>

      {/* 4 Clean Square Skill Group Cards with Space on Right Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 4 Square Cards in a 2x2 grid */}
        <div className="lg:col-span-8 xl:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-[760px] mx-auto sm:mx-0">
            {skillGroups.map((group, gIdx) => (
              <InteractiveSkillCard
                key={group.title}
                group={group}
                gIdx={gIdx}
                selectedTech={selectedTech}
                setSelectedTech={setSelectedTech}
                isNight={isNight}
              />
            ))}
          </div>

          {/* Selected Skill Detail Modal/Card */}
          <AnimatePresence>
            {selectedTech && (
              <motion.div
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 8, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-4 max-w-[760px]"
              >
                <div
                  className={`p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-4 ${
                    isNight
                      ? 'bg-[#0E1A2F] border-[#1E2E4A] text-[#F1F5FF] shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                      : 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0F172A] shadow-[0_2px_10px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[12px] text-[#2563EB] font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>How I use {selectedTech.name} in my projects:</span>
                    </div>
                    <p
                      className={`text-[13px] sm:text-[13.5px] leading-relaxed ${
                        isNight ? 'text-[#CBD5E1]' : 'text-[#334155]'
                      }`}
                    >
                      {selectedTech.detail}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedTech(null)}
                    className={`p-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                      isNight
                        ? 'text-[#94A3B8] hover:text-white hover:bg-[#162744]'
                        : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                    }`}
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side: Kept as open space */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-5" aria-hidden="true" />
      </div>
    </section>
  );
}

export default React.memo(SkillsNetwork);
