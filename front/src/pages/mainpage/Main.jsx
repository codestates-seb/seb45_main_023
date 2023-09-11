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
	SignUpWithMarbleUsButton,
	GoogleLogInButton,
	RefreshButton,
	CloseButton,

	BasicCustomButton,
	NegativeCustomButton,
	ToPageCustomButton,
	SkillButton,
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
			<Button text={"로그아웃"} color={'blue'}/>
			<Button text={"개인정보수정"} color={'blue'}/>
			<GreenButton text={"인증글 쓰러가기"} />
			<PurpleButton text={"인증글 쓰러가기"} />
			<NegativeButton text={"글 쓰기"} />
			<NegativeButtonGreen text={"댓글 쓰기"} />
			<ToMypage />
			<ToBoard />
			<SignUpWithMarbleUsButton />
			<GoogleLogInButton />
			<RefreshButton />
			<CloseButton />
			<PassportIcon /> <br/>

			{/* 통합한 버튼들 사용법 */}
			<BasicCustomButton text='가나다라' colorName='gray' />
			<BasicCustomButton text='마바사아' colorName='green' />
			<BasicCustomButton text='자차카타' colorName='purple' />
			<NegativeCustomButton text='글쓰기' colorName='blue'/>
			<NegativeCustomButton text='댓글쓰기' colorName='green'/>
			<ToPageCustomButton text='마이페이지 미션 탭으로' colorName='purple' iconColorName='purple' />
			<ToPageCustomButton text='여행 후기 게시판으로' colorName='blue' iconColorName='blue' />
			<SkillButton iconName='refresh'/>
			<SkillButton iconName='close'/>
		</div>
	);
}
