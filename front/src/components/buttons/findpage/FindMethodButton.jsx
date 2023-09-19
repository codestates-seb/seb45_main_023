import {Link} from "react-router-dom";

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