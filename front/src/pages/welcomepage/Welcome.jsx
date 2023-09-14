/* eslint-disable no-unused-vars */
import { ToSmallButton } from "../../components/Buttons";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authorizationTokenState } from "../../recoil/logInSignUpState";
import { User, userInfo } from "../../recoil/mypage";
import { currentLocationState, beadIndexState } from "../../recoil/main";
import { locations } from "../../components/mainpage/locations";

export default function WelcomePage() {
	const [authorizationToken, setAuthorizationToken] = useRecoilState(
		authorizationTokenState
	);
	const [data, setData] = useRecoilState(User);
	const [info, setInfo] = useRecoilState(userInfo);
	const [current, setCurrent] = useRecoilState(currentLocationState);
	const [beadIndex, setBeadIndex] = useRecoilState(beadIndexState);

	function findLocationIndex() {
		const index = locations.findIndex(
			(location) => location.BLOCK === info.currentLocation
		);
		if (index !== -1) {
			setCurrent(locations[index]);
			setBeadIndex(current.cityId);
		}
	}

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/members/me`,
					{
						headers: {
							Authorization: `Bearer ${authorizationToken}`,
						},
					}
				);
				setData(data.data);
				const {
					id,
					nickname,
					email,
					level,
					nationality,
					password,
					currentLocation,
					birth,
				} = data.data;
				setInfo({
					id,
					nickname,
					email,
					level,
					nationality,
					password,
					currentLocation,
					birth,
				});
			} catch (err) {
				console.log(err);
			}
		};

		getData();
		findLocationIndex();
	}, [authorizationToken, setData, setInfo]);

	return (
		<form className="flex justify-center">
			<div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-[2rem] pb-4 bg-[#F6F8FA]">
				<section className="flex flex-col justify-center items-center h-[100vh]">
					<div className="flex flex-col justify-center items-center text-[60px] font-bold mb-[50px]">
						<div className="">Welcome to</div>
						<div className="text-[70px] text-[#0088F8]">MarbleUs</div>
					</div>
					<section className="flex gap-[40px]">
						<ToSmallButton
							linkName="mainpage"
							Size="lg"
							iconName="mainpage"
							colorName="orange"
							title="mainpage"
						/>
						<ToSmallButton
							linkName="mypage"
							Size="lg"
							iconName="mypage"
							colorName="purple"
							title="mypage"
						/>
					</section>
				</section>
				<footer className="text-gray-600">
					<i class="fa-regular fa-copyright"></i> MarbleUs Corp. All rights
					reserved.
				</footer>
			</div>
		</form>
	);
}

// advanced
// 비밀번호 찾기, 이메일 찾기
// 2차인증 (ex - 해당 이메일로 회원가입하면 기입한 이메일이 실제 존재하는 이메일인지 서버에서 코드보내서 5분?내로 인증해야함)
