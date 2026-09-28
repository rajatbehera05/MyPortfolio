import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Radio, Network, Database, Layout, Sparkles, Activity } from 'lucide-react';

/**
 * Projects Section: SYSTEMS I HAVE BUILT
 * 
 * Features:
 * - End-to-end connected systems mapped from physical sensors to cloud interfaces
 * - Sequential multi-stage signal propagation simulation
 * - Interactive pipeline inspection with real-world hardware & firmware telemetry
 * - Smooth Framer Motion scroll reveals
 * - Sleek obsidian & cyan engineering aesthetic
 */
export default function Projects({ onOpenSpec }) {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [activeStage, setActiveStage] = useState(null);
  const [activePingStage, setActivePingStage] = useState(null); // 0, 1, 2, 3, 4 or null
  const [pingStatusText, setPingStatusText] = useState(null);

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

  // Sequential multi-stage signal ping simulation
  const handleSimulatePing = (e) => {
    e.stopPropagation();
    if (activePingStage !== null) return;

    setActivePingStage(0);
    setPingStatusText('STAGE 1/5: 940nm LiDAR photon burst firing...');

    const stageTimes = [
      { stage: 0, text: 'STAGE 1/5: Micro-LiDAR distance frame acquired (1.4ms)', delay: 0 },
      { stage: 1, text: 'STAGE 2/5: ESP32-S3 RTOS queue filtering state (4.1ms)', delay: 280 },
      { stage: 2, text: 'STAGE 3/5: MQTT packet encrypted over TLS 8883 (9.8ms)', delay: 560 },
      { stage: 3, text: 'STAGE 4/5: TimescaleDB hypertable ingested (16.2ms)', delay: 840 },
      { stage: 4, text: 'STAGE 5/5: Digital twin twin updated in client UI (23.4ms)', delay: 1120 },
    ];

    stageTimes.forEach(({ stage, text, delay }) => {
      setTimeout(() => {
        setActivePingStage(stage);
        setPingStatusText(text);
      }, delay);
    });

    setTimeout(() => {
      setActivePingStage(null);
      setPingStatusText('SIGNAL PROPAGATION COMPLETE // VERIFIED <24MS');
      setTimeout(() => setPingStatusText(null), 2500);
    }, 1600);
  };

  return (
    <section
      id="work"
      aria-label="Systems I Have Built"
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-24 border-t border-[#1A222B]"
    >
      {/* Invisible anchor for backward compatibility */}
      <div id="systems" className="-mt-24 pt-24" aria-hidden="true" />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3 mb-14"
      >
        <div className="flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.2em] text-[#16D9E8] uppercase font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D9E8] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
          </span>
          <span>PORTFOLIO TOPOLOGY // 01</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          Systems I Have Built
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
          End-to-end architectures engineered from physical silicon registers and RF meshes, through deterministic RTOS queues, to cloud telemetry twins.
        </p>
      </motion.div>

      {/* Systems Grid */}
      <div className="space-y-12">
        {systems.map((system, systemIdx) => {
          const isCardHovered = hoveredProjectId === system.id;
          const isParkSense = system.id === 'parksense';

          return (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: systemIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                </div>

                <div className="flex items-center gap-3">
                  {/* Interactive Ping Simulation Button on Flagship Project */}
                  {isParkSense && (
                    <button
                      type="button"
                      onClick={handleSimulatePing}
                      className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono-tech font-semibold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                        activePingStage !== null
                          ? 'bg-[#16D9E8] text-[#0A0D10] border-[#16D9E8] shadow-[0_0_16px_#16D9E8]'
                          : 'border-[#16D9E8]/40 bg-[#16D9E8]/10 text-[#16D9E8] hover:bg-[#16D9E8] hover:text-[#0A0D10]'
                      }`}
                    >
                      <Activity className={`w-3.5 h-3.5 ${activePingStage !== null ? 'animate-spin' : 'animate-pulse'}`} />
                      <span>{activePingStage !== null ? 'PROPAGATING SIGNAL...' : 'SIMULATE SENSOR PING'}</span>
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
                
                {/* Left: Summary, Tech stack, and Action */}
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
                      <span>CONNECTED SYSTEM TOPOLOGY</span>
                      <span className="text-[10px] text-[#71808D] tracking-normal font-normal">
                        HOVER STAGES TO INSPECT
                      </span>
                    </div>
                    
                    {/* Horizontal connected pipeline */}
                    <div className="relative p-3.5 rounded-lg border border-[#1A222B] bg-[#0A0D10]/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 overflow-hidden">
                      
                      {/* Active traveling pulse wave on card hover or ping trigger */}
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
                        const isStagePinging = isParkSense && activePingStage === idx;

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
                                isStagePinging || (isParkSense && activePingStage !== null && activePingStage > idx)
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
                    {isParkSense && pingStatusText && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2.5 rounded-lg border border-[#16D9E8]/40 bg-[#16D9E8]/10 text-[11px] font-mono-tech text-[#16D9E8] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 animate-pulse" />
                          <span>{pingStatusText}</span>
                        </div>
                        <span className="text-[10px] text-[#AAB5C0] uppercase">REAL-TIME BUS</span>
                      </motion.div>
                    )}

                    {/* Stage Telemetry Inspector Details */}
                    {activeStage && (
                      <div className="p-3 rounded-lg border border-[#232D36] bg-[#0A0D10] text-[11px] font-mono-tech text-[#F4F7FA] shadow-md flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[#16D9E8] font-bold uppercase">[{activeStage.label}]:</span>
                          <span className="text-[#AAB5C0] font-normal">{activeStage.spec}</span>
                        </div>
                        <span className="text-[10px] text-[#16D9E8] uppercase font-semibold">ACTIVE TELEMETRY</span>
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

                {/* Right: Technical Photograph / Bench Preview */}
                <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-[#1A222B] bg-[#0A0D10] group/img">
                  <img
                    src={system.image}
                    alt={system.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#0A0D10]/85 backdrop-blur-sm border border-[#1A222B] font-mono-tech text-[10px] text-[#16D9E8] uppercase font-semibold">
                    SYS_NODE // {system.code}
                  </div>
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
