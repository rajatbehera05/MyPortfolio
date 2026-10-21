import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

/**
 * SalamanderRoarCanvas — Ancient Crimson & Molten Gold Dragons
 * 
 * Recreates the exact visual quality, composition, and presentation from the visual guide:
 * 1. Palette: Deep dark burgundy crevices -> rich fiery ruby/crimson scales & wing membranes
 *    -> warm golden underbelly scutes -> brilliant molten gold horns and dorsal spine crests.
 * 2. Wings: Exceptionally detailed bat-like wing anatomy, arched high with curved bone struts
 *    and veined leathery membranes.
 * 3. Composition: Two symmetrical ancient dragons standing firmly grounded on opposite sides,
 *    framing the central blue "Explore My Projects ↗" button with a generous clear margin.
 * 4. Grounding: All 4 feet planted firmly with soft ambient contact shadows; tails curling safely within frame.
 * 5. Animation: Dignified idle breathing with gentle chest/tail motion (zero foot sliding/walking).
 * 6. Synchronized Roar: Articulated jaws open wide revealing teeth and tongue, subtle throat warmth,
 *    and concentric acoustic shockwave rings ()) directed smoothly toward the central button.
 *    (Zero fire-breathing, zero flames, zero projectile blobs).
 */

// Color ramp for ancient fire dragon: luminance mapped to deep burgundy, rich crimson, golden scutes, molten gold
const DRAGON_COLOR_RAMP = [
  [0.00, 0.22, 0.02, 0.02], // 0.0: deep dark burgundy crevices
  [0.18, 0.42, 0.04, 0.04], // 0.18: dark wine shadows
  [0.35, 0.70, 0.08, 0.08], // 0.35: rich crimson scale bodies
  [0.55, 0.88, 0.15, 0.10], // 0.55: vibrant ruby crimson & wing membranes
  [0.72, 0.95, 0.45, 0.08], // 0.72: warm molten amber (scute borders)
  [0.86, 0.98, 0.72, 0.12], // 0.86: rich golden underbelly scutes & horn bases
  [1.00, 1.00, 0.90, 0.38], // 1.0: brilliant molten gold crests & highlights
];

function sampleDragonRamp(L) {
  if (L <= DRAGON_COLOR_RAMP[0][0]) {
    const c = DRAGON_COLOR_RAMP[0];
    return [c[1], c[2], c[3]];
  }
  for (let i = 1; i < DRAGON_COLOR_RAMP.length; i++) {
    if (L <= DRAGON_COLOR_RAMP[i][0]) {
      const a = DRAGON_COLOR_RAMP[i - 1];
      const b = DRAGON_COLOR_RAMP[i];
      const k = (L - a[0]) / (b[0] - a[0]);
      return [
        a[1] + (b[1] - a[1]) * k,
        a[2] + (b[2] - a[2]) * k,
        a[3] + (b[3] - a[3]) * k,
      ];
    }
  }
  const last = DRAGON_COLOR_RAMP[DRAGON_COLOR_RAMP.length - 1];
  return [last[1], last[2], last[3]];
}

// Global cache for recolored textures so canvas processing only occurs once
const recolorTextureCache = new Map();

function getRecoloredDragonTexture(srcTexture, isEye = false) {
  if (!srcTexture || !srcTexture.image) return srcTexture;
  const key = (srcTexture.uuid || srcTexture.name || 'tex') + (isEye ? '_eye' : '_body');
  if (recolorTextureCache.has(key)) {
    return recolorTextureCache.get(key);
  }

  const img = srcTexture.image;
  const w = img.width || 1024;
  const h = img.height || 1024;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);

  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  if (isEye) {
    // Burning amber/gold iris
    for (let i = 0; i < data.length; i += 4) {
      const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
      data[i] = Math.round((0.98 * lum + 0.02) * 255);
      data[i + 1] = Math.round(0.85 * lum * 255);
      data[i + 2] = Math.round(0.25 * lum * 255);
    }
  } else {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const [nr, ng, nb] = sampleDragonRamp(lum);
      data[i] = Math.round(nr * 255);
      data[i + 1] = Math.round(ng * 255);
      data[i + 2] = Math.round(nb * 255);
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const newTex = new THREE.CanvasTexture(canvas);
  newTex.flipY = false;
  newTex.colorSpace = THREE.SRGBColorSpace;
  newTex.minFilter = THREE.LinearMipmapLinearFilter;
  newTex.magFilter = THREE.LinearFilter;
  newTex.generateMipmaps = true;
  newTex.needsUpdate = true;

  recolorTextureCache.set(key, newTex);
  return newTex;
}

export default function SalamanderRoarCanvas() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 560;

    // Perspective Camera: 34° FOV framing both complete dragons and central button
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 12.6);
    camera.lookAt(0, -0.15, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Studio Lighting Setup ---
    // Soft sky blue ambient fill ensuring scale recesses and wing folds remain readable
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.45);
    scene.add(ambientLight);

    // Key directional light: highlights muscle contours, horn ridges, and wing fingers
    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    keyLight.position.set(4, 8, 7);
    scene.add(keyLight);

    // Front fill to illuminate facial features, muzzles, teeth, and underbelly plates
    const frontFill = new THREE.DirectionalLight(0xe0e7ff, 1.05);
    frontFill.position.set(0, 2, 8);
    scene.add(frontFill);

    // Warm golden rim lights that accentuate the wing membranes and dorsal spines
    const rimLightLeft = new THREE.DirectionalLight(0xf59e0b, 1.6);
    rimLightLeft.position.set(-6, 5, -5);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.DirectionalLight(0xf59e0b, 1.6);
    rimLightRight.position.set(6, 5, -5);
    scene.add(rimLightRight);

    // --- Soft Contact Ground Shadows beneath Dragons ---
    const shadowGeo = new THREE.PlaneGeometry(6.2, 6.2);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sGrad.addColorStop(0, 'rgba(15, 23, 42, 0.44)');
    sGrad.addColorStop(0.45, 'rgba(15, 23, 42, 0.20)');
    sGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });

    const groundY = -1.52;

    const leftShadow = new THREE.Mesh(shadowGeo, shadowMat);
    leftShadow.rotation.x = -Math.PI / 2;
    leftShadow.position.set(-4.75, groundY + 0.015, -0.3);
    scene.add(leftShadow);

    const rightShadow = new THREE.Mesh(shadowGeo, shadowMat);
    rightShadow.rotation.x = -Math.PI / 2;
    rightShadow.position.set(4.75, groundY + 0.015, -0.3);
    scene.add(rightShadow);

    // --- Acoustic Shockwave Rings (Visual Acoustic Pulse toward Button) ---
    // 3 curved concentric luminous rings emitting toward the button during the roar
    const createAcousticRings = (isLeft) => {
      const group = new THREE.Group();
      const ringGeo = new THREE.TorusGeometry(0.38, 0.018, 14, 28, Math.PI * 0.58);
      const rings = [];

      for (let i = 0; i < 3; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color('#FDE047'),
          transparent: true,
          opacity: 0,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(ringGeo, mat);
        mesh.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;
        mesh.rotation.z = Math.PI / 2;
        mesh.visible = false;
        group.add(mesh);
        rings.push({ mesh, mat });
      }

      scene.add(group);
      return { group, rings };
    };

    const leftRings = createAcousticRings(true);
    const rightRings = createAcousticRings(false);

    // --- Load Rigged Ancient Dragon Asset ---
    const loader = new GLTFLoader();
    let leftDragon = null;
    let rightDragon = null;
    let leftMixer = null;
    let rightMixer = null;

    let leftBones = {};
    let rightBones = {};

    let animId;
    let isDisposed = false;

    loader.load(
      '/assets/dragon.glb',
      (gltf) => {
        if (isDisposed) return;

        const baseModel = gltf.scene;

        // Model bounds
        const rawBox = new THREE.Box3().setFromObject(baseModel);
        const rawHeight = rawBox.max.y - rawBox.min.y || 8.11;
        const rawMinY = rawBox.min.y || -6.18;

        // Perfectly proportioned height framing both dragons with clear gap around button
        const targetHeight = 2.15;
        const scaleFactor = targetHeight / rawHeight;

        const setupDragonInstance = (isLeft) => {
          const dragon = SkeletonUtils.clone(baseModel);
          dragon.scale.setScalar(scaleFactor);

          const posX = isLeft ? -4.75 : 4.75;
          const posY = groundY - rawMinY * scaleFactor;
          const posZ = -0.3;
          dragon.position.set(posX, posY, posZ);

          // Inward facing standing pose, angled slightly towards camera for dimensional depth
          if (isLeft) {
            dragon.rotation.set(0, Math.PI / 2 - 0.22, 0);
          } else {
            dragon.rotation.set(0, -Math.PI / 2 + 0.22, 0);
          }

          // Apply rich crimson-and-gold PBR materials via luminance-preserving recolor pass
          dragon.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              if (child.material) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach((m) => {
                  m.side = THREE.DoubleSide;

                  const isEye = /eye/i.test(m.name || child.name);
                  if (m.map) {
                    m.map = getRecoloredDragonTexture(m.map, isEye);
                  }

                  if (isEye) {
                    m.color = new THREE.Color('#FEF08A');
                    m.emissive = new THREE.Color('#F59E0B');
                    m.emissiveIntensity = 1.8;
                    m.roughness = 0.2;
                  } else if (/wing/i.test(m.name || child.name)) {
                    // Wing membranes: leathery surface with fine vein relief and crimson transmission
                    m.roughness = 0.52;
                    m.metalness = 0.12;
                    m.emissive = new THREE.Color('#380404');
                    m.emissiveIntensity = 0.25;
                  } else {
                    // Body scales, horns, claws: rich elder dragon crimson and gold scutes
                    m.roughness = 0.50;
                    m.metalness = 0.18;
                    m.emissive = new THREE.Color('#280303');
                    m.emissiveIntensity = 0.20;
                  }
                });
              }
            }
          });

          // Animation Mixer setup for gentle idle breathing
          const mixer = new THREE.AnimationMixer(dragon);
          const idleClip =
            gltf.animations.find((c) => /anim_0001/i.test(c.name)) ||
            gltf.animations[0];

          if (idleClip && !prefersReducedMotion) {
            const idleAction = mixer.clipAction(idleClip);
            idleAction.play();
            idleAction.timeScale = 0.85;
          }

          // Locate skeletal bones for high wing spread & articulated roar
          const bones = {
            jaw: dragon.getObjectByName('_j004_037'),
            head: dragon.getObjectByName('_j003_036'),
            neck: dragon.getObjectByName('_j105_035'),
            leftWingRoot: dragon.getObjectByName('_j070_024'),
            rightWingRoot: dragon.getObjectByName('_j060_018'),
            leftWingJoint: dragon.getObjectByName('_j071_025'),
            rightWingJoint: dragon.getObjectByName('_j061_019'),
          };

          // Fallbacks for bones if names differ
          if (!bones.jaw) {
            dragon.traverse((o) => {
              if (o.isBone && /jaw/i.test(o.name)) bones.jaw = o;
            });
          }
          if (!bones.head) {
            dragon.traverse((o) => {
              if (o.isBone && /head/i.test(o.name)) bones.head = o;
            });
          }

          // Warm internal throat glow light (zero fire particles)
          const mouthLight = new THREE.PointLight(0xff7700, 0.08, 3.5);
          if (bones.head) {
            mouthLight.position.set(0, 0.2, 0.6);
            bones.head.add(mouthLight);
          } else {
            dragon.add(mouthLight);
          }
          bones.mouthLight = mouthLight;

          scene.add(dragon);
          return { dragon, mixer, bones };
        };

        const leftSetup = setupDragonInstance(true);
        leftDragon = leftSetup.dragon;
        leftMixer = leftSetup.mixer;
        leftBones = leftSetup.bones;

        const rightSetup = setupDragonInstance(false);
        rightDragon = rightSetup.dragon;
        rightMixer = rightSetup.mixer;
        rightBones = rightSetup.bones;

        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.error('Failed to load ancient dragon model:', err);
      }
    );

    // --- Dynamic Sizing & Camera Adjustment ---
    const updateSize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;

      if (w < 640) {
        camera.position.z = 15.0;
        camera.position.y = 0.12;
        if (leftDragon) leftDragon.position.x = -4.0;
        if (rightDragon) rightDragon.position.x = 4.0;
        leftShadow.position.x = -4.0;
        rightShadow.position.x = 4.0;
      } else if (w < 1024) {
        camera.position.z = 13.5;
        camera.position.y = 0.06;
        if (leftDragon) leftDragon.position.x = -4.4;
        if (rightDragon) rightDragon.position.x = 4.4;
        leftShadow.position.x = -4.4;
        rightShadow.position.x = 4.4;
      } else {
        camera.position.z = 12.6;
        camera.position.y = 0.05;
        if (leftDragon) leftDragon.position.x = -4.75;
        if (rightDragon) rightDragon.position.x = 4.75;
        leftShadow.position.x = -4.75;
        rightShadow.position.x = 4.75;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    updateSize();

    // Visibility Observer to pause when offscreen
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

    // --- Synchronized Roar & Wing Pose Animation ---
    const CYCLE_DURATION = 9.5;
    const startTime = performance.now();
    let lastTime = startTime;

    const animateDragonRoarAndWings = (
      bones,
      acousticRings,
      isLeft,
      cycleProgress,
      time
    ) => {
      const { jaw, head, neck, leftWingRoot, rightWingRoot, leftWingJoint, rightWingJoint, mouthLight } = bones;

      // 1. HIGH-ARCHED WINGS (Matching Reference Image)
      // Arches both wings high above the back with majestic curved bone struts
      const wingBreath = Math.sin(time * 1.4) * 0.03;
      if (leftWingRoot) {
        leftWingRoot.rotation.z -= 0.28 + wingBreath;
        leftWingRoot.rotation.y += 0.14;
        leftWingRoot.rotation.x -= 0.16;
      }
      if (rightWingRoot) {
        rightWingRoot.rotation.z += 0.28 + wingBreath;
        rightWingRoot.rotation.y -= 0.14;
        rightWingRoot.rotation.x -= 0.16;
      }
      if (leftWingJoint) {
        leftWingJoint.rotation.z -= 0.18;
      }
      if (rightWingJoint) {
        rightWingJoint.rotation.z += 0.18;
      }

      if (!jaw || prefersReducedMotion) {
        if (mouthLight) mouthLight.intensity = 0.08;
        return;
      }

      const p = cycleProgress;
      // Roar Cycle Breakdown:
      // 0.00 -> 0.38: Idle standing breathing
      // 0.38 -> 0.46: Anticipation (head turns toward button, neck tenses, jaw opens)
      // 0.46 -> 0.70: Powerful Roar (jaw open wide, head recoils back then thrusts, acoustic rings pulse)
      // 0.70 -> 0.84: Recovery (jaw closes smoothly, head returns)
      // 0.84 -> 1.00: Return to idle

      let targetJawOpen = 0;
      let targetHeadPitch = 0;
      let targetGlow = 0.08;
      let isRoaring = false;
      let roarProgress = 0;

      if (p >= 0.38 && p < 0.46) {
        const t = (p - 0.38) / 0.08;
        targetJawOpen = THREE.MathUtils.lerp(0, 0.24, t);
        targetHeadPitch = THREE.MathUtils.lerp(0, 0.08, t);
        targetGlow = THREE.MathUtils.lerp(0.08, 0.65, t);
      } else if (p >= 0.46 && p < 0.70) {
        isRoaring = true;
        roarProgress = (p - 0.46) / 0.24;
        const roarTremor = Math.sin(time * 28) * 0.025;
        targetJawOpen = 0.52 + roarTremor;
        targetHeadPitch = -0.14 + Math.sin(roarProgress * Math.PI) * 0.18;
        targetGlow = 1.6 + Math.sin(time * 20) * 0.35;
      } else if (p >= 0.70 && p < 0.84) {
        const t = (p - 0.70) / 0.14;
        targetJawOpen = THREE.MathUtils.lerp(0.52, 0, t);
        targetHeadPitch = THREE.MathUtils.lerp(-0.14, 0, t);
        targetGlow = THREE.MathUtils.lerp(1.6, 0.08, t);
      }

      // Smooth bone interpolation
      jaw.rotation.x = THREE.MathUtils.lerp(jaw.rotation.x, -targetJawOpen, 0.20);
      if (head) {
        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetHeadPitch, 0.18);
        if (neck) neck.rotation.z = THREE.MathUtils.lerp(neck.rotation.z, (isLeft ? -1 : 1) * 0.05 * targetJawOpen, 0.15);
      }
      if (mouthLight) {
        mouthLight.intensity = THREE.MathUtils.lerp(mouthLight.intensity, targetGlow, 0.22);
      }

      // 2. ACOUSTIC SHOCKWAVE RINGS ()) TOWARDS THE BUTTON
      // Emanating from the open mouth toward the central CTA
      if (acousticRings && head) {
        const mouthWorldPos = new THREE.Vector3();
        head.getWorldPosition(mouthWorldPos);
        mouthWorldPos.y += 0.08;
        mouthWorldPos.x += isLeft ? 0.35 : -0.35;

        acousticRings.rings.forEach((r, idx) => {
          if (!isRoaring) {
            r.mesh.visible = false;
            r.mat.opacity = 0;
            return;
          }

          // Staggered ring wave emission
          const ringDelay = idx * 0.28;
          const waveT = (roarProgress - ringDelay) / 0.65;

          if (waveT >= 0 && waveT <= 1) {
            r.mesh.visible = true;
            // Travel inward toward button (X=0)
            const travelDist = (isLeft ? 1 : -1) * (0.2 + waveT * 1.35);
            r.mesh.position.set(
              mouthWorldPos.x + travelDist,
              mouthWorldPos.y + Math.sin(waveT * Math.PI) * 0.04,
              mouthWorldPos.z
            );

            // Scale expands outward
            const scale = 0.5 + waveT * 1.1;
            r.mesh.scale.set(scale, scale, scale);

            // Opacity peaks then fades smoothly before touching the button
            const alpha = Math.sin(waveT * Math.PI) * 0.55;
            r.mat.opacity = alpha;
          } else {
            r.mesh.visible = false;
            r.mat.opacity = 0;
          }
        });
      }
    };

    // --- Main Render Loop ---
    const tick = (now = performance.now()) => {
      animId = requestAnimationFrame(tick);
      if (!isVisible) return;

      const currentTime = (now - startTime) * 0.001;
      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;

      // 1. Update skeletal animation mixers (idle breathing)
      if (leftMixer) leftMixer.update(delta);
      if (rightMixer) rightMixer.update(delta);

      // 2. Synchronized roar sequence with slight cinematic stagger
      const leftCycle = (currentTime % CYCLE_DURATION) / CYCLE_DURATION;
      const rightCycle = ((currentTime + CYCLE_DURATION * 0.48) % CYCLE_DURATION) / CYCLE_DURATION;

      if (leftDragon) {
        animateDragonRoarAndWings(leftBones, leftRings, true, leftCycle, currentTime);
      }
      if (rightDragon) {
        animateDragonRoarAndWings(rightBones, rightRings, false, rightCycle, currentTime);
      }

      renderer.render(scene, camera);
    };

    tick(performance.now());

    // --- Cleanup ---
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();

      if (leftRings && leftRings.rings) {
        leftRings.rings.forEach((r) => {
          r.mesh.geometry.dispose();
          r.mat.dispose();
        });
      }
      if (rightRings && rightRings.rings) {
        rightRings.rings.forEach((r) => {
          r.mesh.geometry.dispose();
          r.mat.dispose();
        });
      }

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
    />
  );
}
