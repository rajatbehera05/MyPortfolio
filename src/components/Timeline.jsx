import React from 'react';
import { Award, Cpu, BookOpen, Briefcase } from 'lucide-react';

/**
 * Timeline Section: EXPERIENCE / ACHIEVEMENTS
 * 
 * Strict Constitution & Enhancement Guidelines:
 * - Vertical connected timeline
 * - A single line connects important milestones
 * - Each milestone uses the exact same node language as the global network
 * - Graphite palette with electric cyan #16D9E8
 */
export default function Timeline() {
  const milestones = [
    {
      year: '2026',
      tag: 'CURRENT MILESTONE',
      title: 'Flagship Autonomous IoT & Micro-LiDAR Node',
      category: 'ENGINEERING LAB & PROTOTYPING',
      description: 'Engineered ParkSense v1.2 with custom dual-layer KiCAD PCB, ESP32-S3 microcontroller, and low-power FreeRTOS tasks streaming sub-second telemetry over TLS MQTT.',
      icon: Cpu
    },
    {
      year: '2025',
      tag: 'HACKATHON WINNER',
      title: 'Smart Campus Edge Telemetry Hackathon — 1st Place',
      category: 'COMPETITION & DEPLOYMENT',
      description: 'Built and deployed a multi-node RF mesh network in 36 hours. Demonstrated zero-packet-drop telemetry under high-interference campus RF conditions.',
      icon: Award
    },
    {
      year: '2025',
      tag: 'RESEARCH & FIRMWARE',
      title: 'Quantized Edge AI Anomaly Detection Pipeline',
      category: 'APPLIED AI RESEARCH',
      description: 'Implemented an INT8 TinyML convolutional neural network running on ARM Cortex-M4 microcontroller for real-time acoustic motor fault classification with <15ms latency.',
      icon: BookOpen
    },
    {
      year: '2024',
      tag: 'ACADEMIC EXCELLENCE',
      title: 'B.Tech in Computer Science & Engineering (Ongoing)',
      category: 'CORE COMPUTATION & SYSTEMS',
      description: 'Current CGPA: 8.9 / 10.0. Focused coursework in Computer Architecture, Operating Systems, Distributed Systems, Microcontrollers, and Network Security.',
      icon: Briefcase
    }
  ];

  return (
    <section
      id="experience"
      aria-label="Experience and Achievements"
      className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 border-t border-[var(--border-subtle)]"
    >
      {/* Section Header */}
      <div className="space-y-2 mb-14">
        <div className="flex items-center gap-2 font-mono-tech text-[12px] tracking-widest text-[var(--accent-cyan)] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
          <span>SYSTEM TRACE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          EXPERIENCE &amp; ACHIEVEMENTS
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] max-w-2xl">
          A continuous engineering trace of deployed prototypes, hackathon solutions, and research initiatives.
        </p>
      </div>

      {/* Vertical Connected Timeline (Single continuous connecting line) */}
      <div className="relative pl-6 sm:pl-10">
        
        {/* The single continuous line */}
        <div
          aria-hidden="true"
          className="absolute left-2.5 sm:left-4 top-3 bottom-4 w-[1.5px] bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-cyan)]/30 to-[#29323C]"
        />

        <div className="space-y-10">
          {milestones.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="relative group">
                
                {/* Timeline node circle: matches global network node style */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0E1217] border-2 border-[var(--accent-cyan)] group-hover:scale-125 transition-transform duration-200 flex items-center justify-center"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--accent-cyan)] inline-block animate-node-pulse" />
                </div>

                {/* Milestone Content Card */}
                <div className="system-panel p-5 sm:p-6 bg-[#141A21]/75 transition-all duration-200 hover:border-[var(--accent-cyan-border)] hover:bg-[#181F27]/85">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono-tech text-[13px] font-semibold text-[var(--accent-cyan)]">
                        {item.year}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                        <Icon className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0" />
                        <span>{item.category}</span>
                      </div>
                    </div>
                    <span className="font-mono-tech text-[11px] px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[#0E1217] text-[var(--text-secondary)]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-[14px] sm:text-[14.5px] text-[var(--text-secondary)] leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
