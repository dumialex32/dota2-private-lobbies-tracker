import LobbyCard from "./components/lobbyputernik/LobbyCard";
import PartyCard from "./components/partyputernik/PartyCard";

function App() {
  return (
    <div className="bg-main-gradient min-h-screen flex flex-col">
      <div className="container mx-auto bg-blue flex-grow flex flex-col">
        <div className="flex flex-col gap-8">
          <div className="self-center animate-topSlideIn duration-700">
            <img src="src/assets/biceps.png" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-center animate-fadeIn">
              Choose your destiny !
            </h1>
          </div>

          <div className="flex flex-col justify-center flex-grow px-4">
            <div className="grid grid-cols-2 gap-6 items-center w-full">
              <PartyCard />

              <LobbyCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
