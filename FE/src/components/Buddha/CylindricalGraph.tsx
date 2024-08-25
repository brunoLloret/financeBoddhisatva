// TV VERSION
// import React, { useRef, useMemo, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// // Import images
// import image1 from "../../../public/folders/Hong-Kong-Baptist-University.png";
// import image2 from "../../../public/folders/greyhound-lines-logo-bus-product-design-greyhound-silhouette.jpg";
// import image3 from "../../../public/folders/png-transparent-nestle-logo-nestle-logo-nestle-ghana-ltd-nestle-blue-angle-building-thumbnail.png";
// import image4 from "../../../public/folders/png-transparent-singapore-business-retail-logo-organization-business-angle-text-service-thumbnail.png";

// const images = [image1, image2, image3, image4];

// const CylindricalGraph = () => {
//   const cylinderRef = useRef<THREE.Mesh>(null);
//   const textureRef = useRef<THREE.CanvasTexture | null>(null);
//   const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

//   // Adjust radius and height to make the cylinder larger
//   const radius = 20;
//   const height = 10;

//   const texture = useMemo(() => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     const imageWidth = 512; // Set to actual image width
//     const imageHeight = 256; // Set to actual image height

//     canvas.width = imageWidth * images.length;
//     canvas.height = imageHeight;

//     const loadImage = (src: string) => {
//       return new Promise<HTMLImageElement>((resolve) => {
//         const img = new Image();
//         img.src = src;
//         img.onload = () => resolve(img);
//       });
//     };

//     Promise.all(images.map(loadImage)).then((loadedImages) => {
//       loadedImages.forEach((img, index) => {
//         ctx?.drawImage(img, imageWidth * index, 0, imageWidth, imageHeight);
//       });
//       if (textureRef.current) {
//         textureRef.current.needsUpdate = true;
//       }
//     });

//     const combinedTexture = new THREE.CanvasTexture(canvas);
//     combinedTexture.wrapS = THREE.RepeatWrapping;
//     combinedTexture.wrapT = THREE.ClampToEdgeWrapping;
//     combinedTexture.repeat.set(1, 1); // Don't repeat the texture

//     textureRef.current = combinedTexture;
//     return combinedTexture;
//   }, []);

//   const customShader = useMemo(() => {
//     return {
//       uniforms: {
//         map: { value: texture },
//         time: { value: 0 },
//         noiseIntensity: { value: 0.1 },
//         grainIntensity: { value: 0.1 },
//         haloColor: { value: new THREE.Color(0x00ff00) }, // Fluorescent green
//         haloIntensity: { value: 0.2 },
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform sampler2D map;
//         uniform float time;
//         uniform float noiseIntensity;
//         uniform float grainIntensity;
//         uniform vec3 haloColor;
//         uniform float haloIntensity;
//         varying vec2 vUv;

//         // Random function
//         float random(vec2 st) {
//           return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
//         }

//         void main() {
//           vec2 uv = vUv;

//           // Apply noise
//           float noise = random(uv + time * 0.1) * 2.0 - 1.0;
//           uv += noise * noiseIntensity;

//           // Sample texture
//           vec4 texColor = texture2D(map, uv);

//           // Apply grain
//           float grain = random(gl_FragCoord.xy * time) * grainIntensity;
//           texColor.rgb += grain;

//           // Add halo effect
//           float distance = length(vUv - 0.5);
//           float halo = 1.0 - smoothstep(0.4, 0.5, distance);
//           texColor.rgb += haloColor * halo * haloIntensity;

//           // Occasional glitch effect
//           if (random(vec2(time)) > 0.99) {
//             texColor.rgb = vec3(1.0) - texColor.rgb; // Invert colors
//           }

//           gl_FragColor = texColor;
//         }
//       `,
//     };
//   }, [texture]);

//   useFrame(({ clock }) => {
//     if (cylinderRef.current) {
//       cylinderRef.current.rotation.y += 0.001;
//     }
//     if (shaderMaterialRef.current) {
//       shaderMaterialRef.current.uniforms.time.value = clock.getElapsedTime();
//     }
//   });

//   return (
//     <mesh ref={cylinderRef} position={[0, 0, 0]}>
//       <cylinderGeometry args={[radius, radius, height, 64]} />
//       <shaderMaterial
//         ref={shaderMaterialRef}
//         args={[customShader]}
//         side={THREE.DoubleSide}
//         transparent={true}
//       />
//     </mesh>
//   );
// };

// export default CylindricalGraph;

// CLEAN VERSION IMAGE

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Import images
// import image1 from "../../../public/folders/Hong-Kong-Baptist-University.png";
// import image2 from "../../../public/folders/greyhound-lines-logo-bus-product-design-greyhound-silhouette.jpg";
// import image3 from "../../../public/folders/png-transparent-nestle-logo-nestle-logo-nestle-ghana-ltd-nestle-blue-angle-building-thumbnail.png";
// import image4 from "../../../public/folders/png-transparent-singapore-business-retail-logo-organization-business-angle-text-service-thumbnail.png";
import image1 from "../../../public/folders/20210212_十一世班禅向海内外藏族同胞送上新年祝福.02.07-removebg-preview.png";
import image2 from "../../../public/folders/20210212_十一世班禅向海内外藏族同胞送上新年祝福.02.07-removebg-preview.png";
import image3 from "../../../public/folders/20210212_十一世班禅向海内外藏族同胞送上新年祝福.02.07-removebg-preview.png";
import image4 from "../../../public/folders/20210212_十一世班禅向海内外藏族同胞送上新年祝福.02.07-removebg-preview.png";
import image5 from "../../../public/folders/20210212_十一世班禅向海内外藏族同胞送上新年祝福.02.07-removebg-preview.png";
import { useState } from "react";

const images = [image1, image2, image3, image4, image5];

const CylindricalGraph = ({ isAds }) => {
  const cylinderRef = useRef<THREE.Mesh>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

  const [isAdsOn, setIsAdsOn] = useState(false);
  const radius = 25;
  const height = 10;

  useEffect(() => {
    setIsAdsOn(isAds);
  }, [isAds]);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const imageWidth = 512; // Set to actual image width
    const imageHeight = 256; // Set to actual image height

    canvas.width = imageWidth * images.length;
    canvas.height = imageHeight;

    if (isAdsOn) {
      const loadImageSync = (
        src: string,
        onLoad: (img: HTMLImageElement) => void
      ) => {
        const img = new Image();
        img.src = src;
        img.onload = () => onLoad(img);
      };

      const preloadedImages: HTMLImageElement[] = [];

      images.forEach((src, index) => {
        loadImageSync(src, (img) => {
          preloadedImages[index] = img;
          // Optionally check if all images are loaded before drawing
          if (preloadedImages.length === images.length) {
            preloadedImages.forEach((img, index) => {
              ctx?.drawImage(
                img,
                imageWidth * index,
                0,
                imageWidth,
                imageHeight
              );
            });
            if (textureRef.current) {
              textureRef.current.needsUpdate = true;
            }
          }
        });
      });
    }

    //PROMISE OF IMAGE
    // const loadImage = (src: string) => {
    //   return new Promise<HTMLImageElement>((resolve) => {
    //     const img = new Image();
    //     img.src = src;
    //     img.onload = () => resolve(img);
    //   });
    // };

    // Promise.all(images.map(loadImage)).then((loadedImages) => {
    //   loadedImages.forEach((img, index) => {
    //     ctx?.drawImage(img, imageWidth * index, 0, imageWidth, imageHeight);
    //   });
    //   if (textureRef.current) {
    //     textureRef.current.needsUpdate = true;
    //   }
    // });

    const combinedTexture = new THREE.CanvasTexture(canvas);
    combinedTexture.wrapS = THREE.RepeatWrapping;
    combinedTexture.wrapT = THREE.ClampToEdgeWrapping;
    combinedTexture.repeat.set(1, 1);

    textureRef.current = combinedTexture;
    return combinedTexture;
  }, []);

  const customShader = useMemo(() => {
    return {
      uniforms: {
        map: { value: texture },
        time: { value: 0 },
        noiseIntensity: { value: 0.1 },
        grainIntensity: { value: 0.1 },
        haloColor: { value: new THREE.Color(0x00ff00) }, // Fluorescent green
        haloIntensity: { value: 0.2 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float time;
        uniform float noiseIntensity;
        uniform float grainIntensity;
        uniform vec3 haloColor;
        uniform float haloIntensity;
        varying vec2 vUv;

        // Random function
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        void main() {
          vec2 uv = vUv;

          // Apply noise
          float noise = random(uv + time * 0.1) * 2.0 - 1.0;
          uv += noise * noiseIntensity;

          // Sample texture
          vec4 texColor = texture2D(map, uv);

          // Apply grain
          float grain = random(gl_FragCoord.xy * time) * grainIntensity;
          texColor.rgb += grain;

          // Add halo effect
          float distance = length(vUv - 0.5);
          float halo = 1.0 - smoothstep(0.4, 0.5, distance);
          texColor.rgb += haloColor * halo * haloIntensity;

          // Occasional glitch effect
          if (random(vec2(time)) > 0.99) {
            texColor.rgb = vec3(1.0) - texColor.rgb; // Invert colors
          }

          gl_FragColor = texColor;
        }
      `,
    };
  }, []);
  // const customShader = useMemo(() => {
  //   return {
  //     uniforms: {
  //       map: { value: texture },
  //       time: { value: 0 },
  //       grainIntensity: { value: 0.05 },
  //       haloColor: { value: new THREE.Color(0x00ff00) },
  //       haloIntensity: { value: 0.1 },
  //     },
  //     vertexShader: `
  //       varying vec2 vUv;
  //       void main() {
  //         vUv = uv;
  //         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  //       }
  //     `,
  //     fragmentShader: `
  //       uniform sampler2D map;
  //       uniform float time;
  //       uniform float grainIntensity;
  //       uniform vec3 haloColor;
  //       uniform float haloIntensity;
  //       varying vec2 vUv;

  //       float random(vec2 st) {
  //         return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  //       }

  //       void main() {
  //         // Sample texture (image)
  //         vec4 texColor = texture2D(map, vUv);

  //         // Apply subtle grain
  //         float grain = random(gl_FragCoord.xy * time) * grainIntensity;
  //         texColor.rgb = mix(texColor.rgb, vec3(grain), 0.05);

  //         // Add subtle halo effect
  //         float distance = length(vUv - vec2(0.5, 0.5));
  //         float halo = 1.0 - smoothstep(0.4, 0.5, distance);
  //         texColor.rgb += haloColor * halo * haloIntensity;

  //         gl_FragColor = texColor;
  //       }
  //     `,
  //   };
  // }, [texture]);

  useFrame(({ clock }) => {
    if (cylinderRef.current) {
      cylinderRef.current.rotation.y += 0.001;
    }
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={cylinderRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[radius, radius, height, 64]} />
      <shaderMaterial
        ref={shaderMaterialRef}
        args={[customShader]}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
};

export default CylindricalGraph;
