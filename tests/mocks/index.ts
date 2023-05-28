import { TestingModuleBuilder } from '@nestjs/testing/testing-module.builder';
import { OVERWRITED_SERVISES } from '@tests/mocks/services';

export const overrideProvides = (
  testingModuleBuilder: TestingModuleBuilder,
): void => {
  for (const overrideProvider of OVERWRITED_SERVISES) {
    testingModuleBuilder
      .overrideProvider(Object.getPrototypeOf(overrideProvider))
      .useClass(overrideProvider);
  }
};
