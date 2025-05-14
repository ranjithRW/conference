import React, { useRef, useState } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import InfoBox from './InfoBox';

function ManModel() {
    const modelRef = useRef();
    const [isClicked, setIsClicked] = useState(false); // State for the info box
    const [isHovered, setIsHovered] = useState(false); // State for hover effect (optional)

    const { scene } = useGLTF('/man.glb'); // Path to your GLB file
    const [hiTexture] = useTexture(['/hi.png']);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Calculate the bounding box to get the model's size
    const boundingBox = new THREE.Box3().setFromObject(scene);
    const modelHeight = boundingBox.max.y - boundingBox.min.y;
    const modelWidth = boundingBox.max.x - boundingBox.min.x;

    // Adjust the label position and size as needed, adjust the scales
    const labelScale = 0.2;
    const labelYOffset = modelHeight / 2 + 0.2;

    return (
        <group ref={modelRef} position={[0, 0, 0]}
               onClick={handleClick}
               onPointerEnter={handleMouseEnter}
               onPointerLeave={handleMouseLeave}
               castShadow
        >
            <primitive object={scene} scale={0.8}  receiveShadow  /> {/* Render the loaded model */}
            {/* "Hi" Tag using Plane Geometry and Texture*/}
            <mesh position={[0, labelYOffset, 0]} scale={[labelScale, labelScale * (hiTexture.image.height / hiTexture.image.width), labelScale]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={hiTexture} transparent={true} opacity={isHovered ? 1 : 0.8}  />
            </mesh>
            {/* InfoBox - conditionally rendered */}
            {isClicked && (
                // <InfoBox modelRef={modelRef} boundingBox={boundingBox} />
                <InfoBox modelRef={modelRef} boundingBox={boundingBox} />
            )}
        </group>
    );
}

export default ManModel;