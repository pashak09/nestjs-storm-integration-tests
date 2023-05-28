import { Provider } from '@nestjs/common';
import { Env } from '@app/config/config/Env';
import { ConfigContainer } from '@app/config/config/ConfigContainer';

const createValidatedEnvProvider: Provider = {
  provide: Env,
  useFactory: (): Env => new Env(process.env),
};

const configContainerProvider: Provider = {
  provide: ConfigContainer,
  useFactory: (env: Env): ConfigContainer => new ConfigContainer(env),
  inject: [Env],
};

export const CONFIG_PROVIDERS: Provider[] = [
  configContainerProvider,
  createValidatedEnvProvider,
];
