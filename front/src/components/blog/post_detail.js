import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PostDetail({
  title,
  body,
  profile_pic,
  member_id,
  // comments,
  // city_id,
  // tags,
  created_at,
  modified_at,
  blog_id
}) {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 서버에서 댓글 목록을 가져오는 함수
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://9129-116-126-166-12.ngrok-free.app/comments/blogs/${blog_id}?page=1&size=10`, {
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

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`https://9129-116-126-166-12.ngrok-free.app/comments/${blog_id}/${member_id}`, {
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
    try {
      const response = await axios.delete(`https://9129-116-126-166-12.ngrok-free.app/comments/${comment_id}`);

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

  return (
    <div 
      className='PostContainer'
    >
      <div className='TitleSection pb-3'>
        <h2 className='post_title text-2xl font-bold'>{title}</h2>
      </div>
      <div className='UserSection flex justify-between items-center pb-3'>
        <div className='user_createdat flex items-center'>
          {modified_at ? `${modified_at}에 수정` : `${created_at}`}
        </div>
        <div className='user_info flex items-center'>
          <img src={profile_pic} alt='profile_pic' className='mr-2' />
          {member_id}
        </div>
      </div>

      <div className='ContentSection border border-[#0387FA] rounded-lg h-[500px]'>
        {body}
      </div>

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