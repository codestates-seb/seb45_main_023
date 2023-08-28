import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Main () {
    return (
		<div className="App">
			<Canvas>
				<OrbitControls autoRotate={true} />
				<mesh>
					<ambientLight intensity={1} />
					<directionalLight position={[-1, 0, 1]} intensity={0.5} />
					<boxGeometry args={[3, 3, 3]} />
					<meshStandardMaterial attach="material" color={505050} />
				</mesh>
			</Canvas>
		</div>
	);
}