import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/AppModule';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
})();
