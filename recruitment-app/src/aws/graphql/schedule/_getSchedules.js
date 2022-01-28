import gql from "graphql-tag";

export default gql`
  query {
    getSchedules {
      id
      name
      owner {
        id
      }
      createdAt
    }
  }
`;
