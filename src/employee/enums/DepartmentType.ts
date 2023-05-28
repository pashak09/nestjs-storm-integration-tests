import { registerEnumType } from '@nestjs/graphql';

export enum DepartmentType {
  IT = 'it',
  SUPPORT = 'support',
}

registerEnumType(DepartmentType, { name: 'DepartmentType' });
