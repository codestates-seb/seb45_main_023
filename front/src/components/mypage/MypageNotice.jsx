import { useRecoilState } from 'recoil';
import { Edit } from '../../recoil/mypage';
import { Button } from '../Buttons';

export default function MypageNotice() {
  const [isEdit, setIsEdit] = useRecoilState(Edit);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div className="flex flex-col border-b-1 border-black h-[25rem]">
      <div className="flex p-4 w-[50rem] h-[25rem] rounded-t-3xl justify-center bg-white">
        <div className="flex w-[20rem] rounded-l-2xl bg-white items-center border-1 border-black text-lg font-bold px-2">
          이 여권은 별도의 기재가 없는 한 해당 사이트에서 만 유효합니다.
        </div>
        <div className="flex w-[20rem] rounded-r-2xl bg-white items-center border-1 border-black text-lg font-bold px-2">
          This passport is only valid on this site unless otherwise endorsed.
        </div>
      </div>
      <div className="flex justify-center bg-white h-[7rem] pb-2">
        <button className='mr-8 w-[10rem]'><Button text={'로그아웃'} color={'blue'}/></button>
        <button className='ml-4 w-[10rem]'onClick={handleEdit}>
          {isEdit ? <Button text={'수정완료'} color={'blue'}/> : <Button text={'개인정보수정'} color={'blue'}/>}
        </button>
      </div>
    </div>
  );
}
