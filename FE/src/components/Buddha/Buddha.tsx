// import React, {
//   useRef,
//   useEffect,
//   Suspense,
//   useState,
//   useCallback,
//   useMemo,
// } from "react";
// import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import CylindricalStrings from "./CylindricalStrings";
// import LaoTzuPoem from "./LaoTzuPoem";
// import CylindricalGraph from "./CylindricalGraph";
// import { NeonShaderMaterial } from "./NeonShader";
// import { nasdaqIndicators } from "./nasdaqIndicators";
// import { hkChinaIndicators } from "./hkChinaIndicators";
// import { FBXLoader } from "three-stdlib";

// interface Indicators {
//   name: string;
//   price: number;
//   change: number;
//   changePercent: string;
// }

// const BuddhaModel = React.memo(
//   ({ position, rotationSpeed, scale = 0.1, isGolden, isNeon }) => {
//     const obj = useRef<THREE.Group>(null);
//     const object = useLoader(FBXLoader, "/quan+am+bo+tac.fbx");

//     // Memoize materials to avoid unnecessary recreation
//     const neonMaterial = useMemo(
//       () =>
//         NeonShaderMaterial(
//           new THREE.Color(0xffd700),
//           new THREE.Color(0x00ff00)
//         ),
//       []
//     );
//     const goldenMaterial = useMemo(
//       () =>
//         new THREE.MeshStandardMaterial({
//           emissive: new THREE.Color(0x005c3a),
//           emissiveIntensity: 1,
//           color: new THREE.Color(0xffd700),
//           metalness: 0.9,
//           roughness: 0.1,
//           opacity: 0.5,
//         }),
//       []
//     );
//     const blackMaterial = useMemo(
//       () =>
//         new THREE.MeshPhysicalMaterial({
//           color: new THREE.Color(0x000000),
//           metalness: 0.9,
//           roughness: 0.9,
//           opacity: 0.5,
//           clearcoat: 1.0,
//           clearcoatRoughness: 0.1,
//           reflectivity: 1.0,
//         }),
//       []
//     );

//     useEffect(() => {
//       if (obj.current) {
//         obj.current.position.set(...position);
//         obj.current.scale.set(scale, scale, scale);
//         obj.current.rotation.set(-Math.PI / 2, 0, 0);

//         obj.current.traverse((child: any) => {
//           if (child.isMesh) {
//             child.material = isNeon
//               ? neonMaterial
//               : isGolden
//                 ? goldenMaterial
//                 : blackMaterial;
//           }
//         });
//       }
//     }, [
//       isGolden,
//       isNeon,
//       scale,
//       position,
//       neonMaterial,
//       goldenMaterial,
//       blackMaterial,
//     ]);

//     useFrame((state, delta) => {
//       if (obj.current) {
//         obj.current.rotation.z += rotationSpeed;
//         if (obj.current.material instanceof THREE.ShaderMaterial) {
//           (obj.current.material as THREE.ShaderMaterial).uniforms.time.value +=
//             delta;
//         }
//       }
//     });

//     return <primitive ref={obj} object={object} />;
//   }
// );

// // Scene component
// const Scene = React.memo(
//   ({
//     lightIntensity,
//     rotationSpeed,
//     isGolden,
//     isNeon,
//   }: {
//     lightIntensity: number;
//     rotationSpeed: number;
//     isGolden: boolean;
//     isNeon: boolean;
//   }) => {
//     const { camera } = useThree();

//     useEffect(() => {
//       camera.position.set(0, 0, 70);
//       camera.lookAt(new THREE.Vector3(0, 0, 0));
//     }, [camera]);

//     return (
//       <>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 10]} intensity={lightIntensity} />
//         <pointLight position={[0, 5, 0]} intensity={1.0} color="white" />
//         <pointLight position={[0, -5, 0]} intensity={1.0} color="white" />
//         <Suspense fallback={null}>
//           <BuddhaModel
//             position={[0, 0, 0]}
//             rotationSpeed={rotationSpeed}
//             isGolden={isGolden}
//             isNeon={isNeon}
//             color={""}
//           />
//           <CylindricalGraph />
//         </Suspense>
//         <OrbitControls />
//       </>
//     );
//   }
// );

// // Main Buddha component
// const Buddha = () => {
//   const [lightIntensity] = useState(5);
//   const [rotationSpeed] = useState(0.01);
//   const [isGolden, setIsGolden] = useState(false);
//   const [isNeon, setIsNeon] = useState(false);
//   const [isNasdaq, setIsNasdaq] = useState(true);
//   const [indicatorsData, setIndicatorsData] = useState<Indicators[]>([]);

//   const toggleNeon = useCallback(() => setIsNeon((prev) => !prev), []);
//   const toggleMaterial = useCallback(() => setIsGolden((prev) => !prev), []);
//   const toggleIndicators = useCallback(() => setIsNasdaq((prev) => !prev), []);

//   const fetchIndicators = useCallback(async () => {
//     try {
//       const rawIndicators = isNasdaq ? nasdaqIndicators : hkChinaIndicators;
//       console.log("Fetched Indicators:", rawIndicators);
//       setIndicatorsData(rawIndicators);
//     } catch (error) {
//       console.error("Error loading indicators:", error);
//     }
//   }, [isNasdaq]);

//   useEffect(() => {
//     console.log("Fetching indicators, isNasdaq:", isNasdaq);
//     fetchIndicators();
//   }, [isNasdaq, fetchIndicators]);

//   return (
//     <div>
//       <CylindricalStrings indicatorsData={indicatorsData} />
//       <Canvas style={{ width: "100vw", height: "100vh", display: "block" }}>
//         <Scene
//           lightIntensity={lightIntensity}
//           rotationSpeed={rotationSpeed}
//           isGolden={isGolden}
//           isNeon={isNeon}
//         />
//       </Canvas>
//       <div className="controls">
//         <button className="button" onClick={toggleIndicators}>
//           {isNasdaq ? "HK-China" : "Nasdaq"}
//         </button>
//         <button className="button" onClick={toggleMaterial}>
//           {isGolden ? "Black" : "Jade"}
//         </button>
//         <br />
//         <button className="button" onClick={toggleNeon}>
//           氖
//         </button>
//       </div>
//       {isNeon && <LaoTzuPoem />}
//     </div>
//   );
// };

// export default Buddha;

// WITH PANNEL

import React, {
  useRef,
  useEffect,
  Suspense,
  useState,
  useCallback,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import CylindricalStrings from "./CylindricalStrings";
import LaoTzuPoem from "./LaoTzuPoem";
import CylindricalGraph from "./CylindricalGraph";
import { NeonShaderMaterial } from "./NeonShader";
import { nasdaqIndicators } from "./nasdaqIndicators";
import { hkChinaIndicators } from "./hkChinaIndicators";
import { FBXLoader } from "three-stdlib";

// Types and interfaces
type BuddhaModelProps = {
  position: [number, number, number];
  rotationSpeed: number;
  scale?: number;
};

interface Indicators {
  name: string;
  price: number;
  change: number;
  changePercent: string;
}

// BuddhaModel component
const BuddhaModel = React.memo(
  ({ position, rotationSpeed, scale = 0.1 }: BuddhaModelProps) => {
    const obj = useRef<THREE.Group>(null);
    const object = useLoader(FBXLoader, "/quan+am+bo+tac.fbx");

    useEffect(() => {
      if (obj.current) {
        obj.current.position.set(...position);
        obj.current.scale.set(scale, scale, scale);
        obj.current.rotation.set(-Math.PI / 2, 0, 0);
      }
    }, [scale]);

    useFrame((state, delta) => {
      if (obj.current) {
        obj.current.rotation.z += rotationSpeed;
      }
    });

    return <primitive ref={obj} object={object} />;
  }
);

// MaterialUpdater component
const MaterialUpdater = React.memo(({ isGolden, isNeon, isAds }) => {
  const { scene } = useThree();

  useEffect(() => {
    const neonMaterial = NeonShaderMaterial(
      new THREE.Color(0xffd700),
      new THREE.Color(0x00ff00)
    );

    const goldenMaterial = new THREE.MeshStandardMaterial({
      emissive: new THREE.Color(0x005c3a),
      emissiveIntensity: 1,
      color: new THREE.Color(0xffd700),
      metalness: 0.9,
      roughness: 0.1,
      opacity: 0.5,
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

    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = isNeon
          ? neonMaterial
          : isGolden
            ? goldenMaterial
            : blackMaterial;
      }
    });
  }, [isGolden, isNeon, scene, isAds]);

  return null;
});

// Scene component
const Scene = React.memo(
  ({
    lightIntensity,
    rotationSpeed,
    isGolden,
    isNeon,
    isAds,
  }: {
    lightIntensity: number;
    rotationSpeed: number;
    isGolden: boolean;
    isNeon: boolean;
    isAds: boolean;
  }) => {
    const { camera } = useThree();

    useEffect(() => {
      camera.position.set(60, 0, 70);
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
            scale={0.1}
          />
          {/* <CylindricalGraph isAds={isAds} /> */}
          <MaterialUpdater isGolden={isGolden} isNeon={isNeon} />
        </Suspense>
        <OrbitControls />
      </>
    );
  }
);

// Main Buddha component
const Buddha = () => {
  const [lightIntensity] = useState(5);
  const [rotationSpeed] = useState(0.01);
  const [isGolden, setIsGolden] = useState(false);
  const [isNeon, setIsNeon] = useState(false);
  const [isNasdaq, setIsNasdaq] = useState(true);
  const [indicatorsData, setIndicatorsData] = useState<Indicators[]>([]);
  const [isAds, setIsAds] = useState(true);

  const toggleNeon = useCallback(() => setIsNeon((prev) => !prev), []);
  const toggleMaterial = useCallback(() => setIsGolden((prev) => !prev), []);
  const toggleIndicators = useCallback(() => setIsNasdaq((prev) => !prev), []);
  const toggleAds = useCallback(() => setIsAds((prev) => !prev), []);

  const fetchIndicators = useCallback(async () => {
    try {
      const rawIndicators = isNasdaq ? nasdaqIndicators : hkChinaIndicators;
      console.log("Fetched Indicators:", rawIndicators);
      setIndicatorsData(rawIndicators);
    } catch (error) {
      console.error("Error loading indicators:", error);
    }
  }, [isNasdaq]);

  useEffect(() => {
    console.log("Fetching indicators, isNasdaq:", isNasdaq);
    fetchIndicators();
  }, [isNasdaq, fetchIndicators]);

  return (
    <div>
      <CylindricalStrings indicatorsData={indicatorsData} />
      <Canvas style={{ width: "100vw", height: "100vh", display: "block" }}>
        <Scene
          lightIntensity={lightIntensity}
          rotationSpeed={rotationSpeed}
          isGolden={isGolden}
          isNeon={isNeon}
          isAds={isAds} // Pass isAds to Scene
        />
      </Canvas>
      <div className="controls">
        <div className="controls">
          <button className="button" onClick={toggleIndicators}>
            {isNasdaq ? "HK-China" : "Nasdaq"}
          </button>
          <button className="button" onClick={toggleMaterial}>
            {isGolden ? "Black" : "Jade"}
          </button>
          <br />
          <button className="button" onClick={toggleNeon}>
            氖
          </button>
          {/* <button className="button" onClick={toggleAds}>
            {isAds ? "Premium No Ads Free Trial" : "Enable Ads"}
          </button> */}
        </div>
      </div>
      {isNeon && <LaoTzuPoem />}
    </div>
  );
};

export default Buddha;
