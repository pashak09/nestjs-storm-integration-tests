import { Module } from '@nestjs/common';
import { EmployeeResolver } from './resolvers/EmployeeResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepositoryService } from '@app/employee/repositories/EmployeeRepositoryService';
import { SERVICE_PROVIDERS } from '@app/employee/services';
import { REPOSITORY_SERVICE_PROVIDERS } from '@app/employee/repositories';
import { ENTITIES } from '@app/employee/entities';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [
    EmployeeResolver,
    EmployeeRepositoryService,
    ...SERVICE_PROVIDERS,
    ...REPOSITORY_SERVICE_PROVIDERS,
  ],
})
export class EmployeeModule {}
