import { useEffect, useState } from 'react';

function usePagination(data = [], result = [], itemPerPage = 5) {

    const filteredData = result.length > 0 ? result : data

    const totalRow = filteredData.length;

  const totalPage = Math.ceil(totalRow / itemPerPage);

  const [paginatedData, setPaginatedData] = useState({});

  useEffect(() => {
    let obj = {};
    if (totalPage > 1) {
      for (let i = 1; i <= totalPage; i++) {
        obj['page' + i] = filteredData.slice((i - 1) * itemPerPage, i * itemPerPage);
      }
    } else {
      obj['page1'] = filteredData.slice(0, totalRow);
    }
    setPaginatedData(obj);
  }, [result]);

  return {
    totalPage,
    paginatedData,
  };
}

export default usePagination;
