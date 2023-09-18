import React from "react";

const City = ({ location, onClick }) => {
	let width, height, textcolor, additionalClass;

	if (location.direction === "H") {
		width = "w-28";
		height = "h-36";
		textcolor = "white";
		additionalClass = "bg-opacity-80 hover:scale-105 active:scale-110";
	} else if (location.direction === "V") {
		width = "w-36";
		height = "h-28";
		textcolor = "white";
		additionalClass = "bg-opacity-80 hover:scale-105 active:scale-110";
	} else if (location.direction === "S") {
		width = "w-40";
		height = "h-40";
		textcolor = "grey-300";
		additionalClass =
			"bg-white opacity-50 hover:opacity-90 transform active:scale-105";
	}

	return (
		<article className="flex w-180px items-start gap-10 rounded-20px shadow-md">
			<img
				src="<path-to-image>"
				alt="City"
				className="w-180px h-240px flex-shrink-0 rounded-20px"
				style={{
					background: "url(), lightgray 50% / cover no-repeat",
				}}
			/>
			<section className="flex w-180px h-134px flex-col justify-center items-start absolute rounded-20px 20px 0px 0px">
				<div className="flex h-107px p-0px-10px flex-col justify-center items-center flex-shrink-0 self-stretch bg-white rounded-20px 20px 0px 0px">
					<h1 className="flex p-10px items-center text-black text-24px font-bold">
						City Name
					</h1>
					<h2 className="flex p-0px-10px items-center gap-10px text-black text-14px font-semibold">
						<span>Population:</span>
						<span>1,000,000</span>
					</h2>
				</div>
				<footer className="flex h-27px flex-col items-center gap--34px flex-shrink-0 self-stretch">
					<div className="w-0px h-0px border-b-180px border-solid border-gray-600 border-l-0px border-transparent border-r-255px fill-white filter drop-shadow-0px-6px-10px rgba-0-0-0-0-1"></div>
					<div className="w-0px h-0px border-b-180px border-solid border-gray-600 border-l-255px border-transparent border-r-0px fill-gray-600 filter drop-shadow-0px-6px-10px rgba-0-0-0-0-1"></div>
				</footer>
			</section>
		</article>
	);
};

export default City;
