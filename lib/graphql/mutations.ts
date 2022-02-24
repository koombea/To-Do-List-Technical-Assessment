import { gql } from '@apollo/client';

export const CREATE = (content: string) => gql`
  mutation CREATE {
    create(content: "${content}") {
      id
      content
      isCompleted
    }
  }
`;

export const DELETE_BY_ID = (id: number) => gql`
  mutation DELETE_BY_ID {
    deleteById(id: ${id}) {
      id
      content
      isCompleted
    }
  }
`;

export const SET_IS_COMPLETED = (id: number, isCompleted: boolean) => gql`
  mutation SET_IS_COMPLETED {
    setIsCompleted(id: ${id}, isCompleted: ${isCompleted}) {
      id
      content
      isCompleted
    }
  }
`;
