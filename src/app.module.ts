import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { config as configDotenv } from "dotenv";
import { FlightModule } from "./modules/flight/flight.module";
import { MongoModule } from './modules/mongo/mongo.module';

configDotenv({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env",
})

@Module({
  imports: [
    FlightModule,
    MongoModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION),
  ]
})
export class AppModule { }
