import { Sequelize } from 'sequelize-typescript';
import { Team } from 'src/teams/team.model';
import { User } from 'src/users/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'admin',
        database: 'mydb',
      });
      sequelize.addModels([Team, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
