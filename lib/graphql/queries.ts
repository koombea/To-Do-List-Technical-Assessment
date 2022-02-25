import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query ($offset: Int) {
    getItems(offset: $offset) {
      items {
        id
        content
        isCompleted
      }
      count
    }
  }
`;
