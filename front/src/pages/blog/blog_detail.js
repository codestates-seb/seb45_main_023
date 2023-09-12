import data from '../../dummy/dummy';
import React, { useState, useEffect } from "react";
import BlogHeader from "../../components/blog/blogtitle";
import PostDetail from "../../components/blog/post_detail";

export default function Blogdetail({blogId}) {
  const datas = data[0]; // 임시로 dummy data 가져오기

  return (
    <div className="relative">
     <BlogHeader />
      <div className="relative h-[1034px] bg-gray-100 opacity-70 rounded-t-lg shadow-lg mt-[-100px] ml-10 mr-10" >
      <div className="tag_list m-10">
        <div className="tag_container pt-10 flex justify-between">
        </div>
      </div>
          <div className="w-600 h-300 opacity-1 p-4 border border-DDE7EC rounded-lg shadow-lg m-10">
              <PostDetail 
                title={datas.blog.info.title}
                body={datas.blog.info.body}
                profile_pic={datas.blog.info.profile_pic}
                member_id={datas.blog.info.member_id}
                // comments,
                city_id={datas.blog.info.city_id}
                // tags,
                created_at={datas.blog.info.created_at}
                modified_at={datas.blog.info.modified_at}
                blog_id={datas.blog.info.blog_id}
              />
            </div>
      </div>
    </div>
  );
}



