import gql from "graphql-tag";

export default gql`
  query {
    getCurrentUser {
      id
      name
      email
    }
  }
`;
