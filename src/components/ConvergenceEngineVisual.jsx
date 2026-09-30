import React, { useState } from 'react';
import { Code2, Server, Database, Cpu, Sparkles } from 'lucide-react';

/**
 * DeveloperShowcase (Centerpiece)
 * 
 * Replaces cold robotic telemetry with an elegant, interactive software developer workspace:
 * - Window chrome with tabs: "System Architecture", "Interactive Demo", "Tech Stack"
 * - Human-friendly interactive state flow (User Action → React UI → Backend API → Database → IoT Node)
 * - Clean, modern software engineering aesthetic inspired by Linear and Vercel
 */
export default function ConvergenceEngineVisual() {
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'demo' | 'stack'
  const [demoState, setDemoState] = useState({
    synced: true,
    step: null,
    latency: '12ms',
    count: 42
  });

  const handleRunDemo = () => {
    setDemoState(prev => ({ ...prev, synced: false, step: 0 }));
    
    setTimeout(() => setDemoState(prev => ({ ...prev, step: 1 })), 300);
    setTimeout(() => setDemoState(prev => ({ ...prev, step: 2 })), 600);
    setTimeout(() => setDemoState(prev => ({ ...prev, step: 3, count: prev.count + 1 })), 900);
    setTimeout(() => {
      setDemoState(prev => ({ 
        ...prev, 
        synced: true, 
        step: null, 
        latency: `${Math.floor(10 + Math.random() * 6)}ms` 
      }));
    }, 1200);
  };

  const stackItems = [
    {
      category: 'Frontend & UI (70% Focus)',
      icon: Code2,
      techs: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Zustand'],
      description: 'Building responsive, accessible web interfaces with optimistic state and fluid animations.'
    },
    {
      category: 'Backend & APIs',
      icon: Server,
      techs: ['Node.js', 'Python FastAPI', 'WebSockets', 'REST', 'gRPC'],
      description: 'Designing asynchronous services, event-driven pipelines, and high-concurrency APIs.'
    },
    {
      category: 'Data & Cloud',
      icon: Database,
      techs: ['PostgreSQL', 'Redis Cache', 'Docker', 'TimescaleDB'],
      description: 'Architecting relational databases, in-memory caches, and containerized deployments.'
    },
    {
      category: 'Hardware & IoT Bridge (30% Focus)',
      icon: Cpu,
      techs: ['ESP32', 'FreeRTOS', 'C/C++', 'MQTT', 'Sensor Buses'],
      description: 'Streaming real-time telemetry from microcontrollers and physical sensors to web dashboards.'
    }
  ];

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">
      
      {/* Soft Ambient Glow */}
      <div 
        aria-hidden="true"
        className="absolute -inset-4 sm:-inset-6 rounded-3xl pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(22, 217, 232, 0.08) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 75%)'
        }}
      />

      {/* Main Interactive Window */}
      <div className="relative z-10 rounded-2xl border border-[#232D36] bg-[#0E1319]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        
        {/* Window Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1A222B] bg-[#0A0D10]/60">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
            <span className="ml-2 text-[12px] text-[#AAB5C0] font-medium hidden sm:inline">
              rajat-workspace / engineering-stack
            </span>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#141A21] border border-[#1A222B] text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-[#1A222B] text-[#F4F7FA] font-semibold shadow-xs'
                  : 'text-[#71808D] hover:text-[#AAB5C0]'
              }`}
            >
              Architecture
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'demo'
                  ? 'bg-[#1A222B] text-[#16D9E8] font-semibold shadow-xs'
                  : 'text-[#71808D] hover:text-[#16D9E8]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Live Flow</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stack')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === 'stack'
                  ? 'bg-[#1A222B] text-[#F4F7FA] font-semibold shadow-xs'
                  : 'text-[#71808D] hover:text-[#AAB5C0]'
              }`}
            >
              Overview
            </button>
          </div>
        </div>

        {/* Tab 1: System Architecture (Visual Pipeline) */}
        {activeTab === 'architecture' && (
          <div className="p-5 sm:p-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[14px] font-semibold text-[#F4F7FA]">
                  Full-Stack Architecture &amp; Hardware Bridge
                </h4>
                <p className="text-[12px] text-[#71808D] mt-0.5">
                  How my applications flow from responsive clients to cloud persistence and edge hardware.
                </p>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#16D9E8]/10 text-[#16D9E8] border border-[#16D9E8]/20 whitespace-nowrap">
                70% SW · 30% IoT
              </span>
            </div>

            {/* 4 Interactive Flow Layers */}
            <div className="space-y-2.5 pt-1">
              
              {/* Layer 1: Client UI */}
              <div className="group p-3 sm:p-3.5 rounded-xl border border-[#1A222B] bg-[#141A21]/70 hover:border-[#16D9E8]/40 hover:bg-[#141A21] transition-all">
                <div className="flex items-center justify-between text-[12px] font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#16D9E8]/10 text-[#16D9E8] flex items-center justify-center">
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[#F4F7FA] font-semibold">1. Web &amp; Client Platform</div>
                      <div className="text-[#71808D] text-[11px]">React 19, TypeScript, Next.js, Zustand state</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#16D9E8] font-medium hidden sm:inline">
                    Interactive UI
                  </span>
                </div>
              </div>

              {/* Layer 2: Backend */}
              <div className="group p-3 sm:p-3.5 rounded-xl border border-[#1A222B] bg-[#141A21]/70 hover:border-[#3B82F6]/40 hover:bg-[#141A21] transition-all">
                <div className="flex items-center justify-between text-[12px] font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center">
                      <Server className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[#F4F7FA] font-semibold">2. Backend Services &amp; APIs</div>
                      <div className="text-[#71808D] text-[11px]">Node.js, Python FastAPI, WebSockets, REST endpoints</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#3B82F6] font-medium hidden sm:inline">
                    High Concurrency
                  </span>
                </div>
              </div>

              {/* Layer 3: Persistence */}
              <div className="group p-3 sm:p-3.5 rounded-xl border border-[#1A222B] bg-[#141A21]/70 hover:border-[#16D9E8]/40 hover:bg-[#141A21] transition-all">
                <div className="flex items-center justify-between text-[12px] font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#16D9E8]/10 text-[#16D9E8] flex items-center justify-center">
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[#F4F7FA] font-semibold">3. Database &amp; Cache Infrastructure</div>
                      <div className="text-[#71808D] text-[11px]">PostgreSQL, Redis cluster, Docker containers</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#16D9E8] font-medium hidden sm:inline">
                    Fast Caching
                  </span>
                </div>
              </div>

              {/* Layer 4: Edge IoT */}
              <div className="group p-3 sm:p-3.5 rounded-xl border border-[#1A222B] bg-[#141A21]/70 hover:border-[#3B82F6]/40 hover:bg-[#141A21] transition-all">
                <div className="flex items-center justify-between text-[12px] font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[#F4F7FA] font-semibold">4. Connected IoT &amp; Hardware Bridge</div>
                      <div className="text-[#71808D] text-[11px]">ESP32 microcontrollers, FreeRTOS, MQTT sensor stream</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#3B82F6] font-medium hidden sm:inline">
                    30% Edge Bridge
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Insight Footer */}
            <div className="pt-2 border-t border-[#1A222B] flex items-center justify-between text-[11px] text-[#71808D]">
              <span>Experience: Full-Stack Web + Embedded Systems</span>
              <span className="text-[#F4F7FA] font-medium">End-to-End Craft</span>
            </div>

          </div>
        )}

        {/* Tab 2: Interactive Live Flow Demo */}
        {activeTab === 'demo' && (
          <div className="p-5 sm:p-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[14px] font-semibold text-[#F4F7FA]">
                  Interactive Multi-Tier State Flow
                </h4>
                <p className="text-[12px] text-[#71808D] mt-0.5">
                  Click the button below to watch how state propagates from client to database in real-time.
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>Ready</span>
              </div>
            </div>

            {/* Simulated Live Architecture Node Path */}
            <div className="grid grid-cols-4 gap-2 py-3">
              {[
                { label: 'Client UI', sub: 'React 19', step: 0 },
                { label: 'Gateway API', sub: 'FastAPI / Node', step: 1 },
                { label: 'Cache / DB', sub: 'Redis / Postgres', step: 2 },
                { label: 'Edge Node', sub: 'ESP32 Device', step: 3 },
              ].map((node) => {
                const isActive = demoState.step === node.step;
                const isCompleted = demoState.step !== null && demoState.step > node.step;

                return (
                  <div
                    key={node.label}
                    className={`p-2.5 rounded-xl border text-center transition-all duration-300 ${
                      isActive
                        ? 'border-[#16D9E8] bg-[#16D9E8]/10 shadow-[0_0_16px_rgba(22,217,232,0.3)] scale-105'
                        : isCompleted
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-[#F4F7FA]'
                        : 'border-[#1A222B] bg-[#141A21]/50 text-[#71808D]'
                    }`}
                  >
                    <div className={`text-[11.5px] font-semibold ${isActive ? 'text-[#16D9E8]' : isCompleted ? 'text-emerald-400' : 'text-[#F4F7FA]'}`}>
                      {node.label}
                    </div>
                    <div className="text-[10px] text-[#71808D] mt-0.5">
                      {node.sub}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Trigger Button */}
            <div className="p-3.5 rounded-xl border border-[#1A222B] bg-[#0A0D10] flex items-center justify-between">
              <div>
                <div className="text-[12px] text-[#AAB5C0]">
                  State Synchronizations: <span className="text-[#F4F7FA] font-bold">{demoState.count}</span>
                </div>
                <div className="text-[11px] text-[#71808D]">
                  Roundtrip Latency: <span className="text-[#16D9E8] font-medium">{demoState.latency}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRunDemo}
                disabled={demoState.step !== null}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-[#0A0D10] bg-[#16D9E8] hover:bg-[#14C1CE] disabled:opacity-50 transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{demoState.step !== null ? 'Syncing...' : 'Trigger State Sync'}</span>
              </button>
            </div>

          </div>
        )}

        {/* Tab 3: Tech Stack Overview */}
        {activeTab === 'stack' && (
          <div className="p-5 sm:p-6 space-y-3.5">
            <h4 className="text-[14px] font-semibold text-[#F4F7FA]">
              Technology &amp; Tooling Breakdown
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {stackItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.category} className="p-3 rounded-xl border border-[#1A222B] bg-[#141A21]/60 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-[#16D9E8]" />
                      <span className="text-[11.5px] font-semibold text-[#F4F7FA]">{item.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.techs.map(t => (
                        <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-[#0A0D10] text-[#AAB5C0] border border-[#1A222B]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
