import Matches from '../database/models/matches';
import Team from '../database/models/team';

export default class MatchesService {
  constructor(private model = Matches) {
    this.model = model;
  }

  public async getAll() {
    const result = await this.model.findAll({ include: [
      { model: Team, as: 'teamHome' },
      { model: Team, as: 'teamAway' },
    ] });
    return result;
  }
}
