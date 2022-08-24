import Matches from '../database/models/matches';
import Team from '../database/models/team';
import Calculator from '../utils/calc.leaderboard';
import TeamIn from '../interfaces/team.interface';

export default class LeaderBoardService {
  constructor(private model = Team) {
    this.model = model;
  }

  public async table(location: string) {
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
    const table = Calculator.calcOrder(result as unknown as TeamIn[], location);
    return table;
  }
}
