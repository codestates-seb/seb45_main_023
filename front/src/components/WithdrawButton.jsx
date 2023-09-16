import React from 'react';
import axios from 'axios';
import { authorizationTokenState } from '../recoil/logInSignUpState';
import { useRecoilState } from 'recoil';

// 기능 구현 중...
export default function WithdrawButton() {
    const [, setAuthorizationToken] = useRecoilState(authorizationTokenState);

    // 회원 탈퇴 요청 보내기
    const handleWithdraw = async () => {
        // 기본값을 '취소'로 함
        const withdrawConfirm = window.confirm('정말로 회원 탈퇴하시겠습니까?')

        if(withdrawConfirm) {
            // 확인버튼 누른 경우
            try {
            // 서버에 회원 탈퇴 요청 보내기
            const response = await axios.delete(`${process.env.REACT_APP_TEST_URL}/withdraw`, {
                headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                        Authorization: `Bearer ${localStorage.getItem('Authorization')}`, 
                    },
                });
    
                if (response.status === 200) {
                    // 로컬 스토리지의 토큰 삭제
                    localStorage.removeItem('Authorization');
                    
                    // 상태 토큰 삭제
                    setAuthorizationToken('');
                    
                    // 회원 탈퇴 성공 알림
                    alert('회원 탈퇴가 완료되었습니다.')
                } else {
                    // 회원 탈퇴 실패 알림
                    alert('회원 탈퇴에 실패했습니다.');
                }
            } catch (error) {
            // 에러 처리 알림
            alert('회원 탈퇴에 실패했습니다.');
            }
        } 
    };

    return (
        <>
            <button type='button' onClick={handleWithdraw}
            className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-blue-300 bg-white text-black shadow-md font-semibold hover:bg-blue-300 active:bg-blue-500 active:border-blue-500 active:text-white transition duration-300 ease-in-out`}
            >
            회원탈퇴
            </button>
        </>
    );
}
