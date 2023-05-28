import {
  Equals,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { ProcessEnv } from '@app/config/environment';

export class Env {
  @Equals('mysql')
  TYPEORM_CONNECTION: 'mysql';

  @IsString()
  @IsNotEmpty()
  TYPEORM_HOST: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  TYPEORM_PORT: number;

  @IsString()
  @IsNotEmpty()
  TYPEORM_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  TYPEORM_MIGRATIONS: string;

  @IsBoolean()
  TYPEORM_LOGGING: boolean;

  constructor(env: ProcessEnv) {
    this.TYPEORM_CONNECTION = <'mysql'>env.TYPEORM_CONNECTION;
    this.TYPEORM_HOST = env.TYPEORM_HOST || '';
    this.TYPEORM_PORT = env.TYPEORM_PORT ? parseInt(env.TYPEORM_PORT) : 3306;
    this.TYPEORM_USERNAME = env.TYPEORM_USERNAME || '';
    this.TYPEORM_PASSWORD = env.TYPEORM_PASSWORD || '';
    this.TYPEORM_DATABASE = env.TYPEORM_DATABASE || '';
    this.TYPEORM_MIGRATIONS = env.TYPEORM_MIGRATIONS || '';
    this.TYPEORM_LOGGING = env.TYPEORM_LOGGING === 'true' ? true : false;

    this.validate();
  }

  private validate(): void {
    const errors = validateSync(this, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  }
}
