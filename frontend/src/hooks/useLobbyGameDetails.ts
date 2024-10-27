import { useParams } from "react-router-dom";
import axios from "axios";

import { useCallback, useEffect, useState } from "react";
import { LOBBYGAMES_URL } from "../../constants";
import { LobbyGame } from "../types/lobbyGamesTypes";

const useLobbyGameDetails = () => {
  const { matchid } = useParams();
  const [lobbyGame, setLobbyGames] = useState<LobbyGame>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(lobbyGame);
  console.log(error);

  const getLobbyGames = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${LOBBYGAMES_URL}/${matchid}`);
      console.log(res);
      setLobbyGames(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message);
      } else {
        setError(err.message || "Game data could not be fetched");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [matchid]);

  useEffect(() => {
    getLobbyGames();
  }, [getLobbyGames]);

  const radiantPlayers = lobbyGame?.playerInfo?.filter(
    (player) => player.gameTeam === 2
  );
  const direPlayers = lobbyGame?.playerInfo?.filter(
    (player) => player.gameTeam === 3
  );

  console.log(lobbyGame);
  console.log(radiantPlayers);

  return { lobbyGame, isLoading, error, radiantPlayers, direPlayers };
};

export default useLobbyGameDetails;
