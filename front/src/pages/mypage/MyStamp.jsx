import TopSidebar from '../../components/mypage/TopSidebar';
import BottomSidebar from '../../components/mypage/BottomSidebar';
import StampTable from '../../components/mypage/StampTable';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { stamps, userInfo } from '../../recoil/mypage';
import { authorizationTokenState } from '../../recoil/logInSignUpState';
import { useEffect } from 'react';
//missions/stamps/${memberId}
export default function MyStamp() {
  const info = useRecoilValue(userInfo);
  const token = useRecoilValue(authorizationTokenState);
  const [stamp, setStamp] = useRecoilState(stamps);
  const topData = stamp.slice(0, 10);
  const bottomData = stamp.slice(10, 20);
  console.log(stamp);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TEST_URL}/missions/stamps/${info.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });
        const stampArray = Object.values(response.data);
        setStamp(stampArray);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div className="flex justify-center">
      <TopSidebar />
      <BottomSidebar />
      <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white">
        <StampTable topData={topData} />
        <StampTable bottomData={bottomData} />
        <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
        <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
        <div className="bg-white h-[0.5rem] w-[50rem] rounded-b-3xl">&nbsp;</div>
      </div>
    </div>
  );
}
