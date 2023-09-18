export const FindSubmitButton = ({text}) => {
    return (
      <button type="submit" className="w-[400px] h-[80px] rounded-[14px] shadow-xss font-semibold text-[20px] text-white bg-[#0088F8]  hover:bg-[#2557e0] active:bg-[#1d43ac]">
      {text}
    </button>
    )
  }