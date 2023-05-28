import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from '@app/employee/entities/Equipment';

@Injectable()
export class EquipmentRepositoryService {
  constructor(
    @InjectRepository(Equipment)
    private readonly repository: Repository<Equipment>,
  ) {}

  async findActiveOneByEmployeeId(id: number): Promise<Equipment | null> {
    return this.repository
      .createQueryBuilder('equipment')
      .andWhere('equipment.employeeId = :id')
      .andWhere('equipment.acceptedAt IS NULL')
      .setParameters({ id })
      .getOne();
  }
}
