import { Provider } from '@nestjs/common';
import { DepartmentRepositoryService } from '@app/employee/repositories/DepartmentRepositoryService';
import { EmployeeRepositoryService } from '@app/employee/repositories/EmployeeRepositoryService';
import { EquipmentRepositoryService } from '@app/employee/repositories/EquipmentRepositoryService';

export const REPOSITORY_SERVICE_PROVIDERS: readonly Provider[] = [
  DepartmentRepositoryService,
  EmployeeRepositoryService,
  EquipmentRepositoryService,
];
