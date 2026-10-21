import * as THREE from 'three';

/**
 * Creates a parametric smooth tapered 3D tube along a series of 3D spline points.
 * Features smooth Frenet frames, cosine interpolation, and continuous normal smoothing.
 */
export function createTaperedTube(
  points,
  radiusStart,
  radiusEnd,
  tubularSegments = 22,
  radialSegments = 12
) {
  const curve = new THREE.CatmullRomCurve3(points);
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const vertices = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= tubularSegments; i++) {
    const u = i / tubularSegments;
    const p = curve.getPointAt(u);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    // Smooth cosine interpolation for natural anatomical tapering
    const r = radiusStart + (radiusEnd - radiusStart) * Math.sin((u * Math.PI) / 2);

    for (let j = 0; j <= radialSegments; j++) {
      const v = j / radialSegments;
      const theta = v * Math.PI * 2;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      const normal = new THREE.Vector3()
        .addScaledVector(N, cosTheta)
        .addScaledVector(B, sinTheta)
        .normalize();

      const vertex = new THREE.Vector3()
        .copy(p)
        .addScaledVector(normal, r);

      vertices.push(vertex.x, vertex.y, vertex.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = (i + 1) * (radialSegments + 1) + j;
      const c = (i + 1) * (radialSegments + 1) + (j + 1);
      const d = i * (radialSegments + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Creates a 3D curved parametric aerofoil wing membrane panel between two finger bone curves.
 * Features natural catenary trailing-edge scalloping and biological billowing camber.
 */
export function createCurvedWingPanelGeometry(
  pA,
  pB,
  origin,
  uSeg = 14,
  vSeg = 14,
  scallop = 0.22,
  billow = 0.08,
  zSign = 1
) {
  const curveA = new THREE.CatmullRomCurve3([origin, ...pA]);
  const curveB = new THREE.CatmullRomCurve3([origin, ...pB]);

  const vertices = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= vSeg; i++) {
    const v = i / vSeg;
    const ptA = curveA.getPoint(v);
    const ptB = curveB.getPoint(v);

    for (let j = 0; j <= uSeg; j++) {
      const u = j / uSeg;
      // Interpolate between finger struts
      const p = new THREE.Vector3().lerpVectors(ptA, ptB, u);

      // Graceful catenary scallop arch at trailing edge (v = 1.0)
      const scallopFactor = Math.pow(v, 2.2) * Math.sin(u * Math.PI);
      const toOrigin = new THREE.Vector3().subVectors(origin, p).normalize();
      p.addScaledVector(toOrigin, scallop * scallopFactor);

      // Biological aerofoil camber outward
      const chord = new THREE.Vector3().subVectors(ptB, ptA);
      const span = new THREE.Vector3().subVectors(ptA, origin);
      const normal = new THREE.Vector3().crossVectors(chord, span).normalize();
      const billowFactor = Math.sin(u * Math.PI) * Math.sin(v * Math.PI);
      p.addScaledVector(normal, billow * billowFactor * zSign);

      vertices.push(p.x, p.y, p.z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < vSeg; i++) {
    for (let j = 0; j < uSeg; j++) {
      const a = i * (uSeg + 1) + j;
      const b = (i + 1) * (uSeg + 1) + j;
      const c = (i + 1) * (uSeg + 1) + (j + 1);
      const d = i * (uSeg + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Creates high-resolution organic dragon skin texture.
 * Layered crimson scales with subtle color variation, deep burgundy shadow crevices,
 * and molten gold micro-highlights.
 */
export function createOrganicDragonScaleTexture() {
  if (typeof document === 'undefined') {
    return null;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep rich burgundy/crimson base
  ctx.fillStyle = '#5A0808';
  ctx.fillRect(0, 0, 1024, 1024);

  const rows = 36;
  const cols = 36;
  const dx = 1024 / cols;
  const dy = 1024 / rows;

  for (let r = 0; r < rows; r++) {
    const y = r * dy;
    const xOffset = (r % 2) * (dx * 0.5);

    for (let c = -1; c <= cols; c++) {
      const x = c * dx + xOffset;

      // Scalloped teardrop reptilian dragon scale
      ctx.beginPath();
      ctx.moveTo(x + dx * 0.5, y);
      ctx.bezierCurveTo(x + dx * 1.12, y + dy * 0.38, x + dx * 0.92, y + dy * 1.12, x + dx * 0.5, y + dy * 1.28);
      ctx.bezierCurveTo(x + dx * 0.08, y + dy * 1.12, x - dx * 0.12, y + dy * 0.38, x + dx * 0.5, y);
      ctx.closePath();

      // Multi-tier radial scale gradient
      const scaleGrad = ctx.createRadialGradient(
        x + dx * 0.5, y + dy * 0.48, 2,
        x + dx * 0.5, y + dy * 0.48, dx * 0.72
      );
      scaleGrad.addColorStop(0, '#DC2626'); // Vivid vermillion core
      scaleGrad.addColorStop(0.5, '#991B1B'); // Rich crimson body
      scaleGrad.addColorStop(0.85, '#650909'); // Deep burgundy transition
      scaleGrad.addColorStop(1, '#2D0404'); // Dark scale margin crevice

      ctx.fillStyle = scaleGrad;
      ctx.fill();

      // Refined dark scale border
      ctx.strokeStyle = '#1F0202';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Controlled molten gold crest highlight
      if (Math.random() > 0.6) {
        ctx.beginPath();
        ctx.arc(x + dx * 0.5, y + dy * 0.38, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.fill();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates high-resolution leathery wing membrane texture.
 * Features organic biological grain, intricate branching veins radiating from the
 * supporting bones, and translucent warm golden-amber underglow.
 */
export function createDetailedWingMembraneTexture() {
  if (typeof document === 'undefined') {
    return null;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep burgundy-crimson biological gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  bgGrad.addColorStop(0, '#5C0808'); // Darker near structural arm bone
  bgGrad.addColorStop(0.4, '#881337'); // Rich crimson body
  bgGrad.addColorStop(0.7, '#9A3412'); // Warm amber translucent glow in web center
  bgGrad.addColorStop(1, '#4A0505'); // Burgundy scalloped trailing rim
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Micro leather skin grain & tension folds
  ctx.strokeStyle = 'rgba(30, 4, 4, 0.28)';
  ctx.lineWidth = 1.0;
  for (let i = 0; i < 40; i++) {
    const xStart = Math.random() * 1024;
    const yStart = Math.random() * 200;
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.bezierCurveTo(
      xStart + (Math.random() - 0.5) * 80, yStart + 300,
      xStart + (Math.random() - 0.5) * 120, yStart + 600,
      xStart + (Math.random() - 0.5) * 160, 1024
    );
    ctx.stroke();
  }

  // Intricate Biological Venous System
  // Primary main trunks branching from the bone down across the membrane
  const veinTrunks = [150, 320, 512, 700, 880];
  veinTrunks.forEach((vx) => {
    // Primary vein
    ctx.beginPath();
    ctx.moveTo(vx, 0);
    const cp1x = vx + (Math.random() - 0.5) * 60;
    const cp2x = vx + (Math.random() - 0.5) * 100;
    const endX = vx + (Math.random() - 0.5) * 140;
    ctx.bezierCurveTo(cp1x, 300, cp2x, 650, endX, 980);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.42)'; // Molten gold vein glow
    ctx.lineWidth = 2.8;
    ctx.stroke();

    // Darker vein shadow for depth
    ctx.strokeStyle = 'rgba(50, 5, 5, 0.45)';
    ctx.lineWidth = 4.5;
    ctx.stroke();

    // Secondary & Tertiary capillary branches
    for (let b = 150; b < 900; b += 120) {
      const bY = b + (Math.random() - 0.5) * 40;
      const bX = vx + (b / 1024) * (endX - vx);

      // Left branch
      ctx.beginPath();
      ctx.moveTo(bX, bY);
      ctx.quadraticCurveTo(bX - 60, bY + 50, bX - 110, bY + 110);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Right branch
      ctx.beginPath();
      ctx.moveTo(bX, bY);
      ctx.quadraticCurveTo(bX + 60, bY + 50, bX + 110, bY + 110);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Builds a photorealistic, anatomically complete Salamander Fire Dragon.
 * 
 * Features:
 * - Serpentine, muscular dragon body with continuous organic contours.
 * - Sculpted dragon head with predatory snout, nostrils, distinct upper/lower fangs, and burning amber cat-slit eyes.
 * - Backward-sweeping grand molten gold horns with spiral growth ridges and brow crests.
 * - Articulated hinged lower jaw with fangs and internal throat warmth.
 * - EXCEPTIONALLY DETAILED WINGS:
 *     * Articulated humerus, forearm (radius), wrist knuckle with alula thumb claw.
 *     * 4 distinct primary and secondary structural finger struts.
 *     * 5 seamless 3D curved aerofoil membrane panels with catenary trailing edge scallops.
 *     * High-resolution veined leathery texture with biological translucency.
 * - Muscular quad legs with clawed talons planted firmly on the ground plane.
 * - Sinuous multi-segmented tail with golden flame spear.
 * - Soft ground contact shadow plane beneath feet.
 * 
 * @param {boolean} facingLeft - If true, dragon is positioned on the right and faces left; if false, on left and faces right.
 */
export function buildOrganicSalamanderDragon(facingLeft = false) {
  const root = new THREE.Group();
  root.name = facingLeft ? 'SalamanderDragon_Right' : 'SalamanderDragon_Left';

  const scaleMap = createOrganicDragonScaleTexture();
  const wingMap = createDetailedWingMembraneTexture();

  // --- Premium PBR Materials ---
  // 1. Organic Crimson Scale Material
  const crimsonSkinMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#991B1B'),
    roughness: 0.36,
    metalness: 0.22,
    map: scaleMap,
    bumpMap: scaleMap,
    bumpScale: 0.045,
  });

  // 2. Molten Gold Horn & Spine Material
  const moltenGoldMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F59E0B'),
    emissive: new THREE.Color('#B45309'),
    emissiveIntensity: 0.5,
    roughness: 0.24,
    metalness: 0.65,
  });

  // 3. Ventral / Underbelly Rib Scutes Material
  const ventralMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C2410C'),
    emissive: new THREE.Color('#7C2D12'),
    emissiveIntensity: 0.42,
    roughness: 0.32,
    metalness: 0.28,
  });

  // 4. Photorealistic Leathery Wing Membrane Material
  const wingMembraneMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#881337'),
    emissive: new THREE.Color('#450A0A'),
    emissiveIntensity: 0.35,
    roughness: 0.4,
    metalness: 0.12,
    map: wingMap,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.94,
  });

  // 5. Obsidian Talon Material
  const talonMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1C1917'),
    roughness: 0.18,
    metalness: 0.82,
  });

  // 6. Burning Eye Material
  const eyeMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#FEF08A'),
  });

  // Main rig container (mirrored horizontally if facing left)
  const mainRig = new THREE.Group();
  if (facingLeft) {
    mainRig.scale.set(-1, 1, 1);
  }
  root.add(mainRig);

  // --- Ground Contact Shadow Plane ---
  const shadowGeo = new THREE.PlaneGeometry(5.2, 2.5);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x090f1d,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
  });
  const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.set(-0.2, 0.01, 0);
  root.add(contactShadow);

  // --- Pelvis & Muscular Haunches ---
  const pelvis = new THREE.Group();
  pelvis.position.set(-0.8, 1.25, 0);
  mainRig.add(pelvis);

  // Rear Torso Tube
  const rearTorsoPoints = [
    new THREE.Vector3(-0.65, 0.05, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.65, 0.08, 0),
  ];
  const rearTorsoGeo = createTaperedTube(rearTorsoPoints, 0.58, 0.68, 20, 14);
  const rearTorsoMesh = new THREE.Mesh(rearTorsoGeo, crimsonSkinMat);
  pelvis.add(rearTorsoMesh);

  // --- Planted Hind Legs (Firm Anatomical Stance) ---
  const createRearLeg = (zOffset) => {
    const hip = new THREE.Group();
    hip.position.set(-0.1, -0.05, zOffset);
    pelvis.add(hip);

    // Muscular Thigh
    const thighPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.22, -0.45, 0.05),
      new THREE.Vector3(-0.16, -0.85, 0),
    ];
    const thighGeo = createTaperedTube(thighPoints, 0.38, 0.24, 14, 10);
    const thighMesh = new THREE.Mesh(thighGeo, crimsonSkinMat);
    hip.add(thighMesh);

    // Shin & Hock
    const shinPoints = [
      new THREE.Vector3(-0.16, -0.85, 0),
      new THREE.Vector3(0.08, -1.1, 0),
      new THREE.Vector3(0.12, -1.22, 0),
    ];
    const shinGeo = createTaperedTube(shinPoints, 0.24, 0.18, 14, 10);
    const shinMesh = new THREE.Mesh(shinGeo, crimsonSkinMat);
    hip.add(shinMesh);

    // 4-Clawed Dragon Foot firmly planted at ground plane
    const footGroup = new THREE.Group();
    footGroup.position.set(0.12, -1.22, 0);
    hip.add(footGroup);

    // Foot base pad
    const padGeo = new THREE.SphereGeometry(0.2, 10, 10);
    padGeo.scale(1.4, 0.45, 1.2);
    const padMesh = new THREE.Mesh(padGeo, crimsonSkinMat);
    padMesh.position.set(0.1, 0.03, 0);
    footGroup.add(padMesh);

    // 4 Curved Clawed Talons
    const clawOffsets = [-0.14, -0.05, 0.05, 0.14];
    clawOffsets.forEach((co) => {
      const cPoints = [
        new THREE.Vector3(0.18, 0.02, co),
        new THREE.Vector3(0.38, -0.01, co * 1.1),
        new THREE.Vector3(0.48, -0.04, co * 1.15),
      ];
      const clawGeo = createTaperedTube(cPoints, 0.065, 0.015, 10, 8);
      const clawMesh = new THREE.Mesh(clawGeo, talonMat);
      footGroup.add(clawMesh);
    });

    return hip;
  };

  const rearLegs = [createRearLeg(0.58), createRearLeg(-0.58)];

  // --- Sinuous Serpentine Tail ---
  const tailSegments = [];
  let parentTail = pelvis;
  const tailCount = 6;

  for (let t = 0; t < tailCount; t++) {
    const tailSegGroup = new THREE.Group();
    tailSegGroup.position.set(-0.65, t === 0 ? -0.1 : -0.06, 0);
    parentTail.add(tailSegGroup);
    tailSegments.push(tailSegGroup);

    const rStart = 0.52 * Math.pow(0.76, t);
    const rEnd = 0.52 * Math.pow(0.76, t + 1);
    const len = 0.82 - t * 0.05;

    const tPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-len * 0.5, 0.02, 0),
      new THREE.Vector3(-len, 0, 0),
    ];
    const segGeo = createTaperedTube(tPoints, rStart, rEnd, 14, 10);
    const segMesh = new THREE.Mesh(segGeo, crimsonSkinMat);
    tailSegGroup.add(segMesh);

    // Dorsal Gold Flame Quills along Tail
    const quillPoints = [
      new THREE.Vector3(-len * 0.5, rStart * 0.85, 0),
      new THREE.Vector3(-len * 0.58, rStart * 1.6 + 0.1, 0),
    ];
    const quillGeo = createTaperedTube(quillPoints, 0.07, 0.01, 10, 6);
    const quillMesh = new THREE.Mesh(quillGeo, moltenGoldMat);
    tailSegGroup.add(quillMesh);

    parentTail = tailSegGroup;
  }

  // Golden Flame Spear on Tail Tip
  const spearPoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.35, 0.05, 0),
    new THREE.Vector3(-0.68, 0.02, 0),
  ];
  const spearGeo = createTaperedTube(spearPoints, 0.16, 0.02, 14, 8);
  const spearMesh = new THREE.Mesh(spearGeo, moltenGoldMat);
  parentTail.add(spearMesh);

  // --- Muscular Mid-Torso & Barrel Chest ---
  const chestGroup = new THREE.Group();
  chestGroup.position.set(0.72, 0.32, 0);
  pelvis.add(chestGroup);

  const chestPoints = [
    new THREE.Vector3(-0.35, -0.06, 0),
    new THREE.Vector3(0.2, 0.08, 0),
    new THREE.Vector3(0.75, 0.22, 0),
  ];
  const chestGeo = createTaperedTube(chestPoints, 0.68, 0.62, 20, 14);
  const chestMesh = new THREE.Mesh(chestGeo, crimsonSkinMat);
  chestGroup.add(chestMesh);

  // Segmented Ventral Underbelly Scutes
  for (let s = 0; s < 5; s++) {
    const scutePoints = [
      new THREE.Vector3(-0.2 + s * 0.2, -0.4 + s * 0.08, -0.32 + s * 0.02),
      new THREE.Vector3(-0.15 + s * 0.2, -0.48 + s * 0.08, 0),
      new THREE.Vector3(-0.2 + s * 0.2, -0.4 + s * 0.08, 0.32 - s * 0.02),
    ];
    const sGeo = createTaperedTube(scutePoints, 0.06, 0.06, 10, 8);
    const sMesh = new THREE.Mesh(sGeo, ventralMat);
    chestGroup.add(sMesh);
  }

  // --- Planted Forelegs (Firm Anatomical Stance) ---
  const createForeleg = (zOffset) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(0.55, -0.16, zOffset);
    chestGroup.add(shoulder);

    // Powerful Bicep & Shoulder
    const armPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.12, -0.55, 0.03),
      new THREE.Vector3(0.18, -0.92, 0),
    ];
    const armGeo = createTaperedTube(armPoints, 0.32, 0.22, 14, 10);
    const armMesh = new THREE.Mesh(armGeo, crimsonSkinMat);
    shoulder.add(armMesh);

    // Forearm & Wrist
    const forearmPoints = [
      new THREE.Vector3(0.18, -0.92, 0),
      new THREE.Vector3(0.28, -1.3, 0),
      new THREE.Vector3(0.34, -1.5, 0),
    ];
    const forearmGeo = createTaperedTube(forearmPoints, 0.22, 0.16, 14, 10);
    const forearmMesh = new THREE.Mesh(forearmGeo, crimsonSkinMat);
    shoulder.add(forearmMesh);

    // 4-Clawed Dragon Front Foot firmly planted on ground plane
    const frontFoot = new THREE.Group();
    frontFoot.position.set(0.34, -1.5, 0);
    shoulder.add(frontFoot);

    const padGeo = new THREE.SphereGeometry(0.2, 10, 10);
    padGeo.scale(1.3, 0.42, 1.1);
    const padMesh = new THREE.Mesh(padGeo, crimsonSkinMat);
    padMesh.position.set(0.08, 0.03, 0);
    frontFoot.add(padMesh);

    // 4 Talon Claws
    const clawOffsets = [-0.12, -0.04, 0.04, 0.12];
    clawOffsets.forEach((co) => {
      const cPoints = [
        new THREE.Vector3(0.16, 0.02, co),
        new THREE.Vector3(0.36, -0.01, co * 1.1),
        new THREE.Vector3(0.46, -0.04, co * 1.15),
      ];
      const clawGeo = createTaperedTube(cPoints, 0.06, 0.015, 10, 8);
      const clawMesh = new THREE.Mesh(clawGeo, talonMat);
      frontFoot.add(clawMesh);
    });

    return shoulder;
  };

  const forelegs = [createForeleg(0.52), createForeleg(-0.52)];

  // --- EXCEPTIONALLY DETAILED BIOLOGICAL DRAGON WINGS ---
  const wingsGroup = new THREE.Group();
  wingsGroup.position.set(0.25, 0.5, 0);
  chestGroup.add(wingsGroup);

  const createWing = (zSign) => {
    const wingRoot = new THREE.Group();
    wingRoot.position.set(0, 0, zSign * 0.42);
    wingRoot.rotation.set(zSign * 0.35, 0.2, -0.3);
    wingsGroup.add(wingRoot);

    // 1. Upper Wing Arm Bone (Humerus: Shoulder to Elbow)
    const humerusPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.16, 0.62, zSign * 0.1),
      new THREE.Vector3(-0.25, 1.1, zSign * 0.18),
    ];
    const humerusGeo = createTaperedTube(humerusPoints, 0.18, 0.14, 12, 10);
    const humerusMesh = new THREE.Mesh(humerusGeo, crimsonSkinMat);
    wingRoot.add(humerusMesh);

    // 2. Forearm Bone (Radius & Ulna: Elbow to Main Wrist Knuckle)
    const elbowPos = new THREE.Vector3(-0.25, 1.1, zSign * 0.18);
    const wristPos = new THREE.Vector3(-0.15, 2.05, zSign * 0.26);

    const forearmPoints = [
      elbowPos,
      new THREE.Vector3(-0.2, 1.58, zSign * 0.22),
      wristPos,
    ];
    const forearmGeo = createTaperedTube(forearmPoints, 0.14, 0.11, 14, 10);
    const forearmMesh = new THREE.Mesh(forearmGeo, crimsonSkinMat);
    wingRoot.add(forearmMesh);

    // 3. Articulated Wrist Knuckle & Alula / Thumb Claw
    const wristKnuckleGeo = new THREE.SphereGeometry(0.12, 10, 10);
    const wristKnuckleMesh = new THREE.Mesh(wristKnuckleGeo, moltenGoldMat);
    wristKnuckleMesh.position.copy(wristPos);
    wingRoot.add(wristKnuckleMesh);

    const thumbPoints = [
      wristPos,
      new THREE.Vector3(wristPos.x + 0.16, wristPos.y + 0.18, wristPos.z + zSign * 0.04),
    ];
    const thumbGeo = createTaperedTube(thumbPoints, 0.065, 0.015, 8, 6);
    const thumbMesh = new THREE.Mesh(thumbGeo, talonMat);
    wingRoot.add(thumbMesh);

    // 4. Four Distinct Structural Wing Finger Struts
    // Digit 1: Highest leading-edge finger
    const f1Points = [
      new THREE.Vector3(-0.6, 1.9, zSign * 0.32),
      new THREE.Vector3(-1.28, 1.7, zSign * 0.38),
    ];
    // Digit 2: Longest primary wingtip strut
    const f2Points = [
      new THREE.Vector3(-0.85, 1.52, zSign * 0.28),
      new THREE.Vector3(-1.75, 1.16, zSign * 0.30),
    ];
    // Digit 3: Secondary mid-wing strut
    const f3Points = [
      new THREE.Vector3(-0.95, 0.98, zSign * 0.22),
      new THREE.Vector3(-1.85, 0.54, zSign * 0.22),
    ];
    // Digit 4: Lower trailing-edge strut
    const f4Points = [
      new THREE.Vector3(-0.85, 0.42, zSign * 0.16),
      new THREE.Vector3(-1.55, -0.06, zSign * 0.14),
    ];

    const fingerList = [f1Points, f2Points, f3Points, f4Points];

    fingerList.forEach((fPts) => {
      const fullPoints = [wristPos, ...fPts];
      const fGeo = createTaperedTube(fullPoints, 0.09, 0.018, 16, 8);
      const fMesh = new THREE.Mesh(fGeo, moltenGoldMat);
      wingRoot.add(fMesh);
    });

    // 5. Five Seamless 3D Curved Scalloped Membrane Panels
    // Panel 1: Leading edge propatagium (Forearm to Digit 1)
    const p1Geo = createCurvedWingPanelGeometry(forearmPoints.slice(1), f1Points, wristPos, 12, 12, 0.14, 0.06, zSign);
    const p1Mesh = new THREE.Mesh(p1Geo, wingMembraneMat);
    wingRoot.add(p1Mesh);

    // Panel 2: Digit 1 to Digit 2
    const p2Geo = createCurvedWingPanelGeometry(f1Points, f2Points, wristPos, 14, 14, 0.26, 0.08, zSign);
    const p2Mesh = new THREE.Mesh(p2Geo, wingMembraneMat);
    wingRoot.add(p2Mesh);

    // Panel 3: Digit 2 to Digit 3
    const p3Geo = createCurvedWingPanelGeometry(f2Points, f3Points, wristPos, 14, 14, 0.24, 0.08, zSign);
    const p3Mesh = new THREE.Mesh(p3Geo, wingMembraneMat);
    wingRoot.add(p3Mesh);

    // Panel 4: Digit 3 to Digit 4
    const p4Geo = createCurvedWingPanelGeometry(f3Points, f4Points, wristPos, 14, 14, 0.22, 0.07, zSign);
    const p4Mesh = new THREE.Mesh(p4Geo, wingMembraneMat);
    wingRoot.add(p4Mesh);

    // Panel 5: Trailing edge postpatagium (Digit 4 to Torso flank)
    const torsoFlankPoints = [
      new THREE.Vector3(-0.4, 0.2, zSign * 0.1),
      new THREE.Vector3(-0.1, 0.05, 0),
    ];
    const p5Geo = createCurvedWingPanelGeometry(f4Points, torsoFlankPoints, wristPos, 12, 12, 0.18, 0.05, zSign);
    const p5Mesh = new THREE.Mesh(p5Geo, wingMembraneMat);
    wingRoot.add(p5Mesh);

    return wingRoot;
  };

  const leftWing = createWing(1);
  const rightWing = createWing(-1);

  // --- Articulated Serpentine Neck ---
  const neckBones = [];
  let parentNeck = chestGroup;
  const neckSegments = 3;

  for (let n = 0; n < neckSegments; n++) {
    const neckBone = new THREE.Group();
    neckBone.position.set(0.52, 0.4, 0);
    neckBone.rotation.z = 0.24;
    parentNeck.add(neckBone);
    neckBones.push(neckBone);

    const rStart = 0.52 - n * 0.06;
    const rEnd = 0.46 - n * 0.06;
    const nPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.26, 0.22, 0),
      new THREE.Vector3(0.52, 0.4, 0),
    ];
    const nGeo = createTaperedTube(nPoints, rStart, rEnd, 14, 10);
    const nMesh = new THREE.Mesh(nGeo, crimsonSkinMat);
    neckBone.add(nMesh);

    // Dorsal Gold Flame Crest on Neck
    const frillPoints = [
      new THREE.Vector3(0.22, 0.34, 0),
      new THREE.Vector3(0.12, 0.68 + n * 0.06, 0),
    ];
    const frillGeo = createTaperedTube(frillPoints, 0.08, 0.015, 10, 6);
    const frillMesh = new THREE.Mesh(frillGeo, moltenGoldMat);
    neckBone.add(frillMesh);

    parentNeck = neckBone;
  }

  // --- Sculpted Predatory Dragon Head ---
  const headGroup = new THREE.Group();
  headGroup.position.set(0.48, 0.38, 0);
  headGroup.rotation.z = -0.12;
  parentNeck.add(headGroup);

  // Cranium Skull
  const skullPoints = [
    new THREE.Vector3(-0.15, 0.05, 0),
    new THREE.Vector3(0.3, 0.08, 0),
    new THREE.Vector3(0.78, 0.05, 0),
  ];
  const skullGeo = createTaperedTube(skullPoints, 0.46, 0.28, 16, 12);
  const skullMesh = new THREE.Mesh(skullGeo, crimsonSkinMat);
  headGroup.add(skullMesh);

  // Predatory Upper Snout & Muzzle
  const snoutPoints = [
    new THREE.Vector3(0.72, 0.05, 0),
    new THREE.Vector3(1.02, 0.04, 0),
    new THREE.Vector3(1.24, 0.02, 0),
  ];
  const snoutGeo = createTaperedTube(snoutPoints, 0.26, 0.14, 14, 10);
  const snoutMesh = new THREE.Mesh(snoutGeo, crimsonSkinMat);
  headGroup.add(snoutMesh);

  // Upper Canines & Fangs
  for (let f = -1; f <= 1; f += 2) {
    const fPoints = [
      new THREE.Vector3(1.1, -0.02, f * 0.12),
      new THREE.Vector3(1.14, -0.2, f * 0.12),
    ];
    const fGeo = createTaperedTube(fPoints, 0.04, 0.01, 8, 6);
    const fMesh = new THREE.Mesh(fGeo, talonMat);
    headGroup.add(fMesh);
  }

  // Backward-Sweeping Grand Horns
  for (let hSide = -1; hSide <= 1; hSide += 2) {
    // Primary Grand Horn
    const hornPoints = [
      new THREE.Vector3(0.15, 0.28, hSide * 0.22),
      new THREE.Vector3(-0.35, 0.75, hSide * 0.38),
      new THREE.Vector3(-1.0, 1.05, hSide * 0.46),
      new THREE.Vector3(-1.55, 1.15, hSide * 0.48),
    ];
    const hornGeo = createTaperedTube(hornPoints, 0.15, 0.02, 22, 10);
    const hornMesh = new THREE.Mesh(hornGeo, moltenGoldMat);
    headGroup.add(hornMesh);

    // Secondary Brow Crest Horn
    const browPoints = [
      new THREE.Vector3(0.4, 0.22, hSide * 0.25),
      new THREE.Vector3(0.1, 0.5, hSide * 0.36),
      new THREE.Vector3(-0.25, 0.65, hSide * 0.42),
    ];
    const browGeo = createTaperedTube(browPoints, 0.07, 0.015, 14, 8);
    const browMesh = new THREE.Mesh(browGeo, moltenGoldMat);
    headGroup.add(browMesh);

    // Cheek Spine Horn
    const cheekPoints = [
      new THREE.Vector3(0.25, -0.05, hSide * 0.34),
      new THREE.Vector3(-0.06, 0.02, hSide * 0.5),
    ];
    const cheekGeo = createTaperedTube(cheekPoints, 0.06, 0.015, 10, 6);
    const cheekMesh = new THREE.Mesh(cheekGeo, moltenGoldMat);
    headGroup.add(cheekMesh);

    // Expressive Burning Gold Eye
    const eyeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    eyeGeo.scale(1.4, 0.95, 0.85);
    const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
    eyeMesh.position.set(0.5, 0.16, hSide * 0.22);
    headGroup.add(eyeMesh);

    // Cat-like Slit Pupil
    const pupilGeo = new THREE.BoxGeometry(0.02, 0.12, 0.04);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x110202 });
    const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
    pupilMesh.position.set(0.54, 0.16, hSide * 0.29);
    headGroup.add(pupilMesh);
  }

  // --- Articulated Hinged Lower Jaw ---
  const lowerJawGroup = new THREE.Group();
  lowerJawGroup.position.set(0.34, -0.08, 0);
  headGroup.add(lowerJawGroup);

  const jawPoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.36, -0.04, 0),
    new THREE.Vector3(0.82, -0.02, 0),
  ];
  const jawGeo = createTaperedTube(jawPoints, 0.22, 0.12, 14, 10);
  const jawMesh = new THREE.Mesh(jawGeo, crimsonSkinMat);
  lowerJawGroup.add(jawMesh);

  // Chin Horn Spike
  const chinPoints = [
    new THREE.Vector3(0.68, -0.06, 0),
    new THREE.Vector3(0.52, -0.25, 0),
  ];
  const chinGeo = createTaperedTube(chinPoints, 0.05, 0.015, 8, 6);
  const chinMesh = new THREE.Mesh(chinGeo, moltenGoldMat);
  lowerJawGroup.add(chinMesh);

  // Lower Fangs
  for (let f = -1; f <= 1; f += 2) {
    const lfPoints = [
      new THREE.Vector3(0.65, 0.02, f * 0.1),
      new THREE.Vector3(0.68, 0.16, f * 0.1),
    ];
    const lfGeo = createTaperedTube(lfPoints, 0.035, 0.01, 8, 6);
    const lfMesh = new THREE.Mesh(lfGeo, talonMat);
    lowerJawGroup.add(lfMesh);
  }

  // --- Internal Throat Light ---
  const throatGeo = new THREE.SphereGeometry(0.14, 10, 10);
  const throatMat = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });
  const throatMesh = new THREE.Mesh(throatGeo, throatMat);
  throatMesh.position.set(0.24, 0.02, 0);
  headGroup.add(throatMesh);

  // Dynamic Mouth Point Light
  const mouthLight = new THREE.PointLight(0xff6a00, 0.5, 6.0);
  mouthLight.position.set(0.85, 0.0, 0);
  headGroup.add(mouthLight);

  // Fire Emission Origin Point
  const mouthEmitterPoint = new THREE.Object3D();
  mouthEmitterPoint.position.set(1.15, -0.02, 0);
  headGroup.add(mouthEmitterPoint);

  return {
    root,
    mainRig,
    pelvis,
    chestGroup,
    wingsGroup,
    leftWing,
    rightWing,
    neckBones,
    headGroup,
    lowerJawGroup,
    tailSegments,
    mouthLight,
    mouthEmitterPoint,
    throatMesh,
    facingLeft,
    forelegs,
    rearLegs,
  };
}

// Alias for backwards compatibility
export const buildSleekSalamanderDragon = buildOrganicSalamanderDragon;
