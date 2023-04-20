import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.model';

@Table
@ObjectType()
export class Team extends Model<Team> {
  @Field(() => Int)
  id: number;

  @Field()
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => User, { foreignKey: 'teamId' })
  users: User[];
}

@InputType()
export class TeamInput {
  @Field({ nullable: false })
  name: string;
}
