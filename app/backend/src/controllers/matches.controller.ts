import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private service = new MatchesService()) {
    this.service = service;
  }

  public async getAll(req: Request, res: Response) {
    const result = await this.service.getAll();
    return res.status(StatusCodes.OK).json(result);
  }

  public async create(req: Request, res: Response) {
    const result = await this.service.create(req.body);
    return res.status(StatusCodes.CREATED).json(result);
  }
}
