import { EntitySchema, MixedList, DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Env } from '@app/config/config/Env';
import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';
import { ENTITIES } from '@app/employee/entities';

export default class DatabaseConfig implements MysqlConnectionOptions {
  readonly type: 'mysql';

  readonly replication: {
    readonly master: MysqlConnectionCredentialsOptions;
    readonly slaves: MysqlConnectionCredentialsOptions[];
  };
  readonly entitySkipConstructor: boolean;

  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly entities: MixedList<Function | string | EntitySchema>;

  readonly migrations?: never;

  readonly migrationsInternal: string[];

  readonly synchronize: boolean;

  readonly logging: boolean;

  readonly connectorPackage: 'mysql2';

  readonly bigNumberStrings: boolean;

  readonly multipleStatements: boolean;

  constructor(env: Env, multipleStatements: boolean = false) {
    this.type = env.TYPEORM_CONNECTION;

    this.replication = {
      master: {
        host: env.TYPEORM_HOST,
        port: env.TYPEORM_PORT,
        username: env.TYPEORM_USERNAME,
        password: env.TYPEORM_PASSWORD,
        database: env.TYPEORM_DATABASE,
      },
      slaves: [
        {
          host: env.TYPEORM_HOST,
          port: env.TYPEORM_PORT,
          username: env.TYPEORM_USERNAME,
          password: env.TYPEORM_PASSWORD,
          database: env.TYPEORM_DATABASE,
        },
      ],
    };

    this.multipleStatements = multipleStatements;
    this.entitySkipConstructor = true;
    this.entities = ENTITIES;
    this.migrationsInternal = [env.TYPEORM_MIGRATIONS];
    this.connectorPackage = 'mysql2';
    this.synchronize = false;
    this.logging = env.TYPEORM_LOGGING;
    this.bigNumberStrings = false;
  }

  getDataSource(): DataSource {
    return new DataSource({
      type: this.type,
      entities: this.entities,
      replication: this.replication,
      migrations: this.migrationsInternal,
      entitySkipConstructor: this.entitySkipConstructor,
      synchronize: this.synchronize,
      logging: this.logging,
      bigNumberStrings: this.bigNumberStrings,
      connectorPackage: this.connectorPackage,
      multipleStatements: this.multipleStatements,
    });
  }
}
