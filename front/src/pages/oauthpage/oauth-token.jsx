import { useRecoilState } from "recoil";
import { authorizationTokenState } from "../../recoil/logInSignUpState";
import { useNavigate } from "react-router-dom";

export default function MyTokens () {
    const navigate = useNavigate();
    const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);

    // URL 매개변수 생성하고, 전달하기
    const urlParams = new URLSearchParams(window.location.search);
    const Authorization = urlParams.get('access_token');
    
    console.log('Authorization 잘 응답 받아왔는지 : ', Authorization);

    // local에 authorizationToken 저장, 확인하기
    localStorage.setItem('Authorization', Authorization);
    console.log(localStorage.getItem('Authorization'));

    // authorizationToken을 상태값에 저장, 확인하기
    setAuthorizationToken(Authorization);
    console.log('authorizationToken 상태 값 : ', authorizationToken);

    // 로그인 완료 후 웰컴페이지로 이동
    // window.location.replace(`${process.env.REACT_APP_SERVER_URL}/welcome`);
    navigate('/welcome');
    console.log('Login Success!');
    return null;
}