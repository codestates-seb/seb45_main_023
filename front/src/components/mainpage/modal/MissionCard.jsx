import { useRecoilState } from "recoil";
import { currentLocationState } from "../../../recoil/main";
import { userInfo } from "../../../recoil/mypage";
import { Button } from "../../Buttons";
import { Link } from "react-router-dom";

function MissionCard({ mission, level }) {
	// Mission 변수 정의와 초기화
	const color = ["yellow", "green", "blue", "purple"];

	const [info, setInfo] = useRecoilState(userInfo);
	const [current, setcurrent] = useRecoilState(currentLocationState);

	if (mission === undefined) {
		// 미션이 닫힌 상태인 경우
		return (
			<div
				className={`flex h-[4rem] rounded-3xl shadow-2xl text-white bg-slate-500 font-bold`}
				style={{ transition: "opacity 0.3s ease" }}
			>
				<span
					className={`flex w-[8rem] pr-4 justify-center items-center rounded-l-3xl bg-slate-500 text-white`}
				>
					LEVEL {level}
				</span>
				<span className="flex w-full justify-between items-center bg-slate-500 rounded-3xl ml-[-1.5rem]">
					<span className="ml-[3rem] overflow-hidden overflow-ellipsis">
						{level}차 방문 시 공개됩니다!
					</span>
				</span>
			</div>
		);
	}

	// 미션이 열린 상태인 경우
	return (
		<div
			className={`flex h-[4rem] rounded-full shadow-2xl bg-${color[level]}-300`}
		>
			<span
				className={`flex w-[8rem] pr-4 justify-center items-center rounded-l-3xl bg-${color}-300 text-white font-bold hover:bg-${color}-100`}
			>
				LEVEL {level}
			</span>
			<span className="flex w-full justify-between items-center bg-white rounded-full ml-[-1.5rem]">
				<span className="ml-[3rem] overflow-hidden overflow-ellipsis">
					{mission.content}
				</span>
				{mission.isComplete ? (
					<Link to={`/blogwrite/${info.id}/${current.cityId}`}>
						<Button text={"인증 글 쓰러 가기"} color={color} />
					</Link>
				) : (
					<Button text={"인증 완료!"} color={color} />
				)}
			</span>
		</div>
	);
}

export default MissionCard;
