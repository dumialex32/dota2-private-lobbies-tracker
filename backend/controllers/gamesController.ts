import { NextFunction, Request, Response } from "express";
import LobbyGame from "../models/lobbyGameModel";

export const getLobbyGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const lobbyGames = await LobbyGame.find({})
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .lean();

    console.log(lobbyGames);
    res.json(lobbyGames);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
