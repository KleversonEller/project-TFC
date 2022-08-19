import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';
import UserIn from '../interfaces/user.interface';

import { Response } from 'superagent';
import Token from '../middleware/auth/validToken';

chai.use(chaiHttp);

const { expect } = chai;

const userInfo = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

describe('Testando login de usuários', () => {
    it('Deve retornar status 200 ao fazer login', async () => {
        sinon.stub(LoginService.prototype, 'login').resolves('token');

        const response = await chai.request(app)
        .post('/login').send(userInfo);

        expect(response.status).to.equal(200);

        sinon.restore();
    })
});
