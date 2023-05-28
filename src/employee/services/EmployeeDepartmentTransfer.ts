import { Injectable } from '@nestjs/common';
import { Employee } from '../entities/Employee';
import { EmployeeRepositoryService } from '@app/employee/repositories/EmployeeRepositoryService';
import { EntityManager } from 'typeorm';
import { DepartmentRepositoryService } from '@app/employee/repositories/DepartmentRepositoryService';
import { DepartmentTransferException } from '@app/employee/exceptions/DepartmentTransferException';
import { EquipmentSurrender } from '@app/employee/services/EquipmentSurrender';

type CreateArgs = {
  readonly employeeId: number;
  readonly departmentId: number;
};

@Injectable()
export class EmployeeDepartmentTransfer {
  constructor(
    private readonly employeeRepositoryService: EmployeeRepositoryService,
    private readonly departmentRepositoryService: DepartmentRepositoryService,
    private readonly entityManager: EntityManager,
    private readonly equipmentSurrender: EquipmentSurrender,
  ) {}

  /**
   * @throws DepartmentTransferException
   */
  async transfer({ employeeId, departmentId }: CreateArgs): Promise<Employee> {
    const employee = await this.employeeRepositoryService.getOneById(
      employeeId,
    );
    const department = await this.departmentRepositoryService.getOneById(
      departmentId,
    );

    if (department.getId() === employee.getDepartmentId()) {
      throw new DepartmentTransferException(
        `Employee ${employee.getId()} has already in the department ${department.getId()}`,
      );
    }

    await this.equipmentSurrender.invoke(employeeId);
    employee.changeDepartment(department);

    return this.entityManager.save(employee);
  }
}
