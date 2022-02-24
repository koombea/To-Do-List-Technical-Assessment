import { gql } from '@apollo/client';

export const GET_ITEMS = (offset: number) => gql`
  query GET_ITEMS {
    getItems(offset: ${offset}) {
      items {
        id
        content
        isCompleted
      }
      count
    }
  }
`;
