// src/components/StarBackground.jsx
import React from 'react';
import Particles from 'react-tsparticles';
import { loadStarsPreset } from 'tsparticles-preset-stars';
import Earth from './Earth'
const StarBackground = () => {
  const particlesInit = async (main) => {
    await loadStarsPreset(main);
  };

  return (
    <>
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'stars',
        fullScreen: { enable: true },
        background: { color: '#000' }
      }}
      />
      <Earth />
      </>
  );
};

export default StarBackground;
