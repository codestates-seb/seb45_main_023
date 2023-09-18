import { useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';

export default function PostLink({
  title,
  body,
  profile_pic,
  nickname,
  cityId,
  postId,
  createdAt,
  modifiedAt,
  tags,
}) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/blogdetail/${postId}/${cityId}`);
  }

  return (
    <div 
      className='PostContainer'
      role='button'
      onClick={handlePostClick}
    >
      <div className='TopSection flex justify-between items-center'>
        <div className='post_title text-2xl font-bold'>{title}</div>
        <div className='tags'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className='MiddleSection'>
        {parse(body.length > 200 ? body.slice(0, 200) + '...' : body)}
      </div>
      <div className='BottomSection flex justify-between items-center'>
        <div className='user_info flex items-center'>
          <img src={profile_pic} alt='profile_pic' className='mr-2' />
          {nickname}
        </div>
        <div className='user_createdat'>
          {modifiedAt ? `${createdAt}` : `${createdAt}`}
        </div>
      </div>
    </div>
  )
}