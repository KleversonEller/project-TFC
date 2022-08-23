// import { StatusCodes } from 'http-status-codes';
// import ErrorPersonal from '../middleware/personal.error';
import Matches from '../database/models/matches';
import Team from '../database/models/team';
import Calculator from '../utils/calc.leaderboard';

export default class LeaderBoardService {
  constructor(private model = Team) {
    this.model = model;
  }

  public async table() {
    const result = await this.model.findAll(
      {
        attributes: ['teamName'],
        include: [
          { model: Matches,
            as: 'homeTeam',
            where: { inProgress: false },
            attributes: ['homeTeamGoals', 'awayTeamGoals'] },
          { model: Matches,
            as: 'awayTeam',
            where: { inProgress: false },
            attributes: ['homeTeamGoals', 'awayTeamGoals'] }],
      },
    );
    const table = Calculator.calcOrder(result, 'home');
    return table;
  }
}
