import { useRecoilValue } from 'recoil';
import BlogPagenation from './BlogPagination';
import { CommentInfo, Comments } from '../../recoil/mypage';

export default function ComentList({page,setPage}) {
  const comments = useRecoilValue(Comments)
  const pageInfo = useRecoilValue(CommentInfo)
  return (
    <div className="flex flex-col w-[50rem] h-[25rem] items-center justify-around bg-white shadow-pageCenter">
      <div className="flex flex-col w-[42.5rem] h-[17rem]">
        <div className="bg-white pb-2">작성 댓글 목록</div>
        <div className="flex flex-col pt-2 h-[15rem] justify-between">
          {comments.map((item) => {
            return (
              <div>
                <div key={item.id}>{item.body}</div>
                <div key={item.id + 100}>{item.createdAt.slice(0,10)}</div>
              </div>
            );
          })}
        </div>
      </div>
      <BlogPagenation
      itemPerPage={4}
      totalItemsCount={pageInfo.totalElements}
      page={page}
      setPage={setPage}/>
    </div>
  );
}
