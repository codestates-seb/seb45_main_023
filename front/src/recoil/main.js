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

export const currentLocationState = atom({
	key: "current",
	default: "BLOCK_0",
});

export const modalState = atom({
	key: "modalState",
	default: false,
});
