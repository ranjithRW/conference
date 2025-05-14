import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import InfoBox from './InfoBox';
import { Text } from '@react-three/drei';

function ManModel({ position = [0, 0, 0], resource }) { // Now receives the entire resource object
    const modelRef = useRef();
    const [isClicked, setIsClicked] = useState(false);
    const { scene } = useGLTF('/man.glb');

    const boundingBox = new THREE.Box3().setFromObject(scene);
    const modelHeight = boundingBox.max.y - boundingBox.min.y;
    const labelYOffset = modelHeight + 0.3;

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <group
            ref={modelRef}
            position={position}
            onClick={handleClick}
            castShadow
        >
            <primitive object={scene} scale={2} receiveShadow />

            {!isClicked && resource && (  // Add check for resource
                <Text
                    position={[0, labelYOffset, 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    {"sudhip"}
                </Text>
            )}

            {isClicked && resource && ( // Add check for resource
                <InfoBox modelRef={modelRef} boundingBox={boundingBox} resourceData={resource} /> // Pass the resource data
            )}
        </group>
    );
}

export default ManModel;