import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'; // Import OrbitControls
import ManModel from './ManModel';

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 5] }} // Initial camera position
      shadows //Enable shadow rendering
    >
      {/*   <color attach="background" args={['#f0f0f0']} />  */}  {/* Optional: Set background color */}
      {/*  <ambientLight intensity={0.5} />*/}
      <directionalLight position={[1, 2, 3]} intensity={1} castShadow />
      <Environment preset="sunset" /> {/* Use an environment map for lighting */}
      <OrbitControls /> {/* Add OrbitControls for easy scene navigation */}
      <Suspense fallback={null}> {/* Show nothing until ready */}
        <ManModel />
      </Suspense>
    </Canvas>
  );
}

export default Scene;