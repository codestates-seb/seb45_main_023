import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authorizationTokenState } from "../recoil/logInSignUpState";

// 임시로 welcome페이지에 넣어봤습니다. 
// 마이페이지에 해당 컴포넌트 사용해주세용~.~ & 버튼 스타일 맘대로 변경해도 됩니다.
// 일단 alert창으로 경고문구를 대신하고, 추후에 모달창을 구현하여 경고창을 구현할 예정이에요..ㅠ
export const LogOutButton = () => {
    const navigate = useNavigate();
    const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
    const [isLoading, setIsLoading] = useState(false);
  
    const logOutHandler = async () => {
      // 로딩 상태 설정
      setIsLoading(true);

      if(authorizationToken) {
        // 로그인 상태일 때 회원 탈퇴 버튼 누른 경우
        try {
          // 서버 API 호출
          const response = await axios.post(`${process.env.REACT_APP_TEST_URL}/logout`,{
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
              },
            }
          )

          if (response.status === 200) {
            // 로딩 상태 해제
            setIsLoading(false);

            // 로컬 스토리지에서 사용자 정보 삭제 (선택사항)
            localStorage.removeItem('Authorization');

            // 상태 토큰 삭제
            setAuthorizationToken('');
            
            // 로그아웃 후 로그인페이지로 이동
            navigate('/login');
            alert('로그아웃 되었습니다.');
          } else {
            // 로딩 상태 해제
            setIsLoading(false);

            // 회원 탈퇴 실패
            alert('로그아웃에 실패했습니다.');
          }
        } catch (error) {
          // 로딩 상태 해제
          setIsLoading(false);
          
          // 에러 처리
          alert('로그아웃에 실패했습니다.');
        }
      } else {
          // 로그인 상태가 아닐 때 회원 탈퇴 버튼 누른 경우
          // 로딩 상태 해제
          setIsLoading(false);
          
          // 에러 처리
          alert('로그인 상태가 아닙니다.');
      }
    }
    return (
      <button type="button" onClick={logOutHandler}
      className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-blue-300 bg-white text-black shadow-md font-semibold hover:bg-blue-300 active:bg-blue-500 active:border-blue-500 active:text-white transition duration-300 ease-in-out`}
      >
        {isLoading ? '로그아웃 중...' : '로그아웃'}
      </button>
    );
};