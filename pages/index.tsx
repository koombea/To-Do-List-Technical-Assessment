import { useMutation } from '@apollo/client';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemList, { ItemData } from '../components/ItemList';
import { CONSTANTS } from '../lib/constants';
import { Colors } from '../styles/styleConstants';
import { StyledButton } from '../styles/StyledButton';
import { StyledInput } from '../styles/StyledInput';
import Swal from 'sweetalert2';
import { CREATE } from '../lib/graphql/mutations';
import client from '../lib/apollo-client';
import { GET_ITEMS } from '../lib/graphql/queries';

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
  initialCountRemaining: number;
}

const Home: NextPage<HomeProps> = (props) => {
  const [content, setContent] = useState('');
  const [itemsData, setItemsData] = useState<ItemData[]>(props.initialItemData);
  const [countRemaining, setCountRemaining] = useState(
    props.initialCountRemaining
  );
  const [createMutation] = useMutation(CREATE(content));

  const fetchData = async (offset: number = 1) => {
    const response = await client.query({
      query: GET_ITEMS(offset),
      fetchPolicy: 'network-only'
    });
    setItemsData(response.data.getItems.items);
    if (response.data.getItems.count > 0)
      setCountRemaining(response.data.getItems.count);
  };

  const onAddItem = async () => {
    try {
      const response = await createMutation();
      setContent('');
      fetchData();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onItemIsCompletedChanged = (isCompleted: boolean) => {};

  const onItemIsDeleted = () => {};

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
        <ItemList
          onItemIsDeleted={onItemIsDeleted}
          onItemIsCompletedChanged={onItemIsCompletedChanged}
          data={itemsData}
          dataLimit={CONSTANTS.ITEMS.PAGINATION_OFFSET}
          countRemaining={countRemaining}
          onPageChanged={fetchData}
        />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const response = await client.query({
    query: GET_ITEMS(1)
  });
  return {
    props: {
      initialItemData: response.data.getItems.items,
      initialCountRemaining: response.data.getItems.count
    }
  };
};

export default Home;
