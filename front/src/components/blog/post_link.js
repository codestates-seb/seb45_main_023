import { useNavigate } from 'react-router-dom'

export default function PostLink({
  title,
  body,
  profile_pic,
  member_id,
  // comments,
  city_id,
  // tags,
  created_at,
  modified_at,
  blog_id
}) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/blogs/${blog_id}`);
  }

  return (
    <div 
      className='PostContainer'
      role='button'
      onClick={handlePostClick}
    >
      <div className='TopSection'>
        <h2 className='post_title text-2xl font-bold'>{title}</h2>
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