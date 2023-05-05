import { Sequelize } from 'sequelize-typescript';
import { Team } from 'src/teams/team.model';
import { User } from 'src/users/user.model';
import { databaseConfig } from './database.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE } from '../core/constants'
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Team, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];