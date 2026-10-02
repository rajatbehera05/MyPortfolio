import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network } from 'lucide-react';

/**
 * High-Precision Technology Brand SVGs
 * Accurate, pixel-perfect, and optimized vector icons
 */
const TechIcons = {
  Java: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <path
        d="M13.2 24.2c3.5.5 7.6.4 10.4-.3 0 0 .7.9-.7 1.3-3.4 1.1-8.9.8-10.7-.2-.4-.3.4-.7 1-.8zm-.4-2.7c4.1.8 8.7.5 11.7-.3 0 0 .5.8-.6 1.2-3.7 1.2-9.9.9-11.8-.3-.4-.3.1-.5.7-.6zm1-5.1c-1.8 1.6-3.2 3.4-2.1 4.5 1 .9 3.6.5 6.2.1 2.3-.4 5-1.1 6.5-.7 0 0 .4-.5.1-1-1.2-1.6-4.3-1.8-6.5-1.8-1.7 0-3.2-.4-4.2-1.1zm10.1 9.3c-3.9 1.9-12.9 2-16.4.3-.4-.3 0-.7.6-.7 2.8.4 9 .4 13-.5 1.9-.5 3.1.4 2.8.9zm3.3-7.1c2.4-2.3 1.5-4.9-1-5.6-.6-.1-1-.1-1.2-.1 0 0 .3-.5.6-1 1.8-2.9.3-4.7-1.1-5.8-.4-.3-.7-.1-.6.1 1 1.2 1.4 2.5.6 3.9-1.1 1.9-2.9 2.5-4.7 3-2.6.8-5.7 1.8-5.8 4.7 0 .1.1.3.3.3 1.1-1.1 3.1-1.8 5-1.8 3.7 0 6.9 1.1 7.5 2.3-.5.1-.9.2-1.3.4.6.4 1.3.7 1.7.9.6-.5 1.1-.9 1.4-1.2zm-3.9-11.2c-.6 1.6-2 2.9-3.5 3.7-.3.1-.1.4.1.3 1.5-.6 3.2-1.9 3.6-3.6.3-.9 0-1.5-.3-2.2 0 0-.3.1-.1.3.3.4.3 1 .1 1.5z"
        fill="#E76F00"
      />
      <path
        d="M20.2 3.2c-1.4 1.9-3 3.6-4.8 5.1-.3.2-.1.5.2.4 1.7-.8 3.4-2 4.4-3.7.6-1.1.4-2.1 0-2.8 0 0-.3 0-.2.2.2.3.5.7.4.8z"
        fill="#5382A1"
      />
    </svg>
  ),

  JavaScript: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <rect width="32" height="32" rx="6" fill="#F7DF1E" />
      <path
        d="M8.5 25l2.4-1.5c.5.9 1.1 1.6 2.1 1.6 1.1 0 1.7-.4 1.7-1.6v-9.2h3.1v9.2c0 2.8-1.7 4.1-4.7 4.1-2.4 0-4-1.2-4.6-2.6zm11.6 0l2.4-1.5c.7 1.1 1.6 1.7 2.9 1.7 1.3 0 2.1-.7 2.1-1.6 0-1.1-.8-1.5-2.4-2.1l-.8-.4c-2.4-1.1-4-2.3-4-4.9 0-2.5 2-4.4 4.9-4.4 2.1 0 3.7.8 4.7 2.5l-2.3 1.5c-.5-.9-1.2-1.3-2.4-1.3-1.1 0-1.9.7-1.9 1.5 0 .9.7 1.3 2.1 1.9l.8.4c2.8 1.2 4.4 2.4 4.4 5.2 0 2.9-2.3 4.7-5.3 4.7-2.9 0-4.8-1.5-5.6-3.2z"
        fill="#000000"
      />
    </svg>
  ),

  SQL: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <ellipse cx="16" cy="7" rx="12" ry="4" fill="#2563EB" fillOpacity="0.15" stroke="#2563EB" strokeWidth="2" />
      <path
        d="M4 7v6c0 2.21 5.37 4 12 4s12-1.79 12-4V7"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 13v6c0 2.21 5.37 4 12 4s12-1.79 12-4v-6"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 19v6c0 2.21 5.37 4 12 4s12-1.79 12-4v-6"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="10.5" y="16.5" width="11" height="5" rx="1.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1" />
      <text x="16" y="20.3" textAnchor="middle" fill="#2563EB" fontSize="3.8" fontFamily="monospace" fontWeight="bold">
        SQL
      </text>
    </svg>
  ),

  React: () => (
    <svg viewBox="-11.5 -10.23 23 20.46" className="w-full h-full shrink-0" fill="none">
      <circle cx="0" cy="0" r="2.1" fill="#0284C7" />
      <g stroke="#0284C7" strokeWidth="1.1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),

  NodeJS: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <path
        d="M16 2.5l11.7 6.7v13.6L16 29.5 4.3 22.8V9.2L16 2.5z"
        fill="#339933"
        fillOpacity="0.12"
        stroke="#43A047"
        strokeWidth="1.8"
      />
      <path
        d="M16 8.5l6.5 3.8v7.4L16 23.5l-6.5-3.8v-7.4L16 8.5z"
        fill="#339933"
      />
      <path
        d="M13 18.5V13.8l5.8 3.4v-4.7"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  ExpressJS: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <rect width="32" height="32" rx="6" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.2" />
      <path
        d="M7 16h6M10 13l3 3-3 3"
        stroke="#2563EB"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="21" y="19" textAnchor="middle" fill="#111827" fontSize="8" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif">
        ex
      </text>
    </svg>
  ),

  HTML5: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <path d="M4 3l2.4 24.5L16 30l9.6-2.5L28 3H4z" fill="#E34F26" />
      <path d="M16 5.2v22.6l7.7-2.1L25.4 5.2H16z" fill="#EF652A" />
      <path
        d="M16 10.4h-5.4l.4 3.7H16v-3.7zm0 7.3h-.1l-3.6-.9-.2-2.7H8.4l.5 5.4 7.1 2v-3.8zm0-7.3v3.7h5.1l-.5 5.5-4.6 1.2v3.8l7.1-2 .8-8.5.3-3.7H16z"
        fill="#FFFFFF"
      />
    </svg>
  ),

  CSS: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <path d="M4 3l2.4 24.5L16 30l9.6-2.5L28 3H4z" fill="#1572B6" />
      <path d="M16 5.2v22.6l7.7-2.1L25.4 5.2H16z" fill="#33A9DC" />
      <path
        d="M16 10.4H9.8l.4 3.7H16v-3.7zm0 7.3h-.1l-3.6-.9-.2-2.7H8.4l.5 5.4 7.1 2v-3.8zm0-7.3v3.7h5.1l-.5 5.5-4.6 1.2v3.8l7.1-2 .8-8.5.3-3.7H16z"
        fill="#FFFFFF"
      />
    </svg>
  ),

  PostgreSQL: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <rect width="32" height="32" rx="6" fill="#F0F4F8" stroke="#336791" strokeWidth="1.2" />
      <path
        d="M23.8 11.2c-.6-1.5-1.9-2.7-3.4-3.2-1.9-.7-4.1-.3-5.7.9-1.2.9-2 2.3-2.3 3.8-.4-.2-.8-.4-1.2-.5-1.3-.4-2.8-.2-3.8.7-.9.8-1.4 2-1.4 3.2 0 1.5.8 2.9 2.1 3.6-.1.6-.1 1.2 0 1.8.2 1.4 1 2.6 2.3 3.3.4.2.8.4 1.3.5.1.8.4 1.5.9 2.1.2.2.5.2.7.1.2-.2.2-.5.1-.7-.4-.5-.6-1.1-.7-1.7.5.1 1.1.1 1.6 0 1.5-.3 2.8-1.3 3.4-2.7.3.1.6.2.9.2 1.2 0 2.4-.6 3.1-1.6.8-1.2 1-2.7.6-4.1 1.1-.7 1.8-1.9 1.8-3.2 0-.9-.3-1.7-.9-2.3zm-5.4 11.2c-.5 1-1.4 1.7-2.5 1.9-.4.1-.8.1-1.2 0 .1-.5.3-1 .6-1.4.5-.7 1.3-1.2 2.2-1.4.3.3.6.6.9.9zm-4.8-11.8c.3-1.2 1-2.3 2-3 1.3-.9 3-1.2 4.5-.7 1.2.4 2.2 1.3 2.7 2.5.3.7.4 1.5.3 2.3-1.1-.3-2.2-.4-3.3-.3-1.6.2-3.1.9-4.2 2-.5-1-.9-1.9-1.8-2.6-.1-.1-.1-.1-.2-.2zm-4.7 6.9c0-.9.4-1.8 1.1-2.4.8-.7 1.9-.8 2.9-.5.4.1.7.3 1 .5-.2.9-.2 1.8.1 2.7.2.7.7 1.4 1.3 1.8-.4.7-.6 1.5-.6 2.4-.9-.3-1.6-.9-2-1.7-.7-.7-1-1.7-1-2.6-.8-.1-1.8-.1-2.8-.2zm12.9-1.1c.3 1.1.1 2.3-.5 3.2-.5.8-1.4 1.2-2.3 1.2-.2 0-.5 0-.7-.1-.3-.6-.7-1.1-1.2-1.5-.7-.5-1.5-.9-2.4-1-.3-.7-.3-1.6 0-2.3.9-.9 2.1-1.4 3.4-1.5.9-.1 1.8.1 2.6.3.8.4 1.1 1 1.1 1.7z"
        fill="#336791"
      />
      <circle cx="20.5" cy="12.5" r="0.9" fill="#FFFFFF" />
      <path d="M12.5 19.5c.8.5 1.8.8 2.8.8" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  ),

  ESP32: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <rect x="5" y="5" width="22" height="22" rx="3.5" fill="#F8FAFC" stroke="#2563EB" strokeWidth="1.5" />
      <path
        d="M9 8h2v2h2v-2h2v2h2v-2h2"
        stroke="#E76F00"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <rect x="9" y="12" width="14" height="11" rx="2" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
      <text x="16" y="18" textAnchor="middle" fill="#111827" fontSize="4.2" fontWeight="bold" fontFamily="monospace">
        ESP32
      </text>
      <text x="16" y="21.5" textAnchor="middle" fill="#2563EB" fontSize="2.5" fontFamily="monospace" fontWeight="bold">
        WROOM
      </text>
      <path d="M7 2v3M11 2v3M16 2v3M21 2v3M25 2v3" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7 27v3M11 27v3M16 27v3M21 27v3M25 27v3" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M2 9h3M2 13h3M2 19h3M2 23h3" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M27 9h3M27 13h3M27 19h3M27 23h3" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),

  Arduino: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <path
        d="M10.8 9.5C6.5 9.5 3 12.4 3 16s3.5 6.5 7.8 6.5c3.2 0 5.4-1.7 6.7-3.4 1.3 1.7 3.5 3.4 6.7 3.4 4.3 0 7.8-2.9 7.8-6.5s-3.5-6.5-7.8-6.5c-3.2 0-5.4 1.7-6.7 3.4-1.3-1.7-3.5-3.4-6.7-3.4zm0 2.2c2.8 0 5.2 2 5.2 4.3s-2.4 4.3-5.2 4.3-5.2-1.9-5.2-4.3 2.4-4.3 5.2-4.3zm10.4 0c2.8 0 5.2 1.9 5.2 4.3s-2.4 4.3-5.2 4.3-5.2-1.9-5.2-4.3 2.4-4.3 5.2-4.3z"
        fill="#00979C"
      />
      <rect x="8.5" y="15.2" width="4.6" height="1.6" rx="0.5" fill="#FFFFFF" />
      <rect x="18.9" y="15.2" width="4.6" height="1.6" rx="0.5" fill="#FFFFFF" />
      <rect x="20.4" y="13.7" width="1.6" height="4.6" rx="0.5" fill="#FFFFFF" />
    </svg>
  ),

  ArduinoIDE: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <rect width="32" height="32" rx="6" fill="#008184" />
      <path
        d="M11 11.5c-2.8 0-5 1.9-5 4.5s2.2 4.5 5 4.5c2.1 0 3.5-1.1 4.3-2.3.8 1.2 2.2 2.3 4.3 2.3 2.8 0 5-2 5-4.5s-2.2-4.5-5-4.5c-2.1 0-3.5 1.2-4.3 2.3-.8-1.1-2.2-2.3-4.3-2.3zm0 1.5c1.8 0 3.4 1.4 3.4 3s-1.6 3-3.4 3-3.4-1.3-3.4-3 1.6-3 3.4-3zm9.6 0c1.8 0 3.4 1.4 3.4 3s-1.6 3-3.4 3-3.4-1.3-3.4-3 1.6-3 3.4-3z"
        fill="#FFFFFF"
      />
      <rect x="9.5" y="15.3" width="3" height="1.2" fill="#008184" />
      <rect x="19.1" y="15.3" width="3" height="1.2" fill="#008184" />
      <rect x="20" y="14.4" width="1.2" height="3" fill="#008184" />
      <rect x="19" y="21" width="10" height="8" rx="2" fill="#FFFFFF" stroke="#00979C" strokeWidth="1" />
      <text x="24" y="26.8" textAnchor="middle" fill="#00979C" fontSize="5" fontWeight="bold" fontFamily="monospace">
        &lt;/&gt;
      </text>
    </svg>
  ),

  MySQL: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <rect width="32" height="32" rx="6" fill="#F0F5FA" stroke="#00758F" strokeWidth="1.2" />
      <path
        d="M24.5 15.5c-1.5-1.2-3.8-1.5-5.5-1.8-1.2-.2-2.5-.5-3.5-1.2-1.5-1-2.5-2.6-3.8-3.9-.3-.3-.8-.3-.9.1-.3 1.2.2 2.5 1 3.5.5.7 1.3 1.2 2 1.7-2.1.2-4.3.8-6.1 1.9-1.3.8-2.4 2-2.7 3.6-.3 1.5.2 3.1 1.3 4.2 1.1 1.1 2.7 1.5 4.2 1.3 2.1-.2 4-1.2 5.8-2.2 2-1.1 4.1-2.3 6.4-2.8 1.1-.2 2.3-.4 2.8-1.5.4-.8.1-2-.6-2.5l-.4-.4z"
        fill="#00758F"
      />
      <path
        d="M17.5 14c1.2-.5 2.5-.8 3.8-.9 1.4-.1 2.8.2 4 .8-1.5-1.2-3.5-1.5-5.3-1.2-1.2.2-2.3.8-3.3 1.5.3-.1.5-.2.8-.2z"
        fill="#F29111"
      />
      <text x="16" y="27" textAnchor="middle" fill="#00758F" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif">
        MySQL
      </text>
    </svg>
  ),

  Git: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <rect x="16" y="2" width="19.8" height="19.8" rx="3.5" transform="rotate(45 16 2)" fill="#F05032" />
      <circle cx="12.5" cy="19.5" r="2.2" fill="#FFFFFF" />
      <circle cx="19.5" cy="12.5" r="2.2" fill="#FFFFFF" />
      <circle cx="12.5" cy="12.5" r="2.2" fill="#FFFFFF" />
      <path
        d="M12.5 14.7v2.6M14.7 12.5h2.6"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12.5 14.7c0 2 2 3.8 4.8 4.8"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),

  GitHub: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3C8.82 3 3 8.82 3 16c0 5.75 3.73 10.63 8.9 12.35.65.12.89-.28.89-.63 0-.31-.01-1.13-.02-2.22-3.62.79-4.38-1.75-4.38-1.75-.59-1.5-1.44-1.9-1.44-1.9-1.18-.81.09-.79.09-.79 1.3.09 1.99 1.34 1.99 1.34 1.16 1.99 3.04 1.41 3.78 1.08.12-.84.45-1.41.83-1.74-2.89-.33-5.93-1.45-5.93-6.44 0-1.42.51-2.58 1.34-3.49-.13-.33-.58-1.65.13-3.45 0 0 1.09-.35 3.57 1.33 1.04-.29 2.15-.43 3.25-.44 1.1.01 2.21.15 3.25.44 2.48-1.68 3.57-1.33 3.57-1.33.71 1.8.26 3.12.13 3.45.83.91 1.34 2.07 1.34 3.49 0 5-3.05 6.1-5.95 6.42.47.4.88 1.2.88 2.41 0 1.74-.02 3.14-.02 3.57 0 .35.23.76.89.63C25.27 26.63 29 21.75 29 16c0-7.18-5.82-13-13-13z"
      />
    </svg>
  ),

  VSCode: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <path
        d="M23.5 3.5l4.8 2.3c.7.3 1.2 1 1.2 1.8v16.8c0 .8-.5 1.5-1.2 1.8l-4.8 2.3-15-11.5L23.5 3.5z"
        fill="#0065A9"
      />
      <path
        d="M23.5 28.5L8.5 17 4.1 20.4c-.6.5-1.5.5-2.1 0l-.8-.7c-.6-.5-.6-1.4 0-1.9L6 14 1.2 10.2c-.6-.5-.6-1.4 0-1.9l.8-.7c.6-.5 1.5-.5 2.1 0l4.4 3.4 15-11.5v29z"
        fill="#007ACC"
      />
      <path
        d="M23.5 8.5L12 17l11.5 8.5V8.5z"
        fill="#1F9CF0"
      />
    </svg>
  ),

  Docker: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full shrink-0" fill="none">
      <rect x="7" y="11.5" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="10.2" y="11.5" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="13.4" y="11.5" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="10.2" y="8.7" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="13.4" y="8.7" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="16.6" y="8.7" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="16.6" y="11.5" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <rect x="19.8" y="11.5" width="2.5" height="2.2" rx="0.4" fill="#2496ED" />
      <path
        d="M29.5 15.2c-.4-.3-1.6-.4-2.6.2-.2-.8-.8-1.5-1.8-1.9-.3-.1-.6-.2-.9-.2-2.3 0-4.3 1.2-5.4 3.1-4.7 0-9.2.5-12.8 3.8-1.2 1.1-2 2.6-2 4.3 0 3.8 3.8 6.5 8.8 6.5 7.1 0 12.3-4.2 13.5-9.2 1.7-.1 3.5-.7 4.2-2.5.2-.6.1-1.3-.2-1.7-.3-.4-.5-1.9-.8-2.4z"
        fill="#2496ED"
      />
      <circle cx="9.5" cy="19.5" r="0.8" fill="#FFFFFF" />
    </svg>
  ),
};

/**
 * 17 Core Technologies categorized into 4 clean engineering domains
 */
const TECH_CATEGORIES = [
  { id: 'all', label: 'All Technologies', count: 17 },
  { id: 'languages', label: 'Languages', count: 3 },
  { id: 'web', label: 'Web Development', count: 5 },
  { id: 'iot', label: 'IoT & Embedded', count: 3 },
  { id: 'tools', label: 'Database & Tools', count: 6 },
];

const TECHNOLOGIES = [
  // 1. Languages
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    categoryLabel: 'Languages',
    icon: TechIcons.Java,
    accentColor: '#EA2D2E',
    tag: 'OOP & Systems',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    categoryLabel: 'Languages',
    icon: TechIcons.JavaScript,
    accentColor: '#F7DF1E',
    tag: 'ES6+ & Async',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'languages',
    categoryLabel: 'Languages',
    icon: TechIcons.SQL,
    accentColor: '#2563EB',
    tag: 'Queries & Schemas',
  },

  // 2. Web Development
  {
    id: 'react',
    name: 'React.js',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.React,
    accentColor: '#0284C7',
    tag: 'UI & State',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.NodeJS,
    accentColor: '#339933',
    tag: 'Event Loop & I/O',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.ExpressJS,
    accentColor: '#2563EB',
    tag: 'REST APIs',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.HTML5,
    accentColor: '#E34F26',
    tag: 'Semantic DOM',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'web',
    categoryLabel: 'Web Development',
    icon: TechIcons.CSS,
    accentColor: '#1572B6',
    tag: 'Modern Layouts',
  },

  // 3. IoT & Embedded
  {
    id: 'esp32',
    name: 'ESP32',
    category: 'iot',
    categoryLabel: 'IoT & Embedded',
    icon: TechIcons.ESP32,
    accentColor: '#2563EB',
    tag: 'Wi-Fi & SoC',
  },
  {
    id: 'arduino',
    name: 'Arduino',
    category: 'iot',
    categoryLabel: 'IoT & Embedded',
    icon: TechIcons.Arduino,
    accentColor: '#00979C',
    tag: 'Hardware Circuits',
  },
  {
    id: 'arduino-ide',
    name: 'Arduino IDE',
    category: 'iot',
    categoryLabel: 'IoT & Embedded',
    icon: TechIcons.ArduinoIDE,
    accentColor: '#008184',
    tag: 'Embedded Firmware',
  },

  // 4. Database & Tools
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'tools',
    categoryLabel: 'Database & Tools',
    icon: TechIcons.PostgreSQL,
    accentColor: '#336791',
    tag: 'Relational DB',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'tools',
    categoryLabel: 'Database & Tools',
    icon: TechIcons.MySQL,
    accentColor: '#00758F',
    tag: 'Relational DB',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    categoryLabel: 'Database & Tools',
    icon: TechIcons.Git,
    accentColor: '#F05032',
    tag: 'Version Control',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    categoryLabel: 'Database & Tools',
    icon: TechIcons.GitHub,
    accentColor: '#111827',
    tag: 'CI/CD & Collab',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    categoryLabel: 'Database & Tools',
    icon: TechIcons.VSCode,
    accentColor: '#007ACC',
    tag: 'Primary Editor',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    categoryLabel: 'Database & Tools',
    icon: TechIcons.Docker,
    accentColor: '#2496ED',
    tag: 'Containers & Env',
  },
];

/**
 * Technology Constellation — Arctic Aurora Clean Edition
 */
export default function TechIWorkWith() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTech = activeCategory === 'all'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter((t) => t.category === activeCategory);

  return (
    <motion.section
      id="tech"
      aria-label="Tech I Work With"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1380px] mx-auto px-6 sm:px-12 py-12 sm:py-16 border-t border-[#DCE4EF] relative"
    >
      {/* Background Decorative Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E8F1FF]/70 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          {/* Subtle Decorative Tag matching portfolio design */}
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-[#2563EB]/20 bg-[#E8F1FF] text-[#2563EB] text-[11px] font-semibold tracking-wider uppercase">
            <Network className="w-3 h-3 text-[#2563EB]" />
            <span>The Aurora Tech Stack</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#64748B]">Core Tools &amp; Ecosystem</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] font-sans-editorial">
            Tech I Work With
          </h2>

          <p className="text-[14px] sm:text-[15px] text-[#4B5563] max-w-xl leading-relaxed">
            Tools and technologies I use to build software, web applications, and connected IoT systems.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white border border-[#DCE4EF] shadow-xs w-fit"
          role="tablist"
          aria-label="Filter technology categories"
        >
          {TECH_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3 py-1.5 rounded-lg text-[11.5px] font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTechCategory"
                    className="absolute inset-0 rounded-lg bg-[#2563EB] shadow-[0_2px_12px_rgba(37,99,235,0.35)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Responsive Compact Technology Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredTech.map((tech, idx) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.015 }}
                className="group relative rounded-xl p-3 sm:p-3.5 transition-all duration-200 ease-out flex flex-col justify-between cursor-pointer overflow-hidden bg-white border border-[#DCE4EF] hover:border-[#2563EB]/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(37,99,235,0.07)]"
              >
                {/* Top Section: Icon & Category Indicator */}
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    {/* Compact Technology Icon container */}
                    <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg border flex items-center justify-center p-1.5 transition-all duration-200 shadow-2xs bg-[#F8FAFC] border-[#E2E8F0] group-hover:scale-105 group-hover:bg-[#E8F1FF] group-hover:border-[#2563EB]/30 shrink-0">
                      <Icon />
                    </div>

                    {/* Category Indicator Badge */}
                    <span className="text-[9.5px] sm:text-[10px] font-medium text-[#64748B] group-hover:text-[#2563EB] transition-colors duration-200 px-1.5 py-0.5 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] tracking-tight truncate max-w-[95px]">
                      {tech.categoryLabel}
                    </span>
                  </div>

                  {/* Technology Name */}
                  <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors duration-200 tracking-tight leading-tight">
                    {tech.name}
                  </h3>
                </div>

                {/* Bottom Section: Subtle Subtitle/Descriptor Tag */}
                <div className="pt-1.5 border-t border-[#F1F5F9] flex items-center justify-between mt-2 text-[10.5px] sm:text-[11px] text-[#64748B] group-hover:text-[#111827] transition-colors leading-none">
                  <span className="truncate">{tech.tag}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1] group-hover:bg-[#2563EB] transition-colors duration-200 shrink-0 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Engineering Footer Summary Pill */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 sm:mt-7 flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 rounded-xl bg-white border border-[#DCE4EF] shadow-xs text-[12px] text-[#64748B]"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
          <span className="text-[#111827] font-semibold">17 Verified Technologies</span>
          <span>across web development, embedded systems, and database architecture</span>
        </div>
        <div className="flex items-center gap-3 text-[11.5px]">
          <span className="text-[#2563EB] font-medium">Production-tested</span>
        </div>
      </motion.div>
    </motion.section>
  );
}
