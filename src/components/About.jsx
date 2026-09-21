import React from 'react';
import { Terminal, ShieldCheck, Cpu, GitBranch } from 'lucide-react';

/**
 * About Section: ABOUT / NODE_01
 * 
 * Strict Constitution & Enhancement Guidelines:
 * - Section label: ABOUT / NODE_01
 * - Minimal, technical, consistent typography, borders, and network language
 * - Graphite surfaces (#141A21) with thin #29323C borders
 */
export default function About() {
  return (
    <section
      id="about"
      aria-label="About Node 01"
      className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 border-t border-[var(--border-subtle)]"
    >
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center gap-2 font-mono-tech text-[12px] tracking-widest text-[var(--accent-cyan)] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
          <span>IDENTITY // CORE SPECIFICATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          ABOUT / NODE_01
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-[16px] sm:text-[17px] text-[var(--text-secondary)] leading-relaxed font-normal">
            I am a Computer Science &amp; Engineering student who believes that the most meaningful computational problems exist where code meets the physical environment.
          </p>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Rather than confining software strictly to browser sandboxes or cloud containers, I design systems that span the entire execution chain: from silicon registers and interrupt handlers on an ESP32 or STM32, across deterministic RTOS queues and low-latency RF meshes, into applied TinyML models and resilient cloud interfaces.
          </p>

          {/* Three Core Engineering Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan-border)] transition-colors space-y-2 shadow-2xs">
              <Cpu className="w-4 h-4 text-[var(--accent-cyan)]" />
              <h3 className="font-mono-tech text-[12px] font-bold text-[var(--text-primary)]">
                HARDWARE AWARENESS
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] leading-normal">
                Writing algorithms with strict cache, RAM, and battery power consciousness.
              </p>
            </div>

            <div className="p-4 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan-border)] transition-colors space-y-2 shadow-2xs">
              <GitBranch className="w-4 h-4 text-[var(--accent-cyan)]" />
              <h3 className="font-mono-tech text-[12px] font-bold text-[var(--text-primary)]">
                DETERMINISTIC RTOS
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] leading-normal">
                Preventing race conditions and task deadlocks under high-frequency telemetry bursts.
              </p>
            </div>

            <div className="p-4 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan-border)] transition-colors space-y-2 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-cyan)]" />
              <h3 className="font-mono-tech text-[12px] font-bold text-[var(--text-primary)]">
                FAULT TOLERANCE
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] leading-normal">
                Designing watchdog resets, non-volatile state saves, and self-healing RF networks.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Technical Telemetry Card — High-contrast dark obsidian hardware card */}
        <div className="lg:col-span-5 rounded-lg p-6 space-y-5 bg-[#0F172A] border border-slate-800 shadow-xl text-slate-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-mono-tech text-[12px] text-white font-bold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>NODE_METADATA.JSON</span>
            </div>
            <span className="font-mono-tech text-[10px] text-cyan-400 uppercase font-semibold">
              READ_ONLY
            </span>
          </div>

          <div className="space-y-3 font-mono-tech text-[12px]">
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">OPERATOR:</span>
              <span className="text-white font-semibold">Rajat Behera</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">DEGREE:</span>
              <span className="text-slate-200">B.Tech Computer Science &amp; Eng.</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">CUMULATIVE_GPA:</span>
              <span className="text-cyan-400 font-bold">8.9 / 10.0</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">SPECIALIZATION:</span>
              <span className="text-slate-200">IoT, Embedded Systems &amp; TinyML</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">PROTOTYPES_DEPLOYED:</span>
              <span className="text-white font-medium">6 Physical Systems</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">HACKATHONS:</span>
              <span className="text-cyan-400 font-bold">3x First Place Winner</span>
            </div>
          </div>

          <div className="p-3 rounded border border-slate-800 bg-[#0B0F17] text-[11px] font-mono-tech text-slate-300 leading-relaxed">
            <span className="text-cyan-400 font-semibold">// SEEKING:</span> Summer 2026 Systems / IoT Engineering Internship. Ready for hardware-software co-design.
          </div>
        </div>

      </div>
    </section>
  );
}
