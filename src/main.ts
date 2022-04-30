import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global endpoint prefix
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
