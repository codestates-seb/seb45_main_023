import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faStamp } from '@fortawesome/free-solid-svg-icons';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';

export default function RightSidebar() {
  return (
    <div className="relative">
      <div className="flex flex-col justify-between w-[7rem] h-[10rem] absolute top-20 left-4">
        <div>
          <FontAwesomeIcon icon={faUser} style={{ color: '#000000' }} />
          <span className="ml-2 bg-green-600">프로필</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faBook} style={{ color: '#000000' }} />
          <span className="ml-2">작성글 목록</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faStamp} style={{ color: '#000000' }} />
          <span className="ml-2">스탬프</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faBookBookmark} style={{ color: '#000000' }} />
          <span className="ml-2">북마크</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faMap} style={{ color: '#000000' }} />
          <span className="ml-2">미션</span>
        </div>
      </div>
    </div>
  );
}
