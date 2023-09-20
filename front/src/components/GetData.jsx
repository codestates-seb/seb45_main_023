import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { User, userInfo } from "../recoil/mypage";
import {authorizationTokenState} from "../recoil/logInSignUpState"
import axios from "axios";

export default function GetData () {    
	const [, setData] = useRecoilState(User);
	const [, setInfo] = useRecoilState(userInfo);
	const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
    useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/members/me`,
					{
						headers: {
							Authorization : "Bearer " + localStorage.getItem("Authorization"),
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
}