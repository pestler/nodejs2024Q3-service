import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 4000;
  const document: OpenAPIObject = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    const appMsg = `Application is running at: http://localhost:${PORT}`;
    const docsMsg = `Home Library Service: You can find documentation at the: http://localhost:${PORT}/api`;

    console.log(appMsg);
    console.log(docsMsg);
  });
}

bootstrap();
