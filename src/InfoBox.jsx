// infobox.jsx
import React, { useRef, useEffect, useState } from 'react';
import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';

extend({ TextGeometry });

function InfoBox({ modelRef, boundingBox, resourceData }) { // Receive resourceData
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

    // Use the resourceData to display the information
    const bandwidth =" 0.36" // Handle potential undefined values
    const closingRate = "71.2"
    const openIssues = "25"
    const closedIssues = "62"
    const delayedIssueCount = "5"

    return (
        <group position={[modelCenter.x, infoBoxYOffset, modelCenter.z]}>
            {/* Background Box */}
            <mesh scale={[6 * infoBoxScale, 4.5 * infoBoxScale, 0.1 * infoBoxScale]} position={[0, 1.4, 0]}>
                <planeGeometry />
                <meshBasicMaterial color="white" opacity={0.75} transparent />
            </mesh>

            {/* Text for Bandwidth */}
            <mesh position={[-1, 2, 0]} scale={[infoBoxScale, infoBoxScale, 0.001]}>
                <textGeometry
                    args={[`Bandwidth: ${bandwidth}`, { font: font, size: 0.4, height: 0.001 }]}
                    ref={(ref) => {
                        if (ref) textGeometries.current.push(ref.geometry);
                    }}
                />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Text for Closing Rate */}
            <mesh position={[-1, 1.7, 0.01]} scale={[infoBoxScale, infoBoxScale, 0.001]}>
                <textGeometry
                    args={[`Closing Rate: ${closingRate}`, { font: font, size: 0.4, height: 0.001 }]}
                    ref={(ref) => {
                        if (ref) textGeometries.current.push(ref.geometry);
                    }}
                />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Text for Open Issues */}
            <mesh position={[-1, 1.4, 0.01]} scale={[infoBoxScale, infoBoxScale, 0.001]}>
                <textGeometry
                    args={[`Open Issues: ${openIssues}`, { font: font, size: 0.4, height: 0.001 }]}
                    ref={(ref) => {
                        if (ref) textGeometries.current.push(ref.geometry);
                    }}
                />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Text for Closed Issues */}
            <mesh position={[-1, 1.1, 0.01]} scale={[infoBoxScale, infoBoxScale, 0.001]}>
                <textGeometry
                    args={[`Closed Issues: ${closedIssues}`, { font: font, size: 0.4, height: 0.001 }]}
                    ref={(ref) => {
                        if (ref) textGeometries.current.push(ref.geometry);
                    }}
                />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Text for Delayed Issues */}
            <mesh position={[-1, 0.7, 0.01]} scale={[infoBoxScale, infoBoxScale, 0.001]}>
                <textGeometry
                    args={[`Delayed Issues: ${delayedIssueCount}`, { font: font, size: 0.4, height: 0.001 }]}
                    ref={(ref) => {
                        if (ref) textGeometries.current.push(ref.geometry);
                    }}
                />
                <meshStandardMaterial color="black" />
            </mesh>
        </group>
    );
}

export default InfoBox;