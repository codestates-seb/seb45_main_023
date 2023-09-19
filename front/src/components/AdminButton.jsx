import { useRecoilValue } from 'recoil';
import { Button } from './Buttons';
import { User } from '../recoil/mypage';
import axios from 'axios';

export default function AdminButton() {
  const info = useRecoilValue(User);

  const handleMissionClear = async () => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/missions/mission-complete/{member-mission-id}`)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button className="ml-4 w-[10rem]">
      <Button text={'Admin Button'} color={'blue'} />
    </button>
  );
}
