import {
  InputType,
  Field,
  ArgsType,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { DepartmentType } from '@app/employee/enums/DepartmentType';

@ArgsType()
@InputType()
export class CreateEmployeeInputArgs {
  @Field()
  readonly firstname: string;

  @Field()
  readonly lastname: string;

  @Field()
  readonly email: string;

  @Field((): ReturnTypeFuncValue => DepartmentType)
  readonly departmentType: DepartmentType;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    departmentType: DepartmentType,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.departmentType = departmentType;
  }
}
