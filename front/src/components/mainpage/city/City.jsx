import React from "react";
import { Link } from "react-router-dom";
import "./City.css";

const City = ({ location }) => {
	let width, height;
	let frontColor, backColor;

	if (location.direction === "H") {
		width = "w-28";
		height = "h-34";
	} else if (location.direction === "V") {
		width = "w-36";
		height = "h-28";
	} else if (location.direction === "S") {
		width = "w-36";
		height = "h-34";
	}

	if (location.cityId >= 1 && location.cityId <= 4) {
		frontColor = "red-500";
		backColor = "red-700";
	} else if (location.cityId >= 6 && location.cityId <= 9) {
		frontColor = "yellow-500";
		backColor = "yellow-700";
	} else if (location.cityId >= 11 && location.cityId <= 14) {
		frontColor = "green-500";
		backColor = "green-700";
	} else if (location.cityId >= 16 && location.cityId <= 19) {
		frontColor = "blue-300";
		backColor = "blue-500";
	} else {
		frontColor = "slate-500";
		backColor = "slate-700";
	}

	return (
		<Link to={`/bloglist/${location.cityId}`} className="overflow-hidden">
			<article
				className={`elative flex flex-col m-5 ${width} ${height} items-start rounded-lg overflow-hidden card-container`}
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
						className={`absolute w-0 h-0 border-l-[0px] border-l-transparent border-b-[30px] border-b-${frontColor} border-r-[145px] border-r-transparent`}
					/>
					<div
						className={`w-0 h-0 border-l-[145px] border-l-transparent border-b-[20px] border-b-${backColor} border-r-[0px] border-r-transparent`}
					/>
				</header>
				<section className="flex w-full h-full flex-col justify-center items-start">
					<div
						className={` bottom-0 flex w-full h-full bg-${frontColor} flex-col justify-center items-start pl-3 flex-shrink-0`}
					>
						<h1 className=" flex z-10 items-center text-white text-md font-black">
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
