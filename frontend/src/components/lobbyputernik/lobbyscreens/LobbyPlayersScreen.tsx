import { useEffect, useState } from "react";
import PlayerCard from "../../PlayerCard";
import axios from "axios";
import { LOBBYPLAYERS_URL } from "../../../../constants";
import { LobbyPlayer } from "../../../types/lobbyPlayersTypes";
import { useLobby } from "../../../hooks/useLobbyContext";
import PlayerCard2 from "../../PlayerCard";

const LobbyPlayersScreen: React.FC = () => {
  const [lobbyPlayers, setLobbyPlayers] = useState<LobbyPlayer[]>([]);
  const { refetchKey } = useLobby();

  const getLobbyPlayers = async () => {
    try {
      const res = await axios.get(LOBBYPLAYERS_URL);
      console.log(res);
      setLobbyPlayers(res.data);
    } catch (err: any) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data.message);
      } else {
        console.error(err.message || "Lobby players data fetch failed");
      }
    }
  };

  useEffect(() => {
    getLobbyPlayers();
  }, [refetchKey]);

  return (
    <div className="grid grid-cols-8 gap-3">
      {lobbyPlayers.map((player) => {
        return <PlayerCard key={player.steamId} player={player} />;
      })}
    </div>
  );
};

export default LobbyPlayersScreen;
