// credential는 반환된 ID 토큰이며 base64로 인코딩 된 JSON 웹 토큰 문자열로 된 ID 토큰입니다.
// credential를 디코딩하기 (jwt decode 사용하기)
// credentialResponse.credential을 디코딩하면 google 유저의 정보가 나온다.

// - aud : ID 토큰의 대상 애플리케이션에 대한 고유 식별자
// - azp : ID 토큰을 사용하여 액세스 요청을 수행하는 애플리케이션에 대한 고유 식별자
// - email : 이메일 주소
// - email-verified : 이메일 검증이 되었는가 ?
// - exp : ID 토큰 만료기간
// - family-name : 사용자의 last-name
// - given-name : 사용자의 first-name
// - iat : ID 토큰 발급 시간
// - iss : ID 토큰을 발급한 발급자의 URL 구글인 경우 accounts.google.com
// - jti : ID 토큰의 고유 식별자, 일회용 토큰을 처리하는데 사용
// - name : 사용자의 전체 이름
// - nbf : ID 토큰이 사용되기전, 기다려야하는 시간
// - picture : 사용자의 프로필 url
// - sub : 사용자의 고유 식별자, 사용자가 어플리케이션에 로그인할때마다 동일하게 유지

// Cross-Origin-Opener-Policy policy would block the window.postMessage call
// cors 에러가 계속나네요 ㅠ..

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function GoogleOAuth () {
    const navigate = useNavigate();
    return (
        <GoogleOAuthProvider clientId="280892538090-6p1ic8selb428u3528sd36n5ru020kcb.apps.googleusercontent.com">
            <GoogleLogin
            onSuccess={credentialResponse => {
                const decodeResponse = jwtDecode(credentialResponse.credential);
                console.log(credentialResponse);
                console.log(decodeResponse);
                navigate('/');
                }}
            onError={() => {
                console.log('Login Failed');
            }}
            
            theme='filled_blue' size='large' shape='circle' locale='en' width='220px' text='signin_with'
            />
        </GoogleOAuthProvider>
    );
}


