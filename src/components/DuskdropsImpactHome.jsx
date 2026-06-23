"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ---------- Paleta real de marca, en orden de amanecer a noche ---------- */
const SKY_STOPS = [
  [255, 250, 247], // Ivory
  [251, 243, 236], // Apricot
  [240, 217, 196], // Peach
  [212, 149, 106], // Sunset
  [155, 107, 138], // Lavender
  [40, 36, 46],    // Night
];

const ORB_STOPS = [
  [247, 197, 139], // dorado de amanecer
  [240, 178, 122], // dorado pleno
  [212, 149, 106], // sunset
  [176, 110, 150], // dusk, vira a violeta
  [139, 84, 158],  // morado pleno — el aro nocturno
];

const COLLECTIONS = [
  { name: "Earthen", sub: "Lifestyle & Wellness", accent: "#6B7C45", signature: "contours" },
  { name: "Scholar", sub: "Dark Academia", accent: "#3E2B1F", signature: "typewriter" },
  { name: "Velvet", sub: "Feminine Lifestyle", accent: "#9B6B8A", signature: "blob" },
  { name: "Drift", sub: "Travel & Coastal", accent: "#5C7A6E", signature: "horizon" },
  { name: "Signal", sub: "Tech & Productivity", accent: "#28242E", signature: "radar" },
  { name: "Studio", sub: "Art & Creative", accent: "#D4956A", signature: "brush" },
  { name: "Garden", sub: "Cottagecore", accent: "#9B6B8A", signature: "petals" },
];

const STAR_COUNT = 55;
function makeStars() {
  return Array.from({ length: STAR_COUNT }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2.2,
    delay: +(Math.random() * 6).toFixed(2),
    duration: +(3 + Math.random() * 4).toFixed(2),
  }));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function sampleStops(stops, progress) {
  const segs = stops.length - 1;
  const p = Math.min(Math.max(progress, 0), 1) * segs;
  const idx = Math.min(Math.floor(p), segs - 1);
  const t = p - idx;
  const a = stops[idx];
  const b = stops[idx + 1];
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function rgbToCss([r, g, b]) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function rgbToHexInt([r, g, b]) {
  return (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b);
}

/* ---------- Texturas pintadas en canvas: sol cálido, en los tonos de marca ---------- */
function buildSunTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const base = ctx.createRadialGradient(
    size * 0.42,
    size * 0.4,
    size * 0.05,
    size * 0.5,
    size * 0.5,
    size * 0.62
  );
  base.addColorStop(0, "#FCE3B8");
  base.addColorStop(0.45, "#F7C58B");
  base.addColorStop(0.78, "#E29D63");
  base.addColorStop(1, "#C4714A");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 6 + Math.random() * 26;
    const flare = ctx.createRadialGradient(x, y, 0, x, y, r);
    flare.addColorStop(0, "rgba(255,228,180,0.22)");
    flare.addColorStop(1, "rgba(255,228,180,0)");
    ctx.fillStyle = flare;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "multiply";
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 4 + Math.random() * 14;
    const spot = ctx.createRadialGradient(x, y, 0, x, y, r);
    spot.addColorStop(0, "rgba(196,113,74,0.28)");
    spot.addColorStop(1, "rgba(196,113,74,0)");
    ctx.fillStyle = spot;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";
  return canvas;
}

/* ---------- Textura de luna: cráteres suaves en lavanda/noche de marca ---------- */
function buildMoonTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const base = ctx.createRadialGradient(
    size * 0.4,
    size * 0.38,
    size * 0.05,
    size * 0.5,
    size * 0.5,
    size * 0.62
  );
  base.addColorStop(0, "#F6F5F8");
  base.addColorStop(0.5, "#CBC9D2");
  base.addColorStop(0.8, "#8F8C97");
  base.addColorStop(1, "#56535C");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  // mares lunares: parches grandes e irregulares, gris neutro (no morado)
  ctx.globalCompositeOperation = "multiply";
  for (let i = 0; i < 6; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 50 + Math.random() * 90;
    const maria = ctx.createRadialGradient(x, y, 0, x, y, r);
    maria.addColorStop(0, "rgba(58,56,64,0.32)");
    maria.addColorStop(1, "rgba(58,56,64,0)");
    ctx.fillStyle = maria;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // cráteres: sombra + borde claro, como relieve real
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 3 + Math.random() * 16;

    ctx.globalCompositeOperation = "multiply";
    const shadow = ctx.createRadialGradient(
      x + r * 0.15,
      y + r * 0.15,
      0,
      x,
      y,
      r
    );
    shadow.addColorStop(0, "rgba(48,46,54,0.4)");
    shadow.addColorStop(0.7, "rgba(48,46,54,0.15)");
    shadow.addColorStop(1, "rgba(48,46,54,0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "lighter";
    const rim = ctx.createRadialGradient(
      x - r * 0.2,
      y - r * 0.2,
      0,
      x,
      y,
      r * 0.9
    );
    rim.addColorStop(0, "rgba(255,255,255,0.12)");
    rim.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = rim;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";
  return canvas;
}

/* ---------- Firma visual propia de cada colección, sobre el mismo fondo ---------- */
function CollectionSignature({ type, accent }) {
  const wrap = { position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" };

  if (type === "contours") {
    return (
      <div className="sig-breathe" style={wrap}>
        <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <path d="M100,18 C150,18 178,55 176,100 C174,148 140,182 98,180 C56,178 24,144 26,98 C28,54 58,18 100,18 Z" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
          <path d="M100,42 C136,42 158,68 156,100 C154,134 130,158 98,156 C66,154 42,130 44,98 C46,68 66,42 100,42 Z" fill="none" stroke={accent} strokeWidth="1" opacity="0.42" />
          <path d="M100,64 C124,64 140,80 138,100 C136,122 120,138 98,136 C76,134 60,118 62,98 C64,80 78,64 100,64 Z" fill="none" stroke={accent} strokeWidth="1" opacity="0.55" />
        </svg>
      </div>
    );
  }

  if (type === "typewriter") {
    return (
      <div style={wrap}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 23px, ${accent} 24px, transparent 25px)`,
            opacity: 0.16,
          }}
        />
      </div>
    );
  }

  if (type === "blob") {
    return (
      <div className="sig-blob" style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 200 200" width="80%" height="80%">
          <path
            d="M52,30 C84,8 142,18 162,56 C182,94 168,142 130,166 C92,190 40,180 22,142 C4,104 20,52 52,30 Z"
            fill={accent}
            opacity="0.2"
          />
        </svg>
      </div>
    );
  }

  if (type === "horizon") {
    return (
      <div style={{ ...wrap, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <div className="sig-wave-track" style={{ display: "flex", width: 400, height: 26 }}>
          <svg viewBox="0 0 200 26" width="200" height="26" preserveAspectRatio="none">
            <path d="M0,14 C20,4 40,24 60,14 C80,4 100,24 120,14 C140,4 160,24 180,14 C190,9 195,11 200,14 L200,26 L0,26 Z" fill={accent} opacity="0.26" />
          </svg>
          <svg viewBox="0 0 200 26" width="200" height="26" preserveAspectRatio="none">
            <path d="M0,14 C20,4 40,24 60,14 C80,4 100,24 120,14 C140,4 160,24 180,14 C190,9 195,11 200,14 L200,26 L0,26 Z" fill={accent} opacity="0.26" />
          </svg>
        </div>
      </div>
    );
  }

  if (type === "radar") {
    return (
      <div style={wrap}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${accent} 1px, transparent 1.5px)`,
            backgroundSize: "16px 16px",
            opacity: 0.2,
          }}
        />
        <div
          className="sig-radar-spin"
          style={{
            position: "absolute",
            inset: 0,
            background: `conic-gradient(from 0deg, transparent 0deg, ${accent} 10deg, transparent 50deg)`,
            opacity: 0.32,
          }}
        />
      </div>
    );
  }

  if (type === "brush") {
    return (
      <div style={wrap}>
        <svg
          viewBox="0 0 220 80"
          width="100%"
          height="80"
          preserveAspectRatio="none"
          style={{ position: "absolute", top: "38%" }}
        >
          <path
            className="sig-brush-path"
            d="M6,40 C40,12 70,64 110,38 C150,12 178,58 214,34"
            fill="none"
            stroke={accent}
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.22"
            pathLength="1"
          />
        </svg>
      </div>
    );
  }

  if (type === "petals") {
    const dots = [
      { x: 14, y: 20, s: 7, d: 0 },
      { x: 78, y: 10, s: 5, d: 0.6 },
      { x: 88, y: 60, s: 9, d: 1.1 },
      { x: 30, y: 72, s: 6, d: 1.6 },
      { x: 55, y: 42, s: 4, d: 2.1 },
      { x: 8, y: 56, s: 5, d: 0.3 },
    ];
    return (
      <div style={wrap}>
        {dots.map((p, idx) => (
          <span
            key={idx}
            className="sig-float"
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              borderRadius: "50% 0 50% 50%",
              background: accent,
              opacity: 0.32,
              animationDelay: `${p.d}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

function TypedTitle({ text, active, style }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, 75);
    return () => clearInterval(id);
  }, [active, text]);

  return (
    <h2 style={style}>
      {text.slice(0, count)}
      {active && count < text.length && <span className="sig-caret">|</span>}
    </h2>
  );
}

function ParticleVisual({ shape, size, color, char, displayFont }) {
  if (shape === "contours") {
    return (
      <span
        style={{
          display: "block",
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${Math.max(1, size * 0.14)}px solid ${color}`,
        }}
      />
    );
  }
  if (shape === "typewriter") {
    return (
      <span
        style={{
          display: "block",
          fontFamily: displayFont,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: size,
          lineHeight: 1,
          color,
        }}
      >
        {char}
      </span>
    );
  }
  if (shape === "blob") {
    return (
      <span
        style={{
          display: "block",
          width: size,
          height: size * 0.86,
          background: color,
          borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
        }}
      />
    );
  }
  if (shape === "horizon") {
    return (
      <span
        style={{
          display: "block",
          width: size * 0.8,
          height: size * 0.8,
          borderRadius: "50%",
          background: color,
        }}
      />
    );
  }
  if (shape === "radar") {
    return (
      <span
        style={{
          display: "block",
          width: size * 0.7,
          height: size * 0.7,
          background: color,
          borderRadius: 2,
        }}
      />
    );
  }
  if (shape === "brush") {
    return (
      <span
        style={{
          display: "block",
          width: size * 1.3,
          height: size * 0.5,
          background: color,
          borderRadius: "50%",
        }}
      />
    );
  }
  if (shape === "petals") {
    return (
      <span
        style={{
          display: "block",
          width: size,
          height: size * 0.85,
          background: color,
          borderRadius: "50% 0 50% 50%",
        }}
      />
    );
  }
  return (
    <span
      style={{
        display: "block",
        width: size,
        height: size,
        background: color,
        borderRadius: "50%",
      }}
    />
  );
}

const SCHOLAR_CHARS = ["a", "t", "&", "§", "Q"];

export default function DuskdropsImpactHome() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const progressRef = useRef(0);
  const sparkleRef = useRef(null);
  const cardRefs = useRef([]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState(() => new Set());
  const [starParticles, setStarParticles] = useState([]);
  const [skyStars] = useState(makeStars);
  const starIdRef = useRef(0);

  const spawnSignatureRain = (clientX, clientY, shape, accent) => {
    const count = 14;

    const newParticles = Array.from({ length: count }).map(() => {
      starIdRef.current += 1;
      const dx = Math.round((Math.random() - 0.5) * 170);
      const dy = Math.round(190 + Math.random() * 230);
      const dur = +(0.9 + Math.random() * 0.7).toFixed(2);
      const delay = +(Math.random() * 0.28).toFixed(2);
      const size =
        shape === "typewriter" ? 16 + Math.random() * 12 : 8 + Math.random() * 10;
      const rot = Math.round((Math.random() - 0.5) * 260);
      return {
        id: starIdRef.current,
        startX: clientX + (Math.random() - 0.5) * 100,
        startY: clientY - 8 - Math.random() * 30,
        dx,
        dy,
        dur,
        delay,
        size,
        rot,
        shape,
        color: accent,
        peakOpacity: 0.55 + Math.random() * 0.4,
        char:
          shape === "typewriter"
            ? SCHOLAR_CHARS[Math.floor(Math.random() * SCHOLAR_CHARS.length)]
            : null,
      };
    });

    setStarParticles((prev) => [...prev, ...newParticles]);
    const lifespans = newParticles.map((s) => s.dur + s.delay);
    const maxLife = Math.max(...lifespans) * 1000 + 150;
    const ids = new Set(newParticles.map((s) => s.id));
    setTimeout(() => {
      setStarParticles((prev) => prev.filter((s) => !ids.has(s.id)));
    }, maxLife);
  };

  /* ---------- Three.js: el "drop" de luz que recorre el cielo ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const geometry = new THREE.SphereGeometry(1, 48, 48);
    const sunTexture = new THREE.CanvasTexture(buildSunTexture());
    const moonTexture = new THREE.CanvasTexture(buildMoonTexture());
    sunTexture.encoding = THREE.sRGBEncoding;
    moonTexture.encoding = THREE.sRGBEncoding;

    const orbGroup = new THREE.Object3D();
    scene.add(orbGroup);

    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: 0xe29d63,
      emissiveIntensity: 0.35,
      roughness: 0.6,
      metalness: 0.05,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    });
    const sunMesh = new THREE.Mesh(geometry, sunMaterial);
    sunMesh.renderOrder = 2;
    orbGroup.add(sunMesh);

    const moonGeometry = new THREE.SphereGeometry(0.985, 48, 48);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      emissive: 0xb9b6c4,
      emissiveIntensity: 0.18,
      roughness: 0.45,
      metalness: 0.3,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonMesh.renderOrder = 3;
    orbGroup.add(moonMesh);

    // aro morado — un anillo real, no solo un halo difuso, que aparece con la luna
    const ringGeometry = new THREE.TorusGeometry(1.45, 0.05, 16, 96);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x9b6b8a,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = 0.22;
    ring.renderOrder = 4;
    orbGroup.add(ring);

    const glowGeoA = new THREE.SphereGeometry(1.5, 32, 32);
    const glowMatA = new THREE.MeshBasicMaterial({
      color: 0xf7c58b,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowA = new THREE.Mesh(glowGeoA, glowMatA);
    glowA.renderOrder = 1;
    orbGroup.add(glowA);

    const glowGeoB = new THREE.SphereGeometry(2.3, 32, 32);
    const glowMatB = new THREE.MeshBasicMaterial({
      color: 0xf7c58b,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowB = new THREE.Mesh(glowGeoB, glowMatB);
    glowB.renderOrder = 0;
    orbGroup.add(glowB);

    const pointLight = new THREE.PointLight(0xffffff, 1.3, 50);
    pointLight.position.set(2, 2, 6);
    scene.add(pointLight);
    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);

    let frameId;
    const animate = () => {
      const progress = progressRef.current;
      const eased = easeInOutCubic(progress);

      const topY = 3.4;
      const bottomY = -3.6;
      orbGroup.position.y = lerp(topY, bottomY, eased);

      const arcX = Math.sin(progress * Math.PI) * 1.1;
      const mouseInfluence = mouseRef.current.x * 0.7;
      orbGroup.position.x = arcX + mouseInfluence;

      // crossfade: sol puro hasta 0.4, luna pura desde 0.8, fundido entre medias
      const moonFactor = Math.min(
        Math.max((progress - 0.4) / 0.4, 0),
        1
      );
      sunMaterial.opacity = 1 - moonFactor;
      moonMaterial.opacity = moonFactor;
      ringMaterial.opacity = moonFactor * 0.6;
      ring.rotation.z += 0.0015;

      const orbRgb = sampleStops(ORB_STOPS, progress);
      const orbHex = rgbToHexInt(orbRgb);
      glowMatA.color.setHex(orbHex);
      glowMatB.color.setHex(orbHex);

      orbGroup.rotation.y += 0.0022;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      moonGeometry.dispose();
      sunMaterial.dispose();
      moonMaterial.dispose();
      sunTexture.dispose();
      moonTexture.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      glowGeoA.dispose();
      glowMatA.dispose();
      glowGeoB.dispose();
      glowMatB.dispose();
      renderer.dispose();
    };
  }, []);

  /* ---------- Scroll: progreso 0→1 que mueve el cielo y el drop ---------- */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? window.scrollY / scrollable : 0;
      const clamped = Math.min(Math.max(p, 0), 1);
      progressRef.current = clamped;
      setScrollProgress(clamped);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- Cursor: la chispa ✦ que persigue al ratón (solo desktop) ---------- */
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current = { x, y };
      if (sparkleRef.current) {
        sparkleRef.current.style.transform = `translate(${e.clientX - 14}px, ${
          e.clientY - 14
        }px)`;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* ---------- Las tarjetas "caen" cuando entran en pantalla ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setVisibleCards((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.35 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const skyRgb = sampleStops(SKY_STOPS, scrollProgress);
  const skyCss = rgbToCss(skyRgb);
  const vignetteCss = rgbToCss(skyRgb.map((c) => c * 0.45));
  const isDark = scrollProgress > 0.68;
  const textColor = isDark ? "#FBF3EC" : "#28242E";
  const mutedColor = isDark ? "rgba(251,243,236,0.7)" : "rgba(40,36,46,0.65)";

  return (
    <div
      style={{
        background: skyCss,
        color: textColor,
        minHeight: "100vh",
        fontFamily: "var(--font-body)",
        transition: "color 0.6s ease, font-family 0.3s ease",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        .ddrop-card {
          opacity: 0;
          transform: translateY(-36px) scale(0.96);
          transition: opacity 0.85s cubic-bezier(.34,1.56,.64,1),
                      transform 0.85s cubic-bezier(.34,1.56,.64,1);
        }
        .ddrop-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .ddrop-sparkle {
          position: fixed;
          top: 0;
          left: 0;
          font-size: 22px;
          pointer-events: none;
          z-index: 40;
          will-change: transform;
        }
        @media (pointer: coarse) {
          .ddrop-sparkle { display: none; }
        }
        @keyframes ddrop-star-fall {
          0% { opacity: 0; transform: translate(0, 0) scale(0.5) rotate(0deg); }
          16% { opacity: var(--peak-op, 1); }
          100% {
            opacity: 0;
            transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--rot));
          }
        }
        .ddrop-star-particle {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 45;
          animation: ddrop-star-fall var(--dur) ease-in forwards;
          animation-delay: var(--delay);
          will-change: transform, opacity;
        }
        .ddrop-card {
          cursor: pointer;
        }
        @keyframes sig-breathe {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(1.035); opacity: 1; }
        }
        .sig-breathe { animation: sig-breathe 7s ease-in-out infinite; transform-origin: center; }

        @keyframes sig-radar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sig-radar-spin { animation: sig-radar-spin 4.5s linear infinite; transform-origin: center; }

        @keyframes sig-wave-track {
          from { transform: translateX(0); }
          to { transform: translateX(-200px); }
        }
        .sig-wave-track { animation: sig-wave-track 6s linear infinite; }

        @keyframes sig-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .sig-float { animation: sig-float 5.5s ease-in-out infinite; }

        .sig-blob svg path {
          transition: transform 1.1s ease;
          transform-box: fill-box;
          transform-origin: center;
        }
        .ddrop-card:hover .sig-blob svg path { transform: scale(1.08); }

        .sig-brush-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 1.1s ease 0.15s;
        }
        .ddrop-card.visible .sig-brush-path { stroke-dashoffset: 0; }

        @keyframes sig-caret-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .sig-caret { animation: sig-caret-blink 0.9s steps(1) infinite; margin-left: 2px; }

        @keyframes sig-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .sig-twinkle { animation: sig-twinkle 4s ease-in-out infinite; }

        @keyframes ddrop-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ddrop-hero-mark {
          animation: ddrop-rise 1s cubic-bezier(.22,1,.36,1) both;
          animation-delay: 0.1s;
        }
        .ddrop-hero-title {
          animation: ddrop-rise 1.1s cubic-bezier(.22,1,.36,1) both;
          animation-delay: 0.32s;
        }
        .ddrop-hero-tagline {
          animation: ddrop-rise 1.1s cubic-bezier(.22,1,.36,1) both;
          animation-delay: 0.55s;
        }
        .ddrop-hero-hint {
          animation: ddrop-rise 1.1s cubic-bezier(.22,1,.36,1) both;
          animation-delay: 0.8s;
        }
      `}</style>

      {/* Estrellas — solo se revelan al acercarse la noche */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: Math.min(1, Math.max(0, (scrollProgress - 0.55) / 0.35)),
        }}
      >
        {skyStars.map((st) => (
          <span
            key={st.id}
            className="sig-twinkle"
            style={{
              position: "absolute",
              left: `${st.left}%`,
              top: `${st.top}%`,
              width: st.size,
              height: st.size,
              borderRadius: "50%",
              background: "#FBF3EC",
              boxShadow: "0 0 4px rgba(251,243,236,0.75)",
              animationDelay: `${st.delay}s`,
              animationDuration: `${st.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Canvas 3D fijo, detrás del contenido, no scrollea con la página */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Chispa que sigue al cursor — más visible cuanto más cae la noche */}
      <div
        ref={sparkleRef}
        className="ddrop-sparkle"
        style={{
          color: "#FBF3EC",
          textShadow: "0 0 12px rgba(251,243,236,0.9)",
          opacity: 0.15 + scrollProgress * 0.75,
        }}
      >
        ✦
      </div>

      {/* Lluvia al clicar — la forma cambia según la estética de cada colección */}
      {starParticles.map((s) => (
        <span
          key={s.id}
          className="ddrop-star-particle"
          style={{
            left: s.startX,
            top: s.startY,
            "--dx": `${s.dx}px`,
            "--dy": `${s.dy}px`,
            "--rot": `${s.rot}deg`,
            "--dur": `${s.dur}s`,
            "--delay": `${s.delay}s`,
            "--peak-op": s.peakOpacity,
          }}
        >
          <ParticleVisual
            shape={s.shape}
            size={s.size}
            color={s.color}
            char={s.char}
            displayFont="var(--font-display)"
          />
        </span>
      ))}

      {/* ---------- Hero ---------- */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <div className="ddrop-hero-mark" style={{ fontSize: 28, marginBottom: 18, opacity: 0.85 }}>✦</div>
        <h1
          className="ddrop-hero-title"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(40px, 11vw, 76px)",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Duskdrops
        </h1>
        <p
          className="ddrop-hero-tagline"
          style={{
            marginTop: 16,
            fontSize: "clamp(14px, 3.6vw, 17px)",
            letterSpacing: "0.04em",
            color: mutedColor,
          }}
        >
          Creative drops for bold brands
        </p>
        <p
          className="ddrop-hero-hint"
          style={{
            marginTop: 40,
            fontSize: 13,
            color: mutedColor,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          desliza para ver caer la luz ↓
        </p>
      </section>

      {/* ---------- Colecciones: cada una cae en su franja de luz ---------- */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {COLLECTIONS.map((c, i) => (
          <section
            key={c.name}
            ref={(el) => (cardRefs.current[i] = el)}
            data-index={i}
            style={{
              minHeight: "58vh",
              display: "flex",
              alignItems: "center",
              justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
              padding: "0 24px",
            }}
          >
            <div
              className={`ddrop-card${visibleCards.has(i) ? " visible" : ""}`}
              onClick={(e) => spawnSignatureRain(e.clientX, e.clientY, c.signature, c.accent)}
              style={{
                maxWidth: 340,
                padding: "28px 26px",
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                background: isDark
                  ? "rgba(251,243,236,0.06)"
                  : "rgba(40,36,46,0.05)",
                border: `1px solid ${
                  isDark ? "rgba(251,243,236,0.18)" : "rgba(40,36,46,0.12)"
                }`,
                backdropFilter: "blur(2px)",
              }}
            >
              <CollectionSignature type={c.signature} accent={c.accent} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: c.accent,
                    marginBottom: 14,
                  }}
                />
                {c.signature === "typewriter" ? (
                  <TypedTitle
                    text={c.name}
                    active={visibleCards.has(i)}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 32,
                      margin: 0,
                      minHeight: 40,
                    }}
                  />
                ) : (
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 32,
                      margin: 0,
                    }}
                  >
                    {c.name}
                  </h2>
                )}
                <p style={{ marginTop: 8, fontSize: 14, color: mutedColor }}>
                  {c.sub}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ---------- Cierre: noche cerrada ---------- */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <div style={{ fontSize: 22, opacity: 0.8, marginBottom: 14 }}>✦</div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(22px, 5.5vw, 30px)",
            maxWidth: 420,
            color: textColor,
          }}
        >
          Siete colecciones. Un solo atardecer.
        </p>
      </section>

      {/* Viñeta — luz que cae en los bordes, con el tono exacto del cielo actual */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 49,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at center, transparent 52%, ${vignetteCss} 145%)`,
          opacity: 0.32,
        }}
      />

      {/* Grano fílmico + trama de tejido — visible tanto en tonos claros como oscuros */}
      <svg style={{ position: "fixed", width: 0, height: 0 }}>
        <filter id="ddropGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" />
        </filter>
      </svg>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: "none",
          filter: "url(#ddropGrain)",
          opacity: 0.075,
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 3px),
            repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)`,
        }}
      />
    </div>
  );
}
