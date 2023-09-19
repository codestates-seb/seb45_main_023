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