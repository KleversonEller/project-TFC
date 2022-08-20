import { compareSync } from 'bcryptjs';
import * as Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import Token from '../middleware/auth/validToken';
import User from '../database/models/user';
import ErrorPersonal from '../middleware/personal.error';

export default class LoginService {
  constructor(private model = User) {
    this.model = model;
  }

  public async login(email: string, password: string) {
    LoginService.validUserInfo(email, password);

    const result = await this.model.findOne({ where: { email },
      raw: true });
    if (!result) {
      throw new ErrorPersonal(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const validPass = compareSync(password, result.password);
    if (!validPass) {
      throw new ErrorPersonal(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const token = Token.newToken(result);
    return token;
  }

  static validUserInfo(email: string, password: string) {
    const { error } = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }).validate({ email, password });

    if (error) {
      throw new ErrorPersonal(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    }
  }
}
