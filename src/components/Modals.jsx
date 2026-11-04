import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  BookOpen,
  Layers,
  GraduationCap,
  Briefcase,
  Code2,
  Trophy,
  ExternalLink,
  Download,
  Mail,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import LiquidButton from './LiquidButton';

/**
 * Modals Component — Arctic Aurora Edition
 *
 * Features:
 * 1. Interactive Curriculum Vitae Modal rendered from verified resume data:
 *    - Direct PDF download (/Rajat_Behera_Resume.pdf)
 *    - "Open in New Tab" viewer option
 *    - Professional summary, education breakdown (YCCE B.Tech IoT), technical skills matrix,
 *      featured project bullets (Smart Parking System, DealOrbit, TransitOps, FleetFlow),
 *      and hackathon achievements.
 * 2. System Architecture / Case Study Overview Modal.
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

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Rajat_Behera_Resume.pdf';
    link.download = 'Rajat_Behera_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenResumeInNewTab = () => {
    window.open('/Rajat_Behera_Resume.pdf', '_blank', 'noopener,noreferrer');
  };

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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-md"
          onClick={onClose}
        >
          {/* =========================================================================
              CURRICULUM VITAE MODAL
              ========================================================================= */}
          {activeModal === 'cv' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl rounded-3xl p-5 sm:p-7 space-y-5 border border-[#D5DFEB] bg-white shadow-[0_24px_70px_rgba(37,99,235,0.18)] max-h-[92vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3.5 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F1FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/20">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-[#111827] leading-tight">
                      Curriculum Vitae
                    </h3>
                    <p className="text-[12px] text-[#64748B]">
                      Verified Official Resume · Rajat Behera
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenResumeInNewTab}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] transition-colors cursor-pointer"
                    title="View PDF directly in browser"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="text-[#64748B] hover:text-[#111827] p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-5 text-[13.5px] text-[#4B5563] leading-relaxed custom-scrollbar">
                
                {/* 1. Header Information */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#E2E8F0]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="text-[#0F172A] font-bold text-2xl font-sans-editorial tracking-tight">
                        RAJAT BEHERA
                      </h4>
                      <p className="text-[#2563EB] font-semibold text-[13.5px] mt-0.5">
                        Software Developer · IoT &amp; Embedded Systems · AI/ML
                      </p>
                      <p className="text-[12.5px] text-[#475569] mt-0.5">
                        B.Tech Computer Science and Engineering (IoT) Student
                      </p>
                    </div>

                    <div className="text-[12px] text-[#64748B] space-y-0.5 sm:text-right">
                      <div>
                        <a href="mailto:rajatb220m@gmail.com" className="hover:text-[#2563EB] transition-colors">
                          rajatb220m@gmail.com
                        </a>
                      </div>
                      <div>
                        <a href="https://linkedin.com/in/rajat-behera-5a02b7328/" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] transition-colors">
                          linkedin.com/in/rajat-behera-5a02b7328
                        </a>
                      </div>
                      <div>
                        <a href="https://github.com/rajatbehera05" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] transition-colors">
                          github.com/rajatbehera05
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Professional Summary */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#0F172A] font-bold text-[13.5px] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Professional Summary</span>
                  </div>
                  <p className="text-[13px] text-[#334155] leading-relaxed">
                    B.Tech Computer Science and Engineering (IoT) student with hands-on experience in full-stack web development, IoT systems, and software engineering. Experienced in building end-to-end applications using Java, JavaScript, React.js, Node.js, Express.js, SQL, and PostgreSQL/MySQL, including ESP32-based hardware integration. Built real-time dashboards, REST APIs, database-driven systems, and IoT automation projects while expanding skills in AI/ML and Data Structures &amp; Algorithms.
                  </p>
                </div>

                {/* 3. Education */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[#0F172A] font-bold text-[13.5px] uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                    <span>Education</span>
                  </div>

                  <div className="space-y-2">
                    {/* YCCE */}
                    <div className="p-3.5 rounded-xl border border-[#D5DFEB] bg-[#F8FAFC]/70">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="font-bold text-[#0F172A] text-[13.5px]">
                          Yeshwantrao Chavan College of Engineering (YCCE), Nagpur
                        </span>
                        <span className="text-[12px] font-mono text-[#64748B]">2024–2028</span>
                      </div>
                      <div className="text-[12.5px] text-[#2563EB] font-medium mt-0.5">
                        B.Tech in Computer Science and Engineering (IoT)
                      </div>
                      <div className="text-[12px] text-[#475569] mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                        <span className="font-semibold text-[#0F172A]">Sem 1: 9.31</span>
                        <span>•</span>
                        <span className="font-semibold text-[#0F172A]">Sem 2: 9.11</span>
                        <span>•</span>
                        <span className="font-semibold text-[#0F172A]">Sem 3: 8.74</span>
                        <span>•</span>
                        <span className="font-semibold text-[#0F172A]">Sem 4: 8.51</span>
                        <span>•</span>
                        <span className="text-[#2563EB] font-medium">Currently in Semester 5</span>
                      </div>
                    </div>

                    {/* Junior College & School */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px]">
                      <div className="p-3 rounded-xl border border-[#E2E8F0] bg-white">
                        <div className="font-semibold text-[#0F172A]">Shri Mathuradas Mohota College of Science</div>
                        <div className="text-[#64748B] text-[12px]">Class 12 · <strong className="text-[#0F172A]">83.18%</strong></div>
                      </div>
                      <div className="p-3 rounded-xl border border-[#E2E8F0] bg-white">
                        <div className="font-semibold text-[#0F172A]">St. Mary's School</div>
                        <div className="text-[#64748B] text-[12px]">Class 10 · <strong className="text-[#0F172A]">92.20%</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Technical Skills */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[#0F172A] font-bold text-[13.5px] uppercase tracking-wider">
                    <Code2 className="w-4 h-4 text-[#2563EB]" />
                    <span>Technical Skills</span>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#D5DFEB] bg-[#F8FAFC] space-y-2 text-[13px]">
                    <div>
                      <strong className="text-[#0F172A]">Languages:</strong>{' '}
                      <span className="text-[#334155]">Java, JavaScript, Python, SQL</span>
                    </div>
                    <div>
                      <strong className="text-[#0F172A]">Web Development:</strong>{' '}
                      <span className="text-[#334155]">HTML, CSS, React.js, Vite, Node.js, Express.js, REST APIs</span>
                    </div>
                    <div>
                      <strong className="text-[#0F172A]">Databases:</strong>{' '}
                      <span className="text-[#334155]">PostgreSQL, MySQL, Database Management</span>
                    </div>
                    <div>
                      <strong className="text-[#0F172A]">IoT &amp; Embedded Systems:</strong>{' '}
                      <span className="text-[#334155]">ESP32, Arduino IDE, IR Sensors, Servo Motors, IoT Integration</span>
                    </div>
                    <div>
                      <strong className="text-[#0F172A]">Tools:</strong>{' '}
                      <span className="text-[#334155]">Git, GitHub, VS Code, Docker</span>
                    </div>
                    <div>
                      <strong className="text-[#0F172A]">AI/ML:</strong>{' '}
                      <span className="text-[#334155]">Machine Learning Fundamentals, Data Analysis</span>
                    </div>
                    <div>
                      <strong className="text-[#0F172A]">Data Structures &amp; Algorithms:</strong>{' '}
                      <span className="text-[#334155]">Arrays, Searching, Sorting, Basic Problem Solving</span>
                    </div>
                  </div>
                </div>

                {/* 5. Projects */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[#0F172A] font-bold text-[13.5px] uppercase tracking-wider">
                    <Briefcase className="w-4 h-4 text-[#2563EB]" />
                    <span>Featured Engineering Projects</span>
                  </div>

                  <div className="space-y-3">
                    {/* Project 1 */}
                    <div className="p-3.5 rounded-xl border border-[#D5DFEB] bg-white space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h5 className="font-bold text-[#0F172A] text-[14px]">
                          Smart Parking System <span className="text-[#64748B] font-normal text-[12px]">| IoT &amp; Full-Stack Web Application</span>
                        </h5>
                        <span className="text-[11.5px] font-medium text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-md self-start sm:self-auto">
                          Individual Project
                        </span>
                      </div>
                      <div className="text-[11.5px] font-mono text-[#64748B]">
                        React.js, Vite, Node.js, Express.js, ESP32, IR Sensors, REST APIs
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-[12.5px] text-[#334155] pt-1">
                        <li>Developed an IoT-enabled parking management system combining a web dashboard with ESP32-based hardware integration.</li>
                        <li>Implemented real-time parking occupancy tracking, slot availability, reservation, automatic slot assignment, and gate-control workflows.</li>
                        <li>Integrated IR sensors and an SG90 servo motor with the backend for physical vehicle detection and barrier control.</li>
                        <li>Built REST APIs for parking status, slot assignment, reservations, and sensor synchronization between ESP32 and web app.</li>
                        <li>Tested system using simulated sensor inputs before physical hardware integration.</li>
                      </ul>
                    </div>

                    {/* Project 2 */}
                    <div className="p-3.5 rounded-xl border border-[#D5DFEB] bg-white space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h5 className="font-bold text-[#0F172A] text-[14px]">
                          DealOrbit <span className="text-[#64748B] font-normal text-[12px]">| Sales Operations Platform</span>
                        </h5>
                        <span className="text-[11.5px] font-medium text-[#8B5CF6] bg-[#F5F3FF] px-2 py-0.5 rounded-md self-start sm:self-auto">
                          Odoo Hackathon Project
                        </span>
                      </div>
                      <div className="text-[11.5px] font-mono text-[#64748B]">
                        Odoo, Web Development, Database Systems
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-[12.5px] text-[#334155] pt-1">
                        <li>Developed a sales operations platform focused on quotation-to-cash workflows and deal strategy.</li>
                        <li>Designed features around deal validation, scenario exploration, and sales decision support.</li>
                        <li>Participated in the 24-hour Odoo Hackathon as part of a team and reached the finalist stage.</li>
                      </ul>
                    </div>

                    {/* Project 3 */}
                    <div className="p-3.5 rounded-xl border border-[#D5DFEB] bg-white space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h5 className="font-bold text-[#0F172A] text-[14px]">
                          TransitOps <span className="text-[#64748B] font-normal text-[12px]">| Smart Transport Operations Platform</span>
                        </h5>
                        <span className="text-[11.5px] font-medium text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-md self-start sm:self-auto">
                          Individual Project
                        </span>
                      </div>
                      <div className="text-[11.5px] font-mono text-[#64748B]">
                        Next.js, Node.js, Express.js, PostgreSQL
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-[12.5px] text-[#334155] pt-1">
                        <li>Developed a full-stack platform for managing drivers, vehicles, trips, and transport department operations.</li>
                        <li>Implemented vehicle availability, trip management, and damage/maintenance logging.</li>
                        <li>Designed a relational PostgreSQL schema supporting relationships between drivers, vehicles, trips, and maintenance records.</li>
                      </ul>
                    </div>

                    {/* Project 4 */}
                    <div className="p-3.5 rounded-xl border border-[#D5DFEB] bg-white space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h5 className="font-bold text-[#0F172A] text-[14px]">
                          FleetFlow <span className="text-[#64748B] font-normal text-[12px]">| Fleet &amp; Logistics Management System</span>
                        </h5>
                        <span className="text-[11.5px] font-medium text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-md self-start sm:self-auto">
                          Individual Project
                        </span>
                      </div>
                      <div className="text-[11.5px] font-mono text-[#64748B]">
                        Next.js, Node.js, Express.js, SQL
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-[12.5px] text-[#334155] pt-1">
                        <li>Developed a logistics management system focused on fleet visibility, vehicle availability, and operational workflows.</li>
                        <li>Implemented REST APIs for core fleet and logistics operations.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 6. Achievements */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[#0F172A] font-bold text-[13.5px] uppercase tracking-wider">
                    <Trophy className="w-4 h-4 text-[#D97706]" />
                    <span>Honors &amp; Achievements</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px]">
                    <div className="p-3 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] flex items-center gap-2.5">
                      <Trophy className="w-4 h-4 text-[#D97706] shrink-0" />
                      <div>
                        <strong className="text-[#0F172A]">Hackathon · 1st Runner-Up</strong>
                        <div className="text-[#92400E] text-[11.5px]">Team STERNKRAFT (ResQnet)</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-[#E9D5FF] bg-[#FAF5FF] flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-[#7C3AED] shrink-0" />
                      <div>
                        <strong className="text-[#0F172A]">Odoo Hackathon · Finalist</strong>
                        <div className="text-[#6B21A8] text-[11.5px]">DealOrbit · 24-Hour Hackathon</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Action Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] shrink-0">
                <button
                  type="button"
                  onClick={handleOpenResumeInNewTab}
                  className="sm:hidden inline-flex items-center gap-1 text-[12px] font-semibold text-[#2563EB]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open PDF</span>
                </button>

                <div className="flex items-center gap-2.5 ml-auto">
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
                    onClick={handleDownloadResume}
                    aria-label="Download PDF Resume"
                    className="flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </LiquidButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              PROJECT OVERVIEW / SYSTEM SPEC MODAL
              ========================================================================= */}
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

                <p className="text-[13.5px]">{systemSpec.description}</p>

                {systemSpec.highlights && (
                  <div className="p-4 rounded-2xl border border-[#D5DFEB] bg-[#F8FAFC] space-y-2 text-[13px]">
                    <div className="text-[#111827] font-semibold text-[13.5px] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                      <span>Key Architectural Highlights</span>
                    </div>
                    <ul className="space-y-1 text-[#4B5563] list-disc list-inside">
                      {systemSpec.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {systemSpec.techs && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {systemSpec.techs.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] text-[#2563EB] text-[11px] font-semibold border border-[#BFDBFE]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
                <LiquidButton
                  variant="secondary"
                  size="sm"
                  onClick={onClose}
                  aria-label="Close Project Overview"
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
