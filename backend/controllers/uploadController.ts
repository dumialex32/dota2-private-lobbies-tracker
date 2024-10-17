import { Request, Response } from "express";
import path from "path";
import { gradlewExecutable, runCommand } from "../utils/utils";
import fs from "fs";
import os from "os";
import { parseMatchEnd, parseMatchInfo } from "../utils/parseUtils";
import LobbyGame from "../models/lobbyGameModel";
import {
  ParsedRawMatchInfoData,
  PlayerInfo,
} from "../types/parsedRawDataTypes";
import { AppErrorHandler } from "../middleware/errorMiddleware";

export const uploadReplay = async (req: Request, res: Response) => {
  const replay: Express.Multer.File | undefined = req.file;

  if (!replay) {
    res.status(400).send("No replay uploaded");
    return;
  }

  // check for the replay

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
    res.status(404).send("Upload replay not found");
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

    // parse the returned raw data to JS object
    const parsedRawMatchInfoData: ParsedRawMatchInfoData =
      parseMatchInfo(rawMatchInfoData);
    const parsedRawMatchendData = await parseMatchEnd(rawMatchendData);

    // check for existing game in db
    console.log(parsedRawMatchInfoData.match_id);
    const existingGame = await LobbyGame.findOne({
      matchId: parsedRawMatchInfoData.match_id,
    });
    if (existingGame) {
      throw new AppErrorHandler(400, "This replay already exists in DB");
    }

    if (parsedRawMatchInfoData && parsedRawMatchendData) {
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
    }

    // del original uploaded replay
    fs.unlink(replayPath, (err) => {
      if (err) {
        console.error(
          `Failed to delete the replay from ${replayPath} - ${err?.message}`
        );
      } else {
        console.log("Replay successfully deleted");
      }
    });
    // del the temp copy of the uploaded replay
    fs.unlink(tempReplayPath, (err) => {
      if (err) {
        console.error(
          `Failed to delete the temp replay from ${tempReplayPath} - ${err.message}`
        );
      } else {
        console.log("Temp replay successfully deleted");
      }
    });

    console.log(`Replay processing successfully done`);
    res.json({ parsedRawMatchInfoData, parsedRawMatchendData });
  } catch (err) {
    console.error(err);
    if (err instanceof AppErrorHandler) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).send("Replay processing failed");
    }
  }
};
