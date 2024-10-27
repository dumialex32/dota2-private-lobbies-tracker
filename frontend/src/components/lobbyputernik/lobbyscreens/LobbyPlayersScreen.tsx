import { useEffect, useState } from "react";
import PlayerCard from "../../PlayerCard";
import axios from "axios";
import { LOBBYPLAYERS_URL } from "../../../../constants";
import { LobbyPlayer } from "../../../types/lobbyPlayersTypes";
import { useLobby } from "../../../hooks/useLobbyContext";

const LobbyPlayersScreen: React.FC = () => {
  const [lobbyPlayers, setLobbyPlayers] = useState<LobbyPlayer[]>([]);
  const { refetchKey } = useLobby();
  const [flippedStates, setFlippedStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [areAllFlipped, setAreAllFlipped] = useState<boolean>(false);

  const handleFlipAll = () => {
    const newFlippedStates = Object.fromEntries(
      lobbyPlayers.map((player) => [player.steamId, !areAllFlipped])
    );
    setFlippedStates(newFlippedStates);
    setAreAllFlipped((prev) => !prev);
  };

  const handleSingleFlip = (steamId: string) => {
    setFlippedStates((prevState) => ({
      ...prevState,
      [steamId]: !prevState[steamId],
    }));
  };

  const getLobbyPlayers = async () => {
    try {
      const res = await axios.get(LOBBYPLAYERS_URL);
      setLobbyPlayers(res.data);

      // Initialize flipped state for all players to false when new data is fetched
      const initialFlippedStates = Object.fromEntries(
        res.data.map((player: LobbyPlayer) => [player.steamId, false])
      );
      setFlippedStates(initialFlippedStates);
    } catch (err: any) {
      console.error(err.message || "Lobby players data fetch failed");
    }
  };

  useEffect(() => {
    getLobbyPlayers();
  }, [refetchKey]);

  return (
    <div className="flex flex-col gap-3 justify-start">
      <button className="btn self-start" onClick={handleFlipAll}>
        Flip All
      </button>
      <div className="grid grid-cols-8 gap-3">
        {lobbyPlayers.map((player) => (
          <PlayerCard
            key={player.steamId}
            player={player}
            isFlipped={flippedStates[player.steamId] || false}
            onFlip={() => handleSingleFlip(player.steamId)}
          />
        ))}
      </div>
    </div>
  );
};

export default LobbyPlayersScreen;
