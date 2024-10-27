import express from "express";
import { getLobbyGame, getLobbyGames } from "../controllers/gamesController";

const router = express.Router();

router.route("/").get(getLobbyGames);
router.route("/:matchid").get(getLobbyGame);

export default router;
