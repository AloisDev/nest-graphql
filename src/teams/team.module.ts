import { forwardRef, Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Team } from './team.model';
import { TeamResolver } from './team.resolver';
import { UserModule } from '../users/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { teamProviders } from './team.providers';
import { UserService } from 'src/users/user.service';
import { usersProviders } from 'src/users/user.providers';

@Module({
  imports: [SequelizeModule.forFeature([Team]), forwardRef(() => UserModule)],
  providers: [
    TeamService,
    TeamResolver,
    ...teamProviders,
    ...usersProviders,
    UserService,
  ],
  exports: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
