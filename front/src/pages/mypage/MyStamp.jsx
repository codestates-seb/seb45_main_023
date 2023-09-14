import TopSidebar from '../../components/mypage/TopSidebar';
import BottomSidebar from '../../components/mypage/BottomSidebar';
import StampTable from '../../components/mypage/StampTable';
import stampList from './img.json';

export default function MyStamp() {
  const topData = stampList.data.slice(0, 8);
  const bottomData = stampList.data.slice(8, 16);
  return (
    <div className="flex justify-center">
      <TopSidebar />
      <BottomSidebar />
      <div className="flex flex-col items-center w-[50rem] h-[50rem] mt-[3rem] shadow-xss rounded-t-[2rem] bg-white">
        <StampTable topData={topData}/>
        <StampTable bottomData={bottomData}/>
        <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
        <div className="bg-white h-[0.5rem] w-[50rem] border-b-[1px] border-gray-300">&nbsp;</div>
        <div className="bg-white h-[0.5rem] w-[50rem] rounded-b-3xl">&nbsp;</div>
      </div>
    </div>
  );
}
