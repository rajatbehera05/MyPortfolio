import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Cpu, Award, BookOpen, MapPin, Heart, Sparkles } from 'lucide-react';

/**
 * About Section: ABOUT ME — Arctic Aurora Edition
 */
export default function About() {
  return (
    <section
      id="about"
      aria-label="About Rajat Behera"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#DCE4EF] relative"
    >
      {/* Background Soft Atmospheric Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-[#E8F1FF]/60 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="space-y-2.5 mb-14"
      >
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#2563EB] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span>Background</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-[#64748B]">About Me</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] font-sans-editorial">
          My Story &amp; Approach
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Human Narrative & Principles */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <p className="text-[18px] sm:text-[19px] text-[#111827] leading-relaxed font-medium font-sans-editorial">
            I'm a Computer Science &amp; Engineering student who loves taking ideas from a blank whiteboard to polished, production-ready software.
          </p>

          <p className="text-[15.5px] text-[#4B5563] leading-relaxed font-normal">
            Around 70% of my time is spent in the world of full-stack software development. I enjoy building responsive web apps with React and modern JavaScript, structuring high-throughput backend services, and optimizing database queries so interfaces feel instant and effortless.
          </p>

          <p className="text-[15.5px] text-[#4B5563] leading-relaxed font-normal">
            The remaining 30% of my craft is rooted in physical hardware and IoT. Spending time writing firmware for microcontrollers and designing sensor circuits gives me a unique advantage: I never view the computer as a black box. I understand how high-level code translates into memory caches, network sockets, and electrical signals.
          </p>

          {/* Three Core Engineering Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
            
            {/* Value 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="group p-5 rounded-2xl border border-[#DCE4EF] bg-white shadow-xs hover:border-[#2563EB]/40 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08),0_0_16px_rgba(139,92,246,0.06)] transition-all duration-300 space-y-2.5 aurora-shimmer-effect"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20 group-hover:scale-105 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200">
                <Code2 className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-[14px] font-bold text-[#111827]">
                Thoughtful Craft
              </h3>
              <p className="text-[12.5px] text-[#64748B] leading-relaxed">
                Clean component hierarchy, strict contracts, and details that delight users.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="group p-5 rounded-2xl border border-[#DCE4EF] bg-white shadow-xs hover:border-[#2563EB]/40 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08),0_0_16px_rgba(139,92,246,0.06)] transition-all duration-300 space-y-2.5 aurora-shimmer-effect"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F1ECFF] text-[#8B5CF6] flex items-center justify-center border border-[#8B5CF6]/20 group-hover:scale-105 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-200">
                <Server className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-[14px] font-bold text-[#111827]">
                Reliable Systems
              </h3>
              <p className="text-[12.5px] text-[#64748B] leading-relaxed">
                Designing services that stay fast, resilient, and observable under load.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="group p-5 rounded-2xl border border-[#DCE4EF] bg-white shadow-xs hover:border-[#2563EB]/40 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08),0_0_16px_rgba(139,92,246,0.06)] transition-all duration-300 space-y-2.5 aurora-shimmer-effect"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20 group-hover:scale-105 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-[14px] font-bold text-[#111827]">
                Hardware Fluency
              </h3>
              <p className="text-[12.5px] text-[#64748B] leading-relaxed">
                Understanding constraints from memory buffers all the way to silicon.
              </p>
            </motion.div>

          </div>
        </motion.div>

        {/* Right Column: Premium White Quick Facts Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="lg:col-span-5 rounded-2xl p-6 sm:p-7 space-y-5 bg-white/95 backdrop-blur-xl border border-[#DCE4EF] shadow-[0_10px_30px_rgba(37,99,235,0.04),0_1px_3px_rgba(0,0,0,0.03)] text-[#4B5563]"
        >
          <div className="flex items-center justify-between border-b border-[#DCE4EF] pb-3.5">
            <h3 className="text-[14px] font-bold text-[#111827] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>Quick Facts</span>
            </h3>
            <span className="text-[11px] text-[#2563EB] font-semibold px-2.5 py-0.5 rounded-full bg-[#E8F1FF] border border-[#2563EB]/20">
              Student &amp; Builder
            </span>
          </div>

          <div className="space-y-4 text-[13.5px]">
            
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#E8F1FF] text-[#2563EB] shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[#111827] font-semibold">B.Tech in Computer Science &amp; Engineering</div>
                <div className="text-[12px] text-[#64748B]">Maintaining an 8.9 / 10.0 Cumulative CGPA</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#F1ECFF] text-[#8B5CF6] shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[#111827] font-semibold">3x Hackathon Winner</div>
                <div className="text-[12px] text-[#64748B]">Built collaborative web apps and IoT platforms under 36 hours</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-[#E8F1FF] text-[#2563EB] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[#111827] font-semibold">Location &amp; Availability</div>
                <div className="text-[12px] text-[#64748B]">Based in India · Open to remote &amp; on-site internships</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-rose-50 text-rose-500 shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[#111827] font-semibold">When I'm not coding</div>
                <div className="text-[12px] text-[#64748B]">Soldering prototype boards, tinkering with open source, and learning new stacks</div>
              </div>
            </div>

          </div>

          {/* Current Goal Banner */}
          <div className="p-4 rounded-xl border border-[#2563EB]/20 bg-[#E8F1FF]/60 text-[12.5px] text-[#1E3A8A] leading-relaxed">
            <strong className="text-[#2563EB] font-bold">Currently Seeking:</strong> Summer 2026 Software Engineering Internships where I can contribute to high-impact web apps and distributed systems.
          </div>

        </motion.div>

      </div>
    </section>
  );
}
