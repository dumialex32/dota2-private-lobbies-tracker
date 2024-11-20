import ReactCardFlip from "react-card-flip";
import { LobbyPlayer } from "../types/lobbyPlayersTypes";
import StatsRow from "./StatsRow";
import playerPlaceholder from "../assets/player_placeholder.png";

const PlayerCard: React.FC<{
  player: LobbyPlayer;
  isFlipped: boolean;
  onFlip: () => void;
}> = ({ player, isFlipped, onFlip }) => {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="flex flex-col gap-2 shadow-sm shadow-white rounded-md text-white">
        <img src={playerPlaceholder} className="w-full h-full object-contain" />
        <div className="flex flex-col gap-2 p-4">
          <h2 className="text-xl overflow-hidden whitespace-nowrap text-ellipsis">
            {player.playerName}
          </h2>
          <button className="btn" onClick={onFlip}>
            Flip for stats
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 shadow-sm shadow-white rounded-md text-white p-2">
        <div className="flex flex-col gap-2 p-4">
          <div className="py-0.5 px-2 bg-stone-300 rounded-md text-center">
            <h3 className="text-lg overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-dota-logo-color">
              {player.playerName}
            </h3>
          </div>
          <StatsRow player={player} />
        </div>
        <button className="btn" onClick={onFlip}>
          Flip back
        </button>
      </div>
    </ReactCardFlip>
  );
};

export default PlayerCard;
