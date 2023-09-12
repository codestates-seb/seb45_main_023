import {FindMethodButton} from "../../../components/Buttons";

export default function FindPassword () {
    return (
        <div className="flex justify-center items-center h-[100vh] border-2 border-solid border-red-500">
            <form className="flex flex-col justify-center items-center w-[30rem] h-[50rem] shadow-xss rounded-[2rem] bg-[#F6F8FA]">
                <div>
                    비밀번호 찾기 페이지
                </div>
                <div className="flex flex-col justify-center items-center gap-[30px]">
                    <FindMethodButton text='성명, 전화번호, 생년월일로 찾기' linkName='passwordMethod1'/>
                    <FindMethodButton text='닉네임, 전화번호, 생년월일로 찾기' linkName='passwordMethod2'/>
                </div>
            </form>
        </div>
    )
};
// 이메일 찾기 방법
// 1. 성명 + 전화번호 + 생년월일 
// 2. 닉네임 + 전화번호 + 생년월일 

// <label htmlFor="email" className="font-medium text-[16px] block mb-[7px]">
//     이메일 / E-mail
// </label>
// <input type="email" name="email" placeholder="example@example.com" className=" w-[300px] h-[30px] bg-white text-[#6C6C6C] border-2 border-[#D7D7D7] rounded-[10px] pl-[14px]">
// </input> 