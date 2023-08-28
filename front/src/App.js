import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function App() {
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

export default App;
