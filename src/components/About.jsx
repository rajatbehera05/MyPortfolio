import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Cpu, GitBranch } from 'lucide-react';

/**
 * About Section: ABOUT / NODE_01
 * 
 * High-precision engineering specification of background, ethos, and architectural mindset.
 */
export default function About() {
  return (
    <section
      id="about"
      aria-label="About Node 01"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
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
          <span>IDENTITY // CORE SPECIFICATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          About / Node_01
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <p className="text-[17px] text-[#F4F7FA] leading-relaxed font-medium font-sans-editorial">
            I am a Computer Science &amp; Engineering student who believes that the most meaningful computational problems exist where code meets the physical environment.
          </p>

          <p className="text-[15px] sm:text-[15.5px] text-[#AAB5C0] leading-relaxed font-normal">
            Rather than confining software strictly to browser sandboxes or cloud containers, I design systems that span the entire execution chain: from silicon registers and interrupt handlers on an ESP32 or STM32, across deterministic RTOS queues and low-latency RF meshes, into applied TinyML models and resilient cloud interfaces.
          </p>

          {/* Three Core Engineering Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
            <div className="group p-4 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 hover:border-[#16D9E8]/50 hover:bg-[#141A21] transition-all duration-300 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#16D9E8]/10 border border-[#16D9E8]/20 flex items-center justify-center transition-colors group-hover:border-[#16D9E8]/50">
                <Cpu className="w-4 h-4 text-[#16D9E8]" />
              </div>
              <h3 className="font-mono-tech text-[12px] font-bold text-[#F4F7FA] tracking-wide">
                HARDWARE AWARENESS
              </h3>
              <p className="text-[12px] text-[#71808D] group-hover:text-[#AAB5C0] transition-colors leading-relaxed">
                Writing algorithms with strict cache, RAM, and battery power consciousness.
              </p>
            </div>

            <div className="group p-4 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 hover:border-[#16D9E8]/50 hover:bg-[#141A21] transition-all duration-300 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#16D9E8]/10 border border-[#16D9E8]/20 flex items-center justify-center transition-colors group-hover:border-[#16D9E8]/50">
                <GitBranch className="w-4 h-4 text-[#16D9E8]" />
              </div>
              <h3 className="font-mono-tech text-[12px] font-bold text-[#F4F7FA] tracking-wide">
                DETERMINISTIC RTOS
              </h3>
              <p className="text-[12px] text-[#71808D] group-hover:text-[#AAB5C0] transition-colors leading-relaxed">
                Preventing race conditions and task deadlocks under high-frequency telemetry bursts.
              </p>
            </div>

            <div className="group p-4 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 hover:border-[#16D9E8]/50 hover:bg-[#141A21] transition-all duration-300 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#16D9E8]/10 border border-[#16D9E8]/20 flex items-center justify-center transition-colors group-hover:border-[#16D9E8]/50">
                <ShieldCheck className="w-4 h-4 text-[#16D9E8]" />
              </div>
              <h3 className="font-mono-tech text-[12px] font-bold text-[#F4F7FA] tracking-wide">
                FAULT TOLERANCE
              </h3>
              <p className="text-[12px] text-[#71808D] group-hover:text-[#AAB5C0] transition-colors leading-relaxed">
                Designing watchdog resets, non-volatile state saves, and self-healing RF networks.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Technical Telemetry Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 rounded-xl p-6 space-y-5 bg-[#0F1419]/95 border border-[#1A222B] shadow-2xl text-[#AAB5C0] relative overflow-hidden"
        >
          {/* Subtle card scanline beam */}
          <div 
            aria-hidden="true" 
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#16D9E8] to-transparent opacity-60"
          />

          <div className="flex items-center justify-between border-b border-[#1A222B] pb-3">
            <div className="flex items-center gap-2 font-mono-tech text-[12px] text-[#F4F7FA] font-bold">
              <Terminal className="w-4 h-4 text-[#16D9E8]" />
              <span>NODE_METADATA.JSON</span>
            </div>
            <span className="font-mono-tech text-[10px] text-[#16D9E8] uppercase font-semibold">
              READ_ONLY
            </span>
          </div>

          <div className="space-y-3 font-mono-tech text-[12px]">
            <div className="flex justify-between border-b border-[#1A222B]/70 pb-2">
              <span className="text-[#71808D]">OPERATOR:</span>
              <span className="text-[#F4F7FA] font-semibold">Rajat Behera</span>
            </div>
            <div className="flex justify-between border-b border-[#1A222B]/70 pb-2">
              <span className="text-[#71808D]">DEGREE:</span>
              <span className="text-[#AAB5C0]">B.Tech Computer Science &amp; Eng.</span>
            </div>
            <div className="flex justify-between border-b border-[#1A222B]/70 pb-2">
              <span className="text-[#71808D]">CUMULATIVE_GPA:</span>
              <span className="text-[#16D9E8] font-bold">8.9 / 10.0</span>
            </div>
            <div className="flex justify-between border-b border-[#1A222B]/70 pb-2">
              <span className="text-[#71808D]">SPECIALIZATION:</span>
              <span className="text-[#AAB5C0]">IoT, Embedded Systems &amp; TinyML</span>
            </div>
            <div className="flex justify-between border-b border-[#1A222B]/70 pb-2">
              <span className="text-[#71808D]">PROTOTYPES_DEPLOYED:</span>
              <span className="text-[#F4F7FA] font-medium">6 Physical Systems</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71808D]">HACKATHONS:</span>
              <span className="text-[#16D9E8] font-bold">3x First Place Winner</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-[#1A222B] bg-[#0A0D10] text-[11px] font-mono-tech text-[#AAB5C0] leading-relaxed">
            <span className="text-[#16D9E8] font-semibold">// SEEKING:</span> Summer 2026 Systems / IoT Engineering Internship. Ready for hardware-software co-design.
          </div>
        </motion.div>

      </div>
    </section>
  );
}
