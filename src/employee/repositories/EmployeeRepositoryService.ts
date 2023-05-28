import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '@app/employee/entities/Employee';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeRepositoryService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  async getOneById(id: number): Promise<Employee> {
    return this.repository
      .createQueryBuilder('employee')
      .andWhere('employee.id = :id')
      .setParameters({ id })
      .getOneOrFail();
  }

  async findOneById(id: number): Promise<Employee | null> {
    return this.repository
      .createQueryBuilder('employee')
      .andWhere('employee.id = :id')
      .setParameters({ id })
      .getOne();
  }

  async findOneByEmail(email: string): Promise<Employee | null> {
    return this.repository
      .createQueryBuilder('employee')
      .andWhere('employee.email = :email')
      .setParameters({ email })
      .getOne();
  }

  async findManyByEmails(
    emails: readonly string[],
  ): Promise<readonly Employee[]> {
    return this.repository
      .createQueryBuilder('employee')
      .andWhere('employee.email IN (:...emails)')
      .setParameters({ emails })
      .getMany();
  }
}
