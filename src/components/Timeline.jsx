import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Server, BookOpen } from 'lucide-react';

/**
 * Timeline Section: EXPERIENCE / ACHIEVEMENTS
 * 
 * Calibrated: 70% Software Engineering · 30% Connected Edge & IoT
 * - Distributed Real-Time Cloud Platform & Collaborative State Engine (Software)
 * - Hackathon Winner — End-to-End Real-Time Telemetry Platform (Full-Stack & IoT)
 * - Scalable Microservices API & Observability Pipeline (Software Backend)
 * - Academic Foundation — B.Tech Computer Science & Engineering (Core CS)
 */
export default function Timeline() {
  const milestones = [
    {
      year: '2026',
      tag: 'CURRENT FLAGSHIP',
      title: 'Distributed Real-Time Cloud Platform & State Engine',
      category: 'FULL-STACK SOFTWARE & DISTRIBUTED SYSTEMS',
      description: 'Architected OmniSync and high-throughput microservices using React 19, TypeScript, WebSockets, and Redis Pub/Sub, achieving sub-15ms multi-tenant CRDT state convergence under high concurrency.',
      icon: Code2
    },
    {
      year: '2025',
      tag: 'HACKATHON WINNER',
      title: 'Smart Campus Real-Time Telemetry Platform — 1st Place',
      category: 'FULL-STACK & IOT INTEGRATION',
      description: 'Engineered an end-to-end platform connecting multi-node RF sensors to a live React digital twin and FastAPI backend in 36 hours. Awarded 1st place for zero-packet-drop reliability.',
      icon: Award
    },
    {
      year: '2025',
      tag: 'BACKEND ARCHITECTURE',
      title: 'Scalable Microservice API & Observability Pipeline',
      category: 'BACKEND & CLOUD SYSTEMS',
      description: 'Designed asynchronous Python FastAPI services with Redis in-memory caching, OpenTelemetry distributed tracing, and Docker containerization, serving 150k+ req/min with sub-10ms P99 latency.',
      icon: Server
    },
    {
      year: '2024',
      tag: 'ACADEMIC EXCELLENCE',
      title: 'B.Tech in Computer Science & Engineering (Ongoing)',
      category: 'CORE COMPUTATION & SYSTEMS',
      description: 'Current CGPA: 8.9 / 10.0. Focused coursework in Distributed Systems, Data Structures & Algorithms, Operating Systems, Database Management Systems, and Computer Networks.',
      icon: BookOpen
    }
  ];

  return (
    <section
      id="exploring"
      aria-label="Experience and Achievements"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
      {/* Invisible anchor for backward compatibility */}
      <div id="experience" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3 mb-14"
      >
        <div className="flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.2em] text-[#16D9E8] uppercase font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D9E8] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
          </span>
          <span>SYSTEM TRACE // 03</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          Experience &amp; Achievements
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
          A continuous trace of deployed web architectures, high-concurrency cloud services, hackathon championships, and foundational computer science research.
        </p>
      </motion.div>

      {/* Vertical Connected Timeline */}
      <div className="relative pl-8 sm:pl-12">
        
        {/* The single continuous line */}
        <div
          aria-hidden="true"
          className="absolute left-3 sm:left-4 top-3 bottom-6 w-[2px] bg-gradient-to-b from-[#16D9E8] via-[#3B82F6]/50 to-[#1A222B]"
        >
          {/* Animated signal dot traveling down the timeline line */}
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-2.5 h-4 -left-[3.5px] relative rounded-full bg-[#16D9E8] shadow-[0_0_12px_#16D9E8] opacity-80"
          />
        </div>

        <div className="space-y-10">
          {milestones.map((item, mIdx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: mIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                
                {/* Timeline node circle */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full bg-[#0A0D10] border-2 border-[#16D9E8] group-hover:scale-125 group-hover:shadow-[0_0_14px_#16D9E8] transition-all duration-300 flex items-center justify-center z-10"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16D9E8] inline-block animate-ping" />
                </div>

                {/* Milestone Content Card */}
                <div className="p-5 sm:p-6 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 hover:border-[#16D9E8]/50 hover:bg-[#141A21] transition-all duration-300 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A222B] pb-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono-tech text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#16D9E8]/10 text-[#16D9E8] border border-[#16D9E8]/30">
                        {item.year}
                      </span>
                      <div className="flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-wider text-[#71808D] font-medium">
                        <Icon className="w-3.5 h-3.5 text-[#16D9E8] shrink-0" />
                        <span>{item.category}</span>
                      </div>
                    </div>
                    <span className="font-mono-tech text-[10.5px] px-2.5 py-0.5 rounded border border-[#1A222B] bg-[#0A0D10] text-[#AAB5C0] font-medium">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F4F7FA] tracking-tight font-sans-editorial">
                    {item.title}
                  </h3>

                  <p className="text-[14px] sm:text-[14.5px] text-[#AAB5C0] leading-relaxed mt-2 font-normal">
                    {item.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
