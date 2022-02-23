import { gql, useMutation } from '@apollo/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import { CONSTANTS } from '../lib/constants';
import { Colors } from '../styles/styleConstants';
import { StyledButton } from '../styles/StyledButton';
import { StyledInput } from '../styles/StyledInput';

const TitleLogo = styled.h1`
  cursor: pointer;
  margin-bottom: 0;
  margin-top: 0;
  font-size: 55px;
`;
const SubTitle = styled.h4`
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

const Home: NextPage = () => {
  const [content, setContent] = useState('');
  const CREATE = gql`
      mutation CREATE {
        create(
          content: "${content}"
        ) {
          id
          content
          isCompleted
        }
      }
    `;
  const [createMutation] = useMutation(CREATE);
  const onAddItem = async () => {
    const response = await createMutation();
    console.log(response);
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
      </main>
    </div>
  );
};

export default Home;
