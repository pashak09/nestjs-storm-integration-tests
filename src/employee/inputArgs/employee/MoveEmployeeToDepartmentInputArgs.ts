import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@ArgsType()
@InputType()
export class MoveEmployeeToDepartmentInputArgs {
  @Field(() => Int)
  readonly departmentId: number;

  @Field(() => Int)
  readonly employeeId: number;

  constructor(departmentId: number, employeeId: number) {
    this.departmentId = departmentId;
    this.employeeId = employeeId;
  }
}
