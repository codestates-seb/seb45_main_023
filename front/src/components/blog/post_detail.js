import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tag from "../../components/blog/tag";
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaCheck, FaTimes, FaEye } from "react-icons/fa";

import { authorizationTokenState } from "../../recoil/logInSignUpState";

import parse from 'html-react-parser';
import { useRecoilValue, useRecoilState } from 'recoil';

import { userInfo } from "../../recoil/mypage";
import BlogPagenation from '../mypage/BlogPagination';
import Editor from './editor';


export default function PostDetail({profile_pic}) {

  const [blogData, setBlogData] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(blogData.title);
  const [editedBody, setEditedBody] = useState(blogData.body);
  const [editedTags, setEditedTags] = useState(blogData.tags);
  const [editedImage, setEditedImage] = useState(blogData.images);
  const [imageArr, setImageArr] = useState([]);
  
  const [isEditingComment, setIsEditingComment] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComments, setEditedComments] = useState({});

  const [page, setPage] = useState(1);
  const [commentpage, setCommentPage] = useState('');

  const availableTag = [
    "인기글",
    "음식",
    "숙소",
    "교통",
    "쇼핑",
    "관광지",
    "액티비티",
  ];
  
  const navigate = useNavigate();
  
  const {blogId, cityId} = useParams();
  const userinfo = useRecoilValue(userInfo);
  const userId = userinfo.id;
  const userNickname = userinfo.nickname;
  
  const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
    
  const toggleTag = (tag) => {
    setEditedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };
  

  const fetchComments = async () => {
    // 서버에서 댓글 불러오기
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments/blogs/${blogId}?page=${page}&size=5`, {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      }); 


			// authorization 토큰 갱신
			if(response.headers.get("newaccesstoken")) {
				setAuthorizationToken(response.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}
      setComments(response.data.data);
      setCommentPage(response.data.pageInfo)
      console.log('댓글 불러오기 성공: ', response.data);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    } finally {
    } 
  };

  useEffect(() => {
    // 서버에서 특정 게시물 가져오기
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${blogId}`, {
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });

      // authorization 토큰 갱신
			if(response.headers.get("newaccesstoken")) {
				setAuthorizationToken(response.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

        setBlogData(response.data);
        console.log("게시물 가져오기 성공 : ", response.data);
        console.log("게시물 가져오기 성공2 : ", response.data.images);
        fetchComments();
      } catch (error) {
        console.error('게시물 가져오기 실패 : ', error);
      }
    };

    fetchBlogPost();
    console.log('imageArr2', imageArr);
  }, [page]);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  const handlePostDelete = async () => {
    // 게시글 삭제하기
    try {
      const imageNames = blogData.images.map(image => image.name);

      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/blogs/${blogId}?names=${imageNames}`, {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      // authorization 토큰 갱신
			if(response.headers.get("newaccesstoken")) {
				setAuthorizationToken(response.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

      if (response.status === 200) {
        alert('게시물이 성공적으로 삭제되었습니다.');
        console.log('게시물이 성공적으로 삭제되었습니다.');
        navigate(`/bloglist/${cityId}`);
      } else {
        console.error('게시물 삭제 실패');
      }
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
    }
  };

  const handleCommentSubmit = async () => {
    // 작성한 댓글 서버로 보내기
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments/${blogId}/${userId}`, {
        body: newComment,
      }, {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      // authorization 토큰 갱신
      if(response.headers.get("newaccesstoken")) {
        setAuthorizationToken(response.headers.get("newaccesstoken"));
        localStorage.setItem('Authorization', authorizationToken ?? '');
      }

      if (response.status === 201) {
        // 댓글이 성공적으로 작성된 경우
        setNewComment(''); // 입력 필드 초기화
        fetchComments();
        console.log('댓글 작성 성공');
        console.log(response.data);
      } else {
        console.error('댓글 작성 실패');
      }
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleCommentDelete = async (comment_id) => {
    // 댓글 삭제
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/comments/${comment_id}`, {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        }
      });

      // authorization 토큰 갱신
			if(response.headers.get("newaccesstoken")) {
				setAuthorizationToken(response.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

        // 댓글이 성공적으로 삭제된 경우
        const updatedComments = comments.filter(comment => comment.id !== comment_id);
        setComments(updatedComments); // 업데이트된 댓글 목록으로 상태 업데이트
      } catch (error) {
        console.error('댓글 삭제 실패:', comments, error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);

    setEditedTitle(blogData.title);
    setEditedBody(blogData.body); //img url => 있는지
    setEditedTags(blogData.tags);
    setEditedImage(blogData.images); // for 
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/blogs/${blogId}?image-names=${imageArr}`,
        {
          title: editedTitle,
          body: editedBody,
          tags: editedTags,
        },
        {
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );

      // authorization 토큰 갱신
			if(response.headers.get("newaccesstoken")) {
				setAuthorizationToken(response.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

      if (response.status === 201) {
        // 업데이트된 게시글을 서버에서 다시 가져오기
        const updatedResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${blogId}`, {
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });

        // authorization 토큰 갱신
			if(updatedResponse.headers.get("newaccesstoken")) {
				setAuthorizationToken(updatedResponse.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

        setBlogData(updatedResponse.data); // 업데이트된 게시글로 상태 업데이트
        setIsEditing(false);
      } else {
        console.error('게시물 수정 실패');
      }
    } catch (error) {
      console.error('게시물 수정 실패:', error);
    }
  };
  

  const handleCommentEdit = (comment_id) => {
    setEditingCommentId(comment_id);
    const commentToEdit = comments.find(comment => comment.id === comment_id);
    setEditedComments({
      ...editedComments,
      [comment_id]: commentToEdit.body,
    });
    setIsEditingComment(true);  
  };
  
  const handleCommentEditSave = async (comment_id) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/comments/${comment_id}`, {
        body: editedComments[comment_id],
      }, {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      // authorization 토큰 갱신
			if(response.headers.get("newaccesstoken")) {
				setAuthorizationToken(response.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

      const updatedComments = comments.map(comment => {
        if (comment.id === comment_id) {
          return { ...comment, body: editedComments[comment_id] };
        }
        return comment;
      });
      setComments(updatedComments);
      setIsEditingComment(false);
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };
  
  
  
  const handleCommentEditCancel = () => {
    setEditingCommentId(null);
    setIsEditingComment(false);
  };
  
  
  


  return (
    <div className='PostContainer'>
      {isEditing ? (
        <div>
          <h1 className="text-xl font-bold pt-10">
              Title
          </h1>
          <input
            type="text"
            value={editedTitle}
            className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <h1 className="text-xl font-bold pt-10">
              Content
          </h1>
          <div>
            <Editor 
              body={editedBody}
              imageArr={editedImage}
              setImageArr={setImageArr}
              setBody={setEditedBody}
            />
            <h1 className="text-xl font-bold pt-10">
              Tag
            </h1>
            </div>
            <div className="pt-3">
              {availableTag.map((tag) => (
                <Tag 
                  key={tag}
                  tagName={tag}
                  isSelected={editedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                />
              ))}
            </div>
            <div className='text-right'>
              <button 
                onClick={handleSaveEdit} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2 mt-4"
              >
                저장
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4"
              >
                취소
              </button>
            </div>
      </div>
    ) : (
      <>
      <div className='TitleSection flex justify-between items-center pb-3'>
        <h2 className='post_title text-2xl font-bold'>{blogData.title}</h2>
        <div className="flex items-center">
          <FaEye className="mr-2" />
          {blogData.view}
        </div>
      </div>
      <div className='UserSection flex justify-between items-center pb-3'>
        <div className='user_createdat'>
          {blogData.modifiedAt ? `${blogData.modifiedAt}` : `${blogData.createdAt}`}
        </div>
        <div className='user_info flex items-center'>
          <img src={profile_pic} alt='profile_pic' className='mr-2' />
          {blogData.member.nickname}
        </div>
      </div>

      <div className='ContentSection'>
        {parse(blogData.body)}
        {blogData.images.map((image, index) => (
          <img key={index} src={image.path} alt={`Blog Image ${index}`} />
        ))}
      </div>

      <div className='inline-block mt-4'>
        {blogData.tags.map((tag, index) => (
          <span 
          key={index} 
          className='bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2'>
          {tag}
          </span>
        ))}
      </div>

      {userId === blogData.member.id && (
          <div>
            <button onClick={handlePostDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 float-right mt-2">
              삭제하기
            </button>
            <button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 float-right mt-2 mr-2">
              수정하기
            </button>
          </div>
        )}


      <div className="comment_form mt-6">
      <h4 className="comment_form_heading text-lg font-semibold mb-2">댓글</h4>
    <div className='comment_write flex items-center space-x-2'>
      <textarea 
            rows='3'
            placeholder='댓글 내용을 입력하세요.'
            maxLength='100' 
            name='comment'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className='w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300'
          >
          </textarea>
          <button onClick={handleCommentSubmit} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>작성</button>
        </div>
      </div>

      {comments.length > 0 && (
        <div className='mt-4'>
          <ul>
          {comments.slice(0, 5).map((comment, index) => (
            <li key={index} className='mb-2'>
              {isEditingComment && editingCommentId === comment.id ? (
                <div className="flex items-center">
                  <textarea
                    rows='3'
                    value={editedComments[comment.id] || comment.body}
                    onChange={(e) => setEditedComments({
                      ...editedComments,
                      [comment.id]: e.target.value,
                    })}
                    className="w-[500px] h-[50px] mr-2 border border-black rounded"
                  />
                  <FaCheck onClick={() => handleCommentEditSave(comment.id)} className="cursor-pointer mr-2"/>
                  <FaTimes onClick={handleCommentEditCancel} className="cursor-pointer" />
                </div>
              ) : (
                <div className="flex items-center">
                  <strong className="flex-shrink-0">{userNickname}:</strong>
                  <span>{comment.body}</span>
                  {userNickname === comment.nickname && (
                  <div className="ml-auto flex items-center space-x-2">
                    <FaEdit onClick={() => handleCommentEdit(comment.id)} className="cursor-pointer"/>
                    <FaTrashAlt onClick={() => handleCommentDelete(comment.id)} className="cursor-pointer"/>
                  </div>
                  )}
                </div>
              )}
            </li>
          ))}
          </ul>
        </div>
      )}
      <BlogPagenation 
        itemPerPage={5} 
        totalItemsCount={commentpage.totalElements} 
        renderItemCount={Math.ceil(commentpage.totalElements / 5)}
        page={page}
        setPage={setPage}
      />
      </>
    )}
    </div>
  )
}