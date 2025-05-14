// app.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // Import OrbitControls
import Conference from './model/Conference';

const App = () => {
  const adjustConferenceScreen = () => {
    let ConferenceScale, ConferencePosition;
    if (window.innerWidth < 768) {
      ConferenceScale = [0.01, 0.01, 0.01]; // Adjust scale for mobile
      ConferencePosition = [0, 0, 0]; // Adjust position for mobile
    }
    else if (window.innerWidth < 1024) {
      ConferenceScale = [0.02, 0.02, 0.02]; // Adjust scale for tablet
      ConferencePosition = [0, 0, 0]; // Adjust position for tablet
    } else {
      ConferenceScale = [0.03, 0.03, 0.03]; // Adjust scale for desktop
      ConferencePosition = [0, 0, 0]; // Adjust position for desktop
    }
    return { ConferenceScale, ConferencePosition };
  }
  const { ConferenceScale, ConferencePosition } = adjustConferenceScreen();
  return (
    <div className='w-full h-screen'>
      <Canvas className='w-full h-screen bg-transparent' camera={{ near: 0.1, far: 1000, position: [0, 2, 5] }}> {/* Adjust camera position for a better initial view */}
        <Suspense fallback={null}>
          <directionalLight position={[0, 10, 5]} intensity={0.8} /> {/* Move directional light up */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />
          <hemisphereLight
            color={0x404040} // soft white light
            groundColor={0x0000ff} // blue light
            intensity={0.3} // Reduce intensity for better balance
          />
          <Conference
            scale={ConferenceScale}
            position={ConferencePosition}
            rotation={[0, 0, 0]}
          />
          <OrbitControls


          /> {/* Add OrbitControls */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;