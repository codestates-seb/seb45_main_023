import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { 
    emailState,
    passwordState,
} from "../../recoil/logInSignUpState";
import { SignUpWithMarbleUsButton, GoogleLogInButton } from "../../components/Buttons";

export default function LogInForm () {
    const navigate = useNavigate();

    // 상태관리 정의
    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState);
    
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); 

    // email 유효성 검사 조건 : 영어+숫자._-@영어+숫자.-.영어+숫자
    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };
    
    // password 유효성 검사 조건 : 영어+숫자+특수문자(@$!%*?&)를 모두 포함하며, 최소 8자 이상
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };
    
    const validateForm = () => {
        const errors = {};
    
        if (!validateEmail(email)) {
          errors.email = '올바른 이메일 형식이 아닙니다.';
        }
    
        if (!validatePassword(password)) {
          errors.password = '비밀번호는 영어, 숫자, 특수문자를 모두 포함하고 최소 8자 이상이어야 합니다.';
        }
    
        setErrors(errors);
    
        return Object.keys(errors).length === 0;
    };    

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
          return;
        }

        // 로딩 상태 설정
        setIsLoading(true);

        // API 요청을 보내기 위한 데이터 준비
        const requestData = {
          email,
          password,
        };
    
        try {
          // 서버 API 호출 (POST)
          // const response = await axios.post('https://api@example.com/auth/login', requestData);

          // 서버 API 호출 (GET)
          const response = await axios.get('https://api@example.com/auth/login', { params: requestData });
    
          // 로그인 성공 시 AccessToken을 받아옴
          const { accessToken } = response.data;
    
          // AccessToken을 저장하고 메인 페이지로 이동
          localStorage.setItem('accessToken', accessToken);
          navigate('/');
        } catch (error) {
          // 로딩 상태 해제
          setIsLoading(false);

          // 로그인 실패 처리
          setErrors({ serverError: '로그인에 실패했습니다.' });
        }
    };

    return (
        <main>
            {/* 메인페이지의 오른쪽 하단의 여권(로그인,회원가입 버튼)을 클릭하면 loginPage로 온다. */}
            <form onSubmit={handleLogin} className="flex-col h-screen">
                <section className="flex justify-center items-center h-[90%] mb-[-120px] ">
                    <section className="w-[40%] h-[350px] shadow-2xl rounded-[20px]">
                        {/* 로그인 폼 왼쪽 상단 */}
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

                        {/* 로그인 폼 왼쪽 하단 */}
                        <div className="
                            h-[297px] rounded-bl-[20px] rounded-br-[20px]
                            pt-[46px] pr-[30px] pb-[46px] pl-[30px]
                            border-r-1 border-dashed border-gray-500 bg-white">
                            <div>
                                <label htmlFor="email" className="font-medium text-[18px] block">
                                    Passenger Email
                                </label>
                                <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="example@example.com" 
                                    className="w-[75%] h-[40px] mt-[14px] bg-[#F2F2F2] text-[#6C6C6C] 
                                    rounded-[10px] pl-[15px] mb-[26px]">
                                </input>
                                {errors.email && 
                                    <p className="text-red-500 mt-[-24px]">
                                        {errors.email}
                                    </p>
                                }
                            </div>
                            <div>
                                <label htmlFor="password" className="font-medium text-[18px] block">
                                    Password
                                </label>
                                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" 
                                    className="w-[75%] h-[40px] mt-[14px] bg-[#F2F2F2] text-[#6C6C6C] 
                                    rounded-[10px] pl-[15px]">
                                </input>
                                {errors.password && 
                                    <p className="text-red-500">
                                        {errors.password}
                                    </p>
                                }
                            </div>
                        </div>
                    </section>

                    <section className="w-[20%] h-[350px] shadow-xl rounded-[20px]">
                        {/* 로그인 폼 오른쪽 상단 */}
                        <div className="bg-sky-400
                            flex justify-center items-center
                            h-[53px] rounded-tl-[20px] rounded-tr-[20px] font-medium text-white">
                            Log In
                        </div>
                        {/* 로그인 폼 오른쪽 하단 */}
                        <div className="h-[297px] flex justify-center items-center rounded-bl-[20px] rounded-br-[20px] bg-white">
                            <button type="submit" className={`w-[170px] h-[170px] rounded-full bg-sky-400 flex justify-center items-center hover:bg-[#0088F8] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                                {isLoading ? (
                                    <i className="fa-solid fa-spinner animate-spin text-white text-[100px] rotate-[-45deg]" />
                                ) : (
                                    <i className="fa-solid fa-plane text-white text-[100px] rotate-[-45deg]" />
                                )}
                            </button>
                        </div>
                    </section>
                </section>

                {/* 로그인 화면 하단 */}
                <section className="flex-col">
                    <div className="flex justify-center mb-[25px]">
                        <Link to='/signup'>
                            <SignUpWithMarbleUsButton />
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <GoogleLogInButton />
                    </div>
                </section>
            </form>
        </main>
    )
}
