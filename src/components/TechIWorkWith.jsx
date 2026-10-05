import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network } from 'lucide-react';
import WireframeCube from './WireframeCube';
import { TechIcons } from './TechIcons';


/**
 * Core Technologies categorized into clean engineering domains
 */
const TECH_CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'languages', label: 'Languages' },
  { id: 'web', label: 'Web Development' },
  { id: 'databases', label: 'Databases' },
  { id: 'iot', label: 'IoT & Embedded' },
  { id: 'tools', label: 'Developer Tools' },
];

const TECHNOLOGIES = [
  // 1. Languages
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    categoryLabel: 'Languages',
    icon: TechIcons.Java,
    accentColor: '#EA2D2E',
    tag: 'OOP & Systems',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    categoryLabel: 'Languages',
    icon: TechIcons.JavaScript,
    accentColor: '#F7DF1E',
    tag: 'ES6+ & Async',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'languages',
    categoryLabel: 'Databases',
    icon: TechIcons.SQL,
    accentColor: '#2563EB',
    tag: 'Queries & Schemas',
  },

  // 2. Web Development
  {
    id: 'react',
    name: 'React.js',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.React,
    accentColor: '#0284C7',
    tag: 'UI & State',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.NodeJS,
    accentColor: '#339933',
    tag: 'Event Loop & I/O',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.ExpressJS,
    accentColor: '#2563EB',
    tag: 'REST APIs',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.HTML5,
    accentColor: '#E34F26',
    tag: 'Semantic DOM',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.CSS,
    accentColor: '#1572B6',
    tag: 'Modern Layouts',
  },

  // 3. Databases (Prominently featured)
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'databases',
    categoryLabel: 'Databases',
    icon: TechIcons.PostgreSQL,
    accentColor: '#336791',
    tag: 'Relational DB',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    categoryLabel: 'Databases',
    icon: TechIcons.MySQL,
    accentColor: '#00758F',
    tag: 'Relational DB',
  },

  // 4. IoT & Embedded
  {
    id: 'esp32',
    name: 'ESP32',
    category: 'iot',
    categoryLabel: 'IoT & Embedded',
    icon: TechIcons.ESP32,
    accentColor: '#2563EB',
    tag: 'Wi-Fi & SoC',
  },
  {
    id: 'arduino',
    name: 'Arduino',
    category: 'iot',
    categoryLabel: 'IoT & Embedded',
    icon: TechIcons.Arduino,
    accentColor: '#00979C',
    tag: 'Hardware Circuits',
  },
  {
    id: 'arduino-ide',
    name: 'Arduino IDE',
    category: 'iot',
    categoryLabel: 'IoT & Embedded',
    icon: TechIcons.ArduinoIDE,
    accentColor: '#008184',
    tag: 'Embedded Firmware',
  },

  // 5. Developer Tools & DevOps
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    categoryLabel: 'Developer Tools',
    icon: TechIcons.Git,
    accentColor: '#F05032',
    tag: 'Version Control',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    categoryLabel: 'Developer Tools',
    icon: TechIcons.GitHub,
    accentColor: '#111827',
    tag: 'CI/CD & Collab',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    categoryLabel: 'Developer Tools',
    icon: TechIcons.Docker,
    accentColor: '#2496ED',
    tag: 'Containers & Env',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    categoryLabel: 'Developer Tools',
    icon: TechIcons.VSCode,
    accentColor: '#007ACC',
    tag: 'Primary Editor',
  },
];

/**
 * Technology Constellation — Arctic Aurora Clean Edition
 */
export default function TechIWorkWith() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTech = activeCategory === 'all'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter((t) => {
        if (activeCategory === 'languages') return t.category === 'languages' || t.id === 'sql';
        if (activeCategory === 'databases') return t.category === 'databases' || t.id === 'postgresql' || t.id === 'mysql' || t.id === 'sql';
        return t.category === activeCategory;
      });

  return (
    <motion.section
      id="tech"
      aria-label="Tech I Work With"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-12 sm:py-16 border-t border-[#D5DFEB] relative"
    >
      {/* Background Decorative Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E8F1FF]/70 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="space-y-2.5"
        >
          {/* Subtle Decorative Tag matching portfolio design */}
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-[#2563EB]/20 bg-[#E8F1FF] text-[#2563EB] text-[11px] font-semibold tracking-wider uppercase">
              <Network className="w-3 h-3 text-[#2563EB]" />
              <span>The Aurora Tech Stack</span>
              <span className="text-[#CBD5E1]">•</span>
              <span className="text-[#64748B]">Core Tools &amp; Ecosystem</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <WireframeCube
              size={36}
              color="#EF4444"
              tiltX={20}
              tiltZ={-10}
              duration={16}
              divisions={3}
              floating={false}
              className="shrink-0"
            />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] font-sans-editorial">
              Tech I Work With
            </h2>
          </div>

          <p className="text-[14px] sm:text-[15px] text-[#4B5563] max-w-xl leading-relaxed">
            Tools and technologies I use to build software, web applications, and connected IoT systems.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white border border-[#D5DFEB] shadow-xs w-fit"
          role="tablist"
          aria-label="Filter technology categories"
        >
          {TECH_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3 py-1.5 rounded-lg text-[11.5px] font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTechCategory"
                    className="absolute inset-0 rounded-lg bg-[#2563EB] shadow-[0_2px_12px_rgba(37,99,235,0.35)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Responsive Compact Technology Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredTech.map((tech, idx) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.015 }}
                className="group relative rounded-xl p-3 sm:p-3.5 transition-all duration-200 ease-out flex flex-col justify-between cursor-pointer overflow-hidden bg-white border border-[#D5DFEB] hover:border-[#2563EB]/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(37,99,235,0.07)]"
              >
                {/* Top Section: Icon & Category Indicator */}
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    {/* Technology Brand Icon container */}
                    <div className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-lg border flex items-center justify-center p-1.5 transition-all duration-200 shadow-xs bg-[#F8FAFC] border-[#E2E8F0] group-hover:scale-105 group-hover:bg-[#EFF6FF] group-hover:border-[#2563EB]/40 shrink-0">
                      <Icon className="w-full h-full object-contain" />
                    </div>

                    {/* Category Indicator Badge */}
                    <span className="text-[9.5px] sm:text-[10px] font-medium text-[#64748B] group-hover:text-[#2563EB] transition-colors duration-200 px-1.5 py-0.5 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] tracking-tight truncate max-w-[95px]">
                      {tech.categoryLabel}
                    </span>
                  </div>

                  {/* Technology Name */}
                  <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors duration-200 tracking-tight leading-tight">
                    {tech.name}
                  </h3>
                </div>

                {/* Bottom Section: Subtle Subtitle/Descriptor Tag */}
                <div className="pt-1.5 border-t border-[#F1F5F9] flex items-center justify-between mt-2 text-[10.5px] sm:text-[11px] text-[#64748B] group-hover:text-[#111827] transition-colors leading-none">
                  <span className="truncate">{tech.tag}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1] group-hover:bg-[#2563EB] transition-colors duration-200 shrink-0 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Engineering Footer Summary Pill */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 sm:mt-7 flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 rounded-xl bg-white border border-[#D5DFEB] shadow-xs text-[12px] text-[#64748B]"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
          <span className="text-[#111827] font-semibold">17 Verified Technologies</span>
          <span>across web development, embedded systems, and database architecture</span>
        </div>
        <div className="flex items-center gap-3 text-[11.5px]">
          <span className="text-[#2563EB] font-medium">Production-tested</span>
        </div>
      </motion.div>
    </motion.section>
  );
}
