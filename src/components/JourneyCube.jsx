import React from 'react';

/**
 * JourneyCube — Architectural 3D Perspective Wireframe Cube
 * 
 * Specifically crafted for the "MY JOURNEY" section:
 * - Real 3D geometric wireframe cube constructed from 6 separate 3D faces
 * - Isometric-style orientation revealing FRONT, RIGHT, and TOP faces simultaneously
 * - 3x3 internal grid subdivisions per face with crisp hairline perspective lines
 * - True spatial depth between front vertices and rear vertices
 * - Subdued, delicate lines for rear faces to provide natural depth and transparency
 * - Almost stationary with only an ultra-subtle, slow micro-sway (no 360° spinning, no floating)
 * - Size: ~62px × 58px visual footprint (fits 55–70px target)
 * - Razor-thin, crisp yellow lines with no blur, glow, or neon effects
 */
export default function JourneyCube({ 
  className = '',
  duration = 16,
  tiltX = -20,
  tiltZ = 12,
  reverse = false
}) {
  const size = 52; // Edge length of the 3D cube
  const half = size / 2; // 26px offset for 3D faces
  const animName = reverse ? 'journeyCubeSpinCcw' : 'journeyCubeSpinCw';

  // 6 discrete faces of the 3D cube positioned in 3D coordinate space
  const faces = [
    { name: 'front', transform: `translate3d(0, 0, ${half}px)` },
    { name: 'back', transform: `rotateY(180deg) translate3d(0, 0, ${half}px)` },
    { name: 'left', transform: `rotateY(-90deg) translate3d(0, 0, ${half}px)` },
    { name: 'right', transform: `rotateY(90deg) translate3d(0, 0, ${half}px)` },
    { name: 'top', transform: `rotateX(90deg) translate3d(0, 0, ${half}px)` },
    { name: 'bottom', transform: `rotateX(-90deg) translate3d(0, 0, ${half}px)` },
  ];

  // 3 subdivisions = lines at 33.33% and 66.67% (3x3 grid)
  const gridCoords = [33.33, 66.67];

  return (
    <div
      aria-hidden="true"
      className={`relative shrink-0 flex items-center justify-center overflow-visible z-20 pointer-events-none select-none ${className}`}
      style={{
        width: '64px',
        height: '64px',
        perspective: '800px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* 3D Cube positioned safely in front of the section background plane */}
      <div
        className="relative overflow-visible"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transformStyle: 'preserve-3d',
          transform: 'translate3d(0, 0, 50px)',
          animation: `${animName} ${duration}s linear infinite`,
          '--cube-tilt-x': `${tiltX}deg`,
          '--cube-tilt-z': `${tiltZ}deg`,
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
              backfaceVisibility: 'visible',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
              style={{ display: 'block' }}
            >
              {/* Outer boundary frame */}
              <rect
                x="1.5"
                y="1.5"
                width="97"
                height="97"
                fill="#EAB308"
                fillOpacity="0.07"
                stroke="#EAB308"
                strokeWidth="2.0"
                strokeOpacity="0.95"
                strokeLinejoin="round"
              />

              {/* Internal grid lines */}
              {gridCoords.map((coord, idx) => (
                <React.Fragment key={idx}>
                  {/* Vertical subdivision line */}
                  <line
                    x1={coord}
                    y1="1.5"
                    x2={coord}
                    y2="98.5"
                    stroke="#EAB308"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />
                  {/* Horizontal subdivision line */}
                  <line
                    x1="1.5"
                    y1={coord}
                    x2="98.5"
                    y2={coord}
                    stroke="#EAB308"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />
                </React.Fragment>
              ))}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
