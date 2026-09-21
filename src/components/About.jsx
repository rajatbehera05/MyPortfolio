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
            <div className="p-4 rounded border border-[var(--border-subtle)] bg-[#141A21]/70 hover:border-[var(--accent-cyan-border)] transition-colors space-y-2">
              <Cpu className="w-4 h-4 text-[var(--accent-cyan)]" />
              <h3 className="font-mono-tech text-[12px] font-semibold text-[var(--text-primary)]">
                HARDWARE AWARENESS
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] leading-normal">
                Writing algorithms with strict cache, RAM, and battery power consciousness.
              </p>
            </div>

            <div className="p-4 rounded border border-[var(--border-subtle)] bg-[#141A21]/70 hover:border-[var(--accent-cyan-border)] transition-colors space-y-2">
              <GitBranch className="w-4 h-4 text-[var(--accent-cyan)]" />
              <h3 className="font-mono-tech text-[12px] font-semibold text-[var(--text-primary)]">
                DETERMINISTIC RTOS
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] leading-normal">
                Preventing race conditions and task deadlocks under high-frequency telemetry bursts.
              </p>
            </div>

            <div className="p-4 rounded border border-[var(--border-subtle)] bg-[#141A21]/70 hover:border-[var(--accent-cyan-border)] transition-colors space-y-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-cyan)]" />
              <h3 className="font-mono-tech text-[12px] font-semibold text-[var(--text-primary)]">
                FAULT TOLERANCE
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] leading-normal">
                Designing watchdog resets, non-volatile state saves, and self-healing RF networks.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Technical Telemetry Card */}
        <div className="lg:col-span-5 system-panel p-6 space-y-5 bg-[#141A21]/80">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2 font-mono-tech text-[12px] text-[var(--text-primary)] font-semibold">
              <Terminal className="w-4 h-4 text-[var(--accent-cyan)]" />
              <span>NODE_METADATA.JSON</span>
            </div>
            <span className="font-mono-tech text-[10px] text-[var(--accent-cyan)] uppercase">
              READ_ONLY
            </span>
          </div>

          <div className="space-y-3 font-mono-tech text-[12px]">
            <div className="flex justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[var(--text-muted)]">OPERATOR:</span>
              <span className="text-[var(--text-primary)] font-medium">Rajat Behera</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[var(--text-muted)]">DEGREE:</span>
              <span className="text-[var(--text-primary)]">B.Tech Computer Science &amp; Eng.</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[var(--text-muted)]">CUMULATIVE_GPA:</span>
              <span className="text-[var(--accent-cyan)] font-semibold">8.9 / 10.0</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[var(--text-muted)]">SPECIALIZATION:</span>
              <span className="text-[var(--text-primary)]">IoT, Embedded Systems &amp; TinyML</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[var(--text-muted)]">PROTOTYPES_DEPLOYED:</span>
              <span className="text-[var(--text-primary)]">6 Physical Systems</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">HACKATHONS:</span>
              <span className="text-[var(--accent-cyan)] font-semibold">3x First Place Winner</span>
            </div>
          </div>

          <div className="p-3 rounded border border-[var(--border-subtle)] bg-[#0E1217] text-[11px] font-mono-tech text-[var(--text-secondary)]">
            <span className="text-[var(--accent-cyan)]">// SEEKING:</span> Summer 2026 Systems / IoT Engineering Internship. Ready for hardware-software co-design.
          </div>
        </div>

      </div>
    </section>
  );
}
