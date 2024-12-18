import Button from "../../Button";
import LobbyLogo from "../LobbyLogo";
import { Outlet, useNavigate } from "react-router-dom";
import LobbyTabs from "./LobbyTabs";
import AddReplay from "../AddReplay";
import Footer from "../../Footer";
const LobbyScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-lobby-main-gradient flex flex-col gap-6 min-h-screen">
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

      <main className="flex-grow container mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default LobbyScreen;
