import data from '../../pages/mypage/bookmark.json'

export default function CardList({start,end}) {
  return (
    <div className="flex flex-col w-[42.5rem] h-[25rem] justify-around bg-white">
      <div className="flex flex-col h-[20rem]">
        <div className="flex flex-row flex-wrap pt-2 h-[20rem] justify-between space-y-between bg-white">
          {data.data.slice(start, end).map((item) => {
            return (
              <div className="flex flex-col justify-between w-[13rem] h-[8rem]">
                <div key={item.id}>{item.city}</div>
                <div key={item.id}>
                  {item.tags.map((item) => {
                    return <span>{item}</span>;
                  })}
                </div>
                <div key={item.id}>{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>페이지네이션 구역</div>
    </div>
  );
}
