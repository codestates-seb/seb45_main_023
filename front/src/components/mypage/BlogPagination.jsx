import { useState } from 'react';
import Pagination from 'react-js-pagination';
import './Pagination.css'

export default function BlogPagenation({itemPerPage, totalItemsCount, renderItemCount, page, setPage}) {

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      <div className='flex justify-center'>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={renderItemCount}
          prevPageText={'<'}
          nextPageText={'>'}
          onChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
}
