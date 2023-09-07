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
			<Button text={"로그아웃"} color={"blue"} />
			<Button text={"개인정보수정"} color={"blue"} />
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
