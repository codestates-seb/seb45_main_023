import { useRecoilValue } from 'recoil';
import { Edit, User } from '../../recoil/mypage';

export default function UserInfo({setNickname,setNationality,setPassword,setBirth}) {
  const data = useRecoilValue(User);
  const footer = `M A R B L E U S < < ${data.nickname} < < < < < < < < < < < < < < < < < < < < < < < < S E B 4 5 < < < < < < < < < < < < < < < < A L L R I G H T S R E S E R V E D`;
  const isEdit = useRecoilValue(Edit);
  const userData = useRecoilValue(User);

  const handleValue = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    switch (id) {
      case 'nickname':
        setNickname(value);

        break;
      case 'nation':
        setNationality(value);
        break;
      case 'birth':
        setBirth(value);
        break;
      case 'pw':
        setPassword(value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-[50rem] shadow-pageCenter rounded-b-3xl border-b-[1px] border-gray-300">
      <div className="flex flex-col h-[25rem] justify-between mx-[6rem] bg-white ">
        <div className="flex bg-white justify-center">
          <div className="flex bg-white mx-4 text-[2.5rem]">M A R B L E U S</div>
          <div className="flex bg-white mx-4 text-[2.5rem]">P A S S P O R T</div>
        </div>
        <div className="flex h-[17rem] bg-white justify-between">
          <img src='https://img.seoul.co.kr/img/upload/2017/10/07/SSI_20171007154542_O2.jpg' alt='profileImg' className=" border-1 border-black w-[12.5rem] bg-white"/>
          <div className="flex flex-col w-[12rem] justify-between bg-white">
            <div className="flex flex-col">
              <label className="bg-white" htmlFor="nickname">
                닉네임/nickname
              </label>
              {isEdit ? (
                <input
                  type="text"
                  placeholder={`${userData.nickname}`}
                  className="bg-white w-[12rem]"
                  id="nickname"
                  onChange={handleValue}
                ></input>
              ) : (
                <div className="font-bold bg-white">{userData.nickname}</div>
              )}
            </div>
            <div className="flex flex-col">
              <label className="bg-white" htmlFor="birth">
                생년월일/Date of birth
              </label>
              {isEdit ? (
                <input type="date" className="bg-white w-[12rem]" id="birth" onChange={handleValue}></input>
              ) : (
                <div className="font-bold bg-white">{userData.birth}</div>
              )}
            </div>
            <div className="flex flex-col">
              <label className="bg-white" htmlFor="nation">
                국적/nationality
              </label>
              {isEdit ? (
                <input
                  type="text"
                  placeholder={`${userData.nationality}`}
                  className="bg-white w-[12rem]"
                  id="nation"
                  onChange={handleValue}
                ></input>
              ) : (
                <div className="font-bold bg-white">{userData.nationality}</div>
              )}
            </div>
            {isEdit ? (
              <div className="flex flex-col">
                <label className="bg-white" htmlFor="pw">
                  비밀번호 변경
                </label>
                <input
                  type="password"
                  id="pw"
                  className="bg-white"
                  placeholder="변경할 비밀번호"
                  onChange={handleValue}
                ></input>
              </div>
            ) : (
              <div>
                <div className="bg-white">메일/E-mail</div>
                <div className="font-bold bg-white">{userData.email}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col w-[12rem] h-[12rem] justify-between bg-white">
            <div className="bg-white">
              <div className="bg-white">국가코드/Country code</div>
              <div className="bg-white font-bold">KOR</div>
            </div>
            <div className="bg-white">
              <div className="bg-white">발행관청/Authority</div>
              <div className="bg-white font-bold">MarbleUS</div>
            </div>
          </div>
        </div>
        <div className="flex whitespace-pre-line bg-white w-[40rem] pb-2">{footer}</div>
      </div>
    </div>
  );
}
