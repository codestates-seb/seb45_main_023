export default function MissionNotice() {
  return (
    <div className="flex flex-col items-center w-[40rem] h-[25rem] bg-white mt-[4rem] shadow-pageCenter">
      <text className="text-3xl font-bold">N o t i c e</text>
      <div className="flex flex-col mt-[2rem] shadow-xss">
        <text>미션 인증 글 작성은 본인의 자유이며 어떠한 강제성도 없습니다.</text>
        <text>3개의 미션을 이미 받으신 상태에서 추가로 미션을 받게 되시면 오래된 미션부터 갱신됩니다.</text>
      </div>
    </div>
  );
}
