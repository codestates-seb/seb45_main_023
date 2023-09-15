import { ToSmallButton } from "../../components/Buttons";
import { LogOutButton } from "../../components/LogOutButton";

export default function WelcomePage() {

	return (
		<form className="flex justify-center">
			<div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-[2rem] pb-4 bg-[#F6F8FA]">
				<section className="flex flex-col justify-center items-center h-[100vh]">
					<div className="flex flex-col justify-center items-center text-[60px] font-bold mb-[50px]">
						<div className="">Welcome to</div>
						<div className="text-[70px] text-[#0088F8]">MarbleUs</div>
					</div>
					<section className="flex gap-[40px]">
						{/* 로그아웃 버튼 나중에 삭제할 것! (test중...) */}
						<LogOutButton/>
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
							colorName="purple"
							title="mypage"
						/>
					</section>
				</section>
				<footer className="text-gray-600">
					<i class="fa-regular fa-copyright"></i> MarbleUs Corp. All rights
					reserved.
				</footer>
			</div>
		</form>
	);
}