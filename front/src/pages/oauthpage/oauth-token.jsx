import { useRecoilState } from "recoil";
import { authorizationTokenState } from "../../recoil/logInSignUpState";

export default function MyTokens () {
    const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);

    const urlParams = new URLSearchParams(window.location.search);
    const Authorization = urlParams.get('Authorization');
    
    // local에 authorizationToken 저장하기
    localStorage.setItem('Authorization', Authorization ?? '');

    // local에 저장된 authorizationToken을 상태값에 저장하기
    setAuthorizationToken(Authorization);

    // authorizationToken 상태 값 확인
    console.log(authorizationToken);

    // 로그인 완료 후 웰컴페이지로 이동
    window.location.replace('/welcome');
    console.log('Login Success!');
    return null;
}