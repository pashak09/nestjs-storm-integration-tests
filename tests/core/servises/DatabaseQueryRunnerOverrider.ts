import { Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { DataSource } from 'typeorm/data-source/DataSource';

/**
 * @internal uses only for testing
 */
@Injectable()
export class DatabaseQueryRunnerOverrider {
  private readonly queryRunner: QueryRunner;

  constructor(dataSource: DataSource, entityManager: EntityManager) {
    const queryRunner = dataSource.createQueryRunner();

    //rewrite queryRunner. It's allows us to start and rollback transactions
    Object.defineProperty(entityManager, 'queryRunner', {
      value: queryRunner,
    });
    this.queryRunner = queryRunner;
  }

  getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }
}
