# Rajat Behera — Engineering Portfolio & Identity System

> **Full-Stack Software Engineer • Distributed Systems & IoT**  
> Building scalable web architectures, distributed cloud backends, and real-time edge telemetry systems.

---

## 🌌 Overview

This repository contains the source code for the personal identity and engineering portfolio of **Rajat Behera**. Built as an immersive, high-performance web experience, it merges cutting-edge creative development with solid architectural principles.

### 🌟 Key Highlights

- **Arctic Aurora Visual System**: Clean, high-contrast aesthetic featuring subtle glassmorphism, dynamic lighting gradients, and sleek dark accents.
- **Unified Liquid Chrome × Aurora Buttons**: Custom dynamic button system featuring iridescent borders, flowing multi-stop gradient animations, and spring-physics interactions.
- **Dynamic Time & Environment Engine**: Real-time contextual greeting and environmental state calculation based on local time.
- **Kinetic GSAP & Lenis Smooth Scroll**: Inertia-based smooth scrolling coordinated with GSAP `ScrollTrigger` for timeline scrub animations and milestone reveals.
- **Three.js 3D Viewports**: Hardware-accelerated wireframe geometry canvases and reactive 3D rendering.
- **Case Studies & Telemetry Showcase**: In-depth breakdowns of real-world distributed architectures, including ResQnet and Smart Parking IoT networks.
- **Direct EmailJS Integration**: Functional contact portal with client-side validation and toast notifications.

---

## 🛠️ Tech Stack & Architecture

### **Core Frontend**
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)

### **Creative Development & Motion**
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Kinetic Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Scroll Synchronization**: [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/scrolltrigger/)
- **Smooth Inertia**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

### **Integrations & Services**
- **Form Delivery**: [@emailjs/browser](https://www.emailjs.com/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📂 Project Structure

```bash
├── public/                 # Static assets, icons, and 3D models
├── src/
│   ├── components/         # Modular UI & interactive system components
│   │   ├── About.jsx       # Narrative, trajectory, and core qualities
│   │   ├── Achievements.jsx# Milestones, certifications, and timeline
│   │   ├── Contact.jsx     # Contact gateway with EmailJS
│   │   ├── DigitalTimeConsole.jsx # Real-time telemetry console
│   │   ├── Hero.jsx        # Landing hero with interactive dynamic visuals
│   │   ├── Journey.jsx     # Interactive GSAP train route & timeline
│   │   ├── LiquidButton.jsx# Signature Liquid Chrome button system
│   │   ├── Projects.jsx    # Engineering case studies & telemetry cards
│   │   └── ...
│   ├── hooks/              # Custom React hooks (e.g. useTimeEnvironment)
│   ├── pages/              # Routed views (e.g. ProjectsPage)
│   ├── App.jsx             # Top-level routing and suspense boundaries
│   ├── PortfolioLanding.jsx# Main single-page interactive experience
│   └── main.jsx            # Application entry point
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or `pnpm` / `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rajatbehera05/MyPortfolio.git
   cd MyPortfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment template:
   ```bash
   cp .env.example .env
   ```
   Add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

6. **Lint Codebase**:
   ```bash
   npm run lint
   ```

---

## 📜 License

Created and maintained by **[Rajat Behera](https://github.com/rajatbehera05)**. All rights reserved.
