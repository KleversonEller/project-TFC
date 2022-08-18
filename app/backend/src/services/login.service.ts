import { compareSync } from 'bcryptjs';
import Token from '../middleware/auth/validToken';
import User from '../database/models/user';

export default class LoginService {
  constructor(private model = User) {
    this.model = model;
  }

  public async login(email: string, password: string) {
    const result = await this.model.findOne({ where: { email },
      raw: true });
    if (!result) { throw new Error('Password or Email invalid'); }

    const validPass = compareSync(password, result.password);
    if (!validPass) { throw new Error('Password or Email invalid'); }

    const token = Token.newToken(result);
    return token;
  }
}
