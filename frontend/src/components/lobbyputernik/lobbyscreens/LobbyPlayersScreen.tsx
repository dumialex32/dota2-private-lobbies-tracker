import { useEffect, useState } from "react";
import PlayerCard from "../../PlayerCard";
import axios from "axios";
import { LOBBYPLAYERS_URL } from "../../../../constants";
import { LobbyPlayer } from "../../../types/lobbyPlayersTypes";
import { useLobby } from "../../../hooks/useLobbyContext";
import FormRow from "../../FormRow";
import SortBy from "../../SortBy";
import useSortBy from "../../../hooks/useSortBy";

const sortOptions = [
  { value: "totalKills-asc", label: "Kills (lowest first)" },
  { value: "totalKills-desc", label: "Kills (highest first)" },
  { value: "totalDeaths-asc", label: "Deaths (lowest first)" },
  { value: "totalDeaths-desc", label: "Deaths (highest first)" },
  { value: "totalAssists-asc", label: "Assists (lowest first)" },
  { value: "totalAssists-desc", label: "Assists (highest first)" },
  { value: "totalGames-asc", label: "Played Games (lowest first)" },
  { value: "totalGames-desc", label: "Played Games (highest first)" },
];

const LobbyPlayersScreen: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [lobbyPlayers, setLobbyPlayers] = useState<LobbyPlayer[]>([]);
  const { refetchKey } = useLobby();
  const [areAllFlipped, setAreAllFlipped] = useState<boolean>(false);
  const [flippedStates, setFlippedStates] = useState<{
    [key: string]: boolean;
  }>({});

  // filter players
  const filteredNames = lobbyPlayers.filter((p) =>
    p.playerName.toLowerCase().includes(query.toLowerCase())
  );

  // sort players
  const { sortedData: sortedPlayers } = useSortBy(
    filteredNames || lobbyPlayers
  );

  // search player
  const handleSearch = (value: string) => {
    setQuery(value);
  };

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
    <div className="flex flex-col gap-3 px-4 py-2">
      {lobbyPlayers.length !== 0 && (
        <div className="flex items-center md:justify-between gap-4">
          <button
            className="btn self-end md:self-start "
            onClick={handleFlipAll}
          >
            Flip All
          </button>
          {/* Search players */}
          <div className="flex items-center gap-4">
            <FormRow label="Search Player">
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormRow>

            {/* Sort players */}
            <SortBy sortOptions={sortOptions} />
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
        {sortedPlayers?.map((player) => (
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
