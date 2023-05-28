import { INestApplication, Type } from '@nestjs/common';
import supertest from 'supertest';

export class TestingClient {
  private static app: INestApplication;

  private static request: supertest.SuperTest<supertest.Test>;

  static bootstrap(
    app: INestApplication,
    request: supertest.SuperTest<supertest.Test>,
  ): void {
    this.app = app;
    this.request = request;
  }

  static getService<TInput = unknown, TResult = TInput>(
    typeOrToken: Type<TInput> | string,
  ): TResult {
    return <TResult>this.app.get(typeOrToken);
  }

  static getGraphClient(): supertest.Test {
    return this.request.post('/graphql');
  }
}
