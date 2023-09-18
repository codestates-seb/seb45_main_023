import { Link } from 'react-router-dom';
import { RouteConst } from '../../interface/RouteConst';

export default function StampTable({ topData, bottomData }) {

  return (
    <div className="flex flex-col justify-center max-w-screen-sm mx-auto p-4 h-[25rem] space-x-10">
      <table className="w-full table-fixed h-[20rem]">
        <tbody>
          {topData ? (
            <tr>
              {topData.slice(0, 5).map((item) => {
                return item.stamp ? (
                  <td key={item.id} className="border border-black p-2 w-[10rem] h-[10rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[9rem] h-[8rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={item.id} className="border border-black p-2 w-[10rem] h-[10rem]">
                    <Link to={RouteConst.blog_list}>
                      <div className="flex justify-center items-center w-[9rem] h-[8rem]">인증글 쓰러가기</div>
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
                  <td key={item.id} className="border border-black p-2 w-[10rem] h-[10rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[9rem] h-[8rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={item.id} className="border border-black p-2 w-[10rem] h-[10rem]">
                    <Link to={`/bloglist/${item.id}`}>
                      <div className="flex justify-center items-center w-[9rem] h-[8rem]" cityId={item.id}>
                        인증글 쓰러가기
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
                  <td key={item.id} className="border border-black p-2 w-[10rem] h-[10rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[9rem] h-[8rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={item.id} className="border border-black p-2 w-[10rem] h-[10rem]">
                    <Link to={RouteConst.blog_list}>
                      <div className="flex justify-center items-center w-[9rem] h-[8rem]">인증글 쓰러가기</div>
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
                  <td key={item.id} className="border border-black p-2 w-[10rem] h-[10rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[9rem] h-[8rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={item.id} className="border border-black p-2 w-[10rem] h-[10rem]">
                    <Link to={RouteConst.blog_list}>
                      <div className="flex justify-center items-center w-[9rem] h-[8rem]">인증글 쓰러가기</div>
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
