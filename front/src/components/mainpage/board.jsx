/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import City from "./City";
import { locations, moveOrder } from "./locations";
import Bead from "./Bead";
import Dice from "./dice/Dice";
import Modal from "./Modal";
import {
	diceValueState,
	beadIndexState,
	modalState,
	currentLocationNameState,
} from "../../recoil/main";
import axios from "axios";

const ANIMATION_INTERVAL = 1000;

const Board = () => {
	const [isOpen, setIsOpen] = useRecoilState(modalState);
	const [diceValue, setDiceValue] = useRecoilState(diceValueState);
	const [beadIndex, setBeadIndex] = useRecoilState(beadIndexState);
	const [currentLocationName, setCurrentLocationName] = useRecoilState(
		currentLocationNameState
	);

	// 도시 컴포넌트 렌더링
	const renderLocations = (locations) => {
		return locations.map((location, index) => (
			<City key={index} location={location} {...location} />
		));
	};

	// 구슬 위치 및 이동 애니메이션
	const diceRef = useRef(); // Dice 컴포넌트의 ref

	// 구슬 현재 위치
	const getCurrentBeadPosition = useCallback(() => {
		if (beadIndex < moveOrder.length) {
			const [x, y] = moveOrder[beadIndex];
			return { x, y };
		}
		return { x: 5, y: 5 }; // 초기 위치
	}, [beadIndex]);

	const [currentBeadPosition, setCurrentBeadPosition] = useState([
		getCurrentBeadPosition(),
	]);

	// beadIndex 변경 시 구슬 위치 업데이트
	useEffect(() => {
		setCurrentBeadPosition([getCurrentBeadPosition()]);
	}, [beadIndex, getCurrentBeadPosition]);

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
				setCurrentBeadPosition([getCurrentBeadPosition()]);

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

	// 주사위 값 변경시 이동 시작
	const handleRollDice = async (newValue) => {
		// 주사위 굴린 후 4초 딜레이
		await new Promise((resolve) => setTimeout(resolve, 4000));

		// 구슬 이동 시작
		await moveBead(newValue, () => {
			// 이동 완료 후 2초 뒤에 모달 열기
			setTimeout(() => {
				setIsOpen(true);
			}, 2000);
		});
	};

	const getCurrentLocation = () => {
		const x = currentBeadPosition[0].x;
		const y = currentBeadPosition[0].y;

		// moveOrder 배열 내부에서 현재 구슬 위치와 일치하는 인덱스 찾기
		const beadIndex = moveOrder.findIndex(([moveX, moveY]) => {
			return moveX === x && moveY === y;
		});

		// 해당 인덱스 기반의 locations 배열 도시 정보
		if (beadIndex !== -1 && beadIndex < locations.length) {
			const currentLocation = locations[beadIndex];
			return currentLocation;
		}

		return "여기가 어디지";
	};

	setCurrentLocationName(getCurrentLocation().name);

	const postCurrentLocationName = useCallback(async () => {
		try {
			await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/어디로/보내야/할까요?`,
				{
					currentLocationName: currentLocationName,
				}
			);
			console.log("POST 요청 성공");
		} catch (error) {
			console.error("POST 요청 중 오류 발생:", error);
		}
	}, [currentLocationName]);

	useEffect(() => {
		// currentLocationName을 서버에 POST
		if (isOpen) {
			postCurrentLocationName();
		}
	}, [isOpen, postCurrentLocationName]);

	console.log(getCurrentLocation());

	return (
		<main
			id="board"
			className="relative bg-slate-400 grid grid-cols-6 grid-rows-6 gap-8 pt-3 pb-3 pl-5 pr-5 h-screen shadow-lg overflow-hidden"
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
							{currentBeadPosition[0].x === col &&
								currentBeadPosition[0].y === row && <Bead />}
						</div>
					))}
				</div>
			))}
			{/* 주사위 */}
			<Dice ref={diceRef} onRollDice={handleRollDice} />
			{/* 도시 라인 */}
			<div className="m-20 shadow-lg">
				<section
					className="absolute bottom-0 right-0 z-10 pl-5 pr-5 bg-slate-100 col-span-4 row-span-1 w-screen flex items-center justify-between"
					style={{
						minWidth: "870px",
					}}
				>
					{renderLocations(locations.slice(0, 6).reverse())}
				</section>
				<section
					className="absolute left-0 bottom-0 pb-44 pt-42 pl-5 bg-slate-100 col-span-1 row-span-6 flex flex-col-reverse h-screen items-center justify-between"
					style={{
						minHeight: "900px",
					}}
				>
					{renderLocations(locations.slice(6, 10))}
				</section>
				<section
					className="absolute top-0 left-0 z-10 pl-5 pr-5 bg-slate-100 col-span-4 row-span-1 flex w-screen items-center justify-between"
					style={{
						minWidth: "870px",
					}}
				>
					{renderLocations(locations.slice(10, 16))}
				</section>
				<section
					className="absolute right-0 top-0 pb-44 pt-42 pr-5 bg-slate-100 col-span-1 row-span-5 flex flex-col items-center h-screen justify-between"
					style={{
						minHeight: "900px",
					}}
				>
					{renderLocations(locations.slice(16))}
				</section>
			</div>

			{/* 모달 */}
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				city={getCurrentLocation()}
			/>
		</main>
	);
};

export default Board;
