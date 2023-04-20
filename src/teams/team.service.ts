import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Team, TeamInput } from './team.model';
import { UserService } from '../users/user.service';
import { User } from 'src/users/user.model';
import { TEAM_REPOSITORY } from 'src/core/constants';

@Injectable()
export class TeamService {
  constructor(
    @Inject(TEAM_REPOSITORY) private readonly teamRepository: typeof Team,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  findAll() {
    return this.teamRepository.findAll({
      include: { model: User },
    });
  }

  findById(id: number) {
    return this.teamRepository.findOne({
      where: { id },
      include: { model: User },
    });
  }

  findByIds(ids: number[]) {
    return this.teamRepository.findAll({
      where: { id: ids },
      include: { model: User },
    });
  }

  createTeam(data: TeamInput) {
    const team = this.teamRepository.create(data);
    return team;
  }

  async addMember(teamId: number, userId: number) {
    try {
      const team = await this.findById(teamId);
      const user = await this.userService.findById(userId);

      if (team) {
        team.users.push(user);
      }
      return team;
    } catch (e) {
      throw e;
    }
  }

  //   async removeMember(teamId: number, userId: number) {
  //     const team = await this.findById(teamId);
  //     const members = await team.members;

  //     const index = members.findIndex(member => member.id === userId);

  //     if (index >= 0) {
  //       members.splice(index, 1);
  //       await this.teamRepository.save(team);
  //     }

  //     return team;
  //   }
}
