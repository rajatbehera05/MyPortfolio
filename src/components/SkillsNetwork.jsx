import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Code2, Server, Database, Cpu, Sparkles, X, ArrowUpRight } from 'lucide-react';
import WireframeCube from './WireframeCube';

/**
 * Individual Card Personality Visual Accent
 */
function CardPersonalityAccent({ type }) {
  if (type === 'frontend') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {/* Subtle moving specular light reflection */}
        <motion.div
          animate={{
            x: ['-120%', '220%'],
            opacity: [0, 0.45, 0]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#3B82F6]/10 to-transparent skew-x-[-22deg]"
        />
      </div>
    );
  }

  if (type === 'backend') {
    return (
      <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-1.5 opacity-60">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
        </span>
      </div>
    );
  }

  if (type === 'database') {
    return (
      <div className="absolute -bottom-8 -right-8 pointer-events-none w-36 h-36 opacity-30">
        <motion.div
          animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full border border-[#2563EB]/40"
        />
        <motion.div
          animate={{ scale: [1, 1.45, 1], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          className="absolute inset-3 rounded-full border border-[#6366F1]/30"
        />
      </div>
    );
  }

  if (type === 'iot') {
    return (
      <div className="absolute bottom-3 right-4 pointer-events-none flex items-end gap-1 opacity-40">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{
              height: ['6px', '18px', '6px'],
              opacity: [0.35, 0.9, 0.35]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
            className="w-1 bg-[#2563EB] rounded-full"
          />
        ))}
      </div>
    );
  }

  return null;
}

/**
 * Interactive 3D Tilt Card with Radial Cursor Reflection & Magnetic Action Arrow
 */
function InteractiveSkillCard({ group, gIdx, selectedTech, setSelectedTech }) {
  const cardRef = useRef(null);
  const arrowRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [arrowOffset, setArrowOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current || (typeof window !== 'undefined' && window.innerWidth < 768)) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Relative percentage for radial light reflection
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;
    setMousePos({ x: xPct, y: yPct });

    // Subtle 3D tilt calculation (max ±4 degrees for ultra-refined feel)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = -((y - centerY) / centerY) * 4;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setArrowOffset({ x: 0, y: 0 });
  };

  // Magnetic hover effect for arrow button
  const handleArrowMouseMove = (e) => {
    if (prefersReducedMotion || !arrowRef.current) return;
    const rect = arrowRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const magneticX = (e.clientX - centerX) * 0.35;
    const magneticY = (e.clientY - centerY) * 0.35;
    setArrowOffset({ x: magneticX, y: magneticY });
  };

  const handleArrowMouseLeave = () => {
    setArrowOffset({ x: 0, y: 0 });
  };

  const Icon = group.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: gIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: prefersReducedMotion
          ? 'none'
          : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
      }}
      className="group relative aspect-auto sm:aspect-square min-h-[290px] sm:min-h-0 p-5 sm:p-6 rounded-2xl bg-white border border-[#D5DFEB] shadow-xs hover:shadow-[0_16px_36px_rgba(37,99,235,0.09)] transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden"
    >
      {/* Animated subtle gradient border overlay on hover */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 p-[1.5px] ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(135deg, rgba(37,99,235,0.45) 0%, rgba(139,92,246,0.3) 50%, rgba(56,189,248,0.45) 100%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
        aria-hidden="true"
      />

      {/* Moving cursor-responsive radial light reflection */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isHovered ? 0.8 : 0,
            background: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, rgba(224, 237, 255, 0.45), transparent 70%)`
          }}
          aria-hidden="true"
        />
      )}

      {/* Individual card personality visual indicator */}
      <CardPersonalityAccent type={group.type} />

      {/* Top section: Header & Description */}
      <div className="space-y-3 relative z-10">
        {/* Group Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20 shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-[#DBEAFE] transition-all duration-300">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111827] font-sans-editorial leading-snug group-hover:text-[#2563EB] transition-colors duration-200">
                {group.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] sm:text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] whitespace-nowrap">
              {group.focus}
            </span>

            {/* Magnetic Interactive Action Arrow */}
            <motion.div
              ref={arrowRef}
              onMouseMove={handleArrowMouseMove}
              onMouseLeave={handleArrowMouseLeave}
              animate={{ x: arrowOffset.x, y: arrowOffset.y }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="w-5 h-5 rounded-md flex items-center justify-center text-[#94A3B8] group-hover:text-[#2563EB] group-hover:bg-[#EFF6FF] transition-colors duration-200"
              aria-hidden="true"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </div>

        {/* Group Description */}
        <p className="text-[12.5px] sm:text-[13px] text-[#4B5563] leading-relaxed">
          {group.description}
        </p>
      </div>

      {/* Bottom section: Staggered Skill Tags with Lift on Hover */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.04,
              delayChildren: 0.15 + gIdx * 0.08
            }
          }
        }}
        className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 relative z-10"
      >
        {group.skills.map((skill) => {
          const isSelected = selectedTech?.name === skill.name;

          return (
            <motion.button
              key={skill.name}
              type="button"
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedTech(isSelected ? null : skill)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-[11.5px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                  : 'bg-[#F8FAFC] text-[#111827] border border-[#E2E8F0] hover:border-[#2563EB]/50 hover:bg-[#E8F1FF] hover:shadow-2xs'
              }`}
            >
              <span>{skill.name}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/**
 * Skills Section: ARCHITECTURAL TOOLKIT — Arctic Aurora Edition
 */
function SkillsNetwork() {
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
      className="max-w-[1380px] mx-auto px-4 sm:px-12 py-16 sm:py-24 border-t border-[#D5DFEB] relative"
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
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#64748B]">Architectural Competencies</span>
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
          <h2 className="font-editorial-serif text-[30px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-normal sm:font-medium tracking-tight text-[#0F172A] leading-tight">
            How I Apply My Toolkit
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
          className="text-[15px] sm:text-[16px] text-[#4B5563] max-w-2xl leading-relaxed"
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
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-5 max-w-[760px]"
              >
                <div className="p-4 sm:p-5 rounded-2xl border border-[#2563EB]/30 bg-[#E8F1FF]/60 text-[#111827] shadow-sm flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[12px] text-[#2563EB] font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>How I use {selectedTech.name} in my projects:</span>
                    </div>
                    <p className="text-[13.5px] text-[#1E3A8A] leading-relaxed font-medium">
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
        </div>

        {/* Right side: Kept as open space */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-5" aria-hidden="true" />
      </div>

    </section>
  );
}

export default React.memo(SkillsNetwork);
