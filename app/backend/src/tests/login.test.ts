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
import ErrorPersonal from '../middleware/personal.error';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

const userInfo = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const invalidUserInfo = {
  email: 'admin@admin.com',
}

const invalidUser = {
  email: 'admin@admin.com',
  password: '123456'
}

describe('Testando login de usuários', () => {
    it('Deve retornar status 200 ao fazer login', async () => {
        sinon.stub(LoginService.prototype, 'login').resolves('token');

        const response = await chai.request(app)
        .post('/login').send(userInfo);

        expect(response.status).to.equal(200);

        sinon.restore();
      })

    it('Deve retornar um erro ao fazer login passando um email ou senha invalido', async () => {
      sinon.stub(LoginService.prototype, 'login').callsFake(() => {
        throw new ErrorPersonal(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
      })
      const response = await chai.request(app)
        .post('/login').send(invalidUser);

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Incorrect email or password');

      sinon.restore();
    })

    it('Deve retornar um erro se nao passar um email ou senha', async () => {
      sinon.stub(LoginService.prototype, 'login').callsFake(() => {
        throw new ErrorPersonal(StatusCodes.BAD_REQUEST, 'All fields must be filled');
      })
      const response = await chai.request(app)
        .post('/login').send(invalidUserInfo);

      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('All fields must be filled');

      sinon.restore();
    })

    it('Deve retornar um erro ao passar um token invalido', async () => {
      sinon.stub(Token, 'validToken').callsFake(() => {
        throw new ErrorPersonal(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
      })
      const response = await chai.request(app)
        .get('/login/validate')

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Token must be a valid token');

      sinon.restore();
    })
});
