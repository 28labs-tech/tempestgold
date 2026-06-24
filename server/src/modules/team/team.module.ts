import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMember, TeamMemberSchema } from '../../schemas/team-member.schema';
import { TeamController } from './team.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: TeamMember.name, schema: TeamMemberSchema }])],
  controllers: [TeamController],
})
export class TeamModule {}
