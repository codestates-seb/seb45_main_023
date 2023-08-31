import data from '../../pages/mypage/data.json';

export default function ComentList() {
  return (
    <div className="flex flex-col w-[42.5rem] h-[25rem] justify-around bg-white">
      <div className="flex flex-col h-[17rem]">
        <div className="bg-white pb-2">작성 댓글 목록</div>
        <div className="flex flex-col pt-2 h-[15rem] justify-between">
          {data.data.map((item) => {
            return (
              <div>
                <div key={item.id}>{item.title}</div>
                <div key={item.id + 4}>{item.createdAt}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>페이지네이션 구역</div>
    </div>
  );
}
