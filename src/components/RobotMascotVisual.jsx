import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

/**
 * RobotMascotVisual — ARCTIC BOT
 *
 * Premium cute Pixar-style 3D robot mascot built entirely from Three.js geometry.
 * Matches reference image exactly:
 *  - Glossy white dome/egg head
 *  - Large curved black glass visor
 *  - Two large crescent cyan LED eyes + small cheerful cyan smile
 *  - Purple double-ring ear pods
 *  - Twin antennas with purple sphere tips
 *  - Egg torso, violet waist band, circular cyan chest reactor
 *  - Right arm raised in peace-sign (V gesture), articulated black joints
 *  - Short stumpy legs, rounded white boots, standing on ground
 *  - Contact shadow disc beneath both feet
 *
 * Animations:
 *  - Gentle breathing float
 *  - Head + eye cursor tracking
 *  - Eye blinking
 *  - Right hand wave
 *  - Chest reactor pulse
 *  - Antenna tips glow pulse
 */
export default function RobotMascotVisual() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ─── SCENE & RENDERER ───────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const width  = container.clientWidth  || 380;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 6.0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping    = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled  = true;
    renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // ─── MATERIALS ──────────────────────────────────────────────────────────
    const whiteMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0f4fa,
      roughness: 0.08,
      metalness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });
    const lightGreyMat = new THREE.MeshPhysicalMaterial({
      color: 0xe2e8f0,
      roughness: 0.12,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.08,
    });
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x060a14,
      roughness: 0.0,
      metalness: 0.0,
      transmission: 0.15,
      ior: 1.5,
      reflectivity: 1.0,
    });
    const violetMat = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.3, metalness: 0.6, emissive: 0x4c1d95, emissiveIntensity: 0.4 });
    const darkJointMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.5, metalness: 0.7 });
    const cyanEmissiveMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const cyanGlowMat  = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending });
    const violetGlowMat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
    const smileMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const fingerMat = new THREE.MeshPhysicalMaterial({ color: 0xdde6f0, roughness: 0.1, metalness: 0.15, clearcoat: 0.9 });

    // ─── LIGHTING ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
    keyLight.position.set(3.5, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xcce8ff, 0.6);
    fillLight.position.set(-2.5, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    const reactorLight = new THREE.PointLight(0x00e5ff, 1.5, 3.5);
    reactorLight.position.set(0, -0.3, 1.0);
    scene.add(reactorLight);

    const violetLight = new THREE.PointLight(0x9333ea, 0.6, 2.0);
    violetLight.position.set(0, 0.5, 1.0);
    scene.add(violetLight);

    // ─── HELPERS ─────────────────────────────────────────────────────────────
    const addMesh = (geo, mat, x, y, z, parent, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      m.castShadow    = true;
      m.receiveShadow = true;
      parent.add(m);
      return m;
    };

    const makeCylinder = (rt, rb, h, seg = 32) => new THREE.CylinderGeometry(rt, rb, h, seg);
    const makeSphere   = (r, ws = 32, hs = 24) => new THREE.SphereGeometry(r, ws, hs);
    const makeTorus    = (r, t, rs = 20, ts = 60) => new THREE.TorusGeometry(r, t, rs, ts);

    // ─── SCENE GROUPS ────────────────────────────────────────────────────────
    const robotRoot  = new THREE.Group();
    scene.add(robotRoot);

    // Ground Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = shadowCanvas.height = 128;
    const sc = shadowCanvas.getContext('2d');
    const sg = sc.createRadialGradient(64, 64, 0, 64, 64, 56);
    sg.addColorStop(0,   'rgba(10,15,30,0.5)');
    sg.addColorStop(0.5, 'rgba(37,99,235,0.18)');
    sg.addColorStop(1,   'rgba(0,0,0,0)');
    sc.fillStyle = sg;
    sc.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.8, depthWrite: false });
    const contactShadow = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.1), shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -2.02;
    scene.add(contactShadow);

    // floatGroup — the whole character breathes here
    const floatGroup = new THREE.Group();
    floatGroup.position.y = 0.0;
    robotRoot.add(floatGroup);

    // headGroup — cursor tracking applied here
    const headGroup = new THREE.Group();
    floatGroup.add(headGroup);

    // ─── 1. LEGS & FEET ──────────────────────────────────────────────────────
    // Thighs
    const lThigh = addMesh(makeCylinder(0.19, 0.17, 0.42, 20), whiteMat,  0.22, -1.42, 0, floatGroup);
    const rThigh = addMesh(makeCylinder(0.19, 0.17, 0.42, 20), whiteMat, -0.22, -1.42, 0, floatGroup);

    // Knee joints (dark)
    addMesh(makeCylinder(0.18, 0.18, 0.1, 20), darkJointMat,  0.22, -1.65, 0, floatGroup);
    addMesh(makeCylinder(0.18, 0.18, 0.1, 20), darkJointMat, -0.22, -1.65, 0, floatGroup);

    // Shins
    addMesh(makeCylinder(0.17, 0.19, 0.38, 20), whiteMat,  0.22, -1.86, 0, floatGroup);
    addMesh(makeCylinder(0.17, 0.19, 0.38, 20), whiteMat, -0.22, -1.86, 0, floatGroup);

    // Boots (rounded base)
    const bootGeo = new THREE.SphereGeometry(0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.6);
    addMesh(bootGeo, whiteMat,  0.22, -2.0, 0.07, floatGroup);
    addMesh(bootGeo, whiteMat, -0.22, -2.0, 0.07, floatGroup);

    // Boot dark soles
    addMesh(new THREE.CylinderGeometry(0.21, 0.21, 0.04, 24), darkJointMat,  0.22, -2.0, 0, floatGroup);
    addMesh(new THREE.CylinderGeometry(0.21, 0.21, 0.04, 24), darkJointMat, -0.22, -2.0, 0, floatGroup);

    // ─── 2. TORSO ────────────────────────────────────────────────────────────
    // Main egg body — slightly wider sphere, flattened on top
    const torsoGeo = new THREE.SphereGeometry(0.60, 40, 32);
    const torsoMesh = addMesh(torsoGeo, whiteMat, 0, -0.72, 0, floatGroup);
    torsoMesh.scale.set(1.0, 1.1, 0.88);

    // Violet waist accent band
    const waistBand = addMesh(makeTorus(0.57, 0.045, 14, 50), violetMat, 0, -0.98, 0, floatGroup, Math.PI / 2);

    // Violet shoulder collar ring
    const collarRing = addMesh(makeTorus(0.44, 0.06, 14, 50), violetMat, 0, -0.22, 0, floatGroup, Math.PI / 2);

    // Chest Reactor
    const reactorRing = addMesh(makeTorus(0.155, 0.045, 14, 40), violetMat, 0, -0.68, 0.56, floatGroup, Math.PI / 2);
    const reactorCore = addMesh(new THREE.CircleGeometry(0.108, 32), cyanEmissiveMat, 0, -0.68, 0.59, floatGroup);
    const reactorInner = addMesh(new THREE.CircleGeometry(0.072, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }), 0, -0.68, 0.605, floatGroup);
    // Reactor glow halo
    const reactorHalo = addMesh(new THREE.CircleGeometry(0.22, 32), cyanGlowMat, 0, -0.68, 0.55, floatGroup);

    // ─── 3. NECK ─────────────────────────────────────────────────────────────
    addMesh(makeCylinder(0.165, 0.185, 0.18, 24), darkJointMat, 0, -0.14, 0, floatGroup);

    // ─── 4. HEAD ─────────────────────────────────────────────────────────────
    headGroup.position.set(0, 0.42, 0);

    // Main dome (sphere, slightly wider than tall)
    const domeGeo = new THREE.SphereGeometry(0.60, 48, 36);
    const domeMesh = new THREE.Mesh(domeGeo, whiteMat);
    domeMesh.scale.set(1.08, 1.0, 0.96);
    domeMesh.castShadow = true;
    headGroup.add(domeMesh);

    // Visor — large inset rounded rectangle shape via squished sphere
    const visorGeo = new THREE.SphereGeometry(0.52, 48, 36);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.scale.set(0.98, 0.78, 0.38);
    visorMesh.position.set(0, -0.025, 0.28);
    headGroup.add(visorMesh);

    // Visor dark inner fill (screen)
    const visorScreen = new THREE.Mesh(
      new THREE.SphereGeometry(0.50, 48, 36),
      new THREE.MeshStandardMaterial({ color: 0x060a18, roughness: 0.0, metalness: 0.0 })
    );
    visorScreen.scale.set(0.90, 0.68, 0.30);
    visorScreen.position.set(0, -0.02, 0.29);
    headGroup.add(visorScreen);

    // ─── EYES ─────────────────────────────────────────────────────────────────
    // Eye group for parallax / blink
    const faceRig = new THREE.Group();
    faceRig.position.set(0, 0.02, 0.44);
    headGroup.add(faceRig);

    // Helper: build one crescent eye from two overlapping spheres
    const makeEye = (xPos) => {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(xPos, 0.055, 0);

      // Outer bright cyan arc (torus cross-section approximation with a large torus)
      const arcGeo = new THREE.TorusGeometry(0.115, 0.045, 12, 40, Math.PI * 1.3);
      const arcMesh = new THREE.Mesh(arcGeo, new THREE.MeshBasicMaterial({ color: 0x00e5ff }));
      arcMesh.rotation.set(0, 0, Math.PI * 0.65 * (xPos > 0 ? 1 : -1) + Math.PI);
      eyeGroup.add(arcMesh);

      // Glow halo behind
      const haloGeo = new THREE.TorusGeometry(0.115, 0.075, 8, 40, Math.PI * 1.3);
      const haloMesh = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({
        color: 0x00e5ff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending
      }));
      haloMesh.rotation.copy(arcMesh.rotation);
      haloMesh.position.z = -0.01;
      eyeGroup.add(haloMesh);

      // Filled bright disc in the center to give "glowing LED" look
      const pupilGeo = new THREE.CircleGeometry(0.072, 24);
      const pupilMesh = new THREE.Mesh(pupilGeo, new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.5 }));
      pupilMesh.position.z = 0.01;
      eyeGroup.add(pupilMesh);

      faceRig.add(eyeGroup);
      return eyeGroup;
    };

    const leftEyeGroup  = makeEye( 0.195);
    const rightEyeGroup = makeEye(-0.195);

    // Smile — small arc torus at bottom of visor
    const smileGeo = new THREE.TorusGeometry(0.075, 0.022, 10, 30, Math.PI * 0.9);
    const smileMesh = new THREE.Mesh(smileGeo, smileMat);
    smileMesh.position.set(0, -0.11, 0);
    smileMesh.rotation.z = Math.PI * 0.95;
    faceRig.add(smileMesh);

    // ─── EAR PODS ─────────────────────────────────────────────────────────────
    const earPodGeo = new THREE.SphereGeometry(0.14, 24, 18);
    const lEar = new THREE.Mesh(earPodGeo, lightGreyMat);
    lEar.position.set(0.60, 0.0, 0); headGroup.add(lEar);
    const rEar = new THREE.Mesh(earPodGeo, lightGreyMat);
    rEar.position.set(-0.60, 0.0, 0); headGroup.add(rEar);

    // Ear pod violet double rings
    const makeEarRings = (xSign) => {
      const r1 = new THREE.Mesh(makeTorus(0.11, 0.025, 10, 30), violetMat);
      r1.position.set(xSign * 0.63, 0.015, 0.01);
      r1.rotation.y = Math.PI / 2;
      headGroup.add(r1);
      const r2 = new THREE.Mesh(makeTorus(0.08, 0.018, 10, 30), new THREE.MeshStandardMaterial({
        color: 0x9333ea, roughness: 0.3, metalness: 0.5, emissive: 0x7c3aed, emissiveIntensity: 0.5
      }));
      r2.position.set(xSign * 0.655, 0.015, 0.01);
      r2.rotation.y = Math.PI / 2;
      headGroup.add(r2);
    };
    makeEarRings(1);
    makeEarRings(-1);

    // ─── ANTENNAS ─────────────────────────────────────────────────────────────
    const makeAntenna = (xPos, zRot) => {
      const stickGeo = makeCylinder(0.018, 0.022, 0.38, 10);
      const stickMesh = new THREE.Mesh(stickGeo, lightGreyMat);
      stickMesh.position.set(xPos, 0.76, 0);
      stickMesh.rotation.z = zRot;
      headGroup.add(stickMesh);

      const ballGeo = makeSphere(0.065);
      const ballMesh = new THREE.Mesh(ballGeo, violetMat);
      ballMesh.position.set(
        xPos + Math.sin(zRot) * -0.19,
        0.76 + 0.19,
        0
      );
      headGroup.add(ballMesh);

      // Glow around tip
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending })
      );
      glow.position.copy(ballMesh.position);
      headGroup.add(glow);

      return { glow, ball: ballMesh };
    };

    const lAntenna = makeAntenna( 0.26, -0.28);
    const rAntenna = makeAntenna(-0.26,  0.28);

    // ─── 5. ARMS ──────────────────────────────────────────────────────────────
    // LEFT arm — hanging down at side (robot's left = viewer's right)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.68, -0.28, 0);
    floatGroup.add(leftArmGroup);

    // Upper arm
    const lUpperArm = addMesh(makeCylinder(0.13, 0.11, 0.42, 20), whiteMat, 0, -0.21, 0, leftArmGroup);
    // Violet band
    addMesh(makeTorus(0.115, 0.03, 10, 30), violetMat, 0, -0.14, 0, leftArmGroup, Math.PI / 2);
    // Elbow joint (dark)
    const lElbow = addMesh(makeCylinder(0.115, 0.115, 0.1, 20), darkJointMat, 0, -0.44, 0, leftArmGroup);
    // Forearm
    const lForearm = addMesh(makeCylinder(0.11, 0.095, 0.38, 20), whiteMat, 0, -0.65, 0, leftArmGroup);
    addMesh(makeTorus(0.1, 0.028, 10, 30), violetMat, 0, -0.6, 0, leftArmGroup, Math.PI / 2);
    // Wrist (dark)
    addMesh(makeCylinder(0.1, 0.1, 0.08, 20), darkJointMat, 0, -0.86, 0, leftArmGroup);

    // Left hand — relaxed, fingers pointing slightly down
    const lHandGroup = new THREE.Group();
    lHandGroup.position.set(-0.68, -1.16, 0);
    floatGroup.add(lHandGroup);
    lHandGroup.rotation.z = 0.12;
    // Palm
    addMesh(new THREE.SphereGeometry(0.11, 20, 16), fingerMat, 0, 0, 0, lHandGroup);
    // 4 fingers
    [-0.065, -0.022, 0.022, 0.065].forEach((fx, fi) => {
      const len = fi === 0 || fi === 3 ? 0.11 : 0.13;
      addMesh(makeCylinder(0.028, 0.022, len, 10), fingerMat, fx, -0.1 - len * 0.5, 0.045, lHandGroup);
      // Finger tip knuckle
      addMesh(new THREE.SphereGeometry(0.025, 10, 8), fingerMat, fx, -0.1 - len, 0.045, lHandGroup);
      // Dark joint band
      addMesh(makeCylinder(0.03, 0.03, 0.025, 10), darkJointMat, fx, -0.08, 0.045, lHandGroup);
    });
    // Thumb
    addMesh(makeCylinder(0.028, 0.022, 0.09, 10), fingerMat, 0.1, -0.055, 0.025, lHandGroup, 0, 0, Math.PI * 0.42);
    addMesh(new THREE.SphereGeometry(0.024, 10, 8), fingerMat, 0.14, -0.025, 0.025, lHandGroup);

    // RIGHT arm — raised in peace sign (robot's right = viewer's left)
    const rightArmRoot = new THREE.Group();
    rightArmRoot.position.set(0.68, -0.18, 0);
    floatGroup.add(rightArmRoot);

    // waveGroup — this is what we rotate for the wave animation
    const waveGroup = new THREE.Group();
    waveGroup.position.set(0, 0, 0);
    rightArmRoot.add(waveGroup);

    // Upper arm angled upward
    const rUpperArm = addMesh(makeCylinder(0.13, 0.11, 0.44, 20), whiteMat, 0, 0, 0, waveGroup);
    rUpperArm.rotation.z = -1.0; // tilted outward
    rUpperArm.position.set(0.14, 0.18, 0);
    addMesh(makeTorus(0.115, 0.03, 10, 30), violetMat, 0.14, 0.18, 0, waveGroup, Math.PI / 2);

    // Elbow joint
    addMesh(makeCylinder(0.115, 0.115, 0.1, 20), darkJointMat, 0.26, 0.4, 0, waveGroup);

    // Forearm (pointing upward)
    addMesh(makeCylinder(0.11, 0.095, 0.44, 20), whiteMat, 0.26, 0.64, 0, waveGroup);
    addMesh(makeTorus(0.1, 0.028, 10, 30), violetMat, 0.26, 0.6, 0, waveGroup, Math.PI / 2);

    // Wrist joint
    addMesh(makeCylinder(0.1, 0.1, 0.08, 20), darkJointMat, 0.26, 0.9, 0, waveGroup);

    // Right hand — Peace / V sign
    const rHandGroup = new THREE.Group();
    rHandGroup.position.set(0.26, 1.08, 0);
    waveGroup.add(rHandGroup);

    // Palm
    addMesh(new THREE.SphereGeometry(0.115, 20, 16), fingerMat, 0, 0, 0, rHandGroup);
    addMesh(new THREE.SphereGeometry(0.08, 16, 12), darkJointMat, 0, 0, 0, rHandGroup); // dark wrist cap

    // Index finger (up)
    addMesh(makeCylinder(0.03, 0.025, 0.14, 10), fingerMat, -0.045, 0.14, 0.03, rHandGroup);
    addMesh(new THREE.SphereGeometry(0.027, 10, 8), fingerMat, -0.045, 0.21, 0.03, rHandGroup);
    addMesh(makeCylinder(0.028, 0.022, 0.12, 10), fingerMat, -0.045, 0.32, 0.03, rHandGroup);
    addMesh(new THREE.SphereGeometry(0.025, 10, 8), fingerMat, -0.045, 0.39, 0.03, rHandGroup);
    addMesh(makeCylinder(0.025, 0.02, 0.09, 10), fingerMat, -0.045, 0.47, 0.03, rHandGroup);
    addMesh(new THREE.SphereGeometry(0.022, 10, 8), fingerMat, -0.045, 0.52, 0.03, rHandGroup);
    // Dark knuckle bands on index
    addMesh(makeCylinder(0.032, 0.032, 0.022, 10), darkJointMat, -0.045, 0.085, 0.03, rHandGroup);
    addMesh(makeCylinder(0.03, 0.03, 0.022, 10), darkJointMat, -0.045, 0.265, 0.03, rHandGroup);

    // Middle finger (up)
    addMesh(makeCylinder(0.03, 0.025, 0.14, 10), fingerMat, 0.045, 0.145, 0.03, rHandGroup);
    addMesh(new THREE.SphereGeometry(0.027, 10, 8), fingerMat, 0.045, 0.215, 0.03, rHandGroup);
    addMesh(makeCylinder(0.028, 0.022, 0.12, 10), fingerMat, 0.045, 0.325, 0.03, rHandGroup);
    addMesh(new THREE.SphereGeometry(0.025, 10, 8), fingerMat, 0.045, 0.395, 0.03, rHandGroup);
    addMesh(makeCylinder(0.025, 0.02, 0.09, 10), fingerMat, 0.045, 0.47, 0.03, rHandGroup);
    addMesh(new THREE.SphereGeometry(0.022, 10, 8), fingerMat, 0.045, 0.525, 0.03, rHandGroup);
    addMesh(makeCylinder(0.032, 0.032, 0.022, 10), darkJointMat, 0.045, 0.085, 0.03, rHandGroup);
    addMesh(makeCylinder(0.03, 0.03, 0.022, 10), darkJointMat, 0.045, 0.27, 0.03, rHandGroup);

    // Ring finger (curled down — no tip, just stub)
    const ringGeo = new THREE.TorusGeometry(0.065, 0.025, 10, 20, Math.PI * 0.8);
    const ringMesh = new THREE.Mesh(ringGeo, fingerMat);
    ringMesh.position.set(0.13, 0.085, 0.03);
    ringMesh.rotation.set(-0.3, 0, Math.PI * 1.0);
    rHandGroup.add(ringMesh);

    // Pinky (curled)
    const pinkyGeo = new THREE.TorusGeometry(0.05, 0.022, 10, 20, Math.PI * 0.75);
    const pinkyMesh = new THREE.Mesh(pinkyGeo, fingerMat);
    pinkyMesh.position.set(0.185, 0.07, 0.03);
    pinkyMesh.rotation.set(-0.3, 0, Math.PI * 1.1);
    rHandGroup.add(pinkyMesh);

    // Thumb (curled to side)
    addMesh(makeCylinder(0.03, 0.024, 0.1, 10), fingerMat, -0.1, 0.07, 0.04, rHandGroup, 0, 0, Math.PI * 0.42);
    addMesh(new THREE.SphereGeometry(0.026, 10, 8), fingerMat, -0.14, 0.095, 0.04, rHandGroup);

    // ─── BLINK PLANE ─────────────────────────────────────────────────────────
    // Invisible planes that scale to simulate blinking (layered over eyes)
    const blinkMatL = new THREE.MeshBasicMaterial({ color: 0x060a18, transparent: true, opacity: 0.0 });
    const blinkL = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.22), blinkMatL);
    blinkL.position.set(0.195, 0.055, 0.001);
    faceRig.add(blinkL);

    const blinkMatR = new THREE.MeshBasicMaterial({ color: 0x060a18, transparent: true, opacity: 0.0 });
    const blinkR = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.22), blinkMatR);
    blinkR.position.set(-0.195, 0.055, 0.001);
    faceRig.add(blinkR);

    // ─── ANIMATION STATE ──────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const clock = new THREE.Clock();
    let reqId = null;
    let blinkTimer = 0;
    let nextBlink  = 2.8 + Math.random() * 2.0;
    let isBlinking = false;
    let blinkProg  = 0;
    let wavePhase  = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.ty = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ─── ANIMATE ──────────────────────────────────────────────────────────────
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t  = clock.getElapsedTime();
      const dt = clock.getDelta();

      // Smooth mouse lerp
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;

      if (!prefersReducedMotion) {
        // 1. Breathing float — whole character
        const breathY = Math.sin(t * 1.55) * 0.055;
        floatGroup.position.y = breathY;

        // Shadow sync
        contactShadow.scale.set(1 - breathY * 0.4, 1 - breathY * 0.4, 1);
        shadowMat.opacity = 0.72 - breathY * 0.25;

        // 2. Head cursor tracking
        headGroup.rotation.y = mouse.x * 0.26;
        headGroup.rotation.x = -mouse.y * 0.17;
        headGroup.rotation.z = mouse.x * -0.05 + Math.sin(t * 1.1) * 0.012;

        // 3. Eye parallax
        faceRig.position.x = mouse.x * 0.028;
        faceRig.position.y = 0.02 + mouse.y * 0.022;

        // 4. Blinking
        blinkTimer += dt;
        if (!isBlinking && blinkTimer > nextBlink) {
          isBlinking = true; blinkTimer = 0; blinkProg = 0;
          nextBlink = 2.4 + Math.random() * 2.8;
        }
        if (isBlinking) {
          blinkProg += dt * 11;
          const cover = Math.sin(blinkProg * Math.PI);
          blinkMatL.opacity = Math.min(1, cover * 1.2);
          blinkMatR.opacity = Math.min(1, cover * 1.2);
          if (blinkProg >= 1) { isBlinking = false; blinkMatL.opacity = 0; blinkMatR.opacity = 0; }
        }

        // 5. Chest reactor pulse
        const pulse = 0.6 + Math.sin(t * 3.0) * 0.4;
        reactorHalo.material.opacity = pulse * 0.7;
        reactorLight.intensity = 1.2 * pulse;
        reactorInner.material.opacity = 0.5 + pulse * 0.5;

        // 6. Antenna glow pulse
        const aPulse = 0.5 + Math.cos(t * 2.4) * 0.35;
        lAntenna.glow.material.opacity = aPulse;
        rAntenna.glow.material.opacity = aPulse;
        // Slight antenna wobble
        lAntenna.ball.position.y = headGroup.position.y + 0.42 + 0.195 + Math.sin(t * 2.2) * 0.014;
        rAntenna.ball.position.y = headGroup.position.y + 0.42 + 0.195 + Math.sin(t * 2.2 + 0.6) * 0.014;
        lAntenna.glow.position.y = lAntenna.ball.position.y;
        rAntenna.glow.position.y = rAntenna.ball.position.y;

        // 7. Wave animation — right hand
        wavePhase += dt;
        const waveAngle = Math.sin(wavePhase * 2.8) * 0.22;
        waveGroup.rotation.z = waveAngle;
        waveGroup.rotation.x = Math.sin(wavePhase * 1.4) * 0.08;

        // 8. Subtle torso sway
        floatGroup.rotation.y = mouse.x * 0.08 + Math.sin(t * 0.9) * 0.015;
        floatGroup.rotation.z = Math.sin(t * 1.1) * 0.012;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─── CLEANUP ─────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (reqId) cancelAnimationFrame(reqId);
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full max-w-[390px] h-[400px] sm:h-[480px] flex items-center justify-center select-none pointer-events-auto mx-auto">
      {/* Aurora ambient glow backdrop */}
      <div
        aria-hidden="true"
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#38BDF8]/12 via-[#8B5CF6]/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* System Status Badge */}
      <div className="absolute top-2 right-0 sm:right-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#D5DFEB]/80 shadow-sm text-[11px] font-semibold text-[#0F172A]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
          </span>
          <span>ARCTIC BOT Online</span>
        </div>
      </div>

      {/* 3D WebGL Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full"
        aria-label="ARCTIC BOT — 3D animated robot mascot"
        role="img"
      />
    </div>
  );
}
