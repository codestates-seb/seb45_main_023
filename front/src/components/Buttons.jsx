import { Link } from "react-router-dom";

export const Button = ({ text, color }) => {
  const colorName = {
    blue:'border-blue-300 hover:bg-blue-300 active:bg-blue-500 active:border-blue-500',
    green:'border-green-300 hover:bg-green-300 active:bg-green-500 active:border-green-500',
    purple:"border-purple-300 hover:bg-purple-300 active:bg-purple-500 active:border-purple-500",
    pink:"border-pink-300 hover:bg-pink-300 active:bg-pink-500 active:border-pink-500"
  }
  return (
    <button
    className={`inline-flex items-center justify-center gap-2 p-4 pl-6 pr-6 rounded-full border-4 border-solid bg-white text-black shadow-md font-semibold ${colorName[color]} active:text-white transition duration-300 ease-in-out`}
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
  // fa-solid fa-plane rotate-[-45deg]
  const icon = {
    mainpage : 'fa-solid fa-house',
    loginpage : 'fa-solid fa-right-to-bracket',
    mypage : 'fa-solid fa-user',
    blog : 'fa-solid fa-rectangle-list'
  }

  const link = {
    mainpage : '/',
    loginpage : '/login',
    mypage : '/mypage',
    blog : '/bloglist/1'
  }

  const color = {
    orange : 'text-white bg-orange-400 hover:bg-[#ff6200] active:bg-gray-200 active:text-[#ff6200]',
    blue : 'text-white bg-sky-400 hover:bg-[#0088F8] active:bg-gray-200 active:text-[#0088F8]',
    purple : 'text-white bg-purple-400 hover:bg-[#a100fd] active:bg-gray-200 active:text-[#a100fd]',
    green : 'text-white bg-green-400 hover:bg-green-500 active:bg-gray-200 active:text-green-500',
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