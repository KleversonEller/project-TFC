import Team from '../database/models/team';

export default class TeamService {
  constructor(private model = Team) {
    this.model = model;
  }

  public async getAll() {
    const result = await this.model.findAll();
    return result;
  }
}
