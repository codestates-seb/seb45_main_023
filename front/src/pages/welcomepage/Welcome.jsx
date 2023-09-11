import { ToSmallButton } from "../../components/Buttons"

// (일반, 소셜) 로그인 성공시 나타나는 페이지
export default function WelcomePage () {
    return(
        <form className="flex justify-center">
            <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-[2rem] pb-4 bg-[#F6F8FA]">
                <section className="flex flex-col justify-center items-center h-[100vh]">
                    <div className="text-[40px] font-bold mb-[30px]">
                        Welcome to <span className="text-[#0088F8]">MarbleUs</span>
                    </div>
                    <section className="flex gap-[40px]">
                        <ToSmallButton linkName='mainpage' Size='lg' iconName='mainpage' colorName='orange' title='mainpage'/>
                        <ToSmallButton linkName='mypage' Size='lg' iconName='mypage' colorName='purple' title='mypage'/>
                    </section>
                </section>
                <footer className="text-gray-600">
                    <i class="fa-regular fa-copyright"></i> MarbleUs Corp. All rights reserved.
                </footer>
            </div>
        </form>
    )
}

// bare
// 회원가입 완료 시 회원가입 완료되었다는 창?이나 알림 주기

// advanced
// 비밀번호 찾기, 이메일 찾기
// 2차인증 (ex - 해당 이메일로 회원가입하면 기입한 이메일이 실제 존재하는 이메일인지 서버에서 코드보내서 5분?내로 인증해야함)