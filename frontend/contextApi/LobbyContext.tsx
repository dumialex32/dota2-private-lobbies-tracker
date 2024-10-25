import React, { createContext, ReactNode, useEffect, useState } from "react";
import { LOBBYGAMES_URL } from "../constants";
import { LobbyGames } from "../src/types/lobbyGamesTypes";
import axios from "axios";

interface LobbyContext {
  triggerRefetch: () => void;
  refetchKey: number;
  isLoading: boolean;
  error: string;
  lobbyGames: LobbyGames[];
}

export const LobbyContext = createContext<LobbyContext | undefined>(undefined);

const LobbyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = React.useState<string>("");
  const [lobbyGames, setLobbyGames] = React.useState<LobbyGames[] | []>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [refetchKey, setRefetchKey] = useState<number>(0);

  const getLobbyGames = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(LOBBYGAMES_URL);

      setLobbyGames(res.data);
    } catch (err: any) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        console.log(err.status);
        console.error(err.response);
        setError(err.response?.data.message);
      } else {
        setError("Request failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLobbyGames();
  }, [refetchKey]);

  const triggerRefetch = () => {
    setRefetchKey((refetchKey) => refetchKey + 1);
  };
  const value = {
    refetchKey,
    lobbyGames,
    isLoading,
    error,
    triggerRefetch,
  };
  return (
    <LobbyContext.Provider value={value}>{children}</LobbyContext.Provider>
  );
};

export default LobbyProvider;
