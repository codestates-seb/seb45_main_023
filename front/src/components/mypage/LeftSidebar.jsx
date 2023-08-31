import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMap } from '@fortawesome/free-regular-svg-icons';
import { faBook, faStamp, faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'; // Changed import
import { RouteConst } from '../../interface/RouteConst';
import { useRecoilState } from 'recoil';
import { Routes } from '../../recoil/mypage';

export default function LeftSidebar() {
  const [routes, setRoutes] = useRecoilState(Routes);
  const handleRoute = (route) => {
    setRoutes(route);
  };
  return (
    <div className="relative">
      <div className="flex flex-col justify-between w-[10rem] h-[10rem] absolute bottom-10 left-[-10rem]">
        <NavLink to={RouteConst.mypage} activeClassName="active" className="bg-green-600 shadow-lg" onClick={()=>handleRoute(RouteConst.mypage)}>
          <FontAwesomeIcon icon={faUser} style={{ color: '#000000' }} className="bg-green-600 pl-4" />
          <span className="ml-2 bg-green-600 text-white">프로필</span>
        </NavLink>
        <NavLink to={RouteConst.myblog} activeClassName="active" className="bg-yellow-500 shadow-lg" onClick={()=>handleRoute(RouteConst.myblog)}>
          <FontAwesomeIcon icon={faBook} style={{ color: '#000000' }} className="bg-yellow-500 pl-4" />
          <span className="ml-2 bg-yellow-500 text-white">작성글 목록</span>
        </NavLink>
        <NavLink to={RouteConst.mystamp} activeClassName="active" className="bg-cyan-700 shadow-lg" onClick={()=>handleRoute(RouteConst.mystamp)}>
          <FontAwesomeIcon icon={faStamp} style={{ color: '#000000' }} className="bg-cyan-700 pl-4" />
          <span className="ml-2 bg-cyan-700 text-white">스탬프</span>
        </NavLink>
        <NavLink to={RouteConst.mybookmark} activeClassName="active" className="bg-red-600 shadow-lg" onClick={()=>handleRoute(RouteConst.mybookmark)}>
          <FontAwesomeIcon icon={faBookBookmark} style={{ color: '#000000' }} className="bg-red-600 pl-4" />
          <span className="ml-2 bg-red-600 text-white">북마크</span>
        </NavLink>
        <NavLink to={RouteConst.mymission} activeClassName="active" className="bg-purple-600 shadow-lg" onClick={()=>handleRoute(RouteConst.mymission)}>
          <FontAwesomeIcon icon={faMap} style={{ color: '#000000' }} className="bg-purple-600 pl-4" />
          <span className="ml-2 bg-purple-600 text-white">미션</span>
        </NavLink>
      </div>
    </div>
  );
}
