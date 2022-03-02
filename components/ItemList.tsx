import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { SubTitle } from '../pages';

export interface ItemsData {
  id: number;
  content: string;
  isCompleted: boolean;
}

interface PaginatedItemsProps {
  itemsPerPage: number;
  itemsCount: number;
  items: ItemsData[];
  children?: React.ReactNode;
  onSetCurrentPage: (page: number) => void;
}

function PaginatedItems(props: PaginatedItemsProps) {
  const handlePageClick = (event: any) => {
    props.onSetCurrentPage(event.selected + 1); //starts at 0
  };

  return props.items.length > 0 ? (
    <>
      {props.children}
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
  ) : (
    <SubTitle style={{ paddingLeft: '25px' }}>
      No items to show, let's add some!
    </SubTitle>
  );
}

export default PaginatedItems;
