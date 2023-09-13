import { useState } from 'react';
import Pagination from 'react-js-pagination';
import './Pagination.css'

export default function BlogPagenation() {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      <div className='flex justify-center'>
        <Pagination
          activePage={page}
          itemsCountPerPage={4}
          totalItemsCount={10}
          pageRangeDisplayed={4}
          prevPageText={'<'}
          nextPageText={'>'}
          onChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
}
