const Bead = () => {
	return (
		<>
			<div className="w-16 h-16 z-50 absolute right-1/3 top-1/3 border-gradient-to-bl border-opacity-90 border-1 opacity-90 shadow-lg rounded-full transition-transform bg-gradient-to-br from-white via-slate-400 to-slate-100 overflow-hidden">
				{/* 하얀색 블러 원 추가 */}
				<div
					className="rounded-full bg-white absolute filter blur-md"
					style={{
						transform: "translate(-30%, -60%)",
					}}
				></div>
			</div>
		</>
	);
};

export default Bead;
