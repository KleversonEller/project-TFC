import * as express from 'express';
import LoginController from '../controllers/login.controller';

const router = express.Router();

const controller = new LoginController();

router.post('/login', (req, res) => controller.login(req, res));

export default router;
