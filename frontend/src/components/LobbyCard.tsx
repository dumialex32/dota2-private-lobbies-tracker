import { Link } from "react-router-dom";

const LobbyCard: React.FC = () => {
  return (
    <Link to="/lobby">
      <div className="flex flex-col gap-4 bg-orange-400 rounded-lg p-6 shadow-sm animate-leftSlideIn hover:scale-105 duration-300 hover:shadow-xl active:scale-95">
        {/* <div className="flex flex-col gap-4 bg-orange-400 rounded-lg p-6 shadow-sm opacity-50 cursor-not-allowed"> */}
        <div className="flex justify-center">
          <img src="/src/assets/lp.png" />
        </div>
      </div>
    </Link>
  );
};

export default LobbyCard;
