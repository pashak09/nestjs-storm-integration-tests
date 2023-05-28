import { BaseStaticFixture, StaticFixture } from 'typeorm-data-fixtures';
import { EntityManager } from 'typeorm';
import { EmployeeFixture } from '@tests/core/fixtures/EmployeeFixture';
import { Equipment } from '@app/employee/entities/Equipment';

type ResultOfEquipmentFixture = {
  readonly pavelEquipment: Equipment;
};

@StaticFixture({ dependencies: [EmployeeFixture] })
export class EquipmentFixture extends BaseStaticFixture<ResultOfEquipmentFixture> {
  async install(
    entityManager: EntityManager,
  ): Promise<ResultOfEquipmentFixture> {
    const { pavelEmployee } = this.fixtureResultOf(EmployeeFixture);

    const pavelEquipment = new Equipment({
      employee: pavelEmployee,
      name: 'Test',
    });
    await entityManager.save([pavelEquipment]);

    return {
      pavelEquipment,
    };
  }
}
