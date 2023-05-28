import { EquipmentRepositoryService } from '@app/employee/repositories/EquipmentRepositoryService';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EquipmentSurrender {
  constructor(
    private readonly equipmentRepositoryService: EquipmentRepositoryService,
    private readonly entityManager: EntityManager,
  ) {}

  async invoke(employeeId: number): Promise<void> {
    const equipment =
      await this.equipmentRepositoryService.findActiveOneByEmployeeId(
        employeeId,
      );

    if (equipment === null) {
      return;
    }

    equipment.setAcceptedAt(new Date());

    await this.entityManager.save(equipment);
  }
}
