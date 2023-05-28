import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_PROVIDERS } from '@app/config/providers/configProvider';

@Module({
  imports: [],
  providers: CONFIG_PROVIDERS,
  exports: CONFIG_PROVIDERS,
})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      global: true,
      providers: CONFIG_PROVIDERS,
      exports: CONFIG_PROVIDERS,
    };
  }
}
