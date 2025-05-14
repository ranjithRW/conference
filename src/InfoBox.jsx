import React, { useRef, useMemo, useEffect } from 'react';
import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three'; // Import Three.js for Vector3

extend({ TextGeometry });

function InfoBox({ modelRef, boundingBox }) {
  const modelCenter = boundingBox.getCenter(new THREE.Vector3());
  const infoBoxYOffset = boundingBox.max.y + 0.5;
  const infoBoxScale = 0.5;
  const font = useMemo(() => {
    const loader = new FontLoader();
    try {
      return loader.load('/fonts/helvetiker_regular.typeface.json'); // Replace with your font path
    } catch (error) {
      console.error("Font loading error:", error);
      return null; // or a default font, or don't render the text
    }
  }, []);

  const textGeometries = useRef([]);

  useEffect(() => {
    return () => {
      // Clean up geometries on unmount
      textGeometries.current.forEach((geometry) => {
        if (geometry) geometry.dispose();
      });
      textGeometries.current = [];
    };
  }, []);


  return (
    font && ( // Conditionally render the entire info box *only* if the font loaded
      <group position={[modelCenter.x, infoBoxYOffset, modelCenter.z]}>
        <mesh scale={[2 * infoBoxScale, 1 * infoBoxScale, 0.1 * infoBoxScale]} position={[0, 0, 0]}>
          <planeGeometry />
          <meshBasicMaterial color="white" opacity={0.75} transparent />
        </mesh>

        {font && ( // Conditionally render text *only* if the font loaded
          <mesh position={[0, 0, 0.1]} scale={[infoBoxScale, infoBoxScale, infoBoxScale]}>
            <textGeometry
              args={['Name: ergf', { font: font, size: 0.2, height: 0.01 }]}
              ref={(ref) => {
                if (ref) {
                  textGeometries.current.push(ref.geometry);
                }
              }}
            />
            <meshBasicMaterial color="black" />
          </mesh>
        )}

        {font && ( // Conditionally render text *only* if the font loaded
          <mesh position={[0, -0.3, 0.1]} scale={[infoBoxScale, infoBoxScale, infoBoxScale]}>
            <textGeometry
              args={['Age: 65', { font: font, size: 0.2, height: 0.01 }]}
              ref={(ref) => {
                if (ref) {
                  textGeometries.current.push(ref.geometry);
                }
              }}
            />
            <meshBasicMaterial color="black" />
          </mesh>
        )}
      </group>
    )
  );
}

export default InfoBox;