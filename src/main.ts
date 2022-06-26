import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { json, urlencoded } from "express";
import { AppModule } from "./app.module";
import { CoreExceptionFilter } from "./common/error.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));

  setupGlobalValidation(app)
  setupSwagger(app)
  setupCors(app);
  await app.listen(8000);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Swagger APIs")
    .setDescription("The Swagger APIs description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.use("/api-docs", (_, res) => res.send(document))
  return document;
}

function setupCors(app: INestApplication) {
  app.enableCors();
}

function setupGlobalValidation(app: INestApplication) {
  app.useGlobalFilters(new CoreExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}

bootstrap();