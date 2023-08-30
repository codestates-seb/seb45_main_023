import { atom } from "recoil";

export const textState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});
  
export const isLoggedInState = atom({
	key: "isLoggedIn",
	default: false,
});

export const isModalOpenState = atom({
	key: "isModalOpenState",
	default: false,
});
