import { EntityManager } from 'typeorm';
import { Employee } from '@app/employee/entities/Employee';
import { EmployeesBulkInsertInputArgs } from '@app/employee/inputArgs/employee/EmployeesBulkInsertInputArgs';
import { Injectable } from '@nestjs/common';

const requiredFieldNames: Array<keyof EmployeesBulkInsertInputArgs> = [
  'firstname',
  'lastname',
  'email',
  'salary',
  'departmentId',
];

@Injectable()
export class EmployeesBulkInserter {
  constructor(private readonly entityManager: EntityManager) {}

  async invoke(
    employees: readonly EmployeesBulkInsertInputArgs[],
  ): Promise<void> {
    if (employees.length === 0) {
      return;
    }

    let counter: number = 0;
    const dataToInsert: unknown[] = new Array(
      employees.length * requiredFieldNames.length,
    );

    employees.forEach((args: EmployeesBulkInsertInputArgs) => {
      requiredFieldNames.forEach((fieldName) => {
        dataToInsert[counter] = args[fieldName];
        counter++;
      });
    });

    const preparedStatement = `(${'?,'
      .repeat(requiredFieldNames.length)
      .slice(0, -1)}),`;
    const tableName =
      this.entityManager.getRepository(Employee).metadata.tableName;

    await this.entityManager.query(
      `INSERT INTO ${tableName} (${requiredFieldNames.join(
        ', ',
      )}) VALUES ${preparedStatement.repeat(employees.length).slice(0, -1)}`,
      dataToInsert,
    );
  }
}
