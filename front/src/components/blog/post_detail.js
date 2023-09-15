import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';


export default function PostDetail({
  title,
  body,
  profile_pic,
  member_id,
  // comments,
  // city_id,
  tags,
  createdAt,
  modifiedAt,
}) {

  const [blogData, setBlogData] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(blogData.title);
  const [editedBody, setEditedBody] = useState(blogData.body);
  
  const navigate = useNavigate();

  const blog_id = useParams().blogId;
  const city_id = useParams().cityId;

  useEffect(() => {
    // 서버에서 댓글 목록을 가져오는 함수
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_TEST_URL}/comments/blogs/${blog_id}?page=1&size=10`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }); // axios로 GET 요청
        setComments(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error('댓글 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      } 
    };

    fetchComments();
  }, [blog_id]); // blog_id가 변경될 때마다 실행

  useEffect(() => {
    // 서버에서 특정 게시물 가져오기
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_TEST_URL}/blogs/${blog_id}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });
        setBlogData(response.data);
        console.log("게시물 가져오기 성공 : ", response.data);
        console.log("게시물 가져오기 성공2 : ", response.data.images);
      } catch (error) {
        console.error('게시물 가져오기 실패 : ', error);
      }
    };

    fetchBlogPost();
  }, [blog_id]);

  console.log("왜 안나와.." , blogData.images)

  if (!blogData) {
    return <div>Loading...</div>;
  }

  const handlePostDelete = async () => {
    // 게시글 삭제하기
    try {
      const imageNames = blogData.images.map(image => image.name);

      const response = await axios.delete(`${process.env.REACT_APP_TEST_URL}/blogs/${blog_id}?names=${imageNames}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      if (response.status === 200) {
        alert('게시물이 성공적으로 삭제되었습니다.');
        console.log('게시물이 성공적으로 삭제되었습니다.');
        navigate(`/bloglist/${city_id}`);
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
      const response = await axios.post(`${process.env.REACT_APP_TEST_URL}/comments/${blog_id}/${member_id}`, {
        body: newComment,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      if (response.status === 201) {
        // 댓글이 성공적으로 작성된 경우
        setNewComment(''); // 입력 필드 초기화
        // 서버에서 댓글 목록을 다시 가져올 수도 있음 (선택 사항)
        console.log('댓글 작성 성공');
        console.log(response.data.id);
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
      const response = await axios.delete(`${process.env.REACT_APP_TEST_URL}/comments/${comment_id}`);

      if (response.status === 201) {
        // 댓글이 성공적으로 삭제된 경우
        const updatedComments = comments.filter(comment => comment.comment_id !== comment_id);
        setComments(updatedComments); // 업데이트된 댓글 목록으로 상태 업데이트
      } else {
        console.error('댓글 삭제 실패');
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);

    setEditedTitle(blogData.title);
    setEditedBody(blogData.body);
  };
  
  const handleSaveEdit = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_TEST_URL}/blogs/${blog_id}`,
        {
          title: editedTitle,
          body: editedBody,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
  
      if (response.status === 201) {
        setBlogData({
          ...blogData,
          title: editedTitle,
          body: editedBody,
        });
        setIsEditing(false);
      } else {
        console.error('게시물 수정 실패');
      }
    } catch (error) {
      console.error('게시물 수정 실패:', error);
    }
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
          <CKEditor
            editor={ClassicEditor}
            data={editedBody}
            onReady={(editor) => {
              
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditedBody(data);
            }}
          />
          </div>
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
    ) : (
      <>
      <div className='TitleSection pb-3'>
        <h2 className='post_title text-2xl font-bold'>{blogData.title}</h2>
      </div>
      <div className='UserSection flex justify-between items-center pb-3'>
        <div className='user_createdat flex items-center'>
          {blogData.modifiedAt ? `${blogData.modifiedAt}에 수정` : `${blogData.createdAt}`}
        </div>
        <div className='user_info flex items-center'>
          <img src={profile_pic} alt='profile_pic' className='mr-2' />
          {blogData.member.nickname}
        </div>
      </div>

      <div className='ContentSection border border-[#0387FA] rounded-lg h-[500px]'>
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

      <button onClick={handlePostDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 float-right mt-2">
        삭제하기
      </button>

      <button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 float-right mt-2">
       수정하기
      </button>
      </>
    )}

    <div className="comment_form mt-4">
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

      <div>
      {/* 댓글 목록 표시 */}
        <h3>댓글</h3> 
          <ul>
          {isLoading ? (
            <p>댓글을 불러오는 중...</p>
          ) : (
            comments.map((comment, index) => (
              <li key={index} className='mb-2'>
                <strong>{comment.nickname}</strong>: {comment.body}
                <button onClick={() => handleCommentDelete(index)}>삭제</button>
              </li>
            ))
          )}
        </ul>
      </div>

    </div>

    
  )
}