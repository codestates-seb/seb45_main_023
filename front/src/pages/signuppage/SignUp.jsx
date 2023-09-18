import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, ToSmallButton } from "../../components/Buttons";
import TermsOfUse from "../../components/signuppage/TermsOfUse";
import {
	emailState,
	passwordState,
	confirmPasswordState,
	nationalityState,
	birthDateState,
	agreementState,
	authorizationTokenState,
} from "../../recoil/logInSignUpState";

export default function SignUpPage() {
	const navigate = useNavigate();

	// 상태관리
	const [email, setEmail] = useRecoilState(emailState);
	const [password, setPassword] = useRecoilState(passwordState);
	const [confirmPassword, setConfirmPassword] =
		useRecoilState(confirmPasswordState);
	const [nationality, setNationality] = useRecoilState(nationalityState);
	const [birthDate, setBirthDate] = useRecoilState(birthDateState);
	const [agreement, setAgreement] = useRecoilState(agreementState);
	const authorizationToken = useRecoilValue(authorizationTokenState);

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});

	// Email 유효성 검사 : 이메일 형식
	const validateEmail = (email) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailRegex.test(email);
	};

	// password 유효성 검사 : 영어, 숫자, 특수문자(@$!%*?&)를 모두 포함하며, 최소 8자 이상
	const validatePassword = (password) => {
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};

	// 회원가입 핸들러
	const validateForm = () => {
		// 에러 초기화
		const errors = {};

		// 유효성 검사 & 유효성 검사 실패시 내용 초기화
		if (!validateEmail(email)) {
			errors.email = "올바른 이메일 형식이 아닙니다.";
		}

		// 400번 에러가 뜨면 '이미 가입한 이메일입니다.' 라는 알림 보여주기!

		if (!validatePassword(password)) {
			errors.password =
				"비밀번호는 영어, 숫자, 특수문자를 모두 포함하고 최소 8자 이상이어야 합니다.";
		}

		if (!confirmPassword) {
			errors.confirmPassword = "비밀번호 확인을 입력해야 합니다.";
		} else {
			if (password !== confirmPassword) {
				errors.confirmPassword =
					"비밀번호와 비밀번호 확인이 일치하지 않습니다.";
			}
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

		if (agreement !== "true") {
			errors.agreement = "이용약관에 동의해야 합니다.";
		}

		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const handleSignUp = async (event) => {
		event.preventDefault();
		if (!validateForm()) {
			return;
		}

		// 로딩 상태를 활성화
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
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/members/signup`,
				requestData,
				{
					headers: {
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "69420",
					},
				}
			);

			// authorization 토큰 갱신
			if(response.headers.get("Authorization") !== null) {
				const Authorization = response.headers.get("Authorization");
				localStorage.setItem('Authorization', Authorization);
			};

			console.log(response.data);

			// 지금은 회원가입 성공시 경고창이 나온다.
			alert("Member Registered!");
			navigate("/login");
		} catch (error) {
			if (error.response && error.response.status === 409) {
				setErrors({ email: "이미 가입된 이메일입니다." });
			} else {
				// 회원가입 실패 처리
				setErrors({ serverError: "회원가입에 실패했습니다." });
			}
		} finally {
			// 로딩 상태를 비활성화 (성공 또는 실패에 관계없이 항상 실행되도록 함)
			setIsLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSignUp} className="flex justify-center">
				<div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-[2rem] pb-4 bg-[#F6F8FA]">
					<section className="flex flex-col border-b-1 border-[#ccc] h-[25rem]">
						<div className="flex justify-between items-center w-[100%] px-[40px] mt-[20px]">
							<div className="font-bold text-[20px] pl-[4px]">이용약관</div>
							<div className="flex gap-[8px]">
								<ToSmallButton
									linkName="mainpage"
									Size="sm"
									iconName="mainpage"
									colorName="orange"
									title="mainpage"
								/>
								<ToSmallButton
									linkName="loginpage"
									Size="sm"
									iconName="loginpage"
									colorName="blue"
									title="loginpage"
								/>
							</div>
						</div>
						{/* 이용약관 스크롤을 넣으니 이용약관 box가 계속 깨진다. ㅠㅠ 해결방법을 모르겠습니당 */}
						<div className="flex justify-center items-center">
							<div className="w-[90%] h-[240px] mt-[10px] rounded-2xl border-1 border-gray-500 text-lg font-semibold py-[20px] pl-[20px] pr-[10px]">
								<TermsOfUse />
							</div>
						</div>
						<div className="flex justify-center items-center h-[90px] gap-[100px]">
							<div className="font-semibold">
								<input
									type="radio"
									id="agree"
									name="agree"
									value="true"
									onClick={(event) => setAgreement(event.target.value)}
									className="cursor-pointer"
								></input>
								<label
									htmlFor="agree"
									className="pl-[8px] mr-[20px] cursor-pointer"
								>
									동의합니다.
								</label>
								<input
									type="radio"
									id="disagree"
									name="agree"
									value="false"
									onClick={(event) => setAgreement(event.target.value)}
									className="cursor-pointer"
								></input>
								<label htmlFor="disagree" className="pl-[8px] cursor-pointer">
									동의하지 않습니다.
								</label>
							</div>
							<div>
								{/* 회원가입 시도 중 버튼이 비활성화 되고, 로딩이 끝나면 다시 활성화 된다.*/}
								<Button
									type="submit"
									text="Sign Up"
									color="gray"
									disabled={isLoading}
								/>
							</div>
						</div>
						{errors.agreement && (
							<div className="text-red-500 mt-[-30px] mb-[9px] ml-[220px] text-[14px]">
								{errors.agreement}
							</div>
						)}
					</section>

					<section className="flex flex-col w-[600px] mt-[15px]">
						<div className="flex justify-between items-center text-[20px] font-bold mb-[15px] mr-[-20px]">
							<div className="flex justify-start items-center tracking-[1em]">
								MARBLEUS
							</div>
							<div className="flex flex-row justify-end items-center tracking-[1em]">
								PASSPORT
							</div>
						</div>
						<div className="flex justify-between mb-[38px]">
							<div>
								<label
									htmlFor="email"
									className="font-medium text-[16px] block mb-[7px]"
								>
									이메일 / E-mail
								</label>
								<input
									type="email"
									name="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									placeholder="example@example.com"
									className=" w-[250px] h-[30px] bg-white text-[#6C6C6C] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]"
								></input>
								{errors.email && (
									<div className="text-red-500 mb-[-25px] w-[280px] text-[14px]">
										{errors.email}
									</div>
								)}
							</div>
							<div>
								<label
									htmlFor="nationality"
									className="font-medium text-[16px] block mb-[7px]"
								>
									국적 / Nationality
								</label>
								<select
									name="nationality"
									value={nationality}
									onChange={(event) => setNationality(event.target.value)}
									className="w-[250px] h-[30px] bg-white text-[#6C6C6C] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]"
								>
									<option value="대한민국">대한민국 / Republic of Korea</option>
									<option value="미국">미국 / America</option>
									<option value="중국">중국 / China</option>
									<option value="일본">일본 / Japan</option>
								</select>
							</div>
						</div>
						<div className="flex justify-between mb-[38px]">
							<div>
								<label
									htmlFor="password"
									className="font-medium text-[16px] block mb-[7px]"
								>
									비밀번호 / Password
								</label>
								<input
									type="password"
									name="password"
									placeholder="••••••••"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									className="w-[250px] h-[30px] bg-white text-[#6C6C6C] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]"
								></input>
								{errors.password && (
									<p className="text-red-500 mb-[-42px] w-[280px] text-[14px]">
										{errors.password}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="date"
									className="font-medium text-[16px] block mb-[7px]"
								>
									생년월일 / Date of birth
								</label>
								<input
									type="date"
									name="date"
									value={birthDate}
									onChange={(event) => setBirthDate(event.target.value)}
									className="w-[250px] h-[30px] bg-white text-[#6C6C6C] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]"
								></input>
								{errors.birthDate && (
									<p className="text-red-500 mb-[-25px] text-[14px]">
										{errors.birthDate}
									</p>
								)}
							</div>
						</div>
						<div className="flex justify-between mb-[20px]">
							<div>
								<label
									htmlFor="password-confirm"
									className="font-medium text-[16px] block mb-[7px]"
								>
									비밀번호 확인 / Password confirm
								</label>
								<input
									type="password"
									name="password-confirm"
									placeholder="••••••••"
									value={confirmPassword}
									onChange={(event) => setConfirmPassword(event.target.value)}
									className="w-[250px] h-[30px] bg-white text-[#6C6C6C] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]"
								></input>
								{errors.confirmPassword && (
									<p className="text-red-500 mb-[-25px] w-[280px] text-[14px]">
										{errors.confirmPassword}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="authority"
									className="font-medium text-[16px] block mb-[7px]"
								>
									발행관청 / Authority
								</label>
								<input
									type="authority"
									name="authority"
									value="MarbleUs"
									className="w-[250px] h-[30px] bg-white text-[#6C6C6C] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]"
								></input>
							</div>
						</div>
					</section>
					<p className="w-[800px] pl-[20px] pt-[10px] pr-[20px] text-[16px] font-semibold break-words tracking-[0.46em]">
						{
							"MARBLEUS<<<<<<USER<<<<<<<<<<<<<<<<<<SEB45<<<<<<<<2023082420230922<<<ALLRIGHTSRESERVED"
						}
					</p>
				</div>
			</form>
			{/* 로그인 된 상태에서 회원가입 페이지로 오면 바로 mypage로 이동시킨다. */}
			{authorizationToken && <Navigate to="/mypage" replace={true} />}
		</>
	);
}
