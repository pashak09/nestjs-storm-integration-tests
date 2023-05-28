import { join } from 'path';

import { CommandUtils } from 'typeorm/commands/CommandUtils';
import { FixtureContainer } from 'typeorm-data-fixtures';

(async (): Promise<void> => {
  const dataSource = await CommandUtils.loadDataSource(
    __dirname + '/../../ormconfig.ts',
  );

  console.log('\x1b[33m', 'Start loading fixtures', '\x1b[0m');

  try {
    const fixtureContainer = new FixtureContainer({
      filePatterns: [join(__dirname, '/fixtures/**/*.ts')],
      dataSource: await dataSource.initialize(),
    });

    await fixtureContainer.loadFiles();
    await fixtureContainer.installFixtures();
  } catch (err) {
    throw err;
  } finally {
    await dataSource.destroy();
  }

  console.log('\x1b[42m', 'Done', '\x1b[0m');

  process.exit(0);
})();
