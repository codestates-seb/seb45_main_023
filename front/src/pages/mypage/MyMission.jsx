import BarList from '../../components/mypage/BarList';
import MissionNotice from '../../components/mypage/MissionNotice';
import TopSidebar from '../../components/mypage/TopSidebar';
import BottomSidebar from '../../components/mypage/BottomSidebar';

export default function MyMission() {
  return (
    <div className="flex justify-center bookshelf-animation">
      <TopSidebar />
      <BottomSidebar />
      <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white">
        <BarList />
        <MissionNotice />
      </div>
    </div>
  );
}
