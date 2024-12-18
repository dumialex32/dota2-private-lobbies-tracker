import { NextFunction, Request, Response } from "express";
import path from "path";
import {
  gradlewExecutable,
  removeTempStoredFile,
  runCommand,
} from "../utils/utils";
import fs from "fs";
import os from "os";
import { parseMatchEnd, parseMatchInfo } from "../utils/parseUtils";
import LobbyGame from "../models/lobbyGameModel";
import {
  ParsedRawMatchendData,
  ParsedRawMatchInfoData,
  PlayerInfo,
} from "../types/parsedRawDataTypes";
import { AppErrorHandler } from "../middleware/errorMiddleware";
import Player, { ExistingPlayerMap, PlayerSchema } from "../models/PlayerModel";
import { createUpdatePlayer } from "../utils/databaseUtils";
import { AnyBulkWriteOperation } from "mongoose";

export const uploadReplay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const replay: Express.Multer.File | undefined = req.file;

  if (!replay) {
    throw new Error("No replay uploaded");
  }

  // absolute path to the uploaded replay
  const replayPath: string = path.resolve(replay.path);
  // absolute path to gradlew.bat or gradlew
  const gradleWrapperPath: string = path.resolve(
    __dirname,
    "..",
    "parser",
    "clarity-examples",
    gradlewExecutable // determine os gradlew exec (win or linux)
  );
  // absolute path to dir containing gradlew and gradlew.bat scripts
  const workingDirPath: string = path.resolve(
    __dirname,
    "..",
    "parser",
    "clarity-examples"
  );

  // check if the uploaded replay exists in fs
  if (!fs.existsSync(replayPath)) {
    console.error(`Replay does not exist: ${replayPath}`);
    return;
  }

  // create temp dir to store the replay
  const tempDir = path.join(os.tmpdir(), "dota-pp");
  // check if temp exist, create if not
  fs.mkdirSync(tempDir, { recursive: true });
  // create the path for the temp replay
  const tempReplayPath = path.join(tempDir, path.basename(replayPath));
  // copy the uploaded replay into the temp dir
  fs.copyFileSync(replayPath, tempReplayPath);

  // create the script task commands
  const gradleMatchInfoTask = `"${gradleWrapperPath}" infoRun --args "${tempReplayPath}"`;
  const gradleMatchendTask = `"${gradleWrapperPath}" matchendRun --args "${tempReplayPath}"`;

  // run the exec with the task commands and the path to the dir where gradlew.bat and gradlew are located
  try {
    const rawMatchInfoData = await runCommand(
      gradleMatchInfoTask,
      workingDirPath
    );
    const rawMatchendData = await runCommand(
      gradleMatchendTask,
      workingDirPath
    );

    console.log("rawMatchInfoData");
    console.log(rawMatchInfoData);
    console.log("rawMatchendData");
    console.log(rawMatchendData);

    // del original uploaded replay
    removeTempStoredFile(replayPath, tempReplayPath);

    // parse the returned raw data to JS object
    const parsedRawMatchInfoData: ParsedRawMatchInfoData =
      parseMatchInfo(rawMatchInfoData);
    const parsedRawMatchendData: ParsedRawMatchendData = await parseMatchEnd(
      rawMatchendData
    );

    // check for existing game in db
    const existingGame = await LobbyGame.findOne({
      matchId: parsedRawMatchInfoData.match_id,
    });
    if (existingGame) {
      throw new AppErrorHandler(400, "This replay already exists in DB");
    }

    if (parsedRawMatchInfoData && parsedRawMatchendData) {
      console.log("parsedRawMatchInfoData:");
      console.log(parsedRawMatchInfoData);
      console.log("parsedRawMatchendData");
      console.log(parsedRawMatchendData);
      const newGame = new LobbyGame({
        matchId: parsedRawMatchInfoData.match_id,
        gameWinner: parsedRawMatchInfoData.game_winner, // 2 = radiant, 3 = dire
        playerInfo: parsedRawMatchInfoData.player_info.map(
          (info: PlayerInfo, i: number) => ({
            steamId: info.steamid,
            playerName: info.player_name,
            heroName: info.hero_name,
            gameTeam: info.game_team,
            kills: parsedRawMatchendData.players[i].kills,
            deaths: parsedRawMatchendData.players[i].deaths,
            assists: parsedRawMatchendData.players[i].assists,
            networth: parsedRawMatchendData.players[i].gold,
            lastHits: parsedRawMatchendData.players[i].last_hits,
            denies: parsedRawMatchendData.players[i].denies,
            level: parsedRawMatchendData.players[i].level,
          })
        ),
      });

      await newGame.save();

      // retrieve all existing players to minimize database calls
      const existingPlayers = await Player.find({
        steamId: {
          $in: parsedRawMatchInfoData.player_info.map((info) => info.steamid),
        },
      });

      const existingPlayerMap: ExistingPlayerMap = existingPlayers.reduce(
        (map: ExistingPlayerMap, player) => {
          map[player.steamId] = player;
          return map;
        },
        {} as ExistingPlayerMap
      );

      // create a bulk operation array for Player collection
      const bulkOps: AnyBulkWriteOperation<PlayerSchema>[] = [];

      // create bulk op to create/update players
      createUpdatePlayer(
        parsedRawMatchInfoData,
        parsedRawMatchendData,
        existingPlayerMap,
        bulkOps
      );
      // Execute the bulk operations
      if (bulkOps.length > 0) {
        await Player.bulkWrite(bulkOps);
        console.log("Bulk operations executed successfully");
      } else {
        console.log("No bulk operations to execute");
      }
    }

    // send resp with parsed data
    res.json({ parsedRawMatchInfoData, parsedRawMatchendData });
  } catch (err) {
    next(err);
  }
};
