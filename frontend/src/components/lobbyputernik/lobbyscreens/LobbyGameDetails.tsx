import { useParams } from "react-router-dom";
import BasicTable from "../BasicTable";
import { useLobby } from "../../../hooks/useLobbyContext";
import trophy from "../../../assets/cupa.png";

const LobbyGameDetails: React.FC = () => {
  const { lobbyGames } = useLobby();
  const { id } = useParams();
  const lobbyGame = lobbyGames.find((game) => game.matchId === id);

  const radiantPlayers = lobbyGame?.playerInfo.filter(
    (player) => player.gameTeam === 2
  );
  const direPlayers = lobbyGame?.playerInfo.filter(
    (player) => player.gameTeam === 3
  );

  console.log(lobbyGame);
  console.log(radiantPlayers);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <h2 className="text-3xl text-white pl-2">Radiant</h2>
        {lobbyGame?.gameWinner === "2" ? (
          <img src={trophy} className="h-10" />
        ) : null}
      </div>
      <BasicTable players={radiantPlayers} />
      <div className="flex gap-2">
        <h2 className="text-3xl text-white pl-2">Dire</h2>
        {lobbyGame?.gameWinner === "3" ? (
          <img src={trophy} className="h-10" />
        ) : null}
      </div>
      <BasicTable players={direPlayers} />
    </div>
  );
};

export default LobbyGameDetails;
