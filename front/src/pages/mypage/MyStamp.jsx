import LeftSidebar from '../../components/mypage/LeftSidebar';
import RightSidebar from '../../components/mypage/RightSidebar';

export default function MyStamp() {
  const footer =
    'M A R B L E U S < < U S E R < < < < < < < < < < < < < < < < < < < < < < < < < < S E B 4 5 < < < 2 0 2 3 0 8 2 4 2 0 2 3 0 9 2 2 < < < A L L R I G H T S R E S E R V E D';
  return (
    <div className="flex justify-center">
      <LeftSidebar />
      <div className="flex flex-col items-center mt-[20px] shadow-xss rounded-[2rem]">
        <div className="flex flex-col border-b-1 border-black h-[25rem]">
          <div className="flex p-4 w-[50rem] h-[25rem] rounded-t-3xl justify-center bg-white">
            <div className="flex w-[20rem] rounded-l-2xl bg-white items-center border-1 border-black text-lg font-bold px-2">
              스탬프 페이지
            </div>
            <div className="flex w-[20rem] rounded-r-2xl bg-white items-center border-1 border-black text-lg font-bold px-2">
              This passport is only valid on this site unless otherwise endorsed.
            </div>
          </div>
          <div className="flex justify-center bg-white h-[3.75rem] pb-2">
            <button className=" border-black border-1 px-2 mx-4 w-40">로그아웃</button>
            <button className=" border-black border-1 px-2 mx-4 w-40">개인정보수정</button>
          </div>
        </div>
        <div className="flex flex-col justify-between border-2 w-[50rem] h-[27.5rem] rounded-b-3xl bg-white">
          <div className="flex flex-col h-[25rem] justify-between mx-[6rem] bg-white">
            <div className="flex bg-white justify-center">
              <div className="flex bg-white mx-4 text-[2.5rem]">M A R B L E U S</div>
              <div className="flex bg-white mx-4 text-[2.5rem]">P A S S P O R T</div>
            </div>
            <div className="flex h-[17rem] bg-white">
              <div className=" border-1 border-black w-[12.5rem] bg-white">이미지자리</div>
              <div className="flex flex-col justify-between ml-10 bg-white">
                <div>
                  <div className="bg-white">메일/E-mail</div>
                  <div className="font-bold bg-white">user@example.com</div>
                </div>
                <div>
                  <div className="bg-white">닉네임/nickname</div>
                  <div className="font-bold bg-white">김코딩코딩</div>
                </div>
                <div>
                  <div className="bg-white">생년월일/Date of birth</div>
                  <div className="font-bold bg-white">01 JAN 2000</div>
                </div>
                <div>
                  <div className="bg-white">국적/nationality</div>
                  <div className="font-bold bg-white">대한민국</div>
                </div>
              </div>
            </div>
            <div className="flex whitespace-pre-line bg-white">{footer}</div>
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}
