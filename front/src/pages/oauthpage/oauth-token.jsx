import { useRecoilState } from "recoil";
import { authorizationTokenState } from "../../recoil/logInSignUpState";

export default function MyTokens () {
    const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);

    const urlParams = new URLSearchParams(window.location.search);
    const Authorization = urlParams.get('access_token');
    if (!Authorization) {
        // 로그인 실패 시 아무것도 렌더링하지 않고, 웰컴페이지로도 가지 않음
        console.log('Login failed');
        return null; 
    } else {
        console.log('Authorization : ', Authorization);
    
        // local에 authorizationToken 저장, 확인하기
        localStorage.setItem('Authorization', Authorization);
        console.log(localStorage.getItem('Authorization'));
    
        // authorizationToken을 상태값에 저장, 확인하기
        setAuthorizationToken(Authorization);
        console.log('google authorizationToken : ', authorizationToken);
    
        // 로그인 완료 후 웰컴페이지로 이동
        window.location.replace(`${process.env.REACT_APP_SERVER_URL}/welcome`);
        console.log('Login Success!');
        return null;
    }
}