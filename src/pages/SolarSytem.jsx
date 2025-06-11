import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import { useRef } from 'react';

function Planet({ size, distance, textureUrl, speed }) {
  const ref = useRef();
  const texture = useTexture(textureUrl);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = Math.cos(t) * distance;
    ref.current.position.z = Math.sin(t) * distance;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Sun() {
  const texture = useTexture('/sun.jpg');

  return (
    <mesh>
      <sphereGeometry args={[5, 64, 64]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default function SolarSystem() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 30, 50], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        <Sun />

        <Planet size={0.5} distance={8} textureUrl="/mercury.jpg" speed={1.6} />
        <Planet size={0.9} distance={11} textureUrl="/venus.jpg" speed={1.2} />
        <Planet size={1} distance={14} textureUrl="/earth.jpg" speed={1.0} />
        <Planet size={0.8} distance={17} textureUrl="/mars.jpg" speed={0.8} />
        <Planet size={2.5} distance={22} textureUrl="/jupiter.jpg" speed={0.5} />
        <Planet size={2} distance={28} textureUrl="/saturn.jpg" speed={0.4} />
        <Planet size={1.5} distance={34} textureUrl="/uranus.jpg" speed={0.3} />
        <Planet size={1.4} distance={40} textureUrl="/neptune.jpg" speed={0.2} />

        <OrbitControls enableZoom enablePan />
      </Canvas>
    </div>
  );
}
