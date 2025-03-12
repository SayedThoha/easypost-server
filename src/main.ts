import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomHttpExceptionFilter } from './common/customHttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomHttpExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
