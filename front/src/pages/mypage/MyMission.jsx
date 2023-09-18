import BarList from '../../components/mypage/BarList';
import MissionNotice from '../../components/mypage/MissionNotice';
import TopSidebar from '../../components/mypage/TopSidebar';
import BottomSidebar from '../../components/mypage/BottomSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { User } from '../../recoil/mypage';
import { authorizationTokenState } from '../../recoil/logInSignUpState';
import MypageHeaderBtn from '../../components/buttons/mypage/MypageHeaderBtn';

export default function MyMission() {
  const info = useRecoilValue(User);
  const [mission, setMission] = useState('');
  const token = useRecoilValue(authorizationTokenState);
  console.log(mission);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/missions/member-mission/${info.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${token}`,
          },
        });

        // authorization 토큰 갱신
        if (response.headers.get('Authorization') !== null) {
          const Authorization = response.headers.get('Authorization');
          localStorage.setItem('Authorization', Authorization);
        }

        console.log(response.data);
        setMission(response.data);
      } catch (err) {
        console.log('err', err);
      }
    };

    getData();
  }, []);

  const handleClear = () => {
    const postData = async () => {
      try {
        const request = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/missions/mission-complete/${mission[0].id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '69420',
            },
          }
        );

        // authorization 토큰 갱신
        if (request.headers.get('Authorization') !== null) {
          const Authorization = request.headers.get('Authorization');
          localStorage.setItem('Authorization', Authorization);
        }

        console.log(request.data);
      } catch (err) {
        console.log(err);
      }
    };
    postData();
  };
  return (
    <>
      <MypageHeaderBtn />
      <div className="flex justify-center">
        <TopSidebar />
        <BottomSidebar />
        <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white">
          <BarList mission={mission} />
          <MissionNotice />
          <button onClick={handleClear}>TEST CLEAR BUTTON</button>
        </div>
      </div>
    </>
  );
}
