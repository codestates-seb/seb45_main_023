
export default function MyPage() {
  return (
    <div className="mypageContainer">
      <div className="topContainer">
        <div className="flex">
          <div className='leftText font-bold'>이 여권은 별도의 기재가 없는 한 해당 사이트에서 만 유효합니다.</div>
          <div className='rightText'>This passport is only valid on this site unless otherwise endorsed.</div>
        </div>
        <div className="buttonContainer"></div>
      </div>
      <div className="bottomContainer"></div>
    </div>
  );
}
