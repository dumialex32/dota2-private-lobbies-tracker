import BasicTable from "../BasicTable";

import trophy from "../../../assets/cupa.png";

import Loader from "../../Loader";
import AlertType from "../../Alert";
import useLobbyGameDetails from "../../../hooks/useLobbyGameDetails";

const LobbyGameDetails: React.FC = () => {
  const { lobbyGame, isLoading, error, radiantPlayers, direPlayers } =
    useLobbyGameDetails();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <AlertType type="error" msg={error} />
      ) : (
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
      )}
    </>
  );
};

export default LobbyGameDetails;
