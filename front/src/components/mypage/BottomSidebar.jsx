import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMap } from '@fortawesome/free-regular-svg-icons';
import { faBook, faStamp, faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { RouteConst } from '../../interface/RouteConst';
import { useRecoilState } from 'recoil';
import { Routes, sidebar } from '../../recoil/mypage';

export default function BottomSidebar() {
  const [routes, setRoutes] = useRecoilState(Routes);
  const [visibleLinks, setVisibleLinks] = useRecoilState(sidebar);

  const handleVisibleLink = (num) => {
    setVisibleLinks(num);
  };

  const handleRoute = (route, num) => {
    handleVisibleLink(num);
    setRoutes(route);
  };

  return (
    <div className="relative">
      <div className="flex flex-col w-[8rem] absolute bottom-10 left-[-8rem]">
        <Link
          to={RouteConst.mypage}
          className={`bg-lime-500 my-1 ${visibleLinks >= 0 ? 'hidden' : ''}`}
          onClick={() => handleRoute(RouteConst.mypage, 0)}
        >
          <FontAwesomeIcon icon={faUser} style={{ color: '#000000' }} className="bg-lime-500 pl-4" />
          <span className="ml-2 bg-lime-500 text-white">프로필</span>
        </Link>
        <Link
          to={RouteConst.myblog}
          className={`bg-amber-400 my-1 ${visibleLinks >= 1 ? 'hidden' : ''}`}
          onClick={() => handleRoute(RouteConst.myblog, 1)}
        >
          <FontAwesomeIcon icon={faBook} style={{ color: '#000000' }} className="bg-amber-400 pl-4" />
          <span className="ml-2 bg-amber-400 text-white">작성글 목록</span>
        </Link>
        <Link
          to={RouteConst.mystamp}
          className={`bg-cyan-700 my-1 ${visibleLinks >= 2 ? 'hidden' : ''}`}
          onClick={() => handleRoute(RouteConst.mystamp, 2)}
        >
          <FontAwesomeIcon icon={faStamp} style={{ color: '#000000' }} className="bg-cyan-700 pl-4" />
          <span className="ml-2 bg-cyan-700 text-white">스탬프</span>
        </Link>
        <Link
          to={RouteConst.mybookmark}
          className={`bg-rose-500 my-1 ${visibleLinks >= 3 ? 'hidden' : ''}`}
          onClick={() => handleRoute(RouteConst.mybookmark, 3)}
        >
          <FontAwesomeIcon icon={faBookBookmark} style={{ color: '#000000' }} className="bg-rose-500 pl-4" />
          <span className="ml-2 bg-rose-500 text-white">북마크</span>
        </Link>
        <Link
          to={RouteConst.mymission}
          className={`bg-purple-600 my-1 ${visibleLinks >= 4 ? 'hidden' : ''}`}
          onClick={() => handleRoute(RouteConst.mymission, 4)}
        >
          <FontAwesomeIcon icon={faMap} style={{ color: '#000000' }} className="bg-purple-600 pl-4" />
          <span className="ml-2 bg-purple-600 text-white">미션</span>
        </Link>
      </div>
    </div>
  );
}
