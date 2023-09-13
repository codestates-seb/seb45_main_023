import { useRecoilValue } from 'recoil';
import { Blogs } from '../../recoil/mypage';
import BlogPagenation from './BlogPagination';

export default function BlogList() {
  const data = useRecoilValue(Blogs)
  return (
    <div className="flex flex-col w-[50rem] h-[25rem] justify-around items-center">
      <div className="flex flex-col w-[42.5rem] h-[17rem]">
        <div className="bg-white pb-2">작성 글 목록</div>
        <div className="flex flex-col pt-2 h-[15rem]">
          {data.slice(0,4)?.map((item) => {
            return (
              <div className=' mt-3 shadow-blogList px-4 rounded-2xl hover:border-x-[1px] hover:border-t-[1px] border-sky-500'>
                <div key={item.id}>{item.title}</div>
                <div key={item.id + 100}>{item.createdAt.slice(0,10)}</div>
              </div>
            );
          })}
        </div>
      </div>
      <BlogPagenation/>
    </div>
  );
}
