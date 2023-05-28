import { AppModule } from '@app/AppModule';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TestingClient } from '@tests/core/servises/TestingClient';
import { runUvu } from '@tests/core/uvuRunner';
import request from 'supertest';
import { overrideProvides } from '@tests/mocks';
import { DatabaseQueryRunnerOverrider } from '@tests/core/servises/DatabaseQueryRunnerOverrider';
import { TransactionDealer } from '@tests/core/servises/TransactionDealer';

const setupApplication = async (): Promise<INestApplication> => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
    providers: [DatabaseQueryRunnerOverrider],
  });

  overrideProvides(moduleRef);

  const app = (await moduleRef.compile()).createNestApplication();

  await app.init();
  app.useLogger(false);
  await app.listen(0);

  return app;
};

(async (): Promise<void> => {
  const startTime = new Date().getTime();
  const app = await setupApplication();

  console.log(
    '\x1b[33m',
    `Starting Nest application for ${
      (new Date().getTime() - startTime) / 1000
    } seconds`,
    '\x1b[0m',
  );

  console.log('\x1b[33m', 'Starting tests manually', '\x1b[0m');

  TestingClient.bootstrap(app, request(app.getHttpServer()));
  TransactionDealer.init(
    app.get(DatabaseQueryRunnerOverrider).getQueryRunner(),
  );

  const hasErrors = await runUvu();

  await app.close();

  process.exit(hasErrors === true ? 1 : 0);
})();
