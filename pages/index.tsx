import { useLazyQuery, useMutation } from '@apollo/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import ItemList from '../components/ItemList';
import { CONSTANTS } from '../lib/constants';
import { Colors } from '../styles/styleConstants';
import { StyledButton } from '../styles/StyledButton';
import { StyledInput } from '../styles/StyledInput';
import Swal from 'sweetalert2';
import { CREATE } from '../lib/graphql/mutations';
import { GET_ITEMS } from '../lib/graphql/queries';
import { ItemData } from '../components/Item';

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
  const [createMutation] = useMutation(CREATE);
  const [getItems] = useLazyQuery(GET_ITEMS);
  const [currentOffset, setCurrentOffset] = useState(1);
  const [initialData, setInitialData] = useState([]);

  const fetchData = async () => {
    const response = await getItems({
      variables: {
        offset: currentOffset
      }
    });
    setInitialData(response.data.getItems.items);
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
          onCurrentOffsetChanged={(offset) => {
            setCurrentOffset(offset);
          }}
          initialData={initialData}
          itemsPerPage={CONSTANTS.ITEMS.PAGINATION_OFFSET}
        />
      </main>
    </div>
  );
};

export default Home;
