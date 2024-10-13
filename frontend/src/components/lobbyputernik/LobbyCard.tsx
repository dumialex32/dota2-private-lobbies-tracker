import { Link } from "react-router-dom";
import LobbyLogo from "./LobbyLogo";

const LobbyCard: React.FC = () => {
  return (
    <Link to="/lobby">
      <div className="flex flex-col gap-4 bg-lobby-main-gradient rounded-lg p-6 shadow-sm animate-leftSlideIn hover:scale-105 duration-300 hover:shadow-xl active:scale-95">
        <div className="flex justify-center">
          <LobbyLogo />
        </div>
      </div>
    </Link>
  );
};

export default LobbyCard;
