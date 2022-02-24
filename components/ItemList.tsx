import * as React from 'react';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import Item from './Item';

export interface ItemData {
  id: number;
  content: string;
  isCompleted: boolean;
}

interface ItemListProps {
  dataLimit: number;
  pageLimit: number;
}

const StyledGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: flex-start;
  align-items: center;
`;

const ItemList = (props: ItemListProps) => {
  const [data, setData] = useState<ItemData[]>([]);
  const [pages] = useState(Math.round(data.length / props.dataLimit));
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
    return data.slice(startIndex, endIndex);
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

  const onItemIsCompletedChanged = (isCompleted: boolean) => {
    console.log(isCompleted);
  };

  const onItemIsDeleted = () => {};

  return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <StyledGrid>
        {getPaginatedData().map((d, idx) => (
          <Item
            onIsCompletedChanged={onItemIsCompletedChanged}
            onDelete={onItemIsDeleted}
            data={d}
            key={idx}
          />
        ))}
      </StyledGrid>

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
