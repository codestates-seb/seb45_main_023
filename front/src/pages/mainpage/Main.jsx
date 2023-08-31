import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import PassportIcon from "../../components/PassportIcon";

import {
	Button,
	GreenButton,
	PurpleButton,
	NegativeButton,
	NegativeButtonGreen,
	ToMypage,
	ToBoard,
	SignUpButton,
	GoogleLogInButton,
	RefreshButton,
	CloseButton,
} from "../../components/Buttons";

export default function Main() {
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
			<Button text={"로그아웃"} />
			<Button text={"개인정보수정"} />
			<GreenButton text={"인증글 쓰러가기"} />
			<PurpleButton text={"인증글 쓰러가기"} />
			<NegativeButton text={"글 쓰기"} />
			<NegativeButtonGreen text={"댓글 쓰기"} />
			<ToMypage />
			<ToBoard />
			<SignUpButton />
			<GoogleLogInButton />
			<RefreshButton />
			<CloseButton />
			<PassportIcon />
		</div>
	);
}
