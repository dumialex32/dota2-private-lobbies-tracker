import { Link } from "react-router-dom";
import pdLogo from "../../../assets/pd.png";
import cupa from "../../../assets/cupa.png";

const LobbyTabs: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Link to="/lobby/latestgames">
        <div className="grid grid-cols-[1fr_2fr_0.8fr] justify-items-center p-2 rounded-md bg-lobby-tab hover:opacity-80 transition-all duration-300">
          <img src={pdLogo} alt="PD Logo" />
          <div className="flex">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-bold">Latest games</h2>
              <p className="text-gray-300 text-xs">Ultimele jocuri de lobby</p>
            </div>
          </div>

          <img src={cupa} />
        </div>
      </Link>
      <Link to="/lobby/bottomfive">
        <div className="grid grid-cols-[1fr_2fr_0.8fr] justify-items-center p-2 rounded-md bg-lobby-tab hover:opacity-80 transition-all duration-300">
          <img src={pdLogo} alt="PD Logo" />
          <div className="flex">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-bold">Top 5 terminati</h2>
              <p className="text-xs text-gray-300">Cei mai slabi</p>
            </div>
          </div>

          <img src={cupa} />
        </div>
      </Link>
      <Link to="/lobby/topfive">
        <div className="grid grid-cols-[1fr_2fr_0.8fr] justify-items-center p-2 rounded-md bg-lobby-tab hover:opacity-80 transition-all duration-300">
          <img src={pdLogo} alt="PD Logo" />
          <div className="flex">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-bold">Top 5 jucători</h2>
              <p className="text-xs text-gray-300">GODS OF LOBBIES</p>
            </div>
          </div>

          <img src={cupa} />
        </div>
      </Link>
    </div>
  );
};

export default LobbyTabs;
