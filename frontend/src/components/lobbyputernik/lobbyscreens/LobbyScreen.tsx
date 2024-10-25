import Button from "../../Button";
import LobbyLogo from "../LobbyLogo";
import { Outlet, useNavigate } from "react-router-dom";
import LobbyTabs from "./LobbyTabs";
import AddReplay from "../AddReplay";

const LobbyScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-lobby-main-gradient">
      <nav className="flex items-center justify-center">
        <LobbyLogo />
      </nav>

      <nav className="bg-nav-gradient grid grid-cols-[8rem_1fr] p-6 items-center border-y-2">
        <div className="flex flex-col items-center gap-4">
          <Button onClick={() => navigate("/")}>Homepage</Button>

          <AddReplay />
        </div>

        <div className="container mx-auto">
          <LobbyTabs />
        </div>
      </nav>

      <main className="container mx-auto mt-8 h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default LobbyScreen;
