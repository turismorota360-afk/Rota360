import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { TextureLoader } from "three";

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
  
  // Load earth textures from reliable NASA CDN
  const [colorMap, bumpMap] = useLoader(TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
  ]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group>
      {/* Main Earth sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specular={new THREE.Color(0x333333)}
          shininess={5}
        />
      </Sphere>
    </group>
  );
}

function Clouds() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const cloudsMap = useLoader(TextureLoader, 
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.02, 64, 64]}>
      <meshPhongMaterial
        map={cloudsMap}
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </Sphere>
  );
}

function Atmosphere() {
  return (
    <Sphere args={[2.1, 64, 64]}>
      <shaderMaterial
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
          }
        `}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        transparent
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
  const pulseRef = useRef<THREE.Mesh>(null);
  const position = latLngToVector3(TOCANTINS_LAT, TOCANTINS_LNG, 2.05);
  const [pulseScale, setPulseScale] = useState(1);
  
  useFrame(({ clock }) => {
    if (markerRef.current) {
      markerRef.current.rotation.y += 0.0005;
    }
    // Pulsing animation
    const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
    setPulseScale(scale);
  });

  // Orange accent color from brand
  const markerColor = isHovered ? "#f97316" : "#ea580c";

  return (
    <group ref={markerRef}>
      {/* Main marker */}
      <mesh
        position={position}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[isHovered ? 0.1 : 0.07, 16, 16]} />
        <meshBasicMaterial color={markerColor} />
      </mesh>
      
      {/* Pulsing outer ring */}
      <mesh 
        ref={pulseRef}
        position={position} 
        scale={[pulseScale, pulseScale, pulseScale]}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#ea580c"
          transparent
          opacity={0.3}
        />
      </mesh>

      {isHovered && (
        <Html position={[position.x, position.y + 0.35, position.z]} center>
          <div className="bg-background/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-elevated border border-border pointer-events-none whitespace-nowrap animate-scale-in">
            <div className="font-display font-semibold text-primary">Tocantins</div>
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
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={2.5} />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} />
      <pointLight position={[-4, -2, -6]} intensity={3} color="#4a90d9" />
      <pointLight position={[0, 0, -5]} intensity={2} color="#1e3a5f" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <Suspense fallback={null}>
        <Earth />
        <Clouds />
        <Atmosphere />
      </Suspense>
      
      <TocantinsMarker 
        onHover={setIsHovered} 
        onClick={onNavigate}
        isHovered={isHovered}
      />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3.5}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-muted-foreground animate-pulse">Carregando globo...</div>
    </div>
  );
}

const RealisticGlobe = () => {
  const navigate = useNavigate();

  const handleNavigateToTocantins = () => {
    navigate("/tocantins");
  };

  return (
    <div className="w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: "transparent" }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene onNavigate={handleNavigateToTocantins} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default RealisticGlobe;
