import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMap } from '@fortawesome/free-regular-svg-icons';
import { faBook, faStamp, faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { RouteConst } from '../../interface/RouteConst';

export default function LeftSidebar() {
  return (
    <div className="relative">
      <div className="flex flex-col justify-between w-[10rem] h-[10rem] absolute bottom-10 left-[-10rem]">
        <Link to={RouteConst.mypage} className="bg-green-600 shadow-lg">
          <FontAwesomeIcon icon={faUser} style={{ color: '#000000' }} className="bg-green-600 pl-4" />
          <span className="ml-2 bg-green-600 text-white">프로필</span>
        </Link>
        <Link to={RouteConst.myblog} className=" bg-yellow-500 shadow-lg">
          <FontAwesomeIcon icon={faBook} style={{ color: '#000000' }} className="bg-yellow-500 pl-4" />
          <span className="ml-2 bg-yellow-500 text-white">작성글 목록</span>
        </Link>
        <Link to={RouteConst.mystamp} className=" bg-cyan-700 shadow-lg">
          <FontAwesomeIcon icon={faStamp} style={{ color: '#000000' }} className="bg-cyan-700 pl-4" />
          <span className="ml-2 bg-cyan-700 text-white">스탬프</span>
        </Link>
        <Link to={RouteConst.mybookmark} className=" bg-red-600 shadow-lg">
          <FontAwesomeIcon icon={faBookBookmark} style={{ color: '#000000' }} className="bg-red-600 pl-4" />
          <span className="ml-2 bg-red-600 text-white">북마크</span>
        </Link>
        <Link to={RouteConst.mymission} className=" bg-purple-600 shadow-lg">
          <FontAwesomeIcon icon={faMap} style={{ color: '#000000' }} className="bg-purple-600 pl-4" />
          <span className="ml-2 bg-purple-600 text-white">미션</span>
        </Link>
      </div>
    </div>
  );
}
