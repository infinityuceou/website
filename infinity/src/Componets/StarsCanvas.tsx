import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

const StarBackground = () => {
  const ref = useRef();

  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(6000), { radius: 1.2 })
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.0045}
          sizeAttenuation
          depthWrite={false}
          opacity={1}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 1] }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <StarBackground />
    </Canvas>
  </div>
);

export default StarsCanvas;