import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authorizationTokenState } from "../../recoil/logInSignUpState";
import { ToSmallButton } from "../Buttons";

export const LogOutButton = () => {
    const navigate = useNavigate();
    const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
  
    const logOutHandler = async () => {
      if(authorizationToken) {
        // 로그인 상태일 때
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
            // 로컬 스토리지에서 사용자 정보 삭제 (선택사항)
            localStorage.removeItem('Authorization');

            // 상태 토큰 삭제
            setAuthorizationToken('');
            
            // 로그아웃 후 로그인페이지로 이동
            navigate('/login');
            alert('로그아웃 되었습니다.');
          } else {
            // 회원 탈퇴 실패
            alert('로그아웃에 실패했습니다.');
          }
        } catch (error) {
          // 에러 처리
          alert('로그아웃에 실패했습니다.');
        }
      }
    }
    return (
      <button type="button" onClick={logOutHandler} className='flex justify-center items-center'>
        <div className={`w-[40px] h-[40px] text-[20px] text-white bg-sky-400 hover:bg-[#0088F8] active:bg-gray-200 active:text-[#0088F8] rounded-full flex justify-center items-center transition duration-300 ease-in-out animate-pulse hover:animate-none shadow-md`}>
          {authorizationToken ? <i class="fa-solid fa-right-from-bracket" /> :  <ToSmallButton linkName='loginpage' Size='sm' iconName='loginpage' colorName='blue' title='loginpage'/> }
        </div>
      </button>
    );
};