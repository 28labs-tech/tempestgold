import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: { mongoUri: string }) => ({
        uri: config.mongoUri,
      }),
      inject: ['ENV_CONFIG'],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule implements OnModuleInit {
  constructor(@Inject('ENV_CONFIG') private config: { mongoUri: string }) {}

  onModuleInit() {
    console.log('MongoDB connected to:', this.config.mongoUri);
  }
}
