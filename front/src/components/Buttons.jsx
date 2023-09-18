import { Link } from "react-router-dom";

// prop 하는 방법 찾아서 적용시켜봤어요~.~ 밑에 다른 비슷한 버튼들도 통합시켜봤습니다.
// Button, GrayButton, GreenButton, PurpleButton 통합 => BasicCustomButton
// 혹시 몰라서 밑의 기본 버튼들 삭제하지 않았습니다.
// 다른 동적인 값 넣는 방법은 맨밑에 보면 ToSmallButton과 welcomePage 보고 적용하시면 될 것 같습니다.
export const BasicCustomButton = ({ text, colorName }) => {
  const color = {
    gray : 'border-gray-300 hover:bg-gray-300 active:bg-gray-500 active:border-gray-500',
    green : 'border-green-300 hover:bg-green-300 active:bg-green-500 active:border-green-500',
    purple : 'border-purple-300 hover:bg-purple-300 active:bg-purple-500 active:border-purple-500',
  }

  return (
    <button
    className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid bg-white text-black shadow-md font-semibold ${color[colorName]} active:text-white transition duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

export const Button = ({ text, color }) => {
  return (
    <button
    className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-${color}-300 bg-white text-black shadow-md font-semibold hover:bg-${color}-300 active:bg-${color}-500 active:border-${color}-500 active:text-white transition duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

export const CardButton = ({ text }) => {
  let color = '';
  switch (text) {
    case '맛집':
      color = 'purple';
      break;
    case '놀거리':
      color = 'green';
      break;
    case '숙소':
      color = 'blue';
      break;

    default:
      break;
  }
  return (
    <button
    className={`inline-flex items-center justify-center gap-2 px-2 rounded-full mr-1 border-4 border-solid border-${color}-300 bg-white text-black shadow-md font-semibold hover:bg-${color}-300 active:bg-${color}-500 active:border-${color}-500 active:text-white transition duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

export const GreenButton = ({ text }) => {
  return (
    <button
    className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid bg-white text-black shadow-md font-semibold border-green-300 hover:bg-green-300 active:bg-green-500 active:border-green-500 active:text-white transition duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

export const PurpleButton = ({ text }) => {
  return (
    <button
    className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid bg-white text-black shadow-md font-semibold border-purple-300 hover:bg-purple-300 active:bg-purple-500 active:border-purple-500 active:text-white transition duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

export const RedButton = ({ text }) => {
  return (
    <button
    className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid bg-white text-black shadow-md font-semibold border-red-300 hover:bg-red-300 active:bg-red-500 active:border-red-500 active:text-white transition duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

export const BlueButton = ({ text }) => {
  return (
    <button
    className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid bg-white text-black shadow-md font-semibold border-blue-300 hover:bg-blue-300 active:bg-blue-500 active:border-blue-500 active:text-white transition duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

export const tagSelected = ({ text }) => {
  return (
    <button
    className={`nline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid bg-gray-600 text-white font-semibold`}
    >
      {text}
    </button>
  );
};

// NegativeButton, NegativeButtonGreen을 통합 => NegativeCustomButton
export const NegativeCustomButton = ({ text, colorName}) => {
  const color = {
    green : 'bg-green-500 active:bg-green-100 active:border-green-100',
    blue : 'bg-blue-300 active:bg-blue-100 active:border-blue-100',
  }

  return (
    <button className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-white shadow-md hover:bg-white hover:text-black text-white font-semibold ${color[colorName]} active:text-black transition duration-300 ease-in-out`}>
      {text}
    </button>
  );
};

export const NegativeButton = ({ text }) => {
  return (
    <button className="inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-white  shadow-md hover:bg-white hover:text-black text-white font-semibold bg-blue-300 active:bg-blue-100 active:border-blue-100 active:text-black transition duration-300 ease-in-out">
      {text}
    </button>
  );
};

export const NegativeButtonGreen = ({ text }) => {
  return (
    <button className="inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid border-white  shadow-md hover:bg-white hover:text-black text-white font-semibold bg-green-500 active:bg-green-100 active:border-green-100 active:text-black transition duration-300 ease-in-out">
      {text}
    </button>
  );
};

// ToMypage, ToBoard 통합 => ToPageCustomButton
export const ToPageCustomButton = ({ text, colorName, iconColorName }) => {
  const color = {
    purple : 'border-purple-300 hover:bg-purple-300 active:text-purple-300',
    blue : 'border-sky-300 hover:bg-sky-300 active:text-sky-300',
  }

  const iconColor = {
    purple : 'bg-purple-300',
    blue : 'bg-sky-300',
  }

  return (
    <button className={`inline-flex items-center justify-center gap-2 p-3 pr-6 rounded-full border-4 border-solid  bg-white shadow-md text-black font-bold active:bg-white active:border-white hover:text-white ${color[colorName]} transition duration-300 ease-in-out`}>
      <div className="pl-6 pr-2">{text}</div>
      <div className={`inline-flex items-center justify-center w-10 h-10 flex-shrink-0 ${iconColor[iconColorName]} rounded-full text-white`}>
        <i className="fa-solid fa-arrow-right text-2xl" />
      </div>
    </button>
  );
};

export const ToMypage = () => {
  return (
    <button className="inline-flex items-center justify-center gap-2 p-3 pr-6 rounded-full border-4 border-solid  bg-white shadow-md text-black font-bold hover:text-white active:bg-white active:border-white border-purple-300 hover:bg-purple-300 active:text-purple-300 transition duration-300 ease-in-out">
      <div className="pl-6 pr-2">마이페이지 미션 탭으로</div>
      <div className="inline-flex items-center justify-center w-10 h-10 flex-shrink-0 bg-purple-300 rounded-full text-white">
        <i className="fa-solid fa-arrow-right text-2xl" />
      </div>
    </button>
  );
};

export const ToBoard = () => {
  return (
    <button className="inline-flex items-center justify-center gap-2 p-3 pr-6 rounded-full border-4 border-solid  bg-white shadow-md text-black font-bold hover:text-white active:bg-white active:border-white border-sky-300 hover:bg-sky-300 active:text-sky-300 transition duration-300 ease-in-out">
      <div className="pl-6 pr-2">여행 후기 게시판으로</div>
      <div className="inline-flex items-center justify-center w-10 h-10 flex-shrink-0 bg-sky-300 rounded-full text-white">
        <i className="fa-solid fa-arrow-right text-2xl" />
      </div>
    </button>
  );
};

export const SignUpWithMarbleUsButton = () => {
  return (
    <button type="button" className="inline-flex items-center w-[280px] h-[60px] pl-[4px] rounded-full border-4 border-solid border-white bg-sky-400 shadow-md text-white font-bold hover:bg-white hover:text-black active:bg-sky-200 active:border-sky-200 active:text-black transition duration-300 ease-in-out">
      <div className="inline-flex items-center justify-center w-[45px] h-[45px] flex-shrink-0 bg-white rounded-full text-sky-400">
        <i className="fa-solid fa-plane text-[24px] rotate-[-45deg]" />
      </div>
      <div className="pl-[16px]">Sign up with MarbleUs</div>
    </button>
  );
};

export const GoogleLogInButton = () => {
  
  const redirectToExternalSite = () => {
    // 외부 사이트의 URL을 여기에 입력합니다.
    const oauthUrl = `${process.env.REACT_APP_SERVER_URL}/oauth2/authorization/google`;

    // 현재 페이지를 외부 사이트로 이동합니다.
    window.location.href = oauthUrl;
  };

  return (
    <button onClick={redirectToExternalSite} type="button"
      className="inline-flex items-center justify-center w-[280px] h-[60px] p-1 rounded-full shadow-md font-semibold transition duration-300 ease-in-out"
      style={{
        backgroundImage: 'linear-gradient(to right, #FF3D00, #FFC107, #4CAF50, #1976D2)',
      }}
    >
      <div className="inline-flex bg-white text-black w-[280px] h-[54px] p-2 pr-8 hover:bg-gray-200 rounded-full">
        <div className="inline-flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M39.7398 16.7979C39.6722 16.3811 39.3068 16.083 38.8845 16.083H38.0415C38.0186 16.083 38 16.0644 38 16.0415C38 16.0186 37.9814 16 37.9585 16H24C21.7909 16 20 17.7909 20 20C20 22.2091 21.7909 24 24 24H24.6805C27.9118 24 30.0371 27.3055 27.5255 29.3385C25.4695 31.0026 22.8529 32 20 32C13.373 32 8 26.627 8 20C8 13.373 13.373 8 20 8C21.6946 8 23.3045 8.35414 24.7637 8.99052C26.7262 9.84634 29.1433 9.85666 30.6572 8.3428C32.2753 6.72473 32.2418 4.04541 30.283 2.86241C27.2799 1.04869 23.7651 0 20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 18.9097 39.9088 17.8406 39.7398 16.7979Z"
              fill="#FFC107"
            />
            <path
              d="M4.06008 7.93453C2.92528 9.4327 3.4277 11.5139 4.94326 12.6253C6.93812 14.0883 9.80387 13.2186 11.5601 11.4763C13.7261 9.32758 16.7063 8 19.9997 8C21.6943 8 23.3042 8.35414 24.7634 8.99052C26.7258 9.84634 29.143 9.85666 30.6569 8.3428C32.2749 6.72473 32.2414 4.04541 30.2826 2.86241C27.2795 1.04869 23.7648 0 19.9997 0C13.4885 0 7.71007 3.11574 4.06008 7.93453Z"
              fill="#FF3D00"
            />
            <path
              d="M20.0003 40C23.4586 40 26.7053 39.114 29.5386 37.5638C31.7509 36.3533 31.6989 33.3606 29.7738 31.7315C28.2814 30.4687 26.1312 30.4918 24.3079 31.1973C22.9429 31.7256 21.4831 32.0011 20.0003 32C16.6309 32 13.5908 30.6083 11.4148 28.37C9.64839 26.5529 6.6626 25.637 4.65515 27.1837C3.2293 28.2823 2.76026 30.2666 3.81647 31.7241C7.44795 36.7353 13.3381 40 20.0003 40Z"
              fill="#4CAF50"
            />
            <path
              d="M39.7398 16.7979C39.6722 16.3811 39.3068 16.083 38.8845 16.083H38.0415C38.0186 16.083 38 16.0644 38 16.0415C38 16.0186 37.9814 16 37.9585 16H24C21.7909 16 20 17.7909 20 20C20 22.2091 21.7909 24 24 24H24.6758C27.9071 24 30.0318 27.3089 27.5161 29.3368C27.4174 29.4164 27.3174 29.4944 27.216 29.571C27.2178 29.5698 27.2201 29.57 27.2218 29.5713L29.6796 31.6511C31.6554 33.3231 35.1566 33.3602 36.6013 31.2125C38.2845 28.7102 40 24.9403 40 20C40 18.9097 39.9088 17.8406 39.7398 16.7979Z"
              fill="#1976D2"
            />
          </svg>
        </div>
        <div className="p-[5px] pl-[30px] ">Sign up with Google</div>
      </div>
    </button>
  );
};

// RefreshButton, CloseButton 통합 => SkillButton
export const SkillButton = ({ iconName }) => {
  const icon = {
    refresh : 'fa-solid fa-arrows-rotate',
    close : 'fa-solid fa-xmark',
  }
  return (
    <button type="button" className="inline-flex items-center justify-center gap-2 p-4 rounded-full shadow-md bg-slate-300 hover:bg-white hover:text-black text-white font-semibold active:bg-grey-500 active:bg-slate-500 active:text-white transition duration-300 ease-in-out">
      <i class={`${icon[iconName]} text-2xl pr-1 pl-1`} />
    </button>
  );
};

export const RefreshButton = ({ text }) => {
  return (
    <button type="button" className="inline-flex items-center justify-center gap-2 p-4 rounded-full shadow-md bg-slate-300 hover:bg-white hover:text-black text-white font-semibold active:bg-grey-500 active:bg-slate-500 active:text-white transition duration-300 ease-in-out">
      <i class="fa-solid fa-arrows-rotate text-2xl pr-1 pl-1" />
    </button>
  );
};

export const CloseButton = ({ text }) => {
  return (
    <button type="button" className="inline-flex items-center justify-center gap-2 p-4 rounded-full shadow-md bg-slate-300 hover:bg-white hover:text-black text-white font-semibold active:bg-grey-500 active:bg-slate-500 active:text-white transition duration-300 ease-in-out">
      <i class="fa-solid fa-xmark text-2xl pr-2 pl-2" />
    </button>
  );
};

export const ToSmallButton = ({linkName, Size, iconName, colorName, title}) => {
  const buttonSize = {
    sm : 'w-[40px] h-[40px] text-[20px]',
    md : 'w-[60px] h-[60px] text-[30px]',
    lg : 'w-[80px] h-[80px] text-[40px]',
  }

  const icon = {
    mainpage : 'fa-solid fa-house',
    loginpage : 'fa-solid fa-plane rotate-[-45deg]',
    mypage : 'fa-solid fa-user',
  }

  const link = {
    mainpage : '/',
    loginpage : '/login',
    mypage : '/mypage',
  }

  const color = {
    orange : 'text-white bg-orange-400 hover:bg-[#ff6200] active:bg-gray-200 active:text-[#ff6200]',
    blue : 'text-white bg-sky-400 hover:bg-[#0088F8] active:bg-gray-200 active:text-[#0088F8]',
    purple : 'text-white bg-purple-400 hover:bg-[#a100fd] active:bg-gray-200 active:text-[#a100fd]',
  }

  const specification = {
    mainpage : 'Go to MainPage',
    loginpage : 'Go to LoginPage',
    mypage : 'Go to MyPage',
  }

  return (
    <Link to={`${link[linkName]}`}>
      <div className={`${specification[title]} flex justify-center items-center`}>
        <div className={`${buttonSize[Size]} ${color[colorName]} rounded-full flex justify-center items-center transition duration-300 ease-in-out animate-pulse hover:animate-none shadow-md`}>
            <i className={`${icon[iconName]}`} />
        </div>
      </div>
    </Link>
  )
}

export const FindMethodButton = ({ linkName, text }) => {
  const link = {
    emailMethod1 : '/find/email/method1',
    emailMethod2 : '/find/email/method2',
    passwordMethod1 : '/find/pw/method1',
    passwordMethod2 : '/find/pw/method2',
  }

  return (
    <Link to={`${link[linkName]}`}>
      <button type="button" className="w-[400px] h-[80px] rounded-[14px] shadow-xss font-semibold text-[20px] text-[#6C6C6C] hover:text-[#0088F8] bg-white hover:bg-sky-100 active:bg-[#0088F8] active:text-white">
        {text}
      </button>
    </Link>
  )
}

export const FindSubmitButton = ({text}) => {
  return (
    <button type="submit" className="w-[400px] h-[80px] rounded-[14px] shadow-xss font-semibold text-[20px] text-white bg-[#0088F8]  hover:bg-[#2557e0] active:bg-[#1d43ac]">
    {text}
  </button>
  )
}