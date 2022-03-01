import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Item from './Item';

export interface ItemsData {
  id: number;
  content: string;
  isCompleted: boolean;
}

interface PaginatedItemsProps {
  itemsPerPage: number;
  itemsCount: number;
  items: ItemsData[];
  onSetIsCompleted: (id: number, isCompleted: boolean) => Promise<void>;
  onDeteleById: (id: number) => Promise<void>;
  onSetCurrentPage: (page: number) => void;
}

function PaginatedItems(props: PaginatedItemsProps) {
  const handlePageClick = (event: any) => {
    props.onSetCurrentPage(event.selected + 1); //starts at 0
  };

  return (
    <>
      {props.items.map((item, index) => (
        <Item
          data={item}
          onDelete={props.onDeteleById}
          onIsCompletedChanged={props.onSetIsCompleted}
          key={index}
        />
      ))}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.ceil(props.itemsCount / props.itemsPerPage)}
        previousLabel="< previous"
        pageClassName="page-item-number"
        pageLinkClassName="page-link"
        previousClassName="page-item-previous btn"
        previousLinkClassName="page-link"
        nextClassName="page-item-next btn"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}

export default PaginatedItems;
{
  /* <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item-number"
        pageLinkClassName="page-link"
        previousClassName="page-item-previous btn"
        previousLinkClassName="page-link"
        nextClassName="page-item-next btn"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      /> */
}
