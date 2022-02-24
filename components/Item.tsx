import * as React from 'react';
import styled from 'styled-components';
import { BsFillTrashFill } from 'react-icons/bs';
import { Colors } from '../styles/styleConstants';
import { ItemData } from './ItemList';

interface ItemProps {
  data: ItemData;
  onIsCompletedChanged: (isCompleted: boolean) => void;
  onDelete: () => void;
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
  position: relative;
`;

const StyledLine = styled.div<{ isCompleted: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 35%;
  height: 1px;
  background-color: ${Colors.light};
  display: ${(props) => (props.isCompleted ? 'block' : 'none')};
`;

const Item = (props: ItemProps) => {
  const [updatedIsCompleted, setUpdatedIsCompleted] = React.useState(
    props.data.isCompleted
  );

  const onCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setUpdatedIsCompleted(value);
    if (props.onIsCompletedChanged) {
      props.onIsCompletedChanged(value);
    }
  };
  const onDeleteClick = () => props.onDelete();
  return (
    <StyledContainer>
      <input onChange={onCheckChange} type={'checkbox'} />
      <p style={{ marginLeft: '20px', marginRight: '20px' }}>
        {props.data.content}
      </p>
      <BsFillTrashFill
        onClick={onDeleteClick}
        style={{ cursor: 'pointer', marginLeft: 'auto' }}
      />
      <StyledLine isCompleted={updatedIsCompleted} />
    </StyledContainer>
  );
};

export default Item;
