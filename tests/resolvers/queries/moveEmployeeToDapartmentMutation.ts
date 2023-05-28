import { GraphQLQueryType } from '@tests/resolvers/queries/GraphQLQueryType';
import { MoveEmployeeToDepartmentInputArgs } from '@app/employee/inputArgs/employee/MoveEmployeeToDepartmentInputArgs';

export const moveEmployeeToDepartment = ({
  employeeId,
  departmentId,
}: MoveEmployeeToDepartmentInputArgs): GraphQLQueryType => ({
  query: `mutation MoveEmployeeToDepartment($employeeId: Int!, $departmentId: Int!) {
  moveEmployeeToDepartment(employeeId: $employeeId, departmentId: $departmentId) {
    id
    departmentId
  }
}`,
  variables: {
    employeeId,
    departmentId,
  },
});
