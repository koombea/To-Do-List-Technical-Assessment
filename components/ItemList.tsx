import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { CONSTANTS } from '../lib/constants';
import { SubTitle } from '../pages';
import Item from './Item';

export interface ItemData {
  id: number;
  content: string;
  isCompleted: boolean;
}

interface ItemListProps {
  /**The number of items to be displayed per page. */
  dataLimit: number;
  /**The actual data used to render the items. */
  data: ItemData[];
  /**How many remaining items after the current offset. */
  countRemaining: number;
  onItemIsCompletedChanged: (isCompleted: boolean) => void;
  onItemIsDeleted: () => void;
  onPageChanged: (offset: number) => void;
}

const ItemList = (props: ItemListProps) => {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(
      Math.ceil((props.data.length + props.countRemaining) / props.dataLimit)
    );
  }, [props.dataLimit]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    props.onPageChanged(event.selected * CONSTANTS.ITEMS.PAGINATION_OFFSET + 1);
  };

  const renderData = () => (
    <>
      {props.data.map((item, index) => (
        <Item
          onIsCompletedChanged={props.onItemIsCompletedChanged}
          onDelete={props.onItemIsDeleted}
          data={item}
          key={index}
        />
      ))}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="previous-btn btn"
        previousLinkClassName="page-link"
        nextClassName="next-btn btn"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );

  return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      {props.data.length > 0 ? (
        renderData()
      ) : (
        <SubTitle>No items to be shown... Let's add some!</SubTitle>
      )}
    </div>
  );
};

export default ItemList;
