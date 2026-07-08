"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 850;

// Computed once at module load (not during render) so nothing impure ever
// runs inside the component's render phase.
function buildParticleData() {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const col = new Float32Array(PARTICLE_COUNT * 3);
  const signal = new THREE.Color("#e8aa4c");
  const violet = new THREE.Color("#6a63f6");
  const teal = new THREE.Color("#52d1c4");

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    // flattened field: wide on x/y, shallow on z so it reads as depth, not a globe
    pos[i3] = (Math.random() - 0.5) * 16;
    pos[i3 + 1] = (Math.random() - 0.5) * 10;
    pos[i3 + 2] = (Math.random() - 0.5) * 8 - 2;

    const roll = Math.random();
    const c = roll > 0.85 ? signal : roll > 0.7 ? teal : violet;
    col[i3] = c.r;
    col[i3 + 1] = c.g;
    col[i3 + 2] = c.b;
  }
  return [pos, col] as const;
}

const [PARTICLE_POSITIONS, PARTICLE_COLORS] = buildParticleData();

function ParticleField() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const positions = PARTICLE_POSITIONS;
  const colors = PARTICLE_COLORS;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.025;

    // subtle mouse parallax — never more than a couple of degrees
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.02;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.02;
    groupRef.current.rotation.x = pointer.current.y * 0.08;
    groupRef.current.rotation.y += pointer.current.x * 0.0004;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      className="!absolute inset-0"
    >
      <ParticleField />
    </Canvas>
  );
}

export default HeroScene;
