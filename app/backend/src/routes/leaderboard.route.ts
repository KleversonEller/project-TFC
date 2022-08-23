import * as express from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';
import 'express-async-errors';

const router = express.Router();

const controller = new LeaderBoardController();

router.get('/leaderboard/home', (req, res) => controller.table(req, res));

export default router;
