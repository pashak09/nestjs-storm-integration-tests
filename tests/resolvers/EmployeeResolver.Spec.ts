import { TestingClient } from '@tests/core/servises/TestingClient';
import { equal } from 'uvu/assert';
import { EmployeeRepositoryService } from '@app/employee/repositories/EmployeeRepositoryService';
import {
  createEmployeeMutation,
  CreateEmployeeMutationArgs,
} from '@tests/resolvers/queries/createEmployeeMutation';
import { describeEmployeeQuery } from '@tests/resolvers/queries/describeEmployeeQuery';
import { removeEmployeeMutation } from '@tests/resolvers/queries/removeEmployeeMutation';
import { appSuite } from '@tests/appSuite';
import { DepartmentType } from '@app/employee/enums/DepartmentType';
import { SalaryIncreaser } from '@app/employee/services/SalaryIncreaser';
import { DepartmentRepositoryService } from '@app/employee/repositories/DepartmentRepositoryService';
import { Employee } from '@app/employee/entities/Employee';
import { increaseDepartmentEmployeesSalaryMutation } from '@tests/resolvers/queries/increaseDepartmentEmployeesSalaryMutation';
import { moveEmployeeToDepartment } from '@tests/resolvers/queries/moveEmployeeToDapartmentMutation';
import { EquipmentRepositoryService } from '@app/employee/repositories/EquipmentRepositoryService';
import { EmployeesBulkInsertInputArgs } from '@app/employee/inputArgs/employee/EmployeesBulkInsertInputArgs';
import { bulkInsertEmployeesMutation } from '@tests/resolvers/queries/bulkInsertEmployeesMutation';

const describe = appSuite('EmployeeResolver');

describe('should add a new employee', async (): Promise<void> => {
  const userData: CreateEmployeeMutationArgs = {
    firstname: 'pavel',
    lastname: 'pavel',
    email: 'test@example.com',
    departmentType: 'IT',
  };

  const response = await TestingClient.getGraphClient().send(
    createEmployeeMutation(userData),
  );

  equal(response.body.data.createEmployee, userData);

  const addedEmployee = await TestingClient.getService(
    EmployeeRepositoryService,
  ).findOneByEmail('test@example.com');

  equal(addedEmployee !== null, true);
  equal(
    {
      firstname: addedEmployee?.getFirstName(),
      lastname: addedEmployee?.getLastName(),
      email: addedEmployee?.getEmail(),
      departmentType: (await addedEmployee?.department)?.getType() || null,
    },
    { ...userData, departmentType: DepartmentType.IT },
  );
});

describe('should return an existing employee', async (): Promise<void> => {
  const existingEmployee = await TestingClient.getService(
    EmployeeRepositoryService,
  ).getOneById(1);

  const userData = {
    firstname: existingEmployee.getFirstName(),
    lastname: existingEmployee.getLastName(),
    email: existingEmployee.getEmail(),
  };

  const response = await TestingClient.getGraphClient().send(
    describeEmployeeQuery(1),
  );

  equal(response.body.data.describeEmployee, userData);
});

describe('should return null for a not existing employee', async (): Promise<void> => {
  const response = await TestingClient.getGraphClient().send(
    describeEmployeeQuery(99999),
  );

  equal(response.body.data.describeEmployee, null);
});

describe('should rerun "true" for deleting an existing employee', async (): Promise<void> => {
  const response = await TestingClient.getGraphClient().send(
    removeEmployeeMutation(1),
  );

  equal(response.body.data.removeEmployee, true);
  equal(
    await TestingClient.getService(EmployeeRepositoryService).findOneById(1),
    null,
  );
});

describe('should update existing employee fields', async (): Promise<void> => {
  const response = await TestingClient.getGraphClient().send(
    removeEmployeeMutation(1),
  );

  equal(response.body.data.removeEmployee, true);
  equal(
    await TestingClient.getService(EmployeeRepositoryService).findOneById(1),
    null,
  );
});

describe('should rerun "false" for deleting an non existing employee', async (): Promise<void> => {
  const response = await TestingClient.getGraphClient().send(
    removeEmployeeMutation(9999),
  );

  equal(response.body.data.removeEmployee, false);
});

describe('should update salary for each department employee', async (): Promise<void> => {
  type UpdateSalaryCaseData = {
    readonly id: number;
    readonly fistname: string;
    readonly salary: string;
  };

  const salaryIncreaser = TestingClient.getService(SalaryIncreaser);
  const percentage = 10;

  const department = await TestingClient.getService(
    DepartmentRepositoryService,
  ).getByType(DepartmentType.IT);

  const expects = (await department.employees).map(
    (employee: Employee): UpdateSalaryCaseData => ({
      id: employee.getId(),
      fistname: employee.getFirstName(),
      salary: salaryIncreaser.increase({
        value: employee.getSalary(),
        percentage,
      }),
    }),
  );

  const response = await TestingClient.getGraphClient().send(
    increaseDepartmentEmployeesSalaryMutation({
      departmentType: 'IT',
      percentage,
    }),
  );

  equal(response.body.data.increaseDepartmentEmployeesSalary, true);

  const employees = await (
    await TestingClient.getService(DepartmentRepositoryService).getByType(
      DepartmentType.IT,
    )
  ).employees;

  equal(
    employees.map(
      (employee: Employee): UpdateSalaryCaseData => ({
        id: employee.getId(),
        fistname: employee.getFirstName(),
        salary: employee.getSalary(),
      }),
    ),
    expects,
  );
});

describe('should move an employee to a new department', async (): Promise<void> => {
  const operationData = {
    employeeId: 2,
    departmentId: 2,
  };

  const response = await TestingClient.getGraphClient().send(
    moveEmployeeToDepartment(operationData),
  );

  equal(response.body.data.moveEmployeeToDepartment, {
    departmentId: operationData.departmentId,
    id: operationData.employeeId,
  });

  const employee = await TestingClient.getService(
    EmployeeRepositoryService,
  ).getOneById(operationData.employeeId);

  equal((await employee.department).getId(), operationData.departmentId);

  const equipment = await TestingClient.getService(
    EquipmentRepositoryService,
  ).findActiveOneByEmployeeId(employee.getId());

  equal(equipment === null, true);
});

describe('should bulk insert employees', async (): Promise<void> => {
  const operationData: readonly EmployeesBulkInsertInputArgs[] = [
    {
      firstname: 'test',
      lastname: 'test',
      email: 'test@github.com',
      salary: '100.0000',
      departmentId: 1,
    },
    {
      firstname: 'test1',
      lastname: 'test1',
      email: 'test1@github.com',
      salary: '500.0000',
      departmentId: 1,
    },
    {
      firstname: 'test2',
      lastname: 'test2',
      email: 'test2@github.com',
      salary: '300.0000',
      departmentId: 1,
    },
    {
      firstname: 'hey',
      lastname: 'bb',
      email: 'test3@github.com',
      salary: '500.0000',
      departmentId: 2,
    },
  ];

  const response = await TestingClient.getGraphClient().send(
    bulkInsertEmployeesMutation({ data: operationData }),
  );

  equal(response.body.data.bulkInsertEmployees, true);

  const employees = await TestingClient.getService(
    EmployeeRepositoryService,
  ).findManyByEmails(
    operationData.map(
      (inputData: EmployeesBulkInsertInputArgs) => inputData.email,
    ),
  );

  equal(employees.length, operationData.length);

  const createdEmployeesData = employees.map((employee: Employee) => ({
    firstname: employee.getFirstName(),
    lastname: employee.getLastName(),
    email: employee.getEmail(),
    salary: employee.getSalary(),
    departmentId: employee.getDepartmentId(),
  }));

  equal(operationData, createdEmployeesData);
});

describe.run();
