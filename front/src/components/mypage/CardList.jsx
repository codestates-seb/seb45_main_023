import { useRecoilValue } from 'recoil';
import { CardButton } from '../Buttons';
import { User } from '../../recoil/mypage';

export default function CardList({ start, end }) {
  const data = useRecoilValue(User)
  return (
    <div className="flex flex-col w-[42.5rem] h-[25rem] justify-around bg-white ">
      <div className="flex flex-col h-[20rem]">
        <div className="flex flex-row flex-wrap pt-2 h-[20rem] justify-between space-y-between bg-white">
          {data.bookmarks?.slice(start, end).map((item) => {
            return (
              <div className="flex flex-col justify-between w-[13rem] h-[8rem] shadow-cardList p-2">
                <div key={item.id} className="flex justify-between">
                  <div className='font-bold'>{item.city}</div>
                  <div className='mr-2'>x</div>
                </div>
                <div key={item.id}>
                  {item.tags?.map((item) => {
                    return <CardButton text={item} color={'green'}/>;
                    //enum 값으로 처리 or 함수로 작성해서 처리
                  })}
                </div>
                <div key={item.id}>{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
