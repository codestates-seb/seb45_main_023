import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authorizationTokenState } from '../recoil/logInSignUpState';
import { User, userInfo } from '../recoil/mypage';

export default function GetData () {
  const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState)
  const [data, setData] = useRecoilState(User);
  const [info, setInfo] = useRecoilState(userInfo);

  // console.log('data :', data);

  // 모든 페이지에서 새로고침 등으로 창이 초기화 되었을 때와 
  // 토큰상태값(authorizationToken), 유저정보(info), 유저데이터(data) 값이 변경되었을 때 동작한다.
  useEffect(() => {
    // 로컬 스토리지에서 로그인 시 저장했던 토큰 불러오기
    const updateAuthorizationToken = localStorage.getItem('Authorization'); 
    
    // 로컬 토큰이 존재하면(= 로그인을 했었으면)
    if (updateAuthorizationToken) {
      // authorizationTokenState 상태 업데이트(= 로그인 상태 유지)
      setAuthorizationToken(updateAuthorizationToken);
  
      // get 요청으로 서버에서 데이터를 가져옴
      const getData = async () => {
        try {
          const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/members/me`,
            {
              headers: {
                Authorization: `Bearer ${updateAuthorizationToken}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );
          
          if(data.headers.get("Authorization") !== null) {
            const Authorization = data.headers.get("Authorization");
            localStorage.setItem('Authorization', Authorization);
          }

          setData(data.data);
          const { id, nickname, email, level, nationality, password, currentLocation, birth, } = data.data;
          setInfo({ id, nickname, email, level, nationality, password, currentLocation, birth, });
        } catch (err) {
          console.log(err);
        }
      };
      getData();
    }
  }, [setAuthorizationToken, setData, setInfo]);
}