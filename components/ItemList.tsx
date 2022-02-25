import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { CONSTANTS } from '../lib/constants';
import { DELETE_BY_ID, SET_IS_COMPLETED } from '../lib/graphql/mutations';
import { GET_ITEMS } from '../lib/graphql/queries';
import { SubTitle } from '../pages';
import Item, { ItemData } from './Item';

interface ItemListProps {
  /**How many items will be displayed per page. */
  itemsPerPage: number;
  /**Used when another item has been added. */
  updatedData: ItemData[];
  /**Used when another item has been added. */
  updatedDataCount: number;
  /**Used to keep track of the current offset. */
  onCurrentOffsetChanged: (offset: number) => void;
}

function ItemList(props: ItemListProps) {
  const [currentItems, setCurrentItems] = useState<ItemData[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [dataCount, setDataCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [deleteItem] = useMutation(DELETE_BY_ID);
  const [setIsCompleted] = useMutation(SET_IS_COMPLETED);

  const [getItems] = useLazyQuery(GET_ITEMS);

  const fetchData = async () => {
    try {
      const response = await getItems({
        variables: {
          offset: itemOffset
        }
      });

      if (response.error) {
        Swal.fire('Error!', response.error.message, 'error');
        return;
      }

      const items = response.data.getItems.items;
      const count = response.data.getItems.count;
      setCurrentItems(items.slice(0, CONSTANTS.ITEMS.PAGINATION_OFFSET));
      setPageCount(Math.ceil(count / props.itemsPerPage));
      setDataCount(count);
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');
    }
  };

  const onItemIsCompletedChanged = async (id: number, isCompleted: boolean) => {
    try {
      const response = await setIsCompleted({
        //TODO - For some reason, if I don't parse the id, it is sent as a string.
        variables: {
          id: parseInt(id.toString()),
          isCompleted: isCompleted
        }
      });
      if (response.errors) {
        Swal.fire('Error!', response.errors[0].message, 'error');
        return;
      }
      fetchData();
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');
    }
  };

  const onItemIsDeleted = async (id: number) => {
    try {
      const response = await deleteItem({
        //TODO - For some reason, if I don't parse the id, it is sent as a string.
        variables: {
          id: parseInt(id.toString())
        }
      });
      if (response.errors) {
        Swal.fire('Error!', response.errors[0].message, 'error');
        return;
      }
      fetchData();
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemOffset, props.itemsPerPage]);
  useEffect(() => {
    if (props.updatedDataCount > dataCount) {
      fetchData();
    } else {
      setCurrentItems(
        props.updatedData.slice(0, CONSTANTS.ITEMS.PAGINATION_OFFSET)
      );
      setPageCount(Math.ceil(props.updatedDataCount / props.itemsPerPage));
      setDataCount(props.updatedDataCount);
    }
  }, [props.updatedData]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * props.itemsPerPage) % dataCount;
    props.onCurrentOffsetChanged(newOffset);
    setItemOffset(newOffset);
  };

  const renderData = () => (
    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      {currentItems.map((item) => (
        <Item
          key={item.id}
          data={item}
          onDelete={onItemIsDeleted}
          onIsCompletedChanged={onItemIsCompletedChanged}
        />
      ))}
      <ReactPaginate
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
      />
    </div>
  );

  return dataCount > 0 ? (
    renderData()
  ) : (
    <div style={{ paddingLeft: '20px' }}>
      <SubTitle>No items to show, let's add some!</SubTitle>
    </div>
  );
}

export default ItemList;
