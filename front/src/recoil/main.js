import { atom } from "recoil";

export const diceValueState = atom({
	key: "diceValueState",
	default: 0,
});

export const diceControlState = atom({
	key: "diceControlState",
	default: true,
});

export const beadIndexState = atom({
	key: "beadIndexState",
	default: 0,
});

export const currentLocationNameState = atom({
	key: "currentLocationNameState",
	default: "시작",
});

export const modalState = atom({
	key: "modalState",
	default: false,
});
