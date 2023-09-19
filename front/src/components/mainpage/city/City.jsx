import React from "react";
import { Link } from "react-router-dom";
import "./City.css";

const City = ({ location }) => {
	let width = "w-28";
	let height = "h-34";

	if (location.direction === "V") {
		width = "w-36";
		height = "h-28";
	} else if (location.direction === "S") {
		width = "w-36";
		height = "h-34";
	}

	let bgColor = "bg-red-500"; // Default background color
	let borderColor = "border-red-500"; // Default border color
	let borderBottomColor = "border-red-700"; // Default border bottom color

	if (location.cityId >= 1 && location.cityId <= 4) {
		bgColor = "bg-red-500";
		borderColor = "border-red-500";
		borderBottomColor = "border-red-700";
	} else if (location.cityId >= 6 && location.cityId <= 9) {
		bgColor = "bg-yellow-500";
		borderColor = "border-yellow-500";
		borderBottomColor = "border-yellow-700";
	} else if (location.cityId >= 11 && location.cityId <= 14) {
		bgColor = "bg-green-500";
		borderColor = "border-green-500";
		borderBottomColor = "border-green-700";
	} else if (location.cityId >= 16 && location.cityId <= 19) {
		bgColor = "bg-blue-300";
		borderColor = "border-blue-300";
		borderBottomColor = "border-blue-500";
	} else {
		bgColor = "bg-slate-500";
		borderColor = "border-slate-500";
		borderBottomColor = "border-slate-700";
	}

	return (
		<Link to={`/bloglist/${location.cityId}`} className="overflow-hidden">
			<article
				className={`relative flex flex-col m-5 ${width} ${height} items-start rounded-lg overflow-hidden card-container`}
			>
				{location.cityId ? (
					<img
						src={`/region/${location.ENG}.png`}
						alt="cityPicture"
						className="h-16 flex-shrink-0 rounded-lt-20px rounded-rt-20px object-cover"
					/>
				) : (
					<div className="h-4 flex-shrink-0" />
				)}
				<header
					className="relative flex h-20px flex-col items-start flex-shrink-0 self-stretch"
					style={{ marginTop: "-20px" }}
				>
					<div
						className={`absolute w-0 h-0 border-l-[0px] border-l-transparent ${borderColor} border-b-[20px] border-r-[145px] border-r-transparent`}
					/>
					<div
						className={`w-0 h-0 border-l-[145px] border-l-transparent ${borderBottomColor} border-b-[20px] border-r-[0px] border-r-transparent`}
					/>
				</header>
				<section className="flex w-full h-full flex-col justify-center items-start">
					<div
						className={`bottom-0 flex w-full h-full ${bgColor} flex-col justify-center items-start pl-3 flex-shrink-0`}
					>
						<h1 className="flex z-10 items-center text-white text-md font-black">
							{location.name}
						</h1>
						<h2 className="flex items-center gap-10px text-slate-900 text-xs font-medium">
							{location.ENG}
						</h2>
					</div>
				</section>
			</article>
		</Link>
	);
};

export default City;
