import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "./Dice.css";
import { diceControlState, diceValueState } from "../../../recoil/main";

const DICE_SIDES = {
	FRONT: "1",
	BACK: "2",
	RIGHT: "3",
	LEFT: "4",
	TOP: "5",
	BOTTOM: "6",
};

function Side({ direction, isVisible }) {
	const getTransform = () => {
		switch (direction) {
			case DICE_SIDES.FRONT:
				return "rotateY(0deg) translateZ(30px)";
			case DICE_SIDES.BACK:
				return "rotateY(180deg) translateZ(30px)";
			case DICE_SIDES.RIGHT:
				return "rotateY(90deg) translateZ(30px)";
			case DICE_SIDES.LEFT:
				return "rotateY(-90deg) translateZ(30px)";
			case DICE_SIDES.TOP:
				return "rotateX(90deg) translateZ(30px)";
			case DICE_SIDES.BOTTOM:
				return "rotateX(-90deg) translateZ(30px)";
			default:
				return "";
		}
	};

	const transformStyle = getTransform();

	return (
		<div
			className={`side ${direction} visible`}
			style={{ transform: transformStyle }}
		>
			{direction}
		</div>
	);
}

function Dice({ onRollDice }) {
	const [diceValue, setDiceValue] = useRecoilState(diceValueState);
	const [visibleSide, setVisibleSide] = useState(DICE_SIDES.FRONT);
	const [diceAnimationClass, setDiceAnimationClass] = useState("dice");
	const [diceControl, setDiceControl] = useRecoilState(diceControlState);

	useEffect(() => {
		if (diceValue !== undefined) {
			if (diceValue >= 1) {
				setDiceControl(false);

				setDiceAnimationClass("dice-fast");
				setTimeout(() => {
					setDiceAnimationClass("dice-stop");
					setVisibleSide(diceValue.toString());
				}, 2000);
			} else {
				setDiceAnimationClass("dice");
			}
		}
		DICE_SIDES.FRONT = diceValue;
	}, [diceValue, setDiceControl]);

	const rollDiceHandler = async () => {
		if (!diceControl) {
			return;
		} else {
			// 주사위 굴리기 시작
			const newValue = Math.floor(Math.random() * 6) + 1;
			setDiceValue(newValue);

			// 주사위 굴리기가 완료되면 diceControl을 다시 true로 설정
			setTimeout(() => {
				setDiceControl(false);
			}, 6000);

			setDiceControl(true);

			return newValue;
		}
	};

	return (
		<div
			className={`dice absolute top-1/2 left-1/2 z-100 cursor-pointer ${diceAnimationClass}`}
			onClick={async () => {
				const newValue = await rollDiceHandler();
				// 주사위 값을 부모 컴포넌트로 전달
				// 아래와 같이 주사위 값 변경 이벤트를 부모 컴포넌트에서 처리하도록 콜백 함수를 호출
				onRollDice(newValue);
			}}
		>
			<Side
				direction={DICE_SIDES.FRONT}
				isVisible={visibleSide === DICE_SIDES.FRONT}
			/>
			<Side
				direction={DICE_SIDES.BACK}
				isVisible={visibleSide === DICE_SIDES.BACK}
			/>
			<Side
				direction={DICE_SIDES.RIGHT}
				isVisible={visibleSide === DICE_SIDES.RIGHT}
			/>
			<Side
				direction={DICE_SIDES.LEFT}
				isVisible={visibleSide === DICE_SIDES.LEFT}
			/>
			<Side
				direction={DICE_SIDES.TOP}
				isVisible={visibleSide === DICE_SIDES.TOP}
			/>
			<Side
				direction={DICE_SIDES.BOTTOM}
				isVisible={visibleSide === DICE_SIDES.BOTTOM}
			/>
		</div>
	);
}

export default Dice;
