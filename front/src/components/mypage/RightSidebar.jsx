import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faStamp } from '@fortawesome/free-solid-svg-icons';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { RouteConst } from '../../interface/RouteConst';
import { useRecoilValue } from 'recoil';
import { Routes } from '../../recoil/mypage';

export default function RightSidebar() {
  const route = useRecoilValue(Routes);
  return (
    <div className="relative">
      <div className="flex flex-col justify-between w-[8rem] absolute top-20 left-0">
        <Link to={RouteConst.mypage} className={`bg-green-600 ${route !== RouteConst.mypage ? 'hidden' : ''}`}>
          <FontAwesomeIcon icon={faUser} style={{ color: '#000000' }} className="bg-green-600 pl-4" />
          <span className="ml-2 bg-green-600 text-white">프로필</span>
        </Link>
        <Link to={RouteConst.myblog} className={`bg-yellow-500 ${route !== RouteConst.myblog ? 'hidden' : ''}`}>
          <FontAwesomeIcon icon={faBook} style={{ color: '#000000' }} className="bg-yellow-500 pl-4" />
          <span className="ml-2 bg-yellow-500 text-white">작성글 목록</span>
        </Link>
        <Link to={RouteConst.mystamp} className={`bg-cyan-700 ${route !== RouteConst.mystamp ? 'hidden' : ''}`}>
          <FontAwesomeIcon icon={faStamp} style={{ color: '#000000' }} className="bg-cyan-700 pl-4" />
          <span className="ml-2 bg-cyan-700 text-white">스탬프</span>
        </Link>
        <Link to={RouteConst.mybookmark} className={`bg-red-600 ${route !== RouteConst.mybookmark ? 'hidden' : ''}`}>
          <FontAwesomeIcon icon={faBookBookmark} style={{ color: '#000000' }} className="bg-red-600 pl-4" />
          <span className="ml-2 bg-red-600 text-white">북마크</span>
        </Link>
        <Link to={RouteConst.mymission} className={`bg-purple-600 ${route !== RouteConst.mymission ? 'hidden' : ''}`}>
          <FontAwesomeIcon icon={faMap} style={{ color: '#000000' }} className="bg-purple-600 pl-4" />
          <span className="ml-2 bg-purple-600 text-white">미션</span>
        </Link>
      </div>
    </div>
  );
}
