import React, { useState, useEffect, useRef } from "react";
import Tag from '../../components/blog/tag';
import BlogHeader from "../../components/blog/blogtitle";
import { NegativeButton } from "../../components/Buttons";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

import Editor from '../../components/blog/editor';

export default function BlogWrite() {
  const navigate = useNavigate();
  const {cityId, member_id} = useParams();

  const [selectedTag, setSelectedTag] = useState([]); // 태그

  const availableTag = ['인기글', '음식', '숙소', '교통', '쇼핑', '관광지', '액티비티'];

  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');

  const toggleTag = (tag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(selectedTag.filter((t) => t !== tag));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  const handleSave = async () => {
    const postData = {
      title: blogTitle,
      body: blogContent,
      tags: selectedTag
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/${member_id}/${cityId}`, postData, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        },
      });

      console.log('게시물 글쓰기 성공:', response.data);
      console.log(cityId);
      console.log('title : ' + blogTitle);
      console.log('content : ' + blogContent);
      console.log(selectedTag);
      navigate(`/blogdetail/${response.data.id}`);
    } catch (error) {
      console.error('게시물 글쓰기 실패:', error);
    }
  }

  return (
    <div className="relative">
      <BlogHeader />
      <div className="relative h-[800px] bg-gray-100 opacity-70 rounded-t-lg shadow-lg mt-[-100px] ml-10 mr-10" >
      <div className="write_list m-10">
        <div className="title_container">
          <h1 className="text-xl font-bold pt-10">
            Title
          </h1>
          <div className="title">
            <input 
              type="text"
              placeholder="글 제목을 입력하세요"
              className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </div>
          <h1 className="text-xl font-bold pt-10">
            Content
          </h1>
          <div>
            <Editor body={blogContent} setBody={setBlogContent}/>
          </div>

          <h1 className="text-xl font-bold pt-10">
            Tag
          </h1>
          <div className="tag_list">
            <div className="tag_container pt-3 flex justify-between">
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
                <button 
                  className="w-[100px] h-[50px] text-[10px]"
                  onClick={handleSave}
                >
                  <NegativeButton text={"글 쓰기"} />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
