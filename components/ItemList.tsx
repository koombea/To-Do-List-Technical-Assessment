import * as React from 'react';
import { FormEvent, useState } from 'react';

interface ItemListProps {
  data: any[];
  dataLimit: number;
  pageLimit: number;
}

const ItemList = (props: ItemListProps) => {
  const [pages] = useState(Math.round(props.data.length / props.dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event: FormEvent<HTMLButtonElement>) {
    const pageNumber = Number(event.currentTarget.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * props.dataLimit - props.dataLimit;
    const endIndex = startIndex + props.dataLimit;
    return props.data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start =
      Math.floor((currentPage - 1) / props.pageLimit) * props.pageLimit;
    if (currentPage === pages + 1) {
      return new Array(props.pageLimit).fill(0).map((_, idx) => start + idx);
    } else {
      return new Array(props.pageLimit)
        .fill(0)
        .map((_, idx) => start + idx + 1);
    }
  };

  return (
    <div>
      <div>
        {getPaginatedData().map((d, idx) => (
          <div key={idx}>{d}</div>
        ))}
      </div>

      <div>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? 'active' : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button onClick={goToNextPage} disabled={currentPage === pages + 1}>
          next
        </button>
      </div>
    </div>
  );
};

export default ItemList;
