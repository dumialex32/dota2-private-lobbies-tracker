export const parseMatchInfo = (rawData: string) => {
  const matchInfo: any = {};

  const matchIdMatch = rawData.match(/match_id:\s*(\d+)/);
  const gameModeMatch = rawData.match(/game_mode:\s*(\d+)/);
  const gameWinnerMatch = rawData.match(/game_winner:\s*(\d+)/);

  if (matchIdMatch) {
    matchInfo["match_id"] = matchIdMatch[1];
  }
  if (gameModeMatch) {
    matchInfo["game_mode"] = gameModeMatch[1];
  }
  if (gameWinnerMatch) {
    matchInfo["game_winner"] = gameWinnerMatch[1];
  }

  const playerInfoMatches = rawData.match(/player_info\s*{([^}]*)}/g);
  matchInfo["player_info"] = playerInfoMatches?.map((playerInfo) => {
    const player: any = {};
    const heroMatch = playerInfo.match(/hero_name:\s*"([^"]+)"/);
    const nameMatch = playerInfo.match(/player_name:\s*"([^"]+)"/);
    const steamIdMatch = playerInfo.match(/steamid:\s*(\d+)/);
    const teamMatch = playerInfo.match(/game_team:\s*(\d+)/);

    if (heroMatch) player["hero_name"] = heroMatch[1];
    if (nameMatch)
      player["player_name"] = nameMatch[1].replace(/\?/, "").trim(); // Remove '?' from player_name
    if (steamIdMatch) player["steamid"] = steamIdMatch[1];
    if (teamMatch) player["game_team"] = teamMatch[1];

    return player;
  });

  return matchInfo;
};

export const parseMatchEnd = (rawData: string) => {
  const matchEnd: any = {};
  const lines = rawData.split("\n").filter((line) => line.trim() !== "");

  // Initialize player stats array
  matchEnd["players"] = [];

  // Parse each player's stats
  for (const line of lines) {
    const match = line.match(
      /(.+?)\s+\?\s+(\d+)\s+\?\s+(\d+)\s+\?\s+(\d+)\s+\?\s+(\d+)\s+\?\s+(\d+)\s+\?\s+(\d+)\s+\?\s+(\d+)\s+\?\s+(\d+)/
    );
    if (match) {
      const playerStats = {
        player_name: match[1].replace(/\?/, "").trim(),
        level: parseInt(match[2]),
        kills: parseInt(match[3]),
        deaths: parseInt(match[4]),
        assists: parseInt(match[5]),
        gold: parseInt(match[6]),
        last_hits: parseInt(match[7]),
        denies: parseInt(match[8]) || 0, // Use 0 if denies is not present
        steamid: match[9],
      };
      matchEnd["players"].push(playerStats);
    }
  }

  return matchEnd;
};
