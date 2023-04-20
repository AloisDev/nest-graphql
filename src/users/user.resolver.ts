import {
  Int,
  Args,
  Parent,
  Query,
  Mutation,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { User, UserInput } from './user.model';
import { UserService } from './user.service';
import { TeamService } from '../teams/team.service';
import { forwardRef, Inject } from '@nestjs/common';
import { Team } from '../teams/team.model';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => TeamService))
    private readonly teamService: TeamService,
  ) {}

  @Query(() => [User], { name: 'users', nullable: false })
  async getUsers() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') input: UserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @ResolveField('team', () => Team, { nullable: true })
  async getTeams(@Parent() user: User) {
    return user.team;
  }
}
