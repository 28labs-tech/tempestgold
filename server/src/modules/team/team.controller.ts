import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember } from '../../schemas/team-member.schema';
import { JwtAuth } from '../../auth/jwt-auth.decorator';

@Controller('team')
export class TeamController {
  constructor(@InjectModel(TeamMember.name) private model: Model<TeamMember>) {}

  @Get()
  async findAll() {
    return this.model.find().exec();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.model.findById(id).exec();
  }

  @Post()
  @JwtAuth()
  async create(@Body() dto: Partial<TeamMember>) {
    return this.model.create(dto);
  }

  @Put(':id')
  @JwtAuth()
  async update(@Param('id') id: string, @Body() dto: Partial<TeamMember>) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  @Delete(':id')
  @JwtAuth()
  async remove(@Param('id') id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
