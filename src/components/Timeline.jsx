import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Server, BookOpen, Milestone } from 'lucide-react';

/**
 * Timeline Section: JOURNEY & MILESTONES
 * 
 * - Desktop: Sophisticated Horizontal Timeline Progression
 * - Mobile: Responsive Vertical Timeline with Active Nodes
 * - Clean Arctic Blue nodes with subtle Lavender glow
 */
export default function Timeline() {
  const milestones = [
    {
      year: '2024',
      tag: 'Academics',
      title: 'Pursuing B.Tech in CSE',
      category: 'Core Computer Science',
      description: 'Maintaining an 8.9 / 10.0 cumulative GPA with deep coursework in Distributed Systems, Data Structures & Algorithms, OS, Computer Networks, and DBMS.',
      icon: BookOpen
    },
    {
      year: '2025',
      tag: 'Backend Systems',
      title: 'High-Throughput Microservices',
      category: 'Cloud Services & API Engineering',
      description: 'Designed asynchronous Python FastAPI endpoints with Redis in-memory caching and OpenTelemetry tracing, serving 150k+ requests/minute with sub-10ms P99 latency.',
      icon: Server
    },
    {
      year: '2025',
      tag: 'Competition',
      title: 'Telemetry Hackathon — 1st Place',
      category: 'Hackathon Championship',
      description: 'Led a team of three to build and deploy an end-to-end telemetry system combining multi-node wireless sensors with a live React web dashboard in 36 hours. Won 1st place.',
      icon: Award
    },
    {
      year: '2026',
      tag: 'Flagship Project',
      title: 'Real-Time State Sync Engine',
      category: 'Full-Stack Web & Distributed Systems',
      description: 'Engineered OmniSync, a collaborative canvas platform using React 19, TypeScript, and Redis Pub/Sub, achieving sub-15ms sync using conflict-free replicated data types (CRDTs).',
      icon: Code2
    }
  ];

  return (
    <section
      id="exploring"
      aria-label="Journey & Milestones"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#DCE4EF] relative"
    >
      <div id="experience" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="space-y-2.5 mb-16"
      >
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#2563EB] uppercase">
          <Milestone className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>The Aurora Progression</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-[#64748B]">Engineering Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] font-sans-editorial">
          My Journey So Far
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#4B5563] max-w-2xl leading-relaxed">
          A continuous timeline of academic foundations, high-throughput architectures, hackathon championships, and real-time distributed platforms.
        </p>
      </motion.div>

      {/* 1. Desktop Horizontal Timeline (Visible on lg screens >= 1024px) */}
      <div className="hidden lg:block relative pt-10 pb-8">
        
        {/* Horizontal Connecting Spine */}
        <div className="absolute top-18 left-8 right-8 h-1 bg-[#DCE4EF] rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#8B5CF6] origin-left rounded-full shadow-[0_0_12px_rgba(37,99,235,0.4)]"
          />
        </div>

        {/* 4 Horizontal Nodes and Milestone Cards */}
        <div className="grid grid-cols-4 gap-6 relative z-10">
          {milestones.map((item, mIdx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: mIdx * 0.15 }}
                className="flex flex-col items-center"
              >
                {/* Year Marker above node */}
                <div className="mb-2.5">
                  <span className="px-3 py-1 rounded-full text-[12px] font-mono font-bold bg-[#E8F1FF] text-[#2563EB] border border-[#2563EB]/25 shadow-2xs">
                    {item.year}
                  </span>
                </div>

                {/* Animated Constellation Node */}
                <div className="relative my-3 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white border-3 border-[#2563EB] shadow-[0_0_16px_rgba(37,99,235,0.45),0_0_24px_rgba(139,92,246,0.2)] flex items-center justify-center transition-transform duration-300 hover:scale-125">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  </div>
                </div>

                {/* Milestone Card */}
                <div className="w-full mt-4 p-5 rounded-2xl border border-[#DCE4EF] bg-white hover:border-[#2563EB]/40 hover:shadow-[0_12px_32px_rgba(37,99,235,0.08),0_0_20px_rgba(139,92,246,0.04)] transition-all duration-300 shadow-xs flex flex-col justify-between h-[230px]">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F1ECFF] text-[#8B5CF6] border border-[#8B5CF6]/25">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-[14.5px] font-bold text-[#111827] leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-[12px] text-[#4B5563] leading-relaxed line-clamp-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F1F5F9] text-[11px] font-semibold text-[#2563EB]">
                    {item.category}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Mobile & Tablet Vertical Timeline (Visible on screens < 1024px) */}
      <div className="lg:hidden relative pl-6 sm:pl-9 border-l-2 border-[#DCE4EF] ml-3 sm:ml-5 space-y-10">
        {milestones.map((item, mIdx) => {
          const Icon = item.icon;

          return (
            <motion.div 
              key={item.title} 
              initial={{ opacity: 0, x: -16, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: mIdx * 0.12 }}
              className="relative group"
            >
              {/* Activated node on the timeline line */}
              <div
                aria-hidden="true"
                className="absolute -left-[32px] sm:-left-[44px] top-2 w-4 h-4 rounded-full bg-white border-3 border-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.4),0_0_20px_rgba(139,92,246,0.15)] group-hover:scale-125 transition-all duration-300"
              />

              {/* Milestone Card */}
              <div className="p-5 sm:p-7 rounded-2xl border border-[#DCE4EF] bg-white hover:border-[#2563EB]/40 hover:shadow-[0_12px_32px_rgba(37,99,235,0.06),0_0_20px_rgba(139,92,246,0.04)] transition-all duration-300 shadow-xs space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1F5F9] pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[15px] font-bold text-[#111827]">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1ECFF] text-[#8B5CF6] border border-[#8B5CF6]/25">
                      {item.tag}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#E8F1FF] text-[#2563EB] border border-[#2563EB]/20">
                      {item.year}
                    </span>
                  </div>
                </div>

                <div className="text-[12px] font-medium text-[#2563EB]">
                  {item.category}
                </div>

                <p className="text-[13.5px] sm:text-[14px] text-[#4B5563] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
