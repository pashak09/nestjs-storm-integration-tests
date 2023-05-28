import { GraphQLQueryType } from '@tests/resolvers/queries/GraphQLQueryType';
import { EmployeesBulkInsertInputArgs } from '@app/employee/inputArgs/employee/EmployeesBulkInsertInputArgs';

export const bulkInsertEmployeesMutation = (args: {
  readonly data: readonly EmployeesBulkInsertInputArgs[];
}): GraphQLQueryType => ({
  query: `mutation bulkInsertEmployees($data: [EmployeesBulkInsertInputArgs!]!) {
  bulkInsertEmployees(data: $data)
}`,
  variables: {
    data: args.data,
  },
});
