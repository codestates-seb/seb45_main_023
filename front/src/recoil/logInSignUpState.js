import { atom } from "recoil";

// authorizationToken 상태관리
export const authorizationTokenState = atom({
    key: 'authorizationTokenState',
    default: '',
});

// refreshToken 상태관리
export const refreshTokenState = atom({
    key: 'refreshTokenState',
    default: '',
});

// Email 상태관리
export const emailState = atom({
    key: 'emailState',
    default: '',
});

// password 상태관리
export const passwordState = atom({
    key: 'passwordState',
    default: '',
});

// password confirm 상태관리
export const confirmPasswordState = atom({
    key: 'confirmPasswordState',
    default: '',
  });

// nationality 상태관리
export const nationalityState = atom({
    key: 'nationalityState',
    default: '대한민국',
})

// birthDate 상태관리
export const birthDateState = atom({
    key: 'birthDateState',
    default: '',
})

// 이용약관 동의 상태관리
export const agreementState = atom({
    key: 'agreementState',
    default: 'false',
})