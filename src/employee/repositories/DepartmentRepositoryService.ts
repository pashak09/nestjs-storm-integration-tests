import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '@app/employee/entities/Department';
import { DepartmentType } from '@app/employee/enums/DepartmentType';

@Injectable()
export class DepartmentRepositoryService {
  constructor(
    @InjectRepository(Department)
    private readonly repository: Repository<Department>,
  ) {}

  async getOneById(id: number): Promise<Department> {
    return this.repository
      .createQueryBuilder('department')
      .andWhere('department.id = :id')
      .setParameters({ id })
      .getOneOrFail();
  }

  async getByType(type: DepartmentType): Promise<Department> {
    return this.repository
      .createQueryBuilder('department')
      .andWhere('department.type = :type')
      .setParameters({ type })
      .getOneOrFail();
  }
}
