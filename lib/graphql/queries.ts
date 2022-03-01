import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query ($page: Int) {
    getItems(page: $page) {
      items {
        id
        content
        isCompleted
      }
      count
    }
  }
`;
