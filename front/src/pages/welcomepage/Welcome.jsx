import { ToSmallButton } from "../../components/Buttons";
import GetData from "../../components/GetData";

export default function WelcomePage() {
	GetData();
	return (
		<form className="flex justify-center items-center h-screen">
			<div className="flex flex-col items-center w-[50rem] h-[50rem] shadow-xss rounded-[2rem] bg-[#F6F8FA]">
				<section className="flex flex-col justify-center items-center h-[100vh]">
					<div className="flex flex-col justify-center items-center text-[60px] font-bold mb-[50px]">
						<div className="">Welcome to</div>
						<div className="text-[70px] text-[#0088F8]">MarbleUs</div>
					</div>
					<section className="flex gap-[40px]">
						<ToSmallButton
							linkName="mainpage"
							Size="lg"
							iconName="mainpage"
							colorName="orange"
							title="mainpage"
						/>
						<ToSmallButton
							linkName="mypage"
							Size="lg"
							iconName="mypage"
							colorName="green"
							title="mypage"
						/>
					</section>
				</section>
				<footer className="text-gray-600 mb-[14px]">
					<i class="fa-regular fa-copyright"></i> MarbleUs Corp. All rights
					reserved.
				</footer>
			</div>
		</form>
	);
}