import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ManModel from './ManModel';

function Scene({ resources = [] }) {
    const modelsPerRow = 10;
    const gapX = 2.5;
    const gapZ = 2.5;
  
    const models = resources.map((item, index) => {
      const row = Math.floor(index / modelsPerRow);
      const col = index % modelsPerRow;
      const position = [col * gapX, 0, row * gapZ];
  
      return (
        <Suspense fallback={null} key={index}>
          <ManModel position={position} modelName={item.resource} />
        </Suspense>
      );
    });
  
    return (
      <Canvas camera={{ position: [12, 10, 25], fov: 50 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Environment preset="sunset" />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[12, 0, 5]}>
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
        <OrbitControls />
        {models}
      </Canvas>
    );
  }
  

export default Scene;
