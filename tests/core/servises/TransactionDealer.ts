import { QueryRunner } from 'typeorm';

export class TransactionDealer {
  private static queryRunner: QueryRunner;

  static init(queryRunner: QueryRunner): void {
    this.queryRunner = queryRunner;
  }

  static async startTransaction(): Promise<void> {
    return this.queryRunner.startTransaction();
  }

  static async rollbackTransaction(): Promise<void> {
    return this.queryRunner.rollbackTransaction();
  }
}
