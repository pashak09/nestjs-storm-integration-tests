import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  ObjectType,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
} from 'typeorm';
import { Department } from '@app/employee/entities/Department';

type EmployeeArgs = {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly department: Department;
};

@Entity()
@Unique('unq_email', ['email'])
export class Employee {
  @PrimaryGeneratedColumn()
  private readonly id: number = 0;

  @Column({ type: 'varchar' })
  private firstname: string;

  @Column({ type: 'varchar' })
  private lastname: string;

  @Index('unq_employee_email', { unique: true })
  @Column({ type: 'varchar' })
  private readonly email: string;

  //Todo not to use this example in your production code. Be careful with it.
  // It's just a fast example for src/employee/services/DepartmentEmployeesSalaryIncreaser.ts:17
  @Column({ type: 'decimal', precision: 13, scale: 4 })
  private salary: string;

  @ManyToOne((): ObjectType<Department> => Department, {
    nullable: false,
    lazy: true,
  })
  @JoinColumn({
    foreignKeyConstraintName: 'FK_employee_department',
  })
  department: Promise<Department> | Department;

  @RelationId(
    (employee: Employee): Department | Promise<Department> =>
      employee.department,
  )
  private departmentId: number;

  constructor({ firstname, lastname, email, department }: EmployeeArgs) {
    this.departmentId = department.getId();
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.department = department;
    this.salary = '100';
  }

  getId(): number {
    return this.id;
  }

  getFirstName(): string {
    return this.firstname;
  }

  setFirstname(firstname: string): void {
    this.firstname = firstname;
  }

  getLastName(): string {
    return this.lastname;
  }

  setLastname(lastname: string): void {
    this.lastname = lastname;
  }

  getEmail(): string {
    return this.email;
  }

  getDepartmentId(): number {
    return this.departmentId;
  }

  changeDepartment(department: Department): void {
    this.department = department;
    this.departmentId = department.getId();
  }

  getSalary(): string {
    return this.salary;
  }

  reviseSalary(newValue: string): void {
    this.salary = newValue;
  }
}
