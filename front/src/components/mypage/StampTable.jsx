import { Link } from 'react-router-dom';
import { RouteConst } from '../../interface/RouteConst';

export default function StampTable({ topData, bottomData }) {
  
  return (
    <div className="flex flex-col justify-center max-w-screen-sm mx-auto p-4 h-[25rem] space-x-10">
      <table className="w-full table-fixed h-[30rem]">
        <tbody>
          {topData ? (
            <tr>
              {topData.slice(0, 5).map((item,idx) => {
                return item.stamp ? (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[7rem] h-[6rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={idx} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <Link to={`/bloglist/${idx+1}`}>
                      <div className="flex justify-center items-center w-[7rem] h-[6rem] text-sm">게시판</div>
                    </Link>
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                );
              })}
            </tr>
          ) : (
            <tr>
              {bottomData.slice(0, 5).map((item,idx) => {
                console.log(item.id);
                return item.stamp ? (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[5rem] h-[5rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={idx} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <Link to={`/bloglist/${idx+11}`}>
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
              {topData.slice(5, 10).map((item,idx) => {
                return item.stamp ? (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[7rem] h-[6rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={idx} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <Link to={`/bloglist/${idx+6}`}>
                      <div className="flex justify-center items-center w-[7rem] h-[6rem]">게시판</div>
                    </Link>
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                );
              })}
            </tr>
          ) : (
            <tr>
              {bottomData.slice(5, 10).map((item,idx) => {
                return item.stamp ? (
                  <td key={item.id} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <img src={`${item.stamp}`} alt={`${item.city}`} className="w-[7rem] h-[6rem]" />
                    <span className="flex justify-center border-t border-black">{item.city}</span>
                  </td>
                ) : (
                  <td key={idx} className="border border-black p-2 w-[8rem] h-[8rem]">
                    <Link to={`/bloglist/${idx+16}`}>
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
