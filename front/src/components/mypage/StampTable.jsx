import { Link } from 'react-router-dom';
import { RouteConst } from '../../interface/RouteConst';

export default function StampTable({ topData, bottomData }) {
  const cityName = [
    '서울특별시',
    '부산광역시',
    '인천광역시',
    '대구광역시',
    '제주도',
    '대전광역시',
    '광주광역시',
    '울산광역시',
    '세종특별시',
    '자유여행',
    '충청남도',
    '경상남도',
    '전라남도',
    '충청북도',
    '울릉도',
    '경상북도',
    '전라북도',
    '강원도',
    '경기도',
  ];
  return (
    <div className="flex flex-col justify-center max-w-screen-sm mx-auto p-4 h-[25rem] space-x-10">
      <table className="w-full table-fixed h-[30rem]">
        <tbody>
          {topData ? (
            <tr>
              {topData.slice(0, 5).map((item) => {
                return item.stamp ? (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[7rem] h-[6rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <Link to={RouteConst.blog_list}>
                      <div className="flex justify-center items-center w-[7rem] h-[6rem] text-sm">게시판</div>
                    </Link>
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                );
              })}
            </tr>
          ) : (
            <tr>
              {bottomData.slice(0, 5).map((item) => {
                return item.stamp ? (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[5rem] h-[5rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <Link to={`/bloglist/${item.id}`}>
                      <div className="flex justify-center items-center w-[5rem] h-[5rem]" cityId={item.id}>
                      게시판
                      </div>
                    </Link>
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                );
              })}
            </tr>
          )}

          {topData ? (
            <tr>
              {topData.slice(5, 10).map((item) => {
                return item.stamp ? (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[7rem] h-[6rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <Link to={RouteConst.blog_list}>
                      <div className="flex justify-center items-center w-[7rem] h-[6rem]">게시판</div>
                    </Link>
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                );
              })}
            </tr>
          ) : (
            <tr>
              {bottomData.slice(5, 10).map((item) => {
                return item.stamp ? (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[7rem] h-[6rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <Link to={RouteConst.blog_list}>
                      <div className="flex justify-center items-center w-[7rem] h-[6rem]">게시판</div>
                    </Link>
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
