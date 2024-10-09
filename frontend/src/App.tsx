import { useEffect } from "react";
import LobbyCard from "./components/LobbyCard";
import PartyCard from "./components/PartyCard";

function App() {
  const string = `https://cors-anywhere.herokuapp.com/http://35.175.203.32/lobby_puternic.json`;

  const getWeather = async () => {
    try {
      const res = await fetch(string, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="container mx-auto bg-blue">
      <div className="flex flex-col gap-8">
        <div className="self-center animate-topSlideIn duration-700">
          <img src="src/assets/dota-pp-logo.png" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-center animate-fadeIn">
            Choose your destiny !
          </h1>
        </div>

        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-6 items-center w-full">
            <PartyCard />

            <LobbyCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
