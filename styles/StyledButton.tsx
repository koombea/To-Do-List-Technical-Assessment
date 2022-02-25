import styled from 'styled-components';
import { Colors } from './styleConstants';

export const StyledButton = styled.div<{ customColor?: string }>`
  width: fit-content;
  height: fit-content;
  background-color: ${(props) =>
    props.customColor ? props.customColor : Colors.primary};
  padding: 20px;
  border-radius: 35px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 3px 4px 0px ${Colors.shadow};
  &:hover {
    box-shadow: 0px 6px 20px -3px ${Colors.shadow};
  }
  transition: all 0.2s ease-out;
`;
