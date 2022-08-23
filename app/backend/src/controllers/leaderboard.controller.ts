import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(private service = new LeaderBoardService()) {
    this.service = service;
  }

  public async table(req: Request, res: Response) {
    const result = await this.service.table();
    return res.status(StatusCodes.OK).json(result);
  }
}
