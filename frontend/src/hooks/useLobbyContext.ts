import { useContext } from "react";
import { LobbyContext } from "../../contextApi/LobbyContext";

export const useLobby = () => {
  const context = useContext(LobbyContext);
  if (!context) throw new Error("Lobby context used outside lobby provider");

  return context;
};
