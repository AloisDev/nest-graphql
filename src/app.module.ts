import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TeamModule } from './teams/team.module';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { Team } from './teams/team.model';
import { databaseProviders } from './database/database.providers';
import { LoggerModule } from 'nestjs-pino';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { databaseConfig } from './database/database.config';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'mysql',
        host: process.env.DB_HOST,//'mysql-10dfc5b-luis-ce04.aivencloud.com',
        port: Number(process.env.DB_PORT),//18486,
        username: process.env.DB_USER,//'avnadmin',
        password: process.env.DB_PASS,//'AVNS_6YOomwOYrVbi6RtNXYf',
        database: process.env.DB_NAME,//'defaultdb',
        autoLoadModels: true,
        synchronize: true,
       // timeout: 500000
      }),
    }),
    //ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(),
   // DatabaseModule,
    SequelizeModule.forFeature([User, Team]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    TeamModule,
  ],
})
export class AppModule {}
