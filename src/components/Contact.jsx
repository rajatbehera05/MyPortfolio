import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Terminal, CheckCircle2, FileText, Send } from 'lucide-react';

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/**
 * Contact & System Interface Component
 * 
 * Direct contact triggers (Email, GitHub, LinkedIn, CV Spec) and terminal transmission form.
 */
export default function Contact({ onOpenCV }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmitted, setTransmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setTransmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:rajat.behera@example.com?subject=Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    }, 1200);
  };

  return (
    <section
      id="contact"
      aria-label="Direct System Interface"
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
          <span>DIRECT TRANSMISSION // 04</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          Initiate Connection
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
          Available for Summer 2026 Systems &amp; IoT Engineering Internships, embedded systems collaborations, and technical research conversations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Channels */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-3.5"
        >
          
          {/* Channel: Email */}
          <a
            href="mailto:rajat.behera@example.com"
            className="p-5 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 hover:border-[#16D9E8]/50 hover:bg-[#141A21] flex items-center justify-between group transition-all duration-300 block text-inherit no-underline"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#16D9E8]/10 border border-[#16D9E8]/20 flex items-center justify-center text-[#16D9E8] group-hover:scale-105 transition-transform shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-[#71808D] uppercase font-medium">
                  DIRECT TRANSMISSION
                </div>
                <div className="text-[14px] font-semibold text-[#F4F7FA] group-hover:text-[#16D9E8] transition-colors">
                  rajat.behera@example.com
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#71808D] group-hover:text-[#16D9E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Channel: GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 hover:border-[#16D9E8]/50 hover:bg-[#141A21] flex items-center justify-between group transition-all duration-300 block text-inherit no-underline"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#16D9E8]/10 border border-[#16D9E8]/20 flex items-center justify-center text-[#16D9E8] group-hover:scale-105 transition-transform shrink-0">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-[#71808D] uppercase font-medium">
                  REPOSITORIES &amp; FIRMWARE
                </div>
                <div className="text-[14px] font-semibold text-[#F4F7FA] group-hover:text-[#16D9E8] transition-colors">
                  github.com/rajat-behera
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#71808D] group-hover:text-[#16D9E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Channel: LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 hover:border-[#16D9E8]/50 hover:bg-[#141A21] flex items-center justify-between group transition-all duration-300 block text-inherit no-underline"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#16D9E8]/10 border border-[#16D9E8]/20 flex items-center justify-center text-[#16D9E8] group-hover:scale-105 transition-transform shrink-0">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-[#71808D] uppercase font-medium">
                  PROFESSIONAL NETWORK
                </div>
                <div className="text-[14px] font-semibold text-[#F4F7FA] group-hover:text-[#16D9E8] transition-colors">
                  linkedin.com/in/rajat-behera
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#71808D] group-hover:text-[#16D9E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Channel: CV Spec */}
          <button
            type="button"
            onClick={onOpenCV}
            className="w-full p-5 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 hover:border-[#16D9E8]/50 hover:bg-[#141A21] flex items-center justify-between group transition-all duration-300 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#16D9E8]/10 border border-[#16D9E8]/20 flex items-center justify-center text-[#16D9E8] group-hover:scale-105 transition-transform shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-[#71808D] uppercase font-medium">
                  COMPLETE DOSSIER
                </div>
                <div className="text-[14px] font-semibold text-[#F4F7FA] group-hover:text-[#16D9E8] transition-colors">
                  Download Curriculum Vitae (PDF)
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#71808D] group-hover:text-[#16D9E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>

        </motion.div>

        {/* Right Column: Transmission Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 space-y-6 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-[#1A222B] pb-3">
            <div className="flex items-center gap-2 font-mono-tech text-[12px] text-[#F4F7FA] font-bold">
              <Terminal className="w-4 h-4 text-[#16D9E8]" />
              <span>TERMINAL_MSG_DISPATCH</span>
              <span className="animate-cursor text-[#16D9E8]">_</span>
            </div>
            <span className="font-mono-tech text-[10px] text-[#16D9E8] uppercase font-semibold">
              PORT // 443 SECURE
            </span>
          </div>

          {transmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center space-y-3"
            >
              <CheckCircle2 className="w-12 h-12 text-[#16D9E8] mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-[#F4F7FA] font-mono-tech">
                PACKET TRANSMITTED
              </h3>
              <p className="text-[14px] text-[#AAB5C0] font-mono-tech">
                Opening default mail client with encoded telemetry payload...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="block font-mono-tech text-[11px] text-[#71808D] uppercase font-medium">
                    Sender Name / Organization
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0D10] border border-[#1A222B] text-[14px] text-[#F4F7FA] placeholder-[#71808D] focus:border-[#16D9E8] focus:shadow-[0_0_12px_rgba(22,217,232,0.2)] focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="block font-mono-tech text-[11px] text-[#71808D] uppercase font-medium">
                    Return Transmission Address
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0D10] border border-[#1A222B] text-[14px] text-[#F4F7FA] placeholder-[#71808D] focus:border-[#16D9E8] focus:shadow-[0_0_12px_rgba(22,217,232,0.2)] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-msg" className="block font-mono-tech text-[11px] text-[#71808D] uppercase font-medium">
                  Message Payload / Scope
                </label>
                <textarea
                  id="form-msg"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Details regarding hardware/software engineering opportunity, timeline, and stack requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0D10] border border-[#1A222B] text-[14px] text-[#F4F7FA] placeholder-[#71808D] focus:border-[#16D9E8] focus:shadow-[0_0_12px_rgba(22,217,232,0.2)] focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg text-[13px] font-mono-tech font-bold uppercase tracking-wider text-[#0A0D10] bg-[#16D9E8] hover:bg-[#14C1CE] hover:shadow-[0_0_20px_rgba(22,217,232,0.4)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>DISPATCH MESSAGE</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </motion.div>

      </div>

      {/* Footer info */}
      <div className="mt-20 pt-8 border-t border-[#1A222B] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[11px] text-[#71808D]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16D9E8] inline-block animate-ping" />
          <span>SYS_ID: RAJAT BEHERA // PORTFOLIO_NODE_2026</span>
        </div>
        <div>
          <span>CONTINUOUS CONNECTED SYSTEM • ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </section>
  );
}
