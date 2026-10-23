import React, { useRef, useCallback } from 'react';

/**
 * LiquidButton — Unified Liquid Chrome × Aurora Motion Button System
 * 
 * Design Direction: Liquid Chrome × Aurora Motion
 * Strict constraints adhered to:
 * - NO icons, symbols, arrows, or decorative glyphs inside the button (strictly text-only).
 * - Liquid Aurora (primary): Continuous flowing cyan → electric blue → cobalt → violet → magenta.
 * - Iridescent Pearl (secondary): Translucent pearl surface with shifting cyan/periwinkle/lavender/pink edge.
 * - Subtle (card actions): Crisp tactile hover & press with specular boundary.
 * - Cursor Spotlight: High-performance CSS variable tracking (--mouse-x, --mouse-y) with zero React re-renders.
 * - Glossy sheen reflection sweep on hover.
 * - Satisfying spring-like press-down interaction.
 */

export default function LiquidButton({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'subtle' | 'nav'
  size = 'md',        // 'sm' | 'md' | 'lg'
  isNight = false,
  as,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  id,
  target,
  rel,
  download,
  'aria-label': ariaLabel,
  ...rest
}) {
  const Component = as || (href ? 'a' : 'button');

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  // Sizing definitions
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-[12px]',
    md: 'px-5 sm:px-6 py-3 sm:py-3.5 text-[13.5px] sm:text-[14px]',
    lg: 'px-7 sm:px-9 py-3.5 sm:py-4 text-[15px] sm:text-[16px]',
  };

  // Base shared styles: typography, rounded shape, focus ring
  const baseClasses = `
    group relative inline-flex items-center justify-center
    font-semibold tracking-tight text-center select-none
    rounded-xl cursor-pointer overflow-hidden
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none
    ${sizeStyles[size] || sizeStyles.md}
  `;

  let variantClasses = '';
  let spotlightStyle = {};
  let sheenGradient = '';

  if (variant === 'primary') {
    // Liquid Aurora
    variantClasses = `
      btn-liquid-aurora
      text-white
      focus-visible:ring-[#2563EB] focus-visible:ring-offset-white
    `;
    spotlightStyle = {
      background: 'radial-gradient(130px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.32), transparent 75%)',
    };
    sheenGradient = 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.25) 55%, transparent 80%)';
  } else if (variant === 'secondary') {
    // Iridescent Pearl
    variantClasses = `
      btn-iridescent-pearl
      ${isNight ? 'text-[#F1F5FF] focus-visible:ring-[#4F8CFF] focus-visible:ring-offset-[#081426]' : 'text-[#0F172A] focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-white'}
    `;
    spotlightStyle = {
      background: isNight
        ? 'radial-gradient(120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(147, 197, 253, 0.25), transparent 70%)'
        : 'radial-gradient(120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(199, 210, 254, 0.45), transparent 70%)',
    };
    sheenGradient = 'linear-gradient(105deg, transparent 25%, rgba(255, 255, 255, 0.4) 48%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.4) 52%, transparent 75%)';
  } else if (variant === 'subtle') {
    // Subtle Card / Action Pill
    variantClasses = `
      btn-subtle-pearl
      ${isNight ? 'text-[#F1F5FF] bg-[#122442] hover:bg-[#162C52] border border-[rgba(150,180,230,0.2)] hover:border-[#4F8CFF]/50 focus-visible:ring-[#4F8CFF]' : 'text-[#1E293B] bg-white hover:bg-[#F8FAFC] border border-[#D5DFEB] hover:border-[#2563EB]/40 focus-visible:ring-[#2563EB]'}
      shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
      transition-all duration-200
    `;
    spotlightStyle = {
      background: 'radial-gradient(100px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.12), transparent 70%)',
    };
    sheenGradient = 'linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)';
  } else if (variant === 'nav') {
    // Sleek Navbar CTA
    variantClasses = `
      btn-nav-pearl
      ${isNight ? 'text-[#F1F5FF] bg-[#122442] hover:bg-[#162C52] border border-[rgba(150,180,230,0.2)] hover:border-[#4F8CFF]/50 hover:text-[#4F8CFF]' : 'text-[#0F172A] bg-[#EDF2F7] hover:bg-[#E8F1FF] border border-[#D5DFEB] hover:border-[#2563EB]/45 hover:text-[#2563EB]'}
      shadow-2xs hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
      transition-all duration-200
    `;
    spotlightStyle = {
      background: 'radial-gradient(90px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.15), transparent 70%)',
    };
    sheenGradient = 'linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.45) 50%, transparent 70%)';
  }

  const commonProps = {
    id,
    className: `${baseClasses} ${variantClasses} ${className}`.trim(),
    onMouseMove: handleMouseMove,
    'aria-label': ariaLabel,
    ...rest,
  };

  const content = (
    <>
      {/* 1. Dynamic Cursor Spotlight (Follows mouse position within button bounds) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        style={spotlightStyle}
      />

      {/* 2. Controlled Glossy Light Sheen Sweep on Hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 -translate-x-[160%] skew-x-[-20deg] group-hover:translate-x-[260%] transition-transform duration-1000 ease-out"
        style={{ background: sheenGradient }}
      />

      {/* 3. Pure Text Children (Strictly NO icons inside) */}
      <span className="relative z-20 font-semibold tracking-tight inline-block pointer-events-none">
        {children}
      </span>
    </>
  );

  if (Component === 'a') {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        download={download}
        onClick={onClick}
        {...commonProps}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...commonProps}
    >
      {content}
    </button>
  );
}
