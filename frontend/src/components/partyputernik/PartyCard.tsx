import { Link } from "react-router-dom";
import PartyLogo from "./PartyLogo";

const PartyCard: React.FC = () => {
  return (
    <Link to="/party">
      <div className="bg-party-main-gradient flex flex-col gap-4 bg- rounded-lg p-6 shadow-sm animate-leftSlideIn hover:scale-105 duration-300 hover:shadow-xl active:scale-95">
        <div className="flex justify-center">
          <PartyLogo />
        </div>
      </div>
    </Link>
  );
};

export default PartyCard;
