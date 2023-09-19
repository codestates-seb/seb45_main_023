import { ToSmallButton } from "../../../components/Buttons";
import { FindMethodButton } from "../../../components/buttons/findpage/FindMethodButton";

export default function FindPassword () {
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <form className="flex flex-col  items-center w-[30rem] h-[50rem] shadow-xss rounded-[2rem] bg-[#F6F8FA]">
                <div className='flex justify-between items-center w-[100%] px-[40px] mt-[20px] mb-[100px]'>
                    <span className="font-bold text-black text-[24px]">
                        MarbleUs
                    </span>
                    <div className='flex gap-[8px]'>
                        <ToSmallButton linkName='mainpage' Size='sm' iconName='mainpage' colorName='orange' title='mainpage'/>
                        <ToSmallButton linkName='loginpage' Size='sm' iconName='loginpage' colorName='blue' title='loginpage'/>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center font-semibold text-gray-800">
                    <div className="text-[30px]">
                        비밀번호 찾기
                    </div>
                    <div className="text-[20px] mb-[110px]">
                        ( Find Your Password )
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-[80px]">
                    <FindMethodButton text='Method1' linkName='passwordMethod1'/>
                    <FindMethodButton text='Method2' linkName='passwordMethod2'/>
                </div>
                <footer className="text-gray-600 relative bottom-[-170px]">
                    <i class="fa-regular fa-copyright"></i> MarbleUs Corp. All rights reserved.
                </footer>
            </form>
        </div>
    )
};