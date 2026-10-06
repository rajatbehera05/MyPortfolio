import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateCcw } from 'lucide-react';
import JourneyCube from './JourneyCube';

gsap.registerPlugin(ScrollTrigger);

/**
 * JOURNEY MILESTONES DATA
 * Ultra-compact, lightweight typography — strictly NO large cards.
 */
const MILESTONES = [
  {
    step: 1,
    date: 'NOV 2025',
    title: 'Web Dev Begins',
    tech: 'HTML • CSS • JavaScript',
  },
  {
    step: 2,
    date: 'EARLY 2026',
    title: 'Building Applications',
    tech: 'React • Node.js • Express • SQL',
  },
  {
    step: 3,
    date: '2026',
    title: 'Into IoT',
    tech: 'ESP32 • Sensors • Embedded',
  },
  {
    step: 4,
    date: '2026',
    title: 'Real-World Projects',
    tech: 'Web • IoT • APIs • Hardware',
  },
  {
    step: 5,
    date: 'NOW',
    title: 'Still Building',
    tech: "What's next?",
  },
];

/**
 * SLEEK, COMPACT DEVELOPER TRAIN (SVG)
 * - Small, clean, tech-inspired (width: ~96px, height: ~26px)
 * - Sits directly ON the railway track
 * - Sized proportionally so it never touches or overlaps milestone text
 * - Glowing directional headlight + animated wheels
 */
function CompactDeveloperTrain({ isMoving = false, orientation = 'horizontal' }) {
  const isVertical = orientation === 'vertical';

  return (
    <div 
      className={`relative select-none pointer-events-none ${
        isVertical ? 'rotate-90 origin-center' : ''
      }`}
      style={{
        filter: 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.25))'
      }}
    >
      <svg 
        viewBox="0 0 110 32" 
        className="w-[152px] h-[44px] overflow-visible"
        aria-label="Developer Train"
      >
        <defs>
          {/* Headlight Projection Light Cone */}
          <linearGradient id="headlightBeamSmall" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>

          {/* Locomotive Dark Obsidian Body */}
          <linearGradient id="locoDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Arctic Speed Stripe */}
          <linearGradient id="speedStripeSmall" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Cockpit Glass */}
          <linearGradient id="cockpitGlassSmall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>

        {/* 1. Forward Headlight Projection Beam */}
        <polygon 
          points="104,17 155,5 155,29" 
          fill="url(#headlightBeamSmall)" 
          className="opacity-80 animate-pulse"
          style={{ animationDuration: '2s' }}
        />

        {/* 2. Soft Shadow on Rails */}
        <ellipse cx="50" cy="28" rx="46" ry="2" fill="#0F172A" opacity="0.3" />

        {/* 3. REAR COMPACT CARRIAGE */}
        <g id="rear-car">
          <rect x="4" y="9" width="36" height="15" rx="3" fill="url(#locoDark)" stroke="#334155" strokeWidth="0.6" />
          {/* Arctic speed stripe */}
          <rect x="4" y="17" width="36" height="1.8" fill="url(#speedStripeSmall)" />
          {/* Passenger Windows */}
          <rect x="8" y="11" width="7" height="4" rx="1" fill="#BAE6FD" opacity="0.85" />
          <rect x="19" y="11" width="7" height="4" rx="1" fill="#BAE6FD" opacity="0.85" />
          <rect x="30" y="11" width="7" height="4" rx="1" fill="#BAE6FD" opacity="0.85" />

          {/* Carriage Wheels */}
          <g className={isMoving ? 'animate-spin origin-[12px_26px]' : ''}>
            <circle cx="12" cy="26" r="3.5" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.8" />
            <circle cx="12" cy="26" r="1.4" fill="#CBD5E1" />
            <line x1="12" y1="23" x2="12" y2="29" stroke="#94A3B8" strokeWidth="0.5" />
          </g>
          <g className={isMoving ? 'animate-spin origin-[32px_26px]' : ''}>
            <circle cx="32" cy="26" r="3.5" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.8" />
            <circle cx="32" cy="26" r="1.4" fill="#CBD5E1" />
            <line x1="32" y1="23" x2="32" y2="29" stroke="#94A3B8" strokeWidth="0.5" />
          </g>
        </g>

        {/* 4. COUPLER */}
        <rect x="40" y="14" width="5" height="6" rx="1" fill="#0F172A" stroke="#334155" strokeWidth="0.5" />

        {/* 5. STREAMLINED FRONT LOCOMOTIVE */}
        <g id="loco-front">
          {/* Body Path with aerodynamic slant */}
          <path 
            d="M 45,9 
               L 82,9 
               Q 97,9 104,17 
               Q 105,18 105,22 
               L 105,24 
               L 45,24 
               Z" 
            fill="url(#locoDark)" 
            stroke="#334155" 
            strokeWidth="0.6"
          />

          {/* Aerodynamic Cockpit Windshield */}
          <path 
            d="M 80,10 
               L 93,10 
               Q 99,14 101,17 
               L 80,17 
               Z" 
            fill="url(#cockpitGlassSmall)" 
          />

          {/* Roof Inverter fin */}
          <rect x="52" y="7.5" width="22" height="1.6" rx="0.8" fill="#475569" />

          {/* Speed stripe on locomotive */}
          <path 
            d="M 45,18 
               L 98,18 
               Q 102,19.5 104,22 
               L 45,20 
               Z" 
            fill="url(#speedStripeSmall)" 
          />

          {/* High-intensity LED Headlight */}
          <circle cx="104" cy="18" r="1.8" fill="#FFFFFF" />
          <circle cx="104" cy="18" r="2.8" fill="#38BDF8" opacity="0.6" className="animate-ping" style={{ animationDuration: '1.4s' }} />

          {/* Locomotive Wheels */}
          <g className={isMoving ? 'animate-spin origin-[56px_26px]' : ''}>
            <circle cx="56" cy="26" r="3.5" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.8" />
            <circle cx="56" cy="26" r="1.4" fill="#CBD5E1" />
            <line x1="56" y1="23" x2="56" y2="29" stroke="#94A3B8" strokeWidth="0.5" />
          </g>
          <g className={isMoving ? 'animate-spin origin-[74px_26px]' : ''}>
            <circle cx="74" cy="26" r="3.5" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.8" />
            <circle cx="74" cy="26" r="1.4" fill="#CBD5E1" />
            <line x1="74" y1="23" x2="74" y2="29" stroke="#94A3B8" strokeWidth="0.5" />
          </g>
          <g className={isMoving ? 'animate-spin origin-[92px_26px]' : ''}>
            <circle cx="92" cy="26" r="3.5" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.8" />
            <circle cx="92" cy="26" r="1.4" fill="#CBD5E1" />
            <line x1="92" y1="23" x2="92" y2="29" stroke="#94A3B8" strokeWidth="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/**
 * MAIN JOURNEY COMPONENT
 * 
 * - Normal page height (py-16 sm:py-24), NO artificial 300vh/500vh
 * - NO SCROLL PINNING. NO FREEZING THE PAGE. Normal scrolling at ALL times!
 * - Automatic train journey triggers when section enters viewport
 * - Small circular station markers (24px) with dark charcoal border
 * - Lightweight alternating typography above/below track (NO large cards)
 * - Clear vertical spacing: train has its own lane and never overlaps text
 */
export default function Journey({ isEmbedded = false }) {
  const sectionRef = useRef(null);
  const trackWrapperRef = useRef(null);
  const trainRef = useRef(null);
  const upperRailRef = useRef(null);
  const lowerRailRef = useRef(null);
  const mobileRailLeftRef = useRef(null);
  const mobileRailRightRef = useRef(null);
  const eduAnimatedRef = useRef(false);

  // Animation states
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [isTrainMoving, setIsTrainMoving] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [statusText, setStatusText] = useState('Train En Route...');
  const [signalState, setSignalState] = useState('red'); // 'red' | 'amber' | 'green' | 'inactive'

  // GSAP timeline reference
  const timelineRef = useRef(null);

  const startEduAnimation = () => {
    // Only animate ONCE when section enters viewport; afterwards remains completely static
    if (eduAnimatedRef.current || !sectionRef.current) return;
    eduAnimatedRef.current = true;

    const el = sectionRef.current;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // 1. Thin progression line draws from left to right (Segment 1: 01 -> 02)
    tl.to(el.querySelectorAll('.edu-line-01'), { width: '100%', duration: 0.45, ease: 'power1.inOut' }, 0);
    tl.to(el.querySelectorAll('.edu-line-mobile'), { height: '100%', duration: 1.1, ease: 'power1.inOut' }, 0);

    // 2. Milestone 01 appears
    tl.to(el.querySelectorAll('.edu-node-01, .edu-node-mobile-01'), { opacity: 1, scale: 1, duration: 0.3 }, 0);

    // 3. St. Mary's School text fades in
    tl.to(el.querySelectorAll('.edu-text-01, .edu-text-mobile-01'), { opacity: 1, y: 0, duration: 0.35 }, 0.12);

    // 4. Milestone 02 appears as line reaches it
    tl.to(el.querySelectorAll('.edu-node-02, .edu-node-mobile-02'), { opacity: 1, scale: 1, duration: 0.3 }, 0.45);

    // 5. Shri Mathuradas College of Science fades in
    tl.to(el.querySelectorAll('.edu-text-02, .edu-text-mobile-02'), { opacity: 1, y: 0, duration: 0.35 }, 0.55);

    // 6. Line draws: Segment 2 (02 -> 03)
    tl.to(el.querySelectorAll('.edu-line-02'), { width: '100%', duration: 0.45, ease: 'power1.inOut' }, 0.55);

    // 7. Milestone 03 appears as line reaches it
    tl.to(el.querySelectorAll('.edu-node-03, .edu-node-mobile-03'), { opacity: 1, scale: 1, duration: 0.3 }, 1.0);

    // 8. YCCE text appears with subtle current-state highlight
    tl.to(el.querySelectorAll('.edu-text-03, .edu-text-mobile-03'), { opacity: 1, y: 0, duration: 0.35 }, 1.1);
    tl.to(el.querySelectorAll('.edu-current-badge, .edu-badge-mobile'), { opacity: 1, y: 0, duration: 0.3 }, 1.18);
  };

  const startTrainAnimation = () => {
    startEduAnimation();

    if (!trackWrapperRef.current || !trainRef.current) return;

    const trackWidth = trackWrapperRef.current.clientWidth;
    // Station centers at: 10%, 30%, 50%, 70%, 90%
    const trainFrontOffset = 145;
    const startX = trackWidth * 0.10 - trainFrontOffset;
    const endX = trackWidth * 0.90 - trainFrontOffset;
    const startWidth = trackWidth * 0.10;
    const endWidth = trackWidth * 0.90;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsTrainMoving(true);
    setHasStarted(true);
    setStatusText('Entering Web Dev');
    setSignalState('red');

    const tl = gsap.timeline({
      defaults: { ease: 'power1.inOut' },
      onComplete: () => {
        setIsTrainMoving(false);
        setActiveStationIndex(4);
        setStatusText('Arrived at Now');
        setSignalState('inactive');
        if (upperRailRef.current && lowerRailRef.current) {
          gsap.set([upperRailRef.current, lowerRailRef.current], { width: endWidth });
        }
        if (mobileRailLeftRef.current && mobileRailRightRef.current) {
          gsap.set([mobileRailLeftRef.current, mobileRailRightRef.current], { height: '100%' });
        }
      }
    });

    timelineRef.current = tl;

    // Reset train and blue rails to initial position (Station 1)
    tl.set(trainRef.current, { x: startX });
    if (upperRailRef.current && lowerRailRef.current) {
      tl.set([upperRailRef.current, lowerRailRef.current], { width: startWidth });
    }
    if (mobileRailLeftRef.current && mobileRailRightRef.current) {
      tl.set([mobileRailLeftRef.current, mobileRailRightRef.current], { height: '10%' });
    }
    setActiveStationIndex(0);

    // 1. Move train horizontally across the track
    tl.to(trainRef.current, {
      x: endX,
      duration: 6.8,
      ease: 'power1.inOut',
      onUpdate: () => {
        const prog = tl.progress();

        // Dynamic station activation and status pill text
        if (prog >= 0.88) {
          setActiveStationIndex(4);
          setStatusText('Arrived at Now');
        } else if (prog >= 0.63) {
          setActiveStationIndex(3);
          setStatusText('Real-World Projects');
        } else if (prog >= 0.38) {
          setActiveStationIndex(2);
          setStatusText('Entering IoT');
        } else if (prog >= 0.14) {
          setActiveStationIndex(1);
          setStatusText('Building Applications');
        } else {
          setActiveStationIndex(0);
          setStatusText('Entering Web Dev');
        }

        // Subtle railway signal (near middle at ~40% progress)
        if (prog < 0.22) {
          setSignalState('red');
        } else if (prog < 0.38) {
          setSignalState('amber');
        } else if (prog < 0.54) {
          setSignalState('green');
        } else {
          setSignalState('inactive');
        }
      }
    }, 0);

    // 2. SIMULTANEOUSLY animate glowing blue rails at the exact same time & easing (starts at offset 0)
    if (upperRailRef.current && lowerRailRef.current) {
      tl.to([upperRailRef.current, lowerRailRef.current], {
        width: endWidth,
        duration: 6.8,
        ease: 'power1.inOut',
      }, 0);
    }

    // 3. Mobile vertical rails expansion (simultaneous)
    if (mobileRailLeftRef.current && mobileRailRightRef.current) {
      tl.to([mobileRailLeftRef.current, mobileRailRightRef.current], {
        height: '100%',
        duration: 6.8,
        ease: 'power1.inOut',
      }, 0);
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      eduAnimatedRef.current = true;
      setActiveStationIndex(4);
      if (sectionRef.current) {
        const el = sectionRef.current;
        gsap.set(el.querySelectorAll('.edu-node-01, .edu-node-02, .edu-node-03, .edu-node-mobile-01, .edu-node-mobile-02, .edu-node-mobile-03'), { opacity: 1, scale: 1 });
        gsap.set(el.querySelectorAll('.edu-text-01, .edu-text-02, .edu-text-03, .edu-text-mobile-01, .edu-text-mobile-02, .edu-text-mobile-03, .edu-current-badge, .edu-badge-mobile'), { opacity: 1, y: 0 });
        gsap.set(el.querySelectorAll('.edu-line-01, .edu-line-02'), { width: '100%' });
        gsap.set(el.querySelectorAll('.edu-line-mobile'), { height: '100%' });
      }
      return;
    }

    // Set initial quiet state for education progression before scroll reveal
    if (!eduAnimatedRef.current && sectionRef.current) {
      const el = sectionRef.current;
      gsap.set(el.querySelectorAll('.edu-node-01, .edu-node-02, .edu-node-03, .edu-node-mobile-01, .edu-node-mobile-02, .edu-node-mobile-03'), { opacity: 0, scale: 0.6 });
      gsap.set(el.querySelectorAll('.edu-text-01, .edu-text-02, .edu-text-03, .edu-text-mobile-01, .edu-text-mobile-02, .edu-text-mobile-03, .edu-current-badge, .edu-badge-mobile'), { opacity: 0, y: 4 });
      gsap.set(el.querySelectorAll('.edu-line-01, .edu-line-02'), { width: '0%' });
      gsap.set(el.querySelectorAll('.edu-line-mobile'), { height: '0%' });
    }

    // Trigger train journey automatically when section enters viewport (WITHOUT PINNING!)
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        startTrainAnimation();
      }
    });

    const handleResize = () => {
      if (!trackWrapperRef.current) return;
      const trackWidth = trackWrapperRef.current.clientWidth;
      if (hasStarted && !isTrainMoving && trainRef.current) {
        // Keep train & rails at final station on window resize
        gsap.set(trainRef.current, { x: trackWidth * 0.90 - 145 });
        if (upperRailRef.current && lowerRailRef.current) {
          gsap.set([upperRailRef.current, lowerRailRef.current], { width: trackWidth * 0.90 });
        }
      } else if (!hasStarted && trainRef.current) {
        // Keep train & rails at start position before animation
        gsap.set(trainRef.current, { x: trackWidth * 0.10 - 145 });
        if (upperRailRef.current && lowerRailRef.current) {
          gsap.set([upperRailRef.current, lowerRailRef.current], { width: trackWidth * 0.10 });
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      trigger.kill();
      if (timelineRef.current) timelineRef.current.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [hasStarted, isTrainMoving]);

  const handleReplay = () => {
    startTrainAnimation();
  };

  const content = (
    <>
      {/* Navigation Anchor */}
      <div id="experience" className="absolute -top-24" aria-hidden="true" />
      <div id="journey" className="absolute -top-24" aria-hidden="true" />

      {/* ==================================================
          EDUCATION: Minimal Academic Progression
          Three numbered milestones (01, 02, 03)
          ================================================== */}
      <div id="education-progression" className="mb-10 sm:mb-12 relative z-10">
        {/* Simple Section Header */}
        <div className="mb-5 sm:mb-6">
          <p className="text-[11px] font-mono font-semibold tracking-wider text-[#64748B] uppercase">
            EDUCATION
          </p>
        </div>

        {/* DESKTOP & TABLET PROGRESSION (>= 640px) */}
        <div className="hidden sm:grid grid-cols-3 gap-6 sm:gap-8 lg:gap-12 relative">
          {/* Milestone 01 */}
          <div className="relative">
            <div className="edu-node-01">
              <span className="text-[11px] font-mono font-medium text-[#64748B] block mb-2">
                01
              </span>
              <div className="relative flex items-center mb-3">
                <div className="w-2 h-2 rounded-full bg-[#0F172A] relative z-10" />
                {/* Thin progression line from 01 to 02 */}
                <div className="absolute top-[3.5px] left-[8px] right-[-1.5rem] sm:right-[-2rem] lg:right-[-3rem] h-[1px] bg-[#E2E8F0] pointer-events-none overflow-hidden">
                  <div 
                    className="edu-line-01 h-full bg-[#2563EB]/70 origin-left"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            </div>
            <div className="edu-text-01">
              <h4 className="text-[13.5px] sm:text-[14px] font-semibold text-[#0F172A] leading-snug tracking-tight">
                St. Mary's School
              </h4>
              <p className="text-[11.5px] font-mono text-[#64748B] mt-0.5">
                Schooling · Class 10
              </p>
            </div>
          </div>

          {/* Milestone 02 */}
          <div className="relative">
            <div className="edu-node-02">
              <span className="text-[11px] font-mono font-medium text-[#64748B] block mb-2">
                02
              </span>
              <div className="relative flex items-center mb-3">
                <div className="w-2 h-2 rounded-full bg-[#0F172A] relative z-10" />
                {/* Thin progression line from 02 to 03 */}
                <div className="absolute top-[3.5px] left-[8px] right-[-1.5rem] sm:right-[-2rem] lg:right-[-3rem] h-[1px] bg-[#E2E8F0] pointer-events-none overflow-hidden">
                  <div 
                    className="edu-line-02 h-full bg-[#2563EB]/70 origin-left"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            </div>
            <div className="edu-text-02">
              <h4 className="text-[13.5px] sm:text-[14px] font-semibold text-[#0F172A] leading-snug tracking-tight">
                Shri Mathuradas College of Science
              </h4>
              <p className="text-[11.5px] font-mono text-[#64748B] mt-0.5">
                Higher Secondary · Class 11–12
              </p>
            </div>
          </div>

          {/* Milestone 03 (Current Institution) */}
          <div className="relative">
            <div className="edu-node-03">
              <span className="text-[11px] font-mono font-medium text-[#2563EB] block mb-2">
                03
              </span>
              <div className="relative flex items-center mb-3">
                <div className="w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-[#BFDBFE] relative z-10" />
              </div>
            </div>
            <div className="edu-text-03">
              <h4 className="text-[13.5px] sm:text-[14px] font-semibold text-[#0F172A] leading-snug tracking-tight">
                YCCE
              </h4>
              <p className="text-[11.5px] font-mono text-[#64748B] mt-0.5">
                B.Tech CSE (IoT) · Present
              </p>
              <span className="edu-current-badge inline-block mt-2 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-medium text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE]">
                CURRENT
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE VERTICAL PROGRESSION (< 640px) */}
        <div className="sm:hidden relative pl-6 py-1">
          {/* Extremely thin vertical progression line */}
          <div className="absolute left-[3.5px] top-2 bottom-3 w-[1px] bg-[#E2E8F0] overflow-hidden">
            <div 
              className="edu-line-mobile w-full bg-[#2563EB]/70 origin-top"
              style={{ height: '0%' }}
            />
          </div>

          <div className="space-y-6">
            {/* Mobile Milestone 01 */}
            <div className="relative">
              <div className="edu-node-mobile-01 absolute -left-[24px] top-1 w-2 h-2 rounded-full bg-[#0F172A]" />
              <div className="edu-text-mobile-01">
                <span className="text-[10.5px] font-mono font-medium text-[#64748B] block">
                  01
                </span>
                <h4 className="text-[13.5px] font-semibold text-[#0F172A] leading-snug tracking-tight mt-0.5">
                  St. Mary's School
                </h4>
                <p className="text-[11.5px] font-mono text-[#64748B] mt-0.5">
                  Schooling · Class 10
                </p>
              </div>
            </div>

            {/* Mobile Milestone 02 */}
            <div className="relative">
              <div className="edu-node-mobile-02 absolute -left-[24px] top-1 w-2 h-2 rounded-full bg-[#0F172A]" />
              <div className="edu-text-mobile-02">
                <span className="text-[10.5px] font-mono font-medium text-[#64748B] block">
                  02
                </span>
                <h4 className="text-[13.5px] font-semibold text-[#0F172A] leading-snug tracking-tight mt-0.5">
                  Shri Mathuradas College of Science
                </h4>
                <p className="text-[11.5px] font-mono text-[#64748B] mt-0.5">
                  Higher Secondary · Class 11–12
                </p>
              </div>
            </div>

            {/* Mobile Milestone 03 */}
            <div className="relative">
              <div className="edu-node-mobile-03 absolute -left-[24px] top-1 w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-[#BFDBFE]" />
              <div className="edu-text-mobile-03">
                <span className="text-[10.5px] font-mono font-medium text-[#2563EB] block">
                  03
                </span>
                <h4 className="text-[13.5px] font-semibold text-[#0F172A] leading-snug tracking-tight mt-0.5">
                  YCCE
                </h4>
                <p className="text-[11.5px] font-mono text-[#64748B] mt-0.5">
                  B.Tech CSE (IoT) · Present
                </p>
                <span className="edu-badge-mobile inline-block mt-1.5 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-medium text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE]">
                  CURRENT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet divider separating Education from My Journey */}
        <div className="mt-8 sm:mt-10 border-b border-[#E2E8F0]" />
      </div>

      {/* ==================================================
          MY JOURNEY INTRO
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 relative z-10 overflow-visible">
        <div className="space-y-2 relative z-10 overflow-visible">
          <div>
            <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider text-[#2563EB] uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span>Development Path</span>
              <span className="text-[#CBD5E1]">•</span>
              <span className="text-[#64748B]">Milestones</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 sm:gap-4 relative z-20 overflow-visible">
            <JourneyCube className="mr-0.5 sm:mr-1" />
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[#111827] font-sans-editorial">
              MY JOURNEY
            </h3>
          </div>

          <p className="text-[15.5px] sm:text-[16.5px] text-[#111827] font-medium leading-relaxed">
            From my first web code to building connected systems.
          </p>

          <p className="text-[12.5px] font-mono text-[#64748B]">
            Started in November 2025. Still building.
          </p>
        </div>

        {/* Dynamic Train Status Pill */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-mono font-medium text-[#475569] bg-white border border-[#DCE4EF] hover:text-[#2563EB] hover:border-[#2563EB]/40 hover:shadow-xs transition-all cursor-pointer"
            title="Replay Train Journey"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isTrainMoving ? 'animate-spin text-[#2563EB]' : 'text-[#64748B]'}`} />
            <span>{statusText}</span>
          </button>
        </div>
      </div>

        {/* ==================================================
            DESKTOP RAILWAY EXPEDITION (>= 1024px)
            Horizontal Railway with Small Circular Markers &
            Alternating Lightweight Typography (NO CARDS)
            ================================================== */}
        <div className="hidden lg:block relative py-6">

          {/* 1. TOP TYPOGRAPHY ROW (Milestones 1, 3, 5 - Above Track) */}
          <div className="grid grid-cols-5 gap-4 w-full h-[100px] mb-3 items-end">
            {MILESTONES.map((item, idx) => {
              const isAbove = idx % 2 === 0; // Stations 0, 2, 4 above
              const isPassed = activeStationIndex >= idx;
              const isCurrent = activeStationIndex === idx;

              if (!isAbove) {
                return <div key={item.step} className="w-full" />;
              }

              return (
                <div 
                  key={item.step} 
                  className={`flex flex-col items-center text-center transition-all duration-300 ${
                    isPassed ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {/* Date Tag — Clear, bold, and larger */}
                  <span className={`inline-block px-2.5 py-0.5 rounded-lg border font-mono text-[13px] sm:text-[13.5px] font-extrabold tracking-wider uppercase mb-1.5 transition-all ${
                    isCurrent 
                      ? 'bg-[#E8F1FF] text-[#2563EB] border-[#2563EB]/40 shadow-xs scale-105' 
                      : isPassed 
                        ? 'bg-white text-[#0F172A] border-[#CBD5E1] shadow-2xs' 
                        : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
                  }`}>
                    {item.date}
                  </span>

                  {/* Title */}
                  <h3 className="text-[15px] font-bold text-[#111827] leading-snug tracking-tight">
                    {item.title}
                  </h3>

                  {/* Technologies */}
                  <p className="text-[11.5px] font-medium text-[#64748B] mt-1 whitespace-nowrap">
                    {item.tech}
                  </p>

                  {/* Minimalist vertical connector stem pointing to station circle */}
                  <div className={`w-[1.5px] h-4 mt-2 transition-colors duration-300 ${
                    isPassed ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* 2. THE RAILWAY TRACK & TRAIN (Separate, dedicated lane - NEVER overlaps text) */}
          <div ref={trackWrapperRef} className="relative w-full h-[36px] flex items-center select-none my-2">
            
            {/* Base Sleeper / Cross-Ties Bed */}
            <div className="absolute inset-x-2 inset-y-1 flex justify-between items-center pointer-events-none opacity-80">
              {Array.from({ length: 54 }).map((_, i) => (
                <div key={i} className="w-[2.5px] h-6 bg-[#94A3B8] rounded-[0.5px]" />
              ))}
            </div>

            {/* Base Twin Metallic Rails */}
            <div className="absolute inset-x-0 top-[11px] h-[2px] bg-[#475569] rounded-full shadow-xs" />
            <div className="absolute inset-x-0 bottom-[11px] h-[2px] bg-[#475569] rounded-full shadow-xs" />

            {/* Glowing Active Track Behind Train — Subtle accent glow, moves simultaneously */}
            <div 
              ref={upperRailRef}
              className="absolute left-0 top-[10px] h-[3.5px] bg-gradient-to-r from-[#2563EB]/85 via-[#38BDF8] to-[#10B981] rounded-full shadow-[0_0_6px_rgba(37,99,235,0.4)] origin-left pointer-events-none"
              style={{ width: '10%' }}
            />
            <div 
              ref={lowerRailRef}
              className="absolute left-0 bottom-[10px] h-[3.5px] bg-gradient-to-r from-[#2563EB]/85 via-[#38BDF8] to-[#10B981] rounded-full shadow-[0_0_6px_rgba(37,99,235,0.4)] origin-left pointer-events-none"
              style={{ width: '10%' }}
            />

            {/* Minimal Railway Signal (Between Station 2 and 3 at 42%) */}
            <div 
              className="absolute -translate-x-1/2 -top-[24px] flex flex-col items-center pointer-events-none select-none z-10"
              style={{ left: '42%' }}
            >
              <div className="w-[8px] h-[19px] rounded-xs bg-[#0F172A] border border-[#334155] p-[1.5px] flex flex-col justify-between items-center shadow-xs">
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  signalState === 'red'
                    ? 'bg-[#EF4444] shadow-[0_0_4px_#EF4444]'
                    : 'bg-[#EF4444]/25'
                }`} />
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  signalState === 'amber'
                    ? 'bg-[#F59E0B] shadow-[0_0_4px_#F59E0B]'
                    : 'bg-[#F59E0B]/25'
                }`} />
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  signalState === 'green'
                    ? 'bg-[#10B981] shadow-[0_0_5px_#10B981]'
                    : signalState === 'inactive'
                      ? 'bg-[#10B981]/30'
                      : 'bg-[#10B981]/25'
                }`} />
              </div>
              <div className="w-[1.5px] h-[6px] bg-[#475569]" />
            </div>

            {/* NEXT Label & Arrow continuing beyond NOW */}
            <div 
              className="absolute -right-1 -top-5 flex items-center gap-1 font-mono text-[10px] font-bold tracking-wider text-[#94A3B8] select-none pointer-events-none"
            >
              <span>NEXT</span>
              <span className="text-[#2563EB] font-bold">→</span>
            </div>

            {/* 5 Small Clean Circular Station Markers Sitting Directly on Track */}
            {MILESTONES.map((item, idx) => {
              const stationPos = ((idx + 0.5) / MILESTONES.length) * 100;
              const isPassed = activeStationIndex >= idx;
              const isCurrent = activeStationIndex === idx;

              return (
                <div
                  key={item.step}
                  className="absolute -translate-x-1/2 flex items-center justify-center z-10"
                  style={{ left: `${stationPos}%` }}
                >
                  {/* Small Circular Station Marker (~24px) with Dark Border */}
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border-2 transition-all duration-300 ${
                      isCurrent
                        ? 'border-[#0F172A] bg-[#2563EB] text-white scale-120 shadow-[0_0_12px_rgba(37,99,235,0.6)] ring-3 ring-[#38BDF8]/30'
                        : isPassed
                          ? 'border-[#0F172A] bg-[#10B981] text-white shadow-xs'
                          : 'border-[#1E293B] bg-white text-[#475569]'
                    }`}
                  >
                    {item.step}
                  </div>
                </div>
              );
            })}

            {/* The Automatic Travelling Train */}
            <div 
              ref={trainRef}
              className="absolute -top-[29px] left-0 z-20 pointer-events-none"
              style={{ willChange: 'transform' }}
            >
              <CompactDeveloperTrain 
                isMoving={isTrainMoving} 
                orientation="horizontal" 
              />
            </div>

          </div>

          {/* 3. BOTTOM TYPOGRAPHY ROW (Milestones 2, 4 - Below Track) */}
          <div className="grid grid-cols-5 gap-4 w-full h-[100px] mt-3 items-start">
            {MILESTONES.map((item, idx) => {
              const isBelow = idx % 2 !== 0; // Stations 1, 3 below
              const isPassed = activeStationIndex >= idx;
              const isCurrent = activeStationIndex === idx;

              if (!isBelow) {
                return <div key={item.step} className="w-full" />;
              }

              return (
                <div 
                  key={item.step} 
                  className={`flex flex-col items-center text-center transition-all duration-300 ${
                    isPassed ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {/* Minimalist vertical connector stem pointing from station circle */}
                  <div className={`w-[1.5px] h-4 mb-2 transition-colors duration-300 ${
                    isPassed ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
                  }`} />

                  {/* Title */}
                  <h3 className="text-[15px] font-bold text-[#111827] leading-snug tracking-tight">
                    {item.title}
                  </h3>

                  {/* Technologies */}
                  <p className="text-[11.5px] font-medium text-[#64748B] mt-1 whitespace-nowrap">
                    {item.tech}
                  </p>

                  {/* Date Tag — Clear, bold, and larger */}
                  <span className={`inline-block px-2.5 py-0.5 rounded-lg border font-mono text-[13px] sm:text-[13.5px] font-extrabold tracking-wider uppercase mt-2 transition-all ${
                    isCurrent 
                      ? 'bg-[#E8F1FF] text-[#2563EB] border-[#2563EB]/40 shadow-xs scale-105' 
                      : isPassed 
                        ? 'bg-white text-[#0F172A] border-[#CBD5E1] shadow-2xs' 
                        : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
                  }`}>
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* ==================================================
            MOBILE & TABLET VERTICAL RAILWAY (< 1024px)
            Clean Vertical Track with Small Circular Markers &
            Direct Lightweight Typography (NO CARDS)
            ================================================== */}
        <div className="lg:hidden relative pl-10 sm:pl-14 py-4">
          
          {/* Vertical Railway Spine */}
          <div className="absolute left-3 sm:left-4 top-2 bottom-2 w-[16px] select-none">
            {/* Sleepers */}
            <div className="absolute inset-y-2 inset-x-0 flex flex-col justify-between pointer-events-none opacity-80">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="h-[2px] w-full bg-[#94A3B8] rounded-[0.5px]" />
              ))}
            </div>

            {/* Twin Vertical Steel Rails */}
            <div className="absolute inset-y-0 left-[3px] w-[2px] bg-[#475569]" />
            <div className="absolute inset-y-0 right-[3px] w-[2px] bg-[#475569]" />

            {/* Glowing Active Rail — Moves SIMULTANEOUSLY with vertical train */}
            <div 
              ref={mobileRailLeftRef}
              className="absolute left-[3px] top-0 w-[2.5px] bg-gradient-to-b from-[#2563EB]/85 via-[#38BDF8] to-[#10B981] shadow-[0_0_6px_#2563EB] pointer-events-none"
              style={{ height: '10%' }}
            />
            <div 
              ref={mobileRailRightRef}
              className="absolute right-[3px] top-0 w-[2.5px] bg-gradient-to-b from-[#2563EB]/85 via-[#38BDF8] to-[#10B981] shadow-[0_0_6px_#2563EB] pointer-events-none"
              style={{ height: '10%' }}
            />

            {/* NEXT Label continuing vertically */}
            <div className="absolute -left-[32px] sm:-left-[40px] -bottom-6 flex items-center gap-1 font-mono text-[9.5px] font-bold text-[#94A3B8] select-none pointer-events-none">
              <span>NEXT</span>
              <span className="text-[#2563EB]">↓</span>
            </div>
          </div>

          {/* Vertical Milestones List */}
          <div className="space-y-10 sm:space-y-12">
            {MILESTONES.map((item, idx) => {
              const isPassed = activeStationIndex >= idx;
              const isCurrent = activeStationIndex === idx;

              return (
                <div 
                  key={item.step} 
                  className={`relative transition-all duration-300 ${
                    isPassed ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {/* Small Circular Station Marker (~24px) Sitting Directly on Vertical Track */}
                  <div 
                    className={`absolute -left-[36px] sm:-left-[44px] top-1 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border-2 transition-all duration-300 z-10 ${
                      isCurrent
                        ? 'border-[#0F172A] bg-[#2563EB] text-white scale-115 shadow-[0_0_10px_rgba(37,99,235,0.6)] ring-2 ring-[#38BDF8]/40'
                        : isPassed
                          ? 'border-[#0F172A] bg-[#10B981] text-white shadow-xs'
                          : 'border-[#1E293B] bg-white text-[#475569]'
                    }`}
                  >
                    {item.step}
                  </div>

                  {/* Clean Lightweight Typography (NO CARDS) */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-lg border font-mono text-[12.5px] sm:text-[13px] font-extrabold tracking-wider uppercase transition-all ${
                        isCurrent 
                          ? 'bg-[#E8F1FF] text-[#2563EB] border-[#2563EB]/40 shadow-xs' 
                          : isPassed 
                            ? 'bg-white text-[#0F172A] border-[#CBD5E1] shadow-2xs' 
                            : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-[16px] font-bold text-[#111827] tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-[12.5px] font-medium text-[#64748B]">
                      {item.tech}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
    </>
  );

  if (isEmbedded) {
    return (
      <div
        id="exploring"
        ref={sectionRef}
        aria-label="Developer Journey"
        className="relative w-full overflow-visible"
      >
        {content}
      </div>
    );
  }

  return (
    <section
      id="exploring"
      ref={sectionRef}
      aria-label="Developer Journey"
      className="relative w-full py-16 sm:py-24 bg-[#EDF2F7] border-t border-[#D5DFEB] overflow-visible"
    >
      {/* Subtle Aurora Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-[#E8F1FF]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1380px] w-full mx-auto px-6 sm:px-12">
        {content}
      </div>
    </section>
  );
}
