import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown, CheckCircle2, Sparkles, BookOpen, Layers, ExternalLink } from 'lucide-react';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

/**
 * Modals Component: Clean Human Resume & Project Overview Dialogs
 */
export default function Modals({ activeModal, onClose, systemSpec }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal, onClose]);

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0D10]/80 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Resume Modal */}
          {activeModal === 'cv' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg rounded-2xl p-6 sm:p-7 space-y-5 border border-[#232D36] bg-[#0E1319] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#1A222B] pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#16D9E8]" />
                  <h3 className="font-bold text-[15px] text-[#F4F7FA]">
                    Curriculum Vitae
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#71808D] hover:text-[#F4F7FA] p-1 rounded-lg hover:bg-[#141A21] transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-[14px] text-[#AAB5C0] leading-relaxed">
                <div>
                  <h4 className="text-[#F4F7FA] font-bold text-lg font-sans-editorial">RAJAT BEHERA</h4>
                  <div className="text-[#16D9E8] font-medium text-[13px] mt-0.5">
                    Full-Stack Software Engineer &amp; Systems Developer
                  </div>
                  <div className="text-[12.5px] text-[#71808D] mt-1">
                    B.Tech in Computer Science &amp; Engineering · 8.9 / 10.0 CGPA · 3x Hackathon Winner
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#1A222B] bg-[#141A21]/70 space-y-2 text-[13px]">
                  <div className="text-[#F4F7FA] font-semibold text-[13.5px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#16D9E8]" />
                    <span>Summary of Skills (70/30 Focus)</span>
                  </div>
                  <div className="space-y-1 text-[#AAB5C0]">
                    <div>• <strong>Web &amp; UI:</strong> React 19, TypeScript, Next.js, Zustand, Tailwind CSS, WebSockets</div>
                    <div>• <strong>Backend &amp; APIs:</strong> Node.js, Python FastAPI, RESTful APIs, gRPC, Docker</div>
                    <div>• <strong>Databases &amp; Cache:</strong> PostgreSQL, Redis in-memory caching, TimescaleDB</div>
                    <div>• <strong>Connected IoT (30%):</strong> ESP32, FreeRTOS, C/C++, TLS MQTT, sensor interfaces</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1A222B]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-[13px] font-medium border border-[#232D36] text-[#AAB5C0] hover:text-[#F4F7FA] hover:bg-[#141A21] cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Curriculum Vitae Download Initiated: Rajat_Behera_Resume.pdf');
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-[#0A0D10] bg-[#16D9E8] hover:bg-[#14C1CE] hover:shadow-[0_0_16px_rgba(22,217,232,0.3)] transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Project Overview Sheet Modal */}
          {activeModal === 'spec' && systemSpec && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl rounded-2xl p-6 sm:p-7 space-y-5 border border-[#232D36] bg-[#0E1319] shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#1A222B] pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#16D9E8]" />
                  <h3 className="font-bold text-[15px] text-[#F4F7FA]">
                    {systemSpec.title} Overview
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#71808D] hover:text-[#F4F7FA] p-1 rounded-lg hover:bg-[#141A21] transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-[14px] text-[#AAB5C0] leading-relaxed">
                <div>
                  <h4 className="text-xl font-bold text-[#F4F7FA] font-sans-editorial">
                    {systemSpec.title}
                  </h4>
                  <div className="text-[13px] text-[#16D9E8] font-medium mt-0.5">
                    {systemSpec.tagline}
                  </div>
                </div>

                {systemSpec.image && (
                  <div className="w-full rounded-xl overflow-hidden border border-[#232D36] bg-[#0A0D10]">
                    <img
                      src={systemSpec.image}
                      alt={systemSpec.title}
                      className="w-full h-auto max-h-[260px] object-cover object-top"
                    />
                  </div>
                )}

                <p>
                  {systemSpec.description}
                </p>

                {/* Highlights */}
                {systemSpec.highlights && (
                  <div className="space-y-2 p-4 rounded-xl border border-[#1A222B] bg-[#141A21]/60">
                    <div className="text-[12px] uppercase font-semibold tracking-wider text-[#71808D]">
                      Core Capabilities
                    </div>
                    {systemSpec.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-[13px] text-[#F4F7FA]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16D9E8] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Techs */}
                {systemSpec.techs && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {systemSpec.techs.map(t => (
                      <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#141A21] text-[#AAB5C0] border border-[#232D36]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#1A222B]">
                <div className="flex items-center gap-2">
                  {systemSpec.github && (
                    <a
                      href={systemSpec.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-medium text-[#AAB5C0] hover:text-[#F4F7FA] bg-[#141A21] hover:bg-[#1A222B] border border-[#232D36] transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {systemSpec.liveDemo && (
                    <a
                      href={systemSpec.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold text-[#16D9E8] hover:text-[#0A0D10] bg-[#16D9E8]/10 hover:bg-[#16D9E8] border border-[#16D9E8]/30 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#0A0D10] bg-[#16D9E8] hover:bg-[#14C1CE] transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
