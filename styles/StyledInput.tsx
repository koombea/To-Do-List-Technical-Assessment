import styled from 'styled-components';
import { Colors } from './styleConstants';

export const StyledInput = styled.input<{ characterWidth: number }>`
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 30px;
  border-color: ${Colors.light};
  &:focus-visible {
    box-shadow: 0px 6px 20px -3px ${Colors.shadow};
  }
  outline: none;
  transition: all 0.2s ease-out;
  font-size: 2rem;
  width: ${(props) =>
    props.characterWidth < 20 ? 20 : props.characterWidth}ch;
  max-width: calc(100vw - 40px);
  &::placeholder{
      color: ${Colors.shadow};
  }
`;
