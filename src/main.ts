import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger= new Logger('Bootstrap');

  app.setGlobalPrefix('api');
  
  const allowedOrigins = process.env.CORS_ORIGINS?.split(',');

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (Postman, mobile, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins?.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'), false);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen(process.env.PORT || 3000);
  logger.log(`App running on port: ${ process.env.PORT || 3000 }`);
  
}
bootstrap();
