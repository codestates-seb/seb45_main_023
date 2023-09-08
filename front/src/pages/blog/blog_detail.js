import data from '../../dummy/dummy';
import React, { useState, useEffect } from "react";
import Tag from '../../components/blog/tag';
import BlogHeader from "../../components/blog/blogtitle";
import { NegativeButton } from "../../components/Buttons";
import PostDetail from "../../components/blog/post_detail";

export default function Blogdetail() {
  const [selectedTag, setSelectedTag] = useState([]); // 태그
  const datas = data[0]; // 임시로 dummy data 가져오기

  const availableTag = ['인기글', '음식', '숙소', '교통', '쇼핑', '관광지', '액티비티'];

  const toggleTag = (tag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(selectedTag.filter((t) => t !== tag));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };


  // console.log({selectedTag.join(', ')})

  return (
    <div className="relative">
     <BlogHeader />
      <div className="relative h-[1034px] bg-gray-100 opacity-70 rounded-t-lg shadow-lg mt-[-100px] ml-10 mr-10" >
      <div className="tag_list m-10">
        <div className="tag_container pt-10 flex justify-between">
          <div className="tag_left">
            {availableTag.map((tag) => (
              <Tag 
                key={tag}
                tagName={tag}
                isSelected={selectedTag.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
          <div className="tag_right">
            <button className="w-[100px] h-[50px] text-[10px]">
              <NegativeButton text={"글 쓰기"} />
            </button>
          </div>
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
