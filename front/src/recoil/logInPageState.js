import { atom } from "recoil";
  
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

// Email 유효성 검사 상태관리
export const emailValidState = atom({
    key: 'emailValidState',
    default: true,
  });
  
// password 유효성 검사 상태관리
export const passwordValidState = atom({
    key: 'passwordValidState',
    default: true,
});

// accessToken 상태관리
export const accessTokenState = atom({
    key: 'accessTokenState',
    default: '',
});