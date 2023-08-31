import BlogList from '../../components/mypage/BlogList';
import ComentList from '../../components/mypage/ComentList';
import LeftSidebar from '../../components/mypage/LeftSidebar';
import RightSidebar from '../../components/mypage/RightSidebar';

export default function MyBlog() {
  return (
    <div className="flex justify-center">
      <LeftSidebar />
      <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-[2rem] bg-white">
        <BlogList />
        <ComentList />
      </div>
      <RightSidebar />
    </div>
  );
}
