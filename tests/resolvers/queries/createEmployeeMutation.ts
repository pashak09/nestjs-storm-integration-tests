import { GraphQLQueryType } from '@tests/resolvers/queries/GraphQLQueryType';
import { CreateEmployeeInputArgs } from '@app/employee/inputArgs/employee/CreateEmployeeInputArgs';
import { DepartmentType } from '@app/employee/enums/DepartmentType';

export type CreateEmployeeMutationArgs = Omit<
  CreateEmployeeInputArgs,
  'departmentType'
> & {
  departmentType: keyof typeof DepartmentType;
};

export const createEmployeeMutation = ({
  firstname,
  lastname,
  email,
  departmentType,
}: CreateEmployeeMutationArgs): GraphQLQueryType => ({
  query: `mutation CreateEmployee($firstname: String!, $lastname: String!, $email: String!, $departmentType: DepartmentType!) {
  createEmployee(firstname: $firstname, lastname: $lastname, email: $email, departmentType: $departmentType) {
    firstname
    lastname
    email
    departmentType
  }
}`,
  variables: {
    lastname,
    firstname,
    email,
    departmentType,
  },
});
