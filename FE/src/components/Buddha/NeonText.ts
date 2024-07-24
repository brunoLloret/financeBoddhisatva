import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';
import { TextGeometry, Font } from 'three-stdlib'; // Import Font from three-stdlib
import { FontLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

const NeonText = () => {
    const ref = useRef<Mesh>(null);
    const [font, setFont] = useState<Font | null>(null); // Use Font from three-stdlib
    const color = new THREE.Color(0x00ff00); // Neon green color

    // Load font
    useEffect(() => {
        new FontLoader().load('/path/to/font.json', (loadedFont) => {
            setFont(loadedFont);
        });
    }, []);

    return (
        <mesh ref= { ref } position = { [0, 0, 0]} >
            { font && (
                <TextGeometry args={ ['LaoTzu Poem', { font, size: 1, height: 0.1 }] } />
      )}
<meshBasicMaterial
        attach="material"
color = { color }
emissive = { color }
emissiveIntensity = { 1}
    />
    </mesh>
  );
};

export default NeonText;
