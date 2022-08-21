import Matches from '../database/models/matches';
import Team from '../database/models/team';

export default class MatchesService {
  constructor(private model = Matches) {
    this.model = model;
  }

  public async getAll() {
    const result = await this.model.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ] });
    return result;
  }

  public async create(data: any) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = data;
    const result = await this.model.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    return result;
  }
}
