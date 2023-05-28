import { DepartmentType } from '@app/employee/enums/DepartmentType';
import { EntityManager } from 'typeorm';
import { DepartmentRepositoryService } from '@app/employee/repositories/DepartmentRepositoryService';
import { Employee } from '@app/employee/entities/Employee';
import { Injectable } from '@nestjs/common';
import { SalaryIncreaser } from '@app/employee/services/SalaryIncreaser';

@Injectable()
export class DepartmentEmployeesSalaryIncreaser {
  constructor(
    private readonly departmentRepositoryService: DepartmentRepositoryService,
    private readonly salaryIncreaser: SalaryIncreaser,
    private readonly entityManager: EntityManager,
  ) {}

  /**
   * @throws Error
   */
  async updateDepartmentSalary(
    departmentType: DepartmentType,
    percentage: number,
  ): Promise<void> {
    try {
      await this.entityManager.transaction(
        async (transactionalEntityManager): Promise<void> => {
          const department = await this.departmentRepositoryService.getByType(
            departmentType,
          );
          const employees = await department.employees;

          employees.forEach((employee: Employee): void => {
            employee.reviseSalary(
              this.salaryIncreaser.increase({
                value: employee.getSalary(),
                percentage,
              }),
            );
          });

          await transactionalEntityManager.save(employees);
        },
      );
    } catch (error) {
      throw new Error('Failed to update department salary');
    }
  }
}
