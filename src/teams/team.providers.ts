import { TEAM_REPOSITORY } from '../core/constants';
import { Team } from './team.model';

export const teamProviders = [
  {
    provide: TEAM_REPOSITORY,
    useValue: Team,
  },
];
