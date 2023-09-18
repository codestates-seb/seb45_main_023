import TopSidebar from '../../components/mypage/TopSidebar';
import BottomSidebar from '../../components/mypage/BottomSidebar';
import StampTable from '../../components/mypage/StampTable';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { stamps, userInfo } from '../../recoil/mypage';
import { authorizationTokenState } from '../../recoil/logInSignUpState';
import { useEffect } from 'react';
import MypageHeaderBtn from '../../components/buttons/mypage/MypageHeaderBtn';
//missions/stamps/${memberId}
export default function MyStamp() {
  const info = useRecoilValue(userInfo);
  const token = useRecoilValue(authorizationTokenState);
  const [stamp, setStamp] = useRecoilState(stamps);
  const topData = stamp.slice(0, 10);
  const bottomData = stamp.slice(10, 20);
  console.log(stamp);
  const cityName = [
    '서울특별시',
    '부산광역시',
    '인천광역시',
    '대구광역시',
    '제주도',
    '대전광역시',
    '광주광역시',
    '울산광역시',
    '세종특별시',
    '자유여행',
    '충청남도',
    '경상남도',
    '전라남도',
    '충청북도',
    '울릉도',
    '경상북도',
    '전라북도',
    '강원도',
    '경기도',
  ];
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/missions/stamps/${info.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });

        // authorization 토큰 갱신
        if(response.headers.get("Authorization")) {
					const Authorization = response.headers.get("Authorization");
					localStorage.setItem('Authorization', Authorization ?? '');
				};

        const stampArray = Object.values(response.data);
        setStamp(stampArray.map((item, index) => ({ ...item, city: cityName[index] })));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);
  return (
    <>
      <MypageHeaderBtn />
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
    </>
  );
}
