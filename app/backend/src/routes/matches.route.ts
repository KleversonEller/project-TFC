import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import 'express-async-errors';

const router = express.Router();

const controller = new MatchesController();

router.get('/matches', (req, res) => controller.getAll(req, res));
router.post('/matches', (req, res) => controller.create(req, res));

export default router;
