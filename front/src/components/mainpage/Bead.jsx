import { useRecoilState } from "recoil";
import { currentLocationState } from "../../recoil/main";

const Bead = () => {
	const [current, setCurrent] = useRecoilState(currentLocationState);

	if (current.cityId < 11) {
		return (
			<>
				<div className="w-[100px] h-[100px] z-50 absolute left-[30%] bottom-[20%] transition-transform">
					<img src="./BeadIcon.png" alt="bus" />
				</div>
			</>
		);
	} else
		return (
			<>
				<div
					className="w-[100px] h-[100px] z-50 absolute left-[30%] bottom-[20%] transition-transform"
					style={{ transform: "scaleX(-1)" }}
				>
					<img src="./BeadIcon.png" alt="bus" />
				</div>
			</>
		);
};

export default Bead;
