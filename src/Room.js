import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from 'three-stdlib';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

extend({ OrbitControls });

// const randomPosition = (size) => (Math.random() - 0.5) * size;

const Box = ({ position }) => {
  const mesh = useRef();

  return (
    <mesh position={position} ref={mesh} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#8B4513'} />
    </mesh>
  );
};

const Table = ({ position }) => {
  const mesh = useRef();
  const texture = useLoader(TextureLoader, 'textures/wood_table.jpg');

  return (
    <mesh position={position} ref={mesh} castShadow>
      <mesh position={[0,1,0]}>
      <boxGeometry args={[2, 0.1, 2]} />
      <meshStandardMaterial map={texture} />
      </mesh>
      {/* Table Legs */}
      <mesh position={[0.95, 0.0, 0.95]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[-0.95, 0.0, 0.95]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[-0.95, 0.0, -0.95]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[0.95, 0.0, -0.95]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </mesh>
  );
};


const Chair = ({ position }) => {
  const mesh = useRef();
  const texture = useLoader(TextureLoader, 'textures/fabric_chair.jpg');

  return (
    <mesh position={position} ref={mesh} castShadow>
      {/* chair top */}
      <mesh position={[0.2,0,-0.20]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial map={texture} />
      </mesh>
      {/* chair legs */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[0.35, -0.55, 0]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[0, -0.55, -0.35]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[0.35, -0.55, -0.35]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </mesh>
  );
};

const Almirah = ({ position }) => {
  const mesh = useRef();
  const texture = useLoader(TextureLoader, 'textures/wood_table.jpg'); // Reusing the wood texture

  return (
    <mesh position={position} ref={mesh} castShadow>
      <boxGeometry args={[2, 3, 0.5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Sofa = ({ position }) => {
  const mesh = useRef();
  const texture = useLoader(TextureLoader, 'textures/fabric_chair.jpg');

  return (
    <mesh position={position} ref={mesh} castShadow>
      <mesh position={[0,0,0]}>
      <boxGeometry args={[2, 0.5, 1]} />
      <meshStandardMaterial map={texture} />
      </mesh>
    </mesh>
  );
};

const Bed = ({ position }) => {
  const mesh = useRef();
  const texture = useLoader(TextureLoader, 'textures/bed_sheet.jpg');

  return (
    <mesh position={position} ref={mesh} castShadow>
      <mesh position={[0,0.5,0]}>
      <boxGeometry args={[2, 0.4, 1.5]} />
      <meshStandardMaterial map={texture} />
      </mesh>
      {/* Bed Legs */}
      <mesh position={[0.9, 0.1, 0.7]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[-0.9, 0.1, 0.7]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[-0.9, 0.1, -0.7]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[0.9, 0.1, -0.7]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </mesh>
  );
};

const Floor = () => {
  const texture = useLoader(TextureLoader, 'textures/tile_floor.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  return (
    <mesh receiveShadow position={[0,-0.5, 0]}>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Controls = () => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    controls.current.enableZoom = false; // Disable zoom on scroll
  }, []);

  useFrame(() => controls.current.update());

  return <orbitControls ref={controls} args={[camera, gl.domElement]} />;
};

const Room = () => {
  // const roomSize = 10; // Assume 10x10 meters (1000 sqft ~ 93 sqm)

  const objects = [
    { component: Table, position: [1, 0, 1] },
    { component: Chair, position: [-1, 0.55, -1] },
    { component: Box, position: [2, 0.5, -2] },
    { component: Almirah, position: [3, 1, 3] },
    { component: Sofa, position: [-3, 0.25, 2] },
    { component: Bed, position: [-2, 0.02, -3] },
    // Add more objects as needed
  ];

  return (
    <Canvas
      shadowMap
      camera={{ position: [0, 5, 10], fov: 50 }}
      className="h-full w-full "
    >
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} castShadow />
      <Controls />
      <Floor />
      {objects.map((obj, index) => {
        const Component = obj.component;
        return <Component key={index} position={obj.position} />;
      })}
    </Canvas>
  );
};

export default Room;