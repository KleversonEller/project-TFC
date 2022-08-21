import * as express from 'express';
import TeamController from '../controllers/team.controller';
import 'express-async-errors';

const router = express.Router();

const controller = new TeamController();

router.get('/teams', (req, res) => controller.getAll(req, res));

export default router;
