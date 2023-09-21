import data from '../../dummy/dummy';
import React from "react";
import BlogHeader from "../../components/blog/blogtitle";
import PostDetail from "../../components/blog/post_detail";
import { useNavigate, useParams } from 'react-router-dom';

export default function Blogdetail() {
  const datas = data[0];
  const {cityId} = useParams();
  const navigate = useNavigate();

  return (
    <div className="relative">
     <BlogHeader />
      <div className="relative h-full min-h-[1300px] bg-gray-100 opacity-70 rounded-t-lg shadow-lg mt-[-100px] ml-10 mr-10" >
      <div className="m-10">
        <div className="pt-10 flex justify-end">
        <button 
          className="bg-blue-400 hover:bg-blue-500 text-white border py-2 px-4 rounded"
          onClick={() => navigate(`/bloglist/${cityId}`)}
        >
          게시판으로 돌아가기
        </button>
        </div>
      </div>
          <div className="w-600 h-500 opacity-1 p-4 border border-DDE7EC rounded-lg shadow-lg m-10">
              <PostDetail 
                title={datas.blog.info.title}
                body={datas.blog.info.body}
                profile_pic={datas.blog.info.profile_pic}
                member_id={datas.blog.info.member_id}
                // comments,
                city_id={datas.blog.info.city_id}
                // tags,
                createdAt={datas.blog.info.createdAt}
                modifiedAt={datas.blog.info.modifiedAt}
                blog_id={datas.blog.info.blog_id}
              />
            </div>
      </div>
    </div>
  );
}



