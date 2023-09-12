import React from "react";

const City = ({ name, direction, order, onClick }) => {
	let width, height, gradientDirection, textcolor, additionalClass;

	if (direction === "horizontal") {
		width = "w-28";
		height = "h-36";
	} else if (direction === "vertical") {
		width = "w-36";
		height = "h-28";
	} else if (direction === "Square") {
		width = "w-40";
		height = "h-40";
	}

	switch (order) {
		case 1:
			gradientDirection = "bg-gradient-to-bl";
			break;
		case 2:
			gradientDirection = "bg-gradient-to-tr";
			break;
		case 3:
			gradientDirection = "bg-gradient-to-br";
			break;
		case 4:
			gradientDirection = "bg-gradient-to-tl";
			break;
		default:
			gradientDirection = "";
	}

	switch (direction) {
		case "Square":
			textcolor = "grey-300";
			break;
		default:
			textcolor = "white";
	}

	if (direction === "Square") {
		additionalClass =
			"bg-white opacity-50 hover:opacity-90 transform active:scale-105";
	} else {
		additionalClass = "bg-opacity-80 hover:scale-105 active:scale-110";
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
