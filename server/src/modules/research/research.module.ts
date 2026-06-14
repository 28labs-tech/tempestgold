import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchArticle, ResearchArticleSchema } from '../../schemas/research-article.schema';
import { ResearchController } from './research.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ResearchArticle.name, schema: ResearchArticleSchema }])],
  controllers: [ResearchController],
})
export class ResearchModule {}
