import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import  helmet  from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe({whitelist:true , forbidNonWhitelisted : true} ))
  
   // apply helmet middleware for security
  app.use(helmet());

   // http://localhost:3000/swagger
  const swagger = new DocumentBuilder().setTitle('My App API').setDescription('My App API Description').addServer('http://localhost:3000').setVersion("1.0")
  .addSecurity('bearer' , { type : 'http' , scheme : 'bearer' })
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app , swagger)
  SwaggerModule.setup('swagger', app, document);

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
 