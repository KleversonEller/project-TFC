import Matches from '../database/models/matches';
import Team from '../database/models/team';
import MatchesIn from '../interfaces/matches.interface';

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

  public async create(data: MatchesIn) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = data;
    const result = await this.model.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    return result;
  }

  public async update(id: string) {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}
