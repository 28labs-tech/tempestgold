import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResearchArticle } from '../../schemas/research-article.schema';
import { JwtAuth } from '../../auth/jwt-auth.decorator';

@Controller('research')
export class ResearchController {
  constructor(@InjectModel(ResearchArticle.name) private model: Model<ResearchArticle>) {}

  @Get()
  async findAll() {
    return this.model.find().sort({ createdAt: -1 }).exec();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.model.findById(id).exec();
  }

  @Post()
  @JwtAuth()
  async create(@Body() dto: Partial<ResearchArticle>) {
    return this.model.create(dto);
  }

  @Put(':id')
  @JwtAuth()
  async update(@Param('id') id: string, @Body() dto: Partial<ResearchArticle>) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  @Delete(':id')
  @JwtAuth()
  async remove(@Param('id') id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
