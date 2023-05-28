import { Employee } from '@app/employee/entities/Employee';
import { BaseStaticFixture, StaticFixture } from 'typeorm-data-fixtures';
import { EntityManager } from 'typeorm';
import { DepartmentFixture } from '@tests/core/fixtures/DepartmentFixture';

type ResultOfEmployeeFixture = {
  readonly pashak09Employee: Employee;
  readonly pavelEmployee: Employee;
};

@StaticFixture({ dependencies: [DepartmentFixture] })
export class EmployeeFixture extends BaseStaticFixture<ResultOfEmployeeFixture> {
  async install(
    entityManager: EntityManager,
  ): Promise<ResultOfEmployeeFixture> {
    const { itDepartment } = this.fixtureResultOf(DepartmentFixture);

    const pashak09Employee = new Employee({
      firstname: 'pashak09',
      email: '37300581+pashak09@users.noreply.github.com',
      lastname: 'pashak09',
      department: itDepartment,
    });

    const pavelEmployee = new Employee({
      firstname: 'pavel',
      email: '37300581+pavel@users.noreply.github.com',
      lastname: 'pavel',
      department: itDepartment,
    });

    await entityManager.save([pashak09Employee, pavelEmployee]);

    return {
      pashak09Employee,
      pavelEmployee,
    };
  }
}
