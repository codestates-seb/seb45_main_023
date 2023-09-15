import BarList from "../../components/mypage/BarList";
import MissionNotice from "../../components/mypage/MissionNotice";
import TopSidebar from "../../components/mypage/TopSidebar";
import BottomSidebar from "../../components/mypage/BottomSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { User } from "../../recoil/mypage";

export default function MyMission() {
	const info = useRecoilValue(User);
	const [mission, setMission] = useState("");
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/missions/member-mission/${info.id}`,
					{
						headers: {
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);
				console.log(response);
				setMission(response.data);
			} catch (err) {
				console.log("err", err);
			}
		};

		getData();
	}, []);

	const handlePostMission = () => {
		const postData = async () => {
			try {
				const request = await axios.post(
					`${process.env.REACT_APP_SERVER_URL}/missions/${info.id}/3`,
					{
						headers: {
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);
				console.log(request.data);
				setMission(request.data);
			} catch (err) {
				console.log(err);
			}
		};
		postData();
		console.log(mission);
	};

  const handleClear = () => {
		const postData = async () => {
			try {
				const request = await axios.patch(
					`${process.env.REACT_APP_SERVER_URL}/missions/mission-complete/2`,
					{
						headers: {
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
					}
				);
				console.log(request.data);
			} catch (err) {
				console.log(err);
			}
		};
		postData();
	};
  return (
    <div className="flex justify-center">
      <TopSidebar />
      <BottomSidebar />
      <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white">
        <BarList />
        <MissionNotice />
        <button onClick={handlePostMission}>TEST POST BUTTON</button> {/*POST 테스트용 버튼 */}
        <button onClick={handleClear}>TEST CLEAR BUTTON</button>
      </div>
    </div>
  );
}
