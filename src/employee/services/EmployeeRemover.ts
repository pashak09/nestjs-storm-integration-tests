import { Injectable } from '@nestjs/common';
import { EmployeeRepositoryService } from '@app/employee/repositories/EmployeeRepositoryService';
import { EntityManager } from 'typeorm';
import { EmployeeNotFoundException } from '@app/employee/exceptions/EmployeeNotFoundException';

@Injectable()
export class EmployeeRemover {
  constructor(
    private readonly employeeRepositoryService: EmployeeRepositoryService,
    private readonly entityManager: EntityManager,
  ) {}

  /**
   * @throws EmployeeNotFoundException
   */
  async remove(id: number): Promise<void> {
    const employee = await this.employeeRepositoryService.findOneById(id);

    if (employee == null) {
      throw new EmployeeNotFoundException(id);
    }

    await this.entityManager.remove(employee);
  }
}
