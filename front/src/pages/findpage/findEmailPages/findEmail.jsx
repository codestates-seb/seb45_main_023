import {FindMethodButton, ToSmallButton} from "../../../components/Buttons";

export default function FindEmail () {
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <form className="flex flex-col  items-center w-[30rem] h-[50rem] shadow-xss rounded-[2rem] bg-[#F6F8FA]">
                <div className='flex justify-between items-center w-[100%] px-[40px] mt-[20px] mb-[150px]'>
                    <span className="font-bold text-black text-[24px]">
                        MarbleUs
                    </span>
                    <div className='flex gap-[8px]'>
                        <ToSmallButton linkName='mainpage' Size='sm' iconName='mainpage' colorName='orange' title='mainpage'/>
                        <ToSmallButton linkName='loginpage' Size='sm' iconName='loginpage' colorName='blue' title='loginpage'/>
                    </div>
                </div>
                <div className="font-semibold text-[30px] text-gray-800">
                    이메일 찾기<br/>
                </div>
                <div className="font-semibold text-[20px] text-gray-800 mb-[70px]">
                    ( Find Your E-mail )
                </div>
                <div className="flex flex-col justify-center items-center gap-[50px]">
                    <FindMethodButton text='성명, 전화번호, 생년월일로 찾기' linkName='emailMethod1'/>
                    <FindMethodButton text='닉네임, 전화번호, 생년월일로 찾기' linkName='emailMethod2'/>
                </div>
                <footer className="text-gray-600 relative bottom-[-190px]">
                    <i class="fa-regular fa-copyright"></i> MarbleUs Corp. All rights reserved.
                </footer>
            </form>
        </div>
    )
};

// 따로 페이지를 만들거면
// 상단 왼쪽부분에 MarbleUS랑 상단 오른쪽 부분에 이동아이콘 (home, login)버튼 넣기

// 한 페이지에 이메일찾기와, 비밀번호찾기를 같이 만들경우에는 상단에 기능 안넣기?



// 이메일 찾기 방법
// 1. 성명 + 전화번호 + 생년월일 
// 2. 닉네임 + 전화번호 + 생년월일 

// <label htmlFor="email" className="font-medium text-[16px] block mb-[7px]">
//     이메일 / E-mail
// </label>
// <input type="email" name="email" placeholder="example@example.com" className=" w-[300px] h-[30px] bg-white text-[#6C6C6C] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]">
// </input> 