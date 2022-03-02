import { useLazyQuery, useMutation } from '@apollo/client';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CONSTANTS } from '../lib/constants';
import { Colors } from '../styles/styleConstants';
import { StyledButton } from '../styles/StyledButton';
import { StyledInput } from '../styles/StyledInput';
import Swal from 'sweetalert2';
import {
  CREATE,
  DELETE_BY_ID,
  SET_IS_COMPLETED
} from '../lib/graphql/mutations';
import { GET_ITEMS } from '../lib/graphql/queries';
import Item, { ItemData } from '../components/Item';
import PaginatedItems from '../components/ItemList';
import client from '../lib/apollo-client';

const TitleLogo = styled.h1`
  cursor: pointer;
  margin-bottom: 0;
  margin-top: 0;
  font-size: 55px;
`;
export const SubTitle = styled.h4`
  color: ${Colors.light};
  margin-top: 0;
  font-weight: 400;
`;
const AppBar = styled.header`
  width: 100%;
  height: fit-content;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px ${Colors.shadow};
  margin-bottom: 20px;
`;

interface HomeProps {
  initialItemData: ItemData[];
  initialItemsCount: number;
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const [content, setContent] = useState('');
  const [createMutation] = useMutation(CREATE);
  const [setIsCompletedMutation] = useMutation(SET_IS_COMPLETED);
  const [deleteByIdMutation] = useMutation(DELETE_BY_ID);
  const [getItems] = useLazyQuery(GET_ITEMS);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(props.initialItemData);
  const [itemsCount, setItemsCount] = useState(props.initialItemsCount);

  const fetchData = async () => {
    const response = await getItems({
      variables: {
        page: currentPage
      }
    });
    const newItems: ItemData[] = response.data.getItems.items;
    const newItemsCount: number = response.data.getItems.count;
    setItems(newItems);
    setItemsCount(newItemsCount);
  };

  const onAddItem = async () => {
    try {
      const response = await createMutation({
        variables: { content: content }
      });
      if (response.errors) {
        await Swal.fire('Error!', response.errors[0].message, 'error');
        return;
      }
      setContent('');
      fetchData();
    } catch (error: any) {
      console.log(error.message);
      Swal.fire('Error!', error.message, 'error');
    }
  };

  const onSetIsCompleted = async (id: number, isCompleted: boolean) => {
    try {
      const response = await setIsCompletedMutation({
        variables: { id: parseInt(id.toString()), isCompleted: isCompleted }
      });
      if (response.errors) {
        await Swal.fire('Error!', response.errors[0].message, 'error');
        return;
      }
      fetchData();
    } catch (error: any) {
      console.log(error.message);
      Swal.fire('Error!', error.message, 'error');
    }
  };

  const onDeteleById = async (id: number) => {
    try {
      const response = await deleteByIdMutation({
        variables: { id: parseInt(id.toString()) }
      });
      if (response.errors) {
        await Swal.fire('Error!', response.errors[0].message, 'error');
        return;
      }
      fetchData();
    } catch (error: any) {
      console.log(error.message);
      Swal.fire('Error!', error.message, 'error');
    }
  };

  const onSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div>
      <Head>
        <title>YATDLA</title>
        <meta name="description" content="Yet Another To Do List App :D" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppBar>
          <TitleLogo>YATDLA</TitleLogo>
          <SubTitle>Yet Another To Do List App :D</SubTitle>
        </AppBar>
        <div className="bodyContainer">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <StyledInput
              style={{ marginBottom: '10px', marginRight: '20px' }}
              value={content}
              characterWidth={content.length}
              placeholder="Content here"
              onChange={(evt) => setContent(evt.target.value)}
              maxLength={CONSTANTS.ITEMS.MAX_CONTENT_LENGTH}
            />
            <StyledButton onClick={onAddItem}>Add Item</StyledButton>
          </div>
        </div>
        <PaginatedItems
          items={items}
          itemsCount={itemsCount}
          itemsPerPage={CONSTANTS.ITEMS.PAGINATION_MAX_TO_TAKE}
          onSetCurrentPage={onSetCurrentPage}
        >
          {items.map((item, index) => (
            <Item
              data={item}
              onDelete={onDeteleById}
              onIsCompletedChanged={onSetIsCompleted}
              key={index}
            />
          ))}
        </PaginatedItems>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const response = await client.query({
    query: GET_ITEMS,
    variables: { page: 1 }
  });

  return {
    props: {
      initialItemData: response.data.getItems.items,
      initialItemsCount: response.data.getItems.count
    }
  };
};

export default Home;
