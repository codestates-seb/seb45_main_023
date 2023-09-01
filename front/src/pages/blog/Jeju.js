import PostLink from "../../components/blog/post_link";
import data from '../../dummy/dummy';
import React, { useState } from "react";
import Tag from '../../components/blog/tag';

export default function Jeju() {
  const [selectedTag, setSelectedTag] = useState([]);

  const availableTag = ['인기글', '음식', '숙소', '교통', '쇼핑', '관광지', '액티비티'];

  const toggleTag = (tag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(selectedTag.filter((t) => t !== tag));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  return (
    <div className="relative">
      <img src="/jeju.jpg" alt="jeju_img" className="w-full h-70"/>
      <div className="absolute top-0 left-10 w-96 h-52 bg-gray-100 opacity-90 rounded-b-lg flex items-center">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="mr-2">
            제주
          </div>
          <div>
            Icon
          </div>
        </div>
      </div>
      <div className="tag_list">
        <div className="tag_container">
          {availableTag.map((tag) => (
            <Tag 
              key={tag}
              tagName={tag}
              isSelected={selectedTag.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        <div className="selected_tags">
          <p>선택한 태그: {selectedTag.join(', ')}</p>
        </div>
        </div>
      </div>
      <div className="relative bg-white rounded-t-lg shadow-lg mt-[-70px] ml-10 mr-10" style={{ height: '1034px' }}>
        {data.map((datas, idx) => (
          <div key={idx} className="w-600 h-300 bg-DDE7EC opacity-100 p-4 rounded-lg shadow-lg m-10">
              <PostLink 
                title={datas.blog.info.title}
                body={datas.blog.info.body}
                profile_pic={datas.blog.info.profile_pic}
                member_id={datas.blog.info.member_id}
                // comments,
                city_id={datas.blog.info.city_id}
                // tags,
                created_at={datas.blog.info.created_at}
                modified_at={datas.blog.info.modified_at}
              />
            </div>
        ))}
      </div>
    </div>
  );
}
