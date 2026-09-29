import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Cpu, Radio, Network, Database, Layout, Sparkles, 
  Activity, Server, Code2, Globe 
} from 'lucide-react';

/**
 * Projects Section: SYSTEMS & SOFTWARE I HAVE BUILT
 * 
 * Calibrated: 70% Full-Stack Software Engineering & Cloud Platforms · 30% Connected Edge & IoT
 * Features:
 * - Interactive filter tabs: ALL (4) | SOFTWARE & CLOUD (70%) | CONNECTED IOT (30%)
 * - Interactive signal/state propagation simulations
 * - Multi-stage pipeline inspection
 * - Visual live software consoles & bench photography
 */
export default function Projects({ onOpenSpec }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'SOFTWARE' | 'IOT'
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [activeStage, setActiveStage] = useState(null);
  const [activeSimulationId, setActiveSimulationId] = useState(null); // 'omnisync' | 'parksense' | null
  const [activePingStage, setActivePingStage] = useState(null); // 0, 1, 2, 3, 4
  const [pingStatusText, setPingStatusText] = useState(null);

  const systems = [
    {
      id: 'omnisync',
      code: 'SYS_01',
      title: 'OmniSync — Real-Time Collaborative Cloud Workspace',
      category: 'FULL-STACK • DISTRIBUTED SYSTEMS • REAL-TIME',
      track: 'SOFTWARE (70%)',
      isSoftware: true,
      status: 'PRODUCTION READY',
      summary: 'High-concurrency distributed collaborative canvas with conflict-free replicated data types (CRDTs), sub-15ms multi-tenant state replication over WebSockets, and Redis Pub/Sub cluster.',
      pipeline: [
        { 
          label: 'Client State', 
          role: 'React 19 + Zustand', 
          icon: Code2,
          spec: 'Optimistic State Mutation · Vector Clock Timestamp · Local Undo/Redo' 
        },
        { 
          label: 'API Gateway', 
          role: 'Node.js + WebSockets', 
          icon: Server,
          spec: 'Multiplexed WSS Session Pools · JWT Claims Auth · Sub-5ms Handshake' 
        },
        { 
          label: 'Message Broker', 
          role: 'Redis Pub/Sub Cluster', 
          icon: Network,
          spec: 'Distributed Cross-Pod Broadcast · 10,000+ Active Channel Multiplex' 
        },
        { 
          label: 'Persistence', 
          role: 'PostgreSQL Hypertables', 
          icon: Database,
          spec: 'Async WAL Commit Log · JSONB Document Delta Compression · ACID Safe' 
        },
        { 
          label: 'Client Twin', 
          role: 'Collaborative UI Twin', 
          icon: Layout,
          spec: 'Zero-Lag Canvas Synchronization · Sub-15ms Multi-Peer Convergence' 
        }
      ],
      metrics: [
        { key: 'SYNC LATENCY', val: '< 14ms' },
        { key: 'CONCURRENCY', val: '10k+ Sockets' },
        { key: 'CRDT CONVERGE', val: '100% Deterministic' },
        { key: 'CLIENT CPU', val: '< 3.2% Load' }
      ],
      previewType: 'software-console',
      image: '/assets/workbench.jpg',
      tags: ['React 19', 'TypeScript', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL', 'Docker', 'CRDTs']
    },
    {
      id: 'nexusflow',
      code: 'SYS_02',
      title: 'NexusFlow — High-Throughput Microservice API Gateway',
      category: 'BACKEND • CLOUD ARCHITECTURE • DEVOPS',
      track: 'SOFTWARE (70%)',
      isSoftware: true,
      status: 'BENCH TESTED 150K REQ/MIN',
      summary: 'Asynchronous microservices API orchestrator and observability platform featuring dynamic token-bucket rate limiting, distributed caching with Redis, and automated OpenTelemetry tracing.',
      pipeline: [
        { 
          label: 'Ingress Edge', 
          role: 'Envoy / Reverse Proxy', 
          icon: Globe,
          spec: 'TLS 1.3 Termination · IP Bucket Sharding · Distributed DDoS Shield' 
        },
        { 
          label: 'Async Core', 
          role: 'Python FastAPI / AsyncIO', 
          icon: Server,
          spec: 'Non-Blocking Event Loop · Pydantic V2 JIT Validation · Worker Pools' 
        },
        { 
          label: 'Fast Cache', 
          role: 'Redis In-Memory Tier', 
          icon: Database,
          spec: 'Sub-1.2ms Read Caching · 94.6% Cache Hit Rate · Sliding Window Expiry' 
        },
        { 
          label: 'Observability', 
          role: 'OpenTelemetry + Grafana', 
          icon: Activity,
          spec: 'Distributed Trace Spans · Correlation IDs · P99 Latency Alarms' 
        },
        { 
          label: 'Admin Portal', 
          role: 'React Cloud Dashboard', 
          icon: Layout,
          spec: 'Live Microservice Topology · Error Budget Visualizer · Route Analytics' 
        }
      ],
      metrics: [
        { key: 'THROUGHPUT', val: '150K+ req/min' },
        { key: 'P99 LATENCY', val: '8.2ms' },
        { key: 'CACHE HIT RATE', val: '94.6%' },
        { key: 'UPTIME SLA', val: '99.99%' }
      ],
      previewType: 'gateway-console',
      image: '/assets/workbench.jpg',
      tags: ['Python FastAPI', 'AsyncIO', 'Redis Cluster', 'Docker', 'PostgreSQL', 'OpenTelemetry', 'gRPC']
    },
    {
      id: 'parksense',
      code: 'SYS_03',
      title: 'ParkSense — Autonomous IoT Edge Node & Telemetry Twin',
      category: 'CONNECTED IOT • EMBEDDED • REAL-TIME TWIN',
      track: 'CONNECTED EDGE (30%)',
      isSoftware: false,
      status: 'DEPLOYED & FIELD TESTED',
      summary: 'Low-power autonomous parking occupancy detector fusing micro-LiDAR rangefinding with edge state filtering and telemetry over MQTT into a live React digital twin.',
      pipeline: [
        { 
          label: 'Sensor Layer', 
          role: 'Micro-LiDAR Rangefinder', 
          icon: Cpu,
          spec: 'VL53L1X · I2C Bus 0x29 · 940nm VCSEL · 5Hz Sampling' 
        },
        { 
          label: 'Edge Silicon', 
          role: 'ESP32-S3 + FreeRTOS', 
          icon: Radio,
          spec: 'Dual-Core 240MHz · FreeRTOS Task Scheduler · 18μA Deep Sleep' 
        },
        { 
          label: 'Transport Bus', 
          role: 'TLS MQTT Broker', 
          icon: Network,
          spec: 'Port 8883 Encrypted · QoS 1 Telemetry · 42-Byte Payload' 
        },
        { 
          label: 'Backend Core', 
          role: 'FastAPI Streamer DB', 
          icon: Database,
          spec: 'TimescaleDB Hypertable · 99.4% State Detection Accuracy' 
        },
        { 
          label: 'Client UI', 
          role: 'Live Occupancy Twin', 
          icon: Layout,
          spec: 'WebSocket Telemetry Feed · Sub-25ms Digital Twin Update' 
        }
      ],
      metrics: [
        { key: 'ACCURACY', val: '99.4%' },
        { key: 'LATENCY', val: '< 25ms' },
        { key: 'CURRENT DRAIN', val: '18μA Sleep' },
        { key: 'SAMPLING', val: '5Hz Vector' }
      ],
      previewType: 'image',
      image: '/assets/parking_node.jpg',
      tags: ['ESP32-S3', 'Micro-LiDAR', 'FreeRTOS', 'MQTT', 'KiCAD', 'C++', 'React Twin']
    },
    {
      id: 'edgevision',
      code: 'SYS_04',
      title: 'EdgeVision — Microcontroller TinyML Defect Classifier',
      category: 'AI SOFTWARE • EMBEDDED RUNTIME • WEB UI',
      track: 'HYBRID (70% SW / 30% EDGE)',
      isSoftware: false,
      status: 'BENCHMARK VERIFIED',
      summary: 'Quantized INT8 convolutional neural network on ARM Cortex-M paired with a cloud diagnostics portal and automated model telemetry ingestion for real-time acoustic defect classification.',
      pipeline: [
        { 
          label: 'Sensor Input', 
          role: 'I2S Mic & OV2640', 
          icon: Cpu,
          spec: 'I2S Audio DMA Stream · 16-Bit 16kHz · Fast Frame Buffer' 
        },
        { 
          label: 'Preprocessing', 
          role: 'Spectrogram / Fast-FFT', 
          icon: Radio,
          spec: 'CMSIS-DSP FFT Engine · Log-Mel Filterbank Acceleration' 
        },
        { 
          label: 'AI Inference', 
          role: 'TinyML INT8 Quantized', 
          icon: Sparkles,
          spec: '84 KB SRAM Footprint · 14.2ms Latency · 97.2% Precision' 
        },
        { 
          label: 'Cloud Stream', 
          role: 'WebSocket Alert Bus', 
          icon: Network,
          spec: 'Real-Time Anomaly Dispatch · Sub-Second Cloud Push' 
        },
        { 
          label: 'Operator UI', 
          role: 'Spectral Waterfall UI', 
          icon: Layout,
          spec: 'Live Spectral Anomaly Waterfall · Sub-second Alerts' 
        }
      ],
      metrics: [
        { key: 'INFERENCE', val: '14.2ms' },
        { key: 'MODEL SIZE', val: '84 KB INT8' },
        { key: 'PRECISION', val: '97.2%' },
        { key: 'CORE', val: 'ARM Cortex-M' }
      ],
      previewType: 'image',
      image: '/assets/workbench.jpg',
      tags: ['ARM Cortex', 'TinyML', 'TensorFlow / PyTorch', 'Python', 'WebSockets', 'React']
    }
  ];

  // Filtered systems list
  const filteredSystems = systems.filter((sys) => {
    if (filter === 'SOFTWARE') return sys.isSoftware;
    if (filter === 'IOT') return !sys.isSoftware;
    return true;
  });

  // Signal propagation simulation
  const handleSimulate = (systemId) => {
    if (activeSimulationId !== null) return;
    setActiveSimulationId(systemId);
    setActivePingStage(0);

    const isOmni = systemId === 'omnisync';
    const stages = isOmni
      ? [
          { stage: 0, text: 'STAGE 1/5: React state mutated locally via Zustand & CRDT clock (0.8ms)', delay: 0 },
          { stage: 1, text: 'STAGE 2/5: WebSocket payload serialized & encrypted over TLS (3.2ms)', delay: 280 },
          { stage: 2, text: 'STAGE 3/5: Redis Pub/Sub cluster broadcasting to multi-tenant pods (6.9ms)', delay: 560 },
          { stage: 3, text: 'STAGE 4/5: PostgreSQL WAL append-only log written & compressed (11.4ms)', delay: 840 },
          { stage: 4, text: 'STAGE 5/5: Distributed peer canvases converged with zero conflict (13.8ms)', delay: 1120 },
        ]
      : [
          { stage: 0, text: 'STAGE 1/5: 940nm LiDAR photon burst acquired on I2C bus (1.4ms)', delay: 0 },
          { stage: 1, text: 'STAGE 2/5: ESP32-S3 RTOS queue filtering noise & state (4.1ms)', delay: 280 },
          { stage: 2, text: 'STAGE 3/5: TLS MQTT packet dispatched over port 8883 (9.8ms)', delay: 560 },
          { stage: 3, text: 'STAGE 4/5: TimescaleDB hypertable ingested (16.2ms)', delay: 840 },
          { stage: 4, text: 'STAGE 5/5: React digital twin UI updated in real-time (23.4ms)', delay: 1120 },
        ];

    stages.forEach(({ stage, text, delay }) => {
      setTimeout(() => {
        setActivePingStage(stage);
        setPingStatusText(text);
      }, delay);
    });

    setTimeout(() => {
      setActivePingStage(null);
      setPingStatusText(isOmni ? 'COLLABORATIVE STATE CONVERGENCE VERIFIED // 13.8MS' : 'SIGNAL PROPAGATION COMPLETE // VERIFIED <24MS');
      setTimeout(() => {
        setPingStatusText(null);
        setActiveSimulationId(null);
      }, 2400);
    }, 1600);
  };

  return (
    <section
      id="work"
      aria-label="Systems & Software I Have Built"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
      <div id="systems" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Section Header & Ratio Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.2em] text-[#16D9E8] uppercase font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D9E8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
            </span>
            <span>PORTFOLIO ARCHITECTURE // 01</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
            Systems &amp; Software I Have Built
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
            Full-stack web architectures, high-concurrency cloud distributed engines, and real-time edge telemetry systems built for resilience and speed.
          </p>
        </motion.div>

        {/* 70/30 Perspective Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-1.5 p-1 rounded-lg bg-[#0F1419] border border-[#1A222B] self-start md:self-auto font-mono-tech text-[11px]"
        >
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              filter === 'ALL'
                ? 'bg-[#141A21] text-[#F4F7FA] border border-[#232D36] shadow-sm font-semibold'
                : 'text-[#71808D] hover:text-[#AAB5C0]'
            }`}
          >
            ALL ARCHITECTURES (4)
          </button>

          <button
            type="button"
            onClick={() => setFilter('SOFTWARE')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === 'SOFTWARE'
                ? 'bg-[#16D9E8]/15 text-[#16D9E8] border border-[#16D9E8]/40 shadow-sm font-bold'
                : 'text-[#71808D] hover:text-[#16D9E8]'
            }`}
          >
            <span>SOFTWARE &amp; CLOUD (70%)</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('IOT')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === 'IOT'
                ? 'bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/40 shadow-sm font-bold'
                : 'text-[#71808D] hover:text-[#3B82F6]'
            }`}
          >
            <span>CONNECTED IOT (30%)</span>
          </button>
        </motion.div>
      </div>

      {/* Systems Grid */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredSystems.map((system, systemIdx) => {
            const isCardHovered = hoveredProjectId === system.id;
            const isSimulatingThis = activeSimulationId === system.id;
            const hasSimulation = system.id === 'omnisync' || system.id === 'parksense';

            return (
              <motion.div
                key={system.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, delay: systemIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProjectId(system.id)}
                onMouseLeave={() => {
                  setHoveredProjectId(null);
                  setActiveStage(null);
                }}
                className={`relative overflow-hidden p-6 sm:p-8 rounded-xl border transition-all duration-300 ${
                  isCardHovered
                    ? 'bg-[#141A21] border-[#16D9E8]/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                    : 'bg-[#0F1419]/90 border-[#1A222B] hover:border-[#232D36]'
                }`}
              >
                {/* Header row of system node */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A222B] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded font-bold border border-[#16D9E8]/30 bg-[#16D9E8]/10 text-[#16D9E8]">
                      {system.code}
                    </span>
                    <span className="font-mono-tech text-[11px] tracking-wider text-[#71808D] uppercase font-semibold">
                      {system.category}
                    </span>
                    <span className={`hidden sm:inline font-mono-tech text-[9.5px] px-2 py-0.5 rounded border ${
                      system.isSoftware 
                        ? 'border-[#16D9E8]/30 bg-[#16D9E8]/10 text-[#16D9E8]' 
                        : 'border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]'
                    }`}>
                      {system.track}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Interactive Simulation Trigger */}
                    {hasSimulation && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSimulate(system.id);
                        }}
                        className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono-tech font-semibold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                          isSimulatingThis
                            ? 'bg-[#16D9E8] text-[#0A0D10] border-[#16D9E8] shadow-[0_0_16px_#16D9E8]'
                            : 'border-[#16D9E8]/40 bg-[#16D9E8]/10 text-[#16D9E8] hover:bg-[#16D9E8] hover:text-[#0A0D10]'
                        }`}
                      >
                        <Activity className={`w-3.5 h-3.5 ${isSimulatingThis ? 'animate-spin' : 'animate-pulse'}`} />
                        <span>
                          {isSimulatingThis
                            ? 'PROPAGATING SIGNAL...'
                            : system.id === 'omnisync'
                            ? 'SIMULATE REAL-TIME SYNC'
                            : 'SIMULATE SENSOR PING'}
                        </span>
                      </button>
                    )}

                    <div className="flex items-center gap-2 font-mono-tech text-[11px] text-[#AAB5C0] font-medium bg-[#0A0D10]/50 px-2.5 py-1 rounded border border-[#1A222B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16D9E8] animate-ping" />
                      <span>{system.status}</span>
                    </div>
                  </div>
                </div>

                {/* System Main Content: Split layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Summary, Tech stack, and Pipeline */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[#F4F7FA] tracking-tight font-sans-editorial">
                        {system.title}
                      </h3>
                      <p className="text-[14.5px] text-[#AAB5C0] leading-relaxed mt-2.5 font-normal">
                        {system.summary}
                      </p>
                    </div>

                    {/* Connected System Topology Flow */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between font-mono-tech text-[10.5px] text-[#16D9E8] uppercase tracking-wider font-semibold">
                        <span>ARCHITECTURE PIPELINE</span>
                        <span className="text-[10px] text-[#71808D] tracking-normal font-normal">
                          HOVER STAGES TO INSPECT
                        </span>
                      </div>
                      
                      {/* Horizontal connected pipeline */}
                      <div className="relative p-3.5 rounded-lg border border-[#1A222B] bg-[#0A0D10]/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 overflow-hidden">
                        
                        {/* Active traveling pulse wave on card hover */}
                        {isCardHovered && (
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#16D9E8]/10 to-transparent pointer-events-none animate-scanline"
                          />
                        )}

                        {system.pipeline.map((stage, idx) => {
                          const Icon = stage.icon;
                          const isLast = idx === system.pipeline.length - 1;
                          const isStageSelected = activeStage?.label === stage.label;
                          const isStagePinging = isSimulatingThis && activePingStage === idx;

                          return (
                            <React.Fragment key={stage.label}>
                              <div
                                onMouseEnter={() => setActiveStage(stage)}
                                className={`relative z-10 flex items-center gap-2 py-2 px-2.5 rounded-md cursor-pointer transition-all duration-300 ${
                                  isStagePinging
                                    ? 'bg-[#16D9E8] text-[#0A0D10] border border-[#16D9E8] shadow-[0_0_16px_rgba(22,217,232,0.8)] scale-105'
                                    : isStageSelected
                                    ? 'bg-[#1A222B] border border-[#16D9E8] text-[#F4F7FA] shadow-[0_0_12px_rgba(22,217,232,0.25)]'
                                    : 'bg-[#0F1419] border border-[#1A222B] hover:border-[#16D9E8]/40 text-[#AAB5C0]'
                                }`}
                              >
                                <Icon className={`w-3.5 h-3.5 shrink-0 transition-colors duration-200 ${
                                  isStagePinging
                                    ? 'text-[#0A0D10]'
                                    : isStageSelected
                                    ? 'text-[#16D9E8]'
                                    : 'text-[#71808D]'
                                }`} />
                                <div>
                                  <div className={`text-[9.5px] font-mono-tech uppercase leading-none font-medium ${
                                    isStagePinging ? 'text-[#0A0D10] font-bold' : isStageSelected ? 'text-[#16D9E8]' : 'text-[#71808D]'
                                  }`}>
                                    {stage.label}
                                  </div>
                                  <div className={`text-[11.5px] font-semibold leading-tight mt-0.5 whitespace-nowrap ${
                                    isStagePinging ? 'text-[#0A0D10]' : 'text-[#F4F7FA]'
                                  }`}>
                                    {stage.role}
                                  </div>
                                </div>
                              </div>
                              {!isLast && (
                                <div className={`hidden sm:flex items-center font-mono-tech text-xs transition-colors duration-200 ${
                                  isStagePinging || (isSimulatingThis && activePingStage !== null && activePingStage > idx)
                                    ? 'text-[#16D9E8] font-bold'
                                    : 'text-[#232D36]'
                                }`}>
                                  →
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Live Ping Status Broadcast Bar */}
                      {isSimulatingThis && pingStatusText && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-2.5 rounded-lg border border-[#16D9E8]/40 bg-[#16D9E8]/10 text-[11px] font-mono-tech text-[#16D9E8] flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5 animate-pulse" />
                            <span>{pingStatusText}</span>
                          </div>
                          <span className="text-[10px] text-[#AAB5C0] uppercase">LIVE STREAM</span>
                        </motion.div>
                      )}

                      {/* Stage Telemetry Inspector Details */}
                      {activeStage && (
                        <div className="p-3 rounded-lg border border-[#232D36] bg-[#0A0D10] text-[11px] font-mono-tech text-[#F4F7FA] shadow-md flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[#16D9E8] font-bold uppercase">[{activeStage.label}]:</span>
                            <span className="text-[#AAB5C0] font-normal">{activeStage.spec}</span>
                          </div>
                          <span className="text-[10px] text-[#16D9E8] uppercase font-semibold">STAGE SPEC</span>
                        </div>
                      )}
                    </div>

                    {/* System Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono-tech">
                      {system.metrics.map((m) => (
                        <div key={m.key} className="p-2.5 rounded-lg border border-[#1A222B] bg-[#0A0D10]/50 hover:border-[#232D36] transition-colors">
                          <div className="text-[9.5px] text-[#71808D] uppercase font-semibold">{m.key}</div>
                          <div className="text-[13px] text-[#16D9E8] font-bold mt-0.5">{m.val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags & Spec Button */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {system.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono-tech text-[10.5px] px-2.5 py-0.5 rounded border border-[#1A222B] text-[#AAB5C0] bg-[#0A0D10]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenSpec && onOpenSpec(system)}
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-mono-tech font-semibold tracking-wider uppercase border border-[#232D36] hover:border-[#16D9E8]/60 bg-[#141A21] hover:bg-[#1A222B] text-[#F4F7FA] transition-all duration-200 cursor-pointer shadow-sm"
                      >
                        <span>VIEW SYSTEM SPEC</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#16D9E8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Preview: Live Software Console or Bench Photo */}
                  <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-[#1A222B] bg-[#0A0D10] group/img">
                    {system.previewType === 'software-console' ? (
                      /* Live Interactive Real-Time Software Console */
                      <div className="w-full h-full p-4 flex flex-col justify-between font-mono-tech text-[11px] bg-gradient-to-br from-[#0A0D10] via-[#0F1419] to-[#0A0D10] select-none">
                        <div className="flex items-center justify-between border-b border-[#1A222B] pb-2 text-[10.5px] text-[#71808D]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#16D9E8] animate-ping" />
                            <span className="text-[#F4F7FA] font-bold">omnisync.cluster.local</span>
                          </div>
                          <span className="text-[#16D9E8]">WS: 10,240 ACTIVE</span>
                        </div>

                        <div className="space-y-1.5 py-2 text-[10px] text-[#AAB5C0]">
                          <div className="flex justify-between text-[#71808D]">
                            <span>[CRDT_CLOCK_SYNC]</span>
                            <span className="text-[#16D9E8]">VECTOR V: [Node_A: 489, Node_B: 490]</span>
                          </div>
                          <div className="flex justify-between">
                            <span>REPLICA_STATE:</span>
                            <span className="text-emerald-400">DETERMINISTIC CONVERGED</span>
                          </div>
                          <div className="flex justify-between">
                            <span>PUB/SUB EVENT BUS:</span>
                            <span>REDIS CLUSTER / SHARD 03</span>
                          </div>
                          <div className="flex justify-between text-[#71808D]">
                            <span>LAST DIFF APPLY:</span>
                            <span className="text-[#F4F7FA]">Δ 142 BYTES (12.4ms)</span>
                          </div>
                        </div>

                        {/* Interactive mini wave / bar chart */}
                        <div className="pt-2 border-t border-[#1A222B] flex items-end justify-between gap-1 h-12">
                          {[35, 60, 45, 80, 95, 65, 40, 85, 75, 50, 90, 70, 85, 95, 60].map((h, i) => (
                            <div 
                              key={i} 
                              style={{ height: `${h}%` }}
                              className={`w-full rounded-t transition-all duration-300 ${
                                isCardHovered ? 'bg-[#16D9E8]' : 'bg-[#16D9E8]/30'
                              }`}
                            />
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[9.5px] text-[#71808D]">
                          <span>THROUGHPUT: 4.8 MB/s</span>
                          <span className="text-[#16D9E8]">LATENCY P99: 13.8ms</span>
                        </div>
                      </div>
                    ) : system.previewType === 'gateway-console' ? (
                      /* Live Microservice Gateway Console */
                      <div className="w-full h-full p-4 flex flex-col justify-between font-mono-tech text-[11px] bg-gradient-to-br from-[#0A0D10] via-[#0F1419] to-[#0A0D10] select-none">
                        <div className="flex items-center justify-between border-b border-[#1A222B] pb-2 text-[10.5px] text-[#71808D]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                            <span className="text-[#F4F7FA] font-bold">gateway.ingress.io</span>
                          </div>
                          <span className="text-emerald-400">STATUS 200 OK</span>
                        </div>

                        <div className="space-y-1.5 py-2 text-[10px] text-[#AAB5C0]">
                          <div className="flex justify-between">
                            <span className="text-[#71808D]">POST /api/v2/stream/ingest</span>
                            <span className="text-[#16D9E8]">200 OK · 4.8ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#71808D]">GET /api/v2/metrics/summary</span>
                            <span className="text-[#16D9E8]">200 OK · 2.1ms (Cache)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#71808D]">POST /api/v2/auth/verify</span>
                            <span className="text-[#16D9E8]">200 OK · 3.4ms</span>
                          </div>
                          <div className="flex justify-between text-[#71808D]">
                            <span>RATE LIMIT TICKET:</span>
                            <span className="text-[#F4F7FA]">TOKEN BUCKET [OK: 9800/10000]</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#1A222B] flex items-center justify-between text-[10px]">
                          <span className="text-[#71808D]">CACHE HIT RATIO:</span>
                          <span className="text-[#16D9E8] font-bold">94.6% IN-MEMORY</span>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[9.5px] text-[#71808D]">
                          <span>WORKERS: 16 ASYNC</span>
                          <span className="text-[#3B82F6]">TRACING: OTEL_ENABLED</span>
                        </div>
                      </div>
                    ) : (
                      /* Technical Photography for IoT / Hardware */
                      <>
                        <img
                          src={system.image}
                          alt={system.title}
                          className="w-full h-full object-cover grayscale-[20%] group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#0A0D10]/85 backdrop-blur-sm border border-[#1A222B] font-mono-tech text-[10px] text-[#16D9E8] uppercase font-semibold">
                          SYS_NODE // {system.code}
                        </div>
                      </>
                    )}
                  </div>

                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
