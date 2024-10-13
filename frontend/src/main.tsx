import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PartyScreen from "./components/partyputernik/PartyScreen.tsx";
import LobbyScreen from "./components/lobbyputernik/lobbyscreens/LobbyScreen.tsx";
import TopFive from "./components/lobbyputernik/lobbyscreens/TopFive.tsx";
import LatestGames from "./components/lobbyputernik/lobbyscreens/LatestGames.tsx";
import TopWorstPlayers from "./components/lobbyputernik/lobbyscreens/TopWorstPlayers.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "lobby",
    element: <LobbyScreen />,
    children: [
      {
        index: true,
        element: <LatestGames />,
      },
      {
        path: "latestgames",
        element: <LatestGames />,
      },
      {
        path: "topfive",
        element: <TopFive />,
      },
      {
        path: "bottomfive",
        element: <TopWorstPlayers />,
      },
    ],
  },
  { path: "/party", element: <PartyScreen /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
