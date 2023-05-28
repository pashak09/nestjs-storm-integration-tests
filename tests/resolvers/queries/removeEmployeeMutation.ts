import { GraphQLQueryType } from './GraphQLQueryType';

export const removeEmployeeMutation = (id: number): GraphQLQueryType => ({
  query: `mutation RemoveEmployee($id: Int!) {
  removeEmployee(id: $id)
}`,
  variables: {
    id,
  },
});
