import CardList from '../../components/mypage/CardList';
import LeftSidebar from '../../components/mypage/LeftSidebar';
import RightSidebar from '../../components/mypage/RightSidebar';

export default function MyBookmark() {
  return (
    <div className="flex justify-center">
      <LeftSidebar />
      <div className="flex flex-col items-center w-[50rem] mt-[3rem] pb-4 shadow-xss rounded-[2rem] bg-white">
        <CardList start={0} end={6} />
        <CardList start={6} end={12} />
      </div>
      <RightSidebar />
    </div>
  );
}
