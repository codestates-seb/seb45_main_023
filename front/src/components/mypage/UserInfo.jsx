import { useRecoilValue } from 'recoil';
import { Edit } from '../../recoil/mypage';

export default function UserInfo() {
  const footer =
    'M A R B L E U S < < U S E R < < < < < < < < < < < < < < < < < < < < < < < < < < S E B 4 5 < < < 2 0 2 3 0 8 2 4 2 0 2 3 0 9 2 2 < < < A L L R I G H T S R E S E R V E D';
  const isEdit = useRecoilValue(Edit);
  return (
    <div className="flex flex-col h-[25rem] justify-between mx-[6rem] bg-white">
      <div className="flex bg-white justify-center">
        <div className="flex bg-white mx-4 text-[2.5rem]">M A R B L E U S</div>
        <div className="flex bg-white mx-4 text-[2.5rem]">P A S S P O R T</div>
      </div>
      <div className="flex h-[17rem] bg-white">
        <div className=" border-1 border-black w-[12.5rem] bg-white">이미지자리</div>
        <div className="flex flex-col justify-between ml-10 bg-white">
          <div className="flex flex-col">
            <label className="bg-white" htmlFor="nickname">
              닉네임/nickname
            </label>
            {isEdit ? (
              <input type="text" placeholder="변경할 닉네임" className="bg-white w-[12rem]" id="nickname"></input>
            ) : (
              <div className="font-bold bg-white">김코딩코딩</div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="bg-white" htmlFor="birth">
              생년월일/Date of birth
            </label>
            {isEdit ? (
              <input type="date" className="bg-white w-[12rem]" id="birth"></input>
            ) : (
              <div className="font-bold bg-white">01 JAN 2000</div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="bg-white" htmlFor="nation">
              국적/nationality
            </label>
            {isEdit ? (
              <input type="text" placeholder="국적을 적어주세요" className="bg-white w-[12rem]" id="nation"></input>
            ) : (
              <div className="font-bold bg-white">대한민국</div>
            )}
          </div>
          {isEdit ? (
            <div className="flex flex-col">
              <label className="bg-white" htmlFor="pw">
                비밀번호 변경
              </label>
              <input type="password" id="pw" className="bg-white" placeholder="변경할 비밀번호"></input>
            </div>
          ) : (
            <div>
              <div className="bg-white">메일/E-mail</div>
              <div className="font-bold bg-white">user@example.com</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex whitespace-pre-line bg-white">{footer}</div>
    </div>
  );
}
