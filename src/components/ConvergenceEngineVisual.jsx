import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Cpu, Zap, Activity, Code2 } from 'lucide-react';

/**
 * ConvergenceEngineVisual
 * 
 * The Hero Centerpiece: "The Convergence Engine"
 * Calibrated 70% Software Engineering · 30% Connected Edge & Hardware
 * 
 * Tiers:
 * 01: Web & Client Architecture (React 19 / TypeScript / Optimistic UI) [Software]
 * 02: Distributed Backend & APIs (Node.js / FastAPI / WebSockets / Microservices) [Software]
 * 03: Cloud Infrastructure & Data Fabric (PostgreSQL / Redis / Docker / TimescaleDB) [Software]
 * 04: Connected Edge & IoT Hardware Bridge (ESP32 / FreeRTOS / MQTT / Sensor Bus) [30% Edge]
 */
export default function ConvergenceEngineVisual() {
  const [activeTier, setActiveTier] = useState(null);
  const [packetCount, setPacketCount] = useState(4892);
  const [liveLatency, setLiveLatency] = useState('1.4ms');
  const [isBursting, setIsBursting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Live simulated telemetry ticker
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
      const lat = (1.2 + Math.random() * 0.5).toFixed(1);
      setLiveLatency(`${lat}ms`);
    }, 2400);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleTriggerBurst = () => {
    if (isBursting) return;
    setIsBursting(true);
    setPacketCount((p) => p + 64);
    setTimeout(() => setIsBursting(false), 1400);
  };

  const tiers = [
    {
      id: 'frontend',
      index: '01',
      title: 'REACT & CLIENT PLATFORMS',
      role: 'Full-Stack UI Architecture & Real-Time State',
      tech: 'React 19 · TypeScript · Next.js · Optimistic UI · WebSockets',
      spec: 'SUB-16MS FRAME SYNC',
      track: 'SOFTWARE (70%)',
      icon: Code2,
      color: '#F4F7FA',
      accent: '#16D9E8',
      activity: [40, 75, 95, 60, 85, 50, 95, 80, 65, 90],
    },
    {
      id: 'backend',
      index: '02',
      title: 'DISTRIBUTED BACKEND & APIS',
      role: 'High-Concurrency Services & Microservices',
      tech: 'Node.js · Python FastAPI · REST & GraphQL · Event Queues',
      spec: '100K+ REQ/MIN ENGINE',
      track: 'SOFTWARE (70%)',
      icon: Server,
      color: '#F4F7FA',
      accent: '#3B82F6',
      activity: [55, 85, 45, 95, 70, 90, 60, 85, 75, 65],
    },
    {
      id: 'data',
      index: '03',
      title: 'DATA FABRIC & CLOUD INFRA',
      role: 'Distributed Caching & Time-Series Hypertables',
      tech: 'PostgreSQL · Redis Cache · Docker · TimescaleDB · CI/CD',
      spec: 'SUB-2MS IN-MEMORY CACHE',
      track: 'SOFTWARE (70%)',
      icon: Database,
      color: '#F4F7FA',
      accent: '#16D9E8',
      activity: [70, 60, 85, 80, 55, 90, 45, 95, 70, 85],
    },
    {
      id: 'edge',
      index: '04',
      title: 'CONNECTED EDGE & SENSOR BRIDGE',
      role: 'Real-Time Hardware Bridge & Embedded Telemetry',
      tech: 'ESP32-S3 · FreeRTOS · TLS MQTT · C/C++ · Sensor Bus',
      spec: '30% EDGE BRIDGE',
      track: 'IOT & HARDWARE (30%)',
      icon: Cpu,
      color: '#F4F7FA',
      accent: '#3B82F6',
      activity: [40, 50, 65, 75, 85, 70, 55, 80, 90, 95],
    },
  ];

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">
      
      {/* 1. Atmospheric Ambient Lighting Glow */}
      <div 
        aria-hidden="true"
        className="absolute -inset-4 sm:-inset-8 rounded-3xl pointer-events-none transition-all duration-700"
        style={{
          background: isBursting
            ? `radial-gradient(ellipse 80% 70% at 50% 50%, rgba(22, 217, 232, 0.12) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 80%)`
            : `radial-gradient(ellipse 75% 65% at 50% 50%, rgba(22, 217, 232, 0.05) 0%, rgba(59, 130, 246, 0.035) 40%, transparent 75%)`
        }}
      />

      {/* 2. Top System Header Readout with Live Telemetry */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-[#1A222B] mb-4 font-mono-tech text-[10.5px] text-[#71808D] bg-[#0F1419]/70 backdrop-blur-xs rounded-t-lg">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isBursting ? 'bg-[#16D9E8] opacity-100 scale-150' : 'bg-[#16D9E8] opacity-75'}`} />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
          </span>
          <span className="text-[#AAB5C0] font-medium tracking-wider">CONVERGENCE ENGINE</span>
          <span className="text-[#232D36] hidden sm:inline">•</span>
          <span className="text-[#71808D] text-[10px] hidden sm:inline">
            PKTS: <span className="text-[#F4F7FA] font-semibold">{packetCount.toLocaleString()}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden xs:flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-[#16D9E8] animate-pulse" />
            <span className="text-[10px] text-[#AAB5C0]">{liveLatency}</span>
          </div>
          
          <button
            type="button"
            onClick={handleTriggerBurst}
            title="Simulate hardware data pulse"
            className="group inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9.5px] font-mono-tech text-[#16D9E8] hover:text-[#0A0D10] bg-[#16D9E8]/10 hover:bg-[#16D9E8] border border-[#16D9E8]/30 transition-all duration-200 cursor-pointer"
          >
            <Zap className="w-2.5 h-2.5 transition-transform group-hover:scale-125" />
            <span>PULSE BUS</span>
          </button>
        </div>
      </div>

      {/* 3. The Central Architectural Monolith */}
      <div className="relative z-10 space-y-3">
        
        {/* Continuous Vertical Data Spine (Conduit connecting tiers) */}
        <div 
          aria-hidden="true" 
          className="absolute top-4 bottom-4 left-[28px] sm:left-[32px] w-[1.5px] bg-gradient-to-b from-[#16D9E8]/50 via-[#3B82F6]/40 to-[#16D9E8]/50 pointer-events-none z-0"
        >
          {/* Traveling Data Packet 1 (Downward primary stream) */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{ y: ['0%', '100%'], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: isBursting ? 1.5 : 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-2 h-4 -left-[2.5px] relative rounded-full bg-gradient-to-b from-[#16D9E8] to-[#3B82F6] shadow-[0_0_12px_#16D9E8]"
            />
          )}

          {/* Traveling Data Packet 2 (Upward telemetry feedback stream) */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{ y: ['100%', '0%'], opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: isBursting ? 1.8 : 5.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2,
              }}
              className="w-1.5 h-2.5 -left-[2px] relative rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"
            />
          )}
        </div>

        {/* Four Architectural Tiers */}
        {tiers.map((tier, idx) => {
          const Icon = tier.icon;
          const isHovered = activeTier === tier.id;
          const isDimmed = activeTier !== null && !isHovered;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              onMouseEnter={() => setActiveTier(tier.id)}
              onMouseLeave={() => setActiveTier(null)}
              className={`relative pl-12 sm:pl-14 transition-all duration-300 cursor-pointer ${
                isDimmed ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {/* Node Pivot Marker on Vertical Spine */}
              <div 
                className={`absolute left-[24px] sm:left-[28px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border transition-all duration-300 z-10 ${
                  isHovered || isBursting
                    ? 'bg-[#16D9E8] border-[#16D9E8] shadow-[0_0_14px_#16D9E8] scale-125' 
                    : 'bg-[#0F1419] border-[#232D36]'
                }`}
              />

              {/* Tier Content Surface */}
              <div
                className={`relative overflow-hidden p-4 sm:p-5 rounded-lg border transition-all duration-300 ${
                  isHovered
                    ? 'bg-[#141A21] border-[#16D9E8]/60 shadow-[0_8px_32px_rgba(22,217,232,0.12)] -translate-y-0.5'
                    : isBursting
                    ? 'bg-[#141A21] border-[#16D9E8]/40 shadow-[0_4px_20px_rgba(22,217,232,0.08)]'
                    : 'bg-[#0F1419]/90 border-[#1A222B] hover:border-[#232D36]'
                }`}
              >
                {/* Scanline Sweep on Hover */}
                {isHovered && !prefersReducedMotion && (
                  <div 
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(22, 217, 232, 0.08) 50%, transparent 100%)',
                      animation: 'scanlineSweep 1.8s ease-in-out infinite',
                    }}
                  />
                )}

                {/* Header row: Index + Title + Spec Badge */}
                <div className="relative z-10 flex items-center justify-between gap-3 border-b border-[#1A222B]/70 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono-tech text-[11px] font-bold text-[#16D9E8]">
                      {tier.index}
                    </span>
                    <Icon className={`w-3.5 h-3.5 transition-colors ${isHovered ? 'text-[#16D9E8]' : 'text-[#71808D]'}`} />
                    <h3 className="font-mono-tech text-[11.5px] font-semibold tracking-wider text-[#F4F7FA] uppercase">
                      {tier.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Live Waveform Signal Micro-visualizer */}
                    <div className="flex items-end gap-[2px] h-3.5 px-1.5 py-0.5 rounded bg-[#0A0D10]/60 border border-[#1A222B]">
                      {tier.activity.map((val, barIdx) => (
                        <span
                          key={barIdx}
                          style={{
                            height: isHovered
                              ? `${Math.max(20, (val + (barIdx * 7)) % 100)}%`
                              : `${Math.max(15, val * 0.45)}%`,
                          }}
                          className={`w-[2px] rounded-full transition-all duration-300 ${
                            isHovered ? 'bg-[#16D9E8]' : 'bg-[#71808D]/60'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="font-mono-tech text-[9.5px] font-medium tracking-wide text-[#71808D] bg-[#141A21] px-2 py-0.5 rounded border border-[#1A222B]">
                      {tier.spec}
                    </span>
                  </div>
                </div>

                {/* Role Description & Track Badge */}
                <div className="relative z-10 text-[13px] font-medium text-[#F4F7FA] tracking-tight mb-1 flex items-center justify-between">
                  <span>{tier.role}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono-tech text-[9px] font-semibold px-1.5 py-0.5 rounded border ${
                      tier.id === 'edge' 
                        ? 'text-[#3B82F6] border-[#3B82F6]/30 bg-[#3B82F6]/10' 
                        : 'text-[#16D9E8] border-[#16D9E8]/30 bg-[#16D9E8]/10'
                    }`}>
                      {tier.track}
                    </span>
                    {isHovered && (
                      <span className="text-[#16D9E8] font-mono-tech text-[9.5px] tracking-widest uppercase animate-pulse hidden sm:inline">
                        ● ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Tech Stack Details */}
                <div className="relative z-10 font-mono-tech text-[11.5px] text-[#71808D] flex items-center justify-between">
                  <span>{tier.tech}</span>
                </div>
              </div>
            </motion.div>
          );
        })}

      </div>

      {/* 4. Bottom System Status Bar: 70/30 Engineering Ratio */}
      <div className="relative z-10 px-4 py-3 border-t border-[#1A222B] mt-4 font-mono-tech text-[10px] text-[#71808D] bg-[#0F1419]/70 backdrop-blur-xs rounded-b-lg space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>ENGINEERING RATIO:</span>
            <span className="text-[#16D9E8] font-bold">70% SOFTWARE DEV</span>
            <span className="text-[#232D36]">/</span>
            <span className="text-[#3B82F6] font-bold">30% CONNECTED EDGE</span>
          </div>
          <div className="text-[#AAB5C0] text-[10px]">
            ARCH: <span className="text-[#F4F7FA] font-medium">FULL-STACK · CLOUD · SENSORS</span>
          </div>
        </div>

        {/* Dual Accent Ratio Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#141A21] border border-[#1A222B] flex overflow-hidden">
          <div 
            style={{ width: '70%' }} 
            className="h-full bg-gradient-to-r from-[#16D9E8] to-[#14C1CE] shadow-[0_0_8px_rgba(22,217,232,0.4)]"
            title="70% Software Development & Distributed Cloud"
          />
          <div 
            style={{ width: '30%' }} 
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] opacity-80"
            title="30% Connected IoT & Edge Silicon"
          />
        </div>
      </div>

    </div>
  );
}
