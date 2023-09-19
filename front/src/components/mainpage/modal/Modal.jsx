/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useRecoilState } from "recoil";
import {
	beadIndexState,
	modalState,
	diceControlState,
	currentLocationState,
} from "../../../recoil/main";
import { userInfo } from "../../../recoil/mypage";
import { ToPageCustomButton } from "../../Buttons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MissionCard from "./MissionCard";
import { authorizationTokenState } from "../../../recoil/logInSignUpState";

function Modal({ city }) {
	const [info, setInfo] = useRecoilState(userInfo);
	const [isOpen, setIsOpen] = useRecoilState(modalState);
	const [diceControl, setDiceControl] = useRecoilState(diceControlState);
	const [current, setcurrent] = useRecoilState(currentLocationState);
	const [beadIndex, setBeadIndex] = useRecoilState(beadIndexState);
	const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
	const [cityInfo, setCityInfo] = useState("");
	const [missions, setMissions] = useState([]);

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const patchLocation = async () => {
			try {
				const request = {
					currentLocation: `${current.BLOCK}`,
					currentCityCode: `${current.name}`,
				};

				const response = await axios.patch(
					`${process.env.REACT_APP_SERVER_URL}/members/${info.id}`,
					request,
					{
						headers: {
							Authorization: `Bearer ${authorizationToken}`,
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);
	
				// authorization 토큰 갱신
				if(response.headers.get("newaccesstoken")) {
					setAuthorizationToken(response.headers.get("newaccesstoken"));
					localStorage.setItem('Authorization', authorizationToken ?? '');
				}

			} catch (err) {
				console.log("patchLocation" + err);
			}
		};

		const fetchCityInfo = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/cities/${city.cityId}`,
					{
						headers: {
							Authorization: `Bearer ${authorizationToken}`,
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);

			// authorization 토큰 갱신
			if(response.headers.get("newaccesstoken")) {
				setAuthorizationToken(response.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

				setCityInfo(response.data);
			} catch (err) {
				console.error("fetchCityInfo", err);
			}
		};

		const postMission = async () => {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_SERVER_URL}/missions/${info.id}/${city.cityId}`,
					{
						headers: {
							Authorization: `Bearer ${authorizationToken}`,
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);

				// authorization 토큰 갱신
				if(response.headers.get("newaccesstoken")) {
					setAuthorizationToken(response.headers.get("newaccesstoken"));
					localStorage.setItem('Authorization', authorizationToken ?? '');
				}

			} catch (err) {
				console.error("postMission", err);
			} finally {
				fetchMissions();
			}
		};

		const fetchMissions = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/missions/member-mission/${info.id}`,
					{
						headers: {
							Authorization: `Bearer ${authorizationToken}`,
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);

				// authorization 토큰 갱신
				if(response.headers.get("newaccesstoken")) {
					setAuthorizationToken(response.headers.get("newaccesstoken"));
					localStorage.setItem('Authorization', authorizationToken ?? '');
				}

				if (Array.isArray(response.data)) {
					// response.data가 배열인지 확인
					const seoulMissions = response.data.filter(
						(mission) => mission.cityName === `${current.name}`
					);
					setMissions(seoulMissions);
				}
			} catch (err) {
				console.error("fetchMissions", err);
			}
		};

		patchLocation();
		fetchCityInfo();
		postMission();
	}, [isOpen]);

	return (
		<>
			{isOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						transition: "opacity 0.5s, transform 1s",
					}}
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							closeModal();
							setDiceControl(true);
						}
					}}
				>
					<div className="bg-slate-200 relative w-5/6 h-3/4 min-w-[1000px] border-1 border-slate-600 flex rounded-lg shadow-lg transform scale-100 transition-transform duration-500 overflow-hidden">
						<div className="w-full h-1/2 top-0 object-cover">
							<img src={`/region/${city.ENG}.png`} alt="cityPicture" />
						</div>
						<div
							className="fixed top-0 right-0 w-0 h-0 border-l-[120px] border-l-transparent border-t-[120px] opacity-70 shadow-2xl curser-pointer"
							onClick={(e) => {
								closeModal();
							}}
						/>
						<main className="absolute top-0 left-0 h-full flex">
							<div className="flex-1 flex flex-col m-10 p-10 gap-4 min-w-[380px] bg-white bg-opacity-80 rounded-lg shadow-md">
								<h1 className="text-xxl font-black">{cityInfo.name}</h1>
								<h2 className="text-xl font-bold">
									환영합니다! {cityInfo.name}의 방방곡곡으로 당신을 초대합니다.
								</h2>
								<section className="mt-4">{cityInfo.description}</section>
								<p className="text-xs text-slate-500">
									미션은 선택적으로 수행하실 수 있습니다. 미션 완료 후 후기 작성
									시 마이 페이지 - 스탬프 페이지에 스탬프 적립이 가능합니다.
									해당 지역 재방문 시 상위 레벨의 미션이 노출되어 수행 가능한
									상태로 변경됩니다. 미완료 상태의 미션은 언제든 마이페이지 -
									미션 페이지에서 조회 가능합니다. 미션은 최대 3개까지 보류하실
									수 있고, 초과 시 오래된 순서로 삭제되니 주의를 부탁드립니다.
								</p>
							</div>
							<div className="relative flex-1 flex flex-col m-10 p-10 bg-white bg-opacity-80 rounded-lg shadow-md">
								<div className="flex flex-col w-full h-3/5 min-w-[380px] justify-around">
									<MissionCard mission={missions[0]} level={1} />
									<MissionCard mission={missions[1]} level={2} />
									<MissionCard mission={missions[2]} level={3} />
									<MissionCard mission={missions[3]} level={4} />
								</div>
								<section className="absolute right-10 bottom-18 flex flex-col gap-4 justify-end">
									<Link to="/mymissions">
										<ToPageCustomButton
											text={"마이페이지 미션탭으로"}
											colorName={"purple"}
											iconColorName={"purple"}
										/>
									</Link>
									<Link to={`/bloglist/${city.cityId}`}>
										<ToPageCustomButton
											text={"여 행 후 기 게시판으로"}
											colorName={"blue"}
											iconColorName={"blue"}
										/>
									</Link>
								</section>
							</div>
						</main>
					</div>
				</div>
			)}
		</>
	);
}

export default Modal;
