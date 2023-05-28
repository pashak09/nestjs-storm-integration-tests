import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Employee } from '@app/employee/entities/Employee';
import { DepartmentType } from '@app/employee/enums/DepartmentType';

type CreateArgs = {
  readonly type: DepartmentType;
};

@Entity()
@Unique('unq_type', ['type'])
export class Department {
  @PrimaryGeneratedColumn()
  private readonly id: number = 0;

  @Column({ type: 'enum', enum: DepartmentType })
  private readonly type: DepartmentType;

  @OneToMany(() => Employee, (employee: Employee) => employee.department, {
    lazy: true,
  })
  employees: Promise<Employee[]> | Employee[];

  constructor({ type }: CreateArgs) {
    this.type = type;
    this.employees = [];
  }

  getId(): number {
    return this.id;
  }

  getType(): DepartmentType {
    return this.type;
  }
}
