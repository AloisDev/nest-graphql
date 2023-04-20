import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User, UserInput } from './user.model';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.findAll();

    return { users };
  }

  @ApiOperation({ summary: 'Finds user by ID' })
  @ApiOkResponse({ type: User })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @ApiOperation({ summary: 'creates new user' })
  @ApiCreatedResponse({ type: UserInput })
  @Post()
  async createUser(@Body() data: UserInput): Promise<User> {
    return await this.userService.createUser(data);
  }
}
