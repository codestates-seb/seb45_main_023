import { useState } from 'react';
import Pagination from 'react-js-pagination';
import './Pagination.css'

export default function BlogPagenation({itemsCountPerPage,totalItemsCount,renderItemCount}) {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      <div className='flex justify-center'>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemsCountPerPage} //페이지 당 카운트할 갯수
          totalItemsCount={totalItemsCount} // 컨텐츠 총 갯수
          pageRangeDisplayed={renderItemCount} // 보여줄 페이지 갯수
          prevPageText={'<'}
          nextPageText={'>'}
          onChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
}
