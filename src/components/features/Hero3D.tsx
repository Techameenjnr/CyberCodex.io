"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Network Node component
function NetworkNode({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
      <MeshDistortMaterial
        color="#00ff41"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

// Connection Lines component
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const points: number[] = [];
    const nodePositions: [number, number, number][] = [
      [0, 0, 0],
      [3, 2, 1],
      [-3, 1, -1],
      [2, -2, 2],
      [-2, -1, -2],
      [0, 3, 0],
    ];

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        points.push(...nodePositions[i], ...nodePositions[j]);
      }
    }

    return new Float32Array(points);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00d9ff" transparent opacity={0.3} />
    </lineSegments>
  );
}

// Main 3D Scene
function Scene() {
  const nodePositions: [number, number, number][] = [
    [0, 0, 0],
    [3, 2, 1],
    [-3, 1, -1],
    [2, -2, 2],
    [-2, -1, -2],
    [0, 3, 0],
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ff41" />

      {/* Network Nodes */}
      {nodePositions.map((pos, index) => (
        <NetworkNode key={index} position={pos} />
      ))}

      {/* Connection Lines */}
      <ConnectionLines />

      {/* Central Sphere */}
      <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00d9ff"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.6}
        />
      </Sphere>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Main Hero3D Component
export function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
