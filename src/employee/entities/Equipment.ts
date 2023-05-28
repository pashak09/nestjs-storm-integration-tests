import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectType,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Employee } from '@app/employee/entities/Employee';

type EquipmentArgs = {
  readonly name: string;
  readonly employee: Employee;
};

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  private readonly id: number = 0;

  @Column({ type: 'varchar' })
  private readonly name: string;

  @ManyToOne((): ObjectType<Employee> => Employee, {
    nullable: false,
    lazy: true,
  })
  @JoinColumn({
    foreignKeyConstraintName: 'FK_employee',
  })
  readonly employee: Promise<Employee> | Employee;

  @RelationId(
    (equipment: Equipment): Employee | Promise<Employee> => equipment.employee,
  )
  private readonly employeeId: number;

  @Column({ type: Date, precision: 3 })
  private readonly issuedAt: Date;

  @Column({ type: Date, precision: 3, nullable: true })
  private acceptedAt: Date | null;

  constructor({ name, employee }: EquipmentArgs) {
    this.name = name;
    this.employee = employee;
    this.employeeId = employee.getId();
    this.issuedAt = new Date();
    this.acceptedAt = null;
  }

  getId(): number {
    return this.id;
  }

  getEmployeeId(): number {
    return this.employeeId;
  }

  getName(): string {
    return this.name;
  }

  getIssuedAt(): Date {
    return this.issuedAt;
  }

  getAcceptedAt(): Date | null {
    return this.acceptedAt;
  }

  setAcceptedAt(value: Date): void {
    this.acceptedAt = new Date(value);
  }
}
