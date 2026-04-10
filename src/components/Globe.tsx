import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

// Tocantins position on the globe (lat/lng to 3D coordinates)
const TOCANTINS_LAT = -10.25;
const TOCANTINS_LNG = -48.25;

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#1a4d5c"
        roughness={0.8}
        metalness={0.2}
      />
    </Sphere>
  );
}

function Continents() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  // Simple representation of South America shape
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    // Simplified South America outline
    s.moveTo(-0.3, 0.8);
    s.lineTo(-0.1, 0.9);
    s.lineTo(0.2, 0.7);
    s.lineTo(0.3, 0.4);
    s.lineTo(0.2, 0);
    s.lineTo(0.1, -0.5);
    s.lineTo(-0.1, -0.9);
    s.lineTo(-0.2, -0.5);
    s.lineTo(-0.3, 0);
    s.lineTo(-0.4, 0.4);
    s.closePath();
    return s;
  }, []);

  return (
    <Sphere ref={meshRef} args={[2.01, 64, 64]}>
      <meshStandardMaterial
        color="#2d5a3d"
        roughness={0.9}
        metalness={0.1}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
}

interface TocantinsMarkerProps {
  onHover: (hovered: boolean) => void;
  onClick: () => void;
  isHovered: boolean;
}

function TocantinsMarker({ onHover, onClick, isHovered }: TocantinsMarkerProps) {
  const markerRef = useRef<THREE.Group>(null);
  const position = latLngToVector3(TOCANTINS_LAT, TOCANTINS_LNG, 2.05);
  
  useFrame(() => {
    if (markerRef.current) {
      markerRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={markerRef}>
      <mesh
        position={position}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[isHovered ? 0.12 : 0.08, 16, 16]} />
        <meshStandardMaterial
          color={isHovered ? "#f59e0b" : "#e17b2e"}
          emissive={isHovered ? "#f59e0b" : "#e17b2e"}
          emissiveIntensity={isHovered ? 0.8 : 0.5}
        />
      </mesh>
      
      {/* Pulsing ring */}
      <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.18, 32]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={isHovered ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {isHovered && (
        <Html position={[position.x, position.y + 0.3, position.z]} center>
          <div className="bg-background/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-elevated border border-border pointer-events-none whitespace-nowrap animate-scale-in">
            <div className="font-display font-semibold text-foreground">Tocantins</div>
            <div className="text-xs text-muted-foreground">Clique para explorar</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene({ onNavigate }: { onNavigate: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      
      <Earth />
      <Continents />
      <TocantinsMarker 
        onHover={setIsHovered} 
        onClick={onNavigate}
        isHovered={isHovered}
      />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

const Globe = () => {
  const navigate = useNavigate();

  const handleNavigateToTocantins = () => {
    navigate("/tocantins");
  };

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Scene onNavigate={handleNavigateToTocantins} />
      </Canvas>
    </div>
  );
};

export default Globe;
