import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private serviceLogin = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.serviceLogin.login(email, password);
    return res.status(StatusCodes.OK).json({ token: result });
  };
}