import React from 'react';

/**
 * WireframeCube — Architectural 3D Wireframe Grid Cube
 * 
 * - True 3D geometric object rendered via CSS 3D preserve-3d with perspective
 * - 6 transparent faces with crisp hairline grid lines showing internal 3D structure
 * - Viewed from an isometric/perspective angle showing front, side, and top faces
 * - Extremely slow, subtle 3D rotation without glows, blurs, or particles
 * - Purely decorative, non-interactive (pointer-events-none, aria-hidden)
 */
export default function WireframeCube({
  size = 48,
  color = '#EF4444', // Red, Pink, or Yellow
  tiltX = -24,
  tiltZ = 12,
  duration = 16,
  reverse = false,
  divisions = 3,
  floating = false,
  className = '',
  style = {}
}) {
  const half = size / 2;
  const animName = reverse ? 'wireframeSpinCcw' : 'wireframeSpinCw';

  // 6 faces of the 3D cube positioned in 3D space
  const faces = [
    { name: 'front', transform: `translate3d(0, 0, ${half}px)` },
    { name: 'back', transform: `rotateY(180deg) translate3d(0, 0, ${half}px)` },
    { name: 'left', transform: `rotateY(-90deg) translate3d(0, 0, ${half}px)` },
    { name: 'right', transform: `rotateY(90deg) translate3d(0, 0, ${half}px)` },
    { name: 'top', transform: `rotateX(90deg) translate3d(0, 0, ${half}px)` },
    { name: 'bottom', transform: `rotateX(-90deg) translate3d(0, 0, ${half}px)` }
  ];

  // Dynamic grid coordinate percentages based on divisions
  const gridCoords = Array.from({ length: divisions - 1 }, (_, i) => ((i + 1) / divisions) * 100);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-visible ${className}`}
      style={{
        perspective: '1000px',
        width: `${size}px`,
        height: `${size}px`,
        ...style
      }}
    >
      {/* 3D Wireframe container (with optional vertical float) */}
      <div
        className="w-full h-full"
        style={{
          animation: floating ? 'wireframeFloat 8s ease-in-out infinite alternate' : 'none',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Slowly rotating 3D wireframe cube container */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            animation: `${animName} ${duration}s linear infinite`,
            '--cube-tilt-x': `${tiltX}deg`,
            '--cube-tilt-z': `${tiltZ}deg`
          }}
        >
          {faces.map((face) => (
            <div
              key={face.name}
              className="absolute inset-0"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: face.transform,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible'
              }}
            >
              {/* Hairline Vector Grid Face with subtle glass fill for crisp 3D depth */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
                style={{ display: 'block' }}
              >
                {/* Outer frame edge with clear subtle translucent tint */}
                <rect
                  x="1.5"
                  y="1.5"
                  width="97"
                  height="97"
                  fill={color}
                  fillOpacity="0.07"
                  stroke={color}
                  strokeWidth="2.5"
                  strokeOpacity="1"
                  strokeLinejoin="round"
                />

                {/* Clear Internal Wireframe Grid Lines */}
                {gridCoords.map((coord, idx) => (
                  <React.Fragment key={idx}>
                    <line
                      x1={coord}
                      y1="1.5"
                      x2={coord}
                      y2="98.5"
                      stroke={color}
                      strokeWidth="1.5"
                      strokeOpacity="0.85"
                    />
                    <line
                      x1="1.5"
                      y1={coord}
                      x2="98.5"
                      y2={coord}
                      stroke={color}
                      strokeWidth="1.5"
                      strokeOpacity="0.85"
                    />
                  </React.Fragment>
                ))}
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
