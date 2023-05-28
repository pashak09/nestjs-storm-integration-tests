import { Injectable } from '@nestjs/common';
import { Employee } from '../entities/Employee';
import { EmployeeRepositoryService } from '@app/employee/repositories/EmployeeRepositoryService';
import { EmployeeEmailAlreadyExistsException } from '@app/employee/exceptions/EmployeeEmailAlreadyExistsException';
import { EntityManager } from 'typeorm';
import { DepartmentRepositoryService } from '@app/employee/repositories/DepartmentRepositoryService';
import { DepartmentType } from '@app/employee/enums/DepartmentType';

type CreateArgs = {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly departmentType: DepartmentType;
};

@Injectable()
export class EmployeeCreator {
  constructor(
    private readonly employeeRepositoryService: EmployeeRepositoryService,
    private readonly departmentRepositoryService: DepartmentRepositoryService,
    private readonly entityManager: EntityManager,
  ) {}

  /**
   * @throws EmployeeEmailAlreadyExistsException
   */
  async create({
    lastname,
    firstname,
    email,
    departmentType,
  }: CreateArgs): Promise<Employee> {
    const employee = await this.employeeRepositoryService.findOneByEmail(email);
    const department = await this.departmentRepositoryService.getByType(
      departmentType,
    );

    if (employee !== null) {
      throw new EmployeeEmailAlreadyExistsException(email);
    }

    const newEmployee = new Employee({
      lastname,
      firstname,
      email,
      department,
    });

    return this.entityManager.save(newEmployee);
  }
}
