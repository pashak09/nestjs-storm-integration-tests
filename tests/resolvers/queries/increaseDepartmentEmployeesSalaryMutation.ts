import { GraphQLQueryType } from './GraphQLQueryType';
import { DepartmentType } from '@app/employee/enums/DepartmentType';

type IncreaseDepartmentEmployeesSalaryMutationArgs = {
  readonly departmentType: keyof typeof DepartmentType;
  readonly percentage: number;
};

export const increaseDepartmentEmployeesSalaryMutation = ({
  percentage,
  departmentType,
}: IncreaseDepartmentEmployeesSalaryMutationArgs): GraphQLQueryType => ({
  query: `mutation IncreaseDepartmentEmployeesSalary($percentage: Float!, $departmentType: DepartmentType!) {
  increaseDepartmentEmployeesSalary(percentage: $percentage, departmentType: $departmentType)
}`,
  variables: {
    percentage,
    departmentType,
  },
});
