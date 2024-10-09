import { Link } from "react-router-dom";

const PartyCard: React.FC = () => {
  return (
    <Link to="/lobby">
      <div className="flex flex-col gap-4 bg-red-400 rounded-lg p-6 shadow-sm animate-leftSlideIn hover:scale-105 duration-300 hover:shadow-xl active:scale-95">
        <div className="flex justify-center">
          <img src="/src/assets/pp.png" />
        </div>
      </div>
    </Link>
  );
};

export default PartyCard;
