import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Server, BookOpen } from 'lucide-react';

/**
 * Timeline Section: JOURNEY & MILESTONES
 * 
 * Clean, readable milestone track:
 * - Real accomplishments and outcomes
 * - Human, approachable storytelling
 */
export default function Timeline() {
  const milestones = [
    {
      year: '2026',
      tag: 'Flagship Project',
      title: 'Building Real-Time Multiplayer Software',
      category: 'Full-Stack Web & Distributed Systems',
      description: 'Engineered OmniSync, a collaborative canvas platform using React 19, TypeScript, and Redis Pub/Sub, achieving sub-15ms document synchronization using conflict-free replicated data types (CRDTs).',
      icon: Code2
    },
    {
      year: '2025',
      tag: 'Competition',
      title: 'Smart Campus Telemetry Hackathon — 1st Place',
      category: 'Hackathon Championship',
      description: 'Led a team of three to build and deploy an end-to-end telemetry system combining multi-node wireless sensors with a live React web dashboard in 36 hours. Won 1st place for zero-packet-drop reliability.',
      icon: Award
    },
    {
      year: '2025',
      tag: 'Backend Systems',
      title: 'High-Throughput Microservice Architecture',
      category: 'Cloud Services & API Engineering',
      description: 'Designed asynchronous Python FastAPI endpoints with Redis in-memory caching and OpenTelemetry distributed tracing, serving 150k+ requests/minute with sub-10ms P99 latency.',
      icon: Server
    },
    {
      year: '2024',
      tag: 'Academics',
      title: 'Pursuing B.Tech in Computer Science & Engineering',
      category: 'Core Computer Science',
      description: 'Maintaining an 8.9 / 10.0 cumulative GPA with deep coursework in Distributed Systems, Data Structures & Algorithms, Operating Systems, Computer Networks, and Database Management.',
      icon: BookOpen
    }
  ];

  return (
    <section
      id="exploring"
      aria-label="Journey & Milestones"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
      <div id="experience" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="space-y-2.5 mb-12"
      >
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#16D9E8] uppercase">
          <span>Milestones</span>
          <span className="text-[#232D36]">•</span>
          <span className="text-[#AAB5C0]">Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          My Journey So Far
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
          A continuous timeline of projects built, competitions won, and foundational computer science research.
        </p>
      </motion.div>

      {/* Clean Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l border-[#232D36] ml-3 sm:ml-4 space-y-9">
        {milestones.map((item, mIdx) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.title} 
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: mIdx * 0.1 }}
              className="relative group"
            >
              
              {/* Clean node circle on the left timeline line */}
              <div
                aria-hidden="true"
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0E1319] border-2 border-[#16D9E8] group-hover:scale-125 transition-all duration-200"
              />

              {/* Milestone Card */}
              <div className="p-5 sm:p-6 rounded-2xl border border-[#1A222B] bg-[#0E1319]/80 hover:border-[#2A3744] hover:bg-[#121820] transition-all duration-300 shadow-md space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A222B] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold px-2.5 py-0.5 rounded-md bg-[#16D9E8]/10 text-[#16D9E8] border border-[#16D9E8]/20">
                      {item.year}
                    </span>
                    <div className="flex items-center gap-2 text-[12px] text-[#71808D] font-medium">
                      <Icon className="w-3.5 h-3.5 text-[#16D9E8] shrink-0" />
                      <span>{item.category}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-[#232D36] bg-[#141A21] text-[#AAB5C0]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F4F7FA] tracking-tight font-sans-editorial">
                  {item.title}
                </h3>

                <p className="text-[14.5px] text-[#AAB5C0] leading-relaxed font-normal">
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
