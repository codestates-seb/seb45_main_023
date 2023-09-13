export default function MissionNotice() {
  return (
    <div className="flex flex-col items-center w-[40rem] h-[25rem] bg-white mt-[4rem] shadow-pageCenter">
      <text className="text-3xl font-bold">N o t i c e</text>
      <div className="flex flex-col mt-[2rem] shadow-xss">
        <text>미션을 클리어 하신 다음 주사위를 굴려 다른 지역의 미션을 받으실 수 있습니다.</text>
        <text>최근 클리어하신 두 미션이 아래에 나타납니다.</text>
      </div>
    </div>
  );
}
