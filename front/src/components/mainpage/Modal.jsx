import { useRecoilState } from "recoil";
import { modalState } from "../../recoil/main";
import { Link } from "react-router-dom";

function Modal() {
	const [isOpen, setIsOpen] = useRecoilState(modalState);

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			{isOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						transition: "opacity 0.5s, transform 1s", // 트랜지션 설정
					}}
				>
					<div className="bg-white w-3/4 h-3/4 p-10 max-w-3xl rounded-lg shadow-lg transform scale-100 transition-transform duration-500 flex overflow-hidden">
						{/* 왼쪽 영역 */}
						<div className="flex-1 p-4">
							<h1 className="text-xl font-semibold">지역이름들어갈곳~</h1>
							<h2 className="text-lg font-medium">
								축하합니다어쩌구에당첨되셧습니다
							</h2>
							<p className="mt-2">
								지역설명주절주절이편지는영국에서부터시작되어머시기저시기블라블라어마어마합니다어쩌구저쩌구
							</p>
							<section className="mt-4">
								여기다가인기글나열할까여어드밴스드엿나여
							</section>
						</div>
						{/* 오른쪽 영역 */}
						<div className="flex-1 flex flex-col gap-4">
							{/* 상단 5개의 div */}
							<div className="flex-1 grid grid-5 gap-4">
								<div className="bg-gray-200 flex rounded-lg">
									여기는 그거입니다 미션 갱신이랑 닫기{" "}
									<div
										className="bg-gray-300 w-8 h-8 rounded-full text-center cursor-pointer"
										onClick={closeModal}
									>
										X
									</div>
								</div>
								<div className="bg-gray-200 rounded-lg">미션1번등장</div>
								<div className="bg-gray-200 rounded-lg">미션2번대기중</div>
								<div className="bg-gray-200 rounded-lg">미션3번대기중</div>
								<div className="bg-gray-200 rounded-lg">미션4번대기중</div>
							</div>
							{/* 가장 아래에 가로방향 div 2개 */}
							<div className="flex-2 flex flex-col justify-end gap-4">
								<Link to="/mymissions">
									<div className="bg-gray-200 flex-1 ml-4 rounded-lg cursor-pointer">
										마이페이지미션가는버튼
									</div>
								</Link>
								<Link to={`blog/${Location}`}>
									{" "}
									{/*대충이렇게하나요*/}
									<div className="bg-gray-200 flex-1 ml-4 rounded-lg cursor-pointer">
										여행후기게시판가는버튼~
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Modal;
