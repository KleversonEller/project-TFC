import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import UserIn from '../../interfaces/user.interface';

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

  static validToken(token: string) {
    try {
      const data = jwt.verify(token, secret);
      return data;
    } catch (error) {
      throw new Error('Token invalid');
    }
  }
}
