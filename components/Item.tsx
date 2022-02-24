import * as React from 'react';
import styled from 'styled-components';
import { BsFillTrashFill } from 'react-icons/bs';

interface ItemProps {
  content: string;
  isCompleted: boolean;
  onIsCompletedChanged?: (isCompleted: boolean) => void;
  onDelete?: () => void;
}

const StyledContainer = styled.div`
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: start;
  align-items: center;
`;

const Item = (props: ItemProps) => {
  return (
    <StyledContainer>
      <input type={'checkbox'} />
      <p style={{ marginLeft: '20px', marginRight: '20px' }}>{props.content}</p>
      <BsFillTrashFill style={{ cursor: 'pointer', marginLeft: 'auto' }} />
    </StyledContainer>
  );
};

export default Item;
