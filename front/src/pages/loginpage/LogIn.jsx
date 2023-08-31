import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { 
    emailState,
    passwordState,
    emailValidState,
    passwordValidState,
    accessTokenState,
} from "../../recoil/logInPageState";
import { SignUpButton, GoogleLogInButton } from "../../components/Buttons"

export default function LogIn () {
    // 상태관리 정의
    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [emailValid, setEmailValid] = useRecoilState(emailValidState);
    const [passwordValid, setPasswordValid] = useRecoilState(passwordValidState);
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

    // email 유효성 검사 핸들러
    // email 유효성 검사 조건 : 영어+숫자._-@영어+숫자.-.영어+숫자
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
    
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmailValid(emailRegex.test(newEmail));
        
        // 밑에 if는 확인용이라 나중에 삭제할 것
        if (emailValid) {
            console.log("Valid email");
        } else {
            console.log("Invalid email");
        }
    };
    
    // password 유효성 검사 핸들러
    // password 유효성 검사 조건 : 영어+숫자+특수문자(@$!%*?&)를 모두 포함하며, 최소 8자 이상
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setPasswordValid(passwordRegex.test(newPassword));
        
        // 밑에 if는 확인용이라 나중에 삭제할 것
        if (passwordValid) {
            console.log("Valid password");
        } else {
            console.log("Invalid password");
        }
    };
    
    // 로그인 핸들러, 비동기 처리
    const handleLogin = async () => {
        if (!emailValid || !passwordValid) {
            console.log('Invalid email or password');
            return;
        }
        try {
            const response = await axios.post('http://api@example.com/login', {
              email,
              password,
            });
      
            const data = response.data;
            setAccessToken(data.accessToken);
            console.log('Logged in!', data.accessToken);
          } catch (error) {
            console.log('Invalid credentials', error);
          }
    };

    // 확인 삼아 잠시 로그아웃 기능 구현함
    const handleLogout = () => {
        setAccessToken('');
        console.log('Logged out');
    };

    return (
        <>
        {/* 임시적으로 만듬 : 성공적으로 로그인 하여 accessToken이 있으면 로그아웃 버튼이 보이고, 없으면 로그인 페이지가 나온다
            login API가 완성되어야 정확한 테스트 할 수 있을 것 같습니다.
        */}
        {accessToken ? (
            <button onClick={handleLogout}>Logout</button>
        ) : (
        <main>
            {/* 오른쪽 하단의 여권을 클릭하면 loginPage로 온다. */}
            <form className="flex-col h-screen">
                <section className="flex justify-center items-center h-[90%] mb-[-120px] ">
                    <section className="w-[40%] h-[350px] shadow-2xl rounded-[20px]">
                        {/* 왼쪽 상단 */}
                        <div className="bg-sky-400
                            flex justify-between items-center pl-[7px] pr-[40px]
                            h-[53px] rounded-tl-[20px] rounded-tr-[20px] 
                            border-r-1 border-dashed border-gray-500">
                                <Link to='/'>
                                    <div className="flex items-center gap-[8px]">
                                        <div className="flex justify-center items-center">
                                            <div className="w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center">
                                                <i className="fa-solid fa-plane text-sky-400 text-[20px] rotate-[-45deg]" />
                                            </div>
                                        </div>
                                        <span className="font-bold text-white text-[24px]">
                                            MarbleUs
                                        </span>
                                    </div>
                                </Link>
                            <div className="font-medium text-white">
                                Boarding pass
                            </div>
                        </div>

                        {/* 왼쪽 하단 */}
                        <div className="
                            h-[297px] rounded-bl-[20px] rounded-br-[20px]
                            pt-[46px] pr-[30px] pb-[46px] pl-[30px]
                            border-r-1 border-dashed border-gray-500 bg-white">
                            <div>
                                <label for="email" className="font-medium text-[18px] block">
                                    Passenger Email
                                </label>
                                <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="example@example.com" 
                                    className="w-[75%] h-[40px] mt-[14px] bg-[#F2F2F2] text-[#6C6C6C] 
                                    rounded-[10px] pl-[15px] mb-[26px]">
                                </input>
                                {!emailValid && (
                                    <p className="text-red-500 mt-[-24px]">
                                        ❗️This is not an email format.
                                    </p>
                                )}
                            </div>
                            <div>
                                <label for="password" className="font-medium text-[18px] block">
                                    Password
                                </label>
                                <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="••••••••" 
                                    className="w-[75%] h-[40px] mt-[14px] bg-[#F2F2F2] text-[#6C6C6C] 
                                    rounded-[10px] pl-[15px]">
                                </input>
                                {!passwordValid && (
                                    <p className="text-red-500">❗️Password must be at least 8 characters long and include letters, numbers, and special characters.</p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="w-[20%] h-[350px] shadow-xl rounded-[20px]">
                        {/* 오른쪽 상단 */}
                        <div className="bg-sky-400
                            flex justify-center items-center
                            h-[53px] rounded-tl-[20px] rounded-tr-[20px] font-medium text-white">
                            Log In
                        </div>
                        {/* 오른쪽 하단 */}
                        <div className="h-[297px] flex justify-center items-center rounded-bl-[20px] rounded-br-[20px] bg-white">
                            <button onClick={handleLogin} className="w-[170px] h-[170px] rounded-full bg-sky-400 flex justify-center items-center hover:bg-[#0088F8]">
                                <i className="fa-solid fa-plane text-white text-[100px] rotate-[-45deg]" />
                            </button>
                        </div>
                    </section>
                </section>
                <section className="flex-col">
                    <div className="flex justify-center mb-[25px]">
                        <Link to='/signup'>
                            <SignUpButton />
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <GoogleLogInButton />
                    </div>
                </section>
            </form>
        </main>
        )}
        </>
    )
}