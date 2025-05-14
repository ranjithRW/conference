import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'


const App = () => {
  return (
    <div>
      <Canvas className='w-full h-screen bg-transparent' camera={{ near: 0.1, far: 1000, fov: 75 }}>
        <Suspense fallback={null}>
          <directionalLight position={[0, 0, 5]} intensity={1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />
          <hemisphereLight
            color={0x404040} // soft white light
            groundColor={0x0000ff} // blue light
            intensity={0.5}
          />
           
        </Suspense>

      </Canvas>
    </div>
  )
}

export default App