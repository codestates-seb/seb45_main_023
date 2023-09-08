import PostLink from "../../components/blog/post_link";
import data from '../../dummy/dummy';
import React, { useState, useEffect } from "react";
import Tag from '../../components/blog/tag';
import BlogHeader from "../../components/blog/blogtitle";
import { NegativeButton } from "../../components/Buttons";
import axios from 'axios';
import { useRecoilState } from "recoil";
import { BlogList } from "../../recoil/blog";

export default function Bloglist() {
  const [selectedTag, setSelectedTag] = useState([]); // 태그
  const [filteredPosts, setFilteredPosts] = useState([]);
  // const [locationName, setLocationName] = useState('Jeju'); // 지역 이름 : 서버 연결 시 초기값 '' 지정하기
  const [posts, setPosts] = useRecoilState(BlogList);

  const availableTag = ['인기글', '음식', '숙소', '교통', '쇼핑', '관광지', '액티비티'];

  const toggleTag = (tag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(selectedTag.filter((t) => t !== tag));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  useEffect(() => {
      // 게시물 목록 get
      axios.get('blogs/{blog_id}')
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
  }, [setPosts]); 

  useEffect(() => {
    // 태그 filter
    const filtered = data.filter((datas) =>
      selectedTag.every((tag) => datas.blog.info.tags.includes(tag))
    );
    setFilteredPosts(filtered);
  }, [selectedTag]);

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
        {(selectedTag.length === 0 ? data : filteredPosts).map((datas, idx) => (
          <div key={idx} className="w-600 h-300 opacity-1 p-4 border border-DDE7EC rounded-lg shadow-lg m-10">
              <PostLink 
                title={datas.blog.info.title}
                body={datas.blog.info.body}
                profile_pic={datas.blog.info.profile_pic}
                member_id={datas.blog.info.member_id}
                // comments,
                city_id={datas.blog.info.city_id}
                created_at={datas.blog.info.created_at}
                modified_at={datas.blog.info.modified_at}
                tags={datas.blog.info.tags}
              />
            </div>
        ))}
              {posts.map((post) => (
        <div key={post.id} className="w-600 h-300 opacity-1 p-4 border border-DDE7EC rounded-lg shadow-lg m-10">
          <PostLink />
        </div>
      ))}
      </div>
    </div>
  );
}
