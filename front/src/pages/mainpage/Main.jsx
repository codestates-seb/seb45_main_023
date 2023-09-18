/* eslint-disable no-unused-vars */
import { useRecoilState } from "recoil";
import Board from "../../components/mainpage/board";
import PassportIcon from "../../components/buttons/PassportIcon"
import { User, userInfo } from "../../recoil/mypage";
import { locations } from "../../components/mainpage/locations";
import { useEffect } from "react";
import {
	beadIndexState,
	currentLocationState,
	modalState,
} from "../../recoil/main";
import { authorizationTokenState } from "../../recoil/logInSignUpState";
import axios from "axios";

export default function Main() {
	const [isOpen, setIsOpen] = useRecoilState(modalState);
	const [data, setData] = useRecoilState(User);
	const [info, setInfo] = useRecoilState(userInfo);
	const [current, setCurrent] = useRecoilState(currentLocationState);
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
	}, [authorizationToken, setData, isOpen]);

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/members/me`,
					{
						headers: {
							Authorization: `Bearer ${authorizationToken}`,
							"ngrok-skip-browser-warning": "69420",
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
	}, [authorizationToken, setData, setInfo]);

	return (
		<div class="App bg-blue-200 min-w-[1056px] min-h-[904px]">
			<Board />
			<PassportIcon />
		</div>
	);
}
