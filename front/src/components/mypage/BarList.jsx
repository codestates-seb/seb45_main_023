import { Button } from "../Buttons";

export default function BarList() {
  return (
    <div className="flex flex-col w-[40rem] h-[22rem] mt-[1rem] justify-around bg-white ">
      <div className="flex h-[4rem] rounded-3xl shadow-2xl">
        <span className="flex w-[6rem] justify-center items-center rounded-l-3xl bg-blue-400 text-white font-bold hover:bg-blue-500">
          강원
        </span>
        <span className="flex w-full justify-between items-center bg-white rounded-3xl ml-[-1.2rem]">
          <span className="ml-[3rem]">미션내용 블라블라</span>
          <Button text={'인증글 쓰러가기'} color={'blue'} />
        </span>
      </div>
      <div className="flex h-[4rem] rounded-3xl shadow-2xl">
        <span className="flex w-[6rem] justify-center items-center rounded-l-3xl bg-green-400 text-white font-bold hover:bg-green-500">
          경기
        </span>
        <div className="flex w-full justify-between items-center bg-white rounded-3xl ml-[-1.2rem]">
          <span className="ml-[3rem]">미션내용 블라블라</span>
          <Button text={'Mission Clear!'} color={'green'} />
        </div>
      </div>
      <div className="flex h-[4rem] rounded-3xl shadow-2xl">
        <span className="flex w-[6rem] justify-center items-center rounded-l-3xl bg-pink-300 text-white font-bold hover:bg-pink-400">
          전북
        </span>
        <span className="flex w-full justify-between items-center bg-white rounded-3xl ml-[-1.2rem]">
          <span className="ml-[3rem]">미션내용 블라블라</span>
          <Button text={'Mission Clear!'} color={'pink'} />
        </span>
      </div>
    </div>
  );
}
