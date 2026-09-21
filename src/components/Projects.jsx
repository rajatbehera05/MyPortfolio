import React, { useState } from 'react';
import { ArrowUpRight, Cpu, Radio, Network, Database, Layout, Sparkles, Activity } from 'lucide-react';

/**
 * Projects Section: SYSTEMS I HAVE BUILT
 * 
 * Strict Constitution & Creative Enhancements:
 * - Projects feel like connected systems
 * - Interactive pipeline inspection: hovering/selecting any stage reveals real-world hardware & firmware telemetry
 * - "Simulate Sensor Ping" button to trigger real-time signal propagation
 * - Clean graphite surfaces with subtle 1px #29323C borders
 */
export default function Projects({ onOpenSpec }) {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [activeStage, setActiveStage] = useState(null);
  const [pingTriggered, setPingTriggered] = useState(false);

  const systems = [
    {
      id: 'parksense',
      code: 'SYS_01',
      title: 'ParkSense — Autonomous Edge Occupancy Node',
      category: 'HARDWARE • IOT • CLOUD',
      status: 'DEPLOYED & TESTED',
      summary: 'Low-power autonomous parking occupancy detector fusing micro-LiDAR rangefinding with edge state filtering and telemetry over MQTT.',
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
          role: 'Cloud Ingestion DB', 
          icon: Database,
          spec: 'FastAPI Streamer · TimescaleDB Hypertable · 99.4% Accuracy' 
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
      image: '/assets/parking_node.jpg',
      tags: ['ESP32-S3', 'Micro-LiDAR', 'FreeRTOS', 'MQTT', 'KiCAD', 'C++']
    },
    {
      id: 'edgevision',
      code: 'SYS_02',
      title: 'EdgeVision — Microcontroller TinyML Defect Classifier',
      category: 'AI • EMBEDDED • EDGE',
      status: 'VERIFIED ON BENCH',
      summary: 'Quantized INT8 convolutional neural network running on ARM Cortex-M microcontrollers for real-time acoustic & visual structural anomaly detection without cloud round-trips.',
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
          label: 'Bus Controller', 
          role: 'CAN & BLE Streamer', 
          icon: Network,
          spec: 'CAN 2.0B / BLE 5.0 Alert Bus · Deterministic Interrupts' 
        },
        { 
          label: 'Operator UI', 
          role: 'Real-time Telemetry Log', 
          icon: Layout,
          spec: 'Live Spectral Anomaly Waterfall · Sub-second Alerts' 
        }
      ],
      metrics: [
        { key: 'INFERENCE', val: '14.2ms' },
        { key: 'MODEL SIZE', val: '84 KB' },
        { key: 'PRECISION', val: '97.2%' },
        { key: 'CORE', val: 'ARM Cortex-M' }
      ],
      image: '/assets/workbench.jpg',
      tags: ['ARM Cortex', 'TinyML', 'TensorFlow Lite', 'Edge AI', 'C++', 'Python']
    },
    {
      id: 'synapse-mesh',
      code: 'SYS_03',
      title: 'Synapse — Distributed IoT Sensor Mesh Gateway',
      category: 'NETWORKING • EMBEDDED • DISTRIBUTED',
      status: 'FIELD PROTOCOL',
      summary: 'Self-healing, multi-hop RF sensor network coordinator with distributed packet synchronization, zero-configuration node pairing, and high-reliability data buffering.',
      pipeline: [
        { 
          label: 'Cluster Nodes', 
          role: 'ESP-NOW Mesh Nodes', 
          icon: Cpu,
          spec: 'Peer-to-Peer 2.4GHz RF · Auto-Pairing Broadcast Handshake' 
        },
        { 
          label: 'Routing Engine', 
          role: 'Dynamic AODV Routing', 
          icon: Network,
          spec: 'Sub-7ms Multi-Hop Retransmission · Loop-Free Topology' 
        },
        { 
          label: 'Border Gateway', 
          role: 'Dual-Core Coordinator', 
          icon: Radio,
          spec: 'ESP-IDF Gateway Core · Non-Volatile Flash Packet Buffer' 
        },
        { 
          label: 'Time-Series DB', 
          role: 'InfluxDB / Timescale', 
          icon: Database,
          spec: 'Batch-Compressed Telemetry Ingestion · Zero Drop' 
        },
        { 
          label: 'Topological UI', 
          role: 'Mesh Graph Visualizer', 
          icon: Layout,
          spec: 'Interactive D3 Mesh Topology & RSSI Link Health Monitor' 
        }
      ],
      metrics: [
        { key: 'HOP LATENCY', val: '6.8ms / hop' },
        { key: 'NODE SCALE', val: '32+ Nodes' },
        { key: 'RECOVERY', val: '< 180ms' },
        { key: 'BUFFER', val: 'Zero Drop' }
      ],
      image: '/assets/workbench.jpg',
      tags: ['ESP-IDF', 'Mesh Protocols', 'WebSockets', 'Python', 'Docker', 'TimescaleDB']
    }
  ];

  const handleSimulatePing = (e) => {
    e.stopPropagation();
    setPingTriggered(true);
    setTimeout(() => {
      setPingTriggered(false);
    }, 1300);
  };

  return (
    <section
      id="systems"
      aria-label="Systems I Have Built"
      className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 border-t border-[var(--border-subtle)]"
    >
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center gap-2 font-mono-tech text-[12px] tracking-widest text-[var(--accent-cyan)] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
          <span>PORTFOLIO TOPOLOGY // 01</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          SYSTEMS I HAVE BUILT
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] max-w-2xl">
          End-to-end connected systems mapped from physical sensors and embedded silicon, through network transport layers, to cloud analytics and real-time interfaces.
        </p>
      </div>

      {/* Systems Grid */}
      <div className="space-y-10">
        {systems.map((system) => {
          const isCardHovered = hoveredProjectId === system.id;
          const isParkSense = system.id === 'parksense';

          return (
            <div
              key={system.id}
              onMouseEnter={() => setHoveredProjectId(system.id)}
              onMouseLeave={() => {
                setHoveredProjectId(null);
                setActiveStage(null);
              }}
              className={`system-panel p-6 sm:p-8 transition-all duration-300 ${
                isCardHovered
                  ? 'border-[var(--accent-cyan-border)] bg-[#181F27]/90 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
                  : 'bg-[#141A21]/75 border-[var(--border-subtle)]'
              }`}
            >
              {/* Header row of system node */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono-tech text-[11px] px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[#0E1217] text-[var(--accent-cyan)]">
                    {system.code}
                  </span>
                  <span className="font-mono-tech text-[11px] tracking-wider text-[var(--text-muted)] uppercase">
                    {system.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Interactive Ping Simulation Button on Flagship Project */}
                  {isParkSense && (
                    <button
                      type="button"
                      onClick={handleSimulatePing}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono-tech uppercase tracking-wider border border-[var(--accent-cyan-border)] bg-[#0E1217] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-[#0E1217] transition-all cursor-pointer"
                    >
                      <Activity className="w-3 h-3 animate-pulse" />
                      <span>SIMULATE DATA PING</span>
                    </button>
                  )}

                  <div className="flex items-center gap-2 font-mono-tech text-[11px] text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-node-pulse" />
                    <span>{system.status}</span>
                  </div>
                </div>
              </div>

              {/* System Main Content: Split layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Summary, Tech stack, and Action */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                      {system.title}
                    </h3>
                    <p className="text-[14.5px] text-[var(--text-secondary)] leading-relaxed mt-2.5">
                      {system.summary}
                    </p>
                  </div>

                  {/* Connected System Topology Flow */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono-tech text-[11px] text-[var(--accent-cyan)] uppercase tracking-wider">
                      <span>CONNECTED SYSTEM TOPOLOGY</span>
                      <span className="text-[10px] text-[var(--text-muted)] tracking-normal">
                        HOVER STAGES TO INSPECT
                      </span>
                    </div>
                    
                    {/* Horizontal connected pipeline */}
                    <div className="relative p-3.5 rounded border border-[var(--border-subtle)] bg-[#0E1217]/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 overflow-hidden">
                      
                      {/* Active traveling pulse wave on card hover or ping trigger */}
                      {(isCardHovered || pingTriggered) && (
                        <div
                          aria-hidden="true"
                          className={`absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/15 to-transparent pointer-events-none ${
                            pingTriggered ? 'animate-fast-ping' : 'animate-signal-flow'
                          }`}
                        />
                      )}

                      {system.pipeline.map((stage, idx) => {
                        const Icon = stage.icon;
                        const isLast = idx === system.pipeline.length - 1;
                        const isStageSelected = activeStage?.label === stage.label;

                        return (
                          <React.Fragment key={stage.label}>
                            <div
                              onMouseEnter={() => setActiveStage(stage)}
                              className={`relative z-10 flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-all duration-200 ${
                                isStageSelected
                                  ? 'bg-[#181F27] border border-[var(--accent-cyan)] shadow-[0_0_8px_rgba(22,217,232,0.2)]'
                                  : 'bg-[#141A21]/70 border border-white/[0.03] hover:border-[var(--accent-cyan-border)]'
                              }`}
                            >
                              <Icon className={`w-3.5 h-3.5 shrink-0 transition-colors duration-200 ${
                                isStageSelected || isCardHovered ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-secondary)]'
                              }`} />
                              <div>
                                <div className="text-[10px] font-mono-tech text-[var(--text-muted)] uppercase leading-none">
                                  {stage.label}
                                </div>
                                <div className="text-[12px] font-medium text-[var(--text-primary)] leading-tight mt-0.5 whitespace-nowrap">
                                  {stage.role}
                                </div>
                              </div>
                            </div>
                            {!isLast && (
                              <div className={`hidden sm:flex items-center font-mono-tech text-xs transition-colors duration-200 ${
                                isCardHovered ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-muted)]'
                              }`}>
                                →
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Stage Telemetry Inspector Details */}
                    {activeStage && (
                      <div className="p-2.5 rounded border border-[var(--accent-cyan-border)] bg-[#141A21] text-[11px] font-mono-tech text-[var(--text-secondary)] animate-fadeIn flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--accent-cyan)] font-semibold uppercase">[{activeStage.label}]:</span>
                          <span className="text-[var(--text-primary)]">{activeStage.spec}</span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)] uppercase">ACTIVE TELEMETRY</span>
                      </div>
                    )}
                  </div>

                  {/* System Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono-tech">
                    {system.metrics.map((m) => (
                      <div key={m.key} className="p-2 rounded border border-[var(--border-subtle)] bg-[#0E1217]/60">
                        <div className="text-[10px] text-[var(--text-muted)] uppercase">{m.key}</div>
                        <div className="text-[13px] text-[var(--accent-cyan)] font-semibold mt-0.5">{m.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags & Spec Button */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {system.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono-tech text-[11px] px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-secondary)] bg-[#0E1217]/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenSpec(system)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-[12px] font-mono-tech tracking-wider uppercase border border-[var(--accent-cyan-border)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-[#0E1217] transition-all duration-200 cursor-pointer focus-visible:outline-none"
                    >
                      <span>VIEW SYSTEM SPEC</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right: Technical Photograph / Bench Preview */}
                <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded overflow-hidden border border-[var(--border-subtle)] bg-[#0E1217]">
                  <img
                    src={system.image}
                    alt={system.title}
                    className="w-full h-full object-cover grayscale-[20%] contrast-[1.05] hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0E1217]/85 backdrop-blur-sm border border-[var(--border-subtle)] font-mono-tech text-[10px] text-[var(--accent-cyan)] uppercase">
                    SYS_NODE // {system.code}
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
