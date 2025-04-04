import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
import LobbyProvider from "../contextApi/LobbyContext.tsx";
import LobbyGameDetails from "./components/lobbyputernik/lobbyscreens/LobbyGameDetails.tsx";
import LobbyPlayers from "./components/lobbyputernik/lobbyscreens/LobbyPlayersScreen.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "lobby",
    element: (
      <LobbyProvider>
        <LobbyScreen />
      </LobbyProvider>
    ),
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
      {
        path: "players",
        element: <LobbyPlayers />,
      },
      {
        path: ":matchid",
        element: <LobbyGameDetails />,
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
