import React, { useState, useEffect, useRef } from "react";
import Tag from "../../components/blog/tag";
import BlogHeader from "../../components/blog/blogtitle";
import { NegativeButton, NegativeCustomButton } from "../../components/Buttons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Editor from '../../components/blog/editor';
import { userInfo } from "../../recoil/mypage";
import { useRecoilValue } from "recoil";

import { useRecoilState } from "recoil";
import { authorizationTokenState } from "../../recoil/logInSignUpState";

export default function BlogWrite() {
  const navigate = useNavigate();
  const {cityId} = useParams();
  const userinfo = useRecoilValue(userInfo);
  const userId = userinfo.id;

  const [authorizationToken, setAuthorizationToken] = useRecoilState(
		authorizationTokenState
	);

  const [selectedTag, setSelectedTag] = useState([]); // 태그


	const availableTag = [
		"인기글",
		"음식",
		"숙소",
		"교통",
		"쇼핑",
		"관광지",
		"액티비티",
	];

	const [blogTitle, setBlogTitle] = useState("");
	const [blogContent, setBlogContent] = useState("");
  const [imageArr, setImageArr] = useState([]);

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
      body: blogContent || imageArr,
      tags: selectedTag
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/${userId}/${cityId}?image-names=${imageArr}`, postData, {
        headers: {
          Authorization : "Bearer " + localStorage.getItem("Authorization"),
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        },
      });

				// authorization 토큰 갱신
			if(response.headers.get("newaccesstoken")) {
				setAuthorizationToken(response.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

      console.log('게시물 글쓰기 성공:', response.data);
      console.log('글쓰기 body', postData.body);
      navigate(`/blogdetail/${response.data.id}/${cityId}`);
    } catch (error) {
      console.error('게시물 글쓰기 실패:', error);
    }
  }

  const handleBack = () => {
    navigate(`/bloglist/${cityId}`);
  }

  return (
    <div className="relative">
      <BlogHeader />
      <div className="relative h-full min-h-[1000px] bg-gray-100 opacity-70 rounded-t-lg shadow-lg mt-[-100px] ml-10 mr-10" >
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
            <Editor body={blogContent || imageArr} setBody={setBlogContent} setImageArr={setImageArr}/>
          </div>

          <h1 className="text-xl font-bold pt-10">
            Tag
          </h1>
          <div>
            <div className="pt-3 pb-10 flex justify-between">
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
                  className="mr-2 text-[13px]"
                  onClick={handleBack}
                >
                  <NegativeCustomButton text={"취소"} colorName="green"/>
                </button>
                <button 
                  className="text-[13px]"
                  onClick={handleSave}
                >
                  <NegativeCustomButton text={"완료"} colorName="blue"/>
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
