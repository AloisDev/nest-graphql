import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { Team } from '../teams/team.model';
import { DataTypes } from 'sequelize';

@Table
@ObjectType()
export class User extends Model<User> {
  @Field(() => Int)
  id: number;

  @Field()
  @Column({ type: DataTypes.STRING, allowNull: false })
  firstName: string;

  @Field()
  @Column({ type: DataTypes.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataTypes.INTEGER, allowNull: true })
  teamId?: number;

  @BelongsTo(() => Team, { foreignKey: { name: 'teamId' }, targetKey: 'id' })
  team: Team;
}

@InputType()
export class UserInput {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field(() => Int, { nullable: true })
  teamId?: number;
}
