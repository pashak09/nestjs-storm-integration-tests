import DatabaseConfig from '@app/config/config/DatabaseConfig';
import { Env } from '@app/config/config/Env';

export class ConfigContainer {
  readonly database: DatabaseConfig;

  constructor(env: Env) {
    this.database = new DatabaseConfig(env);
  }
}
