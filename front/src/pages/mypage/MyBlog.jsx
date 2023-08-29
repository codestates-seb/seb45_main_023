import LeftSidebar from '../../components/mypage/LeftSidebar';
import RightSidebar from '../../components/mypage/RightSidebar';
import data from './data.json';

export default function MyBlog() {
  console.log(data);
  return (
    <div className="flex justify-center">
      <LeftSidebar />
      <div className="flex flex-col items-center mt-[20px] shadow-xss rounded-[2rem] bg-white">
        {/*페이지 네이션으로 잘라서 렌더링 */}
        <div className="flex flex-col w-[42.5rem] h-[25rem] justify-around bg-white">
          <div className="flex flex-col h-[17rem]">
            <div className="bg-white pb-2">작성 글 목록</div>
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
        {/*페이지 네이션으로 잘라서 렌더링 */}
        <div className="flex flex-col items-center border-2 w-[50rem] h-[27.5rem] rounded-b-3xl bg-white">
          <div className="flex flex-col w-[42.5rem] h-[25rem] justify-around bg-white">
            <div className="flex flex-col h-[17rem]">
              <div className="bg-white pb-2">작성 글 목록</div>
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
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}
