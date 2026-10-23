import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react';
import LiquidButton from './LiquidButton';

/**
 * Modals Component — Arctic Aurora Edition
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Resume Modal */}
          {activeModal === 'cv' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-5 border border-[#D5DFEB] bg-white shadow-[0_24px_70px_rgba(37,99,235,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3.5">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#2563EB]" />
                  <h3 className="font-bold text-[15px] text-[#111827]">
                    Curriculum Vitae
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#64748B] hover:text-[#111827] p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-[14px] text-[#4B5563] leading-relaxed">
                <div>
                  <h4 className="text-[#111827] font-bold text-xl font-sans-editorial">RAJAT BEHERA</h4>
                  <div className="text-[#2563EB] font-semibold text-[13.5px] mt-0.5">
                    Full-Stack Software Engineer &amp; Systems Developer
                  </div>
                  <div className="text-[12.5px] text-[#64748B] mt-1">
                    B.Tech in Computer Science &amp; Engineering · 8.9 / 10.0 CGPA · 3x Hackathon Winner
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#D5DFEB] bg-[#F8FAFC] space-y-2 text-[13px]">
                  <div className="text-[#111827] font-semibold text-[13.5px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Summary of Technical Skills</span>
                  </div>
                  <div className="space-y-1.5 text-[#4B5563]">
                    <div>• <strong>Web &amp; UI:</strong> React, JavaScript, HTML5, CSS, WebSockets</div>
                    <div>• <strong>Backend &amp; APIs:</strong> Node.js, Express.js, RESTful APIs, Docker</div>
                    <div>• <strong>Databases &amp; Tools:</strong> PostgreSQL, MySQL, SQL, Git, GitHub, VS Code</div>
                    <div>• <strong>Connected IoT &amp; Hardware:</strong> ESP32, Arduino, Arduino IDE, sensor interfaces</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
                <LiquidButton
                  variant="secondary"
                  size="sm"
                  onClick={onClose}
                  aria-label="Close Curriculum Vitae"
                >
                  Close
                </LiquidButton>
                <LiquidButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    alert('Curriculum Vitae Download Initiated: Rajat_Behera_Resume.pdf');
                    onClose();
                  }}
                  aria-label="Download PDF"
                >
                  Download PDF
                </LiquidButton>
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
              className="w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-5 border border-[#D5DFEB] bg-white shadow-[0_24px_70px_rgba(37,99,235,0.15)] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3.5">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#2563EB]" />
                  <h3 className="font-bold text-[15px] text-[#111827]">
                    {systemSpec.title} Overview
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#64748B] hover:text-[#111827] p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-[14px] text-[#4B5563] leading-relaxed">
                <div>
                  <h4 className="text-xl font-bold text-[#111827] font-sans-editorial">
                    {systemSpec.title}
                  </h4>
                  <div className="text-[13px] text-[#2563EB] font-semibold mt-0.5">
                    {systemSpec.tagline}
                  </div>
                </div>

                {systemSpec.image && (
                  <div className="w-full rounded-2xl overflow-hidden border border-[#D5DFEB] bg-[#F8FAFC]">
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
                  <div className="space-y-2 p-4 rounded-2xl border border-[#D5DFEB] bg-[#F8FAFC]">
                    <div className="text-[12px] uppercase font-semibold tracking-wider text-[#64748B]">
                      Core Capabilities
                    </div>
                    {systemSpec.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-[13px] text-[#111827]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Techs */}
                {systemSpec.techs && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {systemSpec.techs.map(t => (
                      <span key={t} className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#4B5563] border border-[#E2E8F0]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  {systemSpec.github && (
                    <LiquidButton
                      as="a"
                      href={systemSpec.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      aria-label="View on GitHub"
                    >
                      GitHub
                    </LiquidButton>
                  )}
                  {systemSpec.liveDemo && (
                    <LiquidButton
                      as="a"
                      href={systemSpec.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                      aria-label="Open Live Demo"
                    >
                      Live Demo
                    </LiquidButton>
                  )}
                </div>

                <LiquidButton
                  variant="secondary"
                  size="sm"
                  onClick={onClose}
                  aria-label="Close Overview"
                >
                  Close
                </LiquidButton>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
