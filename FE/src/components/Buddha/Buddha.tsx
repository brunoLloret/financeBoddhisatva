import React, { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import CylindricalStrings from "./CylindricalStrings";
import LaoTzuPoem from "./LaoTzuPoem";
import CylindricalGraph from "./CylindricalGraph";
import "../../global.css";

type BuddhaModelProps = {
  position: [number, number, number];
  rotationSpeed: number;
  scale?: number;
  isGolden: boolean;
  isNeon: boolean;
  color: string;
};

const BuddhaModel = ({
  position,
  rotationSpeed,
  scale = 0.1,
  isGolden,
  isNeon,
}: BuddhaModelProps) => {
  const obj = useRef<THREE.Group>(null);
  const object = useLoader(FBXLoader, "/quan+am+bo+tac.fbx");

  useEffect(() => {
    if (obj.current) {
      obj.current.position.set(position[0], position[0], position[0]);
      obj.current.scale.set(0.15, 0.15, 0.15);
      obj.current.rotation.set(-Math.PI / 2, 0, 0);

      const goldenMaterial = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0x005c3a),
        emissiveIntensity: 1,
        color: new THREE.Color(0xffd700),
        metalness: 0.9,
        roughness: 0.1,
        opacity: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
      });

      const blackMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x000000),
        metalness: 0.9,
        roughness: 0.9,
        opacity: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
      });

      const neonMaterial = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0x00ff00), // Neon green color
        emissiveIntensity: 1.5, // Increased emissive intensity for glow effect
        color: new THREE.Color(0x00ff00),
        metalness: 0.5,
        roughness: 0.3,
        opacity: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.5,
      });

      obj.current.traverse((child: any) => {
        if (child.isMesh) {
          child.material = isNeon
            ? neonMaterial
            : isGolden
              ? goldenMaterial
              : new THREE.MeshPhysicalMaterial({
                  color: new THREE.Color(0x000000),
                  metalness: 0.9,
                  roughness: 0.9,
                  opacity: 0.5,
                  clearcoat: 1.0,
                  clearcoatRoughness: 0.1,
                  reflectivity: 1.0,
                });
        }
      });
    }
  }, [isGolden, isNeon]);

  useFrame(() => {
    if (obj.current) {
      obj.current.rotation.z += rotationSpeed;
    }
  });

  return <primitive ref={obj} object={object} />;
};

const Scene = ({
  lightIntensity,
  rotationSpeed,
  isGolden,
  isNeon,
}: {
  lightIntensity: number;
  rotationSpeed: number;
  isGolden: boolean;
  isNeon: boolean;
}) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={lightIntensity} />
      <pointLight position={[0, 5, 0]} intensity={1.0} color="white" />
      <pointLight position={[0, -5, 0]} intensity={1.0} color="white" />
      <Suspense fallback={null}>
        <BuddhaModel
          position={[0, 0, 0]}
          rotationSpeed={rotationSpeed}
          isGolden={isGolden}
          isNeon={isNeon}
          color={""}
        />
        <CylindricalGraph />
      </Suspense>
      <OrbitControls />
    </>
  );
};

const Buddha = () => {
  const [lightIntensity, setLightIntensity] = useState(5);
  const [rotationSpeed, setRotationSpeed] = useState(0.0005);
  const [isGolden, setIsGolden] = useState(false);
  const [isNeon, setIsNeon] = useState(false);

  const toggleNeon = () => setIsNeon((prev) => !prev);
  const toggleMaterial = () => setIsGolden((prev) => !prev);

  return (
    <div>
      <CylindricalStrings />
      <Canvas
        style={{
          width: "100vw", // Full viewport width
          height: "100vh", // Full viewport height
          display: "block",
        }}
      >
        <Scene
          lightIntensity={lightIntensity}
          rotationSpeed={rotationSpeed}
          isGolden={isGolden}
          isNeon={isNeon} // Pass the neon state here
        />
      </Canvas>
      <div className="controls">
        <label htmlFor="lightIntensity">Light Intensity: </label>
        <input
          id="lightIntensity"
          type="range"
          min="3"
          max="20"
          step="6"
          value={lightIntensity}
          onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
        />
        <br />
        <label htmlFor="rotationSpeed">Rotation Speed: </label>
        <input
          id="rotationSpeed"
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={rotationSpeed}
          onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
        />
        <br />
        <button className="button" onClick={toggleMaterial}>
          {isGolden ? "Switch to Black" : "Switch to Golden"}
        </button>
        <br />
        <button className="button" onClick={toggleNeon}>
          Toggle Neon Effect
        </button>
        <div>
          <p>Light Intensity: {lightIntensity}</p>
          <p>Rotation Speed: {rotationSpeed}</p>
        </div>
      </div>
      {isNeon && <LaoTzuPoem />}
    </div>
  );
};

export default Buddha;
