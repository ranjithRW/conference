// InfoBox.jsx
import React, { useRef, useEffect, useState } from 'react';
import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';

extend({ TextGeometry });

function InfoBox({ modelRef, boundingBox }) {
    const modelCenter = boundingBox.getCenter(new THREE.Vector3());
    const infoBoxYOffset = boundingBox.max.y + 0.5;
    const infoBoxScale = 0.5;

    const [font, setFont] = useState(null);
    const textGeometries = useRef([]);

    // Load the font asynchronously
    useEffect(() => {
        const loader = new FontLoader();
        loader.load(
            '/fonts/helvetiker_regular.typeface.json',
            (loadedFont) => setFont(loadedFont),
            undefined,
            (error) => {
                console.error('Font loading failed:', error);
            }
        );
    }, []);

    // Clean up text geometries on unmount
    useEffect(() => {
        return () => {
            textGeometries.current.forEach((geometry) => {
                if (geometry) geometry.dispose();
            });
            textGeometries.current = [];
        };
    }, []);

    if (!font) return null; // Don't render until font is loaded

    // Text values
    const name = "ergf"; // Replace with dynamic name
    const age = "65"; // Replace with dynamic age

    return (
        <group position={[modelCenter.x, infoBoxYOffset, modelCenter.z]}>
            {/* Background Box */}
            <mesh scale={[2 * infoBoxScale, 1.2 * infoBoxScale, 0.1 * infoBoxScale]} position={[0, 0, 0]}>
                <planeGeometry />
                <meshBasicMaterial color="white" opacity={0.75} transparent />
            </mesh>

            {/* Text for Name */}
            <mesh position={[0, 0.2, 0.1]} scale={[infoBoxScale, infoBoxScale, infoBoxScale]}>
                <textGeometry
                    args={[`Name: ${name}`, { font: font, size: 0.2, height: 0.01 }]}
                    ref={(ref) => {
                        if (ref) textGeometries.current.push(ref.geometry);
                    }}
                />
                <meshBasicMaterial color="black" />
            </mesh>

            {/* Text for Age */}
            <mesh position={[0, -0.1, 0.1]} scale={[infoBoxScale, infoBoxScale, infoBoxScale]}>
                <textGeometry
                    args={[`Age: ${age}`, { font: font, size: 0.2, height: 0.01 }]}
                    ref={(ref) => {
                        if (ref) textGeometries.current.push(ref.geometry);
                    }}
                />
                <meshBasicMaterial color="black" />
            </mesh>
        </group>
    );
}

export default InfoBox;
