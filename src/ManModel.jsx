// ManModel.jsx
import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import InfoBox from './InfoBox';
import { Text } from '@react-three/drei';

function ManModel() {
    const modelRef = useRef();
    const [isClicked, setIsClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const { scene } = useGLTF('/man.glb');

    const handleClick = () => setIsClicked(!isClicked);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const boundingBox = new THREE.Box3().setFromObject(scene);
    const modelHeight = boundingBox.max.y - boundingBox.min.y;
    const labelYOffset = modelHeight + 0.3; // Show above head

    const modelName = "ergf"; // Replace with dynamic name if needed

    return (
        <group
            ref={modelRef}
            position={[0, 0, 0]}
            onClick={handleClick}
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
            castShadow
        >
            <primitive object={scene} scale={0.8} receiveShadow />

            {/* Always show "Hi, ergf" above the model */}
            <Text
                position={[0, labelYOffset, 0]}
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                Hi, {modelName}
            </Text>

            {/* InfoBox appears when clicked */}
            {isClicked && (
                <InfoBox modelRef={modelRef} boundingBox={boundingBox} />
            )}
        </group>
    );
}

export default ManModel;
