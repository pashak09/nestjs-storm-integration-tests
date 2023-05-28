import { GraphQLQueryType } from './GraphQLQueryType';

export const describeEmployeeQuery = (id: number): GraphQLQueryType => ({
  query: `query DescribeEmployee($id: Int!) {
  describeEmployee(id: $id) {
    firstname
    lastname
    email
  }
}`,
  variables: {
    id,
  },
});
