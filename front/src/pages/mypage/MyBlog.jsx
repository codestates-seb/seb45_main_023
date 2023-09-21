import BlogList from '../../components/mypage/BlogList';
import ComentList from '../../components/mypage/ComentList';
import TopSidebar from '../../components/mypage/TopSidebar';
import BottomSidebar from '../../components/mypage/BottomSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Blogs, CommentInfo, Comments, PageInfo, User } from '../../recoil/mypage';
import Follower from '../../components/mypage/Follower';
import { authorizationTokenState } from '../../recoil/logInSignUpState';
import MypageHeaderBtn from '../../components/buttons/mypage/MypageHeaderBtn';

export default function MyBlog() {
  const data = useRecoilValue(User);
  const [blogs, setBlogs] = useRecoilState(Blogs);
  const [pageInfo, setPageInfo] = useRecoilState(PageInfo);
  const [commentInfo, setCommentInfo] = useRecoilState(CommentInfo);
  const [comments, setComments] = useRecoilState(Comments);
  const [blogPage, setBlogPage] = useState(1);
  const [commentPage, setCommentPage] = useState(1);
  const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);

  useEffect(() => {
    const getData = async () => {
      const BlogResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/blogs/members/${data.id}?page=${blogPage}&size=4`,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${authorizationToken}`,
          },
        }
      );

        // authorization 토큰 갱신
				if(BlogResponse.headers.get("newaccesstoken")) {
					setAuthorizationToken(BlogResponse.headers.get("newaccesstoken"));
					localStorage.setItem('Authorization', authorizationToken ?? '');
				}
      setBlogs(BlogResponse.data.data);
      setPageInfo(BlogResponse.data.pageInfo);
      const CommentResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/comments/members/${data.id}?page=${commentPage}&size=4`,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${authorizationToken}`,
          },
        }
      );

      // authorization 토큰 갱신
				if(CommentResponse.headers.get("newaccesstoken")) {
					setAuthorizationToken(CommentResponse.headers.get("newaccesstoken"));
					localStorage.setItem('Authorization', authorizationToken ?? '');
				}
      setCommentInfo(CommentResponse.data.pageInfo);
      setComments(CommentResponse.data.data);
    };

    getData();
  }, [blogPage, commentPage]);

  return (
    <>
      <MypageHeaderBtn />
      <div className="flex justify-center mt-[5rem]">
        <TopSidebar />
        <BottomSidebar />
        <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white ">
          <BlogList page={blogPage} setPage={setBlogPage} />
          <ComentList page={commentPage} setPage={setCommentPage} />
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
          <div className="bg-white h-[0.5rem] w-[50rem] rounded-b-[2rem]"></div>
        </div>
        <Follower />
      </div>
    </>
  );
}
