import { Button } from '../Buttons';

export default function BarList(mission) {
  return (
    <div className="flex flex-col w-[40rem] h-[22rem] mt-[1rem] justify-around bg-white ">
      <div className="flex h-[4rem] rounded-3xl shadow-2xl">
        <span className="flex w-[6rem] justify-center items-center rounded-l-3xl bg-blue-400 text-white font-bold hover:bg-blue-500">
          {mission.mission[0]?.cityName}
        </span>
        <span className="flex w-full justify-between items-center bg-white rounded-3xl ml-[-1.2rem]">
          <span className="ml-[3rem]">{mission.mission[0]?.content}</span>
          {mission.mission[0]?.isComplete ? (
            <Button text={'Mission Clear!'} color={'blue'} />
          ) : (
            <Button text={'인증글 쓰러가기'} color={'blue'} />
          )}
        </span>
      </div>
      <div className="flex h-[4rem] rounded-3xl shadow-2xl">
        <span className="flex w-[6rem] justify-center items-center rounded-l-3xl bg-green-400 text-white font-bold hover:bg-green-500">
          {mission.mission[1]?.cityName}
        </span>
        <div className="flex w-full justify-between items-center bg-white rounded-3xl ml-[-1.2rem]">
          <span className="ml-[3rem]">{mission.mission[1]?.content}</span>
          <Button text={'Mission Clear!'} color={'green'} />
        </div>
      </div>
      <div className="flex h-[4rem] rounded-3xl shadow-2xl">
        <span className="flex w-[6rem] justify-center items-center rounded-l-3xl bg-pink-300 text-white font-bold hover:bg-pink-400">
          {mission.mission[2]?.cityName}
        </span>
        <span className="flex w-full justify-between items-center bg-white rounded-3xl ml-[-1.2rem]">
          <span className="ml-[3rem]">{mission.mission[2]?.content}</span>
          <Button text={'Mission Clear!'} color={'pink'} />
        </span>
      </div>
    </div>
  );
}
