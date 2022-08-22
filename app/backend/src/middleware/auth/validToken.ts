import 'dotenv/config';
import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import UserIn from '../../interfaces/user.interface';
import ErrorPersonal from '../personal.error';

const secret = process.env.JWT_SECRET || 'lulabolusco';

export default class Token {
  static newToken(data: Omit<UserIn, 'password'>): string {
    const config: jwt.SignOptions = {
      algorithm: 'HS256',
      expiresIn: '1d',
    };

    const token = jwt.sign({ data }, secret, config);
    return token;
  }

  static validToken(req: Request, _res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) { throw new ErrorPersonal(StatusCodes.BAD_REQUEST, 'Token notfound'); }

      const data = jwt.verify(token, secret);
      req.body.user = data;
      return next();
    } catch (error) {
      throw new ErrorPersonal(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
  }
}
