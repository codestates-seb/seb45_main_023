import TopSidebar from '../../components/mypage/TopSidebar';
import BottomSidebar from '../../components/mypage/BottomSidebar';
import MypageNotice from '../../components/mypage/MypageNotice';
import UserInfo from '../../components/mypage/UserInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { User, sidebar, userInfo } from '../../recoil/mypage';
import Follower from '../../components/mypage/Follower';
import { authorizationTokenState } from '../../recoil/logInSignUpState';
import MypageHeaderBtn from '../../components/buttons/mypage/MypageHeaderBtn';

export default function MyPage() {
  const [userdata, setData] = useRecoilState(User);
  const [info, setInfo] = useRecoilState(userInfo);
  const [nickname, setNickname] = useState(userdata.nickname);
  const [nationality, setNationality] = useState(userdata.nationality);
  const [password, setPassword] = useState('');
  const [birth, setBirth] = useState(userdata.birth);
  const token = useRecoilValue(authorizationTokenState);
  const [_, setVisibleLinks] = useRecoilState(sidebar);
  const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
  console.log(token);
  console.log(userdata);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/members/${userdata.email}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${token}`,
          },
        });

        // authorization 토큰 갱신
				if(data.headers.get("newaccesstoken")) {
					setAuthorizationToken(data.headers.get("newaccesstoken"));
					localStorage.setItem('Authorization', authorizationToken ?? '');
				}

        setData(data.data);
        const { nickname, nationality, password, birth, id } = data.data;
        setInfo({ nickname, nationality, password, birth, id });
      } catch (err) {
        alert('데이터 불러오기에 실패하였습니다.');
        console.log(err);
      }
    };
    setVisibleLinks(0);
    getData();
  }, []);
  return (
    <>
      <MypageHeaderBtn />
      <div className="flex justify-center mt-[5rem]">
        <TopSidebar />
        <BottomSidebar />
        <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white ">
          <MypageNotice nickname={nickname} nationality={nationality} password={password} birth={birth} />
          <UserInfo setNickname={setNickname} setNationality={setNationality} setPassword={setPassword} />
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] rounded-b-3xl shadow-xss">&nbsp;</div>
        </div>
        <Follower />
      </div>
    </>
  );
}
