import { Request, Response } from "express";
import Player from "../models/PlayerModel";

export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const players = await Player.find({});

    res.json(players);
  } catch (err) {
    console.error(err);
  }
};
