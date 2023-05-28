import { ObjectType, Field, ReturnTypeFuncValue, Int } from '@nestjs/graphql';
import { Employee } from '@app/employee/entities/Employee';
import { DepartmentType } from '@app/employee/enums/DepartmentType';

type CreateArgs = {
  readonly id: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly departmentType: DepartmentType;
  readonly departmentId: number;
};

@ObjectType()
export class EmployeeModel {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly firstname: string;

  @Field()
  readonly lastname: string;

  @Field()
  readonly email: string;

  @Field((): ReturnTypeFuncValue => DepartmentType)
  readonly departmentType: DepartmentType;

  @Field(() => Int)
  readonly departmentId: number;

  constructor({
    id,
    lastname,
    firstname,
    email,
    departmentType,
    departmentId,
  }: CreateArgs) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.departmentType = departmentType;
    this.departmentId = departmentId;
  }

  static async createFromEmployee(employee: Employee): Promise<EmployeeModel> {
    return new this({
      id: employee.getId(),
      email: employee.getEmail(),
      firstname: employee.getFirstName(),
      lastname: employee.getLastName(),
      departmentType: (await employee.department).getType(),
      departmentId: employee.getDepartmentId(),
    });
  }
}
