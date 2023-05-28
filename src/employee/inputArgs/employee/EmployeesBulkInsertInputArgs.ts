import { InputType, Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
@InputType()
export class EmployeesBulkInsertInputArgs {
  @Field()
  readonly firstname: string;

  @Field()
  readonly lastname: string;

  @Field()
  readonly email: string;

  @Field()
  readonly salary: string;

  @Field()
  readonly departmentId: number;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    salary: string,
    departmentId: number,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.salary = salary;
    this.departmentId = departmentId;
  }
}
