import * as THREE from "three";

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment Shader
const fragmentShader = `
  varying vec2 vUv;

  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;

  void main() {
    float glow = abs(sin(time + vUv.y * 10.0)) * 0.5 + 0.5;
    vec3 color = mix(color1, color2, glow);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const NeonShaderMaterial = (
  color1: THREE.Color,
  color2: THREE.Color
) => {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0.0 },
      color1: { value: color1 },
      color2: { value: color2 },
    },
    side: THREE.FrontSide,
    transparent: false,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
};
