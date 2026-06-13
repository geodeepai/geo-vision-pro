"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ── Earth mesh ─────────────────────────────────────────────────────────── */
function EarthMesh() {
  const earthRef  = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef   = useRef<THREE.Mesh>(null);

  const [colorMap, specMap, normalMap] = useTexture([
    "/earth-map.jpg",
    "/earth-spec.jpg",
    "/earth-normal.jpg",
  ]);

  useFrame((_, delta) => {
    if (earthRef.current)  earthRef.current.rotation.y  += delta * 0.06;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.075;
    if (glowRef.current)   glowRef.current.rotation.y   += delta * 0.06;
  });

  return (
    <group>
      {/* Earth surface */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 72, 72]} />
        <meshPhongMaterial
          map={colorMap}
          specularMap={specMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.6, 0.6)}
          specular={new THREE.Color(0x334466)}
          shininess={22}
        />
      </mesh>

      {/* Thin cloud / haze shell */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.008, 72, 72]} />
        <meshPhongMaterial
          color="#d0e8ff"
          transparent
          opacity={0.09}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.04, 72, 72]} />
        <meshPhongMaterial
          color="#4aa8ff"
          transparent
          opacity={0.055}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}

/* ── Fallback while textures load ───────────────────────────────────────── */
function EarthFallback() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshPhongMaterial color="#0d3880" emissive="#0a1a40" shininess={10} />
    </mesh>
  );
}

/* ── Scene ──────────────────────────────────────────────────────────────── */
export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      {/* Lighting — sun from upper-right, dim fill from left */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 2, 3]} intensity={2.2} color="#fff8f0" />
      <directionalLight position={[-4, -1, -2]} intensity={0.12} color="#0044aa" />
      <pointLight position={[0, 4, 2]} intensity={0.3} color="#88aaff" />

      <Suspense fallback={<EarthFallback />}>
        <EarthMesh />
        <Stars
          radius={90}
          depth={60}
          count={1200}
          factor={2.2}
          saturation={0}
          fade
          speed={0.3}
        />
      </Suspense>
    </Canvas>
  );
}
