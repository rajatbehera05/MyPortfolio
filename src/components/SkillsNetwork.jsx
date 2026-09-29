import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Server, Code2, Database, Network, CheckCircle2, X } from 'lucide-react';

/**
 * Skills Section: TECHNOLOGY NETWORK
 * 
 * Calibrated: 70% Full-Stack Software Engineering · 30% Connected Edge & Hardware
 * Interconnected pipelines moving from modern web clients to cloud databases and edge silicon:
 * - React 19 / TypeScript → Zustand → Optimistic UI
 * - Node.js / FastAPI → REST & gRPC → Microservices
 * - PostgreSQL → Redis → TimescaleDB → Docker
 * - WebSockets → Redis Pub/Sub → Distributed Events
 * - ESP32 / FreeRTOS → C++ → MQTT → Physical Bridge (30%)
 */
export default function SkillsNetwork() {
  const [selectedTech, setSelectedTech] = useState(null);

  const networks = [
    {
      group: 'MODERN FRONTEND & CLIENT ARCHITECTURE',
      track: 'SOFTWARE (70%)',
      isSoftware: true,
      icon: Code2,
      pipeline: [
        { name: 'React 19 / Next.js', note: 'Server & client components, suspense boundaries, memory profiling, and high-FPS UI rendering.' },
        { name: 'TypeScript', note: 'Strict typing, generic utility types, type-safe API contracts, and Zod runtime schema validation.' },
        { name: 'Zustand & State Engines', note: 'Predictable event-driven state, optimistic UI mutation rollbacks, and CRDT sync state.' },
        { name: 'Modern CSS & Design Systems', note: 'Tailwind CSS, CSS-in-JS, token-based design systems, responsive layouts, and dark mode.' }
      ],
      detail: 'Architecting fast, responsive client applications with modern React, optimistic UI mutations, and strictly-typed contracts.'
    },
    {
      group: 'BACKEND SERVICES & DISTRIBUTED APIS',
      track: 'SOFTWARE (70%)',
      isSoftware: true,
      icon: Server,
      pipeline: [
        { name: 'Node.js / Express', note: 'Non-blocking event loop, JWT session security, middleware pipelines, and microservice routers.' },
        { name: 'Python (FastAPI / AsyncIO)', note: 'High-throughput async endpoints, background tasks, Pydantic V2 JIT validation, and clean architecture.' },
        { name: 'RESTful & gRPC APIs', note: 'Protocol buffer schemas, idempotent endpoints, versioned API contracts, and OpenAPI specifications.' },
        { name: 'Auth & API Security', note: 'OAuth2 / JWT stateless authentication, token-bucket rate limiting, and CORS security guards.' }
      ],
      detail: 'Engineering high-throughput asynchronous backend services, microservices, and robust REST/gRPC endpoints.'
    },
    {
      group: 'DATA ARCHITECTURE & CLOUD PERSISTENCE',
      track: 'SOFTWARE (70%)',
      isSoftware: true,
      icon: Database,
      pipeline: [
        { name: 'PostgreSQL', note: 'Normalized relational schemas, index optimization, query execution plan tuning, and ACID transactions.' },
        { name: 'Redis In-Memory Cache', note: 'Sub-millisecond key-value caching, distributed locking, TTL eviction policies, and session stores.' },
        { name: 'TimescaleDB', note: 'Time-series hypertables partitioned by microsecond device telemetry timestamps with data compression.' },
        { name: 'Docker & CI/CD Pipelines', note: 'Multi-stage Docker containers, Docker Compose, and automated GitHub Actions test/build pipelines.' }
      ],
      detail: 'Structuring durable database architectures, sub-millisecond in-memory caching tiers, and containerized deployments.'
    },
    {
      group: 'REAL-TIME FABRIC & DISTRIBUTED MESSAGING',
      track: 'SOFTWARE (70%)',
      isSoftware: true,
      icon: Network,
      pipeline: [
        { name: 'WebSockets & SSE', note: 'Sub-20ms bi-directional event streaming, heartbeat ping-pong health checks, and auto-reconnection.' },
        { name: 'Redis Pub/Sub & Queues', note: 'Cross-pod message broadcasting and asynchronous worker task queues handling high-burst traffic.' },
        { name: 'Event-Driven Architectures', note: 'Decoupled microservice architectures communicating via asynchronous pub/sub event channels.' },
        { name: 'OpenTelemetry & Tracing', note: 'Distributed correlation IDs, latency histogram tracking, and performance metric export.' }
      ],
      detail: 'Connecting distributed services with event-driven message buses, bi-directional WebSocket streams, and zero-drop queuing.'
    },
    {
      group: 'CONNECTED IOT & EMBEDDED EDGE',
      track: 'CONNECTED EDGE (30%)',
      isSoftware: false,
      icon: Cpu,
      pipeline: [
        { name: 'ESP32-S3 / C++ Firmware', note: 'Dual-core Xtensa, bare-metal hardware abstraction layer, interrupts, and low-power sleep modes.' },
        { name: 'FreeRTOS Kernel', note: 'Deterministic task preemption, binary semaphores, inter-task queues, and watchdog timers.' },
        { name: 'TLS MQTT & RF Meshes', note: 'Port 8883 encrypted MQTT telemetry, QoS 1 delivery, and ESP-NOW peer-to-peer wireless networks.' },
        { name: 'Sensor Bus & Validation', note: 'I2C/SPI micro-LiDAR and IMU data acquisition with logic analyzer timing validation.' }
      ],
      detail: 'The physical edge bridge: low-power microcontrollers, bare-metal C++, deterministic task scheduling, and telemetry feeds.'
    }
  ];

  return (
    <section
      id="tech"
      aria-label="Technology Network"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
      {/* Invisible anchor for backward compatibility */}
      <div id="skills" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3 mb-10"
      >
        <div className="flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.2em] text-[#16D9E8] uppercase font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D9E8] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
          </span>
          <span>TECHNOLOGY NETWORK // 02</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          Technology Network
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
          Technologies function as interconnected pipelines: from modern React frontends and high-concurrency microservices, to cloud persistence tiers and embedded edge sensors. Click any node to inspect field notes.
        </p>
      </motion.div>

      {/* 70/30 Ratio Capability Meter Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 p-4 rounded-xl border border-[#1A222B] bg-[#0F1419] font-mono-tech text-[11px] space-y-2.5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[#71808D] uppercase font-medium">SKILL CALIBRATION:</span>
            <span className="text-[#16D9E8] font-bold">70% FULL-STACK SOFTWARE &amp; CLOUD</span>
            <span className="text-[#232D36]">/</span>
            <span className="text-[#3B82F6] font-bold">30% CONNECTED IOT &amp; EDGE</span>
          </div>
          <div className="text-[10px] text-[#AAB5C0]">
            TOTAL PIPELINES: <span className="text-[#F4F7FA] font-bold">5 TIERS (20 VERIFIED NODES)</span>
          </div>
        </div>

        {/* Dual Meter Bar */}
        <div className="w-full h-2 rounded-full bg-[#141A21] border border-[#1A222B] flex overflow-hidden">
          <div 
            style={{ width: '70%' }} 
            className="h-full bg-gradient-to-r from-[#16D9E8] to-[#14C1CE] shadow-[0_0_10px_rgba(22,217,232,0.4)]"
            title="70% Software Development (Frontend, Backend, Databases, Real-Time Fabric)"
          />
          <div 
            style={{ width: '30%' }} 
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] opacity-80"
            title="30% Connected Edge & IoT (ESP32, FreeRTOS, MQTT, Hardware Bridge)"
          />
        </div>
      </motion.div>

      {/* Connected Technology Pipelines */}
      <div className="space-y-4">
        {networks.map((net, netIdx) => {
          const Icon = net.icon;
          return (
            <motion.div
              key={net.group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: netIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-6 rounded-xl border border-[#1A222B] bg-[#0F1419]/90 hover:border-[#232D36] hover:bg-[#141A21] transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                
                {/* Left: Group title & description */}
                <div className="lg:w-1/3 space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border ${
                      net.isSoftware
                        ? 'bg-[#16D9E8]/10 border-[#16D9E8]/20 text-[#16D9E8]'
                        : 'bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-mono-tech text-[12px] sm:text-[13px] font-semibold text-[#F4F7FA] tracking-wide">
                        {net.group}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#AAB5C0] leading-relaxed">
                    {net.detail}
                  </p>
                </div>

                {/* Right: Connected Pipeline Graph */}
                <div className="lg:w-2/3">
                  <div className="p-3 rounded-lg border border-[#1A222B] bg-[#0A0D10]/70 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 overflow-x-auto">
                    {net.pipeline.map((item, nIdx) => {
                      const isLast = nIdx === net.pipeline.length - 1;
                      const isSelected = selectedTech?.name === item.name;

                      return (
                        <React.Fragment key={item.name}>
                          <button
                            type="button"
                            onClick={() => setSelectedTech(isSelected ? null : item)}
                            className={`flex items-center gap-2 py-2 px-3 rounded-md transition-all duration-200 cursor-pointer text-left ${
                              isSelected
                                ? 'bg-[#16D9E8] text-[#0A0D10] border border-[#16D9E8] shadow-[0_0_12px_#16D9E8]'
                                : 'bg-[#141A21] border border-[#1A222B] text-[#F4F7FA] hover:border-[#16D9E8]/50 hover:bg-[#1A222B]'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isSelected ? 'bg-[#0A0D10] animate-ping' : net.isSoftware ? 'bg-[#16D9E8]' : 'bg-[#3B82F6]'
                            }`} />
                            <span className="font-mono-tech text-[12px] font-medium whitespace-nowrap">
                              {item.name}
                            </span>
                          </button>
                          {!isLast && (
                            <div className="hidden sm:flex items-center text-[#16D9E8]/60 font-mono-tech text-xs select-none">
                              →
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Tech Inspector Callout */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mt-4"
          >
            <div className="p-4 rounded-xl border border-[#16D9E8]/40 bg-[#141A21] text-[#F4F7FA] shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono-tech text-[11px] text-[#16D9E8] uppercase font-bold tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>FIELD VERIFICATION // {selectedTech.name}</span>
                </div>
                <p className="text-[13.5px] text-[#AAB5C0]">
                  {selectedTech.note}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTech(null)}
                className="p-1 rounded text-[#71808D] hover:text-[#F4F7FA] hover:bg-[#1A222B] transition-colors cursor-pointer"
                aria-label="Close Inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
