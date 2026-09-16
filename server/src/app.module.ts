import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { PropertiesModule } from "./modules/properties/properties.module";
import { ResearchModule } from "./modules/research/research.module";
import { BlogModule } from "./modules/blog/blog.module";
import { MarketModule } from "./modules/market/market.module";
import { TeamModule } from "./modules/team/team.module";
import { CareersModule } from "./modules/careers/careers.module";
import { PressModule } from "./modules/press/press.module";
import { UploadModule } from "./modules/upload/upload.module";
import { EnquiriesModule } from "./modules/enquiries/enquiries.module";

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    PropertiesModule,
    ResearchModule,
    BlogModule,
    MarketModule,
    TeamModule,
    CareersModule,
    PressModule,
    UploadModule,
    EnquiriesModule,
  ],
})
export class AppModule {}
