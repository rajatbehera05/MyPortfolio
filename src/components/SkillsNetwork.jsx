import React, { useState } from 'react';
import { Cpu, Code, Brain, Network, Layers, CheckCircle2 } from 'lucide-react';

/**
 * Skills Section: TECHNOLOGY NETWORK
 * 
 * Strict Constitution & Creative Enhancements:
 * - Section label: TECHNOLOGY NETWORK
 * - Connected groups:
 *   ESP32 → Sensors → FreeRTOS → IoT
 *   Python → Quantization → TinyML → Edge AI
 *   React → APIs → WebSockets → Dashboards
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
      id="skills"
      aria-label="Technology Network"
      className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 border-t border-[var(--border-subtle)]"
    >
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center gap-2 font-mono-tech text-[12px] tracking-widest text-[var(--accent-cyan)] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
          <span>CONNECTED STACK // 02</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          TECHNOLOGY NETWORK
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] max-w-2xl">
          Technologies are not isolated badges. They function as interconnected pipelines moving signals from physical pins to intelligent software. Click any node to inspect field notes.
        </p>
      </div>

      {/* Connected Technology Pipelines */}
      <div className="space-y-4">
        {networks.map((net) => {
          const Icon = net.icon;
          return (
            <div
              key={net.group}
              className="system-panel p-5 sm:p-6 transition-all duration-200 hover:border-[var(--accent-cyan-border)] hover:bg-[#181F27]/85"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left: Group title & description */}
                <div className="lg:w-1/3 space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[var(--accent-cyan)] shrink-0" />
                    <h3 className="font-mono-tech text-[12px] sm:text-[13px] font-semibold text-[var(--text-primary)] tracking-wide">
                      {net.group}
                    </h3>
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {net.detail}
                  </p>
                </div>

                {/* Right: Connected Pipeline Graph */}
                <div className="lg:w-2/3">
                  <div className="p-3 rounded border border-[var(--border-subtle)] bg-[#0E1217]/90 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 overflow-x-auto">
                    {net.pipeline.map((item, nIdx) => {
                      const isLast = nIdx === net.pipeline.length - 1;
                      const isSelected = selectedTech?.name === item.name;

                      return (
                        <React.Fragment key={item.name}>
                          <button
                            type="button"
                            onClick={() => setSelectedTech(isSelected ? null : item)}
                            className={`flex items-center gap-2 py-1.5 px-3 rounded transition-all duration-200 cursor-pointer text-left ${
                              isSelected
                                ? 'bg-[#181F27] border border-[var(--accent-cyan)] text-[var(--accent-cyan)] shadow-[0_0_8px_rgba(22,217,232,0.2)]'
                                : 'bg-[#141A21] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-cyan-border)]'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isSelected ? 'bg-[var(--accent-cyan)] animate-ping' : 'bg-[var(--accent-cyan)]'
                            }`} />
                            <span className="font-mono-tech text-[12px] font-medium whitespace-nowrap">
                              {item.name}
                            </span>
                          </button>
                          {!isLast && (
                            <div className="hidden sm:flex items-center text-[var(--accent-cyan)]/60 font-mono-tech text-sm select-none">
                              →
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Tech Inspector Callout */}
      {selectedTech && (
        <div className="mt-4 p-4 rounded border border-[var(--accent-cyan-border)] bg-[#141A21] flex items-center justify-between gap-4 animate-fadeIn">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono-tech text-[11px] text-[var(--accent-cyan)] uppercase font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>FIELD VERIFICATION // {selectedTech.name}</span>
            </div>
            <p className="text-[13.5px] text-[var(--text-secondary)]">
              {selectedTech.note}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedTech(null)}
            className="text-[11px] font-mono-tech text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase shrink-0 cursor-pointer"
          >
            [CLOSE]
          </button>
        </div>
      )}
    </section>
  );
}
