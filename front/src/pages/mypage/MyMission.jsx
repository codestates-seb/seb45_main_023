import { Button } from '../../components/Buttons';
import LeftSidebar from '../../components/mypage/LeftSidebar';
import RightSidebar from '../../components/mypage/RightSidebar';

export default function MyMission() {
  const footer =
    'M A R B L E U S < < U S E R < < < < < < < < < < < < < < < < < < < < < < < < < < S E B 4 5 < < < 2 0 2 3 0 8 2 4 2 0 2 3 0 9 2 2 < < < A L L R I G H T S R E S E R V E D';
  return (
    <div className="flex justify-center">
      <LeftSidebar />
      <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-[2rem] bg-white">
        <div className="flex flex-col w-[40rem] h-[25rem] mt-[2rem] justify-around bg-white">
          <div className="flex h-[4rem] rounded-3xl shadow-2xl">
            <span className="flex w-[6rem] justify-center items-center rounded-l-3xl bg-blue-400 text-white font-bold hover:bg-blue-500">
              강원
            </span>
            <span className="flex w-full justify-between items-center bg-white rounded-3xl ml-[-1.2rem]">
            <span className='ml-[3rem]'>미션내용 블라블라</span>
              <Button text={'인증글 쓰러가기'} color={'blue'} />
            </span>
          </div>
          <div className="flex h-[4rem] rounded-3xl shadow-2xl">
            <span className="flex w-[6rem] justify-center items-center rounded-l-3xl bg-green-400 text-white font-bold hover:bg-green-500">
              경기
            </span>
            <div className="flex w-full justify-between items-center bg-white rounded-3xl ml-[-1.2rem]">
              <span className='ml-[3rem]'>미션내용 블라블라</span>
              <Button text={'인증글 쓰러가기'} color={'green'} />
            </div>
          </div>
          <div className="flex h-[4rem] rounded-3xl shadow-2xl">
            <span className="flex w-[6rem] justify-center items-center rounded-l-3xl bg-pink-300 text-white font-bold hover:bg-pink-400">
              전북
            </span>
            <span className="flex w-full justify-between items-center bg-white rounded-3xl ml-[-1.2rem]">
            <span className='ml-[3rem]'>미션내용 블라블라</span>
              <Button text={'인증글 쓰러가기'} color={'pink'} />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center w-[40rem] h-[25rem] bg-white mt-[4rem]">
          <text className="text-3xl font-bold">N o t i c e</text>
          <div className="flex flex-col mt-[2rem] shadow-xss">
            <text>미션 인증 글 작성은 본인의 자유이며 어떠한 강제성도 없습니다.</text>
            <text>3개의 미션을 이미 받으신 상태에서 추가로 미션을 받게 되시면 오래된 미션부터 갱신됩니다.</text>
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}
