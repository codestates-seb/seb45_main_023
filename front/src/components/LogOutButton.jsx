import { useRecoilState } from "recoil";
import { authorizationTokenState } from "../recoil/logInSignUpState";
import { useNavigate } from "react-router-dom";

// 임시로 welcome페이지에 넣어봤습니다. (test 중...)
export const LogOutButton = () => {
    const navigate = useNavigate();
    const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState)
  
    const logOutHandler = () => {
        if(authorizationToken) {
            // 로컬에 저장된 토큰 지우기
            localStorage.removeItem('Authorization');
          
            // 상태에 저장된 토큰 지우고, 상태 업데이트
            setAuthorizationToken('');
            
            // 로그아웃 후 원하시는 위치로 이동시키기 (임시로 로그인페이지로 이동시킵니다. 변경해주세용~)
            navigate('/login');
            return null;
        } else {
            alert('이미 로그아웃 되었습니다.')
        }
    }

    return (
      <button type="button" onClick={logOutHandler}
      className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-blue-300 bg-white text-black shadow-md font-semibold hover:bg-blue-300 active:bg-blue-500 active:border-blue-500 active:text-white transition duration-300 ease-in-out`}
      >
        LogOut
      </button>
    );
  };