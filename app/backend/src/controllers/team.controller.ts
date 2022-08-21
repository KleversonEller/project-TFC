import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private service = new TeamService()) {
    this.service = service;
  }

  public async getAll(req: Request, res: Response) {
    const result = await this.service.getAll();
    return res.status(StatusCodes.OK).json(result);
  }
}
