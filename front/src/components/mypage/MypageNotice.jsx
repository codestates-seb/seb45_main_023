import { useRecoilState, useRecoilValue } from 'recoil';
import { Edit, User, userInfo, validate } from '../../recoil/mypage';
import { Button } from '../Buttons';
import axios from 'axios';
import { useEffect } from 'react';
import AdminButton from '../AdminButton';
import { authorizationTokenState } from '../../recoil/logInSignUpState';
import WithdrawButton from '../buttons/mypage/WithdrawButton';

export default function MypageNotice({ nickname, nationality, password }) {
  const [isEdit, setIsEdit] = useRecoilState(Edit);
  const info = useRecoilValue(userInfo);
  const [data, setData] = useRecoilState(User);
  const [errors, setErrors] = useRecoilState(validate);
  const [authorizationToken, setAuthorizationToken] = useRecoilState(authorizationTokenState);
  // const [patch, setPatch] = useRecoilState(User) << 응답값으로 리렌더링 가능하게 처리

  useEffect(() => {
    setErrors({});
  }, []);
  const request = {
    nickname: nickname,
    nationality: nationality,
    password: password,
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const validateForm = () => {
    // 에러 초기화
    const errors = {};

    if (!validatePassword(password)) {
      errors.password = '비밀번호는 영어, 숫자, 특수문자를 모두 포함하고 최소 8자 이상이어야 합니다.';
    }
    console.log(errors);
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleEdit = () => {
    //이전 에러메세지 초기화
    setErrors({});
    //수정모드가 아니거나 유효성검사 통과 x 시 리턴
    if (isEdit && !validateForm()) {
      return;
    }
    //유효성검사를 통과하고 수정완료 버튼을 눌렀을 때
    setIsEdit(!isEdit);
    if (isEdit) {
      handlePost();
    } else {
    }
  };

  const handlePost = () => {
    const patchData = async () => {
      try {
        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/members/${info.id}`, request, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
            Authorization : "Bearer " + localStorage.getItem("Authorization"),
          },
        });

			// authorization 토큰 갱신
			if(response.headers.get("newaccesstoken")) {
				setAuthorizationToken(response.headers.get("newaccesstoken"));
				localStorage.setItem('Authorization', authorizationToken ?? '');
			}

        setData(response.data);
        setErrors({});
      } catch (err) {
        console.log(err);
      }
    };

    patchData();
  };
  return (
    <div className="flex flex-col h-[25rem] ">
      <div className="flex p-4 w-[50rem] h-[25rem] rounded-t-3xl justify-center bg-white">
        <div className="flex w-[20rem] rounded-l-2xl bg-white items-center border-1 border-black text-lg font-bold px-2">
          이 여권은 별도의 기재가 없는 한 해당 사이트에서 만 유효합니다.
        </div>
        <div className="flex w-[20rem] rounded-r-2xl bg-white items-center border-1 border-black text-lg font-bold px-2">
          This passport is only valid on this site unless otherwise endorsed.
        </div>
      </div>
      <div className="flex justify-center bg-white h-[7rem] pb-2 gap-[50px]">
        <button className="w-[10rem] h-[64px]" onClick={handleEdit}>
          {isEdit ? <Button text={'수정완료'} color={'blue'} /> : <Button text={'개인정보수정'} color={'blue'} />}
        </button>
        <WithdrawButton />
      </div>
    </div>
  );
}
