import { CommandUtils } from 'typeorm/commands/CommandUtils';

(async (): Promise<void> => {
  if (process.env.TYPEORM_DATABASE !== 'test') {
    console.log('Only `test` database is allowed for this operation');
    process.exit(1);
  }

  const dataSource = await CommandUtils.loadDataSource(
    __dirname + '/../../ormconfig.ts',
  );

  await dataSource.initialize();

  console.log('\x1b[33m', 'Drop old database', '\x1b[0m');

  await dataSource.query(
    `DROP DATABASE IF EXISTS ${process.env.TYPEORM_DATABASE}`,
  );
  console.log('\x1b[33m', 'Create a new one', '\x1b[0m');

  await dataSource.query(`CREATE DATABASE ${process.env.TYPEORM_DATABASE}`);
  await dataSource.destroy();
})();
