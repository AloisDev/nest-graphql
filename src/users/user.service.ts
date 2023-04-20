import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Team } from 'src/teams/team.model';
import { TeamService } from '../teams/team.service';
import { User, UserInput } from './user.model';
import { USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(forwardRef(() => TeamService))
    private readonly teamService: TeamService,
  ) {}

  findAll() {
    return this.userRepository.findAll({
      include: { model: Team },
    });
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      include: { model: Team },
    });
  }

  async createUser(data: UserInput) {
    try {
      const result = await this.checkExistence(data);
      if (result) {
        const teamUser = await this.userRepository.create(data);
        await this.teamService.addMember(data.teamId, teamUser.id);
        teamUser.team = result;
        return teamUser;
      } else {
        data.teamId = null;
        const noTeamUser = await this.userRepository.create(data);
        return noTeamUser;
      }
    } catch (e) {
      throw e;
    }
  }

  findByIds(ids: number[]) {
    return this.userRepository.findAll({
      where: { id: ids },
      include: { model: Team },
    });
  }

  private async checkExistence(data: UserInput): Promise<Team> {
    if (data.teamId) {
      const existentTeam = await this.teamService.findById(data.teamId);
      if (existentTeam) {
        return existentTeam;
      }
    }
  }
}
