import * as express from 'express';
import LoginController from '../controllers/login.controller';
import Token from '../middleware/auth/validToken';
import 'express-async-errors';

const router = express.Router();

const controller = new LoginController();

router.get('/login/validate', Token.validToken, (req, res) => LoginController.validLogin(req, res));
router.post('/login', (req, res) => controller.login(req, res));

export default router;
