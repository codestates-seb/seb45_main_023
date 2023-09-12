/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import City from "./City";
import { locations, moveOrder } from "./locations";
import Bead from "./Bead";
import Dice from "./dice/Dice";
import Modal from "./Modal";
import { diceValueState, modalState } from "../../recoil/main";

const ANIMATION_INTERVAL = 1000;

const Board = () => {
	const [isOpen, setIsOpen] = useRecoilState(modalState);
	const [diceValue, setDiceValue] = useRecoilState(diceValueState);

	// 도시 컴포넌트 렌더링
	const renderLocations = (locations) => {
		return locations.map((location, index) => (
			<City
				key={index}
				onClick={() => console.log(location.name)}
				{...location}
			/>
		));
	};

	// 구슬 위치 및 이동 애니메이션
	const [beadIndex, setBeadIndex] = useState(0);
	const diceRef = useRef(); // Dice 컴포넌트의 ref

	// 구슬 현재 위치
	const getCurrentBeadPosition = useCallback(() => {
		if (beadIndex < moveOrder.length) {
			const [x, y] = moveOrder[beadIndex];
			return { x, y };
		}
		return { x: 5, y: 5 }; // 초기 위치
	}, [beadIndex]);

	const [currentBeadPosition, setCurrentBeadPosition] = useState(
		getCurrentBeadPosition()
	);

	// beadIndex 변경 시 구슬 위치 업데이트
	useEffect(() => {
		setCurrentBeadPosition(getCurrentBeadPosition());
	}, [beadIndex, getCurrentBeadPosition]);

	// 주사위 값이 변경될 때 구슬 이동 시작
	const handleRollDice = async (newValue) => {
		// 주사위 굴린 후 4초 딜레이 (4000ms)
		await new Promise((resolve) => setTimeout(resolve, 4000));

		// 구슬 이동 시작
		await moveBead(newValue, () => {
			// 구슬 이동이 완료되면 3초 후에 모달 열기
			setTimeout(() => {
				setIsOpen(true);
			}, 3000);
		});
	};

	const moveBead = async (steps, onComplete) => {
		let stepCount = 0;

		const moveStep = async () => {
			if (stepCount < steps) {
				console.log(`Moving bead step ${stepCount + 1}`);

				setBeadIndex((prevIndex) => {
					if (prevIndex < moveOrder.length - 1) {
						return prevIndex + 1;
					} else {
						return 0;
					}
				});

				stepCount++;
				setCurrentBeadPosition(getCurrentBeadPosition());

				// 1초 간격으로 이동
				await new Promise((resolve) => setTimeout(resolve, ANIMATION_INTERVAL));

				// 다음 스텝으로 이동
				moveStep();
			} else {
				if (onComplete) {
					onComplete();
				}
			}
		};

		// 이동 시작
		await moveStep();
	};

	return (
		<main
			id="board"
			className="relative grid grid-cols-6 grid-rows-6 gap-2 h-screen overflow-hidden"
			style={{
				minHeight: "900px",
				minWidth: "870px",
			}}
		>
			{/* 구슬 그리드 */}
			{Array.from({ length: 6 }).map((_, row) => (
				<div className="grid-row h-screen" key={row}>
					{Array.from({ length: 6 }).map((_, col) => (
						<div
							className="grid-cell relative"
							key={col}
							style={{ height: "calc(100% / 6)" }}
						>
							{currentBeadPosition.x === col &&
								currentBeadPosition.y === row && <Bead />}
						</div>
					))}
				</div>
			))}
			{/* 주사위 */}
			<Dice ref={diceRef} onRollDice={handleRollDice} />
			{/* 도시 라인 */}
			<section
				className="absolute left-0 bottom-0 col-span-1 row-span-6 flex flex-col-reverse h-screen items-center justify-between bg-gradient-to-b from-green-300 via-yellow-200 to-yellow-300 z-30"
				style={{
					minHeight: "900px",
				}}
			>
				{renderLocations(locations.slice(0, 6))}
			</section>
			<section
				className="absolute top-0 left-0 col-span-4 row-span-1 flex w-screen items-center justify-between bg-gradient-to-l from-blue-400 via-green-400 to-green-200 z-40"
				style={{
					minWidth: "870px",
				}}
			>
				{renderLocations(locations.slice(5, 11))}
			</section>
			<section
				className="absolute right-0 top-0 col-span-1 row-span-5 flex flex-col items-center h-screen justify-between bg-gradient-to-t from-yellow-300 via-blue-300 to-blue-400 z-10"
				style={{
					minHeight: "900px",
				}}
			>
				{renderLocations(locations.slice(10, 16))}
			</section>
			<section
				className="absolute bottom-0 right-0 col-span-4 row-span-1 w-screen flex items-center justify-between bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 z-20"
				style={{
					minWidth: "870px",
				}}
			>
				{renderLocations(locations.slice(15))}
			</section>
			{/* 모달 */}
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} />
		</main>
	);
};

export default Board;
