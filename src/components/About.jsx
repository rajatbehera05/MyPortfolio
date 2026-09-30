import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Cpu, Award, BookOpen, MapPin, Heart, Sparkles } from 'lucide-react';

/**
 * About Section: ABOUT ME
 * 
 * Warm, human, genuine engineering background and personal philosophy:
 * - 70% Full-Stack Software Developer / 30% Hardware & IoT Bridge
 * - Clean storytelling free from cold robotic machine jargon
 */
export default function About() {
  return (
    <section
      id="about"
      aria-label="About Rajat Behera"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="space-y-2.5 mb-12"
      >
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#16D9E8] uppercase">
          <span>Background</span>
          <span className="text-[#232D36]">•</span>
          <span className="text-[#AAB5C0]">About Me</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          My Story &amp; Approach
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Human Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <p className="text-[18px] sm:text-[19px] text-[#F4F7FA] leading-relaxed font-medium font-sans-editorial">
            I'm a Computer Science &amp; Engineering student who loves taking ideas from a blank whiteboard to polished, production-ready software.
          </p>

          <p className="text-[15.5px] text-[#AAB5C0] leading-relaxed font-normal">
            Around 70% of my time is spent in the world of full-stack software development. I enjoy building responsive web apps with React and TypeScript, structuring high-throughput backend services, and optimizing database queries so interfaces feel instant and effortless.
          </p>

          <p className="text-[15.5px] text-[#AAB5C0] leading-relaxed font-normal">
            The remaining 30% of my craft is rooted in physical hardware and IoT. Spending time writing C++ for microcontrollers, scheduling FreeRTOS tasks, and designing sensor circuits gives me a unique advantage: I never view the computer as a black box. I understand how high-level code translates into memory caches, network sockets, and electrical signals.
          </p>

          {/* Three Core Engineering Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            
            <div className="p-4 rounded-xl border border-[#1A222B] bg-[#0E1319] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#16D9E8]/10 text-[#16D9E8] flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="text-[13px] font-bold text-[#F4F7FA]">
                Thoughtful Craft
              </h3>
              <p className="text-[12px] text-[#71808D] leading-relaxed">
                Clean component hierarchy, strict types, and details that delight users.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#1A222B] bg-[#0E1319] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="text-[13px] font-bold text-[#F4F7FA]">
                Reliable Systems
              </h3>
              <p className="text-[12px] text-[#71808D] leading-relaxed">
                Designing services that stay fast, resilient, and observable under load.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#1A222B] bg-[#0E1319] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#16D9E8]/10 text-[#16D9E8] flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-[13px] font-bold text-[#F4F7FA]">
                Hardware Fluency
              </h3>
              <p className="text-[12px] text-[#71808D] leading-relaxed">
                Understanding constraints from memory buffers all the way to silicon.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right Column: Warm, Human Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 rounded-2xl p-6 sm:p-7 space-y-5 bg-[#0E1319]/90 border border-[#1A222B] shadow-xl text-[#AAB5C0]"
        >
          <div className="flex items-center justify-between border-b border-[#1A222B] pb-3">
            <h3 className="text-[14px] font-bold text-[#F4F7FA] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#16D9E8]" />
              <span>Quick Facts</span>
            </h3>
            <span className="text-[11px] text-[#16D9E8] font-medium px-2 py-0.5 rounded-full bg-[#16D9E8]/10 border border-[#16D9E8]/20">
              Student &amp; Builder
            </span>
          </div>

          <div className="space-y-3.5 text-[13.5px]">
            
            <div className="flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-[#16D9E8] shrink-0 mt-0.5" />
              <div>
                <div className="text-[#F4F7FA] font-medium">B.Tech in Computer Science &amp; Engineering</div>
                <div className="text-[12px] text-[#71808D]">Maintaining an 8.9 / 10.0 Cumulative CGPA</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Award className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <div className="text-[#F4F7FA] font-medium">3x Hackathon Winner</div>
                <div className="text-[12px] text-[#71808D]">Built collaborative web apps and IoT platforms under 36 hours</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#16D9E8] shrink-0 mt-0.5" />
              <div>
                <div className="text-[#F4F7FA] font-medium">Location &amp; Availability</div>
                <div className="text-[12px] text-[#71808D]">Based in India · Open to remote &amp; on-site internships</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-[#F4F7FA] font-medium">When I'm not coding</div>
                <div className="text-[12px] text-[#71808D]">Soldering prototype boards, tinkering with open source, and learning Rust</div>
              </div>
            </div>

          </div>

          {/* Current Goal Banner */}
          <div className="p-4 rounded-xl border border-[#16D9E8]/20 bg-[#16D9E8]/5 text-[12.5px] text-[#AAB5C0] leading-relaxed">
            <strong className="text-[#16D9E8] font-semibold">Currently Seeking:</strong> Summer 2026 Software Engineering Internships where I can contribute to high-impact web apps and distributed systems.
          </div>

        </motion.div>

      </div>
    </section>
  );
}
