import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from '../../schemas/blog-post.schema';
import { JwtAuth } from '../../auth/jwt-auth.decorator';

@Controller('blog')
export class BlogController {
  constructor(@InjectModel(BlogPost.name) private model: Model<BlogPost>) {}

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
  async create(@Body() dto: Partial<BlogPost>) {
    return this.model.create(dto);
  }

  @Put(':id')
  @JwtAuth()
  async update(@Param('id') id: string, @Body() dto: Partial<BlogPost>) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  @Delete(':id')
  @JwtAuth()
  async remove(@Param('id') id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
