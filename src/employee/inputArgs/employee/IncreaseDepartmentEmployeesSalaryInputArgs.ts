import {
  InputType,
  Field,
  ArgsType,
  ReturnTypeFuncValue,
  Float,
} from '@nestjs/graphql';
import { DepartmentType } from '@app/employee/enums/DepartmentType';

@ArgsType()
@InputType()
export class IncreaseDepartmentEmployeesSalaryInputArgs {
  @Field((): ReturnTypeFuncValue => DepartmentType)
  readonly departmentType: DepartmentType;

  @Field((): ReturnTypeFuncValue => Float)
  readonly percentage: number;

  constructor(departmentType: DepartmentType, percentage: number) {
    this.departmentType = departmentType;
    this.percentage = percentage;
  }
}
