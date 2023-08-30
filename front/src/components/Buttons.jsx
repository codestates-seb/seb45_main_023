// 테일윈드는 동적으로 prop 값을 못 받는다네요... 여기서 그냥 가져다 쓰세여 색상별로 만들어 둘게요

export const Button = ({ text }) => {
	return (
		<button
			className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-blue-300 bg-white text-black shadow-md font-semibold hover:bg-blue-300 active:bg-blue-500 active:border-blue-500 active:text-white transition duration-300 ease-in-out`}
		>
			{text}
		</button>
	);
};

export const GreenButton = ({ text }) => {
	return (
		<button
			className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-green-300 bg-white text-black shadow-md font-semibold hover:bg-green-300 active:bg-green-500 active:border-green-500 active:text-white transition duration-300 ease-in-out`}
		>
			{text}
		</button>
	);
};

export const PurpleButton = ({ text }) => {
	return (
		<button
			className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-purple-300 bg-white text-black shadow-md font-semibold hover:bg-purple-300 active:bg-purple-500 active:border-purple-500 active:text-white transition duration-300 ease-in-out`}
		>
			{text}
		</button>
	);
};

export const NegativeButton = ({ text }) => {
	return (
		<button className="inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-white bg-blue-300 shadow-md hover:bg-white hover:text-black text-white font-semibold active:bg-blue-100 active:border-blue-100 active:text-black transition duration-300 ease-in-out">
			{text}
		</button>
	);
};

export const NegativeButtonGreen = ({ text }) => {
	return (
		<button className="inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-white bg-green-500 shadow-md hover:bg-white hover:border-white hover:text-black text-white font-semibold  active:bg-green-100 active:border-green-100 active:text-black transition duration-300 ease-in-out">
			{text}
		</button>
	);
};

export const ToMypage = () => {
	return (
		<button className="inline-flex items-center justify-center gap-2 p-3 pr-6 rounded-full border-4 border-solid border-purple-300 bg-white shadow-md text-black font-bold hover:bg-purple-300 active:bg-white active:border-white hover:text-white active:text-purple-300 transition duration-300 ease-in-out">
			<div className="pl-6 pr-2">마이페이지 미션 탭으로</div>
			<div className="inline-flex items-center justify-center w-10 h-10 flex-shrink-0 bg-purple-300 rounded-full text-white">
				<i className="fa-solid fa-arrow-right text-2xl" />
			</div>
		</button>
	);
};

export const ToBoard = () => {
	return (
		<button className="inline-flex items-center justify-center gap-2 p-3 pr-6 rounded-full border-4 border-solid border-sky-300 bg-white shadow-md text-black font-bold hover:bg-sky-300 hover:text-white active:bg-white active:border-white active:text-sky-300 transition duration-300 ease-in-out">
			<div className="pl-6 pr-2">여행 후기 게시판으로</div>
			<div className="inline-flex items-center justify-center w-10 h-10 flex-shrink-0 bg-sky-300 rounded-full text-white">
				<i className="fa-solid fa-arrow-right text-2xl" />
			</div>
		</button>
	);
};

export const Signup = () => {
	return (
		<button className="inline-flex items-center justify-center gap-2 p-3 pr-6 rounded-full border-4 border-solid border-white bg-sky-400 shadow-md text-white font-bold hover:bg-white hover:text-black active:bg-sky-200 active:border-sky-200 active:text-black transition duration-300 ease-in-out">
			<div className="inline-flex items-center justify-center w-10 h-10 flex-shrink-0 bg-white rounded-full text-sky-400">
				<i className="fa-solid fa-plane text-2xl" />
			</div>
			<div className="pl-6 pr-2">Sign up with MarbleUs</div>
		</button>
	);
};

// 테일윈드로는 테두리 그라데이션이 안 들어가서 트랜지션 넣는 게 어려줘졌는데 방법 아시는 분?
export const GoogleLogin = ({ text }) => {
	return (
		<button
			className="inline-flex items-center justify-center gap-2 p-1 rounded-full shadow-md font-semibold transition duration-300 ease-in-out"
			style={{
				backgroundImage:
					"linear-gradient(to right, #FF3D00, #FFC107, #4CAF50, #1976D2)",
			}}
		>
			<div className="inline-flex bg-white text-black p-2 pr-8 hover:bg-grey-200 rounded-full">
				<div className="inline-flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
					>
						<path
							d="M39.7398 16.7979C39.6722 16.3811 39.3068 16.083 38.8845 16.083H38.0415C38.0186 16.083 38 16.0644 38 16.0415C38 16.0186 37.9814 16 37.9585 16H24C21.7909 16 20 17.7909 20 20C20 22.2091 21.7909 24 24 24H24.6805C27.9118 24 30.0371 27.3055 27.5255 29.3385C25.4695 31.0026 22.8529 32 20 32C13.373 32 8 26.627 8 20C8 13.373 13.373 8 20 8C21.6946 8 23.3045 8.35414 24.7637 8.99052C26.7262 9.84634 29.1433 9.85666 30.6572 8.3428C32.2753 6.72473 32.2418 4.04541 30.283 2.86241C27.2799 1.04869 23.7651 0 20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 18.9097 39.9088 17.8406 39.7398 16.7979Z"
							fill="#FFC107"
						/>
						<path
							d="M4.06008 7.93453C2.92528 9.4327 3.4277 11.5139 4.94326 12.6253C6.93812 14.0883 9.80387 13.2186 11.5601 11.4763C13.7261 9.32758 16.7063 8 19.9997 8C21.6943 8 23.3042 8.35414 24.7634 8.99052C26.7258 9.84634 29.143 9.85666 30.6569 8.3428C32.2749 6.72473 32.2414 4.04541 30.2826 2.86241C27.2795 1.04869 23.7648 0 19.9997 0C13.4885 0 7.71007 3.11574 4.06008 7.93453Z"
							fill="#FF3D00"
						/>
						<path
							d="M20.0003 40C23.4586 40 26.7053 39.114 29.5386 37.5638C31.7509 36.3533 31.6989 33.3606 29.7738 31.7315C28.2814 30.4687 26.1312 30.4918 24.3079 31.1973C22.9429 31.7256 21.4831 32.0011 20.0003 32C16.6309 32 13.5908 30.6083 11.4148 28.37C9.64839 26.5529 6.6626 25.637 4.65515 27.1837C3.2293 28.2823 2.76026 30.2666 3.81647 31.7241C7.44795 36.7353 13.3381 40 20.0003 40Z"
							fill="#4CAF50"
						/>
						<path
							d="M39.7398 16.7979C39.6722 16.3811 39.3068 16.083 38.8845 16.083H38.0415C38.0186 16.083 38 16.0644 38 16.0415C38 16.0186 37.9814 16 37.9585 16H24C21.7909 16 20 17.7909 20 20C20 22.2091 21.7909 24 24 24H24.6758C27.9071 24 30.0318 27.3089 27.5161 29.3368C27.4174 29.4164 27.3174 29.4944 27.216 29.571C27.2178 29.5698 27.2201 29.57 27.2218 29.5713L29.6796 31.6511C31.6554 33.3231 35.1566 33.3602 36.6013 31.2125C38.2845 28.7102 40 24.9403 40 20C40 18.9097 39.9088 17.8406 39.7398 16.7979Z"
							fill="#1976D2"
						/>
					</svg>
				</div>
				<div className="p-2 ml-4 ">Sign up with Google</div>
			</div>
		</button>
	);
};

export const RefreshButton = ({ text }) => {
	return (
		<button className="inline-flex items-center justify-center gap-2 p-4 rounded-full shadow-md bg-slate-300 hover:bg-white hover:text-black text-white font-semibold active:bg-grey-500 active:bg-slate-500 active:text-white transition duration-300 ease-in-out">
			<i class="fa-solid fa-arrows-rotate text-2xl pr-1 pl-1" />
		</button>
	);
};

export const CloseButton = ({ text }) => {
	return (
		<button className="inline-flex items-center justify-center gap-2 p-4 rounded-full shadow-md bg-slate-300 hover:bg-white hover:text-black text-white font-semibold active:bg-grey-500 active:bg-slate-500 active:text-white transition duration-300 ease-in-out">
			<i class="fa-solid fa-xmark text-2xl pr-2 pl-2" />
		</button>
	);
};
