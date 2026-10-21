import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildOrganicSalamanderDragon } from './SalamanderDragonModel';

/**
 * Creates a pinpoint ember spark texture.
 */
function createSparkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 240, 1)');
  grad.addColorStop(0.25, 'rgba(255, 200, 60, 0.95)');
  grad.addColorStop(0.6, 'rgba(235, 70, 15, 0.45)');
  grad.addColorStop(1, 'rgba(120, 10, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Custom Volumetric Flame Stream Shader
 * Strictly horizontal fire stream targeting the exact DOM button centerline:
 * - Incandescent white-yellow core
 * - Layered fiery orange mantle
 * - Restrained deep crimson outer flame tongues
 * - High-speed procedural horizontal turbulence
 */
const FlameShader = {
  uniforms: {
    uTime: { value: 0 },
    uIntensity: { value: 0 },
    uDirection: { value: 1.0 }, // +1 for left-to-right, -1 for right-to-left
  },
  vertexShader: `
    uniform float uTime;
    uniform float uIntensity;
    uniform float uDirection;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vTurbulence;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // uv.x represents length from mouth nozzle (0.0) to button edge (1.0)
      // Taper radius: starts tight at mouth (0.14) and blooms slightly to 0.40 at button periphery
      float radiusScale = mix(0.14, 0.40, uv.x);
      pos.y *= radiusScale;
      pos.z *= radiusScale;

      // Fluid horizontal turbulence strictly centered horizontally
      float wave = sin(uv.x * 18.0 - uTime * 16.0) * cos(uv.x * 12.0 + uTime * 10.0);
      float heatDraft = sin(uv.x * 14.0 - uTime * 14.0) * 0.018 * uv.x;

      pos.y += wave * 0.035 * uv.x + heatDraft;
      pos.z += cos(uv.x * 16.0 - uTime * 12.0) * 0.035 * uv.x;

      vTurbulence = wave;
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uIntensity;
    uniform float uDirection;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vTurbulence;

    void main() {
      if (uIntensity <= 0.005) discard;

      // Distance from stream horizontal centerline
      float rDist = length(vPosition.yz) / 0.40;

      // High-speed fire fluid ripples
      float flow = sin(vUv.x * 24.0 - uTime * 20.0 + vTurbulence * 2.5);
      float licking = sin(vUv.x * 36.0 - uTime * 28.0) * 0.12;
      float d = clamp(rDist + licking, 0.0, 1.25);

      // 3-tier Fire Color Gradient:
      // White-hot core -> Radiant fire orange -> Deep crimson vermillion
      vec3 coreCol = vec3(1.0, 0.98, 0.85);
      vec3 midCol  = vec3(0.98, 0.44, 0.06);
      vec3 edgeCol = vec3(0.85, 0.10, 0.04);

      vec3 fireColor;
      if (d < 0.32) {
        fireColor = mix(coreCol, midCol, d / 0.32);
      } else {
        fireColor = mix(midCol, edgeCol, clamp((d - 0.32) / 0.68, 0.0, 1.0));
      }

      // Smooth envelope along stream length:
      // Tapers in at mouth nozzle, stays solid, soft falloff right at button rim
      float lengthAlpha = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.84, vUv.x);
      float radialAlpha = smoothstep(1.0, 0.22, d);
      float flicker = 0.88 + 0.12 * sin(uTime * 32.0 + vUv.x * 12.0);

      float finalAlpha = lengthAlpha * radialAlpha * flicker * uIntensity;
      if (finalAlpha <= 0.005) discard;

      gl_FragColor = vec4(fireColor * 1.38, finalAlpha * 0.95);
    }
  `,
};

/**
 * Creates a continuous horizontal flame stream mesh.
 */
function createFlameStreamMesh(isLeftToRight = true) {
  const group = new THREE.Group();

  // Cylinder oriented horizontally along X from 0 to 1
  const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 28, 48, true);
  cylGeo.rotateZ(-Math.PI / 2);
  cylGeo.translate(0.5, 0, 0); // Origin at x=0, extending along +X to 1

  const mat = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(FlameShader.uniforms),
    vertexShader: FlameShader.vertexShader,
    fragmentShader: FlameShader.fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  mat.uniforms.uDirection.value = isLeftToRight ? 1.0 : -1.0;

  const mesh = new THREE.Mesh(cylGeo, mat);
  group.add(mesh);

  // Concentrated inner plasma core
  const coreMat = mat.clone();
  coreMat.uniforms.uIntensity.value = 0;
  const innerMesh = new THREE.Mesh(cylGeo, coreMat);
  innerMesh.scale.set(1.0, 0.55, 0.55);
  group.add(innerMesh);

  return { group, mat, coreMat };
}

/**
 * SalamanderFireCanvas
 * Accurately measures the actual DOM button bounding rectangle and converts it into
 * 3D world space so the fire streams aim directly at the button's vertical center.
 */
export default function SalamanderFireCanvas({ buttonRef, onFireStateChange }) {
  const containerRef = useRef(null);
  const onFireStateChangeRef = useRef(onFireStateChange);
  onFireStateChangeRef.current = onFireStateChange;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.0, 11.2);
    camera.lookAt(0, 0.0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.25);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(3, 7, 6);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    rimLight.position.set(-4, 4, -4);
    scene.add(rimLight);

    // Dynamic button edge lights
    const leftButtonLight = new THREE.PointLight(0xff7700, 0.1, 4.0);
    leftButtonLight.position.set(-1.3, 0.0, 0.3);
    scene.add(leftButtonLight);

    const rightButtonLight = new THREE.PointLight(0xff7700, 0.1, 4.0);
    rightButtonLight.position.set(1.3, 0.0, 0.3);
    scene.add(rightButtonLight);

    // --- High-Quality Organic Dragons (Firmly Grounded Standing Pose) ---
    // Left Dragon: Positioned at far left, facing right toward button
    const leftDragon = buildOrganicSalamanderDragon(false);
    leftDragon.root.position.set(-5.4, -1.2, 0);
    leftDragon.root.rotation.y = 0.05;
    scene.add(leftDragon.root);

    // Right Dragon: Positioned at far right, facing left toward button
    const rightDragon = buildOrganicSalamanderDragon(true);
    rightDragon.root.position.set(5.4, -1.2, 0);
    rightDragon.root.rotation.y = -0.05;
    scene.add(rightDragon.root);

    // Completely clamp all legs stationary (no walking/running)
    if (leftDragon.forelegs) leftDragon.forelegs.forEach((l) => l.rotation.set(0, 0, 0));
    if (leftDragon.rearLegs) leftDragon.rearLegs.forEach((l) => l.rotation.set(0, 0, 0));
    if (rightDragon.forelegs) rightDragon.forelegs.forEach((l) => l.rotation.set(0, 0, 0));
    if (rightDragon.rearLegs) rightDragon.rearLegs.forEach((l) => l.rotation.set(0, 0, 0));

    // --- Continuous Straight Horizontal Flame Streams ---
    const leftStream = createFlameStreamMesh(true);
    scene.add(leftStream.group);

    const rightStream = createFlameStreamMesh(false);
    scene.add(rightStream.group);

    // --- Horizontal Ember Sparks ---
    const sparkTexture = createSparkTexture();
    const MAX_SPARKS = prefersReducedMotion ? 0 : 80;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(MAX_SPARKS * 3);
    const sparkColors = new Float32Array(MAX_SPARKS * 3);
    const sparkSizes = new Float32Array(MAX_SPARKS);

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));
    sparkGeo.setAttribute('size', new THREE.BufferAttribute(sparkSizes, 1));

    const sparkMat = new THREE.PointsMaterial({
      size: 0.32,
      map: sparkTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
    });

    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkPoints);

    const sparks = [];
    for (let i = 0; i < MAX_SPARKS; i++) {
      sparks.push({
        active: false,
        x: 0, y: 0, z: 0,
        vx: 0,
        yOffset: 0,
        life: 0, maxLife: 0.3,
        baseSize: 0.22,
        isLeftToRight: true,
        targetX: 0,
      });
      sparkSizes[i] = 0;
    }

    const spawnHorizontalSpark = (startX, targetY, targetX, isLeftToRight) => {
      const s = sparks.find((item) => !item.active);
      if (!s) return;

      s.active = true;
      s.x = startX;
      s.yOffset = (Math.random() - 0.5) * 0.04;
      s.y = targetY + s.yOffset;
      s.z = (Math.random() - 0.5) * 0.05;

      s.isLeftToRight = isLeftToRight;
      s.targetX = targetX;

      const dist = Math.abs(targetX - startX) || 1;
      const speed = isLeftToRight ? (12.0 + Math.random() * 2.5) : -(12.0 + Math.random() * 2.5);

      s.vx = speed;
      s.life = 0;
      s.maxLife = dist / Math.abs(speed);
      s.baseSize = 0.18 + Math.random() * 0.12;
    };

    // --- Accurate DOM Button 3D Target Calculation ---
    // Uses the actual button bounding rectangle to calculate exact world-space coordinates
    const computeButtonWorldTargets = () => {
      const defaultTargets = {
        leftX: -1.35,
        rightX: 1.35,
        centerY: 0.0,
      };

      if (!buttonRef?.current || !container) {
        return defaultTargets;
      }

      const btnRect = buttonRef.current.getBoundingClientRect();
      const canvasRect = container.getBoundingClientRect();

      if (canvasRect.width === 0 || canvasRect.height === 0) {
        return defaultTargets;
      }

      // Convert DOM pixel coordinates to NDC (-1 to +1)
      const leftNdcX = ((btnRect.left - canvasRect.left) / canvasRect.width) * 2 - 1;
      const rightNdcX = ((btnRect.right - canvasRect.left) / canvasRect.width) * 2 - 1;
      // Note: in Three.js NDC, +Y is UP, so top of canvas is +1, bottom is -1
      const centerNdcY = -(((btnRect.top + btnRect.height * 0.5) - canvasRect.top) / canvasRect.height) * 2 + 1;

      // Project onto plane Z = 0
      const unprojectToZ0 = (ndcX, ndcY) => {
        const v = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera);
        const dir = v.sub(camera.position).normalize();
        const distance = (0 - camera.position.z) / dir.z;
        return camera.position.clone().add(dir.multiplyScalar(distance));
      };

      const leftWorld = unprojectToZ0(leftNdcX, centerNdcY);
      const rightWorld = unprojectToZ0(rightNdcX, centerNdcY);

      return {
        leftX: leftWorld.x,
        rightX: rightWorld.x,
        centerY: leftWorld.y, // Exact vertical center of actual DOM button!
      };
    };

    // --- Dynamic Sizing & Camera Adjustment ---
    const updateSize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;

      if (w < 640) {
        camera.position.z = 14.5;
        leftDragon.root.position.x = -4.1;
        rightDragon.root.position.x = 4.1;
      } else if (w < 1024) {
        camera.position.z = 12.6;
        leftDragon.root.position.x = -4.8;
        rightDragon.root.position.x = 4.8;
      } else {
        camera.position.z = 11.2;
        leftDragon.root.position.x = -5.4;
        rightDragon.root.position.x = 5.4;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    updateSize();

    // Visibility Observer
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    // --- Realistic Subtle Dragon Idle Movement & Fire Breathing ---
    const CYCLE_DURATION = 7.2;
    const startTime = performance.now();
    let lastTime = startTime;
    let animId;

    const animateDragonIdleAndFire = (dragon, cycleProgress, delta, time, isLeft) => {
      const p = cycleProgress;
      // 1. Gentle chest breathing expansion
      const breathe = Math.sin(time * 2.0 + (isLeft ? 0 : 1.5)) * 0.5 + 0.5;
      dragon.chestGroup.scale.set(
        1 + breathe * 0.02,
        1 + breathe * 0.03,
        1 + breathe * 0.015
      );

      // 2. Wings stay mostly still in proud standing posture
      dragon.leftWing.rotation.x = 0.35 + breathe * 0.02;
      dragon.rightWing.rotation.x = -0.35 - breathe * 0.02;

      // 3. Subtle slow serpentine tail wave
      for (let t = 0; t < dragon.tailSegments.length; t++) {
        const wave = Math.sin(time * 1.5 - t * 0.45 + (isLeft ? 0 : 2.0));
        dragon.tailSegments[t].rotation.y = wave * 0.07;
        dragon.tailSegments[t].rotation.z = Math.cos(time * 1.2 - t * 0.3) * 0.035;
      }

      // 4. Feet remain strictly planted at all times (Zero movement)
      if (dragon.forelegs) {
        dragon.forelegs[0].rotation.z = 0;
        dragon.forelegs[1].rotation.z = 0;
      }
      if (dragon.rearLegs) {
        dragon.rearLegs[0].rotation.z = 0;
        dragon.rearLegs[1].rotation.z = 0;
      }

      // 5. Fire Breathing Sequence
      let jawOpen = 0;
      let throatIntensity = 0.35;
      let fireIntensity = 0;
      let headPitch = 0;

      if (p >= 0.32 && p < 0.42) {
        // Preparation & Ignition
        const tIgnite = (p - 0.32) / 0.1;
        jawOpen = THREE.MathUtils.lerp(0, 0.48, tIgnite);
        throatIntensity = THREE.MathUtils.lerp(0.35, 3.8, tIgnite);
        headPitch = THREE.MathUtils.lerp(0, -0.04, tIgnite);
      } else if (p >= 0.42 && p < 0.74) {
        // Continuous Fire Breath
        jawOpen = 0.52 + Math.sin(time * 18) * 0.025;
        throatIntensity = 4.8 + Math.sin(time * 22) * 0.5;
        fireIntensity = 1.0;
        headPitch = -0.04 + Math.sin(time * 16) * 0.01;
      } else if (p >= 0.74 && p < 0.86) {
        // Dissipation
        const tCool = (p - 0.74) / 0.12;
        jawOpen = THREE.MathUtils.lerp(0.52, 0, tCool);
        throatIntensity = THREE.MathUtils.lerp(4.8, 0.35, tCool);
        fireIntensity = THREE.MathUtils.lerp(1.0, 0, tCool);
        headPitch = THREE.MathUtils.lerp(-0.04, 0, tCool);
      }

      if (prefersReducedMotion) {
        jawOpen = 0;
        throatIntensity = 0.4;
        fireIntensity = 0;
      }

      // Smooth jaw articulation
      dragon.lowerJawGroup.rotation.x = THREE.MathUtils.lerp(
        dragon.lowerJawGroup.rotation.x,
        jawOpen,
        0.2
      );
      dragon.mouthLight.intensity = THREE.MathUtils.lerp(
        dragon.mouthLight.intensity,
        throatIntensity,
        0.25
      );

      // Head aligned toward horizontal button level
      dragon.headGroup.rotation.z = -0.12 + headPitch;

      return fireIntensity;
    };

    // --- Main Render Loop ---
    const tick = (now = performance.now()) => {
      animId = requestAnimationFrame(tick);
      if (!isVisible) return;

      const currentTime = (now - startTime) * 0.001;
      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;

      // Staggered breathing cycles
      const leftCycle = (currentTime % CYCLE_DURATION) / CYCLE_DURATION;
      const rightCycle = ((currentTime + CYCLE_DURATION * 0.5) % CYCLE_DURATION) / CYCLE_DURATION;

      const leftFire = animateDragonIdleAndFire(leftDragon, leftCycle, delta, currentTime, true);
      const rightFire = animateDragonIdleAndFire(rightDragon, rightCycle, delta, currentTime, false);

      // Calculate the actual DOM button target coordinates in 3D world space
      const btnTargets = computeButtonWorldTargets();
      const targetY = btnTargets.centerY; // Exact vertical center of actual button!

      // Synchronize both dragons' root heights so their mouths are at the EXACT vertical level of the button
      const leftMouthWorld = new THREE.Vector3();
      leftDragon.mouthEmitterPoint.getWorldPosition(leftMouthWorld);
      leftDragon.root.position.y += (targetY - leftMouthWorld.y);
      leftDragon.root.updateMatrixWorld(true);
      leftDragon.mouthEmitterPoint.getWorldPosition(leftMouthWorld);

      const rightMouthWorld = new THREE.Vector3();
      rightDragon.mouthEmitterPoint.getWorldPosition(rightMouthWorld);
      rightDragon.root.position.y += (targetY - rightMouthWorld.y);
      rightDragon.root.updateMatrixWorld(true);
      rightDragon.mouthEmitterPoint.getWorldPosition(rightMouthWorld);

      // Update Shader Times
      leftStream.mat.uniforms.uTime.value = currentTime;
      leftStream.coreMat.uniforms.uTime.value = currentTime;
      rightStream.mat.uniforms.uTime.value = currentTime;
      rightStream.coreMat.uniforms.uTime.value = currentTime;

      // --- Align Left Stream (Mouth -> Button Left Edge at targetY) ---
      const leftTargetX = btnTargets.leftX;
      const leftStreamLength = Math.max(0.1, leftTargetX - leftMouthWorld.x);

      leftStream.group.position.set(leftMouthWorld.x, targetY, 0);
      leftStream.group.scale.set(leftStreamLength, 1, 1);
      leftStream.mat.uniforms.uIntensity.value = leftFire;
      leftStream.coreMat.uniforms.uIntensity.value = leftFire * 0.85;

      // --- Align Right Stream (Mouth -> Button Right Edge at targetY) ---
      const rightTargetX = btnTargets.rightX;
      const rightStreamLength = Math.max(0.1, rightMouthWorld.x - rightTargetX);

      rightStream.group.position.set(rightMouthWorld.x, targetY, 0);
      rightStream.group.rotation.y = Math.PI; // Aim straight left
      rightStream.group.scale.set(rightStreamLength, 1, 1);
      rightStream.mat.uniforms.uIntensity.value = rightFire;
      rightStream.coreMat.uniforms.uIntensity.value = rightFire * 0.85;

      // Update button edge dynamic lights
      leftButtonLight.position.set(leftTargetX, targetY, 0.3);
      leftButtonLight.intensity = THREE.MathUtils.lerp(
        leftButtonLight.intensity,
        leftFire > 0.1 ? 2.4 : 0.05,
        0.18
      );

      rightButtonLight.position.set(rightTargetX, targetY, 0.3);
      rightButtonLight.intensity = THREE.MathUtils.lerp(
        rightButtonLight.intensity,
        rightFire > 0.1 ? 2.4 : 0.05,
        0.18
      );

      // Notify parent component for button border sheen
      if (onFireStateChangeRef.current) {
        onFireStateChangeRef.current(leftFire > 0.2 || rightFire > 0.2);
      }

      // --- Emit & Update Horizontal Sparks along targetY ---
      if (!prefersReducedMotion) {
        if (leftFire > 0.2) {
          spawnHorizontalSpark(leftMouthWorld.x, targetY, leftTargetX, true);
        }
        if (rightFire > 0.2) {
          spawnHorizontalSpark(rightMouthWorld.x, targetY, rightTargetX, false);
        }

        const sPositions = sparkGeo.attributes.position.array;
        const sColors = sparkGeo.attributes.color.array;
        const sSizes = sparkGeo.attributes.size.array;

        for (let j = 0; j < MAX_SPARKS; j++) {
          const s = sparks[j];
          if (!s.active) {
            sSizes[j] = 0;
            continue;
          }

          s.life += delta;
          if (s.life >= s.maxLife) {
            s.active = false;
            sSizes[j] = 0;
            continue;
          }

          // Move horizontally straight across along targetY
          s.x += s.vx * delta;
          s.y = targetY + s.yOffset; // Locked to button targetY

          // Stop at button target edge
          if (s.isLeftToRight && s.x >= s.targetX) {
            s.active = false;
            sSizes[j] = 0;
            continue;
          }
          if (!s.isLeftToRight && s.x <= s.targetX) {
            s.active = false;
            sSizes[j] = 0;
            continue;
          }

          const progress = s.life / s.maxLife;
          sSizes[j] = s.baseSize * (1.0 - progress * 0.6);

          sPositions[j * 3] = s.x;
          sPositions[j * 3 + 1] = s.y;
          sPositions[j * 3 + 2] = s.z;

          // Glowing gold fading to cooling ember
          sColors[j * 3] = 1.0;
          sColors[j * 3 + 1] = THREE.MathUtils.lerp(0.9, 0.25, progress);
          sColors[j * 3 + 2] = THREE.MathUtils.lerp(0.4, 0.05, progress);
        }

        sparkGeo.attributes.position.needsUpdate = true;
        sparkGeo.attributes.color.needsUpdate = true;
        sparkGeo.attributes.size.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    tick(performance.now());

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      leftStream.mat.dispose();
      leftStream.coreMat.dispose();
      rightStream.mat.dispose();
      rightStream.coreMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      sparkTexture.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [buttonRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
    />
  );
}
