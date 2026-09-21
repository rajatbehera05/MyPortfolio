import React, { useState } from 'react';
import { Mail, ArrowUpRight, Terminal, CheckCircle2, FileText } from 'lucide-react';

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
 * Strict Constitution & Enhancement Guidelines:
 * - Minimal, technical, graphite surfaces with #29323C borders
 * - Direct contact triggers (Email, GitHub, LinkedIn, CV Spec)
 * - Clean terminal transmission status
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
      className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 border-t border-[var(--border-subtle)]"
    >
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center gap-2 font-mono-tech text-[12px] tracking-widest text-[var(--accent-cyan)] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
          <span>DIRECT TRANSMISSION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          INITIATE CONNECTION
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] max-w-2xl">
          Available for Summer 2026 Systems &amp; IoT Engineering Internships, embedded systems collaborations, and technical research conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Channels */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Channel: Email */}
          <a
            href="mailto:rajat.behera@example.com"
            className="system-panel p-5 flex items-center justify-between group transition-all duration-200 block text-inherit no-underline bg-[var(--bg-surface)] hover:border-[var(--accent-cyan-border)] shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-md bg-[var(--bg-system-alt)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-cyan)] group-hover:bg-[#0F172A] group-hover:text-cyan-400 group-hover:border-slate-800 transition-all shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-[var(--text-muted)] uppercase font-medium">
                  DIRECT TRANSMISSION
                </div>
                <div className="text-[14px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                  rajat.behera@example.com
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Channel: GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="system-panel p-5 flex items-center justify-between group transition-all duration-200 block text-inherit no-underline bg-[var(--bg-surface)] hover:border-[var(--accent-cyan-border)] shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-md bg-[var(--bg-system-alt)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-cyan)] group-hover:bg-[#0F172A] group-hover:text-cyan-400 group-hover:border-slate-800 transition-all shrink-0">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-[var(--text-muted)] uppercase font-medium">
                  REPOSITORIES &amp; FIRMWARE
                </div>
                <div className="text-[14px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                  github.com/rajat-behera
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Channel: LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="system-panel p-5 flex items-center justify-between group transition-all duration-200 block text-inherit no-underline bg-[var(--bg-surface)] hover:border-[var(--accent-cyan-border)] shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-md bg-[var(--bg-system-alt)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-cyan)] group-hover:bg-[#0F172A] group-hover:text-cyan-400 group-hover:border-slate-800 transition-all shrink-0">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-[var(--text-muted)] uppercase font-medium">
                  PROFESSIONAL NETWORK
                </div>
                <div className="text-[14px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                  linkedin.com/in/rajat-behera
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Channel: CV Spec */}
          <button
            type="button"
            onClick={onOpenCV}
            className="w-full system-panel p-5 flex items-center justify-between group transition-all duration-200 text-left cursor-pointer bg-[var(--bg-surface)] hover:border-[var(--accent-cyan-border)] shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-md bg-[var(--bg-system-alt)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-cyan)] group-hover:bg-[#0F172A] group-hover:text-cyan-400 group-hover:border-slate-800 transition-all shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-[var(--text-muted)] uppercase font-medium">
                  COMPLETE DOSSIER
                </div>
                <div className="text-[14px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                  Download Curriculum Vitae (PDF)
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>

        </div>

        {/* Right Column: Transmission Form */}
        <div className="lg:col-span-7 system-panel p-6 sm:p-8 space-y-6 bg-[var(--bg-surface)] shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2 font-mono-tech text-[12px] text-[var(--text-primary)] font-bold">
              <Terminal className="w-4 h-4 text-[var(--accent-cyan)]" />
              <span>TERMINAL_MSG_DISPATCH</span>
            </div>
            <span className="font-mono-tech text-[10px] text-[var(--accent-cyan)] uppercase font-semibold">
              PORT // 443 SECURE
            </span>
          </div>

          {transmitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[var(--accent-cyan)] mx-auto animate-node-pulse" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] font-mono-tech">
                PACKET TRANSMITTED
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] font-mono-tech">
                Opening default mail client with encoded telemetry payload...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="block font-mono-tech text-[11px] text-[var(--text-muted)] uppercase font-medium">
                    Sender Name / Organization
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full px-3.5 py-2.5 rounded bg-[var(--bg-system-alt)] border border-[var(--border-subtle)] text-[14px] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:bg-[var(--bg-surface)] focus:border-[var(--accent-cyan)] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="block font-mono-tech text-[11px] text-[var(--text-muted)] uppercase font-medium">
                    Return Transmission Address
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded bg-[var(--bg-system-alt)] border border-[var(--border-subtle)] text-[14px] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:bg-[var(--bg-surface)] focus:border-[var(--accent-cyan)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-msg" className="block font-mono-tech text-[11px] text-[var(--text-muted)] uppercase font-medium">
                  Message Payload / Scope
                </label>
                <textarea
                  id="form-msg"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Details regarding hardware/software engineering opportunity, timeline, and stack requirements..."
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--bg-system-alt)] border border-[var(--border-subtle)] text-[14px] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:bg-[var(--bg-surface)] focus:border-[var(--accent-cyan)] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded text-[13px] font-mono-tech font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#1E293B] dark:bg-[var(--accent-cyan)] dark:text-[#0E1217] transition-all duration-200 cursor-pointer shadow-md focus-visible:outline-none"
              >
                DISPATCH MESSAGE
              </button>
            </form>
          )}

        </div>

      </div>

      {/* Footer info */}
      <div className="mt-20 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[12px] text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] inline-block" />
          <span>SYS_ID: RAJAT BEHERA // PORTFOLIO_NODE_2026</span>
        </div>
        <div>
          <span>CONTINUOUS CONNECTED SYSTEM • ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </section>
  );
}
