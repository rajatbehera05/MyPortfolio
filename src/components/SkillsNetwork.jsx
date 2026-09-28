import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Code, Brain, Network, Layers, CheckCircle2, X } from 'lucide-react';

/**
 * Skills Section: TECHNOLOGY NETWORK
 * 
 * Interconnected pipelines moving signals from physical pins to intelligent software:
 * - ESP32 → Sensors → FreeRTOS → IoT
 * - Python → Quantization → TinyML → Edge AI
 * - React → APIs → WebSockets → Dashboards
 * - Flowing signal micro-animations between nodes
 * - Interactive technology node inspector displaying real frameworks & field notes
 */
export default function SkillsNetwork() {
  const [selectedTech, setSelectedTech] = useState(null);

  const networks = [
    {
      group: 'EMBEDDED HARDWARE & REAL-TIME FIRMWARE',
      icon: Cpu,
      pipeline: [
        { name: 'ESP32 / STM32', note: 'Dual-core Xtensa & ARM Cortex-M4 architectures, bare-metal HAL' },
        { name: 'I2C / SPI / UART Sensors', note: 'LiDAR, IMUs, environmental sensors, logic analyzer debugging' },
        { name: 'FreeRTOS Kernel', note: 'Deterministic task preemption, binary semaphores, queue streams' },
        { name: 'Industrial IoT Nodes', note: 'Ultra-low quiescent current LDOs, battery telemetry, field enclosures' }
      ],
      detail: 'Developing bare-metal firmware, deterministic task scheduling, and ultra-low-power sleep cycles for edge controllers.'
    },
    {
      group: 'MACHINE LEARNING & EDGE INTELLIGENCE',
      icon: Brain,
      pipeline: [
        { name: 'Python (PyTorch / Scikit)', note: 'Training compact 1D/2D CNNs on raw vibration and audio data' },
        { name: 'Model Quantization (INT8)', note: 'Post-training weight quantization reducing weights by ~75%' },
        { name: 'TinyML / TFLite Micro', note: 'Inference runtime fitting entirely into <100KB microcontroller SRAM' },
        { name: 'Embedded On-Device AI', note: 'Sub-15ms real-time acoustic classification without cloud round-trips' }
      ],
      detail: 'Compressing complex neural network topologies for microcontrollers to run real-time anomaly detection without server dependence.'
    },
    {
      group: 'INTERFACES & CLIENT INFRASTRUCTURE',
      icon: Code,
      pipeline: [
        { name: 'React / TypeScript', note: 'Strictly-typed responsive state management and hardware twins' },
        { name: 'RESTful & GraphQL APIs', note: 'FastAPI and Node.js endpoints with schema-first contracts' },
        { name: 'Real-time WebSockets', note: 'Sub-30ms bidirectional sensor streams with heartbeat recovery' },
        { name: 'Telemetry Dashboards', note: 'Interactive real-time charting, slot occupancy status, and alerts' }
      ],
      detail: 'Architecting fast, responsive digital twins and interactive consoles that consume live high-frequency hardware data.'
    },
    {
      group: 'NETWORK PROTOCOLS & DISTRIBUTED SYSTEMS',
      icon: Network,
      pipeline: [
        { name: 'MQTT Brokers', note: 'TLS-secured EMQX & Mosquitto with QoS 1 acknowledgment' },
        { name: 'LoRaWAN & ESP-NOW Mesh', note: 'Long-range sub-GHz and peer-to-peer RF mesh topologies' },
        { name: 'Cloud Ingestion', note: 'Dockerized microservice pipelines with zero-drop packet queues' },
        { name: 'TimescaleDB / InfluxDB', note: 'Hypertables partitioned by microsecond device telemetry timestamps' }
      ],
      detail: 'Structuring fault-tolerant data pipelines capable of handling noisy RF channels, packet loss, and zero-downtime streaming.'
    },
    {
      group: 'CIRCUIT DESIGN & BENCH VALIDATION',
      icon: Layers,
      pipeline: [
        { name: 'KiCAD Schematic & Layout', note: '2-layer FR4 PCB routing with ground planes and controlled impedance' },
        { name: 'SMD Soldering & Stencils', note: '0805 passives, QFN microcontrollers, hot air rework bench' },
        { name: 'Oscilloscope / Analyzer', note: 'Decoding I2C timing glitches, bus ringing, and power transients' },
        { name: 'Field Deployment', note: 'Weather-sealed enclosures, thermal dissipation testing, real runs' }
      ],
      detail: 'Turning breadboard proof-of-concepts into dual-layer PCBs with optimized power distribution networks and noise immunity.'
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
        className="space-y-3 mb-14"
      >
        <div className="flex items-center gap-2 font-mono-tech text-[11px] tracking-[0.2em] text-[#16D9E8] uppercase font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D9E8] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D9E8]" />
          </span>
          <span>CONNECTED STACK // 02</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F7FA] font-sans-editorial">
          Technology Network
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#AAB5C0] max-w-2xl leading-relaxed">
          Technologies are not isolated badges. They function as interconnected pipelines moving signals from physical pins to intelligent software. Click any node to inspect field notes.
        </p>
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
                    <div className="w-7 h-7 rounded-md bg-[#16D9E8]/10 border border-[#16D9E8]/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#16D9E8]" />
                    </div>
                    <h3 className="font-mono-tech text-[12px] sm:text-[13px] font-semibold text-[#F4F7FA] tracking-wide">
                      {net.group}
                    </h3>
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
                              isSelected ? 'bg-[#0A0D10] animate-ping' : 'bg-[#16D9E8]'
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
