import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CareerPosition, CareerPositionSchema } from '../../schemas/career-position.schema';
import { CareersController } from './careers.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: CareerPosition.name, schema: CareerPositionSchema }])],
  controllers: [CareersController],
})
export class CareersModule {}
