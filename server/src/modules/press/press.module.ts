import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PressRelease, PressReleaseSchema } from '../../schemas/press-release.schema';
import { PressController } from './press.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: PressRelease.name, schema: PressReleaseSchema }])],
  controllers: [PressController],
})
export class PressModule {}
