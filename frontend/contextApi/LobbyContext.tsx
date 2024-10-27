import React, { createContext, ReactNode, useState } from "react";

interface LobbyContext {
  triggerRefetch: () => void;
  refetchKey: number;
}

export const LobbyContext = createContext<LobbyContext | undefined>(undefined);

const LobbyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refetchKey, setRefetchKey] = useState<number>(0);

  const triggerRefetch = () => {
    setRefetchKey((refetchKey) => refetchKey + 1);
  };
  const value = {
    triggerRefetch,
    refetchKey,
  };
  return (
    <LobbyContext.Provider value={value}>{children}</LobbyContext.Provider>
  );
};

export default LobbyProvider;
