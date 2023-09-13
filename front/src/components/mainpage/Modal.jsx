import { useRecoilState } from "recoil";
import { modalState } from "../../recoil/main";
import { Button, ToPageCustomButton } from "../Buttons";
import { Link } from "react-router-dom";

// 더미입니다
const missions = [
	{ level: 1, content: "test1", isOpenendMission: true, color: "yellow" },
	{ level: 2, content: "test2", isOpenendMission: true, color: "green" },
	{ level: 3, content: "test3", isOpenendMission: false, color: "blue" },
	{ level: 4, content: "test4", isOpenendMission: false, color: "purple" },
];

function MissionCard({
	level,
	content,
	color,
	isOpenendMission,
	setIsOpenendMission,
}) {
	// isOpenendMission 상태에 따라 MissionCard 조건부 설정

	if (!isOpenendMission) {
		// 미션이 닫힌 상태인 경우
		return (
			<div
				className={`flex h-[4rem] rounded-3xl shadow-2xl text-white bg-slate-500 font-bold`}
			>
				<span className="flex w-[8rem] pr-4 justify-center items-center rounded-l-3xl bg-slate-500 text-white">
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
		<div className={`flex h-[4rem] rounded-full shadow-2xl bg-${color}-300`}>
			<span
				className={`flex w-[8rem] pr-4 justify-center items-center rounded-l-3xl bg-${color}-300 text-white font-bold hover:bg-${color}-100`}
			>
				LEVEL {level}
			</span>
			<span className="flex w-full justify-between items-center bg-white rounded-full ml-[-1.5rem]">
				<span className="ml-[3rem] overflow-hidden overflow-ellipsis">
					{content}
				</span>
				<Button text={"인증 글 쓰러 가기"} color={color} />
				{/* Link: /blogwrite/:member_id/:cityId */}
			</span>
		</div>
	);
}

function Modal({ city }) {
	const [isOpen, setIsOpen] = useRecoilState(modalState);

	const closeModal = () => {
		setIsOpen(false);
	};

	console.log(city.cityId);

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
						}
					}}
				>
					<div className="bg-slate-200 relative w-5/6 h-3/4 flex rounded-lg shadow-lg transform scale-100 transition-transform duration-500 overflow-hidden">
						<div className="w-full h-1/2 top-0 object-cover">
							<img src={`/region/${city.ENG}.png`} alt="cityPicture" />
						</div>
						<div
							className="fixed top-0 right-0 w-0 h-0 border-l-[120px] border-l-transparent border-t-[120px] opacity-70 shadow-2xl curser-pointer"
							onClick={closeModal}
						/>
						<main className="absolute top-0 left-0 h-full flex">
							<div className="flex-1 flex flex-col m-10 p-10 gap-4 bg-white bg-opacity-80 rounded-lg shadow-md">
								<h1 className="text-xxl font-black">{city.name}</h1>
								<h2 className="text-xl font-bold">{city.ENG}</h2>
								<p className="text-xl font-semibold mt-2">
									환영합니다! {city.name}으로의 여정에 초대합니다.
								</p>
								<section className="mt-4">인기글? </section>
								<p className="text-xs text-slate-500">
									미션은 선택적으로 수행하실 수 있습니다. 미션 완료 후 후기 작성
									시 마이 페이지 - 스탬프 페이지에 스탬프 적립이 가능합니다.
									해당 지역 재방문 시 상위 레벨의 미션이 노출되어 수행 가능한
									상태로 변경됩니다. 미완료 상태의 미션은 언제든 마이페이지 -
									미션 페이지에서 조회 가능합니다. 미션은 최대 3개까지 보류하실
									수 있고, 초과 시 오래된 순서로 삭제되니 주의를 부탁드립니다.
								</p>
							</div>
							<div className="flex-1 flex flex-col m-10 p-10 bg-white bg-opacity-80 rounded-lg shadow-md">
								<div className="flex flex-col w-full h-3/5 justify-around">
									{missions.map((mission, index) => (
										<MissionCard
											key={index}
											mission={mission}
											level={mission.level}
											content={mission.content}
											color={mission.color}
											isOpenendMission={mission.isOpenendMission}
											{...missions}
										/>
									))}
								</div>
								<section className="fixed right-20 bottom-28 flex flex-col gap-4 justify-end">
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
