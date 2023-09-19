import { useRecoilState, useRecoilValue } from "recoil";
import { CardButton } from "../Buttons";
import { User, bookmarkInfo } from "../../recoil/mypage";
import axios from "axios";
import { authorizationTokenState } from "../../recoil/logInSignUpState";

export default function CardList({ start, end }) {

	const data = useRecoilValue(bookmarkInfo);
	console.log(data);
	const info = useRecoilValue(User);
	const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
	const handleRemoveBookmark = async () => {
		try {
			const request = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/members/${info.id}/no-bookmark/${data.id}`,
				{
					headers: {
						"Authorization": `Bearer ${authorizationToken}`,
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "69420",
					},
				}
			);

			// authorization 토큰 갱신
			if(request.headers.get("newaccesstoken")) {
				setAuthorizationToken(request.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

			console.log(request);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="flex flex-col w-[42.5rem] h-[25rem] justify-around bg-white ">
			<div className="flex flex-col h-[20rem]">
				<div className="flex flex-row flex-wrap pt-2 h-[20rem] justify-between space-y-between bg-white">
					{data.slice(start, end)[0] !== undefined
						? data.slice(start, end).map((item) => {
								return (
									<div className="flex flex-col justify-between w-[15rem] h-[8rem] shadow-cardList p-2">
										<div key={item.id} className="flex justify-between">
											<div className="font-bold">{item.cityName}</div>
											<button className="mr-2" onClick={handleRemoveBookmark}>
												x
											</button>
										</div>
										<div key={item.id}>
											{item.tags?.map((item) => {
												return <CardButton text={item} />;
												//enum 값으로 처리 or 함수로 작성해서 처리
											})}
										</div>
										<div key={item.id}>{item.title}</div>
									</div>
								);
						  })
						: null}
				</div>
			</div>
		</div>
	);
}
