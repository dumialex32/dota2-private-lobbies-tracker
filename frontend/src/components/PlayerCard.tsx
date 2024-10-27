import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { LobbyPlayer } from "../types/lobbyPlayersTypes";
import StatsRow from "./StatsRow";
import playerPlaceholder from "../assets/player_placeholder.png";

const PlayerCard: React.FC<{ player: LobbyPlayer }> = ({ player }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped((prevState) => !prevState);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="flex flex-col gap-2 shadow-sm shadow-white rounded-md text-white">
        <img src={playerPlaceholder} className="w-full h-full object-contain" />

        <div className="flex flex-col gap-2 p-4">
          <h2 className="text-xl overflow-hidden whitespace-nowrap text-ellipsis">
            {player.playerName}
          </h2>
          <button className="btn" onClick={handleClick}>
            Flip for stats
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 shadow-sm shadow-white rounded-md text-white p-2">
        <div className="flex flex-col gap-2 p-4">
          <StatsRow player={player} />
        </div>
        <button className="btn" onClick={handleClick}>
          Flip back
        </button>
      </div>
    </ReactCardFlip>
  );
};

export default PlayerCard;
