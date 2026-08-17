import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function Character() {
  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.6}>
      <group position={[0, -0.4, 0]}>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshStandardMaterial color="#f4c7a1" />
        </mesh>

        <mesh position={[0, -0.65, 0]}>
          <capsuleGeometry args={[0.45, 0.9, 8, 16]} />
          <meshStandardMaterial color="#8c70d0" />
        </mesh>

        <mesh position={[-0.23, 0.52, 0.55]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#19171c" />
        </mesh>

        <mesh position={[0.23, 0.52, 0.55]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#19171c" />
        </mesh>
      </group>
    </Float>
  );
}

export default function CharacterScene() {
  return (
    <div className="h-[420px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[3, 4, 5]} intensity={3} />

        <Character />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}