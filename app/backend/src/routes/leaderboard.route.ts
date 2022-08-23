import * as express from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';
import 'express-async-errors';

const router = express.Router();

const controller = new LeaderBoardController();

router.get('/leaderboard/home', (req, res) => controller.getHome(req, res));
router.get('/leaderboard/away', (req, res) => controller.getAway(req, res));
router.get('/leaderboard', (req, res) => controller.getAll(req, res));

export default router;
