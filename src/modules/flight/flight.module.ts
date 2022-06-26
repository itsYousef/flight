import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

@Module({
  providers: [
    FlightService
  ],
  exports: [],
  imports: [
    MongoModule
  ],
  controllers: [FlightController]
})
export class FlightModule { }
