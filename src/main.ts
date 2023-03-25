import 'reflect-metadata'; // Should be imported at the top to solve "Reflect.defineMetadata is not a function" error.
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

/* 
app.useGlobalPipes(new ValidationPipe());
This code sets up a global validation pipe for the entire application.
Whenever a request is received, this validation pipe will automatically validate the request body against the given validation rules defined using class-validator decorators.
If any validation rules are broken, the pipe will automatically throw a BadRequestException with detailed information about the validation failures.
*/
