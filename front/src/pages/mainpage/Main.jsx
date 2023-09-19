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

export default function Main() {
	GetData();

	const isOpen = useRecoilValue(modalState);
	const info = useRecoilValue(userInfo);
	const [current, setCurrent] = useRecoilState(currentLocationState);
	const [diceControl, setDiceControl] = useRecoilState(diceControlState);
	const [beadIndex, setBeadIndex] = useRecoilState(beadIndexState);
	const token = useRecoilValue(authorizationTokenState);

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
	}, [token, isOpen]);

	useEffect(() => {
		if (info.id === 0) setDiceControl(true);
	});

	return (
		<div className="App bg-blue-200 min-w-[1056px] min-h-[904px]">
			<Board />
			<PassportIcon />
		</div>
	);
}
