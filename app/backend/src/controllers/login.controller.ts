import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private serviceLogin = new LoginService()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.serviceLogin.login(email, password);
    return res.status(StatusCodes.OK).json({ token: result });
  }

  static validLogin(req: Request, res: Response) {
    const { user } = req.body;
    return res.status(StatusCodes.OK).json({ role: user.data.role });
  }
}
