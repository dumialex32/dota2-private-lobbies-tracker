import LobbyTab from "../LobbyTab";
import tabLogo1 from "../../../assets/pils.png";
import tabLogo2 from "../../../assets/pd.png";
import bottrophy from "../../../assets/cupa.png";
import dotaLogo from "../../../assets/dota2.png";
import wasted from "../../../assets/wasted.png";
import { useLocation } from "react-router-dom";

const LobbyTabs: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="grid grid-cols-5 gap-4">
      <LobbyTab
        tabLogo={dotaLogo}
        trophy={bottrophy}
        active={pathname === "/lobby" || pathname === "/lobby/latestgames"}
        to="lobby/latestgames"
      >
        <h2 className="text-l font-semibold">Latest games</h2>
        <p className="text-xs"></p>
      </LobbyTab>
      <LobbyTab
        tabLogo={tabLogo2}
        trophy={bottrophy}
        to="lobby/bottomfive"
        active={pathname === "/lobby/bottomfive"}
      >
        <h2 className="text-l font-semibold">TOP 5</h2>
        <p className="text-xs">GOD OF LOBBIES</p>
      </LobbyTab>
      <LobbyTab
        tabLogo={tabLogo1}
        trophy={bottrophy}
        active={pathname === "/lobby/topfive"}
        to="lobby/topfive"
      >
        <h2 className="text-l font-semibold">TOP 5</h2>
        <p className="text-xs">Top terminati</p>
      </LobbyTab>
      <LobbyTab
        tabLogo={wasted}
        trophy={bottrophy}
        active={pathname === "/lobby/topwasted"}
        to="lobby/topwasted"
      >
        <h2 className="text-l font-semibold">TOP 3 </h2>
        <p className="text-xs">Top Drogalăi</p>
      </LobbyTab>
    </div>
  );
};

export default LobbyTabs;
