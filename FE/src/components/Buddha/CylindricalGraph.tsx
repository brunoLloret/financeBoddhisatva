import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const CylindricalGraph = () => {
  const cylinderRef = useRef<THREE.Mesh>(null);

  // Example data
  const data = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  // Adjust radius and height to make the cylinder larger
  const radius = 20;
  const height = 10;

  // Create geometry and material
  const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
  const material = new THREE.MeshBasicMaterial({
    color: "green",
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load("/path-to-gradient-texture.png"), // Use a gradient texture for vanishing effect
  });

  useFrame(() => {
    if (cylinderRef.current) {
      cylinderRef.current.rotation.y += 0.001; // Optional rotation
    }
  });

  return (
    <mesh ref={cylinderRef} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <cylinderGeometry args={[radius, radius, height, 32]} />
      <meshBasicMaterial
        attach="material"
        color="green"
        opacity={0.5}
        transparent={true}
        side={THREE.DoubleSide}
        map={new THREE.TextureLoader().load("/path-to-gradient-texture.png")}
      />
    </mesh>
  );
};

export default CylindricalGraph;
