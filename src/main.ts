import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

const port = process.env.PORT || 3010;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable http web security
  app.use(helmet());

  // enable cors
  app.enableCors();

  await app.listen(port);
  console.log("listing on port " + port);
}
bootstrap();
