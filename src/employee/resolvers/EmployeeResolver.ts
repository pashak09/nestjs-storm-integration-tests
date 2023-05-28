import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { EmployeeCreator } from '../services/EmployeeCreator';
import { CreateEmployeeInputArgs } from '@app/employee/inputArgs/employee/CreateEmployeeInputArgs';
import { EmployeeModel } from '@app/employee/models/employee/EmployeeModel';
import { EmployeeRemover } from '@app/employee/services/EmployeeRemover';
import { MoveEmployeeToDepartmentInputArgs } from '@app/employee/inputArgs/employee/MoveEmployeeToDepartmentInputArgs';
import { EmployeeDepartmentTransfer } from '@app/employee/services/EmployeeDepartmentTransfer';
import { Type } from '@nestjs/common';
import { EmployeeRepositoryService } from '@app/employee/repositories/EmployeeRepositoryService';
import { EmployeeNotFoundException } from '@app/employee/exceptions/EmployeeNotFoundException';
import { IncreaseDepartmentEmployeesSalaryInputArgs } from '@app/employee/inputArgs/employee/IncreaseDepartmentEmployeesSalaryInputArgs';
import { DepartmentEmployeesSalaryIncreaser } from '@app/employee/services/DepartmentEmployeesSalaryIncreaser';
import { EmployeesBulkInsertInputArgs } from '@app/employee/inputArgs/employee/EmployeesBulkInsertInputArgs';
import { EmployeesBulkInserter } from '@app/employee/services/EmployeesBulkInserter';

@Resolver((): Type<EmployeeModel> => EmployeeModel)
export class EmployeeResolver {
  constructor(
    private readonly employeeCreator: EmployeeCreator,
    private readonly employeeRemover: EmployeeRemover,
    private readonly employeeDepartmentTransfer: EmployeeDepartmentTransfer,
    private readonly employeeRepositoryService: EmployeeRepositoryService,
    private readonly departmentEmployeesSalaryIncreaser: DepartmentEmployeesSalaryIncreaser,
    private readonly employeesBulkInserter: EmployeesBulkInserter,
  ) {}

  @Mutation((): ReturnTypeFuncValue => EmployeeModel)
  async createEmployee(
    @Args() createEmployeeModel: CreateEmployeeInputArgs,
  ): Promise<EmployeeModel> {
    return EmployeeModel.createFromEmployee(
      await this.employeeCreator.create(createEmployeeModel),
    );
  }

  /**
   * An example with save entities state in the different layers of application
   */
  @Mutation(() => EmployeeModel)
  async moveEmployeeToDepartment(
    @Args() args: MoveEmployeeToDepartmentInputArgs,
  ): Promise<EmployeeModel> {
    return EmployeeModel.createFromEmployee(
      await this.employeeDepartmentTransfer.transfer(args),
    );
  }

  /**
   * An example with native sql queries
   */
  @Mutation(() => Boolean)
  async bulkInsertEmployees(
    @Args('data', { type: () => [EmployeesBulkInsertInputArgs] })
    data: readonly EmployeesBulkInsertInputArgs[],
  ): Promise<boolean> {
    try {
      await this.employeesBulkInserter.invoke(data);

      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  /**
   * An example with transaction usage
   */
  @Mutation(() => Boolean)
  async increaseDepartmentEmployeesSalary(
    @Args()
    { departmentType, percentage }: IncreaseDepartmentEmployeesSalaryInputArgs,
  ): Promise<boolean> {
    try {
      await this.departmentEmployeesSalaryIncreaser.updateDepartmentSalary(
        departmentType,
        percentage,
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * An example with reading employee data
   */
  @Query((): ReturnTypeFuncValue => EmployeeModel, { nullable: true })
  async describeEmployee(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<EmployeeModel | null> {
    const employee = await this.employeeRepositoryService.findOneById(id);

    return employee !== null
      ? EmployeeModel.createFromEmployee(employee)
      : null;
  }

  /**
   * An example with removing record from database
   */
  @Mutation((): ReturnTypeFuncValue => Boolean)
  async removeEmployee(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    try {
      await this.employeeRemover.remove(id);
      return true;
    } catch (error) {
      if (error instanceof EmployeeNotFoundException) {
        return false;
      }

      throw error;
    }
  }
}
