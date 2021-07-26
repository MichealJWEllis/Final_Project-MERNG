import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword ) {
      token
      user {
        id
        username
        email
        createAt
        token
      }
    }
  }
`;