import React from "react";

const City = ({ name, direction, onClick }) => {
	let width, height, gradientDirection, textcolor, additionalClass;

	if (direction === "H") {
		width = "w-28";
		height = "h-36";
		textcolor = "white";
		additionalClass = "bg-opacity-80 hover:scale-105 active:scale-110";
	} else if (direction === "V") {
		width = "w-36";
		height = "h-28";
		textcolor = "white";
		additionalClass = "bg-opacity-80 hover:scale-105 active:scale-110";
	} else if (direction === "S") {
		width = "w-40";
		height = "h-40";
		textcolor = "grey-300";
		additionalClass =
			"bg-white opacity-50 hover:opacity-90 transform active:scale-105";
	}

	return (
		<div
			className={`flex items-center justify-center col-span-1 row-span-1 ${width} ${height} m-2 ${gradientDirection} rounded-lg shadow-lg cursor-pointer transition duration-500 ease-in-out ${additionalClass}`}
			onClick={onClick}
		>
			<span
				className={`text-xl font-semibold text-${textcolor} flex items-center justify-center h-full`}
			>
				{name}
			</span>
		</div>
	);
};

export default City;
