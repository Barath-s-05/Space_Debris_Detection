import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { DebrisData } from '../types';

interface DebrisVisualizationProps {
  debrisData: DebrisData[];
}

function DebrisObject({ data }: { data: DebrisData }) {
  const color = 
    data.riskLevel === 'High' ? '#ef4444' : 
    data.riskLevel === 'Medium' ? '#f59e0b' : 
    '#22c55e';

  return (
    <mesh position={data.position}>
      <sphereGeometry args={[data.size * 0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export function DebrisVisualization({ debrisData }: DebrisVisualizationProps) {
  return (
    <div className="h-[600px] w-full rounded-lg bg-black">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        
        {debrisData.map((debris) => (
          <DebrisObject key={debris.id} data={debris} />
        ))}
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}