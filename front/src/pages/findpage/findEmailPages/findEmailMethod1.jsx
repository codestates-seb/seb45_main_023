import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { 
    emailState,
    passwordState,
    nationalityState,
    birthDateState,
    authorizationTokenState,
} from '../../../recoil/logInSignUpState';
import {ToSmallButton} from "../../../components/Buttons";
import {FindSubmitButton} from "../../../components/buttons/findpage/FindSumbitButton";

export default function FindEmailMethod1 () {
    const navigate = useNavigate();
    
    // 상태관리 정의
    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [message, setMessage] = useState('');
    const [nationality, setNationality] = useRecoilState(nationalityState);
	const [birthDate, setBirthDate] = useRecoilState(birthDateState);
    const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // email 유효성 검사 조건 : 영어+숫자._-@영어+숫자.-.영어+숫자 (= 일반적인 이메일 형식)
    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    // password 유효성 검사 조건 : 영어+숫자+특수문자(@$!%*?&)를 모두 포함하며, 최소 8자 이상 (= 일반적인 비밀번호 형식)
    const validatePassword = (password) => {
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateForm = () => {
        const errors = {};

        if (!validateEmail(email)) {
            errors.email = "올바른 이메일 형식이 아닙니다.";
        }

        if (!validatePassword(password)) {
            errors.password =
                "비밀번호는 영어, 숫자, 특수문자를 모두 포함하고 최소 8자 이상이어야 합니다.";
        }

        if (!birthDate) {
			errors.birthDate = "생년월일을 선택해야 합니다.";
		} else {
			// 입력된 날짜가 현재 날짜보다 큰 경우 에러 표시
			const currentDate = new Date();
			const selectedDate = new Date(birthDate);
			if (selectedDate >= currentDate) {
				errors.birthDate = "올바른 생년월일을 입력해야 합니다.";
			}
		}

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
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
            nationality,
            birthDate,
        };

        try {
            // 서버 API 호출
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/엔드포인트/???`,
			requestData,
			    {
				    headers: {
                            Authorization: `Bearer ${authorizationToken}`,
					        "Content-Type": "application/json",
							"ngrok-skip-browser-warning": "69420",
						},
			    }
			);

            // authorization 토큰 갱신
            if(response.headers.get("Authorization")) {
                const Authorization = response.headers.get("Authorization");
                localStorage.setItem('Authorization', Authorization ?? '');
            };

            console.log(response)
            console.log(response.data)

            // 로그인 성공 시 기존의 이메일을 받아옴
            const getEmail = response.data.email;

            // 상태로 이메일 저장
            setMessage(`찾으시는 이메일은 ${getEmail} 입니다.`);

            alert(message)

            // 로그인페이지로 이동
            navigate("/login");
        } catch (error) {
            // 로딩 상태 해제
            setIsLoading(false);

            // 로그인 실패 처리
            setErrors({ serverError: "조건에 맞는 이메일이 없습니다." });
        }
    };

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <form onSubmit={handleSubmit} className="flex flex-col  items-center w-[30rem] h-[50rem] shadow-xss rounded-[2rem] bg-[#F6F8FA]">
                <div className='flex justify-between items-center w-[100%] px-[40px] mt-[20px] mb-[100px]'>
                    <span className="font-bold text-black text-[24px]">
                        MarbleUs
                    </span>
                    <div className='flex gap-[8px]'>
                        <ToSmallButton linkName='mainpage' Size='sm' iconName='mainpage' colorName='orange' title='mainpage'/>
                        <ToSmallButton linkName='loginpage' Size='sm' iconName='loginpage' colorName='blue' title='loginpage'/>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center font-semibold text-gray-800">
                    <div className="text-[30px]">
                        이메일 찾기 예시 1
                    </div>
                    <div className="text-[20px] mb-[60px]">
                        ( Find Your E-mail )
                    </div>
                </div>
                <div className="flex flex-col gap-[30px]">
                    {/* <div className="flex flex-col justify-center">
                        <label htmlFor="email" className="font-medium text-[20px] block mb-[7px]">
                            이메일 / E-mail
                        </label>
                        <input type="email" name="email" id="email" placeholder="email@example.com" value={email} onChange={(event) => setEmail(event.target.value)} className="w-[100%] h-[50px] bg-white text-[#6C6C6C] text-[18px] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]">
                        </input> 
                        {errors.email && (
							<p className="text-red-500 mb-[-24px] w-[400px]">{errors.email}</p>
						)}
                    </div> */}
                    <div className="flex flex-col justify-center">
                        <label htmlFor="password" className="font-medium text-[20px] block mb-[7px]">
                            비밀번호 / Password
                        </label>
                        <input type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} className="w-[100%] h-[50px] bg-white text-[#6C6C6C] text-[18px] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]">
                        </input> 
                        {errors.password && (
							<p className="text-red-500 mb-[-30px] w-[400px]">{errors.password}</p>
						)}
                    </div>
                    <div className="flex flex-col justify-center">
                        <label htmlFor="date" className="font-medium text-[20px] block mb-[7px]">
                            생년월일 / Date of birth
                        </label>
                        <input type="date"
							name="date"
							value={birthDate}
							onChange={(event) => setBirthDate(event.target.value)} className="w-[100%] h-[50px] bg-white text-[#6C6C6C] text-[18px] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]">
                        </input> 
                        {errors.birthDate && (
                            <p className="text-red-500 mb-[-24px] w-[400px]">
                                {errors.birthDate}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col justify-center">
                        <label htmlFor="nationality" className="font-medium text-[20px] block mb-[7px]">
                            국적 / Nationality
                        </label>
                        <select type="nationality"
							name="nationality"
							value={nationality}
							onChange={(event) => setNationality(event.target.value)} className="w-[100%] h-[50px] bg-white text-[#6C6C6C] text-[18px] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]">
							<option value="대한민국">대한민국 / Republic of Korea</option>
							<option value="미국">미국 / America</option>
							<option value="중국">중국 / China</option>
							<option value="일본">일본 / Japan</option>
                        </select> 
                    </div>
                    <FindSubmitButton text='Submit' />
                </div>
                <footer className="text-gray-600 relative bottom-[-30px]">
                    <i class="fa-regular fa-copyright"></i> MarbleUs Corp. All rights reserved.
                </footer>
            </form>
        </div>
    )
};