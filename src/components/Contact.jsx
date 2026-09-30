import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Send, CheckCircle2, FileText, MessageSquare } from 'lucide-react';

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
 * Contact Section: GET IN TOUCH
 * 
 * Warm, approachable contact interface with clear channels and friendly message box.
 */
export default function Contact({ onOpenCV }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSent(true);
    setTimeout(() => {
      window.location.href = `mailto:rajatb220m@gmail.com?subject=Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    }, 1000);
  };

  return (
    <section
      id="contact"
      aria-label="Get in Touch"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="space-y-2.5 mb-12"
      >
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#16D9E8] uppercase">
          <span>Get in Touch</span>
          <span className="text-[#232D36]">•</span>
          <span className="text-[#AAB5C0]">Contact</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          Let's Work Together
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
          I'm actively seeking Summer 2026 Software Engineering Internships and open to exciting collaborations. Feel free to reach out via email or send a message below!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-3.5"
        >
          
          {/* Email Card */}
          <a
            href="mailto:rajatb220m@gmail.com"
            className="p-5 rounded-2xl border border-[#1A222B] bg-[#0E1319]/80 hover:border-[#16D9E8]/50 hover:bg-[#141A21] flex items-center justify-between group transition-all duration-300 block text-inherit no-underline shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#16D9E8]/10 text-[#16D9E8] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-[#16D9E8]/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[12px] text-[#71808D] font-medium">
                  Email Me
                </div>
                <div className="text-[14.5px] font-semibold text-[#F4F7FA] group-hover:text-[#16D9E8] transition-colors">
                  rajatb220m@gmail.com
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#71808D] group-hover:text-[#16D9E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/rajatbehera05"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-[#1A222B] bg-[#0E1319]/80 hover:border-[#16D9E8]/50 hover:bg-[#141A21] flex items-center justify-between group transition-all duration-300 block text-inherit no-underline shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#16D9E8]/10 text-[#16D9E8] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-[#16D9E8]/20">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[12px] text-[#71808D] font-medium">
                  GitHub Profile
                </div>
                <div className="text-[14.5px] font-semibold text-[#F4F7FA] group-hover:text-[#16D9E8] transition-colors">
                  github.com/rajatbehera05
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#71808D] group-hover:text-[#16D9E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-[#1A222B] bg-[#0E1319]/80 hover:border-[#16D9E8]/50 hover:bg-[#141A21] flex items-center justify-between group transition-all duration-300 block text-inherit no-underline shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-[#3B82F6]/20">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[12px] text-[#71808D] font-medium">
                  LinkedIn
                </div>
                <div className="text-[14.5px] font-semibold text-[#F4F7FA] group-hover:text-[#3B82F6] transition-colors">
                  Connect on LinkedIn
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#71808D] group-hover:text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* Resume Card Button */}
          <button
            type="button"
            onClick={onOpenCV}
            className="w-full p-5 rounded-2xl border border-[#1A222B] bg-[#0E1319]/80 hover:border-[#16D9E8]/50 hover:bg-[#141A21] flex items-center justify-between group transition-all duration-300 text-left cursor-pointer shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#16D9E8]/10 text-[#16D9E8] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-[#16D9E8]/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[12px] text-[#71808D] font-medium">
                  Curriculum Vitae
                </div>
                <div className="text-[14.5px] font-semibold text-[#F4F7FA] group-hover:text-[#16D9E8] transition-colors">
                  View &amp; Download Resume (PDF)
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#71808D] group-hover:text-[#16D9E8] transition-transform" />
          </button>

        </motion.div>

        {/* Right Column: Friendly Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-[#1A222B] bg-[#0E1319]/90 shadow-xl"
        >
          <div className="flex items-center gap-2 text-[14px] font-bold text-[#F4F7FA] pb-4 border-b border-[#1A222B] mb-5">
            <MessageSquare className="w-4 h-4 text-[#16D9E8]" />
            <span>Send Me a Message</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-[#AAB5C0]">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#141A21] border border-[#232D36] text-[#F4F7FA] placeholder-[#71808D] text-[13.5px] focus:outline-none focus:border-[#16D9E8]/70 focus:ring-1 focus:ring-[#16D9E8]/70 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-[#AAB5C0]">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#141A21] border border-[#232D36] text-[#F4F7FA] placeholder-[#71808D] text-[13.5px] focus:outline-none focus:border-[#16D9E8]/70 focus:ring-1 focus:ring-[#16D9E8]/70 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#AAB5C0]">Message</label>
              <textarea
                rows={4}
                required
                placeholder="Hi Rajat, I came across your portfolio and wanted to reach out regarding..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#141A21] border border-[#232D36] text-[#F4F7FA] placeholder-[#71808D] text-[13.5px] focus:outline-none focus:border-[#16D9E8]/70 focus:ring-1 focus:ring-[#16D9E8]/70 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[13.5px] font-semibold text-[#0A0D10] bg-[#16D9E8] hover:bg-[#14C1CE] hover:shadow-[0_0_24px_rgba(22,217,232,0.3)] transition-all cursor-pointer"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Opening Mail Client...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>

          </form>

        </motion.div>

      </div>

    </section>
  );
}
