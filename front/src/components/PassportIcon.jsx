import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../recoil/example"; // Assume you have a Recoil atom for isLoggedIn state
import { Link } from "react-router-dom";

import PassportImage from "../assets/passportImage.png";

export default function PassportIcon() {
	const isLoggedIn = useRecoilValue(isLoggedInState);

	return (
		<div className="fixed bottom-10 right-10 cursor-pointer">
			{isLoggedIn ? (
				<Link to="/mypage">
					<section
						className="flex w-34 h-69 p-6 flex-col justify-center items-end gap-3 rounded-r-1 shadow-xl"
						style={{
							color: "#EFF0ED",
							backgroundColor: "#293676",
							borderRadius: "0px 10px 10px 0px",
							boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
						}}
					>
						<img
							src={PassportImage}
							alt="passport logo"
							className="w-12 h-15"
						/>
						<div className="flex flex-col justify-center items-end gap-2">
							<div className="text-xs font-normal text-right">
								<p>마이페이지</p>
								<p>MY PAGE</p>
							</div>
						</div>
						<i className="fa-solid fa-house-user ml-auto w-4 h-4 mr-0.5"></i>
					</section>
				</Link>
			) : (
				<Link to="/login">
					<section
						className="flex w-34 h-69 p-6 flex-col justify-center items-end gap-3 rounded-r-1 shadow-xl"
						style={{
							color: "#EFF0ED",
							backgroundColor: "#293676",
							borderRadius: "0px 10px 10px 0px",
							boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
						}}
					>
						<img
							src={PassportImage}
							alt="passport logo"
							className="w-12 h-15"
						/>
						<div className="flex flex-col justify-center items-end gap-2">
							<div className="text-xs font-normal text-right">
								<p>로그인 / 회원가입</p>
								<p>LOGIN / SIGN</p>
							</div>
						</div>
						<i className="fa-solid fa-right-to-bracket ml-auto w-4 h-4 mr-0.5"></i>
					</section>
				</Link>
			)}
		</div>
	);
}