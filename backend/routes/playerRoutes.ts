import express from "express";
import { getAllPlayers } from "../controllers/PlayersController";

const router = express.Router();

router.route("/").get(getAllPlayers);

export default router;
