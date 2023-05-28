import { BaseStaticFixture, StaticFixture } from 'typeorm-data-fixtures';
import { EntityManager } from 'typeorm';
import { Department } from '@app/employee/entities/Department';
import { DepartmentType } from '@app/employee/enums/DepartmentType';

type ResultOfDepartmentFixture = {
  readonly itDepartment: Department;
  readonly supportDepartment: Department;
};

@StaticFixture()
export class DepartmentFixture extends BaseStaticFixture<ResultOfDepartmentFixture> {
  async install(
    entityManager: EntityManager,
  ): Promise<ResultOfDepartmentFixture> {
    const itDepartment = new Department({
      type: DepartmentType.IT,
    });
    const supportDepartment = new Department({
      type: DepartmentType.SUPPORT,
    });

    await entityManager.save([itDepartment, supportDepartment]);

    return {
      itDepartment,
      supportDepartment,
    };
  }
}
