import React, {useState} from 'react';
import axios from 'axios';
import { authorizationTokenState } from '../../../recoil/logInSignUpState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/mypage';
import { useNavigate } from "react-router-dom";

// 기능 구현 중...
export default function WithdrawButton() {
    const navigate = useNavigate();
    const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
    const userinfo = useRecoilValue(userInfo);
    const userId = userinfo.id;

    const [isLoading, setIsLoading] = useState(false);

    // 회원 탈퇴 요청 보내기
    const handleWithdraw = async () => {
        // 로그인한 상태이면
        if(authorizationToken) {
            // 로딩 상태 시작
            setIsLoading(true);

            // 회원탈퇴 재차 확인
            const withdrawConfirm = window.confirm('정말로 회원 탈퇴하시겠습니까?');
    
            if(withdrawConfirm) {
                // 확인버튼 누른 경우
                try {
                // 서버에 회원 탈퇴 요청 보내기
                const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/members/withdraw/${userId}`, 
                    {
                        headers: {
                                Authorization: `Bearer ${authorizationToken}`, 
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420",
                            },
                    });

                    // authorization 토큰 갱신
                    if(response.headers.get("newaccesstoken")) {
                        setAuthorizationToken(response.headers.get("newaccesstoken"));
                        localStorage.setItem('Authorization', authorizationToken ?? '');
                    }

                    if (response.status === 204) {
                        // 로컬 스토리지의 토큰 삭제
                        localStorage.removeItem('Authorization');
                        
                        // 상태 토큰 삭제
                        setAuthorizationToken('');
                        
                        // 회원 탈퇴 성공 알림
                        alert('회원 탈퇴가 완료되었습니다.')

                        // 로딩 상태 종료
                        setIsLoading(false);

                        // 로그인 페이지로 이동
                        navigate('/login');
                    } else {
                        // 회원 탈퇴 실패 알림
                        alert('회원 탈퇴에 실패했습니다.');

                        // 로딩 상태 종료
                        setIsLoading(false);

                        // 
                    }
                } catch (error) {
                    // 에러 처리 알림
                    alert('회원 탈퇴에 실패했습니다.');

                    // 로딩 상태 종료
                    setIsLoading(false);
                }
            } 
        } 
        // 로그인하지 않은 상태이면
        else {
            alert('비로그인 상태입니다.')
        }
    };

    return (
        <>
            <button type='button' onClick={handleWithdraw}
            className='w-[150px] h-[64px] inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-blue-300 bg-white text-black shadow-md font-semibold hover:bg-blue-300 active:bg-blue-500 active:border-blue-500 active:text-white transition duration-300 ease-in-out'
            >
            {isLoading ? '회원 탈퇴 중...' : '회원 탈퇴'}
            </button>
        </>
    );
}
