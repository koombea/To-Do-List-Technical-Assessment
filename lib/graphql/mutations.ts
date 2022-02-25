import { gql } from '@apollo/client';

export const CREATE = gql`
  mutation ($content: String!) {
    create(content: $content) {
      id
      content
      isCompleted
    }
  }
`;

export const DELETE_BY_ID = gql`
  mutation ($id: Int!) {
    deleteById(id: $id) {
      id
      content
      isCompleted
    }
  }
`;

export const SET_IS_COMPLETED = gql`
  mutation ($id: Int!, $isCompleted: Boolean!) {
    setIsCompleted(id: $id, isCompleted: $isCompleted) {
      id
      content
      isCompleted
    }
  }
`;
