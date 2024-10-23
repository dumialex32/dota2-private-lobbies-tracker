import express from "express";
import { getLobbyGames } from "../controllers/gamesController";

const router = express.Router();

router.route("/").get(getLobbyGames);

export default router;
