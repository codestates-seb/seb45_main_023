import LeftSidebar from '../../components/mypage/LeftSidebar';
import RightSidebar from '../../components/mypage/RightSidebar';
import MypageNotice from '../../components/mypage/MypageNotice';
import UserInfo from '../../components/mypage/UserInfo';

export default function MyPage() {

  return (
    <div className="flex justify-center">
      <LeftSidebar />
      <div className="flex flex-col items-center w-[50rem] mt-[3rem] shadow-xss rounded-[2rem] pb-4 bg-white">
        <MypageNotice />
        <UserInfo/>
      </div>
      <RightSidebar />
    </div>
  );
}
