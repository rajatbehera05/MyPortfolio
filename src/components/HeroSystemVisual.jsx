import React, { useState } from 'react';

/**
 * HeroSystemVisual
 * 
 * Abstract interactive system visualization for the right side of the Hero.
 * Center Node: RB / CORE
 * Connected Nodes: IoT, AI, EDGE, WEB, DATA
 * 
 * Creative Elevations:
 * - Subtle 360° radar sweep at very low opacity
 * - Astrological / compass graduation tick marks on orbit ring
 * - Telemetry micro-HUD in corners
 * - Interactive node illumination & data pulses
 */
export default function HeroSystemVisual({ activeModule }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Geometry coordinates relative to 500 x 400 SVG viewBox
  const center = { id: 'core', label: 'RB / CORE', x: 250, y: 200, isCenter: true };

  const peripheralNodes = [
    { id: 'iot', label: 'IoT', x: 70, y: 200, category: 'PROTOCOLS', spec: '2.4GHz / BLE' },
    { id: 'ai', label: 'AI', x: 370, y: 80, category: 'EDGE INFERENCE', spec: 'INT8 Quant' },
    { id: 'edge', label: 'EDGE', x: 320, y: 310, category: 'REAL-TIME CORE', spec: 'Cortex-M4' },
    { id: 'web', label: 'WEB', x: 430, y: 200, category: 'ARCHITECTURE', spec: 'REST / WSS' },
    { id: 'data', label: 'DATA', x: 410, y: 340, category: 'PROTOCOLS', spec: 'Telemetry DB' },
    // Intermediate technical bridge nodes
    { id: 'bridge_ai', label: '●', x: 315, y: 135, isSmall: true },
    { id: 'bridge_edge', label: '●', x: 285, y: 260, isSmall: true },
  ];

  // Connections mapping
  const links = [
    { from: 'iot', to: 'core', key: 'iot-core', modules: ['PROTOCOLS', 'ARCHITECTURE', 'REAL-TIME CORE'] },
    { from: 'core', to: 'bridge_ai', key: 'core-b_ai', modules: ['EDGE INFERENCE', 'ARCHITECTURE'] },
    { from: 'bridge_ai', to: 'ai', key: 'b_ai-ai', modules: ['EDGE INFERENCE'] },
    { from: 'core', to: 'web', key: 'core-web', modules: ['ARCHITECTURE'] },
    { from: 'core', to: 'bridge_edge', key: 'core-b_edge', modules: ['REAL-TIME CORE', 'EDGE INFERENCE'] },
    { from: 'bridge_edge', to: 'edge', key: 'b_edge-edge', modules: ['REAL-TIME CORE', 'EDGE INFERENCE'] },
    { from: 'edge', to: 'data', key: 'edge-data', modules: ['PROTOCOLS', 'ARCHITECTURE'] },
    { from: 'ai', to: 'web', key: 'ai-web', modules: ['EDGE INFERENCE', 'ARCHITECTURE'] },
  ];

  // Compass graduation ticks (12 ticks around 180px radius)
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const r1 = 176;
    const r2 = 184;
    return {
      x1: center.x + Math.cos(angle) * r1,
      y1: center.y + Math.sin(angle) * r1,
      x2: center.x + Math.cos(angle) * r2,
      y2: center.y + Math.sin(angle) * r2,
      key: `tick-${i}`,
    };
  });

  const isLinkActive = (link) => {
    if (!activeModule && !hoveredNode) return false;
    if (activeModule && link.modules.includes(activeModule)) return true;
    if (hoveredNode && (link.from === hoveredNode || link.to === hoveredNode)) return true;
    return false;
  };

  const isNodeActive = (nodeId) => {
    if (nodeId === hoveredNode) return true;
    if (!activeModule) return false;
    if (nodeId === 'core') return true;
    if (activeModule === 'PROTOCOLS' && (nodeId === 'iot' || nodeId === 'data')) return true;
    if (activeModule === 'EDGE INFERENCE' && (nodeId === 'ai' || nodeId === 'edge' || nodeId === 'bridge_ai')) return true;
    if (activeModule === 'REAL-TIME CORE' && (nodeId === 'edge' || nodeId === 'iot' || nodeId === 'bridge_edge')) return true;
    if (activeModule === 'ARCHITECTURE' && (nodeId === 'web' || nodeId === 'data' || nodeId === 'iot')) return true;
    return false;
  };

  return (
    <div className="relative w-full max-w-[490px] mx-auto aspect-[5/4] flex items-center justify-center select-none">
      
      {/* Corner Telemetry HUD Labels */}
      <div className="absolute top-1 left-2 font-mono-tech text-[10px] text-[var(--text-muted)] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] inline-block animate-node-pulse" />
        <span>NODES: 6/6 SYNC</span>
      </div>

      <div className="absolute top-1 right-2 font-mono-tech text-[10px] text-[var(--text-muted)]">
        FREQ: <span className="text-[var(--text-secondary)]">240MHz</span>
      </div>

      <div className="absolute bottom-1 left-2 font-mono-tech text-[10px] text-[var(--text-muted)]">
        PKT_LOSS: <span className="text-[var(--accent-cyan)]">0.00%</span>
      </div>

      <div className="absolute bottom-1 right-2 font-mono-tech text-[10px] text-[var(--text-muted)] tracking-wider">
        TOPOLOGY: <span className="text-[var(--text-secondary)]">DYNAMIC_MESH</span>
      </div>

      <svg
        viewBox="0 0 500 400"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        <defs>
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial radar sweep gradient */}
          <linearGradient id="radarArmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16D9E8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#16D9E8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Orbit track rings */}
        <circle
          cx={center.x}
          cy={center.y}
          r="110"
          fill="none"
          stroke="#29323C"
          strokeWidth="0.8"
          strokeDasharray="3 6"
          className="opacity-40"
        />
        <circle
          cx={center.x}
          cy={center.y}
          r="180"
          fill="none"
          stroke="#29323C"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          className="opacity-25"
        />

        {/* Graduation tick marks */}
        {ticks.map((t) => (
          <line
            key={t.key}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="#29323C"
            strokeWidth="1"
            className="opacity-60"
          />
        ))}

        {/* Subtle rotating radar sweep arm (low opacity, purely atmospheric) */}
        <g className="animate-radar-sweep opacity-30 pointer-events-none">
          <line
            x1={center.x}
            y1={center.y}
            x2={center.x + 180}
            y2={center.y}
            stroke="url(#radarArmGrad)"
            strokeWidth="1.2"
          />
        </g>

        {/* Connecting Lines */}
        {links.map((link) => {
          const fromNode = link.from === 'core' ? center : peripheralNodes.find((n) => n.id === link.from);
          const toNode = link.to === 'core' ? center : peripheralNodes.find((n) => n.id === link.to);
          if (!fromNode || !toNode) return null;

          const active = isLinkActive(link);

          return (
            <g key={link.key}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={active ? '#16D9E8' : '#29323C'}
                strokeWidth={active ? '1.5' : '1'}
                strokeOpacity={active ? 0.95 : 0.45}
                className="transition-all duration-300"
                filter={active ? 'url(#cyanGlow)' : undefined}
              />

              {/* Data pulse marker when active */}
              {active && (
                <circle r="2.5" fill="#16D9E8">
                  <animateMotion
                    path={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Peripheral Nodes */}
        {peripheralNodes.map((node) => {
          const active = isNodeActive(node.id);
          const isSmall = node.isSmall;

          return (
            <g
              key={node.id}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Node halo ring */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSmall ? 4 : active ? 16 : 12}
                fill="#141A21"
                stroke={active ? '#16D9E8' : '#29323C'}
                strokeWidth={active ? '1.5' : '1'}
                className="transition-all duration-300"
              />

              {/* Center point */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSmall ? 2 : 3}
                fill={active ? '#16D9E8' : '#9AA5B1'}
                className="transition-all duration-300"
              />

              {/* Node label */}
              {!isSmall && (
                <g>
                  <text
                    x={node.x}
                    y={node.y + (node.y > 200 ? 24 : -18)}
                    textAnchor="middle"
                    className={`font-mono-tech text-[11px] font-semibold tracking-wider transition-colors duration-200 ${
                      active ? 'fill-[#16D9E8]' : 'fill-[#9AA5B1]'
                    }`}
                  >
                    {node.label}
                  </text>
                  {/* Subtle technical sub-label on active */}
                  {active && node.spec && (
                    <text
                      x={node.x}
                      y={node.y + (node.y > 200 ? 36 : -30)}
                      textAnchor="middle"
                      className="font-mono-tech text-[9px] fill-[#627080] tracking-tight uppercase"
                    >
                      {node.spec}
                    </text>
                  )}
                </g>
              )}
            </g>
          );
        })}

        {/* Central Node: RB / CORE */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => setHoveredNode('core')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          {/* Subtle outer breathing ring */}
          <circle
            cx={center.x}
            cy={center.y}
            r="32"
            fill="none"
            stroke="#16D9E8"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            className="animate-pulse"
          />

          {/* Solid core container */}
          <circle
            cx={center.x}
            cy={center.y}
            r="24"
            fill="#141A21"
            stroke={isNodeActive('core') ? '#16D9E8' : '#29323C'}
            strokeWidth="1.5"
            className="transition-all duration-300"
          />

          {/* Central cyan pip */}
          <circle
            cx={center.x}
            cy={center.y}
            r="4"
            fill="#16D9E8"
            className="animate-node-pulse"
          />

          {/* Core label */}
          <text
            x={center.x}
            y={center.y + 40}
            textAnchor="middle"
            className="font-mono-tech text-[12px] font-bold fill-[#F1F4F7] tracking-widest uppercase"
          >
            RB / CORE
          </text>
        </g>
      </svg>
    </div>
  );
}
