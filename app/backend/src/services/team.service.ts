import Team from '../database/models/team';

export default class TeamService {
  constructor(private model = Team) {
    this.model = model;
  }

  public async getAll() {
    const result = await this.model.findAll();
    return result;
  }

  public async getTeamForId(id: string) {
    const result = await this.model.findByPk(id);
    return result;
  }
}
