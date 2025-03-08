import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomHttpExceptionFilter } from './common/customHttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomHttpExceptionFilter());
  // Enable CORS with specific frontend URL
  app.enableCors({
    origin: 'http://localhost:4200', // Replace this with your frontend URL
    methods: 'GET,POST,PUT,PATCH,DELETE', // Allowed methods
    credentials: true, // If you need to allow credentials like cookies
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
