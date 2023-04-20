import { forwardRef, Module } from '@nestjs/common';

import { User } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { TeamModule } from '../teams/team.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { usersProviders } from './user.providers';
import { TeamService } from 'src/teams/team.service';
import { teamProviders } from 'src/teams/team.providers';

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => TeamModule)],
  providers: [
    UserService,
    UserResolver,
    ...teamProviders,
    ...usersProviders,
    TeamService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
