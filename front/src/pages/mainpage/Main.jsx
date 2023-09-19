/* eslint-disable no-unused-vars */
import { useRecoilState, useRecoilValue } from "recoil";
import Board from "../../components/mainpage/board";
import PassportIcon from "../../components/buttons/mainpage/PassportIcon";
import { User, userInfo } from "../../recoil/mypage";
import { locations } from "../../components/mainpage/locations";
import { useEffect } from "react";
import {
	beadIndexState,
	currentLocationState,
	diceControlState,
	modalState,
} from "../../recoil/main";
import { authorizationTokenState } from "../../recoil/logInSignUpState";
import GetData from "../../components/GetData";
import axios from "axios";

export default function Main() {
	const isOpen = useRecoilValue(modalState);
	const [data, setData] = useRecoilState(User);
	const [info, setInfo] = useRecoilState(userInfo);
	const [current, setCurrent] = useRecoilState(currentLocationState);
	const [diceControl, setDiceControl] = useRecoilState(diceControlState);
	const [beadIndex, setBeadIndex] = useRecoilState(beadIndexState);
	const [authorizationToken, setAuthorizationToken] = useRecoilState(
		authorizationTokenState
	);

	useEffect(() => {
		function findLocationIndex() {
			const index = locations.findIndex(
				(location) => location.BLOCK === info.currentLocation
			);
			if (index !== -1) {
				setCurrent(locations[index]);
				setBeadIndex(current.cityId);
			}
		}
		findLocationIndex();
	}, [authorizationToken, isOpen]);

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/members/me`,
					{
						headers: {
							Authorization: `Bearer ${authorizationToken}`,
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);

				// authorization 토큰 갱신
				if (data.headers.get("newaccesstoken")) {
					setAuthorizationToken(data.headers.get("newaccesstoken"));
					localStorage.setItem("Authorization", authorizationToken ?? "");
				}

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
	}, [authorizationToken, setData, setInfo]);

	useEffect(() => {
		if (info.id === 0) {
			setDiceControl(true);
		}
	}, [window]);

	return (
		<div className="App bg-blue-200 min-w-[1056px] min-h-[904px]">
			<Board />
			<PassportIcon />
		</div>
	);
}
