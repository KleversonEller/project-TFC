import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import Token from '../middleware/auth/validToken';
import 'express-async-errors';

const router = express.Router();

const controller = new MatchesController();

router.get('/matches', (req, res) => controller.getAll(req, res));
router.post('/matches', Token.validToken, (req, res) => controller.create(req, res));
router.patch('/matches/:id/finish', (req, res) => controller.update(req, res));

export default router;
