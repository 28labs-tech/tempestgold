import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'ENV_CONFIG',
      useFactory: () => ({
        mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/tempestgold',
        jwtSecret: process.env.JWT_SECRET || 'tempest-gold-jwt-secret-change-me',
        adminEmail: process.env.ADMIN_EMAIL || 'admin@tempestgold.com',
        adminPassword: process.env.ADMIN_PASSWORD || 'TempestAdmin2026!',
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
        cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
        cloudinaryFolder: process.env.CLOUDINARY_FOLDER || 'tempestgold',
      }),
    },
  ],
  exports: ['ENV_CONFIG'],
})
export class ConfigModule {}
