import React from 'react';
import { X, FileDown, Cpu, Terminal } from 'lucide-react';

/**
 * Modals Component
 * 
 * Preserves the full CV dossier and technical spec sheet functionality
 * with graphite palette (#0E1217 / #141A21 / #29323C / #16D9E8).
 */
export default function Modals({ activeModal, onClose, systemSpec }) {
  if (!activeModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-[#0E1217]/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* CV Modal */}
      {activeModal === 'cv' && (
        <div
          className="w-full max-w-lg rounded-xl system-panel p-6 sm:p-7 shadow-2xl space-y-5 border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--accent-cyan)]" />
              <h3 className="font-mono-tech font-bold text-[14px] text-[var(--text-primary)] uppercase tracking-wider">
                CURRICULUM_VITAE // DOSSIER
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 font-mono-tech text-sm cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-[14px] text-[var(--text-secondary)] leading-relaxed">
            <p>
              <strong className="text-[var(--text-primary)] font-mono-tech font-bold">RAJAT BEHERA</strong><br />
              B.Tech in Computer Science &amp; Engineering<br />
              Cumulative GPA: <span className="text-[var(--accent-cyan)] font-mono-tech font-bold">8.9 / 10.0</span> · 3x Hackathon Winner
            </p>

            {/* High-contrast dark obsidian code block */}
            <div className="p-4 rounded-lg border border-slate-800 bg-[#0F172A] font-mono-tech text-[12px] space-y-1.5 text-slate-300 shadow-md">
              <div className="text-cyan-400 font-bold uppercase">// CORE COMPETENCIES:</div>
              <div>• 6 Physical Embedded Prototypes (ESP32, STM32, Micro-LiDAR)</div>
              <div>• FreeRTOS Task Scheduling, C/C++, Python, KiCAD PCB Layout</div>
              <div>• TinyML Quantization (INT8), Edge AI, Low-Power MQTT Telemetry</div>
              <div>• Distributed RF Meshes (ESP-NOW, LoRaWAN) &amp; WebSockets</div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-[12px] font-mono-tech font-medium uppercase border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              DISMISS
            </button>
            <button
              type="button"
              onClick={() => {
                alert('Curriculum Vitae Download Initiated: Rajat_Behera_Systems_IoT_Resume.pdf');
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-[12px] font-mono-tech uppercase font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] dark:bg-[var(--accent-cyan)] dark:text-[#0E1217] transition-all cursor-pointer shadow-sm"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400 dark:text-[#0E1217]" />
              <span>DOWNLOAD PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* System Spec Sheet Modal */}
      {activeModal === 'spec' && systemSpec && (
        <div
          className="w-full max-w-xl rounded-xl system-panel p-6 sm:p-7 shadow-2xl space-y-5 border border-[var(--border-subtle)] bg-[var(--bg-surface)] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[var(--accent-cyan)]" />
              <h3 className="font-mono-tech font-bold text-[14px] text-[var(--text-primary)] uppercase tracking-wider">
                {systemSpec.code} // ENGINEERING SPEC
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 font-mono-tech text-sm cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-system-alt)]">
            <img
              src={systemSpec.image}
              alt={systemSpec.title}
              className="w-full h-full object-cover grayscale-[10%]"
            />
          </div>

          <div className="space-y-3 text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
            <h4 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
              {systemSpec.title}
            </h4>
            <p>
              {systemSpec.summary}
            </p>

            {/* High-contrast dark telemetry specs */}
            <div className="p-4 rounded-lg border border-slate-800 bg-[#0F172A] font-mono-tech text-[12px] space-y-1.5 text-slate-300 shadow-md">
              <div className="text-cyan-400 uppercase font-bold">
                SYSTEM TELEMETRY BENCHMARKS
              </div>
              {systemSpec.metrics?.map((m) => (
                <div key={m.key} className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">{m.key}:</span>
                  <span className="text-white font-bold">{m.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end pt-3 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-[12px] font-mono-tech uppercase font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] dark:bg-[var(--accent-cyan)] dark:text-[#0E1217] transition-all cursor-pointer shadow-sm"
            >
              CLOSE SPEC SHEET
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
