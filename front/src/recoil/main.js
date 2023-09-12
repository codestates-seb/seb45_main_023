import { atom } from "recoil";

export const diceValueState = atom({
	key: "diceValueState",
	default: 0,
});


export const modalState = atom({
	key: "modalState",
	default: false,
});
