import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1685201453918 implements MigrationInterface {
  name = 'Init1685201453918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('it', 'support') NOT NULL, UNIQUE INDEX \`unq_type\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`salary\` decimal(13,4) NOT NULL, \`departmentId\` int NOT NULL, UNIQUE INDEX \`unq_employee_email\` (\`email\`), UNIQUE INDEX \`unq_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`equipment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`issuedAt\` datetime(3) NOT NULL, \`acceptedAt\` datetime(3) NULL, \`employeeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_employee_department\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`equipment\` ADD CONSTRAINT \`FK_employee\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`equipment\` DROP FOREIGN KEY \`FK_employee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_employee_department\``,
    );
    await queryRunner.query(`DROP TABLE \`equipment\``);
    await queryRunner.query(`DROP INDEX \`unq_email\` ON \`employee\``);
    await queryRunner.query(
      `DROP INDEX \`unq_employee_email\` ON \`employee\``,
    );
    await queryRunner.query(`DROP TABLE \`employee\``);
    await queryRunner.query(`DROP INDEX \`unq_type\` ON \`department\``);
    await queryRunner.query(`DROP TABLE \`department\``);
  }
}
