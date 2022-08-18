import * as express from 'express';
import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';

const router = express.Router();

const service = new LoginService();
const controller = new LoginController(service);

router.post('/login', (req, res) => controller.login(req, res));

export default router;
