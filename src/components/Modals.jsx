import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown, Cpu, Terminal } from 'lucide-react';

/**
 * Modals Component
 * 
 * Curriculum Vitae Dossier and System Engineering Spec Sheets:
 * - Fluid Framer Motion backdrop and dialog entrance/exit
 * - ESC key and outside-click dismiss handlers
 * - High-precision engineering theme styling
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
          {/* CV Modal */}
          {activeModal === 'cv' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-lg rounded-xl p-6 sm:p-7 space-y-5 border border-[#16D9E8]/40 bg-[#0F1419] shadow-[0_16px_60px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#1A222B] pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#16D9E8]" />
                  <h3 className="font-mono-tech font-bold text-[14px] text-[#F4F7FA] uppercase tracking-wider">
                    CURRICULUM_VITAE // DOSSIER
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#71808D] hover:text-[#F4F7FA] p-1 rounded hover:bg-[#141A21] font-mono-tech text-sm cursor-pointer transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-[14px] text-[#AAB5C0] leading-relaxed">
                <div>
                  <strong className="text-[#F4F7FA] font-mono-tech font-bold text-base">RAJAT BEHERA</strong><br />
                  <span className="text-[#16D9E8] font-mono-tech text-[12px] font-semibold">Full-Stack Software Engineer &amp; Systems Developer (70% SW · 30% IoT)</span><br />
                  <span>B.Tech in Computer Science &amp; Engineering · Cumulative GPA: <span className="text-[#16D9E8] font-mono-tech font-bold">8.9 / 10.0</span> · 3x Hackathon Winner</span>
                </div>

                {/* Dark obsidian code block */}
                <div className="p-4 rounded-lg border border-[#1A222B] bg-[#0A0D10] font-mono-tech text-[12px] space-y-1.5 text-[#F4F7FA]">
                  <div className="text-[#16D9E8] font-bold uppercase tracking-wider">// CORE COMPETENCIES (70/30 SPLIT):</div>
                  <div className="text-[#AAB5C0]">• Frontend: React 19, TypeScript, Next.js, Zustand, Optimistic UI, WebSockets</div>
                  <div className="text-[#AAB5C0]">• Backend &amp; Cloud: Node.js, Python FastAPI, REST/gRPC, Docker, Microservices</div>
                  <div className="text-[#AAB5C0]">• Data &amp; Caching: PostgreSQL, Redis In-Memory Cluster, TimescaleDB Hypertables</div>
                  <div className="text-[#AAB5C0]">• Distributed Systems: CRDTs, Redis Pub/Sub, Event-Driven Messaging, OpenTelemetry</div>
                  <div className="text-[#3B82F6]">• Edge Superpower (30%): ESP32-S3, C/C++, FreeRTOS, TLS MQTT, Sensor Bridges</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1A222B]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-[12px] font-mono-tech font-medium uppercase border border-[#1A222B] text-[#AAB5C0] hover:text-[#F4F7FA] hover:bg-[#141A21] cursor-pointer transition-colors"
                >
                  DISMISS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Curriculum Vitae Download Initiated: Rajat_Behera_Software_Systems_Resume.pdf');
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-mono-tech uppercase font-bold text-[#0A0D10] bg-[#16D9E8] hover:bg-[#14C1CE] hover:shadow-[0_0_16px_rgba(22,217,232,0.4)] transition-all cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#0A0D10]" />
                  <span>DOWNLOAD PDF</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* System Spec Sheet Modal */}
          {activeModal === 'spec' && systemSpec && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-xl rounded-xl p-6 sm:p-7 space-y-5 border border-[#16D9E8]/40 bg-[#0F1419] shadow-[0_16px_60px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#1A222B] pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#16D9E8]" />
                  <h3 className="font-mono-tech font-bold text-[14px] text-[#F4F7FA] uppercase tracking-wider">
                    {systemSpec.code} // ENGINEERING SPEC
                  </h3>
                  {systemSpec.track && (
                    <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded border border-[#16D9E8]/30 bg-[#16D9E8]/10 text-[#16D9E8] ml-2">
                      {systemSpec.track}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#71808D] hover:text-[#F4F7FA] p-1 rounded hover:bg-[#141A21] font-mono-tech text-sm cursor-pointer transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-[#1A222B] bg-[#0A0D10]">
                <img
                  src={systemSpec.image}
                  alt={systemSpec.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3.5 text-[13.5px] text-[#AAB5C0] leading-relaxed">
                <h4 className="text-xl font-bold text-[#F4F7FA] tracking-tight font-sans-editorial">
                  {systemSpec.title}
                </h4>
                <p>
                  {systemSpec.summary}
                </p>

                {/* High-contrast telemetry specs */}
                <div className="p-4 rounded-lg border border-[#1A222B] bg-[#0A0D10] font-mono-tech text-[12px] space-y-2 text-[#AAB5C0]">
                  <div className="text-[#16D9E8] uppercase font-bold tracking-wider">
                    SYSTEM TELEMETRY BENCHMARKS
                  </div>
                  {systemSpec.metrics?.map((m) => (
                    <div key={m.key} className="flex justify-between border-b border-[#1A222B] pb-1.5">
                      <span className="text-[#71808D]">{m.key}:</span>
                      <span className="text-[#F4F7FA] font-bold">{m.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end pt-3 border-t border-[#1A222B]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-[12px] font-mono-tech uppercase font-bold text-[#0A0D10] bg-[#16D9E8] hover:bg-[#14C1CE] hover:shadow-[0_0_16px_rgba(22,217,232,0.4)] transition-all cursor-pointer"
                >
                  CLOSE SPEC SHEET
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
