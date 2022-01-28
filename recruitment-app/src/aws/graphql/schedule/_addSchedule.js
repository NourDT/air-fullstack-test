import gql from "graphql-tag";

export default gql`
  mutation($input: CreateScheduleInput!) {
    addSchedule(input: $input) {
      id
      name
      email
      owner {
        id
      }
      createdAt
    }
  }
`;
