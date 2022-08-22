import { StatusCodes } from 'http-status-codes';
import ErrorPersonal from '../middleware/personal.error';
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
    if (homeTeam === awayTeam) {
      throw new ErrorPersonal(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }
    try {
      const result = await this.model.create(
        { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true },
      );
      return result;
    } catch (error) {
      throw new ErrorPersonal(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }
  }

  public async update(id: string) {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}
