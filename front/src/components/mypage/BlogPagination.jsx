import Pagination from 'react-js-pagination';
import './Pagination.css'

export default function BlogPagenation({itemPerPage,totalItemsCount,renderItemCount,page,setPage}) {

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      <div className='flex justify-center'>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemPerPage} //페이지 당 카운트할 갯수
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
