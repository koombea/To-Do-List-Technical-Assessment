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
  width: 100%;
  height: fit-content;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: start;
  align-items: center;
  position: relative;
  box-shadow: 0px 9px 7px -8px #6746c373;
`;

const StyledLine = styled.div<{ isCompleted: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 2px;
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
      <input
        style={{ transform: 'scale(1.8)' }}
        size={25}
        onChange={onCheckChange}
        type={'checkbox'}
      />
      <p style={{ marginLeft: '20px', marginRight: '20px', fontSize: '23px' }}>
        {props.data.content}
      </p>
      <BsFillTrashFill
        size={25}
        color={Colors.secondary}
        onClick={onDeleteClick}
        style={{ cursor: 'pointer', marginLeft: 'auto' }}
      />
      <StyledLine isCompleted={updatedIsCompleted} />
    </StyledContainer>
  );
};

export default Item;
