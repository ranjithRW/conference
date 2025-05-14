import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ManModel from './ManModel';
import { Text } from '@react-three/drei'; // Import Text

function Scene({ resources = [] }) {
    const modelsPerRow = 10;
    const gapX = 2.5;
    const gapZ = 2.5;

    const models = resources.map((resource, index) => {
        const row = Math.floor(index / modelsPerRow);
        const col = index % modelsPerRow;
        const position = [col * gapX, 0, row * gapZ];

        return (
            <Suspense fallback={<Text position={position} fontSize={0.5}>Loading....</Text>} key={index}>
                <ManModel position={position} resource={resource} />
            </Suspense>
        );
    });

    return (
        <Canvas camera={{ position: [12, 10, 25], fov: 50 }} shadows>
            
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />  {/*Added shadow config*/}
            <Environment preset="sunset" />
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[12, 0, 5]}>
                <planeGeometry args={[50, 50]} />
                <shadowMaterial opacity={0.2} />
            </mesh>
            <ManModel position={[0, 0, 0]} resource={{ resource: 'Click on a model to see details' }} /> {/* Placeholder for the first model */}
            <OrbitControls />
            {models}
        </Canvas>
    );
}

export default Scene;
