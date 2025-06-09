import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

function Earth({ scrollY }) {
  const earthRef = useRef();

  const texture = useTexture(
    "https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/earthmap1k.jpg"
  );

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y = scrollY.current * 0.005;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function EarthScene() {
  const scrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      scrollY.current = window.scrollY;
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ height: "300vh", position: "relative" }}>
      {/* Fixed container for Earth */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          zIndex: 1,
        }}
      >
        <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Earth scrollY={scrollY} />
        </Canvas>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          marginTop: "100vh",
          color: "white",
          padding: "2rem",
          zIndex: 2,
          position: "relative",
          textAlign: "center",
        }}
      >
        <h1>Scroll down to rotate the Earth 🌍</h1>
        <p>Keep scrolling to see it rotate!</p>
        <div style={{ height: "150vh" }}></div>
        <p>End of content</p>
      </div>
    </div>
  );
}
