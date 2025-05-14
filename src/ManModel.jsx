import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import InfoBox from './InfoBox';
import { Text } from '@react-three/drei';

function ManModel({ position = [0, 0, 0], modelName = "Person" }) {
    const modelRef = useRef();
    const [isClicked, setIsClicked] = useState(false);

    const { scene } = useGLTF('/man.glb');

    const boundingBox = new THREE.Box3().setFromObject(scene);
    const modelHeight = boundingBox.max.y - boundingBox.min.y;
    const labelYOffset = modelHeight + 0.3;

    return (
        <group
            ref={modelRef}
            position={position}
            onClick={() => setIsClicked(!isClicked)}
            castShadow
        >
            <primitive object={scene} scale={0.8} receiveShadow />

            {!isClicked && (
                <Text
                    position={[0, labelYOffset, 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    Hi, {modelName}
                </Text>
            )}

            {isClicked && (
                <InfoBox modelRef={modelRef} boundingBox={boundingBox} />
            )}
        </group>
    );
}


export default ManModel;
