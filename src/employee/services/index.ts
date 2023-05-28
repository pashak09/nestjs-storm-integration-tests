import { Provider } from '@nestjs/common';
import { EmployeeRemover } from '@app/employee/services/EmployeeRemover';
import { EmployeeCreator } from '@app/employee/services/EmployeeCreator';
import { EmployeeDepartmentTransfer } from '@app/employee/services/EmployeeDepartmentTransfer';
import { DepartmentEmployeesSalaryIncreaser } from '@app/employee/services/DepartmentEmployeesSalaryIncreaser';
import { SalaryIncreaser } from '@app/employee/services/SalaryIncreaser';
import { EquipmentSurrender } from '@app/employee/services/EquipmentSurrender';
import { EmployeesBulkInserter } from '@app/employee/services/EmployeesBulkInserter';

export const SERVICE_PROVIDERS: readonly Provider[] = [
  EmployeeCreator,
  EmployeeRemover,
  EmployeeDepartmentTransfer,
  DepartmentEmployeesSalaryIncreaser,
  SalaryIncreaser,
  EquipmentSurrender,
  EmployeesBulkInserter,
];
