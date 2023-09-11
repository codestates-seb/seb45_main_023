import BlogList from '../../components/mypage/BlogList';
import ComentList from '../../components/mypage/ComentList';
import TopSidebar from '../../components/mypage/TopSidebar';
import BottomSidebar from '../../components/mypage/BottomSidebar';
import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Blogs, Comments, User } from '../../recoil/mypage';

export default function MyBlog() {
  const data = useRecoilValue(User);
  const [blogs, setBlogs] = useRecoilState(Blogs);
  const [comments, setComments] = useRecoilState(Comments);
  console.log('blogs',blogs);
  console.log('comment : ',comments);

  useEffect(() => {
    const getData = async () => {
      const BlogResponse = await axios.get(
        `https://9129-116-126-166-12.ngrok-free.app/blogs/members/${data.id}?size=3&page=1`,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      setBlogs(BlogResponse.data.data);

      const CommentResponse = await axios.get(
        `https://9129-116-126-166-12.ngrok-free.app/comments/members/${data.id}?page=3&size=1`,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      setComments(CommentResponse.data.data);
    };

    getData();
  }, []);

  return (
    <div className="flex justify-center bookshelf-animation">
      <TopSidebar />
      <BottomSidebar />
      <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white ">
        <BlogList />
        <ComentList />
        <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
        <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
        <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
        <div className="bg-white h-[0.5rem] w-[50rem] rounded-b-[2rem]"></div>
      </div>
    </div>
  );
}
