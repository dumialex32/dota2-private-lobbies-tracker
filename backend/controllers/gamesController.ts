import { NextFunction, Request, Response } from "express";
import LobbyGame from "../models/lobbyGameModel";
import { AppErrorHandler } from "../middleware/errorMiddleware";

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

export const getLobbyGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { matchid } = req.params;
  console.log(matchid);
  try {
    if (!matchid) {
      throw new AppErrorHandler(500, "Matchid not provided");
    }

    const game = await LobbyGame.findOne({ matchId: matchid }).lean();

    if (!game) {
      throw new AppErrorHandler(
        404,
        `Game with matchid "${matchid}" has not been found`
      );
    }

    console.log(game);

    res.json(game);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
