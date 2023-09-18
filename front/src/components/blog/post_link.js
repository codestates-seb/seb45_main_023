import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

export default function PostLink({
  title,
  body,
  profile_pic,
  member_id,
  city_id,
  created_at,
  modified_at,
  tags
}) {
  const navigate = useNavigate();
  const blog_id = useParams().blogId;

  const handlePostClick = () => {
    navigate(`/blogdetail/${blog_id}`);
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
        {body.length > 200 ? body.slice(0, 200) + '...' : body}
      </div>
      <div className='BottomSection flex justify-between items-center'>
        <div className='user_info flex items-center'>
          <img src={profile_pic} alt='profile_pic' className='mr-2' />
          {member_id}
        </div>
        <div className='user_createdat'>
          {modified_at ? `${modified_at}에 수정` : `${created_at}`}
        </div>
      </div>
    </div>
  )
}